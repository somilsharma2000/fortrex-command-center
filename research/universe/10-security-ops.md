# FORTREX Research: Practical Security, Infrastructure Governance, and Solo-Founder Operations

> **Document ID:** `10-security-ops`  
> **Target Path:** `fortrex-command-center-git/research/universe/10-security-ops.md`  
> **Classification:** Internal Infrastructure, Security & Operations Engineering Analysis  
> **Context Date:** September 26, 2026 | **Target Launch:** November 7, 2026 (Stealth Phase: 10,000 Founding Seats)  
> **Brand Identity:** Non-Custodial Skill-Based Trading Tournament Platform  
> **Evidence Grading:**  
> - **Grade A:** Primary / Official (Official vendor documentation, GitHub security advisories, CVE databases)  
> - **Grade B:** Credible Secondary (Industry benchmarks, engineering post-mortems, verified technical benchmarks)  
> - **Grade C:** Community Evidence (GitHub issues, developer forums, tech community post-mortems)  
> - **Grade D:** Hypothesis / Engineering Deduction  

---

## Executive Summary

*Plain-language briefing for non-technical founders and strategic stakeholders:*

* **Zero-Surprise Free-Tier Architecture Is Enforced by Default Hard Stops:** On this locked stack (Vercel Hobby, Neon Free, Upstash Free, Cloudflare Free, Better Stack Free), resource overages do **not** trigger silent, exorbitant credit card charges. Vercel Hobby and Neon halt service or suspend compute upon quota depletion; Upstash returns `HTTP 429 Too Many Requests`. The operational imperative is active quota monitoring, not financial bankruptcy defense.
* **Next.js 15 Server Actions Require Strict Authorization & Taint Defense:** Server Actions in Next.js 15 are publicly accessible POST endpoints. Every action must execute explicit session authentication (`getSession()`) and Zod input validation inside the function body. React Taint APIs (`experimental_taintUniqueValue`) must be enforced to prevent database connection secrets and user credentials from leaking across the server-client boundary.
* **In-House Feature Toggles Eliminate Third-Party Flag Costs:** FORTREX can execute instant, zero-latency kill switches for tournament signups, REX points accrual, referral payouts, and broker sync using Upstash Redis coupled with a 10-second Next.js in-memory cache—avoiding $50–$300/mo SaaS feature flag subscriptions.
* **Automated Daily Offsite Database Backups Bypass Free PITR Restrictions:** Neon’s free tier provides limited point-in-time recovery (PITR) windows (24 hours on active branches). A daily GitHub Actions CRON workflow executing `pg_dump` to Cloudflare R2 object storage guarantees zero data loss and platform independence without incurring storage costs.
* **Solo Incident Routing Delivers <3-Minute Emergency Response:** By linking Better Stack uptime checks to automated push notifications and a free WhatsApp/Telegram webhook bridge (`Callmebot`/`Telegram Bot API`), the solo founder receives immediate mobile alerts for SEV-1 outages without requiring an expensive PagerDuty setup.
* **Offline Continuity Kit Safeguards Platform Operations Against Hardware Loss:** An offline survival package—comprising printed 2FA recovery keys, hardware security keys, an encrypted USB credential vault, and a fresh machine bootstrap script—ensures FORTREX remains fully operational if primary hardware is damaged, lost, or compromised.
* **Least-Privilege Secret Hygiene Prevents Credential Leaks:** Restricting GitHub Personal Access Tokens (PATs) to 90-day fine-grained repository scopes, enforcing Gitleaks static analysis in CI pipelines, and strict environment variable scoping (`NEXT_PUBLIC_` isolation) eliminates common early-stage security breaches.

---

## 1. Next.js 15 Security Hardening

### Findings & Architectural Hardening

Next.js 15 introduces significant server-side capabilities with App Router and Server Actions. However, these features alter traditional web security boundaries.

```
+----------------------------------------------------------------------------------+
|                        NEXT.JS 15 SECURITY ARCHITECTURE                          |
+----------------------------------------------------------------------------------+
| [Client Browser] --(HTTPS / Origin Header Verification)--> [Cloudflare Edge CDN] |
|                                                                 |                |
| [Next.js Middleware] <--- (Nonce CSP / Security Headers) --------+                |
|          |                                                                       |
|   +------+----------------------------------------+                              |
|   | App Router & Server Actions                   |                              |
|   |  - Session Validation (HttpOnly Lax Cookie)   |                              |
|   |  - Zod Input Payload Schema Parsing           |                              |
|   |  - React Taint APIs (Prevent Secret Leakage)  |                              |
|   +-----------------------------------------------+                              |
+----------------------------------------------------------------------------------+
```

