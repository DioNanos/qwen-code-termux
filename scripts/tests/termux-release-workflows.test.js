/**
 * @license
 * Copyright 2026 Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 */

import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';

const ROOT = path.resolve(import.meta.dirname, '../..');

function loadWorkflow(name) {
  return parse(
    readFileSync(path.join(ROOT, '.github/workflows', name), 'utf8'),
  );
}

function jobCommands(job) {
  return job.steps.map((step) => step.run ?? '').join('\n');
}

describe('Termux release workflows', () => {
  it('keeps the upstream multi-platform workflow manual-only', () => {
    const workflow = loadWorkflow('ci.yml');

    expect(Object.keys(workflow.on)).toEqual(['workflow_dispatch']);
  });

  it('prevents upstream automatic workloads from running on the public fork', () => {
    const e2e = loadWorkflow('e2e.yml');
    const npmCache = loadWorkflow('npm-cache.yml');
    const sdkJava = loadWorkflow('sdk-java.yml');
    const sdkPython = loadWorkflow('sdk-python.yml');
    const image = loadWorkflow('build-and-publish-image.yml');
    const pages = loadWorkflow('docs-page-action.yml');

    for (const job of Object.values(e2e.jobs)) {
      expect(job.if).toContain("github.repository == 'QwenLM/qwen-code'");
    }
    expect(npmCache.jobs.save.if).toContain(
      "github.repository == 'QwenLM/qwen-code'",
    );
    for (const job of Object.values(sdkJava.jobs)) {
      expect(job.if).toContain("github.repository == 'QwenLM/qwen-code'");
    }
    for (const job of Object.values(sdkPython.jobs)) {
      expect(job.if).toContain("github.repository == 'QwenLM/qwen-code'");
    }
    expect(image.jobs['build-and-push-to-ghcr'].if).toContain(
      "github.repository == 'QwenLM/qwen-code'",
    );
    expect(pages.jobs.build.if).toContain(
      "github.repository == 'QwenLM/qwen-code'",
    );
  });

  it('keeps Termux CI as the only effective main-push workflow on the fork', () => {
    const workflowsDir = path.join(ROOT, '.github/workflows');
    const mainPushJobs = [];

    for (const name of readdirSync(workflowsDir).filter((entry) =>
      /\.ya?ml$/.test(entry),
    )) {
      const workflow = loadWorkflow(name);
      const branches = workflow.on?.push?.branches;
      const branchList = Array.isArray(branches) ? branches : [branches];
      if (!branchList.includes('main')) {
        continue;
      }
      for (const [jobName, job] of Object.entries(workflow.jobs ?? {})) {
        mainPushJobs.push({ name, jobName, condition: job.if ?? '' });
      }
    }

    const unguarded = mainPushJobs
      .filter(
        ({ condition }) =>
          !condition.includes("github.repository == 'QwenLM/qwen-code'"),
      )
      .map(({ name, jobName }) => `${name}:${jobName}`);

    expect(mainPushJobs.length).toBeGreaterThan(1);
    expect(unguarded).toEqual(['termux-ci.yml:release-gate']);
  });

  it('runs the automatic gate only on hosted Linux with the full contract', () => {
    const workflow = loadWorkflow('termux-ci.yml');
    const job = workflow.jobs['release-gate'];
    const commands = jobCommands(job);

    expect(Object.keys(workflow.on).sort()).toEqual([
      'pull_request',
      'push',
      'workflow_dispatch',
    ]);
    expect(job['runs-on']).toBe('ubuntu-latest');
    expect(JSON.stringify(workflow)).not.toMatch(
      /(?:windows|macos|self-hosted)/i,
    );
    for (const command of [
      'bash scripts/check-termux-patches.sh',
      'npm run lint:ci',
      'npm run build',
      'npm run typecheck',
      'npm run test:ci',
      'npm run test:integration:no-ak:sandbox:none',
      'npm run audit:runtime:critical',
      'npm run bundle',
      'npm run prepare:package',
      'npm pack --json',
      'npm@12.0.2 install --global',
      '--prefix "${smoke_prefix}"',
      '--dangerously-allow-all-scripts',
      "! grep -Fq 'had install scripts blocked'",
      '--version',
      '--help',
    ]) {
      expect(commands).toContain(command);
    }
    expect(commands.indexOf('npm run bundle')).toBeLessThan(
      commands.indexOf('npm run test:integration:no-ak:sandbox:none'),
    );
    expect(commands).not.toContain('npm publish');
  });

  it('publishes the exact tarball only after rebuilding the same gate', () => {
    const workflow = loadWorkflow('npm-publish.yml');
    const job = workflow.jobs.publish;
    const commands = jobCommands(job);

    expect(Object.keys(workflow.on)).toEqual(['workflow_dispatch']);
    expect(job['runs-on']).toBe('ubuntu-latest');
    for (const command of [
      'bash scripts/check-termux-patches.sh',
      'npm run lint:ci',
      'npm run build',
      'npm run typecheck',
      'npm run test:ci',
      'npm run test:integration:no-ak:sandbox:none',
      'npm run audit:runtime:critical',
      'npm pack --json',
      'npm@12.0.2 install --global',
      '--prefix "${smoke_prefix}"',
      '--dangerously-allow-all-scripts',
      "! grep -Fq 'had install scripts blocked'",
      'npm publish "${{ steps.pack.outputs.tarball }}"',
    ]) {
      expect(commands).toContain(command);
    }
    expect(commands.indexOf('npm run bundle')).toBeLessThan(
      commands.indexOf('npm run test:integration:no-ak:sandbox:none'),
    );
  });

  it('documents the npm 12 registry allowlist without a blanket override', () => {
    const readme = readFileSync(path.join(ROOT, 'README.md'), 'utf8');

    expect(readme).toContain(
      '--allow-scripts=@mmmbuto/qwen-code-termux,@mmmbuto/node-pty-android-arm64,sharp',
    );
    expect(readme).toContain('npm 12 blocks install scripts by default');
    expect(readme).not.toContain('--dangerously-allow-all-scripts');
  });
});
