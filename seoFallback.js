// Edge SEO fallback — used by middleware.js when Prerender.io can't serve a
// crawler (no token, subscription lapsed, upstream error).
//
// Without this, crawlers get the bare SPA shell: the same homepage <title>,
// no canonical, no robots tag and an empty <div id="root"> on EVERY URL.
// Google then folds those URLs together as duplicates ("Duplicate without
// user-selected canonical", "Google chose different canonical") or leaves
// them "Discovered – currently not indexed".
//
// This builds, from the API, the head tags each page's Helmet would render
// (title, description, canonical, robots, og:*), the real HTTP status
// (301 / 404 / 410 / 503), the site's main links and the page text inside
// #root. React's createRoot() replaces #root's children on load, so real
// browsers that somehow reach this see the normal app.

import { STATIC_BODIES, STATIC_META } from "./seoStaticPages.js";
import { seoTitle } from "./src/utils/seoTitle.js";

const SITE = "https://studenttoolsng.com";
const API = "https://studenttoolsserver.onrender.com/api";
// Server-side view counting skips UAs matching /bot|prerender/.
const API_UA = "StudentToolsNG-EdgeSEO-bot";

// Keep in sync with src/utils/tutorialCategories.js.
const CATEGORIES = ["physics", "mathematics", "chemistry", "biology", "programming"];

// Public fixed routes → [title, description], generated from each page's own
// Helmet by buildSeoStatic.mjs. /tutorials builds its title from the URL, so
// it is the one entry kept here.
const STATIC_PAGES = {
  "/tutorials": ["Study Tutorials | StudentToolsNG", "Explore tutorials by subject, topic, and subtopic. Learn faster with structured academic content built for Nigerian students."],
  ...STATIC_META
};

// Crawlers that don't run JavaScript only see links that are in the HTML, so
// every page carries the same main links the Navbar and Footer show visitors.
const link = (href, text) => `<a href="${href}">${text}</a>`;
const SITE_NAV = `<nav aria-label="Main">${[
  ["/", "Home"],
  ["/tutorials", "Tutorials"],
  ["/cgpa-calculator", "CGPA Calculator"],
  ["/waec-grade-calculator", "WAEC Grade Calculator"],
  ["/jamb-score-calculator", "JAMB Score Calculator"],
  ["/jamb-cbt-practice", "JAMB CBT Practice"],
  ["/jamb-subject-combination", "JAMB Subject Combination"],
  ["/aggregate-score-calculator", "Aggregate Score Calculator"],
  ["/project-topics", "Project Topics"],
  ["/calculators", "All Calculators"],
  ["/engineering-tools", "Engineering Tools"],
  ["/marketplace", "Research Library"]
].map(([href, text]) => link(href, text)).join(" · ")}</nav>`;
const SITE_FOOTER = `<footer>${[
  ["/physics", "Physics Tutorials"],
  ["/mathematics", "Mathematics Tutorials"],
  ["/chemistry", "Chemistry Tutorials"],
  ["/biology", "Biology Tutorials"],
  ["/programming", "Programming Tutorials"],
  ["/about", "About"],
  ["/author", "Author"],
  ["/contact", "Contact"],
  ["/privacy-policy", "Privacy Policy"],
  ["/terms", "Terms of Use"]
].map(([href, text]) => link(href, text)).join(" · ")}</footer>`;

// Homepage text for crawlers: the brand name plus links to the main tools,
// mirroring the hero and "Popular Student Tools" sections of Home.jsx.
const HOME_BODY = `<main>
<h1>StudentToolsNG: Free Academic Tools for Nigerian Students</h1>
<p>StudentToolsNG (Student Tools NG) helps Nigerian students calculate CGPA, WAEC grades and JAMB scores, and learn with free study tutorials, quizzes and research guides.</p>
<h2>Popular Student Tools</h2>
<ul>
<li><a href="/cgpa-calculator">CGPA Calculator</a></li>
<li><a href="/waec-grade-calculator">WAEC Grade Calculator</a></li>
<li><a href="/jamb-score-calculator">JAMB Score Calculator</a></li>
<li><a href="/gpa-class-calculator">GPA Class of Degree Calculator</a></li>
<li><a href="/age-calculator">Age Calculator</a></li>
<li><a href="/age-tracker">Age Tracker</a></li>
<li><a href="/jamb-cbt-practice">Free JAMB CBT Practice Test</a></li>
<li><a href="/aggregate-score-calculator">Post-UTME Aggregate Score Calculator</a></li>
<li><a href="/jamb-subject-combination">JAMB Subject Combination for All Courses</a></li>
<li><a href="/project-topics">Final Year Project Topics by Department</a></li>
<li><a href="/calculators">All Free Calculators</a></li>
<li><a href="/percentage-calculator">Percentage Calculator</a></li>
<li><a href="/bmi-calculator">BMI Calculator</a></li>
<li><a href="/ovulation-calculator">Ovulation and Period Calculator</a></li>
<li><a href="/pregnancy-due-date-calculator">Pregnancy Due Date Calculator</a></li>
<li><a href="/cgpa-converter">CGPA Converter: 5.0 to 4.0 Scale and Percentage</a></li>
<li><a href="/engineering-tools/solar-system-calculator">Solar, Inverter and Battery Calculator</a></li>
<li><a href="/engineering-tools">Engineering Tools: Resistor Colour Code, Capacitor Code and Circuit Calculators</a></li>
<li><a href="/admission-predictor">Admission Predictor</a></li>
<li><a href="/study-planner">Study Planner</a></li>
<li><a href="/quiz">Practice Quiz</a></li>
<li><a href="/tutorials">Study Tutorials</a></li>
<li><a href="/scholarships">Scholarships for Nigerian Students</a></li>
<li><a href="/marketplace">Research Library</a></li>
</ul>
</main>`;

