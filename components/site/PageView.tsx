import type { Block, Chrome, PageRecord } from "@/lib/content";
import QuoteForm from "./QuoteForm";

function splitContact(text: string) {
  return text
    .replace(/(\(\d{3}\)[.\s-]?\d{3}[.\s-]?\d{4})([A-Za-z])/g, "$1\n$2")
    .replace(/([a-z0-9])([A-Z][a-z]+\s[A-Z])/g, "$1\n$2");
}

function groupBlocks(blocks: Block[]) {
  const groups: Array<{ kind: "gallery" | "single"; items: Block[] }> = [];
  let i = 0;
  while (i < blocks.length) {
    if (blocks[i].type === "image") {
      const items: Block[] = [];
      while (i < blocks.length && blocks[i].type === "image") {
        items.push(blocks[i]);
        i++;
      }
      groups.push({ kind: items.length >= 3 ? "gallery" : "single", items });
    } else {
      groups.push({ kind: "single", items: [blocks[i]] });
      i++;
    }
  }
  return groups;
}

export default function PageView({
  page,
  chrome,
}: {
  page: PageRecord;
  chrome: Chrome;
}) {
  const groups = groupBlocks(page.blocks);
  const isQuote = page.path === "/request-a-quote/";
  const isGallery = page.path === "/gallery/";

  return (
    <article className={`page-article kind-${page.kind}`} id="main">
      {groups.map((g, gi) => {
        if (g.kind === "gallery" || (isGallery && g.items[0].type === "image")) {
          return (
            <div
              key={gi}
              className={isGallery || g.items.length >= 3 ? "img-grid" : "img-row"}
            >
              {g.items.map((b, bi) =>
                b.type === "image" ? (
                  <figure key={bi}>
                    <img src={b.src} alt={b.alt || b.title || ""} />
                    {b.alt ? <figcaption>{b.alt}</figcaption> : null}
                  </figure>
                ) : null,
              )}
            </div>
          );
        }
        const b = g.items[0];
        if (b.type === "heading") {
          const Tag = (`h${Math.min(b.level, 4)}`) as "h1" | "h2" | "h3" | "h4";
          const id =
            b.text.toLowerCase().includes("complete services")
              ? "services"
              : undefined;
          const inner = b.href ? <a href={b.href}>{b.text}</a> : b.text;
          return (
            <Tag key={gi} id={id} className={`h${b.level}`}>
              {inner}
            </Tag>
          );
        }
        if (b.type === "paragraph") {
          const text = splitContact(b.text);
          if (text === "Δ" || text === "*") return null;
          return (
            <p key={gi} className="prose">
              {text}
            </p>
          );
        }
        if (b.type === "list") {
          const List = b.ordered ? "ol" : "ul";
          return (
            <List key={gi} className="prose-list">
              {b.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </List>
          );
        }
        if (b.type === "image") {
          return (
            <figure key={gi} className="img-single">
              <img src={b.src} alt={b.alt || b.title || ""} />
              {b.alt ? <figcaption>{b.alt}</figcaption> : null}
            </figure>
          );
        }
        if (b.type === "quote") {
          return (
            <blockquote key={gi} className="prose">
              {b.text}
            </blockquote>
          );
        }
        return null;
      })}
      {isQuote ? <QuoteForm chrome={chrome} /> : null}
    </article>
  );
}
