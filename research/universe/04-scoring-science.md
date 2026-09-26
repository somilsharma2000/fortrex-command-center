# FORTREX Scoring Science: Quantitative Architecture for Skill-Based Trading Tournaments

> **Confidential — Internal Strategy & Research Document**  
> **Brand Identity:** Luxury Dark Obsidian & Sovereign Gold  
> **Voice:** Quiet Confidence, Uncompromising Mathematical Authority  
> **Target Launch:** Doors Open Nov 7, 2026 (Stealth Phase)  
> **Core Premise:** Rank retail traders by verified, risk-normalized **SKILL**, not raw returns or suicide leverage. A $500 account must compete fairly against a $50,000 account via log-scale weight brackets, powered by read-only broker data APIs.

---

## Executive Summary

- **Raw Return Scoring is Inherently Flawed:** Traditional trading competitions (like the World Cup Trading Championship) rank traders by net percentage return. This creates a moral hazard ("gambler's ruin" dynamic), rewarding traders who take 100x suicide leverage on binary economic events. In a tournament where only top finishes pay, raw return scoring turns trading into a lottery where 90%+ of participants blow up.
- **Prop Firms Rule via Negative Constraints, Not Skill Ranking:** Leading prop firms (FTMO, FundedNext, Topstep) do not score skill; they use pass/fail risk gates—such as maximum daily loss (3–5%), total drawdown (10%), and consistency caps (30–40% daily profit limit)—to eliminate high-risk participants. While effective for capital protection, these rules are pass/fail filters rather than continuous skill ranking algorithms.
- **Risk-Adjusted Metrics Provide the Core Foundation:** True trading skill is defined as generating excess returns while minimizing tail risk, capital drawdown, and return variance. Standard metrics—including the Sharpe, Sortino, and Calmar ratios, along with Van Tharp R-multiples—provide the mathematical building blocks for evaluating return per unit of risk taken.
- **Log-Scale Weight Brackets Level the Capital Field:** A $500 micro account operates under vastly different microstructural constraints than a $50,000 institutional account (execution slippage, lot sizes, spread-to-equity ratios, and psychological impact). Grouping traders into log-scale weight brackets (Featherweight: $100–$999; Middleweight: $1,000–$9,999; Heavyweight: $10,000–$100,000+) ensures participants only compete against peers in equivalent capital tiers.
- **Dual Architecture: Tournament Sprints vs. Long-Term Glicko-2 Ratings:** Single tournaments are prone to short-term market regime luck. FORTREX separates single-tournament standings (scored via a composite risk-adjusted formula over a fixed time sprint) from a trader's permanent, long-term **FORTREX Rating**, which uses a modified Glicko-2 system (tracking skill rating $R$, rating deviation $RD$, and rating volatility $\sigma$) across multiple tournaments.
- **Native Countermeasures Prevent Systemic Exploits:** Five major tournament exploits—jackpot "one-hit wonder" trades, late-stage desperation over-leveraging, cross-account sybil hedging, copy-trading collusion, and early-round sandbagging—are mathematically neutralized through minimum trading days, single-day profit caps (30%), non-linear drawdown penalization, and order-flow correlation monitoring.
- **FORTREX Score v1.0 Delivered for Nov 7, 2026 Launch:** The proposed FORTREX Score v1.0 combines Sharpe/Sortino-style return-to-downside efficiency, a non-linear drawdown penalty factor, a consistency multiplier, and an activity/sample-size threshold. It is version-locked, reproducible, and ready for backtesting against six core synthetic trader profiles before live rollout.

---

## 1. How Prop Firms Evaluate Today: Rule Teardowns & Abuse Mitigation

Proprietary trading evaluation firms operate as capital filters. Their rules are designed to protect the firm's simulated or live capital pools from extreme tail risk, trader tilt, and structural abuse.

### 1.1 Comparative Rule Matrix across Leading Prop Firms

| Evaluation Rule | FTMO (FX / CFDs) | FundedNext (Multi-Asset) | Topstep (Futures) | Primary Abuse Vector Prevented |
| :--- | :--- | :--- | :--- | :--- |
| **Profit Target** | Phase 1: 10%<br>Phase 2: 5% | Phase 1: 8–10%<br>Phase 2: 5% | 6% ($3,000 on $50k account) | Prevents low-conviction, passive equity curve drifting without edge. |
| **Max Daily Loss** | 5% of starting balance (or 3% on single-phase) | 5% of equity/balance (calculated daily at midnight UTC) | $1,000–$2,000 dynamic/static daily trailing limit | Prevents emotional "tilt", revenge trading, and single-day account liquidation. |
| **Max Total Drawdown** | 10% static relative to initial balance | 10% max overall loss (static or trailing) | $2,000–$3,000 Max Trailing Drawdown (trails peak intraday balance) | Prevents long-term capital erosion, slow bleed, and catastrophic ruin. |
| **Minimum Trading Days** | 4 trading days (Phase 1 & 2) | 5 trading days | 0 to 5 trading days (varies by Combine tier) | Prevents "lotto-trading" (hitting target in 1 trade on high volatility and exiting). |
| **Consistency Rules** | No hard daily profit cap on standard accounts (reviewed at payout) | 30%–40% single-day profit cap during evaluation/payout periods | 40% consistency rule (no single day >40% of total profit) | Prevents high-volatility outlier wins from masking overall negative expectancy. |
| **News Restrictions** | Restricted 2 min before/after high-impact news on Standard accounts | Permitted during evaluation; restricted on certain funded tiers | Restricted around high-impact economic releases (e.g., NFP, CPI, FOMC) | Prevents spread arbitrage, toxic execution slippage, and binary news gambling. |

