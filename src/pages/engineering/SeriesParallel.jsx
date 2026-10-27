import { useState } from "react";
import { Link } from "react-router-dom";
import EngLayout, { FaqList } from "./EngLayout";
import { Segment, Stat } from "./EngInputs";
import { readList } from "./engTools";
import CircuitSolver from "./CircuitSolver";
import { combine, formatSI } from "../../utils/electronics";

const PATH = "/engineering-tools/series-parallel-calculator";

const KINDS = {
  resistor: { label: "Resistors", unit: "Ω", example: "100, 220, 4k7" },
  capacitor: { label: "Capacitors", unit: "F", example: "10u, 100n, 4.7uF" },
  inductor: { label: "Inductors", unit: "H", example: "10mH, 100u" }
};

const faq = [
  {
    q: "How do you add resistors in series and in parallel?",
    a: "In series, add them: R = R1 + R2 + R3. In parallel, add their reciprocals: 1/R = 1/R1 + 1/R2 + 1/R3. Two equal resistors in parallel give half the value of one."
  },
  {
    q: "Why are capacitors the opposite of resistors?",
    a: "Capacitors in parallel add their plate area, so their capacitances add: C = C1 + C2. In series the total is smaller than the smallest capacitor: 1/C = 1/C1 + 1/C2. This is the reverse of the resistor rules."
  },
  {
    q: "Is the parallel resistance always smaller than the smallest resistor?",
    a: "Yes. Adding another path for current always lowers the total resistance, so a parallel combination is always less than its smallest resistor."
  }
];

