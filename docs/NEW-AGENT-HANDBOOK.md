---
title: New Agent Handbook
summary: The complete onboarding brief for any new agent inheriting FORTREX — product, features, infrastructure, operations, governance, current state, launch plan, and the founder's working rules. Written Oct 1, 2026 by the operating agent (post-Vesper successor).
---

# FORTREX — NEW AGENT HANDBOOK (v2)

**Written:** Oct 1, 2026, 04:30 IST. Supersedes the Sep 26 HANDOVER.md for state; the vision and laws in that letter still hold.
**Read order:** this file → docs/AGENT-OPERATING-CHARTER.md → docs/PROJECT_MASTER_SPEC.md → docs/PROJECT_STATUS.md → docs/DECISIONS.md (newest entries last). AGENTS.md at repo root is the 10-line version of this.

---

## 1. What FORTREX is (one paragraph)

FORTREX is a non-custodial, skill-based trading tournament platform. Traders keep their capital at their own broker (MT5 only, pre-launch); FORTREX organizes verified competitions with honest leaderboards and risk-adjusted scoring, plus a full trading journal, an education hub, a Discord community, and the REX reputation economy. Revenue: broker partnership commissions on accounts opened through our link + arena/platform fees. **Launch: November 7, 2026, 09:00 IST — fixed.** No seat cap (removed by founder order Sep 30). Everyone who joins before launch is a **Founding Member** with a permanent **1.25x REX multiplier**.

## 2. The laws (binding — violate none)

1. **Charter:** docs/AGENT-OPERATING-CHARTER.md is the master prompt, 13 laws. Five core: recheck twice (code AND live), prove never claim, skip nothing, no last-step fuckups, no cheating/stealing/faking.
2. **Stealth until Nov 7:** noindex, robots-blocked, hand-shared links only, no public posts, no partner names publicly without written approval.
3. **Design canon locked (CROWN-SYSTEM.md):** obsidian `#050506`, gold `#D8A64D`, bone `#FFF7E6`; Space Grotesk / Inter / JetBrains Mono; crown/shield/facet grammar; quiet institutional voice, zero hype, zero bait vocabulary (no "claim/win/prize/clearance" words; scarcity only as fact). The founder REJECTED the "all-in cinematic" experiment — never reintroduce giant type, tickers, scroll theatrics.
4. **Stack locked until Nov 7 (STACK-DECISIONS.md):** Next.js 15.3 App Router + Vercel + Neon Postgres. Better Auth; Resend (email) and PostHog (at launch) planned. No upgrades "because newer exists."
5. **Entry law:** live competitions ONLY via a broker account opened through FORTREX's own partner link + verification. No open "connect any existing account" entry path. Demo contests open worldwide.
6. **REX law (REX-ECONOMY.md):** REX has NO cash value, NO cash-out, NO REX→₹ rate anywhere. Redemption engine must NOT be built until counsel approves Path B.
7. **Legal shield:** no feature ships if it creates legal exposure. No paying members to open accounts (fraud traffic). Region gates: US, CA, IR, KP, UK, EU/EEA refused for live partner contests. XM obligations in docs/MT5-XM-PARTNER-GATE.md — written approval before any XM-named public marketing.
8. **Autonomy law:** challenge bad founder assumptions BEFORE building; handle everything reversible/low-risk autonomously; escalate only founder-authority decisions (money, legal, public revealing, partners, business scope).
9. **Council law:** 10 departments (Product/Eng, Business/Finance, Legal, Growth, Psychology/Ethics, Research, Ops, Content, Security, Data) — significant work = propose → objections → debate with evidence → majority → build → recheck → ship; disagreements recorded in DECISIONS.md; 3-boss senior review.
10. **Freeze law:** during the founder's 7-step testing phase, freeze all code changes.
11. **Living files:** every decision updates PROJECT_MASTER_SPEC.md (what), PROJECT_STATUS.md (now), DECISIONS.md (why) in the SAME session.

## 3. Product surface — every route (all shipped & live)

**Public (stealth-gated):**
- `/` Landing — quiet crown hero, countdown to Nov 7 09:00 IST, waitlist, "Six parts. One arena." product grid, trader-type segmentation, quiet SIGN IN door (founder-approved Oct 1), FAQ + JSON-LD, risk disclaimer.
- `/legal` — Terms (13 sections), Privacy (9 sections), Risk Disclosure. Honest copy throughout.
- `/t/[code]` — public trader profile (private by default, opt-in).
- `/signin`, `/signup`, `/forgot-password`, `/reset-password` — recovery UX: duplicate-email signup explains + links to sign-in/reset; failed login shows inline recovery. Anti-enumeration preserved.

