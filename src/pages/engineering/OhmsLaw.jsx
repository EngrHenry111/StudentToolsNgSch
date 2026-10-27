import { useState } from "react";
import { Link } from "react-router-dom";
import EngLayout, { FaqList } from "./EngLayout";
import { ValueInput, Stat } from "./EngInputs";
import { readValue } from "./engTools";
import { ohmsLaw, formatSI, standardValue } from "../../utils/electronics";

const PATH = "/engineering-tools/ohms-law-calculator";

const FIELDS = [
  { key: "V", label: "Voltage (V)", unit: "V", placeholder: "e.g. 12, 3.3, 230" },
  { key: "I", label: "Current (I)", unit: "A", placeholder: "e.g. 2, 20mA, 500m" },
  { key: "R", label: "Resistance (R)", unit: "Ω", placeholder: "e.g. 220, 4k7, 1M" },
  { key: "P", label: "Power (P)", unit: "W", placeholder: "e.g. 60, 250mW" }
];

const FORMULAS = {
  VI: "R = V ÷ I,  P = V × I",
  VR: "I = V ÷ R,  P = V² ÷ R",
  VP: "I = P ÷ V,  R = V² ÷ P",
  IR: "V = I × R,  P = I² × R",
  IP: "V = P ÷ I,  R = P ÷ I²",
  RP: "V = √(P × R),  I = √(P ÷ R)"
};

const faq = [
  {
    q: "What is Ohm's law?",
    a: "Ohm's law says the current through a conductor is proportional to the voltage across it, as long as the temperature stays the same: V = I × R, where V is in volts, I in amperes and R in ohms."
  },
  {
    q: "How do I calculate power from voltage and current?",
    a: "Multiply them: P = V × I. If you know the resistance instead, use P = I² × R or P = V² ÷ R. A 12 V lamp drawing 2 A uses 24 W."
  },
  {
    q: "Can I type values like 20mA or 4k7?",
    a: "Yes. Use m for milli, k for kilo and M for mega. 20mA is 0.02 A, 4k7 is 4,700 Ω and 250mW is 0.25 W. The value the calculator read is shown under each box."
  }
];

const OhmsLaw = () => {
  const [values, setValues] = useState({ V: "12", I: "", R: "220", P: "" });

  const set = (key, v) => setValues((s) => ({ ...s, [key]: v }));
  const parsed = Object.fromEntries(FIELDS.map((f) => [f.key, readValue(values[f.key])]));
  const filled = FIELDS.filter((f) => parsed[f.key] !== null).map((f) => f.key);

  let result = null;
  let error = "";
  if (filled.length === 2) {
    try {
      result = ohmsLaw(parsed);
    } catch (e) {
      error = e.message;
    }
  } else if (filled.length > 2) {
    error = "Fill in only two boxes. Clear the others to calculate.";
  }

  return (
    <EngLayout
      path={PATH}
      title="Ohm's Law Calculator (Voltage, Current, Resistance, Power) | StudentToolsNG"
      description="Free Ohm's law calculator: enter any two of voltage, current, resistance and power to find the other two, with the formulas and worked examples."
      keywords="ohm's law calculator, voltage current resistance calculator, power calculator, V=IR, electrical power formula"
      faq={faq}
    >
      <h1>Ohm's Law Calculator</h1>
      <p className="eng-intro">
        Fill in any two of voltage, current, resistance and power. The other
        two are calculated instantly.
      </p>

      <section className="eng-panel" aria-label="Ohm's law calculator">
        <div className="eng-grid">
          {FIELDS.map((f) => (
            <ValueInput
              key={f.key}
              label={f.label}
              value={values[f.key]}
              onChange={(v) => set(f.key, v)}
              unit={f.unit}
              placeholder={f.placeholder}
            />
          ))}
        </div>
        <div className="eng-row">
          <button type="button" className="eng-btn-ghost" onClick={() => setValues({ V: "", I: "", R: "", P: "" })}>
            Clear all
          </button>
          <span className="eng-muted">{filled.length}/2 values entered</span>
        </div>

        {error && <div className="eng-error" role="alert">{error}</div>}

        {result && (
          <div className="eng-result" aria-live="polite">
            <div className="eng-stats">
              <Stat value={formatSI(result.V, "V")} label="voltage" />
              <Stat value={formatSI(result.I, "A")} label="current" />
              <Stat value={formatSI(result.R, "Ω")} label="resistance" />
              <Stat value={formatSI(result.P, "W")} label="power" />
            </div>
            <p className="eng-note">Formulas used: {FORMULAS[filled.join("")]}</p>
            {!filled.includes("R") && result.R > 0 && (
              <p className="eng-note">
                Nearest standard resistor: {formatSI(standardValue(result.R, "E24"), "Ω")} (E24).
              </p>
            )}
          </div>
        )}
      </section>

      <section className="eng-content">
        <h2>Ohm's law formulas</h2>
        <p>
          Ohm's law links voltage (V), current (I) and resistance (R): V = I × R.
          Electrical power (P) is the rate energy is used: P = V × I. Putting
          the two together gives every formula you need from any two known
          values.
        </p>
        <ul>
          <li>Voltage: V = I × R, V = P ÷ I, or V = √(P × R)</li>
          <li>Current: I = V ÷ R, I = P ÷ V, or I = √(P ÷ R)</li>
          <li>Resistance: R = V ÷ I, R = V² ÷ P, or R = P ÷ I²</li>
          <li>Power: P = V × I, P = I² × R, or P = V² ÷ R</li>
        </ul>

        <h2>Worked examples</h2>
        <h3>Current through a resistor</h3>
        <p>
          A 220 Ω resistor is connected across a 12 V supply. The current is
          I = V ÷ R = 12 ÷ 220 = 0.0545 A, or about 54.5 mA. The power is
          P = V² ÷ R = 144 ÷ 220 = 0.655 W, so a 1 W resistor is needed; a
          common 0.25 W resistor would overheat.
        </p>
        <h3>Resistance of a heating element</h3>
        <p>
          A 1,000 W electric kettle runs on 230 V mains. Its current is
          I = P ÷ V = 1000 ÷ 230 = 4.35 A, and its element resistance is
          R = V² ÷ P = 52,900 ÷ 1000 = 52.9 Ω.
        </p>

        <h2>Units and prefixes</h2>
        <p>
          Voltage is measured in volts, current in amperes (amps), resistance in
          ohms and power in watts. In electronics small currents are given in
          milliamps (1 mA = 0.001 A) and large resistances in kilohms (1 kΩ =
          1,000 Ω) or megohms (1 MΩ = 1,000,000 Ω). You can type these prefixes
          directly into the calculator.
        </p>

        <h2>Frequently Asked Questions</h2>
        <FaqList faq={faq} />

        <p>
          Related tools: <Link to="/engineering-tools/voltage-divider-calculator">Voltage Divider Calculator</Link>,{" "}
          <Link to="/engineering-tools/led-resistor-calculator">LED Resistor Calculator</Link> and{" "}
          <Link to="/engineering-tools/resistor-color-code">Resistor Colour Code Calculator</Link>.
        </p>
      </section>
    </EngLayout>
  );
};

export default OhmsLaw;
