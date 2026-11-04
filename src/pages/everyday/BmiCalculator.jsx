import { useState } from "react";
import { Link } from "react-router-dom";
import EngLayout, { FaqList } from "../engineering/EngLayout";
import { Segment, Stat } from "../engineering/EngInputs";
import { bmi, feetInchesToCm, fmt } from "../../utils/everyday";
import { EVERYDAY_SECTION, EVERYDAY_TOOLS } from "./everydayTools";
import "../engineering/engineering.css";

const PATH = "/bmi-calculator";

const faq = [
  {
    q: "What is a normal BMI?",
    a: "For adults, a BMI from 18.5 to 24.9 is in the healthy range. Below 18.5 is underweight, 25 to 29.9 is overweight and 30 or more is obese."
  },
  {
    q: "How do I calculate BMI by hand?",
    a: "Divide your weight in kilograms by your height in metres squared. A person who weighs 70 kg and is 1.75 m tall has a BMI of 70 ÷ (1.75 × 1.75) = 22.9."
  },
  {
    q: "Is BMI accurate for everyone?",
    a: "No. BMI does not tell fat from muscle, so very muscular people can score as overweight. It is also not used in the same way for children, teenagers or pregnant women. It is a quick screening number, not a diagnosis."
  },
  {
    q: "Can I use BMI for children?",
    a: "Not with these adult bands. For children and teenagers, doctors compare BMI with growth charts for the child's age and sex. Ask a health worker if you are concerned about a child's weight."
  }
];

const BmiCalculator = () => {
  const [unit, setUnit] = useState("metric");
  const [kg, setKg] = useState("68");
  const [cm, setCm] = useState("170");
  const [ft, setFt] = useState("5");
  const [inch, setInch] = useState("7");

  const heightCm = unit === "metric" ? parseFloat(cm) : feetInchesToCm(parseFloat(ft) || 0, parseFloat(inch) || 0);
  const result = bmi(parseFloat(kg), heightCm);

  return (
    <EngLayout
      path={PATH}
      title="BMI Calculator: Check Your Body Mass Index (kg, cm, feet)"
      description="Free BMI calculator for adults: enter weight and height in kg and cm or feet and inches to get your body mass index, its category and healthy weight range."
      keywords="BMI calculator, how to calculate BMI, body mass index calculator, BMI calculator kg and cm, BMI calculator feet and inches, healthy weight for my height, normal BMI"
      faq={faq}
      section={EVERYDAY_SECTION}
      tools={EVERYDAY_TOOLS}
    >
      <h1>BMI Calculator</h1>
      <p className="eng-intro">
        Enter your weight and height to see your body mass index (BMI), what it
        means, and the healthy weight range for your height. For adults aged 18
        and over.
      </p>

      <section className="eng-panel" aria-label="BMI calculator">
        <Segment
          label="Units"
          value={unit}
          onChange={setUnit}
          options={[{ value: "metric", label: "kg and cm" }, { value: "imperial", label: "kg and feet/inches" }]}
        />
        <div className="eng-grid">
          <label className="eng-field">
            Weight (kg)
            <input type="text" inputMode="decimal" value={kg} onChange={(e) => setKg(e.target.value)} />
          </label>
          {unit === "metric" ? (
            <label className="eng-field">
              Height (cm)
              <input type="text" inputMode="decimal" value={cm} onChange={(e) => setCm(e.target.value)} />
            </label>
          ) : (
            <>
              <label className="eng-field">
                Height (feet)
                <input type="text" inputMode="numeric" value={ft} onChange={(e) => setFt(e.target.value)} />
              </label>
              <label className="eng-field">
                and inches
                <input type="text" inputMode="decimal" value={inch} onChange={(e) => setInch(e.target.value)} />
              </label>
            </>
          )}
        </div>

        {result && (
          <div className="eng-result" aria-live="polite">
            <div className="eng-stats" style={{ marginTop: 0 }}>
              <Stat value={fmt(result.value, 1)} label="your BMI" />
              <Stat value={result.band} label="category" />
              <Stat value={`${fmt(result.low, 1)}–${fmt(result.high, 1)} kg`} label="healthy weight for your height" />
            </div>
            <p className="eng-note">
              BMI = {fmt(parseFloat(kg), 1)} kg ÷ ({fmt(heightCm / 100, 2)} m)² = {fmt(result.value, 1)}. This is a
              screening number only; talk to a doctor or nurse about your health.
            </p>
          </div>
        )}
      </section>

      <section className="eng-content">
        <h2>What is BMI?</h2>
        <p>
          Body mass index (BMI) compares your weight with your height. It is a
          quick way for health workers to see whether an adult's weight is in a
          range linked with good health. It does not measure body fat directly.
        </p>

        <h2>BMI categories for adults</h2>
        <ul>
          <li>Below 18.5: underweight</li>
          <li>18.5 to 24.9: healthy weight</li>
          <li>25 to 29.9: overweight</li>
          <li>30 and above: obese</li>
        </ul>

        <h2>The BMI formula</h2>
        <p>
          BMI = weight in kilograms ÷ (height in metres × height in metres). If
          your height is in centimetres, divide it by 100 first. For example, a
          woman who weighs 60 kg and is 160 cm (1.6 m) tall has a BMI of 60 ÷
          2.56 = 23.4, which is in the healthy range.
        </p>

        <h2>Converting feet and inches</h2>
        <p>
          One foot is 12 inches and one inch is 2.54 cm. A height of 5 feet 7
          inches is 67 inches, which is 67 × 2.54 = 170.2 cm. The calculator
          does this conversion for you when you choose feet and inches.
        </p>

        <h2>Limits of BMI</h2>
        <ul>
          <li>It cannot tell muscle from fat, so athletes may show a high BMI.</li>
          <li>It is not used in the same way for children, teenagers or pregnant women.</li>
          <li>Where fat is stored matters too. A large waist can be a health risk even with a normal BMI.</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <FaqList faq={faq} />

        <p>
          More free tools: <Link to="/percentage-calculator">Percentage Calculator</Link> and{" "}
          <Link to="/age-calculator">Age Calculator</Link>.
        </p>
      </section>
    </EngLayout>
  );
};

export default BmiCalculator;
