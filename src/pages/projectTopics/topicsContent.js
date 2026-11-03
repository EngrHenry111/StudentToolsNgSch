// Text for the project topic pages, built from departments.js. Plain JS (no
// JSX) so scripts/buildSeoStatic.mjs can produce the same crawler text the
// pages show. Titles and keywords carry the current academic session
// (utils/seoYear.js), so they move on by themselves each September.
import { DEPARTMENTS, topicCount } from "./departments.js";
import { academicSession, sessionYears } from "../../utils/seoYear.js";

export const PT_PATH = "/project-topics";
export const PT_SECTION = { name: "Project Topics", path: PT_PATH };
export const GUIDE_BASE = "/publishers/engrhenrytech-publishing";

export const PT_TOOLS = [
  { path: PT_PATH, name: "Final Year Project Topics", short: "All departments" },
  ...DEPARTMENTS.map((d) => ({
    path: `${PT_PATH}/${d.slug}`,
    name: `${d.name} Project Topics`,
    short: d.short || d.name
  }))
];

const TOTAL = DEPARTMENTS.reduce((n, d) => n + topicCount(d), 0);

export function departmentContent(d, year = academicSession()) {
  const [y1, y2] = sessionYears();
  const n = topicCount(d);
  const lower = d.name.toLowerCase();
  const [broad, narrow] = d.narrow;
  const examples = d.groups.slice(0, 3).map((g) => g.topics[0]);

  const sections = [
    {
      h2: `How to choose a good ${lower} project topic`,
      paras: [],
      items: d.tips
    },
    {
      h2: `Research methods for ${lower} projects`,
      paras: [d.methods]
    },
    {
      h2: "Narrow your topic before you submit it",
      paras: [
        `A topic that is too broad is the most common reason supervisors send topics back. Add a place, a group of people and, where it helps, a time period. Instead of "${broad}", propose something like "${narrow}".`,
        "Before you submit, check that the topic has not been done recently in your department, that you can collect the data in time, and that your supervisor agrees with the case study."
      ]
    }
  ];

  const faq = [
    {
      q: `What are good ${lower} project topics for the ${year} session?`,
      a: `Good topics are current, narrow enough to finish in one session and have data you can collect. Examples from this list include "${examples[0]}", "${examples[1]}" and "${examples[2]}".`
    },
    {
      q: `How do I narrow down a ${lower} project topic?`,
      a: `Add a place, a group and a time frame. For example, instead of "${broad}", write "${narrow}".`
    },
    {
      q: `Can I use these ${lower} project topics?`,
      a: "Yes. They are free, original topic ideas written for StudentToolsNG. Your department must approve your final topic, so discuss it with your supervisor, check it has not been done recently, and change the case study to a place you can reach."
    },
    {
      q: `Where can I get ${lower} project materials?`,
      a: d.guides.length
        ? `For some of these topics, StudentToolsNG's Research Library has project guides with a model Chapter 1, a literature review map, the methodology and a questionnaire, which you adapt and complete with your own data.`
        : "Start with your department's library of past projects, Google Scholar and the journals your lecturers recommend. Write your own chapters from what you read."
    }
  ];

  return {
    path: `${PT_PATH}/${d.slug}`,
    title: `${d.name} Project Topics ${year} (${n} Ideas)`,
    description: `${n} original ${lower} project topics for final year students in Nigeria (${year}), grouped by area, plus tips on topic choice and methods.`,
    keywords: [
      `${lower} project topics`,
      `${lower} project topics ${year}`,
      `${lower} project topics ${y1}`,
      `${lower} project topics ${y2}`,
      `final year project topics for ${lower} students`,
      `${lower} research topics`,
      `${lower} project topics in Nigeria`,
      `new ${lower} project topics`,
      `${lower} project topics and materials`
    ].join(", "),
    h1: `${d.name} Project Topics for Final Year Students (${year})`,
    intro: d.intro,
    groups: d.groups,
    sections,
    faq,
    guides: d.guides.map(([slug, title]) => ({ path: `${GUIDE_BASE}/${slug}`, title }))
  };
}

export function hubContent(year = academicSession()) {
  const [y1, y2] = sessionYears();
  const faq = [
    {
      q: "How do I choose a final year project topic?",
      a: "Pick an area you enjoy from your courses, look for a current problem in it, and make sure you can collect the data. Then narrow it with a place, a group of people and a time period, and discuss it with your supervisor before you start."
    },
    {
      q: "How many project topics should I submit?",
      a: "Most departments ask for two or three. Submit topics from different areas, so that if one has been done before or lacks data, the others can still be approved."
    },
    {
      q: "Are these project topics free?",
      a: "Yes. Every topic on these pages is a free, original idea written for StudentToolsNG. Your department still has to approve the final topic."
    }
  ];

  return {
    path: PT_PATH,
    title: `Final Year Project Topics ${year} for Nigerian Students`,
    description: `${TOTAL} free, original final year project topics (${year}) for Accounting, Nursing, Computer Science, Economics, Education and more, with tips on choosing one.`,
    keywords: [
      "final year project topics",
      `project topics ${year}`,
      `final year project topics ${y1}`,
      `final year project topics ${y2}`,
      "project topics for final year students in Nigeria",
      "research project topics",
      "undergraduate project topics",
      "project topics by department",
      "new project topics and materials"
    ].join(", "),
    h1: `Final Year Project Topics for Nigerian Students (${year})`,
    intro: `Browse ${TOTAL} original project topics for ${DEPARTMENTS.length} departments. Each department page groups its topics by area and explains how to narrow a topic, which research methods suit it, and where to find guides.`,
    departments: DEPARTMENTS.map((d) => ({
      path: `${PT_PATH}/${d.slug}`,
      name: d.name,
      count: topicCount(d)
    })),
    sections: [
      {
        h2: "What makes a good project topic",
        paras: [],
        items: [
          "It is current: it deals with a problem people care about now, such as inflation, insecurity, digital banking or public health.",
          "It is specific: it names a place, a group of people and, where useful, a time period.",
          "It is researchable: you can collect the data you need within one session and your budget.",
          "It is original enough: it has not been done in the same way in your department in the last few years."
        ]
      },
      {
        h2: "From topic to approved project",
        paras: [
          "Write each topic as a clear title, then add two or three sentences on the problem, the people you will study and how you will collect data. This short proposal helps your supervisor approve a topic quickly. Once it is approved, start your Chapter 1 and literature review while the topic is fresh."
        ]
      }
    ],
    faq
  };
}
