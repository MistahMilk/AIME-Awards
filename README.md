# The AIMEs Website Concept

A responsive, animated landing-page concept for the inaugural AI Music Awards.
The build intentionally uses plain HTML, CSS, and lightweight JavaScript so the
design can be reproduced in Oxygen Builder without carrying over a framework.

## Preview

Run a local server from this directory:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Oxygen Builder Handoff

### Global setup

1. Add the Google fonts `Syne`, `Manrope`, and `DM Mono`.
2. Recreate the variables at the top of `assets/styles.css` as Oxygen global
   colors and reusable spacing values.
3. Add the contents of `assets/styles.css` to an Oxygen stylesheet. The class
   names are deliberately semantic and can be assigned directly in Oxygen.
4. Add `assets/site.js` in an Oxygen Code Block before the closing body tag.

### Page structure

Each top-level HTML `<section>` maps to one Oxygen Section:

- `.hero`
- `.manifesto`
- `.feature`
- `.categories`
- `.quote-panel`
- `.timeline`
- `.enter`

The `winners.html` page uses the same global header, footer, type system, reveal
classes, and animation script. Each `.winner` is a standalone Oxygen Section,
so future winners can be duplicated or converted to a Repeater.

Inside each section, regular `<div>` elements map to Oxygen Divs. Headings,
paragraphs, links, and buttons use native Oxygen elements. Repeating category
and timeline items can later become Oxygen Repeaters fed by an ACF options page
or a custom post type.

### Editable content model

Recommended WordPress structure:

- **Award Categories** custom post type: title, number, short description,
  full description, entry rules.
- **Past Winners** custom post type: artist, award title, year, work title,
  citation, three statistics, external link, and visual theme.
- **Timeline Milestones** ACF repeater: date, title, description.
- **Site Settings** ACF options page: event date, city, submission URL, social
  links, partner email.
- **Homepage Fields**: hero copy, mission copy, quote, category count, CTA copy.

### Animation notes

The reveal system only requires the `.reveal` or `.split-reveal` class and the
included Intersection Observer script. Orbit, waveform, marquee, and loader
animations are CSS-only. This keeps the implementation editable in Oxygen and
avoids relying on GSAP or another paid animation library.

The site includes `prefers-reduced-motion` handling for visitors who disable
animation at the operating-system level.
