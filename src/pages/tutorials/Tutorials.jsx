


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

// Topics are stored as slugs ("equations-of-motion"); show them as words.
const topicLabel = (slug) =>
 String(slug || "")
  .replace(/-/g, " ")
  .replace(/\b\w/g, (c) => c.toUpperCase());

const Tutorials = () => {

 const navigate = useNavigate();
 const location = useLocation();

 const { category:paramCategory, topic:paramTopic, subtopic:paramSubtopic } = useParams();

 // The URL is the single source of truth for the filters. Copying the params
 // into separate state let a "reset topic when category changes" effect wipe
 // the topic right after it was read from the URL.
 const category = (paramCategory || "").toLowerCase();
 const topic = (paramTopic || "").toLowerCase();

 const invalidCategory =
  Boolean(paramCategory) && !KNOWN_CATEGORIES.includes(category);

 const [search,setSearch] = useState("");

 // Page belongs to the current listing — switching subject/topic starts
 // again at page 1 without a separate reset effect (and a double fetch).
 const listingKey = `${category}/${topic}`;
 const [pageState,setPageState] = useState({ key: listingKey, page: 1 });
 const page = pageState.key === listingKey ? pageState.page : 1;
 const setPage = (p) => setPageState({ key: listingKey, page: p });

 // Each response is tagged with what it was fetched for, so a stale one is
 // never shown and "loading" is simply "the latest response isn't in yet".
 const fetchKey = `${listingKey}#${page}`;
 const [listing,setListing] = useState({ key: null, tutorials: [], totalPages: 1 });
 const loading = listing.key !== fetchKey;
 const tutorials = loading ? [] : listing.tutorials;
 const totalPages = loading ? 1 : listing.totalPages;

 const [topicsState,setTopicsState] = useState({ category: null, list: [] });
 const topics = topicsState.category === category ? topicsState.list : [];

 // Search results only apply to the listing they were made on.
 const [searchState,setSearchState] = useState({ key: null, results: [] });
 const searchResults = searchState.key === listingKey ? searchState.results : null;

 // 🔥 FETCH TUTORIALS
 useEffect(()=>{

  if(invalidCategory) return;

  let ignore = false;

  const params = new URLSearchParams({ page: String(page) });
  if(category) params.set("category", category);
  if(topic) params.set("topic", topic);

  API.get(`/tutorials?${params}`)
   .then((res)=>{
    if(ignore) return;
    setListing({
     key: fetchKey,
     tutorials: Array.isArray(res.data?.tutorials) ? res.data.tutorials : [],
     totalPages: res.data?.totalPages || 1
    });
   })
   .catch((err)=>{
    if(ignore) return;
    console.log(err);
    setListing({ key: fetchKey, tutorials: [], totalPages: 1 });
   });

  return ()=>{ ignore = true; };

 },[page,category,topic,invalidCategory,fetchKey]);

 // 🔥 FETCH TOPICS for the topic dropdown
 useEffect(()=>{

  if(!category || invalidCategory) return;

  let ignore = false;

  API.get(`/tutorials/topics/${encodeURIComponent(category)}`)
   .then((res)=>{
    if(ignore) return;
    // Only plain, non-empty strings can be <option>s.
    setTopicsState({
     category,
     list: (Array.isArray(res.data) ? res.data : [])
      .filter((t)=> typeof t === "string" && t.trim())
      .sort()
    });
   })
   .catch((err)=>{
    if(!ignore) setTopicsState({ category, list: [] });
    console.log(err);
   });

  return ()=>{ ignore = true; };

 },[category,invalidCategory]);

 const clearSearch = ()=> setSearchState({ key: null, results: [] });

 // 🔥 SEARCH
 const handleSearch = async ()=>{

  const q = search.trim();
  if(!q){
   clearSearch();
   return;
  }

  try{
   const res = await API.get(`/tutorials/search?q=${encodeURIComponent(q)}`);
   setSearchState({ key: listingKey, results: Array.isArray(res.data) ? res.data : [] });
  }catch(err){
   console.log(err);
   setSearchState({ key: listingKey, results: [] });
  }

 };

 const shown = searchResults ?? tutorials;
 


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
 // Any filtered view (category, category+topic, or category+topic+subtopic)
 // is a listing page — a grid of cards plus a short intro. Google flagged
 // pages of exactly this shape as "low value / similar content" (this is
 // also what AdSense's rejection cited). Only the unfiltered /tutorials
 // hub and individual tutorial articles stay indexable.
 const isFilteredPage = Boolean(seoCategory);
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
  <meta property="og:image" content="https://studenttoolsng.com/og-image.png" />
  <meta property="og:site_name" content="StudentToolsNG" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={pageDescription} />
  <meta name="twitter:image" content="https://studenttoolsng.com/og-image.png" />

  {/*
    Category/topic/subtopic filter pages are listing pages — a grid of
    tutorial cards plus a short intro paragraph. Even with unique titles
    and descriptions, they're inherently thin, and Google (both organic
    indexing and the AdSense "low value content" review) flagged this
    class of page. noindex,follow keeps Google crawling the links FROM
    these pages to the real tutorial articles, without indexing the
    listing page itself. The unfiltered /tutorials hub is intentionally
    excluded from this — it stays indexable.
  */}
  {isFilteredPage && (
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
   placeholder="Search tutorials or keywords..."
   value={search}
   onChange={(e)=>setSearch(e.target.value)}
   onKeyDown={(e)=>{ if(e.key === "Enter") handleSearch(); }}
  />

  <button onClick={handleSearch}>
   Search
  </button>
 </div>


 {/* SUBJECT + TOPIC — each choice is a URL, the listing reads the URL */}
 <div className="tutorial-filters">

 <select
  aria-label="Subject"
  value={category}
  onChange={(e)=>{
   const value = e.target.value;
   navigate(value ? `/${value}` : "/tutorials");
  }}
 >
  <option value="">All Subjects</option>
  {tutorialCategoryList.map((c)=>(
   <option key={c} value={c}>{tutorialCategoryLabels[c] || c}</option>
  ))}
 </select>

 {category && (
 <select
  aria-label="Topic"
  value={topic}
  onChange={(e)=>{
   const value = e.target.value;
   navigate(value ? `/${category}/${value}` : `/${category}`);
  }}
 >
  <option value="">All Topics</option>
  {/* A topic opened by URL may not be in the list yet — keep it selectable. */}
  {topic && !topics.includes(topic) && (
   <option value={topic}>{topicLabel(topic)}</option>
  )}
  {topics.map((t)=>(
   <option key={t} value={t}>{topicLabel(t)}</option>
  ))}
 </select>
 )}

 </div>

 {searchResults && (
  <p className="tutorials-status">
   {searchResults.length} result{searchResults.length === 1 ? "" : "s"} for "{search.trim()}"{" "}
   <button
    type="button"
    className="clear-search"
    onClick={()=>{ setSearch(""); clearSearch(); }}
   >
    Clear search
   </button>
  </p>
 )}

 {loading && !searchResults && (
  <p className="tutorials-status">Loading tutorials…</p>
 )}

 {!loading && shown.length === 0 && (
  <p className="tutorials-status">
   {searchResults
    ? "No tutorials match your search."
    : "No tutorials published here yet — check back soon or pick another topic."}
  </p>
 )}

 {/* GRID */}
 <div className="tutorial-grid">

 {shown.map((t)=>(

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
 {!searchResults && totalPages > 1 && (
 <div className="pagination">
 {Array.from({ length: totalPages }, (_,index)=>(
  <button
   key={index}
   onClick={()=>{ setPage(index+1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
   className={page===index+1 ? "active" : ""}
  >
   {index+1}
  </button>
 ))}
 </div>
 )}


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









