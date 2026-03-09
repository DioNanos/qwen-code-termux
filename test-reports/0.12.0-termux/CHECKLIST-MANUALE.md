# Checklist Test Manuali - v0.12.0-termux

**Versione da testare**: `0.12.0-termux`  
**Durata stimata**: ~10 minuti  

---

## PRE-FLIGHT (30 secondi)

```bash
# 1. Verifica versione installata
qwen --version
# ✅ Atteso: 0.12.0-termux

# 2. Verifica percorso
which qwen
# ✅ Atteso: /data/data/com.termux/files/usr/bin/qwen

# 3. Verifica Node.js
node --version
# ✅ Atteso: v20+ (noi abbiamo v25.3.0)
```

---

## TEST 1: Help (30 secondi)

```bash
qwen --help
```

**Cosa verificare**:
- [ ] Mostra usage con tutte le opzioni
- [ ] Nessun errore a schermo
- [ ] Comandi elencati: mcp, extensions, ecc.

**Segna**: [ ] ✅ PASS  [ ] ❌ FAIL

---

## TEST 2: Prompt Non-Interattivo (1 minuto)

```bash
qwen -p "What is 2+2?"
```

**Cosa verificare**:
- [ ] Risponde "4" o equivalente
- [ ] Nessun errore
- [ ] Output pulito

**Segna**: [ ] ✅ PASS  [ ] ❌ FAIL

---

## TEST 3: Modalità Interattiva - Avvio (1 minuto)

```bash
qwen
```

**Cosa verificare**:
- [ ] TUI si carica
- [ ] Messaggio di benvenuto visibile
- [ ] Prompt pronto per input

**Segna**: [ ] ✅ PASS  [ ] ❌ FAIL

---

## TEST 4: Query Semplice (1 minuto)

In modalità interattiva, digita:
```
What is 2+2?
```

**Cosa verificare**:
- [ ] Il modello risponde correttamente
- [ ] Formattazione Markdown OK
- [ ] Nessun errore PTY

**Segna**: [ ] ✅ PASS  [ ] ❌ FAIL

---

## TEST 5: Comando Shell (2 minuti)

In modalità interattiva, digita:
```
Run: ls -la
```

**Cosa verificare**:
- [ ] Esegue il comando shell
- [ ] Mostra output nel chat
- [ ] Nessun "Permission denied"
- [ ] PTY funziona correttamente

**Segna**: [ ] ✅ PASS  [ ] ❌ FAIL

---

## TEST 6: /help (30 secondi)

In modalità interattiva, digita:
```
/help
```

**Cosa verificare**:
- [ ] Elenca tutti i comandi slash disponibili
- [ ] Formattazione leggibile

**Segna**: [ ] ✅ PASS  [ ] ❌ FAIL

---

## TEST 7: /auth (1 minuto)

In modalità interattiva, digita:
```
/auth
```

**Cosa verificare**:
- [ ] Mostra opzioni di autenticazione
- [ ] Qwen OAuth presente
- [ ] API key option presente

**Segna**: [ ] ✅ PASS  [ ] ❌ FAIL

---

## TEST 8: /clear (30 secondi)

In modalità interattiva, digita:
```
/clear
```

**Cosa verificare**:
- [ ] Conferma cancellazione
- [ ] History pulita

**Segna**: [ ] ✅ PASS  [ ] ❌ FAIL

---

## TEST 9: /exit (30 secondi)

In modalità interattiva, digita:
```
/exit
```

**Cosa verificare**:
- [ ] Esce cleanly
- [ ] Torna alla shell Termux
- [ ] Nessun crash o errore

**Segna**: [ ] ✅ PASS  [ ] ❌ FAIL

---

## TEST 10: Storage (opzionale, 1 minuto)

```bash
ls ~/storage 2>/dev/null || echo "Storage non configurato"
```

In modalità interattiva:
```
Show me files in current directory
```

**Cosa verificare**:
- [ ] Legge file da /data/data/com.termux/files/home
- [ ] Nessun errore di permesso

**Segna**: [ ] ✅ PASS  [ ] ❌ FAIL  [ ] ⬜ SKIP

---

## RIEPILOGO

| Test | Risultato |
|------|-----------|
| 1. Help | [ ] |
| 2. Non-interactive | [ ] |
| 3. Interactive avvio | [ ] |
| 4. Query semplice | [ ] |
| 5. Comando shell | [ ] |
| 6. /help | [ ] |
| 7. /auth | [ ] |
| 8. /clear | [ ] |
| 9. /exit | [ ] |
| 10. Storage (opt) | [ ] |

**TOTALE**: ___ / 10 (o ___ / 9 se skip storage)

**ESITO FINALE**: [ ] ✅ APPROVATO  [ ] ❌ RESPINTO

---

## NOTE AGGIUNTIVE

*(Annota qui eventuali problemi, comportamenti inaspettati, o osservazioni)*



---

**Tester**: _______________  
**Data**: 2026-03-09  
**Ora inizio**: ____:____  
**Ora fine**: ____:____
