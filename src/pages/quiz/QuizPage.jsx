import { useEffect, useState } from "react";
import axios from "axios";

const QuizPage = () => {
  const [question, setQuestion] = useState(null);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");

  const fetchQuestion = async () => {
    const res = await axios.get("/api/quiz/question?topic=percentage");
    setQuestion(res.data);
    setInput("");
    setFeedback("");
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const checkAnswer = () => {
    if (Number(input) === question.answer) {
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Wrong. Answer: ${question.answer}`);
    }
  };

  return (
    <div className="quiz-page">

      <h2>Quiz Mode</h2>

      {question && (
        <>
          <h3>{question.question}</h3>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button onClick={checkAnswer}>Submit</button>

          <p>{feedback}</p>

          <button onClick={fetchQuestion}>Next</button>
        </>
      )}

    </div>
  );
};

export default QuizPage;