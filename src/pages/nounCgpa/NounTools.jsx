import { useState } from "react";
import { Stat, Segment } from "../engineering/EngInputs";
import { NG_GRADES, fmt2 } from "../../utils/cgpaConvert";
import { nounResult, gradeFromScore, TMA_MAX, EXAM_MAX } from "../../utils/nounCgpa";
import "./noun.css";

const num = (s) => (String(s).trim() === "" ? NaN : Number(s));

const START = [
  { code: "GST101", units: "2", tma: "24", exam: "48", grade: "B" },
  { code: "MTH101", units: "3", tma: "26", exam: "50", grade: "A" },
  { code: "CIT101", units: "2", tma: "20", exam: "35", grade: "C" },
  { code: "BIO101", units: "3", tma: "18", exam: "30", grade: "D" }
];
const BLANK = { code: "", units: "2", tma: "", exam: "", grade: "B" };

const MODES = [
  { value: "scores", label: "TMA + exam scores" },
  { value: "grades", label: "Letter grades" }
];

export function NounCalculator() {
  const [mode, setMode] = useState("scores");
  const [rows, setRows] = useState(START);
  const [prevCgpa, setPrevCgpa] = useState("");
  const [prevUnits, setPrevUnits] = useState("");
  const set = (i, k, v) => setRows((r) => r.map((x, j) => (j === i ? { ...x, [k]: v } : x)));

  const input = rows.map((r) =>
    mode === "grades"
      ? { units: num(r.units), grade: r.grade }
      : { units: num(r.units), tma: num(r.tma), exam: num(r.exam) }
  );
  const res = nounResult(input, { cgpa: num(prevCgpa), units: num(prevUnits) });
  const pc = num(prevCgpa);
  const prevBad = Number.isFinite(pc) && (pc < 0 || pc > 5);

  return (
    <section className="eng-panel" aria-label="NOUN CGPA calculator">
      <h2>Calculate your NOUN GPA and CGPA</h2>
      <Segment label="How to enter results" options={MODES} value={mode} onChange={setMode} />
      <p className="eng-muted">
        {mode === "scores"
          ? `Enter your TMA total (out of ${TMA_MAX}) and exam score (out of ${EXAM_MAX}) for each course. The grade is worked out for you.`
          : "Pick the grade shown on your result for each course."}
      </p>

      <div className="eng-table-wrap">
        <table className="eng-table noun-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Units</th>
              {mode === "scores" ? (
                <>
                  <th>TMA<br />/{TMA_MAX}</th>
                  <th>Exam<br />/{EXAM_MAX}</th>
                  <th>Grade</th>
                </>
              ) : (
                <th>Grade</th>
              )}
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const tma = num(r.tma);
              const exam = num(r.exam);
              const tmaBad = Number.isFinite(tma) && (tma < 0 || tma > TMA_MAX);
              const examBad = Number.isFinite(exam) && (exam < 0 || exam > EXAM_MAX);
              const total = Number.isFinite(tma) && Number.isFinite(exam) && !tmaBad && !examBad ? tma + exam : null;
              return (
                <tr key={i}>
                  <td>
                    <input aria-label={`Course ${i + 1} code`} type="text" placeholder="GST101" className="noun-code" value={r.code} onChange={(e) => set(i, "code", e.target.value)} />
                  </td>
                  <td>
                    <input aria-label={`Course ${i + 1} units`} type="number" inputMode="numeric" min="1" max="12" className="noun-num" value={r.units} onChange={(e) => set(i, "units", e.target.value)} />
                  </td>
                  {mode === "scores" ? (
                    <>
                      <td>
                        <input aria-label={`Course ${i + 1} TMA score`} type="number" inputMode="decimal" min="0" max={TMA_MAX} className={`noun-num${tmaBad ? " is-bad" : ""}`} value={r.tma} onChange={(e) => set(i, "tma", e.target.value)} />
                      </td>
                      <td>
                        <input aria-label={`Course ${i + 1} exam score`} type="number" inputMode="decimal" min="0" max={EXAM_MAX} className={`noun-num${examBad ? " is-bad" : ""}`} value={r.exam} onChange={(e) => set(i, "exam", e.target.value)} />
                      </td>
                      <td className="noun-grade">{total === null ? "–" : <><b>{gradeFromScore(total)}</b><small>{total}</small></>}</td>
                    </>
                  ) : (
                    <td>
                      <select aria-label={`Course ${i + 1} grade`} value={r.grade} onChange={(e) => set(i, "grade", e.target.value)}>
                        {NG_GRADES.map((g) => (
                          <option key={g.grade} value={g.grade}>{g.grade} ({g.marks})</option>
                        ))}
                      </select>
                    </td>
                  )}
                  <td>
                    <button type="button" className="eng-btn-ghost" aria-label={`Remove course ${i + 1}`} onClick={() => setRows((x) => x.filter((_, j) => j !== i))}>
                      ✕
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="eng-row">
        <button type="button" className="eng-btn-ghost" onClick={() => setRows((r) => [...r, BLANK])}>
          + Add course
        </button>
        <button type="button" className="eng-btn-ghost" onClick={() => setRows([BLANK])}>
          Clear all
        </button>
      </div>

      <h3>Earlier semesters (optional)</h3>
      <p className="eng-muted" style={{ marginTop: 0 }}>
        To get your new CGPA, enter the CGPA and total credit units already on your portal before this semester.
      </p>
      <div className="eng-grid">
        <label className="eng-field">
          Current CGPA
          <input type="number" inputMode="decimal" step="0.01" min="0" max="5" placeholder="e.g. 3.42" className={prevBad ? "is-bad" : ""} value={prevCgpa} onChange={(e) => setPrevCgpa(e.target.value)} />
        </label>
        <label className="eng-field">
          Units completed so far
          <input type="number" inputMode="numeric" min="0" placeholder="e.g. 48" value={prevUnits} onChange={(e) => setPrevUnits(e.target.value)} />
        </label>
      </div>
      {prevBad && <div className="eng-error" role="alert">A CGPA on the NOUN 5-point scale must be between 0 and 5.</div>}

      {res && (
        <div className="eng-result" aria-live="polite">
          <div className="eng-stats" style={{ marginTop: 0 }}>
            <Stat value={fmt2(res.gpa)} label="GPA this semester" />
            <Stat value={fmt2(res.cgpa)} label={res.hasPrev ? "new CGPA" : "CGPA (these courses)"} />
            <Stat value={res.degreeClass} label="class of degree" />
          </div>
          <div className="eng-working">
            <div>This semester: {res.qp} grade points ÷ {res.units} units = {fmt2(res.gpa)}</div>
            {res.hasPrev && (
              <div>
                CGPA: ({fmt2(num(prevCgpa))} × {num(prevUnits)} + {res.qp}) ÷ {res.allUnits} units = {fmt2(res.allQp)} ÷ {res.allUnits} = {fmt2(res.cgpa)}
              </div>
            )}
          </div>
          <p className="eng-note">
            Your official CGPA is the one on the NOUN student portal. If your result is close to a class
            boundary, check the figure there.
          </p>
        </div>
      )}
    </section>
  );
}
