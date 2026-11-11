// WAEC/NECO letter writing guides: formal, informal and semi-formal.
// Sample answers are original; names and places are invented.

const marking = {
  ul: [
    "Content (10 marks): did you answer every part of the question with relevant points?",
    "Organisation (10 marks): correct format (addresses, date, salutation, heading where needed, closing) and clear paragraphs.",
    "Expression (20 marks): good vocabulary, varied sentences and the right tone for the reader.",
    "Mechanical accuracy (10 marks): spelling, punctuation and grammar. Every error costs marks."
  ]
};

export const formalLetter = {
  slug: "formal-letter",
  path: "/formal-letter-format",
  group: "School Letters (WAEC)",
  short: "Formal letter",
  title: "Formal Letter Format (WAEC): Features, Example and Topics",
  description: "Formal letter format for WAEC and NECO: the two addresses, salutation, heading and closing, a full sample answer, topics to practise and how it is marked.",
  h1: "Formal Letter Format, With an Example for Students",
  intro:
    "A formal letter is written to someone in an official position, such as a principal, a commissioner, a chairman or the editor of a newspaper, usually about a problem, a request or a suggestion. It is one of the most common essay questions in WAEC and NECO English. This guide explains every part of the formal letter format, gives a full sample answer and lists topics to practise.",
  blocks: [
    { h2: "Features of a formal letter" },
    {
      ol: [
        "The writer's address at the top right, with the date directly below it.",
        "The receiver's address on the left, starting a line below the date, beginning with the receiver's title (The Principal, The Chairman, The Editor).",
        "The salutation: Dear Sir, Dear Madam or Dear Sir/Madam. Never use the receiver's first name.",
        "The heading (title): a short summary of the letter, in capital letters or underlined, below the salutation.",
        "The body: an introduction that states the purpose, two or three paragraphs of points, and a conclusion.",
        "The complimentary close: Yours faithfully, (with a comma).",
        "Your signature and your full name below it."
      ]
    },
    { h2: "How many addresses does a formal letter have?" },
    { p: "Two: the writer's address at the top right and the receiver's address on the left. An informal letter and a semi-formal letter have only one address, the writer's." },
    { h2: "Formal letter format (layout)" },
    {
      letter: `                                   Writer's Address,
                                   Town, State.
                                   Date.

Receiver's Title,
Organisation,
Address,
Town, State.

Dear Sir,

HEADING IN CAPITAL LETTERS

Introduction: say why you are writing.

Body: your points, one main point per paragraph.

Conclusion: what you want done, and a polite close.

                                   Yours faithfully,
                                   (Signature)
                                   Full Name`,
      caption: "Formal letter layout"
    },
    { h2: "Formal letter example for students" },
    { p: "Question: Write a letter to the Chairman of your Local Government Council complaining about the bad state of the main road in your area, and suggesting what should be done." },
    {
      letter: `                                   15, Oke-Ado Road,
                                   Ibadan, Oyo State.
                                   12th November, 2026.

The Chairman,
Ibadan South-West Local Government Council,
Oke-Ado,
Ibadan, Oyo State.

Dear Sir,

THE DETERIORATING STATE OF OKE-ADO MAIN ROAD

I write on behalf of the residents of Oke-Ado community to draw your attention to the very poor condition of our main road, which has become a source of danger and hardship to everyone who uses it.

For over a year, the road has been full of deep potholes, some as wide as a small car. During the rainy season, the potholes fill with water, so motorists cannot see how deep they are. Last month, a commercial bus fell into one of them and three passengers were injured. Pupils of the two primary schools on the road now arrive late and muddy almost every day.

The bad road has also hurt business in our community. Traders at Oke-Ado market complain that customers no longer come because transport fares have doubled, as drivers charge more to cover damage to their vehicles. Some shops have closed down completely.

We therefore appeal to you, Sir, to repair the road before the next rainy season. The potholes should be filled and the drainage channels cleared, so that rainwater no longer collects on the road. The community is willing to support the council by organising monthly sanitation exercises to keep the drains clear.

We are confident that you will treat this matter with the urgency it deserves, and we thank you in advance for your prompt action.

                                   Yours faithfully,
                                   (Signature)
                                   ADEOLA BANKOLE`,
      caption: "Sample answer: complaint to a Local Government Chairman"
    },
    { h2: "Formal letter topics to practise" },
    {
      ul: [
        "Write to the Commissioner for Education in your state about the poor condition of facilities in your school, suggesting improvements.",
        "Write a letter to the editor of a national newspaper on the effects of drug abuse among young people.",
        "Write to your principal requesting permission to start a new club in your school.",
        "Write to the Managing Director of an electricity distribution company complaining about irregular power supply in your area.",
        "Write to the Chairman of your Local Government suggesting ways to reduce unemployment among youths.",
        "Write a letter to the Inspector-General of Police about the activities of cultists in your community."
      ]
    },
    { h2: "How WAEC marks your letter" },
    { p: "Letter writing appears in the essay section of WAEC English Paper 2, where you are usually asked to write about 450 words. The essay is marked out of 50:" },
    marking,
    { h2: "Common mistakes in formal letters" },
    {
      ul: [
        "Writing 'Yours sincerely' or 'Yours truly' instead of 'Yours faithfully'.",
        "Leaving out the heading, or making it too long.",
        "Using slang, abbreviations or emotional language. Stay polite and firm.",
        "Greeting the receiver ('How are you and your family?'). Formal letters go straight to the point.",
        "Writing the receiver's address on the right or putting the date below the receiver's address."
      ]
    }
  ],
  faq: [
    { q: "What is a formal letter?", a: "A letter written to someone in an official position, or to an organisation, about official business such as a complaint, a request, an application or a suggestion. It uses a fixed format and a serious, polite tone." },
    { q: "How many addresses are in a formal letter?", a: "Two: the writer's address at the top right and the receiver's address on the left." },
    { q: "How do you end a formal letter?", a: "With 'Yours faithfully,' followed by your signature and your full name." },
    { q: "Does a formal letter have a title?", a: "Yes. A formal letter must have a heading (title) below the salutation, usually in capital letters or underlined." },
    { q: "How many words should a WAEC formal letter be?", a: "WAEC usually asks for about 450 words. Plan five or six paragraphs: an introduction, three or four body paragraphs and a conclusion." }
  ],
  related: ["/informal-letter-format", "/semi-formal-letter-format", "/complaint-letter", "/how-to-write-an-application-letter"]
};

