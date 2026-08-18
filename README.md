# Portfolio Site

Plain HTML + CSS. No build step, no dependencies, no framework. Three files:

```
portfolio/
├── index.html    all content + the EDIT #n blocks you fill in
├── styles.css    all styling; design tokens live at the very top
└── images/       your screenshots and headshot go here
```

## Running it locally

```sh
cd ~/portfolio
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Leave that terminal running; `Ctrl+C` stops it.
Edit a file, save, refresh the browser — that's the whole loop.

(You can also just double-click `index.html` to open it directly. The server is
only nicer because relative paths behave exactly like they will once deployed.)

## What you need to fill in

Search `index.html` for `EDIT #` — there are 12 marked blocks, in page order:

| # | What |
|---|------|
| 1 | Page title + SEO description (your name) |
| 2 | Nav initials |
| 3 | Resume link — drop `resume.pdf` in this folder, set `href="resume.pdf"` |
| 4 | Hero: eyebrow, your name, your one-paragraph pitch |
| 5 | Location + coordinates |
| 6 | **Project cards** — the big one, see below |
| 7 | Headshot image |
| 8 | About: two paragraphs |
| 9 | Skills: three groups |
| 10 | Experience rows |
| 11 | Education |
| 12 | Contact: email, LinkedIn, GitHub |

### Adding projects (EDIT #6)

Each project is one `<article class="card">` block. To add a fifth, copy an
entire `<article>…</article>` and paste it after the fourth — the grid picks it
up automatically, no CSS changes needed. To remove one, delete the whole block.

Per card:
1. Put the image in `images/` and update `src=` and `alt=`.
   Any aspect ratio works; it's cropped to a 220px-tall band via `object-fit: cover`.
   Keep images under ~500KB each so the page stays fast (see "Image sizing" below).
2. Update title, year, description.
3. Add or remove `<li>` items in the `<ul class="tags">`.
4. Point the "Code →" link at your repo. **If there's no live demo, delete the
   whole "Demo →" `<a>` line** — an empty `#` link looks broken to a recruiter.

### Image sizing

Screenshots straight off a Mac are often 5–10MB, which makes the page crawl.
Resize before dropping them in — no extra tools needed:

```sh
# resize a copy to 1200px wide (macOS built-in)
sips -Z 1200 ~/Desktop/my-screenshot.png --out ~/portfolio/images/proj-1.png
```

## Changing the accent color

One line, top of `styles.css`:

```css
--accent: #0a2540;   /* deep navy */
```

It drives the eyebrow text, button borders, link underlines, skills labels, and
the entire contact footer. Other options from the design: `#1a1a1a` (black),
`#3a2e2e` (warm brown), `#0b3d2e` (forest green).

## Deploying

The site is static, so anything that serves files works and the free tiers are
genuinely free. Easiest path with no tooling installed:

**GitHub Pages** — create a repo, upload these files, then
Settings → Pages → Source: `main` branch, `/root`. Live at
`https://<username>.github.io/<repo>` in a minute or two.

**Netlify Drop** — go to <https://app.netlify.com/drop> and drag the `portfolio`
folder onto the page. Live instantly, no account required to start.

Both support a custom domain later if you buy one.
