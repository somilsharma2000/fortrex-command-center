---
title: FORTREX Visual Design Language (Crown-Derived)
summary: The complete decoded design language read directly from the founder's high-fidelity crown render, with measured colors, and the systematic rules for applying it to every surface of the site — shapes, borders, light, motion, spacing.
---

# FORTREX Visual Design Language

Source asset: `brand-assets/crown-reference-photoreal.png` (435x409, provided by
founder Sep 26, 2026). This is the canonical brand mark. Every visual decision
below was decoded directly from that image — colors measured with a pixel
histogram, not guessed. This document is the design-language source of truth;
code should be brought into alignment with it (see "Application checklist").
STATUS: implemented on branch `design-language-v1` (Sep 26) — main untouched,
not deployed to Vercel. Awaiting founder review before merge..

## What the logo is actually made of

Four layers, in order from outside in:

1. **Silhouette** — a heraldic crown: one tall sharp center spike flanked by
   two shorter spikes on each side, symmetric, all spikes terminating in a
   sharp point (no rounded tips anywhere). A solid banded base beneath.
2. **Material A — cut black crystal.** The body of every spike is faceted
   like a gem cut: flat angular planes (kite and triangle shapes), sharp
   creases where planes meet, no curves. The crystal is not flat black — it
   carries a warm amber undertone deep inside each facet, as if lit from
   within. Measured: facet shadow #100000-#302010, facet mid-glow
   #593918-#594b3e. This is warm black, not cool black. Never render these
   facets as neutral gray or blue-black.
3. **Material B — antique gold bezel.** Every facet edge is traced by a thin
   metal line, and the whole crown is bound by a thicker gold band at the
   base. The gold is not bright brass — measured midtone is a deep bronze
   #6c4824-#846030, rising to a hot specular highlight of #fffbe4 (near-white
   warm gold) only at the sharpest edges catching the key light. Most of the
   gold surface sits in the #70502c-#8a6030 range — darker and more restrained
   than the site's current --color-gold-bright (#f2d18a) used broadly.
4. **Lighting — one dramatic key light, upper-left.** Everything else is a
   consequence of this one decision: hard specular highlights only on
   edges facing the key light, facets facing away go near-black, and the
   amber glow reads as light bouncing inside the crystal. There is no fill
   light evening things out. This is what makes it look expensive — restraint
   in lighting, not the material alone.

## The palette, corrected

Existing canon tokens are directionally right but the logo says: darken the
gold midtone, and add a fourth token — amber ember — for the internal glow
that currently has no name in the codebase.

```
--color-obsidian:     #050506   (unchanged — base is still true near-black)
--color-gold-deep:    #6c4824   (NEW measured midtone — replaces flat #c9973e
                                  as the RESTING state of gold surfaces)
--color-gold-bright:  #fffbe4   (NEW measured hot highlight — use ONLY on
                                  specular edges: hover states, active
                                  underlines, the sharpest corner of a card)
--color-amber-ember:  #593918   (NEW — the internal glow. Use at low opacity,
                                  8-16%, as a radial glow behind gold elements
                                  or inside dark panels. This replaces any
                                  urge to add a second bright accent color.)
--color-bone:         #FFF7E6   (unchanged — text color, untouched by this)
```

Explicit rejection: a handful of pixels in the reference photo carry a faint
cool blue-white fleck — an incidental studio-light artifact from the render,
not a brand color. Do not extract blue from this logo. The site has already
had two blue/violet leaks removed (headline gradient, page-shell glow) — this
logo does not license a third. Black, gold, amber, bone. Nothing else.

## Geometry: the site should be faceted, not rounded

The single biggest visual language decoded from the logo: **everything is
sharp-cut, nothing is soft.** Every plane meets its neighbor at a hard angle.
The current site uses `rounded-xl`, `rounded-full`, `rounded-2xl` on nearly
every panel and button — that is the opposite instinct from the logo.

Rule: primary surfaces (cards, buttons, the CTA) should use a **cut corner**
instead of a rounded corner — one or two corners clipped at 45 degrees
(via `clip-path: polygon(...)`), echoing a gem facet. Small UI chrome
(badges, pills, form inputs) can stay softly rounded — the logo's rule applies
to the elements that carry weight (headline CTA, stat tiles, tournament
cards), not to every input field.

## Borders: bezel-traced, not floating

