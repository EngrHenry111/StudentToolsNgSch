// Electronics reference data and calculations for the Engineering Tools pages.
//
// Sources: IEC 60062:2016 (colour code, tolerance/TCR letters), IEC 60063
// (E-series preferred values), EIA-96 SMD marking, EIA capacitor voltage
// codes. Everything here is pure (no React) so it can be tested in Node.

/* ===================== Colour code (IEC 60062) ===================== */

// digit: significant figure; mult: multiplier power of ten;
// tol: tolerance in %; tcr: temperature coefficient in ppm/K.
export const COLORS = {
  black:  { name: "Black",  hex: "#111111", text: "#ffffff", digit: 0, mult: 0,  tol: null,  tcr: 250 },
  brown:  { name: "Brown",  hex: "#7b3f12", text: "#ffffff", digit: 1, mult: 1,  tol: 1,     tcr: 100 },
  red:    { name: "Red",    hex: "#d62828", text: "#ffffff", digit: 2, mult: 2,  tol: 2,     tcr: 50 },
  orange: { name: "Orange", hex: "#f77f00", text: "#111111", digit: 3, mult: 3,  tol: 0.05,  tcr: 15 },
  yellow: { name: "Yellow", hex: "#fcd116", text: "#111111", digit: 4, mult: 4,  tol: 0.02,  tcr: 25 },
  green:  { name: "Green",  hex: "#2a9d3f", text: "#ffffff", digit: 5, mult: 5,  tol: 0.5,   tcr: 20 },
  blue:   { name: "Blue",   hex: "#1d4ed8", text: "#ffffff", digit: 6, mult: 6,  tol: 0.25,  tcr: 10 },
  violet: { name: "Violet", hex: "#7e22ce", text: "#ffffff", digit: 7, mult: 7,  tol: 0.1,   tcr: 5 },
  grey:   { name: "Grey",   hex: "#8a8f98", text: "#111111", digit: 8, mult: 8,  tol: 0.01,  tcr: 1 },
  white:  { name: "White",  hex: "#f5f5f5", text: "#111111", digit: 9, mult: 9,  tol: null,  tcr: null },
  gold:   { name: "Gold",   hex: "#c9a227", text: "#111111", digit: null, mult: -1, tol: 5,  tcr: null },
  silver: { name: "Silver", hex: "#c0c0c0", text: "#111111", digit: null, mult: -2, tol: 10, tcr: null },
  none:   { name: "None",   hex: "transparent", text: "#e2e8f0", digit: null, mult: null, tol: 20, tcr: null }
};

