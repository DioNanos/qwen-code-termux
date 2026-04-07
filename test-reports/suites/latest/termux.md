# Latest Test Suite (Termux / Android ARM64)

Target release: `0.14.1-termux`

Purpose: validate the published Termux package directly on Android/Termux.

## Install guard

```bash
npm ls -g --depth=0 @mmmbuto/qwen-code-termux || true
qwen --version
command -v qwen
```

Expected:

- package is installed globally
- version reports `0.14.1-termux` or an intentionally matching release string
- `qwen` resolves from npm global bin

## Basic CLI

```bash
qwen --help
qwen -p "print current directory" --yolo
```

## Termux runtime checks

```bash
uname -a
echo "$PREFIX"
node --version
npm --version
```

Expected:

- running on Android/Termux
- Node.js >= 20

## PTY check

```bash
npm ls -g @mmmbuto/node-pty-android-arm64 2>/dev/null || true
qwen -p "run uname -m and report the result" --yolo
```

Expected:

- no PTY-related crash
- shell execution works

## TTS check

```bash
command -v termux-tts-speak || true
termux-tts-speak "Qwen Code Termux test" || true
```

Expected:

- if `termux-api` is installed, command exists and speaks
- otherwise fail gracefully

## Filesystem sanity

```bash
rm -rf ~/qwen-test-workspace
mkdir -p ~/qwen-test-workspace
cd ~/qwen-test-workspace
echo "hello" > hello.txt
cat hello.txt
```

## MCP and auth surface

```bash
qwen --help | grep -i mcp || true
qwen
```

Expected:

- CLI starts
- MCP/auth help surface is present

## Report target

Write results into:

- [latest/0.14.1-termux/QWEN_TEST_REPORT_v0.14.1-termux.md](../../latest/0.14.1-termux/QWEN_TEST_REPORT_v0.14.1-termux.md)
