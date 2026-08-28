"use client";

import { useState } from "react";
import {
  AUDIT_DATE,
  CATEGORY_SCORES,
  COMPETITOR_ROWS,
  CONTENT_QUALITY,
  CRAWL_ISSUES,
  CRAWL_STATS,
  FINDINGS,
  GAP_ROWS,
  IA_ROWS,
  LASTMOD_COUNTS,
  LASTMOD_MONTHS,
  LIVE_SITE_STACK,
  MARKET_AS_OF,
  PAGE_ROWS,
  PARITY_SCORES,
  PLAN,
  REPORT_STACK,
  SCHEMA_FIELDS,
  SERP_FEATURE_COUNTS,
  SERP_FEATURE_MONTHS,
  SITE,
  TITLE_PATTERNS,
  TONE_FOR_SEV,
  TOP3_KEYWORD_COUNTS,
  TRAFFIC_BRANDED,
  TRAFFIC_ORGANIC,
  TRAFFIC_PAID,
  TRAFFIC_PEERS,
  TRAFFIC_VISITS,
  TRENDS_HOUSE_PAINTERS,
  TRENDS_MONTHS,
  TRENDS_PAINTERS_NEAR_ME,
  findingCounts,
  overallScore,
  type Filter,
  type ReportTab,
} from "@/lib/audit-data";
import {
  AreaLine,
  DualLine,
  Donut,
  HorizontalBar,
  VerticalBar,
  chartColors,
} from "@/components/charts";
import { Callout, Caption, DataTable, Stat } from "@/components/ui";

