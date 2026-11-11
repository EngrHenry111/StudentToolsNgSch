// Text for the degree class pages (CGPA for First Class, 2:1, 2:2, Third
// Class, and the polytechnic grading system). Plain JS so
// scripts/buildSeoStatic.mjs can produce the same crawler text. Boundaries
// match src/utils/cgpaConvert.js and the GPA Class Calculator.

export const DC_SECTION = { name: "Degree Class", path: "/gpa-class-calculator" };

// Nigerian university 5-point scale (the most common boundaries; each senate
// sets its own, so pages tell students to check their handbook).
export const UNI_CLASSES = [
  { name: "First Class", min: 4.5, max: 5.0 },
  { name: "Second Class Upper (2:1)", min: 3.5, max: 4.49 },
  { name: "Second Class Lower (2:2)", min: 2.4, max: 3.49 },
  { name: "Third Class", min: 1.5, max: 2.39 },
  { name: "Pass", min: 1.0, max: 1.49 }
];

export const UNI_GRADES = [
  ["70 – 100", "A", 5],
  ["60 – 69", "B", 4],
  ["50 – 59", "C", 3],
  ["45 – 49", "D", 2],
  ["40 – 44", "E", 1],
  ["0 – 39", "F", 0]
];

// Polytechnic (NBTE) 4-point scale.
export const POLY_CLASSES = [
  { name: "Distinction", min: 3.5, max: 4.0 },
  { name: "Upper Credit", min: 3.0, max: 3.49 },
  { name: "Lower Credit", min: 2.5, max: 2.99 },
  { name: "Pass", min: 2.0, max: 2.49 }
];

export const POLY_GRADES = [
  ["75 – 100", "A", 4.0],
  ["70 – 74", "AB", 3.5],
  ["65 – 69", "B", 3.25],
  ["60 – 64", "BC", 3.0],
  ["55 – 59", "C", 2.75],
  ["50 – 54", "CD", 2.5],
  ["45 – 49", "D", 2.25],
  ["40 – 44", "E", 2.0],
  ["0 – 39", "F", 0]
];

const range = (c) => `${c.min.toFixed(2)} to ${c.max.toFixed(2)}`;
const classTableItems = (classes) => classes.map((c) => `${c.name}: ${range(c)}`);
const gradeItems = (grades) => grades.map(([marks, g, p]) => `${marks} marks: grade ${g}, ${p} point${p === 1 ? "" : "s"}`);

const CALC_STEPS = [
  "Add up the credit units you have completed so far and note your current CGPA.",
  "Add up the credit units left until graduation (check your course outline for the remaining semesters).",
  "Required average = (target CGPA × total units − current CGPA × units done) ÷ units left."
];

// Shared tail sections.
const scaleSection = {
  h2: "The grading scale behind your CGPA",
  paras: [
    "Most Nigerian universities score each course out of 100 and turn the mark into grade points on a 5-point scale. Your CGPA is the average of those points, weighted by credit units. Some universities have dropped the E grade, so 40 to 44 is a fail there; check your handbook."
  ],
  items: gradeItems(UNI_GRADES)
};
const classesSection = {
  h2: "All degree classes on the 5-point scale",
  paras: [
    "These are the most common boundaries. Each university's senate sets its own, and a few universities use a 4-point scale instead, where First Class starts at 3.50."
  ],
  items: classTableItems(UNI_CLASSES)
};