const homeBody = () =>
  HOME_BODY.replace(
    "</main>",
    `${(STATIC_BODIES["/"] || "").replace(/<\/?main>/g, "").replace(/<(\/?)h1>/g, "<$1h2>")}</main>`
  );

// Routes that exist but aren't ours to describe (account/app pages): pass
// through untouched.
const PASS_THROUGH = /^\/(publisher|my-purchases)(\/|$)/i;

const escapeHtml = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const decodeEntities = (s) =>
  String(s ?? "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");

// Same double-decode TutorialDetails does (many rows are stored escaped).
const tutorialHtml = (raw) =>
  decodeEntities(decodeEntities(raw))
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    // The page has its own <h1> (the title); demote content h1s like buildArticle().
    .replace(/<(\/?)h1\b/gi, "<$1h2");

const plainText = (html) =>
  decodeEntities(String(html ?? "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

const paragraphs = (text) =>
  String(text ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(p).replace(/\n/g, "<br>")}</p>`)
    .join("\n");

// Status 0 means the API didn't answer properly. A blip gets one retry.
const apiGet = async (path, attempts = 2) => {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(`${API}${path}`, {
        headers: { "User-Agent": API_UA, Accept: "application/json" },
        signal: AbortSignal.timeout(9000)
      });
      if (res.status < 500 && res.status !== 429) {
        let data = null;
        try { data = await res.json(); } catch { /* non-JSON error page */ }
        return { status: res.status, data };
      }
    } catch { /* timeout or network error */ }
  }
  return { status: 0, data: null };
};

// The page exists but we can't describe it right now. Never answer with the
// bare shell here: that is the homepage's title on a tutorial's URL with a 200,
// which tells Google the two are duplicates. A 503 means "come back later".
const UNAVAILABLE = { status: 503 };

const list = (items) =>
  `<ul>${items.map(([href, text]) => `<li>${link(href, escapeHtml(text))}</li>`).join("")}</ul>`;

const tutorialLinks = (rows) => list(rows.map((t) => [`/tutorial/${t.slug}`, t.title]));
const titleCase = (s) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

// Related tutorials are a bonus: never fail or retry the page for them.
const relatedLinks = async (t) => {
  const query = `category=${encodeURIComponent(t.category)}&id=${t._id}`;
  const byTopic = t.topic
    ? await apiGet(`/tutorials/related?${query}&topic=${encodeURIComponent(t.topic)}`, 1)
    : null;
  let rows = Array.isArray(byTopic?.data) ? byTopic.data : [];
  if (!rows.length) {
    const { data } = await apiGet(`/tutorials/related?${query}`, 1);
    rows = Array.isArray(data) ? data : [];
  }
  return rows.length ? `<h2>Related Tutorials</h2>${tutorialLinks(rows)}` : "";
};

// /tutorials: a link to every tutorial, grouped by subject.
const tutorialsHub = async () => {
  const { status, data } = await apiGet("/tutorials/directory", 1);
  const intro = (STATIC_BODIES["/tutorials"] || "").replace(/<\/?main>/g, "");
  const groups = status === 200 && Array.isArray(data)
    ? CATEGORIES.map((c) => {
        const rows = data.filter((t) => t.category === c);
        return rows.length ? `<h2>${link(`/${c}`, `${titleCase(c)} Tutorials`)}</h2>${tutorialLinks(rows)}` : "";
      }).join("")
    : "";
  return `<main><h1>Study Tutorials</h1>${intro}${groups}</main>`;
};

// /:category and /:category/:topic: the tutorials under that heading.
const categoryBody = async (name, category, topic) => {
  const { status, data } = await apiGet("/tutorials/directory", 1);
  const rows = status === 200 && Array.isArray(data)
    ? data.filter((t) => t.category === category && (!topic || t.topic === topic))
    : [];
  return `<main><h1>${escapeHtml(name)} Tutorials</h1>${rows.length ? tutorialLinks(rows) : ""}</main>`;
};

// Decide what a crawler should get for this path.
// Returns { status, location?, title, description, canonical?, robots?, ogType?, body? }
// or null to leave the SPA shell untouched.
async function describe(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (PASS_THROUGH.test(path)) return null;

  if (STATIC_PAGES[path]) {
    const [title, description] = STATIC_PAGES[path];
    const body =
      path === "/" ? homeBody()
      : path === "/tutorials" ? await tutorialsHub()
      : STATIC_BODIES[path];
    return { status: 200, title, description, canonical: `${SITE}${path}`, body };
  }

  const parts = path.split("/").filter(Boolean).map((p) => {
    try { return decodeURIComponent(p); } catch { return p; }
  });

  // /tutorial/:slug
  if (parts[0] === "tutorial" && parts.length === 2) {
    const slug = parts[1];
    const { status, data } = await apiGet(`/tutorials/${encodeURIComponent(slug)}`);
    if (status === 404 || status === 410) return notFound(status);
    if (status !== 200 || !data) return UNAVAILABLE;
    if (data.redirectTo) return { status: 301, location: `${SITE}${data.redirectTo}` };

    const html = tutorialHtml(data.content);
    const text = plainText(html);
    const canonical = `${SITE}/tutorial/${data.slug || slug}`;
    const description = (data.excerpt?.trim() || text).slice(0, 160);
    const category = titleCase(data.category || "");
    const breadcrumb = `<nav aria-label="Breadcrumb">${link("/", "Home")} › ${link("/tutorials", "Tutorials")} › ${link(`/${data.category}`, escapeHtml(category))}</nav>`;
    return {
      status: 200,
      title: seoTitle(data.title),
      description,
      canonical,
      ogType: "article",
      image: data.image,
      body: `<main>${breadcrumb}<article><h1>${escapeHtml(data.title)}</h1>\n<p>By ${link("/author", "Engr. Henry Akpan")}</p>\n${html}</article>${await relatedLinks(data)}</main>`,
      // Same schema TutorialDetails renders.
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: data.title,
          description,
          image: data.image || `${SITE}/og-image.png`,
          mainEntityOfPage: canonical,
          datePublished: data.createdAt,
          dateModified: data.updatedAt || data.createdAt,
          author: { "@type": "Person", name: "Engr. Henry Akpan", url: `${SITE}/author` },
          publisher: {
            "@type": "Organization",
            name: "StudentToolsNG",
            logo: { "@type": "ImageObject", url: `${SITE}/icon-512.png` }
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE },
            { "@type": "ListItem", position: 2, name: "Tutorials", item: `${SITE}/tutorials` },
            { "@type": "ListItem", position: 3, name: data.title, item: canonical }
          ]
        }
      ]
    };
  }

  // /publishers/:slug/:listingSlug
  if (parts[0] === "publishers" && parts.length === 3) {
    const [, pub, item] = parts;
    const { status, data } = await apiGet(
      `/marketplace/publishers/${encodeURIComponent(pub)}/${encodeURIComponent(item)}`
    );
    if (status === 404 || status === 410) return notFound(status);
    if (status !== 200 || !data?.title) return UNAVAILABLE;

    const canonical = `${SITE}/publishers/${pub}/${item}`;
    const text = plainText(data.previewContent);
    return {
      status: 200,
      title: seoTitle(data.title),
      description: text.slice(0, 160),
      canonical,
      ogType: "article",
      image: data.coverImageUrl,
      body: `<main><article><h1>${escapeHtml(data.title)}</h1>\n<p>By ${link(`/publishers/${pub}`, escapeHtml(data.publisher?.businessName))} · ${escapeHtml(data.field)}</p>\n${paragraphs(data.previewContent)}</article></main>`
    };
  }

  // /publishers/:slug
  if (parts[0] === "publishers" && parts.length === 2) {
    const { status, data } = await apiGet(`/marketplace/publishers/${encodeURIComponent(parts[1])}`);
    if (status === 404 || status === 410) return notFound(status);
    if (status !== 200 || !data) return UNAVAILABLE;
    const publisher = data.publisher || data;
    const name = publisher.businessName || parts[1];
    const about = plainText(publisher.description);
    const listings = Array.isArray(data.listings) ? data.listings : [];
    return {
      status: 200,
      title: `${name} | StudentToolsNG Marketplace`,
      description: `${about ? `${about}. ` : ""}Browse research documents published by ${name} on StudentToolsNG.`.slice(0, 160),
      canonical: `${SITE}/publishers/${parts[1]}`,
      body: `<main><h1>${escapeHtml(name)}</h1><p>${escapeHtml(about)}</p>${list(listings.map((l) => [`/publishers/${parts[1]}/${l.slug}`, l.title]))}</main>`
    };
  }

  // /:category(/:topic(/:subtopic)) — listing pages: real, but noindex.
  if (parts.length <= 3 && CATEGORIES.includes(parts[0].toLowerCase())) {
    const name = titleCase(parts[parts.length - 1]);
    return {
      status: 200,
      title: `${name} Tutorials | StudentToolsNG`,
      description: `Browse ${name} tutorials on StudentToolsNG.`,
      canonical: `${SITE}/${parts.slice(0, 2).join("/")}`,
      robots: "noindex, follow",
      body: await categoryBody(name, parts[0].toLowerCase(), parts[1]?.toLowerCase())
    };
  }

  // Anything else falls to App.jsx's "*" route / invalid category → NotFound.
  return notFound(404);
}

const notFound = (status) => ({
  status,
  title: `${status === 410 ? "Page Removed" : "Page Not Found"} | StudentToolsNG`,
  description: "",
  robots: "noindex, follow",
  body: `<main><h1>${status === 410 ? "410 — Page Removed" : "404 — Page Not Found"}</h1><p><a href="/">Go to Homepage</a> · <a href="/tutorials">Browse Tutorials</a></p></main>`
});

function inject(shell, page) {
  const tags = [
    `<title>${escapeHtml(page.title)}</title>`,
    page.description && `<meta name="description" content="${escapeHtml(page.description)}" />`,
    page.canonical && `<link rel="canonical" href="${escapeHtml(page.canonical)}" />`,
    page.robots && `<meta name="robots" content="${page.robots}" />`,
    `<meta property="og:type" content="${page.ogType || "website"}" />`,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    page.description && `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    page.canonical && `<meta property="og:url" content="${escapeHtml(page.canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(page.image || `${SITE}/og-image.png`)}" />`,
    `<meta property="og:site_name" content="StudentToolsNG" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...(page.jsonLd || []).map(
      (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`
    )
  ]
    .filter(Boolean)
    // data-rh marks these as react-helmet tags, so when the page's own
    // <Helmet> mounts it replaces them instead of adding a second canonical
    // (Google may ignore canonicals when there are several).
    .map((t) => (t.startsWith("<title>") ? t : t.replace(/^<(\w+)/, '<$1 data-rh="true"')))
    .join("\n  ");

  let html = shell.replace(/<title>[\s\S]*?<\/title>/i, "");
  html = html.replace(/<\/head>/i, `  ${tags}\n</head>`);
  // A function, so "$" in the page text can't be read as a replacement pattern.
  return html.replace(/<div id="root"><\/div>/i, () =>
    `<div id="root">${SITE_NAV}${page.body || ""}${SITE_FOOTER}</div>`
  );
}

