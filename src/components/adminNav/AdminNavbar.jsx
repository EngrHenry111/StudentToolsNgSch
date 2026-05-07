import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import "./nav.css";

const AdminNavbar = () => {

 const navigate = useNavigate();

 const [menuOpen, setMenuOpen] = useState(false);

 const logout = () => {

  localStorage.removeItem("adminToken");

  navigate("/admin/login");

 };

 const closeMenu = () => {
  setMenuOpen(false);
 };

 return (

  <nav className="admin-navbar">

   <div className="admin-navbar-top">

    <h2 className="logo">
     Admin Panel
    </h2>

    {/* HAMBURGER */}
    <button
     className="menu-btn"
     onClick={() => setMenuOpen(!menuOpen)}
    >
     {menuOpen ? <X size={28} /> : <Menu size={28} />}
    </button>

   </div>

   {/* LINKS */}
   <div className={`admin-links ${menuOpen ? "active" : ""}`}>

    <Link to="/admin" onClick={closeMenu}>
     Dashboard
    </Link>

    <Link to="/admin/create-tutorial" onClick={closeMenu}>
     Create Tutorial
    </Link>

    <Link to="/admin/tutorials" onClick={closeMenu}>
     Tutorials
    </Link>

    <Link to="/admin/messages" onClick={closeMenu}>
     Messages
    </Link>

    <button onClick={logout} className="logout-btn">
     Logout
    </button>

   </div>

  </nav>

 );

};

export default AdminNavbar;