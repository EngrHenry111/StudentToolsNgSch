// Job-specific application letter pages. All names, schools, hospitals and
// companies in the samples are invented.

const formatReminder = {
  p: "Use the standard formal layout: your address and date at the top, the employer's address on the left, Dear Sir/Madam, a heading in capital letters naming the job, three or four short paragraphs, Yours faithfully, your signature and your full name. The full format is explained in our guide on how to write an application letter."
};

export const teacherLetter = {
  slug: "teacher",
  path: "/application-letter-for-teaching-job",
  group: "Application Letter Samples",
  short: "Teaching job",
  title: "Application Letter for Teaching Job (With & Without Experience)",
  description: "Sample application letters for a teaching job in Nigeria, for experienced and new teachers, plus what principals and school owners look for.",
  h1: "Application Letter for a Teaching Job",
  intro:
    "Schools receive many letters for every teaching vacancy, so yours has to show quickly what you teach, to which classes, and why students do well with you. Below are two complete samples, one for an experienced teacher and one for a new graduate or NCE holder, and the points principals and school owners look for.",
  tool: "application",
  blocks: [
    { h2: "What schools look for in a teacher's application letter" },
    {
      ul: [
        "Your subject and the classes you can teach, stated in the first paragraph (for example, Mathematics for JSS 1 to SS 3).",
        "Your teaching qualification: B.Ed., B.Sc. (Ed.), NCE, or a degree plus a PGDE. Mention TRCN registration if you have it, since many schools prefer or require it.",
        "Evidence of results: WAEC or NECO pass rates, improvement in your students' scores, or competitions your students entered.",
        "Classroom skills: lesson planning, managing large classes, using projectors or simple digital tools, and caring for students' welfare.",
        "Extra value: running a club, coaching a sport, preparing students for external exams, or teaching a second subject."
      ]
    },
    { h2: "Format" },
    formatReminder,
    { h2: "Sample application letter for teaching job (with experience)" },
    {
      letter: `7, Unity Close,
Off Ring Road,
Ibadan, Oyo State.
08023456789
tunde.adewale@email.com
12th November, 2026.

The Principal,
Crestview College,
22, Bodija Estate Road,
Ibadan, Oyo State.

Dear Sir/Madam,

APPLICATION FOR THE POSITION OF MATHEMATICS TEACHER

I wish to apply for the position of Mathematics Teacher (Senior Secondary) advertised in your school's notice of 4th November, 2026. I hold a B.Sc. (Ed.) in Mathematics from Obafemi Awolowo University, I am registered with the Teachers Registration Council of Nigeria (TRCN), and I have five years' experience teaching Mathematics and Further Mathematics from JSS 3 to SS 3.

At Royal Gate Secondary School, where I have taught since 2021, 87 percent of my 2025 SS 3 students earned a credit or better in WAEC Mathematics, up from 64 percent when I joined. I achieved this by running weekly past-question clinics, giving short tests every Friday and meeting struggling students during free periods. I also coordinate the school's Mathematics Olympiad team, which reached the state final in 2024.

Crestview's reputation for strong science results is what attracts me to your school. I would bring well-planned lessons, steady exam preparation and a patient approach that helps students who are afraid of Mathematics to gain confidence.

Thank you for considering my application. I am available for an interview and a demonstration lesson at your convenience, and can be reached on 08023456789.

Yours faithfully,
(Signature)
TUNDE ADEWALE`,
      caption: "Experienced teacher"
    },
    { h2: "Sample application letter for teaching job (without experience)" },
    { p: "If you have no full-time teaching experience yet, lean on your teaching practice, NYSC posting, lesson classes you have run and your subject knowledge." },
    {
      letter: `14, Market Road,
Nsukka, Enugu State.
09087654321
grace.eze@email.com
12th November, 2026.

The Proprietor,
Little Stars Academy,
3, Odenigbo Street,
Nsukka, Enugu State.

Dear Sir/Madam,

APPLICATION FOR THE POSITION OF ENGLISH LANGUAGE TEACHER

I am writing to apply for the vacant position of English Language Teacher for junior secondary classes in your school. I recently completed my B.A. (Ed.) in English Language at the University of Nigeria, Nsukka, and my National Youth Service, during which I taught English to JSS 2 and JSS 3 students at Community Secondary School, Obollo.

During my service year I taught classes of up to 55 students, prepared weekly lesson notes and introduced a reading corner with donated storybooks, which helped many students improve their comprehension scores. My six weeks of teaching practice also gave me experience in continuous assessment and in marking essays to WAEC and BECE standards.

I am eager to begin my career in a school that values good conduct and strong communication skills, as Little Stars Academy does. I am willing to help with debate and the press club, and to support pupils who need extra help with reading.

I would be grateful for the opportunity to attend an interview or teach a sample lesson. I can be reached on 09087654321.

Yours faithfully,
(Signature)
GRACE EZE`,
      caption: "New teacher (NYSC or fresh graduate)"
    },
    { h2: "Tips for teachers" },
    {
      ul: [
        "Address the letter to the Principal, Head Teacher or Proprietor, as the advert says.",
        "Name the subject in the heading: APPLICATION FOR THE POSITION OF CHEMISTRY TEACHER, not just TEACHER.",
        "Offer a demonstration lesson. Many private schools test candidates this way, and offering shows confidence.",
        "Attach copies of your certificates, TRCN certificate (if any), NYSC discharge certificate and CV.",
        "For primary schools, mention child-friendly methods: phonics, songs, play-based learning and care for young pupils."
      ]
    }
  ],
  faq: [
    { q: "How do I start an application letter for a teaching job?", a: "Name the exact subject and level in the first sentence, then state your teaching qualification. For example: 'I wish to apply for the position of Biology Teacher for senior secondary classes. I hold a B.Sc. (Ed.) in Biology and I am TRCN-registered.'" },
    { q: "Who do I address a teaching application letter to?", a: "The Principal (secondary school), the Head Teacher (primary school) or the Proprietor or Proprietress (private school owner), unless the advert names someone else, such as the Admin Officer." },
    { q: "Can I apply for a teaching job without an education degree?", a: "Many private schools hire graduates with subject degrees, such as B.Sc. Physics, especially for science subjects. Mention any teaching you have done, and consider a PGDE and TRCN registration to improve your chances." },
    { q: "What documents go with a teacher's application letter?", a: "Your CV, copies of your certificates (degree or NCE, WAEC/NECO), NYSC discharge or exemption certificate, and TRCN certificate if you have one." }
  ],
  related: ["/how-to-write-an-application-letter", "/application-letter-for-school-admission", "/cv-format-nigeria", "/resignation-letter"]
};

