import { useEffect, useState, useContext } from "react";
import { getBilling, cancelSubscription, subscribe } from "../apiQuiz/paymentApi";
import { AuthContext } from "../contextQuiz/AuthContext";
import Loader from "../componentsQuiz/Loader";
import "./proquiz.css";

const Billing = () => {
  const { refreshProfile } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getBilling();
      setData(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubscribe = async () => {
    setActionLoading(true);
    setError(null);
    try {
      const res = await subscribe();
      if (res.authorization_url) {
        window.location.href = res.authorization_url;
      } else {
        throw new Error(res.message || "Couldn't start checkout. Try again.");
      }
    } catch (err) {
      setError(err.message);
      setActionLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("Cancel your Pro subscription? You'll lose unlimited AI quiz access.")) {
      return;
    }

    setActionLoading(true);
    setError(null);
    try {
      await cancelSubscription();
      await load();
      await refreshProfile();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pq-page">
        <Loader fullPage label="Loading billing info..." />
      </div>
    );
  }

  const isActive = data?.status === "active";

  return (
    <div className="pq-page">
      <div className="pq-container">
        <div className="pq-card">
          <h2 className="pq-title">Billing</h2>
          <p className="pq-subtitle">Manage your Student Tools Pro subscription.</p>

          {error && <div className="pq-error-box">{error}</div>}

          <div className="pq-stats-row">
            <span className={`pq-badge ${isActive ? "pq-badge-premium" : "pq-badge-free"}`}>
              {data?.plan || "Free"} Plan
            </span>
            <span className="pq-badge">
              Status: {data?.status || "inactive"}
            </span>
          </div>

          {data?.email && (
            <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 20 }}>
              Billed to: {data.email}
            </p>
          )}

          {isActive && data?.nextBillingDate && (
            <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 20 }}>
              Next billing date: {new Date(data.nextBillingDate).toLocaleDateString()}
            </p>
          )}

          {!isActive ? (
            <>
              <div className="pq-topic-row" style={{ marginBottom: 20 }}>
                <h4 style={{ margin: "0 0 8px" }}>Pro plan — ₦5,000/month</h4>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#cbd5e1" }}>
                  <li>Unlimited AI-generated quizzes</li>
                  <li>Adaptive quizzes targeting your weak topics</li>
                  <li>Full performance analytics</li>
                  <li>Leaderboard access</li>
                </ul>
              </div>
              <button
                className="pq-btn pq-btn-primary pq-btn-block"
                onClick={handleSubscribe}
                disabled={actionLoading}
              >
                {actionLoading ? "Redirecting to checkout..." : "Upgrade to Pro"}
              </button>
            </>
          ) : (
            <button
              className="pq-btn pq-btn-danger pq-btn-block"
              onClick={handleCancel}
              disabled={actionLoading}
            >
              {actionLoading ? "Cancelling..." : "Cancel Subscription"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Billing;
