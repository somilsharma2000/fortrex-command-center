# FORTREX — 2nd-Order Systems Register (Blind-Spot Sweep v1)

**Status:** Active register — reviewed weekly, triage updated as work lands.
**Law:** The 500+ items below are NOT features. Most are controls, research questions, tests, policies, safeguards, documents, or operating procedures. Nothing enters the product without passing the Product Simplicity test (funnel law: does it help JOIN / TRADE / COMPETE / WIN / RETURN / REFER / OPERATE?).
**Triage key:**
- **DONE / COVERED** — exists today, with evidence.
- **P0** — must exist before Nov 7 launch.
- **P1** — launch window (Nov 7 – Dec 7).
- **P2** — post-launch, before scale push.
- **R** — research question, feeds the mandate, not yet decided.

---

## A. Product truth — definitions
**Status: DONE.** MASTER-SPEC §1-2 defines FORTREX, trader, verified trader, competition, skill, valid trade, result, reward, REX, redemption ("no cash value" shield). **"What FORTREX will never become"**: no prop-firm funding model, never touch client funds, never promise profits, no REX cash-out without counsel sign-off (REX-ECONOMY.md).

## B. Product classification
**Status: PARTIAL → P0 (counsel).** REX + revenue classification memos exist (REVENUE-MODEL.md, REX-ECONOMY.md brief). Missing: classification per tournament type, subscription, sponsorship, affiliate payments; country-availability matrix; re-review trigger list. **Action: expand the counsel brief to a classification matrix by Oct 5.**

## C. Broker / data rights
**Status: R → P0 for ToS basics.** Dhan-first adapter decided. Missing: Dhan HQ API ToS commercial-use verdict, market-data redistribution rights, rate limits, broker-outage and revoked-access contingencies. **Action: read Dhan HQ + Kite Connect ToS this week; verdicts into BROKER-RIGHTS.md. Launch blocker if commercial tournament use of API data is not permitted.**

## D. Data provenance
**Status: PARTIAL → P0.** Every trade stores provider, broker_trade_id (unique), raw payload JSON, normalized fields, UTC timestamps; scoring stores score_version per participant (E2E verified). Missing: adapter_version column, score-input snapshot for bit-for-bit reconstruction. **Action: add `adapter_version` + `score_snapshot` in October build. This is the anti-dispute moat.**

## E. Clock / time integrity
**Status: DONE (core) → P1 (edge cases).** UTC canonical; normalization at ingest; duplicates blocked by unique index (verified E2E). **Action: document window-tolerance policy (out-of-window and late-arriving trades excluded deterministically).**

## F. Score immutability
**Status: PARTIAL → P0.** score_version frozen per participant; deterministic re-score verified. Missing: recalculation audit trail (previous/new score, trigger, reason) + historical leaderboard preservation. **Action: score history audit entries on every recalc. Never let a new algorithm silently rewrite history.**

## G. Economy / treasury
**Status: PARTIAL → P2.** Append-only REX ledger with typed reasons + multipliers; issuance designed. Missing: velocity/concentration tracking, worst-case liability model, simulations at 10k/100k/1M/10M. **Action: simulation section post-launch with real data. Non-redeemable REX keeps liability near-zero until Path B.**

## H. Economic attacks
**Status: PARTIAL → P1.** Self-referral blocked (verified E2E), unique emails, idempotent sync/join. Missing: Sybil/multi-account detection, collusion review, tournament farming, deliberate-losing strategies, tiebreaker exploits. **Action: FRAUD-PLAYBOOK.md — standing question per surface: "how would a sophisticated attacker profit here?" First answer: risk-adjusted scoring makes jackpot/lottery strategies score poorly by design.**

## I. Account security
**Status: PARTIAL → P1 (P0 for admin MFA).** Better Auth: bcrypt, httpOnly cookies, revocation. Missing: auth rate limits, new-device alerts, recovery flow, admin MFA. **Action: admin MFA + auth rate limits before launch — admin console is internet-exposed.**

