# Configuration

Qwen Code Termux Edition configuration is provider-neutral and follows the upstream CLI conventions.

## Quick Setup

### 1. Set your API key

```bash
export OPENAI_API_KEY="..."
```

### 2. Optional: Custom endpoint

```bash
export OPENAI_BASE_URL="https://your-gateway.example/v1"
```

### 3. Run

```bash
qwen
```

## Common Options

### Choose a model

```bash
qwen -m "<model>"
```

### Non-interactive mode

```bash
qwen -p "your prompt here"
```

### Interactive mode

```bash
qwen
```

## Configuration Files

### User settings

`~/.qwen/settings.json`

### Project settings

`.qwen/settings.json` (in your project root)

## Environment Variables

| Variable          | Description                |
| ----------------- | -------------------------- |
| `OPENAI_API_KEY`  | Your API key               |
| `OPENAI_BASE_URL` | Custom endpoint (optional) |
| `OPENAI_MODEL`    | Default model (optional)   |

## Notes

- This Termux Edition avoids provider-specific guidance in `README.md`
- Keep provider details in your environment or shell aliases
- Upstream docs remain the reference for full CLI surface area

## See Also

- [Test Reports](../test-reports/README.md)
- [Patches](../patches/README.md)
- [Build Notes](developers/BUILDING.md)
