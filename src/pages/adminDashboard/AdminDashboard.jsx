import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/api";
import "./adminDashboard.css";

const AdminDashboard = () => {

 const navigate = useNavigate();

 const [stats, setStats] = useState({
  total: 0,
  published: 0,
  drafts: 0,
  views: 0
 });

 const [loading, setLoading] = useState(true);
 const [error, setError] = useState("");

 // ✅ FETCH STATS (correct place)
 useEffect(() => {
  fetchStats();
 }, []);

 const fetchStats = async () => {
  try {

   const token = localStorage.getItem("adminToken");

   const res = await API.get("/admin/stats", {
    headers: {
     Authorization: `Bearer ${token}`
    }
   });

   setStats(res.data);

  } catch (err) {
   console.error(err);
   setError("Failed to load dashboard stats");
  } finally {
   setLoading(false);
  }
 };

 // ✅ LOGOUT (clean)
 const handleLogout = () => {
  localStorage.removeItem("adminToken");
  navigate("/admin/login");
 };

 return (

  <div className="admin-dashboard">

   <h1>Admin Dashboard</h1>

   {/* ✅ LOADING */}
   {loading && <p>Loading dashboard...</p>}

   {/* ✅ ERROR */}
   {error && <p className="error">{error}</p>}

   {/* ✅ STATS */}
   {!loading && !error && (
    <div className="admin-stats">

     <div className="stat-card">
      <h3>Total Tutorials</h3>
      <p>{stats.total}</p>
     </div>

     <div className="stat-card">
      <h3>Published</h3>
      <p>{stats.published}</p>
     </div>

     <div className="stat-card">
      <h3>Drafts</h3>
      <p>{stats.drafts}</p>
     </div>

     <div className="stat-card">
      <h3>Total Views</h3>
      <p>{stats.views}</p>
     </div>

    </div>
   )}

   {/* ✅ ACTION BUTTON */}
   <button onClick={handleLogout} className="logout-btn">
    Logout
   </button>

   {/* ✅ NAVIGATION */}
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

    <Link to="/admin/analytics" className="admin-card">
     Analytics
    </Link>

   </div>

  </div>

 );

};

export default AdminDashboard;