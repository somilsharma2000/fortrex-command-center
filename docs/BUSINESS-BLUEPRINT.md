# FORTREX: BUSINESS BLUEPRINT (idea, research, technology)
Written Sep 29, 2026 by the agent (owner-proxy). Built from: the live product, the three Sep 29 gray-space research reports, and earlier research in research/universe. Stealth until Nov 7. Nothing here is public.

## PART 1. THE IDEA
1. One line: FORTREX is a skill-based trading competition arena. Traders keep their money at their own broker; FORTREX runs the contests, verifies the results and publishes one honest leaderboard.
2. Problem: trading contests are dominated by raw-return gambling, faked screenshots and no proof. Traders cannot prove skill. Serious traders have no fair place to compete.
3. Solution: read-only MT5 link (FORTREX cannot trade or withdraw), risk-adjusted scoring, brackets so a small account competes fairly, permanent verified track records.
4. Positioning: quiet, institutional, no hype. "The proof-of-skill layer for traders."
5. What it is not: a broker, an adviser, a signal service, a fund. It never holds client money.
6. Launch: November 7, 2026 (Season Zero). Stealth until then.
7. Cap: 10,000 Genesis seats (hard limit). Founding members get a permanent 1.25x REX multiplier.
8. REX: reputation points. No cash value, no redemption (legal shield, Path A). Redeemable REX only after counsel signs off.

## PART 2. CUSTOMERS
1. Serious retail forex/gold traders (global, non-India for live tracks): want proof and status.
2. Prop-firm aspirants: want a free proving ground before paying for an evaluation.
3. Trading educators and community owners: want branded leagues for their students.
4. Prop firms, brokers, academies (B2B): want a contest engine for their own communities.
5. Sponsors: fintech and trading-tool brands wanting an engaged audience.
6. Not customers: US and India for live forex tracks (blocked, see Part 8).

## PART 3. PRODUCT (what exists today, on the lab branch growth-lab-v1)
1. Sign-up with privacy names (first name + initial on boards), referral codes.
2. MT5 read-only connection via MetaApi; broker facts come from the broker, never typed by the user.
3. Locked-entry gate: live contests need a partner-link account, admin-approved claim, and verification. Demo contests need any verified demo MT5 account.
4. Tournament engine: draft, open, live, settling, scored. Admin creates and controls.
5. Scoring: Score v1.1, USD-normalized, frozen tiebreakers, reproducible from stored snapshots.
6. Leaderboard: ranked by total gain or by score, chosen per tournament by admin.
7. Live scoring job (scheduled, secret-protected, kill switch).
8. REX ledger: append-only, typed reasons, multiplier.
9. Referrals: inviter +50 REX, invitee +25 REX, verified only.
10. Daily check-in with timezone-aware streaks and one streak freeze.
11. Dashboard "Your Path" progress card, profile titles (Circle of Three, Founding Captain).
12. Admin console: metrics and funnel, partner-claims queue, settings (partner link), kill switches, TOTP-protected mutations.
13. Notifications and rank-change alerts (in progress).
14. Anti multi-account: one broker account fingerprint per profile.
15. Phone layout (menu row, scroll tables, 16px inputs).
16. Legal page, risk disclaimer on every money surface.

## PART 4. TECHNOLOGY
Application: Next.js 15.3 (App Router), React, TypeScript, Tailwind. Server components plus route handlers.
Auth: Better Auth (sessions read with getSession + next/headers), TOTP MFA for admin routes (header x-admin-totp).
Database: Postgres on Neon (project dawn-surf-72239932; branches production and design-lab-preview). Drizzle ORM. Migrations 0000 to 0008. Local dev and tests: PGlite (embedded Postgres).
Broker data: MetaApi.cloud (MT4/MT5 read-only). Bybit read-only adapter exists (crypto). Dhan adapter exists (India). Zerodha removed (terms prohibit trading games).
Hosting: Vercel (Hobby). Projects fortrex-platform (production, frozen) and fortrex-lab (private lab). Deploy from a git-free rsync snapshot.
CI: GitHub Actions (typecheck + build). Repos: fortrex-platform, fortrex-command-center (all docs).
Security: HSTS + CSP + 6 headers, rate limits (auth 30 per 10 min per IP, join 20/min, sync 6/min), forged-session tests, RBAC, kill switches, audit log, ASVS L1 pass, encryption of broker tokens (AES-256-GCM).
Testing: regression suite (82 assertions), abuse battery, E2E dry run (11/11), rollback test on migrated schema.
Planned: Resend (email), PostHog (analytics at launch), Better Stack (uptime), Cloudflare free tier in front of the domain, dynamic OG cards (@vercel/og), llms.txt and FAQ schema (FAQ and JSON-LD already live).
Rejected for now: Next 16, Cloudflare Workers, D1, Upstash before launch (STACK-DECISIONS.md).
Automation: daily heartbeat 08:00 IST, weekly report Mon 09:00 IST, T-7 audit Oct 31, launch execution Nov 7.

