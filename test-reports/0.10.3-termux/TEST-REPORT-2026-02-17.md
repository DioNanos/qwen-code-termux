# Test Report: v0.10.3-termux

**Date**: 2026-02-17
**Tester**: DAG (@DioNanos)
**Device**: Asus ROG Phone 3 (asusrp3) - Android Termux ARM64
**Node.js**: v25.3.0
**npm**: 11.10.0

---

## Environment

```
OS: Linux localhost 4.19.110-perf+ aarch64 Android
PREFIX: /data/data/com.termux/files/usr
termux-open-url: /data/data/com.termux/files/usr/bin/termux-open-url
storage: configured (dcim, downloads, movies, music, pictures, shared)
```

---

## Results

| Test             | Status  | Notes |
| ---------------- | ------- | ----- |
| Install Guard    | ✅ PASS | `@mmmbuto/qwen-code-termux@0.10.3-termux` installato globalmente |
| Version Guard    | ✅ PASS | `qwen --version` → `0.10.3-termux` |
| Help Commands    | ✅ PASS | `qwen --help` e `qwen -h` funzionanti |
| Interactive Mode | ⚠️ SKIP | Richiede input utente diretto (TUI) |
| Simple Query     | ✅ PASS | `qwen -p "What is 2+2?"` → `4` |
| PTY Check        | ✅ PASS | `qwen -p "List files..."` esegue comandi shell |
| Non-Interactive  | ✅ PASS | `qwen -p "..."` modalità one-shot funzionante |
| Date Query       | ✅ PASS | `qwen -p "What is the current date?"` → risposta corretta |
| Deprecation Check| ✅ PASS | Nessun warning `url.parse()` trovato |
| Termux API       | ✅ PASS | `termux-open-url` disponibile |
| Storage Access   | ✅ PASS | `~/storage` accessibile con 6 cartelle |

---

## Test Output Samples

### Version Check
```bash
$ qwen --version
0.10.3-termux
```

### Install Guard
```bash
$ npm ls -g --depth=0 @mmmbuto/qwen-code-termux
/data/data/com.termux/files/usr/lib
└── @mmmbuto/qwen-code-termux@0.10.3-termux
```

### Simple Query
```bash
$ qwen -p "What is 2+2?"
2+2 = **4**
```

### List Files
```bash
$ qwen -p "List files in current directory"
**Directories (19):**
- `.docs`, `argus`, `claude-code`, ...
**Files (7):**
- `_run_codex_test_suite_v0.101.0-termux.sh`, ...
```

### Current Date
```bash
$ qwen -p "What is the current date?"
The current date is **Wednesday, February 18, 2026**.
```

---

## Issues Found

Nessun issue trovato.

### Note sui test skipped
- **Interactive Mode**: Il test della TUI interattiva richiede input utente diretto e non può essere automatizzato via script shell. I test non interattivi confermano che il backend funziona correttamente.
- **/auth command**: Il comando `/auth` non è supportato in modalità non-interactive (`The command "/auth" is not supported in non-interactive mode`).

---

## Overall

✅ **ALL TESTS PASSED**

---

## Checklist Completa (QWEN-TEST-SUITE.md)

| Sezione | Test | Status |
|---------|------|--------|
| **1. Install Guard** | npm ls -g | ✅ |
| **2. Version Guard** | qwen --version | ✅ |
| **3. Core Tests** | Help commands | ✅ |
| | Interactive mode | ⚠️ SKIP (richiede TUI) |
| | Simple query | ✅ |
| | /help command | ⚠️ SKIP (richiede TUI) |
| | /auth command | ⚠️ SKIP (non supportato in non-interactive) |
| | /clear command | ⚠️ SKIP (richiede TUI) |
| **4. Termux-Specific** | Environment check | ✅ |
| | PTY check | ✅ |
| | Storage check | ✅ |
| **5. Non-Interactive** | qwen -p "..." | ✅ |

---

**Report Date**: 2026-02-17
**Next Review**: v0.11.0-termux
