import { useState } from "react";
import { Link } from "react-router-dom";
import EngLayout, { FaqList } from "./EngLayout";
import { ValueInput, Segment, Stat } from "./EngInputs";
import { readValue } from "./engTools";
import FormulaPanel from "./FormulaPanel";
import {
  COLORS,
  TOLERANCE_COLORS,
  bandRoles,
  colorsForRole,
  decodeBands,
  encodeValue,
  formatSI,
  seriesOf,
  standardValue
} from "../../utils/electronics";

const PATH = "/engineering-tools/resistor-color-code";

const DEFAULT_BANDS = {
  3: ["brown", "black", "red"],
  4: ["brown", "black", "red", "gold"],
  5: ["brown", "black", "black", "brown", "brown"],
  6: ["brown", "black", "black", "brown", "brown", "brown"]
};

const ROLE_LABELS = { multiplier: "Multiplier", tolerance: "Tolerance", tcr: "Temp. coefficient" };
const ORDINALS = ["1st digit", "2nd digit", "3rd digit"];

const faq = [
  {
    q: "Which end of a resistor do I start reading from?",
    a: "Start from the end where the bands are bunched together. The tolerance band (often gold or silver) sits on its own, a little apart from the others, at the opposite end. There is no gold or silver first band, so if one end is gold or silver, read from the other end."
  },
  {
    q: "What does a 4-band resistor with brown, black, red and gold mean?",
    a: "Brown is 1, black is 0 and red is a multiplier of 100, giving 10 × 100 = 1,000 Ω (1 kΩ). The gold band means the tolerance is ±5%, so the real value is between 950 Ω and 1,050 Ω."
  },
  {
    q: "What is the difference between 4-band and 5-band resistors?",
    a: "A 4-band resistor has two significant digits, a multiplier and a tolerance band. A 5-band resistor has three significant digits, which lets it show precision values such as 4.75 kΩ, and is usually a ±1% or better part. A 6-band resistor adds a temperature coefficient band at the end."
  },
  {
    q: "What does grey mean as a tolerance band?",
    a: "Under the current IEC 60062:2016 standard grey means ±0.01%. Some manufacturers still follow the older practice where grey meant ±0.05%, so check the datasheet for very precise parts."
  },
  {
    q: "Do inductors use the same colour code?",
    a: "Yes. Colour-coded axial inductors use the same digit and multiplier colours, but the result is in microhenries (µH) instead of ohms. Switch the calculator to Inductor to read them."
  }
];

// Band x-positions inside the resistor drawing.
// Digit + multiplier bands are grouped on the left; tolerance and TCR bands
// sit apart on the right, as on a real part.
function bandPositions(count) {
  const main = count >= 5 ? 4 : 3;
  const xs = [];
  for (let i = 0; i < main; i++) xs.push(118 + i * 34);
  if (count >= 4) xs.push(306);
  if (count === 6) xs.push(338);
  return xs;
}

function ResistorSvg({ bands }) {
  const xs = bandPositions(bands.length);
  const precision = bands.length >= 5;
  return (
    <svg className="eng-resistor" viewBox="0 0 460 120" role="img"
      aria-label={`Resistor with bands: ${bands.map((b) => COLORS[b].name).join(", ")}`}>
      <defs>
        <clipPath id="eng-body">
          <rect x="80" y="26" width="300" height="68" rx="32" />
        </clipPath>
        <linearGradient id="eng-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <line x1="0" y1="60" x2="90" y2="60" stroke="#a3a9b3" strokeWidth="5" strokeLinecap="round" />
      <line x1="370" y1="60" x2="460" y2="60" stroke="#a3a9b3" strokeWidth="5" strokeLinecap="round" />
      <g clipPath="url(#eng-body)">
        <rect x="80" y="26" width="300" height="68" fill={precision ? "#86b6e3" : "#e3cc9f"} />
        {bands.map((b, i) =>
          b === "none" ? null : (
            <rect key={i} x={xs[i]} y="26" width="20" height="68" fill={COLORS[b].hex} />
          )
        )}
        <rect x="80" y="26" width="300" height="68" fill="url(#eng-shade)" />
      </g>
    </svg>
  );
}

function bandLabel(role, index) {
  return role === "digit" ? ORDINALS[index] : ROLE_LABELS[role];
}