export const nurseLetter = {
  slug: "nurse",
  path: "/application-letter-for-nurses",
  group: "Application Letter Samples",
  short: "Nurses",
  title: "Application Letter for Nurses (With & Without Experience)",
  description: "Sample application letters for nurses in Nigeria, with and without experience, and what hospitals check in a nurse's application.",
  h1: "Application Letter for Nurses",
  intro:
    "A nurse's application letter must show your licence, your clinical experience and the units you are comfortable working in. Hospitals also want to see that you can work shifts and handle pressure. Below are two samples, one for an experienced nurse and one for a newly qualified nurse, with tips that apply to government and private hospitals.",
  tool: "application",
  blocks: [
    { h2: "What hospitals look for" },
    {
      ul: [
        "Your qualification and licence: RN, RM, B.NSc, and your current Nursing and Midwifery Council of Nigeria (NMCN) licence. Say that your licence is current.",
        "Clinical areas you have worked in: medical-surgical, emergency, theatre, paediatrics, maternity, ICU or community health.",
        "Specific skills: triage, wound care, IV cannulation, drug administration, record keeping, infection control and patient education.",
        "Your readiness for shifts, including nights and weekends.",
        "Short evidence of patient care quality: commendations, audits you helped with, or training you completed (for example BLS)."
      ]
    },
    { h2: "Format" },
    formatReminder,
    { h2: "Sample application letter for nurses with experience" },
    {
      letter: `9, Hospital Road,
GRA, Ilorin,
Kwara State.
08056781234
aisha.bello@email.com
12th November, 2026.

The Director of Nursing Services,
Unity Specialist Hospital,
40, Taiwo Road,
Ilorin, Kwara State.

Dear Sir/Madam,

APPLICATION FOR THE POSITION OF REGISTERED NURSE (EMERGENCY UNIT)

I wish to apply for the position of Registered Nurse in your Emergency Unit, as advertised on your hospital's website. I am a Registered Nurse and Registered Midwife with a current licence from the Nursing and Midwifery Council of Nigeria, and I have four years' experience in emergency and medical-surgical nursing.

At Kwara General Hospital I work in a 20-bed emergency department that receives about 40 patients a day. I triage patients, start IV lines, give medications, monitor critically ill patients and keep accurate records. I hold a current Basic Life Support certificate and I recently helped my unit introduce a simple handover checklist that reduced missed medication doses.

Unity Specialist Hospital's commitment to quick, compassionate emergency care matches the kind of nursing I want to practise. I work well in a team, stay calm under pressure, and I am available for day, night and weekend shifts.

Thank you for considering my application. I would welcome the chance to discuss it at an interview and can be reached on 08056781234.

Yours faithfully,
(Signature)
AISHA BELLO, RN, RM`,
      caption: "Experienced nurse"
    },
    { h2: "Sample application letter for nurses without experience" },
    {
      letter: `5, Okpara Avenue,
Enugu, Enugu State.
07034567812
ngozi.nwosu@email.com
12th November, 2026.

The Human Resources Manager,
Graceland Hospital,
18, Ogui Road,
Enugu, Enugu State.

Dear Sir/Madam,

APPLICATION FOR THE POSITION OF STAFF NURSE

I am writing to apply for the position of Staff Nurse at Graceland Hospital. I recently qualified as a Registered Nurse with a Bachelor of Nursing Science from the University of Nigeria, Enugu Campus, and I have received my licence from the Nursing and Midwifery Council of Nigeria.

During my clinical training and internship I rotated through medical, surgical, paediatric and maternity wards. I took patients' vital signs, gave prescribed medications under supervision, dressed wounds, educated mothers on breastfeeding and immunisation, and kept careful nursing records. My supervisors commended my attention to detail and my calm manner with anxious patients.

I am keen to begin my career in a hospital known for patient-centred care, and I am ready to learn quickly, follow hospital protocols and work any shift required.

Thank you for your time. I am available for an interview at your convenience and can be reached on 07034567812.

Yours faithfully,
(Signature)
NGOZI NWOSU, RN`,
      caption: "Newly qualified nurse"
    },
    { h2: "Tips for nurses" },
    {
      ul: [
        "Put your professional letters after your name: RN, RM, RPHN, B.NSc.",
        "Name the unit if the advert does (Theatre, ICU, Emergency), and match your experience to it.",
        "Attach your licence, certificates, CV and any short courses such as BLS or ACLS.",
        "Never claim procedures you have not done. Interview panels often ask practical questions.",
        "For government hospitals, follow the advert's instructions exactly: many require online forms or specific document lists."
      ]
    }
  ],
  faq: [
    { q: "How do I write an application letter as a nurse?", a: "Address it to the Director of Nursing Services or HR Manager, name the position in the heading, state your qualification and NMCN licence in the first paragraph, describe your clinical experience and skills, and close by saying you are available for an interview and for shifts." },
    { q: "What should a newly qualified nurse write in an application letter?", a: "Focus on your clinical rotations, the skills you practised under supervision, your licence, and your willingness to learn and work shifts. Mention commendations from supervisors if you have them." },
    { q: "Should I mention my licence number?", a: "Saying your licence is current is enough in the letter. Include the licence number on your CV or attach a copy of the licence, as the advert asks." }
  ],
  related: ["/how-to-write-an-application-letter", "/cv-format-nigeria", "/application-letter-for-teaching-job", "/resignation-letter"]
};

