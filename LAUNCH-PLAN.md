# FORTREX — Launch Plan (Nov 7, 2026 — the One File)
> Consolidated Sep 27, 2026 from all specs + research. The T-7 audit workflow (Oct 31)
> and Daily Heartbeat check against this file. Founder actions are marked 👑.

## Phase gates (work streams, not dates)

**October build (agent + CI):** Dhan adapter → verification states → Score v1.0 +
synthetic regression → tournament engine statuses → Season Zero wired → kill switches →
PostHog events at launch. Specs: VERIFICATION-SPEC / SCORING-SPEC / TOURNAMENT-SPEC.

**Partner engine (founder, from Oct 1):** PARTNER-PIPELINE.md — 50 candidates verified,
20 DMs by Oct 15, 30 committed partners by Oct 31. 10 min/day.

**Founder actions (the only blockers, with latest safe dates):**

| # | Action | Latest safe date | Why that date |
|---|--------|------------------|---------------|
| 1 👑 | **Neon + Vercel signup** (one afternoon) | NOW — everything plugs into it | October build needs the DB live |
| 2 👑 | **Lawyer consult** (brief ready: REX-ECONOMY §4) | Book by Oct 5 | Classifies the product before money decisions lock |
| 3 👑 | **Trademark search + filing** (TM-A, classes 9/35/41/42, ~₹4,500/class) | Filed by Oct 24 | Name goes public Nov 7; first-to-file regime |
| 4 👑 | **Domain** (fortrex.io preferred, .in fallback) | Purchased by Oct 24 | DNS + Cloudflare + email need lead time |
| 5 👑 | **25 private invites** list ready | Oct 31 | First seats fill the launch tournament |
| 6 👑 | **Pvt Ltd + bank** (his call: "last") | Before any money moves | Entity gates payments, not launch |

## T-7 Audit (Oct 31, automated + this checklist)

Domain live behind Cloudflare · TM filed · legal opinion received (or booked) ·
entity status known · site build green 7 days straight · Season Zero dry-run passed ·
kill switches tested · support mailbox live · 25-invite list confirmed · partners
committed count logged · stealth-lift checklist rehearsed.

## Stealth lift procedure (Nov 6 evening, ~30 min, runbook)

1. robots.txt → allow · remove noindex meta · resubmit sitemap
2. Verify domain resolves + SSL + Cloudflare proxies on
3. Analytics (PostHog) live · Better Stack monitors green
4. Announcement drafted in Citadel + partner DM script distributed
5. Nothing else changes — the site that was tested is the site that launches

## Launch day (Nov 7) — the command center

09:00 IST Season Zero opens (announced to Genesis members) · monitors watched live ·
founder + agent on the Citadel · hourly check: signups, verification success rate,
tournament registrations, error rate, fraud flags · pre-written incident responses
(OPS-RUNBOOK) · NO code changes on launch day except rollback-level emergencies.

**The quiet version of the whole plan:** the machine is built, the moat is verified
data, the law is respected, and on Nov 7, ten thousand people get a leaderboard
they can actually believe.
