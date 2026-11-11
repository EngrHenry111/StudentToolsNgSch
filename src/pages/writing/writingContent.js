// Registry for the writing guides and tools. Plain JS so
// scripts/buildSeoStatic.mjs can import it.
import { applicationLetter } from "./guides/applicationLetter.js";
import { JOB_LETTERS } from "./guides/jobLetters.js";
import { coverLetter } from "./guides/coverLetter.js";
import { CV_GUIDES } from "./guides/cvGuides.js";
import { SCHOOL_LETTERS } from "./guides/schoolLetters.js";
import { OTHER_LETTERS } from "./guides/otherLetters.js";
import { ESSAYS } from "./guides/essays.js";

export const WR_PATH = "/writing-guides";
export const WR_SECTION = { name: "Writing Guides", path: WR_PATH };

export const GUIDES = [applicationLetter, coverLetter, ...JOB_LETTERS, ...CV_GUIDES, ...SCHOOL_LETTERS, ...OTHER_LETTERS, ...ESSAYS];

export const GROUP_ORDER = ["Job Letters", "Application Letter Samples", "CV", "School Letters (WAEC)", "Other Letters", "Essays and Composition"];

export const WR_TOOLS_LIST = [
  {
    path: "/cv-builder",
    name: "CV Builder",
    blurb: "Build a clean, recruiter-friendly CV in your browser and save it as a PDF."
  },
  {
    path: "/letter-generator",
    name: "Letter Generator",
    blurb: "Fill in a short form and get a ready-to-print application, resignation or permission letter."
  }
];

export const guideByPath = (path) => GUIDES.find((g) => g.path === path);

// Related links, keeping only pages that exist (later guides may be listed
// before they are written).
export const relatedOf = (g) =>
  g.related
    .map((p) => GUIDES.find((x) => x.path === p) || WR_TOOLS_LIST.find((x) => x.path === p))
    .filter(Boolean)
    .map((x) => ({ path: x.path, name: x.h1 || x.name }));

// Tool switcher shown under the breadcrumb on each guide.
export const toolsFor = (g) => [
  { path: WR_PATH, name: "Writing Guides", short: "All guides" },
  { path: g.path, name: g.h1, short: g.short },
  ...relatedOf(g).slice(0, 3).map((r) => ({ path: r.path, name: r.name, short: (GUIDES.find((x) => x.path === r.path) || {}).short || r.name }))
];

export function hubContent() {
  const groups = GROUP_ORDER.map((name) => ({
    name,
    guides: GUIDES.filter((g) => g.group === name).map((g) => ({ path: g.path, name: g.h1, blurb: g.description }))
  })).filter((g) => g.guides.length);

  return {
    path: WR_PATH,
    title: "Letter, CV and Essay Writing Guides With Samples",
    description: "Free writing guides for Nigerian students and job seekers: application letters, CVs, WAEC letter formats, essays, speeches and reports, with samples.",
    h1: "Writing Guides: Letters, CVs and Essays",
    intro:
      "Clear, correct writing gets you jobs, admissions and good WAEC English marks. These guides show the exact format for each kind of letter, CV and essay, explain what to write in every paragraph, and give complete samples you can adapt. Use the Letter Generator and CV Builder to produce a ready-to-print letter or CV in a few minutes.",
    groups,
    sections: [
      {
        h2: "How to use these guides",
        paras: [
          "Start with the format section of the guide you need, then read the sample letter all the way through. Change the names, details and examples to your own: employers and examiners can spot copied letters easily, and your own real examples are always more convincing.",
          "Every guide ends with common questions, and links to related guides, so you can move from an application letter to a CV or cover letter without searching again."
        ]
      },
      {
        h2: "Rules that apply to every formal letter",
        paras: [],
        items: [
          "Put your address and the date at the top, and the receiver's address on the left.",
          "Match the greeting and the close: Dear Sir/Madam goes with Yours faithfully, and a named greeting (Dear Mrs Okafor) goes with Yours sincerely.",
          "Give the letter a clear heading that says what it is about.",
          "Keep paragraphs short and stay polite and direct.",
          "Proofread before you send: spelling and grammar mistakes create a poor impression."
        ]
      }
    ],
    faq: [
      { q: "What is the difference between a formal and an informal letter?", a: "A formal letter is written to an organisation or someone in an official role. It has two addresses, a heading, and ends with 'Yours faithfully'. An informal letter is written to a friend or relative, has only your address, no heading, and ends with something like 'Yours sincerely' or 'Your friend'." },
      { q: "Are these sample letters free to use?", a: "Yes. They are free examples written for StudentToolsNG. Use them as a guide and replace every detail with your own." }
    ]
  };
}
