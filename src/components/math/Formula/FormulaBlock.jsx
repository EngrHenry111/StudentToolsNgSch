import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const FormulaBlock = ({ formula }) => {
  return (
    <div className="formula-block elite">
      <h3>Formula</h3>
      <BlockMath math={formula} />
    </div>
  );
};

export default FormulaBlock;

// const FormulaBlock = ({ formula }) => {
//   return (
//     <div className="formula-block">
//       <h3>Formula Used</h3>
//       <p>{formula}</p>
//     </div>
//   );
// };

// export default FormulaBlock;