export const DC_PAGES = [
  {
    slug: "first-class",
    path: "/cgpa-for-first-class",
    short: "First Class",
    scale: 5,
    target: 4.5,
    title: "CGPA for First Class in Nigeria (4.50) + Target Calculator",
    description: "First Class needs a CGPA of 4.50 to 5.00 on the 5-point scale at most Nigerian universities. See what GPA you still need and how to stay on track.",
    h1: "What CGPA Is First Class in Nigeria?",
    intro: "At most Nigerian universities, First Class is a final CGPA of 4.50 to 5.00 on the 5-point scale. It is the highest degree class and is usually earned by a small share of each graduating set. Use the calculator below to see the average GPA you need in your remaining semesters to graduate with First Class.",
    sections: [
      {
        h2: "First Class CGPA range",
        paras: [
          "On the 5-point scale used by most universities, First Class runs from 4.50 to 5.00. Universities that use a 4-point scale usually set First Class at 3.50 to 4.00. Converted proportionally, 4.50 on the 5-point scale is 3.60 on a 4.0 scale."
        ]
      },
      {
        h2: "How hard is First Class?",
        paras: [
          "A 4.50 average means scoring mostly A (70 and above) with only a few B grades. Every B pulls your average down, and a single F in a heavy course can cost you First Class even with As elsewhere, because it adds zero points across all its credit units. Students who make First Class usually start strong in 100 level, when courses are easier to score highly in, and protect their average every semester after that."
        ]
      },
      {
        h2: "What First Class opens up",
        paras: [],
        items: [
          "Graduate assistant and lecturer roles, which often prefer First Class or a strong Second Class Upper.",
          "Fully funded master's and PhD scholarships abroad, where a top class makes your application stand out.",
          "Graduate trainee programmes in banks, oil and gas, consulting and multinationals.",
          "Prizes and recognition at convocation, and awards that some state governments and organisations give their First Class graduates."
        ]
      },
      {
        h2: "Habits that protect a First Class",
        paras: [],
        items: [
          "Never miss continuous assessment: tests, assignments and practicals often make up 30 to 40 percent of each course.",
          "Treat high-unit courses as priorities, since a 4-unit course moves your CGPA twice as much as a 2-unit course.",
          "Work past questions for every course; lecturers repeat question styles.",
          "Recalculate your CGPA after each result with the CGPA Calculator so you always know the GPA you need next."
        ]
      },
      classesSection,
      scaleSection
    ],
    faq: [
      { q: "What CGPA is First Class in Nigeria?", a: "4.50 to 5.00 on the 5-point scale at most universities. Some universities use a 4-point scale, where First Class is usually 3.50 to 4.00." },
      { q: "Can I still make First Class if I had a bad first year?", a: "Sometimes. It depends on how many credit units you have left. Enter your figures in the calculator on this page: if the required average is above 5.00, First Class is no longer possible; if it is close to 5.00, you would need almost all As." },
      { q: "Is 4.49 First Class?", a: "No. On the usual boundaries 4.49 is Second Class Upper, and 4.50 is the start of First Class. Universities calculate CGPA to two or more decimal places, so check how yours rounds if you are near the line." },
      { q: "What is First Class on the 4.0 scale?", a: "A 5-point CGPA of 4.50 converts proportionally to 3.60 on a 4.0 scale. Universities that grade on 4 points usually set First Class at 3.50 and above." }
    ]
  },
  {
    slug: "second-class-upper",
    path: "/cgpa-for-second-class-upper",
    short: "Second Class Upper",
    scale: 5,
    target: 3.5,
    title: "CGPA for Second Class Upper (2:1) in Nigeria + Calculator",
    description: "Second Class Upper (2:1) is a CGPA of 3.50 to 4.49 on the 5-point scale at most Nigerian universities. Find the GPA you need to reach or keep a 2:1.",
    h1: "What CGPA Is Second Class Upper in Nigeria?",
    intro: "At most Nigerian universities, Second Class Upper, often written 2:1, is a final CGPA of 3.50 to 4.49 on the 5-point scale. It is the class many employers and scholarships use as their minimum, which makes 3.50 the most important boundary for many students. Use the calculator below to see the GPA you need to reach or keep a 2:1.",
    sections: [
      {
        h2: "Second Class Upper CGPA range",
        paras: [
          "On the 5-point scale, Second Class Upper runs from 3.50 to 4.49. On universities' 4-point scale it is usually 3.00 to 3.49. A 3.50 on the 5-point scale converts proportionally to 2.80 on a 4.0 scale, but foreign evaluators such as WES grade course by course, so your converted figure depends on your individual grades."
        ]
      },
      {
        h2: "Why 3.50 matters so much",
        paras: [],
        items: [
          "Many graduate trainee programmes in banks, oil and gas, telecoms and consulting set a 2:1 as their minimum.",
          "Major scholarships for master's study abroad, such as Chevening and the Commonwealth Master's scholarships, ask for a first or upper second class degree or its equivalent.",
          "Most Nigerian universities admit 2:1 graduates straight into master's programmes, and some prefer a 2:1 for MPhil or PhD tracks.",
          "Graduate assistant positions in universities often accept a strong 2:1 alongside First Class."
        ]
      },
      {
        h2: "If you are just below 3.50",
        paras: [
          "Students between 3.30 and 3.49 are close enough that one or two good semesters can lift them over the line, especially before 400 level when many credit units remain. Check the required average with the calculator, then focus on your highest-unit courses and on clearing any carryovers, because a carried-over F keeps counting against you until it is passed."
        ]
      },
      classesSection,
      scaleSection
    ],
    faq: [
      { q: "What CGPA is Second Class Upper?", a: "3.50 to 4.49 on the 5-point scale at most Nigerian universities. On a 4-point university scale it is usually 3.00 to 3.49." },
      { q: "Is 3.49 Second Class Upper?", a: "No. On the usual boundaries 3.49 is Second Class Lower; Second Class Upper starts at 3.50. Check your university's rounding rule if you are close." },
      { q: "Is a 2:1 good enough for a master's abroad?", a: "Usually, yes. Many UK and Commonwealth scholarships ask for a first or upper second class degree. Each university abroad checks how your Nigerian degree compares, so read the entry requirements for your country." },
      { q: "Can I move from 2:2 to 2:1?", a: "Often, if enough credit units remain. Enter your current CGPA and units in the calculator: if the required average is realistic (for example below about 4.0), a 2:1 is within reach with consistent A and B grades." }
    ]
  },
  {
    slug: "second-class-lower",
    path: "/cgpa-for-second-class-lower",
    short: "Second Class Lower",
    scale: 5,
    target: 2.4,
    title: "CGPA for Second Class Lower (2:2) in Nigeria + Calculator",
    description: "Second Class Lower (2:2) is a CGPA of 2.40 to 3.49 on the 5-point scale at most Nigerian universities. See what it means for jobs, master's and NYSC.",
    h1: "What CGPA Is Second Class Lower in Nigeria?",
    intro: "At most Nigerian universities, Second Class Lower, or 2:2, is a final CGPA of 2.40 to 3.49 on the 5-point scale. It is the most common degree class in many departments. A 2:2 still opens many doors, and if you are still in school, the calculator below shows whether you can move up to a 2:1.",
    sections: [
      {
        h2: "Second Class Lower CGPA range",
        paras: [
          "On the 5-point scale, Second Class Lower runs from 2.40 to 3.49. On a 4-point university scale it is usually 2.00 to 2.99. Some universities set the lower boundary slightly differently, so check your student handbook."
        ]
      },
      {
        h2: "What you can do with a 2:2",
        paras: [],
        items: [
          "Serve in NYSC like every other graduate: your class of degree does not affect mobilisation.",
          "Apply for many jobs: plenty of employers in the public service, SMEs, tech, sales and teaching accept a 2:2, and experience and skills often matter more after your first job.",
          "Study for a master's: many Nigerian universities admit 2:2 graduates into master's programmes, sometimes with a minimum CGPA such as 3.00 for academic master's degrees.",
          "Take professional exams such as ICAN, CIBN, CIPM or professional IT certifications, which focus on what you can do rather than your class."
        ]
      },
      {
        h2: "Moving up from 2:2 to 2:1",
        paras: [
          "If you still have several semesters left, the jump to 3.50 is often possible. The earlier you start, the easier it is: the more units remain, the smaller the average you need. Use the calculator below with a target of 3.50 to see your required GPA, then clear any carryovers first, because they keep pulling your CGPA down."
        ]
      },
      classesSection,
      scaleSection
    ],
    faq: [
      { q: "What CGPA is Second Class Lower?", a: "2.40 to 3.49 on the 5-point scale at most Nigerian universities. On a 4-point scale it is usually 2.00 to 2.99." },
      { q: "Is a 2:2 a bad degree?", a: "No. It is a good degree that most graduates in many departments earn. Some employers and scholarships ask for a 2:1, but many others accept a 2:2, and skills, experience and certifications count for a lot." },
      { q: "Can I do a master's with a Second Class Lower?", a: "Yes, at many Nigerian universities, although some set a minimum CGPA for academic master's degrees or ask 2:2 graduates to do a professional master's or PGD first. Check the postgraduate school's requirements." },
      { q: "Is 2.40 Second Class Lower?", a: "Yes, on the usual boundaries 2.40 is the start of Second Class Lower, and 2.39 is Third Class." }
    ]
  },
  {
    slug: "third-class",
    path: "/cgpa-for-third-class",
    short: "Third Class",
    scale: 5,
    target: 1.5,
    title: "CGPA for Third Class in Nigeria (1.50 – 2.39) + Calculator",
    description: "Third Class is a CGPA of 1.50 to 2.39 on the 5-point scale at most Nigerian universities. See your options for jobs and further study, and how to move up.",
    h1: "What CGPA Is Third Class in Nigeria?",
    intro: "At most Nigerian universities, Third Class is a final CGPA of 1.50 to 2.39 on the 5-point scale. It is still an honours degree, and many successful people graduated with one. If you are still studying, the calculator below shows the average you need to move up to a Second Class Lower.",
    sections: [
      {
        h2: "Third Class CGPA range",
        paras: [
          "On the 5-point scale, Third Class runs from 1.50 to 2.39. Below that, some universities award a Pass degree (1.00 to 1.49), while others no longer award Pass degrees at all. On a 4-point university scale, Third Class is usually 1.00 to 1.99."
        ]
      },
      {
        h2: "Options after a Third Class",
        paras: [],
        items: [
          "NYSC: you serve like every other graduate.",
          "Postgraduate Diploma (PGD): many universities let Third Class graduates take a PGD first, and a good PGD result can then qualify you for a master's programme.",
          "Professional certifications such as ICAN, CIPM, CIBN, project management or cloud and IT certifications, which employers value for what you can do.",
          "Skills and experience: internships, freelancing and a strong portfolio can matter more than your class, especially in tech, media, sales and business."
        ]
      },
      {
        h2: "Moving up to Second Class Lower",
        paras: [
          "If you are still in school, the 2.40 boundary is often reachable. Start by retaking and passing any failed courses, because an F adds zero points for every credit unit until it is cleared. Then use the calculator with a target of 2.40 to see the average you need, and aim for C grades or better in every remaining course."
        ]
      },
      classesSection,
      scaleSection
    ],
    faq: [
      { q: "What CGPA is Third Class in Nigeria?", a: "1.50 to 2.39 on the 5-point scale at most Nigerian universities. On a 4-point scale it is usually 1.00 to 1.99." },
      { q: "Can a Third Class graduate do a master's?", a: "Usually not directly, but many universities accept Third Class graduates into a Postgraduate Diploma, and a good PGD result can lead to a master's. Check your chosen university's postgraduate requirements." },
      { q: "Can I serve NYSC with a Third Class?", a: "Yes. Every eligible graduate serves, whatever their class of degree." },
      { q: "What is below Third Class?", a: "Some universities award a Pass degree for a CGPA of 1.00 to 1.49. Others no longer award a Pass degree, so a CGPA below 1.50 may not qualify for graduation there." }
    ]
  },
  {
    slug: "polytechnic",
    path: "/polytechnic-grading-system",
    short: "Polytechnic Grading",
    scale: 4,
    target: 3.0,
    poly: true,
    title: "Polytechnic Grading System in Nigeria: ND & HND Classes",
    description: "Nigerian polytechnic grading on the 4-point scale: grades A to F, ND and HND classes (Distinction, Upper Credit, Lower Credit, Pass) and a CGPA calculator.",
    h1: "Polytechnic Grading System in Nigeria (ND and HND)",
    intro: "Nigerian polytechnics grade ND and HND students on a 4-point scale with nine grades, from A (4.00) to F (0). Your final CGPA places you in one of four classes: Distinction, Upper Credit, Lower Credit or Pass. The calculator below shows the average you need to reach the class you want.",
    sections: [
      {
        h2: "Polytechnic grade points",
        paras: [
          "Each course is scored out of 100 and converted to grade points. Your CGPA is the average of those points, weighted by the credit units of each course."
        ],
        items: gradeItems(POLY_GRADES)
      },
      {
        h2: "ND and HND classes",
        paras: [],
        items: classTableItems(POLY_CLASSES)
      },
      {
        h2: "Worked example",
        paras: [
          "Suppose a semester has four courses. Multiply each course's grade points by its credit units, add the results, then divide by the total units. If the whole programme averaged the same, this student would graduate with an Upper Credit."
        ],
        items: [
          "Course 1: 3 units, grade A (4.00), 3 × 4.00 = 12 points",
          "Course 2: 2 units, grade B (3.25), 2 × 3.25 = 6.5 points",
          "Course 3: 3 units, grade C (2.75), 3 × 2.75 = 8.25 points",
          "Course 4: 2 units, grade CD (2.50), 2 × 2.50 = 5 points",
          "Total: 31.75 points over 10 units, so GPA = 31.75 ÷ 10 = 3.18 (Upper Credit)"
        ]
      },
      {
        h2: "Why your ND class matters",
        paras: [
          "Your ND result affects your route to HND. Polytechnics usually admit Upper and Lower Credit ND holders into HND after a year of industrial experience, while Pass holders are usually asked for two years of relevant experience. Requirements vary between polytechnics and courses, so check your school's admission rules."
        ]
      },
      {
        h2: "How polytechnic grading differs from university grading",
        paras: [
          "Universities mostly use a 5-point scale with classes from First Class to Third Class, while polytechnics use a 4-point scale with Distinction, Upper Credit, Lower Credit and Pass. The grade bands are also different: a polytechnic A starts at 75 marks, while a university A usually starts at 70. Use the CGPA Converter if you need to compare results across scales."
        ]
      }
    ],
    faq: [
      { q: "What CGPA is Distinction in polytechnic?", a: "3.50 to 4.00 on the polytechnic 4-point scale." },
      { q: "What CGPA is Upper Credit?", a: "3.00 to 3.49 on the polytechnic 4-point scale. Lower Credit is 2.50 to 2.99, and Pass is 2.00 to 2.49." },
      { q: "What is the pass mark in polytechnic?", a: "40 marks, which is grade E and 2.00 points. Below 40 is F, which earns no points." },
      { q: "Can I go for HND with a Pass in ND?", a: "Usually only after two years of relevant work experience, compared with one year for Upper and Lower Credit holders. Check your polytechnic's HND admission requirements." }
    ]
  }
];

export const dcBySlug = (slug) => DC_PAGES.find((p) => p.slug === slug);
export const dcByPath = (path) => DC_PAGES.find((p) => p.path === path);

export const DC_TOOLS = [
  ...DC_PAGES.map((p) => ({ path: p.path, name: p.title.split(" + ")[0].split(":")[0], short: p.short })),
  { path: "/gpa-class-calculator", name: "GPA Class Calculator", short: "Class calculator" },
  { path: "/cgpa-calculator", name: "CGPA Calculator", short: "CGPA calculator" }
];

export const calcIntro = (p) =>
  `Enter your current CGPA, the credit units you have completed and the units left. The target is set to ${p.target.toFixed(2)}, the start of ${p.poly ? "Upper Credit" : p.short}, but you can change it.`;

export const calcSteps = CALC_STEPS;

// Required average GPA over the remaining units to finish on `target`.
export function requiredGpa({ current, doneUnits, leftUnits, target }) {
  if (![current, doneUnits, leftUnits, target].every(Number.isFinite) || leftUnits <= 0 || doneUnits < 0) return null;
  return (target * (doneUnits + leftUnits) - current * doneUnits) / leftUnits;
}
