import { Link } from "react-router-dom";
import "./navquiz.css"
const Navbar = () => {
  return (
   <nav className="proquiz-navbar">

  <Link to="/pro/dashboard" className="proquiz-nav-link">
    Dashboard
  </Link>

  <Link to="/pro/quiz/adaptive" className="proquiz-nav-link">
    Adaptive
  </Link>

  <Link to="/pro/analytics" className="proquiz-nav-link">
    Analytics
  </Link>

  <Link to="/pro/quiz/ai" className="proquiz-nav-link">
    AI Quiz
  </Link>

  <Link to="/pro/quiz/mixed" className="proquiz-nav-link">
    Quiz Gen
  </Link>

  <Link to="/pro/analytics" className="proquiz-nav-link">
    Analytics
  </Link>

  <Link to="/pro/billing" className="proquiz-nav-link">
    Billing
  </Link>

</nav>
  );
};

export default Navbar;