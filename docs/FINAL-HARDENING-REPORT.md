# FINAL-HARDENING-REPORT.md

**Date:** Sep 26, 2026 · **Mode:** FINAL HARDENING (scope closed, no new features) · **Platform HEAD:** post-010b989 · **Docs HEAD:** this commit

Order honored: BUILD → BREAK → FIX → RETEST → HARDEN → VERIFY. The product now awaits **FOUNDER TESTING**.

---

## 1. Tests executed (this pass, all on live production builds)

| # | Test | Result |
|---|---|---|
| 1 | Admin MFA: no code / wrong code / valid code / non-admin with valid code | 403 / 403 / pass / 403 ✅ |
| 2 | MFA'd kill switch loop: toggle off → join blocked (`feature_disabled`) → toggle on → join succeeds | full loop ✅ |
| 3 | Forged session cookie on /dashboard | 307 redirect ✅ |
| 4 | Non-admin on admin routes | 403 ✅ |
| 5 | Malformed join on a scored tournament | 409 `not_joinable` (status gate fires before parse — correct order) ✅ |
| 6 | 5 concurrent joins (idempotent re-join path) | 0 duplicates, all consistent ✅ |
| 7 | Fresh user → connect → sync | 66 trades inserted with provenance columns ✅ |
| 8 | All pages anon/trader/founder + unknown page | 200/200/200 + 404 ✅ |
| 9 | Viewport meta (mobile responsiveness basis) | present ✅ |
| 10 | Security headers live (XFO, nosniff, Referrer-Policy, Permissions-Policy, HSTS, CSP) | all 6 served ✅ |
| 11 | Clean-environment deploy: fresh clone + install + migrate + build + boot + signup | PASS after fixing a real bug (see §3) ✅ |
| 12 | Rollback: old code (585a6aa) on migrated DB — sign-in, dashboard, connect, sync | all 200 ✅ |
| 13 | Backup/restore: DB copied to independent location, opened, all data served | PASS ✅ |
| 14 | Provenance DB audit: score snapshot (27 trade IDs, formula v1.0, connectionStatus, scoredAt), ledger sums = balances exactly | PASS ✅ |
| 15 | Codebase sweep: TODOs, console.log, dead routes, unused deps, mock exposure | clean ✅ |
| 16 | Monitoring: 4 workflows (Heartbeat, Weekly Report, T-7 Audit, Launch Day) | all active ✅ |

## 2. Failures discovered
1. **PGlite clean-boot ENOENT (real bug):** fresh clone without `.local/` failed at migration and server boot. Found by test 11 — the exact scenario the test exists for.
2. **Kite Connect token model (operational blocker, not a bug):** tokens expire 6 AM daily; persistent read tokens require Zerodha **approved-platform status**. This changes the Zerodha adapter plan.

## 3. Fixes made
- PGlite parent-directory creation in `src/db/index.ts` + migration script (commit 010b989).
- Admin MFA: TOTP gate on all 4 admin mutation routes + console code UI + enrollment script (`scripts/gen-admin-totp.ts`).
- HSTS + CSP added to existing security headers; verified live, pages unaffected.
- ASVS assessment written and corrected in place (docs/ASVS-ASSESSMENT.md).

## 4. Retests
Every fix was retested live: clean-env boot (PASS), MFA paths (§1 test 1-2), headers (test 10), post-CSP page smoke (all 200, health ok). No fix was accepted without a live re-run.

## 5. Remaining technical issues (honest list)
- **Rate limiter is per-instance (in-memory)** until Upstash env vars exist. Fine for one Vercel instance at invite-only scale; wire Upstash at deploy.
- **User-level MFA + email-based recovery deferred** — no funds surface exists; becomes mandatory before public scale-up. (Admin MFA IS done.)
- **CSP allows `unsafe-inline`/`unsafe-eval`** (Next.js bootstrap needs it without nonce plumbing). Tighten post-launch.
- **Recovery drill** is documented but the first live drill is scheduled at T-7 (Oct 31).
- **Verification states** (unverified vs verified badges beyond broker connection) are designed but not built — out of scope by founder's order (no new features).

## 6. Remaining external dependencies (founder-only)
1. Neon DATABASE_URL · 2. Vercel deploy · 3. Domain + DNS · 4. Lawyer consult (by Oct 5) · 5. 25 founder invites · 6. Pvt Ltd entity before collecting money · 7. GitHub 2FA + secret scanning + dependabot (account settings).

## 7. Broker/legal uncertainties
See BROKER-RIGHTS.md (graded evidence). Summary: Zerodha needs **approved-platform status** for a workable adapter; Dhan terms still unread (page unreachable from sandbox). No public commercial claim about broker integration until written approvals. REX stays non-redeemable (Path A) — no redemption code exists or will exist pre-counsel.

## 8. Production requirements (mechanical cutover, ~30 min once credentials exist)
1. Set DATABASE_URL (Neon) → run migrations → deploy to Vercel → set ADMIN_TOTP_SECRET (enroll via `npx tsx scripts/gen-admin-totp.ts`) → smoke test. 2. Better Stack monitor on /api/health. 3. Resend for transactional email. 4. Runbook: OPS-RUNBOOK.md.

## 9. Known limitations
Local DB (PGlite) until Neon; invite-only scale assumptions; email notifications not yet wired (in-app only); tournament scoring covers verified windows only; no payments/withdrawals by design.

## 10. Exact founder actions required (in order)
1. Test the product yourself (the build is running; credentials are yours to create: Neon + Vercel accounts first).
2. While testing: run `npx tsx scripts/gen-admin-totp.ts`, scan the QR into your authenticator app, keep the secret for Vercel env.
3. Approve or reject — the order is I TEST → I APPROVE → THEN FOUNDER TASKS.

## 11. Definition of "genuinely ready" (the honest line)
**READY NOW (verified):** core tournament loop, auth, RBAC, admin MFA, kill switches, REX ledger integrity, rate limiting, provenance/reproducible scores, clean-env deploy, rollback compatibility, backup/restore, security headers, monitoring schedules.
**NOT READY (externally gated, not code):** production hosting (Neon/Vercel), public domain, legal sign-off, written broker approvals.
Claiming readiness beyond this line would be dishonest. The founder's own testing is the next gate in the agreed order.
