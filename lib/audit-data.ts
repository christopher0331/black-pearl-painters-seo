export type Severity = "Critical" | "High" | "Medium" | "Low";
export type Filter = "All" | Severity;
export type ReportTab = "market" | "seo";
export type Tone = "danger" | "warning" | "info" | "neutral" | "success";

export type Finding = {
  id: string;
  severity: Severity;
  area: string;
  issue: string;
  evidence: string;
  fix: string;
};

export const AUDIT_DATE = "28 Aug 2026";
export const SITE = "https://blackpearlpainters.com/";
export const MARKET_AS_OF = "Aug 2026";
export const REPORT_STACK = "Next.js · React · Netlify";
export const LIVE_SITE_STACK =
  "WordPress · Divi · Rank Math · NitroPack · SiteGround";

export const TRENDS_MONTHS = [
  "Aug 25",
  "Sep 25",
  "Oct 25",
  "Nov 25",
  "Dec 25",
  "Jan 26",
  "Feb 26",
  "Mar 26",
  "Apr 26",
  "May 26",
  "Jun 26",
  "Jul 26",
  "Aug 26",
];
export const TRENDS_HOUSE_PAINTERS = [
  45, 11, 7, 6, 6, 13, 6, 19, 26, 38, 37, 32, 45,
];
export const TRENDS_PAINTERS_NEAR_ME = [
  32, 29, 7, 7, 17, 13, 24, 22, 39, 16, 48, 29, 12,
];

export const TRAFFIC_PEERS = [
  "Paint Pro's NW",
  "K&D Quality",
  "Runland Painting",
];
export const TRAFFIC_VISITS = [408, 498, 630];

export const CATEGORY_SCORES = {
  categories: [
    "Crawlability",
    "On-page",
    "Local / schema",
    "Content & IA",
    "Performance",
    "Accessibility",
  ],
  scores: [72, 44, 28, 36, 51, 34],
};

/** Same 4-bucket scoring as the Trustworthy Roofing live-site audit. */
export const PARITY_SCORES = {
  overall: 41,
  technical: 58,
  onPage: 44,
  local: 20,
  content: 36,
  weights: { technical: 0.3, onPage: 0.25, local: 0.25, content: 0.2 },
};

export const CRAWL_STATS = {
  htmlPagesSampled: 33,
  sitemapUrls: 232,
  pages: 44,
  posts: 109,
  categories: 79,
  homepageDecodedKb: 747,
  homepageRenderedKb: 1065,
  galleryDecodedKb: 756,
  galleryImgs: 198,
  homepageScripts: 47,
  canonicalsSampled: "33 of 33",
  robotsBytes: 126,
};

export const CRAWL_ISSUES: Array<{
  issue: string;
  evidence: string;
  impact: string;
  tone: Tone;
}> = [
  {
    tone: "danger",
    issue: "Junk URLs in the sitemap",
    evidence:
      "page-sitemap.xml lists /thank-you/, /1-rated-exterior-house-painters-in-city-state/, and both “No Results Found” condo URLs. 79 category archives are in category-sitemap.xml.",
    impact: "Google is handed 232 URLs; crawl budget is spent on pages that should not rank",
  },
  {
    tone: "warning",
    issue: "Homepage HTML weight",
    evidence:
      "Decoded HTML 746,673 bytes (Nitro HIT). Rendered DOM ~1.07 MB. 47 script elements. Gallery HTML 756 KB with 198 <img> tags.",
    impact: "Core Web Vitals and crawl budget both take a hit",
  },
  {
    tone: "warning",
    issue: "Incomplete security headers",
    evidence:
      "HSTS preload is set. No CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, or Permissions-Policy. cache-control is max-age=0, s-maxage=3600.",
    impact: "Not a ranking factor, but HTTPS trust signals are incomplete",
  },
  {
    tone: "warning",
    issue: "Viewport disables pinch-zoom",
    evidence:
      "meta viewport includes maximum-scale=1.0, user-scalable=0 on every sampled page",
    impact: "Fails WCAG 1.4.4; mobile UX and ranking liability",
  },
  {
    tone: "info",
    issue: "xmlrpc still advertised",
    evidence:
      "link rel=pingback and EditURI to xmlrpc.php. SiteGround WAF returns 202 + captcha on xmlrpc/wp-login.",
    impact: "Tags still leak the WordPress surface",
  },
  {
    tone: "info",
    issue: "Index footprint vs sitemap size",
    evidence:
      "site:blackpearlpainters.com surfaces money pages, blog, and about. The leftover {City} template and “No Results Found” URLs are not visibly competing.",
    impact: "Most of the 15+ 1-rated city URLs are not earning rankings",
  },
];

