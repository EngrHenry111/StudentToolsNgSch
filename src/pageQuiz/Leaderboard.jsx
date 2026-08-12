import { useEffect, useState, useContext } from "react";
import { getLeaderboardXP } from "../apiQuiz/quizApi";
import { AuthContext } from "../contextQuiz/AuthContext";
import Loader from "../componentsQuiz/Loader";
import "./proquiz.css";

const Leaderboard = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLeaderboardXP()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="pq-page">
        <Loader fullPage label="Loading leaderboard..." />
      </div>
    );
  }

  return (
    <div className="pq-page">
      <div className="pq-container">
        <div className="pq-card">
          <h2 className="pq-title">Leaderboard</h2>
          <p className="pq-subtitle">Top students ranked by XP earned in Pro quizzes.</p>

          {error && <div className="pq-error-box">{error}</div>}

          {data.length === 0 ? (
            <div className="pq-empty-state">
              No leaderboard data yet — be the first to take a Pro quiz!
            </div>
          ) : (
            data.map((u) => (
              <div
                className="pq-leaderboard-row"
                key={u.rank}
                style={
                  user && u.username === user.username
                    ? { borderColor: "rgba(0,245,255,0.4)" }
                    : undefined
                }
              >
                <span className={`pq-rank ${u.rank <= 3 ? `pq-rank-${u.rank}` : ""}`}>
                  {u.rank}
                </span>
                <span className="pq-leaderboard-name">
                  {u.username}
                  {user && u.username === user.username ? " (you)" : ""}
                </span>
                <span className="pq-leaderboard-meta">
                  <span>⚡ {u.xp} XP</span>
                  <span>🏅 Lv.{u.level}</span>
                  <span>{u.accuracy}%</span>
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
