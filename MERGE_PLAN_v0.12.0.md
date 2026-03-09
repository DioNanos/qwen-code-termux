# 📋 Piano di Merge: v0.11.3-termux → v0.12.0

**Data**: 2026-03-09  
**Autore**: DAG  
**Stato**: In analisi

---

## 🎯 Obiettivo

Aggiornare il fork Termux da **v0.11.3-termux** (base: upstream v0.11.1) a **v0.12.0-termux** (base: upstream v0.12.0).

---

## 📊 Analisi Versioni

| Componente          | Attuale         | Target          | Delta       |
| ------------------- | --------------- | --------------- | ----------- |
| **Fork Termux**     | `0.11.3-termux` | `0.12.0-termux` | +1 minor    |
| **Upstream Base**   | `v0.11.1`       | `v0.12.0`       | +447 commit |
| **File modificati** | -               | 312 file        | -           |
| **Release Date**    | 2026-03-04      | 2026-03-09      | +5 giorni   |

---

## 🔍 Cambiamenti Upstream v0.12.0

### Nuove Feature Principali

1. **Extension Management TUI** - UI per gestire estensioni MCP
2. **Hook System** - Supporto per hook personalizzati (session start/end, stop)
3. **Ask User Question Tool** - Nuovo tool per interazioni utente
4. **ACP SDK Migration** - Migrazione a `@agentclientprotocol/sdk`
5. **Shell PTY Default** - PTY abilitato di default per shell execution

### Cambiamenti Tecnici Rilevanti

```diff
# packages/core/package.json
+ "iconv-lite": "^0.6.3"  # Nuova dipendenza

# optionalDependencies (upstream)
  "@lydell/node-pty": "1.1.0"
+ "@lydell/node-pty-darwin-arm64": "1.1.0"
+ "@lydell/node-pty-darwin-x64": "1.1.0"
+ "@lydell/node-pty-linux-x64": "1.1.0"
+ "@lydell/node-pty-win32-arm64": "1.1.0"
+ "@lydell/node-pty-win32-x64": "1.1.0"
```

### File Critici Modificati

| Categoria    | File                                  | Impatto Termux                  |
| ------------ | ------------------------------------- | ------------------------------- |
| **PTY**      | `packages/core/src/utils/getPty.ts`   | ⚠️ ALTO - Da mergiare con patch |
| **ACP**      | `packages/cli/src/acp-integration/*`  | ⚠️ MEDIO - Nuova struttura      |
| **Hooks**    | `packages/cli/src/commands/hooks.tsx` | ✅ BASSO - Feature nuova        |
| **Settings** | `packages/cli/src/config/settings.ts` | ⚠️ MEDIO - Migration schema     |
| **i18n**     | `packages/cli/src/i18n/locales/*.js`  | ✅ BASSO - Update testi         |
| **Test**     | `integration-tests/*`                 | ✅ BASSO - Test update          |

---

## 🔧 Patch Termux da Mantenere

### 1. `scripts/prepare-termux.cjs` ✅

**Stato**: Nessun conflitto previsto  
**Azione**: Mantenere invariato

### 2. `packages/cli/src/patches/termux-runtime.ts` ✅

**Stato**: Nessun conflitto previsto  
**Azione**: Mantenere invariato

### 3. `packages/core/src/utils/getPty.ts` ⚠️

**Stato**: UPSTREAM CAMBIATO  
**Upstream v0.11.1**:

```typescript
export type PtyImplementation = { module: any; name: string } | null;
export const getPty = async (): Promise<PtyImplementation> => { ... }
```

**Upstream v0.12.0**:

```typescript
export type PtyImplementation = {
  module: any;
  name: 'lydell-node-pty' | 'node-pty';
} | null;
// Stessa logica, tipo più stretto
```

**Azione**: Applicare patch Termux:

```typescript
// Re-export da @mmmbuto/pty-termux-utils
export type { PtyImplementation, IPty } from '@mmmbuto/pty-termux-utils';
export { getPty, spawnPty } from '@mmmbuto/pty-termux-utils';
```

### 4. `package.json` (root) ⚠️

**Cambiamenti da applicare**:

```diff
- "name": "@qwen-code/qwen-code",
+ "name": "@mmmbuto/qwen-code-termux",
- "version": "0.12.0",
+ "version": "0.12.0-termux",

# Prepare script (da upstream "husky && npm run build && npm run bundle")
"prepare": "node scripts/prepare-termux.cjs"

# Sandbox image
"sandboxImageUri": "ghcr.io/mmmbuto/qwen-code-termux:0.12.0-termux"

# Optional dependencies (Termux-specific)
"optionalDependencies": {
  "@mmmbuto/node-pty-android-arm64": "~1.1.0",
  "@lydell/node-pty-linux-arm64": "~1.2.0-beta.2"
}
```

