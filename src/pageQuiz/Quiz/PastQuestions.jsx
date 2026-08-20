import { useState } from "react";
import { getPastQuestions, submitAIQuiz } from "../../apiQuiz/quizApi";
import { subjectLabels } from "../../utils/topicBank";
import QuestionCard from "../../componentsQuiz/QuestionCard";
import Loader from "../../componentsQuiz/Loader";
import Result from "../Result";
import "../proquiz.css";

const examBodies = ["WAEC", "JAMB"];

const subjectGroups = {
  "Sciences": ["mathematics", "physics", "chemistry", "biology"],
  "Languages": ["englishLanguage"]
};

const PastQuestions = () => {
  const [examBody, setExamBody] = useState("WAEC");
  const [subject, setSubject] = useState("mathematics");
  const [numQuestions, setNumQuestions] = useState(10);

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
      const data = await getPastQuestions(examBody, subject, null, numQuestions);
      if (Array.isArray(data) && data.length > 0) {
        setQuestions(data);
        setStarted(true);
      } else {
        throw new Error("No questions found for that selection yet.");
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
        <Result result={result} onRetry={handleRetry} retryLabel="New Set" />
      </div>
    );
  }

  if (!started) {
    return (
      <div className="pq-page">
        <div className="pq-container">
          <div className="pq-card">
            <h2 className="pq-title">Past Questions</h2>
            <p className="pq-subtitle">
              Practice with curated, exam-style questions written to match the
              real WAEC and JAMB syllabus and question standard.
            </p>

            {error && <div className="pq-error-box">{error}</div>}

            <div className="pq-field-row">
              <div className="pq-field">
                <label>Exam</label>
                <select
                  className="pq-select"
                  value={examBody}
                  onChange={(e) => setExamBody(e.target.value)}
                >
                  {examBodies.map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>

              <div className="pq-field">
                <label>Subject</label>
                <select
                  className="pq-select"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  {Object.entries(subjectGroups).map(([groupName, groupSubjects]) => (
                    <optgroup label={groupName} key={groupName}>
                      {groupSubjects.map((s) => (
                        <option key={s} value={s}>
                          {subjectLabels[s] || s}
                        </option>
                      ))}
                    </optgroup>
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
                  {[5, 10, 15].map((n) => (
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
              {loading ? "Loading..." : "Start Practice"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="pq-page">
        <Loader fullPage label="Loading past questions..." />
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
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default PastQuestions;
