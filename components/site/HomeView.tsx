import type { Chrome, PageRecord } from "@/lib/content";
import { HOME_REVIEWS } from "@/lib/reviews";
import { parseHome } from "@/lib/sections";

export default function HomeView({
  page,
  chrome,
}: {
  page: PageRecord;
  chrome: Chrome;
}) {
  const home = parseHome(page.blocks);
  const primary = chrome.people[0];
  const areas = home.areasLine
    .split("-")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <main id="main">
      <section
        className="hero"
        style={{ backgroundImage: `url(${home.heroImage.src})` }}
      >
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">{home.kicker}</p>
          <h1>{home.title}</h1>
          <p className="lead">{home.lead}</p>
          <p className="hero-area">{home.area}</p>
          <div className="hero-actions">
            <a className="btn btn-gold" href={chrome.quoteHref}>
              Request a quote
            </a>
            <a className="btn btn-ghost" href={`tel:${primary.tel}`}>
              Call {primary.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="trust">
        <div className="trust-inner">
          <div>
            <strong>No deposit</strong>
            <span>Pay upon completion</span>
          </div>
          <div>
            <strong>Sherwin-Williams</strong>
            <span>Premium coatings only</span>
          </div>
          <div>
            <strong>Family owned</strong>
            <span>Pierce County since 2016</span>
          </div>
          <div>
            <strong>4.9 stars</strong>
            <span>108 reviews from local homes</span>
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="section-head">
          <p className="eyebrow">What we paint</p>
          <h2>Our complete services</h2>
        </div>
        <div className="service-grid">
          {home.services.map((card) => (
            <a key={card.title} className="service-card" href={card.href}>
              <div
                className="service-photo"
                style={{ backgroundImage: `url(${card.image.src})` }}
                role="img"
                aria-label={card.image.alt}
              />
              <div className="service-body">
                <h3>{card.title}</h3>
                <ul>
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <span className="more">View service</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="split-band">
        <div
          className="split-photo"
          style={{
            backgroundImage: `url(${home.services[0]?.image.src || home.heroImage.src})`,
          }}
        />
        <div className="split-copy">
          <p className="eyebrow">South Puget Sound</p>
          <h2>Your local expert painters</h2>
          {home.localParas.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
          <a className="btn btn-navy" href="/about-black-pearl-painters/">
            Meet the owners
          </a>
        </div>
      </section>

      {areas.length ? (
        <section className="section areas-band">
          <div className="section-head">
            <p className="eyebrow">Coverage</p>
            <h2>Areas we serve</h2>
          </div>
          <ul className="area-chips">
            {areas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
          {home.areasBody ? <p className="prose center">{home.areasBody}</p> : null}
        </section>
      ) : null}

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Recent work</p>
          <h2>Explore our work</h2>
        </div>
        <div className="work-grid">
          {home.work.map((img, i) => (
            <a key={img.src} href="/gallery/" className={`work-tile ${i === 0 ? "featured" : ""}`}>
              <img src={img.src} alt={img.alt} />
            </a>
          ))}
        </div>
        <div className="center-cta">
          <a className="btn btn-navy" href="/gallery/">
            Full gallery
          </a>
        </div>
      </section>

      <section className="section reviews-band">
        <div className="section-head">
          <p className="eyebrow">Social proof</p>
          <h2>See why homeowners trust us for residential and commercial painting</h2>
          <p className="lead-sm">
            Black Pearl Painters is a 4.9-star local shop based on 108 reviews.
            No deposit, named owners on every job, and Sherwin-Williams on the wall.
          </p>
        </div>
        <div className="review-grid">
          {HOME_REVIEWS.map((r) => (
            <blockquote key={r.name} className="review-card">
              <p className="stars" aria-label="5 stars">
                ★★★★★
              </p>
              <p>“{r.quote}”</p>
              <footer>{r.name}</footer>
            </blockquote>
          ))}
        </div>
        <div className="center-cta">
          <a className="btn btn-gold" href="/reviews/">
            Read reviews
          </a>
        </div>
      </section>

      <section className="finance-band">
        <div>
          <p className="eyebrow light">Apply today</p>
          <h2>Financing is available</h2>
          <p>Ask about Enhancify options when you request your quote.</p>
          <a className="btn btn-gold" href="/financing/">
            Financing details
          </a>
        </div>
        {home.financeImg ? (
          <img src={home.financeImg.src} alt={home.financeImg.alt} />
        ) : null}
      </section>
    </main>
  );
}
