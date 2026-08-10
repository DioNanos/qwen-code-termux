/**
 * @license
 * Copyright 2026 Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { afterEach, describe, expect, it } from 'vitest';

import {
  createWasmBinaryPlugin,
  portableBundlePath,
} from '../esbuild-wasm-binary-plugin.js';

const rootDir = fileURLToPath(new URL('../..', import.meta.url));
const tempDirs = [];

afterEach(() => {
  for (const tempDir of tempDirs.splice(0)) {
    rmSync(tempDir, { recursive: true, force: true });
  }
});

async function buildFixture() {
  const fixtureRoot = mkdtempSync(path.join(tmpdir(), 'qwen-wasm-plugin-'));
  tempDirs.push(fixtureRoot);
  const packageDir = path.join(fixtureRoot, 'node_modules', 'fixture-wasm');
  mkdirSync(packageDir, { recursive: true });
  writeFileSync(
    path.join(packageDir, 'package.json'),
    JSON.stringify({ name: 'fixture-wasm', version: '1.0.0' }),
  );
  writeFileSync(
    path.join(packageDir, 'fixture.wasm'),
    Buffer.from([0, 97, 115, 109]),
  );
  writeFileSync(
    path.join(fixtureRoot, 'entry.js'),
    "import bytes from 'fixture-wasm/fixture.wasm?binary'; export default bytes;\n",
  );

  const result = await build({
    absWorkingDir: fixtureRoot,
    entryPoints: ['entry.js'],
    bundle: true,
    format: 'esm',
    platform: 'node',
    plugins: [createWasmBinaryPlugin(fixtureRoot)],
    write: false,
  });
  return { fixtureRoot, output: result.outputFiles[0].text };
}

describe('WASM binary esbuild plugin', () => {
  it('uses a repository-relative module identity while reading resolved bytes', () => {
    let resolveWasm;
    let loadWasm;
    const plugin = createWasmBinaryPlugin(rootDir);
    plugin.setup({
      onResolve(_options, callback) {
        resolveWasm = callback;
      },
      onLoad(_options, callback) {
        loadWasm = callback;
      },
    });

    const resolved = resolveWasm({
      path: 'web-tree-sitter/tree-sitter.wasm?binary',
      resolveDir: rootDir,
    });
    expect(resolved.path).toMatch(
      /^node_modules\/web-tree-sitter\/tree-sitter\.wasm$/,
    );
    expect(resolved.path).not.toContain(rootDir);

    const loaded = loadWasm({ pluginData: resolved.pluginData });
    expect(Buffer.isBuffer(loaded.contents)).toBe(true);
    expect(loaded.contents).toEqual(
      readFileSync(resolved.pluginData.resolvedPath),
    );
    expect(loaded.loader).toBe('binary');
  });

  it('rejects resolved dependencies outside the repository', () => {
    expect(() =>
      portableBundlePath(rootDir, path.resolve(rootDir, '..', 'outside.wasm')),
    ).toThrow(/outside the repository/);
  });

  it('emits byte-identical bundles from different checkout paths', async () => {
    const first = await buildFixture();
    const second = await buildFixture();

    expect(first.output).toBe(second.output);
    expect(first.output).not.toContain(first.fixtureRoot);
    expect(second.output).not.toContain(second.fixtureRoot);
    expect(first.output).toContain(
      'wasm-binary:node_modules/fixture-wasm/fixture.wasm',
    );
  });
});
