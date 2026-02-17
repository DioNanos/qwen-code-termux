# Test Suite: Termux Runtime

**Purpose**: Validate Termux-specific functionality
**Duration**: ~5 minutes
**Prerequisites**: Android device with Termux, qwen-code-termux installed

---

## Environment Setup

```bash
# 1. Verify Termux environment
echo $PREFIX
# Expected: /data/data/com.termux/files/usr

# 2. Verify Node.js
node --version
# Expected: v20+

# 3. Verify qwen-code-termux
qwen --version
# Expected: 0.10.3-termux
```

---

## Tests

### Test 1: prepare-termux.cjs Execution

During installation:

```bash
npm install -g ~/mmmbuto-qwen-code-termux-0.10.3-termux.tgz
```

**Expected**:

- Script `prepare-termux.cjs` runs
- Detects Termux environment
- Exits immediately (no husky, no bundle)
- Fast installation (< 10 seconds)

**Result**: [ ] PASS [ ] FAIL

---

### Test 2: Deprecation Warning Suppression

```bash
qwen -y "Hello, world!"
```

**Expected**:

- No `url.parse()` deprecation warnings
- Clean output

**Result**: [ ] PASS [ ] FAIL

---

### Test 3: PTY Execution

In interactive mode:

```text
Run: ls -la
```

**Expected**:

- Command executes
- Output shown in chat
- No "Permission denied" errors

**Result**: [ ] PASS [ ] FAIL

---

### Test 4: Shell Detection

```bash
echo $SHELL
# Note the shell path (e.g., /data/data/com.termux/files/usr/bin/bash)
```

In interactive mode:

```text
What shell am I using?
```

**Expected**: Correctly identifies bash/zsh

**Result**: [ ] PASS [ ] FAIL

---

### Test 5: File Access

In interactive mode:

```text
List files in current directory
```

**Expected**:

- Can read `/data/data/com.termux/files/home`
- No permission errors

**Result**: [ ] PASS [ ] FAIL

---

### Test 6: Storage Access

```bash
# Setup storage (if not done)
termux-setup-storage
```

In interactive mode:

```text
Show me files in ~/storage
```

**Expected**: Can access shared storage

**Result**: [ ] PASS [ ] FAIL

---

### Test 7: Clipboard (Optional)

If termux-api installed:

```bash
pkg install -y termux-api
```

In interactive mode:

```text
Copy "hello" to clipboard
```

**Expected**: Uses termux-clipboard-set

**Result**: [ ] PASS [ ] FAIL

---

### Test 8: Background Execution

```bash
# Run in background
qwen -p "What's the weather?" &
```

**Expected**:

- Runs without crashing
- Can be backgrounded

**Result**: [ ] PASS [ ] FAIL

---

## Post-Test Cleanup

```bash
# No cleanup needed
```

---

## Summary

| Test                 | Result |
| -------------------- | ------ |
| prepare-termux.cjs   | [ ]    |
| Warning suppression  | [ ]    |
| PTY execution        | [ ]    |
| Shell detection      | [ ]    |
| File access          | [ ]    |
| Storage access       | [ ]    |
| Clipboard (optional) | [ ]    |
| Background execution | [ ]    |

**Overall**: [ ] ALL PASS [ ] SOME FAIL

---

**Tester**: ******\_\_\_******
**Date**: ******\_\_\_******
**Device**: ******\_\_\_******
**Android Version**: ******\_\_\_******
**Notes**: ******\_\_\_******
