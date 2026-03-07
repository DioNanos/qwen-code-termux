<div align="center">

[![npm version](https://img.shields.io/npm/v/@mmmbuto/qwen-code-termux.svg)](https://www.npmjs.com/package/@mmmbuto/qwen-code-termux)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](./LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![Downloads](https://img.shields.io/npm/dm/@mmmbuto/qwen-code-termux.svg)](https://www.npmjs.com/package/@mmmbuto/qwen-code-termux)

**An open-source AI agent that lives in your terminal — Termux Edition (Android).**

<a href="https://qwenlm.github.io/qwen-code-docs/zh/users/overview">中文</a> |
<a href="https://qwenlm.github.io/qwen-code-docs/de/users/overview">Deutsch</a> |
<a href="https://qwenlm.github.io/qwen-code-docs/fr/users/overview">français</a> |
<a href="https://qwenlm.github.io/qwen-code-docs/ja/users/overview">日本語</a> |
<a href="https://qwenlm.github.io/qwen-code-docs/ru/users/overview">Русский</a> |
<a href="https://qwenlm.github.io/qwen-code-docs/pt-BR/users/overview">Português (Brasil)</a>

</div>

Qwen Code is an open-source AI agent for the terminal, optimized for **Qwen3-Coder**.  
This repository/package is a **Termux-first build** that keeps upstream behavior, while fixing the parts that commonly break on Android/Termux (notably PTY and a few runtime quirks).

> **Not on Termux?** Use upstream: `npm install -g @qwen-code/qwen-code@latest` (or Homebrew).  
> **On Termux?** Use this package: `npm install -g @mmmbuto/qwen-code-termux@latest`.

![](https://gw.alicdn.com/imgextra/i1/O1CN01D2DviS1wwtEtMwIzJ_!!6000000006373-2-tps-1600-900.png)

## Why a Termux Edition?

Upstream Qwen Code targets macOS/Linux/Windows. On Android/Termux, installs may fail due to native dependency issues (PTY / build tooling) and small environment differences.

Termux Edition focuses on:

- **Android PTY support** via `node-pty-android-arm64` (optional dependency)
- **Termux runtime patches** (polyfills/quirks, clipboard behavior)
- **Termux-safe install** (avoid node-gyp/husky pitfalls where possible)
- **Tested on-device** — see [test-reports/0.11.3-termux/](test-reports/0.11.3-termux/README.md)

## Installation (Termux / Android)

### Prerequisites

- Termux (recommended from F-Droid)
- Node.js **20+** (Termux `nodejs-lts` is recommended)

```bash
pkg update -y && pkg upgrade -y
pkg install -y nodejs-lts git
```

Optional (recommended) for extra tools:

- Install the **Termux:API** Android app
- Install the Termux package:

```bash
pkg install -y termux-api
```

### Install

```bash
npm install -g @mmmbuto/qwen-code-termux@latest
qwen --version
```

## Quick Start

```bash
qwen              # Interactive
qwen -p "Hello"   # Non-interactive
qwen /help        # Commands
qwen /auth        # Authentication
```

## Resources

- **Test Reports**: [test-reports/0.11.3-termux/](test-reports/0.11.3-termux/README.md)
- **Patches**: [patches/](patches/README.md)
- **Build**: [docs/developers/BUILDING.md](docs/developers/BUILDING.md)
- **Config**: [docs/users/configuration.md](docs/users/configuration.md)

---

## Changelog & Releases

- [CHANGELOG.md](./CHANGELOG.md)

## Troubleshooting

If you encounter issues, check the [upstream troubleshooting guide](https://qwenlm.github.io/qwen-code-docs/en/users/support/troubleshooting/).

To report a bug from within the CLI, run `/bug`.

## Support

If this Termux edition helps you, you can support the project on Ko-fi:

- https://ko-fi.com/dionanos

## Connect with Upstream

- Discord: https://discord.gg/ycKBjdNd
- Dingtalk: https://qr.dingtalk.com/action/joingroup?code=v1,k1,+FX6Gf/ZDlTahTIRi8AEQhIaBlqykA0j+eBKKdhLeAE=&_dt_no_comment=1&origin=1

## Acknowledgments

This project is based on [Google Gemini CLI](https://github.com/google-gemini/gemini-cli). We acknowledge and appreciate the excellent work of the Gemini CLI team. Our main contribution focuses on parser-level adaptations to better support Qwen-Coder models.

---

## License

Original project by Qwen Team: https://github.com/QwenLM/qwen-code<br>
Apache License 2.0 (upstream Qwen Code)<br>
Termux-port maintenance by WellaNet.Dev<br>
See [LICENSE](./LICENSE) for details and upstream terms.<br>
Made in Italy 🇮🇹
