---
name: design-iconography
description: >
  Source, customize, and govern icon usage across all design surfaces — when to source from Flaticon, when Lucide or Heroicons or Phosphor is enough, when to commission custom marks. Picks one icon family and holds it across an asset. Owns iconography style coherence: stroke weight discipline, fill-vs-outline rules, sizing scale, color treatment. Use this skill any time icons are used in any deliverable — UI, deck, document, social, brand identity. Trigger before reaching for any icon so the choice is intentional rather than defaulted.

# Project context
type: skill
project: skills-library
plugin: design
aliases: [design-iconography, icons, iconography]
tags: [type/skill, plugin/design, topic/design, topic/iconography]
status: active
---

# Design Iconography

Icons are quietly the most-defaulted decision in AI-generated design. Lucide gets reached for first because it's the shadcn default. Three different icon families end up on the same screen because nobody noticed. Stroke weights drift across the asset family. The accumulated mismatch is what makes generic look generic.

This skill enforces icon discipline: one family per asset family, consistent stroke weight, consistent fill-vs-outline, consistent sizing scale.

Pair with [[design-taste]] (load first), [[ai-tells-forbidden-patterns]] (the no-emoji-as-icon ban), and the surface-specific skills ([[design-presentation]], [[design-document]], [[design-social-asset]]).

## When to use this skill

- Picking an icon family at the start of a project.
- Auditing a deliverable for icon-family drift.
- Deciding whether to use a free icon library or commission custom.
- Specifying icons in a handoff (which library, which icon name).
- Building a custom icon set for a brand.
- Reviewing icon usage in a design audit.

## The four icon-family decision

Pick one. Hold it across the entire asset family.

