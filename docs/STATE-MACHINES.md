---
title: FORTREX State Machines
summary: Legal states and transitions for every core FORTREX object, with triggers, invariants, and tested status. Master OS §L3 state-machine law. Tamper detection + DR drill evidence included.
---

# FORTREX STATE MACHINES — v1.0 (Oct 1, 2026)

> Master OS §L3 law: every important object has a documented legal state machine; every legal transition is implemented, every illegal one is guarded or tested. If a state can be reached that shouldn't exist, that is a P0.

Legend: **[M]** mechanical (automation, no human) · **[E]** editorial (admin action, TOTP-gated, audit-logged) · **[U]** user self-serve · **[F]** founder-only · ✅ tested live · ⚠️ guarded but not automated-tested · ⛔ gap (listed in §GAPS)

## 1. MEMBER — `member_status`: genesis | active | suspended | banned
```
genesis ──[M]──> active          (launch merge closes the founding window)
genesis/active ──[E]──> suspended
suspended ──[E]──> active        (reinstatement)
any ──[E]──> banned             (terminal; human-only, audit-logged)
```
- Invariant: founding members keep `genesis_multiplier = 1.25` forever, even after launch merge.
- ✅ RBAC battery (403s), genesis seat assignment; ⛔ suspension UI + self-serve lifecycle (deactivate/delete/export) — L5 gap.

## 2. TOURNAMENT — `tournament_status`: draft | upcoming | open | live | settling | completed | cancelled
```
draft ──[E]──> upcoming         (editorial)
upcoming ──[E]──> open          (join window opens; manual by design)
open ──[M]──> live              (startsAt — due-transitions cron)
live ──[M]──> settling          (endsAt — due-transitions cron)
settling ──[E]──> completed     (after scoring + prize review)
draft/upcoming ──[E]──> cancelled
completed/cancelled = terminal
```
- Illegal (guarded): skip-a-step (draft→live), settle→live, completed→anything, join when not `open` (✅ 409 tested: not_joinable / tournament_ended / tournament_full), duplicate slug (✅ 409).
- ✅ live battery: open→live→settling→scored end-to-end; due-transitions cron deployed; transitions 409s verified.

## 3. BROKER CONNECTION — `conn_status`: pending | connected | syncing | verified | stale | failed | revoked
```
pending ──[U]──> connected      (credentials validated)
connected ──[U/M]──> syncing ──> verified        (sync ok + partner rules)
syncing/connected ──> failed     (sync error) ──[U]──> syncing (retry)
verified ──[M]──> stale          (lastSyncAt too old) ──[U]──> syncing (reconnect)
any ──[U/E]──> revoked           (disconnect; re-connect = new pending flow)
```
- Invariants: mock provider never in production; `accountFingerprint = sha256(provider:externalId)` blocks multi-accounting; sync is idempotent on (connectionId, brokerTradeId) ✅.
- ✅ stale transition now automated: rides with /api/cron/due-transitions (daily 03:45 UTC, CRON_SECRET-gated; dedicated route kept as manual ops trigger) flips connected|verified rows whose effective last sync (lastSyncAt, else createdAt) is older than 7 days to `stale`. Live-verified Oct 1: probe flip on lab, idempotent second run, fresh rows untouched, audit-logged; prod 200 marked:0 (no active connections yet). Stale still scores (rank 1, below fresh verified) — truthful UI, no revocation.

## 4. TOURNAMENT ENTRY (participant) — implicit: joined → scored → (ranked) → [prized]
```
none ──[U]──> joined            (only when tournament=open + connection verified; unique (tournament, user))
joined ──[M]──> scored          (scoreTournament: writes score + scoreSnapshot + rank)
scored ──[E]──> prized           (prize paid = NEW rex_ledger row, reason=tournament_prize)
```
- Invariants: `scoreSnapshot` stores the FULL inputs (trade ids + formula definition) → bit-for-bit reproducible; flagged participants still ranked (human review, never auto-punish) ✅.

## 5. REX LEDGER — append-only. States: none (no update, no delete, ever).
```
event ──[M/E]──> new row        (reason ∈ 10-value enum; delta; balanceAfter; multiplier)
```
- Invariant (verified in DR drill 2026-10-01): `sum(ledger.delta) = sum(users.rex_balance)` on every copy (prod: 12 = 12 ✓).
- ⛔ DB-level immutability trigger — currently enforced by code only. Listed in §GAPS (P2 hardening).

## 6. REFERRAL — pending → paid
```
signup with code ──[M]──> paid  (+50 REX via databaseHooks, one row per referred user — idempotent)
```
- ✅ verified live: chain pays automatically, no double-pay on re-trigger.
- ⚠️ self-referral/same-account loop → fingerprint guard exists; loop-abuse automation is an L3 anti-cheat TODO.

## 7. PARTNER CLAIM — `status`: pending | provisional | review | approved | rejected (varchar, `partner_claims`)
```
pending ──> provisional ──> review ──[E]──> approved | rejected
```
- ✅ schema live; ⚠️ admin review UI = L6 support-queue work.

## 8. NOTIFICATION — created → read
```
event ──[M]──> created ──[U]──> read
```
- ✅ live list + movement alerts (rankAlert); L9 pipeline (EVENT→IMPORTANCE→CHANNEL→RETRY) builds at email activation.

## 9. ADMIN ACTION — append-only audit_log (every TOTP-gated mutation)
```
request ──[E: TOTP + role]──> applied + audit row
```
- ✅ verified live: 403 without/with wrong code, valid passes; audit rows present (prod: 2).

---

## INTEGRITY EVIDENCE (2026-10-01 cycle)

1. **prove-the-rank** (`platform/scripts/prove-the-rank.mts`): re-derives every score + rank from stored snapshots. Lab arena `audit-probe-arena` (24 trades, real scoreTournament pipeline, score 98.3385): **PASS** — recomputation matched to 1e-6, rank reproduced.
2. **Tamper detection** (`prove-the-rank-tamper.mts`): score inflated +5 in lab → audit **FAIL** with exact diagnosis (`stored 103.3385 → recomputed 98.3385`); re-score via real pipeline → **PASS**. The audit catches irreproducible results, not just runs green.
3. **DR drill** (`platform/scripts/dr-drill.mts`): production branch restored into a fresh Neon branch — identical on tables(21), users(1), REX ledger rows(1)+total(12), minted total(12), participants, trades, audit_log(2). REX invariant holds on the restored copy. Drill branch deleted after verification. Answer to "what happens if FORTREX disappears tonight": a full copy is one API call + ~90s away, verified today, not assumed.

## §GAPS (from this audit — prioritized)
| Gap | Layer | Priority |
|---|---|---|
| Ledger DB-level immutability trigger (append-only enforced in DB, not just code) | L3/L5 | P2 |
| ~~`stale` connection marking cron~~ CLOSED Oct 1 (cron live, scripts/verify-stale-cron.mts is the standing verification) | L4 | closed |
| Member suspension/reinstatement admin UI | L5/L6 | P1 pre-launch-lite |
| Referral loop-abuse automation (fingerprint guard exists, no sweep job) | L3 | P2 |
| Deletion / export-my-data paths | L5 | P1 (export) / P2 (deletion) |
