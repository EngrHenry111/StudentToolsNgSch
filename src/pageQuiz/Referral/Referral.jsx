import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contextQuiz/AuthContext";
import { getReferralLeaderboard } from "../../apiQuiz/authApi";
import Loader from "../../componentsQuiz/Loader";
import "../proquiz.css";

const Referral = () => {
  const { user } = useContext(AuthContext);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getReferralLeaderboard()
      .then(setLeaderboard)
      .catch(() => setLeaderboard([]))
      .finally(() => setLoading(false));
  }, []);

  const referralLink = user?.referralCode
    ? `https://studenttoolsng.com/register?ref=${user.referralCode}`
    : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pq-page">
      <div className="pq-container">
        <div className="pq-card">
          <h2 className="pq-title">Invite Friends, Earn XP</h2>
          <p className="pq-subtitle">
            Share your link — when a friend signs up with it, you get <strong>+50 XP</strong> and
            they get a <strong>+20 XP</strong> welcome bonus. No limit on how many you can invite.
          </p>

          <div className="pq-field">
            <label>Your referral link</label>
            <div style={{ display: "flex", gap: 10 }}>
              <input className="pq-input" value={referralLink} readOnly style={{ flex: 1 }} />
              <button className="pq-btn pq-btn-primary" onClick={handleCopy}>
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div className="pq-stats-row" style={{ marginTop: 20 }}>
            <span className="pq-badge pq-badge-premium">
              🎁 {user?.referralCount || 0} friend{user?.referralCount === 1 ? "" : "s"} referred
            </span>
          </div>
        </div>

        <div className="pq-card">
          <h4 className="pq-section-title">Top Referrers</h4>

          {loading ? (
            <Loader label="Loading..." />
          ) : leaderboard.length === 0 ? (
            <div className="pq-empty-state">Be the first to invite a friend!</div>
          ) : (
            leaderboard.map((r) => (
              <div className="pq-leaderboard-row" key={r.rank}>
                <span className={`pq-rank ${r.rank <= 3 ? `pq-rank-${r.rank}` : ""}`}>{r.rank}</span>
                <span className="pq-leaderboard-name">
                  {r.username}
                  {user && r.username === user.username ? " (you)" : ""}
                </span>
                <span className="pq-leaderboard-meta">
                  <span>{r.referralCount} referral{r.referralCount === 1 ? "" : "s"}</span>
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Referral;
