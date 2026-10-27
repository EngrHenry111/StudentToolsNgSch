import { useState } from "react";
import { Link } from "react-router-dom";
import EngLayout, { FaqList } from "./EngLayout";
import { ValueInput, Segment, Stat } from "./EngInputs";
import { readValue } from "./engTools";
import { voltageDivider, dividerR2, standardValue, formatSI } from "../../utils/electronics";

const PATH = "/engineering-tools/voltage-divider-calculator";

const faq = [
  {
    q: "What is the voltage divider formula?",
    a: "Vout = Vin × R2 ÷ (R1 + R2), where R1 is the resistor between the input and the output and R2 is the resistor between the output and ground."
  },
  {
    q: "Why is my measured output voltage lower than calculated?",
    a: "Anything connected to the output draws current and acts like a resistor in parallel with R2, pulling the voltage down. Keep the load resistance at least ten times larger than R2, or use a voltage regulator for supplying power."
  },
  {
    q: "Can I use a voltage divider as a power supply?",
    a: "Not for anything that draws real current. A divider wastes power in its resistors and its output changes with the load. It is best for setting reference voltages, biasing transistors and scaling signals for a microcontroller's analogue input."
  }
];

const VoltageDivider = () => {
  const [mode, setMode] = useState("vout");
  const [vin, setVin] = useState("12");
  const [r1, setR1] = useState("10k");
  const [r2, setR2] = useState("4k7");
  const [vout, setVout] = useState("5");
  const [series, setSeries] = useState("E24");

  const Vin = readValue(vin);
  const R1 = readValue(r1);
  const R2 = readValue(r2);
  const Vout = readValue(vout);

  let result = null;
  let design = null;
  let error = "";
  if (mode === "vout" && Vin && R1 && R2) {
    result = voltageDivider(Vin, R1, R2);
  }
  if (mode === "r2" && Vin && R1 && Vout) {
    if (Vout >= Vin) error = "The output voltage must be lower than the input voltage.";
    else {
      const exact = dividerR2(Vin, Vout, R1);
      const chosen = standardValue(exact, series);
      const actual = voltageDivider(Vin, R1, chosen);
      design = { exact, chosen, actual };
    }
  }

  return (
    <EngLayout
      path={PATH}
      title="Voltage Divider Calculator (Vout, R1, R2) | StudentToolsNG"
      description="Free voltage divider calculator: find the output voltage from Vin, R1 and R2, or the R2 needed for a target voltage with the nearest standard resistor."
      keywords="voltage divider calculator, potential divider, voltage divider formula, resistor divider, vout calculator"
      faq={faq}
    >
      <h1>Voltage Divider Calculator</h1>
      <p className="eng-intro">
        Work out the output of a two-resistor voltage divider, or choose the
        resistor that gives the voltage you need.
      </p>

      <section className="eng-panel" aria-label="Voltage divider calculator">
        <div style={{ marginBottom: 14 }}>
          <Segment
            label="Mode"
            value={mode}
            onChange={setMode}
            options={[{ value: "vout", label: "Find Vout" }, { value: "r2", label: "Find R2" }]}
          />
        </div>

        <p className="eng-muted" style={{ marginTop: 0 }}>
          Circuit: Vin → R1 → Vout → R2 → ground (0 V).
        </p>

        <div className="eng-grid">
          <ValueInput label="Input voltage Vin" value={vin} onChange={setVin} unit="V" placeholder="12" />
          <ValueInput label="R1 (top resistor)" value={r1} onChange={setR1} unit="Ω" placeholder="10k" />
          {mode === "vout" ? (
            <ValueInput label="R2 (bottom resistor)" value={r2} onChange={setR2} unit="Ω" placeholder="4k7" />
          ) : (
            <>
              <ValueInput label="Target output Vout" value={vout} onChange={setVout} unit="V" placeholder="5" />
              <label className="eng-field">
                Standard values
                <select value={series} onChange={(e) => setSeries(e.target.value)}>
                  <option value="E12">E12 (±10%)</option>
                  <option value="E24">E24 (±5%)</option>
                  <option value="E96">E96 (±1%)</option>
                </select>
              </label>
            </>
          )}
        </div>

        {error && <div className="eng-error" role="alert">{error}</div>}

        {result && (
          <div className="eng-result" aria-live="polite">
            <span className="eng-big">Vout = {formatSI(result.vout, "V")}</span>
            <div className="eng-stats">
              <Stat value={formatSI(result.current, "A")} label="current through divider" />
              <Stat value={formatSI(result.p1, "W")} label="power in R1" />
              <Stat value={formatSI(result.p2, "W")} label="power in R2" />
              <Stat value={`${((result.vout / Vin) * 100).toFixed(2)}%`} label="ratio Vout ÷ Vin" />
            </div>
          </div>
        )}

        {design && (
          <div className="eng-result" aria-live="polite">
            <span className="eng-big">R2 = {formatSI(design.chosen, "Ω")}</span>
            <div className="eng-stats">
              <Stat value={formatSI(design.exact, "Ω")} label="exact R2" />
              <Stat value={formatSI(design.actual.vout, "V")} label={`Vout with ${series} value`} />
              <Stat
                value={`${(((design.actual.vout - Vout) / Vout) * 100).toFixed(2)}%`}
                label="error from target"
              />
              <Stat value={formatSI(design.actual.current, "A")} label="divider current" />
            </div>
          </div>
        )}
      </section>

      <section className="eng-content">
        <h2>The voltage divider formula</h2>
        <p>
          A voltage divider (also called a potential divider) is two resistors
          in series across a supply. The output is taken from the point between
          them. Because the same current flows through both resistors, the
          supply voltage is shared in proportion to their resistances:
          Vout = Vin × R2 ÷ (R1 + R2).
        </p>

        <h2>Worked example</h2>
        <p>
          With Vin = 12 V, R1 = 10 kΩ and R2 = 4.7 kΩ, the output is
          12 × 4,700 ÷ 14,700 = 3.84 V. The current through both resistors is
          12 ÷ 14,700 = 0.816 mA, so each resistor dissipates well under a
          milliwatt.
        </p>
        <p>
          To get 5 V from 12 V with R1 = 10 kΩ, rearrange the formula:
          R2 = Vout × R1 ÷ (Vin − Vout) = 5 × 10,000 ÷ 7 = 7.14 kΩ. The nearest
          E24 resistor is 7.5 kΩ, which gives 5.14 V.
        </p>

        <h2>Where voltage dividers are used</h2>
        <ul>
          <li>Scaling a battery or sensor voltage down for a microcontroller's analogue input.</li>
          <li>Setting the bias voltage of a transistor amplifier.</li>
          <li>Reading light-dependent resistors and thermistors, which form one half of the divider.</li>
          <li>Setting the output voltage of adjustable regulators such as the LM317.</li>
        </ul>
        <p>
          A potentiometer is a voltage divider in a single part: its wiper splits
          the track into R1 and R2.
        </p>

        <h2>Frequently Asked Questions</h2>
        <FaqList faq={faq} />

        <p>
          Related tools: <Link to="/engineering-tools/ohms-law-calculator">Ohm's Law Calculator</Link> and{" "}
          <Link to="/engineering-tools/series-parallel-calculator">Series and Parallel Calculator</Link>.
        </p>
      </section>
    </EngLayout>
  );
};

export default VoltageDivider;
