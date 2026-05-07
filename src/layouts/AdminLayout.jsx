import { Outlet, Navigate } from "react-router-dom";
import AdminNavbar from "../components/adminNav/AdminNavbar";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const AdminLayout = () => {

 const token = localStorage.getItem("adminToken");

 // Protect route
 if (!token) {
  return <Navigate to="/admin/login" replace />;
 }

 return (
  <div className="admin-layout">
   <Navbar/>

   <AdminNavbar />

   <div className="admin-page-content">
    <Outlet />
   </div>
 <Footer/>
  </div>
 );

};

export default AdminLayout;