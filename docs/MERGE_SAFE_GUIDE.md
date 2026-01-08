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

**Never remove these entries** - they are added for platform-specific prebuilds:

```json
"optionalDependencies": {
  "@lydell/node-pty": "1.1.0",
  "@lydell/node-pty-darwin-arm64": "1.1.0",
  "@lydell/node-pty-darwin-x64": "1.1.0",
  "@lydell/node-pty-linux-arm64": "1.2.0-beta.2",  // CRITICAL for Termux ARM64
  "@lydell/node-pty-linux-x64": "1.1.0",
  "@lydell/node-pty-win32-arm64": "1.1.0",
  "@lydell/node-pty-win32-x64": "1.1.0"
}
```

**What to do after upstream merge:**

1. If upstream adds `"node-pty": "^1.0.0"` to `optionalDependencies`:
   - **REMOVE IT** - it conflicts with platform-specific prebuilds
   - Keep only the `@lydell/node-pty-*` packages

2. If upstream adds new platform-specific packages:
   - **ADD THEM** if not conflicting
   - Ensure Termux ARM64 support is preserved

### Version Format

- Use standard semver: `0.6.403-termux` (not `0.6.3-termux`)
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

**Scenario 1: Upstream adds `"node-pty": "^1.0.0"`**

```bash
# Edit package.json, remove the generic node-pty entry
# Keep only @lydell/node-pty-* entries
```

**Scenario 2: Version conflict in optionalDependencies**

```bash
# Keep the platform-specific versions we need
# Update if upstream has newer, compatible versions
```

### Step 4: Update version

```bash
# Bump version
sed -i 's/"version": "0.6.403-termux"/"version": "0.6.404"/g' package.json

# Update sandboxImageUri
sed -i 's/0.6.403-termux-termux/0.6.404/g' package.json

# Update README
sed -i 's/0.6.403-termux/0.6.404/g' README.md
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
git commit --no-verify -m "chore: merge upstream v0.6.X into termux v0.6.404"
git push
git tag v0.6.404
git push origin v0.6.404
npm publish
gh release create v0.6.404 --notes "..."
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
  "@lydell/node-pty-linux-arm64": "1.2.0-beta.2"
  // Remove: "node-pty": "^1.0.0" (conflicts)
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
"version": "0.6.403-termux"
```

## Why This Works

### Platform-specific prebuilds

- `@lydell/node-pty-linux-arm64` provides prebuilt binaries
- No `node-gyp` compilation needed on Termux
- Graceful degradation if package fails (optional)

### No conflicts

- Adding entries to `optionalDependencies` rarely conflicts
- Removing generic `node-pty` is a cleanup, not a conflict
- Maintains upstream compatibility

## Quick Reference

| Action | Command |
|--------|----------|
| Merge upstream | `git merge upstream/release/v0.6.X` |
| Bump version | `sed -i 's/0.6.403-termux/0.6.404/g' package.json` |
| Test install | `npm install -g ./mmmbuto-qwen-code-termux-*.tgz` |
| Publish | `npm publish` |

## Version History

- `0.6.401`: Initial fix with scripts/ inclusion
- `0.6.402`: Added ARM64 prebuild support
- `0.6.403-termux`: Rerelease with deprecations
