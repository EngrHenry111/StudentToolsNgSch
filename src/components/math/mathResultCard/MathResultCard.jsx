import StepsList from "../steps/StepList";
import FormulaBlock from "../Formula/FormulaBlock";
import TopicChip from "../topic/TopicChip";
import RelatedTopicsList from "../relatedTopic/RelatedTopicsList";

const MathResultCard = ({ result }) => {
  if (!result || !result.success) {
    return (
      <div className="result-card error">
        <p>{result?.message || "Something went wrong"}</p>
      </div>
    );
  }

  return (
    <div className="result-card">

      <TopicChip topic={result.topic} />

      <FormulaBlock formula={result.formula} />

      <StepsList steps={result.steps || []} />

      <div className="answer-box">
        Final Answer: {result.answer}
      </div>

      <RelatedTopicsList topics={result.relatedTopics || []} />

    </div>
  );
};

export default MathResultCard;

