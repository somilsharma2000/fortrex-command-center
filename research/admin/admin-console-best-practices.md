---
title: Enterprise Admin Console & Audit Trail Best Practices for FORTREX
summary: Comprehensive institutional research and concrete architecture for FORTREX's enterprise admin console. Covers fine-grained RBAC roles, 4-eyes dual authorization workflows, immutable append-only audit logging (OWASP ASVS / SOC 2 / NIST compliant), live attribution analytics funnels, third-party integration health management, operational circuit breakers, and audited REX currency issuance tracking.
---

# Enterprise Admin Console & Audit Trail Best Practices for FORTREX

## Executive Overview

FORTREX is built as the **Sovereign Arena for Proven Skill**—a non-custodial, MT5 read-only trading platform designed to scale globally. Because FORTREX operates at the intersection of retail trading, gamified skill competitions, referral economies, and high-frequency data integration, its administrative console cannot be a generic CRUD backend. It must function as an institutional command center that delivers:

1. **Uncompromising Operational Controls:** Granular Role-Based Access Control (RBAC), multi-party approval workflows (4-eyes principle), dynamic feature flags, and instant system kill switches.
2. **Regulatory-Grade Auditability:** Immutable, tamper-evident audit trails satisfying OWASP ASVS v4.0, SOC 2 CC6.8/7.2, and NIST SP 800-92 standards for every administrative decision and ledger mutation.
3. **Full-Funnel Analytics & Attribution:** Real-time visibility into the complete trader lifecycle—from visitor arrival to waitlist registration, MT5 connection, Discord pairing, and active competition.
4. **Resilient Integration Management:** Continuous health checks, zero-exposure secret rotation, interactive connection testing, and rate-limit observability across MT5 bridges, AI backends (Vesper/Koda/Base44), Discord bots, and partner IB endpoints.

---

## 1. Admin Controls Checklist

Financial platforms requiring institutional trust enforce strict segregation of duties, operational safety mechanisms, and dual-authorization gates for high-risk operations.

### 1.1 Role-Based Access Control (RBAC) Matrix

FORTREX implements the **Principle of Least Privilege (PoLP)**. Administrative privileges are partitioned across five defined roles:

| Role Name | Scope & Purpose | User Management | MT5 Data / Sync | REX Ledger & Currency | Integration Hub & Secrets | Kill Switches & Flags | 4-Eyes Approval Execution |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Super Admin** | Platform Owner / Lead Ops. Oversees infrastructure & system integrity. Cannot execute solo money/currency updates. | Full (Create/Edit) | Read / Force Polling | Read Only | Full Control | Full Control | Maker / Checker |
| **Risk & Compliance Officer** | Audits user activity, enforces anti-cheat rules, monitors legal compliance & REX integrity. | Read Only | Full Read & Disconnect | Read & Audit Logs | Read Only | Can Trigger Freeze | Checker Only |
| **Support Analyst** | Customer support & dispute triage. Inspects profile state and MT5 connection status. | Read / Masked PII | Read Only (No keys) | Read Only | No Access | No Access | Denied |
| **Partner Manager** | Oversees IB partner relationships, referral links, and commission calculations. | Partner Scope Only | No Access | Referral Scope | Partner Webhooks | No Access | Maker (IB Payouts) |
| **Auditor (Read-Only)** | External regulatory or compliance auditor. Immutable read-only view of logs. | Read (Masked) | Read (Masked) | Read Ledger | Read (Masked) | No Access | Denied |

### 1.2 Operational Kill Switches & Circuit Breakers

In high-velocity trading environments, admins need single-click operational controls to isolate faults or suspend subsystems without tearing down the entire infrastructure.

```
+-----------------------------------------------------------------------------------+
|                            FORTREX EMERGENCY CONTROL PANEL                        |
+-----------------------------------------------------------------------------------+
| [!] GLOBAL MT5 SYNC PAUSE     : [ ENABLED  | ACTIVE ]  -> Polling Halted          |
| [!] REX ISSUANCE FREEZE       : [ DISABLED | NORMAL ]  -> Issuance Active         |
| [!] REFERRAL & IB BONUS LOCK  : [ DISABLED | NORMAL ]  -> Accruals Active         |
| [!] DISCORD BOT INTEGRATION   : [ ENABLED  | MUTED  ]  -> Webhooks Paused         |
| [!] TOURNAMENT ENTRY LOCK     : [ DISABLED | NORMAL ]  -> Registrations Open      |
+-----------------------------------------------------------------------------------+
```

