// Solar, inverter and battery sizing for home and small-office systems.
// Pure functions shared by the three calculators and unit-tested.
//
// Sizing rules follow common installer practice: inverter sized on running
// VA at 0.8 power factor plus headroom and checked against the starting
// surge of the largest motor; batteries sized on usable energy (depth of
// discharge × inverter efficiency); panels sized on daily energy ÷ peak
// sun hours with an overall derating for heat, dust and wiring losses.

// Typical appliance ratings. Users edit everything; these only fill the form.
// surge = starting power ÷ running power (motors and compressors).
// duty = share of switched-on time the appliance actually draws its rating
// (fridge compressors cycle on and off).
export const APPLIANCES = [
  { id: "led-bulb", name: "LED bulb", watts: 9, hours: 6, surge: 1, duty: 1 },
  { id: "led-tube", name: "LED tube light", watts: 18, hours: 6, surge: 1, duty: 1 },
  { id: "security-light", name: "Security / flood light", watts: 30, hours: 12, surge: 1, duty: 1 },
  { id: "standing-fan", name: "Standing fan", watts: 60, hours: 8, surge: 1.5, duty: 1 },
  { id: "ceiling-fan", name: "Ceiling fan", watts: 75, hours: 8, surge: 1.5, duty: 1 },
  { id: "rechargeable-fan", name: "Rechargeable fan (charging)", watts: 25, hours: 4, surge: 1, duty: 1 },
  { id: "tv-32", name: "32\" LED TV", watts: 50, hours: 5, surge: 1, duty: 1 },
  { id: "tv-43", name: "43\" LED TV", watts: 80, hours: 5, surge: 1, duty: 1 },
  { id: "tv-55", name: "55\" LED TV", watts: 120, hours: 5, surge: 1, duty: 1 },
  { id: "decoder", name: "Decoder (DStv / GOtv)", watts: 20, hours: 5, surge: 1, duty: 1 },
  { id: "sound", name: "Home theatre / sound system", watts: 100, hours: 3, surge: 1, duty: 1 },
  { id: "router", name: "Wi-Fi router / MiFi", watts: 12, hours: 24, surge: 1, duty: 1 },
  { id: "starlink", name: "Starlink dish", watts: 75, hours: 12, surge: 1, duty: 1 },
  { id: "phone", name: "Phone charging", watts: 10, hours: 3, surge: 1, duty: 1 },
  { id: "laptop", name: "Laptop", watts: 65, hours: 6, surge: 1, duty: 1 },
  { id: "desktop", name: "Desktop computer + monitor", watts: 200, hours: 6, surge: 1, duty: 1 },
  { id: "printer", name: "Laser printer (printing)", watts: 400, hours: 0.5, surge: 1.5, duty: 1 },
  { id: "cctv", name: "CCTV (4 cameras + DVR)", watts: 40, hours: 24, surge: 1, duty: 1 },
  { id: "fridge", name: "Refrigerator (medium)", watts: 150, hours: 24, surge: 3, duty: 0.4 },
  { id: "freezer", name: "Chest freezer", watts: 200, hours: 24, surge: 3, duty: 0.45 },
  { id: "inverter-fridge", name: "Inverter refrigerator", watts: 100, hours: 24, surge: 1.5, duty: 0.4 },
  { id: "ac-1hp", name: "Air conditioner 1 HP", watts: 900, hours: 6, surge: 3, duty: 0.8 },
  { id: "ac-15hp", name: "Air conditioner 1.5 HP", watts: 1300, hours: 6, surge: 3, duty: 0.8 },
  { id: "inverter-ac-1hp", name: "Inverter AC 1 HP", watts: 800, hours: 6, surge: 1.3, duty: 0.6 },
  { id: "pump", name: "Water pump 0.75 HP (pumping machine)", watts: 750, hours: 1, surge: 3, duty: 1 },
  { id: "washing", name: "Washing machine", watts: 500, hours: 1, surge: 2, duty: 1 },
  { id: "blender", name: "Blender", watts: 400, hours: 0.2, surge: 2, duty: 1 },
  { id: "microwave", name: "Microwave oven", watts: 1000, hours: 0.3, surge: 1.2, duty: 1 },
  { id: "iron", name: "Pressing iron", watts: 1000, hours: 0.5, surge: 1, duty: 0.6 },
  { id: "kettle", name: "Electric kettle", watts: 1500, hours: 0.2, surge: 1, duty: 1 },
  { id: "hair-dryer", name: "Hair dryer", watts: 1200, hours: 0.2, surge: 1, duty: 1 },
  { id: "water-dispenser", name: "Water dispenser (hot & cold)", watts: 500, hours: 24, surge: 2, duty: 0.15 }
];