### 1. Lucide (default for shadcn UI work)
- **License:** ISC (free, permissive).
- **Style:** outline / stroke. 1.5px or 2px stroke weight.
- **Coverage:** ~1500 icons.
- **Use:** any shadcn-based product UI; any project where consistency with shadcn defaults is the goal.
- **URL:** [lucide.dev](https://lucide.dev/)
- **Limitation:** outline-only. If you need filled variants, you customize.

### 2. Heroicons
- **License:** MIT.
- **Style:** ships in three styles — outline (24×24, 1.5px stroke), solid (24×24, filled), mini (20×20, filled).
- **Coverage:** ~290 icons. Smaller catalog than Lucide.
- **Use:** Tailwind ecosystems; when filled and outline variants of the same icon are needed.
- **URL:** [heroicons.com](https://heroicons.com/)

### 3. Phosphor
- **License:** MIT.
- **Style:** ships in six weights — Thin, Light, Regular, Bold, Fill, Duotone.
- **Coverage:** ~1300 icons.
- **Use:** brand applications that want stylistic flexibility, or icon-heavy interfaces where weight contrast does design work.
- **URL:** [phosphoricons.com](https://phosphoricons.com/)

### 4. Tabler Icons
- **License:** MIT.
- **Style:** outline (1.5px or 2px) and filled.
- **Coverage:** ~5400 icons. Largest free catalog.
- **Use:** specialized interfaces needing breadth (technical tools, domain-specific apps).
- **URL:** [tabler.io/icons](https://tabler.io/icons)

### When to use Flaticon (for non-UI surfaces)
- **License:** mixed — some free, most premium. **Always check license** per icon.
- **Style:** thousands of styles, including illustrative, multi-color, isometric — beyond what UI icon libraries cover.
- **Coverage:** millions of icons.
- **Use:** decks, documents, social assets where UI-icon libraries don't cover the visual style needed (illustrative, decorative, on-brand custom).
- **Don't use:** product UI (use Lucide or equivalent for consistency).
- **Workflow protocol:** see [[tool-flaticon]].

### Custom commissioned
- **When:** brand identity work, marquee brand moments, a defined visual style that no library matches.
- **Defaults:** 24×24 grid, 1.5px or 2px stroke.
- **Cost:** real designer time. Brief carefully — see [[brand-identity-system]] (in brand plugin) for the brief template.

## The discipline rules

### Rule 1: One family per asset family
A deck has one icon family. A document has one icon family. A UI has one icon family. **No mixing.**

The exception: when a deliverable explicitly composes UI screenshots (with their UI icon set) into a document. The doc still has its own icon family for callouts, sections, etc. — distinct from the UI icons inside the screenshots.

### Rule 2: Stroke weight consistency
Pick one stroke weight per family. **1.5px or 2px**, not both.
- 1.5px — refined, premium-feeling.
- 2px — bold, more readable at small sizes.

Set it once. Hold it across all icons in the asset.

### Rule 3: Fill-vs-outline discipline
Don't mix filled and outline icons at the same hierarchy level.

- **All outline:** consistent, calm. Default for most consulting work.
- **All filled:** bolder, more brand-statement. Use for marquee brand moments.
- **Mixed for hierarchy:** outline default, filled for selected/active states. **The filled version signifies "current."** Use intentionally.

### Rule 4: Sizing scale
Define an icon-size scale once. Hold it.

For UI:
- `icon-xs`: 16px (inline with body text)
- `icon-sm`: 20px (compact UI)
- `icon-md`: 24px (default)
- `icon-lg`: 32px (feature emphasis)
- `icon-xl`: 48px (hero treatments)

For decks (16:9):
- Inline: 24–32pt
- Section heading: 48pt
- Hero treatment: 96pt+

For documents (8.5×11):
- Callout icon: 24–32pt
- Inline icon: 14pt (matches body)

### Rule 5: Color treatment
- **Inherit text color** for inline icons (`fill: currentColor` or `stroke: currentColor`).
- **Brand accent** for emphasis icons (active state, key callout).
- **Functional color** for status icons (success green, warning amber, error red).
- **Don't** color icons decoratively. Color carries meaning; decorative color dilutes the system.

### Rule 6: No emojis or raw Unicode symbols as structural icons / UI accents
Emojis and raw Unicode symbol characters (e.g. ★ ☩ ☈ ☰ ☂ ☑ 🎛️ 🔌 🔍 💻) are font-dependent, render inconsistently across OS platforms, look like unstyled text hacks, and degrade UI quality. Banned for navigation, settings, system controls, buttons, section/card headers, list items, category visual icons, and all interactive UI elements.

**Strict Precedence & Zero Theme Exceptions**: This rule takes precedence over all creative, aesthetic, or thematic directives from other skills (including `frontend-design`). It applies to ALL interface types — including game UIs, Xianxia/fantasy themes, playful/toy styles, retro designs, and creative components. Aesthetic theme or genre NEVER grants an exemption to use emojis or raw Unicode symbol characters instead of proper SVG icons.

**Mandatory SVG Icon Loading for Standalone / Single-File Web Pages**: In single-file HTML or standalone components, you MUST load a real SVG icon library via CDN script tags (or use inline `<svg>` elements). Never bypass SVG icons by reaching for Unicode dingbats or emojis:
- **Lucide CDN**: `<script src="https://unpkg.com/lucide@latest"></script>` with `<i data-lucide="icon-name"></i>` and `lucide.createIcons()`
- **Iconify CDN**: `<script src="https://code.iconify.design/iconify-icon/2.3.0/iconify-icon.min.js"></script>` with `<iconify-icon icon="lucide:search"></iconify-icon>`
- **Fallback**: Inline `<svg>` icons or CSS geometric containers — NEVER raw Unicode text characters or emojis.

Acceptable emoji uses (rare):
- Chat message content where the emoji is literal user message text.

### Rule 7: Touch target minimum
Interactive icons (clickable) need a 44×44pt tap area minimum, even if the visual icon is smaller. Use `hitSlop` (React Native) or padding (web).

## Icon-system file (when starting a project)

```
# Icon system: {Project}

## Family
- Library: {Lucide / Heroicons / Phosphor / Tabler / Flaticon premium / Custom}
- Reason: {why this family fits the brief}

## Stroke weight
- {1.5px or 2px}, applied across all icons.

## Fill-vs-outline rule
- Default: {outline / filled}
- Active state: {outline / filled} — used to signify selected/current.

## Sizing scale
- xs: 16px (inline text)
- sm: 20px (compact)
- md: 24px (default)
- lg: 32px (emphasis)
- xl: 48px (hero)

## Color treatment
- Inline: currentColor (inherits text)
- Emphasis: --accent
- Status: --success / --warning / --error / --info

## Usage rules
- Icons clarify, never decorate.
- One family per asset family.
- Touch targets ≥ 44pt for interactive.
```

## Decision tree: which family for which surface?

```
Is this product UI (web app, mobile app, dashboard)?
├─ Yes → Lucide (shadcn default) or Phosphor (if weight variation matters)
└─ No
   │
   Is this a brand identity deliverable (logo, mark, brand asset)?
   ├─ Yes → Custom commissioned
   └─ No
      │
      Is this a deck, document, or social asset using illustrative/decorative icons?
      ├─ Yes → Flaticon (with license verified per icon — see tool-flaticon)
      └─ No → default to Lucide for consistency
```

## Common iconography failure modes

| Failure | Symptom | Fix |
|---|---|---|
| **Mixed families** | Lucide outline + Material filled in the same UI | Audit, pick one, replace others |
| **Drifting stroke weight** | Some 1.5px, some 2px, some 3px | Set one weight in the icon-system file; replace mismatches |
| **Mixed fill/outline at same hierarchy** | Some filled, some outline, no clear rule | Define rule (default + active state); apply consistently |
| **Emojis as structural icons** | 🚀 in a button label, 📊 in a section heading | Replace with SVG icons from chosen family |
| **Decorative color** | Icons in random brand colors with no semantic meaning | Inherit text color or use one accent |
| **Too many icons** | Every list item has an icon, every label has an icon | Cut decorative icons; keep only those that clarify |
| **Icon-only buttons no label** | Icon button with no aria-label or visible label | Add label or aria-label (see [[interaction-patterns]] §1) |
| **Icons too small at touch** | 16px clickable icon with no hit-padding | Add 44pt tap area via padding or hitSlop |
| **Custom icon doesn't match family** | One commissioned icon next to library icons in a different style | Either customize the entire family or pick a library icon |

## Hand-offs

- **[[design-presentation]]** — when icons are used in 16:9 decks.
- **[[design-document]]** — when icons are used in 8.5×11 documents (callouts especially).
- **[[design-social-asset]]** — when icons are used in social posts.
- **[[design-product-designer]]** — for product UI iconography integration.
- **[[brand-identity-system]]** (brand plugin) — for custom commissioned icons as part of identity work.
- **`software-engineering-frontend-developer`** — when icons need implementation.
- **`tool-flaticon`** in `design/references/` — for the Flaticon sourcing protocol.

## Constraints

- Don't reach for an icon. Pick a family first, then pull from it.
- Don't mix families. Don't mix stroke weights. Don't mix fill/outline at one hierarchy level.
- Don't use emojis as structural icons.
- Don't use color decoratively on icons. Color carries meaning.
- Don't ship icon-only buttons without labels (accessibility violation).
- For Slalom Composable DXP work: default to **Lucide** for product UI (shadcn alignment), **Phosphor** for brand-statement applications, **Flaticon** for decks/documents/social where the visual style requires more breadth than UI libraries provide.