export const hotelLetter = {
  slug: "hotel",
  path: "/application-letter-for-hotel-job",
  group: "Application Letter Samples",
  short: "Hotel job",
  title: "Application Letter for Hotel Job: Receptionist, Cleaner, Kitchen",
  description: "Sample application letters for hotel jobs in Nigeria: receptionist, housekeeping/cleaner and kitchen assistant, with tips on what hotel managers look for.",
  h1: "Application Letter for a Hotel Job",
  intro:
    "Hotels hire for many roles, from front desk to housekeeping and the kitchen, and managers want staff who are reliable, presentable and good with guests. A short, clear letter that names the exact role and shows those qualities can get you an interview even without a degree. Below are three samples: receptionist, cleaner (housekeeping) and kitchen assistant.",
  tool: "application",
  blocks: [
    { h2: "What hotel managers look for" },
    {
      ul: [
        "Good customer service and a polite, calm manner with guests.",
        "Reliability: punctuality, honesty and willingness to work shifts, weekends and public holidays.",
        "Neat appearance and good personal hygiene, especially for front office, restaurant and kitchen roles.",
        "Any relevant experience, even informal: working in a shop, restaurant, event centre or family business counts.",
        "Basic certificates where relevant, such as food hygiene training or a hospitality course."
      ]
    },
    { h2: "Format" },
    formatReminder,
    { h2: "Sample application letter for hotel receptionist" },
    {
      letter: `11, Akin Ogunlewe Street,
Victoria Island, Lagos.
08123456780
mary.johnson@email.com
12th November, 2026.

The Front Office Manager,
Palmview Hotel and Suites,
8, Ozumba Mbadiwe Avenue,
Victoria Island, Lagos.

Dear Sir/Madam,

APPLICATION FOR THE POSITION OF FRONT DESK RECEPTIONIST

I wish to apply for the position of Front Desk Receptionist at Palmview Hotel and Suites. I hold an OND in Hospitality Management from Yaba College of Technology and I have one year's experience as a receptionist at a busy guest house in Surulere.

In my current role I check guests in and out, take phone and online reservations, handle payments with a POS terminal, and resolve guest complaints politely and quickly. I am comfortable using hotel booking software and Microsoft Excel, and I speak English, Yoruba and basic French.

I admire Palmview's reputation for warm service to business travellers, and I would be proud to be the first friendly face your guests meet. I am available for morning, evening and weekend shifts.

Thank you for considering my application. I can be reached on 08123456780.

Yours faithfully,
(Signature)
MARY JOHNSON`,
      caption: "Receptionist"
    },
    { h2: "Sample application letter for a cleaner job in a hotel" },
    {
      letter: `3, Church Street,
Wuse 2, Abuja.
08098765432
14th November, 2026.

The Housekeeping Supervisor,
Capital Crest Hotel,
Plot 120, Aminu Kano Crescent,
Wuse 2, Abuja.

Dear Sir/Madam,

APPLICATION FOR THE POSITION OF ROOM ATTENDANT (CLEANER)

I am applying for the position of Room Attendant in your housekeeping department. I have SSCE (WAEC) and two years' experience cleaning offices for a facility management company in Garki.

I clean and arrange rooms to a checklist, change linen, restock supplies and report any damage or lost items to my supervisor. I am careful with cleaning chemicals, I work fast without cutting corners, and my supervisor can confirm that I have never missed a shift without notice.

I would like to join Capital Crest Hotel because of its high standards, and I am ready to work any shift you need.

Thank you for your consideration. I can be reached on 08098765432.

Yours faithfully,
(Signature)
JOSEPH AUDU`,
      caption: "Cleaner / room attendant"
    },
    { h2: "Sample application letter for kitchen assistant in a hotel" },
    {
      letter: `21, Ogui New Layout,
Enugu, Enugu State.
08167890123
12th November, 2026.

The Executive Chef,
Coal City Grand Hotel,
5, Presidential Road,
Enugu, Enugu State.

Dear Sir/Madam,

APPLICATION FOR THE POSITION OF KITCHEN ASSISTANT

I wish to apply for the position of Kitchen Assistant at Coal City Grand Hotel. I completed a six-month catering course at a vocational centre in Enugu and I have worked for a year in a busy restaurant kitchen.

I wash, peel and cut ingredients, help prepare Nigerian and continental dishes, keep work surfaces and utensils clean, and store food correctly to keep it safe. I follow food hygiene rules, work well under pressure during rush hours, and take instructions from the chef carefully.

I would value the chance to learn from your kitchen team and grow towards becoming a cook. I am available for early morning and late shifts.

Thank you for considering my application. I can be reached on 08167890123.

Yours faithfully,
(Signature)
EMEKA OKONKWO`,
      caption: "Kitchen assistant"
    },
    { h2: "Tips for hotel job applications" },
    {
      ul: [
        "Address the letter to the right department head: Front Office Manager, Housekeeping Supervisor, Executive Chef or Human Resources Manager.",
        "Keep it short: hotel managers prefer three tidy paragraphs.",
        "Deliver it neatly. If you submit by hand, dress smartly, since first impressions matter in hospitality.",
        "If you have no hotel experience, mention any customer-facing or cleaning work, including church, event or family business work."
      ]
    }
  ],
  faq: [
    { q: "How do I write an application letter for a hotel job?", a: "Name the exact role in the heading (Receptionist, Room Attendant, Kitchen Assistant), address it to the department head or HR, mention your relevant experience and qualities such as reliability and good customer service, and say you can work shifts." },
    { q: "Can I apply for a hotel job with only WAEC?", a: "Yes. Many hotel roles such as room attendant, kitchen assistant, porter and laundry staff need SSCE plus reliability and willingness to learn. Front office and supervisory roles often prefer an OND, HND or degree." },
    { q: "Who do I address a hotel application letter to?", a: "The manager of the department you want to join, or the Human Resources Manager if the advert says so or you are unsure." }
  ],
  related: ["/how-to-write-an-application-letter", "/application-letter-for-sales-job", "/cv-format-nigeria", "/cover-letter-for-job-application"]
};

