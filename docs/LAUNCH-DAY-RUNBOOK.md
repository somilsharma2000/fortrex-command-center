# FORTREX LAUNCH-DAY RUNBOOK
**Document Version:** 1.0.0 (Final)  
**Target Launch Date:** November 7, 2026 (09:00 IST / 03:30 UTC)  
**Target Repositories:**  
- Platform Code: `github.com/somilsharma2000/fortrex-platform` (`growth-lab-v1` → `main`)  
- Command Center Docs: `github.com/somilsharma2000/fortrex-command-center`  
**Production Host:** `fortrex-platform.vercel.app` (or custom domain `fortrex.com` once purchased)  
**Database:** Neon Postgres (`dawn-surf-72239932`, `production` branch)  

---

## EXECUTIVE OVERVIEW

This runbook defines the exact, minute-by-minute operational procedure for the public launch of **FORTREX** on **November 7, 2026**. 

### Primary Launch Objective
Lift the stealth barrier (`STEALTH_MODE=false`), transition the Season Zero tournament from `draft` → `upcoming` → `open` at **09:00 IST**, onboard waitlist members as founding Genesis members with a `1.25x` REX multiplier, and enable live MT5/Demo competition scoring with zero downtime and strict risk controls.

### Operations Roster & Roles
- **Launch Lead / Coordinator:** Manages the timeline, executes Git merges, coordinates GO signals.
- **Platform / Database Lead:** Executes Neon DB backups, schema migrations, and Vercel deployments.
- **QA & Verification Lead:** Runs health probes, `robots.txt`/`sitemap.xml` validation, and browser test sweeps.
- **Community & Comms Lead:** Manages waitlist email dispatches, Discord community setup, and announcement posts.
- **Founder:** Final GO/NO-GO authority, TOTP key holder, custom domain owner, legal/broker signer.

---

## 1. T-2 DAYS CHECKLIST (NOVEMBER 5, 2026)

Execute all steps below on **November 5, 2026 (48 hours prior to launch)**.

### 1.1 Code Freeze & Repository Lock
- [ ] **Freeze Enforcement:** Lock branch `growth-lab-v1`. No new features or refactors allowed. Only critical hotfixes approved by Launch Lead.
- [ ] **Git Audit:** Verify `origin/growth-lab-v1` is clean and synchronized across local and remote.
  ```bash
  cd /app/conversations/6ab6fee47f5a92622989f23e/fortrex-platform-git
  git checkout growth-lab-v1
  git status
  git log -1
  ```

### 1.2 Final Test Battery Execution
- [ ] **Automated Unit & Integration Suite (87+ assertions):**
  ```bash
  npm run test
  ```
  *Pass criteria:* 0 failures, 100% test pass.
- [ ] **Typecheck & Production Build Dry-Run:**
  ```bash
  npm run typecheck
  npm run build
  ```
  *Pass criteria:* Zero TypeScript errors, Next.js build succeeds with static/dynamic route mapping.
- [ ] **Real Headless Browser Sweep (`npm run test:browser`):**
  ```bash
  npm run test:browser
  ```
  *Pass criteria:* 13/13 routes PASS (signed-out AND signed-in), zero thrown JavaScript/client hydration errors.

### 1.3 Database Backup & Restore Point Setup
- [ ] **Database Connection Verification:** Confirm `DATABASE_URL` targets the Neon production host (`ep-billowing-voice-...`).
- [ ] **Create Copy-on-Write Neon Branch:**
  Create branch `pre-merge-2026-11-05` from Neon production branch via Neon Console / CLI.
  ```bash
  # Record Neon Branch ID in DECISIONS.md
  echo "Neon Restore Point created: pre-merge-2026-11-05" >> docs/DECISIONS.md
  ```
  *Pass criteria:* Branch created in <10 seconds with 100% schema + data parity.

### 1.4 Rollback Readiness Audit
- [ ] **Schema Backward-Compatibility Test:** Confirm migrations `0003` through `0014` are additive (only `CREATE TABLE IF NOT EXISTS`, `ADD COLUMN IF NOT EXISTS`, `ALTER TYPE ... ADD VALUE`).
- [ ] **Code Revert Dry Run:** Verify that `origin/main` code runs safely against the migrated database schema without crashing.

