/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// TERMUX: Minimal install message
const os = require('node:os');

if (os.platform() === 'android' || process.env.PREFIX?.includes('com.termux')) {
  console.log('✓ qwen-code-termux installed');
  console.log('  PTY: @mmmbuto/node-pty-android-arm64');
  console.log('  Run: qwen');
}
