import { useState } from "react";
import { getAdaptiveQuiz, submitAIQuiz } from "../../apiQuiz/quizApi";
import QuestionCard from "../../componentsQuiz/QuestionCard";
import Loader from "../../componentsQuiz/Loader";
import Result from "../Result";
import "../proquiz.css";

const AdaptiveQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [started, setStarted] = useState(false);

  const loadQuiz = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setAnswers({});

    try {
      const data = await getAdaptiveQuiz(10);
      if (Array.isArray(data) && data.length > 0) {
        setQuestions(data);
        setStarted(true);
      } else {
        throw new Error("Couldn't generate an adaptive quiz right now. Try again shortly.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (qIndex, option) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const payload = questions.map((q, i) => ({
        questionId: q._id || q.id,
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

  const handleRetry = () => {
    setStarted(false);
    setResult(null);
    setQuestions([]);
    setAnswers({});
  };

  if (result) {
    return (
      <div className="pq-page">
        <Result result={result} onRetry={handleRetry} retryLabel="New Adaptive Quiz" />
      </div>
    );
  }

  if (!started) {
    return (
      <div className="pq-page">
        <div className="pq-container">
          <div className="pq-card">
            <h2 className="pq-title">Adaptive Quiz</h2>
            <p className="pq-subtitle">
              We weight questions toward the topics you've struggled with most,
              based on your quiz history.
            </p>

            {error && <div className="pq-error-box">{error}</div>}

            <button
              className="pq-btn pq-btn-primary pq-btn-block"
              onClick={loadQuiz}
              disabled={loading}
            >
              {loading ? "Building your quiz..." : "Start Adaptive Quiz"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="pq-page">
        <Loader fullPage label="Analyzing your weak topics..." />
      </div>
    );
  }

  return (
    <div className="pq-page">
      <div className="pq-container">
        {error && <div className="pq-error-box">{error}</div>}

        {questions.map((q, i) => (
          <QuestionCard
            key={q._id || q.id || i}
            q={q}
            index={i}
            total={questions.length}
            selected={answers[i]}
            onSelect={(opt) => handleSelect(i, opt)}
          />
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

export default AdaptiveQuiz;
