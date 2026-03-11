import { Link, useNavigate } from "react-router-dom";
import "./adminDashboard.css";

const AdminDashboard = () => {

 const navigate = useNavigate();

 const handleLogout = () => {

  localStorage.removeItem("adminToken");

  navigate("/admin/login");

 };

 return(

  <div className="admin-dashboard">

   <h1>Admin Dashboard</h1>

   <button onClick={handleLogout} className="logout-btn">
    Logout
   </button>

   <div className="admin-grid">

    <Link to="/admin/tutorials" className="admin-card">
     Manage Tutorials
    </Link>

    <Link to="/admin/create-tutorial" className="admin-card">
     Create Tutorial
    </Link>

    <Link to="/admin/messages" className="admin-card">
     View Messages
    </Link>

   </div>

  </div>

 );

};

export default AdminDashboard;