const SeriesParallel = () => {
  const [kind, setKind] = useState("resistor");
  const [text, setText] = useState("100, 220, 470");

  const k = KINDS[kind];
  const items = readList(text);
  const bad = items.filter((i) => !(Number.isFinite(i.value) && i.value > 0));
  const values = items.filter((i) => Number.isFinite(i.value) && i.value > 0).map((i) => i.value);
  const result = values.length >= 1 && bad.length === 0 ? combine(values, kind) : null;

  return (
    <EngLayout
      path={PATH}
      title="Series and Parallel Circuit Calculator with Working | StudentToolsNG"
      description="Free series and parallel circuit calculator: paste a question to get total resistance, current and the voltage across each resistor with full step-by-step working, or combine resistors, capacitors and inductors."
      keywords="series and parallel calculator, series parallel circuit solver, resistors in series and parallel questions, current in parallel circuit, internal resistance calculator, parallel resistor calculator"
      faq={faq}
    >
      <h1>Series and Parallel Circuit Calculator</h1>
      <p className="eng-intro">
        Paste a series or parallel circuit question to get the full working, or
        combine any number of resistors, capacitors or inductors.
      </p>

      <CircuitSolver />

      <section className="eng-panel" aria-label="Series and parallel calculator">
        <h2>Quick total for any components</h2>
        <div style={{ marginBottom: 14 }}>
          <Segment
            label="Component type"
            value={kind}
            onChange={setKind}
            options={Object.entries(KINDS).map(([value, v]) => ({ value, label: v.label }))}
          />
        </div>
        <label className="eng-field">
          Values (e.g. {k.example})
          <textarea value={text} onChange={(e) => setText(e.target.value)} spellCheck="false" />
        </label>

        {items.length > 0 && (
          <div className="eng-chips" aria-label="Values read">
            {items.map((i, n) => (
              <span key={n} className="eng-chip" style={Number.isFinite(i.value) && i.value > 0 ? undefined : { color: "#fca5a5" }}>
                {Number.isFinite(i.value) && i.value > 0 ? formatSI(i.value, k.unit) : `"${i.text}" ?`}
              </span>
            ))}
          </div>
        )}

        {bad.length > 0 && (
          <div className="eng-error" role="alert">
            Can't read {bad.map((b) => `"${b.text}"`).join(", ")}. Use numbers with optional prefixes such as 4k7, 100n or 10u.
          </div>
        )}

        {result && (
          <div className="eng-result" aria-live="polite">
            <div className="eng-stats">
              <Stat value={formatSI(result.series, k.unit)} label={`in series (${values.length} ${k.label.toLowerCase()})`} />
              <Stat value={formatSI(result.parallel, k.unit)} label={`in parallel (${values.length} ${k.label.toLowerCase()})`} />
            </div>
            <p className="eng-note">
              {kind === "capacitor"
                ? "Series: 1/C = 1/C1 + 1/C2 + …   Parallel: C = C1 + C2 + …"
                : `Series: ${kind === "inductor" ? "L" : "R"} = sum of values.   Parallel: 1/${kind === "inductor" ? "L" : "R"} = sum of 1/each value.`}
            </p>
            {kind === "inductor" && (
              <p className="eng-note">Assumes the inductors are not magnetically coupled (no shared magnetic field).</p>
            )}
          </div>
        )}
      </section>

      <section className="eng-content">
        <h2>Resistors in series and parallel</h2>
        <p>
          In a series circuit the same current flows through every resistor, so
          their resistances simply add: R total = R1 + R2 + R3. In a parallel
          circuit every resistor has the same voltage across it and the current
          splits, so the reciprocals add: 1/R total = 1/R1 + 1/R2 + 1/R3.
        </p>
        <p>
          For exactly two resistors in parallel there is a shortcut, product
          over sum: R = (R1 × R2) ÷ (R1 + R2). For example 100 Ω and 220 Ω in
          parallel give 22,000 ÷ 320 = 68.75 Ω, and in series they give 320 Ω.
        </p>

        <h2>Worked example: resistors in series</h2>
        <p>
          A 24 V supply is connected to 4 Ω and 8 Ω resistors in series. Find the
          current and the voltage across each resistor.
        </p>
        <ul>
          <li>Total R = 4 + 8 = 12 Ω</li>
          <li>I = V ÷ R = 24 ÷ 12 = 2 A</li>
          <li>V across 4 Ω = 2 × 4 = 8 V</li>
          <li>V across 8 Ω = 2 × 8 = 16 V (check: 8 + 16 = 24 V)</li>
        </ul>
        <p>
          In series the current is the same everywhere and the supply voltage is
          shared, so the voltages across the resistors always add up to the
          supply voltage.
        </p>

        <h2>Worked example: resistors in parallel</h2>
        <p>
          A 12 V supply is connected to 6 Ω and 3 Ω resistors in parallel. Find
          the total current.
        </p>
        <ul>
          <li>1/R = 1/6 + 1/3 = 1/6 + 2/6 = 3/6, so R = 6 ÷ 3 = 2 Ω</li>
          <li>I = 12 ÷ 2 = 6 A</li>
          <li>Current through 6 Ω = 12 ÷ 6 = 2 A and through 3 Ω = 12 ÷ 3 = 4 A (check: 2 + 4 = 6 A)</li>
        </ul>
        <p>
          In parallel every resistor has the full supply voltage across it and
          the currents through the branches add up to the total current.
        </p>

        <h2>Cells with internal resistance</h2>
        <p>
          A real cell has some resistance of its own, called its internal
          resistance r. The current is I = E ÷ (R + r), where E is the emf. The
          voltage across the external resistors, the terminal p.d., is V = I × R,
          and the difference E − V = I × r is called the lost volts. For a 12 V
          cell with r = 1 Ω driving 11 Ω, I = 12 ÷ 12 = 1 A, the terminal p.d. is
          11 V and 1 V is lost inside the cell.
        </p>

        <h2>Capacitors in series and parallel</h2>
        <p>
          Capacitors follow the opposite rules. In parallel their capacitances
          add: C total = C1 + C2. In series the reciprocals add: 1/C total =
          1/C1 + 1/C2, so two 10 µF capacitors in series give 5 µF. Series
          capacitors share the voltage, which is why they are sometimes used
          to reach a higher voltage rating.
        </p>

        <h2>Inductors in series and parallel</h2>
        <p>
          Inductors that are far enough apart not to affect each other combine
          like resistors: they add in series and their reciprocals add in
          parallel. Coupled inductors, such as two windings on one core, need
          the mutual inductance as well, which this calculator does not include.
        </p>

        <h2>Frequently Asked Questions</h2>
        <FaqList faq={faq} />

        <p>
          Need a single value? Read it with the{" "}
          <Link to="/engineering-tools/resistor-color-code">Resistor Colour Code Calculator</Link> or the{" "}
          <Link to="/engineering-tools/capacitor-code">Capacitor Code Calculator</Link>.
        </p>
      </section>
    </EngLayout>
  );
};

export default SeriesParallel;
