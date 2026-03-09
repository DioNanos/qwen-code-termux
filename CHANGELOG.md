# Changelog

All notable changes to this project will be documented in this file.

## [0.12.0-termux] - 2026-03-09

### Added

- **Extension Management TUI** - New UI for managing MCP extensions
- **Hook System** - Support for custom hooks (session start/end, stop)
- **Ask User Question Tool** - New tool for user interactions
- **ACP SDK Migration** - Migrated to `@agentclientprotocol/sdk`
- **Auto PTY Installation** - Postinstall script auto-installs PTY dependencies on Termux

### Changed

- **Merged upstream QwenLM/qwen-code v0.12.0**
- **Shell PTY Default** - PTY enabled by default for shell execution
- **New dependency**: `iconv-lite` for character encoding
- Version suffix: `-termux` across all workspace packages
- Sandbox image: `ghcr.io/mmmbuto/qwen-code-termux:0.12.0-termux`

### Fixed

- **shellExecutionService.ts** - Adapted to use `@mmmbuto/pty-termux-utils` IPty interface
- **Import paths** - All `@qwen-code/qwen-code-core` → `@mmmbuto/qwen-code-termux-core`
- **prepare-package.js** - Termux-specific optionalDependencies

### Termux Patches Maintained (9/9)

1. `prepare-termux.cjs` - Skip husky/bundle on Termux
2. `termux-runtime.ts` - Android runtime polyfills
3. `getPty.ts` - Re-export from `@mmmbuto/pty-termux-utils`
4. `package.json` - Termux name/version/sandboxImageUri
5. `optionalDependencies` - Android ARM64 + Linux ARM64
6. `installationInfo.ts` - Correct update commands
7. `start.js` - Deprecation warning suppression
8. `prepare-package.js` - NPM package preparation
9. `postinstall.js` - Auto-install PTY on Termux

---

## [0.11.3-termux] - 2026-03-04

### Fixed

- Bundle version fix

---

## [0.11.2-termux] - 2026-03-02

### Fixed

- Auto-update command fix (correct package name `@mmmbuto/qwen-code-termux`)

---

## [0.11.1-termux] - 2026-03-01

### Changed

- PTY unified library (`@mmmbuto/pty-termux-utils`)
- Reduced optionalDependencies (7 → 2)
- Native Android ARM64 support via `@mmmbuto/node-pty-android-arm64`
- Linux ARM64 fallback via `@lydell/node-pty-linux-arm64`

---

## [0.11.0-termux] - 2026-02-28

### Added

- Initial Termux fork based on upstream v0.11.0
- Android PTY support
- Termux runtime patches
- Skip husky/bundle on Termux install
