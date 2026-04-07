# Qwen Code Termux Test Reports

This directory tracks release validation for the Termux fork.

## Files that matter for `latest`

- [suites/latest/termux.md](suites/latest/termux.md): command-by-command validation suite to run inside Termux
- [latest/0.14.1-termux/QWEN_TEST_REPORT_v0.14.1-termux.md](latest/0.14.1-termux/QWEN_TEST_REPORT_v0.14.1-termux.md): report target for this release

## Policy

- Run the suite on a Termux device
- Record actual evidence, not inferred pass/fail
- Keep report filenames aligned with the npm/tag version

## Current release target

- Fork release: `0.14.1-termux`
- Upstream base: `v0.14.1`
