# 🤖 Qwen Code – Termux Edition

Android/Termux optimized fork of Qwen Code CLI. Installs cleanly on Termux
with a native ARM64 PTY prebuild and mobile‑friendly fallbacks.

[![npm](https://img.shields.io/npm/v/@mmmbuto/qwen-code-termux?style=flat-square&logo=npm)](https://www.npmjs.com/package/@mmmbuto/qwen-code-termux)
[![downloads](https://img.shields.io/npm/dt/@mmmbuto/qwen-code-termux?style=flat-square)](https://www.npmjs.com/package/@mmmbuto/qwen-code-termux)
[![ko-fi](https://img.shields.io/badge/☕_Support-Ko--fi-FF5E5B?style=flat-square&logo=ko-fi)](https://ko-fi.com/dionanos)

---

## What This Is

**Optimized Termux edition** of `QwenLM/qwen-code`.

- **Termux‑First:** Android filesystem and shell fallbacks.
- **Lightweight:** PTY via `@mmmbuto/node-pty-android-arm64`, no keychain deps.
- **Up‑to‑Date:** Tracks upstream Qwen Code.

## Installation (Termux)

```bash
pkg update && pkg upgrade -y
pkg install nodejs-lts -y
npm install -g @mmmbuto/qwen-code-termux

qwen --version  # expected: 0.6.405-termux
```

Build from source:

```bash
git clone https://github.com/DioNanos/qwen-code-termux.git
cd qwen-code-termux
npm install
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

## Authentication

Qwen Code supports two authentication methods:

- **Qwen OAuth (recommended & free)**: sign in with your `qwen.ai` account in a browser.
- **OpenAI-compatible API**: use `OPENAI_API_KEY` (and optionally a custom base URL / model).

### Qwen OAuth (recommended)

Start `qwen`, then run:

```bash
/auth
```

Choose **Qwen OAuth** and complete the browser flow. On Termux, the browser opens via `termux-open-url` with an Android fallback. Your credentials are cached locally.

### OpenAI-compatible API (API key)

Environment variables (recommended for CI / headless environments):

```bash
export OPENAI_API_KEY="your-api-key-here"
export OPENAI_BASE_URL="https://api.openai.com/v1"  # optional
export OPENAI_MODEL="gpt-4o"                        # optional
```

## Termux Optimizations

- **OAuth:** browser launch via `termux-open-url` with Android fallback.
- **Clean UX:** desktop‑centric warnings suppressed on Termux.
- **Defaults:** banner hidden by default on Termux (toggle in settings).
- **PTY:** prebuilt `@mmmbuto/node-pty-android-arm64` for interactive shells.

## Documentation & Fixes

- **Test Suite**: [`QWEN_TEST_SUITE.md`](./QWEN_TEST_SUITE.md)
- **Test Report**: [`QWEN_TEST_REPORT_v0.6.405-termux.md`](./QWEN_TEST_REPORT_v0.6.405-termux.md)
  (latest report; 0.6.405-termux)
- **Patches**: [`docs/patches/README.md`](./docs/patches/README.md)
- **Termux Fixes**: [`docs/patches/TERMUX_FIXES.md`](./docs/patches/TERMUX_FIXES.md)

## Usage

As an open-source terminal agent, you can use Qwen Code in four primary ways:

1. Interactive mode (terminal UI)
2. Headless mode (scripts, CI)
3. IDE integration (VS Code, Zed)
4. TypeScript SDK

#### Interactive mode

```bash
cd your-project/
qwen
```

Run `qwen` in your project folder to launch the interactive terminal UI. Use `@` to reference local files (for example `@src/main.ts`).

#### Headless mode

```bash
cd your-project/
qwen -p "your question"
```

Use `-p` to run Qwen Code without the interactive UI—ideal for scripts, automation, and CI/CD. Learn more: [Headless mode](https://qwenlm.github.io/qwen-code-docs/en/users/features/headless).

#### IDE integration

Use Qwen Code inside your editor (VS Code and Zed):

- [Use in VS Code](https://qwenlm.github.io/qwen-code-docs/en/users/integration-vscode/)
- [Use in Zed](https://qwenlm.github.io/qwen-code-docs/en/users/integration-zed/)

#### TypeScript SDK

Build on top of Qwen Code with the TypeScript SDK:

- [Use the Qwen Code SDK](./packages/sdk-typescript/README.md)

## Commands & Shortcuts

### Session Commands

- `/help` - Display available commands
- `/clear` - Clear conversation history
- `/compress` - Compress history to save tokens
- `/stats` - Show current session information
- `/bug` - Submit a bug report
- `/exit` or `/quit` - Exit Qwen Code

### Keyboard Shortcuts

- `Ctrl+C` - Cancel current operation
- `Ctrl+D` - Exit (on empty line)
- `Up/Down` - Navigate command history

> Learn more about [Commands](https://qwenlm.github.io/qwen-code-docs/en/users/features/commands/)

## Updating

```bash
npm install -g @mmmbuto/qwen-code-termux@latest
```

### Versions

- **latest / stable**: 0.6.405-termux

## Benchmark Results

### Terminal-Bench Performance

| Agent     | Model              | Accuracy |
| --------- | ------------------ | -------- |
| Qwen Code | Qwen3-Coder-480A35 | 37.5%    |
| Qwen Code | Qwen3-Coder-30BA3B | 31.3%    |

## Ecosystem

Looking for a graphical interface?

- Web UI: [NexusCLI](https://github.com/DioNanos/nexuscli) - Optional web interface for Codex/Claude/Gemini

## Troubleshooting

If you encounter issues, check the [troubleshooting guide](https://qwenlm.github.io/qwen-code-docs/en/users/support/troubleshooting/).

To report a bug from within the CLI, run `/bug` and include a short title and repro steps.

## License

Apache 2.0 (same as upstream). See LICENSE.

## Acknowledgments

Based on [Qwen Code](https://github.com/QwenLM/qwen-code), which is based on
[Google Gemini CLI](https://github.com/google-gemini/gemini-cli).
