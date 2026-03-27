# Test Reports — qwen-code-termux

On-device test results for `@mmmbuto/qwen-code-termux` on Android/Termux.

## Structure

```
test-reports/
├── 0.11.1-termux/   # v0.11.1-termux test results
├── 0.12.0-termux/   # v0.12.0-termux test results
└── notes/            # Ad-hoc test notes
```

## Running Tests

```bash
cd ~/Dev/qwen-code-termux
npm run test          # Unit tests
npm run test:e2e     # Integration tests (no sandbox)
```

## Known Termux Issues

| Issue                | Status   | Workaround                                |
| -------------------- | -------- | ----------------------------------------- |
| node-gyp native deps | Avoided  | Uses `@mmmbuto/pty-termux-utils` prebuilt |
| husky git hooks      | Skipped  | `prepare-termux.cjs` bypasses hooks       |
| Sandbox (Docker)     | N/A      | No sandbox on Termux                      |
| PTY colours          | ✅ Works | `@mmmbuto/pty-termux-utils`               |

## Reporting Issues

Run `/bug` inside `qwen` to submit a report, or open an issue at:
https://github.com/DioNanos/qwen-code-termux/issues
