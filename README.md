# Apollo gym, Amman

Showcase website for Apollo gym in Amman, Jordan. Plain HTML, CSS and a little JavaScript, hosted on GitHub Pages.

Preview: https://labsuncut.github.io/site-apollo-gym-amman/

- All words (English and Arabic), hours and class times live in `assets/js/content.js`.
- Items marked PLACEHOLDER are waiting for real information from Apollo.
- Photos go in `assets/img/`; point the `img` fields in `content.js` at them.
- The live member count (the corner bubble) is read from Apollo's own counter: a Supabase table that its public live page uses, updated by Apollo's staff. `liveSource` and `liveKey` in `content.js` point at it; if Apollo moves the counter, update those two values.

## Opening intro

The site opens on a night rooftop with the Apollo sign flickering to life, then dissolving into the homepage. It plays once per visit (a refresh or a language switch goes straight to the page) and can be skipped at any time.

The rooftop plates in `assets/img/intro/` are a composited brand scene, not Apollo's actual building. To swap in a real photo of Apollo's roof or signage, replace `roof-desk.webp` (landscape) and `roof-phone.webp` (portrait) and regenerate the matching `sign-*` and `spill-*` layers so they line up.

## Words in the HTML (prerender)

The page fills itself from `assets/js/content.js`, and the same words are also baked into `index.html` so Google, AI crawlers, link previews and visitors without JavaScript get the full content. After any change to `content.js`, `site.js` templates or the body of `index.html`, run:

    NODE_PATH=$(npm root -g) node tools/prerender.cjs

It needs Playwright with Chromium. Running it twice gives the same file. The opening badge ("Open now") and the live count are never baked because they change by the minute.

## Other pages

- `privacy.html`: privacy policy, linked from the footer. Plain English, no JavaScript. Update the date at the top when it changes.
- `sitemap.xml` and `robots.txt` list both pages; update the addresses when the site moves to Apollo's own domain.

## Rolling back

Every version is a commit on `main`, and GitHub Pages publishes `main` within a few minutes. To go back to the previous version: `git revert <commit> && git push`, or on GitHub open the commit, "Revert", merge. The previous deploy stays listed under Actions as well.
