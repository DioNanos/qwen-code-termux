# 🤖 Qwen Code – Termux Edition

Android/Termux optimized fork of Qwen Code CLI. Installs cleanly on Termux
by skipping native modules and adding mobile-specific optimizations.

[![npm](https://img.shields.io/npm/v/@mmmbuto/qwen-code-termux?style=flat-square&logo=npm)](https://www.npmjs.com/package/@mmmbuto/qwen-code-termux)
[![downloads](https://img.shields.io/npm/dt/@mmmbuto/qwen-code-termux?style=flat-square)](https://www.npmjs.com/package/@mmmbuto/qwen-code-termux)
[![ko-fi](https://img.shields.io/badge/☕_Support-Ko--fi-FF5E5B?style=flat-square&logo=ko-fi)](https://ko-fi.com/dionanos)

---

## What This Is

**Optimized Termux edition** of `QwenLM/qwen-code`.

This project focuses on maintaining a first-class experience for Qwen Code on
Android/Termux. It provides critical adaptations for the mobile environment
while tracking upstream development closely.

- **Termux-First:** Pre-configured for Android filesystem and mobile constraints.
- **Lightweight:** Native dependencies managed for ARM64 without complex
  compilation.
- **Up-to-Date:** Synchronized with the latest Qwen Code features.
- **Qwen3-Coder Optimized:** Best performance with Qwen3-Coder models.

## Installation (Termux)

```bash
pkg update && pkg upgrade -y
pkg install nodejs-lts -y
npm install -g @mmmbuto/qwen-code-termux

qwen --version  # expected: 0.6.0-termux
```

Build from source:

```bash
git clone https://github.com/DioNanos/qwen-code-termux.git
cd qwen-code-termux
npm install --ignore-optional --ignore-scripts
npm run build && npm run bundle
node bundle/qwen.js --version
```

## Termux Optimizations

- **Smart Clipboard:** Auto-detects Android environment to enable seamless
  clipboard operations (fixes `TERMUX__PREFIX`).
- **Streamlined Install:** Native PTY/keychain deps are **omitted** on Termux
  (fallback to `child_process` + file-based tokens), avoiding native builds.
- **Clean UX:** Suppresses desktop-centric warnings (like home directory checks)
  to optimize the experience for mobile terminal usage.
- **ARM64 Native:** Bundled specifically for Android architecture.
- **Responsive Settings:** Fixed settings dialog layout for small screens.

## Environment Specifics

- **Shell Integration:** Uses robust `child_process` fallback instead of
  `node-pty` for maximum stability on Android.
- **Credentials:** Keys are stored in standard config files for portability (no
  dependency on system keychains).
- **Qwen OAuth:** Full OAuth support with free tier (2000 requests/day).
- **OpenAI Compatible:** Can use OpenAI-compatible APIs.

## Quick Start

```bash
# Start Qwen Code (interactive)
qwen

# Then, in the session:
/help
/auth
```

On first use, you'll be prompted to sign in. You can run `/auth` anytime to switch authentication methods.

Example prompts:

```text
What does this project do?
Explain the codebase structure.
Help me refactor this function.
Generate unit tests for this module.
```

## Authentication

Qwen Code Termux supports two authentication methods:

- **Qwen OAuth (recommended & free)**: sign in with your `qwen.ai` account in a browser.
- **OpenAI-compatible API**: use `OPENAI_API_KEY` (and optionally a custom base URL / model).

### Qwen OAuth (recommended)

Start `qwen`, then run:

```bash
/auth
```

Choose **Qwen OAuth** and complete the browser flow.

### OpenAI-compatible API (API key)

Environment variables:

```bash
export OPENAI_API_KEY="your-api-key-here"
export OPENAI_BASE_URL="https://api.openai.com/v1"  # optional
export OPENAI_MODEL="gpt-4o"                        # optional
```

## Usage

As an open-source terminal agent, you can use Qwen Code in four primary ways:

1. Interactive mode (terminal UI)
2. Headless mode (scripts, CI)
3. IDE integration (VS Code, Zed)
4. TypeScript SDK

### Interactive mode

```bash
cd your-project/
qwen
```

Run `qwen` in your project folder to launch the interactive terminal UI. Use `@` to reference local files.

### Headless mode

```bash
cd your-project/
qwen -p "your question"
```

Use `-p` to run Qwen Code without the interactive UI—ideal for scripts and automation.

### IDE integration

Use Qwen Code inside your editor (VS Code and Zed) - see upstream documentation.

## Commands & Shortcuts

### Session Commands

- `/help` - Display available commands
- `/settings` - Configure Qwen Code (including hide banner)
- `/clear` - Clear conversation history
- `/auth` - Switch authentication method
- `/stats` - Show current session information
- `/exit` or `/quit` - Exit Qwen Code

### Keyboard Shortcuts

- `Ctrl+C` - Cancel current operation
- `Ctrl+D` - Exit (on empty line)
- `Up/Down` - Navigate command history

## Configuration

Qwen Code can be configured via `settings.json`, environment variables, and CLI flags.

- **User settings**: `~/.qwen/settings.json`
- **Project settings**: `.qwen/settings.json`

Key settings available in `/settings`:

- `ui.hideBanner` - Hide the welcome banner
- `ui.hideTips` - Hide tips display
- `tools.approvalMode` - Control tool approval behavior

## Termux-Specific Changes

### v0.6.0-termux Modifications

This fork includes specific optimizations for Android/Termux:

**UI/UX Fixes:**

- **Responsive Settings Layout** - Fixed settings dialog for small screens (smartphones)
  - Changed `minWidth={50}` to `flexGrow={1}` for adaptive labels
  - Values no longer overflow on narrow terminals
- **Banner System** - Full banner component integration with hideBanner support
  - `ThemedGradient.tsx` - Gradient theme for banner first line
  - `Banner.tsx` - Dynamic warning/info banner display
  - `useBanner.ts` - Smart banner counting (max 5 shows)
  - `persistentState.ts` - State persistence across sessions

**Termux Tools Integration:**

- `scripts/termux-tools/discovery.sh` - Discovers 20+ Termux-API tools
- `scripts/termux-tools/call.sh` - Dispatcher for tool execution

**Available Termux Tools:**

| Tool                          | Description                             |
| ----------------------------- | --------------------------------------- |
| `termux_battery_status`       | Battery %, health, temp, charging state |
| `termux_clipboard_get/set`    | Read/write Android clipboard            |
| `termux_toast`                | Show toast notification on screen       |
| `termux_notification`         | Create persistent notification          |
| `termux_tts_speak`            | Text-to-speech with language/pitch/rate |
| `termux_vibrate`              | Vibrate device                          |
| `termux_torch`                | Control camera flash                    |
| `termux_wifi_scan/connection` | WiFi info                               |
| `termux_location`             | GPS location                            |
| `termux_camera_info/photo`    | Camera access                           |
| `termux_dialog`               | Text input dialog                       |
| `termux_telephony_call`       | Initiate phone call                     |
| `termux_sensor_info/read`     | Read device sensors                     |

**npm Install Optimizations:**

- `os: ["android", ...]` - Allows Termux installs
- `cpu: ["arm64", ...]` - Targets Android architecture
- Minimal postinstall message: `✓ qwen-code-termux installed`

## Testing

See `QWEN_TEST_SUITE.md` for post-install testing instructions.

## Patches Documentation

See `docs/patches/README.md` for complete list of Termux-specific modifications.

## Updating

```bash
npm install -g @mmmbuto/qwen-code-termux@latest
```

## Upstream Tracking

- Upstream: https://github.com/QwenLM/qwen-code
- Fork: https://github.com/DioNanos/qwen-code-termux
- Base: Google Gemini CLI architecture

## License

Apache 2.0 (same as upstream). See LICENSE.

## Acknowledgments

This project is based on [Qwen Code](https://github.com/QwenLM/qwen-code), which is based on [Google Gemini CLI](https://github.com/google-gemini/gemini-cli).
Termux-specific optimizations by DioNanos.
