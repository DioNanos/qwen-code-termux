/**
 * @license
 * Copyright 2026 Qwen Team
 * Copyright 2026 Davide A. Guglielmi (Termux porting patches)
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const {
  isTermux,
  legacyWrapperContents,
  repairLegacyStandaloneShim,
} = require('../postinstall.cjs');

describe('Termux postinstall', () => {
  const tempDirs = [];

  afterEach(() => {
    for (const tempDir of tempDirs.splice(0)) {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it('moves only the exact orphaned standalone wrapper out of PATH', () => {
    const fixture = createFixture();
    writeFileSync(
      fixture.wrapperPath,
      legacyWrapperContents(fixture.legacyTargetPath)[0],
      { mode: 0o755 },
    );

    const result = repairLegacyStandaloneShim(fixture.options);

    expect(result.status).toBe('repaired');
    expect(() => lstatSync(fixture.wrapperPath)).toThrow();
    expect(readFileSync(result.backupPath, 'utf8')).toBe(
      legacyWrapperContents(fixture.legacyTargetPath)[0],
    );
    expect(lstatSync(result.backupPath).mode & 0o111).not.toBe(0);
  });

  it('never overwrites a dangling symlink when choosing the backup name', () => {
    const fixture = createFixture();
    const wrapper = legacyWrapperContents(fixture.legacyTargetPath)[0];
    const firstBackupPath = `${fixture.wrapperPath}.qwen-code-termux-orphan`;
    writeFileSync(fixture.wrapperPath, wrapper, { mode: 0o755 });
    symlinkSync(path.join(fixture.rootDir, 'missing'), firstBackupPath);

    const result = repairLegacyStandaloneShim(fixture.options);

    expect(result.status).toBe('repaired');
    expect(result.backupPath).toBe(`${firstBackupPath}.1`);
    expect(lstatSync(firstBackupPath).isSymbolicLink()).toBe(true);
    expect(readFileSync(result.backupPath, 'utf8')).toBe(wrapper);
  });

  it('leaves the wrapper untouched while its standalone target exists', () => {
    const fixture = createFixture();
    const wrapper = legacyWrapperContents(fixture.legacyTargetPath)[0];
    mkdirSync(path.dirname(fixture.legacyTargetPath), { recursive: true });
    writeFileSync(fixture.legacyTargetPath, 'standalone\n');
    writeFileSync(fixture.wrapperPath, wrapper, { mode: 0o755 });

    expect(repairLegacyStandaloneShim(fixture.options).status).toBe(
      'standalone-present',
    );
    expect(readFileSync(fixture.wrapperPath, 'utf8')).toBe(wrapper);
  });

  it('never changes a user-authored wrapper that only mentions the old path', () => {
    const fixture = createFixture();
    const wrapper = `#!/usr/bin/env sh\necho ${fixture.legacyTargetPath}\n`;
    writeFileSync(fixture.wrapperPath, wrapper, { mode: 0o755 });

    expect(repairLegacyStandaloneShim(fixture.options).status).toBe(
      'unrecognized',
    );
    expect(readFileSync(fixture.wrapperPath, 'utf8')).toBe(wrapper);
  });

  it('never changes a non-executable copy of the generated wrapper', () => {
    const fixture = createFixture();
    const wrapper = legacyWrapperContents(fixture.legacyTargetPath)[0];
    writeFileSync(fixture.wrapperPath, wrapper, { mode: 0o644 });

    expect(repairLegacyStandaloneShim(fixture.options).status).toBe(
      'unrecognized',
    );
    expect(readFileSync(fixture.wrapperPath, 'utf8')).toBe(wrapper);
  });

  it('never changes a symlink in the legacy wrapper location', () => {
    const fixture = createFixture();
    const otherLauncher = path.join(fixture.rootDir, 'other-qwen');
    writeFileSync(otherLauncher, 'other\n');
    symlinkSync(otherLauncher, fixture.wrapperPath);

    expect(repairLegacyStandaloneShim(fixture.options).status).toBe(
      'unrecognized',
    );
    expect(lstatSync(fixture.wrapperPath).isSymbolicLink()).toBe(true);
  });

  it('does not move the legacy wrapper unless npm owns the replacement bin', () => {
    const fixture = createFixture();
    const wrapper = legacyWrapperContents(fixture.legacyTargetPath)[0];
    writeFileSync(fixture.wrapperPath, wrapper, { mode: 0o755 });
    rmSync(fixture.npmLauncherPath);
    writeFileSync(fixture.npmLauncherPath, 'not this package\n');

    expect(repairLegacyStandaloneShim(fixture.options).status).toBe(
      'npm-launcher-mismatch',
    );
    expect(readFileSync(fixture.wrapperPath, 'utf8')).toBe(wrapper);
  });

  it('never treats the legacy location itself as the npm replacement', () => {
    const fixture = createFixture();
    const wrapper = legacyWrapperContents(fixture.legacyTargetPath)[0];
    writeFileSync(fixture.wrapperPath, wrapper, { mode: 0o755 });

    expect(
      repairLegacyStandaloneShim({
        ...fixture.options,
        prefix: path.join(fixture.options.homeDir, '.local'),
      }).status,
    ).toBe('npm-launcher-mismatch');
    expect(readFileSync(fixture.wrapperPath, 'utf8')).toBe(wrapper);
  });

  it('is idempotent and skips an incomplete environment', () => {
    const fixture = createFixture();
    writeFileSync(
      fixture.wrapperPath,
      legacyWrapperContents(fixture.legacyTargetPath)[0],
      { mode: 0o755 },
    );

    expect(repairLegacyStandaloneShim(fixture.options).status).toBe('repaired');
    expect(repairLegacyStandaloneShim(fixture.options).status).toBe(
      'not-found',
    );
    expect(
      repairLegacyStandaloneShim({
        homeDir: '',
        prefix: fixture.options.prefix,
        packageEntryPath: fixture.options.packageEntryPath,
      }).status,
    ).toBe('invalid-context');
  });

  it('detects both native Android and the Termux environment marker', () => {
    expect(isTermux('android', {})).toBe(true);
    expect(isTermux('linux', { TERMUX_VERSION: '0.119' })).toBe(true);
    expect(isTermux('linux', { PREFIX: '/usr/local' })).toBe(false);
  });

  function createFixture() {
    const rootDir = mkdtempSync(path.join(tmpdir(), 'qwen-postinstall-'));
    tempDirs.push(rootDir);
    const homeDir = path.join(rootDir, 'home');
    const prefix = path.join(rootDir, 'termux-prefix');
    const wrapperPath = path.join(homeDir, '.local', 'bin', 'qwen');
    const legacyTargetPath = path.join(
      homeDir,
      '.local',
      'lib',
      'qwen-code',
      'bin',
      'qwen',
    );
    const packageEntryPath = path.join(
      prefix,
      'lib',
      'node_modules',
      '@mmmbuto',
      'qwen-code-termux',
      'cli-entry.js',
    );
    const npmLauncherPath = path.join(prefix, 'bin', 'qwen');
    mkdirSync(path.dirname(wrapperPath), { recursive: true });
    mkdirSync(path.dirname(packageEntryPath), { recursive: true });
    mkdirSync(path.dirname(npmLauncherPath), { recursive: true });
    writeFileSync(packageEntryPath, 'npm launcher\n');
    symlinkSync(packageEntryPath, npmLauncherPath);

    return {
      rootDir,
      wrapperPath,
      legacyTargetPath,
      npmLauncherPath,
      options: { homeDir, prefix, packageEntryPath },
    };
  }
});
