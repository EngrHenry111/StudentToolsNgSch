// Essay and composition guides for WAEC/NECO English. Samples are original;
// names and places are invented.

const marking = {
  ul: [
    "Content (10 marks): relevant points that answer every part of the question.",
    "Organisation (10 marks): the correct format for the essay type and clear, well-linked paragraphs.",
    "Expression (20 marks): rich vocabulary, varied sentences and the right tone for the audience.",
    "Mechanical accuracy (10 marks): spelling, punctuation and grammar."
  ]
};
const markingIntro = { p: "In WAEC English Paper 2, the essay is marked out of 50 and you are usually asked to write about 450 words:" };

export const howToWriteEssay = {
  slug: "essay",
  path: "/how-to-write-an-essay",
  group: "Essays and Composition",
  short: "How to write an essay",
  title: "How to Write an Essay (WAEC): Structure, Types and Examples",
  description: "How to write a good essay for WAEC and NECO: plan, introduction, body and conclusion, the six essay types with what each needs, and how essays are marked.",
  h1: "How to Write an Essay: A Guide for Students",
  intro:
    "Essay writing carries a large share of the marks in WAEC and NECO English, and the same skills help in every subject that asks for written answers. A good essay answers the question, follows the right format for its type, and is organised into clear paragraphs. This guide covers planning, the structure of every essay, the six types you are likely to meet, and how examiners mark your work.",
  blocks: [
    { h2: "Step 1: Read the question carefully" },
    { p: "Underline the key words: the type of essay (letter, speech, article, story), the audience (your principal, a friend, readers of a newspaper) and every task in the question (describe, explain, suggest). Many students lose content marks because they answer only part of the question." },
    { h2: "Step 2: Plan in five minutes" },
    { p: "Jot down four or five main points, one for each body paragraph, and put them in a logical order. Add an example or detail to each point. A short plan saves time and stops you from repeating yourself." },
    { h2: "Step 3: Write the essay" },
    { h3: "Introduction" },
    { p: "Introduce the topic and, for argumentative and expository essays, state your position or main idea. Keep it to three or four sentences. A striking opening sentence, a question or a short anecdote can catch the examiner's attention." },
    { h3: "Body" },
    { p: "Write one main point per paragraph. Start each paragraph with a topic sentence, then explain and support it with examples. Link paragraphs with transitional words such as furthermore, however, as a result and in addition." },
    { h3: "Conclusion" },
    { p: "Sum up your main points and end with a strong final thought, a recommendation or, for a story, the outcome and its lesson. Do not introduce a new point in the conclusion." },
    { h2: "Step 4: Check your work" },
    { p: "Leave five minutes to read through. Correct spelling, punctuation and tense errors, and make sure you have followed the format (for example, addresses in a letter or vocatives in a speech)." },
    { h2: "The six types of essays" },
    {
      ul: [
        "Narrative essay: tells a story, real or imagined, in order of events. Example: How I spent my last holiday.",
        "Descriptive essay: paints a picture of a person, place, object or event using vivid detail. Example: Describe your school.",
        "Argumentative essay (including debate): takes a side on an issue and defends it with reasons and examples. Example: Boarding school is better than day school.",
        "Expository essay: explains a topic or process clearly and objectively. Example: The causes and effects of drug abuse.",
        "Letter writing: formal, semi-formal or informal letters, each with its own format.",
        "Speech, article and report writing: writing for a specific audience or publication, each with its own format."
      ]
    },
    { h2: "How examiners mark your essay" },
    markingIntro,
    marking,
    { h2: "Tips for higher marks" },
    {
      ul: [
        "Stay close to the word limit; very short essays lose content marks, and very long ones often lose accuracy marks.",
        "Use a variety of sentence lengths and some good vocabulary, but never at the cost of clarity.",
        "Avoid slang, text-message spellings and clichés like 'last but not the least'.",
        "Write neatly and leave a line between paragraphs."
      ]
    }
  ],
  faq: [
    { q: "What are the parts of an essay?", a: "An introduction, a body of several paragraphs (one main point each) and a conclusion. Letters, speeches, articles and reports add their own format features." },
    { q: "How many paragraphs should a WAEC essay have?", a: "Usually five to seven: an introduction, three to five body paragraphs and a conclusion, for an essay of about 450 words." },
    { q: "How many types of essays are there?", a: "The main types are narrative, descriptive, argumentative and expository essays, plus letter, speech, article and report writing, which follow special formats." },
    { q: "How is the WAEC essay marked?", a: "Out of 50: content 10, organisation 10, expression 20 and mechanical accuracy 10." }
  ],
  related: ["/argumentative-essay", "/narrative-essay", "/speech-writing", "/article-writing", "/report-writing", "/formal-letter-format"]
};