export const TITLE_PATTERNS: Array<{
  pattern: string;
  pages: string;
  googleSees: string;
  tone: Tone;
}> = [
  {
    tone: "danger",
    pattern: "Unreplaced merge tags",
    pages: "/1-rated-exterior-house-painters-in-city-state/",
    googleSees:
      "Title “#1 Exterior House Painters in {City}, {State}”; H1 “{Title Text}”; description still has {City}, {State}",
  },
  {
    tone: "danger",
    pattern: "Broken condo H1s",
    pages: "2 URLs",
    googleSees:
      "/best-puget-sound-condo-townhome-painting-service/ and /best-university-place-condo-townhome-painting-service/ both 200 with H1 “No Results Found”",
  },
  {
    tone: "warning",
    pattern: "“#1” titles",
    pages: "15+ service and city pages",
    googleSees:
      "Black Pearl Painters: #1 Bonney Lake Painters — and the same superlative on interior, HOA, condo, carpentry, and 1-rated city URLs",
  },
  {
    tone: "warning",
    pattern: "Multiple H1s",
    pages: "home, thank-you, Buckley, Sumner, Gig Harbor",
    googleSees:
      "Homepage 3 H1s (including “Financing is Available”). Thank-you 2. Three city hubs have 3 H1s each.",
  },
  {
    tone: "warning",
    pattern: "Too-long / templated descriptions",
    pages: "HOA, interior, commercial, city clones",
    googleSees:
      "HOA 188 chars, interior 175, commercial 186. City pages reuse one sentence with the city swapped.",
  },
  {
    tone: "info",
    pattern: "Short or broken snippets",
    pages: "about, reviews, Gig Harbor",
    googleSees:
      "About title 26 chars. Reviews: “Check out what our reviews!”. Gig Harbor title still contains raw &amp;.",
  },
];

export const SCHEMA_FIELDS: Array<[string, string, string]> = [
  ["@type", "Organization + Person, Article, WebSite, SearchAction", "PaintingContractor (keep WebSite)"],
  ["name", "My Blog", "Black Pearl Painters"],
  ["url", "https://blackpearlpainters.com (no trailing slash)", "https://blackpearlpainters.com/"],
  ["image", "1200×1600 portrait project JPG", "Absolute logo or 1200×630 job-site photo"],
  ["@id", "#person pointing at “My Blog”", "Canonical business entity URL"],
  ["streetAddress", "(missing)", "Match GBP; or service-area disclosure"],
  ["addressLocality", "(missing)", "Bonney Lake"],
  ["addressRegion", "(missing)", "WA"],
  ["postalCode", "(missing)", "GBP ZIP (98391 area)"],
  ["telephone", "Not in JSON-LD; body has three numbers", "One primary NAP number"],
  ["author", "GreenHaven Interactive", "Justin Schulke / Black Pearl Painters"],
];

