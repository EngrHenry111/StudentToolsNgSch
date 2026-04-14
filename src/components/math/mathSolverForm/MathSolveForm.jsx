import { useState } from "react";

const MathSolverForm = ({ onSolve, loading }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSolve(input);
  };

  return (
    <form className="solver-form" onSubmit={handleSubmit}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Try: 2x + 4 = 10 or 20% of 150"
      />
      <button type="submit">
        {loading ? "Solving..." : "Solve"}
      </button>
    </form>
  );
};

export default MathSolverForm;