### 1.5 Secrets & Environment Variable Audit
- [ ] **Verify Secret Keys in Vercel Production Environment:**
  - `BETTER_AUTH_SECRET` (32+ chars)
  - `ADMIN_TOTP_SECRET` (Base32 encoded secret enrolled in Founder/Admin Authenticator)
  - `ADMIN_EMAILS` (Set to founder email)
  - `CRON_SECRET` (32+ random chars generated specifically for production cron)
  - `NEXT_PUBLIC_SITE_URL` (Set to `https://fortrex-platform.vercel.app` or custom domain)
  - `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN` (Rate limiting)
  - `METAAPI_TOKEN` (Optional: set if live MT5 accounts connected)
  - `RESEND_API_KEY` (Transactional emails)

---

## 2. LAUNCH MORNING MINUTE-BY-MINUTE RUNBOOK (NOVEMBER 7, 2026)

Target Open Time: **09:00 IST (03:30 UTC)**.

| Time (IST) | Phase | Action | Step # | Owner | Detailed Execution Instructions |
|---|---|---|---|---|---|
| **06:00** | T-180m | System Check & Restore Point | S-01 | Platform Lead | Verify Neon production DB status. Re-verify Neon restore branch `pre-merge-2026-11-05`. |
| **06:30** | T-150m | Founder GO Signal | S-02 | Founder / Lead | Founder confirms 7-step E2E test pass & issues explicit "GO FOR LAUNCH" signal. |
| **07:00** | T-120m | Code Merge | S-03 | Launch Lead | Merge `growth-lab-v1` → `main`. Verify commit hash on `origin/main`. |
| **07:15** | T-105m | DB Migration | S-04 | Platform Lead | Execute Drizzle migrations against Neon production DB. |
| **07:30** | T-90m | Production Deployment | S-05 | Platform Lead | Trigger production Vercel build from clean rsync snapshot. |
| **07:50** | T-70m | Env Flips (Stealth Lift) | S-06 | Ops Lead | Set `STEALTH_MODE=false` in Vercel Prod Env. Trigger fast redeploy. |
| **08:00** | T-60m | Live Stealth Verification | S-07 | QA Lead | Probe `/robots.txt` (must allow) and `/sitemap.xml` (must return valid XML). |
| **08:15** | T-45m | Waitlist Import / Invites | S-08 | Community Lead | Trigger waitlist conversion & founding member invite dispatches. |
| **08:30** | T-30m | Tournament Transition (Upcoming)| S-09 | Admin / Founder | Call POST `/api/admin/tournament` (`draft` → `upcoming`) with TOTP header. |
| **08:40** | T-20m | Discord Integration | S-10 | Community Lead | Connect Discord Bot Token in Admin Console; test link widget on dashboard. |
| **08:50** | T-10m | Custom Domain & Search Console | S-11 | Founder / QA | Point domain to Vercel (if purchased) & submit sitemap to Google Search Console. |
| **09:00** | **T-0m** | **SEASON ZERO OPENS** | S-12 | Admin / Founder | Call POST `/api/admin/tournament` (`upcoming` → `open`) with TOTP header. |
| **09:05** | T+5m | Comms Announcement | S-13 | Growth Lead | Publish launch announcement on Discord, X/Twitter, and waitlist email broadcast. |
| **09:15** | T+15m | Live Scoring Cron Verification | S-14 | Platform Lead | Trigger GET `/api/cron/live-scoring` with Bearer secret. Confirm 200 OK. |
| **09:30** | T+30m | Post-Launch Monitor | S-15 | All Hands | Monitor error logs, database connections, rate limits, and signup flows. |

---

## 3. STEP-BY-STEP VERIFICATION GATE MATRIX

Every step in the launch sequence must pass its explicit verification gate before proceeding to the next step.

