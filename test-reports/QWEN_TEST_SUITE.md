# 🧪 Qwen Code Termux - Universal Test Suite

**Version**: 1.0 (Compatible with all qwen-code-termux versions)
**Platform**: Android Termux ARM64
**Total Tests**: 78 (including 12 Termux-specific + 8 Package Verification)
**Purpose**: Automated functional testing for Qwen Code Termux builds

> ⚠️ **NOTE**: This test suite is adapted from codex-termux for qwen-code-termux.

---

## 📋 Instructions

**Read this file and execute ALL tests sequentially.**

For each test:
1. Execute the requested operation
2. Verify the result
3. Report: ✅ PASS or ❌ FAIL with error details
4. Continue to next test regardless of failures

At the end, provide a summary report with:
- Total tests: X
- Passed: Y
- Failed: Z
- Critical failures (if any)

---

## 🔧 Test Environment Setup

**Test workspace**: `/data/data/com.termux/files/home/qwen-test-workspace/`

### TEST-000: Environment Preparation

**Action**: Create clean test workspace

```bash
rm -rf ~/qwen-test-workspace
mkdir -p ~/qwen-test-workspace
cd ~/qwen-test-workspace
```

**Expected**: Directory created successfully

**Verify**: `pwd` shows `/data/data/com.termux/files/home/qwen-test-workspace`

---

## 📊 Category 1: System Information & Environment

### TEST-101: Display Qwen Version

**Action**: Show Qwen Code version

**Command**: 
```bash
qwen --version
```

**Expected**: Version string displayed (e.g., "0.13.1-termux")

**Verify**: Output contains version number in semver format

---

### TEST-102: Environment Context

**Action**: Display current environment information

**Tasks**:
1. Show current working directory
2. Show current user
3. Show shell type (bash/zsh)
4. Show available RAM
5. Show disk space

**Expected**: All information retrieved without errors

**Verify**:
- PWD is `/data/data/com.termux/files/home/qwen-test-workspace`
- User is `u0_aXXX` (Termux user)
- Shell is bash or zsh
- RAM and disk info displayed

---

### TEST-103: Platform Detection

**Action**: Detect and report platform details

**Tasks**:
1. OS name and version
2. Architecture (should be aarch64/arm64)
3. Termux version
4. Node.js version

**Expected**: Platform correctly identified as Android/Termux ARM64

**Verify**: Architecture shows aarch64 or arm64-v8a

---

## 📁 Category 2: File System Operations

### TEST-201: Create Text File

**Action**: Create a new text file with content

**Tasks**:
1. Create `test-file-1.txt` with content:
   ```
   Hello from Qwen Code Termux!
   This is a test file.
   Platform: Android Termux
   ```

**Expected**: File created successfully

**Verify**: File exists and contains exact content

---

### TEST-202: Read File

**Action**: Read an existing file

**Tasks**:
1. Read `test-file-1.txt` created in TEST-201
2. Display its contents

**Expected**: File content displayed correctly

**Verify**: Output matches content from TEST-201

---

### TEST-203: Modify File (Append)

**Action**: Append content to existing file

**Tasks**:
1. Append to `test-file-1.txt`:
   ```
   Test line 4
   Test line 5
   ```

**Expected**: Content appended successfully

**Verify**: File now has 5 lines total

---

### TEST-204: Modify File (Edit/Replace)

**Action**: Replace specific content in file

**Tasks**:
1. In `test-file-1.txt`, replace "test file" with "modified file"

**Expected**: Text replaced successfully

**Verify**: File contains "modified file" instead of "test file"

---

### TEST-205: Create Directory Structure

**Action**: Create nested directories

**Tasks**:
1. Create directory structure: `project/src/components/`
2. Create directory structure: `project/tests/unit/`

**Expected**: All directories created

**Verify**: Both paths exist

---

### TEST-206: List Directory Contents

**Action**: List files and directories

**Tasks**:
1. List all files in current workspace
2. List directory structure of `project/`

**Expected**: Correct file listing

