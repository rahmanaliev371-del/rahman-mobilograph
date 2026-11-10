# RAHMAN MOBILOGRAPH

Portfolio site for a mobile videographer in Almaty. Next.js (App Router) · React · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Languages

The site is available in English, Russian and Kazakh: `/en`, `/ru`, `/kk`.

- `/` redirects to the visitor's language: first a saved choice (the `NEXT_LOCALE` cookie set by the EN / RU / KZ switcher), then the browser's `Accept-Language`, and English otherwise. See [`src/proxy.ts`](src/proxy.ts).
- All texts are in [`src/i18n/dictionaries/`](src/i18n/dictionaries/): `en.ts`, `ru.ts`, `kk.ts`. English defines the structure. If a key is missing in another language, `npm run build` fails.
- Anton and Instrument Serif have no Cyrillic, so Russian and Kazakh pages use Oswald and Cormorant Garamond for headings. The brand lettering (`font-brand`) stays Anton everywhere.

## Editing content

Texts: see the dictionaries above. Everything that doesn't depend on language is in [`src/lib/data.ts`](src/lib/data.ts):

- **Portfolio**: add real work by setting `video` (e.g. `/videos/restaurant-01.mp4`) and/or `poster` on a project. Put the files in `public/videos` and `public/images`. Cards switch from the placeholder to the real media automatically, and videos play muted on hover. An optional `title: { en, ru, kk }` replaces the generic "Restaurant Reel 01" name.
- **Pricing**: set `priceFrom` (in tenge, e.g. `30000`) on a plan. It is shown as "from 30 000 tenge" / "от 30 000 тенге" / "30 000 теңгеден бастап". `null` shows "On request".
- **Contacts**: WhatsApp, Instagram and TikTok are in `site` (`whatsapp`, `instagram`, `tiktok`). "Book a shoot" and the pricing buttons open WhatsApp with a pre-filled message from the dictionaries.

The hero portrait is `public/images/rahman.png`.

## Deploy

Set `NEXT_PUBLIC_SITE_URL` to the real domain so social preview images resolve correctly.

## Structure

```
src/
  app/[lang]/     localized root layout + page; global styles in app/globals.css
  proxy.ts        "/" → "/en" | "/ru" | "/kk"
  i18n/           locale config, dictionaries (en, ru, kk), getDictionary
  components/
    layout/       Header (+ mobile menu), LanguageSwitcher, Footer, MotionProvider
    sections/     Hero, About, Portfolio, Services, Process, Pricing, Contact
    portfolio/    ProjectCard
    ui/           Reveal, SectionHeading, ButtonLink, Marquee, Timecode, FitText, …
  hooks/          useActiveSection, useFitText, useSkipIntro
  lib/            data.ts (language-independent config), motion.ts (easing & variants)
```
