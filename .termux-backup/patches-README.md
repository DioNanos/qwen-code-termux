# 🔧 Termux Compatibility Patches

This document describes the Termux-specific patches applied to the upstream Qwen Code CLI so that it works correctly on Android Termux.

**Current Release**: v0.10.3-termux
**Upstream Base**: QwenLM/qwen-code v0.10.3

---

## Patch List

### 1. prepare-termux.cjs (Install Script)

**File**: `scripts/prepare-termux.cjs`
**Purpose**: Skip husky + bundle on Termux during `npm install`

#### Problem

During `npm install -g`, the upstream `prepare` script runs:

```json
"prepare": "husky && npm run bundle"
```

**Issues on Termux**:

1. `husky` not found (devDependency, not installed globally)
2. Bundle already built in package
3. Installation fails with `sh: 1: husky: not found`

#### Solution

```javascript
const isTermux =
  os.platform() === 'android' ||
  process.env.TERMUX_VERSION ||
  (process.env.PREFIX && process.env.PREFIX.includes('com.termux'));

if (isTermux) {
  process.exit(0); // Skip husky + bundle on Termux ✅
}
```

**Impact**:

- ✅ Fast installation on Termux
- ✅ No husky errors
- ✅ Uses pre-built dist/

---

### 2. postinstall.cjs

**File**: `scripts/postinstall.cjs`
**Purpose**: Post-install cleanup for Termux

#### Content

```javascript
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// Termux-specific post-install steps (if any)
// Currently a no-op, reserved for future use
```

**Impact**: Reserved for future Termux-specific post-install steps

---

### 3. termux-runtime.ts (Runtime Polyfills)

**File**: `packages/cli/src/patches/termux-runtime.ts`
**Purpose**: Android/Termux runtime polyfills

#### Features

1. **base64 polyfill** - Android base64 handling
2. **TERMUX\_\_PREFIX** - Path resolution for Termux
3. **punycode warning suppression** - Node.js deprecation handling

**Impact**:

- ✅ Correct path handling on Termux
- ✅ No spurious warnings
- ✅ Compatible with Android runtime

---

### 4. @mmmbuto Package Scope

**Files**:

- `package.json`
- `packages/cli/package.json`
- `packages/core/package.json`
- `packages/test-utils/package.json`

#### Change

```json
{
  "name": "@mmmbuto/qwen-code-termux",
  "version": "0.10.3-termux"
}
```

**Reason**:

- Distinguish from upstream `@qwen-code/qwen-code`
- Enable parallel npm publishing
- Clear version tracking

**Impact**:

- ✅ npm install: `@mmmbuto/qwen-code-termux@latest`
- ✅ Version: `0.10.3-termux`
- ✅ Clear separation from upstream

---

### 5. PTY Android Dependency

**File**: `package.json`

#### Change

```json
"optionalDependencies": {
  "@mmmbuto/node-pty-android-arm64": "1.1.0"
}
```

**Purpose**: Pre-built PTY for Android ARM64

**Impact**:

- ✅ No node-gyp compilation on Termux
- ✅ PTY support for shell execution
- ✅ Graceful fallback if unavailable

---

### 6. Sandbox Image URI

**File**: `package.json`

#### Change

```json
"config": {
  "sandboxImageUri": "ghcr.io/mmmbuto/qwen-code-termux:0.10.3-termux"
}
```

**Purpose**: Point to Termux-specific Docker image

**Impact**:

- ✅ Correct sandbox image for Termux builds
- ✅ Version-aligned sandbox

---

### 7. start.js Warning Suppression

**File**: `scripts/start.js`

#### Change

```javascript
// Suppress deprecated url.parse() warnings from dependencies
process.noDeprecation = true;
```

**Problem**: Node.js 24+ deprecation warnings from `url.parse()` in dependencies

**Impact**:

- ✅ Clean output (no warnings)
- ✅ Better UX

---

## Versioning Strategy

| Component       | Version             | Example              |
| --------------- | ------------------- | -------------------- |
| **npm package** | `<upstream>-termux` | `0.10.3-termux`      |
| **Binary**      | Same as npm         | `qwen 0.10.3-termux` |

**Why**:

- Clear traceability to upstream version
- Termux suffix indicates fork
- Easy to identify in bug reports

---

## Testing Checklist

Before each release:

- [ ] `prepare-termux.cjs` exits on Termux
- [ ] `postinstall.cjs` runs without errors
- [ ] No deprecation warnings in output
- [ ] PTY dependency resolves
- [ ] Version shows `-termux` suffix
- [ ] npm install completes in < 10s

---

## Contributing

Found a Termux-specific bug? Please open an issue with:

1. `qwen --version` output
2. `termux --version` output
3. Steps to reproduce
4. Expected vs actual behavior
5. Error logs

---

**Last Updated**: 2026-02-17
**Patches Applied**: 7
**Based on**: QwenLM/qwen-code v0.10.3
**Platform**: Android Termux ARM64
