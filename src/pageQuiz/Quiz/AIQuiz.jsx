import { useState } from "react";
import { getAIQuiz, submitAIQuiz } from "../../apiQuiz/quizApi";
import { topicBank, subjects } from "../../utils/topicBank";
import QuestionCard from "../../componentsQuiz/QuestionCard";
import Loader from "../../componentsQuiz/Loader";
import Result from "../Result";
import "../proquiz.css";

const AIQuiz = () => {
  const [subject, setSubject] = useState(subjects[0]);
  const [topic, setTopic] = useState(topicBank[subjects[0]][0]);
  const [numQuestions, setNumQuestions] = useState(5);

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [started, setStarted] = useState(false);

  const handleSubjectChange = (s) => {
    setSubject(s);
    setTopic(topicBank[s][0]);
  };

  const loadQuiz = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setAnswers({});

    try {
      const data = await getAIQuiz(subject, topic, numQuestions);
      if (Array.isArray(data) && data.length > 0) {
        setQuestions(data);
        setStarted(true);
      } else {
        throw new Error("No questions were generated. Try a different topic.");
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
    if (questions.length === 0) return;

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

  // ---- RESULT VIEW ----
  if (result) {
    return (
      <div className="pq-page">
        <Result result={result} onRetry={handleRetry} retryLabel="New Quiz" />
      </div>
    );
  }

  // ---- SETUP VIEW ----
  if (!started) {
    return (
      <div className="pq-page">
        <div className="pq-container">
          <div className="pq-card">
            <h2 className="pq-title">AI Quiz</h2>
            <p className="pq-subtitle">
              Choose a subject and topic — questions are generated fresh by AI.
            </p>

            {error && <div className="pq-error-box">{error}</div>}

            <div className="pq-field-row">
              <div className="pq-field">
                <label>Subject</label>
                <select
                  className="pq-select"
                  value={subject}
                  onChange={(e) => handleSubjectChange(e.target.value)}
                >
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pq-field">
                <label>Topic</label>
                <select
                  className="pq-select"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                >
                  {topicBank[subject].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="pq-field" style={{ maxWidth: 140 }}>
                <label>Questions</label>
                <select
                  className="pq-select"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(Number(e.target.value))}
                >
                  {[5, 10, 15, 20].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              className="pq-btn pq-btn-primary pq-btn-block"
              onClick={loadQuiz}
              disabled={loading}
            >
              {loading ? "Generating questions..." : "Start Quiz"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- LOADING ----
  if (loading) {
    return (
      <div className="pq-page">
        <Loader fullPage label="Generating your AI quiz..." />
      </div>
    );
  }

  // ---- QUIZ VIEW ----
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

export default AIQuiz;