**Verify**: Shows `test-file-1.txt` and `project/` directory

---

### TEST-207: Create Multiple Files

**Action**: Create several files in different directories

**Tasks**:
1. Create `project/README.md` with title "Qwen Test Project"
2. Create `project/src/main.js` with `console.log("Hello");`
3. Create `project/tests/test.js` with `test('basic', () => {});`

**Expected**: All 3 files created in correct locations

**Verify**: Each file exists with correct content

---

### TEST-208: Delete File

**Action**: Remove a file

**Tasks**:
1. Delete `test-file-1.txt`

**Expected**: File deleted successfully

**Verify**: File no longer exists

---

## 🔍 Category 3: Search & Discovery

### TEST-301: Find Files by Pattern (Glob)

**Action**: Search files using glob patterns

**Tasks**:
1. Find all `.js` files in workspace
2. Find all files in `project/src/` directory

**Expected**: Correct file matches

**Verify**:
- Finds `main.js` and `test.js`
- Finds files only in specified locations

---

### TEST-302: Search File Contents (Grep)

**Action**: Search text within files

**Tasks**:
1. Search for "Hello" in all files
2. Search for "test" (case-insensitive) in all files

**Expected**: Correct matches found

**Verify**:
- Finds "Hello" in `main.js`
- Finds "test" in multiple locations

---

### TEST-303: Recursive Directory Search

**Action**: Search entire directory tree

**Tasks**:
1. Find all markdown files (*.md) recursively
2. Count total files in workspace

**Expected**: All markdown files found

**Verify**: Finds at least `project/README.md`

---

## 🖥️ Category 4: Shell Command Execution

### TEST-401: Simple Shell Command

**Action**: Execute basic shell command

**Tasks**:
1. Run `echo "Test output"`
2. Run `whoami`
3. Run `uname -m`

**Expected**: Commands execute successfully

**Verify**:
- Echo shows "Test output"
- whoami shows user
- uname shows aarch64

---

### TEST-402: Command with Output Capture

**Action**: Run command and capture output

**Tasks**:
1. Run `ls -la` and analyze output
2. Run `free -h` and show memory info

**Expected**: Output captured and displayed

**Verify**: Output formatted and readable

---

### TEST-403: Command Chain (Pipes)

**Action**: Execute piped commands

**Tasks**:
1. Run `ls | grep project`
2. Run `echo "test data" | wc -w`

**Expected**: Piped commands work correctly

**Verify**: Results are correct

---

### TEST-404: Package Manager Test

**Action**: Test Termux package manager

**Tasks**:
1. Run `pkg list-installed | grep termux-tools`

**Expected**: Command executes without permission errors

**Verify**: Shows termux-tools package info

---

## 📝 Category 5: Text Processing

### TEST-501: JSON File Operations

**Action**: Work with JSON files

**Tasks**:
1. Create `data.json`:
   ```json
   {
     "name": "Qwen Test",
     "version": "1.0",
     "platform": "Android",
     "tests": ["file", "shell", "web"]
   }
   ```
2. Read and parse JSON
3. Extract value of "platform" field

**Expected**: JSON created and parsed correctly

**Verify**: Platform value is "Android"

---

### TEST-502: Multi-line File Creation

**Action**: Create file with complex content

**Tasks**:
1. Create `script.sh`:
   ```bash
   #!/data/data/com.termux/files/usr/bin/bash
   echo "Script test"
   echo "Line 2"
   echo "Line 3"
   ```
2. Make it executable
3. Run the script

**Expected**: Script created, made executable, runs successfully

**Verify**: Output shows all 3 echo lines

---

## 🌐 Category 6: Web & Network (if available)

### TEST-601: Web Search

**Action**: Perform web search (if WebSearch tool available)

**Tasks**:
1. Search: "Termux Android terminal emulator"
2. Report first 3 results

**Expected**: Search results returned

**Verify**: Results are relevant to Termux

**Note**: Skip if WebSearch not available

---

### TEST-602: Network Connectivity

**Action**: Test network access

