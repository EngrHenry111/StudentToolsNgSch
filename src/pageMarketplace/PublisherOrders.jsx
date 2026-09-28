import { useEffect, useState } from "react";
import { getMyOrders } from "../apiMarketplace/publisherApi";
import Loader from "../componentsQuiz/Loader";
import "../pageQuiz/proquiz.css";
import "./marketplace.css";

const nairaFromKobo = (kobo) => `₦${(kobo / 100).toLocaleString()}`;

const statusLabel = {
  completed: "Paid",
  pending: "Pending",
  failed: "Failed"
};

const PublisherOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader fullPage label="Loading your orders..." />;
  }

  return (
    <div className="pq-page">
      <div className="pq-container">
        <div className="pq-card">
          <h1>Orders</h1>
          <p className="pq-subtitle" style={{ marginBottom: 0 }}>
            Every purchase of your listings — your own orders only.
          </p>

          {orders.length === 0 ? (
            <p style={{ color: "#94a3b8", marginTop: 20 }}>No orders yet.</p>
          ) : (
            <div className="mkt-table" style={{ marginTop: 16 }}>
              {orders.map((o) => (
                <div key={o._id} className="mkt-table-row" style={{ gridTemplateColumns: "2fr 1.4fr 1fr 1fr 1fr" }}>
                  <span>{o.listing?.title || "(listing removed)"}</span>
                  <span>{o.buyer?.username || "—"}</span>
                  <span>{nairaFromKobo(o.publisherAmount)}</span>
                  <span>{o.status === "completed" ? statusLabel.completed : statusLabel[o.status]}</span>
                  <span>{new Date(o.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublisherOrders;
