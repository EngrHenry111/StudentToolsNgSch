


import { useEffect, useState } from "react";
import { Link, useParams,useNavigate, useLocation } from "react-router-dom";
import API from "../../services/api";
import { Helmet } from "react-helmet-async";
import { decode } from "html-entities";
import NotFound from "../notFound/NotFound";
import {
 tutorialCategoryList,
 tutorialCategoryLabels
} from "../../utils/tutorialCategories";
import "./tutorials.css";

// The category listing route is served by the catch-all "/:category" path,
// so any unknown top-level slug would otherwise render an empty tutorials
// listing (a soft 404). Only these categories are real.
const KNOWN_CATEGORIES = tutorialCategoryList;

const Tutorials = () => {

 const [tutorials,setTutorials] = useState([]);
 const [search,setSearch] = useState("");
 const [page,setPage] = useState(1);
 const [totalPages,setTotalPages] = useState(1);
const navigate = useNavigate();
const location = useLocation();

 // FILTER STATES
 const [category,setCategory] = useState("");
 const [topic,setTopic] = useState("");
 const [subtopic,setSubtopic] = useState("");

 const [topics,setTopics] = useState([]);
 const [subtopics,setSubtopics] = useState([]);

const { category:paramCategory, topic:paramTopic, subtopic:paramSubtopic } = useParams();

const invalidCategory =
 paramCategory &&
 !KNOWN_CATEGORIES.includes(paramCategory.toLowerCase());

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
 


const stripHTML = (html) => {
 if (!html) return "";

 const decoded = decode(html);

 return decoded.replace(/<[^>]+>/g, "");
};

 if (invalidCategory) {
  return <NotFound />;
 }

 // Drive SEO tags directly off the URL params (not the async filter state)
 // so the correct title/description/canonical render on the first paint,
 // before the fetch effects run.
 const seoCategory = paramCategory || "";
 const seoTopic = paramTopic || "";
 const seoSubtopic = paramSubtopic || "";

 const isSubtopicPage = Boolean(seoSubtopic);
 const canonicalPath = isSubtopicPage
  ? `/${seoCategory}/${seoTopic}`
  : location.pathname;
 const canonicalUrl = `https://studenttoolsng.com${canonicalPath}`;

 const pageTitle = seoSubtopic
  ? `${seoSubtopic} Tutorials | StudentToolsNG`
  : seoTopic
  ? `${seoTopic} Tutorials | StudentToolsNG`
  : seoCategory
  ? `${seoCategory} Tutorials | StudentToolsNG`
  : "Study Tutorials | StudentToolsNG";

 const pageDescription = seoSubtopic
  ? `Free ${seoSubtopic} tutorials and study guides under ${seoTopic} (${seoCategory}) — learn ${seoSubtopic} step by step with StudentToolsNG.`
  : seoTopic
  ? `Browse all ${seoTopic} tutorials under ${seoCategory} on StudentToolsNG — structured, easy-to-follow lessons for Nigerian students.`
  : seoCategory
  ? `Explore every ${seoCategory} tutorial on StudentToolsNG, organized by topic to help you study faster and understand more.`
  : "Explore tutorials by subject, topic, and subtopic. Learn faster with structured academic content built for Nigerian students.";

 return(

 <div className="tutorials-holder">

 <Helmet>
  <title>{pageTitle}</title>

  {/*
    Previously this was one identical, static description across every
    single category/topic/subtopic combination. That made Google treat
    a large number of distinct URLs as near-duplicate content, which is
    a likely contributor to the "duplicate canonical" issues in Search
    Console. Each level now gets its own genuinely distinct description.
  */}
  <meta name="description" content={pageDescription} />

  <link rel="canonical" href={canonicalUrl} />

  {/* Open Graph / Twitter */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={pageDescription} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:image" content="https://studenttoolsng.com/logoH.png" />
  <meta property="og:site_name" content="StudentToolsNG" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={pageDescription} />
  <meta name="twitter:image" content="https://studenttoolsng.com/logoH.png" />

  {/*
    Subtopic-level pages have no dedicated content of their own (there is
    no subtopic field on tutorials) — they are a filtered view of the
    topic page, so they are canonicalised to the topic page and excluded
    from indexing to avoid duplicate-content signals.
  */}
  {isSubtopicPage && (
   <meta name="robots" content="noindex, follow" />
  )}

<script type="application/ld+json">
{JSON.stringify({
 "@context":"https://schema.org",
 "@type":"BreadcrumbList",
 itemListElement:[
  { "@type":"ListItem", position:1, name:"Home", item:"https://studenttoolsng.com" },
  seoCategory && { "@type":"ListItem", position:2, name:seoCategory, item:`https://studenttoolsng.com/${seoCategory}` },
  seoTopic && { "@type":"ListItem", position:3, name:seoTopic, item:`https://studenttoolsng.com/${seoCategory}/${seoTopic}` },
  seoSubtopic && { "@type":"ListItem", position:4, name:seoSubtopic, item:`https://studenttoolsng.com/${seoCategory}/${seoTopic}/${seoSubtopic}` }
 ].filter(Boolean)
})}
</script>
 </Helmet>

 <h1>
{
 seoSubtopic
 ? `${seoSubtopic} Tutorials`
 : seoTopic
 ? `${seoTopic} Tutorials`
 : seoCategory
 ? `${seoCategory} Tutorials`
 : "Study Tutorials"
}
</h1>

{/*
  Short, genuinely unique text per page level — previously every
  category/topic/subtopic page showed only filtered tutorial cards
  with no unique body text at all, which reads as thin/duplicate
  content to Google across hundreds of distinct URLs.
*/}
<p className="tutorials-intro">
{
 seoSubtopic
 ? `Browse free ${seoSubtopic} tutorials under ${seoTopic} (${seoCategory}) on StudentToolsNG — clear, step-by-step lessons built for Nigerian students.`
 : seoTopic
 ? `Explore ${seoTopic} tutorials under ${seoCategory} — structured lessons covering every major concept in this topic.`
 : seoCategory
 ? `All ${seoCategory} tutorials on StudentToolsNG, organized by topic to help you study efficiently and find exactly what you need.`
 : "Browse tutorials across every subject — filter by category, topic, and subtopic to find structured lessons built for Nigerian students."
}
</p>
 
 <div className="breadcrumb">
 <Link to="/">Home</Link> / 
 <Link to="/tutorials">Tutorials</Link>

 {seoCategory && (
  <> / <Link to={`/${seoCategory}`}>{seoCategory}</Link></>
 )}

 {seoTopic && (
  <> / {seoSubtopic ? <Link to={`/${seoCategory}/${seoTopic}`}>{seoTopic}</Link> : <span>{seoTopic}</span>}</>
 )}

 {seoSubtopic && (
  <> / <span>{seoSubtopic}</span></>
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
  {tutorialCategoryList.map((c)=>(
   <option key={c} value={c}>{tutorialCategoryLabels[c] || c}</option>
  ))}
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

 {/* <p className="excerpt">
  {t.excerpt || t.content.slice(0,120)+"..."}
 </p> */}
 {/* <p className="excerpt">
  {t.excerpt || stripHTML(t.content).slice(0,120) + "..."}
</p> */}
<p className="excerpt">
  {stripHTML(t.excerpt || t.content).slice(0,120) + "..."}
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

 {/*
   Site-wide helper content — only shown on the unfiltered /tutorials
   landing page. Previously this identical block rendered on every
   category/topic/subtopic URL, which was a strong duplicate-content
   signal across hundreds of pages.
 */}
 {!seoCategory && (
 <div className="tutorials-seo">
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
    Use our{" "}
    <Link to="/cgpa-calculator">CGPA Calculator</Link>,{" "}
    <Link to="/waec-grade-calculator">WAEC Calculator</Link>, and{" "}
    <Link to="/jamb-score-calculator">JAMB Calculator</Link>{" "}
    alongside these tutorials.
  </p>
 </div>
 )}
 </div>

 );

};

export default Tutorials;









