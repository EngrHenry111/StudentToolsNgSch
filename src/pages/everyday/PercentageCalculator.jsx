import { useState } from "react";
import { Link } from "react-router-dom";
import EngLayout, { FaqList } from "../engineering/EngLayout";
import { Segment, Stat } from "../engineering/EngInputs";
import { PERCENT_MODES, fmt } from "../../utils/everyday";
import { EVERYDAY_SECTION, EVERYDAY_TOOLS } from "./everydayTools";
import "../engineering/engineering.css";

const PATH = "/percentage-calculator";

const faq = [
  {
    q: "How do I calculate a percentage of a number?",
    a: "Divide the percentage by 100 and multiply by the number. 15% of 8,000 is 15 ÷ 100 × 8,000 = 1,200."
  },
  {
    q: "How do I find what percentage one number is of another?",
    a: "Divide the part by the whole and multiply by 100. If you scored 42 out of 60, that is 42 ÷ 60 × 100 = 70%."
  },
  {
    q: "How do I calculate percentage increase?",
    a: "Subtract the old value from the new one, divide by the old value and multiply by 100. A price that rises from ₦2,500 to ₦3,000 has gone up by 500 ÷ 2,500 × 100 = 20%."
  },
  {
    q: "How do I add 7.5% VAT to a price?",
    a: "Multiply the price by 1.075. ₦10,000 plus 7.5% VAT is ₦10,000 × 1.075 = ₦10,750, so the VAT is ₦750."
  }
];

const PercentageCalculator = () => {
  const [mode, setMode] = useState("of");
  const [a, setA] = useState("15");
  const [b, setB] = useState("8000");

  const m = PERCENT_MODES[mode];
  const x = parseFloat(String(a).replace(/,/g, ""));
  const y = parseFloat(String(b).replace(/,/g, ""));
  const ready = Number.isFinite(x) && Number.isFinite(y);
  const result = ready ? m.calc(x, y) : null;

  const shown = result
    ? `${result.signed && result.value > 0 ? "+" : ""}${fmt(result.value)}${result.unit || ""}`
    : null;

  return (
    <EngLayout
      path={PATH}
      title="Percentage Calculator: Find X% of Y, Increase and Discount"
      description="Free percentage calculator: work out a percentage of a number, what percent one number is of another, percentage increase or decrease, VAT and discounts."
      keywords="percentage calculator, how to calculate percentage, percentage of money, percentage increase calculator, percentage decrease, discount calculator, VAT calculator Nigeria, percentage formula"
      faq={faq}
      section={EVERYDAY_SECTION}
      tools={EVERYDAY_TOOLS}
    >
      <h1>Percentage Calculator</h1>
      <p className="eng-intro">
        Choose what you want to work out, enter two numbers and the answer
        appears with the working. It handles scores, prices, VAT, discounts and
        percentage change.
      </p>

      <section className="eng-panel" aria-label="Percentage calculator">
        <Segment
          label="What to calculate"
          value={mode}
          onChange={setMode}
          options={Object.entries(PERCENT_MODES).map(([value, o]) => ({ value, label: o.label }))}
        />
        <div className="eng-grid">
          <label className="eng-field">
            {m.a}
            <input type="text" inputMode="decimal" value={a} onChange={(e) => setA(e.target.value)} />
          </label>
          <label className="eng-field">
            {m.b}
            <input type="text" inputMode="decimal" value={b} onChange={(e) => setB(e.target.value)} />
          </label>
        </div>

        {ready && !result && <div className="eng-error" role="alert">The whole or old value can't be zero.</div>}

        {result && (
          <div className="eng-result" aria-live="polite">
            <div className="eng-stats" style={{ marginTop: 0 }}>
              <Stat value={shown} label="answer" />
              {result.extra !== undefined && <Stat value={fmt(result.extra)} label={mode === "add" ? "amount added" : "amount taken off"} />}
            </div>
            <p className="eng-note">Working: {result.steps.join(" ")} = {shown}</p>
          </div>
        )}
      </section>

      <section className="eng-content">
        <h2>Percentage formulas</h2>
        <ul>
          <li>Percentage of a number: X% of Y = X ÷ 100 × Y</li>
          <li>What percent X is of Y: X ÷ Y × 100</li>
          <li>Percentage change: (new − old) ÷ old × 100</li>
          <li>Adding a percentage: amount × (1 + X ÷ 100)</li>
          <li>Taking off a percentage: amount × (1 − X ÷ 100)</li>
        </ul>

        <h2>Worked examples</h2>
        <h3>Your score as a percentage</h3>
        <p>
          You scored 54 out of 75 in a test. Your percentage is 54 ÷ 75 × 100 =
          72%. The same method turns any mark into a percentage, which is how
          most schools compare results from tests with different totals.
        </p>
        <h3>Percentage of money</h3>
        <p>
          A trader gives a 10% discount on a ₦45,000 phone. The discount is 10 ÷
          100 × 45,000 = ₦4,500, so the customer pays ₦40,500. To check, 45,000
          × 0.9 gives the same answer in one step.
        </p>
        <h3>VAT in Nigeria</h3>
        <p>
          Value Added Tax in Nigeria is 7.5%. A ₦20,000 invoice plus VAT is
          20,000 × 1.075 = ₦21,500. To remove VAT from a price that already
          includes it, divide by 1.075 instead: ₦21,500 ÷ 1.075 = ₦20,000.
        </p>
        <h3>Percentage increase</h3>
        <p>
          A bag of rice rose from ₦60,000 to ₦75,000. The increase is 15,000, and
          15,000 ÷ 60,000 × 100 = 25%. Always divide by the old value, not the
          new one, or the answer comes out too small.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li>Dividing by the new value when working out a percentage change.</li>
          <li>Adding percentages one after another: two 10% rises make 21%, not 20%, because the second rise is on a bigger number.</li>
          <li>Removing VAT by subtracting 7.5% of the final price. Divide by 1.075 instead.</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <FaqList faq={faq} />

        <p>
          For school results, try the <Link to="/cgpa-calculator">CGPA Calculator</Link> or the{" "}
          <Link to="/cgpa-converter">CGPA to Percentage Converter</Link>.
        </p>
      </section>
    </EngLayout>
  );
};

export default PercentageCalculator;
