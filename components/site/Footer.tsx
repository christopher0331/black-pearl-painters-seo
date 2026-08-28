import type { Chrome } from "@/lib/content";

export default function Footer({ chrome }: { chrome: Chrome }) {
  const services =
    chrome.nav.find((n) => n.label === "Services")?.children ?? [];

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <strong>{chrome.brand}</strong>
          <p>{chrome.tagline}</p>
          <p className="muted">{chrome.areas}</p>
          <p>No deposit. Pay upon completion. Sherwin-Williams paints.</p>
        </div>
        <div>
          <h2>Services</h2>
          <ul>
            {services.map((s) => (
              <li key={s.href}>
                <a href={s.href}>{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Company</h2>
          <ul>
            <li>
              <a href="/about-black-pearl-painters/">About</a>
            </li>
            <li>
              <a href="/gallery/">Gallery</a>
            </li>
            <li>
              <a href="/reviews/">Reviews</a>
            </li>
            <li>
              <a href="/blog-painting-tips-black-pearl-painters/">
                Painting tips
              </a>
            </li>
            <li>
              <a href="/financing/">Financing</a>
            </li>
            <li>
              <a href="/privacy-policy/">Privacy</a>
            </li>
            <li>
              <a href="/contact/">Contact</a>
            </li>
            <li>
              <a href="/seo-audit/">SEO report</a>
            </li>
          </ul>
        </div>
        <div>
          <h2>Talk to the owners</h2>
          {chrome.people.map((p) => (
            <p key={p.tel} className="person">
              <strong>{p.name}</strong>
              <span className="muted">{p.role}</span>
              <a href={`tel:${p.tel}`}>{p.phone}</a>
              {p.email ? <a href={`mailto:${p.email}`}>{p.email}</a> : null}
            </p>
          ))}
        </div>
      </div>
      <p className="legal">
        © {new Date().getFullYear()} {chrome.brand}. Rebuilt in Next.js + React
        on Netlify from the live site content.
      </p>
    </footer>
  );
}
