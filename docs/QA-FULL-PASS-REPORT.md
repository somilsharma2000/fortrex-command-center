# FORTREX Platform — Full-Spectrum QA Pass (2026-09-26)

**Scope:** Anonymous, member, admin and operator batteries against the running
Next.js app (local PGlite for user flows, production Neon for the live seat
probe), followed by a production deploy + live verification.

**Builds:** platform `0d1608c` (seat fix `7532341`, branded 404), deployed to
`fortnex-platform.vercel.app` (deployment `DEHHqJBtiY61gcUamMg7cWSwwEJM`),
drizzle migration `0002` applied to production Neon.

## Critical fix found and shipped

**Genesis seats were never assigned.** The signup path (databaseHooks
`user.create.after`) did not call seat assignment, so every new member had
`genesis_seat = null` and was rejected from Season Zero (genesis bracket).
Launch would have broken for every real member. Fixed in `7532341`:

- `assignGenesisSeat()` runs on every signup: sequential seat by signup order,
  permanent 1.25x founding-member multiplier, hard 10,000-seat cap (count of
  seated users, not max seat).
- Race safety: unique partial index `users_genesis_seat_uniq` (migration 0002).
  Two concurrent signups fighting for the same seat → one retries → next seat.
- Verified live: a probe signup against **production Neon** received
  `genesis_seat = 2`, `multiplier = 1.25` (founder holds seat 1). Probe user
  and all its rows (accounts, sessions) deleted afterwards; production is
  pristine with exactly one user (the founder).

## Battery results (all green)

**Anonymous:** all public pages 200; robots.txt blocks all; noindex intact;
`/admin`, `/profile`, `/arena` redirect signed-out users; risk disclaimer
present on money surfaces; malformed JSON / missing fields / weak passwords /
invalid emails rejected; tampered session cookies rejected.

**Member journey:** signup (privacy name + duplicate email 400) → seat assigned
→ referral chain auto-pays +50 REX with correct `referred_by` mapping → daily
check-in + streak logic (double check-in rejected) → broker connect + sync
idempotent → tournament join (genesis seat required; non-genesis 403, anon
401) → rejoin idempotent → notifications fire ("You're in: QA Cup").

**Admin/operator (TOTP `x-admin-totp` header on every mutation):**
tournament create 201 + duplicate slug 409; status transitions with invalid
transition 409 (`live → upcoming` blocked); run scoring ranks participants
(honest score 0 without trades); REX adjustment via
`{userId, delta, reason: admin_adjustment}`; kill switch (feature flag)
`checkin off` → member check-in 503 → back on. TOTP rejected without/with
wrong code; valid code passes (±1 window drift accepted).

**XSS:** member with `<script>` in display name renders escaped on
leaderboard/tournaments (0 raw script tags, 0 onerror attributes).

**404:** branded design-canon page ("This page does not exist") in production.

## Production verification (live)

- Landing 200, `/api/health` green against production Neon.
- `/admin` anonymous → 307 redirect (founder's "admin not found" was the
  signed-out redirect plus the earlier edge flapping; the page loads fine
  when signed in with role owner/admin).
- Seat assignment verified against live production DB (probe seat 2,
  cleaned up).
- All drizzle migrations recorded in production Neon; unique index live.

## Notes for the operator

- Admin TOTP goes in the `x-admin-totp` request header (the admin console
  already does this; curl/scripts must use the header, not a body field).
- Tournament creation endpoint is `POST /api/tournaments` (admin+TOTP);
  `POST /api/admin/tournament` is transitions/scoring only.
- Feature-flag kill switches are `/api/admin/flag` with
  `{key, enabled}` — platform-wide switches, not per-user flags.
- Sandbox proxy intermittently 404s vercel.app POSTs; GET verification from
  the sandbox is reliable, POST tests need a direct connection.

## Hand-off

Codebase stays frozen for the founder's 7-step pass. Any bug he logs is the
only next change. Founder's admin console steps:
sign in with somilsharma2000@gmail.com → enroll ADMIN_TOTP_SECRET (already
set on Vercel) in the authenticator app → the console prompts for the code on
every mutation.
