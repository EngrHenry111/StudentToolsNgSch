
import { useParams, Link } from "react-router-dom";
import { useEffect,useState } from "react";
import API from "../../services/api";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Helmet } from "react-helmet-async";
import AuthorCard from "../../components/AuthorCard";
import { decode } from "html-entities";
import AdUnit from "../../components/ads/AdUnit";
import NotFound from "../notFound/NotFound";
import "./tutorialDetails.css";

const SITE = "https://studenttoolsng.com";
const FALLBACK_IMAGE = `${SITE}/logoH.png`;

// Plain-text summary from (possibly double-encoded) HTML content, for use in
// meta/OG description tags.
const toPlainText = (html = "") =>
 decode(decode(html))
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim();

// Turn a raw (often double HTML-encoded) article body into the HTML we
// actually render, plus its table of contents:
//   - decode entity-escaped markup so tags render instead of showing as text
//   - demote any embedded <h1> to <h2> (the page already has one real <h1>)
//   - give every section heading a stable id so the TOC links can scroll to it
const buildArticle = (rawHtml = "") => {
 const decoded = decode(decode(rawHtml)).replace(
  /<(\/?)h1(\s[^>]*)?>/gi,
  "<$1h2$2>"
 );

 if (typeof window === "undefined" || !window.DOMParser) {
  return { html: decoded, toc: [] };
 }

 const doc = new DOMParser().parseFromString(decoded, "text/html");
 const toc = [];

 doc.querySelectorAll("h2, h3").forEach((heading, index) => {
  const id = `section-${index}`;
  heading.setAttribute("id", id);
  toc.push({ id, text: heading.textContent.trim() });
 });

 return { html: doc.body.innerHTML, toc };
};