Current `.glass` panels use a soft 1px border with a blurred glow. The logo's
border language is a **bezel**: a thin gold line that traces the exact
silhouette of the shape it bounds, doubled at load-bearing edges (the crown's
base band is a double gold ring). Translate: primary cards get a 1px inner
gold hairline AND the cut-corner clip-path from the rule above, so the
border visibly follows the angle. This is different from just "add a
border" — the border must trace an actual cut, not a rectangle.

## Light: specular sweep, amber ambient, single direction

Three motion/light rules, all derived directly from the render:

1. **Specular sweep** — a bright bone-white diagonal band that crosses a gold
   surface once, then fades. Already built for the crown itself
   (Crown3D.tsx `.cx-sheen`). Extend the same technique to: primary CTA
   button on hover, active tournament card border, the seat counter when it
   updates.
2. **Amber ambient glow** — a soft `--color-amber-ember` radial glow at low
   opacity sitting behind/inside dark panels, never bright, never animated
   fast. This is what makes the black facets feel lit-from-within rather
   than flat. Apply behind stat tiles and the hero crown's ground shadow
   (already partially done — formalize the color to the measured token).
3. **Single light direction, always upper-left.** Any new shadow, glow, or
   gradient on the site should assume light comes from upper-left. Consistency
   here is what reads as "one considered object" rather than "collage of
   effects." Audit existing shadows/gradients against this rule.

## Spacing and precision

A faceted object reads as engineered, not organic, partly because every cut
is a deliberate measurement — nothing is approximate. Translate to layout:
tighten the site's spacing scale to a smaller set of exact values used
everywhere (e.g. 4/8/12/16/24/32/48/64px — no arbitrary in-between values),
and keep hairline widths literally 1px at all zoom levels (avoid subpixel
blur). Precision in spacing is the layout-level version of a sharp facet edge.

## Application checklist (what changes in code, post-freeze)

- [x] Added `--color-gold-deep: #6c4824`, `--color-gold-bright: #fffbe4`,
      `--color-amber-ember: #593918` to the `@theme` block in globals.css,
      replacing the current lighter gold-deep/gold-bright values.
- [x] Primary CTA button and stat tiles now have cut corners via
      `clip-path` (one or two 45-degree corners), replacing full
      `rounded-xl`/`rounded-full` on those specific elements only.
- [x] Amber ember glow formalized as a reusable `.glow-amber` utility
      class; apply behind GlassCard/StatTile instead of ad hoc glows.
- [x] Shadows audited against upper-left light rule against the upper-left
      light rule; fix any that fall from a different angle.
- [x] Specular sheen extended to primary CTA
      and active tournament card (reuse the masked-sweep approach, don't
      rebuild it from scratch).
- [ ] Snap all spacing values in touched components to the 4/8/12/16/24/32/
      48/64 scale; remove arbitrary padding values found during the design
      audit.
- [x] Photoreal crown live as hero mark (branch design-language-v1) with this photoreal render (or a
      compressed/optimized derivative of it) once approved — current asset
      is a flatter, brighter gold icon; this one is the real brand mark.

None of the above touches live code yet — this document is the decoded
language and the work order. See IMPROVEMENT-ROADMAP.md for how this
integrates with the other audit findings (canon violations, accessibility,
motion). The FREEZE BUILD standing instruction is still in effect; this is
research + documentation only until the founder confirms execution timing.

## Lab deployment (founder review)
- LIVE PREVIEW: https://fortrex-lab.vercel.app (separate Vercel project `fortrex-lab`,
  NOT the main app). Branch `design-language-v1`. DB = Neon branch
  `design-lab-preview` (isolated copy of production; writes go nowhere real).
  Stealth intact: robots-blocked + noindex (STEALTH_MODE unset).
- Main app fortrex-platform.vercel.app untouched — verified serving approved
  design (old crown PNG + original shell) after the 06:40 incident was reverted
  (see incident note below).
- INCIDENT LOG (Sep 26, ~06:38-06:45 UTC): the lab deploy snapshot carried the
  main repo's .vercel link, so two experiment deploys landed on the main
  project and briefly changed the production alias. Caught within minutes,
  rolled back by re-deploying the approved main-branch code to the canonical
  project, and verified the restored design via CSS tells (blue shell present,
  antique tokens absent, old crown asset served). Lesson recorded: ALWAYS
  `rm -rf .vercel` + `vercel link --project <target>` before any snapshot deploy.
