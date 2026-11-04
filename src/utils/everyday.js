// Maths for the everyday calculators (percentage, BMI, ovulation, pregnancy).
// Dates are handled as calendar days in UTC so time zones and daylight
// saving never shift a result by a day.

const DAY = 86400000;

// "2026-11-04" -> UTC midnight timestamp, or null.
export function parseDay(s) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s || "")) return null;
  const [y, m, d] = s.split("-").map(Number);
  const t = Date.UTC(y, m - 1, d);
  const back = new Date(t);
  return back.getUTCMonth() === m - 1 && back.getUTCDate() === d ? t : null;
}

export const addDays = (t, n) => t + n * DAY;
export const daysBetween = (a, b) => Math.round((b - a) / DAY);
export const todayUTC = () => {
  const n = new Date();
  return Date.UTC(n.getFullYear(), n.getMonth(), n.getDate());
};
export const toInput = (t) => new Date(t).toISOString().slice(0, 10);
export const formatDay = (t) =>
  new Date(t).toLocaleDateString("en-NG", { weekday: "short", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

// ---------- Percentages ----------

const round = (x, dp = 2) => {
  const f = 10 ** dp;
  return Math.round(x * f) / f;
};
export const fmt = (x, dp = 2) => round(x, dp).toLocaleString("en-NG", { maximumFractionDigits: dp });

// Each mode returns { value, steps } or null when the inputs can't give an answer.
export const PERCENT_MODES = {
  of: {
    label: "What is X% of Y?",
    a: "Percentage (X)", b: "Number (Y)",
    calc: (x, y) => ({ value: (x / 100) * y, steps: [`${fmt(x)}% of ${fmt(y)} = ${fmt(x)} ÷ 100 × ${fmt(y)}`] })
  },
  is: {
    label: "X is what percent of Y?",
    a: "Part (X)", b: "Whole (Y)",
    calc: (x, y) => (y === 0 ? null : { value: (x / y) * 100, unit: "%", steps: [`${fmt(x)} ÷ ${fmt(y)} × 100`] })
  },
  change: {
    label: "Percentage increase or decrease from X to Y",
    a: "Old value (X)", b: "New value (Y)",
    calc: (x, y) =>
      x === 0
        ? null
        : { value: ((y - x) / Math.abs(x)) * 100, unit: "%", signed: true, steps: [`(${fmt(y)} − ${fmt(x)}) ÷ ${fmt(Math.abs(x))} × 100`] }
  },
  add: {
    label: "Add X% to Y (e.g. VAT or a price rise)",
    a: "Percentage (X)", b: "Amount (Y)",
    calc: (x, y) => ({ value: y * (1 + x / 100), extra: (x / 100) * y, steps: [`${fmt(y)} + ${fmt(x)}% = ${fmt(y)} × ${fmt(1 + x / 100, 4)}`] })
  },
  subtract: {
    label: "Take X% off Y (e.g. a discount)",
    a: "Percentage (X)", b: "Amount (Y)",
    calc: (x, y) => ({ value: y * (1 - x / 100), extra: (x / 100) * y, steps: [`${fmt(y)} − ${fmt(x)}% = ${fmt(y)} × ${fmt(1 - x / 100, 4)}`] })
  }
};

// ---------- BMI ----------

export const BMI_BANDS = [
  { max: 18.5, label: "Underweight" },
  { max: 25, label: "Healthy weight" },
  { max: 30, label: "Overweight" },
  { max: Infinity, label: "Obese" }
];

export function bmi(weightKg, heightCm) {
  if (!(weightKg > 0) || !(heightCm > 0)) return null;
  const m = heightCm / 100;
  const value = weightKg / (m * m);
  const band = BMI_BANDS.find((b) => value < b.max).label;
  // Healthy range for this height: BMI 18.5 to 24.9.
  return { value, band, low: 18.5 * m * m, high: 24.9 * m * m };
}

export const feetInchesToCm = (ft, inch) => (ft * 12 + inch) * 2.54;

// ---------- Ovulation and periods ----------

// The luteal phase (ovulation to the next period) is about 14 days, so
// ovulation is roughly 14 days before the next period. The fertile window
// is the 5 days before ovulation plus ovulation day.
export function cycles(lmp, cycleLength, count = 3) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const start = addDays(lmp, i * cycleLength);
    const nextPeriod = addDays(start, cycleLength);
    const ovulation = addDays(nextPeriod, -14);
    out.push({ start, nextPeriod, ovulation, fertileStart: addDays(ovulation, -5), fertileEnd: ovulation });
  }
  return out;
}

// ---------- Pregnancy ----------

// Naegele's rule: due date = first day of the last period + 280 days, for a
// 28-day cycle. Longer or shorter cycles move ovulation, so the due date
// moves by the same number of days.
export function pregnancyFromLmp(lmp, cycleLength = 28, today = todayUTC()) {
  const due = addDays(lmp, 280 + (cycleLength - 28));
  const conception = addDays(lmp, cycleLength - 14);
  // Gestational age counts from the effective start of the pregnancy.
  const start = addDays(due, -280);
  const days = daysBetween(start, today);
  return pregnancyReport(start, due, conception, days);
}

export function pregnancyFromConception(conception, today = todayUTC()) {
  const due = addDays(conception, 266);
  const start = addDays(due, -280);
  return pregnancyReport(start, due, conception, daysBetween(start, today));
}

function pregnancyReport(start, due, conception, days) {
  const weeks = Math.floor(days / 7);
  const trimester = days < 0 ? null : weeks < 14 ? 1 : weeks < 28 ? 2 : 3;
  return {
    due,
    conception,
    days,
    weeks,
    extraDays: days - weeks * 7,
    trimester,
    daysLeft: daysBetween(start + days * DAY, due),
    milestones: [
      { label: "End of first trimester (13 weeks 6 days)", date: addDays(start, 13 * 7 + 6) },
      { label: "Second trimester ends (27 weeks 6 days)", date: addDays(start, 27 * 7 + 6) },
      { label: "Full term begins (37 weeks)", date: addDays(start, 37 * 7) },
      { label: "Estimated due date (40 weeks)", date: due }
    ]
  };
}
