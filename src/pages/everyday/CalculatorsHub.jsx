import { Link } from "react-router-dom";
import EngLayout from "../engineering/EngLayout";
import { EVERYDAY_SECTION, EVERYDAY_TOOLS, CALCULATOR_GROUPS as GROUPS } from "./everydayTools";
import "../engineering/engineering.css";

const CalculatorsHub = () => (
  <EngLayout
    path="/calculators"
    title="Free Online Calculators for Students in Nigeria"
    description="All StudentToolsNG calculators in one place: CGPA, JAMB, aggregate, WAEC, percentage, BMI, ovulation, pregnancy due date, age and engineering calculators."
    keywords="online calculators, free calculators Nigeria, student calculators, CGPA calculator, percentage calculator, BMI calculator, ovulation calculator, pregnancy calculator"
    section={EVERYDAY_SECTION}
    tools={EVERYDAY_TOOLS}
    schemaType="collection"
  >
    <h1>Free Online Calculators</h1>
    <p className="eng-intro">
      Every calculator on StudentToolsNG, from CGPA and JAMB scores to
      percentages, BMI and due dates. All of them are free, work on your phone
      and show the working.
    </p>

    {GROUPS.map((g) => (
      <section key={g.name}>
        <h2>{g.name}</h2>
        <div className="eng-cards">
          {g.links.map(([to, name, blurb]) => (
            <Link key={to} to={to} className="eng-card">
              <h3>{name}</h3>
              <p>{blurb}</p>
            </Link>
          ))}
        </div>
      </section>
    ))}

    <section className="eng-content">
      <h2>Why use these calculators</h2>
      <p>
        Each calculator shows the formula it uses and a worked example, so you
        can check the answer and learn the method for exams. Nothing you type
        is sent to us: the calculations run in your browser.
      </p>
    </section>
  </EngLayout>
);

export default CalculatorsHub;