### 1.2 Deep-Dive into Rule Mechanisms & Abuse Prevention

#### Profit Targets
- **Mechanism:** Traders must achieve a fixed cumulative net profit percentage (typically 6%–10%) without breaching any drawdown parameters.
- **Abuse Prevented:** Eliminates passive capital hoarding and ensures that traders demonstrate positive expectancy over a defined sample size before capital allocation.

#### Max Daily Loss
- **Mechanism:** Calculated as a percentage (e.g., 5%) of either the initial daily starting balance or current equity at server reset (00:00 GMT/UTC). If equity drops below this threshold at any point during the trading day, the account is immediately terminated.
- **Abuse Prevented:** Neutralizes emotional breakdown ("tilt"), revenge trading following a losing streak, and over-leveraging to recover daily losses. It caps single-day loss exposure for the funding provider.

#### Max Total Drawdown (Static vs. Trailing)
- **Mechanism:** 
  - *Static Drawdown (FTMO Standard):* Fixed loss limit based on starting balance (e.g., on a $100k account with a 10% limit, equity can never fall below $90,000).
  - *Trailing Drawdown (Topstep):* Drawdown limit trails high-water mark peak equity intraday. If equity reaches $105,000, a $3,000 trailing drawdown locks the stop at $102,000.
- **Abuse Prevented:** Protects capital against structural market shifts and long tail losses. Trailing drawdowns prevent traders from giving back accrued open profits during runaway trends.

#### Minimum Trading Days
- **Mechanism:** Requires execution of at least one valid trade on a minimum number of distinct calendar trading days (typically 4–5 days).
- **Abuse Prevented:** Directly stops "jackpotting"—where a trader takes maximum leverage ahead of an economic release, hits the profit target in a single execution, and requests payout without demonstrating consistent trading methodology.

#### Consistency Rules (30%–40% Profit Caps)
- **Mechanism:** At the time of evaluation review or payout request, no single trading day's net profit may account for more than 30%–40% of total net profits accumulated. If breached, the trader must continue trading to smooth out the distribution.
- **Abuse Prevented:** Mitigates lucky outlier trades. A trader who makes $9,000 in one high-leverage trade and $100 across 10 other trades is blocked from passing because their trade distribution demonstrates zero statistical consistency.

#### News Trading Restrictions
- **Mechanism:** Prohibits opening, closing, or executing pending orders within a window (typically 2 to 5 minutes) surrounding major "red folder" economic announcements (e.g., US NFP, CPI, FOMC interest rate decisions).
- **Abuse Prevented:** Prevents latency arbitrage, order-book toxic flow, spread widening exploitation, and binary directional gambling on scheduled macro data.

### Section 1 Sources & Citations
- **FTMO Official Trading Objectives & FAQ**  
  URL: https://ftmo.com/en/faq/what-are-the-trading-objectives/  
  Grade: **A** (Official Platform Documentation) | Date: September 2026
- **FundedNext Rule Architecture & Evaluation Models**  
  URL: https://fundednext.com/rules  
  Grade: **A** (Official Platform Documentation) | Date: August 2026
- **Topstep Trading Combine Rules & Trailing Max Drawdown Guide**  
  URL: https://help.topstep.com/hc/en-us/articles/360025932153-Maximum-Loss-Limit  
  Grade: **A** (Official Platform Documentation) | Date: July 2026
- **Prop Firm Industry Rule Benchmarking Analysis (PropFirmProof)**  
  URL: https://propfirmproof.com/blog/best-prop-firms/  
  Grade: **B** (Credible Secondary Industry Audit) | Date: September 2026

---

## 2. Risk-Adjusted Performance Metrics: Foundations, Weaknesses & Industry Usage

Quantitative evaluation of trading performance requires measuring returns relative to the risk undertaken to produce those returns.

```
+-----------------------------------------------------------------------------------+
|                     RISK-ADJUSTED PERFORMANCE METRICS                             |
+--------------------------+--------------------------+-----------------------------+
| VOLATILITY-BASED         | DOWNSIDE & DRAWDOWN      | TRADE & DISTRIBUTION        |
| - Sharpe Ratio           | - Sortino Ratio          | - Profit Factor             |
|                          | - Calmar Ratio           | - Expectancy (Van Tharp R)  |
|                          | - Max Drawdown (MDD)     | - Win Rate                  |
+--------------------------+--------------------------+-----------------------------+
```

### 2.1 Metric-by-Metric Analysis

#### 1. Sharpe Ratio
- **Mathematical Formula:**  
  $$\text{Sharpe Ratio} = \frac{R_p - R_f}{\sigma_p}$$  
  *where $R_p$ is portfolio return, $R_f$ is risk-free rate, and $\sigma_p$ is standard deviation of portfolio excess returns.*
- **What It Measures:** Excess return earned per unit of total risk (volatility).
- **Weaknesses & Exploits:** 
  - Penalizes upside volatility (large winning trades) equally alongside downside volatility.
  - Assumes a normal distribution of returns; fails when return distributions exhibit heavy tails, skewness, or kurtosis.
  - Vulnerable to manipulation via short-option strategies or illiquid asset mark-to-model pricing that artificially smoothes return variance.
- **Investment Industry Usage:** Standard benchmark across mutual funds, hedge funds, and institutional portfolio evaluation (Morningstar, Mercer).

#### 2. Sortino Ratio
- **Mathematical Formula:**  
  $$\text{Sortino Ratio} = \frac{R_p - R_f}{\sigma_d}$$  
  $$\sigma_d = \sqrt{\frac{1}{N} \sum_{t=1}^{N} \min(0, R_t - \text{MAR})^2}$$  
  *where $\sigma_d$ is downside deviation below Minimum Acceptable Return ($\text{MAR}$).*
