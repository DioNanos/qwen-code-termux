# qwen-code-termux

**Qwen Code Termux Edition** — Android/Termux optimized fork of Qwen Code CLI.

[![npm version](https://img.shields.io/npm/v/@mmmbuto/qwen-code-termux.svg)](https://www.npmjs.com/package/@mmmbuto/qwen-code-termux)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](./LICENSE)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-Support%20me-ff5e5b?logo=ko-fi&logoColor=white)](https://ko-fi.com/dionanos)

## Install (Termux)

```bash
pkg update -y && pkg upgrade -y
pkg install -y nodejs-lts git
npm install -g @mmmbuto/qwen-code-termux@latest
qwen --version  # v0.10.3-termux
```

## Quick Start

```bash
qwen              # Interactive
qwen -p "Hello"   # Non-interactive
```

## Resources

- **Test Reports**: [test-reports/](test-reports/README.md)
- **Patches**: [patches/](patches/README.md)
- **Build**: [docs/developers/BUILDING.md](docs/developers/BUILDING.md)
- **Config**: [docs/users/configuration.md](docs/users/configuration.md)

---

_Termux-only fork. For macOS/Linux/Windows use upstream: `@qwen-code/qwen-code`_
