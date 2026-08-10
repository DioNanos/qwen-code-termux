# Qwen Code Termux Test Report — v0.21.8-termux

- **Date**: 2026-08-10
- **Platform**: Android 12 / Termux ARM64
- **Termux**: 0.118.0-ai.17
- **Node.js**: v26.4.0
- **npm**: 12.0.2
- **Package**: `@mmmbuto/qwen-code-termux@0.21.8-termux`
- **Upstream**: `QwenLM/qwen-code v0.21.8`

## Candidate summary

| Gate                   | Result  | Evidence                                                                                                |
| ---------------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| Artifact identity      | PASS    | SHA-256 `ee9bbd25db4fc8abe6cc17f4cc5dd68d10e85f999961e25bf5b881d81ebc9330`; 24,816,735 bytes; 934 files |
| npm 12 lifecycles      | PASS    | Qwen, Android PTY and sharp install scripts all exited 0; no blocked-script warning                     |
| Orphan wrapper repair  | PASS    | Exact stale standalone wrapper moved to a byte-identical recoverable backup                             |
| Negative wrapper guard | PASS    | Nonmatching executable wrapper remained byte-identical and executable                                   |
| Shell command cache    | PASS    | Stale Bash path reproduced; `hash -r` selected the npm launcher                                         |
| CLI                    | PASS    | `qwen --version` returned `0.21.8-termux`; `qwen --help` exited 0                                       |
| Fork identity          | PASS    | Launcher and managed updater both target `@mmmbuto/qwen-code-termux`                                    |
| Android PTY            | PASS    | Native PTY spawned `uname -m`, returned `aarch64`, exit 0                                               |
| Registry install       | PENDING | Required after publication to `next` and before promotion to `latest`                                   |

The candidate test used isolated temporary HOME, npm prefix and cache trees. It
did not modify the device's real installation or configuration and did not use
provider credentials or make a model request.

## npm 12 install policy

npm 12 blocks lifecycle scripts by default. The public install command uses the
narrow registry allowlist documented in the README:

```bash
npm install -g \
  --allow-scripts=@mmmbuto/qwen-code-termux,@mmmbuto/node-pty-android-arm64,sharp \
  @mmmbuto/qwen-code-termux@0.21.8-termux
```

The local-tarball candidate test used npm's explicit isolated-artifact override
because npm does not apply the package allowlist to a local root tarball. That
override is not part of the user installation instructions. The registry
allowlist path remains a separate release gate before `latest`.

## Wrapper regression matrix

The positive fixture reproduced the issue reported in
[#1](https://github.com/DioNanos/qwen-code-termux/issues/1): an executable
`~/.local/bin/qwen` wrapper pointed to a removed standalone installation and
shadowed the npm launcher.

- Before installation, `qwen --version` exited 127 through the stale wrapper.
- Postinstall moved only the exact orphan to
  `qwen.qwen-code-termux-orphan`; its SHA-256 remained unchanged.
- Bash deliberately retained the removed path until `hash -r`.
- After `hash -r`, `qwen` resolved to the npm launcher and reported
  `0.21.8-termux`.
- A second, nonmatching wrapper was not moved or rewritten.

## Android PTY

The installed optional dependency was
`@mmmbuto/node-pty-android-arm64@1.1.0`. Loading it succeeded and its native
`spawn()` API ran `uname -m`, produced `aarch64` and exited normally without a
crash.

## Repository release gates

- Termux patch contract: 21/21 markers present.
- CLI workspace: 18,565 tests passed, 22 skipped.
- Core workspace: 19,567 tests passed, 10 skipped.
- No-credential integration: 137/137 tests passed.
- Release scripts: 1,075 tests passed, 9 skipped.
- Independent read-only review found no release blocker for the exact candidate
  and artifact.

## Release decision

The immutable candidate is approved for publication to npm `next`. Promotion of
the same package to `latest`, plus the GitHub tag and release, remains conditional
on a fresh real-device installation from the npm registry using the narrow
allowlist above.