## J. Admin security
**Status: PARTIAL → P0 (audit), P2 (dual approval).** Owner-only RBAC (403 verified), kill switches verified, REX ledger is append-only. Missing: privilege separation, dual approval for REX adjustments, audit export. **Solo-founder reality: dual approval lands when staff exist; audit trail on REX adjustments is the P0.**

## K. Software supply chain
**Status: PARTIAL → P1.** Lockfile committed; minimal deps; CI typecheck+build on push. Missing: dependabot, secret scanning, SBOM, license review. **Action: founder enables GitHub dependabot + secret scanning + 2FA in one sitting (bundle with Neon/Vercel signup).**

## L. Attack-surface inventory
**Status: R → P1.** Surfaces: site, 13 API routes, admin, Postgres, broker adapters, CI, DNS, GitHub. **Action: SECURITY.md one-pager: surface → owner → threat → control → monitor → recovery.**

## M. Webhook security
**Status: N/A until broker/payment webhooks exist.** Sync is pull-based today. When they arrive: signature verification, replay protection, idempotency, dead-letter queue.

## N. API resilience
**Status: PARTIAL → P0.** Idempotency verified (sync, join, check-in); zod validation on all writes; Upstash in stack. Missing: rate limiting not yet wired. **Action: wire Upstash limits on auth + waitlist + join routes before launch. Request IDs: P1.**

## O. Disaster recovery
**Status: DONE (documented) → P1 (drills).** OPS-RUNBOOK.md covers rollback, Neon PITR, broken deploy, lost secrets. **Action: first rollback drill at T-7 audit (Oct 31) dress rehearsal.**

## P. "AI agent dies" plan
**Status: DONE — standing law.** /docs in both repos; HANDOVER.md; runbooks written so a future agent rebuilds from docs alone. Keep true with every change.

## Q. Observability
**Status: PARTIAL → P1.** /api/health DB probe live (verified); Better Stack in runbook. Missing: sync/scoring latency signals. **Honest order: health + uptime + weekly report now; PostHog at launch.**

## R. SLO / SLA
**Status: R → P2.** Post-launch with real data. Draft targets: 99.5% availability (single-region Vercel), verification < 24h, scores published < 2h after close.

## S. Chaos / failure testing
**Status: PARTIAL → P2.** E2E suite already covers: duplicate syncs, same-day check-ins, invalid transitions, kill switches, forbidden paths, DB-down health 503. Expand: broker outage, malformed payloads.

## T. UX failure design
**Status: PARTIAL → P1.** Provider gating honest (unavailable providers show the exact missing credential — verified E2E). Missing: empty, tournament-full, score-pending, broker-disconnected, degraded states. **Action: UX-STATES.md + implement the 6 most likely.**

## U. Accessibility
**Status: P1.** WCAG 2.2 baseline pass on public pages before launch: keyboard nav, labels, focus, contrast (obsidian/gold canon is already high-contrast), touch targets. Accessibility is also a trust signal.

## V. Low-bandwidth experience
**Status: DONE (light).** First Load JS 103-120kB (verified in build); leaderboard is server-rendered tables. Keep it. Reduced-motion: P2.

## W. Design system governance
**Status: DONE (canon) → P2 (tokens).** Canon in MASTER-SPEC. Formal token file + component versioning: P2.

## X. Human factors
**Status: R → P1 policy.** ETHICS.md: motivating without exploitation — no loss-chasing nudges, no manufactured FOMO, quiet hours, streaks reward presence not overtrading. Compulsive-trading risk language sits beside the risk disclaimer on every money surface.

## Y. Reputation damage
**Status: R → P1.** INCIDENT-PLAYBOOK.md: detection → verification → response → communication → recovery → postmortem for: fake-result accusation, wrong leaderboard, reward delay, impersonation, breach.

