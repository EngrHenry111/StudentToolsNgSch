// Date-only age arithmetic shared by the Age Calculator and Age Tracker.
//
// Dates are plain { y, m, d } objects (m is 1-12) and all day counts go
// through Date.UTC, so time zones and daylight saving can never shift a
// result by a day.

const DAY_MS = 86400000;

export const WEEKDAYS = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const isLeapYear = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

export const daysInMonth = (y, m) =>
  [31, isLeapYear(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];

// "YYYY-MM-DD" (what <input type="date"> gives) → { y, m, d }, or null.
export function parseDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ""));
  if (!match) return null;
  const [y, m, d] = match.slice(1).map(Number);
  if (m < 1 || m > 12 || d < 1 || d > daysInMonth(y, m)) return null;
  return { y, m, d };
}

const pad = (n) => String(n).padStart(2, "0");

export const toInputValue = ({ y, m, d }) => `${y}-${pad(m)}-${pad(d)}`;

export function today() {
  const now = new Date();
  return { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() };
}

const toUTC = ({ y, m, d }) => Date.UTC(y, m - 1, d);

export const compareDates = (a, b) => toUTC(a) - toUTC(b);

export const daysBetween = (a, b) => Math.round((toUTC(b) - toUTC(a)) / DAY_MS);

export function addDays(date, n) {
  const t = new Date(toUTC(date) + n * DAY_MS);
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
}

// Add whole months, clamping to the end of a shorter month
// (31 January + 1 month = 28/29 February).
function addMonths({ y, m, d }, n) {
  const index = y * 12 + (m - 1) + n;
  const ny = Math.floor(index / 12);
  const nm = (index % 12) + 1;
  return { y: ny, m: nm, d: Math.min(d, daysInMonth(ny, nm)) };
}

export const weekdayOf = (date) => WEEKDAYS[new Date(toUTC(date)).getUTCDay()];

export const formatDate = (date) =>
  `${weekdayOf(date)}, ${date.d} ${MONTHS[date.m - 1]} ${date.y}`;

// Birthday falling in year y. A 29 February birthday is kept on
// 28 February in common years.
export const birthdayIn = (birth, y) => ({
  y,
  m: birth.m,
  d: Math.min(birth.d, daysInMonth(y, birth.m))
});

// Exact age from birth to on (on >= birth): the largest number of whole
// months that fits, then the remaining days.
export function exactAge(birth, on) {
  let months = (on.y - birth.y) * 12 + (on.m - birth.m);
  if (compareDates(addMonths(birth, months), on) > 0) months -= 1;
  const days = daysBetween(addMonths(birth, months), on);
  return { years: Math.floor(months / 12), months: months % 12, days };
}

export function nextBirthday(birth, from) {
  let date = birthdayIn(birth, from.y);
  if (compareDates(date, from) < 0) date = birthdayIn(birth, from.y + 1);
  return {
    date,
    daysUntil: daysBetween(from, date),
    turning: date.y - birth.y
  };
}

// Everything the calculator shows for one birth date and "age on" date.
export function ageReport(birth, on) {
  const totalDays = daysBetween(birth, on);
  const age = exactAge(birth, on);
  return {
    ...age,
    totalMonths: age.years * 12 + age.months,
    totalWeeks: Math.floor(totalDays / 7),
    weekRemainder: totalDays % 7,
    totalDays,
    totalHours: totalDays * 24,
    bornOn: weekdayOf(birth),
    next: nextBirthday(birth, on)
  };
}

// Next "round" day-count milestone strictly after `from`
// (every 1,000 days: 1,000 … 10,000 days old, and so on).
export function nextDayMilestone(birth, from, step = 1000) {
  const lived = daysBetween(birth, from);
  const days = (Math.floor(lived / step) + 1) * step;
  return { days, date: addDays(birth, days), daysUntil: days - lived };
}

export const plural = (n, word) => `${n.toLocaleString("en-NG")} ${word}${n === 1 ? "" : "s"}`;

export const formatAge = ({ years, months, days }) =>
  `${plural(years, "year")}, ${plural(months, "month")} and ${plural(days, "day")}`;
