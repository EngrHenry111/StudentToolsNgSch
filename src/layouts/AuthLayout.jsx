import Navbar from "../componentsQuiz/quizNav/Navbar";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default AuthLayout;
