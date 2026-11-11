// Final year project topic ideas by department. Original topics written for
// StudentToolsNG, not copied from other sites. Plain JS so
// scripts/buildSeoStatic.mjs can build the crawler text from the same data.
//
// guides: published marketplace project guides (slug, title) that match the
// department. Only list slugs that are published, or the link will 404.

import { MORE_DEPARTMENTS } from "./moreDepartments.js";
import { EXTRA_DEPARTMENTS } from "./extraDepartments.js";

export const DEPARTMENTS = [
  {
    slug: "accounting",
    name: "Accounting",
    intro: "Accounting projects in Nigeria usually test how financial reporting, auditing, taxation or management accounting affects the performance of firms or government. The topics below cover listed companies, small businesses and the public sector, with data you can get from annual reports, questionnaires or published tax figures.",
    groups: [
      {
        name: "Financial reporting and auditing",
        topics: [
          "Effect of audit committee independence on the financial reporting quality of listed deposit money banks in Nigeria",
          "Impact of auditor rotation on audit quality in Nigerian listed manufacturing firms",
          "Relationship between audit fees and audit quality in Nigerian quoted companies",
          "Effect of creative accounting practices on investors' confidence in Nigeria",
          "Role of forensic accounting in detecting fraud in Nigerian public sector organisations",
          "Effect of corporate governance mechanisms on earnings management of listed consumer goods firms in Nigeria",
          "Influence of the Financial Reporting Council of Nigeria on the quality of corporate disclosure",
          "Effect of sustainability reporting on the financial performance of oil and gas firms in Nigeria",
          "Perception of auditors and accountants on the audit expectation gap in Nigeria",
          "Effect of board size and composition on the timeliness of financial reporting in Nigeria"
        ]
      },
      {
        name: "Taxation and public sector accounting",
        topics: [
          "Impact of the Finance Act on tax compliance among small and medium enterprises in Nigeria",
          "Effect of value added tax revenue on economic growth in Nigeria",
          "Determinants of personal income tax compliance among self-employed traders in a selected state",
          "Effect of tax incentives on foreign direct investment inflows into Nigeria",
          "Impact of the Treasury Single Account on accountability in Nigerian ministries, departments and agencies",
          "Effect of the Integrated Personnel and Payroll Information System (IPPIS) on payroll fraud in the public service",
          "Influence of electronic tax filing on tax revenue generation in Lagos State",
          "Effect of IPSAS adoption on transparency in Nigerian state governments",
          "Assessment of internally generated revenue and its effect on local government development",
          "Impact of tax education on voluntary tax compliance among small business owners"
        ]
      },
      {
        name: "Management accounting and corporate finance",
        topics: [
          "Effect of working capital management on the profitability of listed manufacturing firms in Nigeria",
          "Role of budgeting and budgetary control in the performance of small and medium enterprises",
          "Effect of activity-based costing on cost control in Nigerian manufacturing companies",
          "Impact of cost reduction strategies on the profitability of selected hotels",
          "Effect of capital structure on the financial performance of listed insurance firms in Nigeria",
          "Relationship between dividend policy and the share price of listed banks in Nigeria",
          "Effect of inventory management on the performance of retail businesses",
          "Influence of record keeping practices on the growth of small businesses",
          "Effect of credit risk management on the performance of microfinance banks in Nigeria",
          "Effect of liquidity management on the profitability of deposit money banks in Nigeria"
        ]
      },
      {
        name: "Accounting technology, ethics and the profession",
        topics: [
          "Impact of computerised accounting systems on the efficiency of accounting staff",
          "Effect of cloud accounting software on the financial management of small businesses",
          "Perception of accounting students on the use of artificial intelligence in accounting practice",
          "Effect of electronic payment systems on revenue collection in Nigerian tertiary institutions",
          "Challenges of adopting blockchain technology in accounting and auditing in Nigeria",
          "Influence of professional certification (ICAN, ANAN) on the employability of accounting graduates",
          "Effect of ethics training on the professional conduct of accountants",
          "Impact of cybersecurity risks on the reliability of accounting information systems",
          "Role of accounting information in the investment decisions of individual investors",
          "Effect of the cashless policy on the cash management practices of small businesses"
        ]
      }
    ],
    tips: [
      "Choose a sector you can get data for. Listed companies publish annual reports, so topics on banks, insurers or manufacturers suit secondary data and regression.",
      "Fix the period early, for example 2014 to 2023, and check that every firm in your sample has reports for all those years.",
      "For small business or tax compliance topics, plan a questionnaire and pick a market or local government area you can actually reach.",
      "Use current policy as your hook: the Finance Acts, IFRS and IPSAS adoption, the Treasury Single Account and the cashless policy all give a clear before-and-after."
    ],
    methods: "Many accounting projects use secondary data from annual reports and the Nigerian Exchange, analysed with descriptive statistics, correlation and panel regression (fixed or random effects). Projects on perceptions, compliance or small businesses usually use a structured questionnaire analysed with simple percentages, chi-square or regression.",
    narrow: ["Taxation and revenue in Nigeria", "Effect of tax education on voluntary compliance among small business owners in Ikeja, Lagos State"],
    guides: [
      ["effect-of-ifrs-adoption-on-financial-reporting-quality-of-listed-companies-in-nigeria-project-guide", "Effect of IFRS Adoption on Financial Reporting Quality of Listed Companies in Nigeria"],
      ["effect-of-internal-control-systems-on-fraud-prevention-and-detection-in-nigeria-project-guide", "Effect of Internal Control Systems on Fraud Prevention and Detection in Nigeria"],
      ["effect-of-tax-audit-and-investigation-on-tax-revenue-generation-in-nigeria-project-guide", "Effect of Tax Audit and Investigation on Tax Revenue Generation in Nigeria"],
      ["effect-of-working-capital-management-on-the-profitability-of-listed-manufacturing-firms-in-nigeria-project-guide", "Effect of Working Capital Management on the Profitability of Listed Manufacturing Firms in Nigeria"],
      ["influence-of-record-keeping-practices-on-the-growth-of-small-businesses-in-nigeria-project-guide", "Influence of Record Keeping Practices on the Growth of Small Businesses in Nigeria"],
      ["perception-of-accounting-students-on-the-use-of-artificial-intelligence-in-accounting-practice-project-guide", "Perception of Accounting Students on the Use of Artificial Intelligence in Accounting Practice"]
    ]
  },
  {
    slug: "nursing",
    name: "Nursing",
    intro: "Nursing projects are usually descriptive or cross-sectional studies of knowledge, attitude and practice among patients, mothers, communities or nurses themselves. The topics below are grouped into maternal and child health, clinical practice, community health and the nursing workforce, and each can be studied in one hospital, clinic or community.",
    groups: [
      {
        name: "Maternal and child health",
        topics: [
          "Knowledge and practice of birth preparedness among pregnant women attending antenatal clinic in a selected hospital",
          "Factors influencing the use of skilled birth attendants among women in rural communities",
          "Utilisation of postnatal care services among mothers in a selected local government area",
          "Knowledge and attitude of mothers towards childhood immunisation in a selected primary health centre",
          "Perception of pregnant women about caesarean section in a selected teaching hospital",
          "Knowledge and practice of kangaroo mother care among nurses in neonatal units",
          "Factors affecting the uptake of family planning services among women of reproductive age",
          "Knowledge of the danger signs of pregnancy among antenatal attendees",
          "Practice of complementary feeding among mothers of children aged 6 to 24 months",
          "Home management of neonatal jaundice by mothers in a selected community"
        ]
      },
      {
        name: "Clinical nursing practice",
        topics: [
          "Knowledge and practice of pressure ulcer prevention among nurses in a selected teaching hospital",
          "Compliance with standard precautions for infection prevention among nurses",
          "Knowledge and practice of pain assessment among nurses caring for post-operative patients",
          "Assessment of nurses' knowledge of cardiopulmonary resuscitation in a selected hospital",
          "Factors influencing the documentation of nursing care in a selected hospital",
          "Knowledge and practice of safe medication administration among nurses",
          "Use of the nursing process in patient care: challenges faced by nurses",
          "Nurses' knowledge and management of patients with diabetic foot ulcers",
          "Hand hygiene knowledge and practice among nursing students during clinical posting",
          "Assessment of nurses' knowledge of the care of patients with tracheostomy"
        ]
      },
      {
        name: "Community and public health nursing",
        topics: [
          "Knowledge and prevention of hepatitis B infection among nursing students",
          "Awareness and practice of breast self-examination among female undergraduates",
          "Knowledge and attitude of women towards cervical cancer screening in a selected community",
          "Prevalence and risk factors of obesity among secondary school adolescents",
          "Knowledge and practice of Lassa fever prevention among residents of a selected community",
          "Factors influencing adherence to antihypertensive medication among adults attending a clinic",
          "Knowledge of HIV prevention among adolescents in a selected secondary school",
          "Oral hygiene practices among primary school pupils",
          "Use of insecticide-treated nets among households with children under five",
          "Sanitation and personal hygiene practices among food vendors"
        ]
      },
      {
        name: "Nursing workforce, education and mental health",
        topics: [
          "Causes and effects of occupational stress among nurses in a selected tertiary hospital",
          "Factors influencing job satisfaction among nurses in public hospitals",
          "Factors contributing to the migration intentions of nurses in Nigeria",
          "Effect of shift work on the health and performance of nurses",
          "Attitude of nurses towards patients with mental illness in a general hospital",
          "Knowledge and attitude of nursing students towards evidence-based practice",
          "Challenges of clinical learning experienced by student nurses",
          "Prevalence of burnout among nurses working in emergency units",
          "Experiences of workplace violence among nurses in a selected hospital",
          "Knowledge and attitude of family caregivers towards the home care of elderly people"
        ]
      }
    ],
    tips: [
      "Pick a setting where you can get ethical approval and reach respondents, such as your teaching hospital, a primary health centre or a community near you.",
      "Knowledge, attitude and practice (KAP) topics are popular because one questionnaire answers all three, but say clearly which group you are studying.",
      "Check that your population is large enough for your sample size. A ward with 20 nurses suits a census, not a sample.",
      "Avoid topics that need laboratory tests or clinical trials unless your department supports them. Survey-based studies are easier to finish on time."
    ],
    methods: "Most nursing projects use a descriptive cross-sectional design with a structured questionnaire or checklist. Sample size is often worked out with the Taro Yamane or Cochran formula, and results are analysed with frequencies, percentages and chi-square tests of association. Ethical approval and informed consent must be described in Chapter 3.",
    narrow: ["Malaria in pregnancy", "Knowledge and use of malaria prevention measures among pregnant women attending antenatal clinic at a selected general hospital"],
    guides: [
      ["knowledge-attitude-and-practice-of-exclusive-breastfeeding-among-nursing-mothers-project-guide", "Knowledge, Attitude and Practice of Exclusive Breastfeeding among Nursing Mothers"],
      ["knowledge-and-use-of-malaria-prevention-measures-among-pregnant-women-in-nigeria-project-guide", "Knowledge and Use of Malaria Prevention Measures among Pregnant Women in Nigeria"],
      ["awareness-prevalence-and-risk-factors-of-hypertension-among-adults-in-nigeria-project-guide", "Awareness, Prevalence and Risk Factors of Hypertension among Adults in Nigeria"],
      ["factors-influencing-emigration-japa-intentions-of-health-workers-in-nigeria-project-guide", "Factors Influencing Emigration (Japa) Intentions of Health Workers in Nigeria"],
      ["knowledge-and-uptake-of-cervical-cancer-screening-and-hpv-vaccination-in-nigeria-project-guide", "Knowledge and Uptake of Cervical Cancer Screening and HPV Vaccination in Nigeria"],
      ["knowledge-and-practice-of-hand-hygiene-and-infection-prevention-among-nurses-in-nigerian-hospitals-project-guide", "Knowledge and Practice of Hand Hygiene and Infection Prevention among Nurses in Nigerian Hospitals"],
      ["factors-influencing-the-utilisation-of-antenatal-care-services-among-pregnant-women-in-nigeria-project-guide", "Factors Influencing the Utilisation of Antenatal Care Services among Pregnant Women in Nigeria"],
      ["knowledge-of-sickle-cell-disease-and-attitude-towards-premarital-genotype-testing-among-young-adults-project-guide", "Knowledge of Sickle Cell Disease and Attitude towards Premarital Genotype Testing among Young Adults"]
    ]
  },
  {
    slug: "computer-science",
    name: "Computer Science",
    short: "Computer Sci.",
    intro: "Computer science projects are either a working system (design and implementation) or a study that applies a technique such as machine learning to real data. The topics below cover software systems, artificial intelligence, security and emerging technology, and most can be built with free tools such as Python, JavaScript, PHP and MySQL.",
    groups: [
      {
        name: "Software systems (design and implementation)",
        topics: [
          "Design and implementation of an online hostel allocation system for a university",
          "Design and implementation of a web-based library management system",
          "Design and implementation of an e-voting system for student union elections",
          "Development of a mobile app for recording student attendance with QR codes",
          "Design and implementation of an online examination system with automatic grading",
          "Design of a web-based inventory management system for a small business",
          "Development of a clinic appointment booking system with SMS reminders",
          "Design and implementation of a property rental listing platform",
          "Development of a school fees payment and receipt verification system",
          "Design and implementation of a lost-and-found portal for a university campus"
        ]
      },
      {
        name: "Artificial intelligence and data science",
        topics: [
          "Detection of fake news on social media using machine learning",
          "Sentiment analysis of Nigerian social media posts on government policies",
          "A chatbot for answering students' admission enquiries using natural language processing",
          "Detection of crop diseases from leaf images using convolutional neural networks",
          "Prediction of loan default using machine learning techniques",
          "Recognition of handwritten digits using deep learning",
          "A course recommendation system based on students' past results",
          "Detection of spam SMS messages using classification algorithms",
          "A face recognition attendance system",
          "Prediction of traffic congestion from historical traffic data"
        ]
      },
      {
        name: "Networking and cybersecurity",
        topics: [
          "Design and implementation of a secure file-sharing system using encryption",
          "Assessment of phishing awareness among undergraduates",
          "Development of a two-factor authentication system for web applications",
          "Analysis of security vulnerabilities in a campus local area network",
          "Design of an intrusion detection system using machine learning",
          "Development of a password strength checker with breach alerts",
          "Development of a SIM-swap fraud alert system for mobile banking",
          "Performance comparison of wired and wireless networks in a university",
          "Design of a secure online payment verification system",
          "Hiding text in images using least significant bit steganography"
        ]
      },
      {
        name: "Emerging technology and applied studies",
        topics: [
          "Design of an IoT-based home energy monitoring system",
          "Development of an Arduino-based automatic irrigation system",
          "A blockchain-based system for verifying academic certificates",
          "Adoption of cloud computing by small businesses in Nigeria",
          "Development of a mobile app for reporting environmental sanitation problems",
          "Design of a GPS-based vehicle tracking system",
          "Assessment of e-learning platform use among computer science students",
          "Development of a web-based crime reporting system",
          "Design of a speech-to-text note-taking app for visually impaired students",
          "A comparative study of programming languages for teaching introductory programming"
        ]
      }
    ],
    tips: [
      "Choose a system you can finish and demonstrate. A small system that works fully scores better than a big one that is half built.",
      "Solve a real problem you can describe in Chapter 1, such as manual hostel allocation or paper-based attendance in your own school.",
      "For machine learning topics, find your dataset first. If there is no usable data, choose another topic.",
      "Agree the programming language and tools with your supervisor early, and keep your code in version control (Git) so you never lose work."
    ],
    methods: "System projects follow a software development method such as the waterfall or agile model: analysis of the existing system, design (use case, data flow and entity relationship diagrams), implementation, and testing. Machine learning projects describe the dataset, pre-processing, the algorithms compared, and evaluation measures such as accuracy, precision, recall and F1-score.",
    narrow: ["An online voting system", "Design and implementation of a web-based e-voting system for student union elections at a selected university"],
    guides: [
      ["design-and-implementation-of-a-web-based-student-result-management-system-project-guide", "Design and Implementation of a Web-Based Student Result Management System"],
      ["design-and-implementation-of-a-hospital-patient-record-and-appointment-system-project-guide", "Design and Implementation of a Hospital Patient Record and Appointment System"],
      ["predicting-students-academic-performance-using-machine-learning-project-guide", "Predicting Students' Academic Performance Using Machine Learning"],
      ["use-of-ai-tools-like-chatgpt-by-undergraduates-learning-and-academic-integrity-project-guide", "Use of AI Tools like ChatGPT by Undergraduates: Learning and Academic Integrity"],
      ["design-and-implementation-of-a-secure-online-voting-system-for-student-elections-project-guide", "Design and Implementation of a Secure Online Voting System for Student Elections"],
      ["design-and-implementation-of-a-web-based-inventory-and-sales-management-system-for-small-businesses-project-guide", "Design and Implementation of a Web-Based Inventory and Sales Management System for Small Businesses"],
      ["design-and-implementation-of-a-web-based-library-management-system-for-a-tertiary-institution-project-guide", "Design and Implementation of a Web-Based Library Management System for a Tertiary Institution"],
      ["phishing-awareness-and-cybersecurity-practices-among-undergraduates-in-nigeria-project-guide", "Phishing Awareness and Cybersecurity Practices among Undergraduates in Nigeria"],
      ["sms-spam-and-scam-message-detection-using-machine-learning-project-guide", "SMS Spam and Scam Message Detection Using Machine Learning"]
    ]
  },
  {
    slug: "economics",
    name: "Economics",
    intro: "Economics projects in Nigeria usually measure how one macroeconomic variable affects another, using time series data from the Central Bank of Nigeria, the National Bureau of Statistics or the World Bank. The topics below cover growth, poverty and welfare, trade and agriculture, and money and public policy.",
    groups: [
      {
        name: "Macroeconomics and growth",
        topics: [
          "Effect of government capital expenditure on economic growth in Nigeria",
          "Impact of inflation on economic growth in Nigeria",
          "Exchange rate volatility and economic growth in Nigeria",
          "Effect of external debt on economic growth in Nigeria",
          "Impact of monetary policy on inflation in Nigeria",
          "Effect of interest rates on domestic investment in Nigeria",
          "Oil price shocks and macroeconomic performance in Nigeria",
          "Effect of foreign direct investment on economic growth in Nigeria",
          "Impact of diaspora remittances on household consumption in Nigeria",
          "Unemployment and inflation in Nigeria: a test of the Phillips curve"
        ]
      },
      {
        name: "Development, poverty and welfare",
        topics: [
          "Determinants of poverty among rural households in Nigeria",
          "Effect of human capital development on economic growth in Nigeria",
          "Impact of government social intervention programmes on poverty reduction",
          "Effect of rural-urban migration on agricultural output",
          "Determinants of youth unemployment in Nigeria",
          "Impact of education expenditure on economic development in Nigeria",
          "Effect of health expenditure on life expectancy in Nigeria",
          "Income inequality and economic growth in Nigeria",
          "Effect of insecurity on economic activities in northern Nigeria",
          "Impact of electricity supply on the output of small and medium enterprises"
        ]
      },
      {
        name: "Trade, agriculture and industry",
        topics: [
          "Effect of trade openness on economic growth in Nigeria",
          "Impact of non-oil exports on economic growth in Nigeria",
          "Effect of agricultural credit on agricultural output in Nigeria",
          "Prospects of the African Continental Free Trade Area for Nigeria's trade",
          "Determinants of food prices in Nigeria",
          "Effect of manufacturing output on economic growth in Nigeria",
          "Impact of import substitution policies on local production",
          "Effect of the land border closure on the price of rice in Nigeria",
          "Role of small-scale industries in employment generation",
          "Effect of exchange rate depreciation on Nigeria's balance of trade"
        ]
      },
      {
        name: "Money, finance and public policy",
        topics: [
          "Effect of financial inclusion on poverty reduction in Nigeria",
          "Impact of the cashless policy on money supply in Nigeria",
          "Effect of the naira redesign policy on economic activities in Nigeria",
          "Impact of fuel subsidy removal on transport costs and household spending",
          "Effect of stock market development on economic growth in Nigeria",
          "Effect of tax revenue on economic growth in Nigeria",
          "Fiscal deficits and inflation in Nigeria",
          "Impact of corruption on foreign direct investment in Nigeria",
          "Effect of bank credit to the private sector on economic growth",
          "Determinants of household savings in Nigeria"
        ]
      }
    ],
    tips: [
      "Make sure the data exists for at least 25 to 30 years before you settle on a macroeconomic topic. The CBN Statistical Bulletin is the usual source.",
      "State clearly which variable is dependent and which are independent, and add one or two control variables that economic theory supports.",
      "Household and welfare topics can use survey data, but choose a community and sample you can reach within your budget.",
      "Recent policies such as fuel subsidy removal and the naira redesign make strong topics, but they have only a few years of data, so a survey may suit them better than time series."
    ],
    methods: "Time series projects usually test for stationarity (Augmented Dickey-Fuller), then use ordinary least squares, the ARDL bounds test or a vector error correction model, with tests for serial correlation and heteroscedasticity. Survey-based projects use descriptive statistics and regression, such as logit or probit for yes/no outcomes.",
    narrow: ["Inflation in Nigeria", "Effect of inflation and exchange rate on the sales of small businesses in Onitsha Main Market"],
    guides: [
      ["effect-of-fuel-subsidy-removal-on-household-welfare-in-nigeria-project-guide", "Effect of Fuel Subsidy Removal on Household Welfare in Nigeria"],
      ["effect-of-inflation-and-exchange-rate-on-small-businesses-in-nigeria-project-guide", "Effect of Inflation and Exchange Rate on Small Businesses in Nigeria"],
      ["youth-unemployment-and-the-rise-of-social-vices-in-nigeria-project-guide", "Youth Unemployment and the Rise of Social Vices in Nigeria"],
      ["impact-of-microfinance-banks-on-poverty-reduction-and-micro-enterprises-in-nigeria-project-guide", "Impact of Microfinance Banks on Poverty Reduction and Micro-Enterprises in Nigeria"],
      ["effect-of-government-expenditure-on-economic-growth-in-nigeria-ardl-approach-project-guide", "Effect of Government Expenditure on Economic Growth in Nigeria: ARDL Approach"],
      ["profitability-and-constraints-of-poultry-production-among-small-scale-farmers-project-guide", "Profitability and Constraints of Poultry Production among Small-Scale Farmers"],
      ["effect-of-foreign-direct-investment-on-economic-growth-in-nigeria-project-guide", "Effect of Foreign Direct Investment on Economic Growth in Nigeria"],
      ["effect-of-public-debt-on-economic-growth-in-nigeria-project-guide", "Effect of Public Debt on Economic Growth in Nigeria"],
      ["contribution-of-the-agricultural-sector-to-economic-growth-in-nigeria-project-guide", "Contribution of the Agricultural Sector to Economic Growth in Nigeria"]
    ]
  },
  {
    slug: "business-administration",
    name: "Business Administration",
    short: "Business Admin",
    intro: "Business administration projects study how management decisions affect employees, customers and the performance of organisations. The topics below cover human resources, marketing, entrepreneurship and strategy, and most can be studied with a questionnaire in a company, a market or a group of small businesses.",
    groups: [
      {
        name: "Human resource management and organisational behaviour",
        topics: [
          "Effect of training and development on employee performance in selected organisations",
          "Impact of leadership style on employee productivity",
          "Effect of reward systems on employee retention in the banking sector",
          "Influence of work-life balance on employee job satisfaction",
          "Effect of organisational culture on employee commitment",
          "Causes and effects of staff turnover in private schools",
          "Impact of performance appraisal on staff productivity",
          "Effect of workplace conflict on organisational performance",
          "Influence of remote and hybrid work on employee productivity",
          "Effect of employee participation in decision-making on organisational performance"
        ]
      },
      {
        name: "Marketing",
        topics: [
          "Effect of television advertising on consumers' choice of soft drinks",
          "Impact of customer relationship management on customer loyalty in telecommunications firms",
          "Influence of brand image on consumer purchase decisions",
          "Effect of packaging on consumer choice of food products",
          "Role of digital marketing in the growth of small businesses",
          "Effect of sales promotion on the sales volume of fast-moving consumer goods",
          "Influence of price on consumer choice of mobile network operators",
          "Effect of product quality on customer satisfaction",
          "Use of WhatsApp Business tools and customer engagement among small traders",
          "Effect of celebrity endorsement on brand awareness"
        ]
      },
      {
        name: "Entrepreneurship and small business",
        topics: [
          "Challenges facing small and medium enterprises in Nigeria",
          "Effect of access to finance on the growth of small businesses",
          "Role of entrepreneurship in reducing unemployment",
          "Impact of government policies on the survival of small businesses",
          "Factors influencing the success of women entrepreneurs",
          "Effect of business planning on the performance of start-ups",
          "Influence of family background on the entrepreneurial intention of undergraduates",
          "Role of cooperative societies in the growth of small businesses",
          "Effect of poor infrastructure on the performance of small businesses",
          "Challenges of e-commerce adoption among small retailers"
        ]
      },
      {
        name: "Strategy and operations management",
        topics: [
          "Effect of strategic planning on organisational performance",
          "Impact of total quality management on productivity in manufacturing firms",
          "Effect of supply chain management on the performance of manufacturing firms",
          "Role of corporate social responsibility in building organisational image",
          "Effect of competitive strategy on the performance of hotels",
          "Impact of change management on organisational effectiveness",
          "Effect of business ethics on corporate performance",
          "Role of internal communication in organisational effectiveness",
          "Effect of technology adoption on service delivery in banks",
          "Impact of mergers and acquisitions on the performance of Nigerian banks"
        ]
      }
    ],
    tips: [
      "Pick an organisation or market that will let you distribute questionnaires, such as a bank branch, a factory or traders in one market.",
      "Use well-known variables from management theory (motivation, leadership, culture, satisfaction) so you can find a framework and past studies easily.",
      "Keep the scope to one sector or one organisation. 'Selected deposit money banks in Abuja' is easier to finish than 'the Nigerian banking industry'.",
      "Link your topic to a real problem the organisation faces, such as high staff turnover or falling sales, to make Chapter 1 convincing."
    ],
    methods: "Most business administration projects use a survey design with a Likert-scale questionnaire. Reliability is tested with Cronbach's alpha, and hypotheses are tested with chi-square, correlation or regression. Case study topics may add interviews with managers.",
    narrow: ["Employee motivation", "Effect of employee motivation on productivity in selected manufacturing firms in Ota, Ogun State"],
    guides: [
      ["effect-of-employee-motivation-on-organisational-productivity-project-guide", "Effect of Employee Motivation on Organisational Productivity"],
      ["influence-of-social-media-marketing-and-influencers-on-purchase-decisions-in-nigeria-project-guide", "Influence of Social Media Marketing and Influencers on Purchase Decisions in Nigeria"],
      ["effect-of-entrepreneurship-education-on-entrepreneurial-intentions-of-undergraduates-project-guide", "Effect of Entrepreneurship Education on Entrepreneurial Intentions of Undergraduates"],
      ["impact-of-cashless-policy-and-pos-adoption-on-small-businesses-in-nigeria-project-guide", "Impact of Cashless Policy and POS Adoption on Small Businesses in Nigeria"],
      ["influence-of-record-keeping-practices-on-the-growth-of-small-businesses-in-nigeria-project-guide", "Influence of Record Keeping Practices on the Growth of Small Businesses in Nigeria"],
      ["effect-of-leadership-styles-on-employee-performance-in-nigerian-organisations-project-guide", "Effect of Leadership Styles on Employee Performance in Nigerian Organisations"],
      ["effect-of-training-and-development-on-employee-performance-in-nigerian-organisations-project-guide", "Effect of Training and Development on Employee Performance in Nigerian Organisations"],
      ["effect-of-access-to-finance-on-the-growth-of-small-and-medium-enterprises-in-nigeria-project-guide", "Effect of Access to Finance on the Growth of Small and Medium Enterprises in Nigeria"],
      ["effect-of-customer-relationship-management-on-customer-retention-in-the-nigerian-telecommunications-industry-project-guide", "Effect of Customer Relationship Management on Customer Retention in the Nigerian Telecommunications Industry"],
      ["corporate-social-responsibility-of-oil-companies-and-community-development-in-the-niger-delta-project-guide", "Corporate Social Responsibility of Oil Companies and Community Development in the Niger Delta"]
    ]
  },
  {
    slug: "banking-and-finance",
    name: "Banking and Finance",
    short: "Banking & Finance",
    intro: "Banking and finance projects examine banks, capital markets, microfinance and insurance, and how regulation and technology affect their performance. The topics below can be studied with financial statements and CBN data or with questionnaires to bank customers and small business owners.",
    groups: [
      {
        name: "Banking operations and regulation",
        topics: [
          "Effect of non-performing loans on the profitability of deposit money banks in Nigeria",
          "Impact of electronic banking on customer satisfaction",
          "Effect of bank recapitalisation on the performance of Nigerian banks",
          "Role of the Central Bank of Nigeria in regulating deposit money banks",
          "Effect of capital adequacy on bank performance in Nigeria",
          "Impact of mobile banking on the operations of commercial banks",
          "Effect of agent banking on financial inclusion in rural areas",
          "Effect of bank charges on customer patronage",
          "Impact of cybercrime on electronic banking in Nigeria",
          "Effect of the Bank Verification Number (BVN) policy on fraud in banks"
        ]
      },
      {
        name: "Corporate finance and investment",
        topics: [
          "Effect of capital structure on firm value in Nigeria",
          "Determinants of dividend payout of listed firms in Nigeria",
          "Effect of corporate governance on the financial performance of banks",
          "Impact of the capital market on the growth of listed firms",
          "Effect of financial leverage on the profitability of manufacturing firms",
          "Relationship between risk and return of stocks on the Nigerian Exchange",
          "Effect of mergers on shareholders' wealth",
          "Effect of initial public offers on company growth",
          "Determinants of the share prices of listed banks",
          "Effect of foreign portfolio investment on the Nigerian stock market"
        ]
      },
      {
        name: "Microfinance and financial inclusion",
        topics: [
          "Impact of microfinance banks on the growth of small businesses",
          "Effect of microcredit on poverty reduction among rural women",
          "Determinants of loan repayment among microfinance clients",
          "Role of fintech companies in financial inclusion in Nigeria",
          "Effect of financial literacy on the savings behaviour of undergraduates",
          "Impact of cooperative thrift societies on members' welfare",
          "Challenges of access to credit among smallholder farmers",
          "Effect of interest rates on borrowing by small businesses",
          "Role of the Bank of Industry in financing small and medium enterprises",
          "Prospects and challenges of the eNaira for financial inclusion"
        ]
      },
      {
        name: "Monetary policy, insurance and pensions",
        topics: [
          "Effect of the monetary policy rate on bank lending in Nigeria",
          "Impact of the cash reserve ratio on bank liquidity",
          "Effect of exchange rate policy on bank performance",
          "Effect of inflation on bank deposits in Nigeria",
          "Impact of insurance on the growth of small businesses",
          "Factors responsible for the low uptake of insurance in Nigeria",
          "Effect of claims settlement on customer confidence in insurance companies",
          "Role of pension fund administrators in capital market development",
          "Effect of the contributory pension scheme on the welfare of retirees",
          "Impact of the cashless policy on bank operations"
        ]
      }
    ],
    tips: [
      "Bank performance topics need several years of financial statements. Choose banks that have been listed throughout your study period.",
      "Customer-focused topics (e-banking, charges, satisfaction) suit questionnaires given out at a few branches.",
      "Measure performance with standard ratios such as return on assets, return on equity and net interest margin, and say which you use.",
      "Fintech, agent banking and financial inclusion are current and well funded by research, so you will find recent literature."
    ],
    methods: "Secondary data projects use financial statements, the CBN Statistical Bulletin and Nigerian Exchange data, analysed with descriptive statistics, correlation and panel or time series regression. Survey projects use questionnaires with chi-square or regression analysis.",
    narrow: ["Electronic banking", "Impact of mobile banking on customer satisfaction in selected deposit money banks in Port Harcourt"],
    guides: [
      ["effect-of-service-quality-on-customer-satisfaction-and-loyalty-in-nigerian-banks-project-guide", "Effect of Service Quality on Customer Satisfaction and Loyalty in Nigerian Banks"],
      ["impact-of-microfinance-banks-on-poverty-reduction-and-micro-enterprises-in-nigeria-project-guide", "Impact of Microfinance Banks on Poverty Reduction and Micro-Enterprises in Nigeria"],
      ["impact-of-cashless-policy-and-pos-adoption-on-small-businesses-in-nigeria-project-guide", "Impact of Cashless Policy and POS Adoption on Small Businesses in Nigeria"],
      ["effect-of-non-performing-loans-on-the-profitability-of-deposit-money-banks-in-nigeria-project-guide", "Effect of Non-Performing Loans on the Profitability of Deposit Money Banks in Nigeria"],
      ["effect-of-financial-literacy-on-the-savings-behaviour-of-undergraduates-in-nigeria-project-guide", "Effect of Financial Literacy on the Savings Behaviour of Undergraduates in Nigeria"],
      ["role-of-fintech-companies-in-financial-inclusion-in-nigeria-project-guide", "Role of Fintech Companies in Financial Inclusion in Nigeria"]
    ]
  },
  {
    slug: "education",
    name: "Education",
    intro: "Education projects study teaching methods, students' behaviour and performance, school administration and higher education. The topics below suit students in education departments and colleges of education, and most can be studied in a few secondary or primary schools using questionnaires, tests or classroom experiments.",
    groups: [
      {
        name: "Teaching and learning",
        topics: [
          "Effect of instructional materials on students' academic performance in biology",
          "Influence of teachers' qualifications on students' performance in mathematics",
          "Effect of the discussion method on students' achievement in social studies",
          "Impact of class size on students' academic performance",
          "Effect of computer-assisted instruction on students' achievement in chemistry",
          "Influence of teachers' motivation on teaching effectiveness",
          "Effect of continuous assessment on students' academic performance",
          "Influence of homework on students' achievement in English language",
          "Effect of laboratory practicals on students' understanding of physics",
          "Impact of using the mother tongue as the medium of instruction in primary schools"
        ]
      },
      {
        name: "Students, home and social factors",
        topics: [
          "Influence of parents' socio-economic status on students' academic performance",
          "Effect of peer pressure on students' behaviour in secondary schools",
          "Causes and effects of truancy among secondary school students",
          "Influence of social media on students' reading culture",
          "Effect of broken homes on students' academic performance",
          "Causes of examination malpractice among secondary school students",
          "Influence of street hawking on the school attendance of children",
          "Effect of bullying on students' academic performance",
          "Influence of early marriage on girls' education in northern Nigeria",
          "Effect of guidance and counselling services on students' career choice"
        ]
      },
      {
        name: "School administration and policy",
        topics: [
          "Impact of school supervision on teachers' job performance",
          "Effect of the school environment on students' learning",
          "Challenges of implementing the Universal Basic Education programme",
          "Influence of principals' leadership styles on teachers' productivity",
          "Effect of funding on the quality of education in public secondary schools",
          "Impact of school feeding on primary school enrolment",
          "Challenges of inclusive education for children with special needs",
          "Effect of teachers' welfare on their job commitment",
          "Problems of teaching practice among student teachers",
          "Availability and use of ICT facilities in secondary schools"
        ]
      },
      {
        name: "Higher education and technology",
        topics: [
          "Influence of e-learning on undergraduates' academic performance",
          "Challenges of online learning in Nigerian universities",
          "Effect of ASUU strikes on students' academic progress",
          "Influence of students' accommodation on their academic performance",
          "Use of library resources by undergraduates",
          "Perception of students on the use of artificial intelligence tools for assignments",
          "Effect of entrepreneurship education on graduates' self-employment",
          "Influence of lecturers' teaching methods on students' interest",
          "Challenges of adult and non-formal education in rural areas",
          "Effect of study habits on the performance of distance-learning students"
        ]
      }
    ],
    tips: [
      "Name the subject and class level, for example 'SS2 chemistry students', so your study has a clear population.",
      "Experimental topics on teaching methods need two comparable classes and permission to teach them, so arrange this with the schools early.",
      "Use the schools in one local government area or education zone to keep travel and time manageable.",
      "Behaviour topics (truancy, peer pressure, bullying) work well with questionnaires to students and teachers."
    ],
    methods: "Education projects use survey designs with questionnaires analysed by mean scores and standard deviation, or quasi-experimental designs (pre-test and post-test with a control group) analysed with t-tests or ANCOVA. Instruments are validated by experts and tested for reliability, often with Cronbach's alpha or the test-retest method.",
    narrow: ["Teaching methods and performance", "Effect of cooperative learning on SS2 students' achievement in mathematics in Nsukka Education Zone"],
    guides: [
      ["effect-of-cooperative-learning-on-students-achievement-and-interest-in-mathematics-project-guide", "Effect of Cooperative Learning on Students' Achievement and Interest in Mathematics"],
      ["influence-of-study-habits-on-academic-performance-of-secondary-school-students-project-guide", "Influence of Study Habits on Academic Performance of Secondary School Students"],
      ["influence-of-english-language-proficiency-on-students-academic-performance-project-guide", "Influence of English Language Proficiency on Students' Academic Performance"],
      ["adoption-and-use-of-e-learning-platforms-in-nigerian-universities-project-guide", "Adoption and Use of E-Learning Platforms in Nigerian Universities"],
      ["causes-and-effects-of-drug-abuse-among-secondary-school-students-in-nigeria-project-guide", "Causes and Effects of Drug Abuse among Secondary School Students in Nigeria"],
      ["influence-of-teacher-quality-on-students-academic-achievement-in-nigeria-project-guide", "Influence of Teacher Quality on Students' Academic Achievement in Nigeria"],
      ["causes-and-effects-of-examination-malpractice-among-secondary-school-students-in-nigeria-project-guide", "Causes and Effects of Examination Malpractice among Secondary School Students in Nigeria"],
      ["effect-of-instructional-materials-on-students-academic-achievement-in-biology-in-secondary-schools-project-guide", "Effect of Instructional Materials on Students' Academic Achievement in Biology in Secondary Schools"],
      ["influence-of-parental-involvement-and-socio-economic-status-on-students-academic-performance-project-guide", "Influence of Parental Involvement and Socio-Economic Status on Students' Academic Performance"]
    ]
  },
  {
    slug: "mass-communication",
    name: "Mass Communication",
    short: "Mass Comm.",
    intro: "Mass communication projects study the media's influence on audiences, how the media report issues, journalism practice, and public relations and advertising. The topics below can be studied with audience surveys, content analysis of newspapers or broadcasts, or interviews with media professionals.",
    groups: [
      {
        name: "Media and society",
        topics: [
          "Influence of television advertising on the buying behaviour of undergraduates",
          "Role of radio in spreading agricultural information to rural farmers",
          "Newspaper coverage of insecurity in Nigeria: a content analysis",
          "Influence of Nollywood films on the dressing habits of youths",
          "Role of the media in promoting democracy in Nigeria",
          "Effect of reality television shows on the values of young people",
          "Newspaper framing of the fuel subsidy removal in Nigeria",
          "Role of community radio in rural development",
          "Influence of music videos on the behaviour of teenagers",
          "Portrayal of women in Nigerian television advertisements"
        ]
      },
      {
        name: "Digital and social media",
        topics: [
          "Influence of social media on the political participation of youths",
          "Use of TikTok as a source of information among undergraduates",
          "Effect of social media influencers on consumer behaviour",
          "Credibility of online news sources among university students",
          "Role of social media in crisis communication during disasters",
          "Spread of misinformation on WhatsApp and its effects on users",
          "Use of social media by Nigerian newspapers to reach readers",
          "Influence of online advertising on purchase decisions",
          "Cyberbullying on social media among undergraduates",
          "Social media use and students' reading habits"
        ]
      },
      {
        name: "Journalism practice and ethics",
        topics: [
          "Challenges of investigative journalism in Nigeria",
          "Press freedom and the safety of journalists in Nigeria",
          "The 'brown envelope' problem and ethics in Nigerian journalism",
          "Effect of media ownership on the editorial policy of newspapers",
          "Use of citizen journalism in news reporting",
          "Coverage of health issues in Nigerian newspapers",
          "Challenges facing female journalists in Nigeria",
          "Impact of the internet on newspaper circulation",
          "Role of photojournalism in news reporting",
          "Data journalism practice in Nigerian newsrooms"
        ]
      },
      {
        name: "Public relations and advertising",
        topics: [
          "Role of public relations in managing organisational image",
          "Effectiveness of public enlightenment campaigns on childhood immunisation",
          "Use of public relations by tertiary institutions to manage student crises",
          "Effectiveness of billboard advertising in Lagos",
          "Role of public relations in crisis management in banks",
          "Effectiveness of health communication campaigns on Lassa fever",
          "Influence of political advertising on voters' choice",
          "Corporate social responsibility as a public relations tool",
          "Use of jingles in radio advertising and audience recall",
          "Effectiveness of government communication on security issues"
        ]
      }
    ],
    tips: [
      "Decide early whether you are studying audiences (survey), media content (content analysis) or media workers (interviews), because each needs a different Chapter 3.",
      "For content analysis, choose two or three newspapers or stations and a fixed period, such as six months, and define your coding categories.",
      "Anchor the study in a theory such as agenda-setting, uses and gratifications, framing or cultivation theory.",
      "Pick a current issue, such as elections, insecurity or misinformation, so recent literature is easy to find."
    ],
    methods: "Mass communication projects use surveys with questionnaires (analysed with percentages and chi-square), content analysis with a coding sheet and inter-coder reliability, or in-depth interviews and focus group discussions for qualitative topics.",
    narrow: ["Social media and politics", "Influence of social media on the political participation of undergraduates at a selected university during the last general election"],
    guides: [
      ["exposure-to-fake-news-on-social-media-and-public-perception-in-nigeria-project-guide", "Exposure to Fake News on Social Media and Public Perception in Nigeria"],
      ["influence-of-nollywood-films-on-the-cultural-values-and-behaviour-of-nigerian-youths-project-guide", "Influence of Nollywood Films on the Cultural Values and Behaviour of Nigerian Youths"],
      ["influence-of-social-media-on-academic-performance-of-undergraduates-project-guide", "Influence of Social Media on Academic Performance of Undergraduates"],
      ["influence-of-social-media-on-the-political-participation-of-youths-in-nigeria-project-guide", "Influence of Social Media on the Political Participation of Youths in Nigeria"],
      ["use-of-tiktok-as-a-source-of-information-among-undergraduates-in-nigeria-project-guide", "Use of TikTok as a Source of Information among Undergraduates in Nigeria"],
      ["effectiveness-of-radio-programmes-in-disseminating-information-to-rural-dwellers-project-guide", "Effectiveness of Radio Programmes in Disseminating Information to Rural Dwellers"],
      ["newspaper-coverage-of-insecurity-in-nigeria-a-content-analysis-of-selected-national-dailies-project-guide", "Newspaper Coverage of Insecurity in Nigeria: A Content Analysis of Selected National Dailies"],
      ["influence-of-television-advertising-on-the-buying-behaviour-of-undergraduates-in-nigeria-project-guide", "Influence of Television Advertising on the Buying Behaviour of Undergraduates in Nigeria"]
    ]
  },
  {
    slug: "political-science",
    name: "Political Science",
    short: "Political Sci.",
    intro: "Political science and public administration projects study elections and democracy, government and public policy, security and federalism, and Nigeria's foreign relations. The topics below can be studied with documents, published data, interviews or questionnaires, and many work as case studies of one state or programme.",
    groups: [
      {
        name: "Elections and democracy",
        topics: [
          "Electoral violence and democratic consolidation in Nigeria",
          "Role of the Independent National Electoral Commission in conducting credible elections",
          "Godfatherism and its effect on Nigerian politics",
          "Effect of vote buying on democratic governance in Nigeria",
          "Role of political parties in political education",
          "Effect of BVAS and the IReV portal on the credibility of elections",
          "Youth participation in Nigerian elections",
          "Role of the judiciary in resolving electoral disputes",
          "Party defection and its effect on democracy in Nigeria",
          "Effect of political apathy on voter turnout"
        ]
      },
      {
        name: "Public administration and policy",
        topics: [
          "Effect of corruption on public service delivery in Nigeria",
          "Role of the civil service in policy implementation",
          "Challenges of local government administration in Nigeria",
          "Impact of the Freedom of Information Act on accountability",
          "Effect of the federal character principle on efficiency in the public service",
          "Challenges of policy implementation in Nigeria: a case study of one programme",
          "Effect of the Treasury Single Account on public finance management",
          "Role of the EFCC and ICPC in fighting corruption",
          "Effect of bureaucracy on public service delivery",
          "Impact of e-government on service delivery in Nigeria"
        ]
      },
      {
        name: "Security, conflict and federalism",
        topics: [
          "Insurgency and national security in north-eastern Nigeria",
          "Farmer-herder conflicts and food security in Nigeria",
          "Banditry and its effect on rural livelihoods in north-western Nigeria",
          "Resource control and the Niger Delta crisis",
          "Calls for restructuring and the future of Nigerian federalism",
          "State police and insecurity: arguments for and against",
          "Kidnapping and its effect on socio-economic activities",
          "Ethnic politics and national integration in Nigeria",
          "Religion and politics in Nigeria",
          "Role of traditional rulers in conflict resolution"
        ]
      },
      {
        name: "International relations",
        topics: [
          "Nigeria's role in the Economic Community of West African States (ECOWAS)",
          "Nigeria's Africa-centred foreign policy: an assessment",
          "Effect of foreign aid on development in Nigeria",
          "Nigeria-China economic relations and their effect on local industry",
          "Nigeria's role in international peacekeeping missions",
          "Emigration of skilled Nigerians (japa) and national development",
          "Role of the African Union in conflict resolution in Africa",
          "Nigeria-United States relations: issues and prospects",
          "Impact of terrorism on Nigeria's foreign relations",
          "Effect of ECOWAS sanctions on member states after military coups"
        ]
      }
    ],
    tips: [
      "Use a case study to keep the work focused, for example one state, one election or one agency.",
      "Choose a theoretical framework that fits, such as elite theory, systems theory, frustration-aggression theory or structural-functionalism.",
      "Security topics can be hard to study in person. Documentary sources, reports and interviews with officials are often safer than field surveys.",
      "Define your period clearly, such as 2015 to 2023, so your data and arguments stay within limits."
    ],
    methods: "Political science projects often use qualitative methods: documentary analysis of books, journals, reports and newspapers, with content analysis or descriptive analysis. Others use surveys or interviews, analysed with percentages and chi-square.",
    narrow: ["Elections in Nigeria", "Effect of vote buying on voter choice in the last governorship election in a selected state"],
    guides: [
      ["womens-participation-in-politics-in-nigeria-barriers-and-prospects-project-guide", "Women's Participation in Politics in Nigeria: Barriers and Prospects"],
      ["local-government-autonomy-and-grassroots-development-in-nigeria-project-guide", "Local Government Autonomy and Grassroots Development in Nigeria"],
      ["effect-of-insecurity-on-agricultural-production-and-rural-livelihoods-in-nigeria-project-guide", "Effect of Insecurity on Agricultural Production and Rural Livelihoods in Nigeria"],
      ["effect-of-vote-buying-on-democratic-governance-in-nigeria-project-guide", "Effect of Vote Buying on Democratic Governance in Nigeria"],
      ["effect-of-bvas-and-the-irev-portal-on-the-credibility-of-elections-in-nigeria-project-guide", "Effect of BVAS and the IReV Portal on the Credibility of Elections in Nigeria"],
      ["influence-of-social-media-on-the-political-participation-of-youths-in-nigeria-project-guide", "Influence of Social Media on the Political Participation of Youths in Nigeria"],
      ["effect-of-corruption-on-public-service-delivery-in-nigeria-project-guide", "Effect of Corruption on Public Service Delivery in Nigeria"]
    ]
  },
  {
    slug: "public-health",
    name: "Public Health",
    intro: "Public health projects look at disease prevention, lifestyle risks, environmental and occupational health, and how people use health services. The topics below suit public health, community health and environmental health students, and each can be studied in one community, school, workplace or health facility.",
    groups: [
      {
        name: "Communicable diseases",
        topics: [
          "Knowledge and preventive practices of malaria among pregnant women",
          "Awareness and prevention of Lassa fever in a selected community",
          "Knowledge of tuberculosis and health-seeking behaviour among adults",
          "Uptake of HIV testing among young people",
          "Knowledge and practice of cholera prevention among households",
          "Hepatitis B vaccination status and knowledge among health workers",
          "Factors affecting COVID-19 vaccine acceptance among adults",
          "Prevalence of intestinal worm infection among primary school pupils",
          "Knowledge of typhoid fever and its prevention among students",
          "Factors influencing childhood immunisation coverage in a rural area"
        ]
      },
      {
        name: "Non-communicable diseases and lifestyle",
        topics: [
          "Prevalence and risk factors of hypertension among adults",
          "Awareness of diabetes and its risk factors among civil servants",
          "Prevalence of overweight and obesity among undergraduates",
          "Alcohol use and its health effects among youths",
          "Cigarette and shisha smoking among undergraduates",
          "Physical activity levels among office workers",
          "Knowledge of breast cancer and screening practices among women",
          "Knowledge of prostate cancer screening among men aged 40 and above",
          "Use of skin-lightening creams and awareness of their health risks among women",
          "Dietary habits of adolescents in secondary schools"
        ]
      },
      {
        name: "Environmental and occupational health",
        topics: [
          "Solid waste disposal practices and their health effects in urban communities",
          "Access to safe drinking water in rural communities",
          "Environmental sanitation practices and diarrhoea among children under five",
          "Use of personal protective equipment among artisans",
          "Health effects of generator fumes in households",
          "Occupational hazards among commercial motorcycle riders",
          "Indoor air pollution from firewood cooking and respiratory symptoms among women",
          "Hygiene practices of food vendors near schools",
          "Noise pollution and its health effects among market traders",
          "Knowledge of pesticide safety among farmers"
        ]
      },
      {
        name: "Health services and policy",
        topics: [
          "Utilisation of primary health care services in a rural area",
          "Enrolment in health insurance under the National Health Insurance Authority among civil servants",
          "Factors influencing self-medication among adults",
          "Patients' satisfaction with services in a general hospital",
          "Use of traditional medicine among residents of a selected community",
          "Mental health awareness and stigma in a selected community",
          "Barriers to accessing antenatal care in rural areas",
          "Knowledge of first aid among secondary school teachers",
          "Causes and effects of teenage pregnancy in a selected community",
          "Effect of health education on hand-washing practices among pupils"
        ]
      }
    ],
    tips: [
      "Choose one community, school or facility where you can get permission and reach enough respondents.",
      "Prevalence topics need a clear case definition, such as blood pressure of 140/90 mmHg or above for hypertension, and the right equipment.",
      "Environmental health topics often combine a questionnaire with an observation checklist, which strengthens your findings.",
      "Plan your ethical approval early. Most departments require it before data collection."
    ],
    methods: "Public health projects usually use a descriptive cross-sectional design with an interviewer-administered questionnaire, sometimes with measurements (blood pressure, BMI) or an observation checklist. Sample size is worked out with the Cochran or Leslie Fisher formula, and data are analysed with frequencies, chi-square and logistic regression.",
    narrow: ["Waste management", "Solid waste disposal practices and their health effects among households in Ajegunle, Lagos State"],
    guides: [
      ["solid-waste-management-practices-and-their-effects-in-nigerian-urban-communities-project-guide", "Solid Waste Management Practices and Their Effects in Nigerian Urban Communities"],
      ["awareness-prevalence-and-risk-factors-of-hypertension-among-adults-in-nigeria-project-guide", "Awareness, Prevalence and Risk Factors of Hypertension among Adults in Nigeria"],
      ["self-medication-and-misuse-of-antibiotics-among-undergraduates-in-nigeria-project-guide", "Self-Medication and Misuse of Antibiotics among Undergraduates in Nigeria"],
      ["knowledge-and-use-of-malaria-prevention-measures-among-pregnant-women-in-nigeria-project-guide", "Knowledge and Use of Malaria Prevention Measures among Pregnant Women in Nigeria"],
      ["knowledge-and-uptake-of-cervical-cancer-screening-and-hpv-vaccination-in-nigeria-project-guide", "Knowledge and Uptake of Cervical Cancer Screening and HPV Vaccination in Nigeria"],
      ["domestic-violence-against-women-in-nigeria-causes-effects-and-responses-project-guide", "Domestic Violence against Women in Nigeria: Causes, Effects and Responses"],
      ["knowledge-attitude-and-preventive-practices-towards-lassa-fever-among-residents-of-nigerian-communities-project-guide", "Knowledge, Attitude and Preventive Practices towards Lassa Fever among Residents of Nigerian Communities"],
      ["factors-influencing-the-utilisation-of-antenatal-care-services-among-pregnant-women-in-nigeria-project-guide", "Factors Influencing the Utilisation of Antenatal Care Services among Pregnant Women in Nigeria"],
      ["effects-of-flooding-and-climate-change-on-communities-in-nigeria-project-guide", "Effects of Flooding and Climate Change on Communities in Nigeria"]
    ]
  },
  ...MORE_DEPARTMENTS,
  ...EXTRA_DEPARTMENTS
];

export const departmentBySlug = (slug) => DEPARTMENTS.find((d) => d.slug === slug);
export const topicCount = (d) => d.groups.reduce((n, g) => n + g.topics.length, 0);
