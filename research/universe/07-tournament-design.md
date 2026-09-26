# FORTREX Research: Cross-Industry Tournament Design & Prize Economics

> **Document ID:** `07-tournament-design`  
> **Target Path:** `fortrex-command-center-git/research/universe/07-tournament-design.md`  
> **Classification:** Strategic Research & Tournament Economics Analysis  
> **Context Date:** September 26, 2026 | **Target Launch:** November 7, 2026 (Genesis Launch: 10,000 Founding Seats)  
> **Brand Identity:** Non-Custodial Skill-Based Trading Tournament Platform  
> **Evidence Grading:**  
> - **Grade A:** Primary / Official (Official platform rulebooks, Supreme Court judgments, statutory acts, platform TOS)  
> - **Grade B:** Credible Secondary (Established industry publications, Legal500, TaxGuru, Liquipedia, PokerNews, Economic Times)  
> - **Grade C:** Community Evidence (Esports forums, Reddit r/poker, r/IndianGaming, trader blogs)  
> - **Grade D:** Analytical Deduction / Extrapolations  

---

## Executive Summary

*Plain-Language Briefing for Non-Technical Founders & Strategic Leadership:*

1. **Tournament Structures Must Balance Skill Resolution and Friction:** Single Elimination works for fast-paced viral elimination cups, but Swiss System and Leaderboard/Ladder formats are essential for trading. Swiss and duration-based Leaderboards eliminate early bad-luck elimination, ensuring skill dominates over short-term noise.
2. **Poker MTTs Provide the Operational Blueprint for Fee-Based Contests:** Multi-Table Tournaments (MTTs) cleanly split player contributions into Buy-in (Prize Pool) + Rake (Platform Fee). To avoid balance-sheet ruin, initial guaranteed prize pools (GTDs) must be protected with minimum field size thresholds and satellite entry pipelines to mitigate overlay risk.
3. **India's Supreme Court Strictly Protects "Games of Skill":** Established precedents (*K.R. Lakshmanan*, *Varun Gumber/Dream11*, *Gurdeep Singh Sachar*, *Avinash Mehrotra*) confirm that contests where skill overwhelmingly predominates over chance are protected under Article 19(1)(g) of the Indian Constitution. However, real-money gaming (RMG) remains completely banned in specific states (Telangana, Assam, Odisha, Andhra Pradesh).
4. **The 28% GST Impact Forces Rake Transparency & Non-Custodial Innovation:** Following India's October 2023 taxation shift levying 28% GST on full entry deposits, legacy RMG platforms lost up to 80% of operating margins. FORTREX's non-custodial model—where capital stays at the user's broker and FORTREX monetizes platform access fees, broker IB/CPA revenue, and sponsor pools—provides a legally resilient arbitrage against capital-custody GST traps.
5. **Mid-Tournament Outage Policies Require Automated Standard Operating Procedures (SOPs):** Borrowing from PokerStars and GGPoker, FORTREX must implement automated **Rollback** (100% refund of fees/rake if cancelled prior to the payout zone) and **Roll Forward** (guaranteed mini-cash + remaining pool split proportional to account equity/performance if cancelled mid-contest).
6. **Retention Depends on Capital-Weighted Brackets & Engagement Engines:** Raw percentage return favors reckless micro-accounts taking 100x leverage. FORTREX must deploy **Capital-Weighted Brackets** (e.g., $500–$2,500 vs $25,000+) and risk-adjusted scoring (Sharpe/Sortino ratios with drawdown penalties). Retention for mid-tier players requires Battle Passes, Season XP, Elo/Glicko-2 ratings, and secondary accolades.
7. **The Legal Gate Requires Strict Guardrails:** In-game rebuys, mid-tournament add-ons, player-to-player side bets, and staking/backing arrangements carry extreme legal risk of being classified as "money games" or "wagering" under India's PROG Act 2025. All paid mechanics must remain strictly gated, fixed-entry, and vetted by legal counsel.

---

## 1. E-Sports Tournament Formats & Competitive Mechanics

### Overview & Format Comparison Matrix

Selecting the correct tournament format dictates participant engagement, operational complexity, ranking accuracy, and broadcast/viewer appeal. Trading competitions differ from traditional head-to-head esports because thousands of participants compete concurrently in the same market environment rather than in isolated 1v1 or 5v5 matches.

| Tournament Format | Description & Mechanics | Best Use Case in Trading | Operational Complexity | Viewer Appeal | Ranking Fairness vs Match Count | Walkover / Drop Handling |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Single Elimination** | Knockout bracket; lose once and you are eliminated. | Fast 1v1 / 8-trader Sprint Cups; viral daily knockouts. | Low (O(N) match resolution). | Very High (High stakes, clear drama). | Low (High variance; bad trade early eliminates top trader). | Automatic bye awarded to opponent. |
| **Double Elimination** | Winners & Losers brackets; requires 2 losses to be eliminated. | Major Championship Bracket stages (Top 16 / Top 32 finals). | Medium (Requires managing loser bracket scheduling). | High (Great comeback narratives). | High (Reduces fluke eliminations significantly). | Opponent advances in bracket; loser drops to lower bracket. |
| **Swiss System** | Fixed rounds; players matched against opponents with identical win-loss records. No early elimination. | Qualifying rounds; Genesis 10k Founding Seats tournament. | Medium-High (Requires real-time score matching engine). | Medium (Requires background narrative tracking). | Very High (Accurately ranks full field across 3-5 rounds). | Bye assigned to lowest-seeded odd player; inactive traders get 0 pts. |
| **Leaderboard / Ladder** | Open field competing over a set time window (e.g., 24h, 1 week, 1 month). | Core FORTREX daily/weekly/monthly trading leagues. | Low (Asynchronous score ingestion via API). | High (Live leaderboard flipping in closing hours). | High (Large trade sample sizes diminish pure luck). | Inactive accounts record 0% return; no match stalling. |
| **Round Robin / Leagues** | Every participant plays every other participant in the group. | Elite Premier League (Top 10-12 Masters traders over a split). | High (Strict scheduling and fixed match cadence). | High for dedicated fans, lower for casuals. | Absolute Maximum (Complete head-to-head matrix). | Forfeit recorded as 0-3 loss / -10% equity penalty. |
| **Seasons & Qualifiers** | Multi-week progression: Open Qualifiers -> Regional Splits -> Grand Finals. | Annual FORTREX World Championship Series (FWCS). | Very High (Requires seasonal points, decaying Elo, promotion/relegation). | Peak (Builds long-term story arcs and rivalries). | Peak (Filters true skill across multiple market regimes). | Disqualified players replaced by next highest qualifier. |