#### A. Security Headers Configuration
Security headers protect users from Cross-Site Scripting (XSS), Clickjacking, and MIME-type sniffing. In Next.js 15, headers are configured in `next.config.js` or enforced via Edge Middleware with dynamic nonces for Content Security Policy (CSP).

```typescript
// next.config.js
/** @type {import('next').NextType} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

#### B. CSRF Protection in Server Actions
Next.js 15 Server Actions include built-in CSRF protection by validating the `Host` and `Origin` headers on incoming HTTP POST requests. 

* **Cloudflare Proxy Nuance:** When Cloudflare proxies requests in front of Vercel, header mismatches can occur if `X-Forwarded-Host` differs from `Host`.
* **Remediation:** Explicitly declare allowed origins in `next.config.js`:

```javascript
// next.config.js
module.exports = {
  experimental: {
    serverActions: {
      allowedOrigins: ['fortrex.app', '*.fortrex.app', 'localhost:3000'],
    },
  },
};
```

#### C. Authentication & Session Security
* **Cookie Flags:** Auth cookies must be set with `HttpOnly`, `Secure` (in production), `SameSite=Lax` (or `Strict`), and `Path=/`.
* **State Management:** Use short-lived stateless JWTs (15-minute expiration) paired with stateful refresh token invalidation stored in Upstash Redis.

#### D. Input Validation & Schema Parsing
Never trust inputs passed to Server Actions or API routes. Form inputs and JSON payloads must be validated using Zod schemas before hitting business logic or database layers (Drizzle ORM uses parameterized queries by default, protecting against SQL Injection).

```typescript
// example server action validation
import { z } from 'zod';

const JoinTournamentSchema = z.object({
  tournamentId: z.string().uuid(),
  brokerAccountId: z.string().min(5).max(50),
});

export async function joinTournamentAction(rawData: unknown) {
  const result = JoinTournamentSchema.safeParse(rawData);
  if (!result.success) {
    throw new Error('Invalid payload parameters');
  }
  // Proceed with validated result.data
}
```

#### E. Server Actions Pitfalls & React Taint APIs
1. **Public Endpoint Exposure:** Server Actions generate unique HTTP POST endpoints accessible via public URLs. **Rule:** Always execute explicit authentication and authorization checks inside every Server Action function body.
2. **Data Leakage via RSC:** Returning raw database objects from Server Components or Server Actions can inadvertently leak sensitive fields (e.g., hashed passwords, internal flags, broker API tokens) to the client bundle.
3. **React Taint Defense:** Use React's experimental Taint APIs to prevent sensitive objects or unique values from passing to client components:

```typescript
import { experimental_taintUniqueValue, experimental_taintObjectReference } from 'react';

