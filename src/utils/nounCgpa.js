// NOUN (National Open University of Nigeria) GPA/CGPA maths. Pure functions.
// A course score is TMA (out of 30) + exam (out of 70); the total maps to the
// usual NUC 5-point letter grade. Degree classes follow the NUC bands.
import { NG_GRADES, degreeClass } from "./cgpaConvert";

export const TMA_MAX = 30;
export const EXAM_MAX = 70;

const POINTS = Object.fromEntries(NG_GRADES.map((g) => [g.grade, g.points5]));
const CUTS = [[70, "A"], [60, "B"], [50, "C"], [45, "D"], [40, "E"], [0, "F"]];

export const gradeFromScore = (total) => {
  if (!Number.isFinite(total) || total < 0 || total > 100) return null;
  return CUTS.find(([min]) => total >= min)[1];
};

const inRange = (x, max) => Number.isFinite(x) && x >= 0 && x <= max;

// rows: [{ units, grade } | { units, tma, exam }] (numbers, NaN when blank)
// prev: { cgpa, units } from earlier semesters (optional)
export function nounResult(rows, prev = {}) {
  const courses = [];
  for (const r of rows) {
    if (!Number.isFinite(r.units) || r.units <= 0) continue;
    let grade = r.grade;
    let total = null;
    if (!grade) {
      if (!inRange(r.tma, TMA_MAX) || !inRange(r.exam, EXAM_MAX)) continue;
      total = r.tma + r.exam;
      grade = gradeFromScore(total);
    }
    if (!(grade in POINTS)) continue;
    courses.push({ units: r.units, grade, total, points: POINTS[grade] * r.units });
  }
  const units = courses.reduce((a, c) => a + c.units, 0);
  if (!units) return null;
  const qp = courses.reduce((a, c) => a + c.points, 0);
  const gpa = qp / units;

  const hasPrev = inRange(prev.cgpa, 5) && Number.isFinite(prev.units) && prev.units > 0;
  const allUnits = units + (hasPrev ? prev.units : 0);
  const allQp = qp + (hasPrev ? prev.cgpa * prev.units : 0);
  const cgpa = allQp / allUnits;

  // Class from the 2-decimal CGPA the student actually sees.
  const shown = Math.round(cgpa * 100) / 100;
  return { courses, units, qp, gpa, hasPrev, allUnits, allQp, cgpa, degreeClass: degreeClass(shown, 5) };
}