```
+---------------------------------------------------------------------------------------------------+
| STEP | ACTION                  | VERIFICATION METHOD / COMMAND               | EXPECTED RESULT     |
+---------------------------------------------------------------------------------------------------+
| S-01 | DB & System Readiness   | SELECT count(*) FROM users; on Neon prod    | 200 OK, DB online   |
| S-02 | Founder GO Signal       | Written confirmation in launch channel     | Explicit "GO"       |
| S-03 | Git Merge               | git log origin/main -1                     | Match growth-lab-v1 |
| S-04 | DB Migration            | npx drizzle-kit migrate / SQL verification  | All tables present  |
| S-05 | Production Deploy       | curl -I https://fortrex-platform.vercel.app  | HTTP/2 200 OK       |
| S-06 | Stealth Env Flip        | Vercel Env check: STEALTH_MODE=false        | Env updated         |
| S-07 | Stealth Lift Validation | curl https://fortrex-platform.vercel.app/robots.txt | User-agent: * Allow |
| S-08 | Waitlist Dispatches     | GET /api/admin/analytics (Auth + MFA)       | Invites dispatched  |
| S-09 | Tournament -> Upcoming  | POST /api/admin/tournament (TOTP header)    | Status: "upcoming"  |
| S-10 | Discord Verification    | GET /api/admin/discord                      | Bot connected 200   |
| S-11 | Search Console          | GSC Sitemap Status                          | Submitted / Success |
| S-12 | Season Zero Opening     | POST /api/admin/tournament (TOTP header)    | Status: "open"      |
| S-13 | Comms Broadcast         | Public link check                           | Post live 200 OK    |
| S-14 | Live Scoring Cron Check | curl -H "Authorization: Bearer $CRON_SECRET"| 200 OK, scored > 0  |
+---------------------------------------------------------------------------------------------------+
```

### Detailed Verification Protocol for Critical Steps

#### S-04: Database Migration Gate
```bash
# Verify schema columns exist in Neon Production DB
psql $DATABASE_URL -c "\dt"
psql $DATABASE_URL -c "SELECT column_name FROM information_schema.columns WHERE table_name='users' AND column_name='genesis_seat';"
```
*Expected Output:* `genesis_seat` column present, `waitlist_entries` table present, `partner_claims` table present.

#### S-07: Robots.txt & Sitemap Gate
```bash
curl -s https://fortrex-platform.vercel.app/robots.txt
```
*Expected Output:*
```txt
User-agent: *
Allow: /
Sitemap: https://fortrex-platform.vercel.app/sitemap.xml
```

```bash
curl -s https://fortrex-platform.vercel.app/sitemap.xml | head -n 10
```
*Expected Output:* Valid XML document containing `<urlset>` and canonical page URLs (`/`, `/legal`, `/learn`, `/leaderboard`, `/hall-of-fame`, `/tournaments`).

#### S-09 & S-12: Tournament Opening Gate (Admin TOTP Gated)
Status transitions require Admin/Owner session AND the `x-admin-totp` header carrying a valid 6-digit TOTP code.

```bash
# Obtain current TOTP code from Google Authenticator / scripts/totp-now.ts
TOTP_CODE=$(npx tsx scripts/totp-now.ts)

# Step 1: Draft -> Upcoming
curl -X POST https://fortrex-platform.vercel.app/api/admin/tournament \
  -H "Content-Type: application/json" \
  -H "x-admin-totp: $TOTP_CODE" \
  -b "better-auth.session_token=$ADMIN_SESSION_TOKEN" \
  -d '{"id": "<SEASON_ZERO_ID>", "action": "setStatus", "status": "upcoming"}'
```
*Expected Response:* `{"success": true, "status": "upcoming"}`

```bash
# Step 2: Upcoming -> Open
curl -X POST https://fortrex-platform.vercel.app/api/admin/tournament \
  -H "Content-Type: application/json" \
  -H "x-admin-totp: $TOTP_CODE" \
  -b "better-auth.session_token=$ADMIN_SESSION_TOKEN" \
  -d '{"id": "<SEASON_ZERO_ID>", "action": "setStatus", "status": "open"}'
```
*Expected Response:* `{"success": true, "status": "open"}`

*Note:* Direct transition from `draft` → `open` is rejected with `409 Conflict` by `ALLOWED_TRANSITIONS` (`draft` must go to `upcoming` first, then `upcoming` to `open`).

---

## 4. FAILURE PLAYBOOK & EMERGENCY PROCEDURES

### 4.1 Scenario A: Production Vercel Deploy Fails or Hard Crashes
**Symptoms:** Vercel deployment build error, 500 Functional Error, or Client Hydration Crash on landing page.

**Response Steps:**
1. **Instant Vercel Rollback:** Promote previous deployment in Vercel Dashboard, or run:
   ```bash
   vercel rollback
   ```
2. **Verify App Stability:** Confirm `/api/health` returns 200 OK.
3. **Investigate Build Logs:** Inspect Vercel build output for missing environment variables, bundling failures, or invalid client/server component imports.
4. **Fix & Snapshot Re-deploy:** Apply fix in `growth-lab-v1`, test build locally, create fresh snapshot (excluding `.git` and `.next`), and redeploy.

---

### 4.2 Scenario B: Database Migration Fails or Locks
**Symptoms:** Drizzle migration script errors out, connection pool exhausted, or schema lock timeout.

**Response Steps:**
1. **Isolate Statement Failure:** Identify the failing migration file (e.g., `0004_...sql`).
2. **Handle Enum Alterations Outside Transactions:** Postgres enums (`ALTER TYPE ... ADD VALUE`) cannot run inside a multi-statement transaction block. Execute the statement directly via `psql`:
   ```sql
   ALTER TYPE broker_provider ADD VALUE IF NOT EXISTS 'metaapi';
   ```
3. **Rollback to Restore Point (If Data/Schema Corrupted):**
   - Point Vercel `DATABASE_URL` to the Neon restore branch `pre-merge-2026-11-05`.
   - Re-run application health checks.

---

### 4.3 Scenario C: Live Scoring / Cron Fails or Times Out
**Symptoms:** Cron route `/api/cron/live-scoring` returns 500/504, or Vercel function times out (45s budget exceeded).

**Response Steps:**
1. **Identify Cause:** Check Vercel function logs for MetaApi rate limiting, socket timeouts, or database query sluggishness.
2. **Circuit-Break Broker Sync:** If MetaApi is failing or slow, toggle the `mt5_sync` kill switch OFF in the Admin Console.
   - *Result:* `live-scoring` cron will skip external broker network calls but continue scoring existing imported trade data safely without failing.
3. **Manual Batch Execution:** Trigger scoring individually per tournament via Admin API:
   ```bash
   curl -X POST https://fortrex-platform.vercel.app/api/admin/tournament \
     -H "x-admin-totp: $TOTP_CODE" \
     -d '{"id": "<SEASON_ZERO_ID>", "action": "runScoring"}'
   ```

---

### 4.4 Scenario D: Fraud Storm, Bot Attack, or Data Incident
**Symptoms:** Rapid signups, referral spam, fake trade claims, or system abuse.

**Response Steps — Immediate Kill-Switch Activation:**
The platform features 9 DB-backed kill switches in `feature_flags` with a 60-second in-memory TTL. Toggle these instantly in **Admin Console → Integrations → Kill Switches** or via SQL:

```sql
-- Emergency SQL Kill Switch Overrides
UPDATE feature_flags SET enabled = false, updated_at = NOW() WHERE key = 'tournament_join';
UPDATE feature_flags SET enabled = false, updated_at = NOW() WHERE key = 'broker_connect';
UPDATE feature_flags SET enabled = false, updated_at = NOW() WHERE key = 'referrals';
UPDATE feature_flags SET enabled = false, updated_at = NOW() WHERE key = 'rex_earning';
UPDATE feature_flags SET enabled = false, updated_at = NOW() WHERE key = 'mt5_sync';
UPDATE feature_flags SET enabled = false, updated_at = NOW() WHERE key = 'discord_activity';
```

#### Kill Switch Capability Matrix:
- `tournament_join`: Prevents new users from joining competitions.
- `checkin`: Disables daily streak check-ins.
- `broker_connect`: Blocks new broker credentials / MT5 connections.
- `referrals`: Pauses referral bonus minting in REX ledger.
- `rex_earning`: Freezes all REX reward issuance across the platform.
- `live_scoring`: Stops scheduled cron scoring loop.
- `mt5_sync`: Pauses external MT5 trade sync attempts.
- `discord_activity`: Freezes Discord daily activity REX rewards.

