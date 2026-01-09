# Merge-Safe Guide for Termux Fork

This guide explains how to maintain merge-safe practices when updating from upstream QwenLM/qwen-code.
This fork also **re-scopes the published packages** to `@mmmbuto`, which is the highest-conflict area during merges.

## Core Principles

1. **Optimization, not removal**: We optimize for Termux, not remove features
2. **Merge-safe**: Avoid conflicts in future upstream merges
3. **Additive changes**: Prefer adding dependencies over removing them
4. **Platform-specific**: Use platform-specific packages when possible

## Critical Files to Protect

### package.json

#### Package scope overrides (most merge conflicts happen here)

**Keep the `@mmmbuto` scope** for the CLI and core packages.

Must remain `@mmmbuto` in:

- `package.json` (root)
- `packages/cli/package.json`
- `packages/core/package.json`
- `package-lock.json`
- `Dockerfile`
- `scripts/build_sandbox.js`
- `scripts/get-release-version.js`
- `integration-tests/terminal-bench/qwen-code-setup.sh.j2`
- docs/README/install snippets

**Do NOT change** `@qwen-code/sdk` (that SDK stays upstream for now).

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

#### Shared PTY provider (multi-provider support)

**Keep these** so Termux + Linux ARM64 can work via the shared PTY adapter:

- `packages/core/src/services/shellExecutionService.ts` (uses `getPty` from `@mmmbuto/pty-termux-utils`)
- `packages/core/package.json` dependency: `@mmmbuto/pty-termux-utils`

#### Termux runtime patches

**Keep this file** to preserve Android/Termux runtime fixes:

- `packages/cli/src/patches/termux-runtime.ts`

### scripts/prepare-termux.cjs

**Keep this script** - it skips `husky` + `bundle` during Termux installs.

### Version Format

- **Root version** uses termux suffix: `0.6.407-termux` (not `0.6.3-termux`)
- **Workspace packages** (`packages/cli`, `packages/core`, `packages/test-utils`) use plain semver: `0.6.3`
- This avoids bundled CLI validation errors and keeps upstream alignment
- Root format: `X.Y.Z-termux` where Z >= 400 for Termux releases

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
# Bump root version (termux)
sed -i 's/"version": "0.6.407-termux"/"version": "0.6.408-termux"/g' package.json

# Update sandboxImageUri
sed -i 's/0.6.407-termux/0.6.408-termux/g' package.json

# Keep workspace versions aligned (no -termux suffix)
sed -i 's/"version": "0.6.3"/"version": "0.6.4"/g' packages/cli/package.json
sed -i 's/"version": "0.6.3"/"version": "0.6.4"/g' packages/core/package.json
sed -i 's/"version": "0.6.3"/"version": "0.6.4"/g' packages/test-utils/package.json

# Refresh lockfile
npm install --workspace packages/cli --workspace packages/core --package-lock-only
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
git commit --no-verify -m "chore: merge upstream v0.6.X into termux v0.6.408"
git push
git tag v0.6.408-termux
git push origin v0.6.408-termux
cd packages/cli && npm publish --access public --tag latest
gh release create v0.6.408-termux --notes "..."
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
"version": "0.6.407-termux"
```

### ❌ Reverting @mmmbuto package scope

```json
// BAD - breaks npm publishing for this fork
"name": "@qwen-code/qwen-code"
```

### ✅ Keep @mmmbuto scope

```json
// GOOD - fork uses @mmmbuto scope
"name": "@mmmbuto/qwen-code-termux"
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
| Bump root ver  | `sed -i 's/0.6.407-termux/0.6.408-termux/g' package.json` |
| Test install   | `npm install -g ./mmmbuto-qwen-code-termux-*.tgz`         |
| Publish        | `cd packages/cli && npm publish --tag latest`             |

## Version History

- `0.6.401`: Initial fix with scripts/ inclusion
- `0.6.402`: Added ARM64 prebuild support
- `0.6.403-termux`: Rerelease with deprecations
- `0.6.404-termux`: Switch to @mmmbuto/node-pty-android-arm64 (Termux-only PTY)
- `0.6.405-termux`: Add Termux runtime patches (base64 polyfills, TERMUX\_\_PREFIX, punycode warn)
- `0.6.406-termux`: Multi-provider PTY via @mmmbuto/pty-termux-utils
- `0.6.407-termux`: Re-scope CLI/core to @mmmbuto packages
