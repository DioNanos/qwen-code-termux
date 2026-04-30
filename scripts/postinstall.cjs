/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

const os = require('node:os');

if (os.platform() === 'android' || process.env.PREFIX?.includes('com.termux')) {
  console.log('qwen-code-termux installed successfully');
  console.log('Run: qwen');
}
