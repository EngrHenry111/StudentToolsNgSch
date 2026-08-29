import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contextQuiz/AuthContext";
import "./navquiz.css";

const links = [
  { to: "/pro/dashboard", label: "Dashboard" },
  { to: "/pro/quiz/ai", label: "AI Quiz" },
  { to: "/pro/quiz/adaptive", label: "Adaptive" },
  { to: "/pro/quiz/mixed", label: "Mixed" },
  { to: "/pro/quiz/past-questions", label: "Past Questions" },
  { to: "/pro/quiz/material", label: "Material Quiz" },
  { to: "/pro/analytics", label: "Analytics" },
  { to: "/pro/leaderboard", label: "Leaderboard" },
  { to: "/pro/billing", label: "Billing" },
];

const Navbar = () => {
  const { user, isPremium, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Campus link only shows once a student has actually set up a campus
  // profile (or offers to, if they haven't) — this is what keeps the
  // WAEC/JAMB-focused experience completely unchanged for students who
  // never touch this, while additively unlocking it for university
  // students who do.
  const campusLink = user?.campus?.onboarded
    ? { to: "/pro/campus/onboarding", label: user.campus.institutionName?.split(" ")[0] || "Campus" }
    : { to: "/pro/campus/onboarding", label: "Set Up Campus" };

  return (
    <nav className="proquiz-navbar">
      <div className="proquiz-navbar-inner">
        <Link to="/pro/dashboard" className="proquiz-brand">
          StudentTools <span>Pro</span>
        </Link>

        <div className="proquiz-links">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `proquiz-nav-link${isActive ? " active" : ""}`
              }
            >
              {l.label}
            </NavLink>
          ))}

          {user && (
            <NavLink
              to={campusLink.to}
              className={({ isActive }) =>
                `proquiz-nav-link${isActive ? " active" : ""}`
              }
            >
              {campusLink.label}
            </NavLink>
          )}
        </div>

        <div className="proquiz-user">
          {user && (
            <>
              <span className={`proquiz-plan-pill ${isPremium ? "premium" : "free"}`}>
                {isPremium ? "PRO" : "FREE"}
              </span>
              <span className="proquiz-username">{user.username}</span>
            </>
          )}
          <button className="proquiz-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
