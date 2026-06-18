# Academy of AI Music Website Concept

A responsive, editorial website concept for The Academy of AI Music and
its annual AIMEE's awards. The site positions the Academy as the first
organization dedicated to recognizing AI music excellence and the leading
institution for the category. The build intentionally uses plain HTML, CSS, and
lightweight JavaScript so the design can be reproduced in Oxygen Builder without
carrying over a framework.

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

Each top-level HTML `<section>` maps to one Oxygen Section.

Homepage sections:

- `.front-hero`
- `.news-grid`
- `.awards-index`
- `.institution-panel`
- `.timeline`
- `.enter-panel`

Awards page sections:

- `.page-hero`
- `.category-directory`
- `.category-jump`
- `.category-group`
- `.category-list`
- `.enter-panel`

Event page sections:

- `.page-hero`
- `.awards-index`
- `.index-list`
- `.index-row`
- `.enter-panel`

Award detail template sections:

- `.award-hero`
- `.award-meta`
- `.award-detail`
- `.award-detail__sidebar`
- `.award-panel`
- `.nominee-list`
- `.criteria-grid`
- `.related-awards`

About page sections:

- `.page-hero`
- `.editorial-section`
- `.principles`
- `.quote-section`

Past Winners page sections:

- `.page-hero`
- `.winner-archive`
- `.archive-row`

Inside each section, regular `<div>` elements map to Oxygen Divs. Headings,
paragraphs, links, ordered lists, and buttons use native Oxygen elements.
Repeating cards, timeline items, category groups, category rows, nominee rows,
criteria cards, related-award links, and winner rows can later become Oxygen
Repeaters fed by ACF fields or custom post types.

### Editable content model

Recommended WordPress structure:

- **AIMEE Categories** custom post type: title, number, category group,
  short description, full description, entry rules, judging criteria, related
  categories.
- **AIMEE Nominees** custom post type: nominee name, award category, year,
  artist, work title, platform/tool, citation, source URL, winner status.
- **Past Winners** custom post type: artist, award title, year, work title,
  citation, statistics, external link, and visual theme.
- **Academy News** custom post type: headline, category, excerpt, date, and
  featured image.
- **Timeline Milestones** ACF repeater: date, title, description.
- **Site Settings** ACF options page: event date, city, submission URL, social
  links, partner email.
- **Homepage Fields**: hero copy, mission copy, category count, CTA copy.

### Animation notes

The reveal system only requires the `.reveal` or `.split-reveal` class and the
included Intersection Observer script. The menu and loader interactions are
lightweight JavaScript, while the rest of the visual style is CSS-only. This
keeps the implementation editable in Oxygen and avoids relying on GSAP or
another paid animation library.

The site includes `prefers-reduced-motion` handling for visitors who disable
animation at the operating-system level.
