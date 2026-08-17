# Make a Wish — Design System

Extracted from `Make a Wish.dc.html`, a single-screen "wishing wall" widget: a night-sky
card with a moon, twinkling stars, drifting wish-stars, and a tilted sticky-note input
where visitors write a wish + name and send it off with a paper-plane button.

## Sources
- `Make a Wish.dc.html` (this project) — the only source; no external brand/codebase was provided.

## Index
- `styles.css` — root stylesheet, imports all tokens.
- `tokens/colors.css` — night-sky, note-paper, ink, and the 16-color star palette.
- `tokens/typography.css` — font imports + type scale.
- `tokens/effects.css` — shadow, tilt, radius, animation timing.
- `tokens/spacing.css` — spacing scale + card sizing tokens.
- `guidelines/` — specimen cards (colors, type, note surface).

## Content fundamentals
Copy is minimal and bilingual (English placeholders, Traditional Chinese in chat/labels).
Voice is quiet and personal — a single field ("make a wish"), a name, no instructional
copy or onboarding text. No emoji.

## Visual foundations
- **Background**: a radial night-sky gradient (`--sky-page-bg-start` → `--sky-page-bg-end`)
  behind a hard-edged card; the card itself is a vertical gradient sky (`--sky-top` → `--sky-bottom`)
  with a flat silhouette skyline (`--skyline-fill`).
- **Corners**: no rounding anywhere (`--radius-none`) — card, note, and inputs are all hard-edged.
- **Color**: two-toned — cool night blues for the scene, warm cream/gold (`--note-bg`, `--burst-glow`,
  `--note-accent`) for the human-input layer. Sixteen pastel tones (`--star-1..16`) randomize per star.
- **Type**: a single handwritten-style CJK+Latin font (`--font-body`, jf-openhuninn) for everything —
  labels, inputs, tooltips. Two more fonts are loaded (Space Grotesk, Fraunces) but unused in the
  current layout — remove the imports if they stay unused, or note them as reserved for future states.
- **Motion**: twinkling stars (opacity pulse, 2–5s), stars drifting right-to-left, and a one-shot
  "wish burst" animation (scale + glow + fade, 2.4s ease-out) on submit.
- **Surfaces**: the sticky note is tilted -1.5° with a soft drop shadow (`--note-shadow`) — the
  only surface with dimensionality; everything else is flat.
- **Inputs**: borderless, bottom-rule only (`--note-rule`), transparent background — styled like
  handwriting on paper rather than a form field.

## Iconography
No icon system or logo. The only icon is a hand-drawn SVG paper-plane (send action) and a
five-point star shape (twinkle/burst/floating wish), both authored inline — no external icon set.

No logo was provided; the design has no brand mark.
