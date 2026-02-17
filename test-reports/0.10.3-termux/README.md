# Test Report: v0.10.3-termux

**Release**: v0.10.3-termux
**Upstream Base**: QwenLM/qwen-code v0.10.3
**Date**: 2026-02-17
**Tester**: @DioNanos
**Platform**: Android Termux ARM64

---

## Build Summary

| Metric            | Value                                        |
| ----------------- | -------------------------------------------- |
| **npm package**   | `mmmbuto-qwen-code-termux-0.10.3-termux.tgz` |
| **Package size**  | 13.8 MB                                      |
| **Unpacked size** | 43.2 MB                                      |
| **Total files**   | 16                                           |
| **Build status**  | ✅ Success                                   |

---

## Installation Test

### Prerequisites

```bash
# Termux setup
pkg update -y && pkg upgrade -y
pkg install -y nodejs-lts git
node --version  # v20+
```

### Install Command

```bash
npm install -g ~/mmmbuto-qwen-code-termux-0.10.3-termux.tgz
```

### Expected Output

```
added X packages in Ys
```

### Post-Install Verification

```bash
qwen --version
# Expected: 0.10.3-termux
```

**Status**: ✅ PASS

---

## Runtime Tests

### 1. Basic Smoke Test

```bash
qwen -p "What is 2+2?"
```

**Expected**: Text response with answer

**Status**: ✅ PASS

---

### 2. Interactive Mode

```bash
qwen
```

**Expected**: TUI loads, shows welcome message

**Status**: ✅ PASS

---

### 3. Help Command

```text
/help
```

**Expected**: List of available commands

**Status**: ✅ PASS

---

### 4. Auth Command

```text
/auth
```

**Expected**: OAuth/API key selection menu

**Status**: ✅ PASS

---

### 5. Model Selection

```text
/model
```

**Expected**: List of available models

**Status**: ✅ PASS

---

## Termux-Specific Tests

### 1. prepare-termux.cjs Execution

During `npm install`, the `prepare` script should:

- Detect Termux environment
- Exit immediately (skip husky + bundle)

**Expected**: No errors, fast install

**Status**: ✅ PASS

---

### 2. Deprecation Warning Suppression

```bash
qwen -y "Hello"
```

**Expected**: No `url.parse()` deprecation warnings

**Status**: ✅ PASS

---

### 3. PTY Support

```bash
# Run a shell command in Agent mode
qwen -p "Run: ls -la"
```

**Expected**: Command executes, output shown

**Status**: ✅ PASS

---

## Auto-Update Test

### Version Check

```text
/version
```

**Expected**: Shows current version, checks for updates

**Status**: ✅ PASS

---

## Known Issues

None for v0.10.3-termux.

---

## Upgrade Notes

### From v0.7.1-termux

- Upstream base: v0.7.1 → v0.10.3
- Multi-provider support (Qwen, OpenAI, Anthropic, Gemini)
- Enhanced MCP server integration
- Improved sub-agents and skills system
- LSP support for code intelligence
- Updated UI components

---

## Checklist Summary

| Test                | Status  |
| ------------------- | ------- |
| Installation        | ✅ PASS |
| Version check       | ✅ PASS |
| Basic smoke         | ✅ PASS |
| Interactive mode    | ✅ PASS |
| Help command        | ✅ PASS |
| Auth command        | ✅ PASS |
| Model selection     | ✅ PASS |
| prepare-termux.cjs  | ✅ PASS |
| Warning suppression | ✅ PASS |
| PTY support         | ✅ PASS |
| Auto-update         | ✅ PASS |

**Overall**: ✅ ALL TESTS PASSED

---

**Report Date**: 2026-02-17
**Next Review**: v0.11.0-termux
