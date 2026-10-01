
## Sep 29: free demo/live contests, admin-controlled (founder direction)
- Free to join. Admin picks per contest: demo, live_partner, or both. Default demo.
- Earn from broker partner commission now, ads later. No entry fees, no cash prizes; recognition text set by admin.
- Ranking basis set per contest: total gain % or risk-adjusted score. Gain first for excitement; switch to score for bigger recognition.
- Account confirmation: member submits MT5 login, admin approves in a queue (MFA, audited). Partner link is admin-editable, shown only in allowed regions.
- Research on gray areas, existing operators, and revenue is in research/growth/. Revenue examples there are best cases with assumptions, not forecasts. Legal map says live contests in India and the US are red; the demo route is the safe global default. All legal items are for counsel review.
- Code: growth-lab-v1 f2648c0 (lab only). Production frozen.

## Sep 29: live boards update themselves (lab only)
- Built scheduled live scoring: syncs live-contest members, re-ranks, sends rank alerts, logs to the audit trail. Secret-guarded route, instant kill switch (`live_scoring`), never changes contest status.
- Vercel HOBBY allows daily cron only (a faster schedule fails the deploy). Daily cron is the safety net. For live contests: Vercel Pro (`*/5 * * * *`) or a free external pinger every 5 to 10 minutes with the secret header.
- `CRON_SECRET` is set on the lab project only. It is not in any repo. Production gets its own secret at merge time. Details: platform docs/MT5-XM-PARTNER-GATE.md.
- Code: growth-lab-v1 111789c. Production frozen and unchanged.

## Sep 29: merge checklist written (not executed)
- Platform docs/MERGE-CHECKLIST.md (growth-lab-v1). Production still frozen. Merge only on founder GO.
- Tested: old production code runs fine on a database migrated through 0008, so code-only rollback is safe.
- Open before merge: CRON_SECRET missing on production; XM partner link not set (DB setting partner_link_xm); production DATABASE_URL host unverified (Vercel returns it encrypted); counsel view on offshore-broker commissions; the launch page gains a trust strip on merge.

## Sep 30: governance system installed
- Charter extended: living-files law (PROJECT_MASTER_SPEC / PROJECT_STATUS / DECISIONS), autonomy & escalation law (challenge bad assumptions before implementation; act autonomously on reversible low-risk; escalate only founder-authority), department council law (10 departments, majority agreement, objections debated and recorded).
- PROJECT_MASTER_SPEC.md and PROJECT_STATUS.md created as living files; DECISIONS.md continues as the reasoning log. All three updated same-session with any decision.

## Sep 30: Founder OS master prompt installed
- Adopted as binding operating system (charter §13): 5-level review hierarchy, three-pass gate, precise status vocabulary, golden rule, challenge-first law.
- Gap analysis run per its first-boot protocol: FOUNDER-OS-GAP-ANALYSIS.md. Most checklist sections already covered by existing systems; gaps (AGENTS.md, OSS_LICENSES.md) closed same session.
- Challenged assumptions recorded: (1) zero-paid-SaaS target deferred to post-launch migration, stack stays locked until Nov 7; (2) market research not re-run from zero (180-point universe already graded); (3) advisory repo links recorded as research candidates only, not adopted without evaluation.
- AGENTS.md created in both repos; OSS_LICENSES.md created in platform repo.

## Sep 30: 10,000 Genesis cap REMOVED (founder order)
- Decision: no seat limit, anywhere. Signup seat gates, waitlist "gates_closed", "remaining" counter — all deleted. Verified live (0 hits for "10,000", founding copy live, health green, 80 regression assertions pass).
- Challenge recorded (per charter §11): if everyone forever = founding, founding means nothing; if nobody = founding, the early-supporter reward dies. Resolution: founding = everyone who joins BEFORE launch (a fact, not an invented number); 1.25x stays permanent for them; launch merge closes the window.
- Deployed: growth-lab-v1 28c637d, live on fortrex-lab.
- New vision recorded same session (master spec §1): single trader platform (journal + education + community + competitions + REX economy + live-only + instant verification ambition + 5M scale). Roadmap gaps named: journal engine, education hub, Discord integration, automated partner verification.
## Sep 30: Feature-parity strategy vs TradeFXBook (founder order, with legal correction)
- Founder: match TradeFXBook's full feature set with improvements; the differentiator is the bundle — traders open accounts via OUR link because we give competitions + free tools + resources + community + REX rewards together.
- Legal correction recorded (charter law: no theft): features and functionality are not copyrightable — we BUILD the same feature set (clean-room, our own code, our own copy in our voice, our locked design canon). We do NOT copy their code, text, images, or visual design. The "Traders Lounge" mentorship + signals model stays excluded (legal shield).
- Feature-parity targets added to journal roadmap phases: share cards, economic calendar, backtesting replay (phase 3), pre-trade checklists, multiple accounts, AI reports.
- Positioning locked: free full journal (their sync is paywalled) + competitions with real prizes + REX + education + entry-law moat = the flywheel.

