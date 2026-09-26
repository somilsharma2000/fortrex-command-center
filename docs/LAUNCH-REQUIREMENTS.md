# FORTREX LAUNCH REQUIREMENTS — features, ops, admin control, audits, analytics
> Consolidated Sep 26 from platform code audit + 18 research files. Split: MUST (blocks launch) / SHOULD (launch window) / LATER (post-launch plan).

## 1. FEATURE STATUS — what launches Nov 7

| Feature | Status | Notes |
|---|---|---|
| Waitlist + genesis seats (10k cap) | ✅ LIVE | Cap enforced at signup, unique index |
| Auth (email+password, owner-first) | ✅ LIVE | Better-auth; user MFA is SHOULD |
| Referral engine (+50 REX both sides) | ✅ LIVE | Chain auto-pays, verified |
| Broker connect (MT4/MT5 via MetaApi, mock) | ✅ ADAPTER | MetaApi live-build in Oct; mock is launch-day connection |
| Trade sync (idempotent) | ✅ LIVE | 107-trade sync verified |
| Tournament lifecycle + join | ✅ LIVE | Draft→open→live→settling→scored; transitions 409-guarded |
| Scoring (risk-adjusted, Score v1.0) | ✅ LIVE | Tiebreakers frozen in SCORING-SPEC |
| REX ledger (append-only, typed) | ✅ LIVE | Multipliers, check-in streaks |
| Leaderboard | ✅ LIVE | Live-refresh polish queued |
| Check-ins | ✅ LIVE | Streak mechanics |
| Kill switches (6 flags, 60s cache) | ✅ LIVE | tournament_join, checkin, broker_connect, referrals, rex_earning, notifications |
| Admin console + TOTP MFA | ✅ LIVE | 4 routes protected by x-admin-totp |
| Audit log | ✅ LIVE | Every admin action + joins + grants writes audit_log |
| Legal + risk disclaimers | ✅ LIVE | Every money surface |
| SEO/GEO foundation | ✅ LIVE | Stealth-gated flip on launch day |

**MUST ADD before launch (October build, on dev branch):**
1. Tournament lifecycle AUTOMATION — transitions fire on schedule without human touch (cron on Vercel + fallback admin manual trigger).
2. Tournament participant view for admin (who joined, seat, verification state).
3. Notifications that reach humans — in-app exists; email via Resend for: welcome, tournament open/closing, score published, streak reminders.
4. Season Zero dry-run on production (T-7 checklist item) with full data reset after.

**SHOULD ADD (launch window, Nov):**
5. Live leaderboard refresh + rank movement indicators.
6. Share cards (referral link, rank card) — WhatsApp-native.
7. Fraud queue in admin: multi-account detection (same phone/IP/device fingerprint), referral abuse (self-referral loops).
8. User MFA + email-based account recovery (better-auth supports; needs Resend).
9. PostHog event instrumentation (signup → verify → join → trade funnel).

**LATER (post-launch roadmap): broker affiliate onboarding, /learn hub, trader profiles, Hall of Fame.**

## 2. OPERATIONS — running it after launch
- OPS-RUNBOOK.md is the manual: rollback, backup/restore, kill-switch usage, incident response. A non-technical adult can follow it (founder law).
- DAILY: heartbeat automation 08:00 IST (failure/new-member alerts). Founder: check admin dashboard + support inbox, 15 min.
- WEEKLY: Monday 09:00 IST report automation → signups, activation (72h rule), seats remaining, streaks, K-factor, tournament fill, broker mix.
- MONTHLY: Neon backup restore drill, dependency updates, REX ledger reconciliation (sum by reason = sum by user).
- STAY ACTIVE (the engine that keeps members returning): check-in streaks (daily touch), weekly tournaments (weekly appointment), REX velocity (earning visible), leaderboard movement (status), email notifications (win-back). Rule: no notification without value.

## 3. AUTOMATIONS / CONNECTIONS / WORKFLOWS

