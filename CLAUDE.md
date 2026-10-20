# CLAUDE.md

Personal portfolio for Ben Nguyen (Computer Engineering, University of Florida), served by GitHub Pages from `main` at https://huuben5334.github.io.

## Stack

Plain static site. No build step, no package manager, no framework.

- `index.html`: all content and markup
- `styles.css`: all styling, organized by section with banner comments
- `script.js`: scroll animations and nav behaviour (vanilla JS, no dependencies)
- `images/`: project media and headshot
- `Resume27.pdf`, `Speaker_Design_Report.pdf`: linked from the page

To preview, open `index.html` in a browser. Anything that works from `file://` works on Pages.

## Design language

The look is Apple-style: a white page, soft-gray (`--surface`) and black (`tile--dark`) rounded tiles, big tight-tracked headlines, one blue (`--accent`) for actions, and generous whitespace.

- **Tokens** live in `:root` at the top of `styles.css`. Change colours there, not inline.
- **Font**: system SF Pro on Apple devices, with Inter from Google Fonts as the fallback elsewhere.
- **Easing**: always use `var(--ease)` (`cubic-bezier(.16,1,.3,1)`) so motion feels consistent.
- Headlines end with a period ("Projects.") as a deliberate stylistic choice.

## Motion system (script.js + styles.css)

| Hook | Effect |
|---|---|
| `.intro` + `style="--d:N"` | Page-load rise-in, staggered by N (CSS only) |
| `.reveal` + optional `--d` | Fades and rises in once on scroll; gets `.is-in`, then `.is-done` |
| `[data-hero]` | Hero content scales back and fades as you scroll (`--hero-p`) |
| `[data-zoom]` | Project media scales 0.9 → 1 entering the viewport (`--p`) |
| `[data-words]` | Paragraph lights up word by word while scrolling |

Rules:
- Content is hidden only under `html.js`, so the page stays readable without JavaScript.
- `prefers-reduced-motion` disables all movement (in both the CSS and the JS). Keep it that way.
- Animate only `transform`, `opacity` and `color`, never layout properties.

## Adding a project

Copy an `<article class="tile">…</article>` block in `#projects`.
- Alternate `tile` and `tile tile--dark` for rhythm.
- `tile--compact` tiles go inside `.tile-pair` (two per row on desktop).
- Large tiles can include a `.tile__facts` row of three headline numbers. Only use real figures.
- Give every `<img>` its `width`/`height` attributes and `loading="lazy"`.

## Conventions

- Keep the `⚠ TODO` comments in `index.html` until Ben confirms those facts (project years, start year).
- Strip EXIF/GPS metadata from photos before committing, and resize anything over about 2000px wide.
- Don't publish a phone number on the page (see the comment in the contact section).
- The hero tagline is intentionally empty. Don't invent one.
- Do all work on a branch. Never push directly to `main`, because `main` deploys live.
- Test at 390px (phone) and 1440px (desktop) widths. The page must have no horizontal scroll.
