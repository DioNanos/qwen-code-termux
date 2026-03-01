/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

const os = require('node:os');
const { spawnSync } = require('node:child_process');

const isTermux =
  os.platform() === 'android' ||
  process.env.TERMUX_VERSION ||
  (process.env.PREFIX && process.env.PREFIX.includes('com.termux'));

// Skip everything on Termux (bundle is pre-built in npm package)
if (isTermux) {
  console.log('Termux detected: skipping husky and bundle');
  process.exit(0);
}

// On Mac/Linux/Windows during npm install, skip bundle
// Bundle should be run explicitly via 'npm run build && npm run bundle' 
// This avoids issues with unbuilt workspace packages
console.log('Skipping bundle during npm install.');
console.log('Run "npm run build && npm run bundle" manually if needed.');
process.exit(0);