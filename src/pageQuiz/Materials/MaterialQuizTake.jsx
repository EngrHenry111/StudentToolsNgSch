import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMaterialQuiz } from "../../apiQuiz/materialApi";
import { submitAIQuiz } from "../../apiQuiz/quizApi";
import QuestionCard from "../../componentsQuiz/QuestionCard";
import Loader from "../../componentsQuiz/Loader";
import Result from "../Result";
import "../proquiz.css";

const FORMAT_LABELS = {
  mcq: "Multiple Choice",
  true_false: "True or False",
  fill_blank: "Fill in the Blank",
  scenario: "Scenario"
};

const MaterialQuizTake = () => {
  const { id } = useParams();

  const [materialTitle, setMaterialTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMaterialQuiz(id)
      .then((res) => {
        setMaterialTitle(res.material.title);
        setQuestions(res.questions);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSelect = (qIndex, option) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const payload = questions.map((q, i) => ({
        questionId: q.id,
        selected: answers[i]
      }));

      const res = await submitAIQuiz(payload);
      setResult(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="pq-page">
        <Loader fullPage label="Loading your quiz..." />
      </div>
    );
  }

  if (result) {
    return (
      <div className="pq-page">
        <Result result={result} />
      </div>
    );
  }

  return (
    <div className="pq-page">
      <div className="pq-container">
        <div className="pq-card">
          <h2 className="pq-title" style={{ fontSize: 20 }}>{materialTitle}</h2>
          <p className="pq-subtitle" style={{ marginBottom: 0 }}>
            Questions are generated strictly from your uploaded material —
            several formats test each concept from different angles.
          </p>
        </div>

        {error && <div className="pq-error-box">{error}</div>}

        {questions.map((q, i) => (
          <div key={q.id}>
            <span className="pq-badge" style={{ marginBottom: 6 }}>
              {q.conceptTag} · {FORMAT_LABELS[q.format] || q.format}
            </span>
            <QuestionCard
              q={q}
              index={i}
              total={questions.length}
              selected={answers[i]}
              onSelect={(opt) => handleSelect(i, opt)}
            />
          </div>
        ))}

        <button
          className="pq-btn pq-btn-primary pq-btn-block"
          onClick={handleSubmit}
          disabled={submitting || Object.keys(answers).length === 0}
        >
          {submitting ? "Submitting..." : "Submit Quiz"}
        </button>
      </div>
    </div>
  );
};

export default MaterialQuizTake;
