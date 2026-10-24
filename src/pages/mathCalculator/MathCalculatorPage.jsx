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
const image = "https://studenttoolsng.com/og-image.png";
    
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

        <section className="math-guide">
          <h2>How to Use the Smart Math Calculator</h2>
          <p>
            Type a maths question in plain words or numbers, then press Solve.
            The calculator works out the answer and shows the steps, so you can
            follow the method and use it in your own WAEC, NECO, JAMB or class
            exercises. You can also tap any of the example chips above the input
            box to try a question instantly.
          </p>
          <ol>
            <li>Type the question, for example <strong>2x + 4 = 10</strong> or <strong>20% of 150</strong>.</li>
            <li>Use / for fractions (3/4), ^ for powers (2^3) and : for ratios (2:3).</li>
            <li>For two equations, separate them with "and" or a comma.</li>
            <li>Read the steps, not just the final answer, so you learn the method.</li>
          </ol>

          <h2>Topics the Calculator Can Solve</h2>
          <ul>
            <li><strong>Algebra:</strong> linear equations such as 3x − 5 = 16 and x/2 + 3 = 7.</li>
            <li><strong>Simultaneous equations:</strong> pairs such as 2x + y = 5 and x − y = 1.</li>
            <li><strong>Fractions:</strong> adding, subtracting, multiplying and dividing.</li>
            <li><strong>Percentages:</strong> percentage of a quantity, percentage increase and decrease, reverse percentages.</li>
            <li><strong>Ratio and proportion:</strong> sharing a quantity in a given ratio.</li>
            <li><strong>Simple interest:</strong> from principal (p), rate (r) and time (t).</li>
            <li><strong>Profit and loss:</strong> from cost price and selling price, including profit percent.</li>
            <li><strong>Speed, distance and time.</strong></li>
            <li><strong>Averages, indices, sets (Venn diagram counts), area and perimeter, age and mixture problems.</strong></li>
            <li><strong>Physics:</strong> force from mass and acceleration (F = ma).</li>
          </ul>

          <h2>Worked Examples</h2>
          <h3>1. Solve 2x + 4 = 10</h3>
          <p>Subtract 4 from both sides: 2x = 6. Divide both sides by 2: <strong>x = 3</strong>. Check: 2 × 3 + 4 = 10.</p>
          <h3>2. Add 1/2 + 3/4</h3>
          <p>The lowest common denominator is 4. 1/2 = 2/4, so 2/4 + 3/4 = 5/4 = <strong>1 1/4</strong>.</p>
          <h3>3. Divide ₦100 000 in the ratio 2 : 3</h3>
          <p>Total parts = 2 + 3 = 5. One part = 100 000 ÷ 5 = 20 000. Shares: 2 × 20 000 = <strong>₦40 000</strong> and 3 × 20 000 = <strong>₦60 000</strong>.</p>
          <h3>4. Simple interest on ₦1000 at 5% for 2 years</h3>
          <p>I = (P × R × T) ÷ 100 = (1000 × 5 × 2) ÷ 100 = <strong>₦100</strong>. Amount = 1000 + 100 = ₦1100.</p>
          <h3>5. Solve 2x + y = 5 and x − y = 1</h3>
          <p>Add the equations to eliminate y: 3x = 6, so x = 2. Substitute into x − y = 1: 2 − y = 1, so y = 1. Answer: <strong>x = 2, y = 1</strong>.</p>
          <h3>6. A trader buys goods for ₦400 and sells them for ₦500</h3>
          <p>Profit = 500 − 400 = ₦100. Profit percent = (100 ÷ 400) × 100 = <strong>25%</strong>.</p>

          <h2>Tips for Using a Math Solver Well</h2>
          <ul>
            <li>Try the question yourself first, then use the calculator to check your answer.</li>
            <li>If your answer differs, compare each step to find exactly where the mistake happened.</li>
            <li>In examinations you must show your working, so copy the method, not just the answer.</li>
            <li>Practise similar questions in our <a href="/quiz">practice quiz</a> and read the step-by-step <a href="/mathematics">mathematics tutorials</a>.</li>
          </ul>
        </section>
      </div>

      {/* <HistoryPanel /> */}
      <HistoryPanel onSelect={(problem) => solve(problem)} />
        
    </div>
  );
};

export default MathCalculatorPage;