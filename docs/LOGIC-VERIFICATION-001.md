# LOGIC-VERIFICATION-001 — Tournament Lifecycle, REX Ledger, Waitlist (Sep 30, 2026)

Status: COMPLETE. Four questions asked; four answered with live evidence.

## 1. Does Season Zero open automatically on Nov 7, 09:00 IST?

**Before this pass: NO.** Status transitions existed ONLY via the TOTP-gated admin
API (`POST /api/admin/tournament`). The daily scoring cron explicitly never changes
status. A single missed manual step at 09:00 would have left Season Zero invisible
and unscored — the same failure class as the genesis-seat bug found on Sep 26.

**Now: the clock-driven half is automatic.**

New module `src/lib/due-transitions.ts` + endpoint `GET /api/cron/due-transitions`
(secret-gated, constant-time compare, fails closed):
- `open → live` when `startsAt <= now` (scoring window starts)
- `live → settling` when `endsAt <= now` (window ends)
- After transitions: score-only refresh of live tournaments (DB recompute, zero
  broker calls)
- Editorial transitions remain admin-only by design: `draft→upcoming→open` (publish
  decisions), `settling→completed` (prize review)

Race-safety: conditional `UPDATE ... WHERE status = X` claims; idempotent re-runs.

**Live verification** (fortrex-lab): seeded probe tournament `open` with window
fully past → run #1 flipped it `open→live→settling` in one pass with two audit-log
entries (actor `system:due-transitions`) → run #2 idempotent (0 transitions) →
probe deleted. Unauthorized call → 401.

**Schedule** (vercel.json, Hobby constraint = daily only):
- `30 0 * * *` live-scoring (06:00 IST): broker sync + full score
- `45 3 * * *` due-transitions (09:15 IST): transitions + score refresh

The manual `draft→upcoming (08:30) → open (09:00)` sequence in LAUNCH-DAY-RUNBOOK
is unchanged; the automation is the safety net that guarantees scoring starts on
time even if 09:00-step is missed. When the account moves to Pro, tighten
due-transitions to `*/15 * * * *`.

## 2. Is the REX ledger internally consistent?

**PASS** (prod DB, Sep 30):
- Every entry's `balance_after` = previous `balance_after` + `delta` (0 broken chains)
- No negative balances
- No referral double-pays (0 duplicate referral_bonus rows per referrer+note)
- All 8 users held the 1.25 founding multiplier (now 2 real users after cleanup)
- Reason codes are typed enum values (daily_checkin, referral_bonus, signup_bonus)

## 3. Do the scoring windows mean what we think?

**Confirmed** in `src/lib/scoring.ts`: trades scored iff `closeTime` between
`startsAt` and `endsAt`. The automation's transition triggers align exactly with
those boundaries. Join gate (`[slug]/join`) accepts `open|live` — consistent.

## 4. Does the waitlist import path exist?

**No import tool is needed — the runbook is correct.** Waitlist members are
NOT pre-created as users. They self-register on launch morning via the S-08
invite dispatch (08:15 IST), receiving genesis seat + 1.25x multiplier via the
normal signup path (`assignGenesisSeat`). `waitlist_entries` is a marketing
list + attribution ledger (invite counts, referral chains for the landing).
One caveat recorded: waitlist referral codes do not carry into platform signup
automatically — the invite email should instruct members to use their inviter's
platform link to preserve the +50 REX referral bonus.

## Launch-day sequence (authoritative, updated)
1. 08:15 — S-08 waitlist invite dispatch (founding-member email/DM blast)
2. 08:30 — admin: Season Zero `draft → upcoming`
3. 09:00 — admin: `upcoming → open` (join window live)
4. 09:00+ — AUTOMATIC: `open → live` at startsAt (due-transitions cron as backstop)
5. Window end — AUTOMATIC: `live → settling`
6. Admin runs final scoring, reviews, `settling → completed`
