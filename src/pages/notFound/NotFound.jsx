import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "./notFound.css";

const NotFound = () => {
  return (
    <div className="notfound-page">
      <Helmet>
        <title>Page Not Found | StudentToolsNG</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <h1>404 — Page Not Found</h1>

      <p>
        The page you are looking for doesn&apos;t exist or may have been moved.
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
