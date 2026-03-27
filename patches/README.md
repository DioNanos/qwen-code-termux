# Termux Compatibility Patches

**Upstream**: QwenLM/qwen-code v0.13.1
**This fork**: Termux Edition

## Patch List

### 1. prepare-termux.cjs

Skip husky+bundle during npm install on Termux.

### 2. postinstall.cjs

Show Termux install confirmation message.

### 3. termux-runtime.ts

Android base64 polyfill.

### 4. termux-detect.ts

Detect Termux environment (isTermux()).

### 5. tts-notification.ts

TTS notification tool using termux-tts-speak.

## Dependencies

- `@mmmbuto/pty-termux-utils` (when published)
- `termux-api` (optional, for TTS)

## Testing

```bash
# Test TTS
echo "Test message" | termux-tts-speak
```
