---
title: Journal Engine Spec (flagship)
summary: Complete design for the FORTREX trading journal engine — verified MT5 auto-import, full analytics, psychology-driven UX, admin control, REX and competition integration. Built from competitor teardowns (TradeZella, TraderSync, Tradervue, Edgewonk, TradesViz) and verified MetaApi research.
---

# FORTREX JOURNAL ENGINE — MASTER SPEC v1.0 (Sep 30, 2026)

*The flagship feature. Founder order: "Journal engine will be the best thing we have made." Research-first per Founder OS. Everything below is validated against existing research (research/universe/02, 03, 04, 08) plus fresh Sep 30 competitor evidence.*

## 1. Positioning — the wedge

Every competitor's #1 complaint is data reliability: TradeZella's recurring Trustpilot/Reddit gripe is import bugs (missing trades, wrong P&L); Myfxbook has documented log-manipulation and delayed sync history. FORTREX's entire brand is *verified honest data*. So the journal's promise is one sentence: **every trade, imported correctly, provably yours.** Journal competitors: TraderSync ($29.95–79.95/mo), Tradervue (free 100 trades/mo), Edgewonk ($169/yr, desktop, no cloud), TradesViz. Ours: free for members (journal = the hook that brings traders in; revenue stays partner/arena side). That alone beats every competitor's price.

## 2. Data import (verified, reliable, abuse-proof)

1. Trader enters: MT5 account number, investor (read-only) password, broker server name. Master password is NEVER submitted — investor password cannot trade or withdraw (research/universe/03).
2. Connection goes through MetaApi cloud (Node SDK): ~$0.50–1.50 per active account/month, REST, proven — Grade A research verdict "PERFECT (Infrastructure)".
3. Anti-spoof (research/universe/03 attack vectors): broker server whitelist (no private IPs / fake look-alike servers), server-side price cross-validation against known history, connection audit log.
4. Incremental idempotent sync: deals fetched by ticket; re-running a sync never duplicates (same pattern as the current broker sync, already battle-tested with 107-trade imports). Sync states: never → syncing → ok → error → disconnected (password changed by trader → visible status, re-auth flow).
5. Positions assembled from MT5 deals (in/out pairs, partial closes handled), with commission, swap, slippage stored per trade.
6. Credentials encrypted at rest (AES-256-GCM helper, already built). Data map updated in PRIVACY docs.

## 3. Analytics — the full catalog (nothing missing)

**Core performance:** net P&L (per trade/day/week/month/all), win rate, avg win vs avg loss, payoff ratio, expectancy per trade, profit factor, largest win/loss.

**Risk:** R-multiples per trade (user-configurable or auto risk %), max drawdown on equity curve, current drawdown, max consecutive losses/wins, risk-of-ruin estimate, daily loss limit awareness (psychology guardrail).

**Slicing (every dimension a trader asks for):** by symbol, by session (Asia/London/New York — IST-based, worldwide timezones already supported), by day of week, by hour of day, by direction, by duration held, by lot size bracket, by tag.

