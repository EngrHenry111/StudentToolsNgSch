import { Link } from "react-router-dom";
import "./marketplacePromo.css";

// A small cross-link from the free tools into the Research Library — the
// free tools get most of the site's traffic, so this is how students
// discover the marketplace (and how Google sees it linked site-wide).
const MarketplacePromo = ({
  heading = "Working on your project or research?",
  text = "Browse project materials, research documents and study guides in the Research Library. Read chapters 1 & 2 free before you buy."
}) => (
  <aside className="mkt-promo">
    <div>
      <h3>📖 {heading}</h3>
      <p>{text}</p>
    </div>
    <div className="mkt-promo-actions">
      <Link to="/marketplace" className="mkt-promo-btn">Browse the Research Library</Link>
      <Link to="/publisher/dashboard" className="mkt-promo-link">or sell your own work →</Link>
    </div>
  </aside>
);

export default MarketplacePromo;
