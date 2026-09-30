---
title: Project Status
summary: The living NOW file — what is done, what is running, what is pending, who owns it, what is next. Read before every session; update after every session.
---

# PROJECT STATUS — FORTREX

**Last updated:** Sep 30, 2026, 09:35 IST
**Rule:** This file is refreshed at the end of every work session. If a status is not here with evidence, it is not claimed.

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

## Running / in place

Daily heartbeat 08:00 IST, weekly report Mon 09:00 IST, T-7 audit Oct 31, launch Nov 7. Live scoring cron on lab (daily, Vercel Hobby limit). Kill switches, monitoring, backups verified.

## Founder-authority (escalate ONLY these; do not re-ask until he does his 7-step test)

XM partner portal + written approval for public mentions; MetaApi token; custom domain; lawyer (counsel review of commissions, REX Path B, entity); Pvt Ltd registration; founder 7-step test; GO for hype/stealth lift; GO for production merge.

## New roadmap (founder vision Sep 30, priority order)

1. Trading journal engine — SPECS DONE (JOURNAL-ENGINE-SPEC.md): verified MetaApi import, full analytics catalog, behavioral detectors, admin full control, REX tie-in. Build phase 1 next (needs MetaApi token from founder). Wedge sharpened: TradeFXBook (closest rival) has Trustpilot 1/5 + profit-promise guru marketing; our brand is the exact opposite — verified, honest, no hype. Improvement matrix: docs/TRADEFXBOOK-IMPROVEMENT-MATRIX.md
2. Education hub: trading guides, notes, topics, definitions — structured course library
3. Discord — SPEC DONE (DISCORD-INTEGRATION-SPEC.md): one-line admin connect (bot token paste), member linking, activity → REX with anti-farm. Build phase 1 after journal
4. Automated partner verification: XM partner portal report → instant account verification (needs XM portal access to evaluate)
5. REX on competition prizes (alongside real prize money) — legal check: REX rewards for activity are fine, no cash-out

## Agent-owned queue (autonomous, low-risk, reversible)

Competition-type research finalization (vision-competitions.md); OG card at credit reset; Discord community spec ready-to-build (post-launch per stealth law); user MFA + email recovery (deferred, documented); PostHog wiring at launch; content calendar drafts (private until stealth lift).

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
