# Qwen Code Termux

[![npm version](https://img.shields.io/npm/v/@mmmbuto/qwen-code-termux.svg)](https://www.npmjs.com/package/@mmmbuto/qwen-code-termux)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](./LICENSE)

Termux-first build of [Qwen Code](https://github.com/QwenLM/qwen-code) for
Android ARM64.

This fork tracks upstream release-by-release and keeps the fork delta limited to
Android/Termux compatibility, packaging, and validation assets.

Current fork release: `0.16.1-termux`.

## Release Channel

`main` follows upstream stable releases. Upstream preview and nightly builds are
tracked only for analysis unless a Termux-specific validation pass decides to
publish a separate prerelease.

Current upstream baseline: `QwenLM/qwen-code` `v0.16.1`.

## Install

```bash
pkg install nodejs-lts
pkg install termux-api   # optional, only for TTS notifications

npm install -g @mmmbuto/qwen-code-termux@latest
qwen --version
```

Requirements:

- Termux from F-Droid
- Node.js 20+
- `termux-api` only if you want `termux-tts-speak` integration

For non-Termux platforms, use upstream:

```bash
npm install -g @qwen-code/qwen-code
```

## Usage

```bash
cd your-project
qwen
```

Headless:

```bash
qwen -p "Explain this project" -o json
```

Useful slash commands:

- `/help`
- `/auth`
- `/model`

## Authentication

Qwen Code Termux keeps upstream Qwen Code authentication behavior.

Interactive auth:

```text
/auth
```

API-key auth can be configured through `~/.qwen/settings.json` or environment
variables supported by upstream providers.

For Alibaba Cloud ModelStudio / DashScope:

```bash
export DASHSCOPE_API_KEY="YOUR_API_KEY"
qwen
```

Qwen OAuth free tier was discontinued upstream on April 15, 2026. Use Alibaba
Cloud Coding Plan, OpenRouter, Fireworks AI, or another configured API provider.

## Termux Delta

This fork adds or preserves:

- Android ARM64 PTY fallback through `@mmmbuto/node-pty-android-arm64`
- optional `tts_notification` support backed by `termux-tts-speak`
- Termux environment detection for runtime-specific behavior
- Android/Termux runtime patch bootstrap
- npm publish package metadata under `@mmmbuto/qwen-code-termux`
- release validation docs under `test-reports/`

After upstream merges or release prep, verify the fork delta with:

```bash
bash scripts/check-termux-patches.sh
```

## Build

```bash
git clone https://github.com/DioNanos/qwen-code-termux.git
cd qwen-code-termux
npm install
npm run build
npm run bundle
npm run prepare:package
node dist/cli.js --version
```

The publishable npm artifact is prepared under `dist/`.

## Release Validation

The public validation history lives in:

- [test-reports/README.md](test-reports/README.md)
- [test-reports/suites/latest/termux.md](test-reports/suites/latest/termux.md)

Minimum smoke:

```bash
qwen --version
qwen --help
qwen -p "Reply with OK"
```

## Maintenance Scope

In scope for this fork:

- Android/Termux runtime compatibility
- npm package `@mmmbuto/qwen-code-termux`
- Termux validation reports and release assets
- minimal fork-owned GitHub CI/release automation

Out of scope:

- generic Qwen Code feature requests
- upstream product behavior unrelated to Termux
- upstream Alibaba/Qwen infrastructure, bots, or release workflows
- SDK, VS Code extension, channel, or Docker image publishing from this fork

Generic issues should be filed upstream at
[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code). Termux-specific issues
should be filed here.

## Security

See [SECURITY.md](SECURITY.md).

Termux-fork-specific security reports: `security@mmmbuto.com`.

Upstream-relevant security reports should follow the upstream Alibaba/Qwen
security process described in `SECURITY.md`.

## Maintainer

Maintained by [DioNanos](https://github.com/DioNanos) as the Termux/Android
porting and distribution fork.

See [MAINTAINER.md](MAINTAINER.md) and [NOTICE](NOTICE).

## License

Apache-2.0. This fork is distributed under the same license as upstream Qwen
Code. The Android/Termux compatibility patches are distributed under Apache-2.0.
