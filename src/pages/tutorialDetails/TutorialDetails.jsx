
import { useParams, Link } from "react-router-dom";
import { useEffect,useState } from "react";
import API from "../../services/api";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Helmet } from "react-helmet";
import AuthorCard from "../../components/AuthorCard";
import "./tutorialDetails.css";

const TutorialDetails = ()=>{

 const {slug} = useParams();

const [tutorial,setTutorial] = useState(null);
const [question,setQuestion] = useState("");
const [answer,setAnswer] = useState("");
const [loading,setLoading] = useState(false);
const [related,setRelated] = useState([]);
const [toc,setToc] = useState([]);
const [readingTime,setReadingTime] = useState(0);
const [scrollProgress,setScrollProgress] = useState(0);
// fetch tutorial
// load tutorial
useEffect(()=>{

 if(slug){
  fetchTutorial();
 }

},[slug]);


// load related tutorials
useEffect(()=>{

 if(tutorial){
  fetchRelated();
 }

},[tutorial]);


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

   const regex = new RegExp(`\\b${t.title}\\b`, "gi");

   updatedHTML = updatedHTML.replace(
    regex,
    `<a href="/tutorial/${t.slug}" class="internal-link">${t.title}</a>`
    );
  //  updatedHTML = updatedHTML.replace(
  //   regex,
  //   `<a href="/tutorial/${t.slug}" class="internal-link">${t.title}</a>`
  //  );

  });

  return updatedHTML;

 } catch (error) {

  console.log(error);

  return html;

 }

};


 const fetchTutorial = async ()=>{

 try{

  const res = await API.get(`/tutorials/${slug}`);

  const htmlWithLinks = await addInternalLinks(res.data.content);

  setTutorial({
   ...res.data,
   content: htmlWithLinks
  });

  generateTOC(htmlWithLinks);
  calculateReadingTime(htmlWithLinks);

 }catch(err){

  console.log(err);

 }

};

 const generateTOC = (html)=>{
 const parser = new DOMParser();
 const doc = parser.parseFromString(html,"text/html");
 const headings = doc.querySelectorAll("h1, h2, h3");
 const items = [];
 headings.forEach((heading,index)=>{
  const id = `section-${index}`;
  heading.id = id;
  items.push({
   text: heading.innerText,
   id:id
  });

 });

 setToc(items);

};


const calculateReadingTime = (html)=>{

 const text = html.replace(/<[^>]+>/g,"");

 const words = text.split(/\s+/).length;

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


 if(!tutorial) return <p>Loading...</p>;
 const faqData = tutorial ? generateFAQ(tutorial.content) : [];

 const schemaData = {
 "@context": "https://schema.org",
 "@type": "Article",
 headline: tutorial.title,
 description: tutorial.excerpt || "",
//  image: tutorial.image || "student-toolsngsch.vercel.app/logo.png",
 image: tutorial.image || "https://student-toolsngsch.vercel.app/logoH.png",
 author: {
  "@type": "Person",
  name: "Engr. Henry Akpan"
 },
 publisher: {
  "@type": "Organization",
  name: "StudentToolsNG",
  logo: {
   "@type": "ImageObject",
   url: "https://student-toolsngsch.vercel.app/logoH.png"
  }
 },
 datePublished: tutorial.createdAt,
 dateModified: tutorial.updatedAt
};
 return(

  <div className="tutorial-layout">
  <div className="tutorial-main">

<Helmet>

<title>{tutorial.title} | StudentToolsNG</title>

<meta
 name="description"
 content={tutorial.excerpt || tutorial.content.slice(0,150)}
/>

<meta property="og:title" content={tutorial.title} />

<meta
 property="og:description"
 content={tutorial.excerpt || tutorial.content.slice(0,150)}
/>

<meta
 property="og:image"
 content={tutorial.image || "https://student-toolsngsch.vercel.app/logo.png"}
/>

<meta
 property="og:url"
 content={`https://student-toolsngsch.vercel.app/tutorial/${tutorial.slug}`}
/>

<meta property="og:type" content="article" />

<meta name="twitter:card" content="summary_large_image" />

<meta name="twitter:title" content={tutorial.title} />

<meta
 name="twitter:description"
 content={tutorial.excerpt || tutorial.content.slice(0,150)}
/>

<meta
 name="twitter:image"
 content={tutorial.image || "https://student-toolsngsch.vercel.app/logo.png"}
/>

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
   item: "https://student-toolsngsch.vercel.app"
  },
  {
   "@type": "ListItem",
   position: 2,
   name: "Tutorials",
   item: "https://student-toolsngsch.vercel.app/tutorials"
  },
  {
   "@type": "ListItem",
   position: 3,
   name: tutorial.title,
   item: `https://student-toolsngsch.vercel.app/tutorial/${tutorial.slug}`
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
    dangerouslySetInnerHTML={{__html: tutorial.content}}>
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
    <h3>Ask AI about this tutorial</h3>

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

  {/* <div
  className="tutorial-content"
  dangerouslySetInnerHTML={{__html:tutorial.content}}>
  </div> */}


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

{related.slice(0,3).map((t)=>(
  
<div key={t._id} className="sidebar-card">

<Link to={`/tutorial/${t.slug}`}>
{t.title}
</Link>

</div>

))}

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
