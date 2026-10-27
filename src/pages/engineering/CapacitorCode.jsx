import { useState } from "react";
import { Link } from "react-router-dom";
import EngLayout, { FaqList } from "./EngLayout";
import { ValueInput, Stat } from "./EngInputs";
import { readValue } from "./engTools";
import {
  decodeCapacitor,
  encodeCapacitor,
  formatSI,
  CAP_TOLERANCE,
  CAP_VOLTAGE
} from "../../utils/electronics";

const PATH = "/engineering-tools/capacitor-code";

const faq = [
  {
    q: "What is the value of a 104 capacitor?",
    a: "104 means 10 followed by four zeros, in picofarads: 100,000 pF. That is the same as 100 nF or 0.1 µF, one of the most common decoupling capacitor values."
  },
  {
    q: "What does the letter after a capacitor code mean?",
    a: "A letter after the three digits is the tolerance. J is ±5%, K is ±10% and M is ±20%, so 104K is 100 nF ±10%. Z means +80% / −20%, common on cheap ceramic capacitors."
  },
  {
    q: "What does 2A or 1H mean on a capacitor?",
    a: "Codes made of a digit and a letter, such as 1H or 2A, are EIA voltage codes. 1H is 50 V and 2A is 100 V. Choose the voltage code in the calculator to see its rating."
  },
  {
    q: "How do I convert between pF, nF and µF?",
    a: "1 nF = 1,000 pF and 1 µF = 1,000 nF = 1,000,000 pF. So 4,700 pF is 4.7 nF, and 0.1 µF is 100 nF. The calculator shows every value in all three units."
  }
];

const COMMON_CODES = ["100", "101", "102", "103", "104", "105", "220", "221", "222", "223", "224", "470", "471", "472", "473", "474"];

// pF → "100,000 pF · 100 nF · 0.1 µF"
const allUnits = (pF) => ({
  pF: `${Number(pF.toPrecision(6)).toLocaleString("en-NG")} pF`,
  nF: `${Number((pF / 1e3).toPrecision(6)).toLocaleString("en-NG", { maximumFractionDigits: 6 })} nF`,
  uF: `${Number((pF / 1e6).toPrecision(6)).toLocaleString("en-NG", { maximumFractionDigits: 9 })} µF`
});