### 5. `packages/core/package.json` ⚠️

**Azione**: Aggiungere dipendenza PTY Termux:

```diff
+ "@mmmbuto/pty-termux-utils": "^1.1.4"
```

### 6. `scripts/prepare-package.js` ✅

**Stato**: Upstream compatibile  
**Azione**: Verificare che copi i locales correttamente

### 7. `scripts/start.js` ✅

**Stato**: Nessun cambiamento critico  
**Azione**: Verificare se serve `process.noDeprecation = true`

### 8. `packages/cli/src/utils/installationInfo.ts` ⚠️

**Stato**: Da verificare  
**Azione**: Controllare che updateCommand usi `@mmmbuto/qwen-code-termux`

---

## 📝 Piano di Esecuzione

### Fase 1: Preparazione (COMPLETATO)

- [x] Fetch upstream tags
- [x] Analisi changelog v0.12.0
- [x] Identificazione file critici
- [ ] Backup branch corrente

### Fase 2: Merge Upstream

```bash
# Crea branch di merge
git checkout -b merge/upstream-v0.12.0

# Merge upstream
git merge v0.12.0 -m "Merge upstream v0.12.0 into Termux fork"

# Risolvi conflitti (se presenti)
# File probabili:
# - packages/core/src/utils/getPty.ts
# - package.json
# - packages/core/package.json
```

### Fase 3: Re-applicazione Patch Termux

#### 3.1 PTY Handler

```bash
# Modifica getPty.ts
cat > packages/core/src/utils/getPty.ts << 'EOF'
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// Re-export from @mmmbuto/pty-termux-utils for unified PTY handling
export type { PtyImplementation, IPty } from '@mmmbuto/pty-termux-utils';
export { getPty, spawnPty } from '@mmmbuto/pty-termux-utils';
EOF
```

#### 3.2 Package.json Root

- Cambiare name/version
- Aggiornare prepare script
- Aggiornare sandboxImageUri
- Aggiornare optionalDependencies

#### 3.3 Package.json Core

- Aggiungere `@mmmbuto/pty-termux-utils`

#### 3.4 Verificare installationInfo.ts

- Confermare updateCommand corretto

### Fase 4: Build & Test

```bash
# Clean
npm run clean

# Install
npm ci

# Build
npm run build

# Bundle
npm run bundle

# Test base
npm run test:ci

# Test integration (sandbox:none)
npm run test:integration:sandbox:none
```

### Fase 5: Release

```bash
# Tag release
git tag v0.12.0-termux

# Push
git push origin v0.12.0-termux

# Publish (se tutto OK)
npm run prepare:package
cd dist && npm publish --access public
```

---

## ⚠️ Rischi e Mitigazione

| Rischio                | Probabilità | Impatto | Mitigazione                    |
| ---------------------- | ----------- | ------- | ------------------------------ |
| Conflitti getPty.ts    | ALTA        | MEDIO   | Backup pre-merge, patch pronta |
| Breaking changes ACP   | MEDIA       | ALTO    | Test estesi acp-integration    |
| Dipendenze mancanti    | BASSA       | MEDIO   | `npm ci` verifica lockfile     |
| Test fallimenti        | MEDIA       | BASSO   | Fix iterativi post-merge       |
| PTY Android regression | BASSA       | ALTO    | Test su dispositivo fisico     |

---

## ✅ Checklist Pre-Release

- [ ] Merge upstream v0.12.0 completato
- [ ] Patch Termux re-applicate
- [ ] Build senza errori
- [ ] Test CI passano
- [ ] Test su Termux fisico (Android ARM64)
- [ ] Versione corretta (`0.12.0-termux`)
- [ ] CHANGELOG aggiornato
- [ ] README aggiornato (se necessario)
- [ ] Publish NPM completato
- [ ] Git tag pushato

---

## 📚 Riferimenti

- **Upstream Release**: https://github.com/QwenLM/qwen-code/releases/tag/v0.12.0
- **Termux Patches**: `patches/README.md`
- **Test Reports**: `test-reports/README.md`
- **Build Docs**: `docs/developers/BUILDING.md`

---

**Prossimo Step**: Eseguire backup e procedere con merge effettivo.
