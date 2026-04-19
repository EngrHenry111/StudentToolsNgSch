import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import API from "../../services/api";
import "./home.css";

const Home = () => {

 const [tutorials,setTutorials] = useState([]);
 const [trending,setTrending] = useState([]);

//  useEffect(()=>{

//   fetchTutorials();

//  },[]);

 useEffect(()=>{

 fetchTutorials();
 fetchTrending();

},[]);

 const fetchTutorials = async ()=>{

  try{

   const res = await API.get("/tutorials");

   setTutorials(res.data.tutorials || res.data);

  }catch(error){

   console.log(error);

  }

 };

 const fetchTrending = async ()=>{

 try{

  const res = await API.get("/tutorials/trending");

  setTrending(res.data);

 }catch(error){

  console.log(error);

 }

};

 return(

 <div className="home">

    

 {/* SEO */}

<Helmet>

{/* Primary SEO */}
<title>
StudentToolsNG - Free CGPA, WAEC & JAMB Calculators for Nigerian Students
</title>

<meta
 name="description"
 content="Free academic tools for Nigerian students including CGPA calculator, WAEC grade calculator, JAMB score calculator, GPA class converter, and study tutorials."
/>

<meta
 name="keywords"
 content="CGPA calculator Nigeria, WAEC calculator, JAMB score calculator, GPA calculator Nigeria, student tools Nigeria"
/>

{/* Canonical */}
<link rel="canonical" href="https://studenttoolsng.com/" />

{/* Open Graph */}
<meta property="og:type" content="website" />

<meta
 property="og:title"
 content="StudentToolsNG - Free Academic Tools for Nigerian Students"
/>

<meta
 property="og:description"
 content="Use free CGPA, WAEC and JAMB calculators. Access tutorials and student resources designed for Nigerian students."
/>

<meta
 property="og:image"
 content="https://studenttoolsng.com/logo.png"
/>

<meta
 property="og:url"
 content="https://studenttoolsng.com/"
/>

{/* Twitter */}
<meta name="twitter:card" content="summary_large_image" />

<meta
 name="twitter:title"
 content="StudentToolsNG - Free Academic Tools"
/>

<meta
 name="twitter:description"
 content="Free CGPA, WAEC, JAMB calculators and tutorials for Nigerian students."
/>

<meta
 name="twitter:image"
 content="https://studenttoolsng.com/logo.png"
/>

{/* Structured Data */}
<script type="application/ld+json">
{JSON.stringify({
 "@context": "https://schema.org",
 "@type": "WebSite",
 name: "StudentToolsNG",
 url: "https://studenttoolsng.com",
 potentialAction: {
  "@type": "SearchAction",
  target: "https://studenttoolsng.com/search?q={search_term_string}",
  "query-input": "required name=search_term_string"
 }
})}
</script>

</Helmet> {/* HERO SECTION */}

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
 <Link to="/tutorials/math-calculator">Mathmatics Calculator</Link>


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
 <Link to="/waec-grade-calculator">
 Open Tool
 </Link>
 </div>

 <div className="tool-card">
 <h3>JAMB Score Calculator</h3>
 <p>Calculate your JAMB total score.</p>
 <Link to="/jamb-score-calculator">
 Open Tool
 </Link>
 </div>

 <div className="tool-card">
 <h3>Maths Calculator</h3>
 <p> Calculate 
    Percentage, 
    Algebra, 
    Fractions, 
    Ratio, 
    Simple Interest and
    Set Theory
    </p>
 <Link to="/tutorials/math-calculator">
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

 <li>
 <Link to="/admission-predictor">
 Admission Predictor
 </Link>
 </li>

 </ul>

 </section>

<section className="student-guides">

<h2>Student Guides</h2>

<div className="guides-grid">

<a href="/how-to-calculate-cgpa" className="guide-card">

<h3>How to Calculate CGPA</h3>

<p>
Learn the step-by-step method to calculate CGPA in Nigerian universities.
</p>

</a>

<a href="/cgpa-calculator-nigeria" className="guide-card">

<h3>CGPA Calculator Nigeria</h3>

<p>
Use our simple CGPA calculator designed for Nigerian students.
</p>

</a>

<a href="/waec-grading-system" className="guide-card">

<h3>WAEC Grading System</h3>

<p>
Understand WAEC grading from A1 to F9.
</p>

</a>

<a href="/jamb-score-calculator-nigeria" className="guide-card">

<h3>JAMB Score Calculator</h3>

<p>
Learn how JAMB scores are calculated and how to estimate your score.
</p>

</a>

</div>

</section>

<section className="trending-section">

<h2>Trending Tutorials</h2>

{/* <p>{tutorial.views} views</p> */}
<div className="trending-grid">

{trending.map((tutorial)=>(
 
<div key={tutorial._id} className="trending-card">

<h3>{tutorial.title}</h3>

<p>{tutorial.excerpt}</p>

<Link to={`/tutorial/${tutorial.slug}`}>
Read Tutorial →
</Link>

</div>

))}

</div>

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

