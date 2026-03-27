/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

const os = require('node:os');

const isTermux =
  os.platform() === 'android' ||
  process.env.TERMUX_VERSION ||
  (process.env.PREFIX && process.env.PREFIX.includes('com.termux'));

if (isTermux) {
  console.log('Termux detected: skipping husky and bundle');
  process.exit(0);
}

console.log('Skipping bundle during npm install.');
console.log('Run "npm run build && npm run bundle" manually if needed.');
process.exit(0);
