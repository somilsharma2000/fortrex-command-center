---
title: FORTREX Master Operating System
summary: The definitive master prompt for every FORTREX agent. Ten master layers, 43 audited domains with current status, the digital-twin law, the operating loop, and authority boundaries. Supersedes all ad-hoc prompt sequences.
---

# FORTREX MASTER OPERATING SYSTEM — v1.0 (Oct 1, 2026)

> **This is the master prompt.** Every agent that works on FORTREX — this session or any future one — starts here. It supersedes all ad-hoc prompt sequences. It extends (does not replace) the five laws and department-council governance of AGENT-OPERATING-CHARTER.md, which remains the behavioral core. The three living files (PROJECT_MASTER_SPEC.md, PROJECT_STATUS.md, DECISIONS.md) remain the session-to-session memory; this document is the standing operating system above them.

---

## §1 THE OPERATING LOOP (never ends)

```
INSPECT → UNDERSTAND → RESEARCH → CHALLENGE → PRIORITIZE → IMPLEMENT → TEST → SELF-CRITIQUE → IMPROVE → REGRESSION TEST
```

Laws of the loop:
- Never declare "done." The system always has a next weakest point.
- Fix what is wrong, improve what is mediocre, redesign what is generic, remove what is unnecessary, and decide honestly whether what is missing belongs.
- Optimize for actual product quality, never for "requirements completed."
- FORTREX must feel like a serious international product, not an AI-generated dashboard.
- After implementation: verify in code AND live on the deployed site (recheck-twice law). Self-critique as a hostile senior reviewer before claiming a cycle complete.
- Answer your own questions by inspecting and researching. Ask the founder ONLY what genuinely requires founder authority (§6).

---

## §2 THE TEN MASTER LAYERS

Each layer: mission, its domains, current verified state, and standing orders.

### L1 — PRODUCT (what FORTREX is)
Mission: the world's honest trading-competition platform — verified broker data, risk-adjusted scoring, REX reputation, journal + education + community.
Domains: product spec, trader journey, arena, REX economy, features.
State: LIVE. Season Zero drafted (Nov 7–10 window), scoring v1.0 frozen, REX ledger append-only, journal/learn/psychology live, member chrome unified.
Standing orders: the spec files (PROJECT_MASTER_SPEC.md, SCORING-SPEC, TOURNAMENT-SPEC, VERIFICATION-SPEC) are the source of truth. Before any feature: does it strengthen the honest-competition promise? If not, reject.

### L2 — EXPERIENCE (how it feels)
Domains: UI/UX, placement, motion (Crown Motion), mobile, psychology, accessibility, personalization (20, 22, 32), power-user UX (19), PWA (23).
State: design canon locked (CROWN-SYSTEM.md — quiet, institutional, gold ~10%); motion signature defined; route loading/error states live; mobile clean at 390px; a11y partial (reduced-motion respected; full audit pending).
Standing orders: never invent a new design language. Every screen: what should the user see first, and is it there? Personalization is progressive disclosure by account state (new → connected → verified → competing → post-arena), not different products. Engaging never means manipulative (§32 law: no dark patterns, no false urgency; scarcity only as fact).

### L3 — COMPETITION (integrity of the arena)
Domains: state machines (1), competition integrity / anti-cheat (2), financial reconciliation (3), settlement, auditability.
State: PARTIAL — the engine is proven (idempotent sync, honest zero-trade scores, provenance columns, score snapshots, transition 409s), but integrity is not yet a system.
Standing orders:
- **State-machine law:** every important object (user, verification, broker connection, tournament, entry, trade, REX, referral, notification, admin action) has a documented legal state machine. Every transition tested legal + illegal. If a state can be reached that shouldn't exist, that is a P0.
- **Prove-the-rank law:** FORTREX must be able to reproduce, from stored snapshots and provenance, exactly why every trader got their exact result. Any ranking that cannot be re-derived is a defect.
- Anti-cheat radar (build pre-launch, lightweight): multi-accounting, self-referral loops, abnormal trade timing, duplicate trades, impossible returns. Detection = flags for review, never automatic punishment.
- Financial reconciliation: commissions/fees are counsel-gated (see legal shield); the moment any money flow ships, it ships with a reconciliation job and an accounting export. No exceptions.

