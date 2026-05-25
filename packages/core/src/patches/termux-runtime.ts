/**
 * @license
 * Copyright 2026 Qwen
 * Copyright 2026 Davide A. Guglielmi (Termux porting patches)
 * SPDX-License-Identifier: Apache-2.0
 */

// TERMUX PATCH: Android/Termux runtime polyfills

// Polyfill for Android's base64 handling
if (typeof globalThis.btoa === 'undefined' && typeof btoa !== 'undefined') {
  globalThis.btoa = btoa;
}

if (typeof globalThis.atob === 'undefined' && typeof atob !== 'undefined') {
  globalThis.atob = atob;
}
