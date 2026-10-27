// Text for each subject's CBT practice page, built from its question bank.
// Plain JS (no JSX) so scripts/buildSeoStatic.mjs can produce the same
// crawler text the page shows.
import { SUBJECTS, topicsOf, LETTERS, SECONDS_PER_QUESTION } from "../../utils/cbt/index.js";

export const CBT_PATH = "/jamb-cbt-practice";
export const CBT_SECTION = { name: "JAMB CBT Practice", path: CBT_PATH };

export const CBT_TOOLS = [
  { path: CBT_PATH, name: "JAMB CBT Practice Test", short: "All subjects" },
  ...SUBJECTS.map((s) => ({
    path: `${CBT_PATH}/${s.slug}`,
    name: `JAMB ${s.name} CBT Practice`,
    short: s.name
  }))
];

const TIPS = {
  mathematics: [
    "Learn the formulas that come up every year: the nth term and sum of an AP and GP, sum to infinity, the remainder theorem, areas and volumes, and the distance and gradient formulas.",
    "Check an answer by substituting it back. For equations, inequalities and factorisation questions this is often faster than solving from scratch.",
    "Watch the wording: percentage profit is on the cost price, \"without replacement\" changes the second probability, and order matters for permutations but not combinations.",
    "Do the short questions first. Flag long statistics or mensuration questions and come back once the quick marks are safe."
  ],
  physics: [
    "Use g = 10 m/s² unless the question gives another value, and convert to SI units (cm to m, μF to F, °C to K for gas laws) before you substitute.",
    "Most calculation questions are a single formula. Write down the formula first, then put in the numbers, so you don't mix up similar ones like Q = CV and E = ½CV².",
    "Inverse-square laws (gravitation, Coulomb's law, intensity) and ratios (transformers, Hooke's law, gas laws) can often be answered without a calculator.",
    "Learn the definitions and units: many questions only ask which quantity is a vector, what an alpha particle is, or which unit goes with which quantity."
  ],
  chemistry: [
    "Get comfortable with the IUPAC names the UTME uses, such as tetraoxosulfate(VI) for sulfate and trioxocarbonate(IV) for carbonate.",
    "Mole calculations are the backbone of the paper: moles = mass ÷ molar mass, 22.4 dm³ per mole at s.t.p., and always use the mole ratio from the balanced equation.",
    "For equilibrium questions, apply Le Chatelier's principle: count the gas moles on each side for pressure and check the sign of ΔH for temperature.",
    "Memorise the tests for gases and ions (lime water, litmus, glowing splint, flame colours); they are quick marks."
  ],
  biology: [
    "Read every option. Biology questions often hinge on one word, such as the pulmonary vein (oxygenated) versus the pulmonary artery (deoxygenated).",
    "Learn the classic pairs that get swapped: tendon and ligament, xylem and phloem, rods and cones, insulin and glucagon, mitosis and meiosis.",
    "Practise genetic crosses until they are automatic. Monohybrid ratios (3 : 1 and 1 : 2 : 1) and AS × AS crosses come up every year.",
    "Ecology carries a lot of marks: food chains and trophic levels, the nitrogen and carbon cycles, sampling tools and Nigeria's vegetation zones."
  ]
};

// A spread of questions across the bank, shown (with answers) on the page.
export function sampleQuestions(bank, n = 12) {
  const picks = [];
  for (let i = 0; i < n; i++) picks.push(bank[Math.floor((i * bank.length) / n)]);
  return picks;
}

export const optionLine = (q) => q.o.map((o, i) => `${LETTERS[i]}. ${o}`).join("   ");
export const answerLine = (q) => `Answer: ${LETTERS[q.a]} (${q.o[q.a]}). ${q.x}`;

export function subjectContent(s) {
  const topics = topicsOf(s.bank);
  const n = s.bank.length;
  const name = s.name;
  const lower = name.toLowerCase();

  return {
    path: `${CBT_PATH}/${s.slug}`,
    title: `JAMB ${name} CBT Practice Test: Free Questions with Answers | StudentToolsNG`,
    description: `Free JAMB ${name} CBT practice online: ${n} UTME-style ${lower} questions with answers and explanations, a timer at real exam pace, a question navigator and a score by topic.`,
    keywords: `JAMB ${lower} CBT practice, JAMB ${lower} questions and answers, UTME ${lower} practice questions, JAMB ${lower} past questions, free JAMB CBT practice online`,
    h1: `JAMB ${name} CBT Practice Test`,
    intro: `Practise UTME ${name} on a computer-based test that works like the real one: timed questions, a navigator to jump between them, and a full review with the correct answer and an explanation for every question.`,
    sections: [
      {
        h2: `About these JAMB ${name} questions`,
        paras: [
          `There are ${n} questions in this ${lower} bank, written by StudentToolsNG to the topics in the JAMB UTME ${name} syllabus and at the level of the exam. They are original practice questions, not copies of JAMB past papers, so you can practise without memorising old answers.`,
          `Each test picks questions at random and shuffles the options, so the answer to a question is not always in the same position. You get ${SECONDS_PER_QUESTION} seconds a question, the same pace as the UTME, where 180 questions are answered in 2 hours.`
        ]
      },
      {
        h2: `Topics covered`,
        paras: [`The questions cover ${topics.length} topics from the syllabus:`],
        items: topics.map((t) => `${t.name} (${t.count} question${t.count > 1 ? "s" : ""})`)
      },
      {
        h2: `Tips for JAMB ${name}`,
        paras: [],
        items: TIPS[s.slug] || []
      }
    ],
    samples: sampleQuestions(s.bank),
    faq: [
      {
        q: `Are these JAMB ${name} past questions?`,
        a: `No. They are original questions written to the JAMB ${name} syllabus in the same style and at the same level as the UTME. Practising on new questions shows whether you understand a topic rather than whether you remember an old answer.`
      },
      {
        q: `How many questions are in the JAMB ${name} paper?`,
        a: `Each of your three other subjects has 40 questions in the UTME, and Use of English has 60, making 180 questions in 2 hours. That is about 40 seconds a question, which is the pace this practice test uses.`
      },
      {
        q: `How is JAMB ${name} scored?`,
        a: `Each subject is scored out of 100 and the four subjects add up to your UTME score out of 400. The percentage you get in this practice test is a rough guide to your score out of 100 in ${lower}.`
      },
      {
        q: "Can I practise without a time limit?",
        a: "Yes. Choose Study mode to see the correct answer and the explanation as soon as you pick an option, with no timer. Switch to the timed test once you are ready to practise at exam pace."
      }
    ]
  };
}