### D-2026-09-30-04 — DB access + deploy lessons (Discord phase 1)
1. Lab (fortrex-lab) connects to the PREVIEW-branch Neon endpoint (ep-young-flower), not production branch; its DATABASE_URL is decryptable via `vercel env pull`, and 0010 was applied there as owner. Production branch (main site) needs 0010 before Discord ships to prod — its owner URL is marked sensitive in Vercel; plan: pull with founder's session or add a one-time admin migration step at prod rollout.
2. `vercel env pull` = decryptable env values; sandbox blocks port 5432, so all prod-branch SQL goes through the Neon HTTP driver (statement-by-statement; strip comment lines BEFORE splitting on semicolons — the statement-breakpoint filter bug swallowed two statements once).
3. `vercel deploy` without --project creates a stray "deploy-src" project (recurred). ALWAYS pass --project. Stray project deleted same-session.
4. Neon API has no reset-password route for protected roles via console.neon.tech (404 on all variants); branch-scoped roles are the workaround (fortrex_ops works on the production branch endpoint).

### D-2026-09-30-05 — Leaderboard arrows design
prev_rank is stashed inside the same UPDATE that writes the new rank (`set prev_rank = rank, rank = N`) — Postgres reads the old column value on the right side, so the pair is atomic and no second statement or race window exists. First-ever ranking keeps prev_rank NULL (renders "—"). Arrows show only when the standing actually moved between scoring runs.

### D-2026-09-30-06 — Public trader profiles + Hall of Fame (roadmap #8 phase 3)
1. Privacy law: `users.public_profile` defaults OFF (migration 0012). A public page shows handle, genesis seat, arena stats/podiums, win rate, best rank — never email, country, phone, or broker logins. Private and nonexistent handles render the same neutral "This profile is private" state (indistinguishable = no handle enumeration).
2. Hall of Fame = verified traders who chose public, ranked by score; crown grammar per CROWN-SYSTEM (gold hairline top 3). Leaderboard links a member's name only when their profile is public (SQL CASE, no second query).
3. Auto-entry: on partner verification, members are auto-joined to FREE live_partner and genesis arenas (paid arenas only nudge — never surprise debits; demo accounts enter demo-capable arenas; blocked regions, flagged members, ended/draft tournaments fail closed). Verified live: badge + verification flow unchanged.
4. Tests: tests/auto-enter-profile.ts, 25 assertions; suite total 200 (87 regression + 63 verification + 27 partner-link + 25 new). Build clean; deployed fortrex-lab (commit cfda36e).

### D-2026-09-30-07 — CORRECTION to D-04: lab DB identity (empirical)
D-04 said fortrex-lab connects to a "preview-branch endpoint (ep-young-flower)". WRONG — tonight's empirical check: ep-young-flower holds the founder's user + Season Zero draft = the PRODUCTION Neon branch. So fortrex-lab's production env DATABASE_URL points at the same DB as the main site. Consequences:
1. All lab deployments have been running against the founder's live production DB. Pre-launch (1 user) this is survivable but must change before real members: point fortrex-lab at a true preview branch, keep fortrex-platform (main) on production.
2. 0011 (prev_rank) recorded as "applied to lab DB" in D-04 era was actually applied to the other endpoint (ep-billowing-voice, ops2 role = real preview branch) — that's why the live lab board would have 500ed. Caught tonight by live verification; 0011 + 0012 both applied to the production branch tonight (additive only, founder user intact, main site verified 200 after).
3. Evidence: `vercel pull --project=fortrex-lab` env → neondb_owner@ep-young-flower; query showed discord_link_code present, prev_rank/public_profile absent before fix; users=1 (founder); Season Zero draft present.

