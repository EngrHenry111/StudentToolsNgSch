import { useState } from "react";
import { Link } from "react-router-dom";
import EngLayout, { FaqList } from "./EngLayout";
import { ValueInput, Stat } from "./EngInputs";
import { readValue } from "./engTools";
import { ledResistor, formatSI, encodeValue, COLORS } from "../../utils/electronics";

const PATH = "/engineering-tools/led-resistor-calculator";

// Typical forward voltages at about 20 mA. Real parts vary: use the datasheet.
const LED_TYPES = [
  { label: "Red", vf: "2.0" },
  { label: "Orange", vf: "2.0" },
  { label: "Yellow", vf: "2.1" },
  { label: "Green (standard, yellow-green)", vf: "2.2" },
  { label: "Green (bright / true green)", vf: "3.0" },
  { label: "Blue", vf: "3.2" },
  { label: "White", vf: "3.2" },
  { label: "Infrared", vf: "1.3" },
  { label: "Custom (from datasheet)", vf: "" }
];

const faq = [
  {
    q: "Why does an LED need a resistor?",
    a: "An LED's current rises very steeply once the voltage passes its forward voltage. Without something to limit the current it will draw far more than it can handle and burn out. A series resistor sets the current to a safe value."
  },
  {
    q: "What resistor do I need for an LED on 5 V?",
    a: "For a red LED (about 2 V) at 20 mA on 5 V: R = (5 − 2) ÷ 0.02 = 150 Ω. A blue or white LED (about 3.2 V) needs (5 − 3.2) ÷ 0.02 = 90 Ω, so use the next standard value up, 100 Ω."
  },
  {
    q: "Can several LEDs share one resistor?",
    a: "LEDs in series can share one resistor, as long as the supply is higher than all their forward voltages added together. LEDs in parallel should each have their own resistor, because small differences between LEDs make one take most of the current."
  },
  {
    q: "Why does the calculator round the resistor up?",
    a: "Rounding to the next standard value up keeps the current at or just below your target, which is the safe side for the LED. The slightly lower current makes almost no visible difference to brightness."
  }
];

