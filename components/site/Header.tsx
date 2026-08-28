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
      <div className="topbar">
        No deposit · Pay upon completion · Sherwin-Williams
      </div>
      <div className="header-bar">
        <a className="brand" href="/">
          <img src={chrome.favicon} alt="" width={44} height={44} />
          <span>
            <strong>{chrome.brand}</strong>
            <em>Bonney Lake · Pierce County</em>
          </span>
        </a>
        <nav className={open ? "nav open" : "nav"} aria-label="Primary">
          {chrome.nav.map((item) =>
            item.children ? (
              <div key={item.label} className="nav-drop">
                <a href={item.href}>{item.label}</a>
                <div>
                  {item.children.map((c) => (
                    <a key={c.href} href={c.href} onClick={() => setOpen(false)}>
                      {c.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ),
          )}
        </nav>
        <div className="header-actions">
          <a className="phone" href={`tel:${primary.tel}`}>
            {primary.phone}
          </a>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
          <a className="btn btn-gold" href={chrome.quoteHref}>
            Free quote
          </a>
        </div>
      </div>
    </header>
  );
}
