import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import Logo from "../logo/Logo";
import "./navbar.css";

// Grouped links, so the bar stays readable on laptop widths.
const GROUPS = {
  calculators: {
    label: "Calculators",
    links: [
      ["/cgpa-calculator", "CGPA Calculator"],
      ["/cgpa-converter", "CGPA Converter (5.0 to 4.0)"],
      ["/gpa-class-calculator", "GPA Class of Degree"],
      ["/waec-grade-calculator", "WAEC Grade Calculator"],
      ["/jamb-score-calculator", "JAMB Score Calculator"],
      ["/aggregate-score-calculator", "Post-UTME Aggregate"],
      ["/age-calculator", "Age Calculator"]
    ]
  },
  practice: {
    label: "Practice",
    links: [
      ["/jamb-cbt-practice", "JAMB CBT Practice"],
      ["/quiz", "Maths Quiz"],
      ["/tutorials/math-calculator", "Math Engine"],
      ["/ai-tutor", "AI Tutor"]
    ]
  }
};

// A dropdown: hover or click on desktop, tap to expand inside the mobile menu.
const NavGroup = ({ id, open, setOpen, onPick }) => {
  const g = GROUPS[id];
  const isOpen = open === id;
  return (
    <li className={`nav-group ${isOpen ? "open" : ""}`}>
      <button
        type="button"
        className="nav-group-btn"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setOpen(isOpen ? null : id)}
      >
        {g.label} <span aria-hidden="true">▾</span>
      </button>
      <ul className="nav-drop">
        {g.links.map(([to, text]) => (
          <li key={to}><Link to={to} onClick={onPick}>{text}</Link></li>
        ))}
      </ul>
    </li>
  );
};

const Navbar = () => {
  

 const [menuOpen,setMenuOpen] = useState(false);
  const [openGroup,setOpenGroup] = useState(null);
  const navRef = useRef(null);
  const [query,setQuery] = useState("");
  const [suggestions,setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e)=>{
  e.preventDefault();
  navigate(`/search?q=${query}`);

  };


  const fetchSuggestions = async (text)=>{

 try{

  const res = await API.get(`/tutorials/suggest?q=${text}`);

  setSuggestions(res.data);

 }catch(err){

  console.log(err);

 }

};


const handleChange = (e)=>{

 const value = e.target.value;

 setQuery(value);

 if(value.length > 1){
  fetchSuggestions(value);
 }else{
  setSuggestions([]);
 }

};

 const toggleMenu = () =>{
  setMenuOpen(!menuOpen);
 };

 const closeMenu = () =>{
  setMenuOpen(false);
  setOpenGroup(null);
 };

 // Close an open dropdown on an outside click or Escape.
 useEffect(()=>{
  if(!openGroup) return;
  const onDown = (e)=>{ if(!navRef.current?.contains(e.target)) setOpenGroup(null); };
  const onKey = (e)=>{ if(e.key === "Escape") setOpenGroup(null); };
  document.addEventListener("mousedown", onDown);
  document.addEventListener("keydown", onKey);
  return ()=>{
   document.removeEventListener("mousedown", onDown);
   document.removeEventListener("keydown", onKey);
  };
 },[openGroup]);

 return (

  <nav className="navbar" ref={navRef}>
    

    <div className="nav-key">

      <Link to="/" className="logo-link" onClick={closeMenu}>
        <Logo className="logo-mark" />
        <span className="logo-text">StudentToolsNG</span>
      </Link>

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

        <form onSubmit={handleSearch} className="search-bar">

        {/* <input
        type="text"
        placeholder="Search tutorials..."
        value={query}
        onChange={handleChange}
        /> */}


          {suggestions.length > 0 && (

          <div className="suggestions">

          {suggestions.map((item)=>(
            
          <Link
          key={item._id}
          to={`/tutorial/${item.slug}`}
          className="suggestion-item"
          >

          {item.title}

          </Link>

          ))}

          </div>

          )}
        {/* <button type="submit">Search</button> */}

        </form>

        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <NavGroup id="calculators" open={openGroup} setOpen={setOpenGroup} onPick={closeMenu} />
        <NavGroup id="practice" open={openGroup} setOpen={setOpenGroup} onPick={closeMenu} />
        <li><Link to="/engineering-tools" onClick={closeMenu}>Engineering</Link></li>
        <li><Link to="/tutorials" onClick={closeMenu}>Tutorials</Link></li>
        <li><Link to="/admission-predictor" onClick={closeMenu}>Admission</Link></li>
        <li><Link to="/study-planner" onClick={closeMenu}>Planner</Link></li>
        <li><Link to="/scholarships" onClick={closeMenu}>Scholarships</Link></li>
        <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>

      </ul>

    </div>

  </nav>

 );

};

export default Navbar;