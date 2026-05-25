/**
 * @license
 * Copyright 2026 Qwen
 * Copyright 2026 Davide A. Guglielmi (Termux porting patches)
 * SPDX-License-Identifier: Apache-2.0
 */

const os = require('node:os');

if (os.platform() === 'android' || process.env.PREFIX?.includes('com.termux')) {
  console.log('qwen-code-termux installed successfully');
  console.log('Run: qwen');
}
