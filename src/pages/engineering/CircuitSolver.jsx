import { useState } from "react";
import { ValueInput, Segment, Stat } from "./EngInputs";
import { readValue, readList } from "./engTools";
import { parseCircuitQuestion, solveCircuit, formatSI } from "../../utils/electronics";

const EXAMPLES = [
  {
    label: "Series example",
    text: "A 24 V supply is connected to 4 Ω and 8 Ω resistors in series. Find the current and the voltage across each resistor."
  },
  {
    label: "Parallel example",
    text: "A 12 V supply is connected to 6 Ω and 3 Ω resistors in parallel. Find the total current."
  },
  {
    label: "Internal resistance",
    text: "A cell of emf 12 V and internal resistance 1 Ω is connected to 5 Ω and 6 Ω resistors in series. Find the current and the terminal p.d."
  }
];

// Fields filled in from a parsed question.
function fieldsFrom(p) {
  return {
    connection: p.connection || "series",
    resistors: p.resistors.join(", "),
    voltage: p.voltage !== null ? String(p.voltage) : "",
    current: p.current !== null ? String(p.current) : "",
    internal: p.internal ? String(p.internal) : "",
    warnings: p.warnings
  };
}

// Type or paste a textbook question ("A 24 V supply is connected to 4 Ω and
// 8 Ω resistors in series…") and get the full working.
export default function CircuitSolver() {
  const [question, setQuestion] = useState(EXAMPLES[0].text);
  const [fields, setFields] = useState(() => fieldsFrom(parseCircuitQuestion(EXAMPLES[0].text)));
  const [copied, setCopied] = useState(false);

  const readQuestion = (text) => {
    setQuestion(text);
    setCopied(false);
    if (text.trim()) setFields(fieldsFrom(parseCircuitQuestion(text)));
  };
  const set = (key, v) => {
    setCopied(false);
    setFields((f) => ({ ...f, [key]: v }));
  };

  const items = readList(fields.resistors);
  const bad = items.filter((i) => !(Number.isFinite(i.value) && i.value > 0));
  const resistors = items.filter((i) => Number.isFinite(i.value) && i.value > 0).map((i) => i.value);
  const V = readValue(fields.voltage);
  const I = readValue(fields.current);
  const r = readValue(fields.internal, { allowZero: true }) || 0;

  let solved = null;
  let error = "";
  if (bad.length) {
    error = `Can't read ${bad.map((b) => `"${b.text}"`).join(", ")} as a resistance.`;
  } else if (resistors.length) {
    try {
      solved = solveCircuit({ connection: fields.connection, resistors, voltage: V, current: V ? null : I, internal: r });
    } catch (e) {
      error = e.message;
    }
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(solved.steps.join("\n"));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="eng-panel" aria-label="Solve a circuit question">
      <h2>Solve a series or parallel circuit question</h2>
      <p className="eng-muted" style={{ marginTop: 0 }}>
        Type or paste a question. The supply, resistors and connection are read from it
        automatically; check them in the boxes below and the full working appears underneath.
      </p>

      <label className="eng-field">
        Question
        <textarea
          value={question}
          onChange={(e) => readQuestion(e.target.value)}
          placeholder="e.g. A 12 V supply is connected to 6 Ω and 3 Ω resistors in parallel. Find the total current."
        />
      </label>
      <div className="eng-row" style={{ marginTop: 8 }}>
        <span className="eng-muted">Try:</span>
        {EXAMPLES.map((ex) => (
          <button key={ex.label} type="button" className="eng-btn-ghost" onClick={() => readQuestion(ex.text)}>
            {ex.label}
          </button>
        ))}
      </div>

      {fields.warnings.map((w) => (
        <div key={w} className="eng-warn">{w}</div>
      ))}

      <div style={{ margin: "18px 0 12px" }}>
        <Segment
          label="Connection"
          value={fields.connection}
          onChange={(v) => set("connection", v)}
          options={[{ value: "series", label: "Series" }, { value: "parallel", label: "Parallel" }]}
        />
      </div>

      <div className="eng-grid">
        <label className="eng-field">
          Resistors (Ω, comma separated)
          <input
            type="text"
            value={fields.resistors}
            spellCheck="false"
            placeholder="4, 8"
            onChange={(e) => set("resistors", e.target.value)}
          />
          <span className="eng-hint" />
        </label>
        <ValueInput label="Supply voltage / emf (V)" value={fields.voltage} onChange={(v) => set("voltage", v)} unit="V" placeholder="24" />
        <ValueInput label="Or current given (A)" value={fields.current} onChange={(v) => set("current", v)} unit="A" placeholder="optional" />
        <ValueInput
          label="Internal resistance r (Ω)"
          value={fields.internal}
          onChange={(v) => set("internal", v)}
          unit="Ω"
          placeholder="optional"
          allowZero
        />
      </div>

      {V && I && <p className="eng-note">Both a voltage and a current were entered; the voltage is used.</p>}
      {error && <div className="eng-error" role="alert">{error}</div>}

      {solved && (
        <div className="eng-result" aria-live="polite">
          <div className="eng-stats" style={{ marginTop: 0 }}>
            <Stat value={formatSI(solved.R, "Ω")} label="total resistance" />
            {solved.I !== null && <Stat value={formatSI(solved.I, "A")} label="current from supply" />}
            {solved.V !== null && <Stat value={formatSI(solved.V, "V")} label={r > 0 ? "terminal p.d." : "voltage across resistors"} />}
            {solved.power !== null && <Stat value={formatSI(solved.power, "W")} label="power in resistors" />}
          </div>

          <h3 className="eng-working-title">Working</h3>
          <div className="eng-working">
            {solved.steps.map((s, i) => (
              // Non-breaking space keeps a number and its unit on one line.
              <div key={i}>{s.replace(/ (Ω|A|V|W)(?=[\s,).]|$)/g, " $1")}</div>
            ))}
          </div>
          {solved.I === null && (
            <p className="eng-note">Add the supply voltage or the current to find the current and voltage for each resistor.</p>
          )}
          <div className="eng-row">
            <button type="button" className="eng-btn-ghost" onClick={copy}>
              {copied ? "Copied ✓" : "Copy working"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
