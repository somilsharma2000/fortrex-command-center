# FORTREX Discord Community Architecture & Bot Technical Specification

## 1. Executive Summary & Vision

The FORTREX Discord community serves as the social engine for the FORTREX competitive trading platform. It bridges real-time competition banter, automated social proof, live leaderboard tracking, peer learning, and ticketed platform support.

### Strategic Philosophy
1. **Zero-Trust Community Security**: No unverified member can interact, view signals, or message other members.
2. **Website as the Single Source of Truth**: Financial data, trade execution, user balances, and tier assignments originate exclusively on the FORTREX web app. Discord acts as a synchronized display layer.
3. **Automated Governance**: 90%+ of role assignments, leaderboard updates, rank changes, and anti-scam enforcement are handled programmatically to prevent moderation burnout.

---

## 2. Research & Industry Analysis

### Best Practices in Top Trading Communities
- **Gatekeeping Onboarding**: High-performing trading communities mandate OAuth2 identity verification before unlocking chat channels, reducing sybil accounts and spam bots by >95%.
- **Gamified Prestige Ladder**: Linking Discord visual role colors and exclusive channel access to verifiable trading volume or PnL creates high engagement and retention.
- **Automated Social Proof**: Dedicated feeds for verified trade execution and leaderboard movements validate accomplishments without reliance on fake screenshot flexing.
- **Data-Driven Retention**: Utilizing analytics tools (Statbot and Discord Server Insights) to monitor daily active chatters (DAC), channel retention, voice lounge activity, and ticket resolution speed.

### Failure Modes & Mitigation Strategies

| Failure Mode | Root Cause | FORTREX Mitigation Strategy |
| :--- | :--- | :--- |
| **Scam DMs & Impersonation** | Scammers DM server members offering "support", "exclusive signals", or "bonus tokens". | Onboarding prompts members to disable DMs from server members. Banners explicitly state *“Staff will NEVER DM you first.”* Staff have unique visual badges. |
| **Fake Support & Phishing** | Fake bots/users set up duplicate support tickets asking for seed phrases/API keys. | Support ticketing is restricted to an official modal-based ticket bot. All tickets are logged and cross-referenced with web accounts. Staff never request credentials. |
| **Pump Groups & Signal Spam** | Shillers post referral links, pump-and-dump coins, or unverified win rates. | Discord AutoMod blocks external links (`t.me`, `discord.gg`), referral tokens, and crypto spam regex. Signal posting requires `Verified Trader` status and automated trade validation. |
| **Moderation Burnout** | Manual verification queues, repetitive account issues, and endless trade disputes fatigue staff. | Automated OAuth2 role sync handles 100% of tier assignments. Custom ticket bot routes issues by category and provides self-serve FAQ buttons before opening tickets. |

---

## 3. FORTREX Discord Channel Architecture

Permissions master guide:
- `🔒 Read-Only`: Everyone can view, no one can chat (except Admin/Bot).
- `💬 Public Chat`: Verified members can read and post.
- `👑 VIP Chat`: Gated by specific REX tier roles.
- `🎫 Ticket`: Gated to ticket opener + Staff.

```
📁 FORTREX DISCORD SERVER
├── 📌 INFORMATION & RULES (Read-Only)
│   ├── #welcome-and-rules     (Rules, anti-scam warnings, server orientation)
│   ├── #announcements         (Official platform updates & product news)
│   ├── #competition-feed      (Live tournament starts/ends, winner announcements)
│   ├── #leaderboard           (Automated daily/weekly PnL & volume standings)
│   └── #verify-here           (OAuth2 account linking button & instructions)
├── 💬 PUBLIC TRADER HUB (Verified Traders)
│   ├── #general-chat          (Market discussion, general chatter)
│   ├── #market-analysis       (Chart breakdowns, macro discussions)
│   ├── #trader-memes          (Casual banter & memes)
│   └── #feedback-and-ideas    (Community platform feature requests)
├── 🏆 COMPETITIONS & TOURNAMENTS
│   ├── #active-tournaments    (Rules, countdown timers, prize pool tracking)
│   ├── #verified-pnl-flex     (Bot-verified trade result embeds via /pnl-verify)
│   └── #tournament-chat       (Match-specific banter and live competition discussion)
├── 👑 REX VIP LOUNGES (Role-Gated)
│   ├── #bronze-silver-lounge  (REX Tier 2 & 3 exclusive strategy channel)
│   ├── #gold-platinum-circle  (REX Tier 4 & 5 inner circle, direct dev interaction)
│   └── #diamond-apex-whales   (REX Tier 6 & 7 whale lounge, alpha feeds, early beta access)
├── 🎫 SUPPORT & TICKETS
│   └── #create-ticket         (Interactive button panel to open support tickets)
└── 🔒 ADMIN & STAFF (Private)
    ├── #mod-logs              (Bot security logs, bans, kicks, AutoMod triggers)
    ├── #ticket-queue          (Staff escalation queue and dispatch)
    └── #system-alerts         (Backend webhooks for API downtime or sync errors)
```

