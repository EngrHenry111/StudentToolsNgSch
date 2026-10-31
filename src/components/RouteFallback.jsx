import { useLocation } from "react-router-dom";

// Shown while a page's code loads. Crawlers keep the text the edge put in
// #root (see main.jsx), so a render never lands on an empty page; visitors
// get a reserved space, so the footer doesn't jump up and back down.
const RouteFallback = () => {
  const { pathname } = useLocation();
  const snapshot = window.__EDGE_SNAPSHOT__;

  if (snapshot && snapshot.path === pathname) {
    return <div dangerouslySetInnerHTML={{ __html: snapshot.html }} />;
  }

  return <div style={{ minHeight: "60vh" }} aria-busy="true" />;
};

export default RouteFallback;
