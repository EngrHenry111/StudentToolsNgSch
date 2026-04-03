/*
Global Search Page
Displays tutorials based on search keyword
*/


import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import API from "../../services/api";

const Search = ()=>{

 const query = new URLSearchParams(useLocation().search);
 const q = query.get("q");

 const [results,setResults] = useState([]);

 const search = async ()=>{

  try{

   const res = await API.get(`/tutorials/search?q=${q}`);

   setResults(res.data);

  }catch(err){

   console.log(err);

  }

 };

 useState(()=>{
  if(q) search();
 },[q]);

 return(

 <div className="search-page">

 <h1>Search Results for "{q}"</h1>

 {results.map((item)=>(
  
 <div key={item._id} className="search-card">

 <Link to={`/tutorial/${item.slug}`}>
 <h3>{item.title}</h3>
 </Link>

 <p>{item.excerpt}</p>

 </div>

 ))}

 </div>

 );

};

export default Search;


// import { useState } from "react";
// import { Link } from "react-router-dom";
// import API from "../../services/api";
// import "./search.css";

// const Search = () => {

//  const [query,setQuery] = useState("");
//  const [results,setResults] = useState([]);

//  const handleSearch = async ()=>{

//   if(!query) return;

//   try{

//    const res = await API.get(`/tutorials/search?q=${query}`);

//    setResults(res.data);

//   }catch(err){

//    console.log(err);

//   }

//  };

//  return(

//   <div className="search-page">

//    <h1>Search Tutorials</h1>

//    <div className="search-box">

//     <input
//      placeholder="Search tutorials..."
//      value={query}
//      onChange={(e)=>setQuery(e.target.value)}
//     />

//     <button onClick={handleSearch}>
//      Search
//     </button>

//    </div>

//    <div className="search-results">

//     {results.map((tutorial)=>(
     
//      <Link
//       key={tutorial._id}
//       to={`/tutorial/${tutorial.slug}`}
//       className="search-card"
//      >

//       <h3>{tutorial.title}</h3>

//       <p>{tutorial.category}</p>

//      </Link>

//     ))}

//    </div>

//   </div>

//  );

// };

// export default Search;