### Deep-Dive Analysis of Formats

#### A. Single Elimination (Knockout)
* **Mechanics:** $N$ players mapped to a binary tree. Standard size: $2^k$ (8, 16, 32, 64, 128). Total matches = $N - 1$.
* **Strengths:** Simple to understand, minimal total matches, instant stakes.
* **Weaknesses:** High variance. A single bad fill or sudden market spike can knock out a superior trader. 50% of the participant base leaves after Round 1.
* **Esports Benchmarking:** Used in the final playoff brackets of Tennis Grand Slams, FIFA World Cup knockout stages, and early League of Legends World Championship knockouts.
* **FORTREX Application:** Ideal for 1-hour or 1-day "Flash Duels" (e.g., 8-trader bracket competing during US Market Open NFP release).

#### B. Double Elimination
* **Mechanics:** Bracket split into Upper (Winners) and Lower (Losers). A player losing in Upper drops to Lower. A player losing in Lower is eliminated. Grand Final features Winner of Upper vs Winner of Lower (Lower bracket winner must "reset the bracket" by winning two series).
* **Strengths:** Eliminates fluke losses. The best traders consistently reach the finals.
* **Weaknesses:** Requires 2x matches ($2N - 2$), complex scheduling, potential fatigue for lower-bracket runners.
* **Esports Benchmarking:** The International (Dota 2), Evolution Championship Series (EVO Fighting Games), Rocket League Championship Series (RLCS). *(URL: https://liquipedia.net/dota2/The_International | Grade B | 2025)*
* **FORTREX Application:** Recommended for Season Zero Finals (Top 16 finalists from the 10,000 founding seats competing in a 3-day double elimination showdown).

#### C. Swiss-System Tournament
* **Mechanics:** Non-eliminating format over $R$ rounds (typically $\log_2 N$). Players are paired against opponents with the same cumulative score (e.g., 2-0 vs 2-0, 0-2 vs 0-2). Tournament finishes when players reach a set win threshold (e.g., 3 wins to advance) or loss threshold (e.g., 3 losses to drop).
* **Strengths:** Every player gets to play multiple rounds regardless of early results. Prevents premature exit while guaranteeing high-skill matchups in later rounds.
* **Weaknesses:** Complex pairing algorithms (avoiding rematching opponents), ties require tie-break calculations (Buchholz system or Sonneborn-Berger).
* **Esports Benchmarking:** Valve Counter-Strike 2 Major Championship Swiss Stage (16 teams, 5 rounds, 3 wins to qualify for Champions Stage, 3 losses eliminated). *(URL: https://pro.eslgaming.com/csgo/proleague/ | Grade A | 2025)*
* **FORTREX Application:** Crucial for FORTREX Open Qualifiers where thousands of traders compete without instant drop-out, ensuring maximum engagement over a 5-day trading week.

#### D. Duration-Based Asynchronous Leaderboard (The Trading Standard)
* **Mechanics:** Open field, concurrent competition. Traders connect broker read-only APIs. Trading activity is tracked over a specified window (e.g., 24 Hours, 1 Week, 1 Month). Performance is ranked via a composite score matrix (e.g., Risk-Adjusted Return, Drawdown-Adjusted PnL).
* **Strengths:** Zero operational match-making friction; scalable from 10 to 100,000 participants concurrently. Accommodates all global timezones.
* **Weaknesses:** Vulnerable to tail-risk gambling in final hours if unconstrained by risk limits.
* **FORTREX Application:** Core engine for Daily Sprints, Weekly Leagues, and Monthly Masters.

---

## 2. Poker Tournament Economics & Prize Mechanics

Poker's Multi-Table Tournament (MTT) model is the closest financial and structural analog for skill-based trading competitions. Both involve variable fields, entry fee decomposition, risk management, and structured prize distribution curves.

```
+----------------------------------------------------------------------------------+
|                          POKER MTT ENTRY FEE DECOMPOSITION                       |
+----------------------------------------------------------------------------------+
|  Total Participant Payment: $110.00                                              |
|  +-------------------------------------+---------------------------------------+ |
|  | Buy-In / Prize Pool Portion: $100.00 | Platform Rake / Fee Portion: $10.00   | |
|  | (100% pooled into guaranteed payout)| (Covers overhead, server, net profit) | |
|  +-------------------------------------+---------------------------------------+ |
+----------------------------------------------------------------------------------+
```

### Key Economic Principles of Poker MTTs

#### A. Entry Fee Decomposition (Buy-in + Platform Rake)
In professional poker, tournament entries are explicitly denoted as `$X + $Y`:
* **$X (Buy-in):** Direct contribution to the Prize Pool. 100% of this money is returned to winning participants.
* **$Y (Rake / House Fee):** Platform fee for hosting, server maintenance, integrity verification, and operator margin.
* *Standard Rake Percentages:*
  * Micro/Low Stakes ($1 to $20 entry): 10% to 15% rake.
  * Mid Stakes ($50 to $215 entry): 8% to 10% rake.
  * High Stakes ($500+ entry): 5% to 7% rake.
  * Hyper-Turbo / Short Duration: 3% to 5% rake (lower margins compensated by rapid volume velocity).

#### B. Guaranteed Prize Pools (GTD) vs Variable Pools & Overlay Risk
* **Guaranteed Prize Pool (GTD):** The platform guarantees a minimum total prize pool (e.g., "$100,000 GTD"), regardless of how many entrants register.
* **Overlay Risk:** If the total buy-in fees collected fall short of the guaranteed amount, the platform must pay the difference out of its own balance sheet.
  $$	ext{Overlay Amount} = 	ext{Guaranteed Prize Pool} - (	ext{Number of Entrants} 	imes 	ext{Buy-In Portion})$$
  *Example:* A $10,000 GTD tournament with a $100 buy-in requires 100 entrants to cover. If only 70 traders enter ($7,000 collected), the platform suffers a **$3,000 Overlay Loss**.
* **Overlay Mitigation Strategies:**
  1. **Minimum Participant Thresholds:** Rule stating the tournament is cancelled or converted to non-GTD if minimum entries are not reached 15 minutes before start.
  2. **Satellite & Qualifier Feeder Pipelines:** Running low-cost qualifiers that award entry tickets into the target GTD event.
  3. **Late Registration Windows:** Allowing entries during the first 1-2 hours of trading, subject to account leverage constraints.

#### C. Payout Distribution Curves: Top-Heavy vs Flat Payouts

```
+----------------------------------------------------------------------------------+
|                     PAYOUT DISTRIBUTION CURVE COMPARISON                         |
+----------------------------------------------------------------------------------+
| Percentile ITM | Top-Heavy Curve (% Pool)   | Flat / Retention Curve (% Pool)   |
+----------------+----------------------------+-----------------------------------+
| 1st Place      | 25.0% - 30.0%              | 12.0% - 15.0%                     |
| 2nd Place      | 15.0% - 18.0%              | 8.0% - 10.0%                      |
| 3rd Place      | 10.0% - 12.0%              | 6.0% - 7.5%                       |
| 4th - 10th     | 15.0% cumulative           | 18.0% cumulative                  |
| 11th - 100th   | 25.0% cumulative (Top 10%) | 31.0% cumulative (Top 15-20%)     |
| 101st - 200th  | 0.0% (No cash)             | 25.0% cumulative (Mini-cash 1.5x) |
| In The Money % | 10% - 12% of Total Field   | 20% - 25% of Total Field          |
+----------------+----------------------------+-----------------------------------+
```

1. **Top-Heavy Structure (WSOP Main Event Style):**
   * *Characteristics:* 1st place receives 25-30% of the pool; top 3 take >50%. Only 10-12% of the field enters the money (ITM).
   * *Pros:* Enormous marketing headline numbers ("$100,000 First Prize!"). Attracts dream-seeking casuals.
   * *Cons:* Extreme financial variance for grinders. 88-90% of field leaves empty-handed, accelerating churn.
2. **Flat / Retention Structure (Grinder / Commercial Style):**
   * *Characteristics:* 1st place receives 12-15%. Top 20-25% of the field earns a payout ("In The Money"). Lowest payouts award 1.2x to 1.5x the entry fee ("mini-cash").
   * *Pros:* High retention. Traders cash frequently, recycling payouts into subsequent tournament entry fees.
   * *Cons:* Smaller headline top prize; less viral marketing appeal.
3. **Satellite / Qualifier Structures (100% Flat Seat Allocation):**
   * *Characteristics:* No scale ladder. Every winner in the top $K$ percentile receives an identical reward: a ticket to a higher-tier tournament.
   * *Example:* $10 entry satellite for a $100 tournament. Top 10% of field each win a $100 ticket; 11th place gets $0.

#### D. Industry Benchmarking: Platform Standards
* **PokerStars:** Standard MTT payout curves pay 12% to 18% of the field. Uses Independent Chip Model (ICM) for final table chop/deal evaluations. *(URL: https://www.pokerstars.com/poker/tournaments/rules/ | Grade A | 2026)*
* **GGPoker:** Innovated "Flip & Go" and "Staking Features" inside the client. Runs guaranteed Sunday majors ($1M+ GTD) with high satellite coverage. *(URL: https://ggpoker.com/house-rules/ | Grade A | 2025)*

---

## 3. India Fantasy Sports Economics & Legal Precedents

India represents FORTREX's primary founder market and legal baseline. The real-money gaming (RMG) ecosystem in India, led by giants like Dream11, Mobile Premier League (MPL), and My11Circle, offers vital regulatory and economic lessons.

```
+----------------------------------------------------------------------------------+
|                    INDIAN FANTASY SPORTS CONTEST ARCHITECTURE                    |
+----------------------------------------------------------------------------------+
| Contest Type        | Field Size       | Rake Range | Target Participant Segment |
+---------------------+------------------+------------+----------------------------+
| Guaranteed Mega     | 100,000 - 5M+    | 15% - 22%  | Casuals chasing 1Cr+ jackpot|
| Head-to-Head (H2H)  | 2 Players        | 10% - 12%  | High-stakes skill duelists |
| Winner-Takes-All    | 3 - 10 Players   | 12% - 15%  | Semi-pro aggressive players|
| Practice / Free     | Unlimited        | 0%         | Onboarding & user acquisition|
+---------------------+------------------+------------+----------------------------+
```

### Landmark Judicial Precedents: Game of Skill vs Chance

Indian gaming jurisprudence is built upon Article 19(1)(g) of the Constitution (right to practice any profession or trade), protected when an activity qualifies as a **"Game of Mere Skill"**:

1. **State of Andhra Pradesh v. K. Satyanarayana (1968 SC 387):**
   * *Ruling:* The Supreme Court held that Rummy is predominantly a game of skill, as holding and discarding cards requires memory, calculation, and strategy. Chance is present in card distribution, but skill predominates. *(Grade A)*
2. **Dr. K.R. Lakshmanan v. State of Tamil Nadu (1996) 2 SCC 226:**
   * *Ruling:* The Supreme Court ruled horse racing is a game of skill. Established the **"Preponderance of Skill Test"**: A game is a game of skill if success depends substantially on superior knowledge, training, attention, experience, and adroitness of the player. *(Grade A)*
3. **Varun Gumber v. Union Territory of Chandigarh (2017 P&H HC - CWP No. 7559/2017):**
   * *Ruling:* The High Court assessed Dream11 fantasy sports. Held that creating a fantasy team requires evaluating player performance, statistics, pitch conditions, and tactics. Declared fantasy sports a game of skill and protected under Article 19(1)(g). Upheld by Supreme Court in 2017. *(Grade A)*
4. **Gurdeep Singh Sachar v. Union of India (2019 Bombay HC):**
   * *Ruling:* Dismissed a PIL alleging gambling and GST evasion against Dream11. Reconfirmed that fantasy sports do not amount to gambling because success depends on participant skill and knowledge. SC dismissed SLP. *(Grade A)*
5. **Avinash Mehrotra v. State of Rajasthan & Ors (2021 SC SLP No. 2633/2021):**
   * *Ruling:* Supreme Court formally dismissed challenge to fantasy gaming, declaring the legal status of skill-based fantasy sports as settled law across India. *(Grade A)*
6. **Gameskraft Technologies v. DGGSTI (2023 Karnataka HC W.P. No. 3283/2023):**
   * *Ruling:* Struck down a ₹21,000 Crore GST show-cause notice, affirming that rummy and skill games are not "actionable claims" subject to gambling taxes. (Under appeal in SC). *(Grade A)*

### The 28% GST Shockwave (October 1, 2023) & Platform Economics

Prior to October 2023, Indian gaming platforms paid 18% GST only on their **Gross Gaming Revenue (GGR / Rake)**. 
On October 1, 2023, the Indian GST Council amended the law to levy **28% GST on the Full Face Value of Initial Entry Deposits**.

$$	ext{Tax Impact Comparison (On ₹100 Deposit):}$$
$$	ext{Pre-Oct 2023: Platform Rake = ₹15} \longrightarrow 	ext{GST (18% of ₹15) = ₹2.70}$$
$$	ext{Post-Oct 2023: Full Deposit = ₹100} \longrightarrow 	ext{GST (28% of ₹100) = ₹28.00}$$

* **Consequences for RMG Industry:** Operating margins collapsed by 70-80%. Platforms like Mobile Premier League (MPL) laid off 35% of staff; smaller startups shut down. Major platforms absorbed part of the GST via discount bonus points to prevent user retention collapse. *(URL: https://taxguru.in/goods-and-service-tax/gst-fantasy-sports-upheld-skill-element-override-betting-character-sc.html | Grade B | 2024)*

### State-Level Legal Map in India

Despite central Supreme Court rulings, gaming remains a state subject under Entry 34, List II of the Seventh Schedule of the Indian Constitution:

```
+----------------------------------------------------------------------------------+
|                        INDIAN STATE LEGAL JURISDICTION MAP                       |
+----------------------------------------------------------------------------------+
| Banned / Prohibited States | Licensed / Regulated States | High Court Overturned |
+----------------------------+-----------------------------+-----------------------+
| Telangana (Gaming Act 2017)| Nagaland (Skill Act 2016)   | Tamil Nadu (2022 Act) |
| Assam (Betting Act 1970)   | Sikkim (Online Gaming Act)  | Karnataka (2022 HC)   |
| Odisha (Gambling Act 1955) |                             |                       |
| Andhra Pradesh (2020 Act)  |                             |                       |
+----------------------------+-----------------------------+-----------------------+
```

* **Prohibited States (Red Zone):** Telangana, Assam, Odisha, Andhra Pradesh. Platforms strictly geo-block IP addresses and banking locations from these states.
* **Licensed States (Green Zone):** Nagaland (issues explicit Online Games of Skill Licenses), Sikkim.
* **Disputed / High Court Overturned States (Yellow Zone):** Tamil Nadu and Karnataka enacted total bans on online money games, but High Courts struck down prohibitions against games of skill. Ongoing legislative appeals continue. *(URL: https://obhanmason.com/blog/the-road-map-to-advertising-real-money-online-gaming/ | Grade B | 2025)*

---

## 4. Prize Pool Design & Operational Risk Management

A trading tournament platform's survival depends on balancing marketing appeal against balance-sheet overlay vulnerability.

### Guaranteed vs 100%-of-Fees Models

```
+----------------------------------------------------------------------------------+
|                       PRIZE POOL MODEL FINANCIAL RISK MATRIX                     |
+----------------------------------------------------------------------------------+
| Metric                 | 100% Variable Fee Model    | Guaranteed Prize Pool (GTD) |
+------------------------+----------------------------+-----------------------------+
| Financial Risk         | Zero Balance-Sheet Risk    | High Risk (Overlay Hazard)  |
| Marketing Conversion   | Moderate (Flexible pool)   | Very High (Known top prize) |
| Field Scalability      | Scales automatically       | Requires minimum field size |
| Cancellation Trigger   | If N < Minimum field size  | If N < Overlay threshold    |
| Operational Control    | Low management stress      | High risk management needed |
+------------------------+----------------------------+-----------------------------+
```

### Minimum Field Size & Overlay Threshold Formula

To eliminate unhedged overlay losses, FORTREX must establish mathematical thresholds before launching any guaranteed tournament.

$$	ext{Break-Even Participant Threshold } (N_{\min}) = rac{	ext{Guaranteed Prize Pool Amount (GTD)}}{	ext{Individual Buy-In Portion (Gross Entry Fee - Rake)}}$$

$$	ext{Overlay Risk Margin (\%)} = 1 - \left( rac{	ext{Actual Entrants } (N_{	ext{actual}})}{N_{\min}} ight)$$

* **Overlay SOP Rule:** If $N_{	ext{actual}} < 0.70 	imes N_{\min}$ at 30 minutes prior to event start, the platform triggers **Overlay Mitigation Protocol**:
  1. Open Late Registration extension (+30 minutes).
  2. Auto-inject satellite ticket holders.
  3. If still below 50% capacity, cancel event and issue 100% full refunds.

---

## 5. Tournament Integrity Rules & Platform Infrastructure

In skill-based trading tournaments, technical outages, broker disconnections, and collusion present direct existential threats to platform reputation.

### Disconnection & Technical Latency Handling Rules

#### A. Esports Standard (CS2 ESL / Riot Games Valorant)
* **Technical Timeouts:** Each team is allocated up to 5 minutes of technical pause per map for client crashes or peripheral failures.
* **Match Remake Rules:** If a player disconnects before first damage/kill occurs, the round/match is remade. If after, play continues and the disconnected player must reconnect during round pause. *(URL: https://pro.eslgaming.com/ | Grade A | 2025)*

#### B. Poker Standard (PokerStars / GGPoker)
* **Disconnect Time Bank:** A player who disconnects is granted an additional 30-60 second Disconnect Time Bank.
* **Auto-Check / Auto-Fold:** If the player fails to reconnect before the time bank expires, their hand is automatically checked (if no bet to call) or folded. Blind payments continue automatically until chips run out. *(URL: https://www.pokerstars.com/poker/tournaments/rules/ | Grade A | 2026)*

#### C. FORTREX Trading Infrastructure Adaptation
1. **Broker API Loss of Connection:** If a participant's broker API stream drops for >5 minutes during active market hours, FORTREX triggers an automated API Heartbeat Re-Sync.
2. **Open Position Freeze:** FORTREX does not execute trades on behalf of users (non-custodial). If a user's broker disconnects, the user's existing open positions remain managed by their own broker terminal stop-loss/take-profit settings.
3. **Data Lag Adjustment:** Performance evaluation timestamps are indexed to the exchange fill timestamp recorded by the broker, preventing local device network lag from penalizing or unfairly benefiting a trader.

### Server Outage Mid-Tournament Protocols (The PokerStars Rollback / Roll Forward SOP)

When central platform servers crash during an active tournament, manual decisions destroy trust. FORTREX adopts the industry-standard PokerStars Outage Framework:

```
+----------------------------------------------------------------------------------+
|                   MID-TOURNAMENT SERVER OUTAGE RESOLUTION SOP                    |
+----------------------------------------------------------------------------------+
| Outage Stage            | Policy Mechanics & Distribution Formula                  |
+-------------------------+--------------------------------------------------------+
| Stage A: Before Prize   | ROLLBACK POLICY:                                       |
| Money Zone (Pre-ITM)    | - Tournament is completely voided.                      |
|                         | - 100% of Entry Fees + 100% of Platform Rake refunded. |
|                         | - Restores participants to pre-contest balance.        |
+-------------------------+--------------------------------------------------------+
| Stage B: Inside Prize   | ROLL FORWARD POLICY:                                   |
| Money Zone (ITM)        | - Each remaining trader gets Minimum Cash Prize (ITM). |
|                         | - 50% of remaining pool divided EQUALLY among active.  |
|                         | - 50% divided PROPORTIONALLY based on current equity/  |
|                         |   performance score at the timestamp of outage.        |
+-------------------------+--------------------------------------------------------+
```

### Collusion, Anti-Cheat & Malpractice Rulebook

Trading competitions face specific financial manipulation tactics that require strict detection algorithms:

1. **Cross-Account Hedging (Opposing Trade Wash):** Entering two accounts in the same tournament, opening Max Long on Account A and Max Short on Account B on the same instrument. One account guarantees a massive win while the other dies.
   * *Detection:* Timestamp correlation analysis across IP addresses, hardware IDs, and broker API keys.
   * *Penalty:* Immediate permanent ban of both accounts and forfeiture of all prizes.
2. **Latency Arbitrage & API Spoofing:** Attempting to feed delayed or manipulated trade logs via custom API proxy wrappers.
   * *Detection:* Server-side trade verification against direct broker liquidity provider execution logs.
3. **Account Sharing & Ghosting:** Having a professional master trader pilot multiple retail accounts.
   * *Detection:* Behavioral biometrics (keystroke dynamics, order entry patterns, session IP shifting).

---

## 6. Season & League Design for Long-Term Retention

Standard trading competitions fail because 80% of participants drop out after losing their first two trades. Sustained commercial growth requires a multi-tiered season structure.

```
+----------------------------------------------------------------------------------+
|                     FORTREX ANNUAL COMPETITIVE STRUCTURE                         |
+----------------------------------------------------------------------------------+
| Split / Phase      | Duration   | Focus & Qualification                          |
+--------------------+------------+------------------------------------------------+
| Winter Split       | Jan - Mar  | Season Openers & Regional Circuit Points       |
| Spring Split       | Apr - Jun  | Mid-Year Masters Qualifiers                    |
| Summer Split       | Jul - Sep  | Capital Bracket Showdowns                      |
| Fall Split         | Oct - Nov  | FWCS World Championship Qualifiers             |
| Grand Finals (FWCS)| Early Dec  | Elite Top 64 Master Tournament (Nov 7 Launch)  |
+--------------------+------------+------------------------------------------------+
```

### Retention & Mid-Tier Engagement Engine

To keep non-winning traders engaged, FORTREX incorporates video game retention mechanics:

1. **Battle Pass / Season XP Progression:** Earn Season XP for disciplined trading behavior (e.g., executing 10 trades with mandatory stop-losses, maintaining <2% drawdown per trade, completing 5 daily sprints). Unlocks tier cosmetics, badge frames, and free tournament entry passes.
2. **Skill Rating (Elo / Glicko-2 for Traders):** Assigns every trader a dynamic Rating (e.g., Bronze: 800-1199, Silver: 1200-1499, Gold: 1500-1799, Platinum: 1800-2099, Diamond: 2100-2399, Grandmaster: 2400+). Traders compete against peers in matched brackets rather than getting crushed by institutional whales.
3. **Secondary Accolades & Badges:**
   * *The Iron Shield:* Awarded for lowest max drawdown over 30 days.
   * *Precision Sniper:* Highest win-rate on 20+ trades.
   * *Consistency King:* Lowest return variance over 4 consecutive weeks.
4. **Capital-Weighted Weight Brackets:**
   * *Micro Bracket:* $500 to $2,500 account balances.
   * *Mid-Cap Bracket:* $2,500 to $25,000 account balances.
   * *Titan Bracket:* $25,000+ account balances.
   * *Normalizing Formula:* Scoring uses **% Risk-Adjusted Return** ($	ext{Sharpe Ratio} 	imes \log(	ext{Equity Growth})$), ensuring a $500 trader competes on pure skill equity without being handicapped by absolute dollar size.

---

## 7. Legal Design Boundaries under India's PROG Act 2025 & Gaming Framework

India's **Promotion and Regulation of Online Gaming (PROG) Act 2025** and the associated **Online Gaming Rules 2026** establish strict legal boundaries separating permissible e-sports and skill games from prohibited online money games / wagering.

```
+----------------------------------------------------------------------------------+
|                   LEGAL RISK MATRIX FOR TRADING TOURNAMENTS                      |
+----------------------------------------------------------------------------------+
| Tournament Mechanic    | Classification & Legal Risk Status                       |
+------------------------+---------------------------------------------------------+
| Fixed Entry Fee        | SAFER: Standard skill contest entry [COUNSEL REQUIRED]  |
| Free-to-Enter (Sponsor)| SAFER: Promotional skill contest [COUNSEL REQUIRED]     |
| Fixed Prize Pool       | SAFER: Pre-announced non-wagering pool [COUNSEL REQUIRED]|
| Mid-Contest Rebuys     | HIGH RISK: Resembles casino re-buys [COUNSEL REQUIRED]  |
| Mid-Contest Add-Ons    | HIGH RISK: Shifts outcome to deep pockets [COUNSEL REQ] |
| Player Side Bets       | EXTREME RISK: Classifiable as illegal betting [COUNSEL] |
| Staking / Backing      | HIGH RISK: Triggers CIS / wagering rules [COUNSEL REQ]  |
| Uncapped Leverage      | HIGH RISK: Induces speculative gambling [COUNSEL REQ]   |
+------------------------+---------------------------------------------------------+
```

### Safe vs Risky Mechanics Guidance

* **SAFE / PERMISSIBLE MECHANICS `[COUNSEL-REVIEW-REQUIRED]`:**
  * Fixed, uniform entry fee collected strictly prior to contest commencement.
  * Free-to-enter tournaments funded entirely by platform sponsorship or broker marketing budgets.
  * Prize pools distributed strictly according to objective skill metrics (Sharpe ratio, verified PnL %).
  * Non-custodial tracking where user capital remains at regulated brokers (XM, Exness, Interactive Brokers).
* **RISKY / PROHIBITED MECHANICS `[COUNSEL-REVIEW-REQUIRED]`:**
  * *Rebuys & Add-ons:* Allowing players to pay extra money mid-tournament to reset their balance or buy extra points introduces chance/deep-pocket bias and violates skill-game purity.
  * *Side Bets & Direct Wagers:* Allowing User A to bet ₹1,000 that User B will lose money in the next hour is pure wagering/gambling under Public Gambling Acts.
  * *Staking / Yield Sharing:* Allowing non-trading investors to fund a trader's tournament entry fee in exchange for 50% of winnings risks triggering SEBI Collective Investment Scheme (CIS) regulations or illegal bookmaking provisions.

---

## 8. Year 1 Recommended FORTREX Tournament Catalog

The following catalog defines FORTREX's initial product suite for Year 1 (Launch Nov 7, 2026).

```
+----------------------------------------------------------------------------------+
|                    YEAR 1 FORTREX TOURNAMENT CATALOG                             |
+----------------------------------------------------------------------------------+
| Tournament Name    | Entry Structure | Duration   | Metrics & Constraints        | Operational Rating |
+--------------------+-----------------+------------+------------------------------+--------------------+
| Season Zero Genesis| Free (Founding) | 1 Day      | Risk-Adjusted % Return       | 2/5 (Medium-Low)   |
| Daily Sprint       | Free / Micro Fee| 24 Hours   | Max Return, Max 5% Drawdown  | 1/5 (Very Low)     |
| Weekly League      | Low Entry Fee   | 5 Days     | Sharpe Ratio + Equity Growth | 2/5 (Low)          |
| Monthly Masters    | Mid Entry Fee   | 1 Month    | Sortino Ratio + Consistency  | 3/5 (Medium)       |
| Weight-Bracket Cup | Tiered Entry    | 3 Days     | Capital-Normalized Return    | 3/5 (Medium)       |
| FWCS Qualifier     | Satellite Ticket| 2 Weeks    | Top 5% Advance to Finals     | 4/5 (High)         |
| Pro Grand Final    | Qualified Seats | 3 Days     | Multi-Asset Composite Score  | 5/5 (Very High)    |
+--------------------+-----------------+------------+------------------------------+--------------------+
```

### Detailed Catalog Breakdown

1. **Season Zero Genesis (Launch Event - Nov 7, 2026):**
   * *Access:* Free exclusive entry for 10,000 Founding Pass NFT / Pass holders.
   * *Format:* 24-Hour Global Asynchronous Leaderboard.
   * *Prize Pool:* $50,000 Guaranteed (Sponsor Funded). Top 1,000 receive Founding Badges and FWCS Season Points.
2. **Daily Flash Sprint:**
   * *Access:* Open to all registered users. $5 Buy-In or Free Promo.
   * *Format:* 24-hour daily cycle matching market sessions (Asia, London, NY).
   * *Metrics:* Net % Return with strict -5% Account Max Drawdown disqualification trigger.
3. **Weekly Capital Bracket League:**
   * *Access:* Segregated by account size ($500-$2.5k / $2.5k-$25k / $25k+).
   * *Format:* Monday market open to Friday market close.
   * *Metrics:* Composite Score = $\% 	ext{ Return} 	imes (1 - 	ext{Max Drawdown \%})$.

---

## 9. Paid Tournament Prize-Pool Math Model

### Financial Unit Economics Model (Per 1,000 Entrants at $50 Entry)

```
+----------------------------------------------------------------------------------+
|                      FORTREX PAID TOURNAMENT MATH MODEL                          |
+----------------------------------------------------------------------------------+
| Financial Component            | Amount Per Entrant | Total (1,000 Entrants)     |
+--------------------------------+--------------------+----------------------------+
| Total Gross Entry Collection   | $50.00             | $50,000.00                 |
| - Payment Gateway Fee (3.0%)   | -$1.50             | -$1,500.00                 |
| - Net Collected               | $48.50             | $48,500.00                 |
| - Platform Rake (15.0% Gross)  | -$7.50             | -$7,500.00                 |
| = Net Prize Pool Allocation    | $41.00             | $41,000.00 (82.0% of Gross)|
+--------------------------------+--------------------+----------------------------+
| PLATFORM RAKE BREAKDOWN ($7,500 Gross Rake):                                     |
| - Applicable Tax / GST Reserve | -$1.80             | -$1,800.00                 |
| - Server & Integrity Overhead  | -$1.20             | -$1,200.00                 |
| - Overlay Buffer Reserve       | -$1.00             | -$1,000.00                 |
| = Net Platform Operating Margin| $3.50              | $3,500.00 (7.0% Net)       |
+--------------------------------+--------------------+----------------------------+
```

### Payout Distribution Schedule ($41,000 Prize Pool - 150 In The Money / 15% Field)

```
+----------------------------------------------------------------------------------+
|                     1,000-ENTRANT PAYOUT DISTRIBUTION SCHEDULE                   |
+----------------------------------------------------------------------------------+
| Rank / Group        | % of Prize Pool | Exact Dollar Payout | Per Trader Payout   |
+---------------------+-----------------+---------------------+---------------------+
| 1st Place           | 15.00%          | $6,150.00           | $6,150.00 (123x)    |
| 2nd Place           | 9.00%           | $3,690.00           | $3,690.00 (73.8x)   |
| 3rd Place           | 6.00%           | $2,460.00           | $2,460.00 (49.2x)   |
| 4th Place           | 4.00%           | $1,640.00           | $1,640.00 (32.8x)   |
| 5th Place           | 3.00%           | $1,230.00           | $1,230.00 (24.6x)   |
| 6th - 10th (5)      | 8.00%           | $3,280.00 total      | $656.00 (13.1x)     |
| 11th - 25th (15)    | 12.00%          | $4,920.00 total      | $328.00 (6.56x)     |
| 26th - 50th (25)    | 15.00%          | $6,150.00 total      | $246.00 (4.92x)     |
| 51st - 100th (50)   | 16.00%          | $6,560.00 total      | $131.20 (2.62x)     |
| 101st - 150th (50)  | 12.00%          | $4,920.00 total      | $98.40 (1.96x)      |
| Total (150 Winners) | 100.00%         | $41,000.00          | -                   |
+---------------------+-----------------+---------------------+---------------------+
```

---

## 10. FORTREX Integrity Rulebook Starter (15 Concrete Rules)

```
+----------------------------------------------------------------------------------+
|                   FORTREX TOURNAMENT INTEGRITY RULEBOOK STARTER                  |
+----------------------------------------------------------------------------------+
| Rule ID | Rule Category     | Rule Specification & Enforcement Standard          |
+---------+-------------------+----------------------------------------------------+
| RULE 01 | Identity & KYC    | One person, one account. Mandatory 3D KYC check.   |
| RULE 02 | Non-Custodial Sync| Read-only API keys required from approved brokers. |
| RULE 03 | Pre-Match Freeze  | Account equity logged 15 mins prior to start time.|
| RULE 04 | Anti-Hedging      | Opposing positions on same asset across 2 accounts = BANNED. |
| RULE 05 | Latency Arbitrage | High-frequency API spoofing or lag exploits = DISQUALIFIED.|
| RULE 06 | Mirror Trading    | Automated trade copying across multiple entries = BANNED.  |
| RULE 07 | Drawdown Hard-Stop| Exceeding tournament max drawdown = Automatic Loss.|
| RULE 08 | Broker Disconnect | Position management remains with user's broker.   |
| RULE 09 | Server Rollback   | Outage pre-ITM = 100% refund of fees and rake.     |
| RULE 10 | Server Roll Forward| Outage ITM = Min cash + equity proportional split.|
| RULE 11 | Payout Lock Period| 48-hour audit hold before prize funds release.     |
| RULE 12 | Disqualification  | Fraudulent trade logs forfeit prize to next rank. |
| RULE 13 | Appeal Window     | Appeals must be lodged within 24 hours of result.  |
| RULE 14 | Arbiters Decision | Integrity Committee ruling is final and binding.   |
| RULE 15 | Regulatory Compliance| Geo-blocked in prohibited states (Telangana, etc).|
+---------+-------------------+----------------------------------------------------+
```

### Detailed Text of Selected Core Rules

* **Rule 01 (Single Account Identity):** Each participant may register exactly one FORTREX account verified with Government Identity (KYC). Multi-accounting or operating via proxy accounts results in immediate permanent ban and forfeiture of all accumulated rewards.
* **Rule 04 (Prohibition of Cross-Account Hedging):** Executing opposing long and short positions on the same asset across two or more registered accounts within a 5-minute window is classified as collusion. All linked accounts will be disqualified instantly.
* **Rule 07 (Drawdown Disqualification Threshold):** If an account's equity falls below the pre-stated Maximum Permissible Drawdown (e.g., -10% of starting equity) at any point during the contest, the account is automatically flagged as "Disqualified / Liquidated" for that contest.
* **Rule 09 (Pre-ITM Technical Failure SOP):** If FORTREX central systems experience an unrecoverable crash before the tournament reaches the prize payout threshold ("In The Money"), the contest is declared null and void. 100% of entry fees and platform rake will be credited back to participant wallets within 2 hours.
* **Rule 10 (Post-ITM Technical Failure SOP):** If a system crash occurs after the tournament has reached the ITM threshold, all active participants receive the minimum cash payout. The remaining prize pool is split 50% equally and 50% proportionally based on performance rank at the exact timestamp of outage.
* **Rule 11 (Audit Hold & Verification):** All top 10% finishing account trade logs undergo an automated algorithmic integrity audit. Prize distributions are held in escrow for 48 hours post-contest completion.
* **Rule 13 (Formal Appeal Process):** A participant disputing a disqualification or trade calculation must submit a ticket to the Integrity Review Board within 24 hours of contest closing, including broker raw trade logs and execution statements.

---

## 11. Safe vs Risky Mechanics Guidance for Legal Gate

*Notice: All items below are flagged as `[COUNSEL-REVIEW-REQUIRED]` prior to commercial deployment in any jurisdiction.*

### Green-Light Mechanics (Safe Baseline) `[COUNSEL-REVIEW-REQUIRED]`
* **Fixed Pre-Paid Entry Fees:** Entry fees collected strictly as platform access fees prior to contest start. `[COUNSEL-REVIEW-REQUIRED]`
* **Free-to-Enter Sponsor Cups:** Completely free tournaments where prize money is supplied by sponsors, brokers, or platform marketing budgets. `[COUNSEL-REVIEW-REQUIRED]`
* **Non-Custodial Account Tracking:** User funds remain entirely within their own regulated broker accounts (XM, Exness, IBKR). FORTREX never takes custody of trading capital. `[COUNSEL-REVIEW-REQUIRED]`
* **Objective Risk-Adjusted Scoring:** Ranking based on verifiable mathematical formulas (Sharpe Ratio, Sortino Ratio, Drawdown-Adjusted PnL). `[COUNSEL-REVIEW-REQUIRED]`
* **Capital Weight Brackets:** Grouping traders by account equity size to ensure competitive equity and eliminate financial intimidation. `[COUNSEL-REVIEW-REQUIRED]`

### Yellow-Light Mechanics (Caution / Strict Guardrails) `[COUNSEL-REVIEW-REQUIRED]`
* **Guaranteed Prize Pools (GTD):** Permissible if protected by minimum entry thresholds and overlay cancellation rules to avoid balance sheet exposure. `[COUNSEL-REVIEW-REQUIRED]`
* **Late Registration Windows:** Permissible provided late entrants receive no unfair time or leverage advantage over initial entrants. `[COUNSEL-REVIEW-REQUIRED]`
* **Satellite / Qualifier Pass-Throughs:** Permissible if tickets have no direct cash redemption option prior to the target tournament. `[COUNSEL-REVIEW-REQUIRED]`

### Red-Light Mechanics (High Legal / Regulatory Hazard) `[COUNSEL-REVIEW-REQUIRED]`
* **In-Game Rebuys & Balance Resets:** Allowing traders to pay extra cash mid-tournament to reset a blown account risks converting the contest into a casino-style game of chance / deep-pockets gambling. `[COUNSEL-REVIEW-REQUIRED]`
* **Player-to-Player Side Bets:** Allowing users to place side wagers on other traders' performances is pure wagering/betting under Public Gambling Acts. `[COUNSEL-REVIEW-REQUIRED]`
* **Staking / Investor Profit Sharing:** Allowing external investors to buy shares of a trader's tournament entry fee or profit split risks triggering SEBI Collective Investment Scheme (CIS) violations. `[COUNSEL-REVIEW-REQUIRED]`
* **Variable / Uncapped Entry Fees in Same Bracket:** Mixing $100 entrants with $10,000 entrants without capital weighting creates unfair financial leverage and invalidates skill-predominance claims. `[COUNSEL-REVIEW-REQUIRED]`

---

## Complete Source Index & Evidence Grading

1. **PokerStars Official Tournament Rules & Server Outage Policy:** `https://www.pokerstars.com/poker/tournaments/rules/` | Grade A | 2026
2. **GGPoker House Rules & Tournament Refund Terms:** `https://ggpoker.com/house-rules/` | Grade A | 2025
3. **Supreme Court of India - State of AP v. K. Satyanarayana (1968 SC 387):** Primary Judicial Case Law | Grade A | 1968
4. **Supreme Court of India - Dr. K.R. Lakshmanan v. State of Tamil Nadu (1996) 2 SCC 226:** Primary Judicial Case Law | Grade A | 1996
5. **Punjab & Haryana High Court - Varun Gumber v. UT Chandigarh (2017 CWP No. 7559/2017):** Primary Judicial Case Law | Grade A | 2017
6. **Bombay High Court - Gurdeep Singh Sachar v. Union of India (2019 PIL St. 22/2019):** Primary Judicial Case Law | Grade A | 2019
7. **Supreme Court of India - Avinash Mehrotra v. State of Rajasthan (2021 SLP No. 2633/2021):** Primary Judicial Case Law | Grade A | 2021
8. **Karnataka High Court - Gameskraft Technologies v. DGGSTI (2023 W.P. No. 3283/2023):** Primary Judicial Case Law | Grade A | 2023
9. **TaxGuru - GST on Fantasy Sports & Skill Element Rulings:** `https://taxguru.in/goods-and-service-tax/gst-fantasy-sports-upheld-skill-element-override-betting-character-sc.html` | Grade B | 2024
10. **Obhan & Associates - Real Money Online Gaming Legal Roadmap in India:** `https://obhanmason.com/blog/the-road-map-to-advertising-real-money-online-gaming/` | Grade B | 2025
11. **ESL CS2 Official Rules & Technical Timeout Specifications:** `https://pro.eslgaming.com/` | Grade A | 2025
12. **BLAST Premier Tournament Guidelines & Pause Mechanics:** `https://blastpremier.com/` | Grade A | 2024
13. **Chess.com Fair Play Policy & Disconnection Timeout Standards:** `https://www.chess.com/legal/fair-play` | Grade A | 2025
14. **Promotion and Regulation of Online Gaming (PROG) Act 2025 & Rules 2026:** Legislative Enactment Documents | Grade A | 2025/2026
