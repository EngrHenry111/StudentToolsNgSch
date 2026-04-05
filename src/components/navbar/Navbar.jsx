import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  

 const [menuOpen,setMenuOpen] = useState(false);
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
        <li><Link to="/cgpa-calculator" onClick={closeMenu}>CGPA</Link></li>
        <li><Link to="/gpa-class-calculator" onClick={closeMenu}>GPA</Link></li>
        <li><Link to="/waec-grade-calculator" onClick={closeMenu}>WAEC</Link></li>
        <li><Link to="/jamb-score-calculator" onClick={closeMenu}>JAMB</Link></li>
        <li><Link to="/tutorials" onClick={closeMenu}>Tutorials</Link></li>
        <li><Link to="/ai-tutor" onClick={closeMenu}>AI Tutor</Link></li>
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