**Tasks**:
1. Check if curl/wget available
2. If available, test connectivity: `curl -I https://www.google.com`

**Expected**: Network reachable (if tools available)

**Verify**: Response received or tool missing (acceptable)

---

## 🗂️ Category 7: Git Operations (if in git repo)

### TEST-701: Git Repository Detection

**Action**: Check if current directory is git repo

**Tasks**:
1. Run `git status` or equivalent check

**Expected**: Git available, reports status or "not a git repo"

**Verify**: Command executes without crash

---

### TEST-702: Git Information

**Action**: Get git repository info (if in repo)

**Tasks**:
1. Show current branch
2. Show last commit

**Expected**: Git info displayed

**Verify**: Information formatted correctly

---

## 🧠 Category 8: AI Capabilities

### TEST-801: Code Analysis

**Action**: Analyze code file

**Tasks**:
1. Read `project/src/main.js`
2. Explain what the code does
3. Suggest an improvement

**Expected**: Code understood and explained

**Verify**: Explanation is accurate

---

### TEST-802: Problem Solving

**Action**: Solve a simple coding problem

**Tasks**:
1. Create a Python script that prints numbers 1-10
2. Save as `numbers.py`
3. Explain the code

**Expected**: Script created and working

**Verify**: Script runs without errors

---

### TEST-803: Documentation Generation

**Action**: Generate documentation

**Tasks**:
1. Create a README.md for the `project/` directory
2. Include: project description, file structure, usage

**Expected**: README created with proper markdown

**Verify**: File contains structured documentation

---

## ⚠️ Category 9: Error Handling

### TEST-901: Handle Non-existent File

**Action**: Try to read file that doesn't exist

**Tasks**:
1. Attempt to read `nonexistent.txt`

**Expected**: Error handled gracefully (not crash)

**Verify**: Error message displayed, Qwen continues working

---

### TEST-902: Handle Invalid Command

**Action**: Run invalid shell command

**Tasks**:
1. Run `invalidcommandxyz123`

**Expected**: Error reported gracefully

**Verify**: Error message shown, Qwen continues working

---

### TEST-903: Handle Permission Issues

**Action**: Test permission constraints

**Tasks**:
1. Try to access `/root/` directory

**Expected**: Permission denied (expected behavior)

**Verify**: Error handled, no crash

---

## 🔐 Category 10: Termux-Specific Tests

### TEST-1001: Termux Paths

**Action**: Verify Termux-specific paths

**Tasks**:
1. Check `$PREFIX` environment variable
2. Verify `/data/data/com.termux/files/usr/` exists
3. Check `$HOME` points to Termux home

**Expected**: All Termux paths correct

**Verify**: Paths match Termux standards

---

### TEST-1002: Termux Shell Detection

**Action**: Verify shell is correctly detected

**Tasks**:
1. Check `$SHELL` variable
2. Verify shell binary location

**Expected**: Shell detected as bash or zsh in Termux

**Verify**: Shell path is `/data/data/com.termux/files/usr/bin/bash` or zsh

---

### TEST-1003: Termux-API Availability

**Action**: Check if Termux-API available

**Tasks**:
1. Test `termux-battery-status` (if installed)
2. Test `termux-wifi-connectioninfo` (if installed)

**Expected**: Commands execute or report "not installed"

**Verify**: No permission crashes

---

### TEST-1004: Termux Package Manager

**Action**: Test pkg command execution

**Tasks**:
1. Run `pkg list-installed | head -5`
2. Run `pkg search termux-tools`
3. Check pkg command doesn't crash

**Expected**: Commands execute without permission errors

**Verify**: Output shows package information

---

### TEST-1005: Termux Storage Paths

**Action**: Verify Termux storage access

**Tasks**:
1. Check if `~/storage` exists (termux-setup-storage)
2. Verify `/sdcard` is accessible (if storage setup)
3. Check internal storage paths

**Expected**: Storage paths accessible or not-setup reported

**Verify**: No crashes, proper error messages

---

### TEST-1006: Termux Environment Variables

