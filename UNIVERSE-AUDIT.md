# FORTREX — Master Universe Audit (All 180 Points, Covered or Not)
> Written Sep 26, 2026, after the founder forwarded a 180-point "company operating system"
> framework. His instruction: research everything, analyse, discuss all points together,
> then decide what to build. This file IS that audit: every point mapped to what already
> exists, what's genuinely missing, what's deliberately deferred, and what needs a
> founder decision. Nothing here is a decision — decisions are listed in §5 and made
> with the founder in conversation.

## 1. The verdict in one paragraph

Roughly **70% of the 180 points already exist** across the command center (MASTER-SPEC,
REX-ECONOMY, OPS-RUNBOOK, DISTRIBUTION, PARTNER-PIPELINE, STACK-DECISIONS, research/,
brand-kit, content-system). Another **20% are correct but deliberately post-launch**
(international legal matrix, sponsorships, B2B, APIs, mobile) — building them now would
violate the framework's own rule: *challenge overbuilding*. The remaining **~10% are real
pre-launch gaps**, listed in §3 — mostly the product moat (verification, scoring,
tournament spec), the revenue one-pager, support basics, and governance registers.
The framework's legal warnings check out: the PROG Act and its 2026 Rules are verified
law (sources in REX-ECONOMY §3.5) and the REX fork is exactly the decision it says it is.

## 2. Coverage matrix (180 points grouped into 14 domains)

| # | Domain (framework points) | Status | Where it lives | Real gap |
|---|---------------------------|--------|----------------|----------|
| 1 | Governance, source of truth, registers (0, 122, 163, 168–172, 180) | PARTIAL | repo docs + commit history | DECISIONS.md log, glossary, unknowns register — cheap, adopt |
| 2 | Vision, promise, personas, market (1–5, 93–96) | MOSTLY COVERED | MASTER-SPEC, research/01–02 | light personas (jobs-to-be-done) for launch copy; ongoing user research is post-launch |
| 3 | Legal/regulatory India + international (6–7, 118) | STRONG for India | research/04, REX-ECONOMY (§3.5 now has verified primary sources) | written counsel opinion (founder action); international matrix = post-launch by design |
| 4 | REX economy + rewards (8–9, 144–146, 190) | COVERED | REX-ECONOMY.md; ledger already built in platform schema | redemption engine deliberately unbuilt (pre-counsel); economy simulation = post-counsel |
| 5 | Tournament economy + engine (10–11, 147–151) | PARTIAL (concept only) | MASTER-SPEC | TOURNAMENT-SPEC with statuses/rulesets — October P1 |
| 6 | Verification, data normalization, anti-cheat, fairness, scoring, leaderboard (12–19, 86–87, 138) | CONCEPT ONLY — this is the moat | research/05 mentions adapters | VERIFICATION-SPEC, SCORING-SPEC v1, basic anti-cheat — October spike |
| 7 | Profile, social identity, Genesis program (20–23, 151–152) | PARTIAL | MASTER-SPEC, platform schema (users, genesis cap, multiplier) | Genesis seat mechanics fine as built; reputational graph = P3 |
| 8 | Referrals (23) | COVERED | platform schema + referral attribution fix on site | clawback/fraud rules → fold into TOURNAMENT-SPEC |
| 9 | Community, trust, support, disputes (24–25, 52–54, 89) | GAP | Citadel concept in spec | support email, refund policy, dispute basics — P1 (§3) |
| 10 | Funnels, onboarding, retention, psychology (31–35, 90, 97) | PARTIAL | funnel in MASTER-SPEC, streaks/checkins in schema, PostHog at launch | define the activation event precisely (launch analytics) |
| 11 | Content, SEO, ads, acquisition, partners, virality (26–29, 36–43, 153–157, 161–162) | STRONG | DISTRIBUTION, PARTNER-PIPELINE, content-system (stale phases flagged superseded), brand-kit | ads-platform compliance rules = P2; widgets = P3 |
| 12 | Business model, unit economics, finance, payments, payouts (44–52, 113–120) | GAP BY DESIGN | revenue direction in MASTER-SPEC | **revenue one-pager with real numbers — P1, I draft next**; entity/payments deferred by founder until legal |
| 13 | Ops, infra, security, reliability, DR, observability (53–56, 59–68, 77–85, 121, 136–142, 164–167) | STRONG | OPS-RUNBOOK, STACK-DECISIONS, CI (green), audit_log in schema | kill switches (cheap, add to platform config); status page = P2; vendor exit plans = P2 |
| 14 | Roadmap, priorities, metrics, AI rules (61–62, 91–92, 173–180) | PARTIAL | priorities tracked in conversation + audit §4 | formalize P0–P4; AI-never-touches-money rule → adopt into DECISIONS.md |

