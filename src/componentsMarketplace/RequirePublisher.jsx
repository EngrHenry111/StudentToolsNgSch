import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contextQuiz/AuthContext";
import { getMyPublisherProfile } from "../apiMarketplace/publisherApi";
import Loader from "../componentsQuiz/Loader";

// Same shape as ProtectedRoute (requires login), plus a second check the
// generic guard can't do on its own: does this user actually HAVE a
// publisher workspace yet? A logged-in student with no workspace gets
// sent to onboarding instead of a broken/empty dashboard.
const RequirePublisher = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useContext(AuthContext);
  const [publisher, setPublisher] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Not authenticated: nothing to check, but the setState is still
    // deferred into a microtask rather than called synchronously here —
    // an effect body should only ever set state from a callback, never
    // directly in its own synchronous execution.
    if (!isAuthenticated) {
      Promise.resolve().then(() => setChecking(false));
      return;
    }

    getMyPublisherProfile()
      .then(setPublisher)
      .finally(() => setChecking(false));
  }, [isAuthenticated]);

  if (authLoading || checking) {
    return <Loader fullPage label="Loading your publisher workspace..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!publisher) {
    return <Navigate to="/publisher/onboarding" replace />;
  }

  if (publisher.status !== "active") {
    return <Navigate to="/publisher/onboarding" replace />;
  }

  return children;
};

export default RequirePublisher;