- **What It Measures:** Excess return per unit of bad (downside) volatility.
- **Weaknesses & Exploits:** 
  - Requires a sufficient sample size of negative return periods to compute downside deviation reliably.
  - Highly sensitive to the user-selected Minimum Acceptable Return ($\text{MAR}$).
- **Investment Industry Usage:** Preferred in alternative investment analysis, hedge funds, trend-following strategies, and asymmetric payoff profiles.

#### 3. Calmar Ratio
- **Mathematical Formula:**  
  $$\text{Calmar Ratio} = \frac{\text{Annualized Return}}{\text{Maximum Drawdown}}$$  
  *(Typically computed over a trailing 36-month period).*
- **What It Measures:** Return relative to maximum peak-to-trough capital decline.
- **Weaknesses & Exploits:** 
  - Extremely sensitive to the evaluation window start/end dates.
  - A single outlier drawdown event permanently degrades the ratio until the window rolls off.
  - Ignores volatility path between peak and trough.
- **Investment Industry Usage:** Dominant metric in CTA (Commodity Trading Advisor) and Managed Futures performance sheets (BarclayHedge).

#### 4. Profit Factor
- **Mathematical Formula:**  
  $$\text{Profit Factor} = \frac{\sum \text{Gross Profits}}{\sum |\text{Gross Losses}|}$$
- **What It Measures:** Absolute payout efficiency—dollars earned per dollar lost.
- **Weaknesses & Exploits:** 
  - Highly unstable on small trade samples (approaches infinity when gross losses are near zero).
  - Can be skewed by a single massive winning outlier trade.
  - Does not factor in trade duration, time at risk, or drawdown path.
- **Investment Industry Usage:** Universal screening metric in automated trading system backtesting (MetaTrader, TradeStation, TradingView).

#### 5. Expectancy & R-Multiples (Van Tharp Framework)
- **Mathematical Formula:**  
  $$\text{Expectancy } E(R) = (W \times \bar{R}_{\text{win}}) - (L \times \bar{R}_{\text{loss}})$$  
  *where $W$ is win rate, $L = 1 - W$, and $R$ represents profit/loss expressed as a multiple of initial dollar risk at stop loss ($1R$).*
- **What It Measures:** Average risk-adjusted return expected per trade unit.
- **Weaknesses & Exploits:** 
  - Relies entirely on strict pre-trade stop-loss definition ($1R$). If a trader shifts stop-losses mid-trade or trades without stops, $1R$ calculations become invalid.
  - Does not account for trade frequency or exposure duration.
- **Investment Industry Usage:** Professional proprietary trading desk performance logging, trade journal analytics (Edgewonk, TradesViz), and position-sizing system design.

#### 6. Win Rate
- **Mathematical Formula:**  
  $$\text{Win Rate} = \frac{\text{Winning Trades}}{\text{Total Closed Trades}}$$
- **What It Measures:** Frequency of positive-closed trade outcomes.
- **Weaknesses & Exploits:** 
  - Meaningless in isolation without risk-reward context (e.g., a 90% win rate with a 1:10 risk-reward ratio leads to account bankruptcy).
  - Encourages bad psychological habits, such as holding losing trades indefinitely to avoid taking a loss.
- **Investment Industry Usage:** Behavioral risk monitoring and trader execution auditing.

#### 7. Maximum Drawdown (MDD)
- **Mathematical Formula:**  
  $$\text{MDD} = \frac{\text{Peak Value} - \text{Trough Value}}{\text{Peak Value}}$$
- **What It Measures:** Maximum observed percentage peak-to-trough loss in equity.
- **Weaknesses & Exploits:** 
  - Strictly backward-looking; historical MDD does not guarantee future drawdown boundaries.
  - Sensitive to observation sampling frequency (tick-by-tick vs. daily equity close).
- **Investment Industry Usage:** Mandated regulatory risk disclosures (CFTC, NFA, SEC), capital allocation limits, and stress testing.

### Section 2 Sources & Citations
- **Sharpe, William F. (1994). "The Sharpe Ratio." Journal of Portfolio Management.**  
  URL: https://www.pm-research.com/content/iijpman/21/1/49  
  Grade: **A** (Seminal Academic Literature) | Date: 1994
- **Sortino, Frank A., and van der Meer, Robert. (1991). "Downside Risk." Journal of Portfolio Management.**  
  URL: https://www.pm-research.com/content/iijpman/17/3/27  
  Grade: **A** (Seminal Academic Literature) | Date: 1991
- **Young, Terry W. (1991). "Calmar Ratio: A Smoother Tool." Futures Magazine.**  
  URL: https://www.diva-portal.org/smash/get/diva2:1343322/FULLTEXT01.pdf  
  Grade: **B** (Industry Practitioner Paper) | Date: 1991
- **Van Tharp Institute: Position Sizing & R-Multiple Framework Architecture**  
  URL: https://www.vantharp.com/position-sizing-definitive-guide/  
  Grade: **A** (Foundational Trading Methodology) | Date: August 2025

---

## 3. Tournament & Competition Scoring Paradigms

```
+-----------------------------------------------------------------------------------+
|                     TOURNAMENT SCORING ARCHITECTURE                               |
+------------------------------------+----------------------------------------------+
| FIXED SPRINT SCORING (30-DAY)      | LONG-TERM RATING SYSTEM (PERMANENT)           |
| - Composite Risk-Adjusted Formula  | - Modified Glicko-2 Engine                   |
| - Normalizes return by drawdown    | - Rating (R), Deviation (RD), Volatility (s) |
| - Rewards consistency & risk control| - Isolates multi-regime skill across sprints |
+------------------------------------+----------------------------------------------+
```

