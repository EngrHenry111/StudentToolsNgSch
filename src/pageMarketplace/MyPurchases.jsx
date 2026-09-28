import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyPurchases } from "../apiMarketplace/marketplaceApi";
import Loader from "../componentsQuiz/Loader";
import "../pageQuiz/proquiz.css";
import "./marketplace.css";

const nairaFromKobo = (kobo) => `₦${(kobo / 100).toLocaleString()}`;

// The buyer's side of the marketplace: every document they've paid for,
// each linking back to its listing page, which the server unlocks for
// this account only.
const MyPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMyPurchases()
      .then(setPurchases)
      .catch((err) => setError(err.message || "Could not load your purchases."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader fullPage label="Loading your purchases..." />;
  }

  return (
    <div className="pq-page">
      <div className="pq-container">
        <div className="pq-card">
          <h1>My Purchases</h1>
          <p className="pq-subtitle" style={{ marginBottom: 0 }}>
            Documents you've unlocked. They stay unlocked on your account —
            just log in and open them from here.
          </p>

          {error && <div className="pq-error-box" style={{ marginTop: 16 }}>{error}</div>}

          {!error && purchases.length === 0 ? (
            <p style={{ color: "#94a3b8", marginTop: 20 }}>
              You haven't bought any documents yet.
            </p>
          ) : (
            <div className="mkt-table" style={{ marginTop: 16 }}>
              {purchases.map((p) => (
                <div key={p._id} className="mkt-table-row" style={{ gridTemplateColumns: "2fr 1.4fr 1fr 1fr" }}>
                  <span>
                    <Link to={`/publishers/${p.publisher.slug}/${p.listing.slug}`}>
                      {p.listing.title}
                    </Link>
                  </span>
                  <span>
                    <Link to={`/publishers/${p.publisher.slug}`}>{p.publisher.businessName}</Link>
                  </span>
                  <span>{nairaFromKobo(p.amount)}</span>
                  <span>{p.purchasedAt ? new Date(p.purchasedAt).toLocaleDateString() : "—"}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPurchases;
