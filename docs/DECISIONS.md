
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