## Z. Impersonation / brand security
**Status: P1.** Trademark filing by Oct 24 (planned). Add: weekly brand-monitoring search for fake FORTREX accounts/pages; takedown procedure.

## AA. Domain / email reputation
**Status: P0 at email go-live.** SPF + DKIM + DMARC at DNS setup; Resend transactional-only; suppression list; marketing separated from transactional.

## AB. SEO defense
**Status: Post-launch.** Brand monitoring; register official handles at launch even if unused.

## AC. UGC moderation
**Status: N/A pre-launch.** No public UGC surface. Revisit if profiles/community go public.

## AD. Creator / partner risk
**Status: PARTIAL → P1.** PARTNER-PIPELINE.md has FEMA guardrails + educator criteria. Add: due-diligence checklist (follower-quality spot check, claim-language audit), clawback terms in deal template.

## AE. Advertising governance
**Status: R → launch window.** CLAIMS-LIBRARY.md: approved/banned claims (banned: guaranteed profit, income promises, risk-free). Every claim carries fact + source + date + country. Stealth law forbids public advertising until Nov 7 anyway.

## AF. Support quality
**Status: DONE (v1) → P1 (taxonomy).** SUPPORT.md has ticket templates + refund policy. Add root-cause tagging + support-to-product loop at launch.

## AG. Analytics quality
**Status: P1 at PostHog enablement.** Event dictionary + naming convention before switch-on. One definition of MAU and "verified trader" everywhere.

## AH. Experiment governance
**Status: P2.** Template: hypothesis/audience/metric/guardrail/stop-condition. PostHog experiments post-launch.

## AI–AK. Continuity, org, decision rights, change management
**Status: DONE (solo reality).** Founder holds all approvals; DECISIONS.md records every ruling; kill switches + T-7 audit are the change controls. The three-layer model (PRODUCT / CONTROL / COMPANY) is this register's organizing principle. First hire assigns real owners to AJ–AK.

## AL. Vendor management
**Status: PARTIAL → P1.** STACK-DECISIONS.md lists vendors (purpose/cost/limits/exit). Add: data shared per vendor, backup vendor, free-tier exhaustion alerts.

## AM–AN. FinOps / data lifecycle
**Status: PARTIAL → P1.** Zero-cost launch validated (~₹40k burn, REVENUE-MODEL.md). **Action: RETENTION.md — what we store, how long, deletion path (user DSR honored; audit trail retained as legal exception).**

## AO–AQ. Privacy engineering + security test program
**Status: R → P1.** DPDP Rules 2025 is the binding India regime. **Action: PRIVACY.md (minimization, purpose, DSR flow, 72h breach response) + OWASP ASVS 5 self-assessment over the 13 API routes before launch — ASVS is the security gate, not vibes.**

## AR. Legal change monitoring
**Status: DONE (v1).** Weekly report carries regulation watch (GST/TDS/gaming/DPDP). Counsel is the escalation path.

## AS–AT. Launch experimentation + scale simulation
**Status: SCHEDULED.** Private alpha = the 25 founder invites pre-Nov 7. T-7 audit (Oct 31) is the dress rehearsal: full flow + rollback drill. Scale simulation: P2 with real data.

## AU. Product integrity standard
**Status: DONE — make it law.** No fake users, fake results, fake scarcity, manipulated rankings, invisible score changes, hidden fees, deceptive reward wording, fabricated verification, undisclosed sponsored content, unexplained bans. **Action: publish on /trust at launch — a brand asset, not just policy.**

## AV. "What if we are wrong" system
**Status: DONE (format).** DECISIONS.md records assumption/evidence/confidence. Add falsifier column ("how this could be wrong + test") for the top 10 load-bearing assumptions: 10k-cap demand, Dhan API stability, REX motivation, India-first GTM, broker-partner revenue, Score v1.0 fairness, tournament fill, referral qualification events, stealth hand-sharing distribution, non-custodial trust advantage.

