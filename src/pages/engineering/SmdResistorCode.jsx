import { useState } from "react";
import { Link } from "react-router-dom";
import EngLayout, { FaqList } from "./EngLayout";
import { ValueInput, Stat } from "./EngInputs";
import { readValue } from "./engTools";
import { decodeSmd, encodeSmd, formatSI, EIA96_VALUES } from "../../utils/electronics";

const PATH = "/engineering-tools/smd-resistor-code";

const EIA96_MULTIPLIERS = [
  ["Z", "×0.001"], ["Y or R", "×0.01"], ["X or S", "×0.1"], ["A", "×1"], ["B or H", "×10"],
  ["C", "×100"], ["D", "×1,000"], ["E", "×10,000"], ["F", "×100,000"]
];

const faq = [
  {
    q: "What does 103 mean on an SMD resistor?",
    a: "In the 3-digit code the first two digits are the value and the last digit is the number of zeros. 103 is 10 followed by three zeros: 10,000 Ω, or 10 kΩ."
  },
  {
    q: "What does R mean in an SMD resistor code?",
    a: "In codes such as 4R7 or R22 the letter R marks the decimal point, so 4R7 is 4.7 Ω and R22 is 0.22 Ω. In a three-character EIA-96 code such as 01R, however, R is a multiplier of 0.01. This tool shows both readings when a code could be either."
  },
  {
    q: "How do I read EIA-96 codes like 01C?",
    a: "EIA-96 codes are used on small 1% resistors. The two digits are an index (01 to 96) into the E96 table of values, and the letter is a multiplier. 01 is 100 and C is ×100, so 01C is 10,000 Ω (10 kΩ)."
  },
  {
    q: "What does 000 or 0 mean on an SMD resistor?",
    a: "A marking of 0, 00 or 000 means a zero-ohm resistor, which is used as a jumper or link on the circuit board."
  }
];

