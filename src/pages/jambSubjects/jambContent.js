// Text for the JAMB subject combination pages. Plain JS (no JSX) so
// scripts/buildSeoStatic.mjs can produce the same crawler text the pages
// show. Titles carry the coming UTME year (utils/seoYear.js).
import { COURSES, FACULTIES, courseBySlug } from "./courseInfo.js";
import { BROCHURE, BROCHURE_DATE } from "./brochureData.js";
import { utmeYear } from "../../utils/seoYear.js";
import { departmentBySlug, topicCount } from "../projectTopics/departments.js";

// JAMB course slug -> project topics department slug, where they differ.
// Courses whose slug matches a department slug link without an entry here.
const TOPIC_DEPT = {
  english: "english-language",
  "electrical-electronics-engineering": "electrical-engineering",
  "cyber-security": "computer-science",
  "software-engineering": "computer-science",
  "information-technology": "computer-science",
  "medical-laboratory-science": "microbiology",
  "computer-engineering": "electrical-engineering",
  agriculture: "agricultural-economics"
};

// The matching project topics page for a course, or null.
export function topicsFor(c) {
  const d = departmentBySlug(TOPIC_DEPT[c.slug] || c.slug);
  if (!d) return null;
  return {
    path: `/project-topics/${d.slug}`,
    name: d.name,
    text: `Looking ahead to your final year? Browse ${topicCount(d)} original ${d.name.toLowerCase()} project topics, with tips on choosing one and research guides you can use.`
  };
}

export const JS_PATH = "/jamb-subject-combination";
export const JS_SECTION = { name: "JAMB Subject Combination", path: JS_PATH };
export const IBASS_URL = "https://ibass.jamb.gov.ng";

export const JS_TOOLS = [
  { path: JS_PATH, name: "JAMB Subject Combination and Course Finder", short: "All courses" },
  ...COURSES.map((c) => ({ path: `${JS_PATH}/${c.slug}`, name: `${c.name} Subject Combination`, short: c.short || c.name }))
];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const brochureDateText = () => {
  const [y, m] = BROCHURE_DATE.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
};

const fit = (s, n) => (s.length <= n ? s : s.slice(0, n - 1).replace(/[\s,;:]+\S*$/, "") + "…");

const mathsAnswer = (c) => {
  const slots = c.rule.map((slot) => slot.length === 1 && slot[0] === "Mathematics");
  if (slots.some(Boolean)) {
    return `Yes. Mathematics is one of the UTME subjects for ${c.name} at most universities, alongside Use of English.`;
  }
  if (c.rule.some((slot) => slot.includes("Mathematics"))) {
    return `Not always. For ${c.name}, Mathematics is one of the subjects you can choose, but it is not required at most universities. Check the O'level requirement too, because Mathematics is usually needed there.`;
  }
  return `No. Mathematics is not one of the usual UTME subjects for ${c.name}, but most universities still want at least a pass, and often a credit, in Mathematics at O'level.`;
};

export function courseContent(c, year = utmeYear()) {
  const schools = BROCHURE[c.slug] || [];
  const n = schools.length;
  const titleBase = `${c.short || c.name} JAMB Subject Combination ${year}`;
  const title = `${titleBase} & O'Level`.length <= 65 ? `${titleBase} & O'Level` : titleBase;

  const sections = [
    {
      h2: `UTME subjects for ${c.name}`,
      paras: [
        `Most universities ask for ${c.combo}. Use of English is compulsory for every course in the UTME, so it is always one of your four subjects.`,
        `This is the combination used by most of the ${n} universities below, taken from JAMB's own brochure. If your first-choice school differs, follow your school.`
      ]
    },
    {
      h2: `O'level requirements for ${c.name}`,
      paras: [
        c.olevel,
        "A credit means A1 to C6 in WAEC, NECO or NABTEB. Most schools accept results from at most two sittings, but some insist on one sitting, and the subjects you pass at credit level should match the course."
      ]
    }
  ];
  if (c.notes.length) {
    sections.push({ h2: "Where universities differ", paras: [], items: c.notes });
  }

  const after = [
    {
      h2: `Direct Entry into ${c.name}`,
      paras: [
        "Direct Entry candidates usually need passes in two or three A-level, IJMB or JUPEB subjects related to the course, or a good National Diploma or NCE in a related field, together with the O'level requirements above. Some schools do not accept ND or NCE for certain courses, so check your school's Direct Entry rules on IBASS before you register."
      ]
    },
    {
      h2: `What can you do with a ${c.name} degree?`,
      paras: [],
      items: c.careers
    },
    {
      h2: "Before you register",
      paras: [],
      items: [
        "Choose your subjects for your first-choice university. If its combination is stricter than the others, use the stricter one so you stay eligible everywhere you apply.",
        "Make sure your O'level credits cover the same subjects, because schools check both during screening.",
        `Confirm the course and your school on JAMB's IBASS portal (${IBASS_URL}) before you pay for registration, since schools can update their requirements.`
      ]
    }
  ];

  const faq = [
    { q: `What are the JAMB subjects for ${c.name}?`, a: `${c.combo}. A few universities differ, as listed on this page.` },
    { q: `Is Mathematics compulsory for ${c.name} in JAMB?`, a: mathsAnswer(c) },
    { q: `What O'level subjects do I need for ${c.name}?`, a: c.olevel },
    {
      q: "Where does this information come from?",
      a: `From JAMB's Integrated Brochure and Syllabus System (IBASS), read in ${brochureDateText()} for ${n} Nigerian universities. Schools can change their requirements, so confirm your choice on IBASS before you register.`
    }
  ];

  return {
    path: `${JS_PATH}/${c.slug}`,
    title,
    description: fit(`JAMB subject combination for ${c.name} (${year}): ${c.combo}. O'level requirements and what ${n} universities ask for.`, 160),
    keywords: [
      `jamb subject combination for ${c.name.toLowerCase()}`,
      `${c.name.toLowerCase()} jamb subjects`,
      `${c.name.toLowerCase()} jamb subject combination ${year}`,
      `utme subjects for ${c.name.toLowerCase()}`,
      `o level requirements for ${c.name.toLowerCase()}`,
      `requirements to study ${c.name.toLowerCase()} in nigeria`
    ].join(", "),
    h1: `JAMB Subject Combination for ${c.name} (${year})`,
    intro: c.intro,
    sections,
    schools,
    schoolsH2: `${c.name} requirements by university`,
    schoolsIntro: `What each university lists for ${c.name} in JAMB's brochure (${brochureDateText()}). Use of English is compulsory even where it is not written.`,
    after,
    faq,
    topics: topicsFor(c),
    related: c.related.map(courseBySlug).filter(Boolean).map((r) => ({ path: `${JS_PATH}/${r.slug}`, name: r.name }))
  };
}

