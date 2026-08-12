import "../pageQuiz/proquiz.css";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

// state: "default" | "selected" | "correct" | "incorrect"
const OptionButton = ({ option, index = 0, state = "default", onClick, disabled }) => {
  const stateClass = state !== "default" ? state : "";

  return (
    <button
      type="button"
      className={`pq-option ${stateClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="pq-option-letter">{LETTERS[index] || index + 1}</span>
      <span>{option}</span>
    </button>
  );
};

export default OptionButton;
