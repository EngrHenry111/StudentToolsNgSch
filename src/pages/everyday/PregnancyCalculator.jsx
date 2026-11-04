import { useState } from "react";
import { Link } from "react-router-dom";
import EngLayout, { FaqList } from "../engineering/EngLayout";
import { Segment, Stat } from "../engineering/EngInputs";
import {
  pregnancyFromLmp,
  pregnancyFromConception,
  parseDay,
  todayUTC,
  addDays,
  toInput,
  formatDay
} from "../../utils/everyday";
import { EVERYDAY_SECTION, EVERYDAY_TOOLS } from "./everydayTools";
import "../engineering/engineering.css";

const PATH = "/pregnancy-due-date-calculator";

const faq = [
  {
    q: "How is the due date calculated?",
    a: "Health workers add 280 days (40 weeks) to the first day of your last menstrual period. This is called Naegele's rule and assumes a 28-day cycle. With a longer or shorter cycle, the date moves by the difference."
  },
  {
    q: "How many weeks pregnant am I?",
    a: "Pregnancy is counted from the first day of your last period, not from conception. So when you conceive, you are already about two weeks pregnant by this count. The calculator shows your weeks and days from that date."
  },
  {
    q: "How accurate is the due date?",
    a: "It is an estimate. Only a small share of babies arrive on their due date; most are born within about two weeks either side. An early ultrasound scan gives the most accurate dating."
  },
  {
    q: "What are the three trimesters?",
    a: "The first trimester runs to the end of week 13, the second from week 14 to the end of week 27, and the third from week 28 until birth."
  }
];

const PregnancyCalculator = () => {
  const [method, setMethod] = useState("lmp");
  const [date, setDate] = useState(toInput(addDays(todayUTC(), -70)));
  const [length, setLength] = useState("28");

  const t = parseDay(date);
  const n = parseInt(length, 10);
  const valid = t !== null && (method === "conception" || (n >= 21 && n <= 45));
  const r = valid ? (method === "lmp" ? pregnancyFromLmp(t, n) : pregnancyFromConception(t)) : null;
  const inRange = r && r.days >= 0 && r.days <= 300;

  return (
    <EngLayout
      path={PATH}
      title="Pregnancy Due Date Calculator: How Many Weeks Pregnant Am I?"
      description="Free pregnancy due date calculator: use your last period or conception date to see your due date, how many weeks pregnant you are and your trimester."
      keywords="pregnancy due date calculator, how to calculate pregnancy weeks, how many weeks pregnant am I, EDD calculator, expected delivery date calculator, pregnancy calculator Nigeria, how to calculate due date"
      faq={faq}
      section={EVERYDAY_SECTION}
      tools={EVERYDAY_TOOLS}
    >
      <h1>Pregnancy Due Date Calculator</h1>
      <p className="eng-intro">
        Find your estimated due date (EDD), how many weeks and days pregnant you
        are, and which trimester you are in.
      </p>

      <section className="eng-panel" aria-label="Pregnancy due date calculator">
        <Segment
          label="Calculate from"
          value={method}
          onChange={setMethod}
          options={[{ value: "lmp", label: "First day of last period" }, { value: "conception", label: "Conception date" }]}
        />
        <div className="eng-grid">
          <label className="eng-field">
            {method === "lmp" ? "First day of your last period" : "Date of conception"}
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          {method === "lmp" && (
            <label className="eng-field">
              Usual cycle length (days)
              <input type="number" min="21" max="45" value={length} onChange={(e) => setLength(e.target.value)} />
            </label>
          )}
        </div>

        {!valid && <div className="eng-error" role="alert">Enter a valid date{method === "lmp" ? " and a cycle length between 21 and 45 days" : ""}.</div>}
        {r && !inRange && (
          <div className="eng-error" role="alert">
            That date gives {r.days < 0 ? "a pregnancy that has not started yet" : "more than 42 weeks"}. Check the date you entered.
          </div>
        )}

        {inRange && (
          <div className="eng-result" aria-live="polite">
            <div className="eng-stats" style={{ marginTop: 0 }}>
              <Stat value={formatDay(r.due)} label="estimated due date" />
              <Stat value={`${r.weeks} weeks ${r.extraDays} day${r.extraDays === 1 ? "" : "s"}`} label="pregnant today" />
              <Stat value={r.trimester === 1 ? "First" : r.trimester === 2 ? "Second" : "Third"} label="trimester" />
              <Stat value={r.daysLeft > 0 ? `${r.daysLeft} days` : "Due now"} label="until the due date" />
            </div>
            <h3 className="eng-working-title">Key dates</h3>
            <div className="eng-working">
              {method === "lmp" && <div>Likely conception: around {formatDay(r.conception)}</div>}
              {r.milestones.map((m) => (
                <div key={m.label}>
                  {m.label}: {formatDay(m.date)}
                </div>
              ))}
            </div>
            <p className="eng-note">
              An estimate only. Book antenatal care early; your clinic will confirm the date, often with a scan.
            </p>
          </div>
        )}
      </section>

      <section className="eng-content">
        <h2>How to calculate your due date</h2>
        <p>
          The usual method, Naegele's rule, adds 280 days (40 weeks) to the first
          day of your last menstrual period (LMP). It assumes a 28-day cycle with
          ovulation on about day 14. If your cycle is longer, ovulation and the
          due date come later by the same number of days; if it is shorter,
          they come earlier.
        </p>
        <ul>
          <li>Due date = first day of last period + 280 days (28-day cycle)</li>
          <li>Due date = conception date + 266 days</li>
          <li>Quick method: add 7 days to the first day of your last period, then count back 3 months and add a year</li>
        </ul>

        <h2>Worked example</h2>
        <p>
          Your last period started on 10 January and your cycle is 28 days. Adding
          7 days gives 17 January; counting back 3 months gives 17 October. Your
          estimated due date is 17 October of the same year. With a 31-day
          cycle, it would be 3 days later, on 20 October.
        </p>

        <h2>How pregnancy weeks are counted</h2>
        <p>
          Pregnancy weeks are counted from the first day of your last period,
          about two weeks before conception. So at the moment of conception you
          are already counted as two weeks pregnant. A full-term pregnancy is
          37 to 42 weeks, with 40 weeks as the due date.
        </p>

        <h2>The trimesters</h2>
        <ul>
          <li>First trimester: weeks 1 to 13. The baby's organs begin to form; tiredness and nausea are common.</li>
          <li>Second trimester: weeks 14 to 27. Many women feel the baby move for the first time.</li>
          <li>Third trimester: week 28 until birth. The baby grows quickly and gets ready for delivery.</li>
        </ul>

        <h2>Antenatal care</h2>
        <p>
          Start antenatal care as early as you can, ideally in the first 12
          weeks. Your clinic will confirm your dates, check your blood pressure
          and blood levels, and advise on supplements such as folic acid and
          iron. Go to a health facility straight away if you have heavy
          bleeding, severe headache, blurred vision, a high fever or if the
          baby stops moving as usual.
        </p>

        <h2>Frequently Asked Questions</h2>
        <FaqList faq={faq} />

        <p>
          Planning a pregnancy? Use the <Link to="/ovulation-calculator">Ovulation Calculator</Link> to find your fertile days.
        </p>
      </section>
    </EngLayout>
  );
};

export default PregnancyCalculator;