## PART 5. REVENUE MODELS (broker-free), from the Sep 29 research
| # | Model | Who pays | Legal risk | Effort | Potential | Counsel? |
|---|---|---|---|---|---|---|
| 1 | Paid analytics and journal subscription (SaaS, 18% GST India) | Traders | Low | Medium | High | No |
| 2 | B2B white-label tournament engine | Prop firms, academies, communities | Low to medium | Medium | High | Yes |
| 3 | Sponsor-funded prizes, free-to-enter contests | Sponsors | Low | Low to medium | Medium | Yes (contracts) |
| 4 | Affiliate for non-broker tools (TradingView, VPS, tax software) | Vendors | Low | Low | Medium | No |
| 5 | Data and leaderboard licensing (anonymized, aggregate) | Funds, researchers | Low to medium | High | High | Yes (DPDP, GDPR) |
| 6 | Coaching and education marketplace (15 to 30 percent cut) | Members | Medium | Medium | Medium | Yes (SEBI adviser rules) |
| 7 | Cosmetic and status upgrades (non-cash) | Members | Low | Low | Low to medium | No |
| 8 | Prop-style evaluation challenges | Traders | Medium to high | High | Very high | Yes |
| 9 | Paid-entry cash contests | Traders | HIGH (28% GST on gross, gaming law, securities law) | High | High | Mandatory |
| 10 | Broker partner commission (XM live track, global only) | Broker | Medium (counsel on offshore commissions) | Low | Medium | Yes |
Agent ranking for launch: 1 SaaS, 2 white-label, 3 sponsors plus free contests, 4 affiliate, 5 data licensing later. Models 8 and 9 stay off until counsel. Model 10 is the founder-chosen XM track, live only outside blocked regions.

## PART 6. GROWTH AND DISTRIBUTION
1. Stealth law: no public posts before Nov 7. A teaser arc Oct 17 to Nov 6 exists only as a plan (HYPE-PLAN.md), pending founder GO.
2. Public verifiable track-record pages and shareable leaderboard cards (dynamic OG images). Risk-neutral URLs only: /verify, /stats, /certificate.
3. Referral ladder with non-cash rewards (REX, analytics, badges). No cash-for-referral copy anywhere.
4. Educator and community leagues: flat sponsorship or per-active-participant fees, never profit splits or rebates. Ranking by risk-adjusted score.
5. Prop-firm review community positioning: "free proving ground before you pay for an evaluation."
6. SEO and GEO: llms.txt, FAQ JSON-LD (live), programmatic pages built on real session and market data (not thin AI text). Crawl gate flips at launch (STEALTH_MODE=false).
7. Community bots (economic calendar, session countdown) through opt-in server partnerships only.
8. Newsletter with double opt-in ("The Risk-Adjusted Trader").
9. PR angles: end of ROI-only contests; proof of skill against fake screenshots; AI versus human benchmark. Press kit carries a "Notice to media and regulators".
10. Time-zone calendar tool mapped to volatility windows.
11. Banned vocabulary (Safe Browsing lesson of Sep 26): claim, win cash, payout, clearance, instant withdrawal, guaranteed. Preferred: enter, rules, verify, pass, credits.

## PART 7. OPERATIONS
1. Roles: founder (Somil) decides and signs; agent builds, tests, documents, runs automations.
2. Support: refund policy draft and ticket templates (SUPPORT.md).
3. Monitoring: daily heartbeat, uptime, error alerts, weekly report.
4. Runbooks: OPS-RUNBOOK, LAUNCH-PLAN, MERGE-CHECKLIST, rollback (tested), backup and restore (tested).
5. Service survival plan, Vercel deploy rules, Neon branch restore points.
6. Docs rule: everything in /docs so a future agent can rebuild from scratch.

