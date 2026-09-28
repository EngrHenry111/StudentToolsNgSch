import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { getMyOverview } from "../apiMarketplace/publisherApi";
import Loader from "../componentsQuiz/Loader";
import "../pageQuiz/proquiz.css";
import "./marketplace.css";

const nairaFromKobo = (kobo) => `₦${(kobo / 100).toLocaleString()}`;

const PublisherDashboard = () => {
  const { publisher } = useOutletContext();
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOverview()
      .then(setOverview)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader fullPage label="Loading your workspace..." />;
  }

  return (
    <div className="pq-page">
      <div className="pq-container">
        <div className="pq-card">
          <h1>Welcome back{publisher ? `, ${publisher.businessName}` : ""} 👋</h1>
          <p className="pq-subtitle" style={{ marginBottom: 0 }}>
            Your publisher workspace — manage listings, track sales, and see
            what's been paid out directly to your bank account.
          </p>

          <div className="pq-stats-row">
            <span className="pq-badge pq-badge-xp">
              {nairaFromKobo(overview?.totalEarnings || 0)} earned
            </span>
            <span className="pq-badge pq-badge-level">
              {overview?.totalOrders || 0} sales
            </span>
            <span className="pq-badge pq-badge-streak">
              {publisher?.commissionRate}% platform commission
            </span>
          </div>

          {/* Paystack holds every new (or bank-details-changed) subaccount's
              first payout until the admin verifies it by hand, and exposes
              no API for that status — so this explains it rather than
              claiming a state we can't read. */}
          <div className="pq-topic-row" style={{ marginTop: 20, border: "1px solid rgba(0,245,255,0.35)" }}>
            <h4 style={{ margin: "0 0 6px" }}>💳 How you get paid</h4>
            <p style={{ margin: 0, fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>
              Buyers can purchase your listings right away. Your share of each
              sale is paid by Paystack straight to{" "}
              <strong>{publisher?.bankName || "your bank"}</strong>
              {publisher?.accountName ? ` (${publisher.accountName})` : ""}.
              Your <strong>first payout is released after a one-time account
              review</strong> (usually within 1 business day); after that,
              payouts follow Paystack's normal schedule automatically.
            </p>
          </div>

          <div className="dashboard-links" style={{ marginTop: 20 }}>
            <Link to="/publisher/listings" className="dashboard-mode-link">
              <strong>Manage Listings</strong>
              <span>Create, edit, publish or unpublish your listings.</span>
            </Link>
            <Link to="/publisher/listings/new" className="dashboard-mode-link">
              <strong>New Listing</strong>
              <span>List a new document for sale.</span>
            </Link>
            <Link to="/publisher/orders" className="dashboard-mode-link">
              <strong>Orders</strong>
              <span>See who bought what, when, and for how much.</span>
            </Link>
          </div>

          <div className="pq-topic-row" style={{ marginTop: 20 }}>
            <h4 style={{ margin: "0 0 10px" }}>🕒 Recent Orders</h4>

            {!overview?.recentOrders?.length ? (
              <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>No sales yet.</p>
            ) : (
              <div className="mkt-table">
                {overview.recentOrders.map((o) => (
                  <div key={o._id} className="mkt-table-row">
                    <span>{o.listing?.title}</span>
                    <span>{nairaFromKobo(o.publisherAmount)}</span>
                    <span>{new Date(o.purchasedAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublisherDashboard;
