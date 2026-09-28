import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getListingBySlug, initiatePurchase } from "../../apiMarketplace/marketplaceApi";
import { AuthContext } from "../../contextQuiz/AuthContext";
import NotFound from "../notFound/NotFound";
import "./listingDetail.css";

const SITE = "https://studenttoolsng.com";

const ListingDetail = () => {
  const { slug, listingSlug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const [listing, setListing] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Deferred into a microtask rather than called synchronously here —
    // still resets the page's state on every slug change (so navigating
    // between listings doesn't briefly show the previous one's error/
    // not-found state), just via a callback instead of the effect body's
    // own synchronous execution.
    Promise.resolve().then(() => {
      setLoading(true);
      setNotFound(false);
      setError(null);
    });

    getListingBySlug(slug, listingSlug)
      .then(setListing)
      .catch((err) => {
        if (err.message?.includes("404") || /not found/i.test(err.message || "")) {
          setNotFound(true);
        }
      })
      .finally(() => setLoading(false));
  }, [slug, listingSlug]);

  const handleUnlock = async () => {
    if (!isAuthenticated) {
      navigate(`/login?next=/publishers/${slug}/${listingSlug}`);
      return;
    }

    setError(null);
    setPurchasing(true);
    try {
      const res = await initiatePurchase(listing._id);
      window.location.href = res.authorization_url;
    } catch (err) {
      setError(err.message || "Could not start payment. Please try again.");
      setPurchasing(false);
    }
  };

  if (notFound) {
    return <NotFound />;
  }

  if (loading || !listing) {
    return (
      <div className="listing-page">
        <Helmet>
          <title>Loading document… | StudentToolsNG</title>
        </Helmet>
        <p>Loading...</p>
      </div>
    );
  }

  const canonicalUrl = `${SITE}/publishers/${slug}/${listingSlug}`;
  const title = `${listing.title} | ${listing.field} | StudentToolsNG Marketplace`;
  const description = `${listing.title} — a ${listing.field} document by ${listing.publisher.businessName} on StudentToolsNG. ${(listing.keywords || []).join(", ")}`.trim();
  const priceNaira = (listing.price / 100).toFixed(2);

  return (
    <div className="listing-page">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={listing.coverImageUrl || `${SITE}/logoH.png`} />
        <meta property="og:site_name" content="StudentToolsNG" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: listing.title,
            description,
            about: listing.field,
            keywords: (listing.keywords || []).join(", "),
            author: {
              "@type": "Organization",
              name: listing.publisher.businessName,
              url: `${SITE}/publishers/${listing.publisher.slug}`
            },
            ...(listing.coverImageUrl ? { image: listing.coverImageUrl } : {}),
            offers: {
              "@type": "Offer",
              price: priceNaira,
              priceCurrency: "NGN",
              availability: "https://schema.org/InStock",
              url: canonicalUrl
            }
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE },
              { "@type": "ListItem", position: 2, name: listing.publisher.businessName, item: `${SITE}/publishers/${slug}` },
              { "@type": "ListItem", position: 3, name: listing.title, item: canonicalUrl }
            ]
          })}
        </script>
      </Helmet>

      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to={`/publishers/${slug}`}>{listing.publisher.businessName}</Link> / <span>{listing.title}</span>
      </div>

      {listing.coverImageUrl && (
        <img src={listing.coverImageUrl} alt={listing.title} className="listing-cover" />
      )}

      <h1>{listing.title}</h1>
      <p className="listing-field">{listing.field}</p>

      <div className="listing-content" dangerouslySetInnerHTML={{ __html: listing.previewContent }} />

      {listing.owned && listing.fullContent ? (
        <>
          <h2>Full Document</h2>
          <div className="listing-content" dangerouslySetInnerHTML={{ __html: listing.fullContent }} />
        </>
      ) : (
        <div className="listing-unlock-box">
          <h2>Unlock the Full Document</h2>
          <p>Get instant access to the complete document for ₦{Number(priceNaira).toLocaleString()}.</p>

          {error && <div className="listing-error">{error}</div>}

          <button className="listing-unlock-btn" onClick={handleUnlock} disabled={purchasing}>
            {purchasing ? "Redirecting to payment..." : `Unlock Full Document — ₦${Number(priceNaira).toLocaleString()}`}
          </button>
        </div>
      )}
    </div>
  );
};

export default ListingDetail;