**Base44 automations (running now):**
- Daily Heartbeat — 08:00 IST, alerts only on failure/new members.
- Weekly Report — Mon 09:00 IST.
- T-7 Audit — Oct 31, checks LAUNCH-PLAN checklist + site health.
- Launch Day — Nov 7.

**To add (workflows, this side):**
- T-1 Rehearsal (Nov 6): stealth-lift dry run + Season Zero dry-run verification.
- Weekly REX reconciliation check (Mon, after report): ledger balance invariant.
- T+1 post-launch review (Nov 8): funnel numbers vs targets, friction log.

**Platform-side automations (October build):**
- Tournament lifecycle cron (open→live→settling→scored on schedule; idempotent; audit-logged).
- Broker sync scheduler (periodic resync for live tournaments).
- Streak/verification reminder emails (Resend).

**Connections inventory:**
| Connection | Status | Purpose |
|---|---|---|
| Neon Postgres | ✅ LIVE | Production DB (16 tables, production branch) |
| Vercel | ✅ LIVE | Hosting + CI + cron |
| GitHub | ✅ LIVE | Code + CI (typecheck+build on push) |
| MetaApi.cloud | October | MT4/MT5 trade verification |
| Dhan HQ | gated | Written approval required first |
| Resend | October | Transactional email |
| PostHog | at launch | Product analytics funnel |
| Better Stack | runbook | Uptime + alerts |
| Cloudflare | at domain | DNS + shield |
| Plaid/stripe/Wix payments | counsel-gated | Only after Decision Gate 1 |

## 4. ALL CONTROL TO ADMIN — console spec

**Admin has today (verified live):** kill switches (6), tournament status + manual scoring, REX grants, TOTP-locked, audit-logged.

**Must add for launch (admin panel v2, October):**
- LIVE METRICS STRIP: signups today, activation rate, seats remaining, live tournament participants, error rate, kill-switch states.
- USER TABLE: search by name/email/phone; view profile (verification state, broker, streak, REX balance); suspend/ban (with audit).
- TOURNAMENT DETAIL: participant list, join timeline, score history per participant, manual rescore trigger.
- REX LEDGER VIEW: per-user transaction list, reason, multiplier, running balance; manual grant with reason (already exists as API).
- REFERRAL TREE: who referred whom; flag suspicious loops.
- FRAUD QUEUE: flagged accounts (multi-account heuristics), approve/reject with audit.
- NOTIFICATION BROADCAST: send announcement to all members (in-app; email via Resend).
- AUDIT LOG VIEWER: filterable by actor/action/date — every admin action visible to admin.
- EXPORTS: CSV of members, tournament results, REX ledger (for the accountant/counsel).
- Every single admin action writes audit_log with actor, action, target, before/after, timestamp. No exceptions.

## 5. ALL AUDITS
- audit_log table: LIVE. Admin actions, tournament joins, REX grants, flag toggles — all recorded.
- score_versions table: LIVE. Every scoring run is a new version; old scores never mutate; recalculation is additive and auditable.
- REX ledger: append-only by design. Nothing ever updates or deletes a row.
- TO ADD: REX reconciliation check (weekly invariant), admin action report in the weekly report (what changed, who changed it), quarterly full audit export (CSV archive).

## 6. ANALYSIS TO ADMIN
- Admin sees: the funnel (visit → signup → verified → joined → first trade), activation (72h rule), retention (streaks), referral K-factor, tournament fill, broker mix, error rate.
- PostHog at launch = product analytics; admin panel v2 = operational numbers from our own DB (no third party needed for the truth).
- Weekly Monday report automation delivers the digest; everything above is always visible in the panel between reports.

## LAW THAT BINDS ALL OF THIS
10k cap · REX Path A · risk disclaimers everywhere · no offshore broker promotion to India · freeze until founder 7-step pass (October builds happen on dev branch) · every admin action audited.
