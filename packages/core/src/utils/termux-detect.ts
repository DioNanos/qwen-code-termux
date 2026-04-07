/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

export function isTermux(): boolean {
  return (
    process.platform === 'android' ||
    !!process.env['TERMUX_VERSION'] ||
    !!(process.env['PREFIX'] && process.env['PREFIX'].includes('com.termux'))
  );
}
