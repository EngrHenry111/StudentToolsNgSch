import { useEffect, useState, useContext } from "react";
import { getBilling, cancelSubscription, subscribe, getLaunchOffer } from "../apiQuiz/paymentApi";
import { updateNotificationPreferences } from "../apiQuiz/authApi";
import { AuthContext } from "../contextQuiz/AuthContext";
import Loader from "../componentsQuiz/Loader";
import "./proquiz.css";

const Billing = () => {
  const { user, refreshProfile } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savingPrefs, setSavingPrefs] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [billingRes, offerRes] = await Promise.all([
        getBilling(),
        getLaunchOffer().catch(() => null) // don't block billing if this fails
      ]);
      setData(billingRes);
      setOffer(offerRes);
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

  const handleToggleStreakReminders = async () => {
    setSavingPrefs(true);
    try {
      await updateNotificationPreferences(!user?.notificationPreferences?.streakReminders);
      await refreshProfile();
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingPrefs(false);
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
              {offer?.active && (
                <div className="pq-topic-row" style={{
                  marginBottom: 20,
                  border: "1px solid rgba(0,245,255,0.4)",
                  background: "rgba(0,245,255,0.06)"
                }}>
                  <h4 style={{ margin: "0 0 8px", color: "#00f5ff" }}>
                    🚀 Launch Offer — ₦{offer.price.toLocaleString()}/month
                    <span style={{ color: "#94a3b8", fontWeight: 400, fontSize: 13 }}>
                      {" "}(regularly ₦{offer.regularPrice.toLocaleString()})
                    </span>
                  </h4>
                  <p style={{ margin: 0, fontSize: 13, color: "#cbd5e1" }}>
                    {offer.spotsRemaining} spot{offer.spotsRemaining === 1 ? "" : "s"} left at this price
                    {offer.endsAt && (
                      <> · ends {new Date(offer.endsAt).toLocaleDateString()}</>
                    )}
                  </p>
                </div>
              )}

              <div className="pq-topic-row" style={{ marginBottom: 20 }}>
                <h4 style={{ margin: "0 0 8px" }}>
                  {offer?.active ? (
                    <>
                      <span style={{ textDecoration: "line-through", color: "#94a3b8", marginRight: 8 }}>
                        ₦{offer.regularPrice.toLocaleString()}
                      </span>
                      ₦{offer.price.toLocaleString()}/month
                    </>
                  ) : (
                    "Pro plan — ₦5,000/month"
                  )}
                </h4>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#cbd5e1" }}>
                  <li>Unlimited AI-generated quizzes</li>
                  <li>Curated WAEC & JAMB past-question practice</li>
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

        <div className="pq-card">
          <h4 className="pq-section-title">Notifications</h4>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ margin: 0, fontSize: 14, color: "#e2e8f0" }}>Streak reminder emails</p>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "#94a3b8" }}>
                Get a friendly nudge if you haven't studied yet and your streak is at risk.
              </p>
            </div>
            <button
              className="pq-btn"
              onClick={handleToggleStreakReminders}
              disabled={savingPrefs}
              style={{
                background: user?.notificationPreferences?.streakReminders
                  ? "linear-gradient(90deg, #00f5ff, #7b2ff7)"
                  : undefined,
                color: user?.notificationPreferences?.streakReminders ? "#04040a" : undefined,
                minWidth: 70
              }}
            >
              {savingPrefs ? "..." : user?.notificationPreferences?.streakReminders ? "On" : "Off"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
