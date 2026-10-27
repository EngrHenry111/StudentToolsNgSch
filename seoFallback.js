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
// (301 / 404 / 410) and, for tutorials and listings, the article text inside
// #root. React's createRoot() replaces #root's children on load, so real
// browsers that somehow reach this see the normal app.

import { STATIC_BODIES, STATIC_META } from "./seoStaticPages.js";

const SITE = "https://studenttoolsng.com";
const API = "https://studenttoolsserver.onrender.com/api";
// Server-side view counting skips UAs matching /bot|prerender/.
const API_UA = "StudentToolsNG-EdgeSEO-bot";

// Keep in sync with src/utils/tutorialCategories.js.
const CATEGORIES = ["physics", "mathematics", "chemistry", "biology", "programming"];

// Public, indexable fixed routes from App.jsx → [title, description].
const STATIC_PAGES = {
  "/": ["StudentToolsNG - Free CGPA, WAEC & JAMB Calculators for Nigerian Students", "StudentToolsNG (Student Tools NG) gives Nigerian students free CGPA, WAEC and JAMB calculators, a study planner, quizzes and tutorials."],
  "/tutorials": ["Study Tutorials | StudentToolsNG", "Explore tutorials by subject, topic, and subtopic. Learn faster with structured academic content built for Nigerian students."],
  "/cgpa-calculator": ["CGPA Calculator | StudentToolsNG", "Calculate your CGPA on the 5-point or 4-point scale used by Nigerian universities."],
  "/waec-grade-calculator": ["WAEC Grade Calculator | StudentToolsNG", "Convert WAEC scores to grades and check your WAEC result points."],
  "/jamb-score-calculator": ["JAMB Score Calculator | StudentToolsNG", "Calculate your JAMB aggregate score for university admission screening."],
  "/gpa-class-calculator": ["GPA Class of Degree Calculator | StudentToolsNG", "Find your class of degree from your GPA or CGPA."],
  "/age-calculator": ["Age Calculator | Exact Age in Years, Months and Days", "Free age calculator: find your exact age in years, months and days, your age on any date, days until your next birthday and whether you meet an age limit."],
  "/age-tracker": ["Age Tracker | Track Birthdays and Ages of Family and Friends", "Free age and birthday tracker: save family, friends or students, see everyone's exact age, upcoming birthdays and milestones, and export a birthday calendar."],
  "/engineering-tools": ["Engineering Tools: Resistor, Capacitor & Circuit Calculators | StudentToolsNG", "Free electronics calculators for engineering and physics students: resistor colour code, SMD resistor code, capacitor code, Ohm's law, series and parallel, voltage divider, LED resistor and 555 timer."],
  "/engineering-tools/resistor-color-code": ["Resistor Colour Code Calculator (4, 5 & 6 Band) | StudentToolsNG", "Free resistor colour code calculator: pick the bands to get the resistance, tolerance and range, or enter a value to get its colours. Works for 3, 4, 5 and 6-band resistors and inductors."],
  "/engineering-tools/smd-resistor-code": ["SMD Resistor Code Calculator (3-digit, 4-digit, EIA-96) | StudentToolsNG", "Decode SMD chip resistor markings: 3-digit codes like 103, 4-digit codes like 1002, R codes like 4R7 and EIA-96 codes like 01C. Or enter a value to get its SMD code."],
  "/engineering-tools/capacitor-code": ["Capacitor Code Calculator (104, 4R7, 2n2 to pF, nF, µF) | StudentToolsNG", "Free capacitor code calculator: convert ceramic and film capacitor codes like 104, 222J or 4R7 to pF, nF and µF, read tolerance and voltage letters, or find the code for a value."],
  "/engineering-tools/ohms-law-calculator": ["Ohm's Law Calculator (Voltage, Current, Resistance, Power) | StudentToolsNG", "Free Ohm's law calculator: enter any two of voltage, current, resistance and power to find the other two, with the formulas and worked examples."],
  "/engineering-tools/series-parallel-calculator": ["Series and Parallel Circuit Calculator with Working | StudentToolsNG", "Free series and parallel circuit calculator: paste a question to get total resistance, current and the voltage across each resistor with full step-by-step working, or combine resistors, capacitors and inductors."],
  "/engineering-tools/voltage-divider-calculator": ["Voltage Divider Calculator (Vout, R1, R2) | StudentToolsNG", "Free voltage divider calculator: find the output voltage from Vin, R1 and R2, or the R2 needed for a target voltage with the nearest standard resistor."],
  "/engineering-tools/led-resistor-calculator": ["LED Resistor Calculator (Series Resistor for LEDs) | StudentToolsNG", "Free LED resistor calculator: find the series resistor for one or more LEDs from the supply voltage, LED forward voltage and current, with the nearest standard value, actual current and power rating."],
  "/engineering-tools/555-timer-calculator": ["555 Timer Calculator (Astable & Monostable) | StudentToolsNG", "Free 555 timer calculator: frequency, period and duty cycle of an astable circuit, R1 and R2 for a target frequency, and the pulse width of a monostable circuit."],
  "/engineering-tools/solar-system-calculator": ["Solar System Calculator Nigeria: Panels, Inverter & Batteries | StudentToolsNG", "Free solar system calculator for Nigerian homes and offices: list your appliances to get the inverter size, number of batteries, number of solar panels, charge controller, cable and fuse sizes, with full working."],
  "/engineering-tools/inverter-size-calculator": ["Inverter Size Calculator (kVA): What Size Inverter Do I Need? | StudentToolsNG", "Free inverter size calculator: list your appliances to get the right inverter in kVA, checked against the starting surge of fridges, ACs and pumps, plus the battery voltage, battery current, fuse and cable size."],
  "/engineering-tools/battery-backup-calculator": ["Battery Backup Calculator: How Long Will My Battery Last? | StudentToolsNG", "Free battery backup calculator for inverters: find how many hours your batteries will last at your load, or how many tubular, AGM or lithium batteries you need for the backup you want, with series and parallel wiring."],
  "/aggregate-score-calculator": ["Post-UTME Aggregate Score Calculator for Nigerian Universities | StudentToolsNG", "Free aggregate score calculator for UNILAG, UI, OAU, UNN, UNIBEN, UNIPORT, UNILORIN, LASU, ABU and UNICAL: combine your UTME, post-UTME and O'level grades, see the working and the score you need."],
  "/cgpa-converter": ["CGPA Converter: 5.0 to 4.0 Scale, Percentage & Class of Degree | StudentToolsNG", "Free CGPA converter for Nigerian students: convert a 5-point CGPA to the 4.0 scale (or any scale), to a percentage and to a class of degree, with a course-by-course 4.0 estimate for WES and study-abroad applications."],
  "/study-planner": ["Study Planner | StudentToolsNG", "Plan your study timetable for exams with StudentToolsNG."],
  "/scholarships": ["Scholarships for Nigerian Students | StudentToolsNG", "Find scholarships open to Nigerian students."],
  "/admission-predictor": ["Admission Predictor | StudentToolsNG", "Estimate your chances of university admission from your JAMB and post-UTME scores."],
  "/ai-tutor": ["AI Tutor | StudentToolsNG", "Ask study questions and get step-by-step explanations."],
  "/tutorials/math-calculator": ["Math Calculator | StudentToolsNG", "Solve maths problems step by step."],
  "/quiz": ["Practice Quiz | StudentToolsNG", "Practice WAEC, JAMB and university quiz questions."],
  "/marketplace": ["Research Library | StudentToolsNG Marketplace", "Search research project guides and academic materials by Nigerian publishers."],
  "/about": ["About | StudentToolsNG", "About StudentToolsNG."],
  "/contact": ["Contact | StudentToolsNG", "Contact StudentToolsNG."],
  "/privacy-policy": ["Privacy Policy | StudentToolsNG", "StudentToolsNG privacy policy."],
  "/terms": ["Terms of Use | StudentToolsNG", "StudentToolsNG terms of use."],
  "/author": ["Author | StudentToolsNG", "About the author of StudentToolsNG."],
  "/jamb-cbt-practice": ["Free JAMB CBT Practice Test Online (with Answers) | StudentToolsNG", "Free JAMB CBT practice test online for Mathematics, Physics, Chemistry and Biology: timed UTME-style questions with a navigator, instant scoring by topic and an explanation for every answer."],
  // Data-driven pages (one per university / CBT subject), generated by buildSeoStatic.mjs.
  ...STATIC_META
};

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

