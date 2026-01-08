# Termux Patches (0.6.404-termux)

Minimal changes to run Qwen Code on Android/Termux without native deps.

## Patches

- Responsive settings layout for small screens.
- Banner system + hideBanner support.
- Termux detection and clipboard/shell fallbacks.
- PTY uses `@mmmbuto/node-pty-android-arm64` (Termux-only) with local typings
  shim (`packages/core/src/types/pty-shim.d.ts`).
- `prepare` is a no-op on Termux to avoid unnecessary bundle work.
- Prebuilt `dist/cli.js` in npm package.

## Notes

Keep this list minimal and updated after upstream sync.
