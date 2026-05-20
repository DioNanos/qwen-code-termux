#!/usr/bin/env bash
set -euo pipefail

failures=0

check_file() {
  local path="$1"
  if [[ -f "${path}" ]]; then
    printf 'OK: %s\n' "${path}"
  else
    printf 'FAIL: missing %s\n' "${path}" >&2
    failures=$((failures + 1))
  fi
}

check_grep() {
  local pattern="$1"
  local path="$2"
  local label="$3"
  if grep -Fq -- "${pattern}" "${path}"; then
    printf 'OK: %s\n' "${label}"
  else
    printf 'FAIL: %s\n' "${label}" >&2
    failures=$((failures + 1))
  fi
}

check_node() {
  local label="$1"
  local script="$2"
  if node -e "${script}"; then
    printf 'OK: %s\n' "${label}"
  else
    printf 'FAIL: %s\n' "${label}" >&2
    failures=$((failures + 1))
  fi
}

check_file package.json
check_file packages/core/src/utils/termux-detect.ts
check_file packages/core/src/patches/termux-runtime.ts
check_file packages/core/src/tools/tts-notification.ts
check_file scripts/postinstall.cjs
check_file scripts/prepare-termux.cjs

check_node 'root package is fork package with -termux version' \
  "const p=require('./package.json'); process.exit(p.name==='@mmmbuto/qwen-code-termux' && /-termux$/.test(p.version) ? 0 : 1)"

check_node 'sandbox image points to fork tag' \
  "const p=require('./package.json'); process.exit(p.config?.sandboxImageUri===\`ghcr.io/mmmbuto/qwen-code-termux:\${p.version}\` ? 0 : 1)"

check_grep '@mmmbuto/node-pty-android-arm64' packages/core/src/utils/getPty.ts \
  'Android ARM64 PTY fallback'
check_grep './patches/termux-runtime.js' packages/core/src/index.ts \
  'Termux runtime patch imported'
check_grep 'TERMUX_VERSION' packages/core/src/utils/termux-detect.ts \
  'Termux detection checks TERMUX_VERSION'
check_grep 'TTS_NOTIFICATION' packages/core/src/tools/tool-names.ts \
  'tts_notification tool name registered'
check_grep '../tools/tts-notification.js' packages/core/src/config/config.ts \
  'tts_notification tool lazy registered'
check_grep '@mmmbuto/qwen-code-termux@latest' packages/cli/src/utils/installationInfo.ts \
  'update command points to fork package'
check_grep 'scripts/postinstall.cjs' scripts/prepare-package.js \
  'publish package copies postinstall'
check_grep '@mmmbuto/node-pty-android-arm64' scripts/prepare-package.js \
  'publish package includes Android PTY optional dependency'

if (( failures > 0 )); then
  printf '\nTermux patch check failed: %d issue(s)\n' "${failures}" >&2
  exit 1
fi

printf '\nTermux patch check passed.\n'
