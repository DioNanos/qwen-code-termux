# Qwen Code Termux - Test Reports

This directory contains test reports and test suites for qwen-code-termux releases.

## Structure

```
test-reports/
├── QWEN_TEST_SUITE.md       # Main test suite document (84 tests)
├── suites/
│   ├── latest/
│   │   └── termux.md        # Latest release test suite
│   └── lts/
│       └── termux.md        # LTS release test suite
└── latest/                   # Reports for latest releases
    └── <version>/
        └── QWEN_TEST_REPORT_v<version>.md
└── lts/                      # Reports for LTS releases
    └── <version>/
        └── QWEN_TEST_REPORT_v<version>_lts.md
```

## Test Suites

### Main Test Suite (QWEN_TEST_SUITE.md)

Comprehensive test suite with 78 tests across 12 categories:

1. **System Information** (3 tests) - Version, environment, platform
2. **File Operations** (8 tests) - Create, read, modify, delete files
3. **Search & Discovery** (3 tests) - Glob, grep, recursive search
4. **Shell Execution** (4 tests) - Command execution, pipes, output capture
5. **Text Processing** (2 tests) - JSON, multi-line files
6. **Web & Network** (2 tests) - Web search, connectivity
7. **Git Operations** (2 tests) - Repo detection, git info
8. **AI Capabilities** (3 tests) - Code analysis, problem solving, docs
9. **Error Handling** (3 tests) - Non-existent files, invalid commands, permissions
10. **Termux-Specific** (12 tests) - Paths, shell, API, storage, TTS
11. **Package Verification** (8 tests) - Binary, npm package, dependencies
12. **Cleanup** (1 test) - Test workspace cleanup

### Latest Test Suite (suites/latest/termux.md)

Quick validation suite for latest releases. Focuses on:
- Install guard (verify Termux package)
- Version guard
- Core functionality
- TTS notification test
- Regression guards
- File system and shell tests

### LTS Test Suite (suites/lts/termux.md)

Minimal validation suite for LTS releases. Covers:
- Install and version guards
- Basic functionality
- File operations
- Shell commands
- TTS test

## Running Tests

### Manual Execution (Recommended)

```bash
# Navigate to test workspace
cd ~/qwen-test-workspace

# Run tests from QWEN_TEST_SUITE.md
# Execute each test command and verify results
```

### Automated Integration Tests

```bash
cd /data/data/com.termux/files/home/Dev/qwen-code-termux

# Run all tests
npm test

# Run integration tests
npm run test:integration:sandbox:none

# Run E2E tests
npm run test:e2e
```

## Report Format

Each test report should include:

```
=====================================
QWEN CODE TERMUX TEST SUITE - FINAL REPORT
=====================================

Platform: Android Termux ARM64
Qwen Version: [VERSION]
Test Date: [DATE]
Test Duration: [DURATION]

SUMMARY:
--------
Total Tests: X
✅ Passed: Y
❌ Failed: Z
⚠️ Skipped: W

CATEGORY BREAKDOWN:
-------------------
[Category-by-category results]

CRITICAL FAILURES:
------------------
[Any critical failures]

VERDICT: ✅ PASS / ⚠️ PASS WITH WARNINGS / ❌ FAIL
```

## Success Criteria

**PASS requirements:**
- All Category 1-5 tests pass
- All Category 9-10 tests pass  
- **All Category 11 tests pass (Package Verification) - CRITICAL!**
- No critical crashes
- At least 80% overall pass rate

**Can be skipped:**
- Category 6 (Web) - if WebSearch unavailable
- Category 7 (Git) - if not in repo

**Cannot be skipped:**
- Category 11 (Package & Binary) - MUST pass for release

## Termux-Specific Tests

Key Termux validations:

| Test | Purpose |
|------|---------|
| TEST-1001 | Termux paths ($PREFIX, $HOME) |
| TEST-1006 | Environment variables |
| TEST-1008 | LD_LIBRARY_PATH preservation |
| TEST-1009 | termux-open-url availability |
| TEST-1011 | TTS notification (termux-tts-speak) |
| TEST-1012 | Node.js version (>= 20.0.0) |

## TTS Notification Test

Qwen Code Termux includes a TTS notification tool:

```bash
# Test TTS directly
termux-tts-speak "Test message"

# TTS is available in Qwen as tool: tts_notification
qwen --prompt "Use TTS to say 'Build complete'" --yolo
```

## Version History

| Version | Date | Tests | Notes |
|---------|------|-------|-------|
| 1.0 | 2026-03-27 | 78 | Initial suite adapted from codex-termux |

---

**License**: Apache 2.0
