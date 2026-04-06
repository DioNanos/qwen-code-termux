/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// TERMUX PATCH: Android/Termux PTY fallback chain
// 1. @lydell/node-pty (standard — works on Linux/macOS/Windows)
// 2. @mmmbuto/node-pty-android-arm64 (Termux/Android ARM64 — our fork)
// 3. node-pty (original microsoft fork — fallback)
// 4. null (PTY not supported)

export type PtyImplementation = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  module: any;
  name: 'lydell-node-pty' | 'mmmbuto-android-arm64' | 'node-pty';
} | null;

export interface PtyProcess {
  readonly pid: number;
  onData(callback: (data: string) => void): void;
  onExit(callback: (e: { exitCode: number; signal?: number }) => void): void;
  kill(signal?: string): void;
}

export const getPty = async (): Promise<PtyImplementation> => {
  // Try @lydell/node-pty first (standard)
  try {
    const lydell = '@lydell/node-pty';
    const module = await import(lydell);
    return { module, name: 'lydell-node-pty' };
  } catch (_e) {
    // TERMUX PATCH: Try our Android ARM64 fork
    try {
      const mmmbuto = '@mmmbuto/node-pty-android-arm64';
      const module = await import(mmmbuto);
      return { module, name: 'mmmbuto-android-arm64' };
    } catch (_e2) {
      // Final fallback: standard node-pty
      try {
        const nodePty = 'node-pty';
        const module = await import(nodePty);
        return { module, name: 'node-pty' };
      } catch (_e3) {
        return null;
      }
    }
  }
};
