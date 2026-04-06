# Changelog

All notable changes to **qwen-code-termux** are documented here.
Fork base: [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code).

## [0.14.0-termux] - 2026-04-06

### Added

- **Channels support** — upstream channels architecture (Telegram, Weixin, Dingtalk) integrated
- **Cron scheduling tools** — `cron_create`, `cron_list`, `cron_delete` for scheduled tasks
- **Qwen3.6-Plus** model support

### Changed

- **Merged upstream QwenLM/qwen-code v0.14.0**
- **PTY upgrade** — `@lydell/node-pty` → `1.2.0-beta.10` (FD leak fix)
- **getPty.ts** — enhanced fallback chain: lydell → `@mmmbuto/node-pty-android-arm64` → node-pty → null
- **Shell tool** — command substitution restriction removed upstream (more permissive on Termux)
- **esbuild.config.js** — added punycode userland alias + web-templates alias from upstream
- **scripts/build.js** — channels packages added to build order
- Version suffix: `-termux` across all workspace packages
- Sandbox image: `ghcr.io/mmmbuto/qwen-code-termux:0.14.0-termux`

### Fixed

- **Conflict resolution** — merged all 13 conflict files keeping Termux customizations
- **tool-names.ts** — added cron tools + preserved TTS_NOTIFICATION
- **package.json files** — all workspace packages rebranded with `@mmmbuto/qwen-code-termux-*` naming

### Termux Patches Maintained (9/9)

1. `prepare-termux.cjs` — skip husky + bundle on Termux
2. `termux-runtime.ts` — Android base64 polyfill
3. `getPty.ts` — enhanced fallback chain with `@mmmbuto/node-pty-android-arm64`
4. `package.json` — `@mmmbuto/qwen-code-termux` name/version/sandboxImageUri
5. `optionalDependencies` — Android ARM64 + Linux ARM64 PTY deps (1.2.0-beta.10)
6. `termux-detect.ts` — `isTermux()` environment detection
7. `tts-notification.ts` — TTS tool via `termux-tts-speak`
8. `ttsNotificationTool` — registered in Config
9. `postinstall.cjs` — Termux install confirmation message

---

## [0.13.1-termux] - 2026-03-27

### Added

- **TTS Notification Tool** — new `tts_notification` tool using `termux-tts-speak`
  for spoken completion/alerts on Termux
- **termux-detect.ts** — `isTermux()` utility for runtime Termux detection

### Changed

- **Merged upstream QwenLM/qwen-code v0.13.1**
- Badge updates, multi-language docs links, Qwen3.5-Plus support
- ACP SDK from upstream

### Termux Patches Maintained

1. `prepare-termux.cjs` — skip husky + bundle on Termux
2. `termux-runtime.ts` — Android base64 polyfill
3. `getPty.ts` — re-export from `@mmmbuto/pty-termux-utils`
4. `package.json` — `@mmmbuto/qwen-code-termux` name/version/sandboxImageUri
5. `optionalDependencies` — Android ARM64 + Linux ARM64 PTY deps
6. `termux-detect.ts` — `isTermux()` environment detection
7. `tts-notification.ts` — TTS tool via `termux-tts-speak`
8. `ttsNotificationTool` — registered in Config
9. `postinstall.cjs` — Termux install confirmation message

---

## [0.12.0-termux] - 2026-03-09

### Added

- **Extension Management TUI** — manage MCP extensions via interactive UI
- **Hook System** — custom hooks (session start/end, stop)
- **Ask User Question Tool** — interactive user prompts
- **ACP SDK Migration** — migrated to `@agentclientprotocol/sdk`
- **Auto PTY Installation** — postinstall script auto-installs PTY deps on Termux

### Changed

- **Merged upstream QwenLM/qwen-code v0.12.0**
- **Shell PTY Default** — PTY enabled by default for shell execution
- **New dependency**: `iconv-lite` for character encoding
- Version suffix: `-termux` across all workspace packages
- Sandbox image: `ghcr.io/mmmbuto/qwen-code-termux:0.12.0-termux`

