---
title: Launch Readiness — Master State Document
summary: The complete verified state of FORTREX on Sep 29, 2026 — every system, every check, every legal gate, every open item, one file.
---

# FORTREX LAUNCH READINESS — Sep 29, 2026 (23:30 IST)

*The single source of truth. A future agent or operator can rebuild the entire picture from this file plus the docs it links.*

## 1. Where everything lives

| System | URL / Location | State |
|---|---|---|
| Production (frozen) | https://fortrex-platform.vercel.app | Healthy, db up, stealth (robots disallow all) |
| Private lab (all new work) | https://fortrex-lab.vercel.app | Healthy, db up, stealth (robots disallow all) |
| Platform code | github.com/somilsharma2000/fortrex-platform | main = production; growth-lab-v1 = launch code (branch to merge Nov 7) |
| Command center | github.com/somilsharma2000/fortrex-command-center | All business/legal/research docs |
| Database | Neon project dawn-surf-72239932, branch production | Migrations 0001–0009, verified |

## 2. Verified tonight (full master pass)

**Website content audit — CLEAN**
- Fake reviews / testimonials / social proof: 0 found. No star ratings, no "trusted by N traders", no invented members.
- Bait vocabulary (claim/win/prize/clearance/doors/hurry): 0 hits on any page.
- Dead buttons (href="#", undefined actions): 0.
- Placeholders / TODO / lorem text: 0.
- Risk disclaimer present on every money surface: connect, dashboard, leaderboard, legal, landing, tournaments pages — verified.

**Platform test battery — ALL GREEN**
- End-to-end dry run: 27/27 PASS (link per region, instant rejections, provisional→approved auto-upgrade, all admin guards).
- Unit: 63 (verification engine) + 27 (partner-link/CSV parser) = 90 passed, 0 failed.
- TypeScript: clean. Production build: green.
- Migration 0009: applied and verified on local PGlite; Neon prod untouched (applies at merge).

**Live connections — ALL UP**
- Lab deployment: health ok, db up. Production deployment: health ok, db up.
- Stealth intact on both: robots.txt Disallow all, landing 200.

**Automations — ALL ACTIVE**
1. FORTREX Daily Funnel Heartbeat (daily 08:00 IST)
2. FORTREX Weekly Funnel Report (Mon 09:00 IST)
3. FORTREX T-7 Readiness Audit (Oct 31)
4. FORTREX Campaign Decision Reminder (Oct 15 — prelaunch campaign decision day)
5. FORTREX Launch Day Execution (Nov 7)

## 3. The complete feature set on the lab branch (growth-lab-v1)

- Global MT5-only platform: daily check-ins with streaks + freeze, timezone-aware.
- Locked-Entry gate: live tournament entry requires an MT5 account opened through the FORTREX partner link AND verified.
- Automatic verification (no admin in the loop): instant claim checks → provisional → daily XM partner report import upgrades to approved. Personal tracking tags per member. Tolerant CSV parser.
- Region law: live entry blocked for India, US, Canada, Israel, Iran, sanctioned states, XM's five (BE/PL/FR/ES/PT), UK, all 27 EU, NO/IS/LI. 21 launch target markets verified allowed. Demo contests unaffected.
- Member UI: Connect page "Tournament entry" section (personal link + disclosure + claim form + honest states). Operator UI: Partner tab (report import + link save, MFA-gated).
- Scoring in USD, leaderboard bug fixed with test coverage, weight brackets.
- Genesis cap 10,000 seats enforced in code. REX append-only ledger, no cash value, no redemption engine (deliberate legal shield).

## 4. Legal state — what is applied

- XM Affiliation Agreement reviewed in full (see platform docs/MT5-XM-PARTNER-GATE.md, "Legal review" section):
  a. Written XM approval needed before any public XM-named material — LAUNCH GATE, founder submits wording.
  b. Rebates/commission-sharing prohibited (fraud traffic) — REX never tied to account opening, never funded from XM commissions.
  c. BE/PL/FR/ES/PT commission bans — blocked in code.
  d. No PPC bidding on XM brand, no XM-like domains — in campaign guardrails.
- REX: no cash value, no cash-out (REX-ECONOMY.md ruling stands).
- No offshore broker promotion to Indian residents (FEMA shield): India blocked from live entry.
- Risk disclaimer on every money surface — verified tonight.
- Stealth: no public posts, noindex, hand-shared links only — verified live tonight.

## 5. Launch sequence (Nov 7)

1. Merge growth-lab-v1 → main per docs/MERGE-CHECKLIST.md (evidence-based, rollback tested).
2. Apply migrations 0003–0009 to Neon production.
3. Set env vars on production (CRON_SECRET, METAAPI_TOKEN, partner link; see merge checklist).
4. Flip STEALTH_MODE off: robots allow, sitemap live.
5. Register custom domain in Search Console same day, submit sitemap.
6. Launch-day workflow executes automatically.

## 6. Open items (owner — do not chase until product complete per standing rule)

- XM partner portal: confirm the tracking link honors subid; real partner link; XM written approval of public page wording.
- MetaApi token (real MT5 reads; mock is the only working connection today).
- Custom domain purchase + Pvt Ltd + lawyer review (target Oct 5) + TM filing (by Oct 24).
- Counsel queue: FEMA/India offshore stance, EU/UK/EEA incentive rules beyond XM's list, REX Path B.

## 7. Documentation index (rebuild-from-scratch set)

Platform repo /docs: MERGE-CHECKLIST.md, MT5-XM-PARTNER-GATE.md (incl. verification + legal review), ASVS-ASSESSMENT.md.
Command center /docs: LAUNCH-PLAN.md, BUSINESS-BLUEPRINT.md, DECISIONS.md, CROWN-SYSTEM.md, HYPE-PLAN.md, PRELAUNCH-CAMPAIGN.md, GROWTH-LAB-GLOBAL-MARKETS.md, QA-FULL-PASS-REPORT.md, FINAL-VERIFICATION.md, REVENUE + SUPPORT in DECISIONS, plus research/universe/01-12 evidence.
