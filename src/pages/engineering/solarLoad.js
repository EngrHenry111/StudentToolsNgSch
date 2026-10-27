import { useEffect, useState } from "react";
import { CITIES, applianceById, loadSummary, kwh } from "../../utils/solar";

// The appliance list is shared by the solar, inverter and battery pages and
// kept in this browser only, so a visitor can move between them.
const STORE = "stng-solar-load-v1";

export const EXAMPLE = [
  ["led-bulb", 8],
  ["standing-fan", 3],
  ["tv-43", 1],
  ["decoder", 1],
  ["fridge", 1],
  ["laptop", 1],
  ["router", 1],
  ["phone", 3]
].map(([id, qty]) => fromPreset(id, qty));

export function fromPreset(id, qty = 1) {
  const a = applianceById(id);
  return { key: `${id}-${Math.random().toString(36).slice(2, 7)}`, name: a.name, watts: String(a.watts), qty: String(qty), hours: String(a.hours), surge: a.surge, duty: a.duty };
}

function readStore() {
  try {
    const v = JSON.parse(localStorage.getItem(STORE));
    return Array.isArray(v) && v.length ? v : null;
  } catch {
    return null;
  }
}

export function useLoad() {
  const [items, setItems] = useState(() => readStore() || EXAMPLE);
  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify(items));
    } catch {
      /* private mode: list just isn't remembered */
    }
  }, [items]);
  const numeric = items.map((i) => ({ ...i, watts: Number(i.watts) || 0, qty: Number(i.qty) || 0, hours: Number(i.hours) || 0 }));
  return { items, setItems, numeric, summary: loadSummary(numeric) };
}

export const fmtW = (w) => (w >= 10000 ? `${(w / 1000).toFixed(1)} kW` : `${Math.round(w).toLocaleString()} W`);
export const fmtWh = (wh) => (wh >= 1000 ? `${kwh(wh).toFixed(2)} kWh` : `${Math.round(wh)} Wh`);
export const pshFor = (cityName, season) => {
  const c = CITIES.find((x) => x.name === cityName) || CITIES[0];
  return season === "rainy" ? c.rainy : c.psh;
};