export const narrativeEssay = {
  slug: "narrative",
  path: "/narrative-essay",
  group: "Essays and Composition",
  short: "Narrative essay",
  title: "Narrative Essay: Example on How I Spent My Holiday",
  description: "How to write a narrative essay for WAEC and NECO, with a full sample essay on how I spent my holiday, a structure you can follow and topics to practise.",
  h1: "Narrative Essay, With an Example on How I Spent My Holiday",
  intro:
    "A narrative essay tells a story. It can be about something that happened to you or an imaginary event, but it must have a clear beginning, middle and end, and it must hold the reader's interest. One of the most common narrative topics is 'How I spent my last holiday'. This guide shows how to structure a narrative essay and gives a complete example.",
  blocks: [
    { h2: "Structure of a narrative essay" },
    {
      ol: [
        "Title.",
        "Introduction: set the scene (when, where, who) and hint at what is coming.",
        "Rising action: the events in order, with detail and some dialogue.",
        "Climax: the most exciting or important moment.",
        "Resolution: how things ended.",
        "Conclusion: what you learnt or how you felt, in one or two sentences."
      ]
    },
    { h2: "Features of a good narrative essay" },
    {
      ul: [
        "Past tense, used consistently (I went, we saw, she said).",
        "Events in a clear order, linked with time words: first, later that day, after a while, finally.",
        "Details that appeal to the senses: what you saw, heard, smelt and felt.",
        "A little dialogue to bring characters to life, punctuated correctly.",
        "A lesson or reflection at the end, without preaching."
      ]
    },
    { h2: "Example: How I spent my last holiday" },
    {
      letter: `HOW I SPENT MY LAST HOLIDAY

When the long vacation began in July, I expected nothing more exciting than sleeping late and watching television. Instead, my parents announced that I would spend six weeks with my grandmother in Ogbomoso, a town I had not visited since I was seven. Those weeks turned out to be the most memorable holiday of my life.

My grandmother, whom everyone calls Mama Agba, lives in a large old house with a farm behind it. On my first morning, she woke me at six o'clock. "A boy who sleeps till noon will eat only what others leave," she said with a smile, handing me a cutlass. That was how I began my career as a farmer. Every morning, we weeded rows of maize and yam, and I learnt to tell the difference between a weed and a young cassava plant, a skill I had never imagined needing.

In the second week, my cousin Bayo arrived from Ibadan, and the holiday became even livelier. In the evenings, we sat with Mama Agba under the mango tree while she told us folk tales about the tortoise and stories of how our family came to Ogbomoso. Sometimes the neighbours' children joined us, and we played ayo and football until the sky turned orange.

The most exciting day came in August, during the town's yearly festival. The streets filled with drummers, masquerades and traders selling roasted corn and puff-puff. Bayo and I followed a masquerade so closely that it suddenly turned and chased us, and we ran screaming into a stranger's shop while the crowd roared with laughter. My heart was still pounding when we got home, but we laughed about it for days.

Before I knew it, the holiday was over. On my last evening, Mama Agba gave me a small bag of groundnuts from the farm and told me to share them with my friends. As the bus pulled away, I realised I had learnt more in those six weeks than in many months of television: how food is grown, where my family comes from, and how much joy can be found in simple things.

I returned to school taller, darker and much happier, and I am already counting the days to my next visit to Ogbomoso.`,
      caption: "Sample narrative essay (about 420 words)"
    },
    { h2: "Narrative essay topics to practise" },
    {
      ul: [
        "An unforgettable experience.",
        "The day I got lost.",
        "Write a story that ends with: '...and that was the last time I told a lie.'",
        "My first day in secondary school.",
        "A journey I will never forget.",
        "The day our school won a competition."
      ]
    },
    { h2: "How examiners mark your essay" },
    markingIntro,
    marking
  ],
  faq: [
    { q: "What is a narrative essay?", a: "An essay that tells a story, real or imagined, with a clear beginning, middle and end, usually in the past tense." },
    { q: "How do I start a narrative essay?", a: "Set the scene quickly: when and where the story happened and who was involved, then hint at what is coming. An interesting first sentence or a line of dialogue can grab the reader." },
    { q: "Should a narrative essay have a title?", a: "Yes. Write the title at the top, usually the topic given in the question." }
  ],
  related: ["/how-to-write-an-essay", "/argumentative-essay", "/informal-letter-format", "/article-writing"]
};