export const CONTENT_QUALITY: Array<{ surface: string; finding: string; tone: Tone }> = [
  {
    tone: "danger",
    surface: "City pages",
    finding:
      "15 /1-rated-exterior-house-painters-in-*/ URLs plus leftover {City}/{State} template. Same FAQ and stock sections; city name swapped. ~94% text overlap.",
  },
  {
    tone: "danger",
    surface: "Condo leftovers",
    finding:
      "Two indexed URLs render H1 “No Results Found” (broken Divi dynamic content) while /condo-and-townhome-painters/ is the real money page.",
  },
  {
    tone: "warning",
    surface: "Service cannibalization",
    finding:
      "Interior intent splits across /interior-house-painters/, /interior-painting/, /interior-painting-services/, /professional-interior-painting/, /residential-interior-painting/. Commercial has a second blog-listing URL.",
  },
  {
    tone: "warning",
    surface: "Gallery",
    finding:
      "198 <img> tags, ~207 words of copy, 756 KB HTML. Alts include “iStock 1384317531”, “Issaquah Homes 14”, “cropped favicon”.",
  },
  {
    tone: "info",
    surface: "Blog",
    finding:
      "109 posts in post-sitemap.xml (lastmod through 30 Jul 2026). Real topical coverage; category archives should not also be indexed.",
  },
];

