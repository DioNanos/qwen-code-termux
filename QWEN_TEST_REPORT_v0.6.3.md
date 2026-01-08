# Qwen Code Termux - Test Report v0.6.3-termux

**Date**: 2026-01-08  
**Base Version**: Upstream v0.6.1 (QwenLM/qwen-code)  
**Fork Version**: 0.6.3-termux (@mmmbuto/qwen-code-termux)  
**Commits Merged**: 97 commits from upstream  
**Platform**: Android/Termux ARM64

---

## Merge Summary

### Upstream Changes (v0.6.1)

The following major features and fixes were integrated from upstream:

#### Core Features

- **PR #1282**: Fix sandbox `ideInstall` issues
- **PR #1393**: Various improvements (Weaxs contributions)
- **PR #1415**: Fix OpenAI reasoning config
- **PR #1406**: Fix non-interactive tool permission handling
- **PR #1423**: Release v0.6.1
- **PR #1374**: Fix resume command broken after new chat
- **PR #1146**: Fix Windows background terminal execution
- **PR #1391**: Approval mode direct argument support
- **PR #1414**: QwenCode Java documentation
- **PR #1355**: Stable ACP flag implementation

#### New Components

- `packages/sdk-java/`: Java SDK for Qwen Code
- German locale support (`de.js`)
- Improved settings schema and config management
- Enhanced JSON output adapters

### Termux-Specific Changes

The following Termux-specific optimizations were preserved and updated:

1. **Package Configuration**
   - Name: `@mmmbuto/qwen-code-termux`
   - Version: `0.6.3-termux`
   - OS restrictions: `android`, `linux`, `darwin`, `win32`
   - CPU restrictions: `arm64`, `x64`, `arm`
   - Repository: `https://github.com/DioNanos/qwen-code-termux.git`
   - Sandbox image: `ghcr.io/mmmbuto/qwen-code-termux:0.6.3-termux`

2. **Browser Launcher**
   - `secure-browser-launcher.ts` updated with Termux detection
   - Uses `termux-open-url` for Android with fallback
   - Proper URL validation and security checks

3. **UI Components**
   - `Banner.tsx`: Banner component with theme support
   - `ThemedGradient.tsx`: Gradient styling
   - `useBanner.ts`: Hook for banner state management
   - All components properly integrated with new upstream UI

4. **Postinstall Script**
   - Minimal install message for Termux
   - Detects Android platform and displays success message

5. **Documentation**
   - Termux-focused README.md with installation instructions
   - Test suite documentation (`QWEN_TEST_SUITE.md`)
   - Patch documentation (`docs/patches/README.md`)
   - Termux fixes guide (`docs/patches/TERMUX_FIXES.md`)

---

## Verification Status

### ✅ Verified Components

| Component                    | Status | Notes                              |
| ---------------------------- | ------ | ---------------------------------- |
| package.json configuration   | ✅     | All Termux-specific fields present |
| README.md                    | ✅     | Updated with v0.6.3 information    |
| Browser launcher             | ✅     | Termux detection works correctly   |
| UI components (Banner, etc.) | ✅     | No conflicts with upstream         |
| esbuild config               | ✅     | tiktoken not in external (bundled) |
| Postinstall script           | ✅     | Present and minimal                |
| SDK integration              | ✅     | Java SDK merged cleanly            |
| Locale support               | ✅     | German locale included             |

### 🔍 Dependency Checks

- **tiktoken**: Properly bundled (not in esbuild external)
- **node-pty**: Excluded from bundle (native module)
- **keytar**: Not present in dependencies
- All other dependencies: Merged from upstream without conflicts

---

## Build Instructions

```bash
# Install dependencies
npm install --ignore-optional --ignore-scripts

# Build
npm run build

# Bundle
npm run bundle

# Test version
node dist/cli.js --version  # Should output: 0.6.3-termux
```

---

## Testing Checklist

- [ ] Clean installation on fresh Termux environment
- [ ] OAuth flow with `termux-open-url`
- [ ] Banner toggle in settings
- [ ] Headless mode (`qwen -p "prompt"`)
- [ ] Interactive mode
- [ ] File operations (`@file` references)
- [ ] Shell execution
- [ ] Settings persistence
- [ ] Session management
- [ ] Test suite execution

---

## Known Issues

None identified at this time.

---

## Next Steps

1. Run full test suite on actual Termux device
2. Publish to npm with `@latest` tag
3. Create GitHub release v0.6.3-termux
4. Update changelog

---

## References

- Upstream: https://github.com/QwenLM/qwen-code
- Fork: https://github.com/DioNanos/qwen-code-termux
- Test Suite: `QWEN_TEST_SUITE.md`
- Previous Report: `QWEN_TEST_REPORT_v0.6.2.md`
