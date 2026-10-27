import { useState } from "react";
import { Stat } from "../engineering/EngInputs";
import { SCALES, NG_GRADES, convertScale, courseByCourse, toPercent, degreeClass, fmt2 } from "../../utils/cgpaConvert";

const num = (s) => (String(s).trim() === "" ? NaN : Number(s));

const classLine = (cgpa, scale) => {
  if (scale === 5) return degreeClass(cgpa, 5);
  if (scale === 4) return `${degreeClass(cgpa, 4)} (university) · ${degreeClass(cgpa, 4, { polytechnic: true })} (polytechnic)`;
  return null;
};

export function ScaleConverter() {
  const [cgpa, setCgpa] = useState("4.50");
  const [from, setFrom] = useState(5);
  const [to, setTo] = useState(4);

  const g = num(cgpa);
  const bad = Number.isFinite(g) && (g < 0 || g > from);
  const out = convertScale(g, from, to);
  const pct = toPercent(g, from);

  return (
    <section className="eng-panel" aria-label="Convert CGPA between scales">
      <h2>Convert CGPA between scales</h2>
      <div className="eng-grid">
        <label className="eng-field">
          Your CGPA
          <input type="number" inputMode="decimal" step="0.01" min="0" value={cgpa} onChange={(e) => setCgpa(e.target.value)} />
        </label>
        <label className="eng-field">
          Your scale
          <select value={from} onChange={(e) => setFrom(Number(e.target.value))}>
            {SCALES.map((s) => (
              <option key={s} value={s}>{s}-point scale</option>
            ))}
          </select>
        </label>
        <label className="eng-field">
          Convert to
          <select value={to} onChange={(e) => setTo(Number(e.target.value))}>
            {SCALES.map((s) => (
              <option key={s} value={s}>{s}-point scale</option>
            ))}
          </select>
        </label>
      </div>

      {bad && <div className="eng-error" role="alert">A CGPA on the {from}-point scale must be between 0 and {from}.</div>}

      {out !== null && (
        <div className="eng-result" aria-live="polite">
          <div className="eng-stats" style={{ marginTop: 0 }}>
            <Stat value={`${fmt2(out)} / ${to}`} label={`on the ${to}-point scale`} />
            <Stat value={`${fmt2(pct)}%`} label="as a percentage of the maximum" />
          </div>
          <div className="eng-working">
            <div>{to}-point: {fmt2(g)} ÷ {from} × {to} = {fmt2(out)}</div>
            <div>Percentage: {fmt2(g)} ÷ {from} × 100 = {fmt2(pct)}%</div>
            {classLine(g, from) && <div>Class on your {from}-point scale: {classLine(g, from)}</div>}
            {classLine(out, to) && from !== to && <div>Same position on the {to}-point scale: {classLine(out, to)}</div>}
          </div>
          <p className="eng-note">
            This proportional method is what most forms mean by "convert your CGPA". Evaluation
            services such as WES grade each course instead; use the course-by-course converter below
            for an estimate of that.
          </p>
        </div>
      )}
    </section>
  );
}

const START = [
  { grade: "A", units: "3" },
  { grade: "B", units: "3" },
  { grade: "A", units: "2" },
  { grade: "C", units: "3" },
  { grade: "B", units: "2" }
];

export function CourseConverter() {
  const [rows, setRows] = useState(START);
  const set = (i, k, v) => setRows((r) => r.map((x, j) => (j === i ? { ...x, [k]: v } : x)));

  const res = courseByCourse(rows.map((r) => ({ grade: r.grade, units: num(r.units) })));

  return (
    <section className="eng-panel" aria-label="Course by course conversion">
      <h2>Course-by-course conversion to the 4.0 scale</h2>
      <p className="eng-muted" style={{ marginTop: 0 }}>
        Enter the grade and credit units of each course (or of each semester's courses).
        Each Nigerian grade is changed to its 4.0 equivalent before averaging.
      </p>

      <div className="eng-table-wrap">
        <table className="eng-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Grade</th>
              <th>Units</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <select aria-label={`Course ${i + 1} grade`} value={r.grade} onChange={(e) => set(i, "grade", e.target.value)}>
                    {NG_GRADES.map((g) => (
                      <option key={g.grade} value={g.grade}>{g.grade} ({g.marks})</option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    aria-label={`Course ${i + 1} units`}
                    type="number"
                    inputMode="numeric"
                    min="1"
                    max="12"
                    style={{ width: 70 }}
                    value={r.units}
                    onChange={(e) => set(i, "units", e.target.value)}
                  />
                </td>
                <td>
                  <button type="button" className="eng-btn-ghost" aria-label={`Remove course ${i + 1}`} onClick={() => setRows((x) => x.filter((_, j) => j !== i))}>
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="eng-row">
        <button type="button" className="eng-btn-ghost" onClick={() => setRows((r) => [...r, { grade: "B", units: "3" }])}>
          + Add course
        </button>
      </div>

      {res && (
        <div className="eng-result" aria-live="polite">
          <div className="eng-stats" style={{ marginTop: 0 }}>
            <Stat value={fmt2(res.gpa5)} label="GPA on the 5-point scale" />
            <Stat value={fmt2(res.gpa4)} label="4.0 scale (course by course)" />
            <Stat value={fmt2(res.proportional4)} label="4.0 scale (proportional)" />
          </div>
          <div className="eng-working">
            <div>Total units: {res.units}</div>
            <div>5-point: {res.qp5} quality points ÷ {res.units} units = {fmt2(res.gpa5)}</div>
            <div>4.0 scale: {res.qp4} quality points ÷ {res.units} units = {fmt2(res.gpa4)}</div>
            <div>Proportional: {fmt2(res.gpa5)} ÷ 5 × 4 = {fmt2(res.proportional4)}</div>
          </div>
          <p className="eng-note">
            The two 4.0 results differ because a B (60–69) counts 4 of 5 on the Nigerian scale but
            3 of 4 on the US scale. Evaluators use their own tables, so treat both as estimates.
          </p>
        </div>
      )}
    </section>
  );
}
