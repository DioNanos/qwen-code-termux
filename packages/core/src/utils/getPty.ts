/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// Re-export from @mmmbuto/pty-termux-utils for unified PTY handling
export type { PtyImplementation, IPty } from '@mmmbuto/pty-termux-utils';
export { getPty, spawnPty } from '@mmmbuto/pty-termux-utils';