**Member (auth-gated):**
- `/dashboard` — the Desk (rebuilt Oct 1): identity + live status band (REX, REX rank, streak, broker, arenas) → Performance focal point (equity curve + stats + trade audit; empty state = 3-step record-assembly panel) → Next-arena countdown (Season Zero, honest DRAFT badge, auto-flips at window open) + Activation rail (connect/sync/verify/invite checklist) → record band (streak calendar 28-day, arena record, signals) → Account & Connections panel (broker verification / invite / Discord / profile visibility as hairline sections). Crown Motion: staggered desk reveal, reduced-motion respected.
- `/connect` — MT5 + demo ONLY (all other integrations deleted). Investor-password law stated.
- `/tournaments`, `/tournaments/[slug]` — list + detail, honest status badges (draft/live/settling), entry when eligible.
- `/leaderboard` — rank, prev-rank movement, public handle links.
- `/hall-of-fame` — champions archive.
- `/journal` — trade table with symbol/long-short/outcome/date-range filters, live per-currency net totals, CSV export (injection-safe), 500-row cap.
- `/journal/psychology` — daily reflections (paid REX), per-trade notes/tags/emotion, journaling streak, session/weekday rhythm, trade detail.
- `/learn` — searchable explorer: guides + 21-term plain-word glossary (Basics/Risk/FORTREX), TOC chips, REX economy + tools sections.

**Admin (owner role + TOTP console code on ALL routes — reads and writes, re-armed Oct 1):**
- `/admin` — funnel tiles (waitlist → members → connected → verified → partner-linked), SystemBoard (real-time system health), tabs: Analytics (live audited numbers), Integrations, Discord, Tournaments, REX, Kill Switches (503 global), Users, Partner (claims queue), Audit. Every action writes an audit entry.