**Action**: Verify Termux-specific env vars

**Tasks**:
1. Check `$PREFIX` = `/data/data/com.termux/files/usr`
2. Check `$TMPDIR` exists
3. Check `$LD_LIBRARY_PATH` contains Termux lib paths
4. Verify `$ANDROID_ROOT` set

**Expected**: All critical Termux vars present

**Verify**: Values match Termux standards

---

### TEST-1007: Android-Specific Commands

**Action**: Test Android/Termux specific utilities

**Tasks**:
1. Run `uname -m` (should show aarch64)
2. Run `getprop ro.build.version.sdk` (Android API level)
3. Check `termux-info` (if available)

**Expected**: Commands execute, show Android info

**Verify**: Architecture is ARM64, API level shown

---

### TEST-1008: Library Path Preservation

**Action**: Verify LD_LIBRARY_PATH not removed

**Tasks**:
1. Check `$LD_LIBRARY_PATH` in current environment
2. Execute bash command and verify LD_LIBRARY_PATH preserved
3. Test library loading works

**Expected**: LD_LIBRARY_PATH preserved in subprocesses

**Verify**: Libraries can be loaded, no "not found" errors

---

### TEST-1009: Termux Browser Open

**Action**: Test termux-open-url availability

**Tasks**:
1. Check if `termux-open-url` command exists
2. Verify it's in PATH
3. Test execution (without actually opening URL)

**Expected**: Command available for browser login

**Verify**: `which termux-open-url` returns path

---

### TEST-1010: Android Permissions

**Action**: Test Termux permission boundaries

**Tasks**:
1. Try to access `/data/data/com.termux/` (should work)
2. Try to access other app data (should fail)
3. Check file permissions in Termux home

**Expected**: Proper Android sandbox isolation

**Verify**: Own data accessible, other apps blocked

---

### TEST-1011: TTS Notification Test

**Action**: Test Termux TTS notification tool

**Tasks**:
1. Check if `termux-tts-speak` command exists
2. Test TTS: `termux-tts-speak "Qwen TTS test"`
3. Verify TTS tool is available in Qwen

**Expected**: TTS command available and functional

**Verify**: TTS speech is heard, no crashes

---

### TEST-1012: Node.js Version Check

**Action**: Verify Node.js version compatibility

**Tasks**:
1. Run `node --version`
2. Verify Node.js >= 20.0.0 (required by qwen-code-termux)

**Expected**: Node.js version is 20.0.0 or higher

**Verify**: Version meets minimum requirement

---

## 📦 Category 11: Package & Binary Verification (CRITICAL)

### TEST-1101: Verify Qwen CLI Command

**Action**: Verify main CLI command exists and works

**Tasks**:
1. Check `qwen --version` returns version
2. Verify `qwen --help` shows options

**Expected**: CLI command functional

**Verify**: Version displayed, help shows options

---

### TEST-1102: Verify Qwen Non-Interactive Mode

**Action**: Verify non-interactive/headless mode works

**Tasks**:
1. Run `qwen --prompt "echo hello" --yolo`
2. Verify command executes without TUI

**Expected**: Non-interactive mode functional

**Verify**: Command completes, output shown

---

### TEST-1103: NPM Package Structure

**Action**: Verify npm package has all required files

**Tasks**:
1. Find npm package location: `npm root -g`
2. Check package directory exists
3. Check main entry point exists

**Expected**: Package files present

**Verify**:
```bash
ls -la $(npm root -g)/@mmmbuto/qwen-code-termux/
```

---

### TEST-1104: Package.json Bin Entries

**Action**: Verify package.json exposes commands

**Tasks**:
1. Read package.json
2. Check "bin" section has "qwen" entry
3. Check "files" array includes required files

**Expected**: Commands exposed in package.json

**Verify**:
```json
"bin": {
  "qwen": "dist/cli.js"
}
```

---

### TEST-1105: Global Command Availability

**Action**: Verify command available after npm install -g

**Tasks**:
1. Run `which qwen`
2. Verify points to npm bin directory