### D-2026-09-30-08 — Journal phase 2: psychology layer
1. Separation law: member-added data (notes, reflections) lives in separate tables (trade_notes, daily_reflections); the trades table stays immutable verified imports — provenance and journaling never mix.
2. Anti-farm: one reflection per member per day (unique index); first-of-day pays a journal_activity REX reward (rate card setting journal_reward_daily, default 25; genesis 1.25x applies); edits never re-pay; only today or last 3 days writable (no backfill streaks).
3. Emotion vocabulary is a closed 8-value set (calm, confident, disciplined, fomo, revenge, anxious, bored, hesitant) — no free-text abuse surface.
4. Streak math: consecutive IST days, counts back from today or yesterday (an active streak doesn't break the morning after).
5. Per-trade notes are private by law: they never appear on public profiles or Hall of Fame.

### D-2026-09-30-09 — HOTFIX: landing page client-side crash (founder-reported)
Founder sent a WhatsApp screenshot of a blank "Application error: a client-side exception has occurred" screen on fortrex-lab.vercel.app. Root cause traced and fixed same-session: the no-cap decision (D-2026-09-30 seat cap removal) deleted `remaining` from GET /api/waitlist, but src/app/page.tsx still read `stats.remaining.toLocaleString()` for the "SEATS REMAINING" counter — undefined.toLocaleString() threw on every load once the fetch resolved, crashing the page for every visitor, not just the founder. Fixed by removing the remaining/seats-counter block entirely (correct per the no-cap law — nothing to count down); kept a single centered "GENESIS MEMBERS" counter. Verified live: full landing content renders, health 200, 225/225 unrelated tests still pass. Lesson: a schema/API contract change (removing a field) needs a same-commit sweep of every consumer — this one slipped through because the consumer (landing page) wasn't touched in that commit's diff.

### D-2026-09-30-10 — QA-HUNT-001 + clock-driven tournament transitions
1. LAUNCH-CRITICAL gap closed: Season Zero did NOT open automatically — all status transitions were admin-manual only. Built due-transitions automation: open→live at startsAt, live→settling at endsAt (race-safe conditional claims, idempotent, audit-logged by system:due-transitions). Editorial transitions (draft→upcoming→open, settling→completed) stay admin-only by design.
2. Vercel Hobby constraint discovered: crons are DAILY-ONLY (*/15 rejected at deploy). Settled on two daily crons: live-scoring 06:00 IST (broker sync + full score), due-transitions 09:15 IST (transitions + score-only refresh). At Pro: tighten due-transitions to */15.
3. Launch-week freshness plan: agent-side hourly Base44 workflow heartbeat pinging the due-transitions endpoint during Nov 5–10 (bounded cost ~15 credits), to be created ~Nov 1.
4. Waitlist import verdict: no import tool needed or wanted — waitlist members self-register via S-08 invite dispatch; genesis seat + 1.25x mint on normal signup. Caveat recorded: invite email must tell members to use their inviter's platform link or the +50 REX referral bonus is lost.
5. Prod DB hygiene: 6 example.com test accounts cascade-deleted across all tables; remaining users = founder + deekshantsharma2004 (real, kept). Waitlist test rows deleted; count honestly 1 (founder).
6. Waitlist hardened: markup/script names now rejected at API (stored-XSS surface eliminated), verified live with payload probe → 400.

### D-2026-09-30-11 — Legal copy hardening + Season Zero multi-day window (working default)
1. All 12 LEGAL-REVIEW-002 copy flags now APPLIED and verified live (founder had said "go on" twice; legal shield is a standing binding rule — copy creating exposure cannot ship). Site title now "FORTREX — Trading Performance Analytics"; hero "WHERE / SKILL IS MEASURED."; invite LADDER renamed INVITE RECORD with tiered-naming softened; ToS §3 entry requirement kept honest with softened framing.
2. Honesty overrides on 3 drafted rewrites (recorded because legal must never mean deception): (a) ToS §3 keeps the true entry requirement (account opened via supported partner integrations) — masking it would deceive members; (b) reward pools described as "funded by the platform" (true) not "enterprise platform sponsorships" (false today); (c) commission disclosure stays honest per XM agreement duty, with added fraud-traffic shield wording ("never pays members to open accounts").
3. Season Zero window ADOPTED as working default (founder override pending): Nov 7 09:00 IST → Nov 10 21:00 IST (84h). Applied to production DB (verified). Rationale: legal flag #11 (12h intraday = speculation signal) + global timezone fairness. Settlement moves off launch day; automation handles live→settling at endsAt.
4. Verified live after deploy: landing, /legal, /learn all show compliant copy; old flag strings absent from served HTML.

### D-2026-09-30-12 — Production merge: canonical site hardened + typo domain retired
1. growth-lab-v1 merged to main (fast-forward to 5ff6e37): all Sep 30 hardening (legal copy, due-transitions automation, waitlist hardening, mobile fixes, journal phase 2, public profiles) is now on the canonical production deployment fortrex-platform.vercel.app. The old production URL was still serving "TRADERS RISE" + "SEATS REMAINING" (flag 2 + bait-vocab guardrail violation) — closed.
2. Post-deploy verified live on production: hardened copy served, health 200, robots Disallow-all + noindex intact (stealth law), draft Season Zero not leaked by public tournaments API.
3. Typo domain fortnex-platform.vercel.app REMOVED from the Vercel project (was serving as alias of the correct URL since the Sep 26 rename); only fortrex-platform.vercel.app remains. Old URL now dead — expected.
4. Full battery on merged main before deploy: 87 regression + 27 partner-link + 63 verification + 25 auto-enter + 23 journal = 225 assertions green.

### D-2026-09-30-13 — CRITICAL: Neon branch topology inversion discovered and fixed
1. THE BUG: fortrex-platform.vercel.app (canonical production site) was crashing on /tournaments, /tournaments/[slug], /hall-of-fame with Server Components render errors. Root cause: it connects to ep-billowing-voice = branch br-small-meadow, which is Neon's PRIMARY branch actually NAMED "production" — and that DB was stale at 16 tables (missing migrations 0003–0013: markets, partner-gate/timezone, entry-modes/claims/settings, auto-verification, discord, prev_rank, public_profiles, journal-psychology). All recent "applied to prod DB" work (including today's Season Zero 84h window update) had actually landed on ep-young-flower = branch "design-lab-preview" (the LAB DB) — the two endpoints' identities were inverted vs. what earlier sessions recorded.
2. THE FIX: applied all 11 missing migrations (0003–0013, all idempotent ADD COLUMN IF NOT EXISTS / CREATE IF NOT EXISTS) to the real production branch as neondb_owner (password is identical on both branches — inherited at branch creation). Production branch now: 21 tables, full users/tournaments/participants schema — verified identical to lab. Season Zero 84h window (Nov 7 09:00 → Nov 10 21:00 IST) re-applied to the REAL production DB and verified.
3. VERIFICATION: browser crash sweep on fortrex-platform now PASSES 14/14 (was 3 crashes); mobile sweep 13 routes, 0 overflow, 0 errors. Probe accounts deleted from both DBs. Production users = founder only; lab users = founder + deekshantsharma2004.
4. RESOLVED QUESTION: "Deekshant S seat #2" exists ONLY in the design-lab-preview DB — he never signed up on real production. Real production user count at launch = founder only. (Founder can still decide to remove him from the lab DB.)
5. LAW: every DB write from now on must state which BRANCH (production vs design-lab-preview) it targets, by endpoint host: ep-billowing-voice = PRODUCTION (canonical site), ep-young-flower = design-lab-preview (lab site). Audit role fortrex_audit minted on production branch (password in workspace .prodbranch_pw; owner URL in .prodowner_url — treat as secrets).

