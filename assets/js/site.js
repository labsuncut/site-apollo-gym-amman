// APOLLO: fills the page from content.js and adds the small bits of motion. No frameworks.
(() => {
  const html = document.documentElement;
  const lang = html.lang === 'ar' ? 'ar' : 'en';
  const T = TEXT[lang];
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (v) => String(v).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Words ----------
  $$('[data-t]').forEach((el) => { const v = T[el.dataset.t]; if (typeof v === 'string') el.textContent = v; });
  $('#year').textContent = new Date().getFullYear();
  $('#lang').addEventListener('click', () => {
    try { localStorage.setItem('apollo-lang', lang === 'ar' ? 'en' : 'ar'); } catch (e) {}
    location.reload();
  });

  // ---------- Links (WhatsApp, phone, Instagram, map) ----------
  const wa = BUSINESS.whatsapp
    ? `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(T.wa_msg)}` : '';
  $$('.wa-link').forEach((a) => { if (wa) { a.href = wa; a.target = '_blank'; a.rel = 'noopener'; } else a.classList.add('is-placeholder'); });
  $$('.tel-link').forEach((a) => { if (BUSINESS.phone) a.href = `tel:${BUSINESS.phone}`; else a.classList.add('is-placeholder'); });
  $$('.ig-link').forEach((a) => { if (BUSINESS.instagram) a.href = BUSINESS.instagram; else a.classList.add('is-placeholder'); });
  $$('.map-link').forEach((a) => { a.href = BUSINESS.maps; a.target = '_blank'; a.rel = 'noopener'; });
  const map = $('#map');
  const loadMap = () => { if (map.src === 'about:blank') map.src = BUSINESS.mapEmbed; };
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((e, o) => { if (e[0].isIntersecting) { loadMap(); o.disconnect(); } }, { rootMargin: '400px' }).observe(map);
  } else loadMap();

  // ---------- Marquee ----------
  const words = T.marquee.map((w) => `<span>${esc(w)}</span><i>✦</i>`).join('');
  $('#marquee').innerHTML = words + words + words;

  // ---------- Programs ----------
  const ICONS = {
    bar: '<svg viewBox="0 0 24 24"><path d="M2 10v4M5 7v10M8 9v6M16 9v6M19 7v10M22 10v4M8 12h8"/></svg>',
    pulse: '<svg viewBox="0 0 24 24"><path d="M2 12h4l3-7 4 14 3-9 2 2h4"/></svg>',
    group: '<svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M2 20c0-3.5 2.5-6 6-6s6 2.5 6 6M10 20c0-3.5 2.5-6 6-6s6 2.5 6 6"/></svg>',
    coach: '<svg viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7M12 14v7"/></svg>'
  };
  $('#programs-grid').innerHTML = PROGRAMS.map((p, i) => {
    const [name, text] = p[lang];
    return `<article class="program reveal" style="--i:${i}"><span class="program-icon">${ICONS[p.icon]}</span><span class="program-num">0${i + 1}</span><h3>${esc(name)}</h3><p>${esc(text)}</p></article>`;
  }).join('');

  // ---------- Space tiles ----------
  $('#space-grid').innerHTML = SPACE.map((s, i) => {
    const inner = s.img ? `<img src="${esc(s.img)}" alt="${esc(s[lang])}" loading="lazy">` : '<span class="tile-ph" aria-hidden="true"></span>';
    return `<figure class="tile reveal" style="--i:${i}">${inner}<figcaption>${esc(s[lang])}</figcaption></figure>`;
  }).join('');

  // ---------- Coaches ----------
  $('#coaches-grid').innerHTML = COACHES.map((c, i) => {
    const [name, role] = c[lang];
    const photo = c.img ? `<img src="${esc(c.img)}" alt="${esc(name)}" loading="lazy">` : '<span class="coach-ph" aria-hidden="true"></span>';
    return `<article class="coach reveal" style="--i:${i}"><div class="coach-photo">${photo}</div><h3>${esc(name)}</h3><p>${esc(role)}</p></article>`;
  }).join('');

  // ---------- Plans ----------
  $('#plans-grid').innerHTML = PLANS.map((p, i) => {
    const [name, perks] = p[lang];
    const price = p.price ? `<b>${esc(p.price)}</b><small>${esc(T.jd)} ${esc(T.per_month)}</small>` : '<b class="ph">--</b><small>&nbsp;</small>';
    return `<article class="plan reveal${p.popular ? ' is-popular' : ''}" style="--i:${i}">${p.popular ? `<span class="plan-tag">${esc(T.popular)}</span>` : ''}<h3>${esc(name)}</h3><div class="plan-price">${price}</div><ul>${perks.map((x) => `<li>${esc(x)}</li>`).join('')}</ul><a class="btn btn-ghost wa-link" href="${wa || '#visit'}"${wa ? ' target="_blank" rel="noopener"' : ''}>${esc(T.plan_cta)}</a></article>`;
  }).join('');

  // ---------- Schedule ----------
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: BUSINESS.timezone }));
  const today = now.getDay();
  const dayBtns = T.days.map((d, i) => `<button type="button" role="tab" aria-selected="${i === today}" data-day="${i}">${esc(d)}</button>`).join('');
  $('#days').innerHTML = dayBtns;
  const showDay = (d) => {
    $$('#days button').forEach((b) => b.setAttribute('aria-selected', String(+b.dataset.day === d)));
    const rows = SCHEDULE[d] || [];
    $('#classes').innerHTML = rows.length
      ? rows.map((r) => `<div class="class-row"><time dir="ltr">${esc(r[0])}</time><span>${esc(lang === 'ar' ? r[2] : r[1])}</span></div>`).join('')
      : `<p class="class-empty">${lang === 'ar' ? 'لا توجد حصص جماعية هذا اليوم. الصالة مفتوحة للتمرين الحر.' : 'No group classes today. The floor is open for training.'}</p>`;
  };
  $('#days').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) showDay(+b.dataset.day); });
  showDay(today);

  // ---------- Hours table + open badge ----------
  const fmt = (s) => {
    let [h, m] = s.split(':').map(Number); h %= 24;
    if (lang === 'ar') return `${h}:${String(m).padStart(2, '0')}`;
    return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
  };
  $('#hours').innerHTML = HOURS.map((h, i) => `<tr${i === today ? ' class="is-today"' : ''}><th>${esc(T.days[i])}</th><td dir="ltr">${h ? `${fmt(h[0])} – ${fmt(h[1])}` : (lang === 'ar' ? 'مغلق' : 'Closed')}</td></tr>`).join('');
  (function openBadge() {
    const el = $('#open');
    const m = now.getHours() * 60 + now.getMinutes();
    const toMin = (s) => { const [h, mm] = s.split(':').map(Number); return h * 60 + mm; };
    const t = HOURS[today], y = HOURS[(today + 6) % 7];
    let open = false;
    if (y && m < toMin(y[1]) - 1440) open = true;
    if (t && m >= toMin(t[0]) && m < toMin(t[1])) open = true;
    el.classList.toggle('is-open', open);
    $('span', el).textContent = open ? T.open_now : T.closed_now;
  })();

  // ---------- Reveal on scroll ----------
  const reveals = $$('.reveal');
  if (calm || !('IntersectionObserver' in window)) reveals.forEach((el) => el.classList.add('in'));
  else {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.15 });
    reveals.forEach((el) => io.observe(el));
  }
  requestAnimationFrame(() => html.classList.add('ready'));

  // ---------- Header shadow ----------
  const header = $('.site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
})();
