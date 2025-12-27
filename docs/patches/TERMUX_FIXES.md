# Termux Fixes (0.6.2-termux)

Minimal notes for Termux‑specific fixes.

## Fixes

- `hideBanner` also suppresses startup warnings on Termux (default: hidden unless explicitly set).
- OAuth browser launch uses `termux-open-url`, with Android `am start` fallback.
- Browser auto-launch allowed on Termux even with `SSH_CONNECTION` set.
- Termux `am` is preferred to avoid Android permission denial.
- Bundle includes `tiktoken_bg.wasm` to avoid tokenizer load failures.

## Test

```bash
# Banner
qwen -y

# OAuth
qwen
/auth
```

## Optional

Force a specific browser app:

```bash
export TERMUX_OPEN_URL_APP=com.android.chrome
```