const SmdResistorCode = () => {
  const [code, setCode] = useState("103");
  const [value, setValue] = useState("4k7");

  const readings = decodeSmd(code);
  const ohms = readValue(value);
  const codes = ohms ? encodeSmd(ohms) : {};

  return (
    <EngLayout
      path={PATH}
      title="SMD Resistor Code Calculator (3-digit, 4-digit, EIA-96) | StudentToolsNG"
      description="Decode SMD chip resistor markings: 3-digit codes like 103, 4-digit codes like 1002, R codes like 4R7 and EIA-96 codes like 01C. Or enter a value to get its SMD code."
      keywords="smd resistor code calculator, smd resistor code, eia-96 code, 103 resistor value, 4r7 resistor, chip resistor marking"
      faq={faq}
    >
      <h1>SMD Resistor Code Calculator</h1>
      <p className="eng-intro">
        Type the marking printed on a surface-mount resistor to get its value.
        Handles 3-digit, 4-digit, R-notation and EIA-96 codes.
      </p>

      <section className="eng-panel" aria-label="Decode an SMD code">
        <div className="eng-grid">
          <label className="eng-field">
            Code on the resistor
            <input
              type="text"
              maxLength={5}
              autoComplete="off"
              spellCheck="false"
              value={code}
              placeholder="e.g. 103, 4R7, 1002, 01C"
              onChange={(e) => setCode(e.target.value.toUpperCase())}
            />
          </label>
          <div style={{ textAlign: "center" }}>
            <span className="eng-smd" aria-hidden="true">{code || "—"}</span>
          </div>
        </div>

        {code.trim() && readings.length === 0 && (
          <div className="eng-error" role="alert">
            This is not a recognised resistor code. Codes are 3 or 4 digits (103, 1002),
            use R as a decimal point (4R7), or are EIA-96 (two digits from 01 to 96 plus a letter, e.g. 01C).
          </div>
        )}

        {readings.length > 0 && (
          <div className="eng-result" aria-live="polite">
            <span className="eng-big">{formatSI(readings[0].value, "Ω")}</span>
            <div className="eng-stats">
              {readings.map((r) => (
                <Stat
                  key={r.system}
                  value={`${formatSI(r.value, "Ω")}${r.tolerance ? ` ±${r.tolerance}%` : ""}`}
                  label={r.system}
                />
              ))}
            </div>
            {readings.length > 1 && (
              <p className="eng-note">
                This marking can be read more than one way. A trailing R is the decimal point on
                ordinary parts but a ×0.01 multiplier on 1% EIA-96 parts. Measure the resistor
                with a multimeter, or check the size of the part (EIA-96 codes are used on 1% parts).
              </p>
            )}
            {readings[0].tolerance && (
              <p className="eng-note">
                Tolerances shown are the usual ones for this marking system; the code itself
                does not state the tolerance.
              </p>
            )}
          </div>
        )}
      </section>

      <section className="eng-panel" aria-label="Value to SMD code">
        <h2>Find the SMD code for a value</h2>
        <div className="eng-grid">
          <ValueInput label="Resistance (e.g. 4k7, 10k, 0.22)" value={value} onChange={setValue} unit="Ω" />
        </div>
        {ohms !== null && (
          <div className="eng-result" aria-live="polite">
            <div className="eng-stats">
              <Stat value={codes.threeDigit || "not possible"} label="3-digit code (±5% parts)" />
              <Stat value={codes.fourDigit || "not possible"} label="4-digit code (±1% parts)" />
              <Stat value={codes.eia96 || "not in E96"} label="EIA-96 code (±1% parts)" />
            </div>
          </div>
        )}
      </section>

      <section className="eng-panel" aria-label="EIA-96 table">
        <h2>EIA-96 code table</h2>
        <p className="eng-muted">
          Code → value before the multiplier. Multiply by the letter:{" "}
          {EIA96_MULTIPLIERS.map(([l, m]) => `${l} ${m}`).join(", ")}.
        </p>
        <div className="eng-table-wrap">
          <table className="eng-table">
            <tbody>
              {Array.from({ length: 16 }, (_, row) => (
                <tr key={row}>
                  {Array.from({ length: 6 }, (_, col) => {
                    const i = col * 16 + row;
                    return (
                      <td key={col}>
                        <b>{String(i + 1).padStart(2, "0")}</b> = {EIA96_VALUES[i]}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="eng-content">
        <h2>How SMD resistor codes work</h2>
        <p>
          Surface-mount (SMD) resistors are too small for colour bands, so their
          value is printed as a short code. Very small parts, such as the 0402
          size and smaller, often have no marking at all and must be measured.
          There are four common systems.
        </p>

        <h3>3-digit code</h3>
        <p>
          Used on standard parts, usually ±5%. The first two digits are the
          significant figures and the third digit is the number of zeros. For
          example, 472 is 47 followed by two zeros, which is 4,700 Ω or 4.7 kΩ.
          A code of 100 is 10 Ω, not 100 Ω.
        </p>

        <h3>4-digit code</h3>
        <p>
          Used on precision parts, usually ±1%. The first three digits are the
          significant figures and the fourth is the number of zeros. For example,
          1002 is 100 followed by two zeros, which is 10,000 Ω or 10 kΩ, and 4751
          is 4,750 Ω.
        </p>

        <h3>R notation for small values</h3>
        <p>
          Values below 10 Ω cannot be written with the digit codes, so the letter
          R is used as the decimal point. 4R7 is 4.7 Ω, R10 is 0.1 Ω and 0R22 is
          0.22 Ω. Current-sense resistors often use this marking.
        </p>

        <h3>EIA-96 code</h3>
        <p>
          Small 1% resistors use a three-character code: two digits and a
          letter. The digits are a position in the E96 list of preferred values
          (01 = 100, 02 = 102 and so on up to 96 = 976), and the letter is the
          multiplier. For example, 68X is 499 × 0.1 = 49.9 Ω and 01C is 100 × 100
          = 10 kΩ. Use the table above to look up any code.
        </p>

        <h2>Frequently Asked Questions</h2>
        <FaqList faq={faq} />

        <p>
          Reading through-hole parts instead? Use the{" "}
          <Link to="/engineering-tools/resistor-color-code">Resistor Colour Code Calculator</Link> or the{" "}
          <Link to="/engineering-tools/capacitor-code">Capacitor Code Calculator</Link>.
        </p>
      </section>
    </EngLayout>
  );
};

export default SmdResistorCode;
