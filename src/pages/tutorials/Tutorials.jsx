/*
Tutorials Page

Fetches tutorials from backend API
Displays tutorial list
Supports search
*/

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import { Helmet } from "react-helmet";
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

<title>Study Tutorials | StudentToolsNG</title>

<meta
 name="description"
 content="Educational tutorials covering CGPA calculation, WAEC grading system, JAMB score calculation and study tips for students."
/>


<link
    rel="canonical"
    href="https://studenttoolsng.com/tutorials"
  />
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


  </div>

 );

};

export default Tutorials;