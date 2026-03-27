# Building qwen-code-termux

Build Qwen Code Termux Edition from source on Linux/macOS (or Termux).

## Prerequisites

- Node.js 20+
- npm 9+ (or pnpm)
- Git
- **For Termux**: `pkg install nodejs-lts` + `pkg install termux-api` (optional)

## Quick Build

```bash
# 1. Clone
git clone https://github.com/DioNanos/qwen-code-termux.git
cd qwen-code-termux

# 2. Install dependencies
npm install

# 3. Build all packages
npm run build

# 4. Bundle for distribution
npm run bundle

# 5. Install globally
npm install -g
```

## Development Mode

```bash
npm run dev     # Hot reload during development
npm start       # Interactive CLI
npm run debug   # Debug mode (--inspect-brk)
```

## CI Checks

```bash
npm run preflight   # format + lint + build + typecheck + test
```

## Termux-Specific Build Notes

On Termux, `npm install` automatically:

- Skips husky git hooks (`prepare-termux.cjs`)
- Skips sandbox bundle
- Installs `@mmmbuto/pty-termux-utils` for PTY support

On non-Termux platforms, everything builds normally.

## Docker Sandbox (non-Termux only)

```bash
# Pull pre-built sandbox image
docker pull ghcr.io/mmmbuto/qwen-code-termux:0.13.1-termux

# Run with sandbox
qwen --sandbox
```

## Troubleshooting

| Problem                   | Solution                               |
| ------------------------- | -------------------------------------- |
| Build fails with node-gyp | Use Termux + `pkg install nodejs-lts`  |
| `qwen: command not found` | Run `npm install -g` or use `npx qwen` |
| PTY not working on Termux | Run `pkg install termux-api`           |

See also: [../test-reports/](../test-reports/) for on-device test results.