const LedResistor = () => {
  const [supply, setSupply] = useState("9");
  const [type, setType] = useState(0);
  const [vf, setVf] = useState(LED_TYPES[0].vf);
  const [current, setCurrent] = useState("20m");
  const [count, setCount] = useState("1");
  const [series, setSeries] = useState("E12");

  const Vs = readValue(supply);
  const Vf = readValue(vf);
  const If = readValue(current);
  const n = Math.max(1, Math.min(50, Math.floor(Number(count)) || 1));

  let result = null;
  let error = "";
  if (Vs && Vf && If) {
    try {
      result = ledResistor({ supply: Vs, vf: Vf, current: If, count: n, series });
    } catch (e) {
      error = e.message;
    }
  }

  const bands = result ? encodeValue(result.chosen, 2) : null;

  return (
    <EngLayout
      path={PATH}
      title="LED Resistor Calculator (Series Resistor for LEDs) | StudentToolsNG"
      description="Free LED resistor calculator: find the series resistor for one or more LEDs from the supply voltage, LED forward voltage and current, with the nearest standard value, actual current and power rating."
      keywords="led resistor calculator, led series resistor, resistor for led 5v, resistor for led 12v, led current limiting resistor"
      faq={faq}
    >
      <h1>LED Resistor Calculator</h1>
      <p className="eng-intro">
        Find the current-limiting resistor for your LEDs, the standard value to
        buy, and the power rating it needs.
      </p>

      <section className="eng-panel" aria-label="LED resistor calculator">
        <div className="eng-grid">
          <ValueInput label="Supply voltage" value={supply} onChange={setSupply} unit="V" placeholder="9" />
          <label className="eng-field">
            LED colour
            <select
              value={type}
              onChange={(e) => {
                const i = Number(e.target.value);
                setType(i);
                if (LED_TYPES[i].vf) setVf(LED_TYPES[i].vf);
              }}
            >
              {LED_TYPES.map((t, i) => (
                <option key={t.label} value={i}>
                  {t.label}{t.vf ? ` (≈${t.vf} V)` : ""}
                </option>
              ))}
            </select>
          </label>
          <ValueInput label="LED forward voltage" value={vf} onChange={setVf} unit="V" placeholder="2.0" />
          <ValueInput label="LED current (e.g. 20m = 20 mA)" value={current} onChange={setCurrent} unit="A" placeholder="20m" />
          <label className="eng-field">
            LEDs in series
            <input type="number" min="1" max="50" value={count} onChange={(e) => setCount(e.target.value)} />
            <span className="eng-hint" />
          </label>
          <label className="eng-field">
            Standard values
            <select value={series} onChange={(e) => setSeries(e.target.value)}>
              <option value="E12">E12 (most common)</option>
              <option value="E24">E24</option>
            </select>
            <span className="eng-hint" />
          </label>
        </div>

        {error && <div className="eng-error" role="alert">{error}</div>}

        {result && (
          <div className="eng-result" aria-live="polite">
            <span className="eng-big">Use {formatSI(result.chosen, "Ω")}</span>
            {bands && (
              <div className="eng-chips" aria-label="Colour bands">
                {[...bands, "gold"].map((c, i) => (
                  <span key={i} className="eng-chip" style={{ background: COLORS[c].hex, color: COLORS[c].text }}>
                    {COLORS[c].name}
                  </span>
                ))}
              </div>
            )}
            <div className="eng-stats">
              <Stat value={formatSI(result.exact, "Ω")} label="exact resistance" />
              <Stat value={formatSI(result.actualCurrent, "A")} label="actual LED current" />
              <Stat value={formatSI(result.power, "W")} label="power in resistor" />
              <Stat
                value={result.rating ? `${result.rating} W` : "over 5 W"}
                label="resistor rating (2× margin)"
              />
              <Stat value={formatSI(result.drop, "V")} label="voltage across resistor" />
              <Stat value={formatSI(result.ledPower, "W")} label="power in each LED" />
            </div>
            {If > 0.03 && (
              <div className="eng-warn">Check the LED datasheet: most small 3 mm and 5 mm LEDs are rated for 20 mA continuous.</div>
            )}
            {result.drop / Vs < 0.15 && (
              <div className="eng-warn">
                Only {formatSI(result.drop, "V")} is left across the resistor, so the LED current will change a lot if the
                supply voltage drops (for example a battery running down). Use fewer LEDs in series or a higher supply.
              </div>
            )}
            {!result.rating && (
              <div className="eng-warn">The resistor would waste a lot of power. Consider a constant-current LED driver instead.</div>
            )}
          </div>
        )}
      </section>

      <section className="eng-content">
        <h2>LED resistor formula</h2>
        <p>
          The resistor has to drop the voltage that the LEDs do not use. With
          n LEDs in series, R = (Vs − n × Vf) ÷ I, where Vs is the supply voltage,
          Vf is the forward voltage of one LED and I is the LED current in amps.
          The resistor's power is P = I² × R.
        </p>

        <h2>Worked example: red LED on a 9 V battery</h2>
        <p>
          A red LED with a forward voltage of 2 V should run at 20 mA. The
          resistor must drop 9 − 2 = 7 V, so R = 7 ÷ 0.02 = 350 Ω. The next E12
          value up is 390 Ω, which gives a current of 7 ÷ 390 = 17.9 mA. The
          resistor dissipates about 0.126 W, so a 0.5 W resistor gives a safe
          margin (a 0.25 W part would run close to its limit).
        </p>

        <h2>Typical LED forward voltages</h2>
        <ul>
          <li>Red and orange: about 1.8 to 2.2 V</li>
          <li>Yellow and standard green: about 2.0 to 2.4 V</li>
          <li>Blue, white and bright green: about 2.8 to 3.4 V</li>
          <li>Infrared: about 1.2 to 1.5 V</li>
        </ul>
        <p>
          These are typical figures. The exact forward voltage depends on the
          LED and the current, so use the datasheet value when you have it.
        </p>

        <h2>Frequently Asked Questions</h2>
        <FaqList faq={faq} />

        <p>
          Related tools: <Link to="/engineering-tools/ohms-law-calculator">Ohm's Law Calculator</Link> and{" "}
          <Link to="/engineering-tools/resistor-color-code">Resistor Colour Code Calculator</Link>.
        </p>
      </section>
    </EngLayout>
  );
};

export default LedResistor;
