# Test Suite: Basic Smoke

**Purpose**: Quick validation of core functionality
**Duration**: ~2 minutes
**Prerequisites**: qwen-code-termux installed

---

## Pre-Flight Checks

```bash
# 1. Node.js version
node --version
# Expected: v20.0.0 or later

# 2. qwen-code-termux version
qwen --version
# Expected: 0.10.3-termux

# 3. npm package location
npm list -g @mmmbuto/qwen-code-termux
# Expected: Shows installed package
```

---

## Tests

### Test 1: Version Command

```bash
qwen --version
```

**Expected**: `0.10.3-termux`

**Result**: [ ] PASS [ ] FAIL

---

### Test 2: Help Flag

```bash
qwen --help
```

**Expected**: Shows usage information with options

**Result**: [ ] PASS [ ] FAIL

---

### Test 3: Interactive Launch

```bash
qwen
```

**Expected**: TUI loads, shows chat interface

**Result**: [ ] PASS [ ] FAIL

---

### Test 4: Simple Query

In interactive mode:

```text
What is 2+2?
```

**Expected**: Model responds with "4"

**Result**: [ ] PASS [ ] FAIL

---

### Test 5: Help Command

In interactive mode:

```text
/help
```

**Expected**: Lists available slash commands

**Result**: [ ] PASS [ ] FAIL

---

### Test 6: Auth Command

In interactive mode:

```text
/auth
```

**Expected**: Shows authentication options

**Result**: [ ] PASS [ ] FAIL

---

### Test 7: Clear Command

In interactive mode:

```text
/clear
```

**Expected**: Clears conversation history

**Result**: [ ] PASS [ ] FAIL

---

### Test 8: Exit Command

In interactive mode:

```text
/exit
```

**Expected**: Exits cleanly to shell

**Result**: [ ] PASS [ ] FAIL

---

## Post-Test Cleanup

```bash
# No cleanup needed - tests are non-destructive
```

---

## Summary

| Test               | Result |
| ------------------ | ------ |
| Version            | [ ]    |
| Help flag          | [ ]    |
| Interactive launch | [ ]    |
| Simple query       | [ ]    |
| Help command       | [ ]    |
| Auth command       | [ ]    |
| Clear command      | [ ]    |
| Exit command       | [ ]    |

**Overall**: [ ] ALL PASS [ ] SOME FAIL

---

**Tester**: ******\_\_\_******
**Date**: ******\_\_\_******
**Notes**: ******\_\_\_******
