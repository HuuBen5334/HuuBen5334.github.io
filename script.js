/* ═══════════════════════════════════════════════════════════════════════
   Motion for the portfolio. No dependencies.
   - .reveal       → fades/rises in once when scrolled into view
   - [data-hero]   → hero content eases back and fades as you scroll away
   - [data-zoom]   → project media scales up as it enters the viewport
   - [data-words]  → paragraph lights up word by word while scrolling
   - nav           → hairline on scroll, active section link, mobile menu
   Everything degrades to a static, fully visible page without JS or with
   prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════════════════ */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

  /* ── Nav: scrolled state, mobile menu ───────────────────────── */
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');

  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.querySelectorAll('.nav__links a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* ── Active nav link follows the section in the middle of the screen ── */
  const links = new Map(
    [...nav.querySelectorAll('.nav__links a[href^="#"]')].map((a) => [a.getAttribute('href').slice(1), a])
  );
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.classList.remove('is-active'));
      links.get(entry.target.id)?.classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('section[id], footer[id]').forEach((s) => spy.observe(s));

  /* ── Word-by-word statement: wrap each word in a span ───────── */
  const statement = document.querySelector('[data-words]');
  let words = [];
  if (statement) {
    const text = statement.textContent.trim().split(/\s+/);
    statement.textContent = '';
    text.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'w';
      span.textContent = word;
      statement.append(span, i < text.length - 1 ? ' ' : '');
    });
    words = [...statement.querySelectorAll('.w')];
  }

  /* ── Reveal on scroll ───────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-in', 'is-done'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('is-in');
        io.unobserve(el);
        // Matches the 1.1s reveal + stagger in styles.css.
        const delay = parseFloat(getComputedStyle(el).getPropertyValue('--d')) || 0;
        setTimeout(() => el.classList.add('is-done'), 1100 + delay * 90);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => io.observe(el));
  }

  /* ── Scroll-linked effects, batched into one frame ──────────── */
  const hero = document.querySelector('[data-hero]');
  const heroSection = document.querySelector('.hero');
  const zooms = [...document.querySelectorAll('[data-zoom]')];

  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;

    nav.classList.toggle('is-scrolled', window.scrollY > 8);

    if (reduceMotion) {
      words.forEach((w) => w.classList.add('is-lit'));
      return;
    }

    if (hero && heroSection) {
      const p = clamp(window.scrollY / (heroSection.offsetHeight * 0.7));
      hero.style.setProperty('--hero-p', p.toFixed(4));
    }

    zooms.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      // 0 when the top edge is at the bottom of the screen, 1 once it reaches 40% up.
      const p = clamp((vh - top) / (vh * 0.6));
      el.style.setProperty('--p', p.toFixed(4));
    });

    if (statement) {
      const r = statement.getBoundingClientRect();
      // Starts lighting as the paragraph enters, finishes around mid-screen.
      const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.3));
      const lit = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
    }
  };

  const onScroll = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