export const DIGIT_COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];
export const MULTIPLIER_COLORS = [...DIGIT_COLORS, "gold", "silver"];
export const TOLERANCE_COLORS = ["brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "gold", "silver", "none"];
export const TCR_COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey"];

// Role of each band for a given band count.
export function bandRoles(count) {
  if (count === 3) return ["digit", "digit", "multiplier"];
  if (count === 4) return ["digit", "digit", "multiplier", "tolerance"];
  if (count === 5) return ["digit", "digit", "digit", "multiplier", "tolerance"];
  return ["digit", "digit", "digit", "multiplier", "tolerance", "tcr"];
}

export const colorsForRole = (role) =>
  role === "digit" ? DIGIT_COLORS
    : role === "multiplier" ? MULTIPLIER_COLORS
    : role === "tolerance" ? TOLERANCE_COLORS
    : TCR_COLORS;

// Avoid 4.7 * 1000 = 4699.999… style float noise.
const clean = (x) => Number(x.toPrecision(12));

// Decode a list of colour names. A 3-band part has no tolerance band (±20%).
export function decodeBands(bands) {
  const roles = bandRoles(bands.length);
  let digits = "";
  let mult = 0;
  let tol = 20;
  let tcr = null;
  roles.forEach((role, i) => {
    const c = COLORS[bands[i]];
    if (!c || !colorsForRole(role).includes(bands[i])) {
      throw new Error(`${c ? c.name : bands[i]} can't be used as a ${role} band.`);
    }
    if (role === "digit") digits += c.digit;
    else if (role === "multiplier") mult = c.mult;
    else if (role === "tolerance") tol = c.tol;
    else tcr = c.tcr;
  });
  const value = clean(Number(digits) * 10 ** mult);
  return {
    value,
    tolerance: tol,
    min: clean(value * (1 - tol / 100)),
    max: clean(value * (1 + tol / 100)),
    tcr
  };
}

// Colours for a value with `sig` significant-figure bands (2 or 3), or null
// if the value can't be written that way (multiplier range 0.01 … 10^9).
export function encodeValue(value, sig) {
  if (!(value > 0)) return null;
  for (let exp = -2; exp <= 9; exp++) {
    const mantissa = value / 10 ** exp;
    const rounded = Math.round(mantissa);
    if (rounded === 0) return null; // too many significant figures for these bands
    if (Math.abs(mantissa - rounded) > 1e-9 * Math.max(1, mantissa)) continue;
    if (rounded >= 10 ** sig) continue;
    // Exponents are tried smallest first, so the mantissa only has a
    // leading zero for values below the gold/silver range (e.g. 0.05 Ω).
    const digits = String(rounded).padStart(sig, "0");
    const multColor = MULTIPLIER_COLORS.find((k) => COLORS[k].mult === exp);
    return [...digits].map((d) => DIGIT_COLORS[Number(d)]).concat(multColor);
  }
  return null;
}

/* ===================== E-series (IEC 60063) ===================== */

const E24 = [10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 27, 30, 33, 36, 39, 43, 47, 51, 56, 62, 68, 75, 82, 91];
const E96 = [100, 102, 105, 107, 110, 113, 115, 118, 121, 124, 127, 130, 133, 137, 140, 143, 147, 150, 154, 158,
  162, 165, 169, 174, 178, 182, 187, 191, 196, 200, 205, 210, 215, 221, 226, 232, 237, 243, 249, 255, 261, 267,
  274, 280, 287, 294, 301, 309, 316, 324, 332, 340, 348, 357, 365, 374, 383, 392, 402, 412, 422, 432, 442, 453,
  464, 475, 487, 499, 511, 523, 536, 549, 562, 576, 590, 604, 619, 634, 649, 665, 681, 698, 715, 732, 750, 768,
  787, 806, 825, 845, 866, 887, 909, 931, 953, 976];

// Values per decade, scaled to 1.00 … 9.xx.
export const E_SERIES = {
  E6: [10, 15, 22, 33, 47, 68].map((v) => v / 10),
  E12: [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82].map((v) => v / 10),
  E24: E24.map((v) => v / 10),
  E48: E96.filter((_, i) => i % 2 === 0).map((v) => v / 100),
  E96: E96.map((v) => v / 100)
};

export const EIA96_VALUES = E96; // code 01 … 96 → E96[code - 1]

function seriesCandidates(value, series) {
  const decade = Math.floor(Math.log10(value));
  const out = [];
  for (let d = decade - 1; d <= decade + 1; d++) {
    for (const v of E_SERIES[series]) out.push(clean(v * 10 ** d));
  }
  return out;
}

// mode: "nearest" | "up" (smallest standard value >= value) | "down".
export function standardValue(value, series = "E24", mode = "nearest") {
  if (!(value > 0)) return null;
  const all = seriesCandidates(value, series);
  if (mode === "up") return all.find((v) => v >= value * (1 - 1e-9)) ?? null;
  if (mode === "down") return [...all].reverse().find((v) => v <= value * (1 + 1e-9)) ?? null;
  // Nearest on a log scale, as the series itself is spaced.
  return all.reduce((best, v) =>
    Math.abs(Math.log(v / value)) < Math.abs(Math.log(best / value)) ? v : best
  );
}

export function inSeries(value, series) {
  const v = standardValue(value, series);
  return v !== null && Math.abs(v - value) <= value * 1e-9;
}

// The smallest E-series that contains the value (E6 ⊂ E12 ⊂ E24; E48 ⊂ E96).
export function seriesOf(value) {
  return ["E6", "E12", "E24", "E48", "E96"].find((s) => inSeries(value, s)) || null;
}

/* ===================== Number formatting & parsing ===================== */

const PREFIXES = { "-12": "p", "-9": "n", "-6": "µ", "-3": "m", 0: "", 3: "k", 6: "M", 9: "G" };

// 4700 → "4.7 kΩ"
export function formatSI(value, unit = "", sig = 4) {
  if (value === 0) return `0 ${unit}`.trim();
  if (!Number.isFinite(value)) return "—";
  let exp = Math.floor(Math.log10(Math.abs(value)) / 3) * 3;
  exp = Math.max(-12, Math.min(9, exp));
  let mant = Number((value / 10 ** exp).toPrecision(sig));
  if (Math.abs(mant) >= 1000 && exp < 9) {
    exp += 3;
    mant = Number((value / 10 ** exp).toPrecision(sig));
  }
  return `${mant} ${PREFIXES[exp]}${unit}`;
}

const MULTIPLIERS = { p: 1e-12, n: 1e-9, u: 1e-6, "µ": 1e-6, "μ": 1e-6, m: 1e-3, k: 1e3, K: 1e3, M: 1e6, G: 1e9, R: 1, r: 1 };

// Parse what people type: "4k7", "4.7k", "4700", "2M2", "R47", "0R47",
// "20mA", "100nF", "2.2 µF", "1meg", "5 V". Returns NaN if unreadable.
// Lower-case m is milli, upper-case M is mega.
export function parseValue(input) {
  let s = String(input ?? "").trim().replace(/,/g, "").replace(/\s+/g, "");
  if (!s) return NaN;
  s = s.replace(/(ohms?|Ω|ω|Hz|F|H|V|A|W|s|%)$/i, ""); // trailing unit
  s = s.replace(/meg$/i, "M");
  let m = /^(\d*)([pnuµμmkKMGR])(\d+)$/.exec(s); // letter as decimal point: 4k7, R47, 2n2
  if (m) return clean(Number(`${m[1] || "0"}.${m[3]}`) * MULTIPLIERS[m[2]]);
  m = /^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)([pnuµμmkKMGR]?)$/i.exec(s);
  if (!m) return NaN;
  const suffix = m[2];
  const factor = suffix ? MULTIPLIERS[suffix] ?? MULTIPLIERS[suffix.toLowerCase()] : 1;
  return factor === undefined ? NaN : clean(Number(m[1]) * factor);
}