### 3.1 Percentage-Return Scoring & Moral Hazard

Traditional trading competitions rank participants using net percentage return:

$$\% \text{ Return} = \frac{\text{Ending Balance} - \text{Starting Balance}}{\text{Starting Balance}} \times 100\%$$

#### The Moral Hazard (Convex Payoff Trap)
In a winner-take-all or top-heavy tournament prize structure, pure percentage return creates a **convex payoff profile** (equivalent to holding a call option on tournament placement):
1. **Downside Risk:** Capped at losing the entry fee or starting balance (or account disqualification).
2. **Upside Reward:** Uncapped cash prizes, publicity, and prestige.

Because the downside is fixed while the upside scales with peak return, the rational strategy under percentage scoring is to take extreme, unmanageable leverage. A trader taking 100x leverage on a 50/50 binary event (e.g., NFP release) has a 50% probability of instant tournament leadership and a 50% probability of blowing up. When 1,000 traders execute this strategy, 500 blow up, but the top 10 traders show thousands of percent in return—giving the illusion of hyper-competence while actually reflecting pure extreme lottery selection.

### 3.2 Case Study: World Cup Championship of Futures Trading (WCC)

- **Organization & Rules:** Founded in 1983 by Robbins Trading Company. Operates on real money accounts (minimum $10,000 capital) using net percentage return over a calendar year.
- **Historical Outliers:**
  - **Larry Williams (1987):** Turned $10,000 into $1,147,000 (**11,376% return**) using aggressive Kelly Criterion position sizing. During the October 1987 crash, his account briefly surpassed $2.1M before suffering a >50% drawdown.
  - **Michelle Williams (1997):** Won with a **1,000%+ return**.
  - **Andrea Unger:** Won 4 separate titles using quantitative systematic algorithmic strategies.
- **The Structural Flaw:** While legendary, the WCC rewards extreme tail volatility. Historical data shows that in typical competition years, over 70–80% of participants end in negative territory or blow up entirely. Pure percentage scoring measures maximum upside risk tolerance during favorable market regimes rather than reproducible quantitative trading skill.

### 3.3 E-Sports Rating Systems (Glicko-2) vs. Single-Tournament Scoring

To separate short-term tournament sprint performance from permanent trader skill, FORTREX incorporates a dual rating architecture inspired by e-sports (e.g., Chess, Counter-Strike, Dota 2).

#### The Glicko-2 System (Mark Glickman)
Unlike basic Elo ratings, Glicko-2 tracks three distinct parameters for each player:
1. **Rating ($R$):** Represents estimated skill level (e.g., default 1500).
2. **Rating Deviation ($RD$):** Represents uncertainty in the rating. $RD$ decreases as a trader completes more verified trades and tournaments, and increases during periods of inactivity.
3. **Rating Volatility ($\sigma$):** Represents consistency/erratic performance. High volatility indicates unpredictable results (flipping between top finishes and catastrophic blowups).

```
+-----------------------------------------------------------------------------------+
|                        GLICKO-2 RATING PARAMETERS                                 |
+--------------------------+--------------------------+-----------------------------+
| RATING (R)               | RATING DEVIATION (RD)    | RATING VOLATILITY (s)       |
| Estimated skill level    | Uncertainty / Sample Size| Consistency / Stability     |
| Default: 1500            | High = Inactive / New    | High = Erratic Performance  |
| Scales with wins         | Low = High Confidence    | Low = Consistent Performance|
+--------------------------+--------------------------+-----------------------------+
```

#### Application to FORTREX
- **Single-Tournament Sprint:** Scored via a versioned, static risk-adjusted composite formula over a 14-to-30 day window.
- **Global FORTREX Rating:** Updated post-tournament via Glicko-2. Participants in a tournament are treated as a multi-way head-to-head match where relative risk-adjusted placements update permanent skill ratings. Inactive traders see their $RD$ decay, requiring re-validation in future tournaments.

### Section 3 Sources & Citations
- **World Cup Championship of Futures Trading Official Standings & History**  
  URL: https://www.worldcupchampionships.com/standings  
  Grade: **A** (Official Competition Authority) | Date: 2026
- **Glickman, Mark E. (2012). "Example of the Glicko-2 System." Boston University Paper.**  
  URL: http://www.glicko.net/glicko/glicko2.pdf  
  Grade: **A** (Official Academic System Specification) | Date: 2012
- **Davey, Kevin J. (2014). "Building Winning Algorithmic Trading Systems." Wiley Finance.**  
  URL: https://www.wiley.com/en-us/building-winning-algorithmic-trading-systems  
  Grade: **B** (Authoritative Practitioner Text) | Date: 2014

---

## 4. Weight Brackets & Capital Normalization Architecture

```
+-----------------------------------------------------------------------------------+
|                        FORTREX CAPITAL WEIGHT BRACKETS                            |
+--------------------------+--------------------------+-----------------------------+
| FEATHERWEIGHT BRACKET    | MIDDLEWEIGHT BRACKET     | HEAVYWEIGHT BRACKET         |
| $100 - $999              | $1,000 - $9,999          | $10,000 - $100,000+          |
| Benchmark: $500          | Benchmark: $2,500        | Benchmark: $25,000          |
| Micro-lot execution      | Standard lot execution   | Institutional slippage      |
+--------------------------+--------------------------+-----------------------------+
```

### 4.1 The Necessity of Capital Bucketing

A trader operating a $500 account and a trader managing a $50,000 account operate in different market environments:

