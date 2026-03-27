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

> 🎉 **News (2026-03-27)**: Termux Edition v0.13.1 is here! TTS notifications,
> full upstream v0.13.1 sync, and a streamlined install experience on Android.

Qwen Code is an open-source AI agent for the terminal, optimized for [Qwen3-Coder](https://github.com/QwenLM/Qwen3-Coder).
This **Termux Edition** fork keeps upstream behaviour while fixing what breaks on Android/Termux.

## Why a Termux Edition?

Upstream Qwen Code targets macOS/Linux/Windows. On Android/Termux, installs fail due to
native dependency issues (PTY, node-gyp) and environment quirks.

Termux Edition fixes:

- **Android PTY support** via `@mmmbuto/pty-termux-utils`
- **Termux runtime patches** (base64 polyfills, character encoding)
- **Termux-safe install** (skips husky + sandbox bundle on npm install)
- **TTS Notifications** — speak completion/alerts via `termux-tts-speak`
- **Tested on-device** — see [test-reports/](test-reports/)

## Installation (Termux / Android)

```bash
# Requires: Termux (F-Droid), Node.js 20+
npm install -g @mmmbuto/qwen-code-termux@latest
qwen --version
```

**Requirements:**

- [Termux (F-Droid)](https://f-droid.org/packages/com.termux/) — Google Play version has issues
- Node.js 20+ (`pkg install nodejs-lts`)
- `termux-api` package (optional, for TTS): `pkg install termux-api`

> **Not on Termux?** Use upstream instead:
> `npm install -g @qwen-code/qwen-code@latest`

## Installation (Linux / macOS / Windows)

For non-Termux platforms, use the official upstream:

```bash
# Linux / macOS
bash -c "$(curl -fsSL https://qwen-code-assets.oss-cn-hangzhou.aliyuncs.com/installation/install-qwen.sh)"

# Windows (Admin CMD)
curl -fsSL -o %TEMP%\install-qwen.bat https://qwen-code-assets.oss-cn-hangzhou.aliyuncs.com/installation/install-qwen.bat && %TEMP%\install-qwen.bat
```

Or via Homebrew:

```bash
brew install qwen-code
```

## Quick Start

```bash
cd your-project/
qwen

# Then inside the session:
/help
/auth
```

On first use, you'll be prompted to sign in. Run `/auth` anytime to switch auth method.

Example prompts:

```text
What does this project do?
Explain the codebase structure.
Help me refactor this function.
Generate unit tests for this module.
```

## Authentication

Two methods — API-KEY is recommended for headless/Termux environments.

### API-KEY (recommended)

Set up `~/.qwen/settings.json`:

```json
{
  "modelProviders": {
    "openai": [
      {
        "id": "qwen3.5-plus",
        "name": "qwen3.5-plus",
        "baseUrl": "https://dashscope.aliyuncs.com/compatible-mode/v1"
      }
    ]
  },
  "env": {
    "DASHSCOPE_API_KEY": "sk-your-key"
  },
  "security": { "auth": { "selectedType": "openai" } },
  "model": { "name": "qwen3.5-plus" }
}
```

### Qwen OAuth

```bash
qwen
/auth
# Complete browser flow
```

> OAuth requires a browser — not available over SSH/headless. Use API-KEY instead.

## Usage

### Interactive mode

```bash
qwen
# Use @ to reference files: @src/main.ts
```

### Headless mode

```bash
qwen -p "your question"
```

### Session commands

| Command     | Description                     |
| ----------- | ------------------------------- |
| `/help`     | Available commands              |
| `/clear`    | Clear history                   |
| `/compress` | Compress history to save tokens |
| `/stats`    | Session info                    |
| `/bug`      | Submit bug report               |
| `/exit`     | Quit                            |

### Keyboard shortcuts

- `Ctrl+C` — Cancel operation
- `Ctrl+D` — Exit (empty line)
- `Up/Down` — Command history

## Termux-Specific Features

### TTS Notifications

When a task completes or needs your attention, Qwen Code can speak a notification
using Android's text-to-speech engine:

```bash
# Install termux-api for TTS
pkg install termux-api

# TTS is used automatically by the tts_notification tool
```

### PTY Support

Shell execution uses a PTY (pseudo-terminal) for proper ANSI colour and interactive
command support. On Termux, PTY deps are auto-installed on first `npm install`.

### Runtime Patches

| File                                          | Purpose                        |
| --------------------------------------------- | ------------------------------ |
| `packages/core/src/patches/termux-runtime.ts` | Android base64 polyfill        |
| `scripts/prepare-termux.cjs`                  | Skip husky + bundle on Termux  |
| `scripts/postinstall.cjs`                     | Termux install confirmation    |
| `packages/core/src/utils/termux-detect.ts`    | `isTermux()` detection utility |

## Building from Source

```bash
git clone https://github.com/DioNanos/qwen-code-termux.git
cd qwen-code-termux
npm install
npm run build
npm run bundle

# Install globally
npm install -g
```

See [docs/developers/BUILDING.md](docs/developers/BUILDING.md) for full details.

## Configuration

| File                    | Scope   | Description                   |
| ----------------------- | ------- | ----------------------------- |
| `~/.qwen/settings.json` | User    | Global settings (recommended) |
| `.qwen/settings.json`   | Project | Project-level overrides       |

See the [authentication guide](https://qwenlm.github.io/qwen-code-docs/en/users/configuration/auth/) for all options.

> **Security note:** Never commit API keys to version control.

## Troubleshooting

- [Qwen Code docs](https://qwenlm.github.io/qwen-code-docs/en/users/support/troubleshooting/)
- From the CLI: run `/bug` for a bug report template
- [Test reports](test-reports/) — Termux-specific test results

## Ecosystem

- [**AionUi**](https://github.com/iOfficeAI/AionUi) — Modern GUI for Qwen Code
- [**Gemini CLI Desktop**](https://github.com/Piebald-AI/gemini-cli-desktop) — Cross-platform desktop UI

## Connect

- [Discord](https://discord.gg/RN7tqZCeDK)
- [Dingtalk](https://qr.dingtalk.com/action/joingroup?code=v1,k1,+FX6Gf/ZDlTahTIRi8AEQhIaBlqykA0j+eBKKdhLeAE=&_dt_no_comment=1&origin=1)

## Acknowledgments

This project is based on [Google Gemini CLI](https://github.com/google-gemini/gemini-cli) and
[Qwen Code](https://github.com/QwenLM/qwen-code). We acknowledge and appreciate the excellent
work of both teams. This fork focuses on Termux/Android compatibility and Termux-specific
features.

## License

Apache-2.0 — see [LICENSE](./LICENSE)
