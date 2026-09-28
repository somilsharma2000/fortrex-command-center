# FORTREX Retention & Growth Engine Design Specification
**Theme**: Obsidian & Gold | **Tone**: Quiet Institutional Authority | **Currency**: REX Points (Strictly Non-Monetary)

---

## 1. Executive Summary & Core Principles

FORTREX is an elite, skill-based trading competition engineered for traders who value analytical rigor, discipline, and verifiable track records. The growth and retention architecture detailed below is designed to mirror top-tier institutional trading desks rather than retail gamification apps or gambling platforms.

### Core Principles & Ethical Compliance
1. **Zero Cash Value Bait**: REX points serve strictly as non-monetary telemetry for rank, platform access, and reputation badges. They carry **no monetary value**, cannot be withdrawn, traded, or converted to currency.
2. **Honest Signal & Telemetry**: Notifications, counters, and metrics report ground-truth database state. No fabricated urgency, fake countdown timers, or artificial rank drops are permitted.
3. **No Gambling / Variable Monetary Rewards**: No mystery boxes, spin wheels, or variable payout mechanics. All rewards are deterministic, transparent, and meritocratic based on risk-adjusted skill metrics.

---

## 2. Retention & Growth Mechanics Specifications

### 2.1 Daily Check-In Streak System ("Protocol Discipline")
* **What It Is**: A daily log tracking consistent active market analysis, trading activity, or risk journal entry. Includes a monthly non-purchasable "Streak Freeze" earned through weekly performance discipline, localized to the user's IANA time zone with a 3-hour post-midnight grace window.
* **Metric It Moves**: Daily Active Users (DAU), 7-Day & 30-Day Cohort Retention.
* **Implementation Note (Data Fields)**:
  ```json
  {
    "user_id": "uuid-v4",
    "iana_timezone": "Asia/Calcutta",
    "current_streak_days": 14,
    "longest_streak_days": 42,
    "last_checkin_timestamp_utc": "2026-09-29T03:14:00Z",
    "streak_freeze_inventory": 1,
    "max_freeze_cap": 2,
    "grace_period_used_at": "2026-09-28T02:15:00Z"
  }
  ```
* **Ethical Guardrail**: Streak freezes **cannot** be purchased with real money. Time zone resets leverage exact IANA timezone offsets (`zoneinfo`), giving users local midnight resets plus a 3-hour grace window to prevent unfair streak resets caused by travel or shift work.
* **Compliance Flag**: Passed. Zero fake urgency or pay-to-win streak mechanics.

---

### 2.2 Rank-Movement & Overtaken Notifications ("Leaderboard Telemetry")
* **What It Is**: Quiet, institutional-grade push and in-app telemetry alerts triggered when a competitor is passed in global or cohort standings, or drops out of a major tier threshold (e.g., Top 100, Top 500).
* **Metric It Moves**: Unscheduled Re-engagement Rate, Session Frequency, Weekly Active Users (WAU).
* **Implementation Note (Data Fields)**:
  ```json
  {
    "user_id": "uuid-v4",
    "current_global_rank": 104,
    "previous_global_rank": 98,
    "rank_delta": -6,
    "bracket_tier": "INSTITUTIONAL_PRO",
    "overtaken_by_user_id": "uuid-v4-passer",
    "last_alert_sent_utc": "2026-09-28T18:30:00Z",
    "rank_alert_opt_out": false
  }
  ```
* **Ethical Guardrail**: Strict rate-limiting (maximum 1 alert per 24 hours). Alerts trigger only for true rank movements exceeding a minimum noise threshold (≥2 positions inside Top 500). Messages maintain a calm telemetry tone ("Standing updated: Position #104 in Cohort Alpha") rather than alarmist notifications.
* **Compliance Flag**: Passed. No fake position drops or panic-inducing push messages.

---

