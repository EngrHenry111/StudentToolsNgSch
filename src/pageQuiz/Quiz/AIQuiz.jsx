import { useEffect, useState, useContext } from "react";
import { getAIQuiz, submitAIQuiz } from "../../apiQuiz/quizApi";
import { AuthContext } from "../../contextQuiz/AuthContext";

const AIQuiz = () => {
  const { token } = useContext(AuthContext);

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const subject = "physics";
  const topic = "Newton's Laws";

  // 🔥 LOAD QUESTIONS
  const loadQuiz = async () => {
  if (loading) return; // 🔥 prevent duplicate calls

  setLoading(true);
  setError(null);

  try {
    const data = await getAIQuiz(subject, topic, token);

    if (Array.isArray(data)) {
      setQuestions(data);
    } else {
      throw new Error(data.message || "Invalid quiz data format");
    }

  } catch (err) {
    console.error("Quiz Load Error:", err.message);

    // 🔥 IMPORTANT: STOP retry loop
    setError(err.message);
    setQuestions([]);
    
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadQuiz();
  }, []);

  // 🔥 SELECT ANSWER
  const handleSelect = (qIndex, option) => {
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: option
    }));
  };

  // 🔥 SUBMIT QUIZ
  const handleSubmit = async () => {
    if (!Array.isArray(questions) || questions.length === 0) {
      alert("No questions to submit");
      return;
    }

    try {
      const payload = {
        answers: questions.map((q, i) => ({
          questionId: q._id,
          selected: answers[i]
        }))
      };

      const res = await submitAIQuiz(payload, token);

      setResult(res);
    } catch (err) {
      console.error("Submit Error:", err.message);
      alert("Failed to submit quiz");
    }
  };

  // 🔥 LOADING STATE
  if (loading) {
    return <p>Loading quiz...</p>;
  }

  // 🔥 ERROR STATE
  if (error) {
    return (
      <div>
        <p style={{ color: "red" }}>Error: {error}</p>
        <button onClick={loadQuiz}>Retry</button>
      </div>
    );
  }

  // 🔥 RESULT VIEW
  if (result) {
    return (
      <div>
        <h2>Result</h2>
        <p><strong>Score:</strong> {result.score}</p>

        {Array.isArray(result.results) &&
          result.results.map((r, i) => (
            <div key={i} style={{ marginBottom: "20px" }}>
              <p><strong>{r.question}</strong></p>
              <p>Your Answer: {r.selected}</p>
              <p>Correct Answer: {r.correctAnswer}</p>
              <p>{r.explanation}</p>
            </div>
          ))}
      </div>
    );
  }

  // 🔥 MAIN QUIZ VIEW
  return (
    <div>
      <h2>AI Quiz ({subject} - {topic})</h2>

      {!Array.isArray(questions) || questions.length === 0 ? (
        <p>No questions available</p>
      ) : (
        questions.map((q, i) => (
          <div key={q._id || i} style={{ marginBottom: "20px" }}>
            <p><strong>{q.question}</strong></p>

            {Array.isArray(q.options) &&
              q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(i, opt)}
                  style={{
                    display: "block",
                    margin: "5px",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                    background:
                      answers[i] === opt ? "#4caf50" : "#eee",
                    color:
                      answers[i] === opt ? "#fff" : "#000"
                  }}
                >
                  {opt}
                </button>
              ))}
          </div>
        ))
      )}

      {questions.length > 0 && (
        <button onClick={handleSubmit}>
          Submit Quiz
        </button>
      )}
    </div>
  );
};

export default AIQuiz;