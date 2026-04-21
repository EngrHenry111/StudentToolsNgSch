import StepsList from "../steps/StepList";
import FormulaBlock from "../Formula/FormulaBlock";
import TopicChip from "../topic/TopicChip";
import RelatedTopicsList from "../relatedTopic/RelatedTopicsList";

const MathResultCard = ({ result }) => {
  return (
    <div className="result-card">

      <TopicChip topic={result.topic} />

      <FormulaBlock formula={result.formula} />

      <StepsList steps={result.steps} />

      <div className="answer-box">
        Final Answer: {result.answer}
      </div>

      <RelatedTopicsList topics={result.relatedTopics} />

    </div>
  );
};

export default MathResultCard;

