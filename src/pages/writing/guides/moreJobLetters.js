// More job-specific application letter pages (bank, driver, secretary,
// factory). All names, banks, companies and addresses are invented.

const formatReminder = {
  p: "Use the standard formal layout: your address and date at the top, the employer's address on the left, Dear Sir/Madam, a heading in capital letters naming the job, three or four short paragraphs, Yours faithfully, your signature and your full name. The full format is explained in our guide on how to write an application letter."
};

export const bankLetter = {
  slug: "bank",
  path: "/application-letter-for-bank-job",
  group: "Application Letter Samples",
  short: "Bank job",
  title: "Application Letter for Bank Job (Customer Service & Trainee)",
  description: "Sample application letters for bank jobs in Nigeria: customer service, teller and graduate trainee roles, with what banks look for and tips to stand out.",
  h1: "Application Letter for a Bank Job",
  intro:
    "Banks receive thousands of applications for every recruitment drive, and most are screened quickly. Your letter has to show at a glance that you are accurate with figures, honest, good with customers and comfortable with technology. Below are two complete samples, one for a customer service or teller role and one for a graduate trainee programme, plus the points recruiters in banks check first.",
  tool: "application",
  blocks: [
    { h2: "What banks look for in an application letter" },
    {
      ul: [
        "Your degree or HND and class of grade. Many graduate programmes state a minimum (often a Second Class Lower or Lower Credit), so state yours clearly if you meet it.",
        "Accuracy and integrity: banks handle money and customer data, so any experience counting cash, keeping records or handling confidential information is valuable.",
        "Customer service: dealing politely with difficult customers, explaining products clearly and solving complaints.",
        "Sales ability: opening accounts, selling savings or loan products, or meeting targets in any earlier job.",
        "Digital skills: Microsoft Excel, mobile and internet banking apps, POS terminals and basic data entry.",
        "Your NYSC status: completed, exempted or currently serving."
      ]
    },
    { h2: "Format" },
    formatReminder,
    { h2: "Sample application letter for a bank customer service or teller role" },
    {
      letter: `15, Allen Avenue,
Ikeja, Lagos State.
08034567812
chiamaka.obi@email.com
12th November, 2026.

The Head, Human Resources,
Unity Trust Bank Plc,
40, Marina Road,
Lagos Island, Lagos State.

Dear Sir/Madam,

APPLICATION FOR THE POSITION OF CUSTOMER SERVICE OFFICER

I wish to apply for the position of Customer Service Officer advertised on your bank's careers page. I hold a B.Sc. in Banking and Finance (Second Class Upper) from the University of Lagos, I have completed my NYSC, and I have eighteen months' experience in customer-facing roles where accuracy and patience matter.

At Quickpay Microfinance Bank, where I worked as a front-desk officer, I handled an average of 60 customers a day, opened new savings accounts, processed cash deposits and withdrawals, and resolved complaints about failed transfers. My till balanced every day for my last twelve months, and my branch manager twice named me staff of the month for customer feedback. I am confident with Microsoft Excel, POS terminals and mobile banking apps, and I enjoy explaining products to customers who are new to banking.

I admire Unity Trust Bank's focus on small businesses and its growing digital banking services. I would bring a calm manner with customers, careful cash handling and a willingness to learn every product your branch offers.

Thank you for considering my application. My CV and credentials are attached, and I am available for a test or interview at your convenience. I can be reached on 08034567812.

Yours faithfully,
(Signature)
CHIAMAKA OBI`,
      caption: "Customer service / teller (with some experience)"
    },
    { h2: "Sample application letter for a bank graduate trainee programme" },
    { p: "Graduate trainee programmes look for potential rather than experience. Lean on your degree, leadership roles, internships (SIWES) and any evidence that you learn quickly and work well under pressure." },
    {
      letter: `22, Lagos Street,
Ebute Metta, Lagos State.
09045671234
ibrahim.musa@email.com
12th November, 2026.

The Recruitment Manager,
Crown Capital Bank Limited,
8, Adeola Odeku Street,
Victoria Island, Lagos State.

Dear Sir/Madam,

APPLICATION FOR THE GRADUATE TRAINEE PROGRAMME

I am writing to apply for a place on your 2027 Graduate Trainee Programme. I graduated with a B.Sc. in Economics (Second Class Upper) from Ahmadu Bello University, Zaria, and I completed my NYSC in October, 2026.

During my six-month SIWES placement at a commercial bank branch in Kaduna, I supported the operations team with account opening, cheque confirmation and filing, and I prepared a weekly Excel report on new accounts for the branch manager. As treasurer of my department's students' association, I managed a budget of over one million naira and presented audited accounts at the end of my tenure. These roles taught me to be careful with money, to keep accurate records and to communicate clearly with people at every level.

Crown Capital Bank's reputation for training young professionals is the main reason I am applying. I am eager to learn every area of banking, from operations to relationship management, and I am willing to be posted to any branch in Nigeria.

Thank you for considering my application. I look forward to the opportunity to take your aptitude test and attend an interview.

Yours faithfully,
(Signature)
IBRAHIM MUSA`,
      caption: "Graduate trainee (fresh graduate)"
    },
    { h2: "Tips for bank job applications" },
    {
      ul: [
        "Apply only through the bank's official careers page or email address. Banks do not charge application fees, and any request for payment is a scam.",
        "Prepare for the aptitude test: numerical reasoning, verbal reasoning and logical reasoning questions are common.",
        "Use figures: number of customers served, accounts opened, targets met or budgets managed.",
        "Keep a clean, professional email address and make sure your phone is always reachable during recruitment.",
        "Attach a well-arranged CV. Our CV Builder gives you a clean layout in minutes."
      ]
    }
  ],
  faq: [
    { q: "How do I write an application letter for a bank job with no experience?", a: "Focus on your degree and grade, your SIWES or internship, any role where you handled money or records (such as class treasurer) and your computer skills. Say that you are willing to learn and to be posted to any branch." },
    { q: "Who do I address a bank application letter to?", a: "Use the title in the advert, for example The Head, Human Resources, or The Recruitment Manager. If no title is given, The Human Resources Manager is safe." },
    { q: "Do Nigerian banks require a minimum grade?", a: "Many graduate trainee programmes state a minimum class of degree, often Second Class Lower or Lower Credit for HND. Always check the advert, as requirements differ from bank to bank and year to year." },
    { q: "Do I pay to apply for a bank job?", a: "No. Genuine banks do not charge application or interview fees. Treat any request for payment as a scam and apply only through the bank's official website." }
  ],
  related: ["/how-to-write-an-application-letter", "/application-letter-for-sales-job", "/cv-format-nigeria", "/cover-letter-for-job-application"]
};

