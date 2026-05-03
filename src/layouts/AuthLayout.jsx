import Navbar from "../componentsQuiz/Navbar";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <h2>Student Tools Pro</h2>

       <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default AuthLayout;