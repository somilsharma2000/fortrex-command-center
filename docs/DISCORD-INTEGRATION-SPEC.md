---
title: Discord Integration Spec
summary: One-line admin connect design for the FORTREX Discord community — bot token in admin console, member linking, activity-based REX rewards with anti-farm rules, full admin control.
---

# FORTREX DISCORD INTEGRATION — SPEC v1.0 (Sep 30, 2026)

*Founder order: "we will integrate Discord also, just make it for admin section like admin connected with one line or whatever it takes to connect."*

## 1. The one-line connect

Admin console → Discord section → single field: *Bot token* (paste, save). Optional second field: Guild (server) ID. Steps for the founder (documented in the console itself): create Application at discord.com/developers → Bot → copy token → paste in FORTREX admin → invite link generated automatically with correct permissions (read messages, presence, manage roles). No code, no config files, one paste — exactly as ordered. Token stored encrypted (AES-256-GCM helper, already built), never logged, rotatable by re-pasting.

## 2. Member linking (website ↔ Discord)

FORTREX member runs `/link` command in Discord → bot replies with a 6-character code → member enters code in their FORTREX profile → accounts linked (discord_id stored on user, verified both ways). Unlink available both sides.

## 3. Activity → REX rewards (append-only ledger, typed reasons)

Rewardable events: daily active (1+ message in whitelisted channels, cooldown so lurking spam doesn't farm), weekly streak bonus, invite a friend who links (on top of the existing referral engine), event participation. All amounts configurable in admin (rate card). Every award goes through the existing append-only REX ledger with typed reason `discord_activity` — auditable, no cash value, legal line respected.

## 4. Anti-farm + abuse rules

Message-content intent NOT required (we reward participation, not surveillance — privacy by design). Per-member daily caps, per-channel whitelist (admin-configured), rate limits, flagged-member review (existing flag system), kill switch per feature. Anti-farm: only whitelisted channels count, minimum account age for rewards, cooldown between counted messages.

## 5. Admin control (full)

Console section: connection status, connect/disconnect, guild selector, channel whitelist editor, reward rate card, REX payout log, linked members list, kill switch. All TOTP-gated + audit-logged.

## 6. Honest limits (recorded, not hidden)

Discord bots can see who posted and where, not message text, unless Message Content intent is enabled — we default to NOT enabling it (privacy + simpler verification review). Voice activity tracking needs extra intents — phase 2. Emojis/reactions counting needs intent too — phase 2. Phase 1 = message-based activity + streaks + invite rewards.

## 7. Build order

Phase 1 (with journal phase 1): one-line connect + linking + daily activity rewards + admin console. Phase 2 (post-launch): voice presence, event rewards, role automation (REX tiers → Discord roles), community leaderboard channel.

## 8. Open items (founder-authority)

Discord server creation is founder's (private per stealth law until Nov 7). Bot application creation can be done by founder in 5 minutes with the in-console guide, or founder hands the task to the agent post-launch.
