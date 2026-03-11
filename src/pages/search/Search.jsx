/*
Global Search Page
Displays tutorials based on search keyword
*/

import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import "./search.css";

const Search = () => {

 const [query,setQuery] = useState("");
 const [results,setResults] = useState([]);

 const handleSearch = async ()=>{

  if(!query) return;

  try{

   const res = await API.get(`/tutorials/search?q=${query}`);

   setResults(res.data);

  }catch(err){

   console.log(err);

  }

 };

 return(

  <div className="search-page">

   <h1>Search Tutorials</h1>

   <div className="search-box">

    <input
     placeholder="Search tutorials..."
     value={query}
     onChange={(e)=>setQuery(e.target.value)}
    />

    <button onClick={handleSearch}>
     Search
    </button>

   </div>

   <div className="search-results">

    {results.map((tutorial)=>(
     
     <Link
      key={tutorial._id}
      to={`/tutorial/${tutorial.slug}`}
      className="search-card"
     >

      <h3>{tutorial.title}</h3>

      <p>{tutorial.category}</p>

     </Link>

    ))}

   </div>

  </div>

 );

};

export default Search;