export const argumentativeEssay = {
  slug: "argumentative",
  path: "/argumentative-essay",
  group: "Essays and Composition",
  short: "Argumentative essay",
  title: "Argumentative Essay and Debate: Format, Example and Topics",
  description: "How to write an argumentative essay and a debate speech for WAEC and NECO, with the debate format (Mr Chairman, panel of judges…), a full example and topics.",
  h1: "Argumentative Essay and Debate: Format and Example",
  intro:
    "An argumentative essay takes one side of an issue and tries to convince the reader with reasons and examples. In WAEC and NECO it often appears as a debate: you are asked to write your speech for or against a motion. This guide covers both forms: the format of a debate speech, the structure of an ordinary argumentative essay, a complete example and topics to practise.",
  blocks: [
    { h2: "Debate format (argumentative speech)" },
    {
      ol: [
        "Title: the motion, for example BOARDING SCHOOL IS BETTER THAN DAY SCHOOL.",
        "Vocatives (greetings to the audience): Mr Chairman, panel of judges, accurate timekeeper, co-debaters, ladies and gentlemen.",
        "Introduction: your name (if the question allows) and your position: 'I am here to support the motion which states that...'",
        "Body: three or four strong points, one per paragraph, each with an example.",
        "Rebuttal: briefly answer what the other side might say.",
        "Conclusion: restate your stand and appeal to the judges: 'I therefore urge you to vote for this motion.'",
        "Closing: 'Thank you for listening.'"
      ]
    },
    { h2: "Structure of an ordinary argumentative essay" },
    { p: "Without the debate format, write a title, an introduction that states your position clearly, body paragraphs with one argument each, a paragraph that answers the opposing view, and a conclusion that restates your position. Use a formal, confident tone." },
    { h2: "Example: debate speech" },
    { p: "Question: You are the main speaker in a debate on the motion: 'Boarding school is better than day school.' Write your speech for the motion." },
    {
      letter: `BOARDING SCHOOL IS BETTER THAN DAY SCHOOL

Mr Chairman, panel of judges, accurate timekeeper, co-debaters, ladies and gentlemen, I am here to support the motion which states that boarding school is better than day school. By the end of my speech, I am confident you will agree with me.

First, boarding school gives students more time to study. A day student may spend two or three hours in traffic every day, and then return home to chores, noise and distractions. A boarding student has fixed prep periods every evening, supervised by teachers, and libraries and classmates close by. It is no surprise that many of the best WAEC results in Nigeria come from boarding schools.

Secondly, boarding school teaches independence and discipline. Students learn to wake up early, wash their clothes, manage their pocket money and obey rules without a parent standing over them. These habits prepare them for university and for life far better than having everything done for them at home.

Thirdly, boarding students build friendships with young people from different states, religions and backgrounds. Living together, they learn tolerance and teamwork. Many lifelong friendships and business partnerships in Nigeria began in a school dormitory.

My opponents will say that boarding students miss their parents' care and moral guidance. However, good boarding schools have house masters, chaplains and counsellors, and parents can still visit and call. A child does not lose his family by spending term time in school; he gains a second community.

Mr Chairman, panel of judges, boarding school gives more time for study, builds discipline and independence, and teaches students to live with others. I therefore urge you to vote for this motion.

Thank you for listening.`,
      caption: "Sample debate speech (for the motion)"
    },
    { h2: "Argumentative essay topics" },
    {
      ul: [
        "Science subjects are more important than arts subjects.",
        "Social media does more harm than good to young people.",
        "Mathematics is an easy subject.",
        "Corporal punishment should be banned in schools.",
        "Girls should be given the same education as boys.",
        "Western education has done more harm than good to African culture."
      ]
    },
    { h2: "Tips" },
    {
      ul: [
        "Choose the side you can argue best, not the one you agree with emotionally.",
        "Make each point clearly in the first sentence of its paragraph.",
        "Support points with examples from Nigerian life, news or your experience.",
        "Address the judges respectfully and avoid insulting the other side.",
        "Use persuasive phrases: it is clear that, there is no doubt that, consider the fact that."
      ]
    },
    { h2: "How examiners mark your essay" },
    markingIntro,
    marking
  ],
  faq: [
    { q: "What is the format of an argumentative essay in WAEC?", a: "For a debate: title (the motion), vocatives (Mr Chairman, panel of judges, accurate timekeeper, co-debaters, ladies and gentlemen), your stand, three or four points, a rebuttal, a conclusion urging the judges to vote, and 'Thank you for listening.'" },
    { q: "How do you start a debate?", a: "Greet the audience with the vocatives, then state your stand: 'I am here to support (or oppose) the motion which states that...'" },
    { q: "What is the difference between a debate and an argumentative essay?", a: "Both argue one side. A debate is written as a speech to a live audience with vocatives and a direct appeal to the judges; an argumentative essay is written for readers, with a title, introduction, arguments and conclusion." }
  ],
  related: ["/how-to-write-an-essay", "/speech-writing", "/narrative-essay", "/article-writing"]
};

