// Post-UTME aggregate score maths and the reported formula for each
// university. Pure functions, no React, so they can be unit-tested and used
// by scripts/buildSeoStatic.mjs.
//
// None of these universities publishes a fixed formula that stays the same
// every year; the weights below are the ones most widely reported for the
// 2025/2026 screening exercise. Every calculator lets the student change
// the weights, so a school that changes its method is one edit away.

// O'level grade → fraction of the marks for one subject. Every reported
// scale is this ladder scaled to the school's weight (e.g. A1 = 4, B2 = 3.6
// … C6 = 2 when O'level is worth 20 marks over 5 subjects).
export const OLEVEL_GRADES = [
  { grade: "A1", value: 1 },
  { grade: "B2", value: 0.9 },
  { grade: "B3", value: 0.8 },
  { grade: "C4", value: 0.7 },
  { grade: "C5", value: 0.6 },
  { grade: "C6", value: 0.5 },
  { grade: "D7", value: 0 },
  { grade: "E8", value: 0 },
  { grade: "F9", value: 0 }
];

const GRADE_VALUE = Object.fromEntries(OLEVEL_GRADES.map((g) => [g.grade, g.value]));

export const isCredit = (grade) => GRADE_VALUE[grade] > 0;

// Points one grade earns when O'level is worth `weight` marks over `subjects`.
export const gradePoints = (grade, weight, subjects) =>
  ((GRADE_VALUE[grade] ?? 0) * weight) / subjects;

const round2 = (x) => Math.round(x * 100) / 100;
const fmt = (x) => String(round2(x));

// weights: { utme, post, olevel } summing to 100.
// input: { utme (0-400), post, postMax, grades: ["A1", …] }
// Returns each part, the total out of 100 and the working.
export function computeAggregate(weights, input) {
  const { utme, post, postMax = 100, grades = [] } = input;
  const subjects = grades.length || 5;
  const parts = [];
  const steps = [];
  const missing = [];

  if (weights.utme > 0) {
    if (Number.isFinite(utme)) {
      const v = (utme / 400) * weights.utme;
      parts.push({ key: "utme", label: "UTME", value: v, max: weights.utme });
      steps.push(
        weights.utme === 50
          ? `UTME: ${utme} ÷ 8 = ${fmt(v)} (out of 50)`
          : `UTME: ${utme} ÷ 400 × ${weights.utme} = ${fmt(v)} (out of ${weights.utme})`
      );
    } else missing.push("utme");
  }

  if (weights.post > 0) {
    if (Number.isFinite(post)) {
      const v = (post / postMax) * weights.post;
      parts.push({ key: "post", label: "Post-UTME", value: v, max: weights.post });
      steps.push(
        postMax === weights.post
          ? `Post-UTME: ${post} out of ${postMax} = ${fmt(v)}`
          : postMax === 100 && weights.post === 50
            ? `Post-UTME: ${post} ÷ 2 = ${fmt(v)} (out of 50)`
            : `Post-UTME: ${post} ÷ ${postMax} × ${weights.post} = ${fmt(v)} (out of ${weights.post})`
      );
    } else missing.push("post");
  }

  if (weights.olevel > 0) {
    const each = weights.olevel / subjects;
    const pts = grades.map((g) => gradePoints(g, weights.olevel, subjects));
    const v = pts.reduce((a, b) => a + b, 0);
    parts.push({ key: "olevel", label: "O'level", value: v, max: weights.olevel });
    steps.push(
      `O'level: ${grades.map((g, i) => `${g} = ${fmt(pts[i])}`).join(", ")} → total ${fmt(v)} (out of ${weights.olevel}; A1 = ${fmt(each)} per subject)`
    );
  }

  const total = parts.reduce((a, p) => a + p.value, 0);
  if (!missing.length) steps.push(`Aggregate = ${parts.map((p) => fmt(p.value)).join(" + ")} = ${fmt(total)} out of 100`);

  return { parts, total: missing.length ? null : total, steps, missing };
}

// Score needed in one part (post-UTME if the school uses it, else UTME) to
// reach a target aggregate, given the other parts. Returns
// { key, label, needed, max } where needed may exceed max (unreachable) or
// be ≤ 0 (already reached).
export function requiredFor(weights, input, target) {
  const key = weights.post > 0 ? "post" : "utme";
  const others = computeAggregate(weights, { ...input, [key]: 0 });
  if (others.total === null) return null;
  const gap = target - others.total;
  if (key === "post") {
    const postMax = input.postMax || 100;
    return { key, label: "post-UTME", needed: (gap / weights.post) * postMax, max: postMax };
  }
  return { key, label: "UTME", needed: (gap / weights.utme) * 400, max: 400 };
}

