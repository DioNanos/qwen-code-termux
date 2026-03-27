# LTS Test Suite (Termux / Android ARM64)

Purpose: validate the LTS (Long Term Support) Termux build (`@mmmbuto/qwen-code-termux`)
using the global `qwen` command.

This suite is for stable, production-ready releases that have passed the Latest tests.

## Install Guard (Required)

Confirm you are testing the LTS Termux package:

```bash
npm ls -g --depth=0 @mmmbuto/qwen-code-termux || true
```

Expected: installed version ends with `-termux` and is an LTS release.

## Version Guard

```bash
qwen --version
```

Expected: LTS version number displayed

## Core Tests

Workspace:

```bash
rm -rf ~/qwen-test-workspace
mkdir -p ~/qwen-test-workspace
cd ~/qwen-test-workspace
```

Basic functionality:

```bash
qwen --help
qwen --version
```

Non-interactive mode:

```bash
qwen --prompt "echo hello world" --yolo
```

## File Operations

```bash
cd ~/qwen-test-workspace

# Create and read file
echo "LTS test" > lts-test.txt
cat lts-test.txt

# Create directory
mkdir -p lts-project/src
ls -la
```

Expected: All operations succeed

## Shell Commands

```bash
# Basic commands
whoami
uname -m
pwd
```

Expected: Commands work without errors

## TTS Test (Termux-specific)

```bash
termux-tts-speak "Qwen LTS test"
```

Expected: TTS speech heard

## Cleanup

```bash
rm -rf ~/qwen-test-workspace
```

---

## Report Template

Save report to:
- LTS: `test-reports/lts/<version>/QWEN_TEST_REPORT_v<version>_lts.md`

```
=====================================
QWEN CODE TERMUX LTS TEST SUITE - REPORT
=====================================

Platform: Android Termux ARM64
Qwen LTS Version: [VERSION]
Test Date: [DATE]

SUMMARY:
--------
Total Tests: X
✅ Passed: Y
❌ Failed: Z

VERDICT: ✅ PASS / ❌ FAIL
```

---

**Version**: 1.0
**Last Updated**: 2026-03-27
