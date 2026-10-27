// CGPA conversions between grading scales, course-by-course conversion to
// the US-style 4.0 scale, percentages and class of degree. Pure functions.
//
// There is no single official conversion: WES, ECE and each foreign
// university use their own tables. These are the standard methods students
// are usually asked for, and the pages say so.

export const SCALES = [4, 5, 7, 10];

const round2 = (x) => Math.round(x * 100) / 100;

// Proportional conversion: same fraction of the maximum.
export function convertScale(cgpa, from, to) {
  if (!Number.isFinite(cgpa) || cgpa < 0 || cgpa > from) return null;
  return (cgpa / from) * to;
}

// Nigerian 5-point letter grades (NUC benchmark) and the 4.0 equivalent
// most evaluators give each one.
export const NG_GRADES = [
  { grade: "A", marks: "70–100", points5: 5, points4: 4 },
  { grade: "B", marks: "60–69", points5: 4, points4: 3 },
  { grade: "C", marks: "50–59", points5: 3, points4: 2 },
  { grade: "D", marks: "45–49", points5: 2, points4: 1 },
  { grade: "E", marks: "40–44", points5: 1, points4: 1 },
  { grade: "F", marks: "0–39", points5: 0, points4: 0 }
];

const BY_GRADE = Object.fromEntries(NG_GRADES.map((g) => [g.grade, g]));

// courses: [{ grade, units }] → GPA on both scales with working.
export function courseByCourse(courses) {
  const valid = courses.filter((c) => BY_GRADE[c.grade] && Number.isFinite(c.units) && c.units > 0);
  const units = valid.reduce((a, c) => a + c.units, 0);
  if (!units) return null;
  const qp5 = valid.reduce((a, c) => a + BY_GRADE[c.grade].points5 * c.units, 0);
  const qp4 = valid.reduce((a, c) => a + BY_GRADE[c.grade].points4 * c.units, 0);
  return {
    units,
    qp5,
    qp4,
    gpa5: qp5 / units,
    gpa4: qp4 / units,
    proportional4: (qp5 / units / 5) * 4
  };
}

export const toPercent = (cgpa, scale) =>
  Number.isFinite(cgpa) && cgpa >= 0 && cgpa <= scale ? (cgpa / scale) * 100 : null;

// Class of degree. Boundaries are the most common ones; each senate sets
// its own (some universities use 4.00 for First Class on the 5-point scale).
const CLASSES = {
  5: [
    [4.5, "First Class"],
    [3.5, "Second Class Upper (2:1)"],
    [2.4, "Second Class Lower (2:2)"],
    [1.5, "Third Class"],
    [1.0, "Pass"]
  ],
  // Nigerian universities on the 4-point scale.
  4: [
    [3.5, "First Class"],
    [3.0, "Second Class Upper (2:1)"],
    [2.0, "Second Class Lower (2:2)"],
    [1.0, "Third Class"]
  ]
};

// Polytechnic ND/HND classes on the 4-point scale.
const POLY = [
  [3.5, "Distinction"],
  [3.0, "Upper Credit"],
  [2.5, "Lower Credit"],
  [2.0, "Pass"]
];

export function degreeClass(cgpa, scale, { polytechnic = false } = {}) {
  const table = polytechnic ? POLY : CLASSES[scale];
  if (!table || !Number.isFinite(cgpa)) return null;
  for (const [min, name] of table) if (cgpa + 1e-9 >= min) return name;
  return polytechnic ? "Below pass" : "Fail";
}

export const CLASS_TABLES = { 5: CLASSES[5], 4: CLASSES[4], poly: POLY };

export const fmt2 = (x) => (Number.isFinite(x) ? round2(x).toFixed(2) : "–");
