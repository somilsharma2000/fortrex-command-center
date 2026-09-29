# Founder 7-step test: agent dry run (Sep 29, 2026)

IMPORTANT: the founder's own 7-step list was never written down in any doc (only referenced as "the 7-step pass"). This is the agent's script, built from the real member loop of the locked-entry product. If the founder has different steps in mind, replace this list; the dry-run evidence still stands for the flows below.

Run on a clean local database, growth-lab-v1 at 0d0e226, `MOCK_AS_LIVE=true` (local test switch only, never set in production). 11 of 11 checks passed.

| # | Step | What must happen | Result |
|---|---|---|---|
| 1 | Member signs up | Account created, dashboard opens | PASS |
| 2 | Connects a broker account and syncs | Connection verified, trades imported | PASS |
| 3 | Tries to join a live-partner contest with no approval | REFUSED: "needs an MT5 account opened through the FORTREX partner link and approved by our team" | PASS |
| 4 | Submits a partner claim (MT5 login) | Claim queued; a second claim while one is pending is blocked (409) | PASS |
| 5 | Admin approves the claim | Refused without the authenticator code (403); approved with it (200); queue empties | PASS |
| 6 | Member joins after approval | Joined (200) | PASS |
| 7 | Contest is scored, board and check-in | Scheduled job scores it, member appears on the board, check-in pays once and a second same-day check-in is not paid again | PASS |

## Behaviors confirmed correct (look like bugs, are not)
- A DEMO account is refused by a live-partner contest even after the claim is approved. Approval alone never lets a demo account into a live contest.
- `/api/partner/link` returns "region not supported" when the server sees no country header. It reads the country from the network header, never from the sign-up form, and fails closed. On the deployed lab Vercel supplies the header.
- Admin actions return 403 without the authenticator code in the `x-admin-totp` header.
- Draft tournaments are hidden from the public list.

## Script mistakes found and fixed (not product bugs)
- The claims list returns `{ "pending": [...] }`, not `{ "claims": [...] }`.
- Steps that touch the local database must not run while another server holds it.

## NOT tested (be honest)
- Real MT5 account connection: needs a MetaApi token and a real XM account. Mock only.
- Real XM partner link: the `partner_link_xm` setting is empty until the founder's XM partner account exists.
- A real phone by a human, real browser sign-up form, real email flows.
- India and US members: blocked by design, not exercised with real IP addresses.

## What the founder will actually see on the lab
- Season Zero is a DRAFT on the lab, so the public list is empty until it is opened.
- With no partner link set, the locked route has no link to show.
