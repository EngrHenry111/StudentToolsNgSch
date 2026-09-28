import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PublisherNavbar from "../componentsMarketplace/publisherNav/PublisherNavbar";
import Footer from "../components/footer/Footer";
import { getMyPublisherProfile } from "../apiMarketplace/publisherApi";

// The publisher workspace's own layout — deliberately separate from both
// the public PublicLayout and the student-facing AuthLayout (quiz nav).
// RequirePublisher already guarantees a publisher profile exists by the
// time any route using this layout renders, so this fetch is just to
// pass the profile down to every workspace page via Outlet context,
// without each page re-fetching it independently.
const PublisherLayout = () => {
  const [publisher, setPublisher] = useState(null);

  useEffect(() => {
    getMyPublisherProfile().then(setPublisher);
  }, []);

  return (
    <>
      <PublisherNavbar storefrontSlug={publisher?.slug} />
      <Outlet context={{ publisher, refreshPublisher: () => getMyPublisherProfile().then(setPublisher) }} />
      <Footer />
    </>
  );
};

export default PublisherLayout;
