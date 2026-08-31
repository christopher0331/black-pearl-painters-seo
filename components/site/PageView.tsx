import type { Chrome, PageRecord } from "@/lib/content";
import { cleanText, parseInner } from "@/lib/sections";
import QuoteForm from "./QuoteForm";
import Wave from "./Wave";

function splitContact(text: string) {
  return text.replace(
    /(\(\d{3}\)[.\s-]?\d{3}[.\s-]?\d{4})([A-Z])/g,
    "$1\n$2",
  );
}

export default function PageView({
  page,
  chrome,
}: {
  page: PageRecord;
  chrome: Chrome;
}) {
  const inner = parseInner(page.blocks);
  const isQuote = page.path === "/request-a-quote/";
  const isContact = page.path === "/contact/";
  const isGallery = page.path === "/gallery/";
  const isPost = page.kind === "post";
  const isCategory = page.kind === "category";
  const team = isContact
    ? inner.features.filter((f) => f.image && f.title)
    : [];
  const galleryImages = [
    ...inner.galleries.flat(),
    ...inner.features.filter((f) => f.image && !f.title).map((f) => f.image!),
  ];
  const storyFeatures = inner.features.filter((f) => f.title);

  return (
    <main id="main">
      <section
        className={inner.heroImage ? "page-hero" : "page-hero no-photo"}
        style={
          inner.heroImage
            ? { backgroundImage: `url(${inner.heroImage.src})` }
            : undefined
        }
      >
        <div className="hero-shade" />
        <div className="hero-copy">
          {inner.kicker && inner.kicker !== inner.title ? (
            <p className="eyebrow">{inner.kicker}</p>
          ) : null}
          <h1>{inner.title || page.h1[0] || page.title}</h1>
          <div className="hero-actions">
            <a className="btn btn-gold" href={chrome.quoteHref}>
              Request a quote
            </a>
            <a className="btn btn-ghost" href={`tel:${chrome.people[0].tel}`}>
              {chrome.people[0].phone}
            </a>
          </div>
        </div>
        <Wave fill="var(--paper)" overlay />
      </section>

      <section className="band-paper page-body">
      {inner.introItems.length ||
      inner.introParas.length ||
      inner.introHeadings.length ? (
        <section className="section narrow">
          {inner.introItems.length ? (
            <ul className="hero-points ink">
              {inner.introItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {inner.introParas.map((p) => (
            <p key={p.slice(0, 32)} className="prose">
              {splitContact(p)}
            </p>
          ))}
          {inner.introHeadings.map((h) => (
            <div key={h.title}>
              {h.title !== inner.title ? <h2>{h.title}</h2> : null}
              {h.body.map((p) => (
                <p key={p.slice(0, 24)} className="prose">
                  {splitContact(p)}
                </p>
              ))}
            </div>
          ))}
        </section>
      ) : null}

      {isContact && team.length ? (
        <section className="section">
          <div className="section-head">
            <p className="eyebrow">The crew</p>
            <h2>Talk to the owners</h2>
          </div>
          <div className="team-grid">
            {team.map((m) => (
              <article key={m.title} className="team-card">
                {m.image ? <img src={m.image.src} alt={m.title} /> : null}
                <h3>{m.title}</h3>
                <p className="prose">{splitContact(m.body.join("\n"))}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {!isContact && !isGallery && storyFeatures.length > 0 ? (
        <section className="section">
          <div
            className={
              isCategory || isPost ? "stack-features" : "feature-grid"
            }
          >
            {storyFeatures.map((f, i) => (
              <article
                key={`${f.title}-${i}`}
                className={
                  f.image && f.body.length ? "feature-row" : "feature-card"
                }
              >
                {f.image ? (
                  <img src={f.image.src} alt={f.image.alt || f.title} />
                ) : null}
                <div>
                  {f.title ? (
                    <h2>
                      {f.href ? <a href={f.href}>{f.title}</a> : f.title}
                    </h2>
                  ) : null}
                  {f.body.map((p) => (
                    <p key={p.slice(0, 24)} className="prose">
                      {splitContact(p)}
                    </p>
                  ))}
                  {f.items.length ? (
                    <ul className="prose-list">
                      {f.items.map((item) => (
                        <li key={item}>{cleanText(item)}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {(isGallery || galleryImages.length > 0) && (
        <section className="section">
          {isGallery ? (
            <div className="section-head">
              <p className="eyebrow">Portfolio</p>
              <h2>Gallery</h2>
            </div>
          ) : null}
          <div className={isGallery ? "work-grid dense" : "work-grid"}>
            {galleryImages.map((img, i) => (
              <figure key={`${img.src}-${i}`} className="work-tile">
                <img src={img.src} alt={img.alt} />
              </figure>
            ))}
          </div>
        </section>
      )}

      {inner.restHeadings.map((h) => (
        <section key={h.title} className="section narrow">
          <h2>{h.title}</h2>
          {h.body.map((p) =>
            cleanText(p) && p !== "Δ" ? (
              <p key={p.slice(0, 24)} className="prose">
                {splitContact(p)}
              </p>
            ) : null,
          )}
        </section>
      ))}

      {isQuote ? (
        <section className="section quote-wrap">
          <QuoteForm chrome={chrome} />
        </section>
      ) : null}
      <Wave fill="var(--navy)" />
      </section>

      <section className="finance-band compact">
        <div>
          <h2>Ready for a quote?</h2>
          <p>No deposit. Pay upon completion. We’ll get back to you quickly.</p>
        </div>
        <a className="btn btn-gold" href={chrome.quoteHref}>
          Request a quote
        </a>
        <Wave fill="var(--footer)" overlay />
      </section>
    </main>
  );
}
