# FORTREX PLATFORM REPO AUDIT — Sep 26, 2026
> Full-repo audit (4 parallel deep passes: backend, frontend, DB, config/assets). Founder ordered "FIX ALL FAST" — all real findings fixed same day, deployed to production (commits 245c068, 79ac4c6), verified live. Stealth intact (robots Disallow, ARENA OPENS copy).

## FIXED — batch 01 (frontend + config)
| Finding | Sev | Fix |
|---|---|---|
| JSON-LD injected unescaped into script tag | Critical | `<` escaped to `\u003c` |
| "DOORS OPEN 11.07" bait vocab still on landing (main) | High | → "ARENA OPENS 11.07" (bait-law) |
| **CSP blocked Google Fonts — production was rendering fallback fonts** | High | style-src + font-src allow fonts.googleapis/gstatic (verified live in headers) |
| Admin TOTP code persisted in module memory indefinitely | High | 60s expiry |
| Kill-switch toggles missing switch semantics | Med | role="switch" aria-checked |
| Auth forms missing name/autoComplete | Med | name + new-password/current-password |
| Legal page double shell background | Med | duplicate class removed |
| Crown3D empty alt | Med | alt="FORTREX crown" |
| Referral card vanished with no code | Med | fallback card |
| No provider empty-state on connect page | Med | fallback card |
| Tournaments pages no metadata/OG | Med | metadata + generateMetadata |
| Unused Loading component | Low | removed |
| .env.example missing 14 vars | Med | all documented (required/optional) |
| .gitignore ignored .env.example | Low | !.env.example |
| Duplicate db:apply:local script | Low | removed |
| DEPLOYMENT.md launch runbook wrong (edit files vs env flip) | High | corrected to STEALTH_MODE=false flip |
| README false claim (waitlist migration script) | Med | corrected |
| robots.ts stale comment | Low | corrected |

## FIXED — batch 02 (backend)
| Finding | Sev | Fix |
|---|---|---|
| Mock broker could sync fake trades regardless of env | High | syncConnection guards NODE_ENV+ALLOW_MOCK_BROKER |
| Tournament join count-then-insert race (overbooking) | High | advisory-lock transaction: lock → count → fee → insert |
| Admin MFA silently off if ADMIN_TOTP_SECRET unset | High | fails closed (403) in production |
| No rate limit: tournaments GET / notifications POST / broker revoke | Med | 60/min IP, 30/min, 10/min |
| Missing audit_log: broker revoke + checkin awards | Med | both now write audit entries |
| Upstash limiter network error crashed request | Med | try/catch → in-memory fallback |
| Dead exports: AuthError, FUser, personalityLabel | Low | removed |

## VERIFIED FALSE POSITIVES (auditor claims refuted by code)
- Genesis seat race: already hardened — retry loop + partial unique index (migration 0002) + count guard in WHERE. No change.
- trades[0].closeTime crash: guard already present (`trades.length ? ... : null`).
- DELETE broker undefined provider: already 400'd before any query.
- generateSecret base32 bug: 20-sample round-trip valid; also used by gen script (not dead).
- spendsRex insufficient_funds vs user_not_found semantics: acceptable, documented.

## NOTED — deliberately not fixed now (with reasons)
- ~~OAuth callback routes~~ — EXECUTED Sep 26 (commits 46ad886, 7ecf014) per founder request: /api/broker/callback/{dhan,zerodha} now exist with session+state validation, AES-256-GCM encrypted-at-rest tokens (src/lib/crypto.ts), audit logging, fail-closed redirects, connect-page flash banner. Routes verified live (307 → /signin without session). Kite route stays DORMANT until Zerodha written approval per TOS verdict; Dhan route activates the moment DHAN_* env exists.
- Scoring loads all participants/trades unbatched: Season Zero is small; batching queued for October scale work.
- Admin REX idempotency key: admin is TOTP-gated, single operator; queued for admin panel v2.
- startsAt-must-be-future: admin-only operation, backdating sometimes legitimate; admin panel v2 will add a soft warning.
- vitest devDependency unused: lockfile-consistent, harmless; removing needs a lockfile regen — post-launch cleanup.
- favicon.ico at root: PNG favicon referenced via metadata; legacy-crawler 404 cosmetic. Post-launch.
- CI lacks lint step: adding a failing lint gate pre-launch risks the build pipeline; post-launch.
- Kite/Dhan env vars documented but adapters shelved pending written approval (KITE TOS verdict on record).

## DB AUDIT (agent-verified directly)
16 tables, migrations match schema, no drift. Genesis cap race-safe at DB level. REX ledger append-only confirmed (zero UPDATE/DELETE on it). Leaderboard hot path indexed (tp_score_idx). Score versions immutable. Timestamps defaulted. No action needed.

## RESULT
Production healthy: /api/health ok, db up, landing 200, tournaments API 200, stealth robots intact, ARENA OPENS live, CSP fonts fixed. All 18 batch-01 + 7 batch-02 findings closed same day.
