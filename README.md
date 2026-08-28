# Black Pearl Painters

Next.js + React rebuild of [blackpearlpainters.com](https://blackpearlpainters.com/), hosted on Netlify.

Content and URL paths are cloned from the live WordPress site into JSON:

- `content/manifest.json` — every URL
- `content/pages/<path>/index.json` — page copy, headings, lists, and image refs in document order
- `content/chrome.json` — nav, people, quote form
- `public/media/wp-content/uploads/...` — downloaded images

The visual design is new. Copy and image sequence match the source pages.

## Local

```bash
npm install
npm run dev
```

SEO audit (previous deliverable): [http://localhost:3000/seo-audit/](http://localhost:3000/seo-audit/)

## Deploy

`netlify.toml` builds with `npm run build` and publishes `out/`.
