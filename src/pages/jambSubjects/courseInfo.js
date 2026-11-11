// Hand-written summary for each course page. `combo`, `rule`, `olevel` and
// `notes` follow the majority of the 18 universities sampled from JAMB's IBASS
// brochure (backups/jamb-brochure), and `notes` records the schools that
// differ. The per-school text itself lives in brochureData.js (generated).
import { ARTS, ARTS_SOCIAL, SOCIAL, SCIENCE, ANY } from "./subjects.js";

const M = ["Mathematics"];
const P = ["Physics"];
const C = ["Chemistry"];
const B = ["Biology"];
const E = ["Economics"];
const PCB = [P, C, B];
const MPC = [M, P, C];
const CS_THIRD = ["Chemistry", "Biology", "Agricultural Science", "Economics", "Geography"];

export const FACULTIES = [
  "Computing",
  "Management and Social Sciences",
  "Arts and Law",
  "Medicine and Health Sciences",
  "Engineering and Environmental Sciences",
  "Sciences and Agriculture",
  "Education"
];

export const COURSES = [
  // ---------------- Computing ----------------
  {
    slug: "computer-science",
    name: "Computer Science",
    faculty: "Computing",
    combo: "Use of English, Mathematics, Physics and one of Chemistry, Biology, Agricultural Science, Economics or Geography",
    rule: [M, P, CS_THIRD],
    olevel: "Five credits including English Language, Mathematics and Physics, plus two other science subjects, in not more than two sittings.",
    notes: [
      "UI, BUK and FUTO ask for Chemistry as the third subject, so take Chemistry if you are applying there.",
      "UNILAG accepts only Chemistry or Biology as the third subject, and also asks for Further Mathematics at O'level.",
      "DELSU accepts Biology, Chemistry or Geography as the third subject."
    ],
    intro:
      "Computer Science teaches how software and computers work: programming, algorithms, data structures, databases, networks and artificial intelligence. It is one of the most competitive courses in Nigerian universities, so a strong UTME score matters as much as the right subjects.",
    careers: ["Software developer", "Data analyst or data scientist", "Network and systems administrator", "Cybersecurity analyst", "IT consultant or entrepreneur"],
    related: ["software-engineering", "cyber-security", "computer-engineering"]
  },
  {
    slug: "cyber-security",
    name: "Cyber Security",
    faculty: "Computing",
    combo: "Use of English, Mathematics, Physics and one other science subject (Chemistry, Biology, Agricultural Science, Economics or Geography)",
    rule: [M, P, CS_THIRD],
    olevel: "Five credits including English Language, Mathematics and Physics, plus two other science subjects, in not more than two sittings.",
    notes: [
      "FUTO asks for Chemistry as the third subject.",
      "Cyber Security is a new degree, so many universities have not yet published full requirements on IBASS. Check your chosen school's entry before you register."
    ],
    intro:
      "Cyber Security is a newer computing degree focused on protecting systems, networks and data from attack. It covers programming, networking, cryptography, digital forensics and security management, and shares its first year with Computer Science in many universities.",
    careers: ["Security analyst", "Penetration tester", "Digital forensics investigator", "Security engineer", "IT risk and compliance officer"],
    related: ["computer-science", "software-engineering", "information-technology"]
  },
  {
    slug: "software-engineering",
    name: "Software Engineering",
    faculty: "Computing",
    combo: "Use of English, Mathematics, Physics and one other science subject (Chemistry, Biology, Agricultural Science, Economics or Geography)",
    rule: [M, P, CS_THIRD],
    olevel: "Five credits including English Language, Mathematics and Physics, plus two other science subjects, in not more than two sittings.",
    notes: [
      "FUTO asks for Chemistry as the third subject.",
      "Several universities list Software Engineering on IBASS without full requirements yet, so confirm your school's entry before you register."
    ],
    intro:
      "Software Engineering applies engineering methods to building software: requirements, design, testing, project management and maintenance of large systems. It overlaps with Computer Science but puts more weight on teamwork and building real products.",
    careers: ["Software engineer", "Mobile or web developer", "Quality assurance and test engineer", "DevOps engineer", "Product or project manager"],
    related: ["computer-science", "cyber-security", "computer-engineering"]
  },
  {
    slug: "information-technology",
    name: "Information Technology",
    faculty: "Computing",
    combo: "Use of English, Mathematics, Physics and one other science subject (Chemistry, Biology, Agricultural Science, Economics or Geography)",
    rule: [M, P, CS_THIRD],
    olevel: "Five credits including English Language, Mathematics and Physics, plus two other science subjects, in not more than two sittings.",
    notes: [
      "FUTO asks for Chemistry as the third subject; BUK accepts Biology, Chemistry, Agricultural Science or Geography.",
      "Some universities call the course Information and Communication Technology (ICT)."
    ],
    intro:
      "Information Technology focuses on using and managing computer systems in organisations: networks, databases, web systems, IT support and information systems. It is more applied than Computer Science and leads straight into IT jobs in banks, telecoms and government.",
    careers: ["IT support and systems administrator", "Network engineer", "Database administrator", "Web developer", "IT project officer"],
    related: ["computer-science", "cyber-security", "software-engineering"]
  },

  // ---------------- Management and Social Sciences ----------------
  {
    slug: "accounting",
    name: "Accounting",
    faculty: "Management and Social Sciences",
    combo: "Use of English, Mathematics, Economics and any one Social Science subject",
    rule: [M, E, SOCIAL],
    olevel: "Five credits including English Language, Mathematics and Economics, plus two other relevant subjects, in not more than two sittings.",
    notes: [
      "UNILAG asks for one of Financial Accounting, Geography, Government or Biology as the fourth subject.",
      "UI accepts English, Mathematics and any two Social or Management Science subjects."
    ],
    intro:
      "Accounting trains you to record, report and analyse the financial position of businesses and government. Most graduates go on to professional exams with ICAN or ACCA, and the course is one of the most popular in Nigerian universities.",
    careers: ["Chartered accountant", "Auditor", "Tax consultant", "Financial analyst", "Bank or corporate finance officer"],
    related: ["banking-and-finance", "business-administration", "economics"]
  },
  {
    slug: "business-administration",
    name: "Business Administration",
    faculty: "Management and Social Sciences",
    combo: "Use of English, Mathematics, Economics and any one other subject",
    rule: [M, E, ANY],
    olevel: "Five credits including English Language, Mathematics and Economics, plus two of Accounting, Business Methods, Commerce, Government, Geography or Statistics.",
    notes: [
      "UNILORIN and DELSU ask for a Social Science subject as the fourth subject.",
      "ABU accepts Economics or Commerce, plus any Management or Social Science subject.",
      "UNIZIK asks for Economics and any two of Commerce, Government, Mathematics or Business Studies."
    ],
    intro:
      "Business Administration covers how organisations are run: management, marketing, human resources, finance and entrepreneurship. Some universities call it Business Management. It suits students who want a broad business degree with many career options.",
    careers: ["Business manager", "Human resources officer", "Entrepreneur", "Management consultant", "Sales and operations manager"],
    related: ["accounting", "marketing", "banking-and-finance"]
  },
  {
    slug: "banking-and-finance",
    name: "Banking and Finance",
    faculty: "Management and Social Sciences",
    combo: "Use of English, Mathematics, Economics and Government or Geography",
    rule: [M, E, ["Government", "Geography"]],
    olevel: "Five credits including English Language, Mathematics and Economics, plus two other relevant subjects, in not more than two sittings.",
    notes: [
      "UNIBEN, UNICAL, BUK and LASU accept Mathematics, any Social Science subject and any other subject.",
      "UNILAG accepts Mathematics, Economics and any one subject from Science, Social Science or Arts.",
      "UI accepts Mathematics, Economics and one of Commerce, Business Studies, Principles of Accounts, Marketing, Geography or Government."
    ],
    intro:
      "Banking and Finance studies money, banks, capital markets, investment and financial risk. It prepares you for careers in commercial banks, fintech companies, insurance and investment firms, and for professional exams such as CIBN.",
    careers: ["Banker or relationship manager", "Credit and risk analyst", "Investment analyst", "Fintech operations officer", "Treasury officer"],
    related: ["accounting", "economics", "business-administration"]
  },
  {
    slug: "economics",
    name: "Economics",
    faculty: "Management and Social Sciences",
    combo: "Use of English, Economics, Mathematics and one of Government, History, Geography, Literature in English, French or CRS/IRS",
    rule: [E, M, ["Government", "History", "Geography", "Literature in English", "French", "Christian Religious Studies", "Islamic Studies"]],
    olevel: "Five credits including English Language, Mathematics and Economics, plus any two Arts or Social Science subjects.",
    notes: [
      "UNILAG asks for one of Biology, Financial Accounting, Geography or Government as the fourth subject.",
      "UNILORIN accepts Commerce, Geography or Government as the fourth subject."
    ],
    intro:
      "Economics studies how people, businesses and governments use limited resources. It combines theory with statistics and policy, and graduates work across banking, government, research, consulting and international development.",
    careers: ["Economist or policy analyst", "Bank or financial analyst", "Research officer", "Development consultant", "Data and market analyst"],
    related: ["banking-and-finance", "accounting", "statistics"]
  },
  {
    slug: "marketing",
    name: "Marketing",
    faculty: "Management and Social Sciences",
    combo: "Use of English, Mathematics, Economics and any one other subject",
    rule: [M, E, ANY],
    olevel: "Five credits including English Language and Mathematics, plus three other relevant subjects (Economics or Commerce is usually one of them).",
    notes: [
      "UNIBEN and UNICAL ask for a Social Science subject as the fourth subject.",
      "ABU and DELSU accept Commerce in place of Economics.",
      "LASU accepts Mathematics plus any two other relevant subjects."
    ],
    intro:
      "Marketing covers how products and services reach customers: consumer behaviour, branding, advertising, sales, digital marketing and market research. It suits creative students who also like working with numbers.",
    careers: ["Marketing executive", "Brand manager", "Digital marketing specialist", "Sales manager", "Market research analyst"],
    related: ["business-administration", "mass-communication", "economics"]
  },
  {
    slug: "public-administration",
    name: "Public Administration",
    faculty: "Management and Social Sciences",
    combo: "Use of English, Government, Economics and any one other subject",
    rule: [["Government"], E, ANY],
    olevel: "Five credits including English Language, Mathematics and Economics (or Government), plus two other relevant subjects.",
    notes: [
      "UNIBEN, UNIPORT and UNICAL ask for Mathematics, Economics and any Social Science subject instead of Government.",
      "LASU asks for Mathematics, Economics and any other subject; DELSU asks for Mathematics, Government and Economics or Commerce.",
      "Requirements vary more for this course than most, so check your chosen school carefully."
    ],
    intro:
      "Public Administration studies how government works: public policy, local government, public finance, human resources and administrative law. Graduates work in the civil service, local governments, NGOs and international organisations.",
    careers: ["Civil servant or administrative officer", "Policy analyst", "Local government administrator", "NGO programme officer", "Human resources officer"],
    related: ["political-science", "business-administration", "sociology"]
  },
  {
    slug: "mass-communication",
    name: "Mass Communication",
    faculty: "Management and Social Sciences",
    combo: "Use of English and any three Arts or Social Science subjects",
    rule: [ARTS_SOCIAL, ARTS_SOCIAL, ARTS_SOCIAL],
    olevel: "Five credits including English Language and four other Arts or Social Science subjects. Many schools also ask for Literature in English and Mathematics.",
    notes: [
      "UNILAG and UNIZIK ask for Literature in English as one of the subjects; UNILAG also accepts Mathematics.",
      "ABU lists Government, History, Economics, Commerce, a Nigerian language and Literature among the accepted subjects.",
      "Some universities list the course as Journalism and Media Studies."
    ],
    intro:
      "Mass Communication covers journalism, broadcasting, public relations, advertising and digital media. You learn to write, report, produce and manage communication for newspapers, radio, TV and online platforms.",
    careers: ["Journalist or reporter", "Broadcaster or presenter", "Public relations officer", "Social media and content manager", "Advertising executive"],
    related: ["english", "marketing", "political-science"]
  },
  {
    slug: "political-science",
    name: "Political Science",
    faculty: "Management and Social Sciences",
    combo: "Use of English, Government or History, and two other Arts or Social Science subjects",
    rule: [["Government", "History"], ARTS_SOCIAL, ARTS_SOCIAL],
    olevel: "Five credits including English Language and Government or History, plus three other subjects. A pass in Mathematics is required.",
    notes: [
      "UNILAG asks for Government, Economics or Geography, and one of History, Literature in English or CRS/IRS.",
      "UNIZIK and DELSU require Government specifically, not History."
    ],
    intro:
      "Political Science studies power, government, elections, public policy and international politics. It is a common route into law, the civil service, diplomacy and political advisory roles.",
    careers: ["Policy analyst", "Civil servant", "Political adviser or campaign manager", "Journalist", "Diplomat or international relations officer"],
    related: ["public-administration", "history-and-international-studies", "law"]
  },
  {
    slug: "sociology",
    name: "Sociology",
    faculty: "Management and Social Sciences",
    combo: "Use of English and any three Arts or Social Science subjects",
    rule: [ARTS_SOCIAL, ARTS_SOCIAL, ARTS_SOCIAL],
    olevel: "Five credits including English Language and Government or History, plus three other subjects. A pass in Mathematics is required.",
    notes: [
      "UNILAG asks for two Social Science subjects and one Arts subject, and accepts Mathematics.",
      "UI accepts any three subjects from Arts, Science or Social Science.",
      "BUK asks for two of Economics, Accounting, Commerce or Government, plus one other subject."
    ],
    intro:
      "Sociology studies society, social groups and social problems such as crime, poverty, family change and urbanisation. It builds strong research and analysis skills that are useful in many careers.",
    careers: ["Social researcher", "Human resources officer", "NGO and community development officer", "Social worker", "Policy and monitoring officer"],
    related: ["psychology", "political-science", "public-administration"]
  },
  {
    slug: "psychology",
    name: "Psychology",
    faculty: "Management and Social Sciences",
    combo: "Use of English, Biology and two other subjects (several universities require Biology)",
    rule: [B, ANY, ANY],
    olevel: "Five credits including English Language, plus other relevant subjects. Most schools also want Mathematics, and several name Government or History; check your chosen school's list.",
    notes: [
      "UNN, UNIZIK, UNIJOS and UI require Biology among your UTME subjects.",
      "OAU and UNIUYO accept any three Arts or Social Science subjects, without Biology.",
      "UNILAG accepts any three of Mathematics, Biology, Physics, Chemistry, Economics, Government or Literature in English."
    ],
    intro:
      "Psychology is the scientific study of the mind and behaviour. It covers how people think, learn, develop and relate to others, and includes clinical, industrial, social and developmental psychology.",
    careers: ["Clinical or counselling psychologist (with further training)", "Human resources and recruitment specialist", "Researcher", "Rehabilitation officer", "Organisational consultant"],
    related: ["sociology", "guidance-and-counselling", "nursing"]
  },

  // ---------------- Arts and Law ----------------
  {
    slug: "law",
    name: "Law",
    faculty: "Arts and Law",
    combo: "Use of English and any three Arts or Social Science subjects",
    rule: [ARTS_SOCIAL, ARTS_SOCIAL, ARTS_SOCIAL],
    olevel: "Five credits including English Language, Literature in English and Mathematics, in not more than two sittings.",
    notes: [
      "UNN and DELSU require Literature in English among your UTME subjects.",
      "UNILAG accepts only one of Economics, Commerce or Accounting, and does not accept Music or Fine Arts.",
      "UI accepts subjects from Arts, Social Science and Science."
    ],
    intro:
      "Law trains you to understand and apply the Nigerian legal system: constitutional, criminal, contract, property, commercial and international law. After the five-year LL.B., graduates attend the Nigerian Law School before being called to the Bar.",
    careers: ["Lawyer (barrister and solicitor)", "Legal adviser in a company or bank", "Judge or magistrate (with experience)", "Legal officer in government", "Human rights and policy advocate"],
    related: ["political-science", "english", "history-and-international-studies"]
  },
  {
    slug: "english",
    name: "English Language",
    faculty: "Arts and Law",
    combo: "Use of English, Literature in English, one other Arts subject and one Arts or Social Science subject",
    rule: [["Literature in English"], ARTS, ARTS_SOCIAL],
    olevel: "Five credits including English Language and Literature in English, plus three other Arts or Social Science subjects.",
    notes: [
      "UNILAG asks for two of CRS/IRS, French, History, Government or a Nigerian language with Literature.",
      "DELSU asks for Literature in English and CRS, plus one other Arts or Social Science subject."
    ],
    intro:
      "English Language (and English and Literary Studies) covers grammar, linguistics, literature, creative writing and communication. It builds the writing and analytical skills used in teaching, media, publishing and the corporate world.",
    careers: ["Teacher or lecturer", "Editor or publisher", "Content writer or copywriter", "Journalist", "Communications officer"],
    related: ["mass-communication", "law", "history-and-international-studies"]
  },
  {
    slug: "history-and-international-studies",
    name: "History and International Studies",
    faculty: "Arts and Law",
    combo: "Use of English, History (or Government at some schools) and two other Arts or Social Science subjects",
    rule: [["History", "Government"], ARTS_SOCIAL, ARTS_SOCIAL],
    olevel: "Five credits including English Language and History (or Government at some schools), plus other Arts or Social Science subjects.",
    notes: [
      "OAU, UNN, UNIBEN and UNIPORT require History itself; UI, UNIZIK and LASU accept History or Government."
    ],
    intro:
      "History and International Studies examines the past of Nigeria, Africa and the world, and how it shapes politics and international relations today. It is a strong foundation for diplomacy, law, teaching and research.",
    careers: ["Diplomat or foreign service officer", "Teacher or lecturer", "Researcher or archivist", "Journalist", "Policy analyst"],
    related: ["political-science", "law", "english"]
  },

  // ---------------- Medicine and Health Sciences ----------------
  {
    slug: "medicine-and-surgery",
    name: "Medicine and Surgery",
    faculty: "Medicine and Health Sciences",
    combo: "Use of English, Physics, Chemistry and Biology",
    rule: PCB,
    olevel: "Five credits in English Language, Mathematics, Physics, Chemistry and Biology. Some schools require all five at one sitting.",
    notes: [
      "Every sampled university uses the same UTME combination for Medicine.",
      "Medicine usually has the highest departmental cut-off mark in each university, far above JAMB's general minimum."
    ],
    intro:
      "Medicine and Surgery (MBBS) trains doctors over six years: basic medical sciences first, then clinical rotations in a teaching hospital. It is the most competitive course in Nigerian universities.",
    careers: ["Medical doctor", "Surgeon or specialist (after residency)", "Public health physician", "Medical researcher", "Hospital administrator"],
    related: ["nursing", "pharmacy", "dentistry"]
  },
  {
    slug: "nursing",
    name: "Nursing Science",
    faculty: "Medicine and Health Sciences",
    combo: "Use of English, Physics, Chemistry and Biology",
    rule: PCB,
    olevel: "Five credits in English Language, Mathematics, Physics, Chemistry and Biology, in not more than two sittings.",
    notes: ["Every sampled university uses the same UTME combination for Nursing Science."],
    intro:
      "Nursing Science (B.NSc) is a five-year degree that trains professional nurses in patient care, community health, midwifery and nursing management. Graduates register with the Nursing and Midwifery Council of Nigeria.",
    careers: ["Registered nurse", "Midwife", "Public health nurse", "Nurse educator", "Nursing administrator"],
    related: ["medicine-and-surgery", "medical-laboratory-science", "physiotherapy"]
  },
  {
    slug: "pharmacy",
    name: "Pharmacy",
    faculty: "Medicine and Health Sciences",
    combo: "Use of English, Physics, Chemistry and Biology",
    rule: PCB,
    olevel: "Five credits in English Language, Mathematics, Physics, Chemistry and Biology.",
    notes: ["Many universities now offer Pharmacy as the six-year Doctor of Pharmacy (Pharm.D) degree."],
    intro:
      "Pharmacy studies medicines: how they are made, how they act on the body and how to use them safely. Graduates work in hospitals, community pharmacies and the pharmaceutical industry after registration with the Pharmacy Council of Nigeria.",
    careers: ["Hospital pharmacist", "Community pharmacist", "Industrial pharmacist", "Drug regulatory officer", "Clinical researcher"],
    related: ["medicine-and-surgery", "biochemistry", "industrial-chemistry"]
  },
  {
    slug: "medical-laboratory-science",
    name: "Medical Laboratory Science",
    faculty: "Medicine and Health Sciences",
    combo: "Use of English, Physics, Chemistry and Biology",
    rule: PCB,
    olevel: "Five credits in English Language, Mathematics, Physics, Chemistry and Biology.",
    notes: ["Every sampled university uses the same UTME combination for Medical Laboratory Science."],
    intro:
      "Medical Laboratory Science trains the scientists who run the tests doctors rely on: blood tests, microbiology cultures, histopathology and blood transfusion. Graduates register with the Medical Laboratory Science Council of Nigeria.",
    careers: ["Medical laboratory scientist", "Blood bank scientist", "Public health laboratory officer", "Research scientist", "Laboratory quality manager"],
    related: ["microbiology", "biochemistry", "nursing"]
  },
  {
    slug: "anatomy",
    name: "Anatomy",
    faculty: "Medicine and Health Sciences",
    combo: "Use of English, Biology, Chemistry and Physics",
    rule: PCB,
    olevel: "Five credits in English Language, Mathematics, Biology, Chemistry and Physics.",
    notes: ["Every sampled university uses the same UTME combination for Anatomy."],
    intro:
      "Anatomy studies the structure of the human body, from cells and tissues to organs and whole systems. It is taught alongside medical students and is a strong base for research, teaching and further health training.",
    careers: ["Lecturer or researcher", "Forensic or mortuary scientist", "Medical illustrator", "Graduate-entry medicine (further study)", "Pharmaceutical or medical sales"],
    related: ["physiology", "medicine-and-surgery", "biochemistry"]
  },
  {
    slug: "physiology",
    name: "Physiology",
    faculty: "Medicine and Health Sciences",
    combo: "Use of English, Physics, Chemistry and Biology",
    rule: PCB,
    olevel: "Five credits in English Language, Mathematics, Physics, Chemistry and Biology.",
    notes: ["Every sampled university uses the same UTME combination for Physiology."],
    intro:
      "Physiology studies how the body works: the heart, lungs, kidneys, nerves, hormones and how they respond to exercise, disease and drugs. Like Anatomy, it is taught in the college of medicine.",
    careers: ["Lecturer or researcher", "Exercise and sports physiologist", "Clinical research associate", "Graduate-entry medicine (further study)", "Pharmaceutical sales or regulatory officer"],
    related: ["anatomy", "medicine-and-surgery", "biochemistry"]
  },
  {
    slug: "radiography",
    name: "Radiography",
    faculty: "Medicine and Health Sciences",
    combo: "Use of English, Physics, Chemistry and Biology",
    rule: PCB,
    olevel: "Five credits in English Language, Mathematics, Biology, Physics and Chemistry.",
    notes: ["Every sampled university uses the same UTME combination for Radiography."],
    intro:
      "Radiography trains the professionals who take and interpret medical images: X-rays, CT scans, ultrasound and MRI, and who deliver radiotherapy for cancer. Graduates register with the Radiographers Registration Board of Nigeria.",
    careers: ["Diagnostic radiographer", "Sonographer", "Radiation therapist", "Radiation safety officer", "Medical imaging sales or applications specialist"],
    related: ["physiotherapy", "medical-laboratory-science", "physics"]
  },
  {
    slug: "physiotherapy",
    name: "Physiotherapy",
    faculty: "Medicine and Health Sciences",
    combo: "Use of English, Physics, Chemistry and Biology",
    rule: PCB,
    olevel: "Five credits in English Language, Mathematics, Biology, Physics and Chemistry, in not more than two sittings.",
    notes: ["Some universities now award the Doctor of Physiotherapy (DPT) degree."],
    intro:
      "Physiotherapy helps people recover movement and function after injury, illness or surgery, using exercise, manual therapy and electrotherapy. Graduates register with the Medical Rehabilitation Therapists Board of Nigeria.",
    careers: ["Hospital physiotherapist", "Sports physiotherapist", "Rehabilitation specialist", "Private clinic owner", "Researcher or lecturer"],
    related: ["nursing", "anatomy", "physiology"]
  },
  {
    slug: "dentistry",
    name: "Dentistry and Dental Surgery",
    faculty: "Medicine and Health Sciences",
    combo: "Use of English, Chemistry, Biology and one other Science subject (usually Physics)",
    rule: [C, B, SCIENCE],
    olevel: "Five credits in English Language, Mathematics, Physics, Chemistry and Biology.",
    notes: [
      "UNILAG, UI, LASU, UNIJOS and FUTO specifically ask for Physics, so Physics is the safest third science subject."
    ],
    intro:
      "Dentistry (BDS) trains dental surgeons to diagnose and treat diseases of the teeth, gums and mouth. Like Medicine, it is long, clinical and highly competitive.",
    careers: ["Dental surgeon", "Orthodontist or specialist (after residency)", "Public health dentist", "Private dental clinic owner", "Researcher or lecturer"],
    related: ["medicine-and-surgery", "pharmacy", "nursing"]
  },

  // ---------------- Engineering and Environmental Sciences ----------------
  {
    slug: "civil-engineering",
    name: "Civil Engineering",
    faculty: "Engineering and Environmental Sciences",
    combo: "Use of English, Mathematics, Physics and Chemistry",
    rule: MPC,
    olevel: "Five credits including English Language, Mathematics, Physics and Chemistry, plus one other science subject.",
    notes: ["Every sampled university uses the same UTME combination for Civil Engineering."],
    intro:
      "Civil Engineering covers the design and construction of roads, bridges, buildings, dams, drainage and water supply. Graduates register with COREN and work on Nigeria's growing infrastructure projects.",
    careers: ["Structural engineer", "Highway and transportation engineer", "Water resources engineer", "Construction project manager", "Site engineer"],
    related: ["mechanical-engineering", "architecture", "quantity-surveying"]
  },
  {
    slug: "mechanical-engineering",
    name: "Mechanical Engineering",
    faculty: "Engineering and Environmental Sciences",
    combo: "Use of English, Mathematics, Physics and Chemistry",
    rule: MPC,
    olevel: "Five credits including English Language, Mathematics, Physics and Chemistry, plus one other science subject.",
    notes: ["Every sampled university uses the same UTME combination for Mechanical Engineering."],
    intro:
      "Mechanical Engineering deals with machines and energy: engines, manufacturing, power plants, heating and cooling, and the design of mechanical systems. It is one of the broadest engineering degrees.",
    careers: ["Mechanical design engineer", "Maintenance engineer in oil and gas or manufacturing", "Automotive engineer", "Energy and power plant engineer", "Production manager"],
    related: ["electrical-electronics-engineering", "civil-engineering", "chemical-engineering"]
  },
  {
    slug: "electrical-electronics-engineering",
    name: "Electrical and Electronics Engineering",
    short: "Electrical Engineering",
    faculty: "Engineering and Environmental Sciences",
    combo: "Use of English, Mathematics, Physics and Chemistry",
    rule: MPC,
    olevel: "Five credits including English Language, Mathematics, Physics and Chemistry, plus one other science subject.",
    notes: ["Every sampled university uses the same UTME combination for Electrical and Electronics Engineering."],
    intro:
      "Electrical and Electronics Engineering covers power generation and distribution, electronics, telecommunications, control systems and renewable energy such as solar. It is central to Nigeria's power and telecoms sectors.",
    careers: ["Power systems engineer", "Electronics and embedded systems engineer", "Telecoms engineer", "Solar and renewable energy engineer", "Control and instrumentation engineer"],
    related: ["computer-engineering", "mechanical-engineering", "physics"]
  },
  {
    slug: "chemical-engineering",
    name: "Chemical Engineering",
    faculty: "Engineering and Environmental Sciences",
    combo: "Use of English, Mathematics, Physics and Chemistry",
    rule: MPC,
    olevel: "Five credits including English Language, Mathematics, Physics and Chemistry, plus one other science subject.",
    notes: ["Every sampled university uses the same UTME combination for Chemical Engineering."],
    intro:
      "Chemical Engineering turns raw materials into useful products at industrial scale: petroleum refining, petrochemicals, food processing, pharmaceuticals and water treatment.",
    careers: ["Process engineer", "Refinery or petrochemical engineer", "Production engineer in food or drinks", "Environmental and safety engineer", "Quality control manager"],
    related: ["petroleum-engineering", "industrial-chemistry", "mechanical-engineering"]
  },
  {
    slug: "petroleum-engineering",
    name: "Petroleum Engineering",
    faculty: "Engineering and Environmental Sciences",
    combo: "Use of English, Mathematics, Physics and Chemistry",
    rule: MPC,
    olevel: "Five credits including English Language, Mathematics, Physics and Chemistry, plus one other science subject.",
    notes: ["Most sampled universities ask for Mathematics, Physics and Chemistry. Check your chosen school's entry on IBASS, as at least one listing differs."],
    intro:
      "Petroleum Engineering covers finding, drilling for and producing oil and gas: reservoir engineering, drilling, production and petroleum economics. It is closely tied to Nigeria's oil and gas industry.",
    careers: ["Drilling engineer", "Reservoir engineer", "Production engineer", "Petroleum economist", "Oil and gas consultant"],
    related: ["chemical-engineering", "geology", "mechanical-engineering"]
  },
  {
    slug: "computer-engineering",
    name: "Computer Engineering",
    faculty: "Engineering and Environmental Sciences",
    combo: "Use of English, Mathematics, Physics and Chemistry",
    rule: MPC,
    olevel: "Five credits in English Language, Mathematics, Further Mathematics, Physics and Chemistry at most schools.",
    notes: ["ABU accepts Mathematics, Physics and an applied science subject such as Chemistry or Computer Studies."],
    intro:
      "Computer Engineering combines electronics and computing: hardware design, embedded systems, computer networks, robotics and the software that runs close to the hardware.",
    careers: ["Embedded systems engineer", "Hardware design engineer", "Network engineer", "Robotics and IoT engineer", "Software developer"],
    related: ["electrical-electronics-engineering", "computer-science", "software-engineering"]
  },
  {
    slug: "architecture",
    name: "Architecture",
    faculty: "Engineering and Environmental Sciences",
    combo: "Use of English, Physics, Mathematics and one of Chemistry, Geography, Fine Arts, Biology or Economics",
    rule: [P, M, ["Chemistry", "Geography", "Fine Arts", "Biology", "Economics"]],
    olevel: "Five credits including English Language, Mathematics, Physics and Chemistry, plus one of Fine Art, Geography, Woodwork, Biology, Economics, Technical Drawing or Further Mathematics.",
    notes: [
      "UI accepts only Geography or Economics as the third subject; ABU accepts only Geography or Chemistry.",
      "OAU accepts Technical Drawing among the third-subject options."
    ],
    intro:
      "Architecture combines art and engineering to design buildings and spaces. You learn design, drawing, building technology, structures and planning, and later register with ARCON.",
    careers: ["Architect", "Urban designer", "Interior architect", "Construction project manager", "3D visualisation specialist"],
    related: ["quantity-surveying", "civil-engineering", "estate-management"]
  },
  {
    slug: "estate-management",
    name: "Estate Management",
    faculty: "Engineering and Environmental Sciences",
    combo: "Use of English, Mathematics, Economics and any one other subject",
    rule: [M, E, ANY],
    olevel: "Five credits including English Language and Mathematics. Most schools in JAMB's list also name Chemistry; check your chosen school's full O'level list.",
    notes: [
      "UNILAG asks for one of Geography, Biology, Physics or Chemistry as the fourth subject.",
      "BUK asks for one of Chemistry, Physics, Biology, Geography or Fine Arts."
    ],
    intro:
      "Estate Management covers land and property: valuation, property management, real estate investment and land law. Graduates register with ESVARBON as estate surveyors and valuers.",
    careers: ["Estate surveyor and valuer", "Property manager", "Real estate investment analyst", "Facility manager", "Land administration officer"],
    related: ["quantity-surveying", "architecture", "banking-and-finance"]
  },
  {
    slug: "quantity-surveying",
    name: "Quantity Surveying",
    faculty: "Engineering and Environmental Sciences",
    combo: "Use of English, Physics, Mathematics and one of Chemistry, Geography, Fine Arts, Biology or Economics",
    rule: [P, M, ["Chemistry", "Geography", "Fine Arts", "Biology", "Economics"]],
    olevel: "Five credits including English Language, Mathematics, Physics and Chemistry, plus one of Fine Art, Geography, Woodwork, Biology, Economics or Technical Drawing.",
    notes: [
      "UNILAG accepts Economics, Geography or Chemistry as the third subject.",
      "FUTO accepts Mathematics plus any two of Physics, Chemistry, Geography, Economics, Biology, Technical Drawing and Fine Arts."
    ],
    intro:
      "Quantity Surveying manages the cost of building and engineering projects: estimating, bills of quantities, contracts and cost control. Graduates register with QSRBN.",
    careers: ["Quantity surveyor", "Cost engineer", "Contract and procurement manager", "Construction project manager", "Construction claims consultant"],
    related: ["architecture", "civil-engineering", "estate-management"]
  },

  // ---------------- Sciences and Agriculture ----------------
  {
    slug: "biochemistry",
    name: "Biochemistry",
    faculty: "Sciences and Agriculture",
    combo: "Use of English, Biology, Chemistry and Physics or Mathematics",
    rule: [B, C, ["Physics", "Mathematics"]],
    olevel: "Five credits in English Language, Mathematics, Physics, Chemistry and Biology.",
    notes: [
      "UNILAG, UI, LASU, UNICAL, UNIUYO and UNIJOS ask for Physics specifically, so Physics is the safer choice."
    ],
    intro:
      "Biochemistry studies the chemistry of living things: proteins, enzymes, metabolism, genetics and nutrition. It leads into medical research, pharmaceuticals, food and drinks, and graduate-entry health courses.",
    careers: ["Research scientist", "Quality control analyst", "Pharmaceutical or food industry scientist", "Clinical biochemist", "Lecturer"],
    related: ["microbiology", "medical-laboratory-science", "pharmacy"]
  },
  {
    slug: "microbiology",
    name: "Microbiology",
    faculty: "Sciences and Agriculture",
    combo: "Use of English, Biology, Chemistry and Physics or Mathematics",
    rule: [B, C, ["Physics", "Mathematics"]],
    olevel: "Five credits in English Language, Mathematics, Chemistry, Biology and Physics.",
    notes: [
      "UNILAG and BUK ask for Physics specifically.",
      "UI also accepts Geography as the fourth subject."
    ],
    intro:
      "Microbiology studies bacteria, viruses, fungi and other microorganisms, and their role in disease, food, industry and the environment. Graduates work in health, food and drinks, brewing, pharmaceuticals and public health.",
    careers: ["Microbiologist in a hospital or public health lab", "Quality control officer in food and drinks", "Brewing and fermentation scientist", "Environmental microbiologist", "Research scientist"],
    related: ["biochemistry", "medical-laboratory-science", "agriculture"]
  },
  {
    slug: "industrial-chemistry",
    name: "Industrial Chemistry",
    faculty: "Sciences and Agriculture",
    combo: "Use of English, Chemistry, Mathematics and one of Physics, Biology or Agricultural Science",
    rule: [C, M, ["Physics", "Biology", "Agricultural Science"]],
    olevel: "Five credits in English Language, Mathematics, Chemistry, Physics and Biology or Agricultural Science.",
    notes: ["UNILAG, UI and DELSU ask for Chemistry, Physics and Mathematics or Biology."],
    intro:
      "Industrial Chemistry applies chemistry to manufacturing: paints, plastics, soaps, cosmetics, petrochemicals, food and quality control. It is more practical and industry-focused than pure Chemistry.",
    careers: ["Industrial chemist", "Quality control analyst", "Production chemist", "Environmental and safety officer", "Research and development scientist"],
    related: ["chemistry", "chemical-engineering", "biochemistry"]
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    faculty: "Sciences and Agriculture",
    combo: "Use of English, Chemistry and two of Physics, Biology and Mathematics",
    rule: [C, ["Physics", "Biology", "Mathematics"], ["Physics", "Biology", "Mathematics"]],
    olevel: "Five credits in English Language, Mathematics, Physics, Chemistry and Biology.",
    notes: ["FUTO asks for Mathematics, Chemistry and any of Physics, Biology, Agricultural Science, Geography, Economics or Computer Studies."],
    intro:
      "Chemistry studies matter and how it changes: organic, inorganic, physical and analytical chemistry. Graduates work in oil and gas, manufacturing, pharmaceuticals, teaching and research.",
    careers: ["Analytical chemist", "Quality control officer", "Petroleum or petrochemical chemist", "Chemistry teacher or lecturer", "Research scientist"],
    related: ["industrial-chemistry", "biochemistry", "chemical-engineering"]
  },
  {
    slug: "physics",
    name: "Physics",
    faculty: "Sciences and Agriculture",
    combo: "Use of English, Physics, Mathematics and Chemistry or Biology",
    rule: [P, M, ["Chemistry", "Biology"]],
    olevel: "Five credits in English Language, Physics, Chemistry and Mathematics, plus Further Mathematics, Biology or Agricultural Science.",
    notes: [
      "UNILAG asks for Chemistry specifically.",
      "UI also accepts Geography or Further Mathematics as the fourth subject."
    ],
    intro:
      "Physics studies the laws of nature, from motion and energy to electricity, waves, atoms and the universe. It leads into electronics, energy, geophysics, medical physics, teaching and research.",
    careers: ["Physics teacher or lecturer", "Geophysicist in oil and gas", "Medical physicist (with further training)", "Electronics or renewable energy specialist", "Data analyst"],
    related: ["electrical-electronics-engineering", "mathematics", "geology"]
  },
  {
    slug: "mathematics",
    name: "Mathematics",
    faculty: "Sciences and Agriculture",
    combo: "Use of English, Mathematics and two of Physics, Chemistry, Economics or Geography",
    rule: [M, ["Physics", "Chemistry", "Economics", "Geography"], ["Physics", "Chemistry", "Economics", "Geography"]],
    olevel: "Five credits including English Language, Mathematics and Physics or Chemistry.",
    notes: [
      "UNILAG asks for Physics plus one of Chemistry, Economics, Biology or Geography.",
      "UNIZIK asks for Chemistry plus one of Physics, Economics or Geography."
    ],
    intro:
      "Mathematics covers algebra, calculus, statistics, analysis and applied mathematics. Strong mathematicians are in demand in finance, data science, software, actuarial work and teaching.",
    careers: ["Data scientist or analyst", "Actuary or risk analyst", "Mathematics teacher or lecturer", "Software developer", "Financial analyst"],
    related: ["statistics", "physics", "computer-science"]
  },
  {
    slug: "statistics",
    name: "Statistics",
    faculty: "Sciences and Agriculture",
    combo: "Use of English, Mathematics and two of Physics, Chemistry and Economics",
    rule: [M, ["Physics", "Chemistry", "Economics"], ["Physics", "Chemistry", "Economics"]],
    olevel: "Five credits including English Language and Mathematics, plus three of Physics, Statistics, Chemistry, Further Mathematics, Economics and Geography.",
    notes: [
      "ABU accepts two of Physics, Chemistry, Biology/Agricultural Science and Geography.",
      "UNILAG asks for Physics plus one of Chemistry, Economics, Biology or Geography."
    ],
    intro:
      "Statistics is the science of collecting, analysing and interpreting data. It is behind surveys, research, quality control, insurance and modern data science.",
    careers: ["Statistician", "Data analyst or data scientist", "Monitoring and evaluation officer", "Actuarial or insurance analyst", "Research officer"],
    related: ["mathematics", "economics", "computer-science"]
  },
  {
    slug: "geology",
    name: "Geology",
    faculty: "Sciences and Agriculture",
    combo: "Use of English and any three of Chemistry, Physics, Mathematics, Biology and Geography",
    rule: [
      ["Chemistry", "Physics", "Mathematics", "Biology", "Geography"],
      ["Chemistry", "Physics", "Mathematics", "Biology", "Geography"],
      ["Chemistry", "Physics", "Mathematics", "Biology", "Geography"]
    ],
    olevel: "Five credits including English Language, Mathematics, Chemistry and Biology, plus one other subject. Some schools ask for Physics as well.",
    notes: [
      "UNIPORT asks for Chemistry, Physics and Mathematics; BUK asks for Chemistry, Physics and Biology.",
      "UI asks for Physics, Chemistry and Biology or Mathematics."
    ],
    intro:
      "Geology studies the Earth: rocks, minerals, groundwater, oil and gas, and natural hazards. It is closely linked to Nigeria's oil, gas and solid minerals sectors.",
    careers: ["Petroleum geologist", "Mining or exploration geologist", "Hydrogeologist (water and boreholes)", "Environmental geologist", "Geotechnical engineer"],
    related: ["petroleum-engineering", "physics", "chemistry"]
  },
  {
    slug: "agriculture",
    name: "Agriculture",
    faculty: "Sciences and Agriculture",
    combo: "Use of English, Chemistry, Biology or Agricultural Science, and Physics or Mathematics",
    rule: [C, ["Biology", "Agricultural Science"], ["Physics", "Mathematics"]],
    olevel: "Five credits including English Language, Biology or Agricultural Science, Chemistry and one of Mathematics, Physics, Geography or Economics.",
    notes: ["FUTO accepts any three of Chemistry, Biology/Agricultural Science, Mathematics, Physics and Economics."],
    intro:
      "Agriculture covers crop and animal production, soil science, agricultural economics and extension. With growing demand for food in Nigeria, it leads into farming, agribusiness, research and government programmes.",
    careers: ["Agronomist or crop scientist", "Animal production specialist", "Agribusiness entrepreneur", "Agricultural extension officer", "Agricultural research scientist"],
    related: ["microbiology", "biochemistry", "geology"]
  },

  // ---------------- Education ----------------
  {
    slug: "guidance-and-counselling",
    name: "Guidance and Counselling",
    faculty: "Education",
    combo: "Use of English and any three subjects",
    rule: [ANY, ANY, ANY],
    olevel: "Five credits including English Language, with at least a pass in Mathematics.",
    notes: [
      "LASU asks for Economics, Mathematics and one of Government, History, Geography, Literature, French or CRS/IRS.",
      "UNIPORT lists the subjects it accepts, which include Mathematics, French, Literature, History/Government, CRS/IRS, Economics, Biology, Chemistry and Agricultural Science."
    ],
    intro:
      "Guidance and Counselling trains school counsellors and other professionals who help students and adults with learning, careers and personal problems. It is taught in the faculty of education.",
    careers: ["School counsellor", "Career guidance officer", "Rehabilitation counsellor", "Human resources officer", "Teacher or lecturer"],
    related: ["psychology", "sociology", "english"]
  }
];

export const courseBySlug = (slug) => COURSES.find((c) => c.slug === slug);