1. **Global MT5 Read-Sync Pause:** Instantly halts incoming MT5 polling and trade synchronization across all connected accounts. Prevents corrupt MT5 broker feeds or upstream API outages from corrupting leaderboard standings. Incoming data is buffered in Redis stream queues.
2. **REX Issuance & Ledger Freeze:** Suspends all automatic REX rewards (daily check-in streaks, tournament placement awards, referral bonuses). Existing balances remain untouched; minting engine returns `503 Service Unavailable (Freeze Active)`.
3. **Referral & Partner Commission Lock:** Temporarily halts partner credit calculations and referral link attributions during suspected referral fraud campaigns or bot floods.
4. **Discord Bot Integration Mute:** Disables outward Discord webhook dispatch and role synchronization if Discord API experiences rate-limit bans or security breaches.
5. **Tournament Entry & Ticket Fee Lock:** Suspends new tournament entry ticket sales or REX entry fees during maintenance or liquidity verification.

### 1.3 Approval Workflows & 4-Eyes Principle (Dual Authorization)

The **4-Eyes Principle (Maker-Checker Workflow)** mandates that high-risk administrative actions initiated by one administrator (`Maker`) cannot take effect until reviewed and approved by a second administrator (`Checker`).

#### 1.3.1 Operations Subject to Dual Authorization

- Manual REX ledger adjustments exceeding **500 REX** or total aggregate batch adjustment > **2,500 REX**.
- Elevation of user accounts to administrative roles or invite of new Admin users.
- Production feature flag toggles affecting tournament scoring rules, REX multipliers, or entry fee structures.
- Partner IB commission payout releases or rate tier updates.
- Permanent deletion or manual modification of trader profile verification records.

#### 1.3.2 4-Eyes State Machine & Execution Lifecycle

```
[ Maker Initiates Action ]
           |
           v
   ( State: PENDING_APPROVAL ) ---> Writes draft payload to Approval Queue
           |                   ---> Dispatches Webhooks & Push to Checkers
           |
    +------+------+
    |             |
    v             v
[ Checker      [ Checker
  Approves ]     Rejects ]
    |             |
    v             v
( APPROVED )   ( REJECTED ) ---> Audit log entry created with rejection reason
    |
    v
[ Automated Execution Service ]
    |
    +---> Validates Maker != Checker
    +---> Re-verifies Hardware 2FA / WebAuthn of Checker
    +---> Executes Mutation in Database Transaction
    +---> Emits WORM Audit Event (Action + Maker ID + Checker ID)
    v
( EXECUTED )
```

- **Timeout & Escalation:** Unapproved requests automatically expire after **24 hours**, setting status to `EXPIRED`.
- **Conflict Enforcement:** Backend DB triggers enforce `maker_id != checker_id`. An administrator cannot approve their own request under any circumstance.

### 1.4 Feature Flags & Cohort Targeting

- **Granular Scope:** Flags can be targeted globally, per environment (`staging`/`prod`), per partner cohort, or per user tier (`Genesis Waitlist`, `VIP Traders`, `Standard Users`).
- **Automated Circuit Breaker Rollback:** If a feature endpoint experiences an error rate exceeding **1.5%** over a 5-minute rolling window, the flag automatically reverts to its default safe state, notifying the lead ops team via PagerDuty/Slack.

---

## 2. Audit Trail Standards

Audit logs in financial platforms are subject to strict regulatory frameworks including **OWASP ASVS v4.0 (V7 Logging & Auditing)**, **SOC 2 CC6.8 & CC7.2**, **NIST SP 800-92**, and **FINRA/SEC Rule 17a-4** compliance principles.

### 2.1 Standardized Audit Event Schema

Every administrative action, system mutation, or high-risk query must emit a structured JSON audit event conforming to the canonical schema:

```json
{
  "event_id": "01923e4f-7b89-7000-8001-a1b2c3d4e5f6",
  "timestamp": "2026-09-29T20:45:00.000000Z",
  "schema_version": "1.0",
  "actor": {
    "user_id": "usr_admin_8812",
    "role": "Super Admin",
    "email": "admin@fortrex.io",
    "ip_address": "198.51.100.42",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...",
    "session_id": "sess_99381048a12",
    "mfa_verified": true,
    "mfa_method": "webauthn_hardware_key"
  },
  "action": {
    "category": "CURRENCY_ISSUANCE",
    "name": "rex.ledger.manual_credit",
    "risk_level": "CRITICAL",
    "requires_4eyes": true,
    "approval_id": "appr_7719203"
  },
  "target": {
    "entity_type": "USER_LEDGER",
    "entity_id": "usr_trader_4091",
    "secondary_id": "ledger_rec_100293"
  },
  "state_change": {
    "before": {
      "balance": 1500,
      "tier": "Gold",
      "updated_at": "2026-09-28T14:20:00Z"
    },
    "after": {
      "balance": 2500,
      "tier": "Gold",
      "updated_at": "2026-09-29T20:45:00Z"
    },
    "delta": {
      "amount": +1000,
      "reason_code": "COMPETITION_DISPUTE_REIMBURSEMENT"
    }
  },
  "context": {
    "request_id": "req_abc123xyz890",
    "correlation_id": "corr_456789def012",
    "environment": "production",
    "origin_service": "admin-gateway-v1"
  },
  "integrity": {
    "hash_algorithm": "SHA-256",
    "payload_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "previous_event_hash": "a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0"
  }
}
```

### 2.2 Immutability & Anti-Tampering Architecture

To ensure audit records are legally defensible and tamper-proof:

1. **Write-Once-Read-Many (WORM) Storage:** Audit logs stream directly from the Admin API Gateway to an immutable bucket configured with **AWS S3 Object Lock in Compliance Mode** (or GCP Bucket Lock). Once written, logs cannot be modified, truncated, or deleted by any user or administrator—even root AWS accounts—until the retention period expires.
2. **Cryptographic Hash Chaining (Merkle Tree / HMAC Chaining):** Every audit event payload includes `previous_event_hash`, computing a cryptographic hash chain. If a malicious actor modifies or deletes a row in a secondary database store, the chain breaks instantly, triggering a critical security alert.
3. **Write-Only Pipeline Isolation:** The Admin Console backend possesses `INSERT`-only database privileges on audit tables. `UPDATE`, `DELETE`, `TRUNCATE`, or `DROP` commands are explicitly revoked at the PostgreSQL grant level.

### 2.3 Admin Action Reviews & Forensic Auditing

- **Automated Anomaly Detection:** Continuous log screeners flag suspicious activities in real time:
  - Concurrent logins for the same admin credential from distant geo-locations.
  - Multi-attempt administrative 2FA failures (> 3 attempts).
  - Bulk exports of user data or trade history logs.
  - Administrative actions taken outside declared operational hours.
- **Compliance Review UI:** Risk & Compliance officers receive a daily digest of unreviewed `CRITICAL` and `HIGH` risk admin actions requiring digital sign-off.
- **Retention Lifecycle:**
  - **Financial & Currency Logs (REX Ledger, Payouts, Approvals):** 7 Years (WORM Compliance Lock).
  - **Operational System Logs (Login, Session, Diagnostic):** 1 Year (Warm queryable storage).

---

## 3. Analytics & Attribution Dashboard Patterns

FORTREX's growth engine depends on seamless conversion tracking across dark-mode landing pages, referral programs, IB partner pipelines, and active tournament trading.

### 3.1 Full-Funnel Conversion Architecture

The admin console provides real-time visualization of the four core funnel stages:

```
[ STAGE 1: VISITOR ] ----> [ STAGE 2: REGISTERED ] ----> [ STAGE 3: CONNECTED ] ----> [ STAGE 4: ACTIVE ]
  - Landing Page            - Genesis Waitlist             - MT5 Read Connection        - Tournament Entry
  - Partner UTM / Ref Link   - Verified Phone/Email         - Discord Account Paired     - Daily Check-in Streak
  - Unique Device Finger    - Seat Reserved (# / 10,000)   - Account Verification       - REX Earned / Spent
```

#### Key Funnel Metrics & Visualizations

- **Conversion Rate per Step:** Instant breakdown of drop-off percentages between registration and MT5 connection.
- **Velocity Tracking:** Average time elapsed from initial landing to MT5 account verification (target: < 4 minutes).
- **Cohort Analysis:** Conversion retention curves grouped by signup week, campaign source, and partner attribution.

### 3.2 Partner & IB Attribution Hub

Partner referrals are a primary growth driver for FORTREX. The admin console attribution hub features:

- **Multi-Touch Attribution Display:** Tracks first-touch (initial landing click), last-touch (final referral code entry at signup), and assist channels.
- **Real-Time Partner Performance Cards:**
  - Total Traffic Directed (Clicks / Unique Visitors).
  - Verified Genesis Signups.
  - Connected MT5 Traders.
  - Aggregate Trading Volume & Active Tournament Entries.
  - IB Rebate Accruals & Tier Multipliers (e.g., Tier 1: 10% → Tier 3: 25%).