**Expected**: Command in PATH

**Verify**: Returns valid path

---

### TEST-1106: Dependency Check

**Action**: Verify critical dependencies are installed

**Tasks**:
1. Check `@google/genai` is available
2. Check `@modelcontextprotocol/sdk` is available
3. Check `@lydell/node-pty` or `@mmmbuto/node-pty-android-arm64` is available

**Expected**: All critical dependencies present

**Verify**: No import errors when running qwen

---

### TEST-1107: PTY Support Verification

**Action**: Verify PTY support for Termux

**Tasks**:
1. Check if PTY module is loaded
2. Run shell command via qwen
3. Verify output is captured correctly

**Expected**: PTY support functional

**Verify**: Shell commands work with output capture

---

### TEST-1108: MCP Support Verification

**Action**: Verify MCP (Model Context Protocol) support

**Tasks**:
1. Check MCP client module exists
2. Verify MCP commands available in help

**Expected**: MCP support present

**Verify**: `qwen --help` shows MCP-related options

---

## 🧹 Category 12: Cleanup

### TEST-1201: Remove Test Files

**Action**: Clean up test workspace

**Tasks**:
1. Delete all created files
2. Remove `project/` directory
3. Remove workspace directory

**Expected**: All test artifacts removed

**Verify**: Workspace no longer exists

---

## 📊 Final Report Template

After completing all tests, **save the report to**:

- Latest (Termux): `test-reports/latest/<version>/QWEN_TEST_REPORT_v<version>.md`
- LTS: `test-reports/lts/<version>/QWEN_TEST_REPORT_v<version>_termux.md`

Where `<version>` is the installed package version (example: `0.13.1-termux`).

Provide report in this format:

```
=====================================
QWEN CODE TERMUX TEST SUITE - FINAL REPORT
=====================================

Platform: Android Termux ARM64
Qwen Version: [VERSION]
Test Date: [DATE]
Test Duration: [DURATION]

SUMMARY:
--------
Total Tests: X
✅ Passed: Y
❌ Failed: Z
⚠️ Skipped: W

CATEGORY BREAKDOWN:
-------------------
1. System Information: X/Y passed
2. File Operations: X/Y passed
3. Search & Discovery: X/Y passed
4. Shell Execution: X/Y passed
5. Text Processing: X/Y passed
6. Web & Network: X/Y passed (W skipped)
7. Git Operations: X/Y passed (W skipped)
8. AI Capabilities: X/Y passed
9. Error Handling: X/Y passed
10. Termux-Specific: X/Y passed
11. Package & Binary Verification: X/8 passed (CRITICAL!)
12. Cleanup: X/Y passed

CRITICAL FAILURES:
------------------
[List any critical failures that indicate broken functionality]

WARNINGS:
---------
[List any non-critical issues]

NOTES:
------
[Any additional observations]

VERDICT: ✅ PASS / ⚠️ PASS WITH WARNINGS / ❌ FAIL
```

---

## 🎯 Success Criteria

**Minimum requirements for PASS:**
- All Category 1-5 tests pass (System, Files, Search, Shell, Text)
- All Category 9 tests pass (Error Handling)
- All Category 10 tests pass (Termux-Specific)
- **All Category 11 tests pass (Package & Binary Verification) - CRITICAL!**
- No critical crashes
- At least 80% overall pass rate

**Categories that can be skipped:**
- Category 6 (Web) - if WebSearch unavailable
- Category 7 (Git) - if not in repo or git not installed
- Category 10 TEST-1003 - if Termux-API not installed

**Categories that CANNOT be skipped:**
- Category 11 (Package & Binary) - MUST pass for release approval

---

**Version**: 1.0
**Last Updated**: 2026-03-27
**License**: Apache 2.0 (same as Qwen Code)

**Changelog v1.0**:
- Initial test suite adapted from codex-termux for qwen-code-termux
- Added TTS notification test (TEST-1011) specific to qwen-code-termux
- Updated package verification for qwen-code-termux structure