export const salesLetter = {
  slug: "sales",
  path: "/application-letter-for-sales-job",
  group: "Application Letter Samples",
  short: "Sales job",
  title: "Application Letter for Sales Job: Sales Girl & Sales Rep Samples",
  description: "Sample application letters for sales jobs in Nigeria, for a sales girl or boy in a shop and a field sales representative, with tips on showing sales results.",
  h1: "Application Letter for a Sales Job",
  intro:
    "Sales managers want people who can talk to customers, close sales and be trusted with money and stock. Your application letter should show that you are confident, honest and target-driven, and give numbers whenever you can. Below are two samples: one for a shop sales attendant (often advertised as a sales girl or sales boy) and one for a field sales representative.",
  tool: "application",
  blocks: [
    { h2: "What sales employers look for" },
    {
      ul: [
        "Communication: speaking politely and clearly with different kinds of customers, in English and local languages.",
        "Results: sales targets met, new customers won, or repeat customers you built.",
        "Honesty with cash, POS transactions and stock.",
        "Product knowledge, or proof that you learn products quickly.",
        "For field roles: willingness to travel, knowledge of the area, and ideally a driving licence."
      ]
    },
    { h2: "Format" },
    formatReminder,
    { h2: "Sample application letter for a sales girl or sales attendant" },
    {
      letter: `6, Ojo Road,
Ajegunle, Lagos State.
08145678901
blessing.uche@email.com
12th November, 2026.

The Manager,
Bella Fashion Store,
45, Allen Avenue,
Ikeja, Lagos State.

Dear Sir/Madam,

APPLICATION FOR THE POSITION OF SALES ATTENDANT

I wish to apply for the position of Sales Attendant advertised at your store. I have SSCE (WAEC) and two years' experience selling clothes and accessories at a boutique in Yaba.

At my current job I welcome customers, help them choose items, handle cash and POS payments, keep the shop tidy and record daily sales. In the last festive season I sold the most items in our shop for two months in a row, and many of my customers return and ask for me by name.

Bella Fashion Store's stylish collections and loyal customers make it a place where I would enjoy working and helping to grow sales. I am honest, punctual and available to work weekends.

Thank you for considering my application. I can be reached on 08145678901.

Yours faithfully,
(Signature)
BLESSING UCHE`,
      caption: "Shop sales attendant"
    },
    { h2: "Sample application letter for a sales representative" },
    {
      letter: `18, Zoo Road,
Kano, Kano State.
08034561234
ibrahim.musa@email.com
12th November, 2026.

The Regional Sales Manager,
Northstar Foods Limited,
27, Bompai Industrial Estate,
Kano, Kano State.

Dear Sir/Madam,

APPLICATION FOR THE POSITION OF FIELD SALES REPRESENTATIVE

I wish to apply for the position of Field Sales Representative for Kano and Jigawa, advertised on Jobberman on 2nd November, 2026. I have a B.Sc. in Marketing from Bayero University Kano and three years' experience selling fast-moving consumer goods to retailers and distributors.

In my current role with a beverage company, I manage 120 retail outlets across six local government areas. I grew monthly sales in my territory by 35 percent in 2025, opened 28 new outlets, and consistently met my collection targets. I am fluent in English and Hausa, I hold a valid driving licence, and I report daily sales using a mobile sales app.

Northstar's strong brands and its plans to expand in the North-West match my experience and network. I am confident I can grow your distribution and visibility in my territory.

Thank you for considering my application. I would welcome an interview and can be reached on 08034561234.

Yours faithfully,
(Signature)
IBRAHIM MUSA`,
      caption: "Field sales representative"
    },
    { h2: "Tips for sales applications" },
    {
      ul: [
        "Give numbers: sales growth, outlets covered, customers served or targets met.",
        "Mention the languages you speak, since they matter in sales.",
        "Show integrity: say you handled cash or stock responsibly.",
        "Use the job title from the advert in your heading, even if the advert says 'sales girl'; you can write SALES ATTENDANT or SALES REPRESENTATIVE if the advert allows."
      ]
    }
  ],
  faq: [
    { q: "How do I write an application letter for a sales job?", a: "Name the role in the heading, say where you saw the advert, show your sales experience with numbers (targets, customers, growth), mention honesty with money and stock, and say you are available for an interview." },
    { q: "What do I write if I have no sales experience?", a: "Use any experience of dealing with people or money: helping in a family shop, selling online, church or student association roles, or customer-facing NYSC work. Show that you are confident, honest and quick to learn." },
    { q: "Is 'sales girl' a proper job title to use?", a: "It is common in adverts. In your letter you can use the advert's title or a neutral one such as Sales Attendant, so long as the employer can match it to the vacancy." }
  ],
  related: ["/how-to-write-an-application-letter", "/application-letter-for-hotel-job", "/cover-letter-for-job-application", "/cv-format-nigeria"]
};

