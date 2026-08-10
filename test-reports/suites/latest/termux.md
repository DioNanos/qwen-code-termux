# Latest Test Suite (Termux / Android ARM64)

Target release: `0.21.8-termux`

Purpose: validate the published Termux package directly on Android/Termux.

## Registry install guard

```bash
npm install -g \
  --allow-scripts=@mmmbuto/qwen-code-termux,@mmmbuto/node-pty-android-arm64,sharp \
  @mmmbuto/qwen-code-termux@0.21.8-termux
hash -r
QWEN_ROOT="$(npm root -g)/@mmmbuto/qwen-code-termux"
npm ls -g --depth=0 @mmmbuto/qwen-code-termux
qwen --version
type -a qwen
```

Expected:

- package is installed globally
- npm reports no blocked install scripts
- version reports `0.21.8-termux`
- `qwen` resolves from npm global bin
- if an exact orphaned upstream standalone wrapper existed, it is retained as
  `qwen.qwen-code-termux-orphan`; any nonmatching wrapper is untouched

## Basic CLI

```bash
qwen --help
```

The release gate does not require provider credentials or a model request.

## Termux runtime checks

```bash
uname -a
echo "$PREFIX"
node --version
npm --version
```

Expected:

- running on Android/Termux
- Node.js >= 22

## PTY check

```bash
npm ls -g @mmmbuto/node-pty-android-arm64
node -e 'const p=require(process.argv[1]); const t=p.spawn("uname",["-m"]); t.onData(d=>process.stdout.write(d)); t.onExit(e=>process.exit(e.exitCode))' "$QWEN_ROOT/node_modules/@mmmbuto/node-pty-android-arm64"
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

## Package identity

```bash
node -e 'const p=require(process.argv[1]); console.log(p.name,p.version,p.bin.qwen)' "$QWEN_ROOT/package.json"
```

Expected:

- package is `@mmmbuto/qwen-code-termux@0.21.8-termux`
- launcher is `cli-entry.js`
- managed npm updates remain pinned to the fork package

## Report target

Write results into:

- [latest/v0.21.8-termux/QWEN_TEST_REPORT_v0.21.8-termux.md](../../latest/v0.21.8-termux/QWEN_TEST_REPORT_v0.21.8-termux.md)