const apiGet = async (path) => {
  const res = await fetch(`${API}${path}`, {
    headers: { "User-Agent": API_UA, Accept: "application/json" },
    signal: AbortSignal.timeout(15000)
  });
  let data = null;
  try { data = await res.json(); } catch { /* non-JSON error page */ }
  return { status: res.status, data };
};

// Decide what a crawler should get for this path.
// Returns { status, location?, title, description, canonical?, robots?, ogType?, body? }
// or null to leave the SPA shell untouched.
async function describe(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (PASS_THROUGH.test(path)) return null;

  if (STATIC_PAGES[path]) {
    const [title, description] = STATIC_PAGES[path];
    return {
      status: 200,
      title,
      description,
      canonical: `${SITE}${path === "/" ? "/" : path}`,
      body: path === "/" ? HOME_BODY : STATIC_BODIES[path]
    };
  }

  const parts = path.split("/").filter(Boolean).map((p) => {
    try { return decodeURIComponent(p); } catch { return p; }
  });

  // /tutorial/:slug
  if (parts[0] === "tutorial" && parts.length === 2) {
    const slug = parts[1];
    const { status, data } = await apiGet(`/tutorials/${encodeURIComponent(slug)}`);
    if (status === 404 || status === 410) return notFound(status);
    if (status !== 200 || !data) return null; // API down — don't guess
    if (data.redirectTo) return { status: 301, location: `${SITE}${data.redirectTo}` };

    const html = tutorialHtml(data.content);
    const text = plainText(html);
    const canonical = `${SITE}/tutorial/${data.slug || slug}`;
    return {
      status: 200,
      title: `${data.title} | StudentToolsNG`,
      description: (data.excerpt?.trim() || text).slice(0, 160),
      canonical,
      ogType: "article",
      image: data.image,
      body: `<main><article><h1>${escapeHtml(data.title)}</h1>\n${html}</article></main>`,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: data.title,
        description: (data.excerpt?.trim() || text).slice(0, 160),
        mainEntityOfPage: canonical,
        datePublished: data.createdAt,
        dateModified: data.updatedAt || data.createdAt,
        author: { "@type": "Organization", name: "StudentToolsNG" }
      }
    };
  }

  // /publishers/:slug/:listingSlug
  if (parts[0] === "publishers" && parts.length === 3) {
    const [, pub, item] = parts;
    const { status, data } = await apiGet(
      `/marketplace/publishers/${encodeURIComponent(pub)}/${encodeURIComponent(item)}`
    );
    if (status === 404 || status === 410) return notFound(status);
    if (status !== 200 || !data?.title) return null;

    const canonical = `${SITE}/publishers/${pub}/${item}`;
    const text = plainText(data.previewContent);
    return {
      status: 200,
      title: `${data.title} | ${data.field} | StudentToolsNG Marketplace`,
      description: text.slice(0, 160),
      canonical,
      ogType: "article",
      image: data.coverImageUrl,
      body: `<main><article><h1>${escapeHtml(data.title)}</h1>\n<p>By ${escapeHtml(data.publisher?.businessName)} · ${escapeHtml(data.field)}</p>\n${paragraphs(data.previewContent)}</article></main>`
    };
  }

  // /publishers/:slug
  if (parts[0] === "publishers" && parts.length === 2) {
    const { status, data } = await apiGet(`/marketplace/publishers/${encodeURIComponent(parts[1])}`);
    if (status === 404 || status === 410) return notFound(status);
    if (status !== 200 || !data) return null;
    const publisher = data.publisher || data;
    const name = publisher.businessName || parts[1];
    return {
      status: 200,
      title: `${name} | StudentToolsNG Marketplace`,
      description: plainText(publisher.description || `Browse research documents published by ${name} on StudentToolsNG.`).slice(0, 160),
      canonical: `${SITE}/publishers/${parts[1]}`
    };
  }

  // /:category(/:topic(/:subtopic)) — listing pages: real, but noindex.
  if (parts.length <= 3 && CATEGORIES.includes(parts[0].toLowerCase())) {
    const label = (s) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const name = label(parts[parts.length - 1]);
    return {
      status: 200,
      title: `${name} Tutorials | StudentToolsNG`,
      description: `Browse ${name} tutorials on StudentToolsNG.`,
      canonical: `${SITE}/${parts.slice(0, 2).join("/")}`,
      robots: "noindex, follow"
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
    page.jsonLd &&
      `<script type="application/ld+json">${JSON.stringify(page.jsonLd).replace(/</g, "\\u003c")}</script>`
  ]
    .filter(Boolean)
    // data-rh marks these as react-helmet tags, so when the page's own
    // <Helmet> mounts it replaces them instead of adding a second canonical
    // (Google may ignore canonicals when there are several).
    .map((t) => (t.startsWith("<title>") ? t : t.replace(/^<(\w+)/, '<$1 data-rh="true"')))
    .join("\n  ");

  let html = shell.replace(/<title>[\s\S]*?<\/title>/i, "");
  html = html.replace(/<\/head>/i, `  ${tags}\n</head>`);
  if (page.body) {
    html = html.replace(/<div id="root"><\/div>/i, `<div id="root">${page.body}</div>`);
  }
  return html;
}

// Returns a Response, or null if the caller should fall back to the SPA.
export async function seoFallback(url, reason) {
  try {
    const page = await describe(url.pathname);
    if (!page) return null;

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
    if (!shellRes.ok) return null;
    const shell = await shellRes.text();

    return new Response(inject(shell, page), {
      status: page.status,
      headers: { ...headers, "content-type": "text/html; charset=utf-8" }
    });
  } catch {
    return null;
  }
}
