import { useState } from "react";
import { Link } from "react-router-dom";
import EngLayout, { FaqList } from "../engineering/EngLayout";
import { DC_SECTION, DC_TOOLS, DC_PAGES, calcIntro, calcSteps, requiredGpa, UNI_CLASSES, POLY_CLASSES } from "./degreeContent";
import "../engineering/engineering.css";

const fmt = (x) => (Math.round(x * 100) / 100).toFixed(2);

// "Can I still make it?" calculator: the average GPA needed over the
// remaining credit units to finish on a target CGPA.
function TargetCalculator({ page }) {
  const max = page.scale;
  const [current, setCurrent] = useState("");
  const [done, setDone] = useState("");
  const [left, setLeft] = useState("");
  const [target, setTarget] = useState(page.target.toFixed(2));
  const classes = page.poly ? POLY_CLASSES : UNI_CLASSES;

  const nums = { current: parseFloat(current), doneUnits: parseFloat(done), leftUnits: parseFloat(left), target: parseFloat(target) };
  const filled = current !== "" && done !== "" && left !== "";
  const badCurrent = current !== "" && !(nums.current >= 0 && nums.current <= max);
  const badTarget = !(nums.target > 0 && nums.target <= max);
  const need = filled && !badCurrent && !badTarget ? requiredGpa(nums) : null;

  let verdict = null;
  if (need !== null) {
    if (need > max) verdict = { tone: "bad", text: `You would need ${fmt(need)} out of ${max}.00, which is not possible with ${nums.leftUnits} units left. Try a lower target.` };
    else if (need <= 0) verdict = { tone: "ok", text: "You will stay at or above this target even if you only pass your remaining courses. Keep it up." };
    else verdict = { tone: need >= max - 0.5 ? "warn" : "ok", text: `You need an average GPA of ${fmt(need)} out of ${max}.00 over your remaining ${nums.leftUnits} units to finish on ${fmt(nums.target)}.` };
  }

  return (
    <div className="eng-panel">
      <h2>Can I still make it?</h2>
      <p className="eng-muted">{calcIntro(page)}</p>
      <div className="eng-grid">
        <label className="eng-field">
          <span>Current CGPA (out of {max})</span>
          <input type="number" inputMode="decimal" min="0" max={max} step="0.01" value={current} onChange={(e) => setCurrent(e.target.value)} className={badCurrent ? "is-bad" : ""} />
        </label>
        <label className="eng-field">
          <span>Credit units completed</span>
          <input type="number" inputMode="numeric" min="0" step="1" value={done} onChange={(e) => setDone(e.target.value)} />
        </label>
        <label className="eng-field">
          <span>Credit units left</span>
          <input type="number" inputMode="numeric" min="1" step="1" value={left} onChange={(e) => setLeft(e.target.value)} />
        </label>
        <label className="eng-field">
          <span>Target CGPA</span>
          <select value={target} onChange={(e) => setTarget(e.target.value)}>
            {classes.map((c) => (
              <option key={c.name} value={c.min.toFixed(2)}>
                {c.min.toFixed(2)} ({c.name})
              </option>
            ))}
          </select>
        </label>
      </div>
      {badCurrent && <p className="eng-hint bad">Enter a CGPA between 0 and {max}.</p>}
      {verdict && (
        <div className="eng-result" aria-live="polite">
          <p className={`eng-hint ${verdict.tone === "bad" ? "bad" : "ok"}`} style={{ fontSize: 16 }}>
            {verdict.text}
          </p>
        </div>
      )}
      <details>
        <summary className="eng-muted">How this is worked out</summary>
        <ol className="eng-muted">
          {calcSteps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </details>
    </div>
  );
}

const DegreeClassPage = ({ slug }) => {
  const page = DC_PAGES.find((p) => p.slug === slug);

  return (
    <EngLayout
      key={slug}
      path={page.path}
      title={page.title}
      description={page.description}
      faq={page.faq}
      section={DC_SECTION}
      tools={DC_TOOLS}
    >
      <h1>{page.h1}</h1>
      <p className="eng-intro">{page.intro}</p>

      <TargetCalculator page={page} />

      <section className="eng-content">
        {page.sections.map((s) => (
          <div key={s.h2}>
            <h2>{s.h2}</h2>
            {s.paras.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {s.items && (
              <ul>
                {s.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <h2>Frequently Asked Questions</h2>
        <FaqList faq={page.faq} />

        <h2>Related pages</h2>
        <ul>
          {DC_PAGES.filter((p) => p.slug !== slug).map((p) => (
            <li key={p.path}>
              <Link to={p.path}>{p.h1.replace(/\?$/, "")}</Link>
            </li>
          ))}
        </ul>
        <p>
          Work out your CGPA with the <Link to="/cgpa-calculator">CGPA Calculator</Link>, check your class with the{" "}
          <Link to="/gpa-class-calculator">GPA Class Calculator</Link>, or convert between scales with the{" "}
          <Link to="/cgpa-converter">CGPA Converter</Link>.
        </p>
      </section>
    </EngLayout>
  );
};

export default DegreeClassPage;