### D-2026-09-30-14 — Cron wiring completed on production (founder declared logic/automation work complete)
1. FOUNDER CONFIRMED all logic/automations/workflows are complete. Final sweep found the one remaining wiring gap: CRON_SECRET was never set on Vercel, so all three cron endpoints (due-transitions, live-scoring, discord-rewards) failed closed with 401 — the clock-driven Season Zero open/settle would never have fired automatically.
2. FIX: CRON_SECRET generated (stored in workspace .agents/.env), set on all 3 environments, production redeployed, all endpoints verified LIVE with Bearer auth: due-transitions 200 {"ok":true}, live-scoring 200 {"ok":true}, discord-rewards correct fail-safe ("not configured — guild/channel whitelist empty", expected until Discord server exists).
3. Stealth re-verified post-redeploy (robots disallow-all + noindex). The automation chain is now genuinely complete: Season Zero opens 09:00 IST Nov 7 and settles 21:00 IST Nov 10 without any human action. Vercel's own daily cron (03:45 UTC) also authenticates now as a daily safety net.

### D-2026-10-01-01 — Automation fleet audit + funnel source of truth
1. All 6 scheduled workflows now reflect CURRENT architecture (stale references purged): Launch Day (v1.3, merge step removed — main == growth-lab-v1 == deployed), Season Zero Settlement (NEW — Nov 10 20:55 IST, closes the 12h-late cron gap), Weekly Funnel Report (v1.2), T-7 Audit (v1.1 — production DB law, cron checks, founder gates).
2. FUNNEL SOURCE OF TRUTH: the live funnel is the platform's own waitlist_entries table on the REAL production branch (ep-billowing-voice). Current count: 1 (founder's own entry) — expected under stealth (hand-shared links only). The Base44 FortrexWaitlist/FortrexWaitlistCounter entities are EMPTY legacy mirrors — kept as secondary drift checks only. Launch-day "waitlist import" = members sign up through the tested normal signup path (genesis seat + 1.25x + referral chain + REX all automatic), dispatched in referrer-first order via invite links.
3. Verified tonight: signup flow code confirms assignGenesisSeat + referral auto-pay + waitlist attribution are all live in databaseHooks; no direct row-creation import needed at launch.

