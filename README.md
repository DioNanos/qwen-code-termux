# qwen-code-termux

**Qwen Code Termux Edition** — Android/Termux optimized fork of Qwen Code CLI.

## Latest Release

- **Version**: v0.10.3-termux
- **Upstream Base**: QwenLM/qwen-code v0.10.3
- **Package**: `@mmmbuto/qwen-code-termux`

## Install (Termux)

```bash
# Prerequisites
pkg update -y && pkg upgrade -y
pkg install -y nodejs-lts git

# Install
npm install -g @mmmbuto/qwen-code-termux@latest

# Verify
qwen --version
```

## Quick Start

```bash
# Interactive mode
qwen

# Non-interactive
qwen -p "Your prompt here"

# Help
qwen /help
```

## Documentation

- **Test Reports**: [test-reports/](test-reports/README.md)
- **Patches**: [patches/](patches/README.md)
- **Build Notes**: [docs/developers/BUILDING.md](docs/developers/BUILDING.md)
- **Configuration**: [docs/users/configuration.md](docs/users/configuration.md)

## Notes

- This is a **Termux-only** fork for Android devices
- For standard installations on macOS/Linux/Windows, use upstream: `@qwen-code/qwen-code`
- Patches are limited to platform compatibility and safety fixes