export const FINDINGS: Finding[] = [
  {
    id: "c1",
    severity: "Critical",
    area: "Indexation",
    issue: "Unreplaced location template is live and indexed",
    evidence:
      "/1-rated-exterior-house-painters-in-city-state/ title is “#1 Exterior House Painters in {City}, {State}”; H1 is “{Title Text}”; copy still has {Unique Description} and {city}. It is in the Rank Math page sitemap.",
    fix: "301 to the exterior service page or 410 it. Remove from the sitemap. Audit Rank Math / Divi for other leftover merge tags.",
  },
  {
    id: "c2",
    severity: "Critical",
    area: "Content & IA",
    issue: "Doorway-style city pages are ~94% duplicate",
    evidence:
      "16+ URLs such as /1-rated-exterior-house-painters-in-tacoma/ vs Puyallup vs Auburn share 0.92–0.95 Jaccard overlap. Same FAQ, same stock sections, city name swapped. Google treats this as scaled doorway content.",
    fix: "Keep 4–6 real city pages with unique jobs, photos, reviews, and local copy. 301 the rest to the parent exterior page or a genuine city hub.",
  },
  {
    id: "c3",
    severity: "Critical",
    area: "Local / schema",
    issue: "No LocalBusiness schema; publisher is named “My Blog”",
    evidence:
      "JSON-LD @graph uses Organization/Person name “My Blog”, Article markup on service pages, SearchAction, and author GreenHaven Interactive. No PaintingContractor, address, geo, openingHours, or AggregateRating.",
    fix: "In Rank Math, set the knowledge graph to Organization “Black Pearl Painters” with PaintingContractor JSON-LD, NAP, geo, sameAs (GBP, Facebook, Instagram), and real review markup.",
  },
  {
    id: "c4",
    severity: "Critical",
    area: "On-page",
    issue: "Indexed condo pages render H1 “No Results Found”",
    evidence:
      "/best-puget-sound-condo-townhome-painting-service/ and /best-university-place-condo-townhome-painting-service/ return 200, are in the sitemap, and expose H1 “No Results Found” (broken Divi/Dynamic content).",
    fix: "Restore the intended H1 or 301 both URLs to /condo-and-townhome-painters/. Confirm in Search Console.",
  },
  {
    id: "c5",
    severity: "Critical",
    area: "Local / schema",
    issue: "No street address or complete NAP on the site",
    evidence:
      "Contact page lists people, phones, and emails only. Homepage innerText has no street, city/ZIP, or map embed beyond a Google Maps preconnect. Local pack ranking needs a consistent NAP matching Google Business Profile.",
    fix: "Publish the GBP address (or service-area disclosure if you hide the address) in the footer, contact page, and LocalBusiness schema. One format, every page.",
  },
  {
    id: "h1",
    severity: "High",
    area: "On-page",
    issue: "Homepage has three H1s, two of them near-duplicates",
    evidence:
      "H1s: “Expert Residential & Commercial Painters”, “Your Expert Residential & Commercial Painters” (second slider slide), and “Financing is Available”. Title targets Bonney Lake; H1s do not.",
    fix: "One H1, e.g. “Residential & Commercial Painters in Bonney Lake, WA”. Demote the duplicate slide and financing block to H2.",
  },
  {
    id: "h2",
    severity: "High",
    area: "Content & IA",
    issue: "Service keyword cannibalization across multiple live URLs",
    evidence:
      "Interior intent splits across /interior-house-painters/, /interior-painting/, /interior-painting-services/, /professional-interior-painting/, /residential-interior-painting/. Commercial splits across /commercial-and-industrial-painters/ and /commercial-industrial-painters/ (the latter is a blog-style archive).",
    fix: "Pick one money page per service. 301 or noindex the rest. Point nav, internal links, and canonicals at the winner.",
  },
  {
    id: "h3",
    severity: "High",
    area: "Accessibility",
    issue: "Viewport disables pinch-zoom",
    evidence:
      "meta viewport includes maximum-scale=1.0, user-scalable=0. That fails WCAG 1.4.4 and is a ranking/UX liability on mobile.",
    fix: "Use width=device-width, initial-scale=1 only. Remove maximum-scale and user-scalable.",
  },
  {
    id: "h4",
    severity: "High",
    area: "Indexation",
    issue: "Thank-you page is indexable and in the sitemap",
    evidence:
      "/thank-you/ robots is follow, index; lastmod in page-sitemap.xml. Two H1s. A leftover tel:+1234567890 placeholder sits next to the real numbers.",
    fix: "noindex, follow. Remove from the sitemap. Keep it as a post-submit destination only.",
  },
  {
    id: "h5",
    severity: "High",
    area: "Local / schema",
    issue: "Every key page is typed as an Article written by the agency",
    evidence:
      "Twitter cards say “Written by GreenHaven Interactive” and “26 minutes” on the homepage. Article.author is the web vendor, not the painters. That undercuts E-E-A-T for a local contractor.",
    fix: "Turn off Article schema on static pages. Set authors to Justin Schulke / Black Pearl Painters. Add Person schema for the owners on About/Contact.",
  },
  {
    id: "h6",
    severity: "High",
    area: "Performance",
    issue: "Homepage HTML is ~747 KB with 47 scripts and a 1080p Vimeo file",
    evidence:
      "Document transfer ~75 KB gzip but decoded HTML 746,738 bytes. Navigation TTFB 625 ms, DCL 794 ms, load 1.35 s on a warm Nitro cache. 28 images still SVG placeholders (Nitro lazy). Vimeo 1080p progressive MP4 is requested from the homepage.",
    fix: "Stop loading the hero video until click/poster. Reduce Divi modules. Don’t lazy-load the LCP image. Re-test LCP/INP in CrUX / PSI after Nitro cache is warm and cold.",
  },
  {
    id: "h7",
    severity: "High",
    area: "UX / branding",
    issue: "Header is ~256 px tall with no logo in the nav",
    evidence:
      "First viewport is a large empty blue band, then the menu, then the hero. querySelector on header/logo returned null. Brand only appears later in the footer SVG.",
    fix: "Put the logo in a compact sticky header (~80–96 px). That is a trust and CTR issue, not just aesthetics.",
  },
  {
    id: "h8",
    severity: "High",
    area: "Accessibility",
    issue: "No skip link; HomeAdvisor badges are empty links",
    evidence:
      "Five <a> elements to HomeAdvisor have no text and no aria-label. No skip-to-content link. Footer social labels are the generic word “Follow”.",
    fix: "Add a skip link, name every icon link (platform + destination), and give badge images a text alternative that includes the destination.",
  },
  {
    id: "m1",
    severity: "Medium",
    area: "On-page",
    issue: "Titles lean on unprovable “#1” claims",
    evidence:
      "Homepage: “Black Pearl Painters: #1 Bonney Lake Painters”. Service and city titles repeat “#1 … Painters”. Google often rewrites superlative titles, and they look spammy next to real 4.9/108 reviews.",
    fix: "Lead with service + city + brand. Keep social proof in the body and review schema, not the title.",
  },
  {
    id: "m2",
    severity: "Medium",
    area: "On-page",
    issue: "Meta descriptions are templated, truncated, or ungrammatical",
    evidence:
      "Reviews: “Check out what our reviews!”. Interior/exterior/HOA descriptions are the same sentence with the service swapped and run past 160–188 characters. Several titles still contain raw &amp;.",
    fix: "Write unique 140–155 character descriptions with a benefit + city + CTA. Decode HTML entities in Rank Math titles.",
  },
  {
    id: "m3",
    severity: "Medium",
    area: "Social",
    issue: "Open Graph image is portrait 1200×1600",
    evidence:
      "og:image is Painters-Residential-Project-3-4.jpg at 1200×1600. Facebook/LinkedIn crop this poorly. Twitter uses the same asset.",
    fix: "Export a 1200×630 JPG of a real project, with the logo and a short headline in the safe center.",
  },
  {
    id: "m4",
    severity: "Medium",
    area: "On-page",
    issue: "Image alt text is filenames and stock IDs",
    evidence:
      "Homepage alts include “iStock 1384317531”, “iStock 2197669282”, “Issaquah Homes 14”, “cropped favicon”. One image has alt=\"\". Gallery HTML has 198 <img> tags.",
    fix: "Describe the painted surface and location. Compress the gallery into paginated albums or a JS-light lightbox with fewer DOM nodes.",
  },
  {
    id: "m5",
    severity: "Medium",
    area: "Indexation",
    issue: "Thin category archives are in the sitemap",
    evidence:
      "category-sitemap.xml includes /uncategorized-blogs/, overlapping tags like /condos-townhomes/ and /condo-townhome-painting/, plus many near-duplicate topic archives.",
    fix: "noindex thin categories. Keep /blog-painting-tips-black-pearl-painters/ as the hub (and consider shortening that slug with a 301).",
  },
  {
    id: "m6",
    severity: "Medium",
    area: "Technical",
    issue: "Security and cache headers are incomplete",
    evidence:
      "HSTS preload is present (good). Missing Content-Security-Policy, X-Frame-Options / frame-ancestors, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy. cache-control is max-age=0, s-maxage=3600 (Nitro CDN only).",
    fix: "Add the standard header set at nginx/SiteGround. Browser cache hashed Nitro assets longer than HTML.",
  },
  {
    id: "m7",
    severity: "Medium",
    area: "On-page",
    issue: "Repeated “Serving Tacoma…” H3s and inconsistent phones",
    evidence:
      "The same H3 appears three times on the homepage. Contact adds (253) 222-9937 alongside (253) 203-5335 and (253) 921-2549. /thank-you/ still has tel:+1234567890. Schema SearchAction points at /?s={search_term_string}.",
    fix: "One service-area heading. Primary click-to-call number in header + schema. Disable sitelinks search box schema if site search is not a product.",
  },
  {
    id: "m8",
    severity: "Medium",
    area: "Performance",
    issue: "Gallery page ships 198 images in one HTML document",
    evidence:
      "/gallery/ is 756 KB HTML, ~207 words of copy, 198 img tags. That page cannot win Core Web Vitals and dilutes crawl budget.",
    fix: "Split into Exterior / Interior / Commercial albums with lazy-loaded pages of 12–24 images.",
  },
  {
    id: "l1",
    severity: "Low",
    area: "Technical",
    issue: "xmlrpc pingback still advertised in <head>",
    evidence:
      "link rel=pingback and EditURI to xmlrpc.php. SiteGround returns 202 + captcha on xmlrpc/wp-login/wp-json (WAF is working), but the tags still leak the WP surface.",
    fix: "Remove pingback tags. Keep the WAF. Disable XML-RPC if pingbacks are unused.",
  },
  {
    id: "l2",
    severity: "Low",
    area: "On-page",
    issue: "About and 404 pages are under-optimized",
    evidence:
      "About title is 26 characters (“About Black Pearl Painters”), H1 is “About Us”. 404 is noindex (good) but has no H1 and ~32 words — no search box or popular links.",
    fix: "About H1 should name the company and market. 404 should recover with services, quote CTA, and phone.",
  },
  {
    id: "l3",
    severity: "Low",
    area: "Content & IA",
    issue: "Inconsistent city URL patterns and awkward blog slug",
    evidence:
      "Mix of /1-rated-exterior-house-painters-in-tacoma/, /exterior-house-painters-in-bonney-lake/, /painting-in-bonney-lake-wa/, /painters-in-gig-harbor-wa/. Blog hub is /blog-painting-tips-black-pearl-painters/.",
    fix: "Standardize remaining city URLs to /painters/{city}/ and 301. Shorten the blog hub to /painting-tips/.",
  },
  {
    id: "l4",
    severity: "Low",
    area: "On-page",
    issue: "Copy and capitalization nits that look unedited",
    evidence:
      "“Gig harbor” lowercase in homepage H3s. Title punctuation missing a space on Puyallup (“Puyallup| Black Pearl”). Footer emails and phones are good conversion assets once NAP is complete.",
    fix: "Editorial pass on templates. Keep the two named owners prominent — that is a real E-E-A-T strength.",
  },
];