const TutorialDetails = ()=>{

 const {slug} = useParams();

const [tutorial,setTutorial] = useState(null);
const [notFound,setNotFound] = useState(false);
const [question,setQuestion] = useState("");
const [answer,setAnswer] = useState("");
const [loading,setLoading] = useState(false);
const [related,setRelated] = useState([]);
const [toc,setToc] = useState([]);
const [readingTime,setReadingTime] = useState(0);
const [scrollProgress,setScrollProgress] = useState(0);
const [trending,setTrending] = useState([]);

// fetch tutorial
// load tutorial
useEffect(()=>{

 if(slug){
  fetchTutorial();
 }

},[slug]);

useEffect(()=>{
 fetchTrending();
},[]);

// load related tutorials
useEffect(()=>{

 if(tutorial){
  fetchRelated();
 }

},[tutorial]);

const fetchTrending = async ()=>{

 try{

  const res = await API.get("/tutorials/trending");

  setTrending(res.data);

 }catch(err){

  console.log(err);

 }

};


useEffect(()=>{

 const handleScroll = ()=>{

  const totalHeight =
   document.documentElement.scrollHeight -
   document.documentElement.clientHeight;

  const scroll = window.scrollY;

  const progress = (scroll / totalHeight) * 100;

  setScrollProgress(progress);

 };

 window.addEventListener("scroll",handleScroll);

 return ()=>window.removeEventListener("scroll",handleScroll);

},[]);

const fetchRelated = async ()=>{

 if(!tutorial || !tutorial.category) return;

 try{

  const res = await API.get(
   `/tutorials/related?category=${tutorial.category}&id=${tutorial._id}`
  );

  setRelated(res.data);

 }catch(error){

  console.log(error);

 }

};

// const fetchRelated = async ()=>{
//  try{

//   const res = await API.get(
//    `/tutorials/related?category=${tutorial.category}&id=${tutorial._id}`
//   );

//   setRelated(res.data);

//  }catch(error){

//   console.log(error);

//  }

// };


const askAI = async ()=>{

 try{

  setLoading(true);

  const res = await API.post("/ai/chat",{

   question,
   tutorialContent: tutorial.content

  });

  setAnswer(res.data.answer);

 }catch(err){

  console.log(err);

 }

 setLoading(false);

};


const addInternalLinks = async (html) => {

 try {

  const res = await API.get("/tutorials");

  const tutorials = res.data.tutorials || res.data;

  let updatedHTML = html;

  tutorials.forEach((t) => {

   if(!t.title || t.slug === slug) return;

   const safeTitle = t.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
   const regex = new RegExp(`\\b${safeTitle}\\b`, "gi");

   updatedHTML = updatedHTML.replace(
    regex,
    `<a href="/tutorial/${t.slug}" class="internal-link">${t.title}</a>`
    );
  });

  return updatedHTML;

 } catch (error) {

  console.log(error);

  return html;

 }

};


 const fetchTutorial = async ()=>{
  // console.log(tutorial.content);

 try{

  setNotFound(false);

  const res = await API.get(`/tutorials/${slug}`);


  const htmlWithLinks = await addInternalLinks(res.data.content);

  const { html: articleHtml, toc: articleToc } = buildArticle(htmlWithLinks);

  setTutorial({
   ...res.data,
   content: articleHtml
  });

  setToc(articleToc);
  calculateReadingTime(articleHtml);

 }catch(err){

  console.log(err);

  if(err?.response?.status === 404){
   setNotFound(true);
  }

 }

};

const calculateReadingTime = (html)=>{

 const text = decode(decode(html)).replace(/<[^>]+>/g," ").trim();

 const words = text.split(/\s+/).filter(Boolean).length;

 const minutes = Math.ceil(words / 200);

 setReadingTime(minutes);

};


const generateFAQ = (content)=>{

 const text = content.replace(/<[^>]*>/g,"");

 const questions = [];

 if(text.toLowerCase().includes("cgpa")){

  questions.push({
   question:"What is CGPA?",
   answer:"CGPA stands for Cumulative Grade Point Average and represents the overall academic performance of a student."
  });

  questions.push({
   question:"How is CGPA calculated?",
   answer:"CGPA is calculated by dividing the total grade points earned by the total credit units taken."
  });

 }

 if(text.toLowerCase().includes("waec")){

  questions.push({
   question:"What is WAEC grading system?",
   answer:"WAEC grading ranges from A1 for excellent to F9 for fail."
  });

 }

 if(text.toLowerCase().includes("jamb")){

  questions.push({
   question:"What is the maximum JAMB score?",
   answer:"The maximum JAMB score is 400 from four subjects each worth 100 marks."
  });

 }

 return questions;

};


 if(notFound){
  return <NotFound />;
 }

 if(!tutorial){
  return (
   <div className="tutorial-layt">
    <Helmet>
     <title>Loading tutorial… | StudentToolsNG</title>
     <link rel="canonical" href={`${SITE}/tutorial/${slug}`} />
    </Helmet>
    <p>Loading...</p>
   </div>
  );
 }

 const faqData = generateFAQ(tutorial.content);

 const canonicalUrl = `${SITE}/tutorial/${tutorial.slug}`;

 // tutorial.content is already decoded, h1-demoted and heading-id'd by
 // buildArticle() in fetchTutorial.
 const plainContent = toPlainText(tutorial.content);
 const metaDescription = (
  tutorial.excerpt?.trim() || plainContent
 ).slice(0, 160);
 const shareImage = tutorial.image || FALLBACK_IMAGE;

 const schemaData = {
 "@context": "https://schema.org",
 "@type": "Article",
 headline: tutorial.title,
 description: metaDescription,
 image: shareImage,
 author: {
  "@type": "Person",
  name: "Engr. Henry Akpan",
  url: `${SITE}/author`
 },
 publisher: {
  "@type": "Organization",
  name: "StudentToolsNG",
  logo: {
   "@type": "ImageObject",
   url: FALLBACK_IMAGE
  }
 },
 mainEntityOfPage: canonicalUrl,
 datePublished: tutorial.createdAt,
 dateModified: tutorial.updatedAt
};

 return(

  <div className="tutorial-layt">
    <div className="breadcrumb">

<Link to="/">Home</Link>

{" > "}
<Link to="/tutorials">Tutorials</Link>

{" > "}
<Link to={`/${tutorial.category}`}>
 {tutorial.category}
</Link>

{" > "}
<Link to={`/${tutorial.category}/${tutorial.topic}`}>
 {tutorial.topic}
</Link>

{" > "}
<span>{tutorial.title}</span>

</div>

  <div className="tutorial-main">

<Helmet>

{/* Primary SEO */}
<title>{tutorial.title} | StudentToolsNG</title>

<meta name="description" content={metaDescription} />

<meta
 name="keywords"
 content={`${tutorial.title}, student tutorials Nigeria, academic tutorials, ${tutorial.category}`}
/>

{/* Canonical */}
<link rel="canonical" href={canonicalUrl} />

{/* Open Graph */}
<meta property="og:type" content="article" />

<meta property="og:title" content={tutorial.title} />

<meta property="og:description" content={metaDescription} />

<meta property="og:image" content={shareImage} />

<meta property="og:url" content={canonicalUrl} />

<meta property="og:site_name" content="StudentToolsNG" />

{/* Article meta (VERY IMPORTANT) */}
<meta
 property="article:published_time"
 content={tutorial.createdAt}
/>

<meta
 property="article:modified_time"
 content={tutorial.updatedAt}
/>

<meta
 property="article:author"
 content="Henry Akpan"
/>

{/* Twitter */}
<meta name="twitter:card" content="summary_large_image" />

<meta name="twitter:title" content={tutorial.title} />

<meta name="twitter:description" content={metaDescription} />

<meta name="twitter:image" content={shareImage} />

{/* FAQ Schema — only when there are real FAQ entries */}
{faqData.length > 0 && (
<script type="application/ld+json">
{JSON.stringify({
 "@context":"https://schema.org",
 "@type":"FAQPage",
 mainEntity: faqData.map(faq=>({
  "@type":"Question",
  name: faq.question,
  acceptedAnswer:{
   "@type":"Answer",
   text: faq.answer
  }
 }))
})}
</script>
)}

{/* Breadcrumb Schema */}
<script type="application/ld+json">
{JSON.stringify({
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 itemListElement: [
  {
   "@type": "ListItem",
   position: 1,
   name: "Home",
   item: "https://studenttoolsng.com"
  },
  {
   "@type": "ListItem",
   position: 2,
   name: "Tutorials",
   item: "https://studenttoolsng.com/tutorials"
  },
  {
   "@type": "ListItem",
   position: 3,
   name: tutorial.title,
   item: `https://studenttoolsng.com/tutorial/${tutorial.slug}`
  }
 ]
})}
</script>

{/* Article Schema */}
<script type="application/ld+json">
{JSON.stringify(schemaData)}
</script>

</Helmet>
<div
 className="reading-progress"
 style={{width:`${scrollProgress}%`}}>
 </div>
  
  {toc.length > 0 && (
<div className="toc">
<h3>Table of Contents</h3>
<ul>
{toc.map((item)=>(
<li key={item.id}>
<a href={`#${item.id}`}>
{item.text}
</a>
</li>
))}
</ul>
</div>
)}

   <h1>{tutorial.title}</h1>
   <p className="category">{tutorial.category}</p>
   <p className="reading-time">
    ⏱ {readingTime} min read
   </p>

    <div
 className="content"
 dangerouslySetInnerHTML={{
  __html: tutorial.content
  }}
  >
  </div>

        {faqData.length > 0 && (
    <div className="faq-section">
    <h2>Frequently Asked Questions</h2>
    {faqData.map((faq,index)=>(
    <div key={index} className="faq-item">
    <h3>{faq.question}</h3>
    <p>{faq.answer}</p>
    </div>
    ))}
    </div>
    )}

  <div className="ai-assistant">
<h3>Ask AI Questions About This Topic</h3>

    <input
    placeholder="Ask a question..."
    value={question}
    onChange={(e)=>setQuestion(e.target.value)}
    />

    <button onClick={askAI}>
    Ask AI
    </button>

    {loading && <p>AI thinking...</p>}

    {answer && (
    <div className="ai-answer">

    <ReactMarkdown
    components={{
    code({node, inline, className, children}) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
      <SyntaxHighlighter
        style={oneDark}
        language={match[1]}
        PreTag="div"
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
      ) : (
      <code className={className}>{children}</code>
      );
      
    }
    }}
    >
    {answer}
    </ReactMarkdown>

    </div>
    )}
    </div>

