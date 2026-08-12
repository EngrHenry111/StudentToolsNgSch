import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAnalytics } from "../apiQuiz/quizApi";
import Loader from "../componentsQuiz/Loader";
import "./proquiz.css";

const accuracyClass = (acc) => {
  if (acc >= 70) return "pq-accuracy-good";
  if (acc >= 40) return "pq-accuracy-mid";
  return "pq-accuracy-low";
};

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAnalytics()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="pq-page">
        <Loader fullPage label="Loading your analytics..." />
      </div>
    );
  }

  return (
    <div className="pq-page">
      <div className="pq-container">
        <div className="pq-card">
          <h2 className="pq-title">Your Performance</h2>
          <p className="pq-subtitle">
            Accuracy across every topic you've attempted in Pro quizzes.
          </p>

          {error && <div className="pq-error-box">{error}</div>}

          {data?.overall && (
            <div className="pq-stats-row">
              <span className="pq-badge pq-badge-xp">⚡ {data.overall.xp} XP</span>
              <span className="pq-badge pq-badge-level">🏅 Level {data.overall.level}</span>
              <span className="pq-badge pq-badge-streak">🔥 {data.overall.streak} day streak</span>
              <span className="pq-badge">
                {data.overall.correct}/{data.overall.attempts} correct overall
              </span>
            </div>
          )}

          {(!data?.topics || data.topics.length === 0) ? (
            <div className="pq-empty-state">
              You haven't attempted any Pro quizzes yet.
              <br />
              <Link to="/pro/quiz/ai" className="pq-btn pq-btn-primary" style={{ marginTop: 16 }}>
                Take your first quiz
              </Link>
            </div>
          ) : (
            data.topics.map((t, i) => (
              <div className="pq-topic-row" key={i}>
                <div className="pq-topic-head">
                  <h4>{t.subject} · {t.topic}</h4>
                  <span className={`pq-topic-accuracy ${accuracyClass(t.accuracy)}`}>
                    {Math.round(t.accuracy)}%
                  </span>
                </div>
                <div className="pq-progress-track" style={{ marginBottom: 0 }}>
                  <div
                    className="pq-progress-fill"
                    style={{ width: `${Math.min(100, t.accuracy)}%` }}
                  />
                </div>
                <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 8, marginBottom: 0 }}>
                  {t.correct}/{t.attempts} correct
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