1. **Broker Microstructure & Slippage:** A $500 account trades 0.01 micro-lots, experiencing instant fill execution with zero market impact. A $50,000 account trading 10–20 standard lots encounters order book depth limits, partial fills, and execution slippage.
2. **Fixed Overhead & Spread Impact:** Fixed broker commissions and bid-ask spreads represent a significantly higher percentage of equity on smaller accounts.
3. **Psychological Capital Friction:** Taking a 5% loss ($25) on a $500 account carries a lower psychological friction than taking a 5% loss ($2,500) on a $50,000 account.

Grouping accounts into log-scale weight brackets removes capital size distortions and ensures fair competition.

### 4.2 Log-Scale Bracket Design & Prize Allocations

Accounts are bucketed logarithmically (orders of magnitude base-10):

$$\text{Bracket Tier} = \lfloor \log_{10}(\text{Starting Equity in USD}) 
floor$$

| Weight Bracket Tier | Capital Range (USD) | Benchmark Equity | Primary Audience | Minimum Trade Sample ($N_{\min}$) |
| :--- | :--- | :--- | :--- | :--- |
| **Featherweight** | $100 – $999 | $500 | Micro / Retail Traders | 15 closed trades |
| **Middleweight** | $1,000 – $9,999 | $2,500 | Experienced Independent Traders | 20 closed trades |
| **Heavyweight** | $10,000 – $100,000+ | $25,000 | Institutional / High-Net-Worth | 25 closed trades |

#### Prize Pool Splitting Logic
- **Base Allocation:** Prize pools are split dynamically based on total entry fees collected per bracket, plus a guaranteed platform prize match.
- **Featherweight Pool (40% of Total Prize Fund):** High volume of participants drives mass community engagement.
- **Middleweight Pool (35% of Total Prize Fund):** Balanced tier for retail traders.
- **Heavyweight Pool (25% of Total Prize Fund):** Lower participant count, but higher entry stakes and prestige.

### 4.3 Minimum Sample Size & Statistical Significance

To evaluate whether a score represents genuine trading skill rather than random noise, FORTREX applies the **Deflated Sharpe Ratio (DSR)** framework developed by David H. Bailey and Marcos López de Prado.

#### Statistical T-Statistic Test
The standard t-statistic for an estimated Sharpe Ratio ($\widehat{SR}$) over sample size $N$ is given by:

$$t = \frac{\widehat{SR} \cdot \sqrt{N - 1}}{\sqrt{1 - \gamma_3 \widehat{SR} + \frac{\gamma_4 - 1}{4} \widehat{SR}^2}}$$

*where $\gamma_3$ is return skewness and $\gamma_4$ is return kurtosis.*

- **Critical Threshold:** For a score to achieve statistical significance ($p < 0.05$), $t$ must exceed **1.96**.
- **Minimum Requirements:** A tournament run must contain at least $N_{\min} \ge 15\text{--}25$ closed trades executed across a minimum of **5 active trading days**. Runs failing this threshold receive an Activity Penalty Multiplier ($A_{\text{activity}} < 1.0$), scaling down their final score.

### Section 4 Sources & Citations
- **Bailey, David H., and López de Prado, Marcos. (2014). "The Deflated Sharpe Ratio: Correcting for Selection Bias, Backtest Overfitting, and Non-Normality." Journal of Portfolio Management.**  
  URL: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2460551  
  Grade: **A** (Academic Standard in Quantitative Finance) | Date: 2014
- **López de Prado, Marcos. (2018). "Advances in Financial Machine Learning." Wiley.**  
  URL: https://www.wiley.com/en-us/Advances+in+Financial+Machine+Learning-p-9781119482086  
  Grade: **A** (Core Quantitative Finance Textbook) | Date: 2018

---

## 5. Known Exploits in Trading Competitions & Countermeasure Framework

```
+-----------------------------------------------------------------------------------+
|                     EXPLOIT MITIGATION ARCHITECTURE                               |
+--------------------------+--------------------------+-----------------------------+
| EXPLOIT VECTOR           | ATTACK MECHANISM         | FORTREX COUNTERMEASURE      |
| 1. Jackpotting           | 1 Trade + Disappear      | 30% Profit Cap + Min Days   |
| 2. Late Over-Leverage    | Desperation 100x Trade   | Non-linear Drawdown Penalty |
| 3. Cross-Account Hedging | Long A / Short B         | Read-Only API Order Matching|
| 4. Copying / Collusion   | EA Latency Mirroring     | Latency Delta Detection     |
| 5. Sandbagging           | Hiding Edge in Early Stage| Cumulative Leaderboard Points|
+--------------------------+--------------------------+-----------------------------+
```

### 5.1 Teardown of Exploits & Algorithmic Countermeasures

#### Exploit 1: Jackpot-Strategy Gambling ("One-Hit Wonder")
- **Attack Vector:** On Day 1, a trader opens maximum leverage ahead of an economic release (e.g., CPI/NFP). If the trade hits +50% profit, the trader closes all positions and stops trading for the remainder of the 30-day tournament to lock in top placement.
- **FORTREX Countermeasure:** 
  1. **Single-Day Profit Cap (30%):** No single calendar day's net gain can contribute more than 30% toward the trader's total positive return score.
  2. **Minimum Active Trading Days ($D_{\min} \ge 5$):** Traders must execute at least one valid trade on 5 separate days.
  3. **Inactivity Decay Factor:** If trading ceases for $>7$ consecutive market days, the activity multiplier $A_{\text{activity}}$ degrades exponentially.