export const applianceById = (id) => APPLIANCES.find((a) => a.id === id);

// Approximate yearly-average peak sun hours (kWh/m²/day on a well-tilted
// panel) for major Nigerian cities, and a rainy-season figure for the
// cloudier months (roughly June–September; lower in the south). Rounded
// from satellite irradiance averages; good enough for sizing, not for
// bankable yield estimates.
export const CITIES = [
  { name: "Abeokuta", psh: 4.8, rainy: 3.8 },
  { name: "Abuja", psh: 5.5, rainy: 4.5 },
  { name: "Akure", psh: 4.7, rainy: 3.7 },
  { name: "Asaba", psh: 4.6, rainy: 3.6 },
  { name: "Bauchi", psh: 5.9, rainy: 5.0 },
  { name: "Benin City", psh: 4.5, rainy: 3.5 },
  { name: "Calabar", psh: 4.1, rainy: 3.2 },
  { name: "Enugu", psh: 4.9, rainy: 3.9 },
  { name: "Ibadan", psh: 4.9, rainy: 3.9 },
  { name: "Ilorin", psh: 5.2, rainy: 4.2 },
  { name: "Jos", psh: 5.7, rainy: 4.6 },
  { name: "Kaduna", psh: 5.8, rainy: 4.8 },
  { name: "Kano", psh: 6.0, rainy: 5.2 },
  { name: "Lagos", psh: 4.6, rainy: 3.5 },
  { name: "Maiduguri", psh: 6.1, rainy: 5.4 },
  { name: "Makurdi", psh: 5.3, rainy: 4.3 },
  { name: "Minna", psh: 5.6, rainy: 4.6 },
  { name: "Onitsha", psh: 4.6, rainy: 3.6 },
  { name: "Osogbo", psh: 4.9, rainy: 3.9 },
  { name: "Owerri", psh: 4.4, rainy: 3.4 },
  { name: "Port Harcourt", psh: 4.2, rainy: 3.2 },
  { name: "Sokoto", psh: 6.2, rainy: 5.4 },
  { name: "Uyo", psh: 4.2, rainy: 3.2 },
  { name: "Warri", psh: 4.3, rainy: 3.3 },
  { name: "Yola", psh: 5.9, rainy: 5.0 }
];

// Battery chemistries. dod = usable share of capacity for a long life;
// eff = round-trip charge/discharge efficiency.
export const BATTERY_TYPES = {
  tubular: { name: "Tubular lead-acid (flooded)", dod: 0.5, eff: 0.85, life: "about 4–6 years" },
  agm: { name: "AGM / gel (sealed lead-acid)", dod: 0.5, eff: 0.85, life: "about 3–5 years" },
  lithium: { name: "Lithium (LiFePO4)", dod: 0.8, eff: 0.95, life: "about 8–12 years" }
};

// Common battery units on the Nigerian market.
export const BATTERY_UNITS = [
  { id: "12-100", type: "agm", volts: 12, ah: 100, label: "12 V 100 Ah (AGM / gel)" },
  { id: "12-200", type: "agm", volts: 12, ah: 200, label: "12 V 200 Ah (AGM / gel)" },
  { id: "12-200t", type: "tubular", volts: 12, ah: 200, label: "12 V 200 Ah tubular" },
  { id: "12-220t", type: "tubular", volts: 12, ah: 220, label: "12 V 220 Ah tubular" },
  { id: "li-12-100", type: "lithium", volts: 12.8, ah: 100, label: "12.8 V 100 Ah lithium" },
  { id: "li-12-200", type: "lithium", volts: 12.8, ah: 200, label: "12.8 V 200 Ah lithium" },
  { id: "li-24-100", type: "lithium", volts: 25.6, ah: 100, label: "25.6 V 100 Ah lithium" },
  { id: "li-48-100", type: "lithium", volts: 51.2, ah: 100, label: "51.2 V 100 Ah lithium (5 kWh)" },
  { id: "li-48-200", type: "lithium", volts: 51.2, ah: 200, label: "51.2 V 200 Ah lithium (10 kWh)" }
];

