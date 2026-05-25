/**
 * @license
 * Copyright 2026 Qwen
 * Copyright 2026 Davide A. Guglielmi (Termux porting patches)
 * SPDX-License-Identifier: Apache-2.0
 */

const os = require('node:os');

const isTermux =
  os.platform() === 'android' ||
  process.env.TERMUX_VERSION ||
  (process.env.PREFIX && process.env.PREFIX.includes('com.termux'));

if (isTermux) {
  console.log('Termux detected: skipping husky and bundle during prepare');
  process.exit(0);
}

console.log('Non-Termux environment: normal prepare path should be used.');
process.exit(1);
