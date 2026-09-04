import { useState, useContext } from "react";
import { registerUser, googleAuth } from "../../../apiQuiz/authApi";
import { AuthContext } from "../../../contextQuiz/AuthContext";
import GoogleSignInButton from "../../../componentsQuiz/GoogleSignInButton";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./QuizRegister.css";

const Register = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("ref");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.username || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await registerUser({ ...form, referralCode });

      if (res.message && res.message.toLowerCase().includes("registered")) {
        setSuccess("Account created! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1200);
      } else {
        setError(res.message || "Registration failed.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (credential) => {
    setError("");
    setSubmitting(true);
    try {
      const res = await googleAuth(credential);
      if (res.accessToken) {
        // Google sign-up logs you straight in — no separate verify step needed
        login(res.accessToken, res.refreshToken, res.user);
        navigate("/pro/dashboard");
      } else {
        setError(res.message || "Google sign-up failed.");
      }
    } catch (err) {
      setError(err.message || "Google sign-up failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-page">
      <form className="register-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p className="register-subtitle">
          Join Student Tools Pro for adaptive AI-powered quizzes.
        </p>

        {error && <div className="register-error">{error}</div>}
        {success && <div className="register-success">{success}</div>}
        {referralCode && !error && !success && (
          <div className="register-success" style={{ marginBottom: 16 }}>
            🎁 You've been invited! Sign up now to get a +20 XP welcome bonus.
          </div>
        )}

        <GoogleSignInButton
          onSuccess={handleGoogleSuccess}
          onError={(msg) => setError(msg)}
        />

        <div className="register-divider"><span>or</span></div>

        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          autoComplete="username"
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          autoComplete="email"
        />

        <input
          type="password"
          placeholder="Password (min. 6 characters)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          autoComplete="new-password"
        />

        <button type="submit" disabled={submitting}>
          {submitting ? "Creating account..." : "Register"}
        </button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
