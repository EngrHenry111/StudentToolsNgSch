import { useState } from "react";
import { forgotPassword } from "../../../apiQuiz/authApi";
import { Link } from "react-router-dom";
import "../login/QuizLogin.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await forgotPassword(email.trim());
      setMessage(res.message);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <p className="login-subtitle">
          Enter your email and we'll send you a link to reset your password.
        </p>

        {error && <div className="login-error">{error}</div>}
        {submitted && <div className="login-success" style={{ marginBottom: 18 }}>{message}</div>}

        {!submitted && (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <button type="submit" disabled={submitting}>
              {submitting ? "Sending..." : "Send Reset Link"}
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

export default ForgotPassword;