export const speechWriting = {
  slug: "speech",
  path: "/speech-writing",
  group: "Essays and Composition",
  short: "Speech writing",
  title: "Speech Writing Format (WAEC): Example and Topics",
  description: "Speech writing format for WAEC and NECO: title, vocatives, introduction, body and closing, with a full sample speech and topics to practise.",
  h1: "Speech Writing: Format and Example",
  intro:
    "A speech is written to be spoken to a live audience: students at an assembly, parents at a prize-giving day, or members of a club. In WAEC and NECO you may be asked to write a speech as a school prefect, a guest speaker or a club president. A speech follows a clear format with vocatives (greetings to the audience) and speaks directly to the listeners. This guide explains the format, gives a full example and lists topics.",
  blocks: [
    { h2: "Speech writing format" },
    {
      ol: [
        "Title: what the speech is about, often given in the question.",
        "Vocatives: greet the most important people first, for example: The Principal, Vice Principals, members of staff, invited guests, fellow students, ladies and gentlemen.",
        "Introduction: thank the audience or organisers and introduce yourself and your topic.",
        "Body: your main points, one per paragraph, speaking directly to the audience (you, we, our).",
        "Conclusion: sum up and leave the audience with a clear message or call to action.",
        "Closing: 'Thank you for listening.' Some schools also end with your name and position."
      ]
    },
    { h2: "Sample speech" },
    { p: "Question: As the Senior Prefect of your school, write the speech you will deliver at the school's end-of-year assembly, on the theme 'Building a cleaner school'." },
    {
      letter: `BUILDING A CLEANER SCHOOL

The Principal, Vice Principals, members of staff, my fellow prefects and students, ladies and gentlemen,

I am grateful for the opportunity to speak to you today, as we come to the end of another successful year. As your Senior Prefect, I want to talk about something that affects every one of us: the cleanliness of our school.

Look around our compound this morning. Our school is beautiful, but too often it is spoilt by sachet water bags behind the classroom blocks, biscuit wrappers in the corridors and blocked gutters near the dining hall. These are not just ugly sights. Dirty surroundings breed mosquitoes and flies, and many of the cases of malaria and stomach infection recorded at our sick bay this term can be traced to them.

A cleaner school begins with each of us. If every student puts his or her waste in the bins provided, our compound will be clean by the end of each day. I urge class captains to lead short clean-up exercises in their classrooms every Friday, and I appeal to the hostel prefects to make room inspections stricter.

We can also do more together. The prefects' council has proposed a "Cleanest Class" award, to be given every term, and the Principal has kindly approved it. We will also plant flowers along the main walkway, with the help of the Agricultural Science Club.

Fellow students, a clean school is a healthy school, and a healthy school is a successful one. Let us take pride in our school and keep it clean, not because we are told to, but because it is ours.

Thank you for listening.

Uchenna Okafor
Senior Prefect`,
      caption: "Sample speech at a school assembly"
    },
    { h2: "Speech writing topics" },
    {
      ul: [
        "As the guest speaker at a youth rally, write your speech on the dangers of drug abuse.",
        "Write a speech to be delivered at your school's prize-giving day, on the importance of hard work.",
        "As the President of your school's Health Club, give a talk to junior students on personal hygiene.",
        "Write a farewell speech to be delivered at your school's valedictory service.",
        "As a candidate for the post of Senior Prefect, write your campaign speech."
      ]
    },
    { h2: "Tips" },
    {
      ul: [
        "Write as if you are speaking: use 'you' and 'we', ask questions and appeal to the audience.",
        "Match the vocatives to the occasion and put the most senior person first.",
        "Keep sentences clear and memorable; a speech must be easy to follow when heard.",
        "End with a strong message the audience will remember."
      ]
    },
    { h2: "How examiners mark your essay" },
    markingIntro,
    marking
  ],
  faq: [
    { q: "What is the format of speech writing?", a: "A title, vocatives greeting the audience, an introduction, body paragraphs addressed directly to the listeners, a conclusion with a clear message, and 'Thank you for listening.'" },
    { q: "What are vocatives in speech writing?", a: "The greetings at the start of a speech to the important people present, in order of seniority, for example: The Principal, members of staff, invited guests, fellow students, ladies and gentlemen." },
    { q: "How do you end a speech?", a: "Sum up your main message, then close with 'Thank you for listening.' Some schools also want your name and position at the end." }
  ],
  related: ["/argumentative-essay", "/article-writing", "/how-to-write-an-essay", "/report-writing"]
};