export const driverLetter = {
  slug: "driver",
  path: "/application-letter-for-driver",
  group: "Application Letter Samples",
  short: "Driver",
  title: "Application Letter for Driver Job (Company & Personal Driver)",
  description: "Sample application letters for driver jobs in Nigeria, for company and personal drivers, with what employers check and the documents to attach.",
  h1: "Application Letter for a Driver Job",
  intro:
    "Employers hiring a driver want to know three things: that you hold a valid licence, that you drive safely, and that you can be trusted with their vehicle, goods or family. A short, neat letter that answers those questions puts you ahead of applicants who simply write 'I am a good driver'. Below are two samples, one for a company or official driver and one for a personal or family driver.",
  tool: "application",
  blocks: [
    { h2: "What employers look for in a driver" },
    {
      ul: [
        "A valid driver's licence of the right class for the vehicle (car, bus or truck), issued by the Federal Road Safety Corps (FRSC). State its class and that it is current.",
        "Years of driving experience and the kinds of vehicles you have driven.",
        "A clean safety record: no serious accidents or traffic offences.",
        "Knowledge of the city's roads and routes, and of the long-distance routes the job may require.",
        "Basic vehicle care: checking oil, water, tyres and brakes, and keeping the vehicle clean and serviced.",
        "Honesty, punctuality and discretion, especially for personal drivers who carry family members or executives."
      ]
    },
    { h2: "Format" },
    formatReminder,
    { h2: "Sample application letter for a company driver" },
    {
      letter: `4, Ojo Road,
Ajegunle, Lagos State.
08056781234
12th November, 2026.

The Admin Manager,
Greenfield Logistics Limited,
17, Apapa Road,
Apapa, Lagos State.

Dear Sir/Madam,

APPLICATION FOR THE POSITION OF COMPANY DRIVER

I wish to apply for the position of Company Driver advertised in your office on 5th November, 2026. I hold a valid Class E driver's licence and have eight years' experience driving cars, buses and light trucks for companies in Lagos.

For the past five years I have worked as a staff bus and pool driver at Bright Foods Limited, where I carried staff to and from work, delivered documents to banks and government offices, and drove managers on trips to Ibadan, Abeokuta and Benin. In that time I had no accident or traffic offence. I check the vehicle's oil, water, tyres and brakes every morning, keep a logbook of fuel and mileage, and report faults early so the vehicle is serviced on time.

I know Lagos roads well, including alternative routes around heavy traffic, and I am always punctual. I am also willing to work early mornings, late evenings and weekends when the company needs me.

Thank you for considering my application. I am ready for a driving test at any time, and I can be reached on 08056781234.

Yours faithfully,
(Signature)
SAMUEL OKON`,
      caption: "Company / pool driver"
    },
    { h2: "Sample application letter for a personal or family driver" },
    {
      letter: `11, Wuse Close,
Wuse Zone 3, Abuja.
07012345678
12th November, 2026.

Mr and Mrs Adebayo,
26, Gana Street,
Maitama, Abuja.

Dear Sir/Madam,

APPLICATION FOR THE POSITION OF FAMILY DRIVER

I am writing to apply for the position of family driver, which I learnt about from Mr Daniel Eze, your neighbour, for whom I drove for four years until he relocated abroad.

I hold a valid driver's licence and have six years' experience driving within Abuja. As Mr Eze's driver, I took his children to and from school every day, drove the family to church and on visits, and handled errands such as shopping and paying bills. The family trusted me with their children's safety and with their home, and Mr Eze has agreed to act as my referee.

I drive carefully and calmly, I keep the car clean and serviced, and I respect the privacy of the family I work for. I am available to start immediately and can work weekends when needed.

Thank you for considering my application. I can be reached on 07012345678.

Yours faithfully,
(Signature)
PETER AUDU`,
      caption: "Personal / family driver"
    },
    { h2: "Documents to attach" },
    {
      ul: [
        "A photocopy of your valid driver's licence.",
        "A short CV listing previous employers and the vehicles you drove.",
        "Your school certificate (WAEC, NECO or First School Leaving Certificate), if you have one.",
        "Letters of reference from previous employers, or names and phone numbers of referees.",
        "A passport photograph, if the employer asks for one."
      ]
    },
    { h2: "Tips for drivers" },
    {
      ul: [
        "Keep the letter short and clear: four short paragraphs are enough.",
        "Name the vehicles you can drive: saloon cars, SUVs, 18-seater buses, trucks.",
        "Mention long-distance routes you know if the job involves travel.",
        "Offer to take a driving test. Employers like applicants who are confident enough to be tested.",
        "If you cannot write the letter yourself, use our Letter Generator and print the result."
      ]
    }
  ],
  faq: [
    { q: "How do I write an application letter for a driver job?", a: "State the job you want, the class of your driver's licence and your years of experience in the first paragraph. Then describe the vehicles you have driven, your safety record and your care for vehicles, and end by offering to take a driving test." },
    { q: "Does a driver need a CV?", a: "A short one-page CV is a good idea. List your previous employers, the vehicles you drove, your licence class and your referees." },
    { q: "What should a personal driver's letter emphasise?", a: "Trust and discretion: safe driving, punctuality, care for children or elderly passengers, and respect for the family's privacy. A reference from a previous family employer helps a lot." }
  ],
  related: ["/how-to-write-an-application-letter", "/letter-generator", "/application-letter-for-factory-job", "/reference-letter"]
};

