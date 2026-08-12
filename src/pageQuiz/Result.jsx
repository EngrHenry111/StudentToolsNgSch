import { Link } from "react-router-dom";
import "./proquiz.css";

// result shape (from submitAIQuiz): { score, xpEarned, totalXP, level, streak, results[], weakTopics[] }
const Result = ({ result, onRetry, retryLabel = "Try Again" }) => {
  if (!result) return null;

  const total = result.results?.length || 0;
  const correctCount = result.results?.filter((r) => r.isCorrect).length || 0;

  return (
    <div className="pq-container">
      <div className="pq-card">
        <div className="pq-result-score">
          <div className="pq-score-number">
            {correctCount}/{total}
          </div>
          <p>You scored {result.score} points</p>
        </div>

        <div className="pq-stats-row" style={{ justifyContent: "center" }}>
          <span className="pq-badge pq-badge-xp">⚡ +{result.xpEarned} XP</span>
          <span className="pq-badge pq-badge-level">🏅 Level {result.level}</span>
          <span className="pq-badge pq-badge-streak">🔥 {result.streak} day streak</span>
        </div>

        {Array.isArray(result.weakTopics) && result.weakTopics.length > 0 && (
          <>
            <h4 className="pq-section-title" style={{ marginTop: 26 }}>
              Topics to focus on
            </h4>
            <div style={{ marginBottom: 10 }}>
              {result.weakTopics.map((t, i) => (
                <span className="pq-weak-topic" key={i}>
                  {t.subject} · {t.topic} ({Math.round(t.accuracy)}%)
                </span>
              ))}
            </div>
          </>
        )}

        <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
          {onRetry && (
            <button className="pq-btn pq-btn-primary" onClick={onRetry}>
              {retryLabel}
            </button>
          )}
          <Link to="/pro/dashboard" className="pq-btn">
            Back to Dashboard
          </Link>
          <Link to="/pro/analytics" className="pq-btn">
            View Analytics
          </Link>
        </div>
      </div>

      {Array.isArray(result.results) && result.results.length > 0 && (
        <div className="pq-card">
          <h4 className="pq-section-title">Review</h4>
          {result.results.map((r, i) => (
            <div className="pq-review-item" key={i}>
              <p className="pq-review-q">{r.question}</p>
              <p>
                Your answer: <strong>{r.selected || "No answer"}</strong>{" "}
                <span className={r.isCorrect ? "pq-tag-correct" : "pq-tag-incorrect"}>
                  {r.isCorrect ? "Correct" : "Incorrect"}
                </span>
              </p>
              {!r.isCorrect && (
                <p>
                  Correct answer: <strong>{r.correctAnswer}</strong>
                </p>
              )}
              {r.explanation && <p style={{ color: "#94a3b8" }}>{r.explanation}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Result;