export const internshipLetter = {
  slug: "internship",
  path: "/application-letter-for-internship",
  group: "Application Letter Samples",
  short: "Internship / SIWES",
  title: "Application Letter for Internship, IT and SIWES Placement",
  description: "Sample application letters for industrial training (IT/SIWES) placement and graduate internships in Nigeria, with what to include and what to attach.",
  h1: "Application Letter for Internship and IT (SIWES) Placement",
  intro:
    "University and polytechnic students on SIWES (industrial training) need a company to accept them for three to twelve months, and graduates often apply for internships to gain experience. Companies say yes to students who are clear about their course, duration and what they want to learn. Here are two samples: an IT/SIWES placement letter and a graduate internship letter.",
  tool: "application",
  blocks: [
    { h2: "What to include in an IT or internship application" },
    {
      ul: [
        "Your course, level and institution, for example 300 level Computer Science, University of Ilorin.",
        "The type of placement (SIWES / industrial training) and its duration with start and end dates.",
        "The department or kind of work you want, linked to your course.",
        "Skills you already have, such as Microsoft Excel, AutoCAD, programming or laboratory techniques.",
        "That your school's introduction or placement letter is attached, if your institution provides one."
      ]
    },
    { h2: "Format" },
    formatReminder,
    { h2: "Sample application letter for IT (SIWES) placement" },
    {
      letter: `Department of Electrical Engineering,
University of Ilorin,
Ilorin, Kwara State.
08134567890
david.ojo@email.com
12th November, 2026.

The Human Resources Manager,
Powerline Engineering Services Limited,
12, Ahmadu Bello Way,
Ilorin, Kwara State.

Dear Sir/Madam,

APPLICATION FOR INDUSTRIAL TRAINING (SIWES) PLACEMENT

I am a 400 level student of Electrical and Electronics Engineering at the University of Ilorin, and I am writing to request a place for my six-month Students Industrial Work Experience Scheme (SIWES) in your company, from January to June 2027.

I am keen to gain practical experience in electrical installation, power distribution and maintenance, which are central to my course. I can read basic electrical drawings, I have used multimeters and wiring tools in our department's laboratories, and I am learning AutoCAD Electrical.

Powerline's work on industrial installations across Kwara State would give me the hands-on experience I need. I will be punctual, follow all safety rules and support your engineers in any way I can.

My department's SIWES introduction letter and my CV are attached. Thank you for considering my request. I can be reached on 08134567890.

Yours faithfully,
(Signature)
DAVID OJO`,
      caption: "SIWES / IT placement"
    },
    { h2: "Sample application letter for a graduate internship" },
    {
      letter: `33, Aba Road,
Port Harcourt, Rivers State.
09012345678
favour.eke@email.com
12th November, 2026.

The Head of Talent,
Brightpath Digital Agency,
9, Olu Obasanjo Road,
Port Harcourt, Rivers State.

Dear Sir/Madam,

APPLICATION FOR THE DIGITAL MARKETING INTERNSHIP

I wish to apply for your six-month Digital Marketing Internship advertised on Instagram on 6th November, 2026. I graduated in Mass Communication from Rivers State University in 2025 and I have just completed my NYSC.

During my service year I managed the social media pages of the local government information office, growing its Facebook followers from 900 to 4,000 and designing posts in Canva. I have completed the Google Digital Garage course and I am comfortable with Meta Business Suite and basic analytics.

Brightpath's work for small businesses across the South-South is exactly the kind of practical experience I want, and I am ready to learn quickly and contribute fresh ideas.

Thank you for considering my application. I can be reached on 09012345678.

Yours faithfully,
(Signature)
FAVOUR EKE`,
      caption: "Graduate internship"
    },
    { h2: "Tips" },
    {
      ul: [
        "Apply early: many companies fill SIWES places months before the training period starts.",
        "Ask your department for its introduction letter and attach it.",
        "Visit the company in person with a printed copy if possible, and ask for the HR or admin office.",
        "Apply to several companies at once and follow up after one or two weeks."
      ]
    }
  ],
  faq: [
    { q: "How do I write an application letter for SIWES?", a: "Say your course, level and institution, request a place for industrial training with exact dates, say which kind of work you want to learn, mention skills you already have, and attach your school's introduction letter and CV." },
    { q: "Who do I address an IT letter to?", a: "The Human Resources Manager, Admin Manager or the head of the relevant department (for example The Chief Engineer), depending on the company." },
    { q: "Do I need a CV for IT placement?", a: "It helps. A one-page CV with your course, skills, projects and contact details makes you look prepared. Our CV Builder can create one quickly." }
  ],
  related: ["/how-to-write-an-application-letter", "/cv-format-nigeria", "/cover-letter-for-job-application", "/acceptance-letter"]
};

