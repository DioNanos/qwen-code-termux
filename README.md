# 🤖 Qwen Code – Termux Edition

Android/Termux optimized fork of Qwen Code CLI. Installs cleanly on Termux
by skipping native modules and using mobile‑friendly fallbacks.

[![npm](https://img.shields.io/npm/v/@mmmbuto/qwen-code-termux?style=flat-square&logo=npm)](https://www.npmjs.com/package/@mmmbuto/qwen-code-termux)
[![downloads](https://img.shields.io/npm/dt/@mmmbuto/qwen-code-termux?style=flat-square)](https://www.npmjs.com/package/@mmmbuto/qwen-code-termux)
[![ko-fi](https://img.shields.io/badge/☕_Support-Ko--fi-FF5E5B?style=flat-square&logo=ko-fi)](https://ko-fi.com/dionanos)

---

## What This Is

**Optimized Termux edition** of `QwenLM/qwen-code`.

- **Termux‑First:** Android filesystem and shell fallbacks.
- **Lightweight:** No native PTY/keychain deps.
- **Up‑to‑Date:** Tracks upstream Qwen Code.

## Installation (Termux)

```bash
pkg update && pkg upgrade -y
pkg install nodejs-lts -y
npm install -g @mmmbuto/qwen-code-termux

qwen --version  # expected: 0.6.2-termux
```

Build from source:

```bash
git clone https://github.com/DioNanos/qwen-code-termux.git
cd qwen-code-termux
npm install --ignore-optional --ignore-scripts
npm run build && npm run bundle
node dist/cli.js --version
```

## Quick Start

```bash
qwen
# then
/help
/auth
```

## Termux Optimizations

- **OAuth:** browser launch via `termux-open-url` with Android fallback.
- **Clean UX:** desktop‑centric warnings suppressed on Termux.
- **Defaults:** banner hidden by default on Termux (toggle in settings).

## Documentation & Fixes

- **Test Suite**: [`QWEN_TEST_SUITE.md`](./QWEN_TEST_SUITE.md)
- **Test Report**: [`QWEN_TEST_REPORT_v0.6.2.md`](./QWEN_TEST_REPORT_v0.6.2.md)
- **Patches**: [`docs/patches/README.md`](./docs/patches/README.md)

## Updating

```bash
npm install -g @mmmbuto/qwen-code-termux@latest
```

### Versions

- **latest / stable**: 0.6.2-termux

## License

Apache 2.0 (same as upstream). See LICENSE.

## Acknowledgments

Based on [Qwen Code](https://github.com/QwenLM/qwen-code), which is based on
[Google Gemini CLI](https://github.com/google-gemini/gemini-cli).