## AW. The ultimate agent loop
**Status: ADOPTED AS OPERATING LAW.** Research → benchmark → challenge → blind-spot → model failure → model abuse → legal → economics → UX → security → design → implement → test → break → fix → retest → measure → document → automate → monitor. Every major work item runs this loop. Final question every cycle: **"What have we not considered?"**

---

## Growth engine mandate — operating notes
The 80-phase growth mandate is the post-launch improvement engine (reviewed in weekly reports; phases grouped below by function). Key laws:

1. **The funnel law:** JOIN → TRADE → COMPETE → WIN. Complexity lives under the UX, never in front of it.
2. **Founder's white-space hypothesis** (validate with users + counsel): FORTREX is NOT "pay → challenge → funded account" (prop firms). It is "bring your own account → prove yourself → compete → earn recognition/prizes." Category: *verified trading competition*.
3. **Special investigation:** "Can FORTREX make every trader a distribution channel?" — referral + competition integrated, not separate systems. The referral ledger + tournament engine already share one database; the direction is qualification-event rewards (friend activates/verifies/enters, not bare signup).
4. **Nothing in the 80 phases gets built pre-launch.** Launch needs: waitlist → invites → signup → connect → verify → tournament → leaderboard → reward. The mandate governs post-launch growth in priority order: Phase 1 (funnel definition) and Phase 6 (referral engine) first, fed by PostHog data.

### Mandate phase map (for the post-launch engine)
- **Growth engine core:** Phases 1–6 (funnel, acquisition, personas, first 60 seconds, broker conversion, referral engine)
- **Competition as marketing:** Phases 7–9, 25–29 (out-of-box referral ideas, tournament design, tournament-as-marketing, anti-cheat-as-brand, leaderboard psychology, friend competition)
- **Retention & community:** Phases 10–12, 42–43 (retention, psychology, community, campus/youth)
- **Creator & partner distribution:** Phases 13–14, 56 (creator engine, partner program, creator fraud)
- **Content machine:** Phases 15–18 (content architecture, psychology, production, social)
- **Paid + offers:** Phases 19–21, 57 (advertising, offer design, prize psychology, claim law)
- **Trust & proof:** Phases 22–24, 58 (winner marketing, social proof, trust system, user-trust research)
- **REX & gamification:** Phases 29–30 (gamification discipline, REX-in-the-loop)
- **Operations & intelligence:** Phases 31–36, 51, 66–71 (automation, notifications, command center, support, incidents, analytics, weekly BI, monthly review, competitor war room)
- **Attribution & experimentation:** Phases 37–38, 41 (attribution, experimentation, ethical scarcity)
- **Growth loops & virality:** Phases 39–40, 78–80 (growth loops, shareable cards, UGC, content-data loop, flywheel)
- **Market & category:** Phases 44–50 (international, category creation, differentiation, offline, PR, launch engine)
- **Economics:** Phases 52–55 (financial model, unit economics, simulation, fraud/abuse)
- **Product craft:** Phases 59–65 (simplicity, UX/UI, visual design, motion, accessibility, performance, scale)
- **Founder independence:** Phase 67
- **Long-term moats:** Phases 72–77, 74–75 (moats, network effects, identity, global championship, sponsors, B2B)

## Immediate P0 queue (before Nov 7, ordered)
1. Admin MFA + auth rate limits (Upstash wired)
2. Broker API ToS verdicts (Dhan HQ + Kite Connect) → BROKER-RIGHTS.md
3. Data provenance: adapter_version + score_snapshot columns
4. Score recalculation audit trail
5. Counsel classification matrix (expanded brief, by Oct 5)
6. GitHub: 2FA + secret scanning + dependabot (founder, one sitting with Neon/Vercel)
7. SECURITY.md attack-surface one-pager
8. ASVS 5 self-assessment on 13 API routes
9. PRIVACY.md + RETENTION.md (DPDP)
10. Rollback drill at T-7 audit (Oct 31)
