import { useState } from "react";
import { Link } from "react-router-dom";
import EngLayout, { FaqList } from "../engineering/EngLayout";
import { Stat } from "../engineering/EngInputs";
import { cycles, parseDay, todayUTC, addDays, toInput, formatDay } from "../../utils/everyday";
import { EVERYDAY_SECTION, EVERYDAY_TOOLS } from "./everydayTools";
import "../engineering/engineering.css";

const PATH = "/ovulation-calculator";

const faq = [
  {
    q: "How do I calculate my ovulation day?",
    a: "Ovulation usually happens about 14 days before your next period starts. Add your cycle length to the first day of your last period to get your next period, then count back 14 days. With a 28-day cycle, that is about day 14."
  },
  {
    q: "When am I most likely to get pregnant?",
    a: "In the fertile window: the five days before ovulation and the day of ovulation itself. Sperm can live for up to about five days, while an egg lives for about a day."
  },
  {
    q: "How do I calculate my next period date?",
    a: "Add the length of your cycle to the first day of your last period. If your last period started on 3 March and your cycle is 30 days, your next period is due around 2 April."
  },
  {
    q: "Can I use this as contraception?",
    a: "No. Cycles vary from month to month, and ovulation can come earlier or later than expected, so a calendar estimate is not a reliable way to avoid pregnancy. Speak to a health worker about family planning methods."
  }
];

const OvulationCalculator = () => {
  const [lmp, setLmp] = useState(toInput(addDays(todayUTC(), -10)));
  const [length, setLength] = useState("28");

  const start = parseDay(lmp);
  const n = parseInt(length, 10);
  const valid = start !== null && n >= 21 && n <= 45;
  const list = valid ? cycles(start, n, 3) : [];
  const next = list[0];

  return (
    <EngLayout
      path={PATH}
      title="Ovulation Calculator and Next Period Date Calculator"
      description="Free ovulation calculator: enter the first day of your last period and your cycle length to see your ovulation date, fertile window and next period dates."
      keywords="ovulation calculator, how to calculate ovulation, how to calculate ovulation period, fertile window calculator, next period date calculator, how to calculate menstrual cycle, safe period calculator"
      faq={faq}
      section={EVERYDAY_SECTION}
      tools={EVERYDAY_TOOLS}
    >
      <h1>Ovulation and Period Calculator</h1>
      <p className="eng-intro">
        Enter the first day of your last period and the usual length of your
        cycle. You will see your likely ovulation day, fertile window and the
        dates of your next three periods.
      </p>

      <section className="eng-panel" aria-label="Ovulation calculator">
        <div className="eng-grid">
          <label className="eng-field">
            First day of your last period
            <input type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} />
          </label>
          <label className="eng-field">
            Cycle length (days)
            <input type="number" min="21" max="45" value={length} onChange={(e) => setLength(e.target.value)} />
            <span className="eng-hint">from the start of one period to the start of the next; usually 21–35</span>
          </label>
        </div>

        {!valid && <div className="eng-error" role="alert">Enter a date and a cycle length between 21 and 45 days.</div>}

        {next && (
          <div className="eng-result" aria-live="polite">
            <div className="eng-stats" style={{ marginTop: 0 }}>
              <Stat value={formatDay(next.ovulation)} label="estimated ovulation day" />
              <Stat value={`${formatDay(next.fertileStart)} – ${formatDay(next.fertileEnd)}`} label="fertile window" />
              <Stat value={formatDay(next.nextPeriod)} label="next period expected" />
            </div>
            <h3 className="eng-working-title">The next three cycles</h3>
            <div className="eng-working">
              {list.map((c, i) => (
                <div key={i}>
                  Cycle {i + 1}: fertile {formatDay(c.fertileStart)} to {formatDay(c.fertileEnd)}, ovulation{" "}
                  {formatDay(c.ovulation)}, period due {formatDay(c.nextPeriod)}
                </div>
              ))}
            </div>
            <p className="eng-note">
              These are estimates based on an average cycle. Real cycles vary, so do not rely on them to avoid
              pregnancy.
            </p>
          </div>
        )}
      </section>

      <section className="eng-content">
        <h2>How ovulation is calculated</h2>
        <p>
          Your menstrual cycle runs from the first day of one period to the first
          day of the next. The second half of the cycle, from ovulation to the
          next period, is fairly steady at about 14 days for most women. That is
          why ovulation is estimated as 14 days before the next period, not 14
          days after the last one.
        </p>
        <ul>
          <li>Next period = first day of last period + cycle length</li>
          <li>Ovulation day ≈ next period − 14 days</li>
          <li>Fertile window = the 5 days before ovulation and ovulation day</li>
        </ul>

        <h2>Worked example</h2>
        <p>
          Your last period started on 1 June and your cycle is 30 days long. Your
          next period is due on 1 June + 30 days = 1 July. Ovulation is about 14
          days earlier, on 17 June, and your fertile window runs from 12 June to
          17 June.
        </p>

        <h2>How to work out your cycle length</h2>
        <p>
          Mark the first day of bleeding on a calendar for three or more months
          and count the days between each start date. If the numbers differ,
          use the average. A cycle between 21 and 35 days is common. If your
          cycles are very irregular, the dates above will be less accurate.
        </p>

        <h2>Signs that ovulation is near</h2>
        <ul>
          <li>Clear, stretchy vaginal discharge, similar to raw egg white</li>
          <li>A small rise in body temperature after ovulation</li>
          <li>Mild pain on one side of the lower tummy for some women</li>
          <li>A positive result on an ovulation test kit from a pharmacy</li>
        </ul>

        <h2>When to see a health worker</h2>
        <p>
          See a doctor or nurse if your periods stop for more than three months
          without pregnancy, if cycles are regularly shorter than 21 days or
          longer than 35, if bleeding is very heavy, or if you have been trying
          to get pregnant for a year (six months if you are over 35).
        </p>

        <h2>Frequently Asked Questions</h2>
        <FaqList faq={faq} />

        <p>
          Already pregnant? Use the <Link to="/pregnancy-due-date-calculator">Pregnancy Due Date Calculator</Link> to see
          how many weeks along you are.
        </p>
      </section>
    </EngLayout>
  );
};

export default OvulationCalculator;
