import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contextQuiz/AuthContext";
import "./publisherNav.css";

// A fully separate nav from both the public site header and the Pro
// quiz nav (componentsQuiz/quizNav/Navbar.jsx) — a publisher signed in
// here should see nothing but publisher tools, no XP/streak/quiz UI.
const links = [
  { to: "/publisher/dashboard", label: "Dashboard" },
  { to: "/publisher/listings", label: "Listings" },
  { to: "/publisher/orders", label: "Orders" }
];

const PublisherNavbar = ({ storefrontSlug }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="pub-navbar">
      <div className="pub-navbar-inner">
        <Link to="/publisher/dashboard" className="pub-brand">
          StudentTools <span>Publisher</span>
        </Link>

        <div className="pub-links">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `pub-nav-link${isActive ? " active" : ""}`}
            >
              {l.label}
            </NavLink>
          ))}

          {storefrontSlug && (
            <a
              href={`/publishers/${storefrontSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pub-nav-link"
            >
              View Storefront ↗
            </a>
          )}
        </div>

        <div className="pub-user">
          {user && <span className="pub-username">{user.username}</span>}
          <button className="pub-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default PublisherNavbar;
