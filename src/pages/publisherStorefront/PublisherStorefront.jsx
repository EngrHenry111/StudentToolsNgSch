import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getPublisherStorefront } from "../../apiMarketplace/marketplaceApi";
import NotFound from "../notFound/NotFound";
import FormattedText from "../../componentsMarketplace/FormattedText";
import ShareButtons from "../../componentsMarketplace/ShareButtons";
import { ListingGrid } from "../../componentsMarketplace/ListingCard";
import "./publisherStorefront.css";

const SITE = "https://studenttoolsng.com";

const PublisherStorefront = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Deferred into a microtask rather than called synchronously here —
    // see the identical comment in ListingDetail.jsx.
    Promise.resolve().then(() => {
      setLoading(true);
      setNotFound(false);
    });

    getPublisherStorefront(slug)
      .then(setData)
      .catch((err) => {
        if (err.message?.includes("404") || err.message === "Publisher not found") {
          setNotFound(true);
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (notFound) {
    return <NotFound />;
  }

  if (loading || !data) {
    return (
      <div className="storefront-page">
        <Helmet>
          <title>Loading publisher… | StudentToolsNG</title>
        </Helmet>
        <p>Loading...</p>
      </div>
    );
  }

  const { publisher, listings } = data;
  const canonicalUrl = `${SITE}/publishers/${publisher.slug}`;
  const title = `${publisher.businessName} | StudentToolsNG Marketplace`;
  const description =
    publisher.description?.trim() ||
    `Browse research documents published by ${publisher.businessName} on StudentToolsNG.`;

  return (
    <div className="storefront-page">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={publisher.logoUrl || `${SITE}/logoH.png`} />
        <meta property="og:site_name" content="StudentToolsNG" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: publisher.businessName,
            url: canonicalUrl,
            description,
            ...(publisher.logoUrl ? { logo: publisher.logoUrl } : {})
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE },
              { "@type": "ListItem", position: 2, name: "Research Library", item: `${SITE}/marketplace` },
              { "@type": "ListItem", position: 3, name: publisher.businessName, item: canonicalUrl }
            ]
          })}
        </script>
      </Helmet>

      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/marketplace">Research Library</Link> / <span>{publisher.businessName}</span>
      </div>

      {publisher.logoUrl && (
        <img src={publisher.logoUrl} alt={publisher.businessName} className="storefront-logo" />
      )}

      <h1>{publisher.businessName}</h1>

      {publisher.description && <FormattedText className="storefront-description" text={publisher.description} />}

      <ShareButtons url={canonicalUrl} title={publisher.businessName} />

      <h2>Published Documents</h2>

      {listings.length === 0 ? (
        <p className="storefront-empty">No listings published yet.</p>
      ) : (
        <ListingGrid listings={listings} publisherSlug={publisher.slug} />
      )}
    </div>
  );
};

export default PublisherStorefront;
