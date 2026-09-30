# QA-HUNT-001 — Adversarial QA Hunt (Sep 30, 2026)

Status: COMPLETE — all findings fixed, deployed, and verified live on fortrex-lab.

## Method
Full mobile-viewport sweep (375px), security probes against public APIs, static code
hunt for the two crash classes we had been bitten by (ECMA-402 date-format crash,
window/document access during render), plus a logic-verification pass over the
tournament lifecycle, REX ledger, and waitlist pipeline.

## Findings & Fixes (all deployed, commit trail in fortrex-platform)

| # | Finding | Severity | Fix | Verified |
|---|---------|----------|-----|----------|
| 1 | Landing join form overflows at 375px (horizontal scroll) | UX-high | Responsive layout fix | Live, 0 overflow |
| 2 | Dashboard invite card overflows at 375px | UX-high | Responsive layout fix | Live, 0 overflow |
| 3 | Tap targets under 44px on primary CTAs | UX-med | Padding/min-height raised | Live |
| 4 | Waitlist accepts markup/script in `name` field (stored-XSS surface) | SEC-high | Zod validation rejects markup at the door | Live: `<img onerror>` name → 400 |
| 5 | Test/junk rows in prod waitlist (unicode junk, XSS payload, rapid-tester) | Data | Deleted by email pattern; only founder remains | Count honestly = 1 |
| 6 | Season Zero does NOT open automatically — transitions were admin-manual only | LAUNCH-CRITICAL | New `/api/cron/due-transitions` (see LOGIC-VERIFICATION-001) | Live end-to-end |
| 7 | Test user accounts (6 × example.com) left in prod DB after QA rounds | Data | Cascaded delete of their rows across all tables | Prod users = founder + deekshant only |

## Static hunt results (no new defects)
- `local-time.tsx` correctly avoids the dateStyle/timeStyle + timeZoneName ECMA-402
  combination (the Chrome crash class from the tournament page incident).
- All remaining dateStyle/timeStyle uses are legal (no timeZoneName combined).
- All window/document accesses in client components are inside useEffect/handlers or
  guarded (`typeof window !== "undefined"`). No render-phase DOM access found.
- Public API gates re-verified live: unauthorized admin/cron → 401/403, draft
  tournaments filtered from public list, waitlist count matches DB exactly.

## Residual (accepted)
- Cron frequency: Vercel Hobby permits daily crons only. Transitions safety net runs
  daily 09:15 IST; launch-week freshness plan documented in DECISIONS.md.
- WhatsApp signup-path mailto/invite UX flagged for polish pass (no functional break).
