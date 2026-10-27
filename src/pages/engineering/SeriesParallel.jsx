import { useState } from "react";
import { Link } from "react-router-dom";
import EngLayout, { FaqList } from "./EngLayout";
import { Segment, Stat } from "./EngInputs";
import { combine, formatSI, parseValue } from "../../utils/electronics";

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

// Split "100, 220 4k7\n1M" into tokens and read each one.
function readList(text) {
  const tokens = text.split(/[\n,;]+|\s{2,}|\s(?=\d)/).map((t) => t.trim()).filter(Boolean);
  return tokens.map((t) => ({ text: t, value: parseValue(t) }));
}

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
      title="Series and Parallel Calculator (Resistors, Capacitors, Inductors) | StudentToolsNG"
      description="Free series and parallel calculator: enter any number of resistors, capacitors or inductors and get the total in series and in parallel, with formulas and examples."
      keywords="series and parallel calculator, parallel resistor calculator, resistors in series, capacitors in series and parallel, inductors in parallel"
      faq={faq}
    >
      <h1>Series and Parallel Calculator</h1>
      <p className="eng-intro">
        Enter the values of your components, separated by commas or new lines,
        to get the total for a series and a parallel connection.
      </p>

      <section className="eng-panel" aria-label="Series and parallel calculator">
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
