import { useState } from "react";
import { Link } from "react-router-dom";
import EngLayout, { FaqList } from "./EngLayout";
import { ValueInput, Segment, Stat } from "./EngInputs";
import { readValue } from "./engTools";
import {
  timer555Astable,
  timer555Design,
  timer555Monostable,
  standardValue,
  formatSI
} from "../../utils/electronics";

const PATH = "/engineering-tools/555-timer-calculator";

const faq = [
  {
    q: "What is the formula for a 555 astable frequency?",
    a: "f = 1 ÷ (0.693 × (R1 + 2 × R2) × C), which is often written as f ≈ 1.44 ÷ ((R1 + 2R2) × C). The output is high for 0.693 × (R1 + R2) × C and low for 0.693 × R2 × C."
  },
  {
    q: "Why can't the duty cycle go below 50%?",
    a: "In the basic astable circuit the capacitor charges through R1 and R2 but discharges only through R2, so the high time is always longer than the low time. For 50% or less, add a diode across R2 so the capacitor charges through R1 only."
  },
  {
    q: "How long is a 555 monostable pulse?",
    a: "The pulse width is t = 1.1 × R × C. With R = 100 kΩ and C = 10 µF the output stays high for about 1.1 seconds after each trigger."
  },
  {
    q: "What values of R and C should I use?",
    a: "Keep resistors between about 1 kΩ and 1 MΩ and timing capacitors from about 100 pF upward. Very large electrolytic capacitors leak, which makes long delays inaccurate."
  }
];

