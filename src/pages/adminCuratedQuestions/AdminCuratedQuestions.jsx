import { useState, useEffect } from "react";
import API from "../../services/api";
import { topicBank, subjectLabels } from "../../utils/topicBank";
import "./adminCuratedQuestions.css";

const subjects = Object.keys(topicBank);
const examBodies = ["WAEC", "JAMB", "NECO"];
const difficulties = ["easy", "medium", "hard"];

const emptyForm = {
  subject: subjects[0],
  topic: topicBank[subjects[0]][0],
  examBody: "WAEC",
  year: "",
  difficulty: "medium",
  question: "",
  options: ["", "", "", ""],
  correctAnswer: "",
  explanation: ""
};

const AdminCuratedQuestions = () => {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [filterSubject, setFilterSubject] = useState("");
  const [filterExamBody, setFilterExamBody] = useState("");

  const loadQuestions = async () => {
    setLoadingList(true);
    try {
      const params = new URLSearchParams();
      if (filterSubject) params.set("subject", filterSubject);
      if (filterExamBody) params.set("examBody", filterExamBody);

      const res = await API.get(`/admin/curated-questions?${params.toString()}`);
      setQuestions(res.data);
    } catch (err) {
      console.error("Failed to load curated questions:", err);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    loadQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSubject, filterExamBody]);

  const handleSubjectChange = (subject) => {
    setForm((f) => ({ ...f, subject, topic: topicBank[subject][0] }));
  };

  const handleOptionChange = (index, value) => {
    setForm((f) => {
      const newOptions = [...f.options];
      const oldValue = newOptions[index];
      newOptions[index] = value;

      // if this option was the selected correct answer, keep correctAnswer
      // in sync as the admin edits the text, instead of silently going stale
      const correctAnswer = f.correctAnswer === oldValue ? value : f.correctAnswer;

      return { ...f, options: newOptions, correctAnswer };
    });
  };

  const resetForm = () => {
    setForm({ ...emptyForm, subject: form.subject, topic: form.topic, examBody: form.examBody });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const { subject, topic, examBody, year, difficulty, question, options, correctAnswer, explanation } = form;

    if (!question.trim() || options.some((o) => !o.trim())) {
      setError("Please fill in the question and all 4 options.");
      return;
    }

    if (!correctAnswer) {
      setError("Please select which option is the correct answer.");
      return;
    }

    setSubmitting(true);
    try {
      await API.post("/admin/curated-questions", {
        subject,
        topic,
        examBody,
        year: year ? Number(year) : null,
        difficulty,
        question: question.trim(),
        options: options.map((o) => o.trim()),
        correctAnswer,
        explanation: explanation.trim()
      });

      setMessage("Question added successfully.");
      resetForm();
      loadQuestions();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add question.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this curated question? This can't be undone.")) return;

    try {
      await API.delete(`/admin/curated-questions/${id}`);
      setQuestions((prev) => prev.filter((q) => q._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete question.");
    }
  };

  return (
    <div className="admin-curated">
      <h1>Curated Questions (WAEC / JAMB)</h1>
      <p className="admin-curated-subtitle">
        Add original, verified exam-style questions to the "Past Questions" quiz bank.
        These are separate from AI-generated questions — write them yourself, exactly
        as you'd want a student to see them.
      </p>

      {/* ============ ADD FORM ============ */}
      <form className="admin-curated-form" onSubmit={handleSubmit}>
        <h2>Add a question</h2>

        {message && <div className="admin-curated-success">{message}</div>}
        {error && <div className="admin-curated-error">{error}</div>}

        <div className="admin-curated-row">
          <div className="admin-curated-field">
            <label>Subject</label>
            <select value={form.subject} onChange={(e) => handleSubjectChange(e.target.value)}>
              {subjects.map((s) => (
                <option key={s} value={s}>{subjectLabels[s] || s}</option>
              ))}
            </select>
          </div>

          <div className="admin-curated-field">
            <label>Topic</label>
            <select value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
              {topicBank[form.subject].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="admin-curated-field">
            <label>Exam</label>
            <select value={form.examBody} onChange={(e) => setForm({ ...form, examBody: e.target.value })}>
              {examBodies.map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>

          <div className="admin-curated-field admin-curated-field-small">
            <label>Year (optional)</label>
            <input
              type="number"
              placeholder="e.g. 2023"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            />
          </div>

          <div className="admin-curated-field admin-curated-field-small">
            <label>Difficulty</label>
            <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}>
              {difficulties.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="admin-curated-field">
          <label>Question</label>
          <textarea
            rows={2}
            placeholder="Type the question exactly as students should see it..."
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
          />
        </div>

        <label className="admin-curated-options-label">
          Options (click the radio button next to the correct one)
        </label>
        {form.options.map((opt, i) => (
          <div className="admin-curated-option-row" key={i}>
            <input
              type="radio"
              name="correctAnswer"
              checked={form.correctAnswer === opt && opt !== ""}
              onChange={() => setForm({ ...form, correctAnswer: opt })}
              disabled={!opt.trim()}
              title={!opt.trim() ? "Type this option first" : "Mark as correct answer"}
            />
            <input
              type="text"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(i, e.target.value)}
            />
          </div>
        ))}

        <div className="admin-curated-field">
          <label>Explanation (shown to students after they answer)</label>
          <textarea
            rows={2}
            placeholder="Briefly explain why the correct answer is correct..."
            value={form.explanation}
            onChange={(e) => setForm({ ...form, explanation: e.target.value })}
          />
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Adding..." : "Add Question"}
        </button>
      </form>

      {/* ============ EXISTING QUESTIONS ============ */}
      <div className="admin-curated-list-section">
        <h2>Existing curated questions</h2>

        <div className="admin-curated-filters">
          <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
            <option value="">All subjects</option>
            {subjects.map((s) => (
              <option key={s} value={s}>{subjectLabels[s] || s}</option>
            ))}
          </select>

          <select value={filterExamBody} onChange={(e) => setFilterExamBody(e.target.value)}>
            <option value="">All exams</option>
            {examBodies.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>

        {loadingList ? (
          <p>Loading...</p>
        ) : questions.length === 0 ? (
          <p className="admin-curated-empty">No curated questions match this filter yet.</p>
        ) : (
          <div className="admin-curated-list">
            {questions.map((q) => (
              <div className="admin-curated-item" key={q._id}>
                <div className="admin-curated-item-head">
                  <span className="admin-curated-tag">
                    {subjectLabels[q.subject] || q.subject} · {q.topic}
                    {q.examBody ? ` · ${q.examBody}` : ""}
                  </span>
                  <button className="admin-curated-delete" onClick={() => handleDelete(q._id)}>
                    Delete
                  </button>
                </div>
                <p className="admin-curated-item-question">{q.question}</p>
                <p className="admin-curated-item-answer">
                  Correct: <strong>{q.correctAnswer}</strong>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCuratedQuestions;
