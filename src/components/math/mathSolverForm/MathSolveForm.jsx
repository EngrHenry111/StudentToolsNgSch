import { useState } from "react";
import { motion } from "framer-motion";


const suggestions = [
  {
    title: "Percentage",
    items: [
      "20% of 150",
      "increase 200 by 10%",
      "decrease 500 by 20%",
      "what percent of 50 is 10",
      "find original if 20% is 40"
    ]
  },
  {
    title: "Algebra",
    items: [
      "2x + 4 = 10",
      "3x - 5 = 16",
      "5x = 25",
      "x/2 + 3 = 7"
    ]
  },
  {
    title: "Fractions",
    items: [
      "1/2 + 3/4",
      "5/6 - 1/3",
      "2/3 × 4/5",
      "3/4 ÷ 2/5"
    ]
  },
  {
    title: "Ratio",
    items: [
      "divide 100 in ratio 2:3",
      "share 200 in ratio 1:4",
      "divide 500 in ratio 3:2"
    ]
  },
  {
    title: "Simple Interest",
    items: [
      "p=1000 r=5 t=2",
      "p=5000 r=10 t=3",
      "find simple interest p=2000 r=4 t=5"
    ]
  },
  {
    title: "Set Theory",
    items: [
      "n(A)=20, n(B)=15, n(A∩B)=5",
      "n(U)=100, n(A)=40",
      "n(A)=30, n(B)=25, n(C)=20, n(A∩B)=5, n(A∩C)=4, n(B∩C)=3, n(A∩B∩C)=2"
    ]
  },

  {
  title: "Average",
  items: ["average of 10 20 30", "find average 5 15 25"]
},
{
  title: "Speed",
  items: ["60 km for 2 hours", "speed 50 time 3"]
},
{
  title: "Indices",
  items: ["2^3", "5^2"]
},

{
  title: "Geometry",
  items: [
    "find area length 10 width 5",
    "perimeter of rectangle 6 and 4"
  ]
},

{
  title: "Age",
  items: [
    "John is 5 years older than Mary who is 10",
    "find age difference if father is 30 and son is 10"
  ]
},

{
  title: "Physics",
  items: [
  "mass 10 acceleration 2",
  "force when mass is 5 and acceleration is 3",
  "find force m=8 a=4",
  "calculate force if mass is 20 and acceleration is 5",
  "m 15 a 2 find force"
]
},
{
  title: "Mixture",
  items: [
    "10% of 50 mixed with 20% of 30",
    "mix 5 liters 10% and 5 liters 20%"
  ]
},

{
  title: "simultaneous",
  items: [
  "2x + y = 5 and x - y = 1",
  "x + y = 10, x - y = 2",
  "3x + 2y = 12 and x + y = 5",
  "2x + 3y = 13 and x = y + 1"
]
},

{
  title: "Speed",
  items: [
  "speed 60 time 2",
  "distance when speed is 50 and time is 3",
  "a car travels at 80 km/h for 2 hours",
  "find time if distance is 100 and speed is 20",
  "distance 120 speed 40"
]
},



{
  title: "profit Loss",
  items: [
  "cost price 500 selling price 650",
  "profit when cost is 200 and selling is 260",
  "loss when cost price is 1000 and selling price is 800",
  "find profit percent cp 400 sp 500",
  "a trader bought for 300 and sold for 360"
]
},


];


const MathSolverForm = ({ onSolve, loading }) => {
  const [input, setInput] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSolve(input);
  };

  const typeText = (text) => {
    let i = 0;
    setInput("");
    const interval = setInterval(() => {
      setInput((prev) => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 20);
  };

  return (
    <div className="solver-box elite">

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Solve anything... (e.g. 2x + 4 = 10)"
        className="ai-input"
      />

      {/* ================= TOPICS VIEW ================= */}
      {!selectedTopic && (
        <div className="topic-grid">
          {suggestions.map((group, i) => (
            <motion.div
              key={i}
              className="topic-card"
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedTopic(group)}
            >
              {group.title}
            </motion.div>
          ))}
        </div>
      )}

      {/* ================= ITEMS VIEW ================= */}
      {selectedTopic && (
        <div className="topic-details">

          <div className="topic-header">
            <button onClick={() => setSelectedTopic(null)}>
              ← Back
            </button>
            <h3>{selectedTopic.title}</h3>
          </div>

          <div className="math-suggestions">
            {selectedTopic.items.map((item, i) => (
              <motion.span
                key={i}
                className="chip"
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  typeText(item);
                  onSolve(item);
                }}
              >
                {item}
              </motion.span>
            ))}
          </div>

        </div>
      )}

      <button className="solve-btn" onClick={handleSubmit}>
        {loading ? "⚡ Solving..." : "🚀 Solve"}
      </button>

    </div>
  );
};

export default MathSolverForm;



// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// // const suggestions = [
// //   "20% of 150",
// //   "2x + 4 = 10",
// //   "divide 100 in ratio 2:3",
// //   "1/2 + 3/4",
// // ];