export async function getUserSession(userId: string) {
  const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
  
  // Prevent private API keys or password hashes from leaving server context
  experimental_taintUniqueValue(
    'Do not pass user secret keys to the client',
    user,
    user.brokerSecretKey
  );
  
  return user;
}
```

#### F. Known Next.js Vulnerabilities & CVE Watchlist
* **CVE-2024-34351 (Server Action SSRF / Redirect Vulnerability):** Next.js Server Actions allowed attackers to manipulate the `Host` header, forcing server-side redirects to arbitrary malicious hosts. **Fix:** Upgrade to Next.js >= 14.2.3 or 15.x and enforce strict host validation.
* **CVE-2024-46982 (Cache Poisoning / Middleware Bypass):** Flaws in middleware cache revalidation allowed unauthorized users to view cached responses. **Fix:** Keep Next.js updated; ensure dynamic routes with sensitive user data set `Cache-Control: private, no-store`.
* **CVE-2024-34352 (Image Optimization SSRF / DoS):** Malicious external image URLs in `next/image` could trigger server-side requests to internal endpoints or cause high CPU consumption. **Fix:** Enforce explicit `remotePatterns` in `next.config.js` rather than wildcards.

### Sources & Evidence

| Source Name / URL | Evidence Grade | Date |
| :--- | :---: | :---: |
| [Next.js Official Content Security Policy Guide](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy) | **Grade A** | 2026 |
| [Next.js Security Advisories & CVE Repository](https://github.com/vercel/next.js/security/advisories) | **Grade A** | 2026 |
| [OWASP Top 10 API Security Risks](https://owasp.org/www-project-top-ten/) | **Grade A** | 2025 |

---

## 2. Secrets Management on Vercel & GitHub

### Findings & Practical Governance

#### A. Environment Variable Scoping on Vercel
Vercel divides environment variables into three explicit deployment environments: `Development`, `Preview`, and `Production`.

```
+-----------------------------------------------------------------------------------+
|                        VERCEL ENVIRONMENT VARIABLE SCOPING                        |
+-----------------------------------------------------------------------------------+
| Environment | Access Context        | Example Secrets Stored                       |
+-------------+-----------------------+---------------------------------------------+
| Development | Local `vercel dev`    | Local Postgres URL, Redis Sandbox Token     |
| Preview     | PR Branch Deploys     | Neon Staging DB, Upstash Staging Redis      |
| Production  | `main` Branch Deploy  | Neon Prod DB, Upstash Prod Redis, Callmebot |
+-----------------------------------------------------------------------------------+
```

* **Client vs. Server Variable Safety:**
  * Variables prefixed with `NEXT_PUBLIC_` are bundled into client-side JavaScript sent to the browser.
  * Variables **without** `NEXT_PUBLIC_` are restricted to Node.js / Serverless runtimes.
  * **Rule:** Never prefix Neon database connection strings, Upstash REST tokens, or internal JWT signing keys with `NEXT_PUBLIC_`.
  * **Enforcement:** Place `import 'server-only'` at the top of utility modules handling sensitive credentials to throw compile-time errors if imported into Client Components.

```typescript
// lib/db.ts
import 'server-only'; // Guarantees this module cannot be imported by client components
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);
```

#### B. Token Least-Privilege Architecture
1. **Vercel Deploy Tokens:** Limit deployment tokens to specific repositories with `read`/`write` permissions restricted to project builds.
2. **GitHub Actions Workflow Permissions:** Enforce explicit minimal permissions in `.github/workflows/*.yml` files:

```yaml
permissions:
  contents: read
  pull-requests: write
```

3. **GitHub Personal Access Tokens (PATs):**
   * Do **not** use GitHub Classic PATs with global `repo` scope.
   * Use **Fine-Grained Personal Access Tokens** scoped strictly to the `fortrex-platform` repository.
   * Enforce a mandatory **90-day expiration policy** with automated calendar reminders for key rotation.

#### C. Secret Leak Prevention & CI Hygiene
* **Gitleaks Integration:** Enforce automated secret scanning on every pull request using Gitleaks in GitHub Actions CI to prevent accidental commits of `.env` files or hardcoded credentials.

```yaml
# .github/workflows/security-scan.yml
name: Security Scan
on: [push, pull_request]
jobs:
  gitleaks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

#### D. Solo-Founder 2FA & Break-Glass Recovery
* **Authentication Standard:** Enforce Two-Factor Authentication (2FA) across all provider accounts (GitHub, Vercel, Cloudflare, Neon, Upstash, Google Workspace) using TOTP apps (Bitwarden, Aegis) or WebAuthn hardware keys (YubiKey).
* **Break-Glass Protocol:** Export emergency 2FA backup recovery codes during account setup, print a physical paper copy, and store it in a secure, fireproof location along with an offline encrypted USB drive.

### Sources & Evidence

| Source Name / URL | Evidence Grade | Date |
| :--- | :---: | :---: |
| [Vercel Environment Variables Documentation](https://vercel.com/docs/projects/environment-variables) | **Grade A** | 2026 |
| [GitHub Fine-Grained Personal Access Tokens Guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) | **Grade A** | 2026 |
| [Gitleaks Security Scanner Repository](https://github.com/gitleaks/gitleaks) | **Grade A** | 2026 |

---

## 3. Free-Tier Governance & Anti-Surprise-Bill Discipline

### Detailed Service Limits & Hard Stop Behaviors

```
+-------------------------------------------------------------------------------------+
|                      FREE-TIER OVERAGE BEHAVIOR SUMMARY                             |
+-------------------+-----------------------------+-----------------------------------+
| Service           | Primary Free Quota Limit    | Overage Action / Billing Impact   |
+-------------------+-----------------------------+-----------------------------------+
| Vercel Hobby      | 100 GB Bandwidth / Month    | HARD STOP: Deployment Paused (402)|
| Neon Postgres     | 0.5 GiB / 190 Compute Hours | HARD STOP: Compute Suspended      |
| Upstash Redis     | 10,000 Commands / Day       | HARD STOP: HTTP 429 Too Many Req  |
| Cloudflare Free   | Unlimited CDN / 100k Work.  | CDN Free; Workers Return 503      |
| Better Stack Free | 10 Monitors / 3 GB Logs     | Log Ingestion Pauses              |
+-------------------+-----------------------------+-----------------------------------+
```

#### A. Neon Postgres (Free Tier)
* **Limits:** 1 project, 0.5 GiB (500 MB) storage per branch, 190 compute hours per month. Compute auto-suspends after 5 minutes of inactivity.
* **Overage Action:** Upon reaching 190 compute hours or 0.5 GiB storage, Neon **suspends the project compute endpoint**. Database requests fail with connection timeout errors. **No credit card charge occurs** on the free plan.
* **Governance Action:** Enable pooled connection string (`-pooler` suffix) in Drizzle ORM to reduce compute wakeup overhead; set up usage monitoring on the Neon dashboard.

#### B. Upstash Redis (Free Tier)
* **Limits:** 1 database, 10,000 commands per day (300,000/month), max 256 MB memory storage.
* **Overage Action:** Upon exceeding 10,000 daily commands, Upstash **rejects subsequent requests with `HTTP 429 Too Many Requests`**. No unexpected monetary charges are billed.
* **Governance Action:** Configure Redis eviction policy to `allkeys-lru` (Least Recently Used) to prevent memory exhaustion; pipeline Redis commands in Next.js to combine multiple operations into a single HTTP call.

#### C. Vercel (Hobby Tier)
* **Limits:** 100 GB Bandwidth per month, 100 GB-hours Serverless Function execution, 10–15s function timeout, 1,000 source images/mo for Image Optimization, 6,000 build minutes/mo.
* **Terms & Billing Impact:** Hobby plan is strictly non-commercial. On quota depletion, Vercel **pauses deployments or serves a `402 Payment Required` page**. Vercel Hobby **never** auto-bills credit card overages.
* **Governance Action:** Set Vercel Spend/Usage Alerts at 80% quota threshold. Route static images through Cloudflare CDN caching headers to bypass Vercel Image Optimization limits.

#### D. Better Stack (Free Tier)
* **Limits:** 10 Uptime Monitors (3-minute check intervals), 1 Status Page, 3 GB Log Ingestion per month (3-day retention).
* **Overage Action:** Log ingestion pauses when the 3 GB monthly threshold is crossed; uptime checks continue unaffected. Free email and mobile push alerts are unlimited (SMS/call alerts require paid add-ons).
* **Governance Action:** Filter out verbose debug logging in production using a structured logger level (`info` / `error` only).

#### E. Cloudflare (Free Tier)
* **Limits:** Unlimited CDN bandwidth, 100,000 Cloudflare Workers requests per day, 3 Page Rules / Transform Rules, Free Managed DNS & Universal SSL.
* **Overage Action:** Standard CDN bandwidth and DDoS protection remain unlimited indefinitely. Cloudflare Workers return HTTP 503 if the 100k daily request limit is breached.
* **Governance Action:** Utilize standard Cache-Control edge rules to maximize static asset caching on Cloudflare’s CDN, minimizing origin calls to Vercel.

### Sources & Evidence

| Source Name / URL | Evidence Grade | Date |
| :--- | :---: | :---: |
| [Vercel Billing & Hobby Plan Limits](https://vercel.com/docs/plans/hobby) | **Grade A** | 2026 |
| [Neon Postgres Free Tier Documentation](https://neon.tech/docs/introduction/plans) | **Grade A** | 2026 |
| [Upstash Redis Pricing & Quotas](https://upstash.com/docs/redis/overall/pricing) | **Grade A** | 2026 |
| [Cloudflare Limits & Worker Quotas](https://developers.cloudflare.com/workers/platform/limits/) | **Grade A** | 2026 |
| [Better Stack Pricing & Features](https://betterstack.com/pricing) | **Grade A** | 2026 |

---

## 4. Kill Switch and Feature Flag Patterns in Next.js

### Architecture & Zero-Cost Implementation

A solo founder requires instantaneous control over core platform features during operational anomalies (e.g., bot registrations, scoring bugs, broker API outages) without performing slow code deployments.

```
+-----------------------------------------------------------------------------------+
|                        ZERO-COST FEATURE FLAG FLOW                                |
+-----------------------------------------------------------------------------------+
| [Admin Request] --> Update Upstash Redis Key `fortrex:flags`                      |
|                                 |                                                 |
| [User Request] ---> [Next.js Server / Action]                                     |
|                           |                                                       |
|                     Check In-Memory Cache (TTL: 10s)                              |
|                     - HIT:  Return Cached Flag State (0ms overhead)               |
|                     - MISS: Fetch from Upstash Redis (10ms) & Cache Result        |
+-----------------------------------------------------------------------------------+
```

#### Core Feature Flags Required for Launch:
1. `REGISTRATION_ENABLED`: Halts user signups during spam attacks.
2. `REX_EARNING_ENABLED`: Suspends reward point accrual if a scoring exploit is identified.
3. `REFERRALS_ENABLED`: Freezes referral attribution during audit or abuse investigations.
4. `BROKER_SYNC_ENABLED`: Pauses background broker trade polling during broker server maintenance.

#### Implementation Code (`lib/flags.ts`)

```typescript
// lib/flags.ts
import 'server-only';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export interface FeatureFlags {
  registration_enabled: boolean;
  rex_earning_enabled: boolean;
  referrals_enabled: boolean;
  broker_sync_enabled: boolean;
}

const DEFAULT_FLAGS: FeatureFlags = {
  registration_enabled: true,
  rex_earning_enabled: true,
  referrals_enabled: true,
  broker_sync_enabled: true,
};

// In-memory cache to avoid hitting Upstash rate limits on every request
let cachedFlags: FeatureFlags | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 10_000; // 10 seconds TTL

export async function getFeatureFlags(): Promise<FeatureFlags> {
  const now = Date.now();
  if (cachedFlags && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedFlags;
  }

  try {
    const flags = await redis.hgetall<FeatureFlags>('fortrex:feature_flags');
    cachedFlags = flags ? { ...DEFAULT_FLAGS, ...flags } : DEFAULT_FLAGS;
    lastFetchTime = now;
    return cachedFlags;
  } catch (error) {
    console.error('Failed to fetch feature flags from Redis, falling back to defaults', error);
    return cachedFlags || DEFAULT_FLAGS;
  }
}

export async function setFeatureFlag(key: keyof FeatureFlags, value: boolean): Promise<void> {
  await redis.hset('fortrex:feature_flags', { [key]: value });
  // Invalidate local memory cache
  cachedFlags = null;
}
```

#### Usage in Next.js Server Actions

```typescript
// app/actions/register.ts
'use server';

import { getFeatureFlags } from '@/lib/flags';

export async function registerUserAction(formData: FormData) {
  const flags = await getFeatureFlags();
  if (!flags.registration_enabled) {
    return { success: false, error: 'Registration is currently paused for platform maintenance.' };
  }

  // Proceed with user registration logic
  return { success: true };
}
```

---

## 5. Solo-Founder Incident Management

### Incident Severity Levels & Response Standards

```
+-------------------------------------------------------------------------------------+
|                          INCIDENT SEVERITY MATRIX                                   |
+-------+---------------------------------------+-------------+-----------------------+
| Level | Description                           | Target MTTR | Alert Channel         |
+-------+---------------------------------------+-------------+-----------------------+
| SEV-1 | Platform down, trade scoring error    | < 30 mins   | Mobile Push + WhatsApp|
| SEV-2 | Leaderboard delay, broker sync lag    | < 4 hours   | Email + Push          |
| SEV-3 | Non-critical UI glitch, copy bug      | < 24 hours  | Email Dashboard Digest|
+-------+---------------------------------------+-------------+-----------------------+
```

#### Solo Alert Routing Pipeline
1. **Better Stack Monitoring** performs uptime checks every 3 minutes against `https://fortrex.app/api/health`.
2. On failure, Better Stack triggers a **Push Notification** to the founder's phone via the Better Stack Mobile App and fires an automated Webhook to **Callmebot / Telegram Bot API**, delivering a WhatsApp message directly to the founder.

#### Status Page Configuration
* Host a free public status page via Better Stack hosted at `status.fortrex.app` via CNAME.
* Configure automated status updates linked directly to HTTP uptime monitors.

---

## 6. Disaster Recovery (DR) & Backup Runbook

### Neon PITR Limitations & Automated S3/R2 Backup Strategy

Neon’s free tier provides limited point-in-time recovery (PITR) windows (24 hours on active branches). To achieve complete disaster recovery without paid upgrades, run a daily GitHub Actions workflow that executes `pg_dump` and uploads an encrypted database backup to Cloudflare R2 (10 GB free tier storage).

```yaml
# .github/workflows/db-backup.yml
name: Daily Database Backup
on:
  schedule:
    - cron: '0 2 * * *' # Daily at 02:00 UTC
  workflow_dispatch:

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - name: Install PostgreSQL Tools
        run: sudo apt-get update && sudo apt-get install -y postgresql-client

      - name: Dump Database & Encrypt
        env:
          DATABASE_URL: ${{ secrets.NEON_DATABASE_URL }}
          PASSPHRASE: ${{ secrets.BACKUP_ENCRYPTION_PASSPHRASE }}
        run: |
          pg_dump "$DATABASE_URL" | gpg --symmetric --batch --passphrase "$PASSPHRASE" -o backup-$(date +%Y%m%d).sql.gpg

      - name: Upload to Cloudflare R2
        uses: ryanduffield/r2-upload-action@v1
        with:
          r2-account-id: ${{ secrets.R2_ACCOUNT_ID }}
          r2-access-key-id: ${{ secrets.R2_ACCESS_KEY_ID }}
          r2-secret-access-key: ${{ secrets.R2_SECRET_ACCESS_KEY }}
          r2-bucket: fortrex-db-backups
          source-dir: .
          destination-dir: daily/
```

#### Vercel Instant Rollback Procedure
1. Open Vercel Dashboard -> **Deployments**.
2. Locate the previous stable production deployment.
3. Click the **Three Dots (...)** menu -> Select **Instant Rollback**.
4. Rollback executes instantly (< 10 seconds) without waiting for git rebuilds.
5. Alternatively, execute via Vercel CLI: `vercel rollback [deployment-id]`.

#### Non-Database Backup Inventory

```
+-------------------------------------------------------------------------------------+
|                      NON-DATABASE BACKUP ASSET INVENTORY                            |
+----------------------+-----------------------------+--------------------------------+
| Asset Type           | Storage Location            | Backup Strategy                |
+----------------------+-----------------------------+--------------------------------+
| Environment Secrets  | Local Encrypted Vault       | Export via `vercel env pull`   |
| DNS & Domain Config  | Cloudflare BIND Export      | Git repository export file     |
| Upstash Redis State  | Cloudflare R2 / S3          | Weekly JSON key dump script    |
| Source Code          | Secondary Git Remote        | Automated mirror to Codeberg   |
+----------------------+-----------------------------+--------------------------------+
```

---

## 7. Vendor Exit Plans & Unbundling Playbook

### Export Procedures & Fast Failover

```
+-------------------------------------------------------------------------------------+
|                        VENDOR EXIT & MIGRATION PLAYBOOK                             |
+-------------------+-------------------------------+---------------------------------+
| Target Vendor     | Export Procedure              | Alternative Destination         |
+-------------------+-------------------------------+---------------------------------+
| Neon Postgres     | `pg_dump -d $DATABASE_URL`    | Supabase, Railway, AWS RDS      |
| Upstash Redis     | Key export Node.js script     | Dockerized Redis, Redis Cloud   |
| Vercel Host       | `output: 'standalone'` Docker | Render, Fly.io, Hetzner VPS     |
| GitHub Code       | `git clone --mirror`          | GitLab, Codeberg, Self-Hosted   |
+-------------------+-------------------------------+---------------------------------+
```

#### Rapid DNS Migration Protocol (Dropping Vercel/Cloudflare)
1. Log into Cloudflare DNS Dashboard.
2. Reduce DNS record TTL from `Auto` to **60 seconds** 24 hours prior to migration.
3. Update A / CNAME records to point to the new destination server IP (e.g., Hetzner VPS or Render).
4. DNS propagation completes globally within **2 minutes**.

---

## 8. Offline Continuity Kit (The "Lost Laptop" Protocol)

### Offline Physical & Digital Survival Package

A solo founder’s primary single-point-of-failure is physical hardware loss or compromise. The Offline Continuity Kit ensures platform survival under extreme scenarios.

```
+-----------------------------------------------------------------------------------+
|                        OFFLINE CONTINUITY KIT INVENTORY                           |
+-----------------------------------------------------------------------------------+
| 1. Physical Paper Recovery Folder (Stored in Fireproof Vault)                      |
|    - GitHub, Vercel, Cloudflare, Neon, Upstash 2FA Recovery Master Keys           |
|    - Google Workspace Admin Master Emergency Password                             |
|    - Domain Registrar (Namecheap/Porkbun) Account Rescue Pin                      |
|                                                                                   |
| 2. Encrypted Hardware USB Key (VeraCrypt / LUKS Partition)                        |
|    - KeePassXC Database (.kdbx) containing all production secrets                 |
|    - SSH Master Deployment Keys & GPG Signing Keys                                |
|    - Offline Export of Production Environment Variables (.env.production)         |
|                                                                                   |
| 3. Fresh Machine Provisioning Runbook (`BOOTSTRAP.md`)                            |
|    - Step-by-step CLI commands to restore development workspace on new hardware   |
+-----------------------------------------------------------------------------------+
```

---

## Security Hardening Checklist

Ordered strictly by operational priority and security impact:

- [ ] **Priority 1 (Critical): Enforce Input Schemas on All Server Actions:** Add Zod validation schemas inside every Next.js Server Action and API route handler.
- [ ] **Priority 2 (Critical): Enforce Explicit Session Authorization:** Guarantee `getSession()` is executed at the top of every Server Action body before processing database mutations.
- [ ] **Priority 3 (Critical): Verify Environment Variable Scoping:** Ensure `DATABASE_URL` and `UPSTASH_REDIS_REST_TOKEN` omit `NEXT_PUBLIC_` and add `import 'server-only'` to server database utilities.
- [ ] **Priority 4 (High): Configure Security Headers:** Apply HSTS, X-Frame-Options (`DENY`), X-Content-Type-Options (`nosniff`), and Content Security Policy in `next.config.js`.
- [ ] **Priority 5 (High): Activate Automated CI Secret Scanning:** Deploy Gitleaks in GitHub Actions workflow to block PRs containing secrets.
- [ ] **Priority 6 (High): Deploy Daily Automated Offsite Database Backups:** Configure GitHub Actions `pg_dump` workflow exporting encrypted database dumps to Cloudflare R2.
- [ ] **Priority 7 (Medium): Implement Zero-Cost Feature Flags:** Deploy `lib/flags.ts` using Upstash Redis with 10s in-memory caching for registration and earning kill switches.
- [ ] **Priority 8 (Medium): Configure Solo Incident Alert Routing:** Link Better Stack uptime monitors to WhatsApp/Telegram webhooks and mobile push notifications.
- [ ] **Priority 9 (Medium): Assemble Physical Offline Continuity Kit:** Print 2FA recovery keys and export encrypted KeePassXC vault to an offline USB key.

---

## Free-Tier Governance Table

| Service | Free Tier Limit | Warning Sign (80% Quota) | Hard Stop / Overage Behavior | Founder Mitigating Action |
| :--- | :--- | :--- | :--- | :--- |
| **Vercel** | 100 GB Bandwidth / mo<br>100 GB-hrs Serverless | Vercel dashboard notification or email at 80 GB | **HARD STOP:** Pauses deployments or serves `402 Payment Required`. Zero surprise bill. | Cache images & static assets on Cloudflare CDN to reduce origin bandwidth. |
| **Neon Postgres** | 0.5 GiB Storage<br>190 Compute Hours / mo | Neon dashboard usage meter reaches 150 hours | **HARD STOP:** Compute endpoint is suspended. Database connections time out. | Enable Pooled Connection string in Drizzle ORM; optimize slow queries. |
| **Upstash Redis** | 10,000 Commands / day<br>256 MB Memory | Upstash telemetry panel reaches 8,000 commands | **HARD STOP:** Rejects requests with `HTTP 429 Too Many Requests`. No financial charge. | Implement 10s in-memory caching in Next.js; set eviction to `allkeys-lru`. |
| **Better Stack** | 10 Uptime Monitors<br>3 GB Log Ingestion / mo | Better Stack log usage notice at 2.4 GB | Log ingestion pauses; uptime monitors continue operating normally. | Restrict production logging level to `info` / `error`; drop verbose debug logs. |
| **Cloudflare** | Unlimited CDN Bandwidth<br>100k Workers Req / day | Cloudflare analytics panel reaches 80k Worker reqs | Workers return HTTP 503; core CDN and DNS remain 100% active and free. | Standardize cache-control headers to maximize edge cache hit ratio. |

---

## Kill-Switch Implementation Notes

1. **Storage Mechanism:** Toggles are stored in Upstash Redis under hash `fortrex:feature_flags`.
2. **Performance Optimization:** In-memory caching with a 10-second TTL avoids hitting Upstash request limits during high traffic spikes.
3. **Execution Safety:** Fallback defaults guarantee platform uptime even if Redis becomes temporarily unreachable.

```typescript
// Example usage in Next.js Server Component or Route Handler
import { getFeatureFlags } from '@/lib/flags';

export async function POST(request: Request) {
  const flags = await getFeatureFlags();
  
  if (!flags.broker_sync_enabled) {
    return Response.json(
      { error: 'Broker synchronization is temporarily offline for maintenance.' },
      { status: 503 }
    );
  }
  
  // Execute broker trade sync logic
  return Response.json({ status: 'synchronized' });
}
```

---

## Solo-Founder Incident Playbook & Communication Templates

### Alert Routing Flow Diagram
`Better Stack Monitor -> Failed Health Check (3 min) -> Mobile Push + Callmebot WhatsApp Webhook -> Founder Phone`

### Communication Templates

#### Template 1: SEV-1 Outage Broadcast (WhatsApp / Discord / Status Page)
> **[FORTREX Status Alert] Service Interruption Notice**  
> **Status:** Investigating  
> **Affected Systems:** Tournament Scoring & Trading Dashboard  
> **Details:** We are currently investigating an issue impacting trade update processing. Tournament positions are temporarily paused. Your funds remain safely held at your connected broker.  
> **Next Update:** In 15 minutes at `status.fortrex.app`.

#### Template 2: SEV-1 Resolution Notice
> **[FORTREX Status Update] Service Restored**  
> **Status:** Resolved  
> **Affected Systems:** Tournament Scoring & Trading Dashboard  
> **Details:** The underlying infrastructure issue has been identified and resolved. All tournament scoring pipelines are fully functional and backfilled. No trade data was lost.  
> **Postmortem:** A full summary will be published to our documentation portal within 24 hours.

#### Template 3: SEV-2 Feature Maintenance Notice
> **[FORTREX Service Update] Temporary Feature Pause**  
> **Status:** Maintenance  
> **Affected Feature:** Referral Point Attribution  
> **Details:** Referral point processing is temporarily paused for routine system maintenance. All qualifying referral signups are queued and will be retroactively awarded upon completion.

---

### Solo Postmortem Template (The 5 Whys Practice)

```markdown
# Incident Postmortem: [Incident Title]
**Date:** YYYY-MM-DD  
**Severity:** SEV-1 / SEV-2  
**Impact Duration:** XX Minutes  

## Executive Summary
Brief 2-3 sentence description of what occurred and user impact.

## Root Cause Analysis (5 Whys)
1. Why did the service fail? -> [Reason 1]
2. Why did [Reason 1] occur? -> [Reason 2]
3. Why did [Reason 2] occur? -> [Reason 3]
4. Why did [Reason 3] occur? -> [Reason 4]
5. Why did [Reason 4] occur? -> [Root Cause]

## Action Items Checklist
- [ ] **Immediate Fix:** [Action item to restore service]
- [ ] **Preventive Defense:** [Action item to prevent recurrence]
- [ ] **Monitoring Enhancement:** [Action item to improve alert detection speed]
```