export const schoolAdmissionLetter = {
  slug: "school-admission",
  path: "/application-letter-for-school-admission",
  group: "Application Letter Samples",
  short: "School admission",
  title: "Application Letter for School Admission (For a Child or Yourself)",
  description: "Sample application letters for school admission in Nigeria: a parent applying for a child's admission and a student applying for themselves, with tips.",
  h1: "Application Letter for School Admission",
  intro:
    "Some schools ask parents to write a letter when applying for a child's admission, especially when a family relocates mid-session or a school has a waiting list. Students sometimes write their own letters for admission, transfer or a scholarship place. Below are two samples: one written by a parent for a child and one written by a student for themselves.",
  blocks: [
    { h2: "What to include" },
    {
      ul: [
        "The child's full name, age or date of birth, and the class they are applying for.",
        "Their current or last school, and why you are applying (relocation, preference, transfer).",
        "A brief note on the child's performance, interests and conduct.",
        "Your contact details, and that you are ready for any entrance test or interview."
      ]
    },
    { h2: "Format" },
    { p: "Use the formal letter layout: your address and the date at the top, the school's address on the left (addressed to The Principal, The Head Teacher or The Admissions Officer), Dear Sir/Madam, a heading such as APPLICATION FOR ADMISSION INTO JSS 1, the body, Yours faithfully, your signature and name." },
    { h2: "Sample application letter for school admission for a child" },
    {
      letter: `15, Kingsway Road,
Old GRA, Port Harcourt,
Rivers State.
08033334444
12th November, 2026.

The Head Teacher,
Riverside Nursery and Primary School,
7, Forces Avenue,
Old GRA, Port Harcourt.

Dear Sir/Madam,

APPLICATION FOR ADMISSION INTO PRIMARY 3 FOR MY SON, DANIEL OKORO

I write to apply for admission for my son, Daniel Okoro, into Primary 3 in your school for the second term of the 2026/2027 session. Daniel is eight years old and currently in Primary 3 at Sunshine Primary School, Abuja. Our family is relocating to Port Harcourt in December because of my job transfer.

Daniel is a well-behaved and curious pupil. He came third in his class last term, enjoys reading and Mathematics, and is a member of his school's choir. His latest report card and birth certificate are attached.

We chose Riverside because of its strong academic record and its care for pupils. Daniel is ready to sit any entrance assessment you require, and we can visit the school at your convenience.

Thank you for considering this application. I can be reached on 08033334444.

Yours faithfully,
(Signature)
MR. CHINEDU OKORO`,
      caption: "Parent applying for a child"
    },
    { h2: "Sample application letter for school admission for yourself" },
    {
      letter: `20, Station Road,
Ilorin, Kwara State.
08066667777
12th November, 2026.

The Principal,
Kwara Model College,
Fate Road,
Ilorin, Kwara State.

Dear Sir/Madam,

APPLICATION FOR ADMISSION INTO SS 1 (SCIENCE CLASS)

I am writing to apply for admission into SS 1 science class in your school for the 2026/2027 session. I recently completed JSS 3 at Unity Secondary School, Offa, and I passed my Basic Education Certificate Examination (BECE) with credits in all subjects, including distinctions in Mathematics and Basic Science.

I want to study Medicine in future, and Kwara Model College's well-equipped laboratories and excellent WAEC results in the sciences make it the best place for me to prepare. I was the assistant class captain in JSS 3 and a member of my school's JETS club.

I am ready to sit your entrance examination and attend an interview. Copies of my BECE result and testimonial are attached, and my parents support this application.

Thank you for considering my application.

Yours faithfully,
(Signature)
AMINAT YUSUF`,
      caption: "Student applying for themselves"
    },
    { h2: "Tips" },
    {
      ul: [
        "Attach the documents schools usually ask for: last report card or result, birth certificate, passport photographs and transfer letter if applicable.",
        "Be specific about the class and session.",
        "Keep a polite, positive tone and avoid criticising the previous school.",
        "Follow up with a visit or phone call after a week."
      ]
    }
  ],
  faq: [
    { q: "How do I write an application letter for my child's admission?", a: "Address it to the Head Teacher or Principal, give your child's full name, age and the class you want, explain why you are applying (for example relocation), mention their performance and conduct, list the documents attached, and say they are ready for any entrance test." },
    { q: "Who signs a school admission letter for a child?", a: "The parent or guardian signs it, with their full name and phone number." },
    { q: "What should a student write in an admission letter?", a: "The class you want, your last school and results, why you chose the school, any leadership roles or activities, and that you are ready to write their entrance examination." }
  ],
  related: ["/how-to-write-an-application-letter", "/formal-letter-format", "/application-letter-for-teaching-job", "/permission-letter"]
};

export const JOB_LETTERS = [teacherLetter, nurseLetter, hotelLetter, salesLetter, internshipLetter, schoolAdmissionLetter];