const Timer555 = () => {
  const [mode, setMode] = useState("astable");
  const [r1, setR1] = useState("1k");
  const [r2, setR2] = useState("10k");
  const [c, setC] = useState("1u");
  const [freq, setFreq] = useState("1k");
  const [duty, setDuty] = useState("60");
  const [dc, setDc] = useState("100n");
  const [mr, setMr] = useState("100k");
  const [mc, setMc] = useState("10u");

  let astable = null;
  const R1 = readValue(r1);
  const R2 = readValue(r2);
  const C = readValue(c);
  if (mode === "astable" && R1 && R2 && C) astable = timer555Astable(R1, R2, C);

  let design = null;
  let error = "";
  const F = readValue(freq);
  const D = readValue(duty);
  const DC = readValue(dc);
  if (mode === "design" && F && D && DC) {
    try {
      const exact = timer555Design(F, D, DC);
      const std = { r1: standardValue(exact.r1, "E24"), r2: standardValue(exact.r2, "E24") };
      design = { exact, std, actual: timer555Astable(std.r1, std.r2, DC) };
    } catch (e) {
      error = e.message;
    }
  }

  const MR = readValue(mr);
  const MC = readValue(mc);
  const pulse = mode === "monostable" && MR && MC ? timer555Monostable(MR, MC) : null;

  const rangeWarn = (values) =>
    values.some((v) => v < 1000 || v > 1e6) ? (
      <div className="eng-warn">
        A resistor is outside the usual 1 kΩ – 1 MΩ range. Below 1 kΩ the 555 discharge pin carries
        a lot of current; above 1 MΩ leakage makes timing unreliable.
      </div>
    ) : null;

  return (
    <EngLayout
      path={PATH}
      title="555 Timer Calculator (Astable & Monostable) | StudentToolsNG"
      description="Free 555 timer calculator: frequency, period and duty cycle of an astable circuit, R1 and R2 for a target frequency, and the pulse width of a monostable circuit."
      keywords="555 timer calculator, 555 astable calculator, 555 monostable calculator, 555 frequency formula, ne555 duty cycle"
      faq={faq}
    >
      <h1>555 Timer Calculator</h1>
      <p className="eng-intro">
        Calculate the frequency and duty cycle of a 555 astable oscillator,
        design one for a target frequency, or find a monostable pulse width.
      </p>

      <section className="eng-panel" aria-label="555 timer calculator">
        <div style={{ marginBottom: 14 }}>
          <Segment
            label="Mode"
            value={mode}
            onChange={setMode}
            options={[
              { value: "astable", label: "Astable" },
              { value: "design", label: "Astable design" },
              { value: "monostable", label: "Monostable" }
            ]}
          />
        </div>

        {mode === "astable" && (
          <>
            <div className="eng-grid">
              <ValueInput label="R1" value={r1} onChange={setR1} unit="Ω" placeholder="1k" />
              <ValueInput label="R2" value={r2} onChange={setR2} unit="Ω" placeholder="10k" />
              <ValueInput label="Capacitor C" value={c} onChange={setC} unit="F" placeholder="10u" />
            </div>
            {astable && (
              <div className="eng-result" aria-live="polite">
                <span className="eng-big">{formatSI(astable.frequency, "Hz")}</span>
                <div className="eng-stats">
                  <Stat value={formatSI(astable.period, "s")} label="period" />
                  <Stat value={formatSI(astable.high, "s")} label="time high" />
                  <Stat value={formatSI(astable.low, "s")} label="time low" />
                  <Stat value={`${astable.duty.toFixed(1)}%`} label="duty cycle" />
                </div>
                {rangeWarn([R1, R2])}
              </div>
            )}
          </>
        )}

        {mode === "design" && (
          <>
            <div className="eng-grid">
              <ValueInput label="Target frequency" value={freq} onChange={setFreq} unit="Hz" placeholder="1k" />
              <ValueInput label="Duty cycle (%) — above 50" value={duty} onChange={setDuty} unit="%" placeholder="60" />
              <ValueInput label="Capacitor C" value={dc} onChange={setDc} unit="F" placeholder="100n" />
            </div>
            {error && <div className="eng-error" role="alert">{error}</div>}
            {design && (
              <div className="eng-result" aria-live="polite">
                <div className="eng-stats">
                  <Stat value={formatSI(design.std.r1, "Ω")} label={`R1 (exact ${formatSI(design.exact.r1, "Ω")})`} />
                  <Stat value={formatSI(design.std.r2, "Ω")} label={`R2 (exact ${formatSI(design.exact.r2, "Ω")})`} />
                  <Stat value={formatSI(design.actual.frequency, "Hz")} label="frequency with E24 values" />
                  <Stat value={`${design.actual.duty.toFixed(1)}%`} label="duty cycle with E24 values" />
                </div>
                {rangeWarn([design.exact.r1, design.exact.r2])}
                <p className="eng-note">
                  If the resistors fall outside 1 kΩ – 1 MΩ, choose a different capacitor and calculate again.
                </p>
              </div>
            )}
          </>
        )}

        {mode === "monostable" && (
          <>
            <div className="eng-grid">
              <ValueInput label="Resistor R" value={mr} onChange={setMr} unit="Ω" placeholder="100k" />
              <ValueInput label="Capacitor C" value={mc} onChange={setMc} unit="F" placeholder="10u" />
            </div>
            {pulse !== null && (
              <div className="eng-result" aria-live="polite">
                <span className="eng-big">Pulse = {formatSI(pulse, "s")}</span>
                <p className="eng-note">t = 1.1 × R × C. The output goes high for this long after each trigger.</p>
                {rangeWarn([MR])}
              </div>
            )}
          </>
        )}
      </section>

      <section className="eng-content">
        <h2>How the 555 timer works</h2>
        <p>
          The 555 is one of the most popular integrated circuits ever made. Inside
          it are two comparators, a flip-flop and a discharge transistor. A
          timing capacitor charges through resistors, and the comparators switch
          the output when the capacitor voltage reaches two-thirds and one-third
          of the supply voltage. Because both thresholds are fractions of the
          supply, the timing hardly changes when the supply voltage changes.
        </p>

        <h2>Astable mode formulas</h2>
        <p>
          In astable mode the 555 runs continuously and produces a square wave.
          The capacitor charges through R1 and R2 and discharges through R2 only.
        </p>
        <ul>
          <li>Time high: t high = 0.693 × (R1 + R2) × C</li>
          <li>Time low: t low = 0.693 × R2 × C</li>
          <li>Frequency: f = 1 ÷ (0.693 × (R1 + 2R2) × C), about 1.44 ÷ ((R1 + 2R2) × C)</li>
          <li>Duty cycle: (R1 + R2) ÷ (R1 + 2R2) × 100%</li>
        </ul>
        <p>
          Example: R1 = 1 kΩ, R2 = 10 kΩ and C = 1 µF give a frequency of about
          68.7 Hz and a duty cycle of 52.4%. The number 0.693 is the natural
          logarithm of 2, which this calculator uses exactly.
        </p>

        <h2>Monostable mode</h2>
        <p>
          In monostable mode the 555 waits for a trigger pulse, then holds its
          output high for a fixed time t = 1.1 × R × C before returning low. It
          is used for timers, switch debouncing and delay circuits. For
          example, R = 100 kΩ and C = 10 µF give a pulse of 1.1 seconds.
        </p>

        <h2>Frequently Asked Questions</h2>
        <FaqList faq={faq} />

        <p>
          Read your parts with the{" "}
          <Link to="/engineering-tools/capacitor-code">Capacitor Code Calculator</Link> and the{" "}
          <Link to="/engineering-tools/resistor-color-code">Resistor Colour Code Calculator</Link>.
        </p>
      </section>
    </EngLayout>
  );
};

export default Timer555;
