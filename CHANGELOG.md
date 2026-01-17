# Changelog

All notable changes to **@mmmbuto/qwen-code-termux** will be documented in this file.

- **Upstream project**: QwenLM/qwen-code
- **Scope of this fork**: keep upstream Qwen Code behavior while making it installable and reliable on **Android/Termux**.

---

## 0.7.1-termux

### Upstream merge (Qwen Code v0.7.1)

- Docs updates
- Reduce slow quit by trimming skills watchers
- Fix timing issue in `LoggingContentGenerator` initialization
- Version bump to 0.7.1

### Termux / Android

- Termux-first packaging and compatibility maintained
- PTY on Termux ARM64 via optional dependency `@mmmbuto/node-pty-android-arm64`
- Termux-specific runtime patches (polyfills/quirks)
- Verified on-device: see `QWEN_TEST_REPORT_v0.7.1-termux.md` (2026-01-17)

---

## 0.6.405-termux (Termux Edition)

- Add Termux runtime patches (Uint8Array base64 polyfills, `TERMUX__PREFIX` for clipboardy)
- Suppress noisy punycode deprecation warnings on Android

## 0.6.404-termux (Termux Edition)

- Added `@mmmbuto/node-pty-android-arm64` to `optionalDependencies` for ARM64 Termux support
- Removed generic `node-pty` and `@lydell/node-pty-*` packages (Termux-only fork)
- Clean installation without node-gyp build errors on Termux
- Added Termux-aware `prepare` script (skips husky/bundle on Android)
- Added PTY typings shim for `@mmmbuto/node-pty-android-arm64`

## 0.6.401-termux (Termux Edition)

- Merge upstream v0.6.1 into termux branch (97 commits)
- Added `scripts/` to `package.json` `files` field for npm package
- Fixed auto-update to use correct package name `@mmmbuto/qwen-code-termux`
- **Deprecations**: npm versions `0.6.4-termux` and `0.6.4.1-termux` are deprecated

---

## Upstream history (selected)

### 0.0.14

- Added plan mode support for task planning
- Fixed unreliable editCorrector that injects extra escape characters
- Fixed task tool dynamic updates
- Added Qwen3-VL-Plus token limits (256K input, 32K output) and highres support
- Enhanced DashScope cache control

### 0.0.13

- Added YOLO mode support for automatic vision model switching with CLI arguments and environment variables
- Fixed ripgrep lazy loading to resolve VS Code IDE companion startup issues
- Fixed authentication hang when selecting Qwen OAuth
- Added OpenAI and Qwen OAuth authentication support to Zed ACP integration
- Fixed output token limit for Qwen models
