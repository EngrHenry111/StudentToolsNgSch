import { useEffect, useState } from "react";
import { getAnalytics } from "../apiQuiz/quizApi";

const Analytics = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getAnalytics(token);
    setData(res);
  };

  return (
    <div>
      <h1>Your Performance</h1>

      {data.map((t, i) => (
        <div key={i}>
          <h3>{t.subject} - {t.topic}</h3>
          <p>Accuracy: {(t.accuracy * 100).toFixed(0)}%</p>
        </div>
      ))}
    </div>
  );
};

export default Analytics;