- **Anti-Fraud & Self-Referral Shield:**
  - Automated detection of IP subnet clusters sharing device fingerprints across referrer and referee accounts.
  - Flagging referral chains where referee accounts remain inactive without MT5 connection.

### 3.3 Live REX Currency Issuance Audit Trail

Because REX is FORTREX's central reputation and utility currency, its issuance must be fully audited and reconciled in real time.

```
+-----------------------------------------------------------------------------------+
|                           REX CURRENCY ISSUANCE AUDIT PANEL                       |
+-----------------------------------------------------------------------------------+
| Total Issued All-Time : 14,250,000 REX | Daily Minting Velocity : 142,500 REX/day |
| Total Burned / Spent  :  3,100,000 REX | Emission Hard Cap      : 500,000 REX/day |
| Total Locked          :  1,850,000 REX | Anomaly Alert Status   : [ CLEAN / OK ]  |
| Net Circulating Supply:  9,300,000 REX | Reconciliation Status  : [ 100% BALANCED ]|
+-----------------------------------------------------------------------------------+
```

- **Daily Minting Velocity vs Algorithmic Hard Cap:** Real-time progress gauge showing daily REX issued across daily check-ins, tournament winnings, and referral bonuses against the system safety hard cap (e.g., 500,000 REX/day).
- **Issuance Reason Breakdown:** Pie chart categorizing daily minting sources (`STREAK_CHECKIN`, `TOURNAMENT_PRIZE`, `REFERRAL_BONUS`, `ADMIN_ADJUSTMENT`).
- **Statistical Anomaly Alerts:** Automated trigger if any single user account earns REX exceeding **3 standard deviations** above the cohort median within 24 hours.

### 3.4 Data Auditing & Reconciliation UI

- **Automated Ledger-to-Trade Reconciliation:** Every 15 minutes, an automated background job reconciles REX ledger awards against underlying verified MT5 trade logs and tournament scorecards.
- **Reconciliation Status Badge:** Green `100% Reconciled` badge displayed in the admin header. If any discrepancy is detected, the badge turns red (`Discrepancy: +150 REX Unaccounted`), automatically freezing manual REX adjustments and notifying compliance.

---

## 4. Integration & Connection Management Patterns

FORTREX connects to multiple external and internal services: MT5 Read-Only API Bridges, AI Superagents (Vesper/Koda/Base44), Discord Bot APIs, and Partner Webhooks.

### 4.1 Hub Architecture & Status Monitoring

The Integration Hub presents a centralized grid of all external connectors:

| Integration Name | Connector Type | Status | Latency (Ping) | 5-Min Error Rate | Quota / Rate Limit Usage | Last Health Check | Actions |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **MT5 Bridge East-1** | Trading Data Sync | `HEALTHY` | 42 ms | 0.02% | 1,240 / 5,000 req/min | 10s ago | [ Test ] [ Rotate Secret ] |
| **Vesper / Base44 AI**| Superagent Service | `HEALTHY` | 180 ms | 0.10% | 4,200 / 10,000 daily | 25s ago | [ Test ] [ Configure ] |
| **Discord Bot API** | Community Sync | `DEGRADED` | 450 ms | 2.45% | 480 / 500 req/min | 5s ago | [ Test ] [ Pause Sync ] |
| **Partner IB Webhook**| Referral Tracking | `HEALTHY` | 95 ms | 0.00% | 120 / 1,000 req/min | 1m ago | [ Test ] [ View Logs ] |

### 4.2 Interactive Test-Connection Diagnostic Tool

Clicking **"Test Connection"** executes an inline diagnostic suite with a structured pass/fail breakdown:

```
[ DIAGNOSTIC RUN: MT5 Bridge East-1 ]
------------------------------------------------------------------
[✓] Step 1: DNS Resolution & Network Route ......... OK (4 ms)
[✓] Step 2: TLS Certificate & Cipher Handshake ...... OK (12 ms)
[✓] Step 3: API Key Authentication & HMAC Sign ....... OK (18 ms)
[✓] Step 4: Permission Scope Check (Read-Only) ...... OK (Passed)
[✓] Step 5: Read-Only Account State Payload Ping ... OK (8 ms)
------------------------------------------------------------------
RESULT: ALL CHECKS PASSED — Service Operational (Latency: 42 ms)
```

