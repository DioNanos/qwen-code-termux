/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// TERMUX PATCH: Utilities for detecting Termux environment

export interface TermuxEnvironment {
  isTermux: boolean;
  hasTermuxApi: boolean;
  apiVersion?: string;
  prefix: string;
  availableCommands: string[];
}

/**
 * Detect if running in Termux environment
 */
export function isTermux(): boolean {
  return (
    process.platform === 'android' ||
    !!process.env['TERMUX_VERSION'] ||
    !!(process.env['PREFIX'] && process.env['PREFIX'].includes('com.termux'))
  );
}
