import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contextQuiz/AuthContext";
import { getAnalytics } from "../../apiQuiz/quizApi";
import Loader from "../../componentsQuiz/Loader";
import "../proquiz.css";
import "./dash.css";

const quizModes = [
  { to: "/pro/quiz/ai", title: "AI Quiz", desc: "Pick a subject and topic, get fresh AI-generated questions." },
  { to: "/pro/quiz/adaptive", title: "Adaptive Quiz", desc: "Questions weighted toward the topics you're weakest in." },
  { to: "/pro/quiz/mixed", title: "Mixed Quiz", desc: "A random spread of questions across every subject." },
  { to: "/pro/analytics", title: "Analytics", desc: "See your accuracy, weak topics, and progress over time." },
  { to: "/pro/leaderboard", title: "Leaderboard", desc: "See how your XP stacks up against other students." },
  { to: "/pro/billing", title: "Billing", desc: "Manage your Pro subscription." },
];

const Dashboard = () => {
  const { user, isPremium } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalytics()
      .then((data) => setStats(data.overall))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="dashboard-page pq-page">
      <div className="dashboard-card pq-card">
        <div className="pq-greeting">
          <div>
            <h1>Welcome back{user ? `, ${user.username}` : ""} 👋</h1>
            <p className="pq-subtitle" style={{ marginBottom: 0 }}>
              {isPremium
                ? "You're on the Pro plan — unlimited AI quizzes."
                : "You're on the free plan — upgrade for unlimited AI quizzes."}
            </p>
          </div>
        </div>

        {loading ? (
          <Loader label="Loading your stats..." />
        ) : (
          <div className="pq-stats-row">
            <span className="pq-badge pq-badge-xp">⚡ {stats?.xp ?? 0} XP</span>
            <span className="pq-badge pq-badge-level">🏅 Level {stats?.level ?? 1}</span>
            <span className="pq-badge pq-badge-streak">🔥 {stats?.streak ?? 0} day streak</span>
            <span className={`pq-badge ${isPremium ? "pq-badge-premium" : "pq-badge-free"}`}>
              {isPremium ? "PRO PLAN" : "FREE PLAN"}
            </span>
          </div>
        )}

        <div className="dashboard-links">
          {quizModes.map((m) => (
            <Link to={m.to} key={m.to} className="dashboard-mode-link">
              <strong>{m.title}</strong>
              <span>{m.desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