---

## 4. Role Hierarchy & REX Tier Mapping

Roles are ordered by hierarchy (highest permission top):

1. `🛡️ Admin / Core Team` (Administrator permissions, website webhooks access)
2. `⚔️ Lead Moderator` (Kick/Ban/Mute, ticket management)
3. `🤖 FORTREX Bot` (Managed bot role with role management & webhook authority)
4. `🏆 Tournament Champion` (Current month #1 competition winner - Gold hoist color)
5. `🔝 Top 10 Leaderboard` (Dynamic role assigned to global top 10 traders)
6. **REX Tier Roles** (Synced directly from FORTREX Web Account):
   - `👑 REX Apex (Tier 7)` — $1M+ Volume / Top 1% Traders (Custom Amber)
   - `💎 REX Diamond (Tier 6)` — $500k+ Volume (Diamond Blue)
   - `💍 REX Platinum (Tier 5)` — $250k+ Volume (Platinum Silver)
   - `🥇 REX Gold (Tier 4)` — $100k+ Volume (Gold)
   - `🥈 REX Silver (Tier 3)` — $25k+ Volume (Silver)
   - `🥉 REX Bronze (Tier 2)` — $5k+ Volume (Bronze)
   - `🌱 REX Initiate (Tier 1)` — Account registered on web
7. `✅ Verified Trader` (Base role granted upon successful OAuth2 account linking)
8. `@everyone` (Unverified members - restricted from chatting or viewing main channels)

---

## 5. Web vs. Discord Boundary (Separation of Concerns)

| Domain / Responsibility | Web App (FORTREX Website) | Discord Community |
| :--- | :--- | :--- |
| **Authentication & Identity** | Primary account ID, email, password/2FA, OAuth provider | Linked Discord Snowflake ID (`discord_id`) |
| **Financial & Trading** | Wallet connection, order execution, PnL math, balances | Visual PnL cards, tournament leaderboard summaries |
| **Security & Credentials** | API keys, secret management, KYC verification | Zero credentials stored; read-only role mapping |
| **Social & Discussion** | Read-only profile view, official leaderboard web page | Real-time chat, banter, voice lounges, feedback |
| **Customer Support** | Formal account recovery, financial dispute resolution | Initial triage, bug reporting via ticket bot |

---

## 6. Bot Capabilities & Automated Workflows

### 1. OAuth2 Account Linking & Auto Role Sync
- Member clicks **"Link Account"** in `#verify-here` or on the Web Dashboard.
- User authorizes FORTREX OAuth2 App (`identify`, `guilds.join`).
- Backend validates user, maps `user_id` <-> `discord_id`, and assigns `Verified Trader` plus their corresponding `REX Tier` role via REST API.

### 2. Leaderboard & Competition Feeds
- **Daily Leaderboard**: Cron job at 00:00 UTC calls Discord API to update a pinned embed in `#leaderboard` displaying Top 10 ROI %, volume, and current standings.
- **Rank Up Announcements**: When a trader ascends to Gold/Platinum/Diamond/Apex, the bot generates a rich announcement card in `#competition-feed`.

### 3. Tournament Reminders & Countdown Timers
- Automated webhooks trigger at T-24h, T-1h, and Kickoff with interactive buttons linking directly to the tournament web page.

### 4. Admin Slash Commands
- `/sync-user <user>`: Forces manual role reconciliation for a member.
- `/pnl-verify <trade_id>`: Queries web database for a closed trade, generates a signed PnL image card, and posts it to `#verified-pnl-flex`.
- `/announce <channel> <embed_json>`: Pushes formatted announcements to specified channels.
- `/mod-timeout <user> <duration> <reason>`: Issues a temporary mute with audit logging.

---

## 7. Safety, Anti-Scam & Moderation Rules

### AutoMod Filters
1. **Anti-Phishing & Link Whitelist**: Blocks all external URLs except `fortrex.com` domain family. Auto-deletes discord server invites (`discord.gg/`) and Telegram links (`t.me/`).
2. **Anti-Signal Spam**: Filters regex patterns matching signal promotions (e.g., "100x guaranteed", "join WhatsApp for signals", "$BTC buy now").
3. **Mention Limits**: Restricts mass mentions (`@everyone`, `@here`) to Admin roles only.

### DM Protection Protocol
- Server onboarding flow includes an explicit step directing users to disable **"Direct Messages from server members"** in channel privacy settings.

### Ticket System Architecture
- Category selection modal: `[Account Sync | Competition Issue | Bug Report | Security Warning]`.
- Auto-closes idle tickets after 48 hours of inactivity with an exported chat transcript saved to private S3 storage.

---

## 8. Admin Control Panel Requirements (FORTREX Web Dashboard)

The FORTREX Web Admin Dashboard includes a dedicated **Discord Management Console**:

1. **Overview Metrics**: Total linked members, role distribution, bot health/ping, rate limit usage status.
2. **Member Lookup & Role Overrides**: Search by Web Username or Discord Snowflake ID; view linked status, manually force role sync, or revoke links.
3. **Role Mapping Configurator**: Graphical UI to pair database REX Tiers and Tournament Badges to Discord Role IDs without changing code.
4. **Broadcast Embed Builder**: WYSIWYG rich embed builder to author and schedule announcements directly to `#announcements` or `#competition-feed`.
5. **Combined Ban Management**: One-click action to ban a malicious user on the FORTREX platform and simultaneously ban their linked Discord account across the server.

---

## 9. Technical Architecture Specification

### Deployment Model: Hybrid (Gateway Node Server + Serverless Webhooks)

- **Primary Bot Engine**: Node.js microservice (`discord.js` v14) running as a persistent process on AWS ECS / Docker container. Manages WebSocket Gateway events (`guildMemberAdd`, `interactionCreate`, `messageCreate`), Redis task queues, and real-time role updates.
- **Serverless API / Webhooks**: Next.js / Vercel endpoints handle incoming OAuth2 callbacks and system alerts from the web backend.

```
┌─────────────────┐       OAuth2 Flow       ┌─────────────────────┐
│  FORTREX Web    │ ──────────────────────> │ Discord API / OAuth │
│    Frontend     │ <────────────────────── │ (identify, join)    │
└────────┬────────┘                         └──────────┬──────────┘
         │                                             │
         │ Database Webhook                            │ REST API / Roles
         ▼                                             ▼
┌─────────────────┐       Redis / BullMQ    ┌─────────────────────┐
│  FORTREX Core   │ ──────────────────────> │ FORTREX Discord Bot │
│  Backend (API)  │                         │  (discord.js v14)   │
└─────────────────┘                         └──────────┬──────────┘
                                                       │ Gateway WS
                                                       ▼
                                            ┌─────────────────────┐
                                            │ FORTREX Discord     │
                                            │ Guild / Server      │
                                            └─────────────────────┘
```

### Signature Verification (Ed25519) for HTTP Interactions
When utilizing HTTP Interaction endpoints, request signature verification is mandatory:
```typescript
import { verifyKey } from 'discord-interactions';

export async function POST(req: Request) {
  const signature = req.headers.get('X-Signature-Ed25519');
  const timestamp = req.headers.get('X-Signature-Timestamp');
  const body = await req.text();

  const isValidRequest = verifyKey(
    body,
    signature,
    timestamp,
    process.env.DISCORD_PUBLIC_KEY
  );

  if (!isValidRequest) {
    return new Response('Invalid request signature', { status: 401 });
  }

  // Handle interaction payload...
}
```

### OAuth2 Authorization Code Flow
- **Scopes**: `identify`, `email`, `guilds.join`
- **Authorization URL**:
  `https://discord.com/api/v10/oauth2/authorize?client_id=APP_ID&redirect_uri=REDIRECT_URI&response_type=code&scope=identify%20guilds.join&state=CSRF_TOKEN`
- **Token Exchange**: `POST https://discord.com/api/v10/oauth2/token`
- **Add Guild Member / Assign Role**:
  - Endpoint: `PUT /guilds/{guild.id}/members/{user.id}`
  - Payload: `{ "access_token": "USER_ACCESS_TOKEN", "roles": ["VERIFIED_ROLE_ID", "TIER_ROLE_ID"] }`

### Rate Limiting & Queue Management Strategy
- **Discord Limits**: Global limit of 50 requests/sec; per-route bucket limits (e.g., 10 role modifications per 10 seconds per guild).
- **Implementation**:
  - All outgoing Discord REST API calls are routed through a **BullMQ Redis Queue** with strict concurrency and rate limit settings.
  - Automatic handling of HTTP `429 Too Many Requests` status by reading the `retry_after` header and pausing the queue bucket accordingly.
