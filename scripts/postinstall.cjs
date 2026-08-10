/**
 * @license
 * Copyright 2026 Qwen
 * Copyright 2026 Davide A. Guglielmi (Termux porting patches)
 * SPDX-License-Identifier: Apache-2.0
 */

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

function isTermux(platform = os.platform(), env = process.env) {
  return (
    platform === 'android' ||
    Boolean(env.TERMUX_VERSION) ||
    env.PREFIX?.includes('com.termux') === true
  );
}

function quoteForShell(value) {
  return `'${value.replace(/'/g, "'\\''")}'`;
}

function legacyWrapperContents(targetPath) {
  return [
    `#!/usr/bin/env sh\nexec ${quoteForShell(targetPath)} "$@"\n`,
    `#!/usr/bin/env sh\nexec ${targetPath} "$@"\n`,
  ];
}

function nextBackupPath(wrapperPath) {
  const base = `${wrapperPath}.qwen-code-termux-orphan`;
  for (let index = 0; index < 100; index += 1) {
    const candidate = index === 0 ? base : `${base}.${index}`;
    try {
      fs.lstatSync(candidate);
    } catch (error) {
      if (error?.code === 'ENOENT') return candidate;
      throw error;
    }
  }
  return undefined;
}

function repairLegacyStandaloneShim({ homeDir, prefix, packageEntryPath }) {
  if (![homeDir, prefix, packageEntryPath].every(Boolean)) {
    return { status: 'invalid-context' };
  }
  const wrapperPath = path.join(homeDir, '.local', 'bin', 'qwen');
  const legacyTargetPath = path.join(
    homeDir,
    '.local',
    'lib',
    'qwen-code',
    'bin',
    'qwen',
  );
  const npmLauncherPath = path.join(prefix, 'bin', 'qwen');

  try {
    const wrapperStat = fs.lstatSync(wrapperPath);
    if (
      !wrapperStat.isFile() ||
      wrapperStat.isSymbolicLink() ||
      (wrapperStat.mode & 0o111) === 0
    ) {
      return { status: 'unrecognized', wrapperPath };
    }

    try {
      fs.lstatSync(legacyTargetPath);
      return { status: 'standalone-present', wrapperPath };
    } catch (error) {
      if (error?.code !== 'ENOENT') throw error;
    }

    const wrapper = fs.readFileSync(wrapperPath, 'utf8');
    if (!legacyWrapperContents(legacyTargetPath).includes(wrapper)) {
      return { status: 'unrecognized', wrapperPath };
    }

    if (
      path.resolve(wrapperPath) === path.resolve(npmLauncherPath) ||
      fs.realpathSync(npmLauncherPath) !== fs.realpathSync(packageEntryPath)
    ) {
      return { status: 'npm-launcher-mismatch', wrapperPath };
    }

    const backupPath = nextBackupPath(wrapperPath);
    if (!backupPath) return { status: 'backup-unavailable', wrapperPath };

    fs.renameSync(wrapperPath, backupPath);
    return { status: 'repaired', wrapperPath, backupPath, npmLauncherPath };
  } catch (error) {
    if (error?.code === 'ENOENT') return { status: 'not-found', wrapperPath };
    return { status: 'error', wrapperPath, error };
  }
}

function main() {
  if (!isTermux()) return;

  const result = repairLegacyStandaloneShim({
    homeDir: os.homedir(),
    prefix: process.env.PREFIX || process.env.npm_config_prefix,
    packageEntryPath: path.resolve(__dirname, '..', 'cli-entry.js'),
  });

  if (result.status === 'repaired') {
    console.warn(
      `[qwen-code-termux] Moved orphaned standalone wrapper to ${result.backupPath}`,
    );
    console.warn(
      '[qwen-code-termux] Run "hash -r" if this shell cached the old command path.',
    );
  } else if (result.status === 'error') {
    console.warn(
      `[qwen-code-termux] Could not inspect legacy wrapper: ${result.error.message}`,
    );
  }

  console.log('qwen-code-termux installed successfully');
  console.log('Run: qwen');
}

if (require.main === module) main();

module.exports = {
  isTermux,
  legacyWrapperContents,
  repairLegacyStandaloneShim,
};