**Behavioral (the differentiator — psychology-driven design per founder):** overtrading detector (trade count vs user's own baseline), revenge-trade detector (re-entry within N minutes after a loss, size increased), streak discipline score, holding-time discipline, performance-after-loss stats, best/worst trading hours for THIS trader (personalized, factual, no profit promises).

**Quality:** Sharpe + Sortino on daily returns, equity curve chart (crown canon styling), trade duration distribution, slippage stats.

**Psychology journaling (manual layer):** per-trade notes, tags (strategy, setup, emotion), screenshot attach, post-trade lesson field, daily reflection. Journaling streak → REX rewards (activity reward, no cash value — legal line respected).

**AI insights (phase 3, post-launch):** pattern summaries in plain language. Master-prompt AI safety applies: validate outputs, no auto-conclusions, cost caps.

## 4. UX (design canon locked)

Dashboard: equity curve hero (gold on obsidian), KPI row in JetBrains Mono, session heat-map. Views: dashboard, calendar (P&L per day, green/red per canon), trades table (filter + sort everything), per-symbol breakdown, psychology view. Every view ships with empty/loading/error states (non-negotiable per charter). Mobile-first. Risk disclaimer on every money surface.

## 5. Admin — full control (founder order)

Admin console additions: all connected accounts list (user, broker server, status, last sync), force resync, disconnect account, import error feed, broker server whitelist manager, sync-rate config, journal feature flag + kill switch, REX journal-reward rules (amounts, caps), REX ledger view (append-only, auditable). All actions TOTP-gated + audit-logged (pattern already live).

## 6. Tie-ins (single platform)

Competitions: same verified MetaApi data feeds the score engine — journal IS the proof. Education hub: every metric links to its definition in the education hub (phase 2 of expanded vision). Discord: journal streaks announced (phase: Discord spec, separate doc). REX: journaling streaks, weekly review completed, first import — typed ledger reasons, append-only.

## 7. Scale (5M target)

Sync queue: per-account sync jobs with rate limiting and backoff; daily auto-sync all connected accounts (Hobby daily cron fits; Pro 5-min at launch); imports stored as immutable rows + materialized aggregates refreshed on import; Neon handles partitioning per year when volumes demand it. No client secrets in browser; all sync server-side.

## 8. Non-goals (deliberate)

No trade execution, no copy trading, no signal marketplace pre-launch (legal exposure). No MT4 (MT5-only law). No desktop app (cloud only, research verdict).

## 9. Build phases

Phase 1: connection flow + verified import + dashboard with core metrics + admin console section. Phase 2: full slicing + behavioral detectors + calendar + psychology layer + REX rewards. Phase 3 (post-launch): AI insights, MFE/MAE via tick data, education cross-links, public verified track-record widget (stealth-compliant, legal-checked).

## 10. Open items (founder-authority)

MetaApi account + token (founder provides, like XM portal). Post-launch Pro plan for 5-min syncs (money decision).

## 11. Direct competitor found (Sep 30, founder surfaced): TradeFXBook

https://www.tradefxbook.com — closest one-to-one competitor to the FORTREX expanded vision. Teardown from their live site:

**What they have:** MT4/MT5 investor-password sync (same model as our spec), AI reports (letter grade, revenge-trading detection, blind spots), strategy backtesting with candle replay, rich journaling (notes/tags/screenshots/emotional tracking/pre-trade checklists), equity curves, calendar heatmap, session breakdowns, community with leaderboards + share cards, "Traders Lounge" mentorship, economic calendar, multiple accounts. Claims 2,000+ traders, WhatsApp support (Dubai +971), testimonials from Indian trader communities (Top G Traders ecosystem; Atul Patil association unverified).

**Pricing:** Free = 15 trades/month, MANUAL entry only, basic analytics. Real-time MT sync + AI + full analytics = paid "Pro". Backtesting + Lounge = paid "Elite". Exact figures JS-rendered (pull exact prices at next pass).

**Where FORTREX wins:**
1. Full-featured journal FREE for members (their sync is paywalled) — our journal is the hook, revenue stays partner/arena side.
2. Verified competitions with real prize money + REX economy — they have leaderboards but no tournaments, no prize track, no own currency.
3. Entry law (account via our link) — they connect any account; no partner moat.
4. Verified-honest-data brand: broker whitelist + anti-spoof (their FAQ makes security claims; no evidence of server spoofing defenses).
5. Education hub (structured guides/courses) — they have blog + mentor lounge instead.
6. Institutional design canon + 5M-scale plan.

**Adopt from them (features worth matching):** share cards (brag-to-social cards for stats — fits psychology + presentation goals), calendar heatmap (already in spec), economic calendar (post-launch phase), backtesting replay (phase 3+), pre-trade checklist templates (add to psychology layer).

**Deliberately NOT adopting:** Traders Lounge mentorship + trade ideas/signals sharing — legal gray (signal-seller exposure, profit-promise risk) and against our legal shield. Community = Discord + education hub instead.
