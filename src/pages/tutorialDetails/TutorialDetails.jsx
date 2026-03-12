
import { useParams } from "react-router-dom";
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

 useEffect(()=>{
 if(slug){
  fetchTutorial();
 }
},[slug]);


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


 const fetchTutorial = async ()=>{

  try{

   const res = await API.get(`/tutorials/${slug}`);

   setTutorial(res.data);

  }catch(err){

   console.log(err);

  }

 };

 if(!tutorial) return <p>Loading...</p>;

 const schemaData = {
 "@context": "https://schema.org",
 "@type": "Article",
 headline: tutorial.title,
 description: tutorial.excerpt || "",
 image: tutorial.image || "student-toolsngsch.vercel.app/logo.png",
 author: {
  "@type": "Person",
  name: "Engr. Henry Akpan"
 },
 publisher: {
  "@type": "Organization",
  name: "StudentToolsNG",
  logo: {
   "@type": "ImageObject",
   url: "student-toolsngsch.vercel.app/logo.png"
  }
 },
 datePublished: tutorial.createdAt,
 dateModified: tutorial.updatedAt
};
 return(

  <div className="tutorial-details">

<Helmet>

<title>{tutorial.title} | StudentToolsNG</title>

<meta
 name="description"
 content={tutorial.excerpt || tutorial.content.slice(0,150)}
/>

<script type="application/ld+json">
{JSON.stringify(schemaData)}
</script>

</Helmet>
  {/* <Helmet>

  <title>{tutorial.title} | StudentToolsNG</title>

  <meta
  name="description"
  content={tutorial.excerpt || tutorial.content.slice(0,150)}
  />

  </Helmet> */}

   <h1>{tutorial.title}</h1>

   <p className="category">{tutorial.category}</p>

   <div
    className="content"
    dangerouslySetInnerHTML={{__html: tutorial.content}}>
    </div>

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

  <div className="ai-answer">
  <ReactMarkdown
  components={{
    code({node, inline, className, children, ...props}) {
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

     {/* <div
    className="ai-answer"
    dangerouslySetInnerHTML={{ __html: answer }}
    ></div> */}
 {/* {answer} */}
</div>
)}

</div>

  <div
  className="tutorial-content"
  dangerouslySetInnerHTML={{__html:tutorial.content}}></div>

  <AuthorCard/>
    </div>

 );

};

export default TutorialDetails;



// /*
// Tutorial Details Page

// Displays full tutorial content
// based on SEO slug
// */

// import { useParams } from "react-router-dom";
// import { useEffect,useState } from "react";
// import API from "../../services/api";
// import "./tutorialDetails.css";

// const TutorialDetails = ()=>{

//  const {slug} = useParams();

//  const [tutorial,setTutorial] = useState(null);

//  useEffect(()=>{
//  fetchTutorial();
// },[slug]);

//  const fetchTutorial = async ()=>{

//   try{

//    const res = await API.get(`/tutorials/${slug}`);

//    setTutorial(res.data);

//   }catch(err){

//    console.log(err);

//   }

//  };

//  if(!tutorial) return <p>Loading...</p>;

//  return(

//   <div className="tutorial-details">

//    <h1>{tutorial.title}</h1>

//    <p className="category">{tutorial.category}</p>

//     <div
//     className="content"
//     dangerouslySetInnerHTML={{__html: tutorial.content}}>
//     </div>

//   </div>

//  );

// };

// export default TutorialDetails;