export function hubContent(year = utmeYear()) {
  const faq = [
    {
      q: "How many subjects do I write in JAMB?",
      a: "Four. Use of English is compulsory for everyone, and the other three depend on the course you want to study."
    },
    {
      q: "Can I change my JAMB subject combination after registration?",
      a: "Plan as if you cannot. Once you have written the UTME, your subjects and scores are fixed, so check your course's combination on this page and on IBASS before you register. You can still change your course or institution later through JAMB, but only to one that your subjects qualify you for."
    },
    {
      q: "Is Mathematics compulsory in JAMB?",
      a: "No. Only Use of English is compulsory. Mathematics is required for science, engineering, computing and most management courses, but not for most Arts courses such as Law, English or History."
    },
    {
      q: "Where does this information come from?",
      a: `From JAMB's Integrated Brochure and Syllabus System (IBASS), read in ${brochureDateText()} for 18 Nigerian universities. Always confirm your final choice on IBASS.`
    }
  ];

  return {
    path: JS_PATH,
    title: `JAMB Subject Combination for All Courses ${year} + Course Finder`,
    description: `JAMB subject combinations and O'level requirements for ${COURSES.length} popular courses (${year}), from JAMB's brochure, plus a finder that shows what you can study.`,
    keywords: [
      "jamb subject combination",
      `jamb subject combination for all courses ${year}`,
      "jamb subject combination for science courses",
      "jamb subject combination for art courses",
      "courses i can study with my jamb subjects",
      "o level requirements for courses in nigeria"
    ].join(", "),
    h1: `JAMB Subject Combination for All Courses (${year})`,
    intro: `Pick your three UTME subjects below to see the courses you can apply for, or open any course to see its subject combination, O'level requirements and what each of 18 universities asks for. Use of English is compulsory for every course.`,
    faculties: FACULTIES.map((f) => ({
      name: f,
      courses: COURSES.filter((c) => c.faculty === f).map((c) => ({ path: `${JS_PATH}/${c.slug}`, name: c.name, combo: c.combo }))
    })),
    sections: [
      {
        h2: "How JAMB subject combinations work",
        paras: [
          "Every UTME candidate writes four subjects. Use of English is compulsory, and the other three must match what your chosen course requires. JAMB publishes these requirements, school by school, in its brochure on the IBASS portal.",
          "Your O'level result matters just as much: you need credits in the subjects your course lists, usually including English Language and Mathematics. A high UTME score cannot make up for a missing O'level credit."
        ]
      },
      {
        h2: "Choosing your subjects",
        paras: [],
        items: [
          "Decide on your course first, then pick the subjects, not the other way round.",
          "If you are torn between two courses, choose a combination that works for both. Physics, Chemistry and Biology, for example, keeps Medicine, Nursing, Pharmacy and most health courses open.",
          "Check your first-choice university, because a few schools are stricter than the general rule.",
          "Confirm on IBASS before you pay for registration."
        ]
      }
    ],
    faq
  };
}