If a check fails (e.g., expired API token or rate-limit throttle), the tool presents an actionable error remediation code (`ERR_AUTH_EXPIRED_ROTATE_KEY`) with direct links to secret rotation options.

### 4.3 Secret Rotation Without Exposure

Handling sensitive API keys, database credentials, and webhook signing secrets requires zero-exposure UI patterns:

1. **Masked Key Display:** Keys are displayed as `fk_live_9a7x...3k9d`. The full plain-text secret is shown **only once** at creation time inside an explicit single-view modal.
2. **Dual-Active Key Grace Period (Zero-Downtime Rotation):**
   - When generating a new API key, the system transitions to a **Dual-Active State**.
   - The secondary (old) key remains valid for a configurable grace period (e.g., 24 to 48 hours).
   - Once the new key is deployed in consumer services, the admin clicks "Complete Rotation & Deactivate Old Key", generating an audited event.
3. **One-Click Instant Revocation:** In the event of a credential compromise, admins can instantly revoke a key via a confirmed 2FA modal.

### 4.4 Rate-Limit & Quota Visualizations

- **Dynamic Progress Bars:** Color-coded progress bars displaying real-time API quota consumption:
  - `< 70% Usage`: Green (Normal).
  - `70% - 90% Usage`: Amber (Warning threshold — dispatches admin notification).
  - `> 90% Usage`: Red (Critical threshold — auto-enforces request throttling or backoff).

---

## 5. Recommended FORTREX Admin Architecture (Concrete)

### 5.1 System Architecture Topology

```
+-----------------------------------------------------------------------------------+
|                               FORTREX ADMIN CONSOLE                               |
|                         (React / Next.js Admin UI Dashboard)                      |
+-----------------------------------------------------------------------------------+
                                          |
                                          v  (HTTPS / WSS + Hardware MFA Token)
+-----------------------------------------------------------------------------------+
|                                 ADMIN API GATEWAY                                 |
|  - JWT & WebAuthn MFA Verification                                               |
|  - RBAC Middleware (Casbin / OPA Policy Engine)                                   |
|  - 4-Eyes Workflow Interceptor & Maker-Checker State Machine                       |
|  - Masking Engine (Filters raw PII before UI response)                            |
+-----------------------------------------------------------------------------------+
        |                                 |                                 |
        v                                 v                                 v
+------------------+             +------------------+             +------------------+
| OPERATIONAL      |             | REX LEDGER       |             | INTEGRATIONS     |
| CONTROLS         |             | AUDIT ENGINE     |             | HUB SERVICE      |
| - Kill Switches  |             | - Append-only    |             | - MT5 Poller     |
| - Circuit Break  |             |   ledger verification           | - Discord Bot    |
| - Feature Flags  |             | - Hard-cap audit |             | - Secret Vault   |
+------------------+             +------------------+             +------------------+
        |                                 |                                 |
        +---------------------------------+---------------------------------+
                                          |
                                          v (Structured JSON Event Stream)
+-----------------------------------------------------------------------------------+
|                           IMMUTABLE WORM AUDIT PIPELINE                           |
|  - PostgreSQL Audit Table (INSERT Only, No UPDATE/DELETE grants)                 |
|  - Cryptographic Hash Chainer (SHA-256 Merkle Link)                               |
|  - AWS S3 Object Lock / GCP Compliance Bucket (7-Year Lock for Financial Events) |
+-----------------------------------------------------------------------------------+
```

### 5.2 TypeScript Data Schemas for Admin Engine

