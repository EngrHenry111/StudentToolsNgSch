import { lazy, Suspense, useState } from "react";
import API from "../../services/api";
import { Helmet } from "react-helmet-async";
import "./aiTutor.css"

// Renders the answer as markdown (never as raw HTML); loaded on demand
// because it bundles the code highlighter.
const AiAnswer = lazy(() => import("../tutorialDetails/AiAnswer"));
const AITutor = ()=>{

 const [question,setQuestion] = useState("");
 const [answer,setAnswer] = useState("");
 const [loading,setLoading] = useState(false);

 const askAI = async ()=>{

  if (!question.trim()) return;

  setLoading(true);

  try {
   const res = await API.post("/ai/chat",{
    question
   });
   setAnswer(res.data.answer);
  } catch {
   setAnswer("Sorry, the AI tutor could not answer just now. Please try again in a moment.");
  } finally {
   setLoading(false);
  }

 };

 const url = "https://studenttoolsng.com/ai-tutor";
const title = "AI Tutor for Students | Ask Questions & Get Instant Answers";
const description = "Use our AI tutor to ask academic questions, solve problems, and get instant answers. Perfect for Nigerian students studying mathematics, science, and more.";
const image = "https://studenttoolsng.com/og-image.png";

 return(
<div className="ai-tutor">

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

     <Suspense fallback={<p className="ai-loading">Loading answer…</p>}>
      <AiAnswer answer={answer} />
     </Suspense>

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
  <p>Why does ice float on water?</p>
  <p>Balance the equation Fe + O₂ → Fe₂O₃ and explain each step</p>
  <p>What is the difference between mitosis and meiosis?</p>
  <p>Write a Python function that returns the largest number in a list</p>

  <h2>How to Ask Questions That Get Good Answers</h2>
  <ul>
    <li>Ask one question at a time, and type the full question exactly as it appears in your textbook or past paper.</li>
    <li>Say your level, for example "for SS2", "for JAMB" or "for 100 level", so the explanation matches what you are expected to know.</li>
    <li>For calculations, ask for the working: "show every step" gets a method you can copy in an exam, not just the final number.</li>
    <li>If an explanation is unclear, ask a follow-up such as "explain it more simply" or "give me a Nigerian example".</li>
    <li>After you understand the method, try a similar question on your own before asking for the answer.</li>
  </ul>

  <h2>Use It to Learn, Not to Copy</h2>
  <p>
    The AI tutor works best as a patient study partner that explains a step you
    are stuck on. It is not a way to skip learning: copying answers for an
    assignment teaches you nothing for the exam hall, and many schools treat
    AI-written assignments as malpractice. Read the explanation, close it, and
    try to reproduce the working yourself.
  </p>

  <h2>Check Important Answers</h2>
  <p>
    AI answers are generated automatically and can sometimes be wrong, especially
    for long calculations or questions about current admission rules and
    deadlines. Check important answers against your textbook, your teacher or
    lecturer, or the official WAEC, NECO and JAMB websites. Do not type personal
    details such as your phone number, address or JAMB registration number into
    the question box. For carefully checked explanations of whole topics, read
    our <a href="/tutorials">tutorials</a> in physics, chemistry, biology,
    mathematics and programming.
  </p>

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