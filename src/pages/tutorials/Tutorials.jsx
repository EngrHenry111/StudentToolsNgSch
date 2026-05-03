


import { useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import API from "../../services/api";
import { Helmet } from "react-helmet-async";
import "./tutorials.css";

const Tutorials = () => {

 const [tutorials,setTutorials] = useState([]);
 const [search,setSearch] = useState("");
 const [page,setPage] = useState(1);
 const [totalPages,setTotalPages] = useState(1);
const navigate = useNavigate();

 // FILTER STATES
 const [category,setCategory] = useState("");
 const [topic,setTopic] = useState("");
 const [subtopic,setSubtopic] = useState("");

 const [topics,setTopics] = useState([]);
 const [subtopics,setSubtopics] = useState([]);

const { category:paramCategory, topic:paramTopic, subtopic:paramSubtopic } = useParams();
useEffect(()=>{

 if(paramCategory){
  setCategory(paramCategory);
 }

 if(paramTopic){
  setTopic(paramTopic);
 }

 if(paramSubtopic){
  setSubtopic(paramSubtopic);
 }

},[paramCategory,paramTopic,paramSubtopic]);

 // 🔥 FETCH TUTORIALS
 useEffect(()=>{
  fetchTutorials();
 },[page,category,topic,subtopic]);

 // 🔥 FETCH TOPICS
 useEffect(()=>{
  if(category){
   fetchTopics();
   setTopic("");
   setSubtopic("");
  }
 },[category]);

 // 🔥 FETCH SUBTOPICS
 useEffect(()=>{
  if(category && topic){
   fetchSubtopics();
   setSubtopic("");
  }
 },[topic]);

 const fetchTutorials = async () => {
 try {

  let url = `/tutorials?page=${page}`;

  if (category) {
   url += `&category=${category}`;
  }

  if (topic) {
   url += `&topic=${topic}`;
  }

  const res = await API.get(url);

  setTutorials(res.data.tutorials);
  setTotalPages(res.data.totalPages);

 } catch (err) {
  console.log(err);
 }
};


 const fetchTopics = async ()=>{

  try{
   const res = await API.get(`/tutorials/topics/${category}`);
   setTopics(res.data);
  }catch(err){
   console.log(err);
  }

 };

 const fetchSubtopics = async ()=>{

  try{
   const res = await API.get(
    `/tutorials/subtopics?category=${category}&topic=${topic}`
   );

   setSubtopics(res.data);
  }catch(err){
   console.log(err);
  }

 };

 // 🔥 SEARCH
 const handleSearch = async ()=>{

  try{
   const res = await API.get(`/tutorials/search?q=${search}`);
   setTutorials(res.data);
   setTotalPages(1);
  }catch(err){
   console.log(err);
  }

 };

 return(

 <div className="tutorials-container">

 <Helmet>
  <title>
   Study Tutorials | StudentToolsNG
  </title>

  <meta
   name="description"
   content="Explore tutorials by subject, topic, and subtopic. Learn faster with structured academic content."
  />

  <link
   rel="canonical"
   href="https://studenttoolsng.com/tutorials"
  />

  {/* <script type="application/ld+json">
   {JSON.stringify({
    "@context":"https://schema.org",
    "@type":"ItemList",
    itemListElement: tutorials.map((t,index)=>({
     "@type":"ListItem",
     position:index+1,
     url:`https://studenttoolsng.com/tutorial/${t.slug}`,
     name:t.title
    }))
   })}
  </script> */}
  <script type="application/ld+json">
{JSON.stringify({
 "@context":"https://schema.org",
 "@type":"BreadcrumbList",
 itemListElement:[
  { "@type":"ListItem", position:1, name:"Home", item:"https://studenttoolsng.com" },
  category && { "@type":"ListItem", position:2, name:category, item:`https://studenttoolsng.com/${category}` },
  topic && { "@type":"ListItem", position:3, name:topic, item:`https://studenttoolsng.com/${category}/${topic}` },
  subtopic && { "@type":"ListItem", position:4, name:subtopic, item:`https://studenttoolsng.com/${category}/${topic}/${subtopic}` }
 ].filter(Boolean)
})}
</script>
 </Helmet>

 <h1>Study Tutorials</h1>
 
 <div className="breadcrumb">
 <Link to="/">Home</Link> / 
 <Link to="/tutorials">Tutorials</Link>

 {category && (
  <> / <Link to={`/tutorials/${category}`}>{category}</Link></>
 )}

 {topic && (
  <> / <span>{topic}</span></>
 )}
</div>


 {/* SEARCH */}
 <div className="tutorial-search">
  <input
   placeholder="Search tutorial..."
   value={search}
   onChange={(e)=>setSearch(e.target.value)}
  />

  <button onClick={handleSearch}>
   Search
  </button>
 </div>

 {/* CATEGORY */}
 <select
  value={category}
  onChange={(e)=>{
 const value = e.target.value;
 setCategory(value);
 setTopic("");
 setSubtopic("");
 setPage(1);

 if(value){
  navigate(`/${value}`);
 }else{
  navigate("/tutorials");
 }
 
}}
 >
  <option value="">All Subjects</option>
  <option value="physics">Physics</option>
  <option value="mathematics">Mathematics</option>
  <option value="chemistry">Chemistry</option>
  <option value="biology">Biology</option>
  <option value="programming">Programming</option>
 </select>

 {/* TOPIC */}
 {category && (
 <select
  value={topic}
  onChange={(e)=>{
 const value = e.target.value;
 setTopic(value);
 setSubtopic("");
 setPage(1);

 navigate(`/${category}/${value}`);
}}
 >
  <option value="">All Topics</option>
  {topics.map((t)=>(
   <option key={t} value={t}>
    {t}
   </option>
  ))}
 </select>
 )}

 {/* SUBTOPIC */}
 {topic && (
 <select
  value={subtopic}
  onChange={(e)=>{
 const value = e.target.value;
 setSubtopic(value);
 setPage(1);

 navigate(`/${category}/${topic}/${value}`);
}}

 >
  <option value="">All Subtopics</option>
  {subtopics.map((s)=>(
   <option key={s} value={s}>
    {s}
   </option>
  ))}
 </select>
 )}

 {/* GRID */}
 <div className="tutorial-grid">

 {Array.isArray(tutorials) && tutorials.map((t)=>(

 <Link
  key={t._id}
  to={`/tutorial/${t.slug}`}
  className="tutorial-card"
 >

 <div className="tutorial-image">

 {t.image ? (
  <img src={t.image} alt={t.title}/>
 ) : (
  <div className="tutorial-gradient">
   <h3>{t.title}</h3>
   <span>{t.category}</span>
  </div>
 )}

 </div>

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

 {/* PAGINATION */}
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

 {/* SEO CONTENT */}
 
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









