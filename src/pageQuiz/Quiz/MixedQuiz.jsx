import { useEffect, useState } from "react";

const MixedQuiz = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("https://studenttoolsserver.onrender.com/api/quiz/ai-mixed")
      .then(res => res.json())
      .then(setQuestions);
  }, []);

  return (
    <div>
      <h2>Mixed Quiz</h2>

      {questions.map((q, i) => (
        <div key={i}>
          <p>{q.question}</p>
          {q.options.map(o => <button key={o}>{o}</button>)}
        </div>
      ))}
    </div>
  );
};

export default MixedQuiz;