### 2.3 Referral Loops ("Peer Vouching & Tiered Titles")
* **What It Is**: A two-sided institutional referral loop where existing traders invite peers to join a cohort. Both inviter and invitee unlock non-monetary REX bonus points and earn prestigious institutional titles ("Vouched Analyst", "Syndicate Lead", "Desk Director").
* **Metric It Moves**: Organic K-Factor, Organic Acquisition Cost (CPA), D1 Activation Rate.
* **Implementation Note (Data Fields)**:
  ```json
  {
    "inviter_user_id": "uuid-v4",
    "referral_code": "FRX-NYC-8821",
    "referee_user_id": "uuid-v4-referee",
    "qualification_status": "QUALIFIED_AFTER_VERIFIED_TRADE",
    "vouch_count": 5,
    "referral_title_tier": "SYNDICATE_LEAD",
    "unlocked_badge_ids": ["BADGE_VOUCH_TIER_2"]
  }
  ```
* **Ethical Guardrail**: Referral bonuses require the referee to complete minimum non-monetary skill verification (submit 3 benchmark trades in market simulator/competition) before rewards unlock. Prevents referral spam, self-referral loops, and multi-accounting.
* **Compliance Flag**: Passed. Two-sided rewards are strictly non-monetary (title unlocks + REX telemetry points).

---

### 2.4 Progress & Endowment Mechanics ("Profile Completeness & 'Your Path'")
* **What It Is**: An elegant visual roadmap ("Your Path") and profile completeness tracker framing initial setup (risk model selection, trading journal preferences, bio, benchmark trades) as building a professional trader dossier.
* **Metric It Moves**: Onboarding Completion Rate (D1 Activation), Profile Completeness %, Day 7 Retention.
* **Implementation Note (Data Fields)**:
  ```json
  {
    "user_id": "uuid-v4",
    "dossier_completeness_pct": 85,
    "completed_milestones": [
      "RISK_MODEL_CONFIGURED",
      "BIOGRAPHY_ADDED",
      "BENCHMARK_TRADE_LOGGED",
      "TIMEZONE_SET"
    ],
    "current_path_stage": "PROVING_GROUNDS",
    "next_action_recommended": "SETUP_JOURNAL_TEMPLATES"
  }
  ```
* **Ethical Guardrail**: Progress metrics strictly reflect true user action completion. Progress percentages are linear and accurate (no fake initial 80% boosts), respecting user intelligence.
* **Compliance Flag**: Passed. Authentic progression design grounded in actual user data input.

---

### 2.5 Honest Scarcity ("The 10,000 Seat Cap")
* **What It Is**: A transparent, hard-capped 10,000 seat limit per active seasonal cohort to preserve infrastructure responsiveness, data integrity, and competition prestige.
* **Metric It Moves**: Onboarding Conversion Rate, Cohort Commitment Rate.
* **Implementation Note (Data Fields)**:
  ```json
  {
    "cohort_id": "COHORT_2026_Q4",
    "max_seat_capacity": 10000,
    "claimed_seats_count": 8742,
    "available_seats_count": 1258,
    "waitlist_active": false,
    "waitlist_queue_length": 0
  }
  ```
* **Ethical Guardrail**: Absolute zero fake seat counts or countdown timers. Seat counts are evaluated via direct database query (`SELECT COUNT(*) FROM cohort_seats WHERE cohort_id = X`). Once 10,000 is reached, a genuine FIFO waitlist opens.
* **Compliance Flag**: Passed. Hard constraint transparency with no artificial scarcity.

---

### 2.6 Weekly Digest Email Content ("Market & Performance Brief")
* **What It Is**: A personalized, institutional Monday morning briefing detailing the trader's weekly performance metrics (Sharpe ratio, max drawdown, win rate, execution consistency score), bracket status, and top analytical community write-ups.
* **Metric It Moves**: Weekly Active Users (WAU), Email Open Rate (>45% target), Unscheduled Re-engagement.
* **Implementation Note (Data Fields)**:
  ```json
  {
    "user_id": "uuid-v4",
    "weekly_sharpe_ratio": 1.84,
    "weekly_max_drawdown_pct": 2.10,
    "win_rate_pct": 64.5,
    "weekly_rank_change": 12,
    "cohort_percentile": 92.4,
    "digest_sent_timestamp_utc": "2026-09-28T06:00:00Z"
  }
  ```
