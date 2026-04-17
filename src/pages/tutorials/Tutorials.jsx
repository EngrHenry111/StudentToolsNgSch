/*
Tutorials Page

Fetches tutorials from backend API
Displays tutorial list
Supports search
*/

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import { Helmet } from "react-helmet-async";
import "./tutorials.css";

const Tutorials = () => {

 const [tutorials,setTutorials] = useState([]);
 const [search,setSearch] = useState("");
 const [page,setPage] = useState(1);
const [totalPages,setTotalPages] = useState(1);

 useEffect(()=>{

 fetchTutorials();

},[page]);
const fetchTutorials = async ()=>{

 try{

  const res = await API.get(`/tutorials?page=${page}`);

  setTutorials(res.data.tutorials);
  setTotalPages(res.data.totalPages);

 }catch(err){

  console.log(err);

 }

};
 const handleSearch = async ()=>{

  try{

   const res = await API.get(`/tutorials/search?q=${search}`);

   setTutorials(res.data);

  }catch(err){

   console.log(err);

  }

 };

 return(

  <div className="tutorials-container">

<Helmet>

{/* Primary SEO */}
<title>
Study Tutorials for Nigerian Students | CGPA, WAEC, JAMB Guides
</title>

<meta
 name="description"
 content="Explore educational tutorials for Nigerian students including CGPA calculation, WAEC grading system, JAMB score guides, and study tips."
/>

<meta
 name="keywords"
 content="study tutorials Nigeria, CGPA tutorials, WAEC grading system guide, JAMB tutorials, student education Nigeria"
/>

{/* Canonical */}
<link
 rel="canonical"
 href="https://studenttoolsng.com/tutorials"
/>

{/* Open Graph */}
<meta property="og:type" content="website" />

<meta
 property="og:title"
 content="Study Tutorials for Nigerian Students"
/>

<meta
 property="og:description"
 content="Learn CGPA calculation, WAEC grading system, JAMB scoring and more with our student tutorials."
/>

<meta
 property="og:image"
 content="https://studenttoolsng.com/logo.png"
/>

<meta
 property="og:url"
 content="https://studenttoolsng.com/tutorials"
/>

<meta property="og:site_name" content="StudentToolsNG" />

{/* Twitter */}
<meta name="twitter:card" content="summary_large_image" />

<meta
 name="twitter:title"
 content="Student Tutorials - CGPA, WAEC, JAMB Guides"
/>

<meta
 name="twitter:description"
 content="Free tutorials for Nigerian students covering CGPA, WAEC, JAMB and study strategies."
/>

<meta
 name="twitter:image"
 content="https://studenttoolsng.com/logo.png"
/>

{/* Structured Data (ItemList - VERY IMPORTANT) */}
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: tutorials.map((t, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `https://studenttoolsng.com/tutorial/${t.slug}`,
    name: t.title
  }))
})}
</script>

</Helmet>
   <h1>Study Tutorials</h1>

   <div className="tutorial-search">

    <input
     placeholder="Search tutorial..."
     onChange={(e)=>setSearch(e.target.value)}
    />

    <button onClick={handleSearch}>
     Search
    </button>

   </div>

  <div className="tutorial-grid">

 {Array.isArray(tutorials) && tutorials.map((t)=>(

    <Link
    
    key={t._id}
    to={`/tutorial/${t.slug}`}
    className="tutorial-card"
    >

      <div className="tutorial-image">

 {t.image ? (

  <img
   src={t.image}
   alt={t.title}
  />

 ) : (

  <div className="tutorial-gradient">

   <h3>{t.title}</h3>

   <span>{t.category}</span>

  </div>

 )}

</div>
{/* 
   <div className="tutorial-image">
    <img
     src={t.image || "https://via.placeholder.com/400"}
     alt={t.title}
    />
   </div> */}

   <div className="tutorial-content">

    <h3>{t.title}</h3>

    <p className="excerpt">
     {t.excerpt || t.content.slice(0,120)+"..."}
    </p>

    <span className="read-more">
     Read More →
    </span>

   </div>

  </Link>

 ))}

</div>

   <div className="pagination">

 {[...Array(totalPages)].map((_,index)=>(
  
  <button
   key={index}
   onClick={()=>setPage(index+1)}
   className={page===index+1 ? "active" : ""}
  >
   {index+1}
  </button>

 ))}

</div>

<h2>What You Will Learn</h2>
<ul>
  <li>How to calculate CGPA in Nigerian universities</li>
  <li>Understanding WAEC grading system</li>
  <li>JAMB score calculation and admission tips</li>
  <li>Effective study techniques</li>
</ul>               

<p className="tutorial-intro"> 
  Explore a wide range of educational tutorials designed for Nigerian students. 
  Learn how to calculate CGPA, understand WAEC grading system, improve your JAMB score, 
  and discover effective study strategies to excel academically.
</p>    

<p className="plink">
  Use our 
  <a href="/cgpa-calculator">CGPA Calculator</a>, 
  <a href="/waec-grade-calculator">WAEC Calculator</a>, and 
  <a href="/jamb-score-calculator">JAMB Calculator</a> 
  alongside these tutorials.
</p>
  </div>

 );

};

export default Tutorials;