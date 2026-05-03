const QuestionCard = ({ q, onSelect }) => {
  return (
    <div>
      <h3>{q.question}</h3>

      {q.options.map(opt => (
        <button key={opt} onClick={() => onSelect(q.id, opt)}>
          {opt}
        </button>
      ))}
    </div>
  );
};

export default QuestionCard;