export const PAGE_ROWS: Array<{
  path: string;
  title: string;
  h1: string;
  note: string;
  tone: Tone;
}> = [
  {
    path: "/",
    title: "Black Pearl Painters: #1 Bonney Lake Painters",
    h1: "3 H1s, including Financing",
    note: "Canonical OK · 159-char desc · no LocalBusiness",
    tone: "warning",
  },
  {
    path: "/1-rated-exterior-house-painters-in-city-state/",
    title: "#1 Exterior House Painters in {City}, {State}",
    h1: "{Title Text}",
    note: "Template leftovers · in sitemap",
    tone: "danger",
  },
  {
    path: "/best-puget-sound-condo-townhome-painting-service/",
    title: "Best Puget Sound Condo & Townhome Painting Service",
    h1: "No Results Found",
    note: "200 OK · indexed",
    tone: "danger",
  },
  {
    path: "/interior-house-painters/",
    title: "#1 Interior House Painters | Black Pearl Painters",
    h1: "Your Expert Interior House Painters",
    note: "Best interior candidate · FAQ schema · desc 175 chars",
    tone: "info",
  },
  {
    path: "/interior-painting/",
    title: "Interior Painting - Black Pearl Painters",
    h1: "Interior Painting",
    note: "Competing money page · looks like a category/blog hybrid",
    tone: "warning",
  },
  {
    path: "/commercial-and-industrial-painters/",
    title: "Commercial and Industrial Painters | Black Pearl Painters",
    h1: "Your Expert Commercial and Industrial Painters",
    note: "Service page · FAQ schema",
    tone: "info",
  },
  {
    path: "/commercial-industrial-painters/",
    title: "Commercial & Industrial Painters - Black Pearl Painters",
    h1: "Commercial & Industrial Painters",
    note: "Separate indexed URL · blog listing",
    tone: "warning",
  },
  {
    path: "/thank-you/",
    title: "Thank You - Black Pearl Painters",
    h1: "Thank You + Thank You for Reaching Out!",
    note: "index, follow · in sitemap",
    tone: "warning",
  },
  {
    path: "/gallery/",
    title: "Gallery - Black Pearl Painters",
    h1: "Gallery",
    note: "198 images · ~207 words",
    tone: "warning",
  },
  {
    path: "/contact/",
    title: "Contact - Black Pearl Painters",
    h1: "Contact",
    note: "People + phones, no street address",
    tone: "warning",
  },
];

