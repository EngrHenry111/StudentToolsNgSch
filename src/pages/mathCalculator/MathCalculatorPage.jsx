import { useMathSolver } from "../../hooks/useMathSolve";
import MathSolverForm from "../../components/math/mathSolverForm/MathSolveForm";
import MathResultCard from "../../components/math/mathResultCard/MathResultCard";
import HistoryPanel from "../../components/math/history/HistoryPanel";
import { Helmet } from "react-helmet-async";
import "../../styles/math.css";

const MathCalculatorPage = () => {
  const { solve, result, loading, error } = useMathSolver();

  const url = "https://studenttoolsng.com/tutorials/math-calculator";
const title = "Smart Math Calculator | Solve Algebra, Fractions & Equations Online";
const description = "Free smart math calculator that solves algebra, fractions, equations, and step-by-step problems instantly. Perfect for students learning mathematics.";
const image = "https://studenttoolsng.com/logo.png";
    
  return (
    <div className="math-layout">

      <div className="math-main">

        <Helmet>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={url} />

  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <meta property="og:url" content={url} />

  <meta name="twitter:card" content="summary_large_image" />

  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Smart Math Calculator",
      url: url,
      applicationCategory: "EducationalApplication",
      operatingSystem: "All",
      description: description,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "NGN"
      }
    })}
  </script>
</Helmet>
        <h1 className="math-title">Smart Math Calculator</h1>

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