const unavailable = (reason) =>
  new Response("<!doctype html><title>Temporarily unavailable</title><h1>Temporarily unavailable</h1>", {
    status: 503,
    headers: {
      "retry-after": "300",
      "cache-control": "no-store",
      "content-type": "text/html; charset=utf-8",
      "x-prerender-mw": `edge-503:${reason}`
    }
  });

// Returns a Response, or null if the caller should fall back to the SPA
// (only for the account pages in PASS_THROUGH).
export async function seoFallback(url, reason) {
  try {
    const page = await describe(url.pathname);
    if (!page) return null;
    if (page.status === 503) return unavailable(reason);

    const headers = {
      "x-prerender-mw": `edge-${page.status}:${reason}`,
      "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"
    };

    if (page.status === 301) {
      return new Response(null, { status: 301, headers: { ...headers, location: page.location } });
    }

    // x-prerender makes our own middleware pass this straight to the static file.
    const shellRes = await fetch(`${url.origin}/index.html`, {
      headers: { "x-prerender": "1" },
      signal: AbortSignal.timeout(8000)
    });
    if (!shellRes.ok) return unavailable(reason);
    const shell = await shellRes.text();

    return new Response(inject(shell, page), {
      status: page.status,
      headers: { ...headers, "content-type": "text/html; charset=utf-8" }
    });
  } catch {
    return unavailable(reason);
  }
}
