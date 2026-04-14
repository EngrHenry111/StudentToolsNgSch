import TopicBadge from "./TopicBadge";
import StepsRenderer from "./StepsRenderer";
import FormulaCard from "./FormulaCard";
import RelatedTopics from "./RelatedTopics";

const SolutionCard = ({ result }) => {
  return (
    <div className="solution-card">

      <TopicBadge topic={result.topic} />

      <FormulaCard formula={result.formula} />

      <StepsRenderer steps={result.steps} />

      <h2 className="answer">Answer: {result.answer}</h2>

      <RelatedTopics topics={result.relatedTopics} />

    </div>
  );
};

export default SolutionCard;