### L4 — ENGINEERING (how it is built)
Domains: frontend, backend, DB, APIs, integrations (11, 12, 26), supply chain (39), schema/migration safety (26), storage (27).
State: LIVE and hardened — Next 15.3 + Vercel + Neon, 21 tables verified on both branches, migration discipline established, stack CLOSED until Nov 7 (STACK-DECISIONS.md).
Standing orders: pre-launch stack changes need a reason stronger than "newer exists." Every schema change: BACKUP → MIGRATION TEST → COMPATIBILITY → DEPLOY → VERIFY → ROLLBACK PLAN. Every integration follows CONNECT → VERIFY → ACTIVE → EXPIRE → FAIL → RETRY → RECONNECT → DISCONNECT with a degraded mode defined. Supply chain: dependabot/2FA/secret-scanning stay open P0s until enabled.

### L5 — SECURITY & TRUST
Domains: red-team security, trust & safety (4), account lifecycle (5), security ops (6), privacy/data governance.
State: hardened (MFA, rate limits, kill switches, headers, XSS-escape, RBAC, 403/429 batteries verified) but ops-layer thin.
Standing orders:
- Account lifecycle must be complete: SUSPENDED/RECOVER/DEACTIVATE/DELETE paths, session management, export-my-data. Account deletion and data export become real before launch or are explicitly founder-deferred in DECISIONS.md.
- Trust & safety is a layer, not a feature: reporting, moderation queue, enforcement history, appeals. Start with the smallest honest version (a report path + an admin queue).
- Security ops: document secret/key rotation, admin access review, incident procedure. Credential expiry tracked in the ops runbook.
- Privacy: PII inventory + data lifecycle (who reads/writes/deletes/retains/recover s every important record) documented as an operational system, not legal pages alone.

### L6 — OPERATIONS
Domains: admin command center, support OS (15), observability (14), incident/postmortem (42), DR (7), deployment (8), ops documentation (41), launch readiness (43).
State: strong foundation — admin console with TOTP + audit + real-time health; OPS-RUNBOOK + LAUNCH-PLAN live; deploy discipline proven (rsync snapshot rule, lab/prod topology); backup/restore verified once.
Standing orders:
- Admin is operational-decision shaped (attention queues, investigation, safe destructive actions with recovery), never a CRUD mirror of the database.
- Observability loop: DETECT → ALERT → TRIAGE → MITIGATE → RECOVER → VERIFY → POSTMORTEM → PREVENT. Every alert has a destination and a runbook entry.
- DR law: backups that have never been restored are assumptions. Scheduled restore drills (REX ledger, tournaments, audit log) — verify recovery quarterly at minimum, scripted.
- Deployment: CODE → TEST → LAB → REVIEW → DEPLOY → SMOKE → MONITOR → ROLLBACK; the lab branch is the staging environment; the rsync rule and environment map in the handbook are binding.
- Support: every trader problem has a path (help → category → admin queue → resolution → audit). Support tickets feed the feedback engine (L10).

### L7 — DATA & INTELLIGENCE
Domains: analytics, feedback engine (16), experimentation (17), global search/command (18), recommendations (35), product intelligence (36), data hygiene (25).
State: PARTIAL — PostHog planned at launch; feedback banner live; learn search live; journal analytics live.
Standing orders: no claim without data; no recommendation without explanation ("because your last 5 journal entries flagged revenge risk" not "AI suggests"). Experimentation and global search are post-launch systems — design for them now (env-flag hooks), build them when traffic exists. Data hygiene: a scheduled audit script for orphans/duplicates/invalid states/stale records.

### L8 — GROWTH
Domains: referral loop, retention (31), community/Discord (33), content production (29), growth architecture (30), brand ecosystem (28), knowledge architecture (34).
State: referral loop LIVE (+50 REX, auto-pay verified); OG/SEO/GEO built but stealth-gated; INITIALIZATION campaign captured, decision day Oct 15; Discord planned.
Standing orders: measurable loops (ACQUISITION → ACTIVATION → PARTICIPATION → RETENTION → REFERRAL), every loop with a metric. Retention work answers "why does a trader return" — know the trigger, don't count visits. Brand law: crown/shield/facet language across product, admin, email, social, OG cards; every AI asset inherits the base prompt (§18 of CROWN-SYSTEM). Stealth law until the founder lifts it: no public posts, noindex, hand-shared links only.

