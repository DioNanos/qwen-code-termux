<div align="center">

[![npm version](https://img.shields.io/npm/v/@mmmbuto/qwen-code-termux.svg)](https://www.npmjs.com/package/@mmmbuto/qwen-code-termux)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](./LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![Downloads](https://img.shields.io/npm/dm/@mmmbuto/qwen-code-termux.svg)](https://www.npmjs.com/package/@mmmbuto/qwen-code-termux)

**An open-source AI agent that lives in your terminal — Termux Edition (Android).**

</div>

> News (2026-04-10): `v0.14.3-termux` rebuilt from upstream `v0.14.3`. New: compactMode (ex verboseMode), status-line customization, `/model --fast`, plan mode improvements, review skill improvements, adaptive token escalation, qwen3.6-plus model.

Qwen Code Termux is a clean fork of [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code), rebuilt release-by-release from upstream and patched only where Android/Termux needs different behavior.

## Why a Termux fork?

Upstream targets desktop Unix and Windows first. On Android/Termux, the main breakpoints are:

- PTY availability on ARM64
- install-time scripts that are fine on desktop but noisy on Termux
- attention/notification workflows that are useful on mobile

This fork keeps upstream behavior as close as possible while adding:

- Android ARM64 PTY fallback via `@mmmbuto/node-pty-android-arm64`
- optional `tts_notification` tool backed by `termux-tts-speak`
- Termux environment detection for runtime-specific behavior
- release docs and test suites intended to be run directly inside Termux

## Installation

### Termux / Android

```bash
pkg install nodejs-lts
pkg install termux-api   # optional, only for TTS

npm install -g @mmmbuto/qwen-code-termux@latest
qwen --version
```

Requirements:

- [Termux from F-Droid](https://f-droid.org/packages/com.termux/)
- Node.js 20+
- `termux-api` only if you want TTS notifications

### Non-Termux platforms

Use upstream:

```bash
npm install -g @qwen-code/qwen-code@latest
```

## Quick Start

```bash
cd your-project
qwen
```

Useful first commands:

- `/help`
- `/auth`
- `/model`

## Authentication

For headless or Termux-heavy workflows, API-key auth is the practical default.

Example `~/.qwen/settings.json`:

```json
{
  "modelProviders": {
    "openai": [
      {
        "id": "qwen3.6-plus",
        "name": "qwen3.6-plus",
        "baseUrl": "https://dashscope.aliyuncs.com/compatible-mode/v1",
        "description": "Qwen via DashScope OpenAI-compatible API",
        "envKey": "DASHSCOPE_API_KEY"
      }
    ]
  },
  "env": {
    "DASHSCOPE_API_KEY": "sk-your-key"
  },
  "security": {
    "auth": {
      "selectedType": "openai"
    }
  },
  "model": {
    "name": "qwen3.6-plus"
  }
}
```

OAuth still works where a browser is available, but API-key auth is the safer recommendation on Termux and over SSH.

## Termux-specific features

### TTS notifications

If `termux-api` is installed, the fork exposes a `tts_notification` tool that can speak short alerts:

```bash
termux-tts-speak "Qwen Code Termux ready"
```

### PTY fallback

The fork keeps upstream PTY loading first, then falls back to `@mmmbuto/node-pty-android-arm64` for Android ARM64.

### Release testing from Termux

Run the documented Termux release checks from:

- [docs/developers/BUILDING.md](docs/developers/BUILDING.md)
- [test-reports/README.md](test-reports/README.md)
- [test-reports/suites/latest/termux.md](test-reports/suites/latest/termux.md)

## Building from source

```bash
git clone https://github.com/DioNanos/qwen-code-termux.git
cd qwen-code-termux
npm install
npm run build
npm run bundle
```

See [docs/developers/BUILDING.md](docs/developers/BUILDING.md) for the fork-specific notes.

## Troubleshooting

- If you are not on Termux, install upstream instead of this fork.
- If shell execution is broken on Android, verify the PTY dependency is present.
- If TTS does nothing, install `termux-api` and check `termux-tts-speak`.
- For release validation, use the Termux suite in [test-reports/suites/latest/termux.md](test-reports/suites/latest/termux.md).

## Acknowledgments

This fork is based on [Qwen Code](https://github.com/QwenLM/qwen-code) and exists to keep a release-quality Termux track with minimal divergence from upstream.

## License

Apache-2.0
