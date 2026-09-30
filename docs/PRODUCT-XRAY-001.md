---
title: Product X-Ray 001
summary: Full-route FORTREX product X-ray (Oct 1, 2026) — fresh live-evidence sweep of all routes at desktop 1440 + mobile 390, journey friction map, admin journey, and the P0–P4 evidence-based plan. Phase 1 of the founder's 10-prompt transformation sequence.
---

# PRODUCT X-RAY 001 — FORTREX (Oct 1, 2026)

Method: scripted live sweep of every route at 1440px and 390px (signed-out + founder session), zero-overflow/JS-error/tap-target/hierarchy capture, plus repo-level state-file audit. Backend/security/admin claims come from previously verified hardening reports (see handbook §6).

## A. Fresh evidence — route by route

**Verified strong (no action):** landing (515 words, quiet canon, honest CTAs, no bait), signin/signup (minimal, anti-enumeration), arena detail (clock + entered count + percentile + draft honesty), leaderboard (movement, prize zone, YOU anchor), hall-of-fame, connect (investor-password law stated), learn (797 words, search + glossary), journal/psychology (filters, CSV, reflection streak), 404 (branded), private profile (private-by-default enforced), zero JS errors on every route, zero horizontal overflow at 390px on all 9 member routes.

**Findings (evidence in section D):**

1. **NAVIGATION DUALITY (P1).** Two navigation systems coexist for the same signed-in member: MemberShell ("Desk / Journal / Connect / Arena / Standings / Library / Console") on dashboard-journal-psychology-learn-connect, and public Nav ("Tournaments / Leaderboard / Hall of Fame / Learn / Dashboard / Console") on tournaments-arena-leaderboard-hall-of-fame. A trader crossing Desk → Arena changes vocabulary ("Arena"→"Tournaments", "Standings"→"Leaderboard", "Desk"→"Dashboard") and structure mid-journey. This is the exact "wording/placement" complaint the founder raised.
2. **NO ROUTE LOADING/ERROR STATES (P1).** Zero `loading.tsx` / `error.tsx` files in the app. All member pages are `force-dynamic` server components: a slow DB query shows a blank frame on navigation; a server error shows Next's default unbranded error page. Silent-failure risk, unbranded error risk.
3. **EMAIL IS A DEAD END (P0 at launch).** `forgot-password` flow exists in code but no email provider is wired (Resend key = founder task). Until wired, an account with a lost password is unrecoverable. Requires: Resend key (founder), SPF/DKIM/DMARC on the domain (founder's domain task), transactional templates.
4. **MOBILE TAP TARGETS (P2).** 7–15 interactive elements under 40px per member page at 390px (nav strip links, footer links, small buttons). No overflow, but primary mobile actions should be ≥44px.
5. **A11Y NITS (P3).** Private-profile page has no h1 (EmptyState renders plain divs). Focus-visible states present on buttons; needs a full contrast/focus audit pass.
6. **PRE-LAUNCH DEAD TIME (P1 product).** Oct 1 → Nov 7 founding members have: check-in, invites, journal (only if they connect a demo/MT5), learn. No arena is live; Season Zero is honestly DRAFT. The founding cohort's 37 days need a designed arc (prep + countdown + founding identity), tied to the Oct 15 hype decision.

## B. Trader journey friction map

- DISCOVER → LAND → SIGN UP: smooth, honest, no bait. Onboarding = desk empty states + activation rail. Works.
- CONNECT → VERIFY: clear investor-password law, idempotent sync, verification visible on desk. Works.
- ENTER → PREPARE → COMPETE: arena lifecycle honest, but between now and Nov 7 there is nothing to enter — see A6.
- REVIEW → JOURNAL → LEARN: strong; journal needs trade volume to shine (pre-launch it shows honest empty states).
- RETURN → REFER → REPUTATION: REX ledger (new), referral card, streaks, hall of fame. Works.
- Cross-cutting friction: navigation duality (A1) and blank-frame navigation (A2).

## C. Admin journey

Recently rebuilt and founder-approved: funnel tiles, SystemBoard real-time health, 10 tabs, TOTP on ALL routes (reads re-armed Oct 1), audit on every action. Current gap vs Prompt 7's operational-decision ideal: tab naming is still module-ish (Users, REX, Tournaments) rather than workflow-shaped, and there is no operator "attention queue" (pending verifications, claims, anomalies in one place). Restructure is Prompt 7's scope; not urgent pre-launch since operator = founder.

## D. Evidence appendix (sweep data)

- DESK-M first viewport nav: "Desk | Journal | Connect | Arena | Standings | Library | Console"; ARENA-M nav: "Tournaments | Leaderboard | Connect | Dashboard | Console" — same session, two shells.
- Repo audit: `find src/app -name loading.tsx -o -name error.tsx` → 0 results.
- Mobile: `document.documentElement.scrollWidth > clientWidth+1` false on all 9 member routes; `pageerror` count 0 session-wide.
- Tap targets <40px: DESK-M 12, LEARN-M 15, PSYCH-M 9, JOURNAL-M 9, LB-M 8, ARENA-M 7.

## E. Priority plan (evidence-based)

**P0 — must fix before launch:**
1. Wire Resend (founder key) + SPF/DKIM/DMARC + verify password-reset end-to-end. (Founder-gated: key + domain.)

**P1 — implement now:**
1. Unify member navigation: one MemberShell across every signed-in route, one vocabulary (Desk, Journal, Connect, Arena, Standings, Library, Psychology, Console).
2. Route-level loading + error states: branded `loading.tsx` (quiet skeleton) + `error.tsx` (honest message + retry) on all member routes.
3. Design the founding-member arc for Oct 1 → Nov 7 (prep surface, countdown, founding identity) — coordinate with Oct 15 hype decision.

**P2 — next cycle:**
1. 44px mobile touch targets on primary actions.
2. A11y audit pass (h1s, contrast, focus, reduced-motion verification).
3. Founder's deep-audit layers, slotted: state-machine audit doc, DR restore drill (backup restore test), data-lifecycle/retention rules, abuse/fraud model doc. All are pre-launch P2 because they harden the launch, none block daily use.

**P3 — polish (post-P2):** admin workflow restructure (Prompt 7), journal trade-detail drawer, leaderboard near-you view with real population, notification preferences, OG card (already launch-day backlog).

**P4 — experimentation (Prompt 9 scope):** performance replay, arena pulse, season recap, experimentation-system design.

## F. What deserves implementation immediately

P1-1 and P1-2 (nav unification + loading/error states): highest user-visible value per hour, zero business risk, directly answer the founder's original wording/placement complaint. Then P1-3 design (founding arc) presented for founder taste check before building.
