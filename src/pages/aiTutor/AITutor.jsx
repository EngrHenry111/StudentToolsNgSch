import {useState} from "react";
import API from "../../services/api";
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

 return(
<div className="ai-tutor-container">

   <h1>AI Tutor</h1>

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

</div>
 );

};

export default AITutor;