import { useMathSolver } from "../../hooks/useMathSolve";
import MathSolverForm from "../../components/math/mathSolverForm/MathSolveForm";
import MathResultCard from "../../components/math/mathResultCard/MathResultCard";
import HistoryPanel from "../../components/math/history/HistoryPanel";
import "../../styles/math.css";

const MathCalculatorPage = () => {
  const { solve, result, loading, error } = useMathSolver();

  return (
    <div className="math-layout">

      <div className="math-main">
        <h1 className="math-title">Smart Math Engine</h1>

        <MathSolverForm onSolve={solve} loading={loading} />

        {error && <div className="error">{error}</div>}

        {result && <MathResultCard result={result} />}
      </div>

      {/* <HistoryPanel /> */}
      <HistoryPanel onSelect={(problem) => solve(problem)} />

    </div>
  );
};

export default MathCalculatorPage;