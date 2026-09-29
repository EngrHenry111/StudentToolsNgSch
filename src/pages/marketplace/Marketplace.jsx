import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { searchListings } from "../../apiMarketplace/marketplaceApi";
import { ListingGrid } from "../../componentsMarketplace/ListingCard";
import ShareButtons from "../../componentsMarketplace/ShareButtons";
import "../publisherStorefront/publisherStorefront.css";
import "./marketplace.css";

const SITE = "https://studenttoolsng.com";

// The Research Library: every published document from every active
// publisher in one searchable place. Search and filter live in the URL
// (?q=&field=) so results are shareable and the back button works.
// Only the bare /marketplace URL is indexable — filtered/search views
// are noindex (thin, near-duplicate pages; same rule as tutorial
// category pages).
const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const field = searchParams.get("field") || "";

  const [input, setInput] = useState(q);
  const [data, setData] = useState(null);
  const [extra, setExtra] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.resolve().then(() => {
      setLoading(true);
      setError(null);
      setExtra([]);
      setPage(1);
      setInput(q);
    });

    searchListings({ q, field })
      .then(setData)
      .catch((err) => setError(err.message || "Could not load the library."))
      .finally(() => setLoading(false));
  }, [q, field]);

  const updateParams = (next) => {
    const params = {};
    const nq = next.q ?? q;
    const nf = next.field ?? field;
    if (nq) params.q = nq;
    if (nf) params.field = nf;
    setSearchParams(params);
  };

  const onSearch = (e) => {
    e.preventDefault();
    updateParams({ q: input.trim() });
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setLoadingMore(true);
    searchListings({ q, field, page: nextPage })
      .then((res) => {
        setExtra((prev) => [...prev, ...res.listings]);
        setPage(nextPage);
      })
      .catch(() => {})
      .finally(() => setLoadingMore(false));
  };

  const listings = data ? [...data.listings, ...extra] : [];
  const isFiltered = Boolean(q || field);
  const title = "Research Library — Project Materials & Research Documents | StudentToolsNG";
  const description =
    "Browse and buy research documents, project materials and study guides from Nigerian publishers. Free chapter preview on every document.";

  return (
    <div className="storefront-page">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE}/marketplace`} />
        {isFiltered && <meta name="robots" content="noindex,follow" />}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE}/marketplace`} />
        <meta property="og:image" content={`${SITE}/og-image.png`} />
        <meta property="og:site_name" content="StudentToolsNG" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="breadcrumb">
        <Link to="/">Home</Link> / <span>Research Library</span>
      </div>

      <h1>Research Library</h1>
      <p className="storefront-description">
        Project materials, research documents and study guides from independent
        publishers. Read chapters 1 &amp; 2 free on every document — unlock the
        full work when it's what you need.
      </p>

      <form className="library-search" onSubmit={onSearch} role="search">
        <input
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search by topic, course or keyword…"
          aria-label="Search the Research Library"
        />
        <button type="submit">Search</button>
      </form>

      {data?.fields?.length > 0 && (
        <div className="library-fields" aria-label="Filter by field">
          <button
            type="button"
            className={`library-chip${!field ? " active" : ""}`}
            onClick={() => updateParams({ field: "" })}
          >
            All fields
          </button>
          {data.fields.map((f) => (
            <button
              key={f}
              type="button"
              className={`library-chip${field.toLowerCase() === f.toLowerCase() ? " active" : ""}`}
              onClick={() => updateParams({ field: f })}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <p className="storefront-empty">Loading documents…</p>
      ) : error ? (
        <p className="storefront-empty">{error}</p>
      ) : listings.length === 0 ? (
        <div className="library-empty">
          <p>No documents found{q ? ` for "${q}"` : ""}.</p>
          {isFiltered && (
            <button type="button" className="library-chip" onClick={() => setSearchParams({})}>
              Clear search
            </button>
          )}
        </div>
      ) : (
        <>
          <p className="library-count">
            {data.total} document{data.total === 1 ? "" : "s"}
            {q ? ` matching "${q}"` : ""}
            {field ? ` in ${field}` : ""}
          </p>
          <ListingGrid listings={listings} />
          {page < data.pages && (
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <button type="button" className="library-chip" onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? "Loading…" : "Load more"}
              </button>
            </div>
          )}
        </>
      )}

      <div className="library-cta">
        <h2>Have research or project work to sell?</h2>
        <p>
          Publish it here, set your price, and get paid straight to your bank
          account every time someone unlocks it.
        </p>
        <Link to="/publisher/dashboard" className="library-cta-btn">Publish &amp; Earn</Link>
      </div>

      <ShareButtons url={`${SITE}/marketplace`} title="Research Library" />
    </div>
  );
};

export default Marketplace;