* **Ethical Guardrail**: No hype, financial advice, or get-rich-quick claims. Content focuses strictly on risk metrics, execution quality, and statistical performance analytics.
* **Compliance Flag**: Passed. Analytical performance feedback with zero monetary promises.

---

### 2.7 Reactivation Nudges (Day 2 / 7 / 14 / 30 Lifecycle Engine)
* **What It Is**: A structured lifecycle re-engagement sequence for inactive accounts. Re-engages traders at specific milestones (Day 2, 7, 14, and 30) by presenting missed analytical market data, macro cohort benchmarks, or upcoming cohort transitions.
* **Metric It Moves**: D2, D7, D14, and D30 Re-engagement / Win-back Rate.
* **Implementation Note (Data Fields)**:
  ```json
  {
    "user_id": "uuid-v4",
    "days_inactive": 7,
    "lifecycle_stage": "D7_BENCHMARK_SUMMARY",
    "last_active_timestamp_utc": "2026-09-22T10:00:00Z",
    "nudge_sent_count": 2,
    "unsubscribed_lifecycle_nudges": false
  }
  ```
* **Ethical Guardrail**: Maximum 1 email per trigger stage. Direct single-click unsubscribe link provided in every email header. Accounts inactive past Day 30 are safely archived without passive-aggressive spam.
* **Compliance Flag**: Passed. Low-frequency, high-relevance lifecycle design without guilt trips or artificial urgency.

---

### 2.8 Community Hub ("The Trading Floor & Syndicate Guilds")
* **What It Is**: An institutional analytical hub featuring trade thesis publishing, peer review, verified track record displays, and non-monetary syndicate team leaderboards.
* **Metric It Moves**: Average Session Time, Peer Social Connectivity, D90 Retention.
* **Implementation Note (Data Fields)**:
  ```json
  {
    "thesis_id": "uuid-v4",
    "author_user_id": "uuid-v4-author",
    "asset_pair": "EUR/USD",
    "thesis_title": "Q4 Central Bank Divergence & Liquidity Analysis",
    "risk_reward_ratio": 2.5,
    "upvotes_count": 48,
    "author_verified_tier": "INSTITUTIONAL_LEAD"
  }
  ```
* **Ethical Guardrail**: Only users with verified competition trades can post investment theses, completely eliminating unverified financial "gurus", spam commentary, and market manipulation attempts.
* **Compliance Flag**: Passed. Built around transparent peer verification and analytical meritocracy.

---

## 3. Ethical & Compliance Audit Summary

| Mechanic | Fake Counter Check | Fake Urgency Check | Cash / Gambling Bait Check | Compliance Status |
| :--- | :--- | :--- | :--- | :--- |
| **Streak System** | Passed (Real DB UTC/Timezone logs) | Passed (3h grace, local time) | Passed (Non-monetary rewards only) | **COMPLIANT** |
| **Rank Notifications** | Passed (Exact rank shift telemetry) | Passed (Rate-limited, calm tone) | Passed (Zero prize cash mentions) | **COMPLIANT** |
| **Referral Loops** | Passed (Real referee status) | Passed (No expiry countdowns) | Passed (Titles & REX points only) | **COMPLIANT** |
| **Progress / Endowment** | Passed (True linear completion) | Passed (No artificial urgency) | Passed (Purely profile completeness) | **COMPLIANT** |
| **Honest Scarcity** | Passed (Real 10k DB seat count) | Passed (Genuine FIFO waitlist) | Passed (No monetary gatekeeping) | **COMPLIANT** |
| **Weekly Digest** | Passed (Real risk telemetry) | Passed (Analytical Monday schedule)| Passed (Risk focus, no yield talk) | **COMPLIANT** |
| **Reactivation Nudges**| Passed (Exact inactivity dates) | Passed (4 discrete touchpoints) | Passed (No deposit match offers) | **COMPLIANT** |
| **Community Hub** | Passed (Verified trade proof) | Passed (No hype channels) | Passed (Meritocracy badges only) | **COMPLIANT** |

---
*Design Specification complete for FORTREX system deployment.*
