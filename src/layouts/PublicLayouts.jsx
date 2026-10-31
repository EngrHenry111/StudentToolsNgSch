import { Suspense } from "react";
import RouteFallback from "../components/RouteFallback";
import Navbar from "../components/navbar/Navbar";
import SectionBar from "../components/sectionBar/SectionBar";
import Footer from "../components/footer/Footer";
import AdUnit from "../components/ads/AdUnit";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <SectionBar />
      <Suspense fallback={<RouteFallback />}><Outlet /></Suspense>
      <AdUnit slot="0000000001" />
      <Footer />
    </>
  );
};

export default PublicLayout;
