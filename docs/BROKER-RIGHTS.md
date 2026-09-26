# BROKER-RIGHTS.md — Dhan HQ & Kite Connect commercial-use evidence

**Verdict: NOT yet verified for commercial use. Directional evidence is favorable. Written confirmation required before FORTREX claims broker integration is commercially usable.**

## Evidence (graded)

### Zerodha Kite Connect
- **[A — primary, kite.trade homepage, Sep 26 2026]** Publishes a "Personal (Free)" tier (orders, portfolio, margin) and "Connect" tier (₹500/mo, WebSocket + historical candles). Site explicitly addresses businesses: "Kite Connect powers capital market products used by millions of people... Drop us an e-mail at [business email] to know more." → Zerodha invites third-party platforms.
- **[B — docs reference]** API terms exist in Kite Connect docs; the exact clauses on data redistribution and competition use have NOT been read yet.
- **FORTREX usage pattern:** each user connects THEIR OWN broker account with THEIR OWN API key; FORTREX reads trade history read-only. This resembles individual Personal-tier use, but at scale through a commercial platform — which is exactly what needs written confirmation.

### Dhan HQ (DhanHQ APIs)
- **[A — primary, dhan.co homepage, Sep 26 2026]** Markets "DhanHQ Trading APIs — Trade with Algo, Connect Apps, Build Services using APIs for FREE."
- **[LIMITATION]** developers.dhan.co terms page could not be reached from the sandbox (DNS). The actual ToS clauses remain unread.
- Dhan publishes a partner program ("Become a Partner — authorised partners") — the likely commercial path for a competition platform.

## Required before claiming commercial usability
1. Read the full DhanHQ API terms (founder or next session with working access) — evidence log the exact clauses on: data storage, public display of trader statistics, commercial use, rate limits.
2. Read Kite Connect API terms (kite.trade/docs) — same clauses.
3. Written email to both brokers describing FORTREX (competition platform, read-only trade history, public leaderboards of scores) asking for permission. Save replies in this folder.
4. No public copy may say "connect your Dhan/Zerodha account" commercially until this closes. The connect page's honest gating (provider shown only when credentials exist) keeps us truthful meanwhile.

## Standing rule
If either broker says no: that broker is removed from the adapter list and the fallback ladder is (mock → MetaApi.cloud for MT4/MT5 → broker-partner deal). FORTREX never builds on an API whose terms forbid us.
