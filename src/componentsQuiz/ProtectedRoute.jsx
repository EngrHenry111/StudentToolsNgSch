import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contextQuiz/AuthContext";
import Loader from "./Loader";

// requirePremium: when true, non-premium users are redirected to billing
// instead of being let into a Pro-only quiz mode (e.g. Adaptive/Mixed).
const ProtectedRoute = ({ children, requirePremium = false }) => {
  const { isAuthenticated, isPremium, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader fullPage label="Checking your session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requirePremium && !isPremium) {
    return <Navigate to="/pro/billing" replace />;
  }

  return children;
};

export default ProtectedRoute;
