# FORTREX — Launch Plan (Nov 7, 2026 — the One File)
> Consolidated Sep 27, 2026 from all specs + research. The T-7 audit workflow (Oct 31)
> and Daily Heartbeat check against this file. Founder actions are marked 👑.

## Phase gates (work streams, not dates)

**October build (agent + CI):** Dhan adapter → verification states → Score v1.0 +
synthetic regression → tournament engine statuses → Season Zero wired → kill switches →
PostHog events at launch. Specs: VERIFICATION-SPEC / SCORING-SPEC / TOURNAMENT-SPEC.

**Partner engine (founder, from Oct 1):** PARTNER-PIPELINE.md — 50 candidates verified,
20 DMs by Oct 15, 30 committed partners by Oct 31. 10 min/day.

**Founder actions (the only blockers, with latest safe dates):**

| # | Action | Latest safe date | Why that date |
|---|--------|------------------|---------------|
| 1 👑 | **Neon + Vercel signup** (one afternoon) | NOW — everything plugs into it | October build needs the DB live |
| 2 👑 | **Lawyer consult** (brief ready: REX-ECONOMY §4) | Book by Oct 5 | Classifies the product before money decisions lock |
| 3 👑 | **Trademark search + filing** (TM-A, classes 9/35/41/42, ~₹4,500/class) | Filed by Oct 24 | Name goes public Nov 7; first-to-file regime |
| 4 👑 | **Domain** (fortrex.io preferred, .in fallback) | Purchased by Oct 24 | DNS + Cloudflare + email need lead time |
| 5 👑 | **25 private invites** list ready | Oct 31 | First seats fill the launch tournament |
| 6 👑 | **Pvt Ltd + bank** (his call: "last") | Before any money moves | Entity gates payments, not launch |

## T-7 Audit (Oct 31, automated + this checklist)

Domain live behind Cloudflare · TM filed · legal opinion received (or booked) ·
entity status known · site build green 7 days straight · Season Zero dry-run passed ·
kill switches tested · support mailbox live · 25-invite list confirmed · partners
committed count logged · stealth-lift checklist rehearsed.

## Stealth lift procedure (Nov 6 evening, ~30 min, runbook)

1. robots.txt → allow · remove noindex meta · resubmit sitemap
2. Verify domain resolves + SSL + Cloudflare proxies on
3. Analytics (PostHog) live · Better Stack monitors green
4. Announcement drafted in Citadel + partner DM script distributed
5. Nothing else changes — the site that was tested is the site that launches

## Launch day (Nov 7) — the command center

09:00 IST Season Zero opens (announced to Genesis members) · monitors watched live ·
founder + agent on the Citadel · hourly check: signups, verification success rate,
tournament registrations, error rate, fraud flags · pre-written incident responses
(OPS-RUNBOOK) · NO code changes on launch day except rollback-level emergencies.

**The quiet version of the whole plan:** the machine is built, the moat is verified
data, the law is respected, and on Nov 7, ten thousand people get a leaderboard
they can actually believe.

---

## SEO / GEO launch flip (added Sep 26)

The platform now ships a complete search/answer-engine foundation, invisible
until launch day (stealth law). Everything below is built and live in code
(commit 7da363a); only the flip remains.

**Built (verified in production):**
- Copy: zero claim/win/prize/clearance vocabulary on the landing (Safe Browsing
  guardrail); all facts kept — 10,000 seats, 1.25x multiplier, real countdown.
- SEO metadata: descriptive title ("FORTREX — Skill-Based Trading
  Tournaments"), description, canonical URL, OpenGraph + Twitter cards.
- GEO content: "What FORTREX is. What it is not." FAQ section (definitional,
  quotable blocks AI engines cite: non-custodial, not a broker, REX no cash
  value, honest scoring) + FAQPage/Organization/WebSite JSON-LD.
- Env-gated crawl gate: STEALTH_MODE unset → robots.txt Disallow all, noindex
  meta. STEALTH_MODE="false" → robots allow all + sitemap.xml published.

**Launch day (Nov 7), in order:**
1. Set Vercel env `STEALTH_MODE=false` → redeploy.
2. Verify `https://<domain>/robots.txt` allows all and `/sitemap.xml` resolves.
3. Register the custom domain in Google Search Console the same day (the
   Safe Browsing early-warning radar — do not skip).
4. Submit the sitemap in Search Console.
5. Share the waitlist members' referral links so the first backlinks are real
   people, not bots (educator partners are the authority path; see
   PARTNER-PIPELINE.md).

**Why no "spike" is possible before Nov 7:** the site is deliberately
invisible to search engines (noindex, robots-blocked, hand-shared link only).
Spikes need indexing + authority; the authority path is the educator partners
and the custom domain — both founder-side. What is in our control is done.

**Post-launch SEO backlog (not pre-launch):** proper 1200x630 OG image card,
per-page metadata for tournaments/leaderboard, structured data for
tournaments, blog/educational content cadence (GEO compounding).
