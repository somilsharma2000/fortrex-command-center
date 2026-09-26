# FORTREX — STEALTH MODE SOP (Canon until Nov 7, 2026)
> **Founder directive (Sep 26, 2026): nobody outside the private circle hears about FORTREX until the gates open.** No public curiosity. No public posts. No leaks. This file is the operating law until launch.

## 1. The rules (absolute)

1. **No public social posts.** Phase II post pack is ON HOLD. Nothing goes out on any public channel — Instagram, X, TikTok, LinkedIn, YouTube, Telegram channels, Discord servers, nothing.
2. **No public mentions of the name FORTREX, the crown, the waitlist, or the link** anywhere the public can see. No comments under trading posts, no "coming soon" teases, no reactions that hint.
3. **Search invisibility is enforced at the code level:** all pages carry `noindex, nofollow` + robots.txt blocks every crawler. The link works ONLY when hand-shared. Nobody can stumble on it via Google.
4. **The site stays live but secret** — it is the demo for private invites, not a public asset.
5. **No screenshots of the platform in public.** Not even cropped. Not even "guess what I'm building."
6. **Agencies/freelancers who touch the repo sign an NDA first.** Beyond Pixells team included.
7. When anyone publicly asks what you're building: *"Working on some trading stuff."* Full stop. No name, no link.

## 2. What IS allowed (the private circle)

The Genesis list still fills — quietly, 1-to-1, personal invites only:

| Channel | Allowed use |
|---|---|
| Personal WhatsApp / DM to close trader friends | Yes — with the private invite script (below) |
| Small private group chats (≤20 people you actually know) | Yes — max one message, then answer questions in DM |
| Email to your personal network | Yes |
| Anything public | **No. Zero.** |

**Private invite script (send as-is, personalized with the name):**
> "{Name}, I'm building something in the trading space. It's invite-only right now and I'm keeping it completely off the radar until launch. I'm giving you one of the founding seats before anything goes public — 10,000 total, permanent benefits for the first names. Want in? I'll send the link."

**If they say "what is it":** one line only — "Skill-based trading tournaments where your capital stays at your own broker. Everything else I'll show you at launch."

**Hard line:** if someone posts the link publicly, do not engage publicly. DM them, ask to remove, and keep moving. The cap + urgency still work privately — "founding seats" is the scarcity, not public FOMO.

## 3. Why this strategy wins (the psychology)

- **Curiosity transfers to launch day.** The industry's most successful launches (and luxury brands generally) build in silence and open with a bang — all accumulated tension releases at once on Nov 7 instead of leaking out over 6 weeks.
- **No diluted first impression.** Traders see the finished arena, not a waitlist page. Perception: "this appeared fully-formed," which reads as institutional strength, not startup scramble.
- **Private invites create reciprocal obligation** — a personal founding seat is a gift; a public waitlist is a form. Gifts convert at 60-80%; forms convert at 5-15%.
- **Zero legal surface pre-launch.** Nothing public means nothing for regulators, competitors, or copycats to see while the entity + legal work is still in progress.
- **The 10,000 cap still fills** — it just fills through 1,000 hand-given invites that each bring 2-3 friends, instead of public traffic. Slower start, higher-quality list, stronger founding circle.

## 4. Stealth lift — launch day, Nov 7, 2026

Everything changes at once (the "single loud moment"):
1. robots.txt flips to `Allow: /` + sitemap; noindex tags removed (the FORTREX Launch Day workflow executes this — it's on the schedule).
2. Public socials go from zero to the launch salvo: the crown, "The gates are open.", the site link.
3. Private circle gets a 24-hour head start message the night before: "Tomorrow. You're already in."

## 5. Stealth checklist status

- [x] Site invisible to search engines (noindex + robots block, verified)
- [x] Phase II post pack ON HOLD (no public posting)
- [x] Private invite script written
- [ ] NDA template for any contractor who touches the repo (legal research doc has the pattern)
- [ ] Founder: personally invite the first 25 names this week (track them in FortrexWaitlist — source: "private-invite")

---

## Safe Browsing incident (Sep 26, 2026)

Google Safe Browsing flagged the entire `somilsharma2000.github.io` domain,
triggered by prize/claim-style marketing pages ("win a MacBook", "Trade Real.
Win Real.", "10,000 spots · multiplier locked forever"). Founder took down 9
GitHub Pages (repos preserved), parked the FORTREX page behind a neutral
placeholder, and filed review requests for the clean URLs. Danger screen
clears on Google's schedule (hours to days).

**Launch-domain audit (fortrex-platform.vercel.app):** the live platform
landing carries the SAME classifier-bait family, milder but present in
`src/app/page.tsx`:

- "CLEARANCE" used 5x (worst offender — coupon/sale vocabulary)
- "Claim your seat." headline + "CLAIM 1.25x MULTIPLIER CLEARANCE →" button
- "SEATS REMAINING" scarcity ticker + "DOORS OPEN 11.07" countdown
- Phone-number capture with country flags next to a "claim" CTA (classic
  lead-gen scam shape)

Mitigations already in place: noindex + robots-blocked (not crawled while
stealth), hand-shared link only, real legal disclaimer on the money surface.

**Copy guardrail (binding from now):** never use claim / win / prize /
clearance / giveaway vocabulary on any FORTREX surface. Scarcity is stated as
institutional fact per the canon ("10,000 seats" as a number, never "claim
your seat now"). This applies to launch marketing, emails, and partner
outreach.

**Launch-day protection:** when the custom domain goes live, register it in
Google Search Console immediately (fastest channel to detect and dispute a
Safe Browsing flag) and keep the page clean of bait vocabulary before stealth
drops, because that is when Google first crawls and classifies it.