## PART 8. LEGAL AND COMPLIANCE MAP (all items need a lawyer before they are relied on)
Traffic light from the Sep 29 legal report, corrected for the real product.
Correction: the legal agent assumed a pure paper-trading model. FORTREX actually supports two entry paths: DEMO contests (verified demo MT5, open to all non-flagged members incl. India) and LIVE-PARTNER contests (real XM account, partner link, blocked regions). Risk is much lower on the demo path.

GREEN, safe at launch
1. Demo-account contests with virtual points, free entry, objective risk-adjusted scoring.
2. REX with no cash value and no redemption.
3. Sponsor-funded non-cash prizes with free entry.
4. Geo-block of US and India from live tracks (built into entry-gate).
5. Risk disclaimer on every money surface (built).
YELLOW, counsel first
1. Broker partnerships and any commission from an offshore broker (India SEBI 2024 association rules, FEMA/RBI).
2. Paid-entry tiers with a free alternative route.
3. Prize cash to winners (194BA TDS 30 percent; GST classification 18 vs 28 percent).
4. DPDP (India) and GDPR (EU/UK) data agreements; cross-border transfer.
5. Educator marketplace (no unregistered advice).
6. Entity structure: UAE or Singapore holding company plus India operating company on a cost-plus contract (permanent-establishment and transfer-pricing review).
RED, avoid
1. Paid-entry cash contests (28% GST on gross, online gaming law) until counsel clears.
2. Any offshore forex/CFD promotion to Indian residents.
3. US residents in any paid or live contest (CFTC, state contest laws).
4. Copy-trading or trade signals from the leaderboard.
5. Redeemable or tradable REX.
6. Zerodha and similar broker APIs where terms prohibit trading games.
Regional notes: UK (FCA promotion rules, gamification warnings), EU (ESMA bans incentives tied to retail CFDs; France, Spain, Portugal, Poland, Belgium blocked per XM agreement), MiCA only if crypto tokens appear.
Contest law: break "prize + fee + chance": skill scoring, free entry route, published rules.

## PART 9. RISKS
1. Regulatory (highest): SEBI, FEMA, gaming law. Mitigation: counsel, geo-blocks, demo-first, no cash REX.
2. Platform policy: Google Safe Browsing (hit once), ad-platform finance rules. Mitigation: banned-word list, noindex until launch.
3. Broker dependency: XM terms, MetaApi availability. Mitigation: MT5-only adapters kept generic; second broker later.
4. Cheating: multi-accounts, wash trading. Mitigation: account fingerprint, admin claim review, honest zero scoring.
5. Cold start: empty leaderboard. Mitigation: educator leagues, free demo contests, Genesis scarcity as fact.
6. Single founder and single agent: Mitigation: full docs, rebuildable runbooks.
7. Credits: integration credits are exhausted until about Oct 1 reset (image generation, public fallback backend blocked).
8. Infrastructure: Vercel Hobby limits, zombie processes, deploy rules (all in MERGE-CHECKLIST lessons).

## PART 10. ROADMAP
Done: platform core, security hardening, lab growth build, phone pass, merge checklist, dry run.
Next (agent): rank alerts, admin polish, Resend email, PostHog, OG cards, llms.txt, programmatic pages, T-7 audit Oct 31.
Founder-only (asked only when product is complete): XM partner account and link, counsel consult, domain, trademark filing (by Oct 24), company registration, MetaApi token, real-phone test.
Dates: Oct 5 counsel; Oct 15 campaign decision; Oct 17 teaser window (needs GO); Oct 24 trademark and domain; Oct 31 T-7 audit; Nov 7 launch.

## PART 11. DECISION NEEDED (the one open fork)
Money model: A demo only (safest, launch-ready), B live XM track (broker commission, counsel-gated, global only), C hybrid (demo for everyone, live XM for eligible regions). Agent recommendation: C, launching with A live and B switched on only after counsel and the XM link exist. The gate already supports all three per tournament.

## SOURCES
research-gray-revenue.md, research-gray-growth.md, research-gray-legal-map.md (Sep 29 agents); research/universe 01 to 12; STACK-DECISIONS, REX-ECONOMY, REVENUE-MODEL, STEALTH-MODE, CROWN-SYSTEM, MERGE-CHECKLIST, FOUNDER-TEST-DRYRUN.
Caveat: the three Sep 29 reports are agent research from web searches, not legal advice. Laws named (Online Gaming Act 2025, SEBI 2024 circulars, GST, TDS 194BA) must be confirmed by counsel.
