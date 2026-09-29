---
title: Founder OS Gap Analysis
summary: Reality report after installing the Founder OS master prompt (Sep 30). What the checklist finds already covered, what is missing, what needs building, and the assumptions challenged before implementation.
---

# FOUNDER OS GAP ANALYSIS — Sep 30, 2026

*Built per the master prompt's first-boot protocol: inspect first, code later. Sections A–K of the pre-flight checklist audited against what actually exists. Evidence-based, no theater.*

## Verdict up front

FORTREX is NOT an empty repo needing bootstrap. It is a nearly complete, tested, deployed product in stealth. Most of the Founder OS checklist is already satisfied by existing systems. The gaps are real but small and listed below. Two assumptions in the master prompt are challenged rather than blindly followed (per its own rule).

## A–B. Authority & living memory — COVERED

Founder authority model, autonomy law, escalation rules: charter §11. Living files exist and were updated same-session since Sep 30 (PROJECT_MASTER_SPEC, PROJECT_STATUS, DECISIONS). Status distinguishes verified vs pending by design (proof column). AGENTS.md — WAS MISSING, now created in both repos. Decision history preserved in DECISIONS.md (never silently reversed).

## C. Business — COVERED, with named owners

Problem, customer, alternatives, demand, competitive research: research/universe/01-12 (180 points, graded evidence) + REVENUE-MODEL.md + BUSINESS-BLUEPRINT.md + PARTNER-PIPELINE.md. Unit economics: REVENUE-MODEL.md (GST math, launch burn). Missing: UNIT_ECONOMICS.md as a living CAC/LTV file — cannot be honest pre-launch (no real users yet); will be born from PostHog data after Nov 7. Recorded, not forgotten.

## D. Product — COVERED

Requirements, journeys, acceptance criteria, states: TOURNAMENT-SPEC.md, SCORING-SPEC.md, VERIFICATION-SPEC.md, plus QA-FULL-PASS-REPORT.md (empty/loading/error states tested). Analytics: PostHog wiring planned at launch (deferred deliberately, stealth law — no traffic to analyze pre-launch). Feature flags: kill switches exist per feature (live_scoring etc.).

## E. Engineering — COVERED

Architecture, DB (16 tables, migrations 0001–0009), API, auth (Better Auth + TOTP admin MFA), error handling, tests (27 e2e + 80 regression + 63 verification), CI (GitHub Actions typecheck+build), observability (health endpoint + Better Stack in runbook), backups + restore (drilled, documented in FINAL-HARDENING-REPORT.md), rollback (tested, MERGE-CHECKLIST documents code-only rollback safety).

## F. Security — COVERED

Threat model, secrets (Vercel env, never committed), input validation (zod), authz (RBAC 403s tested), rate limits, abuse battery, XSS hardening, security headers: REPO-AUDIT-2026-09-26.md + ASVS-ASSESSMENT.md. AI prompt injection: N/A pre-launch (no user-facing AI features yet — flagged for the AI journal feature in the vision). Privacy/data map: legal privacy policy (9 sections) matches the actual data map.

## G. Operations — COVERED

Deployment process (runbooks), monitoring (daily heartbeat), alerts, incident response + disaster recovery (OPS-RUNBOOK.md, restore drilled), support SOP (SUPPORT.md with refund policy + ticket templates), vendor failure plan (kill switches per vendor).

## H. Growth — COVERED, stealth-gated

SEO/GEO package built (launch-day flip runbook in LAUNCH-PLAN.md), content system (CONTENT-PACKAGE.md), referral engine (built, paying 50 REX), lifecycle messaging (streaks + rank alerts built), sales/partnerships (PARTNER-PIPELINE.md, founder-only outreach per stealth law), measurement (PostHog at launch). HYPE-PLAN.md pending founder GO — correct state, not a gap.

## I. OSS / skills — GAP (now partially closed)

Repos evaluated before adoption per protocol. OSS_LICENSES.md — WAS MISSING, now created in the platform repo. The advisory repo list (Awesome-Bootstrapper-Roadmap, awesome-solo-founder-oss, saas-clawds, etc.) recorded as RESEARCH CANDIDATES, not adopted: several are unverified low-star lists; the master prompt's own rule (maintenance → license → security → activity → actual need) applies before anything touches the platform. shadcn/ui, lightweight-charts, PostHog, awesome-selfhosted noted as useful references consistent with the locked stack.

## J. Three-Pass Gate — PARTIALLY COVERED

Pass 1 (requirements) and Pass 2 (failure/hostile) exist as practice: the audit batteries and adversarial tests are real and green. Pass 3 (business audit) happens at the T-7 audit (Oct 31) and launch gate. MISSING: the formalized pre-flight checklist as a reusable gate document — now this file's children: the master prompt itself is stored and the gate is run from it.

## K. Launch Gate — COVERED (LAUNCH-READINESS.md is exactly this)

All K items verified with evidence there. Status: NOT LAUNCH READY until (founder-authority, correct): XM written approval, MetaApi token, domain, counsel review, merge GO. These are founder-gated by design.

## Review hierarchy (5 levels) — ADOPTED into charter §13

Specialist → cross-functional → adversarial → executive → founder gate. Council of 10 departments stays (renaming to 20+ would be theater; the 10 map onto all 20+ roles in the master prompt — mapping table below). Boss review: every significant deliverable passes 2–3 senior review passes (adversarial + executive) before founder sees it. No fake disagreement.

## Assumptions challenged (before implementation, as ordered)

1. "Zero outside paid SaaS dependency" — challenged. Current stack (Vercel, Neon, Resend, PostHog) is locked until Nov 7 by STACK-DECISIONS.md for launch reliability. Self-hosting everything pre-launch would ADD launch risk. Direction accepted as post-launch migration philosophy (Cloudflare free tier already in the stack decisions); not executed now.
2. "The agent must run full market + competitor research" — already done (180 points, graded). Not re-run from zero; the continuous improvement loop will keep it current.
3. Advisory repo links — not adopted blindly; several are unverified. Recorded as research candidates pending evaluation.

## Risk register (top items)

1. Founder tasks pending (XM, MetaApi, domain, counsel) — probability certain until done, impact: launch blocked. Detection: T-7 audit Oct 31. Mitigation: reminders scheduled. Owner: founder.
2. Legal exposure if hype/stealth violated — controlled by STEALTH-MODE.md guardrail + legal gates. Status: mitigated, monitoring continues.
3. Vercel Hobby limits (cron daily only) — known, documented, Pro upgrade is a founder-money decision at launch.
4. Credits for agent operations are exhausted until ~Oct 1 reset — affects sub-agent missions this week, not the platform.

## Next actions (priority order)

1. AGENTS.md + OSS_LICENSES.md created today (done this session).
2. Charter §13 added (done this session).
3. Oct 15: prelaunch campaign reminder (founder decision day).
4. Oct 31: T-7 audit runs the three-pass gate formally.
5. Nov 7: launch sequence per LAUNCH-PLAN.md.
