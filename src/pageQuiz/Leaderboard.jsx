import { useEffect, useState } from "react";

const Leaderboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://studenttoolsserver.onrender.com/api/quiz/leaderboard-xp")
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>

      {data.map((u, i) => (
        <p key={i}>
          {u.username} - {u.xp} XP
        </p>
      ))}
    </div>
  );
};

export default Leaderboard;