const ResistorColorCode = () => {
  const [kind, setKind] = useState("resistor");
  const [count, setCount] = useState(4);
  const [bands, setBands] = useState(DEFAULT_BANDS[4]);

  const [target, setTarget] = useState("4k7");
  const [targetBands, setTargetBands] = useState(4);
  const [targetTol, setTargetTol] = useState("gold");

  const inductor = kind === "inductor";
  const unit = inductor ? "H" : "Ω";
  // Inductor colour codes give microhenries.
  const scale = inductor ? 1e-6 : 1;
  const roles = bandRoles(count);

  const changeCount = (n) => {
    setCount(n);
    setBands(DEFAULT_BANDS[n]);
  };

  const changeKind = (k) => {
    setKind(k);
    if (k === "inductor" && count > 4) changeCount(4);
  };

  const setBand = (i, color) => setBands((list) => list.map((b, j) => (j === i ? color : b)));

  let result = null;
  let error = "";
  try {
    result = decodeBands(bands);
  } catch (e) {
    error = e.message;
  }

  const series = result && result.value > 0 ? seriesOf(result.value) : null;

  // Students often read a resistor backwards. Only worth mentioning when
  // this reading is not a standard value but the reversed reading is.
  let reversed = null;
  if (result && count >= 4 && !series && !inductor) {
    try {
      const r = decodeBands([...bands].reverse());
      if (r.value > 0 && seriesOf(r.value)) reversed = r;
    } catch {
      reversed = null;
    }
  }

  // Value → colours
  const targetValue = readValue(target);
  const targetOhms = targetValue === null ? null : targetValue / (inductor ? 1e-6 : 1);
  const sig = targetBands === 5 ? 3 : 2;
  const encoded = targetOhms ? encodeValue(targetOhms, sig) : null;
  const encodedBands = encoded ? [...encoded, targetTol] : null;

  const applyTarget = () => {
    if (!encodedBands) return;
    setCount(targetBands);
    setBands(encodedBands);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const tolOptions = TOLERANCE_COLORS.filter((c) => c !== "none" || targetBands === 4);

  return (
    <EngLayout
      path={PATH}
      title="Resistor Colour Code Calculator (4, 5 & 6 Band) | StudentToolsNG"
      description="Free resistor colour code calculator: pick the bands to get the resistance, tolerance and range, or enter a value to get its colours. Works for 3, 4, 5 and 6-band resistors and inductors."
      keywords="resistor color code calculator, resistor colour code, 4 band resistor, 5 band resistor, 6 band resistor, inductor color code, resistor value"
      faq={faq}
    >
      <h1>Resistor Colour Code Calculator</h1>
      <p className="eng-intro">
        Tap the colours on your resistor to see its value, tolerance and range,
        or type a value to find the colours. Works for 3, 4, 5 and 6-band
        resistors and for colour-coded inductors.
      </p>

      <section className="eng-panel" aria-label="Colour bands to value">
        <div className="eng-row" style={{ marginTop: 0, marginBottom: 16 }}>
          <Segment
            label="Component"
            value={kind}
            onChange={changeKind}
            options={[{ value: "resistor", label: "Resistor" }, { value: "inductor", label: "Inductor" }]}
          />
          <Segment
            label="Number of bands"
            value={count}
            onChange={changeCount}
            options={(inductor ? [3, 4] : [3, 4, 5, 6]).map((n) => ({ value: n, label: `${n} bands` }))}
          />
        </div>

        <ResistorSvg bands={bands} />

        <div className="eng-bands">
          {roles.map((role, i) => (
            <div className="eng-band-row" key={`${count}-${i}`}>
              <span>{bandLabel(role, i)}</span>
              <div className="eng-swatches" role="group" aria-label={bandLabel(role, i)}>
                {colorsForRole(role).map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`eng-swatch${c === "none" ? " none" : ""}`}
                    style={c === "none" ? undefined : { background: COLORS[c].hex, color: COLORS[c].text }}
                    aria-pressed={bands[i] === c}
                    onClick={() => setBand(i, c)}
                  >
                    {COLORS[c].name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {error && <div className="eng-error" role="alert">{error}</div>}

        {result && (
          <div className="eng-result" aria-live="polite">
            <span className="eng-big">
              {formatSI(result.value * scale, unit)}
              {result.tolerance !== null && ` ±${result.tolerance}%`}
            </span>
            <div className="eng-stats">
              <Stat value={formatSI(result.min * scale, unit)} label="minimum value" />
              <Stat value={formatSI(result.max * scale, unit)} label="maximum value" />
              <Stat
                value={inductor ? `${result.value.toLocaleString("en-NG")} µH` : `${result.value.toLocaleString("en-NG")} Ω`}
                label="value written out"
              />
              {result.tcr !== null && (
                <Stat value={`±${result.tcr} ppm/K`} label="temperature coefficient" />
              )}
            </div>
            {result.tcr !== null && (
              <p className="eng-note">
                ±{result.tcr} ppm/K means the value can drift by up to{" "}
                {formatSI(result.value * scale * result.tcr * 1e-6, unit)} for every 1 °C change in temperature.
              </p>
            )}
            {!inductor && result.value > 0 && (
              <p className="eng-note">
                {series
                  ? `${formatSI(result.value, "Ω")} is a standard ${series} value.`
                  : `${formatSI(result.value, "Ω")} is not a standard E-series value. The nearest standard values are ${formatSI(standardValue(result.value, "E24"), "Ω")} (E24) and ${formatSI(standardValue(result.value, "E96"), "Ω")} (E96) — check the colours and reading direction.`}
              </p>
            )}
            {bands[bands.length - 1] === "grey" && roles[roles.length - 1] === "tolerance" && (
              <p className="eng-note">Grey is ±0.01% under IEC 60062:2016; some older parts use grey for ±0.05%.</p>
            )}
            {result.value === 0 && <p className="eng-note">A single black band marks a zero-ohm link (a jumper).</p>}
            {reversed && (
              <p className="eng-note">
                Read from the other end it would be {formatSI(reversed.value, "Ω")} ±{reversed.tolerance}%, which is
                a standard value. You may be holding the resistor the wrong way round.
              </p>
            )}
          </div>
        )}
      </section>

      {result && <FormulaPanel bands={bands} result={result} inductor={inductor} />}

      <section className="eng-panel" aria-label="Value to colour bands">
        <h2>Find the colours for a value</h2>
        <div className="eng-grid">
          <ValueInput
            label={inductor ? "Inductance (e.g. 100u, 4.7uH)" : "Resistance (e.g. 4k7, 220, 1M)"}
            value={target}
            onChange={setTarget}
            unit={unit}
            placeholder={inductor ? "100u" : "4k7"}
          />
          <label className="eng-field">
            Bands
            <select value={targetBands} onChange={(e) => {
              const n = Number(e.target.value);
              setTargetBands(n);
              if (n === 5 && targetTol === "none") setTargetTol("brown");
            }}>
              <option value={4}>4 bands (2 digits)</option>
              {!inductor && <option value={5}>5 bands (3 digits)</option>}
            </select>
          </label>
          <label className="eng-field">
            Tolerance
            <select value={targetTol} onChange={(e) => setTargetTol(e.target.value)}>
              {tolOptions.map((c) => (
                <option key={c} value={c}>
                  {COLORS[c].name} (±{COLORS[c].tol}%)
                </option>
              ))}
            </select>
          </label>
        </div>

        {targetOhms !== null && encodedBands && (
          <div className="eng-result" aria-live="polite">
            <div className="eng-chips">
              {encodedBands.map((c, i) => (
                <span
                  key={i}
                  className="eng-chip"
                  style={c === "none" ? undefined : { background: COLORS[c].hex, color: COLORS[c].text }}
                >
                  {COLORS[c].name}
                </span>
              ))}
            </div>
            <div className="eng-row">
              <button type="button" className="eng-btn-ghost" onClick={applyTarget}>
                Show on the resistor above
              </button>
            </div>
            {!inductor && !seriesOf(targetOhms) && (
              <p className="eng-note">Note: this is not a standard E-series value, so it may be hard to buy.</p>
            )}
          </div>
        )}

        {targetOhms !== null && !encodedBands && (
          <div className="eng-error">
            {targetBands === 4 && encodeValue(targetOhms, 3) && !inductor
              ? "This value needs three significant figures — choose 5 bands."
              : `This value can't be shown with ${targetBands} bands.`}{" "}
            {!inductor && `Nearest standard values: ${formatSI(standardValue(targetOhms, "E24"), "Ω")} (E24), ${formatSI(standardValue(targetOhms, "E96"), "Ω")} (E96).`}
          </div>
        )}
      </section>

      <section className="eng-content">
        <h2>How to read a resistor colour code</h2>
        <p>
          Resistors are too small to print numbers on, so their value is shown
          with coloured bands. Each colour stands for a number from 0 to 9.
          Hold the resistor so the bands that are bunched together are on the
          left. The band standing on its own on the right, usually gold or
          silver, is the tolerance band.
        </p>
        <ol>
          <li>Read the first bands as digits. A 4-band resistor has two digit bands and a 5-band resistor has three.</li>
          <li>The next band is the multiplier: the number of zeros to add, or gold for divide by 10 and silver for divide by 100.</li>
          <li>The last band is the tolerance: how far the real value may be from the marked value.</li>
          <li>On a 6-band resistor the extra band at the end is the temperature coefficient in ppm per kelvin.</li>
        </ol>

        <h2>Resistor colour code chart</h2>
        <div className="eng-table-wrap">
          <table className="eng-table">
            <thead>
              <tr><th>Colour</th><th>Digit</th><th>Multiplier</th><th>Tolerance</th><th>Temp. coefficient</th></tr>
            </thead>
            <tbody>
              <tr><td>Black</td><td>0</td><td>×1</td><td>—</td><td>250 ppm/K</td></tr>
              <tr><td>Brown</td><td>1</td><td>×10</td><td>±1%</td><td>100 ppm/K</td></tr>
              <tr><td>Red</td><td>2</td><td>×100</td><td>±2%</td><td>50 ppm/K</td></tr>
              <tr><td>Orange</td><td>3</td><td>×1k</td><td>±0.05%</td><td>15 ppm/K</td></tr>
              <tr><td>Yellow</td><td>4</td><td>×10k</td><td>±0.02%</td><td>25 ppm/K</td></tr>
              <tr><td>Green</td><td>5</td><td>×100k</td><td>±0.5%</td><td>20 ppm/K</td></tr>
              <tr><td>Blue</td><td>6</td><td>×1M</td><td>±0.25%</td><td>10 ppm/K</td></tr>
              <tr><td>Violet</td><td>7</td><td>×10M</td><td>±0.1%</td><td>5 ppm/K</td></tr>
              <tr><td>Grey</td><td>8</td><td>×100M</td><td>±0.01%</td><td>1 ppm/K</td></tr>
              <tr><td>White</td><td>9</td><td>×1G</td><td>—</td><td>—</td></tr>
              <tr><td>Gold</td><td>—</td><td>×0.1</td><td>±5%</td><td>—</td></tr>
              <tr><td>Silver</td><td>—</td><td>×0.01</td><td>±10%</td><td>—</td></tr>
              <tr><td>No band</td><td>—</td><td>—</td><td>±20%</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Values follow the international standard IEC 60062:2016. A popular
          way to remember the digit order is the phrase BB ROY of Great Britain
          had a Very Good Wife: Black, Brown, Red, Orange, Yellow, Green, Blue,
          Violet, Grey, White.
        </p>

        <h2>Worked examples</h2>
        <h3>4-band: yellow, violet, orange, gold</h3>
        <p>
          Yellow is 4 and violet is 7, so the digits are 47. Orange is a
          multiplier of 1,000, giving 47,000 Ω or 47 kΩ. Gold means ±5%, so the
          real resistance lies between 44.65 kΩ and 49.35 kΩ.
        </p>
        <h3>5-band: brown, black, black, brown, brown</h3>
        <p>
          The three digits are 1, 0 and 0, which is 100. The brown multiplier
          is ×10, giving 1,000 Ω or 1 kΩ. The final brown band is a tolerance
          of ±1%, so the value is between 990 Ω and 1,010 Ω.
        </p>
        <h3>3-band: red, red, brown</h3>
        <p>
          The digits are 22 and brown multiplies by 10, so the value is 220 Ω.
          With no tolerance band the tolerance is ±20%.
        </p>

        <h2>Standard resistor values (E-series)</h2>
        <p>
          Resistors are made in preferred values called the E-series, defined
          in IEC 60063. The E12 series has 12 values in each decade (10, 12,
          15, 18, 22, 27, 33, 39, 47, 56, 68, 82) and suits ±10% parts, E24
          suits ±5% parts and E96 suits ±1% parts. This calculator tells you
          when a reading is not a standard value, which usually means a colour
          was misread or the resistor was read from the wrong end.
        </p>

        <h2>Frequently Asked Questions</h2>
        <FaqList faq={faq} />

        <p>
          More tools: <Link to="/engineering-tools/smd-resistor-code">SMD Resistor Code</Link>,{" "}
          <Link to="/engineering-tools/ohms-law-calculator">Ohm's Law Calculator</Link> and{" "}
          <Link to="/engineering-tools/series-parallel-calculator">Series and Parallel Calculator</Link>.
        </p>
      </section>
    </EngLayout>
  );
};

export default ResistorColorCode;