const CapacitorCode = () => {
  const [code, setCode] = useState("104K");
  const [voltage, setVoltage] = useState("");
  const [value, setValue] = useState("4.7nF");

  const decoded = decodeCapacitor(code);
  const units = decoded ? allUnits(decoded.pF) : null;

  let range = null;
  if (decoded?.tolerance) {
    const t = decoded.tolerance;
    const pF = decoded.pF;
    if (t.plus) range = [pF * (1 - t.minus / 100), pF * (1 + t.plus / 100)];
    else if (t.abs && (pF < 10 || !t.pct)) range = [pF - t.abs, pF + t.abs];
    else range = [pF * (1 - t.pct / 100), pF * (1 + t.pct / 100)];
  }

  const farads = readValue(value);
  const encoded = farads ? encodeCapacitor(Number((farads * 1e12).toPrecision(12))) : null;

  return (
    <EngLayout
      path={PATH}
      title="Capacitor Code Calculator (104, 4R7, 2n2 to pF, nF, µF) | StudentToolsNG"
      description="Free capacitor code calculator: convert ceramic and film capacitor codes like 104, 222J or 4R7 to pF, nF and µF, read tolerance and voltage letters, or find the code for a value."
      keywords="capacitor code calculator, 104 capacitor value, ceramic capacitor code, capacitor value chart, pf to nf to uf, capacitor voltage code"
      faq={faq}
    >
      <h1>Capacitor Code Calculator</h1>
      <p className="eng-intro">
        Enter the code printed on a ceramic, film or tantalum capacitor to get
        its value in pF, nF and µF, plus its tolerance and voltage rating.
      </p>

      <section className="eng-panel" aria-label="Decode a capacitor code">
        <div className="eng-grid">
          <label className="eng-field">
            Capacitor code
            <input
              type="text"
              maxLength={6}
              autoComplete="off"
              spellCheck="false"
              value={code}
              placeholder="e.g. 104, 104K, 4R7, 2n2"
              onChange={(e) => setCode(e.target.value)}
            />
          </label>
          <label className="eng-field">
            Voltage code (optional)
            <select value={voltage} onChange={(e) => setVoltage(e.target.value)}>
              <option value="">None / not marked</option>
              {Object.entries(CAP_VOLTAGE)
                .sort((a, b) => a[1] - b[1])
                .map(([k, v]) => (
                  <option key={k} value={k}>{k} = {v} V</option>
                ))}
            </select>
          </label>
        </div>

        {code.trim() && !decoded && (
          <div className="eng-error" role="alert">
            This code isn't recognised. Use three digits (104), add a tolerance letter (104K),
            use R as a decimal point for small values (4R7), or a unit letter (2n2, 4u7).
          </div>
        )}

        {decoded && (
          <div className="eng-result" aria-live="polite">
            <span className="eng-big">{formatSI(decoded.pF * 1e-12, "F")}</span>
            <div className="eng-stats">
              <Stat value={units.pF} label="picofarads" />
              <Stat value={units.nF} label="nanofarads" />
              <Stat value={units.uF} label="microfarads" />
              {decoded.tolerance && <Stat value={decoded.tolerance.text} label={`tolerance (${decoded.tolerance.letter})`} />}
              {voltage && <Stat value={`${CAP_VOLTAGE[voltage]} V`} label={`rated voltage (${voltage})`} />}
            </div>
            {range && (
              <p className="eng-note">
                Actual value between {formatSI(range[0] * 1e-12, "F")} and {formatSI(range[1] * 1e-12, "F")}.
              </p>
            )}
            {/^\d{2}9/.test(code) && <p className="eng-note">A 9 in the third place means ×0.1 (for values under 10 pF).</p>}
            {/^\d{2}8/.test(code) && <p className="eng-note">An 8 in the third place means ×0.01.</p>}
          </div>
        )}
      </section>

      <section className="eng-panel" aria-label="Value to capacitor code">
        <h2>Find the code for a value</h2>
        <div className="eng-grid">
          <ValueInput label="Capacitance (e.g. 100n, 4.7nF, 0.1uF, 22p)" value={value} onChange={setValue} unit="F" />
        </div>
        {farads !== null && (
          <div className="eng-result" aria-live="polite">
            {encoded ? (
              <>
                <span className="eng-big">{encoded}</span>
                <p className="eng-note">
                  {formatSI(farads, "F")} = {allUnits(farads * 1e12).pF}. Add a letter for the
                  tolerance, e.g. {encoded}J for ±5% or {encoded}K for ±10%.
                </p>
              </>
            ) : (
              <p className="eng-error" style={{ marginTop: 0 }}>
                This value can't be written as a 3-digit code. Codes have two significant figures
                and run from about 1 pF to 99 µF; larger capacitors (electrolytics) print the value directly.
              </p>
            )}
          </div>
        )}
      </section>

      <section className="eng-panel" aria-label="Common codes">
        <h2>Common capacitor codes</h2>
        <div className="eng-table-wrap">
          <table className="eng-table">
            <thead>
              <tr><th>Code</th><th>pF</th><th>nF</th><th>µF</th></tr>
            </thead>
            <tbody>
              {COMMON_CODES.map((c) => {
                const u = allUnits(decodeCapacitor(c).pF);
                return (
                  <tr key={c}><td><b>{c}</b></td><td>{u.pF}</td><td>{u.nF}</td><td>{u.uF}</td></tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="eng-content">
        <h2>How to read capacitor codes</h2>
        <p>
          Small ceramic and film capacitors print a three-digit code instead of
          their full value. The code is always in picofarads (pF). The first
          two digits are the significant figures and the third digit is the
          number of zeros to add.
        </p>
        <ul>
          <li>104 is 10 followed by four zeros: 100,000 pF, which is 100 nF or 0.1 µF.</li>
          <li>222 is 22 followed by two zeros: 2,200 pF, which is 2.2 nF.</li>
          <li>470 is 47 with no zeros: 47 pF. A code of 47 on its own also means 47 pF.</li>
          <li>For values under 10 pF the letter R marks the decimal point, so 4R7 is 4.7 pF.</li>
        </ul>
        <p>
          European-style markings put the unit letter where the decimal point
          would be. 2n2 is 2.2 nF, n47 is 0.47 nF (470 pF), 4u7 is 4.7 µF and
          p68 is 0.68 pF. Large electrolytic capacitors simply print the value
          and voltage, for example 470 µF 25 V, and must be connected the right
          way round.
        </p>

        <h2>Tolerance letters</h2>
        <ul>
          {Object.entries(CAP_TOLERANCE).map(([k, v]) => (
            <li key={k}>{k}: {v.text}</li>
          ))}
        </ul>
        <p>
          Letters B, C and D give an absolute tolerance in picofarads and are
          used on small capacitors below about 10 pF.
        </p>

        <h2>Voltage codes</h2>
        <p>
          Some capacitors carry an EIA voltage code made of a digit and a letter.
          Common ones are 0J for 6.3 V, 1A for 10 V, 1C for 16 V, 1E for 25 V,
          1V for 35 V, 1H for 50 V, 2A for 100 V, 2E for 250 V and 2J for 630 V.
          Always choose a capacitor rated comfortably above the highest voltage
          in your circuit.
        </p>

        <h2>Frequently Asked Questions</h2>
        <FaqList faq={faq} />

        <p>
          Combining capacitors? Use the{" "}
          <Link to="/engineering-tools/series-parallel-calculator">Series and Parallel Calculator</Link>, or time a circuit with the{" "}
          <Link to="/engineering-tools/555-timer-calculator">555 Timer Calculator</Link>.
        </p>
      </section>
    </EngLayout>
  );
};

export default CapacitorCode;
