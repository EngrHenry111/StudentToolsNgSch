import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contextQuiz/AuthContext";
import "./sectionBar.css";

// One slim strip above every layout's own navbar (public site, Smart Quiz,
// publisher workspace) so the site's separate areas are always one click
// apart — and a buyer can always get back to what they paid for, no
// matter which area they've wandered into. The area you're in is
// highlighted; each layout's own navbar still handles in-area links.
const sections = [
  { key: "free", to: "/", label: "Free Tools", icon: "🧰" },
  { key: "quiz", to: "/pro/dashboard", label: "Smart Quiz", icon: "🧠" },
  { key: "library", to: "/marketplace", label: "Research Library", icon: "📖" },
  { key: "publish", to: "/publisher/dashboard", label: "Publish & Earn", icon: "📚" },
  { key: "purchases", to: "/my-purchases", label: "My Purchases", icon: "🛍️", authOnly: true }
];

const currentSection = (pathname) => {
  if (pathname.startsWith("/pro")) return "quiz";
  // "/publisher/..." is the workspace; "/publishers/..." (plural) is the
  // public storefronts and listings, which live in the Research Library.
  if (pathname === "/publisher" || pathname.startsWith("/publisher/")) return "publish";
  if (pathname.startsWith("/my-purchases")) return "purchases";
  if (pathname.startsWith("/marketplace") || pathname.startsWith("/publishers")) return "library";
  if (pathname === "/login" || pathname === "/register") return null;
  return "free";
};

const SectionBar = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { pathname } = useLocation();
  const active = currentSection(pathname);

  return (
    <div className="section-bar">
      <div className="section-bar-inner">
        {sections
          .filter((s) => !s.authOnly || isAuthenticated)
          .map((s) => (
            <Link
              key={s.key}
              to={s.to}
              className={`section-bar-link${active === s.key ? " active" : ""}`}
              aria-current={active === s.key ? "page" : undefined}
            >
              <span aria-hidden="true">{s.icon}</span> {s.label}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SectionBar;
