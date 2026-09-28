import Navbar from "../componentsQuiz/quizNav/Navbar";
import SectionBar from "../components/sectionBar/SectionBar";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <Navbar />
      <SectionBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default AuthLayout;
