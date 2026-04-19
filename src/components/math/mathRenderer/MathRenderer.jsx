import { BlockMath } from "react-katex";

const MathRenderer = ({ expression }) => {
  if (!expression) return null;

  return (
    <div className="math-render">
      <BlockMath math={expression} />
    </div>
  );
};

export default MathRenderer;