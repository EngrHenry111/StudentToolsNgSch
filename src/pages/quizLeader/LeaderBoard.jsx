import "./leader.css"


const Leaderboard = ({ users = [] }) => {
  return (
    <div className="leaderboard">

      <h3>🏆 Top Students</h3>

      {users.length === 0 ? (
        <p className="empty">No scores yet</p>
      ) : (
        users.map((u, i) => (
          <div key={i} className="leaderboard-item">

            <span className="rank">
              {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
            </span>

            <span className="name">{u.username}</span>

            <span className="score">{u.score} pts</span>

            <span className="streak">🔥 {u.streak}</span>

          </div>
        ))
      )}

    </div>
  );
};
export default Leaderboard;