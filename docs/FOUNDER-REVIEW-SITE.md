# Founder review site (private)

Purpose: the founder cannot open the lab or the agent's files, so this is a password-protected page that shows the analysis, plan, mockups, org chart and the question list. It is hidden again (or deleted) at launch.

- URL: https://fortrex-founder-review.vercel.app (Vercel project fortrex-founder-review, prj_kuPk7v3v4Icu1ufHKOKFY7JUm5Vp, separate from the platform)
- Gate: server-side password (env REVIEW_PASSWORD) + signed 7-day cookie (env REVIEW_COOKIE_SECRET). Page body is only returned with a valid cookie. 8 wrong tries per 10 min per IP = 429. Headers: noindex, no-store, no-referrer, frame deny.
- The password is NOT in git. It is in the Vercel project env and was given to the founder in chat. To change it: update REVIEW_PASSWORD in Vercel and redeploy.
- Source: founder-review-site/ (api/gate.js, api/_content.html, vercel.json).
- Deploy: copy to a clean folder, set VERCEL_ORG_ID (from project accountId) and VERCEL_PROJECT_ID, run `vercel deploy --prod`. Redeploy after editing _content.html.

## Lesson (bug caught by an outside test)
The first deploy kept the content as a top-level `content.html`. Vercel serves static files BEFORE rewrites, so /content.html returned the whole document with no password. Fix: keep the content inside the function folder as `api/_content.html` with `includeFiles`, never in the public root. Always test every path from outside (not from the sandbox) after deploying a gate.

## Contents
17 sections: vision checklist, reality check, MT5 how-to, 5 landing states, banners and share card, product, 8 tournament types, Discord, REX currency, journal, admin, scale, company, roadmap, legal, 17 founder questions.
Research behind it: research/vision-*.md (8 reports, Sep 29).