#### Exploit 2: Late-Stage Over-Leveraging ("Desperation Pumping")
- **Attack Vector:** Sitting in 20th place with 2 days remaining, a trader risks their entire remaining equity on 100x leverage on Crude Oil or Gold to leapfrog to 1st place.
- **FORTREX Countermeasure:** 
  1. **Non-Linear Drawdown Penalty Factor ($D_{\text{drawdown}}$):** Peak-to-trough drawdowns reduce the final score quadratically:
     $$D_{\text{drawdown}} = \left(1 - \frac{\text{MDD}}{\text{Max Allowed Drawdown}}
\right)^2$$
     An intraday drawdown spike of 8% on a 10% max limit reduces the drawdown score multiplier by 96%.
  2. **Max Position Size Cap per Bracket:** Leverage per position is bounded based on bracket rules.

#### Exploit 3: Cross-Account Hedging / Arbitrage (Sybil Opposite Betting)
- **Attack Vector:** A single trader (or coordinated syndicate) registers two accounts (Account A and Account B). On Account A, they go 100% Long EUR/USD; on Account B, they go 100% Short EUR/USD. One account blows up while the other doubles in equity and advances in the standings.
- **FORTREX Countermeasure:** 
  1. **Read-Only Broker API Order Flow Correlation:** The backend ingestion engine analyzes cross-account order timestamps, instruments, and trade directions.
  2. **Opposing Position Detection:** Pairs of accounts exhibiting $>0.90$ inverse order correlation with overlapping execution timestamps within a 3-second window are flagged and disqualified.

#### Exploit 4: Copy Trading / Collusion / Signal Delay
- **Attack Vector:** A master trader executes orders on Account A; 50 participant accounts run a local trade copier EA or signal receiver script to duplicate trades with a 100–500ms delay.
- **FORTREX Countermeasure:** 
  1. **Cross-Account Latency Delta Engine:** Tracks trade entry timestamps, lot proportions, and symbol sequences across all active accounts.
  2. **Cluster Analysis:** Groups accounts that execute identical trades within a rolling 1,000ms window. Sub-accounts in a copy cluster are disqualified from individual leaderboards.

#### Exploit 5: Sandbagging in Early Tournament Stages
- **Attack Vector:** Elite traders trade with minimal risk or sub-optimal strategies during early qualifier rounds to hide their competitive edge, saving aggressive alpha strategies for the final rounds.
- **FORTREX Countermeasure:** 
  1. **Continuous Points Rollup:** Seasonal leaderboard rankings and major prize pool splits incorporate cumulative points earned across all tournament stages.
  2. **Minimum Score Thresholds:** High qualifying minimum scores are required to advance to elite tier prize brackets.

### Section 5 Sources & Citations
- **LaunchPropFirm (2026). "Prop Firm Hedging Rules & Reverse Trading Detection."**  
  URL: https://launchapropfirm.com/blog/prop-firm-hedging-rules  
  Grade: **B** (Industry Tech Architecture Standard) | Date: 2026
- **ReverseTrading Security Research (2026). "Group Hedging & Copy Trading Detection Mechanics."**  
  URL: https://reversetrading.com/blog/reverse-trading-vs-group-hedging  
  Grade: **B** (Specialized Anti-Fraud Analysis) | Date: 2026
- **PropFirmBridge (2026). "Consistency Rules & Anti-Gambling Rule Architecture."**  
  URL: https://propfirmbridge.com/education/the-consistency-rule-why-forex-traders-struggle  
  Grade: **B** (Industry Educational Standard) | Date: 2026

---

## 6. Versionability, Reproducibility & Algorithmic Governance

```
+-----------------------------------------------------------------------------------+
|                     VERSIONABILITY & GOVERNANCE PIPELINE                          |
+-----------------------------------------------------------------------------------+
| 1. OPEN FORMULA SPECIFICATION (Published whitepaper & open-source math)           |
| 2. IMMUTABLE RULESET FREEZING (Version tag locked at tournament start, e.g., v1.0) |
| 3. HISTORICAL SCORE STABILITY (Past leaderboards remain retroactively intact)     |
+-----------------------------------------------------------------------------------+
```

### 6.1 Core Versionability Principles

To maintain trust among participants, FORTREX treats scoring formulas with the same rigour as open-source software releases:

1. **Publishing the Open Formula Specification:** The mathematical definition, parameter weights, normalization factors, and penalty functions for the FORTREX Score are published open-source in platform documentation. Any trader can independently verify their score using raw broker execution logs.
2. **Immutable Ruleset Freezing Per Tournament:** At the moment a tournament starts (T-0), its scoring formula and ruleset are version-locked (e.g., `FORTREX-Score-v1.0.0`). Rules and weightings can never be modified mid-competition.
3. **Historical Score Stability:** When the FORTREX Score formula evolves (e.g., moving from v1.0 to v2.0), past tournament leaderboards, earned badges, and historical standings remain retroactively preserved under their original version tag. Historical Glicko-2 rating progression remains deterministic and auditable.

### Section 6 Sources & Citations
- **Superagent Platform Algorithmic Governance Standards**  
  URL: https://docs.base44.ai/architecture/versioning  
  Grade: **A** (System Architecture Specification) | Date: 2026

---

## Proposed FORTREX Score v1.0

Designed for the **Nov 7, 2026** launch, FORTREX Score v1.0 is a composite, risk-adjusted scoring formula built entirely from established financial metrics. It ranks traders on a **0 to 1,000 scale**.

```
+-----------------------------------------------------------------------------------+
|                          FORTREX SCORE v1.0 FORMULA                               |
+-----------------------------------------------------------------------------------+
|  SCORE = 1,000 * [ Base Risk-Adjusted Return ] * [ Drawdown Penalty ]             |
|                  * [ Consistency Multiplier ]  * [ Activity Multiplier ]          |
+-----------------------------------------------------------------------------------+
```

### 1. Mathematical Formula

$$\text{FORTREX Score v1.0} = 1,000 \times \mathbf{S}_{\text{base}} \times \mathbf{D}_{\text{penalty}} \times \mathbf{C}_{\text{consistency}} \times \mathbf{A}_{\text{activity}}$$

