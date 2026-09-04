import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getStudyCoachOverview } from "../../apiQuiz/studyCoachApi";
import Loader from "../../componentsQuiz/Loader";
import "../proquiz.css";

const healthColor = (health) => {
  if (health === null) return "#94a3b8";
  if (health >= 70) return "#22c55e";
  if (health >= 40) return "#ffb020";
  return "#ef4444";
};

const StudyCoach = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getStudyCoachOverview()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="pq-page">
        <Loader fullPage label="Analyzing your study data..." />
      </div>
    );
  }

  return (
    <div className="pq-page">
      <div className="pq-container">
        <div className="pq-card">
          <h2 className="pq-title">Study Coach</h2>
          <p className="pq-subtitle">Your personal academic overview, based on your real quiz activity.</p>

          {error && <div className="pq-error-box">{error}</div>}

          {data && !data.hasEnoughData ? (
            <div className="pq-empty-state">
              Take a few quizzes first — your Study Coach will build a real
              picture of your strengths and weak spots from your actual results.
              <br /><br />
              <Link to="/pro/quiz/ai" className="pq-btn pq-btn-primary">Start a Quiz</Link>
            </div>
          ) : data && (
            <>
              <div style={{ textAlign: "center", margin: "10px 0 24px" }}>
                <div style={{ fontSize: 42, fontWeight: 800, color: healthColor(data.academicHealth) }}>
                  {data.academicHealth}%
                </div>
                <div style={{ fontSize: 13, color: "#94a3b8" }}>Academic Health</div>
              </div>

              <div className="pq-stats-row" style={{ justifyContent: "center" }}>
                <span className="pq-badge pq-badge-xp">⚡ {data.xp} XP</span>
                <span className="pq-badge pq-badge-level">🏅 Level {data.level}</span>
                <span className="pq-badge pq-badge-streak">🔥 {data.streak} day streak</span>
              </div>
            </>
          )}
        </div>

        {data && data.hasEnoughData && (
          <>
            <div className="pq-card">
              <h4 className="pq-section-title">Today's Plan</h4>
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {data.todaysPlan.map((item, i) => (
                  <li key={i} style={{ marginBottom: 10, color: "#cbd5e1", fontSize: 14 }}>{item}</li>
                ))}
              </ul>
            </div>

            {data.strongTopics.length > 0 && (
              <div className="pq-card">
                <h4 className="pq-section-title">Strong Areas</h4>
                {data.strongTopics.map((t, i) => (
                  <div className="pq-topic-row" key={i}>
                    <div className="pq-topic-head">
                      <h4>{t.subject} · {t.topic}</h4>
                      <span className="pq-topic-accuracy pq-accuracy-good">{t.accuracy}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {data.weakTopics.length > 0 && (
              <div className="pq-card">
                <h4 className="pq-section-title">Needs Attention</h4>
                {data.weakTopics.map((t, i) => (
                  <div className="pq-topic-row" key={i}>
                    <div className="pq-topic-head">
                      <h4>{t.subject} · {t.topic}</h4>
                      <span className="pq-topic-accuracy pq-accuracy-low">{t.accuracy}%</span>
                    </div>
                  </div>
                ))}
                <Link to="/pro/quiz/adaptive" className="pq-btn pq-btn-primary" style={{ marginTop: 10 }}>
                  Practice Weak Topics
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudyCoach;
