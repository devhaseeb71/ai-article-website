# Security

## Reporting a vulnerability

This is a static, public-domain website. There is no server, no database, and
no account system, so the realistic risks are limited to: content injected
into a page, a build-time dependency compromise, and misconfigured hosting
headers.

If you find a genuine problem, report it to the address in
`/.well-known/security.txt`. Please do not open a public issue for an
unpatched vulnerability. Include the page URL, what you observed, and how to
reproduce it.

Set your own contact address before publishing:

```js
// src/templates/layout.mjs
export const SITE = {
  // ...
  securityContact: "you@example.com",
  securityExpires: "2030-01-01T00:00:00.000Z"
};
```

Then rebuild. `security.txt` is generated from those values.

## What this site does to protect itself

### No dependencies

There are no runtime and no build dependencies. `package.json` has empty
`dependencies` and `devDependencies`, and there is no `node_modules`. Nothing
third-party can be compromised to reach you, and there is no lockfile to
audit. The Markdown renderer lives in `src/lib/markdown.mjs` and is part of
this repository under the same CC0 licence.

If you ever add a dependency, run `npm audit` and commit the lockfile.

### Raw HTML in articles cannot execute

`src/lib/markdown.mjs` escapes every character of article text before any
formatting is applied. A `<script>` tag, an `onerror` attribute, or any other
markup written in an article renders as visible text. Only a fixed set of tags
that the renderer itself emits can appear in the output.

Link targets are filtered to `http:`, `https:` and `mailto:`. A
`javascript:` or `vbscript:` URL in an article is left as inert text.

### Strict Content-Security-Policy

The policy is defined once, in `src/lib/security.mjs`, and rendered into every
host format. It allows only this origin for every resource type:

```
default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none';
frame-src 'none'; child-src 'none'; form-action 'self'; script-src 'self';
script-src-attr 'none'; style-src 'self'; img-src 'self'; font-src 'self';
connect-src 'self'; media-src 'self'; manifest-src 'self'; worker-src 'self';
upgrade-insecure-requests
```

The practical consequences:

- No inline `<script>` and no inline event handlers can run, even if markup
  were somehow injected.
- No inline `style` attributes, so there is no CSS-based data exfiltration.
- No plugins (`<object>`) and no framing, which blocks clickjacking.
- No connections to other origins, so there is no third-party tracking surface.

Because the policy forbids inline styles, all styling lives in
`src/assets/styles.css`. The reading-progress indicator is a native
`<progress>` element rather than a div with a percentage written into its style
attribute.

If you edit the site and a feature silently stops working, the cause is almost
always a new inline script or style. Move it into a file under `assets/` and
reference it with `src` or `href`.

### Other headers

| Header | Value |
| --- | --- |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | camera, microphone, geolocation and the rest disabled |
| `Cross-Origin-Opener-Policy` | `same-origin` |
| `Cross-Origin-Resource-Policy` | `same-origin` |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` |
| `X-Permitted-Cross-Domain-Policies` | `none` |

`Strict-Transport-Security` only takes effect over HTTPS, which is why it is
omitted by the local development server.

## Deployment

`npm run build` writes ready-to-serve configuration into `dist/`:

| File | Use on |
| --- | --- |
| `_headers` | Netlify, Cloudflare Pages |
| `vercel.json` | Vercel |
| `.htaccess` | Apache and most shared hosts |
| `security-headers.nginx.conf` | nginx (paste the lines into `server{}`) |
| `.well-known/security.txt` | every host, at the RFC 9116 path |

Pick the one that matches your host and delete the rest before uploading, so
you do not publish a config for a server that is not there.

If your host has its own header settings, they usually override these. Verify
after deploying:

- <https://securityheaders.com>
- the CSP `report-uri` or `report-to` directive if you want violation reports

To add reporting, append `report-to csp-endpoint` and configure the endpoint on
your host. Keep `report-uri` alongside it for older browsers.

## What you are responsible for when hosting

The build cannot set these for you:

1. **Serve over HTTPS.** Get a free certificate from your host or Let's Encrypt.
   The HSTS header assumes TLS.
2. **Set `SITE.baseUrl`** in `src/templates/layout.mjs` to your real domain, then
   rebuild. Absolute URLs in the feed, sitemap, `security.txt` and Open Graph
   tags depend on it.
3. **Do not commit secrets.** There is no API key or token in this project. If
   you add one, keep it in an environment variable and never in a template.
4. **Keep the host updated.** The site's own code being audited does not help if
   the web server is running an old version.
5. **Back up the repository.** It is the only place your article sources exist.

## Verifying the build

```bash
npm run check     # links, assets, metadata, and the security rules
npm run audit     # same, plus an explicit security summary
```

The checker fails the build if it finds an inline script, an inline style, an
`on*` handler, a `javascript:` URL, a reference to a third-party origin, a
`target="_blank"` without `rel="noopener"`, a missing security header, or a host
config that disagrees with `src/lib/security.mjs`.

## Known limitations

- `security.txt` uses a placeholder address until you set `SITE.securityContact`.
- There is no build-time secret scanning, because the project contains no secrets
  and no dependencies to scan.
- The HSTS header cannot be tested locally; it is only meaningful over HTTPS.
- If you later add a third-party service (a comment widget, analytics, a font
  CDN, an embedded video), the CSP will block it. That is the policy working.
  Decide deliberately whether to relax `script-src` or `style-src` for that one
  origin rather than switching on `unsafe-inline`.