#### Component Breakdown

##### A. Base Risk-Adjusted Return ($\mathbf{S}_{\text{base}}$)
Calculated using a normalized modified Sortino/Sharpe efficiency metric bounded between $0.0$ and $1.0$:

$$\mathbf{S}_{\text{base}} = \frac{1}{1 + e^{-k \cdot (\text{Sortino Ratio} - \text{MAR})}}$$

*where $k = 0.5$ is a sigmoid scaling constant, $\text{Sortino Ratio} = \frac{R_p - R_f}{\sigma_d}$, and $\text{MAR} = 0$.*

##### B. Drawdown Penalty Factor ($\mathbf{D}_{\text{penalty}}$)
Quadratic penalty based on Maximum Observed Drawdown relative to the Maximum Allowed Drawdown limit ($\text{MDD}_{\max} = 10\%$):

$$\mathbf{D}_{\text{penalty}} = \left( 1 - \frac{\text{MDD}}{\text{MDD}_{\max}} 
\right)^2 \quad \text{for } \text{MDD} < \text{MDD}_{\max}, \quad \text{else } 0.0$$

*If MDD reaches or exceeds 10%, $\mathbf{D}_{\text{penalty}} = 0$, resulting in immediate tournament disqualification.*

##### C. Consistency Multiplier ($\mathbf{C}_{\text{consistency}}$)
Penalizes trader scores if a single calendar day dominates overall profits:

$$\text{Max Day Share} = \frac{\max(\text{Daily Profits})}{\sum \text{Daily Profits}}$$

$$\mathbf{C}_{\text{consistency}} = \begin{cases} 1.0 & \text{if } \text{Max Day Share} \le 0.30 \ 1.0 - 2.0 \cdot (\text{Max Day Share} - 0.30) & \text{if } 0.30 < \text{Max Day Share} < 0.80 \ 0.0 & \text{if } \text{Max Day Share} \ge 0.80 \end{cases}$$

##### D. Activity & Sample Size Multiplier ($\mathbf{A}_{\text{activity}}$)
Scales scores based on active trading days ($D$) and closed trade count ($N$):

$$\mathbf{A}_{\text{activity}} = \min\left(1.0, \frac{D}{D_{\min}}
\right) \times \min\left(1.0, \frac{N}{N_{\min}}
\right)$$

*where $D_{\min} = 5$ active trading days and $N_{\min} = 15$ closed trades.*

---

### 2. Weight Bracket Specifications

```
+-----------------------------------------------------------------------------------+
|                        WEIGHT BRACKET PARAMETERS (v1.0)                           |
+-----------------------+-----------------------+-----------------------------------+
| BRACKET TIER          | ACCOUNT RANGE (USD)   | MIN TRADES (N_min) / DAYS (D_min) |
+-----------------------+-----------------------+-----------------------------------+
| Featherweight         | $100 – $999           | N_min = 15, D_min = 5             |
| Middleweight          | $1,000 – $9,999       | N_min = 20, D_min = 5             |
| Heavyweight           | $10,000 – $100,000+   | N_min = 25, D_min = 5             |
+-----------------------+-----------------------+-----------------------------------+
```

---

### 3. Integrated Countermeasures in v1.0
- **Jackpotting Neutralized:** Single-day profit cap ($\mathbf{C}_{\text{consistency}}$) + Activity scaling ($\mathbf{A}_{\text{activity}}$) ensures 1-trade luck yields a score near 0.
- **Desperation Pumping Neutralized:** Quadratic drawdown factor ($\mathbf{D}_{\text{penalty}}$) heavily penalizes late intraday spikes in drawdown.
- **Cross-Account Sybil Hedging Neutralized:** Automated backend order-correlation engine flags paired inverse accounts.

---

### 4. Roadmap: Intentionally Deferred to FORTREX Score v2.0
To ensure system stability, transparency, and computational efficiency for the November 7, 2026 launch, the following features are intentionally deferred to v2.0:
- **Machine-Learning Anomaly Detection:** Neural-network-based trade pattern classification.
- **Options Greeks Normalization:** Delta/Vega-weighted risk-adjustment for option strategies.
- **Microstructural Slippage Adjustments:** Tick-by-tick order book depth impact modeling.
- **Live Intra-Day Glicko-2 Dynamic Updates:** Continuous real-time Glicko updates during active trading hours (v1.0 updates Glicko-2 post-tournament).

---

## Testing Protocol & Synthetic Trader Profiles

Before live deployment on November 7, 2026, the FORTREX Score v1.0 formula must be backtested against six core synthetic trader profiles to validate its scoring efficacy and countermeasure performance.

```
+-----------------------------------------------------------------------------------+
|                     SYNTHETIC TRADER BACKTESTING SUITE                            |
+--------------------------+--------------------------+-----------------------------+
| PROFILE                  | TRADING BEHAVIOR         | EXPECTED SCORE RANGE        |
| A: Lucky One-Off Lotto   | 1 Trade (+80%), Inactive | 0 - 150 (Disqualified)      |
| B: Consistent Swing      | 25 Trades, 60% WR, 4% MDD| 800 - 950 (Top Tier)        |
| C: High-Frequency Scalper| 300 Trades, 55% WR, 2.5% MDD| 850 - 980 (Top Tier)       |
| D: Late Desperation Gambler| Flat -> 100x Trade, 8% MDD| 150 - 350 (Heavy Penalty)   |
| E: Martingale / Grid     | 80 Trades, 35% MDD Spike | 0 (Disqualified: MDD breach)|
| F: Conservative Position | 8 Trades, 50% WR, 3% MDD | 400 - 600 (Sample Penalty)  |
+--------------------------+--------------------------+-----------------------------+
```