```typescript
// ==========================================
// 1. AUDIT LOG EVENT SCHEMA
// ==========================================
export interface AuditLogEvent {
  event_id: string; // UUIDv7 (K-sortable)
  timestamp: string; // ISO 8601 UTC microsecond
  schema_version: '1.0';
  actor: {
    user_id: string;
    role: 'SuperAdmin' | 'ComplianceOfficer' | 'SupportAnalyst' | 'PartnerManager' | 'Auditor';
    email: string;
    ip_address: string;
    user_agent: string;
    session_id: string;
    mfa_verified: boolean;
    mfa_method: 'webauthn' | 'totp' | 'hardware_key';
  };
  action: {
    category: 'RBAC' | 'CURRENCY_ISSUANCE' | 'KILL_SWITCH' | 'FEATURE_FLAG' | 'INTEGRATION_SECRET' | 'USER_DATA';
    name: string; // e.g., 'rex.ledger.manual_credit'
    risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    requires_4eyes: boolean;
    approval_id?: string;
  };
  target: {
    entity_type: string;
    entity_id: string;
    secondary_id?: string;
  };
  state_change: {
    before: Record<string, unknown> | null;
    after: Record<string, unknown> | null;
    delta?: Record<string, unknown>;
  };
  context: {
    request_id: string;
    correlation_id: string;
    environment: 'staging' | 'production';
    origin_service: string;
  };
  integrity: {
    hash_algorithm: 'SHA-256';
    payload_hash: string;
    previous_event_hash: string;
  };
}

// ==========================================
// 2. APPROVAL WORKFLOW (4-EYES) REQUEST SCHEMA
// ==========================================
export interface ApprovalWorkflowRequest {
  approval_id: string;
  action_type: string;
  maker_id: string;
  maker_email: string;
  checker_id?: string;
  checker_email?: string;
  status: 'PENDING_APPROVAL' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
  risk_level: 'HIGH' | 'CRITICAL';
  payload_draft: Record<string, unknown>;
  before_snapshot: Record<string, unknown>;
  created_at: string; // ISO 8601 UTC
  expires_at: string; // ISO 8601 UTC (24h default)
  decided_at?: string;
  rejection_reason?: string;
}

// ==========================================
// 3. OPERATIONAL KILL SWITCH CONFIG SCHEMA
// ==========================================
export interface KillSwitchConfig {
  switch_id: 'mt5_sync_pause' | 'rex_issuance_freeze' | 'referral_bonus_lock' | 'discord_bot_mute' | 'tournament_entry_lock';
  is_active: boolean; // true = Kill Switch Engaged
  engaged_by: string; // Admin User ID
  engaged_at: string;
  reason: string;
  affected_subsystems: string[];
}

// ==========================================
// 4. INTEGRATION HEALTH STATUS SCHEMA
// ==========================================
export interface IntegrationHealthStatus {
  integration_id: string;
  name: string;
  type: 'MT5_BRIDGE' | 'VESPER_AI' | 'DISCORD_BOT' | 'PARTNER_WEBHOOK';
  status: 'HEALTHY' | 'DEGRADED' | 'DOWN' | 'PAUSED';
  latency_ms: number;
  error_rate_5m: number;
  quota_usage: {
    used: number;
    limit: number;
    reset_at: string;
  };
  last_health_check: string;
  active_secret_masked: string;
  dual_active_until?: string;
}
```

### 5.3 Step-by-Step High-Risk Execution Flow

To illustrate concrete enforcement, below is the execution flow when an admin attempts a manual REX ledger credit exceeding threshold limits:

1. **Request Initiation (Maker):** Super Admin A submits a request to credit 1,000 REX to Trader B.
2. **Gateway Interception:** Admin API Gateway detects `action = rex.ledger.manual_credit` and `amount > 500`. The gateway flags `requires_4eyes = true`.
3. **Draft Creation:** The mutation is **not** written to the live REX ledger. Instead, an `ApprovalWorkflowRequest` record is created with status `PENDING_APPROVAL`.
4. **Checker Notification:** A real-time notification (Slack/Discord/Email) is dispatched to compliance officers holding the `Risk & Compliance Officer` or `Super Admin` role.
5. **Review & Verification (Checker):** Compliance Officer C opens the Approval Queue in the Admin Console, inspecting the side-by-side `before` and `after` snapshots and reason code.
6. **MFA Challenge:** Checker C clicks "Approve", prompting a mandatory WebAuthn hardware key biometric verification.
7. **Execution & WORM Logging:**
   - The Gateway verifies `Maker A != Checker C`.
   - The REX Ledger Engine executes the append-only ledger mutation inside a PostgreSQL transaction.
   - The Audit Logger computes the SHA-256 payload hash, chains it to the previous audit record's hash, and writes the event to both the database and the S3 Object Lock WORM bucket.
8. **Confirmation:** The request status converts to `EXECUTED`, updating the UI in real time.

---

## Conclusion & Implementation Roadmap

Implementing this administrative architecture ensures FORTREX meets financial regulatory expectations, guarantees absolute REX currency auditability, protects against insider threats, and provides complete visibility into user growth funnels.

- **Phase 1 (October P1):** Deploy RBAC Matrix, Immutable Audit Event Schema, and Core Operational Kill Switches.
- **Phase 2 (October P2):** Implement 4-Eyes Maker-Checker State Machine and S3 Object Lock WORM Pipeline.
- **Phase 3 (Pre-Launch P3):** Activate Full-Funnel Attribution Analytics, Integration Hub Health Monitoring, and Automated Ledger-to-Trade Reconciliation.
