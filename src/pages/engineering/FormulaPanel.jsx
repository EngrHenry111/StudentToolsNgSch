import { COLORS, bandRoles, formatSI } from "../../utils/electronics";

const num = (x) => Number(x.toPrecision(12)).toLocaleString("en-NG", { maximumFractionDigits: 6 });
const sup = (exp) => String(exp).replace("-", "−");

// Small colour square shown next to a band name in the working.
function Dot({ color }) {
  return color === "none" ? null : (
    <span className="eng-dot" style={{ background: COLORS[color].hex }} aria-hidden="true" />
  );
}

// The general formula, then the same formula worked through with the bands
// currently selected.
export default function FormulaPanel({ bands, result, inductor }) {
  const roles = bandRoles(bands.length);
  const digitBands = bands.filter((_, i) => roles[i] === "digit");
  const multBand = bands[roles.indexOf("multiplier")];
  const tolBand = roles.includes("tolerance") ? bands[roles.indexOf("tolerance")] : null;
  const tcrBand = roles.includes("tcr") ? bands[roles.indexOf("tcr")] : null;

  const sym = inductor ? "L" : "R";
  const unit = inductor ? "µH" : "Ω";
  const digits = digitBands.map((b) => COLORS[b].digit);
  const weights = digits.length === 3 ? [100, 10, 1] : [10, 1];
  const base = Number(digits.join(""));
  const exp = COLORS[multBand].mult;
  const factor = 10 ** exp;
  const spread = (result.value * result.tolerance) / 100;

  return (
    <section className="eng-panel" aria-label="How the value is calculated">
      <h2>How this value is calculated</h2>

      <div className="eng-formula">
        <div>
          {sym} = (
          {weights.map((w, i) => (
            <span key={i}>
              {i > 0 && " + "}
              {w > 1 && `${w} × `}D<sub>{i + 1}</sub>
            </span>
          ))}
          ) × 10<sup>M</sup>
        </div>
        <div>{sym}<sub>min</sub> = {sym} × (1 − T ÷ 100)</div>
        <div>{sym}<sub>max</sub> = {sym} × (1 + T ÷ 100)</div>
        {tcrBand && (
          <div>Δ{sym} per °C = {sym} × TCR ÷ 1,000,000</div>
        )}
        <p className="eng-note" style={{ marginBottom: 0 }}>
          D = digit band values, M = multiplier band power of ten, T = tolerance in %
          {tcrBand ? ", TCR = temperature coefficient in ppm/K" : ""}.
          {inductor ? " For inductors the result is in microhenries (µH)." : ""}
        </p>
      </div>

      <ol className="eng-steps">
        <li>
          <b>Digits:</b>{" "}
          {digitBands.map((b, i) => (
            <span key={i}>
              {i > 0 && ", "}
              <Dot color={b} />{COLORS[b].name} = {COLORS[b].digit}
            </span>
          ))}
          {" → "}
          {weights.map((w, i) => `${w > 1 ? `${w} × ` : ""}${digits[i]}`).join(" + ")} = <b>{base}</b>
        </li>
        <li>
          <b>Multiplier:</b> <Dot color={multBand} />{COLORS[multBand].name} = 10<sup>{sup(exp)}</sup> = ×{num(factor)}
        </li>
        <li>
          <b>Value:</b> {sym} = {base} × {num(factor)} = <b>{num(result.value)} {unit}</b>
          {result.value >= 1000 || result.value < 1 ? ` (${formatSI(result.value * (inductor ? 1e-6 : 1), inductor ? "H" : "Ω")})` : ""}
        </li>
        <li>
          <b>Tolerance:</b>{" "}
          {tolBand && tolBand !== "none"
            ? <><Dot color={tolBand} />{COLORS[tolBand].name} = ±{result.tolerance}%</>
            : <>no tolerance band = ±20%</>}
          {" → "}{num(result.value)} × {result.tolerance} ÷ 100 = ±{num(spread)} {unit}
          {" → "}<b>{num(result.min)} {unit} to {num(result.max)} {unit}</b>
        </li>
        {tcrBand && (
          <li>
            <b>Temperature coefficient:</b> <Dot color={tcrBand} />{COLORS[tcrBand].name} = {result.tcr} ppm/K
            {" → "}{num(result.value)} × {result.tcr} ÷ 1,000,000 ={" "}
            <b>±{num((result.value * result.tcr) / 1e6)} {unit} per °C</b>
          </li>
        )}
      </ol>
    </section>
  );
}
