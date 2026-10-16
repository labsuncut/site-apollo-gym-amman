// APOLLO: fills the page from content.js and runs the motion (GSAP + ScrollTrigger + SplitText + Lenis, all vendored).
(() => {
  const html = document.documentElement;
  const lang = html.lang === 'ar' ? 'ar' : 'en';
  const rtl = html.dir === 'rtl';
  const T = TEXT[lang];
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (v) => String(v).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isPhone = () => window.matchMedia('(max-width: 720px)').matches;
  const motion = !calm && window.gsap;
  const pad = (n) => String(n).padStart(2, '0');
  const dir = rtl ? 1 : -1;

  // ---------- Words ----------
  $$('[data-t]').forEach((el) => { const v = T[el.dataset.t]; if (typeof v === 'string') el.textContent = v; });
  $('#year').textContent = new Date().getFullYear();
  $('#lang').addEventListener('click', () => {
    try { localStorage.setItem('apollo-lang', lang === 'ar' ? 'en' : 'ar'); } catch (e) {}
    location.reload();
  });

  // ---------- Links ----------
  const wa = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(T.wa_msg)}`;
  $$('.wa-link').forEach((a) => { a.href = wa; a.target = '_blank'; a.rel = 'noopener'; });
  $$('.tel-link').forEach((a) => { a.href = `tel:${BUSINESS.phone}`; });
  $$('.ig-link').forEach((a) => { a.href = BUSINESS.instagram; });
  $$('.mail-link').forEach((a) => { a.href = `mailto:${BUSINESS.email}`; });
  $$('.map-link').forEach((a) => { a.href = BUSINESS.google; });
  $('#google-link').href = BUSINESS.google;
  $('#contact-lines').innerHTML = `<a href="tel:${esc(BUSINESS.phone)}" dir="ltr">${esc(BUSINESS.phoneDisplay)}</a> · <a href="https://wa.me/${esc(BUSINESS.whatsapp)}" dir="ltr">${esc(BUSINESS.mobileDisplay)}</a><br><a href="mailto:${esc(BUSINESS.email)}">${esc(BUSINESS.email)}</a>`;
  const map = $('#map');
  const loadMap = () => { if (map.src === 'about:blank') map.src = BUSINESS.mapEmbed; };
  if ('IntersectionObserver' in window) new IntersectionObserver((e, o) => { if (e[0].isIntersecting) { loadMap(); o.disconnect(); } }, { rootMargin: '600px' }).observe(map);
  else loadMap();

  // ---------- Marquee ----------
  const words = T.marquee.map((w) => `<span>${esc(w)}</span><i>✦</i>`).join('');
  $('#marquee').innerHTML = words + words + words;

  // ---------- Stats ----------
  $('#stats-grid').innerHTML = T.stats.map((s) => `<div class="stat reveal"><b><span class="n" data-n="${s.n}" data-dec="${s.dec || 0}">${s.dec ? '0.0' : '0'}</span><span>${esc(s.suffix)}</span></b><p>${esc(s.label)}</p></div>`).join('');

  // ---------- Images (all paths and focal points live in content.js) ----------
  const setImg = (el, im) => { if (!el || !im) return; el.src = im.src; el.width = im.w; el.height = im.h; el.style.objectPosition = im.focus; };
  setImg($('#hero-photo'), IMAGES.hero); setImg($('#final-photo'), IMAGES.finale);
  if ($('#hero-source')) $('#hero-source').srcset = IMAGES.heroPhone.src;

  // ---------- Gallery: highlights first, the rest on request ----------
  const tourItem = (s, i) => `<figure class="tour-item"><img src="${esc(s.img)}" width="${s.w}" height="${s.h}" style="object-position:${esc(s.focus)}" alt="${esc(s[lang])}" loading="${i < 2 ? 'eager' : 'lazy'}"><figcaption><b>${pad(i + 1)}</b>${esc(s[lang])}</figcaption></figure>`;
  let shown = Math.min(SPACE_HIGHLIGHTS, SPACE.length);
  $('#tour-track').innerHTML = SPACE.slice(0, shown).map(tourItem).join('');
  $('#tour-total').textContent = pad(shown);
  $('#tour-more').hidden = shown >= SPACE.length;
  $('#tour-prev').setAttribute('aria-label', T.space_prev); $('#tour-next').setAttribute('aria-label', T.space_next);

  // ---------- Programs ----------
  $('#programs-list').innerHTML = PROGRAMS.map((p, i) => {
    const [name, text] = p[lang];
    return `<div class="program reveal"><span class="program-num">${pad(i + 1)}</span><h3>${esc(name)}</h3><p>${esc(text)}</p><span class="program-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span><span class="program-thumb"><img src="${esc(p.img)}" alt="" loading="lazy"></span></div>`;
  }).join('');
  $('#amenities').innerHTML = T.amenities.map((a) => `<li>${esc(a)}</li>`).join('');

  // ---------- Ethos ----------
  $('#ethos-stack').innerHTML = ETHOS.map((e, i) => {
    const [a, b, text] = e[lang];
    return `<article class="ethos-card"><span class="ethos-num">${pad(i + 1)}</span><h3>${esc(a)}<em>${esc(b)}</em></h3><p>${esc(text)}</p></article>`;
  }).join('');
  $('#values').innerHTML = T.values.map((v) => `<span>${esc(v)}</span>`).join('');

  // ---------- Story ----------
  $('#timeline').insertAdjacentHTML('beforeend', STORY.map((s) => {
    const [title, text] = s[lang];
    return `<div class="milestone reveal"><b>${esc(s.y)}</b><h3>${esc(title)}</h3><p>${esc(text)}</p></div>`;
  }).join(''));

  // ---------- Quotes ----------
  $('#quotes').innerHTML = QUOTES.map((q) => `<blockquote class="quote reveal"><p>${esc(q[lang])}</p><cite><b>${esc(q.name)}</b><span>${esc(q.role[lang])}</span></cite></blockquote>`).join('');

  // ---------- Plans ----------
  $('#faq-list').innerHTML = FAQ.map((f, i) => `<details class="faq-item reveal"${i === 0 ? ' open' : ''}><summary><span>${esc(f[lang][0])}</span><i></i></summary><p>${esc(f[lang][1])}</p></details>`).join('');
  $('#plans-grid').innerHTML = PLANS.map((p) => {
    const [name, perks] = p[lang];
    return `<article class="plan reveal${p.popular ? ' is-popular' : ''}">${p.popular ? `<span class="plan-tag">${esc(T.popular)}</span>` : ''}<h3>${esc(name)}</h3><div class="plan-price"><b>${p.price}</b><small>${esc(T.jd)}</small></div><ul>${perks.map((x) => `<li>${esc(x)}</li>`).join('')}</ul><a class="btn btn-ghost" href="${wa}" target="_blank" rel="noopener">${esc(T.plan_cta)}</a></article>`;
  }).join('');

  // ---------- Hours + open badge ----------
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: BUSINESS.timezone }));
  const today = now.getDay();
  const fmt = (s) => {
    let [h, m] = s.split(':').map(Number); h %= 24;
    if (lang === 'ar') return `${h}:${pad(m)}`;
    return `${h % 12 || 12}:${pad(m)} ${h < 12 ? 'AM' : 'PM'}`;
  };
  $('#hours').innerHTML = BUSINESS.hours.map((h, i) => `<tr${i === today ? ' class="is-today"' : ''}><th data-today="${esc(T.today)}">${esc(T.days[i])}</th><td dir="ltr">${h ? `${fmt(h[0])} – ${fmt(h[1])}` : (lang === 'ar' ? 'مغلق' : 'Closed')}</td></tr>`).join('');
  (function openBadge() {
    const el = $('#open');
    const m = now.getHours() * 60 + now.getMinutes();
    const toMin = (s) => { const [h, mm] = s.split(':').map(Number); return h * 60 + mm; };
    const t = BUSINESS.hours[today];
    const open = t && m >= toMin(t[0]) && m < toMin(t[1]);
    el.classList.toggle('is-open', !!open);
    $('span', el).textContent = open ? `${T.open_now} · ${T.closes} ${fmt(t[1])}` : `${T.closed_now} · ${T.opens} ${fmt((BUSINESS.hours[t && m < toMin(t[0]) ? today : (today + 1) % 7] || ['06:00'])[0])}`;
  })();

  // ---------- Phone menu ----------
  const overlay = $('#overlay'), openBtn = $('#menu-open');
  let lenis = null;
  const setMenu = (show) => {
    openBtn.setAttribute('aria-expanded', String(show));
    overlay.hidden = !show;
    if (lenis) show ? lenis.stop() : lenis.start();
    if (motion && show) gsap.fromTo($$('.overlay-nav a, .overlay-cta'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .6, stagger: .06, ease: 'power3.out' });
  };
  openBtn.addEventListener('click', () => setMenu(overlay.hidden));
  $('#menu-close').addEventListener('click', () => setMenu(false));
  $$('.overlay a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

  // ---------- Header shadow ----------
  const header = $('.site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // ---------- Gallery controls: native horizontal scroll, arrows, keyboard, "more" ----------
  // Vertical scrolling is never captured: the page always continues past the gallery.
  const track = $('#tour-track'), viewport = $('#tour-viewport'), bar = $('#tour-bar'), idx = $('#tour-index');
  const step = () => { const it = $('.tour-item'); return it ? it.getBoundingClientRect().width + 20 : 400; };
  const onSwipe = () => { const max = viewport.scrollWidth - viewport.clientWidth; const p = max ? Math.abs(viewport.scrollLeft) / max : 0; bar.style.transform = `scaleX(${p})`; idx.textContent = pad(Math.min(shown, Math.round(p * (shown - 1)) + 1)); };
  viewport.addEventListener('scroll', onSwipe, { passive: true }); onSwipe();
  const go = (n) => viewport.scrollBy({ left: n * step() * (rtl ? -1 : 1), behavior: calm ? 'auto' : 'smooth' });
  $('#tour-prev').addEventListener('click', () => go(-1));
  $('#tour-next').addEventListener('click', () => go(1));
  viewport.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') { e.preventDefault(); go(rtl ? -1 : 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(rtl ? 1 : -1); } });
  $('#tour-more').addEventListener('click', () => {
    track.insertAdjacentHTML('beforeend', SPACE.slice(shown).map((s, i) => tourItem(s, shown + i)).join(''));
    shown = SPACE.length; $('#tour-total').textContent = pad(shown); $('#tour-more').hidden = true; onSwipe();
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  });

  // ---------- No motion: show everything and stop ----------
  if (!motion) {
    $$('.reveal, .hero-foot > *, .scroll-cue').forEach((el) => { el.style.opacity = 1; el.style.transform = 'none'; });
    $$('.display .line > span').forEach((el) => { el.style.transform = 'none'; });
    $$('.n').forEach((el) => { el.textContent = Number(el.dataset.n).toFixed(+el.dataset.dec); });
    $('#loader').remove();
    $('#tour-bar').style.transform = 'none';
    $('#timeline-fill').style.transform = 'none';
    return;
  }

  // ---------- Motion setup ----------
  gsap.registerPlugin(ScrollTrigger, SplitText);
  lenis = new Lenis({ lerp: .09, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
  $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
    const target = a.getAttribute('href') === '#top' ? 0 : $(a.getAttribute('href'));
    if (target === 0 || target) { e.preventDefault(); lenis.scrollTo(target, { offset: -60, duration: 1.4 }); }
  }));

  // Heading splits (lines slide up when they come into view)
  const splits = $$('.split').map((el) => SplitText.create(el, { type: 'lines', linesClass: 'line' }));
  splits.forEach((s) => {
    const inner = s.lines.map((line) => { const span = document.createElement('span'); span.style.display = 'block'; span.innerHTML = line.innerHTML; line.innerHTML = ''; line.appendChild(span); return span; });
    gsap.from(inner, { yPercent: 110, duration: 1, ease: 'power4.out', stagger: .08, scrollTrigger: { trigger: s.elements[0], start: 'top 85%' } });
  });
  $$('.reveal').forEach((el, i) => {
    gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });

  // ---------- Intro: you walk into the facility ----------
  // Two versions share one ending. intro3d.js (a module, loads after this file) renders the
  // real thing with Three.js: marble columns, a stone plinth, the 3D mark dropping onto it.
  // If WebGL is missing or the module fails, the CSS version below plays instead.
  const loader = $('#loader'), mark = $('.loader-mark'), scene = $('.loader-scene');
  let seen = false;
  try { seen = sessionStorage.getItem('apollo-intro') === '1'; sessionStorage.setItem('apollo-intro', '1'); } catch (e) {}
  const finishIntro = () => { loader.remove(); lenis.start(); ScrollTrigger.refresh(); };
  // The hero wakes up: photo settles, headline lines rise, buttons and cue fade in.
  const heroIn = (tl, at) => tl
    .from('.hero-photo', { scale: 1.2, duration: 1.6, ease: 'power3.out' }, at)
    .to('.display .line > span', { y: 0, duration: 1, ease: 'power4.out', stagger: .09 }, at + .15)
    .to('.hero-foot > *', { opacity: 1, duration: .8, stagger: .08, ease: 'power2.out' }, at + .5)
    .to('.scroll-cue', { opacity: 1, duration: .7 }, at + .8);
  const armIntro = (tl) => {
    if (seen) tl.timeScale(1.6);
    window.apolloIntro = tl;
    const skip = () => { if (tl.progress() < 1 && tl.timeScale() < 6) tl.timeScale(6); };
    loader.addEventListener('click', skip);
    loader.addEventListener('touchstart', skip, { passive: true });
    addEventListener('keydown', skip, { once: true });
    addEventListener('wheel', skip, { passive: true, once: true });
  };
  const domIntro = () => {
    if (window.APOLLO) window.APOLLO.fallback = true;
    html.classList.remove('intro3d');
    $('.seam').style.animation = 'none';
    const dust = $('#dust');
    for (let i = 0; i < 16; i++) dust.appendChild(document.createElement('i'));
    const intro = gsap.timeline({ onComplete: finishIntro });
    const flick = [1, .15, 1, .1, .9, .2, 1];
    intro
      .set(mark, { yPercent: -260, opacity: 1, filter: 'brightness(.35)' })
      .to('.seam', { opacity: 1, scaleY: 1, duration: .45, ease: 'power2.out' }, .1)
      .to('.door-l', { xPercent: -100, duration: .9, ease: 'expo.inOut' }, .5)
      .to('.door-r', { xPercent: 100, duration: .9, ease: 'expo.inOut' }, .5)
      .to('.seam', { opacity: 0, duration: .3 }, .55)
      .to(['.temple', '.shaft', '.spot'], { opacity: 1, duration: .9, ease: 'power2.out' }, .6)
      .to(mark, { yPercent: 0, duration: .5, ease: 'power3.in' }, .95)
      .to(mark, { scaleY: .86, scaleX: 1.08, duration: .08, ease: 'power1.out' }, 1.45)
      .to(mark, { scaleY: 1, scaleX: 1, duration: .25, ease: 'elastic.out(1, .5)' }, 1.53)
      .fromTo(scene, { x: 0 }, { x: 7, duration: .05, repeat: 5, yoyo: true, ease: 'none' }, 1.45)
      .set(scene, { x: 0 }, 1.78)
      .to('.plinth-glow', { opacity: 1, duration: .08 }, 1.45)
      .to('.plinth-glow', { opacity: .45, duration: .6 }, 1.55)
      .fromTo('.dust i', { x: 0, y: 0, opacity: 1 }, { x: () => gsap.utils.random(-140, 140), y: () => gsap.utils.random(-90, -16), opacity: 0, duration: .75, ease: 'power3.out', stagger: .006 }, 1.45);
    flick.forEach((o, i) => intro.set(mark, { filter: 'brightness(' + o + ')' }, 1.5 + i * .06));
    intro.add(() => mark.classList.add('lit'), 1.92)
      .set(mark, { filter: 'brightness(1)' }, 1.92)
      .to('.loader-word span', { opacity: 1, scale: 1, duration: .45, stagger: .035, ease: 'power3.out' }, 1.6)
      .to('.loader-tag', { opacity: 1, duration: .4 }, 1.95)
      .to('.loader-bar i', { scaleX: 1, duration: 2.1, ease: 'power2.inOut' }, .3)
      .to(scene, { scale: 2.2, opacity: 0, duration: .7, ease: 'power3.in' }, 2.35)
      .to(loader, { opacity: 0, duration: .5, ease: 'power2.in' }, 2.6);
    heroIn(intro, 2.6);
    armIntro(intro);
    return intro;
  };
  let webgl = false;
  try { const c = document.createElement('canvas'); webgl = !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) {}
  if (webgl) {
    html.classList.add('intro3d');
    window.APOLLO = { finishIntro, heroIn, armIntro, domIntro, seen };
    // Safety net: if the 3D module never reports in, play the CSS intro instead.
    window.APOLLO.timer = setTimeout(() => { if (!window.APOLLO.started) domIntro(); }, 7000);
  } else {
    domIntro();
  }

  // ---------- Hero: the sun rises, the photo drifts ----------
  gsap.to('#sun', { yPercent: -45, scale: 1.25, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero-photo', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero-word', { yPercent: 40, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.final-sun', { yPercent: -25, scale: 1.15, ease: 'none', scrollTrigger: { trigger: '#final', start: 'top bottom', end: 'bottom top', scrub: true } });

  // ---------- Stats count up ----------
  $$('.n').forEach((el) => {
    const n = +el.dataset.n, dec = +el.dataset.dec, o = { v: 0 };
    gsap.to(o, { v: n, duration: 1.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' }, onUpdate: () => { el.textContent = o.v.toFixed(dec); } });
  });

  // ---------- Program hover thumbnail follows the mouse ----------
  if (window.matchMedia('(hover: hover)').matches) {
    $$('.program').forEach((row) => {
      const thumb = $('.program-thumb', row);
      row.addEventListener('mousemove', (e) => { const r = row.getBoundingClientRect(); gsap.to(thumb, { left: e.clientX - r.left - 150, duration: .5, ease: 'power3.out' }); });
    });
  }

  // ---------- Timeline line draws in ----------
  gsap.to('#timeline-fill', { scaleX: 1, scaleY: 1, ease: 'none', scrollTrigger: { trigger: '#timeline', start: 'top 80%', end: 'bottom 60%', scrub: true } });

  // ---------- Ethos cards shrink as the next one covers them ----------
  $$('.ethos-card').forEach((card, i, all) => {
    if (i === all.length - 1) return;
    gsap.to(card, { scale: .94, opacity: .5, ease: 'none', scrollTrigger: { trigger: all[i + 1], start: 'top 80%', end: 'top 20%', scrub: true } });
  });

  // ---------- Slogan strip: slow, steady drift; scrolling nudges it at most 1.4x, eased ----------
  // Three copies of the words sit in the track, so moving by one third loops with no visible jump.
  const mq = $('#marquee');
  const base = isPhone() ? 70 : 110; // seconds per loop (v4 ran 40s and up to 4x faster on scroll)
  const drift = gsap.to(mq, { xPercent: -100 / 3, duration: base, ease: 'none', repeat: -1 });
  let speed = 1;
  ScrollTrigger.create({ onUpdate: (st) => {
    const target = Math.min(1.4, 1 + Math.abs(st.getVelocity()) / 4000);
    if (Math.abs(target - speed) > .02) { speed = target; gsap.to(drift, { timeScale: target, duration: .8, ease: 'power1.out', overwrite: true }); }
  } });

  addEventListener('load', () => ScrollTrigger.refresh());
})();
