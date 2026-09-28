# MT5 + XM Partner Gate (founder direction, Sep 29, 2026)

## Founder rules this implements
1. FORTREX only organizes competitions. Entry = an MT5 account opened THROUGH the FORTREX partner link AND verified. No link, no entry.
2. MT5 only (MetaApi read-only). Dhan and Bybit adapters remain in code but are not offered.
3. Worldwide, each trader's own timezone.
4. Nothing public before Nov 7. Lab is private, noindex, hand-shared to the founder only.
5. Commission from XM is the revenue. REX still has no cash value.

## How entry works (built, lab only, commit 54ab426 + region list update)
`src/lib/entry-gate.ts` (pure, tested) decides. Order of checks:
1. account flagged -> `account_under_review`
2. region blocked -> `region_not_supported` (unknown location also blocks, fail closed)
3. connection not verified -> `verification_required`
4. not partner-linked -> `partner_link_required`
5. demo account -> `live_account_required`
Join route `POST /api/tournaments/[slug]/join` enforces it and audits every denial (`tournament.join_denied`).
Country comes from the `x-vercel-ip-country` header, never from the signup form (the form default of IN is NOT trusted).

Partner confirmation: `POST /api/admin/partner {userEmail, linked, broker}` (owner/admin + TOTP header, audited). It sets `broker_connections.partner_linked`. This is the MANUAL path. Automatic path needs XM (below).

## Blocked regions (for counsel review)
IN (FEMA/RBI, founder rule), US, CA, IL, IR (XM does not serve, verified at xm.com/regulation), KP MM SY SD CU (sanctions, confirm), BE PL FR ES PT (XM Affiliation Agreement Appendix 1 bans solicitation). Edit `BLOCKED_BROKER_COUNTRIES`.

## XM facts (verified from official pages, see research/growth/research-xm-partner.md)
- Partner ID + tracker URLs come from the XM partner portal after application with KYC documents.
- CPA up to $1,000 per qualified client ($650 UK/EU/AU); qualified = deposit >= $150 and >= 3 standard lots in 12 months. Lot rebates up to $90 per lot.
- XM advertises APIs, webhooks, AppsFlyer for partners, but per-account verification by MT5 login needs a custom setup via XM partner relations (ib@xm.com). Not verified as available to us.
- Affiliation Agreement 4.2: ALL promotional material and landing pages mentioning XM need XM's PRIOR WRITTEN APPROVAL. Sec 1 Fraud Traffic: sharing commission or rebates with referred clients is BANNED. So REX and titles are fine, cash or commission sharing is not.
- No bidding on XM brand keywords. No investment advice.
- XM runs its own contests and offers partners private competitions for their referred clients. Ask XM about this; it may be a cleaner route than our own.

## Verification plan
Pilot (manual): trader opens XM account via link, connects MT5 read-only, we match the MT5 login against the XM partner dashboard report, admin confirms via the route above.
Scale (automatic): request a postback/IB reporting feed from XM partner relations.

## Timezone + check-in
Users have an IANA timezone (auto-saved from the browser, validated by `POST /api/profile/timezone`). The check-in day is the trader's local date. One streak freeze forgives a single missed day. Tests cover Kolkata, LA, Auckland, month and year rollover, invalid zones.

## Launch checklist added
- Mock broker must never grant real entry: `ALLOW_MOCK_BROKER` off in production.
- XM written approval of every page that mentions XM.
- Affiliate disclosure and CFD risk warning on every page with an XM link (text in research/growth/research-legal-seo.md, FOR COUNSEL REVIEW).
- Counsel: entry conditional on opening a broker account may be treated as consideration in some places; skill-contest and financial-promotion rules per region.

## Founder-only steps (asked only when the product is complete, per standing rule)
Apply to the XM partner program with KYC, then contact ib@xm.com about verification and private competitions.
