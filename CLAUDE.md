# CLAUDE.md

Personal portfolio for Ben Nguyen (Computer Engineering, University of Florida), served by GitHub Pages from `main` at https://huuben5334.github.io.

## Stack

Plain static site. No build step, no package manager, no framework.

- `index.html`: all content and markup, plus one small inline script that highlights the nav link for the section on screen
- `styles.css`: all styling, organized by section with banner comments
- `images/`: project media and headshot
- `NguyenBenResume.pdf`, `Speaker_Design_Report.pdf`: linked from the page. The resume is the source of truth for site content, so when it changes, update the page to match.

To preview, open `index.html` in a browser. Anything that works from `file://` works on Pages.

## Design language

Simple, iOS-style, and easy to navigate: a white page, hairline dividers, tight spacing, and thin San Francisco type.

- **Tokens** live in `:root` at the top of `styles.css` (colours, `--font`, `--max`, `--pad-x`, `--pad-y`, `--radius`). Change them there, not inline.
- **Font**: system San Francisco (`-apple-system`) on Apple devices, with Inter from Google Fonts as the fallback elsewhere. Large headings use weight 200, body copy 300, and small text (14px and under) 400 so it stays readable.
- **Spacing is deliberately tight.** Sections use `--pad-y` (56px desktop, 40px phone), and content sits in a centred column capped at `--max` (1040px).
- **Accent** is navy `--accent`, used for buttons, link underlines, the eyebrow, and the contact footer background.
- Keep it uncluttered: no decorative section numbers, code-style labels, or scroll animations.

## Navigation

- Every section in the page has a link in `.nav__links`. If you add a section, add its link too; the highlight script picks it up automatically.
- On phones the nav links become one horizontally swipeable row under the logo.

## Adding a project

Copy an `<article class="card">…</article>` block in `#projects`. Each card has an image (`.card__img`, 16:9, `loading="lazy"`), title and year, description, `.tags`, and `.card__links`.

## Conventions

- Keep the `⚠ TODO` comments in `index.html` until Ben confirms those facts (project years).
- Strip EXIF/GPS metadata from photos before committing, and resize anything over about 2000px wide.
- Don't publish a phone number on the page (see the comment in the contact section).
- The hero tagline is intentionally empty and hidden while empty. Don't invent one.
- Do all work on a branch. Never push directly to `main`, because `main` deploys live.
- Test at 390px (phone) and 1440px (desktop) widths. The page must have no horizontal scroll.