export const articleWriting = {
  slug: "article",
  path: "/article-writing",
  group: "Essays and Composition",
  short: "Article writing",
  title: "Article Writing Format (WAEC): Example for a School Magazine",
  description: "Article writing format for WAEC and NECO: title, introduction, body and conclusion, the writer's name at the end, a full sample article and topics.",
  h1: "Article Writing: Format and Example",
  intro:
    "An article is written for publication in a newspaper, magazine or school magazine, to inform or persuade its readers. In WAEC and NECO you may be asked to write an article for your school magazine or a national newspaper on a social issue. An article needs an interesting title, a clear structure and, at the end, the writer's name and details. This guide explains the format and gives a full example.",
  blocks: [
    { h2: "Article writing format" },
    {
      ol: [
        "Title (headline): short and interesting, written in capital letters.",
        "Optional by-line under the title: By Adaeze Obi.",
        "Introduction: catch the reader's attention and introduce the issue.",
        "Body: the main points (causes, effects, solutions), one per paragraph, with examples.",
        "Conclusion: sum up and give a final call to action or recommendation.",
        "Writer's details at the end: your name, and your class and school (or your address for a newspaper)."
      ]
    },
    { h2: "Sample article for a school magazine" },
    { p: "Question: Write an article for your school magazine on the dangers of examination malpractice." },
    {
      letter: `EXAMINATION MALPRACTICE: A SHORTCUT TO NOWHERE

Every year, as WAEC and NECO approach, a dangerous rumour spreads through secondary schools: that there is an easy way to pass without studying. Whether it is "expo" sold on social media, answers smuggled into the hall or help from a so-called special centre, examination malpractice is a shortcut that leads nowhere.

The first danger is the punishment. WAEC and NECO withhold or cancel the results of candidates caught cheating, and some are barred from writing the examination for years. Under Nigerian law, examination malpractice is also a criminal offence. A student who cheats risks losing not just one paper but years of hard work.

Secondly, most "expo" is fake. Each year, many students pay for questions that never appear, and spend the nights before the examination memorising wrong answers instead of studying. They walk into the hall confused and come out with worse results than if they had simply prepared.

Even when cheating succeeds, it leaves students unprepared. A student who cheated through Mathematics and Physics will struggle badly in a university Engineering or Medicine course, and may drop out. Certificates open doors, but only knowledge keeps you inside.

How, then, can students succeed honestly? Start studying early, use past questions to understand the pattern of the examination, form study groups, and ask teachers for help with difficult topics. Schools and parents must also play their part by refusing to pay for "special centres" and by rewarding honest effort.

Fellow students, there is no shortcut to success. Let us study hard and earn results we can be proud of.

Ifeoma Nwachukwu
SS 3 Science,
Federal Government Girls' College, Abuloma.`,
      caption: "Sample article (about 330 words)"
    },
    { h2: "Article writing topics" },
    {
      ul: [
        "Write an article for a national newspaper on the effects of youth unemployment.",
        "Write an article for your school magazine on the importance of reading.",
        "Write an article on the causes and effects of road accidents in Nigeria.",
        "Write an article for your school magazine on cultism in secondary schools.",
        "Write an article on how social media affects students' studies."
      ]
    },
    { h2: "Tips" },
    {
      ul: [
        "Use a catchy title; it is the first thing readers see.",
        "Write for your readers: students for a school magazine, the general public for a newspaper.",
        "Use facts, examples and a few rhetorical questions to keep the reader interested.",
        "Do not write 'Dear readers' or 'Yours faithfully'; an article is not a letter.",
        "Remember your name and details at the end."
      ]
    },
    { h2: "How examiners mark your essay" },
    markingIntro,
    marking
  ],
  faq: [
    { q: "What is the format of an article?", a: "A title (headline), an introduction, body paragraphs, a conclusion, and the writer's name with their class and school (or address) at the end." },
    { q: "Does an article have a title?", a: "Yes. A short, interesting title in capital letters is essential." },
    { q: "Where does the writer's name go in an article?", a: "In WAEC articles, at the end, followed by the class and school or the writer's address. A by-line under the title is optional." }
  ],
  related: ["/speech-writing", "/report-writing", "/argumentative-essay", "/how-to-write-an-essay"]
};

