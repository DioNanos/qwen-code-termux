# Qwen Code Termux Test Reports

This directory tracks release validation for the Termux fork.

## Files that matter for `latest`

- [suites/latest/termux.md](suites/latest/termux.md): command-by-command validation suite to run inside Termux
- [latest/v0.15.5-termux/QWEN_TEST_REPORT_v0.15.5-termux.md](latest/v0.15.5-termux/QWEN_TEST_REPORT_v0.15.5-termux.md): current release report
- [latest/0.14.3-termux/QWEN_TEST_REPORT_v0.14.3-termux.md](latest/0.14.3-termux/QWEN_TEST_REPORT_v0.14.3-termux.md): previous release report

## Policy

- Run the suite on a Termux device
- Record actual evidence, not inferred pass/fail
- Keep report filenames aligned with the npm/tag version

## Current release target

- Fork release: `0.15.5-termux`
- Upstream base: `v0.15.5`
