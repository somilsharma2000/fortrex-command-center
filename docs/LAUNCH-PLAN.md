
## Update — Sep 26, 2026: NEON BLOCKER CLEARED
- Neon project **dawn-surf-72239932** (org lingering-night-82525521), branch **production**, linked and live.
- Platform schema migrated to Neon: **2 migrations applied, 16 tables verified** (users, sessions, accounts, tournaments, tournament_participants, trades, rex_ledger, score_versions, broker_connections, verifications, checkins, referral_events, notifications, feature_flags, audit_log, waitlist_entries).
- `DATABASE_URL` stored in the agent sandbox `.env.local` (never to be committed or pasted publicly).
- Neon CLI (v6.2.3) + Neon MCP server wired into the agent; neon.ts policy deployed to branch `production` (no drift).
- Remaining for live link: **Vercel token only** → deploy → migrate check → smoke test → hand founder the link → FREEZE for founder testing.
- First Neon API key the founder pasted was rejected (kept as NEON_API_KEY, dead) — working key is NEON_API_KEY_2. Recommend revoking the dead key in the Neon console.
