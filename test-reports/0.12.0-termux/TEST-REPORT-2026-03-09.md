# Test Report: v0.12.0-termux

**Date**: 2026-03-09  
**Tester**: Manual session  
**Device**: ASUS ROG Phone 3 (asusrp3), Android 11  
**Node.js**: v25.3.0  
**npm**: 11.11.0  
**Termux**: $PREFIX = /data/data/com.termux/files/usr  

---

## Results

### Install Guard

| Test             | Status  | Notes |
| ---------------- | ------- | ----- |
| Install Guard    | ⬜ TODO | `@mmmbuto/qwen-code-termux@0.12.0-termux` installed globally |
| Version Guard    | ⬜ TODO | `qwen --version` returns `0.12.0-termux` |
| Binary Location  | ⬜ TODO | Symlink verification |

### Core Tests

| Test             | Status  | Notes |
| ---------------- | ------- | ----- |
| Help Commands    | ⬜ TODO | `--help` shows usage with all options |
| Interactive Mode | ⬜ TODO | TUI loads correctly |
| Simple Query     | ⬜ TODO | `qwen -p "What is 2+2?"` returns `4` |
| Auth Command     | ⬜ TODO | `/auth` shows options |
| Clear Command    | ⬜ TODO | `/clear` clears history |
| Exit Command     | ⬜ TODO | `/exit` exits cleanly |

### Termux-Specific Tests

| Test             | Status  | Notes |
| ---------------- | ------- | ----- |
| Environment      | ⬜ TODO | Termux detected, PREFIX=/data/data/com.termux/files/usr |
| Node.js Version  | ⬜ TODO | v25.3.0 (>= 20.0.0 required) |
| termux-api       | ⬜ TODO | termux-open-url availability check |
| PTY Execution    | ⬜ TODO | Shell commands execute without permission errors |
| Storage Check    | ⬜ TODO | Storage configured check |

### Non-Interactive Mode

| Test             | Status  | Notes |
| ---------------- | ------- | ----- |
| Basic Prompt     | ⬜ TODO | `qwen -p "List files"` works |
| Date Query       | ⬜ TODO | `qwen -p "What is the current date?"` works |

---

## Detailed Test Output

### 1. Install Guard

```bash
npm ls -g --depth=0 @mmmbuto/qwen-code-termux
```

**Expected**: `@mmmbuto/qwen-code-termux@0.12.0-termux`

**Actual**: 

---

### 2. Version Guard

```bash
qwen --version
```

**Expected**: `0.12.0-termux`

**Actual**: 

---

### 3. Binary Location

```bash
which qwen
ls -la /data/data/com.termux/files/usr/bin/qwen
```

**Expected**: Symlink to `../lib/node_modules/@mmmbuto/qwen-code-termux/cli.js`

**Actual**: 

---

### 4. Help Command

```bash
qwen --help
```

**Expected**: Shows usage with all options

**Actual**: 

---

### 5. Interactive Mode

```bash
qwen
```

**Expected**: TUI loads, shows welcome message

**Actual**: 

---

### 6. Simple Query (Interactive)

In interactive mode:
```text
What is 2+2?
```

**Expected**: Model responds with "4"

**Actual**: 

---

### 7. Auth Command

In interactive mode:
```text
/auth
```

**Expected**: Shows authentication options (Qwen OAuth / API key)

**Actual**: 

---

### 8. Clear Command

In interactive mode:
```text
/clear
```

**Expected**: Clears conversation history

**Actual**: 

---

### 9. Exit Command

In interactive mode:
```text
/exit
```

**Expected**: Exits cleanly to shell

**Actual**: 

---

### 10. Environment Check

```bash
uname -a
echo "$PREFIX"
node --version
npm --version
```

**Actual**: 

---

### 11. PTY Check

In interactive mode:
```text
Run: ls -la
```

**Expected**: Command executes, output shown (no "Permission denied")

**Actual**: 

---

### 12. Non-Interactive Mode

```bash
qwen -p "List files in current directory"
qwen -p "What is the current date?"
```

**Expected**: Text output, no TUI

**Actual**: 

---

## Issues Found

*(Describe any issues encountered during testing)*



---

## Overall Assessment

**Status**: ⬜ PASS / ⬜ FAIL

**Notes**:



---

**Tester**: _______________  
**Date Completed**: _______________
