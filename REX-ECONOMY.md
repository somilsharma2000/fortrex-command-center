# FORTREX — REX Economy (Decision Record + Counsel Brief)
> Written Sep 26, 2026, after a proposal to make REX redeemable for cash.
> **The law until changed by counsel: REX has no cash value and no cash-out.**
> This file records why, what's already built, the open fork, and the exact questions
> for the legal consult. It deliberately does NOT rewrite the shield in
> [`FORTREX-MASTER-SPEC.md`](FORTREX-MASTER-SPEC.md) — that edit happens only with
> counsel's sign-off.

## 1. The two economies, kept separate on purpose

There are TWO flows in FORTREX and the whole legal position rests on not fusing them:

**The money economy (tournaments):**
```
Entry fee (₹ or REX-ticket, counsel decides) → prize pool → payout to winners
```
Money enters through arena fees and exits as prizes for WINNING COMPETITIONS.
This is the revenue model already in the master spec. Regulated activity —
needs counsel before paid tickets, same gate that already exists.

**The reputation economy (REX):**
```
Play well, show up, refer honestly → REX earned (ledger) → utility inside FORTREX
```
REX buys tournament entries, streak benefits, multiplies future earnings, marks
standing on leaderboards. It is a skill-metric with utility — NOT money.

**The moment REX becomes redeemable for ₹ or money-like rewards, it stops being
reputation and becomes a wagering token / stored-value instrument.** In India that
triggers RBI prepaid-instrument rules, the online-money-game definitions under the
new gaming law, and state gaming acts. That is a different company, not a feature.

## 2. What the proposal gets right — and is already built

The advisor's architecture (ledger separate from any redemption engine) is exactly
right. Verified in `fortrex-platform/src/db/schema.ts` (§5, REX LEDGER):

- **Append-only ledger** — entries are never mutated, only added; `balanceAfter`
  recorded on every row (auditable to the rupee-equivalent unit)
- **Typed reasons** (`ledgerReason`) — earned / spent / awarded / reversed already
  enum'd; "locked" adds trivially when needed
- **Multiplier field per entry** — the 1.25x founding multiplier is already native

**Nothing needs rebuilding.** The one component NOT built is the redemption engine —
and that is correct: it must not exist until counsel defines what redemption is
legally allowed to be (cash, partner rewards, funded-seat credits, or nothing).

## 3. The fork, recorded honestly

| Path | Description | Legal weight | When |
|------|-------------|--------------|------|
| **A. Utility REX (current law)** | REX = reputation + in-platform benefits. Rewards come from tournament prizes, funded accounts, partner perks — NOT from redeeming points. | Safest. No PPI exposure. Matches all current copy and the master spec. | Default now → through launch |
| **B. Redeemable REX** | REX → cash/approved rewards via a redemption engine. | Heavy: RBI PPI, online gaming law, state acts, KYC/AML on payouts, geo-blocking. Potentially company-structuring. | Only with counsel sign-off + compliance build |

**Rule until counsel decides: every public-facing surface keeps the disclaimer.**
"REX has no cash value" stays on the site, in the ToS draft, and in all partner copy.
No REX→₹ conversion rate is ever published or implied before Path B is cleared.
No "10,000 REX ≈ ₹X" language anywhere — implied convertibility is legally the same
as convertibility.

## 4. The counsel brief (add to the legal consult already on the founder's list)

1. Under the Promotion and Regulation of Online Gaming Act, 2025 (and current case
   law: *Chamarbaugwala*, *Lakshmanan*), is a paid-entry, skill-verified trading
   tournament with cash prizes lawful for Indian residents — and in which states must
   we geo-block?
2. If REX can purchase entry to paid tournaments (points-for-stake), does that make
   REX itself a money-like instrument under RBI PPI rules?
3. Can REX be redeemed for NON-cash rewards (fundee-seat credits, partner perks,
   merchandise) without triggering PPI/wagering classification?
4. What payout mechanics are compliant for cash prizes to Indian residents — and
   does paying a non-Indian resident create FEMA obligations on our side?
5. What KYC/AML threshold applies to prize payouts (PMLA reporting limits)?
6. Required language for ToS + every money surface if we run Path A through launch.

## 5. The user journey under the current law (0 REX → first reward)

```
Join (Genesis seat) → verify broker (read-only) → enter a free launch tournament
→ compete honestly on the verified leaderboard → place → win a prize
  (cash prize pool OR funded-seat credit — from WINNING, not from redeeming)
→ REX earned for placement + check-in streaks + honest referrals
→ REX spends on: tournament entries, streak benefits, standing markers
→ founding members keep the permanent 1.25x multiplier on REX earned
```

The reward story is "win the arena, get paid from the prize pool" — REX is the
reputation trail, not the payout rail. This journey is fully launchable under Path A.

## 6. Standing rules

- No redemption engine is built. No REX→₹ rate exists in code, copy, or docs.
- The `ledgerReason` types stay non-monetary in meaning until Path B is approved.
- Any partner or copywriter who writes "redeem REX for cash" triggers an immediate
  correction. The shield is the brand's legal position, not a marketing bug.
- This file + counsel's answers are what update the master spec — nothing else does.
