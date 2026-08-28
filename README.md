# Black Pearl Painters — SEO report

Interactive SEO and competitive-visibility report for [blackpearlpainters.com](https://blackpearlpainters.com/).

**Stack:** Next.js, React, Netlify (static export).

The live painter site that was audited is still WordPress + Divi + Rank Math + NitroPack + SiteGround. This repo is the report interface only.

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Netlify builds with `npm run build` and publishes the `out/` directory (`output: "export"` in `next.config.ts`).
