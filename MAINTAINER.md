# Maintainer

Qwen Code Termux is maintained by **Davide A. Guglielmi** (GitHub:
[DioNanos](https://github.com/DioNanos)) as the porting / distribution
maintainer for Android ARM64 (Termux).

This is **not** an independent fork — Qwen Code Termux tracks
[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) closely and carries
only the Android/Termux compatibility delta needed to run it on Termux.

## Scope of maintenance

In scope:

- the Android ARM64 / Termux compatibility patches
- packaging and release engineering for Termux users
- the release flow on a dedicated maintenance branch with routine upstream
  rebases

Out of scope here:

- changes that belong upstream — please file those on
  [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) directly
- broad product features unrelated to Termux compatibility

## Reporting

| Channel | Where |
|---|---|
| Termux/Android bug reports, PRs | [DioNanos/qwen-code-termux](https://github.com/DioNanos/qwen-code-termux) |
| Generic Qwen Code bugs (not Termux-specific) | [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) |
| Security disclosures (Termux fork) | [`SECURITY.md`](./SECURITY.md) — `security@mmmbuto.com` |
| General contact | `dev@mmmbuto.com` |

When reporting a Termux bug, please include: device, Android version, Termux
build (Classic or F-Droid), Node.js version, and `qwen --version`.

## Identity

- Profile: [github.com/DioNanos](https://github.com/DioNanos)
- Project hub: [mmmbuto.com](https://mmmbuto.com)
- Maintainer page and dev journal: [dev.mmmbuto.com](https://dev.mmmbuto.com)

## License

Qwen Code Termux is distributed under the Apache License 2.0 inherited from
[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code). The Termux
compatibility patches are released under the same license.
See [`LICENSE`](./LICENSE).

---

*Per aspera ad astra.*