### L9 — INFRASTRUCTURE & SCALE
Domains: deployment infra, domain/DNS (9), email infra (10), notification intelligence (11), cost architecture (40), internationalization (21), design-system governance (37), visual QA (38).
State: PARTIAL — headers/HSTS live, custom domain pending (founder), email infra GATED on Resend key + SPF/DKIM/DMARC (P0 for password recovery), notifications in-app only.
Standing orders: cost model per scale step (100 → 1k → 10k → 100k → 1M) for DB/email/logging/API before each step arrives; find cost explosions early. i18n: all user-facing time is explicit (IST shown), USD scoring, dates/numbers formatted via one utility so locale-ready. Email: transactional separation, bounce/suppression handling, delivery monitoring from day one of Resend. Notification pipeline: EVENT → IMPORTANCE → PREFERENCE → CHANNEL → DELIVERY → RETRY → RESULT; duplicates and spam prevented by design.

### L10 — CONTINUOUS IMPROVEMENT (the meta-layer)
Mission: this operating system's heartbeat.
```
OBSERVE → MEASURE → FIND FRICTION → RESEARCH → IMPROVE → TEST → DEPLOY → OBSERVE AGAIN
```
Standing orders: every session ends by recording what was verified, what remains weakest, and the next cycle's target in the living files. The feedback engine feeds the backlog; the backlog feeds the loop. The agent never waits to be told what to improve — it inspects the weakest layer and works it, within authority.

---

## §3 THE DIGITAL TWIN LAW (second-order impact)

FORTREX is ONE CONNECTED SYSTEM, not a collection of pages:

```
TRADER → PROFILE → BROKER → VERIFICATION → ARENA → TRADES → SCORING
→ LEADERBOARD → RESULT → REX → REPUTATION → PROFILE → REFERRAL → NEW TRADER
```

Before changing ANY piece, the agent MUST answer:
1. **What else changes because of this?** (walk the loop in both directions)
2. Which downstream invariants break? (REX totals, rank snapshots, streaks, referral chains, audit entries)
3. Which surfaces show this data, and are they all updated in the same change?
4. What happens to historical records — does yesterday's truth stay true?
If a change cannot be answered on the twin, it is not understood well enough to make.

---

## §4 THE 43-DOMAIN AUDIT INDEX

Status legend: **LIVE** (built + verified) · **PARTIAL** (exists, needs the named gap) · **PLANNED** (designed, post-launch by default) · **GATED** (blocked on founder/legal/counsel) · **OPEN P0** (must be done before Nov 7).