export const secretaryLetter = {
  slug: "secretary",
  path: "/application-letter-for-secretary",
  group: "Application Letter Samples",
  short: "Secretary",
  title: "Application Letter for Secretary & Admin Officer Jobs",
  description: "Sample application letters for secretary, receptionist and admin officer jobs in Nigeria, with the skills employers look for and tips to get shortlisted.",
  h1: "Application Letter for a Secretary or Admin Officer Job",
  intro:
    "A secretary's application letter is itself a test: employers judge your spelling, layout and tone before they read your qualifications. It should be faultless, well arranged and to the point. Below are two samples, one for an experienced secretary and one for a fresh OND or HND graduate applying for an admin or reception role, with the skills employers want to see.",
  tool: "application",
  blocks: [
    { h2: "Skills employers look for" },
    {
      ul: [
        "Typing speed and accuracy, and good knowledge of Microsoft Word, Excel, PowerPoint and email.",
        "Managing diaries, booking meetings and travel, and taking minutes.",
        "Filing and record keeping, both paper and electronic.",
        "Handling phone calls and visitors politely and professionally.",
        "Discretion with confidential documents.",
        "Good written English: letters, memos and reports without errors.",
        "A qualification in Office Technology and Management (OTM), Secretarial Studies, Business Administration or a related course."
      ]
    },
    { h2: "Format" },
    formatReminder,
    { h2: "Sample application letter for a secretary (with experience)" },
    {
      letter: `9, Ogui Road,
Enugu, Enugu State.
08098765432
blessing.nwosu@email.com
12th November, 2026.

The Managing Director,
Pinecrest Engineering Services Limited,
31, Independence Layout,
Enugu, Enugu State.

Dear Sir,

APPLICATION FOR THE POSITION OF SECRETARY

I wish to apply for the position of Secretary to the Managing Director advertised in the Daily Star of 6th November, 2026. I hold an HND in Office Technology and Management from the Institute of Management and Technology, Enugu, and I have four years' experience as a secretary in a busy private company.

As secretary to the General Manager at Eastline Construction Limited, I manage his diary, arrange meetings and travel, take and circulate minutes of management meetings, and draft letters and memos for his signature. I type at 60 words per minute, use Microsoft Word, Excel and PowerPoint confidently, and introduced an electronic filing system that made it much faster to find contracts and correspondence. I also receive visitors and handle calls, always with courtesy.

I would bring to Pinecrest an organised, discreet and reliable approach, and the ability to take routine work off the Managing Director's desk so that he can focus on the business.

Thank you for considering my application. I am available for an interview and a typing test at your convenience.

Yours faithfully,
(Signature)
BLESSING NWOSU`,
      caption: "Experienced secretary"
    },
    { h2: "Sample application letter for an admin officer or receptionist (no experience)" },
    {
      letter: `3, College Road,
Ilorin, Kwara State.
09012348765
aisha.bello@email.com
12th November, 2026.

The Human Resources Manager,
Starline Hospitals Limited,
18, Taiwo Road,
Ilorin, Kwara State.

Dear Sir/Madam,

APPLICATION FOR THE POSITION OF ADMIN OFFICER / RECEPTIONIST

I am writing to apply for the position of Admin Officer / Receptionist advertised on your notice board. I recently completed my ND in Office Technology and Management at Kwara State Polytechnic, where I finished with an Upper Credit.

During my industrial training at a law firm in Ilorin, I received clients, answered and transferred calls, typed and filed letters, and kept the visitors' register and appointment diary. I type at 50 words per minute and I am comfortable with Microsoft Word, Excel and email. My supervisor praised my neat filing and my friendly manner with clients.

I am a patient and organised person who enjoys helping people, which I believe suits the front desk of a hospital, where visitors are often anxious. I am willing to work shifts and weekends.

Thank you for considering my application. I look forward to hearing from you.

Yours faithfully,
(Signature)
AISHA BELLO`,
      caption: "Admin officer / receptionist (no experience)"
    },
    { h2: "Tips for secretaries and admin officers" },
    {
      ul: [
        "Proofread three times. A single typing error can cost you the job.",
        "If you know the name of the person you are writing to, use Dear Mr / Mrs ... and close with Yours sincerely.",
        "State your typing speed and the software you use.",
        "Mention any special experience: legal, medical, school or church administration.",
        "Offer to take a typing or computer test."
      ]
    }
  ],
  faq: [
    { q: "What should I write in an application letter for a secretary job?", a: "Name the position and your qualification in the first paragraph, describe your secretarial skills (typing speed, Microsoft Office, diary management, minutes, filing) with examples in the second, explain why you want to work for the organisation in the third, and close politely, offering to attend an interview or take a test." },
    { q: "What qualification do I need to be a secretary in Nigeria?", a: "An OND or HND in Office Technology and Management (formerly Secretarial Studies) is common, but many employers also accept degrees in Business Administration or related fields plus strong computer and communication skills." },
    { q: "Can I use the same letter for a receptionist job?", a: "Yes, with small changes: put more weight on customer service, handling calls and visitors, and keeping appointment records." }
  ],
  related: ["/how-to-write-an-application-letter", "/cv-format-nigeria", "/formal-letter-format", "/application-letter-for-bank-job"]
};