### Fixed

- **shellExecutionService.ts** — adapted to use `@mmmbuto/pty-termux-utils` IPty interface
- **Import paths** — all `@qwen-code/qwen-code-core` → `@mmmbuto/qwen-code-termux-core`
- **prepare-package.js** — Termux-specific optionalDependencies

### Termux Patches Maintained (9/9)

1. `prepare-termux.cjs` — skip husky/bundle on Termux
2. `termux-runtime.ts` — Android runtime polyfills
3. `getPty.ts` — re-export from `@mmmbuto/pty-termux-utils`
4. `package.json` — Termux name/version/sandboxImageUri
5. `optionalDependencies` — Android ARM64 + Linux ARM64
6. `installationInfo.ts` — correct update commands
7. `start.js` — deprecation warning suppression
8. `prepare-package.js` — NPM package preparation
9. `postinstall.js` — auto-install PTY on Termux

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

### Added

- PTY unified library (`@mmmbuto/pty-termux-utils`)

---

## [0.11.0-termux] - 2026-02-28

### Added

- Initial Termux fork based on upstream v0.11.0
- Termux runtime patches
- Skip husky/bundle on Termux install

---

## [0.0.14]

- Added plan mode support for task planning
- Fixed unreliable editCorrector that injects extra escape characters
- Fixed task tool dynamic updates
- Added Qwen3-VL-Plus token limits (256K input, 32K output) and highres support
- Enhanced dashScope cache control

## [0.0.13]

- Added YOLO mode support for automatic vision model switching
- Fixed ripgrep lazy loading for VS Code IDE companion
- Fixed authentication hang with Qwen OAuth
- Added OpenAI and Qwen OAuth authentication to Zed ACP integration
- Fixed output token limit for Qwen models
- Fixed Markdown list display issues on Windows
- Enhanced vision model instructions

## [0.0.12]

- Added vision model support for Qwen-OAuth authentication
- Synced upstream `gemini-cli` to v0.3.4
- Enhanced subagent functionality
- Added tool call type coercion
- Fixed arrow key navigation on Windows
- Fixed missing tool call chunks for OpenAI logging
- Fixed terminal flicker with subagent execution
- Added `skipLoopDetection` configuration option
- Enhanced Windows multi-line paste handling

## [0.0.11]

- Added subagents feature with file-based configuration
- Added Welcome Back Dialog
- Fixed SharedTokenManager performance issues
- Enhanced ReadManyFiles tool
- Re-implemented tokenLimits class
- Resolved EditTool naming inconsistency
- Fixed unexpected re-authentication issues
- Added Terminal Bench integration tests

## [0.0.10]

- Synced upstream `gemini-cli` to v0.2.1
- Added todo write tool

## [0.0.9]

- Synced upstream `gemini-cli` to v0.1.21
- Fixed token synchronization among multiple sessions
- Improved tool execution with early stop
- Added explicit `is_background` parameter for shell tool
- Enhanced memory management
- Renamed `GEMINI_DIR` to `QWEN_DIR`
- Added support for Qwen Markdown selection
- Fixed parallel tool usage
- Upgraded to Vitest framework

## [0.0.8]

- Synced upstream `gemini-cli` to v0.1.19
- Updated branding from Gemini CLI to Qwen Code
- Added multilingual docs links
- Added deterministic cache control for DashScope
- Limited `grep` results to 25 items default
- `grep` respects `.qwenignore`

## [0.0.7]

- Synced upstream `gemini-cli` to v0.1.18
- Fixed MCP tools and Web Fetch/Search tools
- Made tool calls tolerant of invalid-JSON parameters
- Prevented concurrent query submissions
- Corrected Qwen logger exit-handler setup

## [0.0.6]

- Added usage statistics logging
- Fixed `EPERM` error with `--sandbox` on macOS
- Fixed terminal flicker
- Fixed `glm-4.5` model request error

## [0.0.5]

- Added Qwen OAuth login (1,000 free requests/day)
- Synced upstream `gemini-cli` to v0.1.17
- Added `systemPromptMappings` configuration option
