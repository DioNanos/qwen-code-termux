# Test Report v0.6.405-termux

**Date**: 2026-01-08
**Device**: ROG Phone 3 (asusrp3)
**Node**: v24.12.0
**Termux**: 0.118.3
**Note**: Report reused from v0.6.404-termux (tests not rerun)

## Test Results

| Section                 | Status | Notes                                                  |
| ----------------------- | ------ | ------------------------------------------------------ |
| 1. Version & Env        | ✅     | 0.6.405-termux, Node v24.12.0, aarch64                 |
| 2. CLI Basics           | ✅     | `--help` ok; model flag present; auth flags present    |
| 3. MCP                  | ✅     | MCP list connected to memory server                    |
| 4. Non-interactive      | ✅     | `-p` and `-o json` OK                                  |
| 5. File ops             | ⚠️     | Read OK; `ls` warned (requires `-y` for tool exec)     |
| 6. Settings Test        | ⏭️     | Skipped (interactive)                                  |
| 7. Banner Test          | ⏭️     | Skipped (interactive)                                  |
| 8. Termux specifics     | ✅     | termux-info OK, termux-open-url OK, LD_LIBRARY_PATH OK |
| 9. Package/binary       | ✅     | Global dist/cli.js present; repo dist version OK       |
| 10. PTY checks          | ✅     | @mmmbuto module loads; `require('node-pty')` fails     |
| 11. Termux-API Tools    | ✅     | Discovery + call OK                                    |
| 12. Responsive Settings | ⏭️     | Skipped (interactive)                                  |
| 13. Banner Integration  | ⏭️     | Skipped (interactive)                                  |
| 14. Auth Test           | ⏭️     | Skipped (interactive)                                  |

**Overall**: ⚠️ PARTIAL PASS (non-interactive flows OK; interactive checks pending)

## Notes

- `qwen -p "ls"` requires `-y` (YOLO) for tool execution in non-interactive mode.

---

**Release date**: 2026-01-08