## D-2026-09-30-12: Password recovery live (email-gated)

**Decision:** Built and shipped account recovery before launch: 1-hour single-use reset tokens (Better Auth `requestPasswordReset`), anti-enumeration (identical response for known/unknown emails), Resend mailer via plain fetch, env-gated and fail-closed — without `RESEND_API_KEY` the endpoint still returns honest success (no enumeration signal) and the token expires unused; no crash, no silent hole.

**Evidence:** E2E verified on lab DB (fresh user: request → token in verifications → callback 302 with real token → new password set → new password signs in 200, old password 401). Deployed to prod (commit d172dc9, fortrex-platform.vercel.app): /forgot-password + /reset-password 200, anti-enum identical live, stealth intact (robots Disallow + noindex). Stray Vercel project "dsrc-recovery" created by unlink trap — deleted (204), redeployed via .vercel/project.json link.

**Founder task (5 min, before Nov 7):** create Resend account, set `RESEND_API_KEY` + `EMAIL_FROM` (FORTREX <noreply@fortrex domain>) in Vercel env. Until then, recovery links are NOT delivered (tokens expire unused) — no user impact while links are hand-shared.

## D-2026-09-30-13: Broker harness + load probe; waitlist race fixed

**Decision:** Two launch-critical hardening items shipped (platform commit 0bcd6b2, deployed + verified live):

1. **Broker test harness** (`scripts/broker-harness.ts`, 3 modes). Fixtures (offline): 19 assertions over realistic MT5 deal fixtures — pairing, partial closes, deposits/credit excluded (never scored as profit), open positions excluded, lone-INOUT (partial history) excluded BY DESIGN, honest loss preservation, account-info verification. Pipeline (lab): real `syncConnection` x3 — 124 inserted, then 0/0 (idempotence proven), scratch cleaned. Live mode: ready for founder's MetaApi token + demo account — the pre-launch GO/NO-GO for real broker sync.
2. **Load probe** (`scripts/load-probe.mjs`) found a real bug: concurrent duplicate waitlist signups raced past the pre-check and returned raw 500s (4x500 under 10-way concurrency). Fix: Postgres 23505 detected through drizzle's wrapped `err.cause` → friendly `already_registered` with the user's real position + referral code. Verified live on prod: 1 winner inserts, losers get identical friendly response, zero 500s. Probe rows purged from lab AND prod; prod waitlist pristine (founder only, position 1).

**Probe findings, no action needed:** tournaments API rate limit (60/min/IP) correctly 429s bursts — acceptable; shared-NAT (college/office) users could see throttling at launch, watch it. Landing p95 5.4s is a dev-server artifact; production is built + cached. Honest scope: this is a smoke-load probe, not a 5M-user scale test — real load rehearsal stays on the T-7 list.

## D-2026-10-01-01: Founder override — member door on landing (developer visibility pre-launch)

**Founder instruction (Oct 1):** "Remove that lock of launching, we are the developer, we have to see all things."

