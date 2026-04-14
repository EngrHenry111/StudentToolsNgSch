import { useState } from "react";

const suggestions = [
  "20% of 150",
  "2x + 4 = 10",
  "divide 100 in ratio 2:3",
  "1/2 + 3/4",
];

const MathSolverForm = ({ onSolve, loading }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSolve(input);
  };

  return (
    <div className="solver-box elite">

      {/* INPUT + SUGGESTIONS GROUP */}
      <div className="input-group">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a math problem..."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        />

        {/* Suggestions BELOW input */}
        <div className="suggestions">
          {suggestions.map((s, i) => (
            <span
              key={i}
              onClick={() => {
                setInput(s);
                onSolve(s); // 🔥 instant solve (premium UX)
              }}
            >
              {s}
            </span>
          ))}
        </div>

      </div>

      {/* BUTTON */}
      <button onClick={handleSubmit}>
        {loading ? "Solving..." : "Solve"}
      </button>

    </div>
  );
};

export default MathSolverForm;



// import { useState } from "react";

// const suggestions = [
//   "20% of 150",
//   "2x + 4 = 10",
//   "divide 100 in ratio 2:3",
//   "1/2 + 3/4",
// ];

// const MathSolverForm = ({ onSolve, loading }) => {
//   const [input, setInput] = useState("");

//   return (
//     <div className="solver-box elite">

//       <input
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Type a math problem..."
//       />

//       <button onClick={() => onSolve(input)}>
//         {loading ? "Solving..." : "Solve"}
//       </button>

//       <div className="suggestions">
//         {suggestions.map((s, i) => (
//           <span key={i} onClick={() => setInput(s)}>
//             {s}
//           </span>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default MathSolverForm;


// // import { useState } from "react";

// // const MathSolverForm = ({ onSolve, loading }) => {
// //   const [input, setInput] = useState("");

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (!input.trim()) return;
// //     onSolve(input);
// //   };

// //   return (
// //     <form className="solver-form" onSubmit={handleSubmit}>
// //       <input
// //         value={input}
// //         onChange={(e) => setInput(e.target.value)}
// //         placeholder="Try: 2x + 4 = 10 or 20% of 150"
// //       />
// //       <button type="submit">
// //         {loading ? "Solving..." : "Solve"}
// //       </button>
// //     </form>
// //   );
// // };

// // export default MathSolverForm;