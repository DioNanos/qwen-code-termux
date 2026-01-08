# 🧪 Qwen Code Termux Test Suite (v0.6.405-termux)

**Goal**: Validate the Termux build with ARM64 PTY prebuild (no node-gyp).
Run from a clean shell on Termux ARM64.

**Version**: 0.6.405-termux
**Last Updated**: 2026-01-08

## 0. Prep

- Create workspace:
  `rm -rf ~/qwen-test && mkdir ~/qwen-test && cd ~/qwen-test`

## 1. Version & Env

1.1 `qwen --version` → shows `0.6.405-termux`
1.2 `node -v`, `uname -m`, `echo $PREFIX` (expect Termux paths / aarch64)

## 2. CLI Basics

2.1 `qwen --help` exits 0
2.2 `qwen --help | grep "model"` shows model option
2.3 `qwen --help | grep "auth"` shows auth commands

## 3. MCP

3.1 `qwen mcp list` works (empty ok)
3.2 `qwen mcp add --help` exits 0
3.3 `qwen mcp` shows available commands

## 4. Non-interactive

4.1 `qwen -p "What is 2+2?"` returns correct answer
4.2 `qwen -o json "pwd"` produces JSON output

## 5. File ops (Termux safe)

5.1 `echo hi > file.txt` then `qwen -p "read file.txt"` contains "hi"
5.2 `qwen -p "ls"` lists current dir

## 6. Settings Test

6.1 Start `qwen` interactively
6.2 Type `/settings`
6.3 Navigate with Up/Down arrows
6.4 Press Enter on `ui.hideBanner` to toggle
6.5 Verify layout is readable on small screen (no text overflow)

## 7. Banner Test

7.1 Default on Termux (no setting) → banner hidden
7.2 With `hideBanner: false` → banner shows on start
7.3 Check `~/.qwen/settings.json` for `ui.hideBanner` value

## 8. Termux specifics

8.1 `termux-info` runs (or prints not available) without crash
8.2 `which termux-open-url` exists
8.3 `echo $LD_LIBRARY_PATH` preserved

## 9. Package/binary

9.1 `ls $(npm root -g)/@mmmbuto/qwen-code-termux/dist/cli.js` exists
9.2 `node dist/cli.js --version` (from repo) prints 0.6.405-termux

## 10. PTY checks

10.1 `node -e "require('@mmmbuto/node-pty-android-arm64')"` should succeed
10.2 `node -e "require('node-pty')"` should fail gracefully (not installed)

## 11. Termux-API Tools (Optional)

11.1 **Discovery**:
`bash ~/Dev/qwen-code-termux/scripts/termux-tools/discovery.sh`

- Expect JSON array with tools like `termux_battery_status`

  11.2 **Tool Call**:
  `echo '{}' | bash ~/Dev/qwen-code-termux/scripts/termux-tools/call.sh termux_battery_status`

- Expect JSON output or valid Termux-API response

## 12. Responsive Settings Layout (NEW v0.6.0)

**CRITICAL**: Primary new feature for Termux mobile.

12.1 **Small screen rendering**:

- Run `qwen` interactively
- Type `/settings`
- Verify all settings labels are readable (no truncation)
- Values should be visible on right side
- No horizontal scrolling required

  12.2 **Navigation**:

- Up/Down arrows work through all settings
- Enter toggles boolean/enum settings
- Navigation doesn't break on small screen (≤ 40 cols)

  12.3 **Label wrap**:

- Long labels should wrap or truncate gracefully
- Fixed minWidth labels replaced with flexGrow

## 13. Banner Integration (NEW v0.6.0)

13.1 **Banner visibility**:

- Default on Termux: banner hidden
- `/settings` → `ui.hideBanner` → toggle to false → banner shows
- Restart `qwen` → verify banner visibility matches setting

  13.2 **Dynamic content**:

- Banner can show warning/info states
- Banner width adapts to terminal width

## 14. Auth Test

14.1 `/auth` command opens auth dialog
14.2 Qwen OAuth option available
14.3 API key option available

## Expected Outcome

- **ALL steps run without crash**; informational steps may show empty lists.
- **No build commands required**; native optional deps may fail to build but CLI
  must still work.
- **Settings layout** is readable on small screens.
- **Banner toggle** works correctly.
- **No regressions** from base qwen-code functionality.

## Known Issues / Limitations

- PTY depends on `@mmmbuto/node-pty-android-arm64` prebuild availability
- Secure keychain not available → credentials in plain files
- Some upstream features may not be Termux-optimized

## Test Report Template

```markdown
# Test Report v0.6.405-termux

**Date**: YYYY-MM-DD
**Device**: [ROG Phone 3 / Pixel 9 Pro / etc]
**Node**: vX.X.X
**Termux**: [version]

| Section                     | Status | Notes        |
| --------------------------- | ------ | ------------ |
| 1. Version & Env            | ✅/❌  |              |
| 2. CLI Basics               | ✅/❌  |              |
| 6. Settings Test            | ✅/❌  |              |
| **12. Responsive Settings** | ✅/❌  | **CRITICAL** |
| **13. Banner Integration**  | ✅/❌  | **CRITICAL** |
| 14. Auth Test               | ✅/❌  |              |

**Overall**: ✅ PASS / ❌ FAIL

**Critical issues**: [list any blocking issues]
**Minor issues**: [list non-blocking issues]
```

---

**Version History**:

- v0.6.405-termux (2026-01-08): Termux runtime patches (base64 polyfills, TERMUX\_\_PREFIX, punycode warn)
- v0.6.404-termux (2026-01-08): Updated test suite for qwen-code-termux
  - Responsive settings layout
  - Banner integration
  - Termux tools discovery
