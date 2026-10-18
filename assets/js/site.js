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
  // Once per visit: remember in sessionStorage (cleared when the tab closes). If storage is blocked, the intro simply plays.
  const introSeen = () => { try { const v = sessionStorage.getItem('apollo-intro') === '1'; sessionStorage.setItem('apollo-intro', '1'); return v; } catch (e) { return false; } };
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
  const waMember = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(T.wa_member_msg)}`;
  $$('.wa-member').forEach((a) => { a.href = waMember; a.target = '_blank'; a.rel = 'noopener'; });
  $$('.tel-link').forEach((a) => { a.href = `tel:${BUSINESS.phone}`; });
  $$('.ig-link').forEach((a) => { a.href = BUSINESS.instagram; });
  $$('.fb-link').forEach((a) => { a.href = BUSINESS.facebook; });
  $$('[data-label]').forEach((el) => { el.setAttribute('aria-label', T[el.dataset.label] || ''); });
  $$('.live-open, #live-tab').forEach((a) => { a.href = BUSINESS.liveUrl; });
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
    return `<div class="program reveal${i === 0 ? ' is-active' : ''}" tabindex="0" data-i="${i}"><span class="program-num">${pad(i + 1)}</span><span class="program-mini"><img src="${esc(p.img)}" alt="" loading="lazy"></span><h3>${esc(name)}</h3><p>${esc(text)}</p><span class="program-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div>`;
  }).join('');
  // The photo panel: one image per program, stacked; the active one fades in. Hover or keyboard focus picks it.
  $('#program-stage').innerHTML = PROGRAMS.map((p, i) => `<img src="${esc(p.img)}" alt="" loading="lazy" class="${i === 0 ? 'is-active' : ''}">`).join('') + '<span class="program-stage-label" id="program-stage-label"></span>';
  const stageImgs = $$('#program-stage img'), stageLabel = $('#program-stage-label');
  const pickProgram = (i) => {
    $$('.program').forEach((r, k) => r.classList.toggle('is-active', k === i));
    stageImgs.forEach((im, k) => im.classList.toggle('is-active', k === i));
    stageLabel.textContent = `${pad(i + 1)} · ${PROGRAMS[i][lang][0]}`;
  };
  pickProgram(0);
  $$('.program').forEach((row) => { ['mouseenter', 'focus'].forEach((ev) => row.addEventListener(ev, () => pickProgram(+row.dataset.i))); });
  $('#amenities').innerHTML = T.amenities.map((a) => `<li>${esc(a)}</li>`).join('');

  // ---------- Ethos ----------
  $('#ethos-stack').innerHTML = ETHOS.map((e, i) => {
    const [a, b, text] = e[lang];
    return `<article class="ethos-card"><span class="ethos-num">${pad(i + 1)}</span><h3>${esc(a)}<em>${esc(b)}</em></h3><p>${esc(text)}</p></article>`;
  }).join('');
  $('#values').innerHTML = T.values.map((v) => `<span>${esc(v)}</span>`).join('');

  // ---------- Story ----------
  $('#timeline').style.setProperty('--n', STORY.length);
  $('#timeline').insertAdjacentHTML('beforeend', STORY.map((s) => {
    const [title, text] = s[lang];
    return `<div class="milestone reveal"><b>${esc(s.y)}</b><h3>${esc(title)}</h3><p>${esc(text)}</p></div>`;
  }).join(''));

  // Story strip: arrows scroll it; the soft fade on the edge disappears at the end.
  (function storyStrip() {
    const sc = $('#timeline-scroll');
    const step = () => Math.max(224, sc.clientWidth * .6);
    const atEnd = () => sc.classList.toggle('is-end', Math.abs(sc.scrollLeft) + sc.clientWidth >= sc.scrollWidth - 4);
    $('#story-prev').addEventListener('click', () => sc.scrollBy({ left: -step() * (rtl ? -1 : 1), behavior: calm ? 'auto' : 'smooth' }));
    $('#story-next').addEventListener('click', () => sc.scrollBy({ left: step() * (rtl ? -1 : 1), behavior: calm ? 'auto' : 'smooth' }));
    $('#story-prev').setAttribute('aria-label', T.quotes_prev); $('#story-next').setAttribute('aria-label', T.quotes_next);
    sc.addEventListener('scroll', atEnd, { passive: true }); addEventListener('resize', atEnd); atEnd();
  })();

  // ---------- Quotes ----------
  $('#quotes').innerHTML = QUOTES.map((q) => `<blockquote class="quote reveal"><p>${esc(q[lang])}</p><cite><b>${esc(q.name)}</b><span>${esc(q.role[lang])}</span></cite></blockquote>`).join('');
  // Reviews carousel: swipe or use the arrows; dots show where you are. Controls only appear with 2+ reviews.
  (function quotesCarousel() {
    const track = $('#quotes'), dots = $('#quotes-dots'), nav = $('#quotes-nav');
    const cards = $$('.quote', track);
    if (cards.length < 2) return;
    nav.hidden = false;
    $('#quotes-prev').setAttribute('aria-label', T.quotes_prev); $('#quotes-next').setAttribute('aria-label', T.quotes_next);
    dots.innerHTML = cards.map(() => '<i></i>').join('');
    const dotEls = $$('i', dots);
    const current = () => { const x = Math.abs(track.scrollLeft); return Math.round(x / (cards[0].offsetWidth + 20)); };
    const mark = () => { const c = Math.min(cards.length - 1, current()); dotEls.forEach((d, k) => d.classList.toggle('is-on', k === c)); };
    const go = (n) => { const c = Math.max(0, Math.min(cards.length - 1, current() + n)); cards[c].scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'nearest', inline: 'start' }); };
    $('#quotes-prev').addEventListener('click', () => go(-1));
    $('#quotes-next').addEventListener('click', () => go(1));
    track.addEventListener('scroll', mark, { passive: true });
    mark();
  })();

  // ---------- FAQ, membership, family ----------
  $('#faq-list').innerHTML = FAQ.map((f, i) => `<details class="faq-item reveal"${i === 0 ? ' open' : ''}><summary><span>${esc(f[lang][0])}</span><i></i></summary><p>${esc(f[lang][1])}</p></details>`).join('');
  $('#includes').innerHTML = T.includes.map((x) => `<li>${esc(x)}</li>`).join('');
  $('#enquire-lines').innerHTML = [[BUSINESS.phone, BUSINESS.phoneDisplay], ['+' + BUSINESS.whatsapp, BUSINESS.mobileDisplay]].map(([n, d]) => `<a href="tel:${esc(n)}" dir="ltr">${esc(d)}</a>`).join('<span aria-hidden="true"> · </span>');
  $('#family-grid').innerHTML = FAMILY.map((f) => {
    const [title, text] = f[lang];
    const media = f.img ? `<img src="${esc(f.img.src)}" width="${f.img.w}" height="${f.img.h}" alt="${esc(title)}" loading="lazy" style="object-position:${esc(f.img.focus || '50% 50%')}">`
      : `<div class="family-slot"><svg viewBox="0 0 100 100" aria-hidden="true"><use href="#mark"/></svg><span>${esc(T.family_slot)}</span></div>`;
    return `<article class="family-card reveal"><div class="family-media">${media}</div><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`;
  }).join('');

  // ---------- Hours + open badge ----------
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: BUSINESS.timezone }));
  const today = now.getDay();
  const fmt = (s) => {
    let [h, m] = s.split(':').map(Number); h %= 24;
    if (lang === 'ar') return h === 0 && m === 0 ? '12:00 ليلاً' : `${h}:${pad(m)}`;
    return `${h % 12 || 12}:${pad(m)} ${h < 12 ? 'AM' : 'PM'}`;
  };
  $('#hours').innerHTML = BUSINESS.hours.map((h, i) => `<tr${i === today ? ' class="is-today"' : ''}><th data-today="${esc(T.today)}">${esc(T.days[i])}</th><td dir="ltr">${h ? `${fmt(h[0])} – ${fmt(h[1])}` : (lang === 'ar' ? 'مغلق' : 'Closed')}</td></tr>`).join('');
  (function openBadge() {
    const el = $('#open');
    const m = now.getHours() * 60 + now.getMinutes();
    const toMin = (s) => { const [h, mm] = s.split(':').map(Number); return h * 60 + mm; };
    const t = BUSINESS.hours[today];
    // A close of 00:00 (or any time before the open) means past midnight.
    const closeMin = t ? (toMin(t[1]) <= toMin(t[0]) ? toMin(t[1]) + 1440 : toMin(t[1])) : 0;
    const open = t && m >= toMin(t[0]) && m < closeMin;
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

  // ---------- Apollo Live: bubble + panel ----------
  // The bubble stays in view; the panel shows Apollo's own live page in a frame, with a new-tab link as the fallback.
  (function liveBubble() {
    const bubble = $('#live-bubble'), panel = $('#live-panel'), frame = $('#live-frame'), count = $('#live-count');
    let loaded = false;
    const setPanel = (show) => {
      panel.hidden = !show;
      bubble.setAttribute('aria-expanded', String(show));
      if (show && !loaded) { loaded = true; frame.src = BUSINESS.liveUrl; }
      if (lenis) show ? lenis.stop() : lenis.start();
      if (show) $('#live-close').focus(); else bubble.focus();
    };
    bubble.addEventListener('click', () => setPanel(panel.hidden));
    $('#live-close').addEventListener('click', () => setPanel(false));
    panel.addEventListener('click', (e) => { if (e.target === panel) setPanel(false); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) setPanel(false); });
    $$('.live-open').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); setMenu(false); setPanel(true); }));
    $('#live-close').setAttribute('aria-label', T.live_close);
    // Live number in the bubble, only when Apollo gives us an endpoint for it.
    if (BUSINESS.liveCountUrl) {
      const pull = () => fetch(BUSINESS.liveCountUrl, { cache: 'no-store' }).then((r) => r.json()).then((d) => {
        const n = Number(d.count ?? d.members ?? d.value);
        if (!isNaN(n)) { count.textContent = n; count.hidden = false; bubble.title = `${n} ${T.live_members}`; }
      }).catch(() => {});
      pull(); setInterval(pull, 60000);
    }
  })();

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
    $$('.display .line > span').forEach((el) => { el.style.transform = 'none'; el.style.opacity = 1; });
    $$('.n').forEach((el) => { el.textContent = Number(el.dataset.n).toFixed(+el.dataset.dec); });
    const ld = $('#loader');
    // Reduced motion: the lit rooftop holds as a still, then dissolves. Still once per visit.
    if (introSeen()) ld.remove();
    else { ld.style.transition = 'opacity .6s'; const go = () => { ld.style.opacity = 0; setTimeout(() => ld.remove(), 620); }; $('#loader-skip').addEventListener('click', go); setTimeout(go, 1400); }
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

  // ---------- Intro: the Apollo beacon on the roof ----------
  // An authored brightness curve (0 = dark, 1 = fully lit) drives the light layers of a night rooftop scene:
  // the lit sign face, a tight halo, and the red light spilling onto the frame and concrete, which lags a little.
  // Story: dormant / first weak cluster that fades / dark pause / stronger second cluster
  // with one soft dip / smooth activation / steady hold / the whole scene dissolves into the homepage.
  const loader = $('#loader');
  // The beacon plays once per visit (team decision 2026-10-16): a refresh or a language switch goes straight to the homepage.
  const seen = introSeen();
  const finishIntro = () => { if (loader.isConnected) loader.remove(); lenis.start(); ScrollTrigger.refresh(); };
  const heroIn = (tl, at) => tl
    .to('.display .line > span', { y: 0, opacity: 1, duration: .9, ease: 'power2.out', stagger: .08 }, at)
    .to('.hero-foot > *', { opacity: 1, duration: .8, stagger: .08, ease: 'power2.out' }, at + .25)
    .to('.scroll-cue', { opacity: 1, duration: .7 }, at + .5);
  if (seen) {
    loader.remove();
    heroIn(gsap.timeline(), 0);
    lenis.start();
  } else {
    const lit = $('.beacon-on'), halo = $('.beacon-halo'), spill = $('.beacon-spill');
    const L = { v: 0, s: 0 };
    const paint = () => {
      L.s += (L.v - L.s) * .22;                      // the spill follows softly and decays a touch slower
      lit.style.opacity = L.v;
      halo.style.opacity = Math.pow(L.v, 1.6);       // the halo only really appears once the face is bright
      spill.style.opacity = Math.pow(L.s, 1.2);
    };
    const intro = gsap.timeline({ paused: true, onUpdate: paint, onComplete: finishIntro });
    // Each step: brightness target, duration, ease. Unequal lengths and peaks on purpose; never more than 3 flashes a second.
    const steps = [
      // 0.00-0.35 dormant
      [0, .35, 'none'],
      // 0.35-1.20 first attempt: weak, uneven, then a fade to dark
      [.3, .07, 'power1.out'], [.1, .09, 'power1.in'], [.44, .08, 'power1.out'], [.16, .13, 'power1.inOut'], [.52, .1, 'power1.out'], [.26, .06, 'none'], [0, .32, 'power2.in'],
      // 1.20-1.55 dark pause
      [0, .35, 'none'],
      // 1.55-2.45 second attempt: stronger, nearly stable, one soft dip
      [.56, .08, 'power1.out'], [.3, .09, 'power1.in'], [.82, .1, 'power1.out'], [.64, .08, 'power1.inOut'], [.9, .25, 'power1.out'], [.46, .15, 'power1.inOut'], [.7, .15, 'power1.out'],
      // 2.45-3.05 activation
      [1, .6, 'power2.out'],
      // 3.05-3.55 steady hold
      [1, .5, 'none']
    ];
    steps.forEach(([v, d, e]) => intro.to(L, { v, duration: d, ease: e }));
    // 3.55-4.35 arrival: the rooftop dissolves into the hero and the words rise.
    intro
      .to('.loader-skip', { opacity: 1, duration: .4 }, .2)
      .to('.loader-skip', { opacity: 0, duration: .3 }, 3.5)
      .to('.beacon', { opacity: 0, duration: .8, ease: 'power1.inOut' }, 3.55)
      .to(loader, { backgroundColor: 'rgba(8,8,10,0)', duration: .6, ease: 'power1.inOut' }, 3.6)
      .add(finishIntro, 4.35);
    heroIn(intro, 3.7);
    window.apolloIntro = intro;
    const skip = () => { if (intro.progress() < 1) intro.progress(1); };
    $('#loader-skip').addEventListener('click', skip);
    addEventListener('keydown', (e) => { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') skip(); }, { once: true });
    // Start only once the rooftop and the lit face are decoded, so the first frame is the scene, not a blank.
    // If an image fails or is slow, the intro still runs (or opens the site) rather than trapping anyone.
    const plates = [$('#beacon-roof'), $('#beacon-on')];
    let started = false;
    const start = () => { if (!started) { started = true; intro.play(); } };
    const broken = () => { started = true; intro.progress(1); };
    plates.forEach((img) => { if (img.complete && !img.naturalWidth) broken(); else img.addEventListener('error', broken); });
    Promise.all(plates.map((img) => img.decode().catch(() => {}))).then(start);
    setTimeout(start, 1800);
    // Safety: nothing may block the site. If the timeline never completes, open anyway.
    setTimeout(finishIntro, 8000);
  }

  // ---------- Hero: the sun rises, the photo drifts ----------
  gsap.to('#sun', { yPercent: -45, scale: 1.25, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero-photo', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.final-sun', { yPercent: -25, scale: 1.15, ease: 'none', scrollTrigger: { trigger: '#final', start: 'top bottom', end: 'bottom top', scrub: true } });

  // ---------- Stats count up ----------
  $$('.n').forEach((el) => {
    const n = +el.dataset.n, dec = +el.dataset.dec, o = { v: 0 };
    gsap.to(o, { v: n, duration: 1.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' }, onUpdate: () => { el.textContent = o.v.toFixed(dec); } });
  });

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
