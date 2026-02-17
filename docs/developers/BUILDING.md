# Building Qwen Code Termux Edition

This document describes how to build Qwen Code Termux Edition from source.

## Prerequisites

- Node.js 20+
- npm or pnpm
- Git

## Quick Build

```bash
# 1. Clone repository
git clone https://github.com/DioNanos/qwen-code-termux.git
cd qwen-code-termux

# 2. Install dependencies
npm install

# 3. Build
npm run build

# 4. Package
npm pack

# Output: mmmbuto-qwen-code-termux-0.10.3-termux.tgz
```

## Development Build

```bash
# Watch mode (auto-rebuild on changes)
npm run dev
```

## Production Build

```bash
# Full build (all packages + sandbox)
npm run build:all

# Or individual components
npm run build              # Main build
npm run build:sandbox      # Sandbox image
npm run build:vscode       # VS Code companion
```

## Testing

```bash
# Run all tests
npm test

# CI mode
npm run test:ci

# Integration tests (no sandbox)
npm run test:integration:sandbox:none
```

## Creating npm Package

```bash
# 1. Ensure clean build
npm run clean
npm install
npm run build

# 2. Create package
npm pack

# 3. Verify package
tar -tzf mmmbuto-qwen-code-termux-*.tgz | head -20

# 4. Install locally (test)
npm install -g ./mmmbuto-qwen-code-termux-*.tgz
qwen --version
```

## Termux-Specific Notes

### prepare-termux.cjs

During `npm install`, the `prepare` script:

- Detects Termux environment
- Skips husky + bundle (already built)
- Exits immediately

### Pre-built Assets

The npm package includes:

- `dist/` directory (pre-built)
- `scripts/` directory
- Pre-configured for Termux

No build is required on the target device.

## Troubleshooting

### Build fails with TypeScript errors

```bash
# Clean and rebuild
npm run clean
npm install
npm run build
```

### Missing dependencies

```bash
# Reinstall all dependencies
rm -rf node_modules package-lock.json
npm install
```

### Package size too large

```bash
# Check package contents
npm pack --dry-run

# Verify dist/ is included, node_modules/ is excluded
```

## Release Checklist

Before publishing:

- [ ] All tests pass: `npm test`
- [ ] Build succeeds: `npm run build`
- [ ] Version updated in `package.json`
- [ ] CHANGELOG.md updated
- [ ] Test report created: `test-reports/<version>/`
- [ ] Package created: `npm pack`
- [ ] Package tested locally

## See Also

- [Test Reports](../test-reports/README.md)
- [Patches](../patches/README.md)
- [Configuration](users/configuration.md)
