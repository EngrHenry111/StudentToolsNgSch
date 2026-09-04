import { useState } from "react";
import "../pageQuiz/proquiz.css";
import "./achievementCard.css";

// Deliberately text-based sharing rather than image-download — adding
// a whole image-generation pipeline (canvas rendering, a new dependency)
// wasn't worth it for v1 when a well-formatted, copy-pasteable blurb
// achieves the same "share your progress" goal with far less to
// maintain. A downloadable image card is a reasonable fast-follow if
// this feature proves popular.
const AchievementCard = ({ username, xp, level, streak }) => {
  const [copied, setCopied] = useState(false);

  const shareText = streak > 0
    ? `🔥 I'm on a ${streak}-day learning streak on StudentToolsNG! Level ${level}, ${xp} XP.\n\nJoin me: https://studenttoolsng.com`
    : `🎓 I've hit Level ${level} with ${xp} XP on StudentToolsNG — free AI-powered quizzes for students!\n\nJoin me: https://studenttoolsng.com`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="achievement-card">
      <div className="achievement-card-inner">
        <p className="achievement-brand">StudentTools<span>NG</span></p>
        <h3 className="achievement-username">{username}</h3>

        <div className="achievement-stats">
          <div>
            <span className="achievement-stat-value">{level}</span>
            <span className="achievement-stat-label">Level</span>
          </div>
          <div>
            <span className="achievement-stat-value">{xp}</span>
            <span className="achievement-stat-label">XP</span>
          </div>
          <div>
            <span className="achievement-stat-value">🔥 {streak}</span>
            <span className="achievement-stat-label">Day Streak</span>
          </div>
        </div>
      </div>

      <button className="pq-btn pq-btn-primary pq-btn-block" onClick={handleCopy} style={{ marginTop: 14 }}>
        {copied ? "Copied! Paste it anywhere" : "Copy to Share"}
      </button>
    </div>
  );
};

export default AchievementCard;