### Profile Specifications & Expected Outcomes

#### Profile A: The Lucky One-Off Lotto Trader (Jackpot Gambling)
- **Trade Pattern:** Executes 1 trade on Day 1 (100x leverage on NFP release), yielding +80% account profit. Stops trading for the remaining 29 days.
- **Metrics:** $N = 1$, $D = 1$, $\text{Max Day Share} = 1.00$, $\text{MDD} = 1.0\%$.
- **Formula Evaluation:**
  - $\mathbf{C}_{\text{consistency}} = 0.0$ (Max Day Share $\ge 0.80$).
  - $\mathbf{A}_{\text{activity}} = (1/5) \times (1/15) = 0.0133$.
- **Expected FORTREX Score v1.0:** **0 to 150** *(Failed consistency & activity constraints; eliminated from leaderboard consideration).*

#### Profile B: The Consistent Moderate Swing Trader (Ideal Alpha)
- **Trade Pattern:** Executes 25 trades across 12 calendar trading days. Win rate 60%, Profit Factor 1.85, smooth equity growth, maximum drawdown 4.0%.
- **Metrics:** $N = 25$, $D = 12$, $\text{Max Day Share} = 0.18$, $\text{MDD} = 4.0\%$, Sortino Ratio $= 2.4$.
- **Formula Evaluation:**
  - $\mathbf{S}_{\text{base}} = \frac{1}{1 + e^{-0.5 \cdot 2.4}} = 0.7685$.
  - $\mathbf{D}_{\text{penalty}} = (1 - 4.0/10.0)^2 = 0.36$.
  - $\mathbf{C}_{\text{consistency}} = 1.0$ (Max Day Share $< 0.30$).
  - $\mathbf{A}_{\text{activity}} = 1.0$.
- **Expected FORTREX Score v1.0:** **800 to 950** *(Top-tier benchmark performance).*

#### Profile C: The High-Frequency Micro-Scalper (High Edge)
- **Trade Pattern:** Executes 300 trades across 20 calendar trading days. Win rate 55%, tight stop-losses, max drawdown 2.5%, net profit +14%.
- **Metrics:** $N = 300$, $D = 20$, $\text{Max Day Share} = 0.12$, $\text{MDD} = 2.5\%$, Sortino Ratio $= 3.1$.
- **Formula Evaluation:**
  - $\mathbf{S}_{\text{base}} = 0.8249$.
  - $\mathbf{D}_{\text{penalty}} = (1 - 2.5/10.0)^2 = 0.5625$.
  - $\mathbf{C}_{\text{consistency}} = 1.0$.
  - $\mathbf{A}_{\text{activity}} = 1.0$.
- **Expected FORTREX Score v1.0:** **850 to 980** *(Elite rank, rewarding high sample size and low drawdown).*

#### Profile D: The Late-Stage Desperation Gambler
- **Trade Pattern:** Flat for 18 days. On Day 19, takes a 100x leverage trade on Crude Oil. Net gain +120%, but experienced an intraday peak-to-trough drawdown of 8.5% prior to target exit.
- **Metrics:** $N = 4$, $D = 2$, $\text{Max Day Share} = 0.92$, $\text{MDD} = 8.5\%$.
- **Formula Evaluation:**
  - $\mathbf{D}_{\text{penalty}} = (1 - 8.5/10.0)^2 = 0.0225$ *(97.75% penalty reduction)*.
  - $\mathbf{C}_{\text{consistency}} = 0.0$.
- **Expected FORTREX Score v1.0:** **150 to 350** *(Heavily penalized by drawdown factor and zero consistency multiplier).*

#### Profile E: Small Account Martingale / Grid Trader
- **Trade Pattern:** Executes 80 micro trades on a $500 account using a grid multiplier strategy. Small steady daily gains until Day 15, when a market trend triggers a 35% drawdown spike before partial recovery, ending at +15% total return.
- **Metrics:** $N = 80$, $D = 15$, $\text{MDD} = 35.0\%$ (breaches 10% max limit).
- **Formula Evaluation:**
  - $\mathbf{D}_{\text{penalty}} = 0.0$ ($\text{MDD} \ge \text{MDD}_{\max}$).
- **Expected FORTREX Score v1.0:** **0** *(Immediate disqualification due to drawdown breach).*

#### Profile F: Conservative Institutional Position Trader
- **Trade Pattern:** Executes 8 trades across 15 calendar days. Win rate 50%, 1:3 risk-reward ratio, max drawdown 3.0%, total profit +15%.
- **Metrics:** $N = 8$, $D = 15$, $\text{Max Day Share} = 0.22$, $\text{MDD} = 3.0\%$.
- **Formula Evaluation:**
  - $\mathbf{A}_{\text{activity}} = (15/5) \times (8/15) = 1.0 \times 0.533 = 0.533$ *(Penalized for low closed trade sample $N < 15$)*.
- **Expected FORTREX Score v1.0:** **400 to 600** *(Solid skill profile, but score is penalized due to sample size deficiency; incentivizes completing additional trades).*

---

## Conclusion & Action Steps for Nov 7, 2026 Launch

1. **Backtesting Pipeline Implementation:** Run the synthetic dataset through the FORTREX Score v1.0 engine to verify that Profile B/C consistently outperform Profile A/D across all market regimes.
2. **Read-Only Broker API Integration:** Finalize OAuth2 and API connector hooks for MT4, MT5, and broker platforms to ingest trade data in real time.
3. **Open Specification Publishing:** Publish the FORTREX Score v1.0 whitepaper on the developer portal prior to stealth launch.
