import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getListingBySlug, initiatePurchase } from "../../apiMarketplace/marketplaceApi";
import { AuthContext } from "../../contextQuiz/AuthContext";
import NotFound from "../notFound/NotFound";
import FormattedText from "../../componentsMarketplace/FormattedText";
import ShareButtons from "../../componentsMarketplace/ShareButtons";
import ReviewsSection from "../../componentsMarketplace/ReviewsSection";
import Stars from "../../componentsMarketplace/Stars";
import { ListingGrid } from "../../componentsMarketplace/ListingCard";
import "./listingDetail.css";

const SITE = "https://studenttoolsng.com";

// Google shows ~155 characters of the meta description — use the opening
// of the real (free) preview text, which matches what searchers look for
// far better than a generic template sentence.
const excerpt = (text, max = 155) => {
  const flat = String(text || "").replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ") > 80 ? cut.lastIndexOf(" ") : max).trim()}…`;
};

const ListingDetail = () => {
  const { slug, listingSlug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  // Paystack sends the buyer back here as ?trxref=...&reference=... after
  // paying. Captured once on mount; the server confirms the payment with
  // Paystack while serving the listing, so no separate verify call.
  const [searchParams, setSearchParams] = useSearchParams();
  const [returnedFromPayment] = useState(() => Boolean(searchParams.get("reference")));
  const [reloadKey, setReloadKey] = useState(0);

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
        } else {
          setError(err.message || "Could not load this document. Please refresh.");
        }
      })
      .finally(() => setLoading(false));
  }, [slug, listingSlug, reloadKey]);

  // Quiet re-fetch (no loading screen) after posting a review, so the new
  // average/review appears without the page flashing.
  const refreshListing = () => {
    getListingBySlug(slug, listingSlug).then(setListing).catch(() => {});
  };

  // Once unlocked, drop Paystack's ?reference from the URL so a refresh
  // or shared link is just the clean listing URL.
  useEffect(() => {
    if (listing?.owned && searchParams.get("reference")) {
      setSearchParams({}, { replace: true });
    }
  }, [listing, searchParams, setSearchParams]);

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

  if (!loading && !listing && error) {
    return (
      <div className="listing-page">
        <div className="listing-error">{error}</div>
        <button className="listing-unlock-btn" onClick={() => setReloadKey((k) => k + 1)}>
          Try again
        </button>
      </div>
    );
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
  const description =
    excerpt(listing.previewContent) ||
    `${listing.title} by ${listing.publisher.businessName} — read chapters 1 & 2 free on StudentToolsNG.`;
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
            // Product (not CreativeWork): it's what Google supports for
            // price + star-rating rich results.
            "@type": "Product",
            name: listing.title,
            description,
            category: listing.field,
            brand: {
              "@type": "Organization",
              name: listing.publisher.businessName,
              url: `${SITE}/publishers/${listing.publisher.slug}`
            },
            image: listing.coverImageUrl || `${SITE}/logoH.png`,
            ...(listing.ratingCount > 0
              ? {
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: listing.ratingAverage,
                    reviewCount: listing.ratingCount,
                    bestRating: 5,
                    worstRating: 1
                  }
                }
              : {}),
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
              { "@type": "ListItem", position: 2, name: "Research Library", item: `${SITE}/marketplace` },
              { "@type": "ListItem", position: 3, name: listing.publisher.businessName, item: `${SITE}/publishers/${slug}` },
              { "@type": "ListItem", position: 4, name: listing.title, item: canonicalUrl }
            ]
          })}
        </script>
      </Helmet>

      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/marketplace">Research Library</Link> / <Link to={`/publishers/${slug}`}>{listing.publisher.businessName}</Link> / <span>{listing.title}</span>
      </div>

      {listing.coverImageUrl && (
        <img src={listing.coverImageUrl} alt={listing.title} className="listing-cover" />
      )}

      <h1>{listing.title}</h1>
      <p className="listing-field">
        {listing.field} · by <Link to={`/publishers/${slug}`}>{listing.publisher.businessName}</Link>
        {listing.ratingCount > 0 && (
          <>
            {" · "}
            <a href="#reviews-heading" className="listing-rating-link">
              <Stars value={listing.ratingAverage} count={listing.ratingCount} size={14} />
            </a>
          </>
        )}
      </p>

      <ShareButtons url={canonicalUrl} title={listing.title} />

      {returnedFromPayment && listing.owned && (
        <div className="listing-success">
          ✅ Payment confirmed — the full document is unlocked below. It stays
          unlocked on your account: find it any time under{" "}
          <Link to="/my-purchases">My Purchases</Link>.
        </div>
      )}

      {returnedFromPayment && !listing.owned && (
        <div className="listing-pending">
          {isAuthenticated ? (
            <>
              We're still confirming your payment with Paystack. This usually
              takes a few seconds.{" "}
              <button className="listing-link-btn" onClick={() => setReloadKey((k) => k + 1)}>
                Check again
              </button>
            </>
          ) : (
            <>
              Please{" "}
              <Link to={`/login?next=/publishers/${slug}/${listingSlug}`}>log in</Link>{" "}
              with the account you paid with to open your document.
            </>
          )}
        </div>
      )}

      {listing.owned && !returnedFromPayment && (
        <div className="listing-owned-note">
          ✅ You own this document. <Link to="/my-purchases">My Purchases</Link>
        </div>
      )}

      <FormattedText className="listing-content" text={listing.previewContent} />

      {listing.owned && listing.fullContent ? (
        <>
          <h2>Full Document</h2>
          <FormattedText className="listing-content" text={listing.fullContent} />
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

      <ReviewsSection listing={listing} onChange={refreshListing} />

      {listing.moreFromPublisher?.length > 0 && (
        <section className="listing-more">
          <h2>
            More from {listing.publisher.businessName}{" "}
            <Link to={`/publishers/${slug}`} className="listing-more-link">View storefront →</Link>
          </h2>
          <ListingGrid listings={listing.moreFromPublisher} />
        </section>
      )}

      {listing.related?.length > 0 && (
        <section className="listing-more">
          <h2>
            Related {listing.field} documents{" "}
            <Link to={`/marketplace?field=${encodeURIComponent(listing.field)}`} className="listing-more-link">
              Browse all →
            </Link>
          </h2>
          <ListingGrid listings={listing.related} />
        </section>
      )}
    </div>
  );
};

export default ListingDetail;
