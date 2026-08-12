import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import AdUnit from "../components/ads/AdUnit";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <AdUnit slot="0000000001" />
      <Footer />
    </>
  );
};

export default PublicLayout;
