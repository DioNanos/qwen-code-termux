# Termux Patches (0.6.0-termux)

Minimal changes to run `qwen-code` on Android/Termux ARM64 without native deps.

## Patch List

1. **Settings Layout Responsive** – `packages/cli/src/ui/components/SettingsDialog.tsx:868-900`
   - Changed `minWidth={50}` to `flexGrow={1}` for label
   - Added `flexShrink={0}` wrapper for value
   - Fixes rendering on small screens (smartphone Termux)

2. **Banner Component Integration** – Complete banner system
   - `ThemedGradient.tsx` - Gradient theme support for banner first line
   - `Banner.tsx` - Dynamic banner component with warning/info states
   - `useBanner.ts` - Hook for banner display logic with persistent counting
   - `persistentState.ts` - State persistence across sessions

3. **UIState Updates** – Banner data in context
   - `UIStateContext.tsx` - Added `bannerData` and `bannerVisible` to interface
   - `AppContainer.tsx` - Added banner states and useMemo for bannerData
   - `AppHeader.tsx` - Integrated Banner component with useBanner hook

4. **Optional native modules** – Leave `node-pty`, `keytar`, `tree-sitter-bash`
   in `optionalDependencies`; build failures are tolerated.

5. **Core exports** – `packages/core/src/index.ts` re-exports utilities for
   Termux compatibility (clipboard detection, etc.).

6. **Bundle** – Prebuilt `dist/cli.js` shipped in npm package
   (ARM64/Android) with policy files under `dist/policies/`.

7. **Termux detection** – Clipboard and environment detection utilities.

## Expected Warnings

- Missing native modules may log warnings on Termux; functionality remains
  (non-PTY shell, plain token storage).

## Scope

No functional changes to upstream features; only compatibility/optimization fixes
for Android/Termux environment.

## Merge Strategy

All patches are designed to be merge-safe. Track divergent files carefully after
upstream sync.

## Version History

- v0.6.0-termux (2025-12-27): Initial Termux optimization with responsive settings
  and banner integration
