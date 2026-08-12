import { useState, useContext } from "react";
import { loginUser } from "../../../apiQuiz/authApi";
import { AuthContext } from "../../../contextQuiz/AuthContext";
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

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Login to Pro</h2>
        <p className="login-subtitle">
          Access adaptive quizzes, analytics, and more.
        </p>

        {error && <div className="login-error">{error}</div>}

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
