import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getBanks, registerPublisher, getMyPublisherProfile } from "../apiMarketplace/publisherApi";
import { AuthContext } from "../contextQuiz/AuthContext";
import Loader from "../componentsQuiz/Loader";
import "../pageQuiz/proquiz.css";

// Mirrors CampusOnboarding.jsx's placement and pattern exactly: reached
// by an already-authenticated user via a "Become a Publisher" entry
// point, still under the standard AuthLayout/quiz-nav chrome. Auto-
// activates on submit — no admin review step, no separate login.
const PublisherOnboarding = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // null = still checking; "none" = no workspace on THIS account.
  const [existing, setExisting] = useState(null);

  const [banks, setBanks] = useState([]);
  const [loadingBanks, setLoadingBanks] = useState(true);

  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // An existing publisher landing here (old bookmark, stale link) goes
  // straight to their workspace instead of seeing the signup form again.
  useEffect(() => {
    getMyPublisherProfile()
      .then((publisher) => {
        if (publisher?.status === "active") {
          navigate("/publisher/dashboard", { replace: true });
        } else {
          setExisting(publisher || "none");
        }
      })
      // Can't tell right now — fall back to showing the form; the server
      // still refuses a second workspace for the same account.
      .catch(() => setExisting("none"));
  }, [navigate]);

  const handleSwitchAccount = () => {
    logout();
    navigate("/login?next=/publisher/dashboard");
  };

  useEffect(() => {
    getBanks()
      .then(setBanks)
      .catch(() => setError("Could not load the bank list. Please refresh and try again."))
      .finally(() => setLoadingBanks(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!businessName.trim()) {
      setError("Please enter your business/publisher name.");
      return;
    }
    if (!bankCode) {
      setError("Please select your bank.");
      return;
    }
    if (!/^\d{10}$/.test(accountNumber.trim())) {
      setError("Please enter a valid 10-digit account number.");
      return;
    }

    const selectedBank = banks.find((b) => b.code === bankCode);

    setSubmitting(true);
    try {
      const res = await registerPublisher({
        businessName: businessName.trim(),
        description: description.trim(),
        bankName: selectedBank?.name || "",
        bankCode,
        accountNumber: accountNumber.trim()
      });

      navigate(`/publisher/dashboard?slug=${res.publisher.slug}`, { replace: true });
    } catch (err) {
      setError(err.message || "Could not set up your publisher workspace. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (existing && existing !== "none") {
    return (
      <div className="pq-page">
        <div className="pq-container">
          <div className="pq-card">
            <h2 className="pq-title">Publisher workspace suspended</h2>
            <p className="pq-subtitle">
              The publisher workspace on this account ({existing.businessName}) is
              currently suspended. Please contact support.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loadingBanks || existing === null) {
    return (
      <div className="pq-page">
        <Loader fullPage label="Loading..." />
      </div>
    );
  }

  return (
    <div className="pq-page">
      <div className="pq-container">
        <div className="pq-card">
          <h2 className="pq-title">Become a Publisher</h2>
          <p className="pq-subtitle">
            List research documents for sale — free chapter 1 &amp; 2 preview,
            paid full unlock. You're paid directly through your own bank
            account via Paystack; the platform takes a flat commission on
            every sale. Your workspace activates immediately once your bank
            account is verified — no waiting on approval.
          </p>

          {user && (
            <div className="pq-topic-row" style={{ marginBottom: 16, fontSize: 13 }}>
              Logged in as <strong>{user.username}</strong>
              {user.email ? ` (${user.email})` : ""}. Already a publisher on a
              different account?{" "}
              <button
                type="button"
                onClick={handleSwitchAccount}
                style={{ background: "none", border: "none", padding: 0, color: "inherit", font: "inherit", fontWeight: 600, textDecoration: "underline", cursor: "pointer" }}
              >
                Log in with that account
              </button>
            </div>
          )}

          {error && <div className="pq-error-box">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="pq-field">
              <label>Business / Publisher Name</label>
              <input
                className="pq-input"
                placeholder="e.g. Ada Research Publishing"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>

            <div className="pq-field">
              <label>Description (optional)</label>
              <textarea
                className="pq-input"
                placeholder="A short description of what you publish"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="pq-field-row">
              <div className="pq-field">
                <label>Bank</label>
                <select value={bankCode} onChange={(e) => setBankCode(e.target.value)}>
                  <option value="" disabled>Select your bank</option>
                  {banks.map((b) => (
                    <option key={b.code} value={b.code}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div className="pq-field">
                <label>Account Number</label>
                <input
                  className="pq-input"
                  placeholder="e.g. 0123456789"
                  value={accountNumber}
                  maxLength={10}
                  inputMode="numeric"
                  onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
                />
                <small style={{ color: "#94a3b8" }}>
                  Enter your 10-digit bank account number. Not your phone number.
                </small>
              </div>
            </div>

            <button type="submit" className="pq-btn pq-btn-primary pq-btn-block" disabled={submitting}>
              {submitting ? "Verifying your account..." : "Activate Publisher Workspace"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PublisherOnboarding;
