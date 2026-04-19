import MathRenderer from "../../components/math/mathRenderer/MathRenderer";
import { toLatexFraction } from "../../utils/formatters";

const MathResultCard = ({ result }) => {
  if (!result) return null;

  const latexAnswer = toLatexFraction(result.answer);

  return (
    <div className="result-card elite">

      <h3>{result.topic}</h3>

      {/* 🔥 FORMULA */}
      {result.formula && (
        <p className="formula">{result.formula}</p>
      )}

      {/* 🔥 STEPS */}
      <div className="steps">
        {result.steps.map((step, i) => (
          <p key={i}>👉 {step}</p>
        ))}
      </div>

      {/* 🔥 PREMIUM ANSWER */}
      <div className="answer-box">
        <h4>Final Answer:</h4>
        <MathRenderer expression={latexAnswer} />
      </div>

    </div>
  );
};

export default MathResultCard;