/* ===================== SMD resistor codes ===================== */

const EIA96_LETTERS = { Z: -3, Y: -2, R: -2, X: -1, S: -1, A: 0, B: 1, H: 1, C: 2, D: 3, E: 4, F: 5 };

// Returns every sensible reading of a marking (some are ambiguous, e.g. a
// trailing R is both an EIA-96 multiplier and a decimal point).
export function decodeSmd(raw) {
  const code = String(raw || "").trim().toUpperCase().replace(/\s+/g, "");
  const results = [];
  if (!code) return results;

  if (/^0+$/.test(code)) {
    results.push({ system: "Zero-ohm link (jumper)", value: 0, tolerance: null });
    return results;
  }
  // R as decimal point: 4R7, R47, 0R22, 10R0
  if (/^\d*R\d*$/.test(code) && code !== "R" && code.length <= 5) {
    const [a, b] = code.split("R");
    const value = Number(`${a || "0"}.${b || "0"}`);
    results.push({ system: "R notation (R marks the decimal point)", value, tolerance: null });
  }
  // EIA-96: 2 digits (01-96) + multiplier letter, 1% parts
  let m = /^(\d{2})([ZYRXSABHCDEF])$/.exec(code);
  if (m && Number(m[1]) >= 1 && Number(m[1]) <= 96) {
    const value = clean(EIA96_VALUES[Number(m[1]) - 1] * 10 ** EIA96_LETTERS[m[2]]);
    results.push({ system: "EIA-96 (1% resistor)", value, tolerance: 1 });
  }
  // 3-digit (usually 5%) and 4-digit (usually 1%): digits then power of ten
  m = /^(\d{2,3})(\d)$/.exec(code);
  if (m && (code.length === 3 || code.length === 4)) {
    const value = clean(Number(m[1]) * 10 ** Number(m[2]));
    results.push({
      system: code.length === 3 ? "3-digit code (usually ±5%)" : "4-digit code (usually ±1%)",
      value,
      tolerance: code.length === 3 ? 5 : 1
    });
  }
  return results;
}