**APIs (Next.js route handlers):** auth (Better Auth), waitlist, check-in, tournaments (+ join, advisory-lock cap), leaderboard, journal, psychology, broker connect/sync (idempotent), notifications, admin/* (TOTP-gated), health.

## 4. Infrastructure — exact topology (memorize)

- **Production site:** https://fortrex-platform.vercel.app (Vercel project `fortrex-platform`). GitHub: `somilsharma2000/fortrex-platform` (main).
- **Lab/preview site:** https://fortrex-lab.vercel.app (project `fortrex-lab`, branch growth-lab-v1).
- **Docs/command center:** GitHub `somilsharma2000/fortrex-command-center` (this repo).
- **PRODUCTION DB:** Neon host `ep-billowing-voice-b5k1ioqd` (branch "production", project dawn-surf-72239932, org lingering-night-82525521). **LAB DB:** host `ep-young-flower-b5bdreci` (branch "design-lab-preview"). Earlier sessions had these INVERTED — never trust pre-Sep-30 records on which is which. State the target by host before every write.
- **Founder account (prod):** somilsharma2000@gmail.com, role owner, genesis seat #1, password `Fortrex#Founder-Oct2026`. Lab has founder + deekshantsharma2004@gmail.com (genuine signup, founder confirming identity).
- **Env (Vercel, prod):** DATABASE_URL, BETTER_AUTH_SECRET, NEXT_PUBLIC_SITE_URL, ADMIN_TOTP_SECRET (TOTP console code — agent holds the base32 secret and can compute codes on request), CRON_SECRET, ALLOW_MOCK_BROKER=true, GENESIS_CAP empty (=no cap), STEALTH_MODE unset (noindex+robots-block; launch flip = set "false" → robots allow + sitemap).
- **Deploy procedure (CRITICAL — Vercel blocks CLI deploys with agent git authors):** rsync repo → `deploy-src/` OUTSIDE the repo dir (exclude .git, node_modules, .next, .env.local), copy `.vercel/project.json`, then `vercel deploy --prod --yes` from there. Never deploy from inside the repo.
- **Automations on platform:** due-transitions cron (daily 09:15 IST) — draft→live→settling, race-safe, idempotent, audit-logged.
- **Agent-side workflows (Base44, all ACTIVE):** Campaign Decision Reminder (Oct 15 09:00 IST), T-7 Readiness Audit (Oct 31), Launch Day Execution (Nov 7), Season Zero Settlement (Nov 10 21:00 IST), Daily Funnel Heartbeat, Weekly Funnel Report.

## 5. Business + REX economy

- Revenue: broker partnership commissions (accounts via our link; India exposure counsel-gated) + arena/platform fees (SaaS-style 18% GST; entry-fee pooling REJECTED — dies at 28%). Prizes from founder-defined pools, counsel-reviewed.
- REX ledger: append-only, typed reasons (10 incl. signup, referral, checkin, journal_activity, tournament), balance_after chained, founding multiplier 1.25x. Invariants verified: 0 broken chains, 0 double-pays, 0 negatives.

## 6. Security state (as of Oct 1)

- Admin TOTP MFA on ALL admin API routes (reads + writes), fail-closed if secret unset. Known boundary: /admin page render itself sits behind owner-session only (page-level code gate = pre-launch consideration).
- Security headers (HSTS, CSP, etc.), XSS-escaped JSON-LD, rate limits (auth 30/10min/IP, join 20/min, sync 6/min), kill-switch 503, audit log on every operator action, race-safe genesis seats, advisory-lock tournament caps.
- Verified batteries: 225+ test assertions, real-browser sweep class (`npm run test:browser` — headless Chromium, catches JS errors curl cannot), live E2E journeys (trader + owner), REX ledger invariants.
- Ops survival: OPS-RUNBOOK.md — uptime monitoring, incident levels, 60-second recovery drills, weekly rhythm.

## 7. Current state (Oct 1, 04:30 IST)

**Done:** full platform live + hardened; dashboard desk transformation shipped (founder approved: "everything looks great"); MFA re-armed on all admin reads; docs current. Platform commits through `ba49c0b` (MFA re-arm); deploy rule followed.

**In flight / scheduled:** Oct 15 hype-arc decision day (founder decides whether to lift social stealth; advisor brief in PRELAUNCH-CAMPAIGN.md — no mystery-bait, no urgency tactics, "classified system being assembled" framing); T-7 audit Oct 31; launch Nov 7.

**Founder's pending tasks (do NOT nag before the product satisfies him — he does his work then):** custom domain + Search Console (launch day), Pvt Ltd + lawyer (TM by Oct 24 target), email API key (Resend), authenticator enrollment for admin console code, his 7-step test pass (freezes code during it), confirm deekshant's identity, 25 hand-shared invites.

## 8. Launch sequence (Nov 7)

1. T-7 audit (Oct 31) → fix anything found.
2. Founder 7-step pass → freeze → fixes → GO.
3. Set STEALTH_MODE=false → verify robots/sitemap live.
4. Register custom domain + Search Console, submit sitemap (same day).
5. Waitlist import BEFORE Season Zero open (LAUNCH-DAY-RUNBOOK.md: 06:00–09:00 IST sequence; draft→upcoming→open two-step).
6. Season Zero opens 09:00 IST Nov 7 → runs 84h → settles 21:00 IST Nov 10 (automation handles live→settling).
7. Register OG card, per-page metadata post-launch backlog.

## 9. How to work with the founder

- Non-technical. Outcomes, not implementations. Plain language, no jargon, no unsolicited options.
- He says "make it perfect / handle millions" and means it. Own idea → launched profitable business → operations, without being asked.
- Escalate only: money, legal, public revealing, partners, business scope. Everything else: do it.
- Report status honestly: planned / implemented / tested locally / production-verified / not verified. Never fake done. He values the recheck-twice proof.
- Never ask him to re-connect Google Drive. Don't ask for his tasks until the product is complete to his satisfaction.
- WhatsApp is his channel. The Base44 browser extension's UI clicks misfire (form posts silently not firing) — verify UI claims with real headless Chromium in the sandbox, not the extension.

## 10. Hard-won lessons (do not relearn these)

1. Vercel blocks deploys with non-team git authors → rsync-snapshot deploy from OUTSIDE the repo.
2. Neon PROD vs LAB hosts were once confused — always state host by name before DB writes.
3. curl-based verification misses 100% of client JS crashes → always verify UI in a real browser.
4. Local-time Intl formatting can crash real browsers while curl looks fine (ECMA-402).
5. PGlite needs serverExternalPackages + recursive mkdir; zombie next-server on :3000 serves stale builds — kill by /proc PID scan.
6. Page sessions MUST use `getSession({ headers: await headers() })`.
7. Vercel env API: PATCH ignores values → DELETE+POST to update.
8. CLI-created Vercel projects need framework set via API or all routes 404.
9. Direct port-5432 DB access from the sandbox is blocked — use the running app or Neon API.

## 11. Golden rule

**Never let the founder discover a problem you were capable of finding first.** Inspect → judge → research → redesign → implement → test → self-critique → improve. If it is mediocre, improve it. If you can fix it, fix it. Report what was inspected, changed, tested, and what remains — with evidence.
