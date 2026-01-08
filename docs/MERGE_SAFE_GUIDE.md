# Merge-Safe Guide for Termux Fork

This guide explains how to maintain merge-safe practices when updating from upstream QwenLM/qwen-code.

## Core Principles

1. **Optimization, not removal**: We optimize for Termux, not remove features
2. **Merge-safe**: Avoid conflicts in future upstream merges
3. **Additive changes**: Prefer adding dependencies over removing them
4. **Platform-specific**: Use platform-specific packages when possible

## Critical Files to Protect

### package.json

#### optionalDependencies

**Keep this entry** - it provides the Termux/Android prebuild:

```json
"optionalDependencies": {
  "@mmmbuto/node-pty-android-arm64": "1.1.0" // Termux ARM64 prebuild
}
```

**What to do after upstream merge:**

1. If upstream adds `"node-pty": "^1.0.0"` or `@lydell/node-pty-*` to `optionalDependencies`:
   - **REMOVE THEM** for the Termux-only fork
   - Keep only `@mmmbuto/node-pty-android-arm64`

2. If upstream adds new platform-specific packages:
   - **ADD THEM** if not conflicting
   - Ensure Termux ARM64 support is preserved

#### PTY typings shim

**Keep this file** to avoid TypeScript errors when importing the Termux PTY:

- `packages/core/src/types/pty-shim.d.ts`

### scripts/prepare-termux.cjs

**Keep this script** - it skips `husky` + `bundle` during Termux installs.

### Version Format

- Use standard semver: `0.6.404-termux` (not `0.6.3-termux`)
- This avoids bundled CLI validation errors
- Format: `X.Y.Z` where Z >= 400 for Termux releases

## Merge Process

### Step 1: Fetch and checkout upstream

```bash
cd ~/Dev/qwen-code-termux
git fetch upstream
git checkout main
```

### Step 2: Merge upstream

```bash
git merge upstream/release/v0.6.X  # or appropriate tag
```

### Step 3: Resolve conflicts (if any)

#### package.json conflicts

**Scenario 1: Upstream adds `"node-pty": "^1.0.0"` or `@lydell/node-pty-*`**

```bash
# Edit package.json, remove the generic node-pty entry
# Keep only @mmmbuto/node-pty-android-arm64
```

**Scenario 2: Version conflict in optionalDependencies**

```bash
# Keep the platform-specific versions we need
# Update if upstream has newer, compatible versions
```

### Step 4: Update version

```bash
# Bump version
sed -i 's/"version": "0.6.404-termux"/"version": "0.6.405-termux"/g' package.json

# Update sandboxImageUri
sed -i 's/0.6.404-termux/0.6.405-termux/g' package.json

# Update README
sed -i 's/0.6.404-termux/0.6.405-termux/g' README.md
```

### Step 5: Test

```bash
npm pack
npm install -g ./mmmbuto-qwen-code-termux-*.tgz
qwen --version
```

### Step 6: Release

```bash
git add -A
git commit --no-verify -m "chore: merge upstream v0.6.X into termux v0.6.405"
git push
git tag v0.6.405
git push origin v0.6.405
npm publish
gh release create v0.6.405 --notes "..."
```

## Common Pitfalls

### ❌ Removing optionalDependencies entirely

```json
// BAD - removes functionality
"optionalDependencies": {}
```

### ✅ Keeping platform-specific, removing generic

```json
// GOOD - optimizes while preserving features
"optionalDependencies": {
  "@mmmbuto/node-pty-android-arm64": "1.1.0"
}
```

### ❌ Using non-standard semver

```json
// BAD - breaks bundled CLI validator
"version": "0.6.3-termux"
```

### ✅ Using standard semver

```json
// GOOD - passes validation
"version": "0.6.404-termux"
```

## Why This Works

### Platform-specific prebuilds

- `@mmmbuto/node-pty-android-arm64` provides prebuilt binaries for Termux
- No `node-gyp` compilation needed on Termux
- Graceful degradation if package fails (optional)

### No conflicts

- Adding entries to `optionalDependencies` rarely conflicts
- Removing generic `node-pty` and `@lydell/node-pty-*` avoids non-Android builds
- Maintains upstream compatibility

## Quick Reference

| Action         | Command                                                   |
| -------------- | --------------------------------------------------------- |
| Merge upstream | `git merge upstream/release/v0.6.X`                       |
| Bump version   | `sed -i 's/0.6.404-termux/0.6.405-termux/g' package.json` |
| Test install   | `npm install -g ./mmmbuto-qwen-code-termux-*.tgz`         |
| Publish        | `npm publish`                                             |

## Version History

- `0.6.401`: Initial fix with scripts/ inclusion
- `0.6.402`: Added ARM64 prebuild support
- `0.6.403-termux`: Rerelease with deprecations
- `0.6.404-termux`: Switch to @mmmbuto/node-pty-android-arm64 (Termux-only PTY)