export const reportWriting = {
  slug: "report",
  path: "/report-writing",
  group: "Essays and Composition",
  short: "Report writing",
  title: "Report Writing Format (WAEC): Sample Report for Students",
  description: "Report writing format for WAEC and NECO: title, introduction, findings, recommendations and conclusion, with a full sample report to a principal and topics.",
  h1: "Report Writing: Format and Sample for Students",
  intro:
    "A report gives an account of something that happened or something you investigated, and usually ends with recommendations. In WAEC and NECO you might be asked to write a report to your principal on an accident, a school trip or a problem in the hostel. Reports must be factual, clear and well organised. This guide gives the format and a full sample.",
  blocks: [
    { h2: "Report writing format" },
    {
      ol: [
        "Title: A REPORT ON... (what the report is about).",
        "Addressee: who the report is for, for example To: The Principal, if the question asks for it.",
        "Introduction: who asked for the report, why, and how the information was gathered.",
        "Findings (body): the facts, in a logical order, one main point per paragraph.",
        "Recommendations: practical suggestions based on the findings.",
        "Conclusion: a short summary.",
        "Writer's details: name, position or class, and the date."
      ]
    },
    { h2: "Sample report" },
    { p: "Question: As the Labour Prefect of your school, write a report to your principal on the poor state of the school's toilets and suggest what should be done." },
    {
      letter: `A REPORT ON THE POOR STATE OF THE SCHOOL TOILETS

To: The Principal

At the last staff and prefects' meeting on 2nd November, 2026, you directed me to inspect the school's toilets and report on their condition. I visited all the toilet blocks on 4th and 5th November, spoke with the cleaners and twenty students from different classes, and checked the water supply with the school plumber. My findings are as follows.

Of the twenty-four toilets in the four blocks, only nine are in use. Eleven have broken flush systems, and four have damaged doors that cannot be locked. As a result, students queue for long periods during break, and some now use the bush behind the laboratory, which is unhealthy and unsafe.

Water supply is the main cause of the problem. The overhead tank serving the junior blocks has leaked for two months, so the toilets often have no water. Without water, the toilets quickly become dirty and smell, and the cleaners say they cannot keep them clean.

The students I spoke with also admitted that some students misuse the toilets, throwing paper and sachets into them, which blocks the pipes.

I therefore recommend that the leaking tank and broken flush systems be repaired as soon as possible, that the damaged doors be replaced, and that buckets and drums be kept filled as a backup when water is short. I also recommend a short talk at the next assembly on proper toilet use, and that house prefects be made responsible for checking their blocks daily.

In conclusion, the poor state of our toilets is a serious health risk, but most of the problems can be solved quickly with repairs and better supervision.

Chinedu Okeke
Labour Prefect
12th November, 2026.`,
      caption: "Sample report to a principal"
    },
    { h2: "Report writing topics" },
    {
      ul: [
        "As the secretary of your school's Press Club, write a report on the club's excursion to a newspaper house.",
        "Write a report to your principal on a fire incident in the girls' hostel.",
        "As the class captain, write a report on the causes of lateness in your class.",
        "Write a report to the Chairman of your Local Government on the flood that affected your community."
      ]
    },
    { h2: "Tips" },
    {
      ul: [
        "Stick to facts: dates, numbers and what you saw or were told.",
        "Use a formal, impersonal tone; avoid emotional language.",
        "Make recommendations practical and linked to your findings.",
        "Remember your name, position and the date at the end."
      ]
    },
    { h2: "How examiners mark your essay" },
    markingIntro,
    marking
  ],
  faq: [
    { q: "What is the format of a report?", a: "A title (A REPORT ON...), the addressee if required, an introduction, findings, recommendations, a conclusion, and the writer's name, position and date." },
    { q: "What is the difference between a report and an article?", a: "A report gives facts about an event or investigation to a specific person or body and ends with recommendations. An article is written for readers of a newspaper or magazine to inform or persuade them." },
    { q: "Should a report be written in the first person?", a: "You may use 'I' to describe what you did to gather information, but keep the findings factual and the tone formal." }
  ],
  related: ["/article-writing", "/speech-writing", "/formal-letter-format", "/how-to-write-an-essay"]
};

export const ESSAYS = [howToWriteEssay, narrativeEssay, argumentativeEssay, speechWriting, articleWriting, reportWriting];
