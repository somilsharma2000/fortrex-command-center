# Growth Lab: Global Markets Build (branch `growth-lab-v1`)

Status: BUILT AND TESTED IN LAB. Not merged to production. Merge needs founder approval after the 7-step pass. Commit `ff457d4` on `somilsharma2000/fortrex-platform`.

## What changed and why
The founder moved FORTREX to global markets (forex, metals, indices, crypto). Zerodha is removed (Kite terms prohibit trading-related games). Dhan stays dormant pending written approval.

## Connectors (all read-only, FORTREX can never trade or move funds)
| Provider | File | How a trader connects | Safety gate |
|---|---|---|---|
| MT4/MT5 (MetaApi) | `src/lib/brokers/metaapi.ts` | Trader adds account with INVESTOR (read-only) password, pastes the MetaApi account id | Account id is verified against the broker (`account-information`). Unprovisioned ids fail. Real MT login is the dedupe fingerprint. Balance, currency, demo/live come from the broker, never typed. |
| Bybit crypto | `src/lib/brokers/bybit.ts` | Trader pastes a read-only API key and secret | `GET /v5/user/query-api` must show `readOnly=1` and no trade/withdraw/transfer scope, otherwise refused BEFORE storage. Secret stored AES-256-GCM encrypted, never returned. |

Endpoint: `POST /api/broker/credentials` (rate limit 8/hour/user, feature flag `broker_connect`, audited as `broker.connect`).
Anti multi-account: `broker_connections.account_fingerprint` = sha256(provider:broker|server|login). One external account, one active profile.
Env: `METAAPI_TOKEN` (+ optional `METAAPI_REGION`, default new-york). Forex shows "being switched on" until set. Bybit needs no env.

Migrations: `0004_bybit_provider` (enum value), `0005_account_fingerprint`, `0006_account_facts` (currency, is_demo). All additive and idempotent. The legacy `zerodha` enum value stays in Postgres (enums cannot drop values) but is never offered.

## Scoring v1.1 (currency neutral)
v1.0 had a `+1` absolute currency unit in the consistency denominator, so identical percentage skill scored differently in USD vs JPY. v1.1 uses `startingBalance * 1e-6`. Weights unchanged. Safe to change because no production tournament had been scored. Scores are percentage based, so any currency competes fairly with no FX conversion. A missing starting balance now scores an honest zero (the old silent 100000 INR default is gone). `pickScoringConnection` chooses the verified, non-revoked, newest connection.

## Bugs found and fixed (worth remembering)
1. **Ranking inversion (critical).** `tiebreak(a,b)` is already best-first; the caller also swapped arguments, so the LOWEST score was rank 1. Missed by earlier E2E because it only checked ranks existed. Fixed via `rankParticipants`, guarded by regression tests, verified live (rank 1 = 42.0, rank 2 = 17.1).
2. Connect route sent Zerodha users to the Dhan login URL. Removed with Zerodha.
3. Scoring took the first connection row regardless of provider or revoked status.

## Correction to earlier notes
Owner role comes ONLY from the `ADMIN_EMAILS` env list (`src/lib/auth.ts`). The earlier claim "first signup becomes owner" was wrong. Production has `ADMIN_EMAILS` set.

## Tests
`npx tsx tests/regression.ts` (24 assertions, pure logic, no network). Runs in CI before build. Covers determinism, honest zeros, currency neutrality, forex deposit exclusion, crypto key refusal, ranking order and every tiebreaker, activation engine.

## Local E2E recipe
Migrate first, then start the server (PGlite locks the file): `npx tsx scripts/apply-migrations-local.ts`, then `next start` in a tmux session with `ADMIN_EMAILS`, `ADMIN_TOTP_SECRET`, `BETTER_AUTH_*`, `ALLOW_MOCK_BROKER=true`. Admin calls need header `x-admin-totp` from `npx tsx scripts/totp-now.ts <secret>`. Tournament actions: `POST /api/admin/tournament {id, action: setStatus|runScoring, status}`.

## Still open
- Live MetaApi account and token (agent setup), then a real MT5 demo sync test.
- MetaApi provisioning UX: trader currently adds the account at metaapi.cloud; an in-app provisioning flow would be smoother.
- Mobile check of the new connect forms.
- Counsel review of the global-markets expansion before any public launch.
- Merge to production: founder approval after the 7-step pass.
