import { Link } from "react-router-dom";
import { useState } from "react";
import "./navbar.css";

const Navbar = () => {

 const [menuOpen,setMenuOpen] = useState(false);

 const toggleMenu = () =>{
  setMenuOpen(!menuOpen);
 };

 const closeMenu = () =>{
  setMenuOpen(false);
 };

 return (

  <nav className="navbar">

    <div className="nav-container">

      <h2 className="logo">StudentToolsNG</h2>

      {/* Animated Hamburger */}

      <div
       className={`hamburger ${menuOpen ? "active" : ""}`}
       onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>

        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/cgpa-calculator" onClick={closeMenu}>CGPA</Link></li>
        <li><Link to="/gpa-class-calculator" onClick={closeMenu}>GPA</Link></li>
        <li><Link to="/waec-grade-calculator" onClick={closeMenu}>WAEC</Link></li>
        <li><Link to="/jamb-score-calculator" onClick={closeMenu}>JAMB</Link></li>
        <li><Link to="/tutorials" onClick={closeMenu}>Tutorials</Link></li>
        <li><Link to="/ai-tutor" onClick={closeMenu}>AI Tutor</Link></li>
        <li><Link to="/admission-predictor" onClick={closeMenu}>Admission</Link></li>
        <li><Link to="/studyplanner" onClick={closeMenu}>Planner</Link></li>
        <li><Link to="/scholarships" onClick={closeMenu}>Scholarships</Link></li>
        <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>

      </ul>

    </div>

  </nav>

 );

};

export default Navbar;