export const INVERTER_SIZES_KVA = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7.5, 8, 10, 12, 15, 20];
export const PANEL_SIZES_W = [100, 150, 200, 300, 400, 450, 550, 600];
export const CONTROLLER_SIZES_A = [10, 20, 30, 40, 50, 60, 80, 100, 120, 150, 200];
export const FUSE_SIZES_A = [10, 15, 20, 25, 30, 40, 50, 60, 80, 100, 125, 150, 175, 200, 250, 300, 350, 400];

// Conservative continuous rating of flexible copper battery cable in free
// air for short runs (under about 2 m). mm² → amps.
export const CABLE_TABLE = [
  [4, 30], [6, 40], [10, 55], [16, 80], [25, 110], [35, 135],
  [50, 170], [70, 215], [95, 260], [120, 300], [150, 340]
];

const nextUp = (list, x) => list.find((v) => v >= x - 1e-9) ?? null;

// ---------- Load ----------

// items: [{ name, watts, qty, hours, surge, duty }]
export function loadSummary(items) {
  const rows = items
    .filter((i) => i.watts > 0 && i.qty > 0)
    .map((i) => {
      const running = i.watts * i.qty;
      const duty = i.duty ?? 1;
      return {
        ...i,
        running,
        dailyWh: running * (i.hours || 0) * duty,
        // Extra power for a moment while ONE unit starts.
        startExtra: i.watts * Math.max((i.surge ?? 1) - 1, 0)
      };
    });
  const running = rows.reduce((a, r) => a + r.running, 0);
  const dailyWh = rows.reduce((a, r) => a + r.dailyWh, 0);
  // Motors rarely start at the same instant: running load + the biggest start.
  const biggest = rows.reduce((m, r) => (r.startExtra > (m?.startExtra ?? 0) ? r : m), null);
  const peak = running + (biggest?.startExtra ?? 0);
  const hasMotor = rows.some((r) => (r.surge ?? 1) > 1.2);
  return { rows, running, dailyWh, peak, biggestStarter: biggest, hasMotor };
}

// Energy the batteries must supply during `hours` of backup: each
// appliance runs for its usual daily hours or the backup time, whichever
// is shorter.
export function backupEnergy(items, hours) {
  return items
    .filter((i) => i.watts > 0 && i.qty > 0)
    .reduce((a, i) => a + i.watts * i.qty * (i.duty ?? 1) * Math.min(i.hours || 0, hours), 0);
}

// ---------- Inverter ----------

// Bank voltage: high enough for the inverter AND for the solar array, so
// the battery and charge-controller currents stay reasonable.
export function suggestSystemVoltage(kva, arrayW = 0) {
  const byInverter = kva <= 1 ? 12 : kva <= 3.5 ? 24 : 48;
  const bySolar = arrayW <= 800 ? 12 : arrayW <= 2400 ? 24 : 48;
  return Math.max(byInverter, bySolar);
}

// running/peak in watts. Returns the smallest standard inverter that
// carries the running load with headroom and survives the starting surge
// (most inverters give about 2× rated power for a few seconds).
export function sizeInverter({ running, peak, pf = 0.8, headroom = 0.25, surgeFactor = 2 }) {
  if (!(running > 0)) return null;
  const neededVA = (running / pf) * (1 + headroom);
  const bySurgeVA = peak / surgeFactor / pf;
  const requiredVA = Math.max(neededVA, bySurgeVA);
  const kva = nextUp(INVERTER_SIZES_KVA, requiredVA / 1000);
  const ratedW = kva ? kva * 1000 * pf : null;
  return {
    neededVA,
    bySurgeVA,
    requiredVA,
    surgeLimited: bySurgeVA > neededVA,
    kva,
    ratedW,
    systemVoltage: kva ? suggestSystemVoltage(kva) : 48,
    loadShare: ratedW ? running / ratedW : null
  };
}

