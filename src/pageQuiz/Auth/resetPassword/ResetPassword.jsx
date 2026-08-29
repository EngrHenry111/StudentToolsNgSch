import { useState } from "react";
import { resetPassword } from "../../../apiQuiz/authApi";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../login/QuizLogin.css";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await resetPassword(token, password);
      setSuccess(res.message);
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      setError(err.message || "This reset link is invalid or has expired.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <p className="login-subtitle">Enter your new password below.</p>

        {error && <div className="login-error">{error}</div>}
        {success && <div className="login-success" style={{ marginBottom: 18 }}>{success}</div>}

        {!success && (
          <>
            <input
              type="password"
              placeholder="New password (min. 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />

            <button type="submit" disabled={submitting}>
              {submitting ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}

        <p>
          <Link to="/login">Back to login</Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
