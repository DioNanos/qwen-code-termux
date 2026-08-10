/**
 * @license
 * Copyright 2026 Qwen
 * Copyright 2026 Davide A. Guglielmi (Termux porting patches)
 * SPDX-License-Identifier: Apache-2.0
 */

const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const isTermux =
  os.platform() === 'android' ||
  process.env.TERMUX_VERSION ||
  (process.env.PREFIX && process.env.PREFIX.includes('com.termux'));

if (isTermux) {
  console.log('Termux detected: skipping husky and bundle during prepare');
  process.exit(0);
}

const result = spawnSync(process.execPath, [path.join(__dirname, 'prepare.js')], {
  stdio: 'inherit',
});

if (result.error) {
  throw result.error;
}
if (result.signal) {
  process.kill(process.pid, result.signal);
}
process.exit(result.status ?? 1);
