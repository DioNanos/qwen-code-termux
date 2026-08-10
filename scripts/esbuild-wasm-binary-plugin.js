/**
 * @license
 * Copyright 2026 Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 */

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

export function portableBundlePath(rootDir, resolvedPath) {
  const relativePath = path.relative(rootDir, resolvedPath);
  if (
    relativePath === '' ||
    relativePath === '..' ||
    relativePath.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativePath)
  ) {
    throw new Error(
      `WASM dependency resolved outside the repository: ${resolvedPath}`,
    );
  }
  return relativePath.split(path.sep).join('/');
}

export function createWasmBinaryPlugin(rootDir) {
  return {
    name: 'wasm-binary',
    setup(build) {
      build.onResolve({ filter: /\.wasm\?binary$/ }, (args) => {
        const specifier = args.path.replace(/\?binary$/, '');
        const localRequire = createRequire(
          path.resolve(args.resolveDir || rootDir, '_dummy_.js'),
        );
        const resolvedPath = localRequire.resolve(specifier);
        return {
          path: portableBundlePath(rootDir, resolvedPath),
          namespace: 'wasm-binary',
          pluginData: { resolvedPath },
        };
      });
      build.onLoad({ filter: /.*/, namespace: 'wasm-binary' }, (args) => {
        const resolvedPath = args.pluginData?.resolvedPath;
        if (typeof resolvedPath !== 'string') {
          throw new Error('Missing resolved path for embedded WASM dependency');
        }
        return { contents: readFileSync(resolvedPath), loader: 'binary' };
      });
    },
  };
}
