import { Link, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ENG_TOOLS } from "./engTools";
import "./engineering.css";

const SITE = "https://studenttoolsng.com";
const IMAGE = `${SITE}/og-image.png`;

const ENGINEERING = { name: "Engineering Tools", path: "/engineering-tools" };

// Shared shell for every tool page in a section (engineering, aggregate
// calculators…): SEO tags, breadcrumbs and the tool switcher. Each page
// renders its own <h1> and content so the crawler-text build
// (scripts/buildSeoStatic.mjs) can read them.
export default function EngLayout({
  path,
  title,
  description,
  keywords,
  faq = [],
  section = ENGINEERING,
  tools = ENG_TOOLS,
  children
}) {
  const url = `${SITE}${path}`;
  const tool = tools.find((t) => t.path === path);

  return (
    <div className="eng-page">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        <link rel="canonical" href={url} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={IMAGE} />
        <meta property="og:url" content={url} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={IMAGE} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: tool ? tool.name : section.name,
            url,
            applicationCategory: "EducationalApplication",
            operatingSystem: "All",
            description,
            offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" }
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE },
              { "@type": "ListItem", position: 2, name: section.name, item: `${SITE}${section.path}` },
              tool && { "@type": "ListItem", position: 3, name: tool.name, item: url }
            ].filter(Boolean)
          })}
        </script>

        {faq.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a }
              }))
            })}
          </script>
        )}
      </Helmet>

      <nav className="eng-crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link> › <Link to={section.path}>{section.name}</Link>
        {tool && <> › <span>{tool.name}</span></>}
      </nav>

      <nav className="eng-toolnav" aria-label={section.name}>
        {tools.map((t) => (
          <NavLink key={t.path} to={t.path} className={({ isActive }) => (isActive ? "active" : "")}>
            {t.short}
          </NavLink>
        ))}
      </nav>

      {children}
    </div>
  );
}

// Visible FAQ list matching the FAQPage structured data.
export function FaqList({ faq }) {
  return faq.map((f) => (
    <p key={f.q}>
      <strong>{f.q}</strong>
      <br />
      {f.a}
    </p>
  ));
}
