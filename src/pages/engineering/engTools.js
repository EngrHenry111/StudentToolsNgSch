import { parseValue } from "../../utils/electronics";

export const ENG_TOOLS = [
  { path: "/engineering-tools/resistor-color-code", name: "Resistor Colour Code", short: "Colours", blurb: "Read 3, 4, 5 and 6-band resistors (and colour-coded inductors), or find the colours for a value." },
  { path: "/engineering-tools/smd-resistor-code", name: "SMD Resistor Code", short: "SMD", blurb: "Decode 3-digit, 4-digit, R-notation and EIA-96 chip resistor markings." },
  { path: "/engineering-tools/capacitor-code", name: "Capacitor Code", short: "Capacitor", blurb: "Turn codes like 104, 4R7 or 2n2 into pF, nF and µF, with tolerance and voltage letters." },
  { path: "/engineering-tools/ohms-law-calculator", name: "Ohm's Law Calculator", short: "Ohm's Law", blurb: "Enter any two of voltage, current, resistance and power to get the other two." },
  { path: "/engineering-tools/series-parallel-calculator", name: "Series & Parallel Calculator", short: "Series/Parallel", blurb: "Solve series and parallel circuit questions with full working, or combine resistors, capacitors and inductors." },
  { path: "/engineering-tools/voltage-divider-calculator", name: "Voltage Divider Calculator", short: "Voltage Divider", blurb: "Find the output voltage, or the resistor needed for a target voltage." },
  { path: "/engineering-tools/led-resistor-calculator", name: "LED Resistor Calculator", short: "LED Resistor", blurb: "Size the series resistor for one or more LEDs and pick its power rating." },
  { path: "/engineering-tools/555-timer-calculator", name: "555 Timer Calculator", short: "555 Timer", blurb: "Frequency, duty cycle and pulse width for astable and monostable 555 circuits." }
];

// Value of a ValueInput string, or null when empty/invalid.
export function readValue(value, { allowZero = false } = {}) {
  if (String(value).trim() === "") return null;
  const v = parseValue(value);
  if (!Number.isFinite(v) || v < 0 || (!allowZero && v === 0)) return null;
  return v;
}

// Split "100, 220 4k7\n1M" into tokens and read each one.
export function readList(text) {
  const tokens = text.split(/[\n,;]+|\s{2,}|\s(?=\d)/).map((t) => t.trim()).filter(Boolean);
  return tokens.map((t) => ({ text: t, value: parseValue(t) }));
}
