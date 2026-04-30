# Building qwen-code-termux

This fork is rebuilt from upstream tags. `v0.14.1-termux` is based on upstream `v0.14.1` plus a minimal Termux patch set.

## Prerequisites

- Node.js 20+
- npm 9+
- Git
- On Termux: `pkg install nodejs-lts`
- Optional on Termux: `pkg install termux-api`

## Build

```bash
git clone https://github.com/DioNanos/qwen-code-termux.git
cd qwen-code-termux
npm install
npm run build
npm run bundle
```

## Publishable package

The npm package is prepared from the root release metadata:

- package name: `@mmmbuto/qwen-code-termux`
- version: `0.14.1-termux`
- npm README source: root `README.md`

Package preparation:

```bash
npm run prepare:package
```

## Termux notes

- PTY fallback includes `@mmmbuto/node-pty-android-arm64`
- `tts_notification` requires `termux-api`
- release validation should be run from inside Termux, not inferred from desktop CI only

## Validation docs

Use these files together:

- [test-reports/README.md](../../test-reports/README.md)
- [test-reports/suites/latest/termux.md](../../test-reports/suites/latest/termux.md)
- [test-reports/latest/0.14.1-termux/QWEN_TEST_REPORT_v0.14.1-termux.md](../../test-reports/latest/0.14.1-termux/QWEN_TEST_REPORT_v0.14.1-termux.md)
