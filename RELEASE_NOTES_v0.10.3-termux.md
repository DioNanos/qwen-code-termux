# Qwen Code Termux v0.10.3-termux

**Android/Termux optimized fork of Qwen Code CLI**

---

## 📦 Install (Termux)

```bash
pkg update -y && pkg upgrade -y
pkg install -y nodejs-lts git
npm install -g @mmmbuto/qwen-code-termux@latest
qwen --version
```

---

## ✨ What's New (from upstream v0.10.3)

### Features

- **Multi-provider support**: Qwen, OpenAI, Anthropic, Gemini-compatible APIs
- **MCP integration**: Enhanced Model Context Protocol server support
- **LSP support**: Language Server Protocol for better code intelligence
- **Sub-agents & Skills**: Specialized AI assistants with file-based configuration
- **Todo Write tool**: Task management and progress tracking
- **Welcome Back Dialog**: Project summary on session resume

### Fixes

- Token synchronization among multiple Qwen sessions
- Tool execution with early stop on invalid tool calls
- Shell tool `is_background` parameter handling
- Memory management with sub-commands (project vs global)
- Windows compatibility improvements
- Authentication flow stability

---

## 🔧 Termux-Specific Changes

### Build & Install

- **prepare-termux.cjs**: Skip husky + bundle on Termux (fast install)
- **postinstall.cjs**: Termux-specific post-install steps
- **@mmmbuto scope**: CLI, core, test-utils packages renamed
- **PTY Android**: Prebuilt `@mmmbuto/node-pty-android-arm64` (no node-gyp)

### Runtime Fixes

- **termux-runtime.ts**: Android polyfills (base64, TERMUX\_\_PREFIX, punycode)
- **Warning suppression**: `url.parse()` deprecation warnings hidden
- **Shell detection**: Uses `$SHELL` instead of `getpwuid()` on Android
- **LD\_\* variables**: Preserved on Android for shared library loading

### Documentation

- **test-reports/**: Human-run validation reports
- **patches/**: Termux compatibility patches documented
- **QWEN-TEST-SUITE.md**: Test suite (like codex-termux)
- **docs/users/configuration.md**: Provider-neutral setup
- **docs/developers/BUILDING.md**: Build from source guide

---

## 📋 Testing

Run the test suite:

```bash
# Quick test
qwen --version
qwen -p "Hello"
qwen /help

# Full suite
# See QWEN-TEST-SUITE.md for complete test checklist
```

Save your test report in:

```
test-reports/0.10.3-termux/TEST-REPORT-YYYY-MM-DD.md
```

---

## 📝 Configuration

### User settings

`~/.qwen/settings.json`

### Project settings

`.qwen/settings.json`

### Environment variables

```bash
export OPENAI_API_KEY="..."
export OPENAI_BASE_URL="https://..."
export OPENAI_MODEL="..."
```

See [docs/users/configuration.md](docs/users/configuration.md) for details.

---

## 🔗 Links

- **npm**: https://www.npmjs.com/package/@mmmbuto/qwen-code-termux
- **GitHub**: https://github.com/DioNanos/qwen-code-termux
- **Upstream**: https://github.com/QwenLM/qwen-code
- **Test Reports**: [test-reports/](test-reports/)
- **Patches**: [patches/](patches/)

---

## 🙏 Acknowledgments

- Based on [Google Gemini CLI](https://github.com/google-gemini/gemini-cli)
- Upstream: [Qwen Code](https://github.com/QwenLM/qwen-code)
- Inspired by [codex-termux](https://github.com/DioNanos/codex-termux) structure

---

**Full Changelog**: https://github.com/DioNanos/qwen-code-termux/compare/v0.7.1-termux...v0.10.3-termux
