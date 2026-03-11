/*
Professional Homepage for StudentToolsNG

Sections:
1. Hero
2. Search tools
3. Popular tools
4. Tutorials preview
*/



import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import API from "../../services/api";
import "./home.css";

const Home = () => {

 const [tutorials,setTutorials] = useState([]);

 useEffect(()=>{

  fetchTutorials();

 },[]);

 const fetchTutorials = async ()=>{

  try{

   const res = await API.get("/tutorials");

   setTutorials(res.data.tutorials || res.data);

  }catch(error){

   console.log(error);

  }

 };

 return(

 <div className="home">

 {/* SEO */}

 <Helmet>

 <title>
 StudentToolsNG | CGPA, WAEC & JAMB Calculators
 </title>

 <meta
 name="description"
 content="Free academic tools for Nigerian students including CGPA calculator, WAEC grade calculator, JAMB score calculator and study tutorials."
 />

 </Helmet>

 {/* HERO SECTION */}

 <section className="hero">

 <h1>
 Free Academic Tools for Nigerian Students
 </h1>

 <p>
 Calculate CGPA, WAEC grades, JAMB scores and access helpful study tutorials.
 </p>

 <div className="hero-buttons">

 <Link to="/tutorials">Explore Tutorials</Link>

 <Link to="/cgpa-calculator">Calculate CGPA</Link>

 </div>

 </section>

 {/* POPULAR TOOLS */}

 <section className="tools">

 <h2>Popular Student Tools</h2>

 <div className="tool-grid">

 <div className="tool-card">

 <h3>CGPA Calculator</h3>

 <p>Calculate your university CGPA instantly.</p>

 <Link to="/cgpa-calculator">
 Open Tool
 </Link>

 </div>

 <div className="tool-card">

 <h3>WAEC Grade Calculator</h3>

 <p>Understand WAEC grading system easily.</p>

 <Link to="/waec-calculator">
 Open Tool
 </Link>

 </div>

 <div className="tool-card">

 <h3>JAMB Score Calculator</h3>

 <p>Calculate your JAMB total score.</p>

 <Link to="/jamb-calculator">
 Open Tool
 </Link>

 </div>

 </div>

 </section>

 {/* LATEST TUTORIALS */}

 <section className="tutorial-preview">

 <h2>Latest Tutorials</h2>

 <div className="tutorial-grid">

 {tutorials.slice(0,3).map((t)=>(
  
 <div key={t._id} className="tutorial-card">

 <h3>{t.title}</h3>

 <p>{t.excerpt}</p>

 <Link to={`/tutorial/${t.slug}`}>
 Read Tutorial
 </Link>

 </div>

 ))}

 </div>

 </section>

 {/* STUDENT RESOURCES */}

 <section className="resources">

 <h2>Student Resources</h2>

 <ul>

 <li>
 <Link to="/study-planner">
 Study Planner
 </Link>
 </li>

 <li>
 <Link to="/scholarships">
 Scholarship Opportunities
 </Link>
 </li>

 <li>
 <Link to="/tutorials">
 Academic Tutorials
 </Link>
 </li>

 </ul>

 </section>

 {/* SCHOLARSHIPS */}

 <section className="scholarships">

 <h2>Scholarships for Nigerian Students</h2>

 <p>
 Discover scholarships available for Nigerian university students.
 </p>

 <Link to="/scholarships">
 View Scholarships
 </Link>

 </section>

 {/* CALL TO ACTION */}

 <section className="cta">

 <h2>
 Start Improving Your Academic Performance Today
 </h2>

 <Link to="/tutorials">
 Start Learning
 </Link>

 </section>

 </div>

 );

};

export default Home;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Helmet } from "react-helmet";
// import ToolCard from "../../components/toolCard/ToolCard";
// import "./home.css";

// const Home = () => {

//  const [query,setQuery] = useState("");
//  const navigate = useNavigate();


// const handleSearch = () => {

//  if(query.trim()){
//   navigate(`/search?q=${query}`);
//  }

// };

//  return(

//   <div className="home">

//   <Helmet>

// <title>
// StudentToolsNG | Free CGPA, WAEC & JAMB Calculators
// </title>

// <meta
//  name="description"
//  content="StudentToolsNG provides free academic tools for Nigerian students including CGPA calculator, WAEC grade calculator, JAMB score calculator and study tutorials."
// />

// </Helmet>

//    {/* HERO SECTION */}

//    <section className="hero">

//     <h1>Academic Tools for Nigerian Students</h1>

//     <p>
//      Calculate CGPA, check WAEC grades, predict admission,
//      and access study tutorials.
//     </p>

//     <div className="search-bar">

//      <input
//       placeholder="Search tutorials or tools..."
//       onChange={(e)=>setQuery(e.target.value)}
//      />

//      <button onClick={handleSearch}>
//       Search
//      </button>

//     </div>

//    </section>

//    {/* POPULAR TOOLS */}

//    <section className="tools-section">

//     <h2>Popular Student Tools</h2>

//     <div className="tools-grid">

//      <ToolCard
//       title="CGPA Calculator"
//       description="Calculate your university CGPA instantly"
//       link="/cgpa-calculator"
//      />

//      <ToolCard
//       title="WAEC Grade Calculator"
//       description="Convert WAEC scores to grades"
//       link="/waec-grade-calculator"
//      />

//      <ToolCard
//       title="JAMB Score Calculator"
//       description="Calculate your JAMB UTME score"
//       link="/jamb-score-calculator"
//      />

//      <ToolCard
//       title="GPA Class Calculator"
//       description="Know your degree classification"
//       link="/gpa-class-calculator"
//      />

//     </div>

//    </section>

//    {/* STUDY RESOURCES */}

//    <section className="resources">

//     <h2>Student Resources</h2>

//     <div className="resource-grid">

//      <div className="resource-card">
//       <h3>Study Planner</h3>
//       <p>Plan your study schedule effectively.</p>
//      </div>

//      <div className="resource-card">
//       <h3>Scholarship Finder</h3>
//       <p>Find available scholarships in Nigeria.</p>
//      </div>

//      <div className="resource-card">
//       <h3>Admission Predictor</h3>
//       <p>Estimate your admission chances.</p>
//      </div>

//     </div>

//    </section>

//   </div>

//  );

// };

// export default Home;

