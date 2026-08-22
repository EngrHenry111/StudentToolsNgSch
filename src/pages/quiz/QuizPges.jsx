import { useEffect, useState, useRef } from "react";
import {
  getQuizQuestionApi,
  submitQuizApi,
  getLeaderboardApi,
} from "../../api/mathApi";

import { Helmet } from "react-helmet-async";

import Leaderboard from "../quizLeader/Leaderboardmath";

import "./quiz.css";

const QuizPage = () => {
  const [question, setQuestion] = useState(null);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  // "correct" | "incorrect" | "" — drives feedback color + card animation
  const [feedbackType, setFeedbackType] = useState("");
  const [score, setScore] = useState(0);
  const [scorePop, setScorePop] = useState(false); // brief pulse when score changes
  const [time, setTime] = useState(30);
  const [streak, setStreak] = useState(0);
  const [answered, setAnswered] = useState(false); // locks input after submit

  const [solution, setSolution] = useState(null);

  const [topic, setTopic] = useState("percentage");
  const [difficulty, setDifficulty] = useState("easy");

  const [leaders, setLeaders] = useState([]);

  const inputRef = useRef(null);

  // No full login needed here, but every player DOES need their own name
  // so the leaderboard reflects real, distinct students instead of every
  // visitor silently sharing one "Guest" bucket.
  const [username, setUsername] = useState(
    localStorage.getItem("quizUser") || ""
  );
  const [nameInput, setNameInput] = useState(username);
  const [showNamePrompt, setShowNamePrompt] = useState(!username);

  const saveName = (e) => {
    e.preventDefault();
    const trimmed = nameInput.trim().slice(0, 20);

    if (trimmed.length < 2) return;

    localStorage.setItem("quizUser", trimmed);
    setUsername(trimmed);
    setNameInput(trimmed);
    setShowNamePrompt(false);
  };

  // 🔥 FETCH QUESTION
  const fetchQuestion = async () => {
    try {
      const data = await getQuizQuestionApi(topic, difficulty);

      setQuestion(data);
      setInput("");
      setFeedback("");
      setFeedbackType("");
      setTime(30);
      setSolution(null);
      setAnswered(false);

      // refocus the answer box so a fast player can keep going without
      // reaching for the mouse
      setTimeout(() => inputRef.current?.focus(), 50);
    } catch (err) {
      console.error("Question error:", err);
    }
  };

  // 🔥 FETCH LEADERBOARD
  const fetchLeaders = async () => {
    try {
      const data = await getLeaderboardApi();
      setLeaders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Leaderboard error:", err);
      setLeaders([]);
    }
  };

  useEffect(() => {
    fetchQuestion();
    fetchLeaders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ⏱ TIMER
  useEffect(() => {
    if (!question || answered) return;

    if (time === 0) {
      setFeedback(`⏰ Time up! Answer: ${question.answer}`);
      setFeedbackType("incorrect");
      setStreak(0);
      setAnswered(true);
      return;
    }

    const timer = setTimeout(() => setTime((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [time, question, answered]);

  // 🔥 CHECK ANSWER
  const checkAnswer = async () => {
    if (!question || answered) return;
    if (!username) {
      setShowNamePrompt(true);
      return;
    }

    let isCorrect = false;

    // Answers come in two shapes: pure numbers (percentage, algebra,
    // speed/distance, etc.) or text/expression answers (fractions like
    // "3/4", ratio splits like "12, 18", polynomials like "x^2+5x+6").
    // Previously only "fraction"/"ratio" types used text comparison —
    // "polynomial" and "simultaneous" fell through to Number(answer),
    // which is NaN for a string like "x^2+5x+6", so those two topics
    // were marked wrong 100% of the time regardless of what was typed.
    const expectedAnswer = String(question.answer);
    const isTextAnswer = isNaN(Number(expectedAnswer));

    if (isTextAnswer) {
      const normalize = (s) => s.replace(/\s+/g, "").toLowerCase();
      isCorrect = normalize(input) === normalize(expectedAnswer);
    } else {
      isCorrect = Math.abs(Number(input) - Number(expectedAnswer)) < 0.01;
    }

    setAnswered(true);
    setFeedback(isCorrect ? "✅ Correct!" : `❌ Wrong. Answer: ${question.answer}`);
    setFeedbackType(isCorrect ? "correct" : "incorrect");
    setStreak((prev) => (isCorrect ? prev + 1 : 0));

    try {
      const res = await submitQuizApi({
        username,
        isCorrect,
        topic: question.topic,
        problem: question.question,
      });

      setScore(res.score || 0);
      setScorePop(true);
      setTimeout(() => setScorePop(false), 400);

      setSolution(res.solution || null);

      fetchLeaders();

    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !answered) {
      checkAnswer();
    }
  };

  const timerUrgency = time <= 5 ? "urgent" : time <= 15 ? "warning" : "";

  return (
    <div className="quiz-math">

      <Helmet>

  {/* Primary SEO */}
  <title>Math Quiz for Students | Practice Algebra, Fractions & More</title>

  <meta
    name="description"
    content="Practice mathematics with interactive quizzes including algebra, fractions, percentages and more. Improve your speed and accuracy with real-time feedback."
  />

  <meta
    name="keywords"
    content="math quiz Nigeria, algebra quiz, fractions quiz, student practice questions, online math quiz"
  />

  {/* Canonical */}
  <link rel="canonical" href="https://studenttoolsng.com/quiz" />

  {/* Open Graph */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Math Quiz - StudentToolsNG" />
  <meta
    property="og:description"
    content="Test your math skills with real-time quizzes and leaderboard ranking."
  />
  <meta property="og:image" content="https://studenttoolsng.com/logo.png" />
  <meta property="og:url" content="https://studenttoolsng.com/quiz" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Math Quiz for Students" />
  <meta
    name="twitter:description"
    content="Practice math questions and track your performance."
  />
  <meta name="twitter:image" content="https://studenttoolsng.com/logo.png" />

</Helmet>
      
      <div className="quiz-layout">

        {/* LEFT SIDE */}
        <div className="quiz-main">

          <h2>🧠 Quiz Mode</h2>

          {username && (
            <p className="quiz-playing-as">
              Playing as <strong>{username}</strong> ·{" "}
              <button
                type="button"
                className="quiz-change-name"
                onClick={() => {
                  setNameInput(username);
                  setShowNamePrompt(true);
                }}
              >
                Change name
              </button>
            </p>
          )}

          <div className="quiz-stats-row">
            <p className={`quiz-score ${scorePop ? "pop" : ""}`}>
              🏆 Score: {score}
            </p>

            {streak > 1 && (
              <p className="quiz-streak">
                🔥 {streak} in a row!
              </p>
            )}
          </div>

          {/* TIMER BAR */}
          <div className="quiz-timer-row">
            <div className={`quiz-timer-track ${timerUrgency}`}>
              <div
                className="quiz-timer-fill"
                style={{ width: `${(time / 30) * 100}%` }}
              />
            </div>
            <span className={`quiz-timer-label ${timerUrgency}`}>{time}s</span>
          </div>

          {/* CONTROLS */}
          <div className="quiz-controls">

            <select value={topic} onChange={(e) => setTopic(e.target.value)}>
              <option value="percentage">Percentage</option>
              <option value="algebra">Algebra</option>
              <option value="fractions">Fractions</option>
              <option value="ratio">Ratio</option>
              <option value="interest">Simple Interest</option>
              <option value="set">Set Theory</option>

              <option value="average">Average</option>
              <option value="speed_distance">Speed & Distance</option>
              <option value="indices">Indices</option>
              <option value="simultaneous">Simultaneous Equations</option>
              <option value="polynomial">Polynomial</option>
              </select>

            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <button onClick={fetchQuestion}>Start</button>
          </div>

          {/* QUESTION */}
          {question && (
            <div className={`quiz-card ${feedbackType}`}>

              <p>
                📘 {question.topic} | 🎯 {question.difficulty}
              </p>

              <h3>{question.question}</h3>

              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter answer"
                disabled={answered}
                autoFocus
              />

              <button onClick={checkAnswer} disabled={answered}>
                Submit
              </button>

              {feedback && (
                <p className={`quiz-feedback ${feedbackType}`}>{feedback}</p>
              )}

              {/* ✅ SOLUTION */}
              {solution?.steps && (
                <div className="solution-box">

                  <h4>📘 Solution</h4>

                  <p>
                    <strong>Formula:</strong>{" "}
                    {solution.formula || "—"}
                  </p>

                  <ul>
                    {solution.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>

                  <p>
                    <strong>Final Answer:</strong>{" "}
                    {solution.answer}
                  </p>

                </div>
              )}

              <button onClick={fetchQuestion}>Next</button>

            </div>
          )}

        </div>

        {/* RIGHT SIDE */}
        <div className="quiz-sidebar">
          <Leaderboard users={leaders} />
        </div>

      </div>

      <section className="quiz-seo">

  <h2>Practice Mathematics with Interactive Quiz</h2>

  <p>
    This math quiz helps students practice key topics such as algebra,
    fractions, percentages, ratios, and simple interest. Each question
    is generated dynamically to improve problem-solving skills and speed.
  </p>

  <h3>Topics Covered</h3>

  <ul>
    <li>Algebra equations</li>
    <li>Fractions and ratios</li>
    <li>Percentages</li>
    <li>Simple interest</li>
    <li>Set theory basics</li>
  </ul>

  <h3>Why Use This Quiz?</h3>

  <p>
    Practicing regularly helps students build confidence and improve
    accuracy in exams like WAEC and JAMB. The leaderboard feature also
    allows students to compete and track their performance.
  </p>

  <h3>Related Tools</h3>

<ul>
  <li><a href="/tutorials/math-calculator">Math Solver</a></li>
  <li><a href="/cgpa-calculator">CGPA Calculator</a></li>
  <li><a href="/jamb-score-calculator">JAMB Calculator</a></li>
</ul>

</section>

      {/* NAME GATE — lightweight, no login required, just a display
          name so the leaderboard shows real distinct students instead
          of everyone being merged into one shared "Guest" entry */}
      {showNamePrompt && (
        <div className="quiz-name-overlay">
          <form className="quiz-name-modal" onSubmit={saveName}>
            <h3>🏆 What should we call you?</h3>
            <p>
              Enter a name so your score shows up correctly on the
              leaderboard — no email or password needed.
            </p>
            <input
              autoFocus
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="e.g. Henry"
              maxLength={20}
            />
            <button type="submit" disabled={nameInput.trim().length < 2}>
              Start Playing
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