// Reported formulas. `scale400` = the school usually quotes aggregates out
// of 400 (the same result × 4). Notes are school-specific screening facts;
// keep them hedged — they change every year.
export const UNIVERSITIES = [
  {
    slug: "unilag",
    short: "UNILAG",
    name: "University of Lagos",
    weights: { utme: 50, post: 30, olevel: 20 },
    postMax: 30,
    example: { utme: 280, post: 22, grades: ["A1", "B2", "B3", "C4", "C6"] },
    summary:
      "UNILAG combines three parts: your UTME score converted to 50 marks, your post-UTME screening test scored out of 30, and your five O'level credits worth up to 20 marks.",
    notes: [
      "The UTME part is your JAMB score divided by 8, so 400 becomes 50.",
      "The post-UTME test is reported to be marked out of 30 and added as it is. Candidates who score very low in the test are reported to be disqualified whatever their UTME score.",
      "O'level points are A1 = 4, B2 = 3.6, B3 = 3.2, C4 = 2.8, C5 = 2.4 and C6 = 2 for five subjects, including English Language and Mathematics.",
      "UNILAG has asked for a UTME score of at least 200 with UNILAG as first choice before you can apply for screening."
    ]
  },
  {
    slug: "ui",
    short: "UI",
    name: "University of Ibadan",
    weights: { utme: 50, post: 50, olevel: 0 },
    postMax: 100,
    example: { utme: 256, post: 67, grades: [] },
    summary:
      "UI gives your UTME score and your post-UTME test equal weight: UTME divided by 8 plus post-UTME divided by 2, for a total out of 100. O'level grades are used to check that you qualify, not to add marks.",
    notes: [
      "The UTME part is your JAMB score divided by 8 (out of 50).",
      "The post-UTME test is scored out of 100 and divided by 2 (out of 50).",
      "Your O'level result must still meet the course requirements, usually five credits including English Language and Mathematics at not more than two sittings.",
      "UI has required a UTME score of at least 200 with UI as first choice to apply for screening."
    ]
  },
  {
    slug: "oau",
    short: "OAU",
    name: "Obafemi Awolowo University",
    weights: { utme: 50, post: 40, olevel: 10 },
    postMax: 100,
    example: { utme: 260, post: 62, grades: ["A1", "B3", "B2", "C4", "C5"] },
    summary:
      "OAU is reported to use a 50 : 40 : 10 split: your UTME score is worth 50 marks, the post-UTME test 40 and your O'level grades 10.",
    notes: [
      "The UTME part is your JAMB score divided by 8 (out of 50).",
      "The post-UTME score is scaled to 40 marks. If your result slip shows a score out of 40, set \"out of\" to 40.",
      "O'level points are A1 = 2, B2 = 1.8, B3 = 1.6, C4 = 1.4, C5 = 1.2 and C6 = 1 across five subjects (10 marks).",
      "Sources disagree on OAU's method, so compare this with the formula in OAU's current screening notice."
    ]
  },
  {
    slug: "unn",
    short: "UNN",
    name: "University of Nigeria, Nsukka",
    weights: { utme: 60, post: 0, olevel: 40 },
    postMax: 100,
    scale400: true,
    subjects: 4,
    example: { utme: 280, grades: ["C5", "B3", "B2", "C4"] },
    summary:
      "UNN is reported to screen with your UTME and O'level results instead of a written post-UTME test, weighted 60 : 40. UNN usually quotes the result out of 400.",
    notes: [
      "The UTME part is 60% of the aggregate.",
      "The O'level part is 40%, from the grades of your relevant subjects: A1 = 100, B2 = 90, B3 = 80, C4 = 70, C5 = 60, C6 = 50 points each (four subjects shown here; change the number if your faculty uses five).",
      "On the 400 scale this is UTME × 0.6 + O'level points × 0.4; the calculator shows the same result out of 100 and out of 400.",
      "UNN has sometimes held a written test instead. If yours does, use the custom formula on the main aggregate calculator."
    ]
  },
  {
    slug: "uniben",
    short: "UNIBEN",
    name: "University of Benin",
    weights: { utme: 50, post: 50, olevel: 0 },
    postMax: 100,
    example: { utme: 284, post: 76, grades: [] },
    summary:
      "UNIBEN is reported to weight the UTME and the post-UTME test equally: UTME divided by 8 plus post-UTME divided by 2, out of 100.",
    notes: [
      "The UTME part is your JAMB score divided by 8 (out of 50).",
      "The post-UTME is a computer-based test scored out of 100, then divided by 2 (out of 50).",
      "O'level results decide whether you qualify for the course; they are not added as marks in this formula."
    ]
  },
  {
    slug: "uniport",
    short: "UNIPORT",
    name: "University of Port Harcourt",
    weights: { utme: 50, post: 50, olevel: 0 },
    postMax: 100,
    scale400: true,
    example: { utme: 250, post: 84, grades: [] },
    summary:
      "UNIPORT is reported to weight the UTME and the post-UTME test equally. Some guides quote the result out of 100 (UTME ÷ 8 + post-UTME ÷ 2) and some out of 400; both give the same ranking.",
    notes: [
      "Out of 100: UTME ÷ 8 + post-UTME ÷ 2.",
      "Out of 400: (UTME + post-UTME × 4) ÷ 2, which is exactly 4 times the result out of 100.",
      "Departmental cut-off marks differ by faculty and change from year to year."
    ]
  },
  {
    slug: "unilorin",
    short: "UNILORIN",
    name: "University of Ilorin",
    weights: { utme: 50, post: 30, olevel: 20 },
    postMax: 100,
    example: { utme: 245, post: 58, grades: ["B2", "B3", "C4", "B3", "C5"] },
    summary:
      "UNILORIN is reported to combine three parts: UTME worth 50 marks, the post-UTME test worth 30 and O'level grades worth 20.",
    notes: [
      "The UTME part is your JAMB score divided by 8 (out of 50).",
      "The post-UTME score is scaled to 30 marks. If your result is already out of 30, set \"out of\" to 30.",
      "O'level points are A1 = 4, B2 = 3.6, B3 = 3.2, C4 = 2.8, C5 = 2.4 and C6 = 2 for five subjects.",
      "For the 2025 exercise UNILORIN's own bulletin asked for a UTME score of at least 180."
    ]
  },
  {
    slug: "lasu",
    short: "LASU",
    name: "Lagos State University",
    weights: { utme: 50, post: 0, olevel: 50 },
    postMax: 100,
    example: { utme: 275, grades: ["A1", "B2", "B2", "B3", "C4"] },
    summary:
      "LASU is reported to use a 50 : 50 split between your UTME score and your O'level grades, with no separate post-UTME test score.",
    notes: [
      "The UTME part is your JAMB score divided by 8 (out of 50).",
      "O'level points are A1 = 10, B2 = 9, B3 = 8, C4 = 7, C5 = 6 and C6 = 5 for five subjects (out of 50).",
      "If LASU holds a written screening test for your year, use the custom formula on the main aggregate calculator."
    ]
  },
  {
    slug: "abu",
    short: "ABU",
    name: "Ahmadu Bello University, Zaria",
    weights: { utme: 50, post: 50, olevel: 0 },
    postMax: 100,
    scale400: true,
    example: { utme: 230, post: 70, grades: [] },
    summary:
      "ABU is reported to average your UTME score and your post-UTME score after putting both on a 400 scale: (post-UTME × 4 + UTME) ÷ 2.",
    notes: [
      "Out of 400: (post-UTME × 4 + UTME) ÷ 2. Out of 100 this is UTME ÷ 8 + post-UTME ÷ 2.",
      "ABU also admits by catchment area and merit lists, so the same aggregate can be enough in one list and not in another."
    ]
  },
  {
    slug: "unical",
    short: "UNICAL",
    name: "University of Calabar",
    weights: { utme: 50, post: 50, olevel: 0 },
    postMax: 100,
    example: { utme: 240, post: 65, grades: [] },
    summary:
      "UNICAL is reported to average your UTME score and your post-UTME score, so each counts for half of the aggregate.",
    notes: [
      "Out of 100: UTME ÷ 8 + post-UTME ÷ 2.",
      "O'level results decide whether you qualify for the course; they are not added as marks in this formula."
    ]
  }
];

export const universityBySlug = (slug) => UNIVERSITIES.find((u) => u.slug === slug);

// Starting O'level grades for a school's calculator.
export const defaultGrades = (u) =>
  u.weights.olevel > 0 ? (u.example.grades.length ? u.example.grades : Array(u.subjects || 5).fill("B3")) : [];
