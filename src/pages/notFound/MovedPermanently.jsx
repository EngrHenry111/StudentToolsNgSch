import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import "./notFound.css";

const SITE = "https://studenttoolsng.com";

// A page that moved for good (deleted/merged tutorial). Visitors are sent on
// immediately. Crawlers get a real 301: Prerender.io turns the
// prerender-status-code / prerender-header tags into the HTTP status and
// Location header, and middleware.js passes them through. The renderer
// itself must NOT navigate, or it would snapshot the target page as a 200.
const isPrerender = () =>
  typeof navigator !== "undefined" && /prerender/i.test(navigator.userAgent);

const MovedPermanently = ({ to }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPrerender()) navigate(to, { replace: true });
  }, [to, navigate]);

  return (
    <div className="notfound-page">
      <Helmet>
        <title>Page moved | StudentToolsNG</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="prerender-status-code" content="301" />
        <meta name="prerender-header" content={`Location: ${SITE}${to}`} />
        <link rel="canonical" href={`${SITE}${to}`} />
      </Helmet>

      <h1>This page has moved</h1>
      <p>
        Continue to <Link to={to} replace>{`${SITE}${to}`}</Link>
      </p>
    </div>
  );
};

export default MovedPermanently;