export const informalLetter = {
  slug: "informal-letter",
  path: "/informal-letter-format",
  group: "School Letters (WAEC)",
  short: "Informal letter",
  title: "Informal Letter Format (WAEC): Example to a Friend and Topics",
  description: "Informal letter format for WAEC and NECO: one address, a full sample letter to a friend, topics to practise and the mistakes that cost marks.",
  h1: "Informal Letter Format, With an Example to a Friend",
  intro:
    "An informal letter (also called a personal or friendly letter) is written to someone you know well: a friend, a brother or sister, a cousin or a classmate. It is friendly and relaxed, but in WAEC and NECO it must still follow a correct format and good English. This guide shows the informal letter format, a full sample to a friend and topics to practise.",
  blocks: [
    { h2: "Features of an informal letter" },
    {
      ol: [
        "Only one address: the writer's address at the top right, with the date below it.",
        "The salutation, using the receiver's first name or the name you call them: Dear Tunde, Dear Sis, My dear Amaka.",
        "No heading or title.",
        "An opening paragraph with warm greetings and a question or two about the receiver and their family.",
        "The body: the main purpose of the letter, in two or three paragraphs.",
        "A closing paragraph with greetings to people you both know and a friendly goodbye.",
        "The complimentary close: Yours sincerely, Your friend, Your loving brother or Your dear sister.",
        "Your first name only (or the name the receiver calls you)."
      ]
    },
    { h2: "How many addresses does an informal letter have?" },
    { p: "One: the writer's address at the top right, followed by the date. The receiver's address is never written in an informal letter." },
    { h2: "Informal letter format (layout)" },
    {
      letter: `                                   Writer's Address,
                                   Town, State.
                                   Date.

Dear [First name],

Opening: greetings and enquiries about the receiver.

Body: the purpose of the letter, one main idea per paragraph.

Closing: greetings to others and a friendly goodbye.

                                   Yours sincerely,
                                   [First name]`,
      caption: "Informal letter layout"
    },
    { h2: "Informal letter example to a friend" },
    { p: "Question: Write a letter to your friend in another school telling him about the inter-house sports competition held recently in your school." },
    {
      letter: `                                   Federal Government College,
                                   P.M.B. 1012,
                                   Enugu, Enugu State.
                                   12th November, 2026.

Dear Chidi,

How are you and your studies? I hope you are doing well and that your parents and your little sister, Ada, are fine. I am very well, and I have been very busy since we resumed for the new term.

I am writing to tell you about our inter-house sports competition, which took place last Saturday. It was the most exciting event I have seen in this school. The field was decorated with flags in the colours of the four houses, and parents, old students and even the local government chairman came to watch.

The day began with a march past, which Blue House won because of their neat uniforms and perfect steps. Then the races began. You know I have always loved running, so you can imagine my joy when I won the 400 metres race for Green House. The 4 x 100 metres relay was the highlight of the day: our anchor runner overtook two boys in the last fifty metres, and the whole crowd stood up and screamed.

At the end of the day, Green House came first with 112 points, and our house captain received the trophy from the chairman. We sang and danced all the way back to the hostel. I wish you had been there to see it.

Please greet your parents and Ada for me. Tell me about the sports in your school when you reply. I am looking forward to seeing you during the Christmas holiday.

                                   Your friend,
                                   Emeka`,
      caption: "Sample answer: inter-house sports"
    },
    { h2: "Informal letter topics to practise" },
    {
      ul: [
        "Write a letter to your friend who has just gained admission to a university, congratulating him or her and giving advice.",
        "Write to your younger brother who is about to write the BECE, advising him on how to prepare.",
        "Write a letter to your cousin abroad describing a festival celebrated in your town.",
        "Write to your friend telling her about how you spent the last holiday.",
        "Write a letter to your friend about the dangers of examination malpractice.",
        "Write to your sister describing your first week in a new school."
      ]
    },
    { h2: "How WAEC marks your letter" },
    { p: "Informal letters are marked like other essays in WAEC English Paper 2, out of 50, and you are usually asked to write about 450 words:" },
    marking,
    { h2: "Common mistakes in informal letters" },
    {
      ul: [
        "Writing two addresses or adding a heading. Informal letters have neither.",
        "Ending with 'Yours faithfully' or writing your full name and surname.",
        "Using text-message spellings (u, pls, 2moro) or slang. Be friendly, but write correct English.",
        "Spending too long on greetings and too little on the actual question."
      ]
    }
  ],
  faq: [
    { q: "What is an informal letter?", a: "A friendly letter written to someone you know well, such as a friend or family member. It has one address, no heading, a relaxed tone and ends with your first name." },
    { q: "How many addresses does an informal letter have?", a: "One: the writer's address at the top right, with the date below it." },
    { q: "How do you end an informal letter?", a: "With a friendly close such as 'Yours sincerely', 'Your friend' or 'Your loving brother', followed by your first name." },
    { q: "Does an informal letter have a title?", a: "No. Informal letters do not have a heading." }
  ],
  related: ["/formal-letter-format", "/semi-formal-letter-format", "/how-to-write-an-application-letter", "/permission-letter"]
};