// const suggestions = [
//   {
//     title: "Percentage",
//     items: [
//       "20% of 150",
//       "increase 200 by 10%",
//       "decrease 500 by 20%",
//       "what percent of 50 is 10",
//       "find original if 20% is 40"
//     ]
//   },
//   {
//     title: "Algebra",
//     items: [
//       "2x + 4 = 10",
//       "3x - 5 = 16",
//       "5x = 25",
//       "x/2 + 3 = 7"
//     ]
//   },
//   {
//     title: "Fractions",
//     items: [
//       "1/2 + 3/4",
//       "5/6 - 1/3",
//       "2/3 × 4/5",
//       "3/4 ÷ 2/5"
//     ]
//   },
//   {
//     title: "Ratio",
//     items: [
//       "divide 100 in ratio 2:3",
//       "share 200 in ratio 1:4",
//       "divide 500 in ratio 3:2"
//     ]
//   },
//   {
//     title: "Simple Interest",
//     items: [
//       "p=1000 r=5 t=2",
//       "p=5000 r=10 t=3",
//       "find simple interest p=2000 r=4 t=5"
//     ]
//   },
//   {
//     title: "Set Theory",
//     items: [
//       "n(A)=20, n(B)=15, n(A∩B)=5",
//       "n(U)=100, n(A)=40",
//       "n(A)=30, n(B)=25, n(C)=20, n(A∩B)=5, n(A∩C)=4, n(B∩C)=3, n(A∩B∩C)=2"
//     ]
//   }
// ];

// const MathSolverForm = ({ onSolve, loading }) => {
//   const [input, setInput] = useState("");
//   const [activeIndex, setActiveIndex] = useState(-1);

//   // 🔥 typing animation when suggestion clicked
//   const typeText = (text) => {
//     let i = 0;
//     setInput("");
//     const interval = setInterval(() => {
//       setInput((prev) => prev + text[i]);
//       i++;
//       if (i >= text.length) clearInterval(interval);
//     }, 20);
//   };

//   const handleSubmit = () => {
//     if (!input.trim()) return;
//     onSolve(input);
//   };

//   // 🔥 keyboard navigation
//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === "ArrowDown") {
//         setActiveIndex((prev) =>
//           prev < suggestions.length - 1 ? prev + 1 : 0
//         );
//       }

//       if (e.key === "ArrowUp") {
//         setActiveIndex((prev) =>
//           prev > 0 ? prev - 1 : suggestions.length - 1
//         );
//       }

//       if (e.key === "Enter") {
//         if (activeIndex >= 0) {
//           typeText(suggestions[activeIndex]);
//           onSolve(suggestions[activeIndex]);
//         } else {
//           handleSubmit();
//         }
//       }
//     };

//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [activeIndex, input]);

//   return (
//     <div className="solver-box elite">

//       <div className="input-group">

//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Solve anything... (e.g. 2x + 4 = 10)"
//           className="ai-input"
//         />

//         {/* 🔥 INSANE SUGGESTIONS */}
//         {/* <div className="math-suggestions">

//           {suggestions.map((s, i) => (
//             <motion.span
//               key={i}
//               className={`chip ${activeIndex === i ? "active" : ""}`}
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.08 }}
//               whileHover={{ scale: 1.08 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => {
//                 typeText(s);
//                 onSolve(s);
//               }}
//             >
//               {s}
//             </motion.span>
//           ))}

//         </div> */}

//         <div className="math-suggestions">

//   {suggestions.map((group, i) => (
//     <div key={i} className="suggestion-group">

//       <h4 className="group-title">{group.title}</h4>

//       <div className="group-items">

//         {group.items.map((item, j) => (
//           <motion.span
//             key={j}
//             className="chip"
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: j * 0.05 }}
//             whileHover={{ scale: 1.08 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => {
//               typeText(item);
//               onSolve(item);
//             }}
//           >
//             {item}
//           </motion.span>
//         ))}

//       </div>

//     </div>
//   ))}

// </div>

//       </div>

//       <button className="solve-btn" onClick={handleSubmit}>
//         {loading ? "⚡ Solving..." : "🚀 Solve"}
//       </button>

//     </div>
//   );
// };

// export default MathSolverForm;

// import { useState } from "react";

// const suggestions = [
//   "20% of 150",
//   "2x + 4 = 10",
//   "divide 100 in ratio 2:3",
//   "1/2 + 3/4",
// ];

// const MathSolverForm = ({ onSolve, loading }) => {
//   const [input, setInput] = useState("");

//   const handleSubmit = () => {
//     if (!input.trim()) return;
//     onSolve(input);
//   };

//   return (
//     <div className="solver-box elite">

//       {/* INPUT + SUGGESTIONS GROUP */}
//       <div className="input-group">

//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type a math problem..."
//           onKeyDown={(e) => {
//             if (e.key === "Enter") handleSubmit();
//           }}
//         />

//         {/* Suggestions BELOW input */}
//         <div className="suggestions">
//           {suggestions.map((s, i) => (
//             <span
//               key={i}
//               onClick={() => {
//                 setInput(s);
//                 onSolve(s); // 🔥 instant solve (premium UX)
//               }}
//             >
//               {s}
//             </span>
//           ))}
//         </div>

//       </div>

//       {/* BUTTON */}
//       <button onClick={handleSubmit}>
//         {loading ? "Solving..." : "Solve"}
//       </button>

//     </div>
//   );
// };

// export default MathSolverForm;



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