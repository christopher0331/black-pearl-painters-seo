import { existsSync } from "fs";
import { join } from "path";
import type { Block } from "@/lib/content";

export type Img = { src: string; alt: string };

export function cleanText(s: string) {
  return s
    .replace(/[\uE000-\uF8FF]/g, "")
    .replace(/^[*Δ\s]+/, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function isNoiseImage(src: string, alt = "") {
  const t = `${src} ${alt}`.toLowerCase();
  return (
    t.includes("favicon") ||
    t.includes("googleusercontent") ||
    t.includes("lh3.") ||
    /=s44/.test(src)
  );
}

export function preferFull(src: string) {
  if (!src.startsWith("/")) return src;
  const bigger = src.replace(/-\d{2,4}x\d{2,4}(?=\.(jpe?g|png|webp)$)/i, "");
  if (bigger !== src && existsSync(join(process.cwd(), "public", bigger))) {
    return bigger;
  }
  return src;
}

export function asImg(b?: Block | null): Img | null {
  if (!b || b.type !== "image" || !b.src || isNoiseImage(b.src, b.alt)) {
    return null;
  }
  return { src: preferFull(b.src), alt: b.alt || b.title || "" };
}

const SERVICE_HREFS: Record<string, string> = {
  "Exterior Painters": "/exterior-house-painters/",
  "Interior Painters": "/interior-house-painters/",
  "Condo & Townhome Painters": "/condo-and-townhome-painters/",
  "COA/TOA/HOA & Multifamily Painters": "/hoa-and-multifamily-painters/",
  "Carpentry & Siding Repairs": "/carpentry-and-siding-repair/",
  "Commercial & Industrial Painters": "/commercial-and-industrial-painters/",
};

const HOME_HERO_CANDIDATES = [
  "/media/wp-content/uploads/2025/05/DJI_0844-1-scaled.jpg",
  "/media/wp-content/uploads/2024/12/Exterior-Painting-Black-Pearl-Painting.jpg",
];

export type ServiceCard = {
  image: Img;
  title: string;
  items: string[];
  href: string;
};

export function parseHome(blocks: Block[]) {
  const h1 = blocks.find((b) => b.type === "heading" && b.level === 1);
  const kicker = blocks.find((b) => b.type === "heading" && b.level === 4);
  const lead = blocks.find((b) => b.type === "paragraph");
  const area = blocks.find(
    (b) =>
      b.type === "heading" &&
      b.level === 3 &&
      b.text.toLowerCase().includes("serving"),
  );

  const services: ServiceCard[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const img = asImg(blocks[i]);
    const title = blocks[i + 1];
    const list = blocks[i + 2];
    if (
      img &&
      title?.type === "heading" &&
      title.level === 4 &&
      list?.type === "list"
    ) {
      services.push({
        image: img,
        title: title.text,
        items: list.items.map(cleanText),
        href: SERVICE_HREFS[title.text] || "/request-a-quote/",
      });
    }
  }

  const localStart = blocks.findIndex(
    (b) => b.type === "heading" && b.text === "Your Local Expert Painters",
  );
  const localParas = blocks
    .slice(localStart + 1)
    .filter((b) => b.type === "paragraph")
    .slice(0, 4)
    .map((b) => (b.type === "paragraph" ? b.text : ""));

  const areasStart = blocks.findIndex(
    (b) => b.type === "heading" && b.text === "Areas We Serve",
  );
  const areasLineBlock = areasStart >= 0 ? blocks[areasStart + 1] : undefined;
  const areasBodyBlock = areasStart >= 0 ? blocks[areasStart + 2] : undefined;
  const areasLine =
    areasLineBlock?.type === "paragraph" ? areasLineBlock.text : "";
  const areasBody =
    areasBodyBlock?.type === "paragraph" ? areasBodyBlock.text : "";

  const workStart = blocks.findIndex(
    (b) => b.type === "heading" && b.text === "Explore Our Work",
  );
  const work: Img[] = [];
  for (let i = workStart + 1; i < blocks.length; i++) {
    const img = asImg(blocks[i]);
    if (img) work.push(img);
    else if (blocks[i].type === "heading") break;
  }

  const financeImg = blocks
    .map(asImg)
    .reverse()
    .find((img) => img && img.src.toLowerCase().includes("financ"));

  const heroFromDisk = HOME_HERO_CANDIDATES.find((src) =>
    existsSync(join(process.cwd(), "public", src)),
  );
  const heroImage: Img = heroFromDisk
    ? { src: heroFromDisk, alt: "Recently completed exterior painting" }
    : services[0]?.image || { src: "", alt: "" };

  return {
    kicker: kicker && kicker.type === "heading" ? kicker.text : "",
    title: h1 && h1.type === "heading" ? h1.text : "Black Pearl Painters",
    lead: lead && lead.type === "paragraph" ? lead.text : "",
    area: area && area.type === "heading" ? area.text : "",
    heroImage,
    services,
    localParas,
    areasLine,
    areasBody,
    work,
    financeImg,
  };
}

export type Feature = {
  image?: Img;
  title: string;
  href?: string;
  body: string[];
  items: string[];
};

function looksLikeBenefitList(items: string[]) {
  if (items.length < 2 || items.length > 6) return false;
  if (items.some((item) => /uncategorized/i.test(item))) return false;
  return /owned|estimate|deposit|decade|sherwin|payment|hassle|local|operated|flexible/.test(
    items.join(" ").toLowerCase(),
  );
}

export function parseInner(blocks: Block[]) {
  const kicker = blocks.find(
    (b) => b.type === "heading" && (b.level === 3 || b.level === 4),
  );
  const title = blocks.find((b) => b.type === "heading" && b.level === 1);
  const introList = blocks.find(
    (b, idx) =>
      b.type === "list" && blocks.slice(0, idx).every((p) => !asImg(p)),
  );
  const introItems =
    introList?.type === "list" && looksLikeBenefitList(introList.items)
      ? introList.items.map(cleanText)
      : [];

  const introParas: string[] = [];
  const introHeadings: Array<{ title: string; body: string[] }> = [];
  let i = 0;
  while (i < blocks.length && !asImg(blocks[i])) {
    const b = blocks[i];
    if (b.type === "paragraph" && cleanText(b.text) && b.text !== "Δ") {
      introParas.push(b.text);
    } else if (b.type === "heading" && b.level === 2) {
      const body: string[] = [];
      let j = i + 1;
      while (j < blocks.length && blocks[j].type === "paragraph") {
        const t = (blocks[j] as { text: string }).text;
        if (cleanText(t) && t !== "Δ") body.push(t);
        j++;
      }
      if (body.length) introHeadings.push({ title: b.text, body });
      i = j;
      break;
    }
    i++;
  }

  const firstImg = i < blocks.length ? asImg(blocks[i]) : null;
  const looksLikePerson =
    firstImg &&
    blocks[i + 1]?.type === "heading" &&
    /owner|coordinator|manager|justin|kellie|shellie/i.test(
      (blocks[i + 1] as { text: string }).text,
    );
  const heroImage = looksLikePerson ? undefined : firstImg || undefined;

  const features: Feature[] = [];
  const galleries: Img[][] = [];
  const restHeadings: Array<{ title: string; body: string[] }> = [];
  let pendingGallery: Img[] = [];

  const flushGallery = () => {
    if (pendingGallery.length >= 3) galleries.push(pendingGallery);
    else if (pendingGallery.length) {
      pendingGallery.forEach((image) =>
        features.push({ image, title: "", body: [], items: [] }),
      );
    }
    pendingGallery = [];
  };

  while (i < blocks.length) {
    const b = blocks[i];
    const img = asImg(b);
    if (img) {
      const next = blocks[i + 1];
      const next2 = blocks[i + 2];
      if (next?.type === "heading" && next.level >= 4) {
        flushGallery();
        const body: string[] = [];
        const items: string[] = [];
        let j = i + 2;
        if (next2?.type === "list") {
          items.push(...next2.items.map(cleanText));
          j = i + 3;
        }
        while (j < blocks.length && blocks[j].type === "paragraph") {
          body.push((blocks[j] as { text: string }).text);
          j++;
        }
        features.push({
          image: img,
          title: next.text,
          href: "href" in next ? next.href : undefined,
          body,
          items,
        });
        i = j;
        continue;
      }
      pendingGallery.push(img);
      i++;
      continue;
    }
    flushGallery();
    if (b.type === "heading" && b.level >= 4) {
      const body: string[] = [];
      const items: string[] = [];
      let j = i + 1;
      if (blocks[j]?.type === "list") {
        items.push(
          ...(blocks[j] as Extract<Block, { type: "list" }>).items.map(
            cleanText,
          ),
        );
        j++;
      }
      while (j < blocks.length && blocks[j].type === "paragraph") {
        const t = (blocks[j] as { text: string }).text;
        if (cleanText(t) && t !== "Δ") body.push(t);
        j++;
      }
      if (body.length || items.length) {
        features.push({ title: b.text, body, items });
        i = j;
        continue;
      }
    }
    if (b.type === "heading" && b.level <= 2) {
      const body: string[] = [];
      let j = i + 1;
      while (j < blocks.length && blocks[j].type === "paragraph") {
        const t = (blocks[j] as { text: string }).text;
        if (cleanText(t) && t !== "Δ") body.push(t);
        j++;
      }
      restHeadings.push({ title: b.text, body });
      i = j;
      continue;
    }
    i++;
  }
  flushGallery();

  return {
    kicker: kicker && kicker.type === "heading" ? kicker.text : "",
    title: title && title.type === "heading" ? title.text : "",
    introItems,
    introParas,
    introHeadings,
    heroImage,
    features: features.filter((f) => f.title || f.image),
    galleries,
    restHeadings: restHeadings.filter(
      (h) => h.title !== "Reviews" || h.body.length,
    ),
  };
}
