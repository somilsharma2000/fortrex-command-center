---
title: FORTREX Improvement Roadmap
summary: Consolidated findings from 5 audits (design, UX, motion, perf/a11y/SEO, engineering) run Sep 26, 2026 against live site + code. Post-freeze work order.
---

# FORTREX Improvement Roadmap

Source audits (full detail): platform workspace research/ folder — design-audit.md,
ux-audit.md, motion-audit.md, perf-a11y-seo-audit.md, engineering-audit.md.
FREEZE NOTE: nothing below is applied until founder completes 7-step testing.
This is the post-freeze work order, ordered by impact.

## WAVE 1 — Critical (do immediately post-freeze, ~2 days)

1. CANON VIOLATION — page shell glows blue/purple/cyan (globals.css .fortrex-shell
   radial gradients: rgba(31,71,128), rgba(87,32,125), rgba(16,67,103) + base #05050a
   not #050506). Second hidden violation found after the gold-text one. Replace
   with obsidian/gold-warm radial wash.
2. ACCESSIBILITY P0 — waitlist inputs have no labels (placeholder-only, no
   aria-label) + outline-none with only border tint focus. Screen-reader blind
   spots on the signup money-form. Fix: micro-labels + global focus-visible
   gold ring.
3. UX P0 — mobile nav black hole: below tablet width, Tournaments/Leaderboard/
   Connect links are hidden entirely. Indian mobile-heavy audience loses the
   product. Fix: drawer or bottom bar.
4. UX P0 — three silent failures: unauthenticated join attempt errors vaguely;
   signin loses intended destination; waitlist success is a dead end (no
   "Create Account" CTA). All three are launch-day user-loss points.
5. PERF — Google Fonts <link> → next/font (render-blocking, FOUT on the brand
   headline). 30-minute fix, big Core Web Vitals win.

## WAVE 2 — High (week 1 post-freeze)

6. Token discipline — components bypass design tokens with hardcoded hex
   (text-[#f2d18a] etc. across ui.tsx, nav.tsx, page.tsx, auth-forms.tsx,
   leaderboard-table.tsx). Migrate to the @theme tokens so canon changes are
   one-file edits.
7. Button/CTA fragmentation — 4 different gold-button variants across the app.
   Consolidate to one primitive in ui.tsx.
8. Nav fragmentation — landing header (logo + LEGAL) is a different component
   from the app nav; visual jump when entering. Unify.
9. tabular-nums on all scored/financial columns (leaderboard, countdowns,
   P&L) — number jitter looks unprofessional; this is a 10-minute fix that
   reads "institutional" instantly.
10. Skeleton loaders — loading.tsx per route + gold hairline shimmer pattern
    (also motion roadmap item 3). No blank screens during data fetch.
11. Server/client split of landing page — currently the entire page ships as
    client JS. Split into server page + small islands (crown, form, countdown).
12. Leaderboard shows live/settling tournament when no completed one exists —
    else launch day shows an empty leaderboard.
13. Contrast fix — #7d541d accent is 3.06:1 (fails for small text); swap to
    #8a6420 or decorative-only.

## WAVE 3 — Motion polish (weeks 2-3, canon-guarded)

From motion-audit.md top items, in order:
14. Leaderboard row stagger entrance (subtle, 40ms/row, gold hairline trace)
15. REX balance / seat counter monospace ticker roll
16. Gold shimmer skeleton loader (= item 10, one build)
17. Route cross-fade transitions (150ms, opacity only)
18. Tactile button press + gold halo ripple
19. Countdown digit tick (analog-flip style)
20. Scroll reveal on section entrances (12px rise + fade, 300ms, once)
DO NOT DO list (from audit): parallax hero, confetti, 3D tilt on tables,
sound effects, cursor trails, autoplay video, scroll-jacking. All break the
quiet-institutional voice.
All motion respects prefers-reduced-motion; client JS budget cap ~150KB.

## WAVE 4 — Engineering (parallel, never blocks shipping)

Adopt: Playwright (E2E automating the founder's 7 test flows — I can then
re-verify every change without asking him to retest), Vitest (scoring math,
genesis cap tests), env validation via t3-env pattern, Dependabot (weekly
security PRs), Sentry (production error alerts).
Deliberately SKIP (wrong tool for solo-founder+agent team): Husky, commitlint,
Changesets, Storybook — high friction, zero value at this team size.
Sequence: week 1 Vitest core tests + env validation; week 2 Playwright E2E;
week 3 Dependabot + Sentry.

## Pre-launch SEO blockers (before Nov 7 flip)

21. OG image 1200x630 (waiting on AI crown render after credit reset ~Oct 1)
22. twitter:card summary_large_image verification
23. Sitemap/robots flip runbook already documented (LAUNCH-PLAN.md) — rehearse
    once in the T-7 audit Oct 31.

## Nice-to-have (backlog)
- Crown PNG compression 115KB → ~30KB WebP
- Per-route OG variants post-launch
- Suspense streaming on dashboard data
- Email-verification banner on dashboard
- Waitlist→account migration link (migrated flag)
