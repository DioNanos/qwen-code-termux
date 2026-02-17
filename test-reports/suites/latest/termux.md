# Latest Test Suite (Termux / Android ARM64)

**Purpose**: Validate Qwen Code Termux Edition (`@mmmbuto/qwen-code-termux`)

**Version**: v0.10.3-termux

WARNING: Run this suite before relying on this release in production.

---

## Install Guard (Required)

Confirm you are testing the Termux package (not upstream):

```bash
npm ls -g --depth=0 @mmmbuto/qwen-code-termux || true
```

**Expected**: installed version ends with `-termux` (example `0.10.3-termux`).

Confirm the command is the global one:

```bash
command -v qwen
ls -la "$(command -v qwen)"
```

---

## Version Guard (Required)

The CLI should report the Termux version:

```bash
qwen --version
```

**Expected**: `0.10.3-termux`

---

## Core Tests

### Workspace Setup

```bash
rm -rf ~/qwen-test-workspace
mkdir -p ~/qwen-test-workspace
cd ~/qwen-test-workspace
```

### Help Commands

```bash
qwen --help
qwen -h
```

### Interactive Mode

```bash
qwen
```

**Expected**: TUI loads, shows welcome message

### Simple Query

In interactive mode:

```text
What is 2+2?
```

**Expected**: Model responds with "4"

### Help Command

In interactive mode:

```text
/help
```

**Expected**: Lists available slash commands

### Auth Command

In interactive mode:

```text
/auth
```

**Expected**: Shows authentication options (Qwen OAuth / API key)

### Clear Command

In interactive mode:

```text
/clear
```

**Expected**: Clears conversation history

### Exit Command

In interactive mode:

```text
/exit
```

**Expected**: Exits cleanly to shell

---

## Termux-Specific Tests

### Environment Check

```bash
uname -a
echo "$PREFIX"
node --version
npm --version
command -v termux-open-url || true
```

### PTY Check

In interactive mode:

```text
Run: ls -la
```

**Expected**: Command executes, output shown (no "Permission denied")

### Storage Check (if termux-setup-storage ran)

```bash
ls ~/storage 2>/dev/null || echo "Storage not configured"
```

---

## Non-Interactive Mode

```bash
qwen -p "List files in current directory"
qwen -p "What is the current date?"
```

**Expected**: Text output, no TUI

---

## Test Report

After running tests, save your report in:

```
test-reports/0.10.3-termux/TEST-REPORT-YYYY-MM-DD.md
```

Use this template:

```markdown
# Test Report: v0.10.3-termux

**Date**: YYYY-MM-DD
**Tester**: Your name
**Device**: Android version, Termux version
**Node.js**: `node -v` output

## Results

| Test             | Status  | Notes |
| ---------------- | ------- | ----- |
| Install Guard    | ✅ / ❌ |       |
| Version Guard    | ✅ / ❌ |       |
| Help Commands    | ✅ / ❌ |       |
| Interactive Mode | ✅ / ❌ |       |
| Simple Query     | ✅ / ❌ |       |
| PTY Check        | ✅ / ❌ |       |
| Non-Interactive  | ✅ / ❌ |       |

## Issues Found

Describe any issues...

## Overall

✅ PASS / ❌ FAIL
```

---

**Last Updated**: 2026-02-17
**Maintainer**: @DioNanos
