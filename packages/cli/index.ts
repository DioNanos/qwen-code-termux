#!/usr/bin/env node

/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// TERMUX PATCH: Suppress DEP0169 (url.parse deprecation) from bundled deps
// node-fetch, normalize-package-data, form-data still use the legacy url.parse() API.
const origEmit = process.emit.bind(process) as (
  event: string,
  ...args: unknown[]
) => boolean;
process.emit = function (event: string, ...args: unknown[]): boolean {
  if (
    event === 'warning' &&
    args[0] &&
    typeof args[0] === 'object' &&
    (args[0] as { name?: string }).name === 'DeprecationWarning' &&
    (args[0] as { code?: string }).code === 'DEP0169'
  ) {
    return false;
  }
  return origEmit(event, ...args);
} as typeof process.emit;

import { runCliEntryPoint } from './src/cli.js';

// --- Global Entry Point ---

void runCliEntryPoint();
