// Text for each university's aggregate page, built from its data. Plain
// JS (no JSX) so scripts/buildSeoStatic.mjs can produce the same crawler
// text the page shows.
import { UNIVERSITIES, computeAggregate } from "../../utils/aggregate.js";

export const AGG_PATH = "/aggregate-score-calculator";
export const AGG_SECTION = { name: "Aggregate Score Calculators", path: AGG_PATH };

export const AGG_TOOLS = [
  { path: AGG_PATH, name: "Aggregate Score Calculator", short: "All schools" },
  ...UNIVERSITIES.map((u) => ({
    path: `${AGG_PATH}/${u.slug}`,
    name: `${u.short} Aggregate Score Calculator`,
    short: u.short
  }))
];

const round2 = (x) => Math.round(x * 100) / 100;

const formulaLine = (u) => {
  const w = u.weights;
  const parts = [];
  if (w.utme) parts.push(w.utme === 50 ? "UTME ÷ 8" : `UTME ÷ 400 × ${w.utme}`);
  if (w.post) parts.push(u.postMax === w.post ? `post-UTME (out of ${w.post})` : w.post === 50 ? "post-UTME ÷ 2" : `post-UTME ÷ ${u.postMax} × ${w.post}`);
  if (w.olevel) parts.push(`O'level points (out of ${w.olevel})`);
  return `Aggregate = ${parts.join(" + ")}`;
};

const split = (u) => {
  const w = u.weights;
  return [w.utme && `UTME ${w.utme}%`, w.post && `post-UTME ${w.post}%`, w.olevel && `O'level ${w.olevel}%`]
    .filter(Boolean)
    .join(", ");
};

export function universityContent(u) {
  const ex = u.example;
  const worked = computeAggregate(u.weights, { ...ex, postMax: u.postMax });
  const total = round2(worked.total);
  const usesOlevel = u.weights.olevel > 0;
  const usesPost = u.weights.post > 0;

  const sections = [
    {
      h2: `How ${u.short} calculates your aggregate score`,
      paras: [`${formulaLine(u)}. The weighting is ${split(u)}.`],
      items: u.notes
    },
    {
      h2: `${u.short} aggregate score worked example`,
      paras: [
        `A candidate with ${ex.utme} in UTME` +
          (usesPost ? ` and ${ex.post} in the post-UTME test (out of ${u.postMax})` : "") +
          (usesOlevel ? ` and O'level grades ${ex.grades.join(", ")}` : "") +
          ` scores:`
      ],
      items: worked.steps,
      after: u.scale400 ? [`Out of 400 this is ${total} × 4 = ${round2(total * 4)}.`] : []
    },
    {
      h2: `What aggregate score do I need for ${u.short}?`,
      paras: [
        `There is no single pass mark. After screening, ${u.short} publishes departmental cut-off marks for each course, and they change from year to year with the number of applicants. Competitive courses such as Medicine, Law, Nursing and Pharmacy always need a much higher aggregate than the general cut-off.`,
        `Enter last year's cut-off for your course as the target in the calculator to see the ${usesPost ? "post-UTME" : "UTME"} score you would need to reach it.`
      ]
    },
    {
      h2: "Before you rely on the result",
      paras: [
        `${/^University/.test(u.name) ? `The ${u.name}` : u.name} does not publish one fixed formula that stays the same every year. This calculator uses the method most widely reported for recent screening exercises. Compare it with the formula in ${u.short}'s current post-UTME or screening notice, and if the weights differ, change them under "Change the formula" and the result updates.`
      ]
    }
  ];

  const faq = [
    {
      q: `How is the ${u.short} aggregate score calculated?`,
      a: `${u.summary} In short: ${formulaLine(u)}.`
    },
    {
      q: `Does ${u.short} add O'level grades to the aggregate?`,
      a: usesOlevel
        ? `Yes. O'level grades are worth ${u.weights.olevel} of the 100 marks, so a better grade in each required subject raises your aggregate. Grades below C6 earn no points and usually mean you don't meet the course requirements.`
        : `Not in this formula. Your O'level result decides whether you qualify for the course (normally five credits including English Language and Mathematics), but it doesn't add marks to the aggregate.`
    },
    usesPost
      ? {
          q: `How much does the ${u.short} post-UTME score count?`,
          a: `The post-UTME is worth ${u.weights.post} of the 100 marks. Each mark you gain in the test adds ${round2(u.weights.post / u.postMax)} to your aggregate, against ${round2(u.weights.utme / 400)} for each UTME mark.`
        }
      : {
          q: `Does ${u.short} hold a post-UTME test?`,
          a: `${u.short} has been reported to screen with UTME and O'level results instead of a scored written test. If your year has a test, use the custom formula on the main aggregate calculator page.`
        }
  ];

  return {
    path: `${AGG_PATH}/${u.slug}`,
    title: `${u.short} Aggregate Score Calculator: Formula & Worked Example | StudentToolsNG`,
    description: `Calculate your ${u.short} (${u.name}) aggregate score from your UTME${usesPost ? ", post-UTME" : ""}${usesOlevel ? " and O'level grades" : ""}, see the formula and a worked example, and find the score you need for your course.`,
    keywords: `${u.short} aggregate score calculator, how to calculate ${u.short} aggregate score, ${u.short} post UTME aggregate, ${u.name} aggregate score, ${u.short} screening score`,
    h1: `${u.short} Aggregate Score Calculator`,
    intro: u.summary,
    sections,
    faq
  };
}