// DC current drawn from the battery at full inverter output, the fuse and
// cable for it.
export function batteryCable({ watts, volts, invEff = 0.9 }) {
  if (!(watts > 0 && volts > 0)) return null;
  const amps = watts / (volts * invEff);
  const fuse = nextUp(FUSE_SIZES_A, amps * 1.25);
  const cable = CABLE_TABLE.find(([, a]) => a >= (fuse ?? amps * 1.25));
  return { amps, fuse, cableMm2: cable ? cable[0] : null };
}

// ---------- Batteries ----------

// Batteries needed to supply `energyWh` at `systemVoltage`.
export function sizeBatteries({ energyWh, systemVoltage, unit, type, invEff = 0.9 }) {
  const t = BATTERY_TYPES[type || unit.type];
  if (!(energyWh > 0) || !t) return null;
  const storedWh = energyWh / (t.dod * invEff);
  const ahAtSystem = storedWh / systemVoltage;
  // 12.8 V lithium counts as a 12 V block, 25.6 V as 24 V, 51.2 V as 48 V.
  const nominal = Math.round(unit.volts / 12) * 12;
  const series = Math.max(1, Math.round(systemVoltage / nominal));
  const strings = Math.max(1, Math.ceil(ahAtSystem / unit.ah - 1e-9));
  const count = series * strings;
  const bankWh = count * unit.volts * unit.ah;
  return {
    storedWh,
    ahAtSystem,
    series,
    strings,
    count,
    bankWh,
    usableWh: bankWh * t.dod * invEff,
    mismatch: nominal > systemVoltage,
    dod: t.dod
  };
}

// How long a battery bank lasts at an average load.
export function runtimeHours({ bankWh, loadW, type, invEff = 0.9 }) {
  const t = BATTERY_TYPES[type];
  if (!(bankWh > 0 && loadW > 0) || !t) return null;
  const usableWh = bankWh * t.dod * invEff;
  return { usableWh, hours: usableWh / loadW, fullDrainHours: (bankWh * invEff) / loadW };
}

// Hours to recharge `energyWh` (what was drawn from the bank) at `chargeW`.
export const rechargeHours = (energyWh, chargeW, type) =>
  energyWh > 0 && chargeW > 0 ? energyWh / (chargeW * BATTERY_TYPES[type].eff) : null;

// ---------- Solar panels ----------

// dailyWh = energy to deliver to the loads per day.
export function sizeSolar({ dailyWh, psh, panelW, systemVoltage, derate = 0.75, batteryType = "lithium" }) {
  if (!(dailyWh > 0 && psh > 0 && panelW > 0)) return null;
  // Energy that has to come off the panels: loads plus battery losses.
  const chargeEff = BATTERY_TYPES[batteryType]?.eff ?? 0.9;
  const arrayW = dailyWh / (psh * derate * chargeEff);
  const panels = Math.ceil(arrayW / panelW - 1e-9);
  const installedW = panels * panelW;
  const controllerA = (installedW / systemVoltage) * 1.25;
  return {
    arrayW,
    panels,
    installedW,
    dailyYieldWh: installedW * psh * derate,
    controllerA,
    controller: nextUp(CONTROLLER_SIZES_A, controllerA)
  };
}

// Panels per series string for an MPPT input. Voc rises in cool mornings,
// so allow 10 % above the datasheet Voc.
export function stringPlan({ panels, voc, vmp, maxPvVoltage, mpptMin = 0 }) {
  if (!(panels > 0 && voc > 0 && maxPvVoltage > 0)) return null;
  const maxPerString = Math.floor(maxPvVoltage / (voc * 1.1));
  if (maxPerString < 1) return { maxPerString: 0 };
  const strings = Math.ceil(panels / maxPerString);
  const perString = Math.ceil(panels / strings);
  return {
    maxPerString,
    strings,
    perString,
    stringVoc: perString * voc * 1.1,
    stringVmp: vmp > 0 ? perString * vmp : null,
    belowMppt: vmp > 0 && mpptMin > 0 && perString * vmp < mpptMin
  };
}

export const kwh = (wh) => wh / 1000;