| # | Domain | Layer | Status / next step |
|---|--------|-------|--------------------|
| 1 | State machines | L3 | PARTIAL — write explicit legal maps for all core objects; test illegal transitions |
| 2 | Competition integrity | L3 | PARTIAL — snapshots + provenance live; add anti-cheat flags pre-launch |
| 3 | Financial reconciliation | L3 | GATED (counsel) — reconciliation job mandatory with any money flow |
| 4 | Trust & safety | L5 | PARTIAL — add report path + admin queue (smallest honest version) |
| 5 | Account lifecycle | L5 | PARTIAL — deletion/export/suspension paths; OPEN at launch (password recovery) |
| 6 | Security operations | L5 | PARTIAL — rotation + access-review + incident procedure docs |
| 7 | Disaster recovery | L6 | PARTIAL — restore verified once; schedule scripted restore drills |
| 8 | Deployment/release | L6 | LIVE — extend with canary/feature-flag design (no pre-launch build) |
| 9 | Domain/web infra | L9 | PARTIAL — custom domain + DNS = founder; headers/HSTS live |
| 10 | Email infrastructure | L9 | **GATED/OPEN P0** — Resend key + SPF/DKIM/DMARC + reset-flow E2E |
| 11 | Notification intelligence | L9 | PARTIAL — in-app only; build pipeline at email activation |
| 12 | Integration lifecycle | L4 | PARTIAL — broker flow proven; add reconnect/degraded UX for MT5/MetaApi |
| 13 | Chaos engineering | L6 | PARTIAL — abuse battery exists; add scheduled chaos drills |
| 14 | Real-time observability | L6 | PARTIAL — SystemBoard live; alert routing + PostHog at launch |
| 15 | Support OS | L6 | PLANNED — templates drafted (SUPPORT.md); build queue at launch |
| 16 | Feedback engine | L7 | PARTIAL — feedback banner live; connect to backlog loop |
| 17 | Experimentation | L7 | PLANNED — design hooks only |
| 18 | Global search/command | L7 | PLANNED — Learn search live; global post-launch |
| 19 | Power-user UX | L2 | PLANNED — after core flows |
| 20 | Personalization | L2 | PARTIAL — state-aware desk; deepen post-launch |
| 21 | Internationalization | L9 | PARTIAL — USD + explicit IST; single formatting utility pre-work |
| 22 | Advanced accessibility | L2 | PARTIAL — full audit pre-launch |
| 23 | PWA / app-like | L2 | PLANNED — evaluate post-launch |
| 24 | Data portability | L5 | PARTIAL — journal CSV live; account export pre-launch-lite |
| 25 | Data hygiene | L7 | PARTIAL — scripted orphan/duplicate audit |
| 26 | Schema/migration safety | L4 | PARTIAL — formalize the protocol as a doc + checklist |
| 27 | Storage/media | L4 | LIVE-BASIC — CDN assets; no user uploads by design |
| 28 | Brand ecosystem | L8 | LIVE — canon locked; enforce across every new surface |
| 29 | Content production | L8 | PARTIAL — campaign gated to Oct 15 decision |
| 30 | Growth architecture | L8 | PARTIAL — loops live; add loop metrics at launch |
| 31 | Retention system | L8 | PARTIAL — streaks/journal/learn; return-triggers named in analytics |
| 32 | Competitive psychology | L2 | PARTIAL — no dark patterns enforced; anxiety audit pre-launch |
| 33 | Community architecture | L8 | PLANNED — Discord phase with roles/rituals post-launch |
| 34 | Knowledge architecture | L7 | PARTIAL — Learn hub live; contextual education post-launch |
| 35 | Intelligent recommendations | L7 | PLANNED — explainable-only law |
| 36 | Product intelligence | L7 | PARTIAL — journal analytics live; arena recap post-launch |
| 37 | Design-system governance | L9 | PARTIAL — canon + shared components; automated checks later |
| 38 | Visual QA automation | L9 | PLANNED — screenshot diffs post-launch |
| 39 | Supply-chain security | L4 | **OPEN P0** — dependabot/2FA/secret-scanning enable |
| 40 | Cost architecture | L9 | PARTIAL — scale-cost model before each growth step |
| 41 | Operational documentation | L6 | LIVE — three living files + runbooks + specs |
| 42 | Incident + postmortem | L6 | PARTIAL — template + first drill pre-launch |
| 43 | Launch readiness | L6 | LIVE — LAUNCH-PLAN.md is the binding Nov 7 sequence |

---

## §5 PRE-LAUNCH ORDERING (today → Nov 7)

1. **OPEN P0s:** email infrastructure (founder-gated: Resend key, domain DNS), supply-chain basics (#39), password-reset E2E once email is live.
2. **Integrity hardening:** state-machine maps (#1) + prove-the-rank audit script (#2) + restore drill (#7).
3. **Trust floor:** smallest honest trust & safety (#4) + account lifecycle gaps (#5) + a11y audit (#22) + psychology audit (#32).
4. **Experience depth:** founder taste passes; founding-member arc for Oct 1 → Nov 7.
5. **Launch execution:** LAUNCH-PLAN.md sequence — nothing in this OS overrides the launch runbook; the runbook wins in a conflict.
6. Everything else is post-launch by default. Building ahead of traffic needs a justification stronger than "it will be needed."

---

## §6 AUTHORITY BOUNDARIES (unchanged from charter)

Founder-only: money, legal, public revealing, partners, business scope, destructive-irreversible actions. Everything reversible and low-risk: act autonomously, record in DECISIONS.md. Challenge bad assumptions BEFORE implementing (autonomy law). During the founder's 7-step testing phase: total code freeze. Do not ask the founder for his task-list items until the product is complete to his satisfaction.

## §7 INVOLIABLE LAWS (carried forward)

Recheck twice · prove, never claim · skip nothing · no last-step fuckups · no cheating/stealing/faking · stealth until launch · legal shield (zero tolerance) · MT5-only, entry only via our link + verification · REX has no cash value until counsel approves Path B · design canon non-negotiable · quiet, honest, institutional — always.

## §8 SESSION-START PROTOCOL (for every future agent)

1. Read this document, then the three living files (MASTER SPEC → STATUS → DECISIONS).
2. Read the latest verified-proof rows in PROJECT_STATUS.md; distrust any claim without a live-verification note.
3. Check the DB topology map by host (ep-billowing-voice = PRODUCTION, ep-young-flower = LAB).
4. Pick the weakest item from §5/§4 within authority, run the §1 loop, record everything in the living files.
5. End the session by stating what was verified in code AND live, what remains weakest, and the next target.
