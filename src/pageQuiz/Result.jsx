const Result = ({ result }) => {
  if (!result) return null;

  return (
    <div>
      <h2>Score: {result.score}</h2>

      {result.results.map((r, i) => (
        <div key={i}>
          <p>{r.isCorrect ? "✅ Correct" : "❌ Wrong"}</p>
          <p>{r.explanation}</p>
        </div>
      ))}
    </div>
  );
};

export default Result;