export const LASTMOD_MONTHS = [
  "Jan 25",
  "Feb 25",
  "Mar 25",
  "Apr 25",
  "May 25",
  "Jun 25",
  "Jul 25",
  "Aug 25",
  "Sep 25",
  "Oct 25",
  "Nov 25",
  "Dec 25",
  "Jan 26",
  "Feb 26",
  "Mar 26",
  "Apr 26",
  "May 26",
  "Jun 26",
  "Jul 26",
  "Aug 26",
];

export const LASTMOD_COUNTS = [
  2, 0, 2, 17, 7, 7, 17, 6, 38, 6, 8, 20, 0, 1, 4, 9, 59, 12, 8, 9,
];

export const VISIBILITY_COMPETITORS = [
  "Paint Pro's NW",
  "Black Pearl",
  "Stanton",
  "CertaPro",
  "Fresh Coat",
  "PacificPro",
  "K&D",
  "Impact",
];

export const TOP5_APPEARANCES = [4, 3, 3, 3, 1, 1, 1, 1];

export const TONE_FOR_SEV: Record<Severity, Tone> = {
  Critical: "danger",
  High: "warning",
  Medium: "info",
  Low: "neutral",
};

export const SERP_HEADERS = [
  "Query",
  "Black Pearl",
  "Paint Pro's NW",
  "PacificPro",
  "Fresh Coat",
  "K&D",
  "Stanton",
  "Who is #1",
];