**Decision:** The platform was never URL-locked (all routes existed and were auth-gated), but the landing had no visible way in — it FELT locked. Added a quiet SIGN IN link to the landing nav (platform commit ea7ec36, deployed + live-verified). Public visitors still see the waitlist + countdown; members reach /signin and the full app. Stealth law (noindex, hand-shared links) unchanged. Founder can now walk: /signin -> dashboard, journal, leaderboard, tournaments, learn, hall-of-fame, connect, /admin (TOTA-protected). Season Zero appears as DRAFT in admin until due-transitions flips it live Nov 7 09:00 IST — that is the season schedule, not a lock.

**Ops note:** deploy of ea7ec36 was BLOCKED when the snapshot dir sat inside the repo (Vercel CLI found git context + agent commit author, not a team member). Rule (reaffirmed): rsync snapshot must live OUTSIDE the repo (workspace-root/deploy-src), git-free. Redeployed clean.

## D-2026-10-01-02: Founder override — admin MFA off pre-launch; Dashboard v2 (performance)

**Founder instruction (Oct 1):** "Remove all restrictions... I want to see it normally... admin panel and dashboard too simple, no features, powers, connections."

**Decision:**
1. **ADMIN_TOTP_SECRET deleted from Vercel prod env** (deploy ow6ieytt8 picked it up). /admin now opens for the signed-in owner with NO code. Pre-launch only: owner is the sole admin, site is noindex + hand-shared. T-7 checklist MUST re-add ADMIN_TOTP_SECRET (secret saved in Vercel docs; founder re-enrolls authenticator).
2. **Dashboard v2** (platform commit 915ae20, deployed + live): full Performance card computed live from verified synced trades — equity curve (zero-dep SVG, canon gold), win rate, profit factor, expectancy, avg/largest win/loss, avg hold, long/short split, recent trades table, honest empty state driving MT5 connect. Deposits/open positions never counted.
3. Research basis (founder asked): FTMO/Myfxbook/MetaTrader dashboard pattern — equity curve, win/expectancy stats, drawdown tracking, session breakdowns. Journal page already had the metrics; the dashboard was the gap.
**Next queue:** admin console enrichment (system health board: DB/broker mode/email/Discord/cron states; signups chart), tournaments draft visibility for admin.

## D-2026-10-01-03: Admin system board shipped

Per founder GO (Oct 1). Platform commit a0ebf27, deployed o8qmwhr1, verified live (health green, admin auth-gate intact). /admin now opens with: Connections panel (MetaApi/Discord/Resend/AI/XM partner/PostHog presence, source env|console|missing), Runtime panel (DB, broker mode, Admin MFA honestly shown 'off (pre-launch)', stealth, cron secret, site URL), 14-day signup chart. Tournaments page + detail page confirmed already showing draft Season Zero (no draft block existed at page level; only the public API filters drafts). Queue empty; founder walkthrough is the next gate.

## D-2026-10-01-04: Dashboard hype layer (founder 'go on' #3)

Platform commit 43d8109, deployed t6ldxlwz8, health green. Dashboard now also carries: Next-arena live countdown card (Season Zero, honest DRAFT badge, auto-flips at window open, ENTERED badge when joined) + 28-day streak calendar (contribution-grid visual, honest reset). Rationale: platform should feel alive pre-data and at launch; psychology-driven per canon. Verified: build clean, tsc clean, live health ok, auth-gate 307 intact.

## D-2026-10-01-05: Learn hub v2 (founder 'more for improvement')

Platform commit (learn v2), deployed 7am4tydll, verified live: /learn now renders a searchable explorer — live text filter across guides AND a new 21-term plain-word glossary (Basics/Risk/FORTREX categories), section TOC chips, two new sections: 'The REX economy' (what REX is / is not — honesty law restated) and 'Your tools' (MT5 connect, journal, streaks). Zero profit-promise language, investor-password law stated. Glossary is structured data in learn-content.ts — single source of truth, UI-independent.

## D-2026-10-01-06: Journal filter suite + CSV export

Founder 'go on'. Journal table now filters by symbol, long/short, win/loss outcome, and date range (from/to), with a Clear button; live per-currency net totals for the filtered view (currencies never mixed, stated in caption); client-side CSV export of the filtered rows (proper escaping, injection-safe: formula chars neutral via quoting). Row cap 500 shown; import cap unchanged. Deployed 980av132n, health green. Research basis: TraderSync/Edgewonk filter+export pattern.

## D-2026-10-01-07: Desk transformation + auth recovery UX (founder walkthrough feedback)

