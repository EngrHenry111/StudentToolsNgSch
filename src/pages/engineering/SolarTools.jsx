import { useState } from "react";
import { Stat, Segment } from "./EngInputs";
import {
  LoadEditor,
  InverterResult,
  BatterySettings,
  BatteryResult,
  CitySelect
} from "./SolarParts";
import { useLoad, pshFor, fmtW, fmtWh } from "./solarLoad";
import {
  BATTERY_TYPES,
  BATTERY_UNITS,
  PANEL_SIZES_W,
  backupEnergy,
  sizeInverter,
  sizeBatteries,
  sizeSolar,
  suggestSystemVoltage,
  stringPlan,
  runtimeHours,
  rechargeHours
} from "../../utils/solar";

const num = (s) => (String(s).trim() === "" ? NaN : Number(s));
const naira = (x) => `₦${Math.round(x).toLocaleString()}`;
const hrs = (h) => (h >= 48 ? `${(h / 24).toFixed(1)} days` : `${Math.floor(h)} h ${Math.round((h % 1) * 60)} min`);

const DEFAULT_BATTERY = { type: "tubular", unit: "12-220t", hours: "10" };

// ---------------- Full solar system ----------------

export function SolarSystemTool() {
  const load = useLoad();
  const { numeric, summary } = load;
  const [city, setCity] = useState("Lagos");
  const [season, setSeason] = useState("rainy");
  const [battery, setBattery] = useState(DEFAULT_BATTERY);
  const [panelW, setPanelW] = useState(450);
  const [voltage, setVoltage] = useState("auto");
  const [pv, setPv] = useState({ voc: "49.5", vmp: "41.5", maxV: "", mpptMin: "" });
  const [cost, setCost] = useState({ panel: "", battery: "", inverter: "", controller: "", other: "", fuel: "" });

  const inv = sizeInverter({ running: summary.running, peak: summary.peak });
  const psh = pshFor(city, season);
  // Array size doesn't depend on voltage, so size it first to pick the bank voltage.
  const draft = sizeSolar({ dailyWh: summary.dailyWh, psh, panelW, systemVoltage: 24, batteryType: BATTERY_UNITS.find((u) => u.id === battery.unit).type });
  const autoVoltage = suggestSystemVoltage(inv?.kva ?? 1, draft?.installedW ?? 0);
  const systemVoltage = voltage === "auto" ? autoVoltage : Number(voltage);
  const hours = num(battery.hours);
  const energy = hours > 0 ? backupEnergy(numeric, hours) : 0;
  const unit = BATTERY_UNITS.find((u) => u.id === battery.unit);
  const bank = sizeBatteries({ energyWh: energy, systemVoltage, unit });
  const solar = sizeSolar({ dailyWh: summary.dailyWh, psh, panelW, systemVoltage, batteryType: unit.type });
  const strings = solar && num(pv.maxV) > 0 ? stringPlan({ panels: solar.panels, voc: num(pv.voc), vmp: num(pv.vmp), maxPvVoltage: num(pv.maxV), mpptMin: num(pv.mpptMin) || 0 }) : null;
  const recharge = solar && bank ? rechargeHours(energy, solar.installedW * 0.75, unit.type) : null;

  const priced = ["panel", "battery", "inverter"].some((k) => num(cost[k]) > 0);
  const total =
    (num(cost.panel) || 0) * (solar?.panels || 0) +
    (num(cost.battery) || 0) * (bank?.count || 0) +
    (num(cost.inverter) || 0) +
    (num(cost.controller) || 0) +
    (num(cost.other) || 0);
  const payback = total > 0 && num(cost.fuel) > 0 ? total / num(cost.fuel) : null;
  const setC = (k, v) => setCost((c) => ({ ...c, [k]: v }));

  const summaryLines = [
    inv?.kva && `Inverter: ${inv.kva} kVA pure sine wave, ${systemVoltage} V`,
    bank && `Batteries: ${bank.count} × ${unit.label} (${bank.series} in series × ${bank.strings} parallel), ${fmtWh(bank.bankWh)}`,
    solar && `Solar panels: ${solar.panels} × ${panelW} W = ${fmtW(solar.installedW)}`,
    solar && `Charge controller: ${solar.controller ? `${solar.controller} A MPPT` : `over 200 A: use several MPPT controllers`} at ${systemVoltage} V (or a hybrid inverter with built-in MPPT of at least ${fmtW(solar.installedW)})`
  ].filter(Boolean);

  return (
    <>
      <LoadEditor load={load} />

      <section className="eng-panel" aria-label="System settings">
        <h2>Location, batteries and panels</h2>
        <div className="eng-grid">
          <CitySelect value={city} onChange={setCity} season={season} onSeason={setSeason} />
          <label className="eng-field">
            Panel size
            <select value={panelW} onChange={(e) => setPanelW(Number(e.target.value))}>
              {PANEL_SIZES_W.map((w) => (
                <option key={w} value={w}>{w} W</option>
              ))}
            </select>
          </label>
          <label className="eng-field">
            System voltage
            <select value={voltage} onChange={(e) => setVoltage(e.target.value)}>
              <option value="auto">Automatic ({autoVoltage} V)</option>
              <option value="12">12 V</option>
              <option value="24">24 V</option>
              <option value="48">48 V</option>
            </select>
          </label>
        </div>
        <BatterySettings value={battery} onChange={setBattery} />
      </section>

      <section className="eng-panel" aria-label="Inverter">
        <h2>1. Inverter</h2>
        <InverterResult summary={summary} systemVoltage={systemVoltage} />
      </section>

      <section className="eng-panel" aria-label="Batteries">
        <h2>2. Batteries</h2>
        <BatteryResult energyWh={energy} systemVoltage={systemVoltage} settings={battery} />
      </section>

      <section className="eng-panel" aria-label="Solar panels">
        <h2>3. Solar panels and charge controller</h2>
        {solar ? (
          <>
            <div className="eng-stats" style={{ marginTop: 0 }}>
              <Stat value={`${solar.panels} × ${panelW} W`} label={`solar panels (${fmtW(solar.installedW)})`} />
              <Stat value={solar.controller ? `${solar.controller} A` : "200 A+"} label={`MPPT charge controller at ${systemVoltage} V`} />
              <Stat value={fmtWh(solar.dailyYieldWh)} label={`expected per day in ${city}`} />
            </div>
            <h3 className="eng-working-title">Working</h3>
            <div className="eng-working">
              <div>Daily energy: {fmtWh(summary.dailyWh)}</div>
              <div>
                Panel power needed: {fmtWh(summary.dailyWh)} ÷ ({psh} sun hours × 0.75 system losses × {BATTERY_TYPES[unit.type].eff} battery efficiency) = {fmtW(solar.arrayW)}
              </div>
              <div>Panels: {fmtW(solar.arrayW)} ÷ {panelW} W = {(solar.arrayW / panelW).toFixed(2)} → {solar.panels} panels</div>
              <div>
                Controller current: {fmtW(solar.installedW)} ÷ {systemVoltage} V × 1.25 = {Math.round(solar.controllerA)} A → {solar.controller ? `${solar.controller} A` : "more than 200 A"}
              </div>
              {recharge !== null && <div>Recharging the {fmtWh(energy)} used overnight takes about {hrs(recharge)} of good sun (more if you also run loads in the day)</div>}
            </div>
            {season === "average" && (
              <p className="eng-note">Sized on the yearly average: expect a shortfall on cloudy rainy-season days.</p>
            )}

            <h3 className="eng-working-title">Panel wiring (optional)</h3>
            <div className="eng-grid">
              <label className="eng-field">
                Panel Voc (V)
                <input type="number" inputMode="decimal" value={pv.voc} onChange={(e) => setPv({ ...pv, voc: e.target.value })} />
                <span className="eng-hint">open-circuit voltage on the panel label</span>
              </label>
              <label className="eng-field">
                Panel Vmp (V)
                <input type="number" inputMode="decimal" value={pv.vmp} onChange={(e) => setPv({ ...pv, vmp: e.target.value })} />
              </label>
              <label className="eng-field">
                Controller max PV voltage (V)
                <input type="number" inputMode="decimal" placeholder="e.g. 150 or 450" value={pv.maxV} onChange={(e) => setPv({ ...pv, maxV: e.target.value })} />
                <span className="eng-hint">from the controller or hybrid inverter datasheet</span>
              </label>
              <label className="eng-field">
                MPPT minimum voltage (V)
                <input type="number" inputMode="decimal" placeholder="optional" value={pv.mpptMin} onChange={(e) => setPv({ ...pv, mpptMin: e.target.value })} />
              </label>
            </div>
            {strings && strings.maxPerString === 0 && (
              <div className="eng-error" role="alert">One panel's Voc is already above this controller's maximum PV voltage.</div>
            )}
            {strings && strings.maxPerString > 0 && (
              <div className="eng-working">
                <div>Maximum per string: {pv.maxV} V ÷ ({pv.voc} V × 1.1 for cool mornings) = {strings.maxPerString} panels</div>
                <div>
                  Wire {strings.strings} string{strings.strings > 1 ? "s" : ""} of {strings.perString} panels in series
                  {strings.strings > 1 ? ", strings in parallel" : ""} (string Voc up to about {Math.round(strings.stringVoc)} V
                  {strings.stringVmp ? `, working voltage about ${Math.round(strings.stringVmp)} V` : ""})
                </div>
                {strings.perString * strings.strings !== solar.panels && (
                  <div>Use {strings.perString * strings.strings} panels so every string is the same length.</div>
                )}
              </div>
            )}
            {strings?.belowMppt && (
              <div className="eng-warn">The string working voltage is below the MPPT minimum. Put more panels in each string.</div>
            )}
          </>
        ) : (
          <p className="eng-note">Add appliances with hours of use to size the panels.</p>
        )}
      </section>

      {summaryLines.length > 0 && (
        <section className="eng-panel" aria-label="System summary">
          <h2>Your system</h2>
          <ul className="eng-steps">
            {summaryLines.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <p className="eng-note">
            Use this as a starting list when comparing installer quotes. A good installer should
            also check your wiring, earthing and where the panels will go.
          </p>

          <h3 className="eng-working-title">Cost estimate (enter your local prices)</h3>
          <div className="eng-grid">
            {[
              ["panel", `Price per ${panelW} W panel (₦)`],
              ["battery", "Price per battery (₦)"],
              ["inverter", "Inverter (₦)"],
              ["controller", "Charge controller (₦, 0 if hybrid)"],
              ["other", "Cables, breakers, mounting, labour (₦)"],
              ["fuel", "What you now spend on fuel/NEPA monthly (₦)"]
            ].map(([k, label]) => (
              <label key={k} className="eng-field">
                {label}
                <input type="number" inputMode="numeric" min="0" value={cost[k]} onChange={(e) => setC(k, e.target.value)} />
              </label>
            ))}
          </div>
          {priced && (
            <div className="eng-stats">
              <Stat value={naira(total)} label="estimated system cost" />
              {payback && <Stat value={payback < 120 ? `${payback.toFixed(1)} months` : "10+ years"} label="to pay back from fuel savings" />}
            </div>
          )}
          <div className="eng-row">
            <button type="button" className="eng-btn-ghost" onClick={() => window.print()}>
              Print / save as PDF
            </button>
          </div>
        </section>
      )}
    </>
  );
}

// ---------------- Inverter only ----------------

export function InverterTool() {
  const load = useLoad();
  const [pf, setPf] = useState(0.8);
  return (
    <>
      <LoadEditor load={load} />
      <section className="eng-panel" aria-label="Inverter size">
        <h2>Recommended inverter</h2>
        <div style={{ marginBottom: 14 }}>
          <Segment
            label="Power factor"
            value={String(pf)}
            onChange={(v) => setPf(Number(v))}
            options={[
              { value: "0.8", label: "PF 0.8 (most inverters)" },
              { value: "1", label: "PF 1.0 (rated in W = VA)" }
            ]}
          />
        </div>
        <InverterResult summary={load.summary} pf={pf} />
      </section>
    </>
  );
}

// ---------------- Battery backup ----------------

export function BatteryTool() {
  const load = useLoad();
  const [mode, setMode] = useState("runtime");
  const [battery, setBattery] = useState(DEFAULT_BATTERY);
  const [count, setCount] = useState("2");
  const [loadW, setLoadW] = useState("");
  const [voltage, setVoltage] = useState("24");

  const unit = BATTERY_UNITS.find((u) => u.id === battery.unit);
  const n = num(count);
  const bankWh = n > 0 ? n * unit.volts * unit.ah : 0;
  const avgW = num(loadW) > 0 ? num(loadW) : load.summary.running;
  const rt = runtimeHours({ bankWh, loadW: avgW, type: unit.type });

  const hours = num(battery.hours);
  const energy = hours > 0 ? backupEnergy(load.numeric, hours) : 0;
  const sized = sizeBatteries({ energyWh: energy, systemVoltage: Number(voltage), unit });

  return (
    <>
      <section className="eng-panel" aria-label="Battery backup calculator">
        <h2>Battery backup calculator</h2>
        <div style={{ marginBottom: 14 }}>
          <Segment
            label="What do you want to know?"
            value={mode}
            onChange={setMode}
            options={[
              { value: "runtime", label: "How long will my batteries last?" },
              { value: "size", label: "How many batteries do I need?" }
            ]}
          />
        </div>
        <BatterySettings value={battery} onChange={setBattery} showHours={mode === "size"} />

        {mode === "runtime" && (
          <>
            <div className="eng-grid">
              <label className="eng-field">
                Number of batteries
                <input type="number" inputMode="numeric" min="1" value={count} onChange={(e) => setCount(e.target.value)} />
              </label>
              <label className="eng-field">
                Load (watts)
                <input type="number" inputMode="numeric" min="1" placeholder={`${Math.round(load.summary.running)} from your appliance list`} value={loadW} onChange={(e) => setLoadW(e.target.value)} />
                <span className="eng-hint">leave empty to use the appliance list below</span>
              </label>
            </div>
            {rt && (
              <div className="eng-result" aria-live="polite">
                <div className="eng-stats" style={{ marginTop: 0 }}>
                  <Stat value={hrs(rt.hours)} label={`backup at ${fmtW(avgW)}`} />
                  <Stat value={fmtWh(bankWh)} label="bank capacity" />
                  <Stat value={fmtWh(rt.usableWh)} label="usable energy" />
                </div>
                <div className="eng-working">
                  <div>Bank: {n} × {unit.volts} V × {unit.ah} Ah = {fmtWh(bankWh)}</div>
                  <div>Usable: {fmtWh(bankWh)} × {Math.round(BATTERY_TYPES[unit.type].dod * 100)}% depth of discharge × 90% inverter efficiency = {fmtWh(rt.usableWh)}</div>
                  <div>Backup time: {fmtWh(rt.usableWh)} ÷ {fmtW(avgW)} = {hrs(rt.hours)}</div>
                </div>
                {unit.type !== "lithium" && (
                  <p className="eng-note">
                    Running lead-acid batteries flat would give about {hrs(rt.fullDrainHours)}, but regularly going below
                    50% shortens their life to a year or two.
                  </p>
                )}
              </div>
            )}
          </>
        )}

        {mode === "size" && (
          <>
            <div className="eng-grid">
              <label className="eng-field">
                System (inverter) voltage
                <select value={voltage} onChange={(e) => setVoltage(e.target.value)}>
                  <option value="12">12 V</option>
                  <option value="24">24 V</option>
                  <option value="48">48 V</option>
                </select>
              </label>
            </div>
            {sized ? (
              <div className="eng-result">
                <BatteryResult energyWh={energy} systemVoltage={Number(voltage)} settings={battery} />
              </div>
            ) : (
              <p className="eng-note">Add appliances and backup hours to size the batteries.</p>
            )}
          </>
        )}
      </section>

      <LoadEditor load={load} title="Appliances on backup" />
    </>
  );
}
