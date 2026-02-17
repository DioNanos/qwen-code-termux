# Test Reports

This folder contains human-run validation reports for Qwen Code Termux Edition.

## Latest Release

- **v0.10.3-termux**: `0.10.3-termux/`

## Report Index

| Version        | Report                    | Date       | Status        |
| -------------- | ------------------------- | ---------- | ------------- |
| v0.10.3-termux | `0.10.3-termux/README.md` | 2026-02-17 | ✅ Current    |
| v0.7.1-termux  | (legacy)                  | 2026-01-17 | 📦 Historical |

## Test Suites

Runnable checklists live under:

- `suites/`

## Notes

External baselines and reference notes:

- `notes/`

## Quick Test (Post-Install)

```bash
# 1. Version check
qwen --version

# 2. Basic smoke test
qwen -p "What is 2+2?"

# 3. Auth check
qwen /auth

# 4. Help check
qwen /help
```

## Reporting Issues

Found a Termux-specific issue? Please open an issue with:

1. Qwen Code version: `qwen --version`
2. Node.js version: `node --version`
3. Termux version: `pkg show termux`
4. Steps to reproduce
5. Expected vs actual behavior
6. Error logs

---

**Last Updated**: 2026-02-17
**Maintainer**: @DioNanos
