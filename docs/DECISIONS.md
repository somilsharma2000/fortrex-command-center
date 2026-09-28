
## Sep 29: free demo/live contests, admin-controlled (founder direction)
- Free to join. Admin picks per contest: demo, live_partner, or both. Default demo.
- Earn from broker partner commission now, ads later. No entry fees, no cash prizes; recognition text set by admin.
- Ranking basis set per contest: total gain % or risk-adjusted score. Gain first for excitement; switch to score for bigger recognition.
- Account confirmation: member submits MT5 login, admin approves in a queue (MFA, audited). Partner link is admin-editable, shown only in allowed regions.
- Research on gray areas, existing operators, and revenue is in research/growth/. Revenue examples there are best cases with assumptions, not forecasts. Legal map says live contests in India and the US are red; the demo route is the safe global default. All legal items are for counsel review.
- Code: growth-lab-v1 f2648c0 (lab only). Production frozen.

## Sep 29: live boards update themselves (lab only)
- Built scheduled live scoring: syncs live-contest members, re-ranks, sends rank alerts, logs to the audit trail. Secret-guarded route, instant kill switch (`live_scoring`), never changes contest status.
- Vercel HOBBY allows daily cron only (a faster schedule fails the deploy). Daily cron is the safety net. For live contests: Vercel Pro (`*/5 * * * *`) or a free external pinger every 5 to 10 minutes with the secret header.
- `CRON_SECRET` is set on the lab project only. It is not in any repo. Production gets its own secret at merge time. Details: platform docs/MT5-XM-PARTNER-GATE.md.
- Code: growth-lab-v1 111789c. Production frozen and unchanged.

## Sep 29: merge checklist written (not executed)
- Platform docs/MERGE-CHECKLIST.md (growth-lab-v1). Production still frozen. Merge only on founder GO.
- Tested: old production code runs fine on a database migrated through 0008, so code-only rollback is safe.
- Open before merge: CRON_SECRET missing on production; XM partner link not set (DB setting partner_link_xm); production DATABASE_URL host unverified (Vercel returns it encrypted); counsel view on offshore-broker commissions; the launch page gains a trust strip on merge.