export const semiFormalLetter = {
  slug: "semi-formal-letter",
  path: "/semi-formal-letter-format",
  group: "School Letters (WAEC)",
  short: "Semi-formal letter",
  title: "Semi-Formal Letter Format: Example and Topics With Answers",
  description: "Semi-formal letter format for WAEC and NECO: one address, how to greet and close, a full sample letter, topics with answer outlines and common mistakes.",
  h1: "Semi-Formal Letter Format, With an Example",
  intro:
    "A semi-formal letter is written to someone you know but must still respect, such as a teacher, your principal, your pastor or imam, a family friend or a relative you address formally. It sits between a formal and an informal letter: polite and respectful, but warmer than an official letter. This guide explains the semi-formal letter format, gives a complete sample and lists topics with short answer outlines.",
  blocks: [
    { h2: "Features of a semi-formal letter" },
    {
      ol: [
        "One address: the writer's address at the top right, with the date below it.",
        "A respectful salutation using title and surname: Dear Mr. Okoro, Dear Mrs. Bello, Dear Dr. Ahmed, Dear Uncle Femi.",
        "A heading is optional; many teachers advise leaving it out. If you use one, keep it short.",
        "A polite opening that may include a brief greeting and an enquiry about the receiver's well-being.",
        "The body, which deals with the purpose of the letter in two or three paragraphs.",
        "A polite conclusion.",
        "The complimentary close: Yours sincerely,",
        "Your signature and your full name (first name and surname)."
      ]
    },
    { h2: "How many addresses does a semi-formal letter have?" },
    { p: "One: the writer's address, with the date below it. Like an informal letter, a semi-formal letter does not include the receiver's address." },
    { h2: "Semi-formal letter format (layout)" },
    {
      letter: `                                   Writer's Address,
                                   Town, State.
                                   Date.

Dear Mr. [Surname],

Opening: a respectful greeting and the reason for writing.

Body: the main points, one idea per paragraph.

Conclusion: a polite close and good wishes.

                                   Yours sincerely,
                                   (Signature)
                                   First name Surname`,
      caption: "Semi-formal letter layout"
    },
    { h2: "Semi-formal letter example for students" },
    { p: "Question: Your uncle has paid your school fees for the past three years. Write a letter to him thanking him and telling him about your progress in school." },
    {
      letter: `                                   Government Secondary School,
                                   P.M.B. 2045,
                                   Kaduna, Kaduna State.
                                   12th November, 2026.

Dear Uncle Musa,

I hope this letter finds you and Auntie Zainab in good health. I am writing to thank you sincerely for paying my school fees for the past three years, and to let you know how well I am doing in school.

When my father lost his job three years ago, I was afraid I would have to leave school. Your kindness made it possible for me to continue my education without worry, and I do not take it for granted. Every term, when I see my name on the list of students who have paid their fees, I remember your generosity.

I am happy to tell you that I have worked hard to make you proud. I came second in my class in the last examination, with distinctions in Mathematics, Physics and Chemistry. I was also made the assistant senior prefect this term, and I have joined the school's Mathematics Olympiad team, which will compete at the state level next month.

I am now preparing seriously for my WAEC examination next year, and I hope to study Engineering at university. I promise to continue to study hard and to live up to the trust you have placed in me.

Please extend my warm greetings to Auntie Zainab and my cousins. May God reward you abundantly for your kindness.

                                   Yours sincerely,
                                   (Signature)
                                   Ibrahim Danladi`,
      caption: "Sample answer: thanking an uncle who pays your fees"
    },
    { h2: "Semi-formal letter topics with answer outlines" },
    { h3: "1. Write to your former teacher telling him or her about your new school." },
    { p: "Outline: greet the teacher respectfully; describe the new school's facilities, teachers and subjects; mention how the teacher's lessons have helped you settle in; close with thanks and good wishes." },
    { h3: "2. Write to your principal, whom you know well, suggesting ways to improve discipline in the school." },
    { p: "Outline: state your purpose politely; describe two or three discipline problems with examples; suggest practical solutions such as a mentoring scheme and clear rules; close respectfully." },
    { h3: "3. Write to your pastor or imam thanking him for the counselling you received after a difficult period." },
    { p: "Outline: thank him; explain how his advice helped you; describe the changes you have made since then; close with prayers and good wishes." },
    { h3: "4. Write to a family friend who is a doctor, asking for advice on studying Medicine." },
    { p: "Outline: introduce your interest; ask about subjects, cut-off marks and the life of a medical student; ask for any advice for your preparation; close with thanks." },
    { h2: "How WAEC marks your letter" },
    { p: "Semi-formal letters are marked like other essays in WAEC English Paper 2, out of 50, and you are usually asked to write about 450 words:" },
    marking,
    { h2: "Common mistakes in semi-formal letters" },
    {
      ul: [
        "Using the receiver's first name alone (Dear Musa) when you should use a title (Dear Uncle Musa, Dear Mr. Musa).",
        "Writing the receiver's address, which belongs only in formal letters.",
        "Ending with 'Yours faithfully' or with only your first name.",
        "Making the tone too casual, with jokes or slang, or too stiff, like an official letter."
      ]
    }
  ],
  faq: [
    { q: "What is a semi-formal letter?", a: "A letter to someone you know but must respect, such as a teacher, a principal, a religious leader or an older relative. It is polite and respectful but warmer than a formal letter." },
    { q: "How many addresses does a semi-formal letter have?", a: "One: the writer's address with the date below it." },
    { q: "How do you end a semi-formal letter?", a: "With 'Yours sincerely,' followed by your signature and your full name." },
    { q: "Does a semi-formal letter need a heading?", a: "A heading is optional and many teachers advise leaving it out. If you include one, keep it short and below the salutation." }
  ],
  related: ["/formal-letter-format", "/informal-letter-format", "/permission-letter", "/reference-letter"]
};

export const SCHOOL_LETTERS = [formalLetter, informalLetter, semiFormalLetter];
