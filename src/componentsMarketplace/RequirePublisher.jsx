import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contextQuiz/AuthContext";
import { getMyPublisherProfile } from "../apiMarketplace/publisherApi";
import Loader from "../componentsQuiz/Loader";
import "../pageQuiz/proquiz.css";

// Same shape as ProtectedRoute (requires login), plus a second check the
// generic guard can't do on its own: does this user actually HAVE a
// publisher workspace yet? A logged-in student with no workspace gets
// sent to onboarding instead of a broken/empty dashboard.
//
// Only a real "no workspace" answer (getMyPublisherProfile → null) sends
// the user to onboarding. A failed check (Render waking up, network blip,
// 500) shows a retry instead — previously any failure looked like "no
// workspace" and bounced existing publishers to "Become a Publisher".
const RequirePublisher = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useContext(AuthContext);
  const [publisher, setPublisher] = useState(null);
  const [checking, setChecking] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    // Not authenticated: nothing to check, but the setState is still
    // deferred into a microtask rather than called synchronously here —
    // an effect body should only ever set state from a callback, never
    // directly in its own synchronous execution.
    if (!isAuthenticated) {
      Promise.resolve().then(() => setChecking(false));
      return;
    }

    Promise.resolve().then(() => {
      setChecking(true);
      setLoadError(null);
    });

    getMyPublisherProfile()
      .then(setPublisher)
      .catch((err) => setLoadError(err.message || "Could not load your publisher workspace."))
      .finally(() => setChecking(false));
  }, [isAuthenticated, attempt]);

  if (authLoading || checking) {
    return <Loader fullPage label="Loading your publisher workspace..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login?next=/publisher/dashboard" replace />;
  }

  if (loadError) {
    return (
      <div className="pq-page">
        <div className="pq-container">
          <div className="pq-card">
            <h2 className="pq-title">Couldn't load your publisher workspace</h2>
            <p className="pq-subtitle">
              The server may be waking up — this can take up to a minute. Your
              workspace and listings are safe.
            </p>
            <div className="pq-error-box">{loadError}</div>
            <button className="pq-btn pq-btn-primary" onClick={() => setAttempt((a) => a + 1)}>
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!publisher || publisher.status !== "active") {
    return <Navigate to="/publisher/onboarding" replace />;
  }

  return children;
};

export default RequirePublisher;
