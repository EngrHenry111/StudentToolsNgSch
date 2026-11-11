// Content blocks for the writing guides. Each guide is a list of blocks:
//   { h2 }  { h3 }  { p }  { ul: [...] }  { ol: [...] }
//   { letter: "multi-line text", caption }   a sample letter/CV, shown as a card
//   { tip }                                   a highlighted tip box
// The React page (GuidePage.jsx) and the crawler build
// (scripts/buildSeoStatic.mjs) both read these, so they always match.

export const toCrawlerBlocks = (blocks) =>
  blocks.flatMap((b) => {
    if (b.h2) return [{ tag: "h2", text: b.h2 }];
    if (b.h3) return [{ tag: "h3", text: b.h3 }];
    if (b.p) return [{ tag: "p", text: b.p }];
    if (b.tip) return [{ tag: "p", text: b.tip }];
    if (b.ul) return b.ul.map((t) => ({ tag: "li", text: t }));
    if (b.ol) return b.ol.map((t) => ({ tag: "li", text: t }));
    if (b.letter) return [...(b.caption ? [{ tag: "h3", text: b.caption }] : []), { tag: "pre", text: b.letter }];
    return [];
  });

export const faqBlocks = (faq) => [
  { tag: "h2", text: "Frequently Asked Questions" },
  ...faq.flatMap((f) => [{ tag: "h3", text: f.q }, { tag: "p", text: f.a }])
];

export const wordCount = (blocks) =>
  toCrawlerBlocks(blocks).reduce((n, b) => n + b.text.split(/\s+/).filter(Boolean).length, 0);
