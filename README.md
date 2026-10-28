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
- **MDX content pipeline** — `next-mdx-remote` + `gray-matter` + `zod`; posts
  live as files and are validated at build time

## Pages

| Route | Description |
| --- | --- |
| `/` | Homepage: intro, links, blog and UX lab entry points, social links |
| `/blog` | Blog index, modelled on the reference site's list layout |
| `/blog/[slug]` | Article page with prose and more posts |
| `/ux-lab` | Grid of interactive UX experiments, modelled on the reference lab |
| `/ux-lab/[slug]` | Live experiment with notes, source link, and more experiments |
| `/track` | F1 circuit cards with illustrated layouts |
| `/track/[slug]` | Interactive circuit map, corner explorer, and race notes |

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
   "i also write blog" line links to the blog index, the UX lab phrase links to
   `/ux-lab`, and the Formula 1 line links to `/track`.
3. **Blog posts** — content lives in
   [`content/blog/`](content/blog), one folder per slug. Each post has
   `en.mdx`; add `zh.mdx` for a Chinese version and the `EN / 中文` switch
   appears automatically. Frontmatter is validated with Zod at build time:

   ```mdx
   ---
   title: "my new post"
   description: "One sentence for the list and SEO."
   date: "2026-11-01"
   readingTime: "3 min read"
   ---

   ## a heading

   A paragraph of body copy.

   <Callout label="note">

   Something worth highlighting.

   </Callout>
   ```

   The list page, static article routes, and sitemap are generated from the
   filesystem. No database or rebuild service is required yet.
4. **UX lab** — mock experiment copy lives in [`src/data/lab.ts`](src/data/lab.ts).
   Interactive demos and card previews are in
   [`src/components/lab-demos.tsx`](src/components/lab-demos.tsx) and
   [`src/components/lab-preview.tsx`](src/components/lab-preview.tsx). Adding a
   data entry with an existing `demo` kind is enough to create a new page.
5. **F1 track guide** — the site ships with nine circuits. Base circuits live
   in [`src/data/tracks.ts`](src/data/tracks.ts), newer additions in
   [`src/data/tracks-extra.ts`](src/data/tracks-extra.ts), and map geometry in
   [`src/data/track-maps.json`](src/data/track-maps.json). The interactive map
   and corner list are in
   [`src/components/track-explorer.tsx`](src/components/track-explorer.tsx).
   To add a circuit, add a map entry and a `makeTrack(...)` definition following
   the `Track` type.
6. **Avatar** — [`public/cartonAvator.png`](public/cartonAvator.png) is used by
   [`src/components/avatar.tsx`](src/components/avatar.tsx). Replace that file,
   or update the `src` if you rename it. Next.js optimizes the 1254px source into
   a small WebP for the 52px avatar.
7. **Colors** — adjust the CSS variables at the top of
   [`src/app/globals.css`](src/app/globals.css). The default palette is warm
   paper, sage, clay, dusty blue, and plum, with carbon/racing red/high-vis
   tokens used by the track map.
8. **Production URL** — set `NEXT_PUBLIC_SITE_URL` (or change the fallback in
   `src/data/site.ts`) before deploying so canonical URLs, robots, and the
   sitemap point at the right domain.

## Structure

```text
content/
  blog/
    <slug>/
      en.mdx                 article source + validated frontmatter
      zh.mdx                 optional Chinese article
src/
  app/
    globals.css              design tokens, ambient background, shared styles
    layout.tsx               fonts, metadata, skip link
    page.tsx                 homepage content
    blog/page.tsx            blog index
    blog/[slug]/page.tsx     article page
    ux-lab/page.tsx          experiment grid
    ux-lab/[slug]/page.tsx   live experiment page
    track/page.tsx           F1 circuit cards
    track/[slug]/page.tsx    interactive circuit page
    icon.svg                 favicon
    opengraph-image.tsx      dynamic social image
  components/
    ambient-background.tsx
    article-view.tsx         article header + EN/中文 switch
    avatar.tsx
    back-link.tsx
    icons.tsx                hand-drawn SVG brand/tech marks
    lab-demos.tsx            six interactive UX experiments
    lab-more-list.tsx        more-experiments list
    lab-preview.tsx          static card previews
    mdx.tsx                  MDX code blocks + Callout
    pill-link.tsx
    post-list.tsx
    reveal.tsx               Motion entrance group
    site-footer.tsx
    text-link.tsx
    track-explorer.tsx       SVG circuit map + corner explorer
  data/
    site.ts                  the one file to edit first
    lab.ts                   mock UX lab content
    tracks.ts                base F1 circuit data
    tracks-extra.ts          the six newer circuits
    track-maps.json          circuit paths + marker coordinates
    track-types.ts           shared track types
    f1-circuits-LICENSE.txt  MIT license for circuit geometry
  lib/
    blog.ts                  filesystem content loader + Zod validation
    date.ts                  shared post date formatter
  fonts/
    inter-latin.woff2        bundled variable font
    caveat-latin.woff2       bundled handwritten font
    OFL-*.txt                font licenses
public/
  cartonAvator.png           replace with your portrait
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
- Circuit geometry is adapted from
  [bacinger/f1-circuits](https://github.com/bacinger/f1-circuits) under the MIT
  license. The turn positions and notes are illustrative rather than official
  timing data.
- Blog content is intentionally file-based. It can later be moved behind a
  CMS, but the current setup keeps builds deterministic and content reviewable
  in Git.
