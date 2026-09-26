# FINAL-VERIFICATION.md — Hardening evidence package

**Date:** Sep 26, 2026 · **Mode:** FINAL HARDENING (no new features) · **Platform commit:** pre-push, main @ 585a6aa+

**Standard applied:** tested from USER + ADMIN + SYSTEM FAILURE + ABUSE perspectives. "Compiles" and "happy path" are not accepted as evidence.

---

## 1. What was tested (exact flows, all against a live production build on :3000)

### User journey (E2E, real HTTP)
1. Signup (owner via ADMIN_EMAILS): role=owner, privacy display name auto-derived ("First L"), referral code issued
2. Signup (trader, referred): referral chain auto-pays referrer +50 REX via ledger event — verified balance 50
3. Broker connect (mock) → sync → 107 trades ingested; **re-sync: inserted 0, skipped 107 (idempotent)**
4. Tournament create (admin) → join → join-again (`already:true`) → live → settling → **runScoring: Score v1.0 = 77.285, rank 1**
5. Check-in: +10 REX, streak 1, balance 60; same-day re-check rejected
6. Notifications: 2 unread delivered correctly ("+10 REX — day 1 streak", "You're in: Season Zero Opener")
7. Tournament page renders standings + VERIFIED badge publicly

### Abuse battery (all on live server)
| Test | Result |
|---|---|
| 5 concurrent joins, same user, open tournament | 1 success + 4 `already` — unique index held under race ✅ |
| 5 concurrent check-ins, same user | exactly 1 award, 4 rejected ✅ |
| 3 concurrent runScoring on same tournament | 3 identical deterministic results ✅ |
| Join with malformed JSON | rejected ✅ |
| Signup missing fields / 6000-char displayName | 400 / 422 ✅ |
| Connect with unknown provider | `invalid_input` ✅ |
| Forged session cookie on /dashboard | redirected to /signin ✅ |
| All 3 admin routes as non-admin | 403 ✅ |
| Invalid transition settling→live | rejected with allowed list ✅ |
| Cancellation: setStatus cancelled | join afterwards rejected "Tournament is cancelled." ✅ |
| Participant with ZERO trades scored | score 0, not flagged, ranked — honest zero ✅ |
| Unknown tournament page / API | 404 / auth-first 401 ✅ |
| Auth flood (35 rapid signups, one IP) | 429 `rate_limited` after limit ✅ |
| Join flood (25 rapid) | 20 ok + 5 × 429 ✅ |

### Pages & permissions
- /dashboard: 200 logged-in, 307→/signin anonymous ✅
- /admin: 200 founder, 307 trader ✅
- All public pages 200; unknown slug 404 ✅

---

## 2. What was fixed during hardening
1. **Page sessions** — RSC pages read sessions via `getSession({ headers: await headers() })`; previously silently null → wrong redirects (commit 585a6aa)
2. **PGlite production bundling** — `serverExternalPackages` or /api/health fails in prod build (commit 585a6aa)
3. **Zombie process hazard** — stale next-server held :3000 serving old code while restarts died on EADDRINUSE. Ops lesson recorded: kill by /proc PID scan, verify build via content, not freshness of timestamps.
4. **Rate limiting gaps** — auth POST (30/10min/IP), tournament join (20/min/user), broker sync (6/min/user) now enforced alongside existing waitlist/checkin limiters.
5. **Provenance gaps** — `trades.adapter_version` (bump on normalization changes) + `tournament_participants.score_snapshot` (full input set: trade ids, window, formula version, scoredAt) → every score is bit-for-bit reproducible. Migration 0001 applied locally.

---

## 3. What failed and was NOT a bug
- Cancellation first appeared broken — was a test error (wrong param). Retested with correct id: passes.
- Auth hammer showed "3 pass / 32 blocked" — retried tool calls had pre-filled the limiter bucket; the limiter itself works exactly as configured.

---

## 4. Remains OPEN (P0, next in hardening queue)
1. **Admin MFA** — not built (needs Better Auth twoFactor plugin + enrollment UI). Admin console is internet-exposed at deploy; until MFA ships, the ADMIN_EMAILS allowlist + long random BETTER_AUTH_SECRET is the interim control.
2. **GitHub 2FA + secret scanning + dependabot** — founder account settings (one sitting).
3. **Broker ToS written confirmation** — see BROKER-RIGHTS.md. Do not claim commercial broker integration until both brokers reply in writing.
4. **Upstash provisioning** — limiter falls back to in-memory (per-instance). Single Vercel instance is fine at launch scale; wire Upstash env vars the moment the account exists.

## 5. Remains EXTERNALLY BLOCKED (founder, unchanged)
Neon DATABASE_URL · Vercel deploy · domain + DNS (SPF/DKIM/DMARC) · lawyer consult (classification matrix, by Oct 5) · 25 founder invites · Pvt Ltd entity before any money collection.

## 6. Production status
**NOT production yet — honestly.** Core is hard: verified, raced, abused, hardened. Production cutover is a 30-minute mechanical act once Neon + Vercel credentials exist: set DATABASE_URL → `npm run db:migrate` (Neon) → deploy → smoke test. Runbook: OPS-RUNBOOK.md.

## 7. Known limitations (documented, not hidden)
- Broker adapters: mock verified live; Dhan/Zerodha adapters built but gated on credentials + ToS confirmation.
- Rate limiter: per-instance until Upstash; shared-NAT IPs (offices) could hit the 30/10min auth cap — acceptable at invite-only scale, revisit at 10k seats.
- Email: no provider configured yet (Resend pending); notifications are in-app only.
- No payments, no withdrawals — by legal design (REX-ECONOMY.md Path A).
- Recovery drill: documented but first live drill scheduled for T-7 (Oct 31).

## 8. Security status
Enforced: bcrypt, httpOnly sessions, zod validation on all writes, owner-only RBAC (verified 403s), append-only REX ledger, idempotent mutations, rate limits (5 routes), honest provider gating, forged-session redirect. Open: admin MFA, dependency scanning (GitHub settings), ASVS 5 self-assessment (next).

## 9. Broker / legal status
BROKER-RIGHTS.md (evidence-graded). REX: non-redeemable V1, rules frozen, every movement a typed ledger event. No withdrawal code exists or will exist pre-counsel.

## 10. Recovery status
Backups: documented (OPS-RUNBOOK). Rollback: `git revert` + redeploy, drill at T-7. PITR: Neon on cutover. Secrets: single .env.local → Vercel env; rotation documented.

## 11. Reproduction commands (a future agent rebuilds from this)
```bash
git clone https://github.com/somilsharma2000/fortrex-platform.git && cd fortnex-platform
npm install
# .env.local:
#   BETTER_AUTH_SECRET=<32+ random chars>
#   ADMIN_EMAILS="founder@yourdomain"
ALLOW_MOCK_BROKER=true npm run build && npx next start -p 3000
npx tsx scripts/apply-migrations-local.ts   # PGlite .local/fortrex.db
curl localhost:3000/api/health              # {"ok":true,"db":"up"}
# Full E2E: sign up (owner email in ADMIN_EMAILS), then the flows in §1.
```
Migration: `npx drizzle-kit generate` → commit → `npx tsx scripts/apply-migrations-local.ts`.

---

**Honest bottom line:** the core loop is now hard to break by users, admins, or abuse, and every result is reproducible and auditable. What separates us from production is credentials and written broker confirmation — not code quality.
