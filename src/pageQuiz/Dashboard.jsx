import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>Welcome to EngrHenryTech Quiz System</h1>

      <Link to="/quiz/adaptive">Adaptive Quiz</Link>
      <br />
      <Link to="/quiz/ai">AI Quiz</Link>
      <br />
      <Link to="/quiz/mixed">Mixed Quiz</Link>
      <br />
      <Link to="/analytics">Analytics</Link>
      <br />
      <Link to="/leaderboard">Leaderboard</Link>
      <br />
      <Link to="/billing">Billing</Link>
    </div>
  );
};

export default Dashboard;