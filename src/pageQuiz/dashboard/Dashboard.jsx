import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contextQuiz/AuthContext";
import { getAnalytics } from "../../apiQuiz/quizApi";
import { getTodaysMissions } from "../../apiQuiz/missionsApi";
import Loader from "../../componentsQuiz/Loader";
import AchievementCard from "../../componentsQuiz/AchievementCard";
import "../proquiz.css";
import "./dash.css";

const quizModes = [
  { to: "/pro/study-coach", title: "Study Coach", desc: "Your academic health, weak spots, and a real plan for today." },
  { to: "/pro/quiz/ai", title: "AI Quiz", desc: "Pick a subject and topic, get fresh AI-generated questions." },
  { to: "/pro/quiz/adaptive", title: "Adaptive Quiz", desc: "Questions weighted toward the topics you're weakest in." },
  { to: "/pro/quiz/mixed", title: "Mixed Quiz", desc: "A random spread of questions across every subject." },
  { to: "/pro/quiz/past-questions", title: "Past Questions", desc: "Curated, exam-style WAEC & JAMB practice questions." },
  { to: "/pro/quiz/material", title: "Material Quiz", desc: "Upload your own notes — get a quiz built strictly from your material." },
  { to: "/pro/course-tutor", title: "Course Tutor", desc: "Ask questions about a specific course — with memory of your conversation." },
  { to: "/pro/career-coach", title: "Career Coach", desc: "Get a real roadmap from where you are to your career goal." },
  { to: "/pro/analytics", title: "Analytics", desc: "See your accuracy, weak topics, and progress over time." },
  { to: "/pro/leaderboard", title: "Leaderboard", desc: "See how your XP stacks up against other students." },
  { to: "/pro/referral", title: "Invite Friends", desc: "Share your link — earn XP for every friend who joins." },
  { to: "/pro/billing", title: "Billing", desc: "Manage your Pro subscription." },
];

const Dashboard = () => {
  const { user, isPremium } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [missions, setMissions] = useState(null);

  useEffect(() => {
    getAnalytics()
      .then((data) => setStats(data.overall))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));

    getTodaysMissions()
      .then(setMissions)
      .catch(() => setMissions(null));
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

        {!user?.campus?.onboarded && (
          <div className="pq-topic-row" style={{ marginTop: 18, border: "1px solid rgba(0,245,255,0.35)" }}>
            <h4 style={{ margin: "0 0 6px" }}>🎓 Studying at a university?</h4>
            <p style={{ margin: "0 0 12px", fontSize: 13, color: "#94a3b8" }}>
              Set up your campus profile to unlock university-focused features —
              starts with Miva, but works for any institution.
            </p>
            <Link to="/pro/campus/onboarding" className="pq-btn pq-btn-primary">
              Set Up Campus Profile
            </Link>
          </div>
        )}

        {missions && (
          <div className="pq-topic-row" style={{ marginTop: 18 }}>
            <h4 style={{ margin: "0 0 10px" }}>🎯 Today's Missions</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {missions.map((m) => (
                <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                  <span style={{ opacity: m.completed ? 1 : 0.4 }}>{m.completed ? "✅" : "⬜"}</span>
                  <span style={{
                    color: m.completed ? "#86efac" : "#cbd5e1",
                    textDecoration: m.completed ? "line-through" : "none"
                  }}>
                    {m.title}
                  </span>
                  <span style={{ marginLeft: "auto", color: "#00f5ff", fontSize: 12 }}>+{m.xp} XP</span>
                </div>
              ))}
            </div>
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

      {stats && stats.xp > 0 && (
        <div className="pq-container" style={{ marginTop: 24 }}>
          <h4 className="pq-section-title" style={{ textAlign: "center" }}>Share Your Progress</h4>
          <AchievementCard
            username={user?.username}
            xp={stats.xp}
            level={stats.level}
            streak={stats.streak}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
