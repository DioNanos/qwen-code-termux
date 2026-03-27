# Latest Test Suite (Termux / Android ARM64)

Purpose: validate the Latest Termux-only build (`@mmmbuto/qwen-code-termux`) using
the global `qwen` command.

WARNING: This release may ship with incomplete re-validation. Run this suite
before relying on it in production.

Manual execution policy:
- Execute tests manually, command-by-command.
- Do not run this suite via local automation scripts/custom runners.
- Compile reports only from manually executed test evidence.

## Install Guard (Required)

Confirm you are testing the Termux package (not upstream):

```bash
npm ls -g --depth=0 @mmmbuto/qwen-code-termux || true
```

Expected: installed version ends with `-termux` (example `0.13.1-termux`).

Confirm the command you are running is the global one:

```bash
command -v qwen
ls -la "$(command -v qwen)"
```

## Version Guard (Required)

The CLI should report the expected upstream semver line. Depending on upstream,
the `--version` output may be plain semver even when the npm/tag version uses
`-termux`.

```bash
qwen --version
```

## Core Tests

Workspace:

```bash
rm -rf ~/qwen-test-workspace
mkdir -p ~/qwen-test-workspace
cd ~/qwen-test-workspace
```

Help:

```bash
qwen --help
```

Non-interactive sanity:

```bash
# Non-interactive mode with --yolo flag
qwen --prompt "print current directory and list files" --yolo
qwen --prompt "create hello.txt with content 'hello' and then read it" --yolo
```

## Termux TTS Test

Verify TTS notification tool is available:

```bash
# Check termux-tts-speak availability
command -v termux-tts-speak
termux-tts-speak "Qwen TTS test"
```

Expected:
- command exists
- TTS speech is heard
- no crashes

## v0.13.1+ Regression Guards

### Node.js Version Check

```bash
node --version
```

Expected: Node.js >= 20.0.0 (required by qwen-code-termux)

### PTY Support Verification

```bash
# Check if PTY module is available for Termux
npm ls @mmmbuto/node-pty-android-arm64 2>/dev/null || npm ls @lydell/node-pty 2>/dev/null || true
```

Expected: One of the PTY packages is installed

### MCP Support Check

```bash
# Verify MCP support is present
qwen --help | grep -i mcp || true
```

Expected: MCP-related options shown (if available)

### Dependency Check

```bash
# Check critical dependencies
npm ls @google/genai 2>/dev/null || true
npm ls @modelcontextprotocol/sdk 2>/dev/null || true
```

Expected: Critical dependencies are installed

## Termux Checks

```bash
uname -a
echo "$PREFIX"
node --version
npm --version
command -v termux-open-url || true
```

## File System Tests

```bash
cd ~/qwen-test-workspace

# Create test file
echo "Qwen test content" > test-file.txt
cat test-file.txt

# Create directory structure
mkdir -p project/src project/tests

# List directory
ls -la
```

Expected: All file operations succeed

## Shell Command Tests

```bash
# Simple commands
echo "test" | wc -w
uname -m
pkg list-installed | head -3
```

Expected: Commands execute without permission errors

## Error Handling Tests

```bash
# Try to access non-existent file
cat nonexistent-file-xyz123.txt 2>&1 || true

# Try invalid command
invalidcommand123 2>&1 || true
```

Expected: Errors handled gracefully, no crashes

## Cleanup

```bash
rm -rf ~/qwen-test-workspace
```

Expected: Workspace removed successfully

---

## Report Template

After completing tests, save report to:
- Latest: `test-reports/latest/<version>/QWEN_TEST_REPORT_v<version>.md`

```
=====================================
QWEN CODE TERMUX TEST SUITE - FINAL REPORT
=====================================

Platform: Android Termux ARM64
Qwen Version: [VERSION]
Test Date: [DATE]

SUMMARY:
--------
Total Tests: X
✅ Passed: Y
❌ Failed: Z
⚠️ Skipped: W

CRITICAL FAILURES:
------------------
[List any critical failures]

VERDICT: ✅ PASS / ⚠️ PASS WITH WARNINGS / ❌ FAIL
```

---

**Version**: 1.0
**Last Updated**: 2026-03-27