// Value → markings in each SMD system that can express it exactly.
export function encodeSmd(value) {
  const out = {};
  if (!(value > 0)) return out;
  for (const [len, sig] of [[3, 2], [4, 3]]) {
    const key = len === 3 ? "threeDigit" : "fourDigit";
    if (value < 10 ** (sig - 1)) {
      // Below 10 Ω (3-digit) / 100 Ω (4-digit) the R notation is used.
      const str = String(clean(value));
      const [a, b = ""] = str.split(".");
      const digits = (a === "0" ? "" : a) + b;
      if (digits.replace(/^0+/, "").length <= sig) {
        const code = `${a === "0" ? "" : a}R${b}`.padEnd(len, "0");
        if (code.length === len) out[key] = code;
      }
      continue;
    }
    for (let exp = 0; exp <= 9; exp++) {
      const mant = value / 10 ** exp;
      if (Math.abs(mant - Math.round(mant)) < 1e-9 && Math.round(mant) < 10 ** sig) {
        out[key] = `${Math.round(mant)}${exp}`;
        break;
      }
    }
  }
  for (const [letter, exp] of Object.entries(EIA96_LETTERS)) {
    if (["Y", "S", "H"].includes(letter)) continue; // prefer R, X, B
    const base = value / 10 ** exp;
    const index = EIA96_VALUES.findIndex((v) => Math.abs(v - base) < 1e-6);
    if (index >= 0) {
      out.eia96 = `${String(index + 1).padStart(2, "0")}${letter}`;
      break;
    }
  }
  return out;
}

/* ===================== Capacitor codes ===================== */

export const CAP_TOLERANCE = {
  B: { abs: 0.1, text: "±0.1 pF" },
  C: { abs: 0.25, text: "±0.25 pF" },
  D: { abs: 0.5, pct: 0.5, text: "±0.5 pF (below 10 pF) or ±0.5%" },
  F: { pct: 1, text: "±1%" },
  G: { pct: 2, text: "±2%" },
  J: { pct: 5, text: "±5%" },
  K: { pct: 10, text: "±10%" },
  M: { pct: 20, text: "±20%" },
  Z: { plus: 80, minus: 20, text: "+80% / −20%" }
};

export const CAP_VOLTAGE = {
  "0G": 4, "0J": 6.3, "1A": 10, "1C": 16, "1E": 25, "1V": 35, "1H": 50, "1J": 63,
  "2A": 100, "2C": 160, "2D": 200, "2E": 250, "2G": 400, "2H": 500, "2W": 450, "2J": 630
};

// "104", "104K", "4R7", "2n2", "n47", "1u0", "47p" → { pF, tolerance }.
export function decodeCapacitor(raw) {
  let code = String(raw || "").trim().replace(/\s+/g, "");
  if (!code) return null;
  let tolLetter = null;
  const t = /^(.*\d)([BCDFGJKMZ])$/i.exec(code);
  if (t && !/^\d*[pnuµμ]\d*$/i.test(code)) {
    tolLetter = t[2].toUpperCase();
    code = t[1];
  }
  let pF;
  let m;
  if ((m = /^(\d{2})(\d)$/.exec(code))) {
    const e = Number(m[2]);
    // 8 and 9 in the third place mean ×0.01 and ×0.1.
    const power = e === 8 ? -2 : e === 9 ? -1 : e;
    if (e === 7) return null;
    pF = clean(Number(m[1]) * 10 ** power);
  } else if ((m = /^(\d*)R(\d+)$/i.exec(code))) {
    pF = Number(`${m[1] || "0"}.${m[2]}`);
  } else if ((m = /^(\d*)([pnuµμ])(\d*)$/i.exec(code)) && (m[1] || m[3])) {
    const scale = { p: 1, n: 1e3, u: 1e6, "µ": 1e6, "μ": 1e6 }[m[2].toLowerCase()];
    pF = clean(Number(`${m[1] || "0"}.${m[3] || "0"}`) * scale);
  } else if ((m = /^(\d{1,2})$/.exec(code))) {
    pF = Number(m[1]); // one or two digits alone are picofarads
  } else {
    return null;
  }
  return { pF, tolerance: tolLetter ? { letter: tolLetter, ...CAP_TOLERANCE[tolLetter] } : null };
}

