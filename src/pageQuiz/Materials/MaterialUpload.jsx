import { useState } from "react";
import { uploadMaterial } from "../../apiQuiz/materialApi";
import { useNavigate } from "react-router-dom";
import "../proquiz.css";

const MaterialUpload = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState("file"); // "file" | "paste"
  const [file, setFile] = useState(null);
  const [pastedText, setPastedText] = useState("");
  const [title, setTitle] = useState("");
  const [questionCount, setQuestionCount] = useState(10);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (mode === "file" && !file) {
      setError("Please choose a file to upload.");
      return;
    }
    if (mode === "paste" && pastedText.trim().length < 200) {
      setError("Please paste at least a substantial chunk of notes (a couple of paragraphs) — a few words isn't enough to generate a real quiz from.");
      return;
    }

    setUploading(true);
    try {
      const res = await uploadMaterial({
        file: mode === "file" ? file : null,
        pastedText: mode === "paste" ? pastedText : null,
        title: title || (file ? file.name : "My Notes"),
        questionCount
      });

      navigate(`/pro/quiz/material/${res.material.id}`);
    } catch (err) {
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="pq-page">
      <div className="pq-container">
        <div className="pq-card">
          <h2 className="pq-title">Quiz Yourself on Your Own Material</h2>
          <p className="pq-subtitle">
            Upload your lecture notes, slides, or textbook chapter — we'll generate
            a practice quiz strictly from what YOU actually need to study, testing
            each concept in several different ways so however your real exam
            phrases it, you've already practiced a version of it.
          </p>

          {error && <div className="pq-error-box">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="pq-field-row" style={{ marginBottom: 4 }}>
              <button
                type="button"
                className={`pq-btn ${mode === "file" ? "pq-btn-primary" : ""}`}
                onClick={() => setMode("file")}
              >
                Upload a file
              </button>
              <button
                type="button"
                className={`pq-btn ${mode === "paste" ? "pq-btn-primary" : ""}`}
                onClick={() => setMode("paste")}
              >
                Paste text instead
              </button>
            </div>

            {mode === "file" ? (
              <div className="pq-field">
                <label>File (PDF, DOCX, or TXT)</label>
                <input
                  className="pq-input"
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            ) : (
              <div className="pq-field">
                <label>Paste your notes</label>
                <textarea
                  className="pq-input"
                  rows={8}
                  placeholder="Paste your lecture notes or textbook text here..."
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                />
              </div>
            )}

            <div className="pq-field-row">
              <div className="pq-field">
                <label>Title (optional)</label>
                <input
                  className="pq-input"
                  placeholder="e.g. Photosynthesis Notes"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="pq-field" style={{ maxWidth: 140 }}>
                <label>Questions</label>
                <select value={questionCount} onChange={(e) => setQuestionCount(Number(e.target.value))}>
                  {[5, 10, 15, 20].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="pq-btn pq-btn-primary pq-btn-block" disabled={uploading}>
              {uploading ? "Reading your material & building your quiz..." : "Generate My Quiz"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MaterialUpload;