---

## 5. ITEMS BLOCKED ON FOUNDER & FALLBACK OPERATIONAL MODES

Five key launch assets require founder action. The platform is designed with explicit operational fallbacks if any founder item is unfulfilled at launch time.

```
+---------------------------------------------------------------------------------------------------+
| BLOCKED ITEM         | FOUNDER ACTION NEEDED           | FALLBACK MODE (LAUNCH WITHOUT IT)        |
+---------------------------------------------------------------------------------------------------+
| Custom Domain        | Purchase domain (fortrex.com/io)| Launch on `fortrex-platform.vercel.app`.  |
|                      | and point DNS to Vercel.        | Defer Search Console domain registration |
|                      |                                 | until domain is connected.               |
+----------------------+---------------------------------+------------------------------------------+
| MetaApi Token        | Paste MetaApi Access Token into | Operate in Demo Broker mode. Users join  |
|                      | Admin -> Integrations.          | tournaments with simulated demo accounts.|
|                      |                                 | Live MT5 connection gate stays locked.   |
+----------------------+---------------------------------+------------------------------------------+
| XM Partner Approval  | Provide XM Partner Tracking     | Keep Live Arena entry gated behind Mock  |
|                      | Link & written copy sign-off.   | Broker / Demo tracks. Display "XM        |
|                      |                                 | Verification Opening Shortly".           |
+----------------------+---------------------------------+------------------------------------------+
| Legal Counsel        | Provide written counsel on REX  | Keep REX firmly under Path A (pure       |
| Sign-off             | economy & India FEMA rules.     | utility/reputation point system with NO  |
|                      |                                 | cash redemption). Block India live track.|
+----------------------+---------------------------------+------------------------------------------+
| Founder GO Signal    | Complete 7-step E2E test pass   | Platform remains in frozen stealth mode. |
|                      | and grant launch GO.            | Launch sequence does NOT execute.        |
+----------------------+---------------------------------+------------------------------------------+
```

---

## 6. TOP LAUNCH-DAY RISKS & ORDERING DEPENDENCIES

### 6.1 Top 3 Risks on Launch Day

1. **Founder Dependency Bottlenecks (Domain, MetaApi Token, XM Wording Approval, GO Signal)**
   - *Risk:* If the custom domain is not pointed or XM approval/MetaApi token is missing on launch morning, the launch falls back to Vercel domains (`fortrex-platform.vercel.app`) and Mock broker mode. While technically functional, this creates a optics/trust mismatch for public marketing.
   - *Mitigation:* The runbook defines explicit, tested fallbacks for every single founder item so platform operations are never halted by a missing external credential.

2. **Admin TOTP Lockout / Status Transition Failure**
   - *Risk:* Admin operations (like transitioning Season Zero from `draft` → `upcoming` → `open`) require the `x-admin-totp` header when `ADMIN_TOTP_SECRET` is configured in production. Clock drift between the operator's authenticator app and Vercel servers, or an missing/misconfigured secret, would lock operators out of opening the tournament at 09:00 IST.
   - *Mitigation:* Pre-enroll and test TOTP generation (`scripts/totp-now.ts`) during T-2 days. Verify admin session and MFA during Step S-01.

3. **Cron Live-Scoring Execution Timeouts under Initial User Spike**
   - *Risk:* As new members connect MT5 accounts, the `live-scoring` cron function (`/api/cron/live-scoring`) must sync broker trades sequentially. Vercel function timeout (45s budget) could cause the cron to stop early or throw 504 errors during traffic spikes.
   - *Mitigation:* `runLiveScoring` includes an internal time-budget guard (stops cleanly before Vercel maxDuration) and error isolation (one failing connection does not crash the loop). If necessary, toggle `mt5_sync` off to score existing trades instantly without network delay.

---

### 6.2 Ordering Conflicts & Operational Constraints

