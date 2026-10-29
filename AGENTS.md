# AGENTS.md

Project instructions for AI coding agents. Read this before any task. It is
intentionally short: use it to avoid rediscovering the project and to keep the
work focused.

## Project

- Active site: `/Users/lando/vscodeProject/dailynote`
- Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Motion,
  MDX (`next-mdx-remote` + `gray-matter` + Zod)
- Deploy target: Vercel, connected to GitHub `Shaoyi23/dailynote`
- Do not modify `nodejs-learning/` unless explicitly asked.
- Preserve uncommitted user changes. Check `git status` before editing.

## Start every task

1. Read this file first.
2. Run `git status --short` and `git diff --stat`.
3. Read only the files relevant to the request. Prefer `rg` and targeted reads.
4. For non-trivial work, state a 3–5 bullet plan before editing.
5. Ask only for information that genuinely blocks progress.
6. Stop when the acceptance criteria are met. Do not keep polishing.

## Commands

```bash
npm run dev        # local dev
npm run dev:clean  # clear .next, then dev
npm run lint
npm run typecheck
npm run build
```

Do not run `npm install` unless `package.json` changed. Do not start another dev
server if `http://localhost:3000` already responds. Do not kill a user process
without permission.

## Content model

- Blog posts are MDX, one folder per slug:
  `content/blog/<slug>/en.mdx` and optional `zh.mdx`.
- Frontmatter requires `title`, `description`, `date` (YYYY-MM-DD), and
  `readingTime`; it is validated with Zod by `src/lib/blog.ts`.
- Do not reintroduce `src/data/posts.ts`.
- Available MDX custom components: `<Callout>`, `<ThisBindingDiagram>`,
  `<CallApplyBindDiagram>`, `<EventLoopDiagram>`.
- Blog diagrams live in `src/components/blog-diagrams.tsx`; register new ones in
  `src/components/mdx.tsx`.
- Tracks live in `src/data/tracks.ts`, `src/data/tracks-extra.ts`, and
  `src/data/track-maps.json`. Do not hand-edit route labels without checking the
  related data.
- UX lab copy is in `src/data/lab.ts`; demos are in
  `src/components/lab-demos.tsx` and previews in `src/components/lab-preview.tsx`.
- Do not add a CMS, admin panel, or database unless explicitly requested. The
  current file-based content model is intentional.

## Design rules

- Keep the existing warm paper background, carbon/racing red/high-vis track
  accents, narrow reading column, lowercase body text, and restrained motion.
- New pages should reuse `AmbientBackground`, `RevealGroup`, `BackLink`, and the
  existing typography scale.
- Avoid glow effects, heavy cards, new font families, or a new navigation system
  unless the request calls for it.
- Blog articles are English by default. Add `zh.mdx` only when requested.
- Track geometry is adapted from `f1-circuits` (MIT). Keep attribution and the
  "illustrative layout" note. Corner positions are not official timing data.

## Token and context discipline

Cost is dominated by context re-sending, large tool output, and images.

- Do not read `node_modules/`, `.next/`, build output, or the full repository.
- Use `rg`/`grep` first; use `read` with `offset`/`limit` for large files.
- Cap command output with `tail -n 30` or `head`. Never dump full HTML pages.
- Do not repeatedly fetch reference sites. The design brief is already here.
- Avoid full-page screenshots and 2x screenshots. Use at most one 1x viewport
  screenshot per affected page and one mobile screenshot when needed.
- Prefer DOM text and bounding-box checks over screenshots for verification.
- Batch edits before verifying. Run `build` once at the end, not after every
  small edit.
- Test only the routes/components affected by the change. Do not run a
  full-site visual sweep unless asked.
- Do not install dependencies or refactor unrelated code speculatively.
- Aim for a focused task: usually 5–15 tool calls. Extended exploration needs a
  clear reason or user approval.
- Use a fresh conversation for a new, unrelated task instead of carrying a huge
  history forward.
- In the final response, report only: cause/decision, changed files, verification,
  commit/deploy status.

## Verification ladder

1. Content-only MDX change: one `npm run build`; check the new route with `curl`.
2. Code change: `npm run lint`, `npm run typecheck`, then one `npm run build`.
3. UI change: one 1440×900 and, if mobile-specific, one 390×844 screenshot of the
   changed area only.
4. Debugging: capture only the failing log slice; do not paste the whole log.
5. Do not claim success without checking the build or the affected runtime path.

## Git / deploy

- Do not commit or push unless the user asks.
- If asked: use a focused commit message, then push `main`.
- Vercel deploys from `main`; do not change deployment settings or environment
  variables without explicit approval.
- `.env.local` and secrets are never committed.

## Final answer

Keep it concise and in the user's language. Include:

- what changed and why
- exact file paths
- verification result
- commit / deployment status
- any remaining caveat

Do not repeat the entire implementation or paste large code blocks.
