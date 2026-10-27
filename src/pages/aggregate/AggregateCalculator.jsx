import { useState } from "react";
import { Stat } from "../engineering/EngInputs";
import {
  OLEVEL_GRADES,
  UNIVERSITIES,
  computeAggregate,
  requiredFor,
  universityBySlug,
  defaultGrades,
  isCredit
} from "../../utils/aggregate";

const SUBJECT_NAMES = ["English Language", "Mathematics", "Subject 3", "Subject 4", "Subject 5", "Subject 6"];
const round2 = (x) => Math.round(x * 100) / 100;

const CUSTOM = {
  slug: "custom",
  short: "Custom",
  weights: { utme: 50, post: 50, olevel: 0 },
  postMax: 100,
  example: { utme: "", post: "", grades: [] }
};

function stateFor(u) {
  return {
    weights: { ...u.weights },
    postMax: String(u.postMax),
    grades: u.slug === "custom" ? Array(5).fill("B3") : defaultGrades(u)
  };
}

// Number from a text box, or NaN when empty/invalid.
const num = (s) => (String(s).trim() === "" ? NaN : Number(s));

// Aggregate calculator. With `slug` it's fixed to one university (the
// formula can still be changed); without, the student picks a school.
export default function AggregateCalculator({ slug }) {
  const fixed = slug ? universityBySlug(slug) : null;
  const [school, setSchool] = useState(fixed ? fixed.slug : "unilag");
  const u = fixed || universityBySlug(school) || CUSTOM;

  const [form, setForm] = useState(() => stateFor(u));
  const [utme, setUtme] = useState("");
  const [post, setPost] = useState("");
  const [target, setTarget] = useState("");
  const [showFormula, setShowFormula] = useState(!fixed && school === "custom");
  const [copied, setCopied] = useState(false);

  const pickSchool = (s) => {
    setSchool(s);
    setForm(stateFor(universityBySlug(s) || CUSTOM));
    setShowFormula(s === "custom");
    setCopied(false);
  };
  const setWeight = (k, v) => setForm((f) => ({ ...f, weights: { ...f.weights, [k]: Number(v) || 0 } }));
  const setGrade = (i, g) => setForm((f) => ({ ...f, grades: f.grades.map((x, j) => (j === i ? g : x)) }));
  const setSubjects = (n) =>
    setForm((f) => ({
      ...f,
      grades: n > f.grades.length ? [...f.grades, ...Array(n - f.grades.length).fill("B3")] : f.grades.slice(0, n)
    }));

  const w = form.weights;
  const weightSum = w.utme + w.post + w.olevel;
  const postMax = num(form.postMax);
  const U = num(utme);
  const P = num(post);

  const errors = [];
  if (Number.isFinite(U) && (U < 0 || U > 400)) errors.push("A UTME score must be between 0 and 400.");
  if (w.post > 0 && !(postMax > 0)) errors.push("Enter what the post-UTME was marked out of.");
  if (w.post > 0 && Number.isFinite(P) && postMax > 0 && (P < 0 || P > postMax))
    errors.push(`The post-UTME score must be between 0 and ${postMax}.`);
  if (weightSum !== 100) errors.push(`The weights add up to ${weightSum}, not 100.`);
  if (w.olevel > 0 && !form.grades.length) errors.push("Add at least one O'level subject.");

  const input = { utme: U, post: P, postMax, grades: w.olevel > 0 ? form.grades : [] };
  const result = errors.length ? null : computeAggregate(w, input);
  const ready = result && result.total !== null;
  const T = num(target);
  const need = !errors.length && T > 0 && T <= 100 ? requiredFor(w, input, T) : null;
  const failed = w.olevel > 0 ? form.grades.filter((g) => !isCredit(g)).length : 0;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${u.short} aggregate score\n` + result.steps.join("\n"));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="eng-panel" aria-label="Aggregate score calculator">
      <h2>{fixed ? `Calculate your ${u.short} aggregate` : "Calculate your aggregate score"}</h2>

      {!fixed && (
        <label className="eng-field" style={{ marginBottom: 14 }}>
          University
          <select value={school} onChange={(e) => pickSchool(e.target.value)}>
            {UNIVERSITIES.map((x) => (
              <option key={x.slug} value={x.slug}>
                {x.short}: {x.name}
              </option>
            ))}
            <option value="custom">Other school (enter the formula)</option>
          </select>
        </label>
      )}

      <div className="eng-grid">
        {w.utme > 0 && (
          <label className="eng-field">
            UTME (JAMB) score
            <input type="number" inputMode="numeric" min="0" max="400" value={utme} placeholder="e.g. 250" onChange={(e) => setUtme(e.target.value)} />
            <span className="eng-hint">out of 400</span>
          </label>
        )}
        {w.post > 0 && (
          <label className="eng-field">
            Post-UTME score
            <input type="number" inputMode="decimal" min="0" value={post} placeholder={`e.g. ${Math.round((postMax || 100) * 0.6)}`} onChange={(e) => setPost(e.target.value)} />
            <span className="eng-hint">out of {Number.isFinite(postMax) ? postMax : "?"}</span>
          </label>
        )}
        {w.post > 0 && (
          <label className="eng-field">
            Post-UTME marked out of
            <input type="number" inputMode="numeric" min="1" value={form.postMax} onChange={(e) => setForm((f) => ({ ...f, postMax: e.target.value }))} />
            <span className="eng-hint">as on your result slip</span>
          </label>
        )}
      </div>

      {w.olevel > 0 && (
        <>
          <h3 className="eng-working-title">O'level grades (best sitting)</h3>
          <div className="eng-grid">
            {form.grades.map((g, i) => (
              <label key={i} className="eng-field">
                {SUBJECT_NAMES[i]}
                <select value={g} onChange={(e) => setGrade(i, e.target.value)}>
                  {OLEVEL_GRADES.map((o) => (
                    <option key={o.grade} value={o.grade}>{o.grade}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <div className="eng-row" style={{ marginTop: 8 }}>
            <span className="eng-muted">Subjects counted:</span>
            {[4, 5, 6].map((n) => (
              <button key={n} type="button" className="eng-btn-ghost" aria-pressed={form.grades.length === n} onClick={() => setSubjects(n)}>
                {n}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="eng-row" style={{ marginTop: 14 }}>
        <button type="button" className="eng-btn-ghost" aria-expanded={showFormula} onClick={() => setShowFormula((s) => !s)}>
          {showFormula ? "Hide the formula" : "Change the formula"}
        </button>
        <span className="eng-muted">
          UTME {w.utme}% · post-UTME {w.post}% · O'level {w.olevel}%
        </span>
      </div>

      {showFormula && (
        <div className="eng-grid" style={{ marginTop: 12 }}>
          {[
            ["utme", "UTME weight (%)"],
            ["post", "Post-UTME weight (%)"],
            ["olevel", "O'level weight (%)"]
          ].map(([k, label]) => (
            <label key={k} className="eng-field">
              {label}
              <input type="number" inputMode="numeric" min="0" max="100" value={w[k]} onChange={(e) => setWeight(k, e.target.value)} />
            </label>
          ))}
        </div>
      )}

      {errors.map((e) => (
        <div key={e} className="eng-error" role="alert">{e}</div>
      ))}
      {failed > 0 && (
        <div className="eng-warn">
          {failed === 1 ? "One grade is" : `${failed} grades are`} below a credit (C6). Most courses need
          credits in all five required subjects, so check that you qualify.
        </div>
      )}

      {ready && (
        <div className="eng-result" aria-live="polite">
          <div className="eng-stats" style={{ marginTop: 0 }}>
            <Stat value={`${round2(result.total)} / 100`} label="aggregate score" />
            {u.scale400 && <Stat value={`${round2(result.total * 4)} / 400`} label="on the 400 scale" />}
            {result.parts.map((p) => (
              <Stat key={p.key} value={`${round2(p.value)} / ${p.max}`} label={p.label} />
            ))}
          </div>
          <h3 className="eng-working-title">Working</h3>
          <div className="eng-working">
            {result.steps.map((s, i) => (
              <div key={i}>{s}</div>
            ))}
          </div>
          <div className="eng-row">
            <button type="button" className="eng-btn-ghost" onClick={copy}>
              {copied ? "Copied ✓" : "Copy working"}
            </button>
          </div>
        </div>
      )}
      {!errors.length && result && !ready && (
        <p className="eng-note">Enter your {result.missing.includes("utme") ? "UTME" : "post-UTME"} score to see your aggregate.</p>
      )}

      <h3 className="eng-working-title">Score needed for a cut-off</h3>
      <div className="eng-grid">
        <label className="eng-field">
          Target aggregate (out of 100)
          <input type="number" inputMode="decimal" min="1" max="100" value={target} placeholder="e.g. 65" onChange={(e) => setTarget(e.target.value)} />
          <span className="eng-hint">e.g. last year's cut-off for your course</span>
        </label>
      </div>
      {need && <NeededLine need={need} target={T} />}
    </section>
  );
}

function NeededLine({ need, target }) {
  const n = Math.ceil(need.needed * 100) / 100;
  if (need.needed <= 0)
    return <p className="eng-note">You already reach {target} without the {need.label} score.</p>;
  if (need.needed > need.max)
    return (
      <div className="eng-warn">
        {target} is out of reach: you would need {n} in the {need.label}, but the maximum is {need.max}.
      </div>
    );
  return (
    <p className="eng-note">
      To reach {target} you need at least <strong>{n}</strong> out of {need.max} in the {need.label}.
    </p>
  );
}