export const SERP_TONES: Tone[] = [
  "warning",
  "success",
  "danger",
  "danger",
  "danger",
  "info",
  "danger",
  "danger",
  "success",
];

export const SERP_ROWS = [
  [
    "house painters Bonney Lake WA",
    "#3",
    "#4",
    "#2",
    "#1",
    "—",
    "#5",
    "Fresh Coat location page",
  ],
  [
    "interior painters Bonney Lake WA",
    "#1 + #2",
    "#5",
    "—",
    "#4",
    "—",
    "#3",
    "BPP interior money page",
  ],
  [
    "exterior house painters Tacoma WA",
    "—",
    "—",
    "—",
    "—",
    "—",
    "—",
    "Freeland Painting / CertaPro (directories above)",
  ],
  [
    "house painters Puyallup WA",
    "—",
    "—",
    "—",
    "—",
    "#1",
    "—",
    "K&D /puyallup/",
  ],
  [
    "painters Gig Harbor WA",
    "—",
    "—",
    "—",
    "—",
    "—",
    "—",
    "Harbor Quality Painting",
  ],
  [
    "HOA painters Pierce County WA",
    "#3",
    "#1 + #2",
    "—",
    "—",
    "—",
    "—",
    "Paint Pro's NW homepage + commercial",
  ],
  [
    "Tehaleh painters",
    "—",
    "#4",
    "—",
    "—",
    "—",
    "#5",
    "National/template Tehaleh landers, then Paint Pro's",
  ],
  [
    "commercial painters Tacoma WA",
    "—",
    "—",
    "—",
    "—",
    "—",
    "—",
    "Impact Painting / CertaPro Tacoma",
  ],
  [
    '"Black Pearl Painters" Bonney Lake',
    "#1–#4",
    "—",
    "—",
    "—",
    "—",
    "—",
    "BPP owns the brand SERP",
  ],
];

export const GAP_ROWS: Array<{ cells: string[]; tone: Tone }> = [
  {
    tone: "danger",
    cells: [
      "Puyallup house painters",
      "No",
      "K&D /puyallup/, DK Professional Painting, PSQP",
      "One unique Puyallup page — not another 1-rated clone",
    ],
  },
  {
    tone: "danger",
    cells: [
      "Gig Harbor painters",
      "No",
      "Harbor Quality Painting, Tracy’s Quality Painting",
      "Keep /painters-in-gig-harbor-wa/ and make it locally specific",
    ],
  },
  {
    tone: "danger",
    cells: [
      "Tacoma exterior",
      "No",
      "Freeland Painting, CertaPro Tacoma, O’Shea’s (Angi)",
      "Historic-home / moisture-prep Tacoma hub",
    ],
  },
  {
    tone: "warning",
    cells: [
      "Tacoma commercial",
      "No",
      "Impact Painting, CertaPro, Destiny Painting",
      "Canonical commercial URL; 301 the blog listing duplicate",
    ],
  },
  {
    tone: "info",
    cells: [
      "Tehaleh painters",
      "No",
      "National template landers + Paint Pro's Bonney Lake page",
      "Dedicated Tehaleh hub (you already have a blog post)",
    ],
  },
];

