/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['scripts/tests/**/*.test.{js,ts}'],
    // Script tests that drive Linux-only CI (ubuntu-latest workflow jobs, or
    // bash/shell fixtures Windows cannot express) fail on a Windows runner.
    // Linux CI remains their authoritative coverage.
    exclude:
      process.platform === 'win32'
        ? [
            ...configDefaults.exclude,
            'scripts/tests/pr-self-report-label.test.js',
            // Bash-driven workflow suites cannot run on Windows; pure
            // YAML-parse workflow suites still do.
            'scripts/tests/qwen-*-workflow.test.js',
            'scripts/tests/serve-ab-workflow.test.js',
          ]
        : [
            ...configDefaults.exclude,
            // Fork exclusion: these suites guard the upstream CI topology
            // (full ci.yml, npm-publish ratchet, platform lanes). The fork's
            // ci.yml is a manual-only reference workflow and its active gate
            // is termux-ci.yml — the fork invariants live in
            // termux-release-workflows.test.js, which stays enabled.
            'scripts/tests/capture-tmux-ci.test.js',
            'scripts/tests/workflow-size.test.js',
            'scripts/tests/ci-platform-lanes.test.js',
            'scripts/tests/no-ak-integration-ci.test.js',
            'scripts/tests/qwen-triage-workflow.test.js',
            'scripts/tests/review-worktree-cleanup-workflow.test.js',
            // Upstream autofix workflow guard: its behavioral stale-gate
            // replay suite re-runs the gate extracted verbatim from
            // qwen-autofix.yml, which now embeds the workflow-size gate
            // (~6s per replay on this tree; ~10 replays ≈ 70s against the
            // 30s suite testTimeout). The fork's autofix bridge guards stay
            // enabled in qwen-autofix-fork-bridge-workflow.test.js.
            'scripts/tests/qwen-autofix-workflow.test.js',
          ],
    setupFiles: ['scripts/tests/test-setup.ts'],
    // Several tests in install-script.test.js shell out to `node` to run
    // create-standalone-package.js, which on Windows runs a full
    // tar+gzip pass under antivirus inspection. Real runtimes observed on
    // Windows CI: 4780ms / 1666ms / 1079ms — the 4.8s one is right at
    // vitest's 5s default and flakes. Bump the suite timeout so a single
    // slow subprocess startup doesn't fail an otherwise-healthy test run.
    testTimeout: 30_000,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
    // No poolOptions override: the fixed 8-16 worker floor it used to carry
    // oversubscribes the 3-core macOS runners. Vitest's default scales with
    // the host cores, which is what every other suite in this repository
    // uses.
    //
    // The long fake-timer suites here stall a worker's event loop long
    // enough for vitest's worker->main `onTaskUpdate` RPC to hit its 60s
    // timeout and surface as an unhandled error — with every test in the
    // suite green, yet the run exiting 1 (observed deterministic on the
    // macOS runners). Test failures still fail the run; only unhandled
    // errors stop being fatal, and only off Linux — the ubuntu lane and
    // Linux local runs keep the unhandled-error signal.
    dangerouslyIgnoreUnhandledErrors: process.platform !== 'linux',
  },
});
