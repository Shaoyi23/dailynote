# dailynote · personal site

A quiet, text-first personal website built with the current frontend stack. The
layout takes cues from [sanyam.sh](https://sanyam.sh/) — a narrow reading column,
lowercase typography, inline links, a handwritten signature, and lots of
breathing room — with a softer, warmer background treatment.

The project lives in `dailynote/`. The default name, location, email, domain,
social links, and blog posts are placeholders. Replace them before deploying.

[中文说明](README.zh-CN.md)

## Stack

- **[Next.js 16](https://nextjs.org/)** — App Router, static rendering, metadata
- **React 19** + **TypeScript**
- **Tailwind CSS 4** — CSS-first theme tokens
- **[Motion](https://motion.dev/)** — staggered entrance animation with reduced
  motion support
- `next/font/local` — bundled Inter + Caveat WOFF2 files, no Google Fonts
  request at build or runtime

## Pages

| Route | Description |
| --- | --- |
| `/` | Homepage: intro, links, blog entry point, social links |
| `/blog` | Blog index, modelled on the reference site's list layout |
| `/blog/[slug]` | Article page with prose and more posts |

## Run it

```bash
cd dailynote
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build      # production build
npm run start      # production server
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run dev:clean  # clear .next, then start the dev server
```

The project uses npm. If your global npm cache has permission issues, pass a
temporary cache: `npm install --cache /tmp/npm-cache`.

Copy `.env.example` to `.env.local` and set your production URL when you deploy.

## Make it yours

1. **Content and links** — edit [`src/data/site.ts`](src/data/site.ts). This is
   where the name, location, email, description, and social URLs live. The
   defaults are placeholders (`your-handle`, `yourdomain.com`).
2. **Homepage copy** — edit [`src/app/page.tsx`](src/app/page.tsx). The
   "i also write blog" line links to the blog index.
3. **Blog posts** — add or edit entries in [`src/data/posts.ts`](src/data/posts.ts).
   The list page, article routes, and sitemap are generated from this array.
   Add an optional `translation` object (`lang: "zh-CN"`, title, description,
   reading time, content) to show an `EN / 中文` switch on that article. The
   default reading language stays English.
4. **Avatar** — replace [`public/avatar.svg`](public/avatar.svg) with a photo or
   your own illustration. If you use a PNG/JPG, update the `src` in
   [`src/components/avatar.tsx`](src/components/avatar.tsx), remove
   `unoptimized`, and set a useful `alt`.
5. **Colors** — adjust the CSS variables at the top of
   [`src/app/globals.css`](src/app/globals.css). The default palette is warm
   paper, sage, clay, dusty blue, and plum.
6. **Production URL** — set `NEXT_PUBLIC_SITE_URL` (or change the fallback in
   `src/data/site.ts`) before deploying so canonical URLs, robots, and the
   sitemap point at the right domain.

## Structure

```text
src/
  app/
    globals.css              design tokens, ambient background, shared styles
    layout.tsx               fonts, metadata, skip link
    page.tsx                 homepage content
    blog/page.tsx            blog index
    blog/[slug]/page.tsx     article page
    icon.svg                 favicon
    opengraph-image.tsx      dynamic social image
  components/
    ambient-background.tsx
    article-view.tsx         article body, code blocks, EN/中文 switch
    avatar.tsx
    back-link.tsx
    icons.tsx                hand-drawn SVG brand/tech marks
    pill-link.tsx
    post-list.tsx
    reveal.tsx               Motion entrance group
    site-footer.tsx
    text-link.tsx
  data/
    site.ts                  the one file to edit first
    posts.ts                 blog content
  fonts/
    inter-latin.woff2        bundled variable font
    caveat-latin.woff2       bundled handwritten font
    OFL-*.txt                font licenses
public/
  avatar.svg                 replace with your portrait
```

## Troubleshooting

- **`Failed to load SWC binary for darwin/arm64`** — the platform-specific
  Next.js compiler package is incomplete. Reinstall it with
  `rm -rf node_modules/@next/swc-darwin-arm64 && npm install`, or do a clean
  install with `rm -rf node_modules .next && npm ci`.
- **`localhost:3000` keeps loading** — an old dev process may still own the port.
  Check `lsof -nP -iTCP:3000 -sTCP:LISTEN`, stop the stale PID, then run
  `npm run dev:clean`.
- **Fonts** — Inter and Caveat are committed under `src/fonts/`, so builds do not
  depend on access to Google Fonts.

## Deploy

The site builds as static pages. Push the repo to GitHub and import it into
[Vercel](https://vercel.com/new) with `dailynote` as the root directory, or run
`npm run build && npm start` on any Node host. Add `NEXT_PUBLIC_SITE_URL` in the
host's environment settings.

## Notes

- Motion respects `prefers-reduced-motion`.
- Content remains readable without JavaScript.
- The design deliberately avoids a nav bar and card grid, matching the
  reference's restraint.
- No analytics or third-party scripts are included.