export const COMPETITOR_ROWS = [
  [
    "painternw.com",
    "Closest SEO peer (King + Pierce)",
    "~408 (LinkedIn web presence)",
    "HOA/commercial queries; Tehaleh named on the Bonney Lake URL",
  ],
  [
    "pacificpropaints.com",
    "Bonney Lake homepage competitor",
    "Not published",
    "“Local painter in Bonney Lake” title; #2 on the head term",
  ],
  [
    "freshcoatpainters.com/locations/bonney-lake/",
    "Franchise geo page",
    "National domain (not comparable)",
    "#1 on house painters Bonney Lake WA in this snapshot",
  ],
  [
    "kdqualitypainting.com",
    "Puyallup specialist",
    "~498 (LinkedIn web presence)",
    "Owns Puyallup house-painter results",
  ],
  [
    "runlandpainting.com",
    "Puyallup NAP + city pages",
    "~630 (LinkedIn web presence)",
    "Address-complete city landers",
  ],
  [
    "stantonpaintingremodeling.com",
    "Bonney Lake neighbor",
    "Not published",
    "Interior Bonney Lake URL in top 5; Tehaleh adjacency",
  ],
  [
    "certapro.com/tacoma/",
    "Franchise + commercial",
    "National domain",
    "Tacoma exterior and commercial SERPs",
  ],
  [
    "impactpaint.com",
    "Tacoma commercial",
    "Not published",
    "commercial painters Tacoma WA",
  ],
  [
    "harborqualitypainting.com",
    "Gig Harbor specialist",
    "Not published",
    "#1 on painters Gig Harbor WA in this snapshot",
  ],
];

export const IA_ROWS = [
  [
    "Interior painting",
    "/interior-house-painters/",
    "/interior-painting/, /interior-painting-services/, /professional-interior-painting/, /residential-interior-painting/",
  ],
  [
    "Exterior painting",
    "/exterior-house-painters/",
    "Most /1-rated-exterior-house-painters-in-*/ URLs after 4–6 unique city pages are chosen",
  ],
  [
    "Commercial",
    "/commercial-and-industrial-painters/",
    "/commercial-industrial-painters/ (blog listing) via 301 or noindex",
  ],
  [
    "Condo / townhome",
    "/condo-and-townhome-painters/",
    "Both “best-…-condo-townhome-painting-service” URLs (currently H1 “No Results Found”)",
  ],
  [
    "Bonney Lake hub",
    "/painting-in-bonney-lake-wa/ or homepage, not both",
    "/exterior-house-painters-in-bonney-lake/ if the hub page is the winner",
  ],
];

export const PLAN = [
  {
    week: "Week 1",
    content:
      "Delete or 301 the {City}/{State} template and both “No Results Found” condo URLs. noindex /thank-you/. Set Rank Math knowledge graph to Black Pearl Painters (not My Blog). Add PaintingContractor JSON-LD with NAP + geo + sameAs.",
  },
  {
    week: "Week 1–2",
    content:
      "One H1 on the homepage that names Bonney Lake. Logo in a compact header; allow pinch-zoom. Publish the GBP address in the footer and contact page so the local pack can match.",
  },
  {
    week: "Week 2",
    content:
      "Keep at most five deep place pages: Bonney Lake, Tehaleh, Gig Harbor, Tacoma, Puyallup/Sumner. 301 the duplicate 1-rated set. One winner URL each for interior, exterior, commercial, condo.",
  },
  {
    week: "Week 3",
    content:
      "Rewrite titles around no-deposit, HOA/commercial, and Sherwin-Williams instead of #1. Ship a Tehaleh hub (palette/HOA process + jobs). Turn HOA reviews into a case study. Cost-range page for Pierce County exteriors.",
  },
  {
    week: "Week 4",
    content:
      "Hero poster instead of auto 1080p video. Paginate the gallery. Add security headers. Request indexing for the cleaned money pages. Align GBP categories, photos, and services with the site offer stack.",
  },
];

export function overallScore(): number {
  const s = CATEGORY_SCORES.scores;
  const weights = [0.15, 0.2, 0.2, 0.15, 0.15, 0.15];
  return Math.round(s.reduce((acc, n, i) => acc + n * weights[i], 0));
}

export function findingCounts() {
  return {
    Critical: FINDINGS.filter((f) => f.severity === "Critical").length,
    High: FINDINGS.filter((f) => f.severity === "High").length,
    Medium: FINDINGS.filter((f) => f.severity === "Medium").length,
    Low: FINDINGS.filter((f) => f.severity === "Low").length,
  };
}