export const factoryLetter = {
  slug: "factory",
  path: "/application-letter-for-factory-job",
  group: "Application Letter Samples",
  short: "Factory job",
  title: "Application Letter for Factory Job (Operator & No Experience)",
  description: "Sample application letters for factory jobs in Nigeria, for production operators, machine operators and casual workers, with tips on safety and shift work.",
  h1: "Application Letter for a Factory Job",
  intro:
    "Factories hire production operators, machine operators, packers, storekeepers and casual workers all year round. Managers want workers who are punctual, careful, safety-conscious and willing to work shifts. Your letter should say clearly which role you want, what you have done before and that you understand factory safety. Below are two samples, one for an experienced operator and one for someone with no factory experience.",
  tool: "application",
  blocks: [
    { h2: "What factory managers look for" },
    {
      ul: [
        "Experience with machines or production lines, and the products you worked with (food, drinks, plastics, cement, textiles, packaging).",
        "Safety awareness: wearing PPE, following procedures and reporting hazards.",
        "Willingness to work shifts, including nights and weekends.",
        "Punctuality and good attendance.",
        "Physical fitness for standing, lifting and repetitive work.",
        "A technical certificate or trade test (for example from a technical college or a skills acquisition centre) for operator and technician roles."
      ]
    },
    { h2: "Format" },
    formatReminder,
    { h2: "Sample application letter for a production / machine operator" },
    {
      letter: `5, Iju Road,
Agege, Lagos State.
08067812345
12th November, 2026.

The Production Manager,
Sunrise Beverages Limited,
Plot 12, Industrial Estate,
Ikeja, Lagos State.

Dear Sir/Madam,

APPLICATION FOR THE POSITION OF MACHINE OPERATOR

I wish to apply for the position of Machine Operator in your bottling plant. I hold a National Technical Certificate (NTC) in Mechanical Engineering Craft Practice and have five years' experience operating filling, capping and labelling machines in a beverage factory.

At Clearwater Drinks Limited, Ota, I run a filling line on rotating shifts. I carry out start-up checks, adjust the machines when product changes, clear minor jams and record output and downtime on every shift. I always wear the correct protective equipment and follow lock-out procedures before touching any moving parts. In 2025, my shift team reduced machine downtime by about a fifth by reporting faults early to the maintenance team.

I am punctual, I work well in a team and I am willing to work night shifts and weekends. I would welcome the chance to bring this experience to Sunrise Beverages.

Thank you for considering my application. I am available for a test or interview at any time and can be reached on 08067812345.

Yours faithfully,
(Signature)
EMEKA NWANKWO`,
      caption: "Experienced machine operator"
    },
    { h2: "Sample application letter for a factory job with no experience" },
    {
      letter: `17, Old Ota Road,
Sango Ota, Ogun State.
09034561278
12th November, 2026.

The Human Resources Officer,
Primepack Industries Limited,
Km 4, Idiroko Road,
Ota, Ogun State.

Dear Sir/Madam,

APPLICATION FOR EMPLOYMENT AS A FACTORY WORKER

I am writing to apply for employment as a factory worker in your packaging plant. I completed my secondary school education in 2025 with five credits in WAEC, including Mathematics and English Language, and I am eager to start work and learn a trade.

Although I have not worked in a factory before, I helped in my uncle's warehouse for one year, where I loaded and offloaded goods, counted stock and kept the store clean and orderly. That work taught me to follow instructions carefully, to be on time every day and to work hard in a team.

I am physically fit, willing to work any shift, and ready to learn the machines and safety rules of your factory. I will follow every instruction from my supervisors and take care of company property.

Thank you for considering my application. I can be reached on 09034561278.

Yours faithfully,
(Signature)
DAVID OLUSEGUN`,
      caption: "Factory worker (no experience)"
    },
    { h2: "Tips for factory job applications" },
    {
      ul: [
        "Address the letter to the Production Manager or HR Officer, as the advert says.",
        "Mention the shifts you are willing to work.",
        "Show that you understand safety: PPE, procedures and reporting hazards.",
        "Attach your certificates, a short CV and the names of two referees.",
        "Be careful of fake 'factory job' adverts that ask you to pay for forms, medicals or uniforms before you are employed."
      ]
    }
  ],
  faq: [
    { q: "How do I write an application letter for a factory job with no experience?", a: "State the role you want and your education, then describe any work that shows you are hardworking and careful, such as helping in a shop, warehouse or farm. Say you are willing to work shifts and to learn the factory's machines and safety rules." },
    { q: "What do I write as the heading for a factory job letter?", a: "Name the role: APPLICATION FOR THE POSITION OF MACHINE OPERATOR, or APPLICATION FOR EMPLOYMENT AS A FACTORY WORKER if no role is named." },
    { q: "What certificates help for factory jobs?", a: "Your WAEC or NECO result, and for operator or technician roles, a technical college certificate (such as NTC or NABTEB), a trade test certificate or a relevant OND." }
  ],
  related: ["/how-to-write-an-application-letter", "/application-letter-for-driver", "/cv-format-nigeria", "/letter-generator"]
};

export const MORE_JOB_LETTERS = [bankLetter, driverLetter, secretaryLetter, factoryLetter];
