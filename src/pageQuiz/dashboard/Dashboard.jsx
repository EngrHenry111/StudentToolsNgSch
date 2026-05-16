import { Link } from "react-router-dom";
import "./dash.css"
const Dashboard = () => {
  return (
  <div className="dashboard-page">

    <div className="dashboard-card">

      <h1>Welcome to EngrHenryTech Quiz System</h1>

      <div className="dashboard-links">

        <Link to="/quiz/adaptive">Adaptive Quiz</Link>
        <Link to="/quiz/ai">AI Quiz</Link>
        <Link to="/quiz/mixed">Mixed Quiz</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/billing">Billing</Link>

      </div>

    </div>

  </div>
);

};

export default Dashboard;