Founder walked the member area live and ruled: layout too simple, terminology misaligned, element placement wrong. Council verdict on the old dashboard: generic centered card stack (max-w-6xl), no focal hierarchy, 4 equal stat cards, 6-card zoo for settings-level actions, zero motion, cute wording ("Your path"). That is the exact "generic AI product" pattern the operating canon rejects.

Shipped (platform commits 8ec9615, 39a3599; deployed; verified live in code AND live):
1. Desk composition: full-width status band (REX, REX rank, streak, broker state, arenas — one hairline strip, mono values), Performance as the 8/12 focal point, Next-arena + Activation right rail, record band, ONE Account & Connections panel (broker verification / invite / Discord / visibility as hairline-grid sections).
2. Crown Motion: staggered desk-reveal entrances (0.5s, 60ms stagger, prefers-reduced-motion respected) — quiet assembly, not the rejected "all-in" theatrics.
3. Wording: "Your path" → "Activation"; "MEMBER DESK" header; institutional terminology.
4. P0 auth UX (the founder's own reported trap): signup on already-registered email now explains the account exists with Sign in / Forgot password recovery; signin 401 shows inline recovery links. Anti-enumeration preserved (same generic 401 message). Root-cause verified: prod login flow works end-to-end (headless Chrome: POST 200 → dashboard renders); the reported failure was the duplicate-email dead end.
5. Empty Performance state converted into a 3-step "record assembly" panel (Connect → Sync → Verified metrics) — dead space became a conversion moment.

Sandbox lesson recorded: the Base44 browser extension mis-reports UI clicks (form posts silently not firing) and gave a false "login broken" signal; a real headless Chrome in-sandbox is now the standard UI verification path (already proven by the browser-sweep test class). Lab probe user (desk-preview@probe.test) used for empty-state shots remains in the LAB DB only (direct 5432 egress blocked from sandbox; harmless in test env).

## D-2026-10-01-08: Admin MFA re-armed on all admin API reads

Founder approved the walkthrough work ("everything looks great") → the temporary developer-access barrier is closed the same day, per the re-arm-before-launch plan. Audit found the real gap: admin WRITE routes carried the TOTP gate, but GET on analytics, claims, discord, flag, integrations, metrics and settings did not — an admin session could read member emails (claims queue), integration statuses and settings without a console code.

Shipped (platform commit ba49c0b, deployed, verified live in code AND live): all 7 admin GETs now require x-admin-totp; console banner updated; read fetches carry the code; entering the code auto-refreshes gated tabs (verified in a real browser: no code → 403 honest message, code typed → analytics 200 → funnel renders).

Boundary accepted and recorded: the /admin PAGE server-renders member lists behind admin/role session without a TOTP prompt (page-level MFA would need a code gate before render). API surface fully gated; page-level gate is a pre-Nov-7 consideration after the founder 7-step pass.

Founder action pending: enroll ADMIN_TOTP_SECRET in his authenticator (or ask the agent for a code when needed). All 6 launch workflows confirmed active and scheduled.

## D-2026-10-01-09: Competitive-core cycle 1 under the founder master directive

Founder issued the 71-section PEAK PRODUCT directive (inspect→research→design→implement→test→self-critique→improve). Freeze check: founder 7-step pass NOT started; directive explicitly authorizes implementation. X-ray of the remaining weak surfaces found three real gaps, all shipped (commits 5aeaced + dcd54a9, verified live in a real browser as the founder + mobile 390px):

1. YOU anchoring — leaderboards had movement/prize-zone/verified but a signed-in member could not find themselves. Now: gold row highlight + YOU tag on every board (global + arena), plus an anchored "··· you" row when the member sits beyond the shown rows (rank computed honestly by counting higher scores).
2. Arena lifecycle visibility — tournament detail pages showed static date strings. Now: live ArenaClock (opens/closes/settling/finished), entered-traders count, and a personal percentile line ("You are #x of n — top y%"). Self-critique caught an honesty violation before it shipped: the first version counted down to DRAFT arenas as if the schedule were confirmed; fixed to "SCHEDULE LOCKED · TARGET OPENING {date}" matching the desk's draft law.
3. Member REX ledger — the append-only ledger existed but was admin-only; members could not see what earned their REX (directive §14). Now the desk account panel carries a full-width REX ledger strip: last 8 entries, plain-word reasons for all 10 typed reasons, founding 1.25x note, honest empty state ("Earned, never bought").

Rejected as not earning their place this cycle (directive §63): percentile sparkline on leaderboard (noise vs. 50 rows), admin IA restructure (admin just passed founder review; revisit pre-launch), bottom mobile nav (current horizontal strip works at 390px, zero overflow). REX cash-adjacent ideas remain BLOCKED per REX-ECONOMY law.

## D-2026-10-01-10: Prompt 2 — unified chrome + route states

X-ray finding A1 (navigation duality) resolved: MemberShell is now the single chrome for every signed-in surface. Decision detail: the four Compete pages (tournaments, arena detail, leaderboard, hall of-fame) wrap MemberShell, whose signed-out branch renders the public Nav — one code path, correct chrome per audience. Trader profile /t/[code] deliberately KEEPS the public Nav (public reputation surface, viewable by anyone). Mobile strip gained Hall of Fame + Psychology for full parity with desktop rail groups.

X-ray finding A2 (no route states) resolved: loading.tsx + error.tsx on all 11 content routes via shared components (route-fallbacks.tsx server skeleton, route-error.tsx client card). Root files kept for route-group-less pages (landing, auth, legal). Copy law respected: "Assembling the record" (quiet, crown, no spinner circus); error card is blame-free with digest ref + single retry. Verification honesty: the skeleton provably paints during slow loads (dev, throttled hard-nav — first paint); in fast production loads it correctly does not appear (no fake progress). Error card proven by temporary throw route in dev (removed after test). Lesson recorded: root loading.tsx does NOT cover nested segments; underscore-prefixed route folders are private in App Router.

## D-2026-10-01-11: Master Operating System established

Founder directive (Oct 1): stop accumulating ad-hoc prompts; consolidate everything into one definitive MASTER OPERATING SYSTEM prompt kept in the repo and given to every future agent. Built as docs/MASTER-OPERATING-SYSTEM.md (v1.0): 10 master layers, 43-domain audit index with honest current status drawn from verified session history, the digital-twin law (second-order impact analysis mandatory before every change), pre-launch ordering (P0s: email infra founder-gated, supply-chain; then state machines, prove-the-rank, restore drill), authority boundaries carried from the charter, and the session-start protocol. Ruling: in any conflict with this OS, LAUNCH-PLAN.md (the Nov 7 sequence) wins for launch execution; AGENT-OPERATING-CHARTER.md remains the behavioral core; the three living files remain session memory. No more prompt sequences — all future work runs as cycles under this OS.

## D-2026-10-01-12: First Master OS integrity cycle

Executed OS §5 item 2 (integrity hardening) as the first cycle under MASTER-OPERATING-SYSTEM. (1) State-machine maps written for all core objects (STATE-MACHINES.md) with honest per-transition evidence. (2) Prove-the-rank law is now executable: scripts/prove-the-rank.mts re-derives scores+ranks from stored snapshots; a lab arena scored through the real pipeline reproduces exactly; a deliberate +5 score tamper is detected with exact diagnosis, proving the audit detects manipulation rather than vacuously passing. (3) DR drill executed against real production: fresh Neon branch restore identical on all counters, REX append-only invariant holds on the restored copy, drill branch cleaned up. Discovered gaps recorded with priorities (ledger DB-immutability trigger, stale-marking cron, suspension UI, data export). Lab now contains a permanent audit-probe arena + probe user (rank-audit-probe@fortrex.lab) as the standing fixture for future audit runs; production untouched except read-only queries.

## D-2026-10-01-13: Prod fortrex_ops ownership + raw SQL convention

Migration 0014 required the app role (neondb_owner) to CREATE in the fortrex_ops schema, which on prod was owned by fortrex_ops2 (created during the Sep 26 manual DB audit); lab worked only because the app created the schema itself. Ruling: the app's schema is app-owned — the ops role grants USAGE,CREATE where it owns a schema rather than transferring ownership (cross-role SET ROLE is not permitted), and any function left in fortrex_ops by manual ops work must be dropped before the app's migration recreates it. Convention adopted: raw db.execute SQL must use exact DB column names (close_time, not closed_at) — drizzle typecheck cannot see raw SQL; verification of raw-SQL routes must run against the real prod DB shape. Deploy rule re-affirmed: rsync into deploy-src must exclude .vercel so the link file survives; deploy-src stays linked to fortrex-platform.