## 3. The real pre-launch gaps (the ~10%, ranked)

1. **Verification/Scoring/Tournament specs** (§2.6, §2.5) — the product itself. October spike.
2. **Revenue model one-pager** — pricing, fee math, honest numbers, legal gates marked.
3. **Support basics** — support email, refund policy, who-does-what on launch day.
4. **Governance registers** — DECISIONS.md, glossary, unknowns register (all cheap).
5. **Kill switches** — feature flags to disable tournament entry / REX earning / referrals without a deploy.
6. **Launch-day product moment** — see §4 ("Season Zero"): a website with a waitlist is not a launch.

## 4. Out-of-the-box additions (my research, not in the framework)

- **Season Zero tournament (Nov 7):** a Genesis-only launch tournament makes Nov 7 an
  *event* with results, not a page with a form. Requires the October verification spike.
- **Demand-first broker adapter:** before building MT4/MT5/cTrader adapters on spec,
  ask the first 25 invitees which broker they actually use — build exactly ONE adapter,
  excellently. The framework says "research integrations"; research says "research users."
- **The verified record as B2B product (P3/P4):** prop firms burn money screening applicants.
  A FORTREX-verified performance history is pre-screening infrastructure they would pay for.
  This is where FTMO-style revenue actually scales (the framework notes it; this sharpens it).
- **Transparency as launch trust asset:** publish "How verification works" and "How scoring
  works" pages on launch day. Every competitor hides methodology; the brand enemy is fake
  screenshots. Publishing is the moat, and it costs a day of writing.
- **Spectator mode / tournament replay (P2):** top tournaments replayed as content = a
  content engine that doesn't depend on creators.
- **REX monetary policy hooks (post-counsel):** issuance tied to tournaments only, typed
  reasons, seasonal balance reviews. Already 80% true in the ledger design; formalize later.

**And the out-of-the-box NOs** (things deliberately NOT built, with reasons on record):
no REX transferability or trading between users (convertible token risk under PROG
"other stakes"); no public promise of future withdrawal/redemption (expectation of
enrichment is itself a legal fact); no fake scarcity beyond the real 10,000 cap; no
re-coupling to any single no-code platform (portability law).

## 5. Decisions to make WITH the founder (nothing built before these)

1. **REX public position:** confirm launch copy keeps "no cash value" and never promises
   future redemption until counsel's written classification. (Recommended: YES.)
2. **Governance shape:** my recommendation — keep existing docs, add DECISIONS.md +
   GLOSSARY.md + this audit as the index. Do NOT create the 24-document master library
   now; per the framework's own overbuilding rule, that's doc-sprawl for a solo founder.
3. **Season Zero:** confirm the Nov 7 launch includes a Genesis-only tournament (drives
   the October verification spike and the one-adapter choice).
4. **Revenue one-pager:** confirm I draft it next (real numbers, legal gates marked) for
   his review.
5. **Lawyer consult:** the brief in REX-ECONOMY §3.5/§4 is now upgraded with verified
   citations (PROG Act, PROG Rules 2026, DPDP timeline). Booking it is founder-only.
6. **Support email + refund policy:** I draft both; he creates the mailbox when ready.

## 6. Evidence grading used in this audit (per the framework's own standard)

- PROG Act 2025 text + assent date: **Grade A** (MeitY gazette PDF).
- PROG Rules 2026 effective May 1: **Grade A/B** (MeitY notification; secondary corroboration).
- DPDP Rules 2025 staged commencement: **Grade A/B** (notified Nov 13, 2025; law-firm
  analyses agree on phased binding from ~Nov 2026 / May 2027 — counsel confirms exact dates).
- Free-tier/vendor claims: as recorded in STACK-DECISIONS.md, re-verified at adoption time.
- Anything else in the framework not cited here: **treated as hypothesis until sourced.**
