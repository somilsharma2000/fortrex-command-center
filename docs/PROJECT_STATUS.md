---
title: Project Status
summary: The living NOW file — what is done, what is running, what is pending, who owns it, what is next. Read before every session; update after every session.
---

# PROJECT STATUS — FORTREX

**Last updated:** Oct 1, 2026, 00:10 IST
**Rule:** This file is refreshed at the end of every work session. If a status is not here with evidence, it is not claimed.
| QA-HUNT-001 + LOGIC-VERIFICATION-001 COMPLETE (11:30-17:00 IST) | Adversarial mobile sweep: 2 overflow bugs + tap targets fixed (0 overflow live at 375px); waitlist markup-name injection → 400 verified live; prod waitlist/DB test junk cascade-cleaned (users = founder + deekshant only); REX ledger invariants ALL PASS (0 broken chains, 0 double-pays, 0 negatives); Season Zero auto-open gap CLOSED — due-transitions cron built + verified end-to-end live with probe (open→live→settling + audit entries + idempotent); reports in docs/QA-HUNT-001.md + docs/LOGIC-VERIFICATION-001.md |


## Done and verified (with proof)

| What | Proof |
|---|---|
| Platform complete for launch: MT5 + demo only, all other integrations deleted | 27/27 e2e, 80 regression, 63 verification, 27 partner-link tests, all green; verified in code + live |
| Legal pages live (Terms 13 sections, Privacy 9 sections, Risk Disclosure) | https://fortrex-lab.vercel.app/legal returns 200; honest partner-commission wording |
| Security hardening (25 findings fixed, admin MFA, headers, audit logging) | REPO-AUDIT-2026-09-26.md + FINAL-HARDENING-REPORT.md |
| Database verified (16 tables, append-only REX ledger, migrations 0001–0009) | Independent audit, documented |
| Stealth intact (robots disallow all, noindex) | Verified on both live URLs tonight |
| Governance: charter (13 laws), master spec, status, decisions, gap analysis, AGENTS.md × 2, OSS_LICENSES.md | Command center + platform repos, this commit |
| Roadmap #8 phase 3 DONE: public trader profiles + Hall of Fame + auto-entry | Commit cfda36e (growth-lab-v1), live on fortrex-lab: /hall-of-fame 200, /t/[code] 200 (private-by-default state), /leaderboard 200 with handle links, health 200; 200 test assertions green; migrations 0011+0012 applied to the lab DB (verified: prev_rank + public_profile columns present, founder user intact) |
| Journal phase 2 DONE — psychology layer (daily reflections, per-trade notes/tags/emotion, journaling streak + journal_activity REX, session/weekday rhythm, trade detail page) | Commit 1c2da79 (growth-lab-v1), migration 0013 applied to lab DB (trade_notes 9 cols, daily_reflections, ledger_reason value verified, founder user intact); 225 test assertions green; live: /journal/psychology auth-gated 307, both new APIs 401 unauthed, health 200 |
| HOTFIX: landing page crash fixed (founder-reported, 09:15 IST) | Commit 5627d50 — root cause was stats.remaining.toLocaleString() on undefined (no-cap decision removed the field from the API, page still read it); removed the seats-remaining counter, live page confirmed rendering full content, health 200 |
| Full live verification sweep (founder-requested, 10:30 IST) | All public pages 200 (landing post-hotfix, legal, learn, leaderboard, hall-of-fame); member pages 307-gated; APIs 401/403 unauthed, draft tournaments hidden; DB: 20 tables, founder owner+genesis seat intact, REX ledger 0=0 match, Season Zero draft present, all 10 ledger reasons incl. journal_activity; 225/225 tests green; stealth robots-disallow+noindex on lab AND main; founder-review site 401 = password gate working |
| CRITICAL LIVE BUG FIXED (10:00-11:30 IST): signup was 500 on the lab since auto-verification shipped — lab branch DB was missing columns from migrations 0003 (markets) and 0009 (partner_tag, partner_link_issued_at, partner_report_rows). Applied to lab DB live; signup verified working. Root cause: earlier sessions applied table-creating migrations but skipped these ALTER migrations on the lab branch | Lab DB now matches all 14 migrations |
| Live trader journey verified end to end (probe, cleaned up after) | signup → dashboard → mock connect → sync 107 trades → journal → trade notes → reflection paid 31 REX (25 × 1.25 founding multiplier — correct) → daily check-in, second call correctly refused → public profile on → /t/FX5R6YDE renders 200 |
| Live owner journey verified (probe admin, cleaned up after) | Claim queue role-gated GET; decisions TOTP-gated: no code 403, wrong code 403, valid code approves, re-decide 409; approve stamped claim + audited |
| Real product gap found and fixed (commit 51dbde4, deployed to lab, VERIFIED LIVE) | Sync catch-up: a member who connected, got approved, then synced for the first time never received the partner stamp (approval only stamps verified connections) → never auto-entered live arenas. First verified sync after approval now stamps partnerLinked + runs auto-entry. Probe with approved claim + unsynced connection synced → partner_linked=true verified in DB |
| Region gate verified honest | sandbox egress country is outside the XM partner regions → link unavailable + claims auto-rejected region_not_supported. Fails closed exactly as designed |
| Vercel cleanup | 4 stray projects deleted (fortnex-platform leftover, fortrex-preview, fortnex-routing-test, deploy-src); remaining: fortrex-lab, fortrex-platform (both its URLs healthy 200), fortrex-founder-review, gym-os-v3, gym-os-app |
| Lab DB pristine after test | 1 user (founder, owner, seat 1, ledger 0=0), 0 claims/connections/trades/notes/reflections; probe users cascade-deleted |
| CRITICAL LIVE CRASH FIXED (founder screenshot, tournament "Arena" page, commit 6a5e8fa deployed + verified live) | Root cause: local-time.tsx used Intl.DateTimeFormat with dateStyle+timeStyle+timeZoneName together — invalid per ECMA-402, threw TypeError in EVERY real browser, crashed 100% of tournament detail page visits with blank "Application error". Never caught before because ALL prior verification was curl-based — curl never executes client JS. Fixed with explicit date/time fields |
| Second real bug fixed same sweep | ReferralCard computed origin from window.location (hydration mismatch React #418 on every signed-in dashboard) with hardcoded fallback https://fortrex.io (unowned domain). Now a server prop from NEXT_PUBLIC_SITE_URL. 225/225 test assertions still green |
| NEW TEST CLASS: tests/browser-sweep.mjs (`npm run test:browser`) | Real headless-Chromium sweep of every page, signed-out AND signed-in, catching thrown JS errors — the class curl suites structurally cannot. Post-deploy live run: 13/13 routes PASS, 0 crashes. Playwright+Chromium installed in sandbox (required fixing apt sources to HTTPS, port 80 blocked) |
| Real signup found on lab DB, left untouched | deekshantsharma2004@gmail.com, genesis seat #2 — genuine (not a probe). Lab meant to be hand-shared only; founder asked to confirm who this is |
| Competitor presentation study done (live reads of TradeZella, TradeFXBook, Tradervue, FX Blue) | docs/COMPETITOR-WEB-PRESENTATION.md (commit df4afb1) — 8 patterns every world-level competitor uses; FORTREX already beats them on verified competitions, public profiles, REX; launch-day presentation gaps identified |
| Landing presentation gaps CLOSED (commit 29d830a, deployed, VERIFIED LIVE) | Product grid "Six parts. One arena." (journal / verified competitions / leaderboards / education / REX / community) + trader-type segmentation (disciplined / improving / ambitious) added to landing. Verified live via real browser: all sections render, 0 bait-vocab hits, 87+63 tests green, 13/13 browser sweep PASS, probe account cleaned |
| 6-department parallel audit delivered (founder-ordered) | QA-HUNT-001 (partial, relaunched), COMPETITIVE-WATCH-001 (verdict: free-for-members + import reliability + anti-guru trust = our wins; onboarding first-10-seconds = highest-leverage gap), LEGAL-REVIEW-002 (12 copy flags + trademark plan Oct 24 + counsel brief), LAUNCH-DAY-RUNBOOK (06:00-09:00 IST sequence, waitlist import BEFORE Season Zero open, draft→upcoming→open two-step), SELL-READINESS (one-pager, 3 onboarding emails, 5 support templates, 22 hype drafts, 3 pricing options) |
| Legal copy hardening applied + verified live (commit c7f58c1) | 9 of 12 flags fixed: 'currency'→'benchmark', multiplier→'reputation weight' wording, non-custodial softened to read-only analytics, 'entry fee' scrubbed from ToS (28% GST audit trigger), tournaments tagline→'verified performance benchmarking'. Verified live on lab: all new phrasing present, old phrases gone, honest partner commission disclosure retained. REJECTED as dishonest: flag 10 (deny XM commission — XM agreement + consumer law require the disclosure) and flag 7 (drop partner-track entry rule). ESCALATED to founder: flag 2 (brand headline 'WHERE TRADERS RISE.'), flag 11 (Season Zero 12h intraday window → recommend multi-day 72h+) |

## Running / in place

Daily heartbeat 08:00 IST, weekly report Mon 09:00 IST, T-7 audit Oct 31, launch Nov 7. Live scoring cron on lab (daily, Vercel Hobby limit). Kill switches, monitoring, backups verified.

## Founder-authority (escalate ONLY these; do not re-ask until he does his 7-step test)

XM partner portal + written approval for public mentions; MetaApi token; custom domain; lawyer (counsel review of commissions, REX Path B, entity); Pvt Ltd registration; founder 7-step test; GO for hype/stealth lift; GO for production merge.

## New roadmap (founder vision Sep 30, priority order)

1. Trading journal engine — PHASE 1 DONE (live on lab) + PHASE 2 DONE (psychology layer, commit 1c2da79). Remaining phase 3 is post-launch (AI insights, MFE/MAE, education cross-links). MetaApi token still a founder paste-when-ready item (Admin → Integrations). Wedge sharpened: TradeFXBook (closest rival) has Trustpilot 1/5 + profit-promise guru marketing; our brand is the exact opposite — verified, honest, no hype. Improvement matrix: docs/TRADEFXBOOK-IMPROVEMENT-MATRIX.md
2. Education hub: trading guides, notes, topics, definitions — structured course library
3. Discord — SPEC DONE (DISCORD-INTEGRATION-SPEC.md): one-line admin connect (bot token paste), member linking, activity → REX with anti-farm. Build phase 1 after journal
4. Automated partner verification: XM partner portal report → instant account verification (needs XM portal access to evaluate)
5. REX on competition prizes (alongside real prize money) — legal check: REX rewards for activity are fine, no cash-out

## Agent-owned queue (autonomous, low-risk, reversible)

Competition-type research finalization (vision-competitions.md); OG card at credit reset; Discord community spec ready-to-build (post-launch per stealth law); user MFA (deferred, documented); email recovery BUILT + deployed 2026-09-30 (D-2026-09-30-12), live the moment founder adds RESEND_API_KEY; PostHog wiring at launch; content calendar drafts (private until stealth lift).

## Next milestones

Oct 15: prelaunch campaign reminder fires (founder decision day). Oct 31: T-7 audit. Nov 7: launch sequence (MERGE-CHECKLIST.md → LAUNCH-PLAN.md).

## Known inert leftovers (deliberate, documented)

Broker provider pg_enum contains "dhan"/"bybit" values (Postgres cannot drop enum values); no code path can create them; documented in MT5-XM-PARTNER-GATE.md.

## Session log — Sep 30 (lab branch growth-lab-v1, all verified live on fortrex-lab)

Built and deployed: /journal (verified-imports-only journal, 15 honest metrics, equity curve, filters), secret injection in Admin → Integrations (MetaApi/Discord/Resend/AI/XM paste-ready, AES-256-GCM at rest, zero-redeploy activation), /learn knowledge hub (Score v1.0 real weights, risk fundamentals, journal glossary, recaps placeholder). Logic audit: 4 real bugs found and fixed (connect page env-only availability, cron path bypassing mt5_sync kill switch, analytics demo-entry double count, XM partner link encryption that would corrupt the partner gate). 87 regression assertions pass. EXPENSE-MODEL.md delivered (launch ₹45-80k one-time; ₹5-9k/mo at launch). Founder MetaApi token is now a paste-when-ready item, not a blocker.

## Session log — Sep 30, 03:30 IST (Discord phase 1 live on fortrex-lab)

Discord community integration built and deployed (commit d3727b7 on growth-lab-v1): /link one-time-code member flow (15-min expiry, single use), interactions webhook with signature verification, daily activity REX job with anti-farm rules, admin console Discord tab (guild, channel whitelist, rate card, command registration). Migration 0010 applied to the lab DB over Neon HTTP (sandbox port 5432 blocked): discord_* columns + partial indexes + ledger_reason value, journal-consistent hash recorded. Live verification: health green, unsigned interactions 401, admin/link routes auth-gated, landing 200, journal 307 signed-out. Founder-facing next: create Discord bot (discord.com/developers), paste token in Admin → Integrations → Discord. Deferred: 0010 on the PRODUCTION Neon branch (needed before Discord goes to prod; lab connects to the preview-branch DB, prod-branch owner creds are Vercel-sensitive-marked). Stray "deploy-src" Vercel project recurred (deploy without --project flag) and was deleted; deploys must always pass --project.

## Session log — Sep 30, 03:30-04:00 IST (roadmap #4 + #6 live on lab, commit 7896fcc)

Leaderboard polish (#4): live-tournament section with LIVE badge + 30s auto-refresh, rank movement arrows (new prev_rank column, migration 0011 applied to lab DB as owner via Vercel env pull, atomic stash `set prev_rank = rank, rank = N`), prize-zone highlight (top 3 gold hairline) on live and completed boards. Share cards (#6): WhatsApp share button + copyable rank line ("I'm #N of M traders on FORTREX by REX") on the dashboard referral card. Anti-spam: Discord link code generation rate-limited 5/10min (the one security gap found in the new-code audit; admin TOTP coverage re-verified on all 9 mutation routes, read-only analytics/metrics correctly exempt, XSS scan clean — only escaped JSON-LD sink). All batteries: 87+63+27 assertions pass, build clean, deployed to fortrex-lab, live endpoints verified (health 200/db up, /leaderboard 200 rendering new board, /dashboard 307 auth-gated, landing 200). Roadmap #3 (affiliate onboarding deep-build) and #8 (public profiles/Hall of Fame, phase 3) remain in the queue.
| All 12 legal copy flags APPLIED + verified live; Season Zero multi-day window adopted | Commit 3d46a8c-ish (platform growth-lab-v1): hero "WHERE / SKILL IS MEASURED.", invite ladder softened, ToS honest rewrites, site title "Trading Performance Analytics"; served HTML verified clean of all flagged strings; Season Zero = Nov 7 09:00 → Nov 10 21:00 IST (84h) in prod DB (draft, verified); honesty overrides recorded in D-2026-09-30-11 |
| PRODUCTION MERGED + HARDENED (21:15 IST) | growth-lab-v1 → main (5ff6e37) deployed to fortrex-platform.vercel.app; 225 assertions green on merged main; old URL was still serving "TRADERS RISE" + "SEATS REMAINING" (flag 2 + bait guardrail) — now clean; stealth verified post-deploy (robots disallow + noindex); draft not leaked; typo domain fortnex-platform.vercel.app removed from project |
| CRITICAL FIX: production DB branch inversion (23:00 IST) | Canonical site was crashing on 3 pages (tournaments, season-zero, hall-of-fame) — real production branch (ep-billowing-voice) was stale at 16 tables; all recent migrations had landed on the lab branch (ep-young-flower). All 11 missing migrations applied to real production; Season Zero 84h window re-applied there; browser sweep 14/14 PASS on canonical site (was 3 crashes); mobile sweep 13 routes clean; probes deleted; prod users = founder only, lab = founder + deekshant. Branch host map recorded in D-2026-09-30-13 |
| CRON WIRING COMPLETE (00:05 IST) | Founder declared all logic/automation work complete. Final gap closed: CRON_SECRET set on Vercel (was missing — all cron endpoints 401'd, Season Zero would never have auto-opened). All 3 cron endpoints verified 200 with auth on canonical site; stealth intact post-redeploy. Automation chain now truly hands-off: Season Zero opens Nov 7 09:00 IST and settles Nov 10 21:00 IST automatically (D-2026-09-30-14) |
