"use client";

import { useState } from "react";
import type { Chrome } from "@/lib/content";

export default function Header({ chrome }: { chrome: Chrome }) {
  const [open, setOpen] = useState(false);
  const primary = chrome.people[0];

  return (
    <header className="site-header">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="header-top">
        <a className="brand" href="/">
          <img src={chrome.favicon} alt="" width={36} height={36} />
          <span>
            <strong>{chrome.brand}</strong>
            <em>Bonney Lake · Pierce County</em>
          </span>
        </a>
        <div className="header-actions">
          <a className="phone" href={`tel:${primary.tel}`}>
            {primary.phone}
          </a>
          <a className="btn" href={chrome.quoteHref}>
            Request a quote
          </a>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
        </div>
      </div>
      <nav className={open ? "nav open" : "nav"} aria-label="Primary">
        {chrome.nav.map((item) =>
          item.children ? (
            <details key={item.label} className="nav-drop">
              <summary>{item.label}</summary>
              <div>
                {item.children.map((c) => (
                  <a key={c.href} href={c.href} onClick={() => setOpen(false)}>
                    {c.label}
                  </a>
                ))}
              </div>
            </details>
          ) : (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ),
        )}
        <a href="/seo-audit/" onClick={() => setOpen(false)}>
          SEO report
        </a>
      </nav>
    </header>
  );
}