<AdUnit slot="0000000000" />

<h2>Related Tutorials</h2>

<div className="related-grid">

{related.map((t)=>(
 
<div key={t._id} className="related-card">

<h3>{t.title}</h3>

<p>{t.excerpt}</p>

<Link to={`/tutorial/${t.slug}`}>
Read Tutorial
</Link>

</div>

))}

</div>



<div className="tutorial-sidebar">
  
<h3>Trending Tutorials</h3>

{trending.map((t)=>(

<div key={t._id} className="sidebar-card">

<Link to={`/tutorial/${t.slug}`}>
 {t.title}
</Link>

</div>

))}

<p className="last-updated">
Last updated: {new Date(tutorial.updatedAt).toDateString()}
</p>
<h3>Study Resources</h3>

<ul className="sidebar-links">

<li>
<Link to="/cgpa-calculator">CGPA Calculator</Link>
</li>

<li>
<Link to="/waec-grade-calculator">WAEC Calculator</Link>
</li>

<li>
<Link to="/jamb-score-calculator">JAMB Calculator</Link>
</li>

<li>
<Link to="/study-planner">Study Planner</Link>
</li>

</ul>

<div className="ad-box">

Ad Space

</div>
</div>

</div>

  <AuthorCard/>

    </div>

 );

};

export default TutorialDetails;