#### Conflict 1: Waitlist Import vs. Season Zero Opening (CRITICAL)
- **Question:** Does the waitlist import / notification need to happen BEFORE Season Zero opens?
- **Verdict:** **YES. Waitlist member onboarding MUST happen BEFORE Season Zero opens.**
- **Technical & Operational Reason:**
  1. *Genesis Seat & Multiplier Allocation:* In the codebase (`src/lib/auth.ts`), every user created receives a `genesisSeat` and a `1.25x` REX multiplier via `assignGenesisSeat`. Waitlist entries are stored in `waitlist_entries`. When waitlist members receive their invites and register accounts, their genesis seats and `25 REX` welcome bonuses are minted in the `users` and `rex_ledger` tables.
  2. *Fair Competition Start:* Season Zero opens at **09:00 IST**. If Season Zero opens before waitlist members are notified/imported, founding members will miss the opening flag, experience delays in connecting their broker accounts, and suffer an unfair disadvantage on the leaderboard.
  3. *Correct Sequence:* Waitlist dispatches occur at **08:15 IST (Step S-08)**, giving founding members 45 minutes to register, claim their genesis seats, and connect their broker accounts before Season Zero opens at **09:00 IST (Step S-12)**.

#### Conflict 2: Strict Tournament Status Transitions (`draft` → `upcoming` → `open`)
- **Constraint:** In `src/app/api/admin/tournament/route.ts`, the `ALLOWED_TRANSITIONS` map specifies:
  - `draft` → `["upcoming", "cancelled"]`
  - `upcoming` → `["open", "cancelled"]`
- **Impact:** Attempting to transition Season Zero directly from `draft` → `open` will fail with a `409 Conflict` error (`invalid_transition`).
- **Correct Sequence:** Transition `draft` → `upcoming` at **08:30 IST (Step S-09)**, and then transition `upcoming` → `open` at **09:00 IST (Step S-12)**.

#### Conflict 3: Search Console Submission vs. Custom Domain Setup
- **Constraint:** Google Search Console domain property registration and sitemap submission (`/sitemap.xml`) require the custom domain to be fully pointed and returning 200 OK.
- **Impact:** If the founder has not purchased or pointed the domain prior to launch, Search Console registration MUST be deferred. Submitting the `fortrex-platform.vercel.app` domain is prohibited if the intent is to migrate to a custom domain short-term (prevents indexing duplicate content).

---

## ADDENDUM 2026-09-30 (post QA-HUNT-001 + LOGIC-VERIFICATION-001)

**1. Season Zero window is now multi-day (adopted working default, founder may override):**
- Window: **Nov 7, 09:00 IST → Nov 10, 21:00 IST** (84 hours), already updated in the production DB (season-zero, draft).
- Rationale: legal flag #11 (12-hour intraday window reads as gamified speculation; a multi-day window measures sustained risk management) + fairness for global time zones.
- Launch-day sequence through "open" is UNCHANGED (S-08 dispatch 08:15, S-09 draft→upcoming 08:30, S-12 upcoming→open 09:00).
- Settlement moves OFF launch day: **Nov 10, 21:00 IST** — `live → settling` happens AUTOMATICALLY (see next point). Admin runs final scoring, reviews, then `settling → completed`.

**2. Clock-driven transitions are now automated** (`/api/cron/due-transitions`, daily 09:15 IST + score-only refresh):
- `open → live` fires at `startsAt` automatically; `live → settling` at `endsAt`. Race-safe, idempotent, audit-logged (actor `system:due-transitions`). Verified end-to-end live with a probe on Sep 30.
- The manual S-12 step is now a publishing decision, not a timing dependency — the clock guarantees scoring starts on time.

**3. All 12 legal copy flags (LEGAL-REVIEW-002 §1) applied and verified live** (landing, legal, learn pages; site title now "FORTREX — Trading Performance Analytics"). Honesty overrides used where drafted rewrites would have misstated the revenue model: commission disclosure STAYS honest (with added fraud-traffic shield wording), entry requirement stays stated in ToS §3 with softened framing, reward pools described as platform-funded (true), not "enterprise sponsorships" (not true today).

**4. Waitlist import step (S-08)** — no import tool needed: waitlist members self-register via invite dispatch; genesis seat + 1.25x mint at signup. Invite email must tell members to use their inviter's platform link to preserve the referral bonus (waitlist codes do not carry into platform signup).
