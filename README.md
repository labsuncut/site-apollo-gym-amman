# Apollo gym, Amman

Showcase website for Apollo gym in Amman, Jordan. Plain HTML, CSS and a little JavaScript, hosted on GitHub Pages.

Preview: https://labsuncut.github.io/site-apollo-gym-amman/

- All words (English and Arabic), hours and class times live in `assets/js/content.js`.
- Items marked PLACEHOLDER are waiting for real information from Apollo.
- Photos go in `assets/img/`; point the `img` fields in `content.js` at them.

## Opening intro

The site opens on a night rooftop with the Apollo sign flickering to life, then dissolving into the homepage. It plays once per visit (a refresh or a language switch goes straight to the page) and can be skipped at any time.

The rooftop plates in `assets/img/intro/` are a composited brand scene, not Apollo's actual building. To swap in a real photo of Apollo's roof or signage, replace `roof-desk.webp` (landscape) and `roof-phone.webp` (portrait) and regenerate the matching `sign-*` and `spill-*` layers so they line up.
