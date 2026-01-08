## Fix Auto-Update for Termux Fork

**Problema**: 
L'auto-update tentava di installare `@qwen-code/qwen-code@latest` ma il fork Termux usa `@mmmbuto/qwen-code-termux`, causando errore "Automatic update failed".

**Soluzione**:
Patchato `packages/cli/src/utils/installationInfo.ts` per rilevare dinamicamente il package name dal `package.json` e usarlo per tutti i comandi di update (npm, yarn, pnpm, bun).

**Comandi modificati**:
- npm: `npm install -g @mmmbuto/qwen-code-termux@latest`
- yarn: `yarn global add @mmmbuto/qwen-code-termux@latest`
- pnpm: `pnpm add -g @mmmbuto/qwen-code-termux@latest`
- bun: `bun add -g @mmmbuto/qwen-code-termux@latest`

**Note**:
- Il core package rimane `@qwen-code/qwen-code-core` (import upstream)
- La patch è dinamica e funziona per qualsiasi package name
