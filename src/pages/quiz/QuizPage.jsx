import { useEffect, useState } from "react";
import {
  getQuizQuestionApi,
  submitQuizApi,
  getLeaderboardApi,
} from "../../api/mathApi";

import { Helmet } from "react-helmet-async";

import "./quiz.css";
import Leaderboard from "../quizLeader/LeaderBoard";

const QuizPage = () => {
  const [question, setQuestion] = useState(null);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);

  const [solution, setSolution] = useState(null); // ✅ FIXED

  const [topic, setTopic] = useState("percentage");
  const [difficulty, setDifficulty] = useState("easy");

  const [leaders, setLeaders] = useState([]);

  const [username] = useState(
    localStorage.getItem("quizUser") || "Guest"
  );

  // 🔥 FETCH QUESTION
  const fetchQuestion = async () => {
    try {
      const data = await getQuizQuestionApi(topic, difficulty);

      setQuestion(data);
      setInput("");
      setFeedback("");
      setTime(30);
      setSolution(null); // ✅ RESET SOLUTION
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
  }, []);

  // ⏱ TIMER
  useEffect(() => {
    if (!question) return;

    if (time === 0) {
      setFeedback(`⏰ Time up! Answer: ${question.answer}`);
      return;
    }

    const timer = setTimeout(() => setTime((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [time, question]);

  // 🔥 CHECK ANSWER (FULLY SAFE)
  const checkAnswer = async () => {
    if (!question) return;

    let isCorrect = false;

    // ✅ handle different types
    if (question.type === "fraction" || question.type === "ratio") {
      isCorrect =
        input.replace(/\s/g, "") === String(question.answer);
    } else {
      isCorrect =
        Math.abs(Number(input) - Number(question.answer)) < 0.01;
    }

    setFeedback(
      isCorrect
        ? "✅ Correct!"
        : `❌ Wrong. Answer: ${question.answer}`
    );

    try {
      const res = await submitQuizApi({
        username,
        isCorrect,
        topic: question.topic,
        problem: question.question, // 🔥 IMPORTANT
      });

      setScore(res.score || 0);
      setSolution(res.solution || null); // ✅ FIXED

      fetchLeaders(); // 🔥 refresh leaderboard

    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <div className="quiz-page">

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

          <p>🏆 Score: {score}</p>
          <p>⏱ Time: {time}s</p>

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
            <div className="quiz-card">

              <p>
                📘 {question.topic} | 🎯 {question.difficulty}
              </p>

              <h3>{question.question}</h3>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter answer"
              />

              <button onClick={checkAnswer}>Submit</button>

              {feedback && <p>{feedback}</p>}

              {/* ✅ SOLUTION (SAFE) */}
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
    </div>
  );
};

export default QuizPage;