import { parseValue, formatSI } from "../../utils/electronics";

// Text input that accepts engineering notation ("4k7", "20mA", "100n") and
// shows how it was read underneath, so typos are caught before calculating.
export function ValueInput({ label, value, onChange, unit, placeholder, allowZero = false }) {
  const parsed = parseValue(value);
  const empty = String(value).trim() === "";
  const bad = !empty && (!Number.isFinite(parsed) || parsed < 0 || (!allowZero && parsed === 0));
  return (
    <label className="eng-field">
      {label}
      <input
        type="text"
        inputMode="decimal"
        autoComplete="off"
        spellCheck="false"
        value={value}
        placeholder={placeholder}
        className={bad ? "is-bad" : ""}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className={`eng-hint ${bad ? "bad" : empty ? "" : "ok"}`}>
        {empty ? "" : bad ? "Can't read this value" : `= ${formatSI(parsed, unit)}`}
      </span>
    </label>
  );
}

export function Segment({ options, value, onChange, label }) {
  return (
    <div className="eng-segment" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Stat({ value, label }) {
  return (
    <div className="eng-stat">
      <b>{value}</b>
      <small>{label}</small>
    </div>
  );
}
