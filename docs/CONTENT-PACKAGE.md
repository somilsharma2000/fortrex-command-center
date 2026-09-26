# FORTREX CONTENT PACKAGE — all member-facing copy, one source of truth
Voice: quiet, institutional, short declarative sentences. No hype words, no claim/win/prize/clearance vocabulary. Scarcity only as fact. Risk disclaimer on every money surface. REX has no cash value — always.

## 1. LANDING (live, canon — keep)
Headline: WHERE TRADERS RISE. Sub: FORTREX is a non-custodial tournament arena. Your capital stays at your broker. Seat counter, gates date, request-a-founding-seat form.

## 2. HOW IT WORKS (new page — 4 steps)
**Keep your capital.** FORTREX never holds client funds. You connect your own broker account, read-only. We verify your trades. You keep every rupee and every dollar where it is.

**Join the arena.** Enter a tournament that fits your account size. Weight brackets mean a $500 account competes fairly against a $50,000 one. Skill is the only variable.

**Trade your own strategy.** No deposits to us. No signal-selling. No profit promises. You trade your account, at your broker, your way.

**Rise by record.** Every trade is verified and scored on risk-adjusted performance. Honest leaderboards. Earn REX — a reputation currency for verified skill. REX has no cash value.

## 3. WHAT FORTREX IS / IS NOT (canon FAQ — keep, expands)
IS: a tournament arena for real traders; verified, honest scoring; reputation (REX) earned by record.
IS NOT: a broker; a fund; a signal service; a get-rich scheme; custody of any kind.

## 4. FAQ (new page — expand to 14)
1. Do you hold my money? No. Read-only connection. Funds never leave your broker.
2. What is REX? Reputation currency earned through verified performance. No cash value, no cash-out, no conversion to money. Ever (until counsel says otherwise — this line is law).
3. How is scoring done? Risk-adjusted, not raw P&L. Drawdown, consistency, and risk management count. Full method published per tournament (SCORING-SPEC.md, Score v1.0).
4. What is a weight bracket? Tournaments grouped by account size so small accounts aren't outgunned by large ones.
5. How do you verify trades? Broker API sync, read-only, timestamped. Trade history is snapshotted per scoring run.
6. Is this legal in India? Skill-based competition with no cash redemption of REX. We never promote offshore forex brokers to Indian residents. Tournaments with entry fees launch only after legal counsel sign-off.
7. What do founding members get? First 10,000 seats. Permanent 1.25x REX multiplier. The seat count is a hard cap.
8. Can I lose money? Trading at your own broker carries your own risk. You can lose your trading capital there. FORTREX charges no custody and offers no returns. Risk disclosure is on every money surface.
9. Which brokers are supported? MT4/MT5 via MetaApi first. Indian retail brokers only with written API approval from the broker.
10. What happens if I disconnect mid-tournament? Scoring uses your synced snapshot at that point. Reconnect and sync resumes.
11. How do referrals work? Your code, your link. When your invitee joins and activates, both sides earn REX. No cash either side.
12. Can I enter more than one tournament? Yes, if open brackets allow.
13. What stops cheating? Read-only verified sync, anomaly checks, disqualification clauses, appeal process.
14. Who is behind FORTREX? A private company, registered during the Genesis phase. Contact via the site.

## 5. RULES & FAIR PLAY (new page — skeleton)
- Verified read-only broker connection required before joining.
- One account per participant per tournament. Multi-account = disqualification.
- No martingale showcase abuse; scoring punishes hidden tail risk.
- Score runs on snapshots (reproducible; score_versions table).
- Disputes: file within 48h of scoring; admin review; audit-logged.
- Kill switches protect the platform if a rule is found broken.

## 6. LEGAL PAGES (launch-day versions)
- Terms of Service (draft needs lawyer pass; structure ready)
- Privacy Policy (DPDP-aligned draft; needs lawyer pass)
- Risk Disclosure: "Trading involves substantial risk of loss. FORTREX is not a broker, not an investment adviser, and holds no client funds. REX has no cash value. Tournament rewards, if any, come from published prize pools, never from redeeming points."
- REX Terms: append-only ledger; no cash value; multipliers permanent for founding members; subject to change with notice (never retroactively).

## 7. EMAIL / NOTIFICATION TEMPLATES (wire post-freeze)
- Welcome: seat number, 1.25x founding multiplier stated as fact, next step (connect broker).
- Referral paid: +50 REX, who joined, ledger link.
- Tournament opening: bracket, window, scoring method link.
- Scoring complete: rank, score version, snapshot id, appeal window.
- Check-in reminder: daily streak fact, no pressure language.
Subject lines: plain text, no emoji, no ALL CAPS. e.g. "Seat 214 confirmed", "Season Zero opens November 7, 09:00 IST".

## 8. FOUNDING INVITE SCRIPT (stealth — hand-shared only, canon)
"The link is private for now. FORTREX is a non-custodial tournament arena for traders — your money stays at your broker, verified scoring, founding members get the permanent multiplier. First 10,000 seats, then it closes. If it's not for you, no harm — just don't post it anywhere yet."

## 9. BAIT-VOCABULARY BLOCKLIST (binding guardrail — from STEALTH-MODE.md)
Never on any FORTREX surface: claim, win, prize (except factual "prize pool" of a tournament), clearance, guaranteed, spots remaining, doors open, last chance, don't miss out. Fear/scarcity is not our voice. Facts are.
