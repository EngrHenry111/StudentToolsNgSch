import { useState } from "react";
import { Stat } from "./EngInputs";
import { EXAMPLE, fromPreset, fmtW, fmtWh } from "./solarLoad";
import { APPLIANCES, BATTERY_TYPES, BATTERY_UNITS, CITIES, sizeInverter, batteryCable, sizeBatteries } from "../../utils/solar";

const r1 = (x) => Math.round(x * 10) / 10;

export function LoadEditor({ load, title = "Your appliances" }) {
  const { items, setItems, summary } = load;
  const [pick, setPick] = useState("");
  const set = (i, k, v) => setItems((list) => list.map((x, j) => (j === i ? { ...x, [k]: v } : x)));

  const add = (id) => {
    if (!id) return;
    setItems((list) =>
      id === "custom"
        ? [...list, { key: `c-${Date.now()}`, name: "Other appliance", watts: "100", qty: "1", hours: "4", surge: 1, duty: 1 }]
        : [...list, fromPreset(id)]
    );
    setPick("");
  };

  return (
    <section className="eng-panel" aria-label="Appliance list">
      <h2>{title}</h2>
      <p className="eng-muted" style={{ marginTop: 0 }}>
        Add what you want to power. Check the watts on each appliance's label
        or manual; the figures filled in are typical values.
      </p>

      <div className="eng-table-wrap">
        <table className="eng-table eng-load">
          <thead>
            <tr>
              <th>Appliance</th>
              <th>Watts</th>
              <th>Qty</th>
              <th>Hours / day</th>
              <th>Wh / day</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => {
              const row = summary.rows.find((r) => r.key === it.key);
              return (
                <tr key={it.key}>
                  <td data-label="Appliance">
                    <input aria-label="Appliance name" value={it.name} onChange={(e) => set(i, "name", e.target.value)} />
                    {it.surge > 1.2 && <small className="eng-tag" title="Needs extra power for a moment when it starts">motor</small>}
                  </td>
                  <td data-label="Watts"><input aria-label={`${it.name} watts`} type="number" inputMode="numeric" min="0" value={it.watts} onChange={(e) => set(i, "watts", e.target.value)} /></td>
                  <td data-label="Qty"><input aria-label={`${it.name} quantity`} type="number" inputMode="numeric" min="0" value={it.qty} onChange={(e) => set(i, "qty", e.target.value)} /></td>
                  <td data-label="Hours/day"><input aria-label={`${it.name} hours per day`} type="number" inputMode="decimal" min="0" max="24" step="0.5" value={it.hours} onChange={(e) => set(i, "hours", e.target.value)} /></td>
                  <td className="eng-num" data-label="Wh/day">{row ? Math.round(row.dailyWh).toLocaleString() : 0}</td>
                  <td>
                    <button type="button" className="eng-btn-ghost" aria-label={`Remove ${it.name}`} onClick={() => setItems((l) => l.filter((_, j) => j !== i))}>✕</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="eng-row">
        <label className="eng-field" style={{ flex: "1 1 260px", margin: 0 }}>
          Add an appliance
          <select value={pick} onChange={(e) => add(e.target.value)}>
            <option value="">Choose…</option>
            {APPLIANCES.map((a) => (
              <option key={a.id} value={a.id}>{a.name} ({a.watts} W)</option>
            ))}
            <option value="custom">Other (enter your own)</option>
          </select>
        </label>
        <button type="button" className="eng-btn-ghost" onClick={() => setItems(EXAMPLE.map((x) => ({ ...x, key: x.key + "r" })))}>
          Reset to example
        </button>
        <button type="button" className="eng-btn-ghost" onClick={() => setItems([])}>
          Clear all
        </button>
      </div>

      <div className="eng-stats">
        <Stat value={fmtW(summary.running)} label="running load (all on together)" />
        <Stat value={fmtW(summary.peak)} label="peak while a motor starts" />
        <Stat value={fmtWh(summary.dailyWh)} label="energy used per day" />
      </div>
      {items.some((i) => i.duty < 1) && (
        <p className="eng-note">
          Fridges, freezers and ACs cycle on and off, so their daily energy counts only the time the
          compressor actually runs (about 40–80% of the hours shown).
        </p>
      )}
    </section>
  );
}

export function InverterResult({ summary, pf = 0.8, headroom = 0.25, systemVoltage }) {
  const inv = sizeInverter({ running: summary.running, peak: summary.peak, pf, headroom });
  if (!inv) return <p className="eng-note">Add at least one appliance to size the inverter.</p>;
  const V = systemVoltage || inv.systemVoltage;
  const cable = batteryCable({ watts: inv.ratedW, volts: V });
  const starter = summary.biggestStarter;
  return (
    <>
      <div className="eng-stats" style={{ marginTop: 0 }}>
        <Stat value={inv.kva ? `${inv.kva} kVA` : "Over 20 kVA"} label="recommended inverter" />
        <Stat value={`${V} V`} label="battery bank voltage" />
        {inv.ratedW && <Stat value={`${Math.round(inv.loadShare * 100)}%`} label="of the inverter's rated power in use" />}
      </div>
      <h3 className="eng-working-title">Working</h3>
      <div className="eng-working">
        <div>Running load: {fmtW(summary.running)} ÷ power factor {pf} = {Math.round(summary.running / pf).toLocaleString()} VA</div>
        <div>Add {Math.round(headroom * 100)}% headroom: {Math.round(inv.neededVA).toLocaleString()} VA</div>
        {starter && starter.startExtra > 0 && (
          <div>
            Starting surge: {fmtW(summary.running)} + {fmtW(starter.startExtra)} extra while the {starter.name.toLowerCase()} starts = {fmtW(summary.peak)}; an inverter handles about 2× its rating for a few seconds, so it needs at least {Math.round(inv.bySurgeVA).toLocaleString()} VA
          </div>
        )}
        <div>
          Next standard size: {inv.kva ? `${inv.kva} kVA (about ${fmtW(inv.ratedW)} continuous)` : "above 20 kVA: split the load or use several inverters"}
          {inv.surgeLimited ? ", chosen for the starting surge" : ""}
        </div>
        {cable && (
          <div>
            Battery current at full output: {fmtW(inv.ratedW)} ÷ ({V} V × 0.9) = {r1(cable.amps)} A → {cable.fuse ? `${cable.fuse} A fuse or breaker` : "fuse above 400 A"}
            {cable.cableMm2 ? `, at least ${cable.cableMm2} mm² copper cable` : ""}
          </div>
        )}
      </div>
      {summary.hasMotor && (
        <p className="eng-note">
          You have motor loads (fridge, freezer, AC, pump or similar): use a pure sine wave inverter.
          Modified sine wave inverters make motors run hot and noisy.
        </p>
      )}
      {V === 12 && inv.kva >= 1 && (
        <p className="eng-note">A 24 V bank is also common for 1 kVA and gives half the battery current and thinner cables.</p>
      )}
    </>
  );
}

export function BatterySettings({ value, onChange, showHours = true }) {
  const set = (k, v) => onChange({ ...value, [k]: v });
  const units = BATTERY_UNITS.filter((u) => u.type === value.type);
  return (
    <div className="eng-grid">
      <label className="eng-field">
        Battery type
        <select
          value={value.type}
          onChange={(e) => {
            const type = e.target.value;
            const first = BATTERY_UNITS.find((u) => u.type === type);
            if (!first) return;
            onChange({ ...value, type, unit: first.id });
          }}
        >
          {Object.entries(BATTERY_TYPES).map(([k, t]) => (
            <option key={k} value={k}>{t.name}</option>
          ))}
        </select>
      </label>
      <label className="eng-field">
        Battery
        <select value={value.unit} onChange={(e) => set("unit", e.target.value)}>
          {units.map((u) => (
            <option key={u.id} value={u.id}>{u.label}</option>
          ))}
        </select>
      </label>
      {showHours && (
        <label className="eng-field">
          Backup hours wanted
          <input type="number" inputMode="decimal" min="0.5" max="72" step="0.5" value={value.hours} onChange={(e) => set("hours", e.target.value)} />
          <span className="eng-hint">e.g. overnight = 10–12</span>
        </label>
      )}
    </div>
  );
}

export function BatteryResult({ energyWh, systemVoltage, settings }) {
  const unit = BATTERY_UNITS.find((u) => u.id === settings.unit);
  const t = BATTERY_TYPES[unit.type];
  const b = sizeBatteries({ energyWh, systemVoltage, unit });
  if (!b) return <p className="eng-note">Add appliances and backup hours to size the batteries.</p>;
  return (
    <>
      <div className="eng-stats" style={{ marginTop: 0 }}>
        <Stat value={`${b.count} × ${unit.label.replace(/ \(.*\)/, "")}`} label="batteries" />
        <Stat value={fmtWh(b.bankWh)} label="bank capacity" />
        <Stat value={fmtWh(b.usableWh)} label={`usable at ${Math.round(t.dod * 100)}% depth of discharge`} />
      </div>
      <h3 className="eng-working-title">Working</h3>
      <div className="eng-working">
        <div>Energy needed during backup: {fmtWh(energyWh)}</div>
        <div>
          Stored energy needed: {fmtWh(energyWh)} ÷ ({Math.round(t.dod * 100)}% usable × 90% inverter efficiency) = {fmtWh(b.storedWh)}
        </div>
        <div>At {systemVoltage} V: {fmtWh(b.storedWh)} ÷ {systemVoltage} V = {Math.round(b.ahAtSystem)} Ah</div>
        <div>
          Arrangement: {b.series} in series for {systemVoltage} V × {b.strings} parallel string{b.strings > 1 ? "s" : ""} of {unit.ah} Ah = {b.count} batter{b.count > 1 ? "ies" : "y"}
        </div>
      </div>
      {b.mismatch && (
        <div className="eng-warn">
          This battery is {unit.volts} V but the system is {systemVoltage} V. Choose a {systemVoltage} V
          battery or an inverter that runs on {Math.round(unit.volts / 12) * 12} V.
        </div>
      )}
      {b.strings > 3 && unit.type !== "lithium" && (
        <p className="eng-note">
          More than 3 lead-acid strings in parallel tend to share current unevenly. Consider larger
          batteries, a higher system voltage or lithium.
        </p>
      )}
      <p className="eng-note">Expected life: {t.life} with this depth of discharge.</p>
    </>
  );
}

export function CitySelect({ value, onChange, season, onSeason }) {
  const city = CITIES.find((c) => c.name === value) || CITIES[0];
  return (
    <>
      <label className="eng-field">
        Location
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          {CITIES.map((c) => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </select>
        <span className="eng-hint">
          {city.psh} sun hours a day on average, about {city.rainy} in the rainy season
        </span>
      </label>
      <label className="eng-field">
        Design for
        <select value={season} onChange={(e) => onSeason(e.target.value)}>
          <option value="rainy">Rainy season (safer, more panels)</option>
          <option value="average">Yearly average</option>
        </select>
      </label>
    </>
  );
}
