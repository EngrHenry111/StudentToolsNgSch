import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="pro/dashboard">Dashboard</Link> | 
      <Link to="/pro/quiz/adaptive">Adaptive</Link> | 
      <Link to="/pro/analytics">Analytics</Link> | 
      <Link to="/pro/quiz/ai">AI Quiz</Link> |
      <Link to="/pro/quiz/mixed">Quiz Gen</Link> |
      <Link to="/pro/analytics">Analytics</Link> |
      <Link to="/pro/billing">Billing</Link> |
    </nav>
  );
};

export default Navbar;