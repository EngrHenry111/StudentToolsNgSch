import OptionButton from "./OptionButton";
import "../pageQuiz/proquiz.css";

// q: { question, options }
// selected: currently chosen option (string) or undefined
// correctAnswer: only passed once the quiz has been submitted/reviewed
const QuestionCard = ({ q, index, total, selected, onSelect, correctAnswer, reviewMode }) => {
  const getState = (opt) => {
    if (!reviewMode) {
      return selected === opt ? "selected" : "default";
    }
    if (opt === correctAnswer) return "correct";
    if (opt === selected && selected !== correctAnswer) return "incorrect";
    return "default";
  };

  return (
    <div className="pq-card">
      {typeof index === "number" && typeof total === "number" && (
        <>
          <div className="pq-question-count">
            Question {index + 1} of {total}
          </div>
          <div className="pq-progress-track">
            <div
              className="pq-progress-fill"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </div>
        </>
      )}

      <h3 className="pq-question-text">{q.question}</h3>

      <div className="pq-options">
        {Array.isArray(q.options) &&
          q.options.map((opt, i) => (
            <OptionButton
              key={i}
              option={opt}
              index={i}
              state={getState(opt)}
              disabled={reviewMode}
              onClick={() => onSelect && onSelect(opt)}
            />
          ))}
      </div>
    </div>
  );
};

export default QuestionCard;