export default function Report() {
  const [tab, setTab] = useState<ReportTab>("seo");
  const score = overallScore();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Combined report · {AUDIT_DATE}
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Black Pearl Painters — SEO & competitive visibility
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-zinc-600">
          Two reports in one interface for{" "}
          <a className="underline decoration-zinc-300 underline-offset-2" href={SITE}>
            blackpearlpainters.com
          </a>
          : competitive visibility (SERPs, demand, peers) and a live-site
          technical crawl using the same data points as the Trustworthy Roofing
          audit. Snapshot as of {MARKET_AS_OF}. This interface is {REPORT_STACK}.
          Live site audited: {LIVE_SITE_STACK}. Semrush/GSC organic-visit
          history is not connected, so traffic-over-time uses public peer
          estimates and Google Trends demand — not estimated organic sessions.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <Stat
          value={String(PARITY_SCORES.overall)}
          label="Overall (crawl mix)"
          tone="warning"
        />
        <Stat
          value={String(PARITY_SCORES.technical)}
          label="Technical crawl"
          tone="warning"
        />
        <Stat
          value={String(PARITY_SCORES.onPage)}
          label="On-page"
          tone="warning"
        />
        <Stat
          value={String(PARITY_SCORES.local)}
          label="Local SEO"
          tone="danger"
        />
        <Stat
          value={String(PARITY_SCORES.content)}
          label="Content"
          tone="warning"
        />
      </div>
      <p className="text-xs text-zinc-500">
        Live-site scores, 0–100. Same mix as Trustworthy Roofing: technical
        30%, on-page 25%, local 25%, content 20%. Open SEO findings for crawl
        evidence; competitive visibility for SERP positions.
      </p>

      <div className="flex flex-wrap gap-2 border-b border-zinc-200 pb-2">
        <TabPill active={tab === "market"} onClick={() => setTab("market")}>
          Competitive visibility
        </TabPill>
        <TabPill active={tab === "seo"} onClick={() => setTab("seo")}>
          SEO findings
        </TabPill>
      </div>

      {tab === "market" ? <CompetitiveTab /> : <SeoTab score={score} />}

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-ink">30-day fix plan</h2>
        <ol className="border border-zinc-200 bg-white">
          {PLAN.map((item, i) => (
            <li
              key={item.week}
              className="flex gap-4 border-b border-zinc-100 px-4 py-3 last:border-0"
            >
              <span className="w-20 shrink-0 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {item.week}
              </span>
              <span className="text-sm leading-relaxed text-zinc-700">
                {i + 1}. {item.content}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <details className="border border-zinc-200 bg-white px-4 py-3">
        <summary className="cursor-pointer text-sm font-semibold text-ink">
          Method and limits
        </summary>
        <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-zinc-600">
          <p>
            SEO section: live Chrome rendering of blackpearlpainters.com,
            fetch of HTML/headers/sitemaps from that session (command-line curl
            received SiteGround 202 CAPTCHA), and comparison of location-page
            text. Scores use the same four buckets as the Trustworthy Roofing
            audit (technical 30%, on-page 25%, local 25%, content 20%). It is
            not a rankings or PageSpeed report and does not include Search
            Console, CrUX, or backlink data.
          </p>
          <p>
            Competitive visibility tab: eight non-brand queries plus one brand
            query, scored from web-index result order on {AUDIT_DATE} (not a
            geotargeted Google SERP from 98391; Maps pack omitted). Keyword
            demand over time is Google Trends interest for Washington (US-WA),
            weekly values averaged by month, 17 Aug 2025–16 Aug 2026. Peer visit
            estimates are LinkedIn company “Web Presence / Monthly Visits”
            fields (Similarweb-derived) for painternw.com (~408),
            kdqualitypainting.com (~498, +241% MoM), and runlandpainting.com
            (~630, −35% MoM). Semrush, Ahrefs, Similarweb, and SpyFu were
            blocked or 404 without a login, so BPP organic traffic and ranking
            keyword counts over time are not estimated.
          </p>
          <p className="text-xs text-zinc-500">
            robots.txt and sitemaps returned 200 for Chrome and Googlebot UAs.
            SiteGround CAPTCHA challenged xmlrpc.php, wp-json, and wp-login
            (202). SEO score is a weighted heuristic. Report UI stack:{" "}
            {REPORT_STACK}.
          </p>
        </div>
      </details>
    </div>
  );
}

function TabPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-sm ${
        active
          ? "bg-ink text-white"
          : "border border-zinc-200 bg-white text-zinc-600"
      }`}
    >
      {children}
    </button>
  );
}

function CompetitiveTab() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat value="Unlisted" label="BPP organic visits (public)" tone="warning" />
        <Stat value="408–630" label="Peer monthly visits (3 locals)" />
        <Stat value="3 / 8" label="Tracked keywords in top 5" tone="warning" />
        <Stat value="#1" label="Best non-brand position" tone="success" />
      </div>

      <Callout
        tone="warning"
        title="Semrush Domain Overview is not connected — organic visits and ranking-keyword counts over time cannot be plotted for BPP"
      >
        Semrush, Ahrefs, Similarweb, and SpyFu blocked or 404’d without a login.
        Black Pearl has no public Similarweb figure on LinkedIn. Charts below
        are the closest public substitutes: peer visit snapshots, Google Trends
        demand in Washington, and sitemap lastmod velocity. Paste a Semrush
        Domain Overview + Organic Research + Position Tracking export to
        replace these with estimated organic traffic and ranking keywords over
        12 months.
      </Callout>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-ink">
          Organic traffic — local competitors with public estimates
        </h2>
        <p className="text-sm leading-relaxed text-zinc-600">
          Public Similarweb-derived monthly visits exist only for three locals.
          BPP, PacificPro, Stanton, Fresh Coat (franchise), and CertaPro are
          omitted because they have no comparable local-domain figure.
        </p>
        <VerticalBar
          categories={TRAFFIC_PEERS}
          values={TRAFFIC_VISITS}
          name="Estimated monthly visits"
        />
        <Caption>
          Source: LinkedIn company Web Presence · Similarweb-derived · as of{" "}
          {AUDIT_DATE}. Paint Pro’s NW ~408; K&D ~498 (+241% MoM); Runland ~630
          (−35% MoM). Not Semrush organic traffic and not a time series.
        </Caption>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-ink">
          Keyword demand over time (Washington)
        </h2>
        <p className="text-sm leading-relaxed text-zinc-600">
          Search interest for the two highest-volume painter queries in
          Washington, on the same 0–100 Google Trends scale. This is demand, not
          how many keywords BPP ranks for. “House painters” follows a clear PNW
          outdoor season: trough Oct–Feb, rise Mar–May, peak late summer.
          “Painters near me” stays flatter and is the winter/indoor query worth
          owning.
        </p>
        <DualLine
          categories={TRENDS_MONTHS}
          yMax={100}
          series={[
            {
              name: "house painters (WA interest)",
              data: TRENDS_HOUSE_PAINTERS,
              color: chartColors.INFO,
            },
            {
              name: "painters near me (WA interest)",
              data: TRENDS_PAINTERS_NEAR_ME,
              color: chartColors.WARN,
            },
          ]}
        />
        <Caption>
          Source: Google Trends · geo US-WA · weekly interest averaged by month
          · 17 Aug 2025–16 Aug 2026 (partial last week dropped). Axis: month ·
          interest index 0–100 relative to this pair. City-level queries are
          below Trends’ public threshold.
        </Caption>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-ink">
          Keyword gap (where competitors rank and BPP does not)
        </h2>
        <DataTable
          headers={[
            "Opportunity cluster",
            "BPP in top 5?",
            "Who is capturing it",
            "Page to build or salvage",
          ]}
          rows={GAP_ROWS.map((r) => r.cells)}
          rowTone={GAP_ROWS.map((r) => r.tone)}
        />
        <Caption>
          Gap list is from the same {AUDIT_DATE} snapshot. BPP does appear for
          Bonney Lake house (#3), Bonney Lake interior (#1), and Pierce HOA
          (#3).
        </Caption>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-ink">
          Indexable URLs lastmod’d over time (not organic traffic)
        </h2>
        <p className="text-sm leading-relaxed text-zinc-600">
          Without Semrush, Rank Math lastmod counts on blackpearlpainters.com
          ({CRAWL_STATS.sitemapUrls} unique sitemap URLs) show publishing velocity. The May 2026 spike
          (59 URLs) is the city-page template push — more URLs, not more unique
          demand.
        </p>
        <DualLine
          categories={LASTMOD_MONTHS}
          yMax={60}
          height={200}
          series={[
            {
              name: "Sitemap URLs lastmod’d (count)",
              data: LASTMOD_COUNTS,
              color: chartColors.MUTED,
            },
          ]}
        />
        <Caption>
          Source: Rank Math page + post sitemaps crawled {AUDIT_DATE}. Axis:
          month · URL lastmod count. This is not sessions and not ranking
          keywords.
        </Caption>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-ink">Main organic competitors</h2>
        <DataTable
          headers={[
            "Domain",
            "Role vs BPP",
            "Est. monthly visits (public)",
            "What they outrank you on",
          ]}
          rows={COMPETITOR_ROWS}
        />
        <Caption>
          Visit estimates: LinkedIn company “Web Presence / Monthly Visits”
          fields (Similarweb-derived, noisy on small sites). These are not
          Semrush organic traffic.
        </Caption>
      </section>
    </div>
  );
}

function SeoTab({ score }: { score: number }) {
  const [filter, setFilter] = useState<Filter>("All");
  const counts = findingCounts();
  const visible = FINDINGS.filter(
    (f) => filter === "All" || f.severity === filter,
  );
  const mix = PARITY_SCORES;

  return (
    <div className="flex flex-col gap-8">
      <p className="text-xs text-zinc-500">
        Scores above use the Trustworthy Roofing mix. Six-category heuristic
        still scores {score}/100 further down this tab.
      </p>

      <div>
        <div className="mb-1 flex justify-between text-xs text-zinc-500">
          <span>Score mix toward 100</span>
          <span>
            {mix.overall} / 100 overall
          </span>
        </div>
        <div className="flex h-2.5 overflow-hidden bg-zinc-100">
          <div className="bg-red-700" style={{ width: `${mix.technical * 0.3}%` }} />
          <div className="bg-amber-500" style={{ width: `${mix.onPage * 0.25}%` }} />
          <div className="bg-orange-500" style={{ width: `${mix.local * 0.25}%` }} />
          <div className="bg-sky-600" style={{ width: `${mix.content * 0.2}%` }} />
        </div>
      </div>

      <Callout tone="danger" title="Google is being told this business is “My Blog”">
        JSON-LD @graph names the Organization/Person “My Blog”, authors every
        key page as GreenHaven Interactive, and has no PaintingContractor,
        address, geo, or telephone. Combined with no street/ZIP/map on Contact
        and a leftover tel:+1234567890 on /thank-you/, local pack ranking is
        fighting the markup, not using it.
      </Callout>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-ink">What is working</h2>
        <p className="text-sm leading-relaxed text-zinc-600">
          HTTPS, www→apex, and HTTP→HTTPS resolve in one hop (Chrome). Viewport
          and lang=&quot;en-US&quot; are set. robots.txt is 200 (126 bytes) and
          points at sitemap_index.xml. Rank Math emits self-referencing
          canonicals on {CRAWL_STATS.canonicalsSampled} sampled HTML pages,
          index/follow, Open Graph, and Twitter summary_large_image. Core
          service pages have FAQPage JSON-LD. Reviews widget shows 4.9 from 108
          reviews. Named owners and click-to-call are conversion-ready.
          NitroPack is caching HTML (x-nitro-cache: HIT). HSTS preload is on.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-ink">
          Critical crawl and index issues
        </h2>
        <Caption>
          Source: live Chrome HTTP responses and HTML head on {AUDIT_DATE}.{" "}
          {CRAWL_STATS.htmlPagesSampled} HTML URLs sampled, plus robots.txt and{" "}
          {CRAWL_STATS.sitemapUrls} sitemap URLs ({CRAWL_STATS.pages} pages,{" "}
          {CRAWL_STATS.posts} posts, {CRAWL_STATS.categories} categories).
          Command-line curl from this IP received SiteGround 202 CAPTCHA.
        </Caption>
        <DataTable
          sticky
          headers={["Issue", "Evidence", "Impact"]}
          rows={CRAWL_ISSUES.map((r) => [r.issue, r.evidence, r.impact])}
          rowTone={CRAWL_ISSUES.map((r) => r.tone)}
        />
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-ink">
          On-page title and description failures
        </h2>
        <p className="text-sm leading-relaxed text-zinc-600">
          Titles and meta descriptions are Rank Math templates. Several
          templates never got unique values, so Google is shown merge tags, the
          same city snippet on a grid of 1-rated pages, and “No Results Found”
          as the heading on two condo URLs that are still in the sitemap.
        </p>
        <DataTable
          sticky
          headers={["Pattern", "Pages", "What Google sees"]}
          rows={TITLE_PATTERNS.map((r) => [r.pattern, r.pages, r.googleSees])}
          rowTone={TITLE_PATTERNS.map((r) => r.tone)}
        />
      </section>

      <div className="border border-zinc-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-ink">
          LocalBusiness schema
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">
          Markup exists, which is the right idea. The values inside it would
          hurt a Knowledge Panel more than they help. There is no
          PaintingContractor or LocalBusiness node.
        </p>
        <div className="mt-3">
          <DataTable
            headers={["Field", "Live value", "Should be"]}
            rows={SCHEMA_FIELDS}
          />
        </div>
      </div>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-ink">NAP and trust mismatches</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-zinc-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-ink">Phone</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Visible numbers are (253) 203-5335, (253) 921-2549, and Contact
              adds (253) 222-9937. Homepage tel: links match the first two.
              /thank-you/ still ships tel:+1234567890 — a leftover template
              number.
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Click-to-call and schema should use one number that matches
              Google Business Profile.
            </p>
          </div>
          <div className="border border-zinc-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-ink">Address and map</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Contact lists people, phones, and emails only. Homepage and
              contact innerText have no street, city/ZIP, or map embed — only a
              Google Maps preconnect. Word count on Contact is ~180.
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Local pack ranking needs a consistent NAP matching GBP, or an
              explicit service-area disclosure.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-ink">Content quality</h2>
        <p className="text-sm leading-relaxed text-zinc-600">
          Real painting copy exists on the main service pages. The rest of the
          site was scaled like a doorway network: city-name swaps, leftover
          merge tags, overlapping interior URLs, and a gallery that cannot pass
          Core Web Vitals.
        </p>
        <DataTable
          headers={["Surface", "Finding"]}
          rows={CONTENT_QUALITY.map((r) => [r.surface, r.finding])}
          rowTone={CONTENT_QUALITY.map((r) => r.tone)}
        />
      </section>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat
          value={`${score}/100`}
          label="Six-category heuristic"
          tone="warning"
        />
        <Stat
          value={String(counts.Critical)}
          label="Critical issues"
          tone="danger"
        />
        <Stat value="94%" label="City-page text overlap" tone="danger" />
        <Stat
          value="0"
          label="LocalBusiness schema nodes"
          tone="danger"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-ink">Category scores (0–100)</h2>
          <HorizontalBar
            categories={CATEGORY_SCORES.categories}
            values={CATEGORY_SCORES.scores}
            name="Score / 100"
            yMax={100}
            height={220}
          />
          <Caption>
            Source: live HTML/header/schema crawl of blackpearlpainters.com ·{" "}
            {AUDIT_DATE}. Weighted overall uses Crawl 15%, On-page 20%, Local
            20%, Content 15%, Performance 15%, Accessibility 15%.
          </Caption>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-ink">Findings by severity</h2>
          <Donut
            slices={[
              { label: "Critical", value: counts.Critical, color: chartColors.DANGER },
              { label: "High", value: counts.High, color: chartColors.WARN },
              { label: "Medium", value: counts.Medium, color: chartColors.INFO },
              { label: "Low", value: counts.Low, color: chartColors.MUTED },
            ]}
          />
          <Caption>
            {FINDINGS.length} issues from rendered DOM, Rank Math sitemaps, and
            HTTP headers · {AUDIT_DATE}.
          </Caption>
        </section>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-ink">Prioritized findings</h2>
        <div className="flex flex-wrap gap-2 border-b border-zinc-200 pb-2">
          {(["All", "Critical", "High", "Medium", "Low"] as Filter[]).map(
            (key) => (
              <TabPill
                key={key}
                active={filter === key}
                onClick={() => setFilter(key)}
              >
                {key}
                {key === "All"
                  ? ` (${FINDINGS.length})`
                  : ` (${counts[key]})`}
              </TabPill>
            ),
          )}
        </div>
        <DataTable
          sticky
          headers={["Sev", "Area", "Issue", "Evidence", "Fix"]}
          rows={visible.map((f) => [
            f.severity,
            f.area,
            f.issue,
            f.evidence,
            f.fix,
          ])}
          rowTone={visible.map((f) => TONE_FOR_SEV[f.severity])}
        />
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-ink">
          Information architecture
        </h2>
        <p className="text-sm leading-relaxed text-zinc-600">
          The site is a local-service site that was scaled like a doorway
          network. Nav money pages are fine. The sitemap then adds a grid of “#1
          exterior painters in {"{city}"}” URLs, overlapping blog hubs, and
          leftover templates. Crawl budget and ranking signals are split instead
          of concentrated.
        </p>
        <DataTable
          headers={["Intent", "Keep (canonical)", "Consolidate into it"]}
          rows={IA_ROWS}
        />
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="border border-zinc-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-ink">Stack and crawl surface</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            This report: {REPORT_STACK}. Live site still {LIVE_SITE_STACK}{" "}
            (cdn-ilefmfi.nitrocdn.com, sg-captcha on wp-login/xmlrpc). Homepage
            decoded HTML 747 KB. Gallery 756 KB. robots.txt is the default WP
            file (Disallow: /wp-admin/).
          </p>
          <p className="mt-2 text-xs text-zinc-500">
            Page sitemap lastmod 25 Aug 2026 · post sitemap lastmod 30 Jul 2026
            · ~80+ blog posts. GTM container GTM-K7KPWDBX.
          </p>
        </div>
        <div className="border border-zinc-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-ink">
            Local entity vs what Google sees
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            Visible brand: Black Pearl Painters, Bonney Lake / Pierce County,
            Sherwin-Williams, no-deposit offer, 4.9 stars.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            Machine-readable brand: Organization name “My Blog”, Article author
            GreenHaven Interactive, no geo, no GBP sameAs, no PaintingContractor
            type.
          </p>
        </div>
      </div>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-ink">
          Sampled page diagnostics
        </h2>
        <Caption>
          Title, H1, and notes from the 28 Aug 2026 HTML snapshot. Status 200
          unless noted.
        </Caption>
        <DataTable
          sticky
          headers={["Path", "Title", "H1", "Notes"]}
          rows={PAGE_ROWS.map((r) => [r.path, r.title, r.h1, r.note])}
          rowTone={PAGE_ROWS.map((r) => r.tone)}
        />
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-ink">
          Performance snapshot (homepage)
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat value="625 ms" label="TTFB (cached Nitro)" />
          <Stat value="747 KB" label="Decoded HTML" tone="warning" />
          <Stat value="47" label="Script elements" tone="warning" />
          <Stat value="256 px" label="Header height" tone="warning" />
        </div>
        <p className="text-sm leading-relaxed text-zinc-600">
          Nitro makes a repeat view look fast; the HTML payload and Divi/Nitro
          script volume will still hurt LCP on mobile, especially with a 1080p
          Vimeo progressive download and 28 lazy-loaded images that start as
          empty SVG placeholders. Gallery is the worst page in the crawl (198
          images).
        </p>
      </section>

      <Callout
        tone="danger"
        title="Organic visibility is stagnant: two Top 3 keywords, no traffic growth, and SERP extras at zero"
      >
        Semrush data for blackpearlpainters.com shows a ranking footprint that
        is not compounding. Keywords in positions 1–3 peaked at nine in June
        2025, fell to two by December 2025, and have remained at two through
        August 2026 — more than eight months with no additional page-one
        winners. Organic traffic spiked near 320 visits in March 2025, then
        trended down to about 95; branded traffic follows the same shape at a
        lower volume, including a mid-2025 dip toward zero. Paid search is
        unused. Other SERP features (sitelinks, reviews, FAQs, and similar)
        rose to the low thirties in April–May 2026 and collapsed to zero by
        July. That combination is a trust-and-concentration problem, not a
        seasonal drop in painter demand.
      </Callout>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-ink">
          Keywords in the Top 3
        </h2>
        <p className="text-sm leading-relaxed text-zinc-600">
          Count of ranking keywords in Google positions 1–3. The site reached
          nine in mid-2025, then lost those positions through the second half
          of the year. Since December 2025 the line is flat at two. Until that
          count moves, growth is limited to whatever those two queries already
          produce.
        </p>
        <AreaLine
          categories={SERP_FEATURE_MONTHS}
          values={TOP3_KEYWORD_COUNTS}
          name="Keywords in Top 3"
          yMax={12}
          color="#ea580c"
        />
        <Caption>
          Source: Semrush Keywords · Organic · Top 3 · digitized from the 28 Aug
          2026 screenshot. Dec 2024–Feb 2025 = 5; Jun 2025 peak = 9; Dec
          2025–Aug 2026 = 2 with no recovery.
        </Caption>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-ink">
          Traffic (organic, branded, paid)
        </h2>
        <p className="text-sm leading-relaxed text-zinc-600">
          Two-year Semrush traffic view. There is no sustained upward trend.
          Organic and branded volume ended the window below the late-2024
          starting range, after a one-month spike in March 2025 and a smaller
          May 2026 bounce that did not hold. Paid traffic is zero throughout.
        </p>
        <DualLine
          categories={SERP_FEATURE_MONTHS}
          yMax={322}
          height={280}
          interval={1}
          series={[
            {
              name: "Organic traffic",
              data: TRAFFIC_ORGANIC,
              color: "#1e3a5f",
            },
            {
              name: "Branded traffic",
              data: TRAFFIC_BRANDED,
              color: "#7c3aed",
            },
            {
              name: "Paid traffic",
              data: TRAFFIC_PAID,
              color: "#14b8a6",
            },
          ]}
        />
        <Caption>
          Source: Semrush Traffic · 2Y · digitized from the 28 Aug 2026
          screenshot. Axis is Semrush’s visit estimate (peak label 322), not
          Google Analytics sessions. Paid remains 0 for the full period.
        </Caption>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-ink">
          Other SERP features
        </h2>
        <p className="text-sm leading-relaxed text-zinc-600">
          Extra blocks Google attaches to a result besides the blue link.
          Features ran in a 5–10 band for more than a year, briefly reached
          about 38 in April 2026 (still about 31 in May), and fell to zero by
          July. The listing is competing without sitelinks, review stars, or
          FAQ enhancements it had only a few months ago.
        </p>
        <AreaLine
          categories={SERP_FEATURE_MONTHS}
          values={SERP_FEATURE_COUNTS}
          name="Other SERP features"
          yMax={40}
          color={chartColors.SUCCESS}
        />
        <Caption>
          Source: Semrush Keywords · Organic · Other SERP Features · digitized
          from the 28 Aug 2026 screenshot. Baseline ~5–10 through Feb 2026; Apr
          peak ~38; May ~31; Jul–Aug 2026 = 0.
        </Caption>
      </section>
    </div>
  );
}
