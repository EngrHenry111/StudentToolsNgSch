import {useState} from "react";
import API from "../../services/api";
import { Helmet } from "react-helmet-async";
import "./aiTutor.css"
const AITutor = ()=>{

 const [question,setQuestion] = useState("");
 const [answer,setAnswer] = useState("");
 const [loading,setLoading] = useState(false);

 const askAI = async ()=>{

  setLoading(true);

  const res = await API.post("/ai/chat",{
   question
  });

  setAnswer(res.data.answer);

  setLoading(false);

 };

 const url = "https://studenttoolsng.com/ai-tutor";
const title = "AI Tutor for Students | Ask Questions & Get Instant Answers";
const description = "Use our AI tutor to ask academic questions, solve problems, and get instant answers. Perfect for Nigerian students studying mathematics, science, and more.";
const image = "https://studenttoolsng.com/logo.png";

 return(
<div className="ai-tutor-container">

   <Helmet>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={url} />

  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <meta property="og:url" content={url} />

  <meta name="twitter:card" content="summary_large_image" />

  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "AI Tutor",
      url: url,
      applicationCategory: "EducationalApplication",
      operatingSystem: "All",
      description: description
    })}
  </script>
</Helmet>

<h1>AI Tutor for Students</h1>
   <textarea
    placeholder="Ask any question..."
    value={question}
    onChange={(e)=>setQuestion(e.target.value)}
   />

   <button onClick={askAI}>
    Ask AI
   </button>

   {loading && <p className="ai-loading">Thinking...</p>}

   {answer && (

    <div className="ai-response">

     <h3>Answer</h3>

     <div
      className="ai-answer"
      dangerouslySetInnerHTML={{ __html: answer }}
     ></div>

    </div>

   )}

<section className="ai-content">

  <h2>What is an AI Tutor?</h2>
  <p>
    An AI tutor is an intelligent learning assistant that helps students 
    solve problems, understand concepts, and get instant answers to academic questions.
  </p>

  <h2>How This AI Tutor Helps You</h2>
  <ul>
    <li>Answer academic questions instantly</li>
    <li>Explain difficult topics</li>
    <li>Help with assignments and homework</li>
    <li>Support learning in mathematics, science, and more</li>
  </ul>

  <h2>How to Use the AI Tutor</h2>
  <p>
    Type your question in the input box above and click "Ask AI". 
    The system will generate a helpful answer instantly.
  </p>

  <h2>Example Questions You Can Ask</h2>
  <p>What is CGPA?</p>
  <p>Solve 2x + 4 = 10</p>
  <p>Explain WAEC grading system</p>
  
  <p>
You can also use our 
<a href="/cgpa-calculator">CGPA Calculator</a>, 
<a href="/waec-grade-calculator">WAEC Calculator</a>, and 
<a href="/jamb-score-calculator">JAMB Calculator</a>.
</p> 

</section>
</div>
 );

};

export default AITutor;