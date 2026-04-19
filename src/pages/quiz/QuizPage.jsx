import { useEffect, useState } from "react";
import { getQuizQuestionApi, submitQuizApi, getLeaderboardApi } from "../../api/mathApi";

import "./quiz.css"
import Leaderboard from "../quizLeader/LeaderBoard";

const QuizPage = () => {
  const [question, setQuestion] = useState(null);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);

  const [topic, setTopic] = useState("percentage");
  const [difficulty, setDifficulty] = useState("easy");

    // const [users, setUsers] = useState([]);
    const [leaders, setLeaders] = useState([]);

  const [username, setUsername] = useState(
  localStorage.getItem("quizUser") || "Guest"
);

  const fetchQuestion = async () => {
    const data = await getQuizQuestionApi(topic, difficulty);

    setQuestion(data);
    setInput("");
    setFeedback("");
    setTime(30);
  };


useEffect(() => {
  const fetchLeaders = async () => {
    try {
      const data = await getLeaderboardApi();
      setLeaders(data);
    } catch (err) {
      console.error("Leaderboard error:", err);
    }
  };

  fetchLeaders();
}, []);

  useEffect(() => {
    fetchQuestion();
  }, []);

  // ⏱ Timer
  useEffect(() => {
    if (!question) return;

    if (time === 0) {
      setFeedback(`⏰ Time up! Answer: ${question.answer}`);
      return;
    }

    const timer = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timer);
  }, [time, question]);




const checkAnswer = async () => {
  if (!question) return;

  let isCorrect = false;

  if (question.type === "fraction" || question.type === "ratio") {
    isCorrect = input.replace(/\s/g, "") === question.answer;
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
    });

    console.log("📊 Updated:", res);

    // 🔥 UPDATE UI STATE FROM BACKEND
    setScore(res.score);

  } catch (err) {
    console.error("Submit error:", err);
  }
};

  return (
    <div className="quiz-page">

  <div className="quiz-layout">

      <div className="quiz-main">
  
      <h2>🧠 Quiz Mode</h2>

      <p>Score: {score}</p>
      <p>Time: {time}s</p>

      {/* Controls */}
      <div className="quiz-controls">

        <select value={topic} onChange={(e) => setTopic(e.target.value)}>
        <option value="percentage">Percentage</option>
        <option value="algebra">Algebra</option>
        <option value="fractions">Fractions</option>
        <option value="ratio">Ratio</option>
        <option value="interest">Simple Interest</option>
        <option value="set">Set Theory</option>
        </select>

        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button onClick={fetchQuestion}>Start</button>

      </div>

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

          <button onClick={fetchQuestion}>Next</button>

        </div>
      )}
</div>

  {/* LEFT - QUIZ */}
  
  {/* RIGHT - LEADERBOARD */}
  <div className="quiz-sidebar">
    <Leaderboard users={leaders} />
  </div>

</div>
    </div>
  );
};

export default QuizPage;