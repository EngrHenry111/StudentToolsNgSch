import { useEffect, useState } from "react";
import { getAdaptiveQuiz, submitAIQuiz } from "../../apiQuiz/quizApi";

const AdaptiveQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    const data = await getAdaptiveQuiz(token);
    setQuestions(data);
  };

  const handleSelect = (qid, option) => {
    setAnswers(prev => [
      ...prev.filter(a => a.questionId !== qid),
      { questionId: qid, selectedAnswer: option }
    ]);
  };

  const handleSubmit = async () => {
    const res = await submitAIQuiz({ answers }, token);
    setResult(res);
  };

  if (result) {
    return (
      <div>
        <h2>Score: {result.score}</h2>

        <h3>Weak Topics:</h3>
        {result.weakTopics?.map((t, i) => (
          <p key={i}>
            {t.subject} - {t.topic} ({(t.accuracy * 100).toFixed(0)}%)
          </p>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1>Adaptive Quiz</h1>

      {questions.map((q, i) => (
        <div key={q.id}>
          <h3>{i + 1}. {q.question}</h3>

          {q.options.map(opt => (
            <button
              key={opt}
              onClick={() => handleSelect(q.id, opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      ))}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AdaptiveQuiz;