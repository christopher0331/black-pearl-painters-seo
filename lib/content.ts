import { readFileSync } from "fs";
import { join } from "path";

const ROOT = join(process.cwd(), "content");

export type Block =
  | { type: "heading"; level: number; text: string; href?: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "image"; src: string; alt?: string; title?: string; cdn?: string }
  | { type: "quote"; text: string };

export type PageRecord = {
  path: string;
  url: string;
  title: string;
  desc: string;
  canonical?: string;
  robots?: string;
  h1: string[];
  kind: "home" | "page" | "post" | "category";
  blocks: Block[];
  faqs?: Array<{ q: string; a: string }>;
};

export type Chrome = {
  brand: string;
  tagline: string;
  nav: Array<{
    label: string;
    href: string;
    children?: Array<{ label: string; href: string }>;
  }>;
  people: Array<{
    name: string;
    role: string;
    phone: string;
    tel: string;
    email: string;
    photo: string;
  }>;
  favicon: string;
  quoteHref: string;
  areas: string;
  form: {
    times: string[];
    projectTypes: Array<{ v: string; t: string }>;
    sources: string[];
  };
};

export function loadManifest() {
  return JSON.parse(readFileSync(join(ROOT, "manifest.json"), "utf8")) as {
    paths: string[];
    pages: Array<{ path: string; kind: string; title: string; h1: string }>;
  };
}

export function loadChrome(): Chrome {
  return JSON.parse(readFileSync(join(ROOT, "chrome.json"), "utf8"));
}

export function loadPage(urlPath: string): PageRecord {
  const file =
    urlPath === "/"
      ? join(ROOT, "pages/index.json")
      : join(ROOT, "pages", urlPath.replace(/^\/|\/$/g, ""), "index.json");
  return JSON.parse(readFileSync(file, "utf8"));
}

export function slugToPath(slug?: string[]): string {
  if (!slug || slug.length === 0) return "/";
  return `/${slug.join("/")}/`;
}
