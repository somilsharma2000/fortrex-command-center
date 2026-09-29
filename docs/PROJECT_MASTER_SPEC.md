---
title: Project Master Spec
summary: The living single-source-of-truth for WHAT FORTREX is — product, business, rules, architecture. Every agent reads this before building. Never contradicted, only updated.
---

# PROJECT MASTER SPEC — FORTREX

**Last updated:** Sep 30, 2026
**Why this file exists:** Long-running agents lose the project's reasoning and start contradicting earlier work. This file, PROJECT_STATUS.md, and DECISIONS.md together prevent that. When a new decision lands, update all three in the same session.

## 1. Expanded vision (founder, Sep 30 — the single platform for traders)

FORTREX = ONE platform fulfilling every trader need: 1) trading journal software — connect a real MT5 account, auto-import and analyze every trade like the top journal tools; 2) verified competitions with live reports and leaderboards; 3) an education hub — guides, notes, topics, definitions, a proper trading course library; 4) community — Discord as the hub, activity rewarded; 5) the REX economy rewarding invites, streaks, Discord activity, competition wins AND real prize money. Entry law unchanged: live competitions require the broker account opened through our link/code. Human psychology drives design. Scale target: 5 million traders, multi-country. Same design canon.

## 1a. What FORTREX is (one paragraph)

A non-custodial, skill-based trading tournament platform. Traders keep their capital at their own broker; FORTREX organizes verified competitions with honest leaderboards and risk-adjusted scoring, and earns from broker partnership on accounts opened through its link plus arena fees. Launch: November 7, 2026. NO seat cap (removed by founder order Sep 30). Founding members = everyone who joins before launch, each carrying a permanent 1.25x REX multiplier.

## 2. Product surface

Landing, signup/signin, onboarding, dashboard, connect (MT5 + demo ONLY), tournaments, leaderboard, journal, legal pages, admin (TOTP MFA). Language support: worldwide time zones. Check-in streaks automated daily. Demo contests open worldwide including India; live partner contests gated by region law (US, CA, IR, KP, UK, EU/EEA refused) and by link-opened + verified accounts only.

## 3. Non-negotiable rules (from founder + law)

1. Entry to live competitions ONLY via broker account opened through FORTREX's link + verification. No open "connect any account" path.
2. REX has NO cash value, NO cash-out. No REX→₹ rate anywhere until counsel approves Path B.
3. MT5 + demo only pre-launch. LIVE accounts only for competitions post-launch (demo stays for education/practice tracks). All other integrations deleted (provider enum values remain inert in DB by Postgres limitation, documented).
4. No offshore broker promotion to Indian residents. No fraud traffic (never pay members to open accounts). No public mention of XM or any partner without written approval.
5. Stealth until Nov 7: noindex, robots blocked, hand-shared links only.
6. Design canon locked: obsidian #050506, gold #D8A64D, bone #FFF7E6; Space Grotesk / Inter / JetBrains Mono; crown grammar per CROWN-SYSTEM.md. Quiet institutional voice, zero hype, risk disclaimer on every money surface.
7. Stack locked until Nov 7 (STACK-DECISIONS.md): Next 15.3 + Vercel + Neon. Better Auth, Resend, PostHog at launch.
8. No feature ships if it creates legal exposure.

## 4. Business model

Primary: broker partnership commissions on accounts opened via our link (counsel-gated for India exposure). Secondary: arena/platform fees (SaaS-style at 18% GST, NOT entry-fee pooling at 28%). Tournament prizes come from pools the founder defines, funded by broker or sponsor, counsel-reviewed. REX = reputation + in-platform benefits only.

## 5. Architecture (verified, migrations 0001–0009, 16 tables)

Next.js 15.3 App Router, Better Auth, Neon Postgres (prod branch dawn-surf-72239932), Vercel (production: fortrex-platform, frozen; lab: fortrex-lab, growth-lab-v1 branch). Scoring: Score v1.0 with frozen tiebreakers. Simulator: MT5-realistic (EURUSD, XAUUSD, US30, BTCUSD in USD, 10k account). Admin: TOTP header-gated, audited. Security: XSS-escaped, rate limits, security headers (HSTS, CSP), append-only REX ledger, race-safe Genesis seats, audit log.

## 6. Where detail lives (read before working)

Business: BUSINESS-BLUEPRINT.md, REVENUE-MODEL.md. Vision: FOUNDER-VISION-2026-09-29.md. Legal: MT5-XM-PARTNER-GATE.md, BROKER-RIGHTS.md, legal pages (live). Launch: LAUNCH-PLAN.md, LAUNCH-READINESS.md, MERGE-CHECKLIST.md. Research: research/ (competitors, demand, reviews, 180-point universe). Campaign: PRELAUNCH-CAMPAIGN.md, HYPE-PLAN.md (founder GO required). Governance: AGENT-OPERATING-CHARTER.md, PROJECT_STATUS.md, DECISIONS.md.

## 7. Update protocol

Any change to sections 1–5 requires: decision recorded in DECISIONS.md → this spec updated same session → PROJECT_STATUS.md refreshed → charter laws respected. If a new agent's plan contradicts this file, the file wins until the founder says otherwise.
