import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "./notFound.css";

// status 404 = never existed, 410 = removed on purpose. The
// prerender-status-code tag makes crawlers receive that real HTTP status
// (via Prerender.io + middleware.js) instead of a "soft 404" 200.
const NotFound = ({ status = 404 }) => {
  const gone = status === 410;

  return (
    <div className="notfound-page">
      <Helmet>
        <title>{gone ? "Page Removed" : "Page Not Found"} | StudentToolsNG</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="prerender-status-code" content={String(status)} />
      </Helmet>

      <h1>{gone ? "410 — Page Removed" : "404 — Page Not Found"}</h1>

      <p>
        {gone
          ? "This page has been removed and is no longer available."
          : <>The page you are looking for doesn&apos;t exist or may have been moved.</>}
      </p>

      <div className="notfound-links">
        <Link to="/">Go to Homepage</Link>
        <Link to="/tutorials">Browse Tutorials</Link>
        <Link to="/cgpa-calculator">CGPA Calculator</Link>
      </div>
    </div>
  );
};

export default NotFound;
