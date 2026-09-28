# AI Article Hub

Twenty-seven original, in-depth articles on artificial intelligence, published
as a single static website. Every article, the design and the downloadable
bundles are released into the public domain under **CC0 1.0** — free to read,
download, translate, remix and republish with no permission and no obligation
to credit.

## Quick start

Nothing to install. There are no dependencies, so there is no `npm install`
step and no `node_modules` folder.

### Easiest: one-click launchers

Double-click any of these — no terminal needed:

| File | What it does |
| --- | --- |
| `START-HERE.bat` | Builds the site and opens it in your browser |
| `START-SERVER.bat` | Runs the site at `http://localhost:4173` with an auto-rebuild watcher while you edit |
| `BUILD-DOWNLOADS.bat` | Rebuilds the ZIP / JSON / TXT bundles and copies them to `Desktop\AI-Article-Hub` |

Desktop shortcuts to all three are created automatically.

### From a terminal

```bash
npm run build     # generates the site into dist/
npm run check     # builds, then verifies links, anchors, metadata, bundles and security
npm run serve     # builds, then previews at http://localhost:4173
npm run audit     # like check, with the security summary
```

Node.js 18 or newer is the only requirement. Open `dist/index.html` directly in
a browser, or run the build and drop the contents of `dist/` onto any static
host.

### From VS Code

Open the **folder** `ai-article-hub` (not a single file), then:

- `Ctrl+Shift+B` — run the default **Build site** task
- **Terminal → Run Task…** — pick *Check site*, *Watch + rebuild on save*,
  *Serve on localhost:4173* or *Open site in browser*
- `.vscode/settings.json` pins files to UTF-8 so accented characters and em
  dashes cannot be corrupted by a wrong default encoding

Never edit files inside `dist/` — it is deleted and regenerated on every build.

## What gets built

```
ai-article-hub/
  START-HERE.bat          one-click: build + open in browser
  START-SERVER.bat        one-click: local server with auto-rebuild
  BUILD-DOWNLOADS.bat     one-click: rebuild the zip / json / txt bundles
  content/                the 27 articles as Markdown — edit these
  src/templates/          page structure: layout, index, article, static pages
  src/lib/                markdown.mjs (renderer) and security.mjs (header policy)
  src/assets/             styles.css, app.js, favicon.svg
  .vscode/                tasks.json, settings.json (UTF-8, run tasks)
  dist/                   the generated site (do not edit)
  downloads/              the generated bundles
  build.mjs               the site generator
  check.mjs               link, anchor, metadata and security checker
  serve.mjs               local preview server that sends the real security headers
  SECURITY.md             the security policy, in full
```

## Writing and editing articles

Articles live in `content/` as Markdown with a small YAML front matter block:

```markdown
---
number: 1
title: Article Title
description: One sentence used for the card, the meta tags and the RSS feed.
category: Foundations
tags: [one, two, three]
date: 2024-01-15
slug: article-title-slug
---

First paragraph.

## A section heading
```

`number` sets the position in the reading order, `slug` the filename, and
everything else is metadata. Section headings (`##`) build the table of
contents. Intra-site links use the flat form `03-neural-networks-from-scratch.html`.

Add a 28th file, run `npm run build`, and the index, navigation, feeds,
sitemap, related-reading blocks and download table all update themselves.

The renderer supports headings, paragraphs, fenced code blocks, blockquotes,
ordered/unordered/task lists, pipe tables, horizontal rules, emphasis, inline
code, links and autolinks. **Raw HTML is escaped, not rendered** — see
`SECURITY.md`.

## Download formats

Each article page offers Markdown, standalone HTML, print-to-PDF, plain text,
JSON and clipboard copy, generated in the browser from the page's own embedded
source. The whole collection is available as:

- `downloads/ai-article-hub-site.zip` — the entire site
- `downloads/ai-article-hub-markdown.zip` — all Markdown sources
- `downloads/ai-article-hub.json` — a CC0 machine-readable corpus
- `downloads/ai-article-hub.txt` — plain-text bundle for Pandoc and friends
- `feed.xml` — RSS with full article HTML

## Security

The site ships hardened by default. In short:

- **Zero dependencies**, runtime and build. Nothing third-party can be
  compromised to reach you.
- **Article text is escaped**, so markup in an article renders as visible text
  and cannot execute. Link targets are limited to `http`, `https` and `mailto`.
- **A strict Content-Security-Policy** with no `unsafe-inline`, no `unsafe-eval`
  and no third-party origins. No inline scripts, no inline styles, no plugins,
  no framing.
- **`X-Frame-Options: DENY`, `nosniff`, a restrictive `Referrer-Policy` and
  `Permissions-Policy`**, plus HSTS for HTTPS deployments.
- **No tracking, cookies, analytics or third-party embeds.**
- **`/.well-known/security.txt`** so researchers know where to report a problem.

`npm run check` fails the build if any of this is untrue, and prints a summary:

```
security
  dependencies          0 runtime, 0 build
  inline scripts        0
  inline styles         0
  event handlers        0
  unsafe URLs           0
  third-party resources 0
  target=_blank links   0 (all noopener)
```

The local server in `serve.mjs` sends the same headers, so you can see the
policy working while you edit. Read **`SECURITY.md`** for the full policy, the
deployment options, and what you are responsible for when hosting.

## Publishing

`dist/` is ordinary static files. Drag it onto Netlify Drop, enable GitHub
Pages, or point any static host at it.

Before your first deploy, set these two values in
`src/templates/layout.mjs` and rebuild:

```js
baseUrl: "https://your-domain.example",   // canonical URLs, sitemap, feed, security.txt
securityContact: "you@example.com",       // where to report a vulnerability
```

The build writes ready-to-serve header configuration for common hosts into
`dist/`. Keep the one that matches your host and delete the rest:

| File | Use on |
| --- | --- |
| `_headers` | Netlify, Cloudflare Pages |
| `vercel.json` | Vercel |
| `.htaccess` | Apache and most shared hosts |
| `security-headers.nginx.conf` | nginx (paste the lines into `server{}`) |
| `.well-known/security.txt` | every host, at the RFC 9116 path |

Full instructions, including how to dedicate your own work to the public
domain, are in `publish.html` (and in `src/templates/pages.mjs`).

## Verifying a build

`npm run check` rebuilds and then validates every generated page: internal
links and anchors resolve, stylesheet and script references exist, license
metadata is present on every page, the feed and sitemap item counts match the
article count, the JSON corpus parses, and no article has an unexpectedly short
body. It then runs the security checks described above and scans everything
published for leaked credentials. `npm run verify` additionally unzips the
generated site archive to confirm it is a valid archive.

## Design notes

- No runtime dependencies, no third-party requests, no tracking, no cookies.
- No build dependencies either. The Markdown renderer is `src/lib/markdown.mjs`.
- The header policy is declared once in `src/lib/security.mjs` and rendered
  into every host format, so it cannot drift between deployments.
- Light and dark themes, responsive layout, print stylesheet, keyboard
  accessible, honours `prefers-reduced-motion`.
- Article metadata is exposed as JSON-LD, Open Graph and `dcterms.license`.

## License

CC0 1.0 Universal. See `LICENSE.md`, or the deed at
https://creativecommons.org/publicdomain/zero/1.0/.

SPDX-License-Identifier: `CC0-1.0`