// pF → 3-digit code ("104"), or R notation below 10 pF ("4R7").
export function encodeCapacitor(pF) {
  if (!(pF > 0)) return null;
  if (pF < 10) {
    const str = String(clean(pF));
    if (!str.includes(".")) return `${str}R0`;
    const [a, b] = str.split(".");
    return b.length <= 2 ? `${a === "0" ? "" : a}R${b}` : null;
  }
  for (let exp = 0; exp <= 6; exp++) {
    const mant = pF / 10 ** exp;
    if (Math.abs(mant - Math.round(mant)) < 1e-9 && Math.round(mant) < 100) {
      return `${Math.round(mant)}${exp}`;
    }
  }
  return null;
}

/* ===================== Circuit calculations ===================== */

// Given any two of V, I, R, P (others null), return all four.
export function ohmsLaw({ V = null, I = null, R = null, P = null }) {
  const has = (x) => x !== null && Number.isFinite(x);
  const known = [has(V), has(I), has(R), has(P)].filter(Boolean).length;
  if (known !== 2) throw new Error("Enter exactly two of the four values.");
  if (has(V) && has(I)) return { V, I, R: V / I, P: V * I };
  if (has(V) && has(R)) return { V, I: V / R, R, P: (V * V) / R };
  if (has(V) && has(P)) return { V, I: P / V, R: (V * V) / P, P };
  if (has(I) && has(R)) return { V: I * R, I, R, P: I * I * R };
  if (has(I) && has(P)) return { V: P / I, I, R: P / (I * I), P };
  return { V: Math.sqrt(P * R), I: Math.sqrt(P / R), R, P };
}

const sum = (xs) => xs.reduce((a, b) => a + b, 0);
const reciprocalSum = (xs) => 1 / sum(xs.map((x) => 1 / x));

// Resistors and inductors add in series; capacitors add in parallel.
export function combine(values, kind) {
  const adds = kind === "capacitor" ? "parallel" : "series";
  return {
    series: adds === "series" ? sum(values) : reciprocalSum(values),
    parallel: adds === "parallel" ? sum(values) : reciprocalSum(values)
  };
}

export function voltageDivider(vin, r1, r2) {
  const current = vin / (r1 + r2);
  return { vout: (vin * r2) / (r1 + r2), current, p1: current * current * r1, p2: current * current * r2 };
}

// R2 needed for a target Vout with a given R1.
export const dividerR2 = (vin, vout, r1) => (vout * r1) / (vin - vout);

export const POWER_RATINGS = [0.125, 0.25, 0.5, 1, 2, 3, 5];

// Smallest common rating at least twice the dissipation (usual safety margin).
export const powerRatingFor = (watts) => POWER_RATINGS.find((r) => r >= 2 * watts) ?? null;

export function ledResistor({ supply, vf, current, count = 1, series = "E12" }) {
  const drop = supply - vf * count;
  if (drop <= 0) {
    throw new Error("The supply voltage must be higher than the total LED forward voltage.");
  }
  const exact = drop / current;
  const chosen = standardValue(exact, series, "up"); // next value up keeps current at or below target
  const actualCurrent = drop / chosen;
  const power = actualCurrent * actualCurrent * chosen;
  return { drop, exact, chosen, actualCurrent, power, rating: powerRatingFor(power), ledPower: vf * actualCurrent };
}

const LN2 = Math.log(2); // the "0.693" in 555 datasheets

export function timer555Astable(r1, r2, c) {
  const high = LN2 * (r1 + r2) * c;
  const low = LN2 * r2 * c;
  const period = high + low;
  return { high, low, period, frequency: 1 / period, duty: (high / period) * 100 };
}

// Component values for a target frequency and duty cycle (50% < duty < 100%).
export function timer555Design(frequency, dutyPercent, c) {
  const d = dutyPercent / 100;
  if (!(d > 0.5 && d < 1)) {
    throw new Error("A basic 555 astable needs a duty cycle above 50% and below 100%.");
  }
  const r2 = (1 - d) / (LN2 * frequency * c);
  const r1 = (2 * d - 1) / (LN2 * frequency * c);
  return { r1, r2 };
}

export const timer555Monostable = (r, c) => 1.1 * r * c;

export const rcTimeConstant = (r, c) => r * c;
