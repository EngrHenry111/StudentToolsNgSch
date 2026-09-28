import { useState, useContext } from "react";
import { loginUser, googleAuth } from "../../../apiQuiz/authApi";
import { AuthContext } from "../../../contextQuiz/AuthContext";
import GoogleSignInButton from "../../../componentsQuiz/GoogleSignInButton";
import { Link, useNavigate } from "react-router-dom";
import "./QuizLogin.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await loginUser(form);

      if (res.accessToken) {
        login(res.accessToken, res.refreshToken, res.user);
        navigate("/pro/dashboard");
      } else {
        setError(res.message || "Login failed. Please check your details.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Unused while GoogleSignInButton is commented out below — kept ready
  // for when it's re-enabled.
  // eslint-disable-next-line no-unused-vars
  const handleGoogleSuccess = async (credential) => {
    setError("");
    setSubmitting(true);
    try {
      const res = await googleAuth(credential);
      if (res.accessToken) {
        login(res.accessToken, res.refreshToken, res.user);
        navigate("/pro/dashboard");
      } else {
        setError(res.message || "Google sign-in failed.");
      }
    } catch (err) {
      setError(err.message || "Google sign-in failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Login to Pro</h2>
        <p className="login-subtitle">
          Access adaptive quizzes, analytics, and more.
        </p>

        {error && <div className="login-error">{error}</div>}

        {/*
          Temporarily silenced: Google rejects this with "The given origin
          is not allowed for the given client ID" until the current
          origin is added to the OAuth client's Authorized JavaScript
          origins in Google Cloud Console. Re-enable by uncommenting once
          that's done — handleGoogleSuccess and the /auth/google endpoint
          are untouched and ready.
        <GoogleSignInButton
          onSuccess={handleGoogleSuccess}
          onError={(msg) => setError(msg)}
        />

        <div className="login-divider"><span>or</span></div>
        */}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          autoComplete="email"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          autoComplete="current-password"
        />

        <p className="login-forgot">
          <Link to="/forgot-password">Forgot password?</Link>
        </p>

        <button type="submit" disabled={submitting}>
          {submitting ? "Logging in..." : "Login"}
        </button>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
