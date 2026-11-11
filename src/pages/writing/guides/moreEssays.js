// Descriptive and expository essay guides for WAEC/NECO English. Samples are
// original; names and places are invented.

const marking = {
  ul: [
    "Content (10 marks): relevant points that answer every part of the question.",
    "Organisation (10 marks): the correct format for the essay type and clear, well-linked paragraphs.",
    "Expression (20 marks): rich vocabulary, varied sentences and the right tone for the audience.",
    "Mechanical accuracy (10 marks): spelling, punctuation and grammar."
  ]
};
const markingIntro = { p: "In WAEC English Paper 2, the essay is marked out of 50 and you are usually asked to write about 450 words:" };

export const descriptiveEssay = {
  slug: "descriptive",
  path: "/descriptive-essay",
  group: "Essays and Composition",
  short: "Descriptive essay",
  title: "Descriptive Essay: Example Essay on My School (WAEC)",
  description: "How to write a descriptive essay for WAEC and NECO, with a full sample essay on my school, a structure to follow and topics to practise.",
  h1: "Descriptive Essay, With an Example Essay on My School",
  intro:
    "A descriptive essay paints a picture in words. Whether you are asked to describe your school, a market, a person you admire or a festival, the aim is the same: help the reader see, hear and feel what you are describing. 'Describe your school' is one of the most common descriptive topics in WAEC, NECO and junior secondary exams. This guide explains how to structure a descriptive essay, how it differs from a narrative, and gives a complete example on my school.",
  blocks: [
    { h2: "Descriptive essay vs narrative essay" },
    { p: "A narrative essay tells a story: events happen one after another. A descriptive essay describes something as it is: its appearance, sounds, people and atmosphere. You may include a short incident, but the essay should not turn into a story. Descriptive essays are often written in the present tense (my school stands on a hill), while narratives use the past tense." },
    { h2: "Structure of a descriptive essay" },
    {
      ol: [
        "Title.",
        "Introduction: name what you are describing, where it is, and give a general impression in two or three sentences.",
        "Body paragraph 1: the overall appearance or setting (location, size, surroundings).",
        "Body paragraphs 2 to 4: specific parts in a logical order, for example from the gate inwards, from the outside to the inside, or from the most to the least important.",
        "Body paragraph 5: the people, activities or atmosphere that give the place its character.",
        "Conclusion: your feelings about it and why it matters to you."
      ]
    },
    { h2: "How to make your description vivid" },
    {
      ul: [
        "Use the five senses: what you see, hear, smell, touch and even taste.",
        "Choose precise adjectives: not 'a nice building' but 'a two-storey cream building with green louvres'.",
        "Use comparisons (similes and metaphors) sparingly: the assembly ground is as wide as a football pitch.",
        "Move in a clear order so the reader can follow, and link paragraphs with phrases such as beyond the gate, to the left, at the far end.",
        "Give real details: numbers, colours, names of blocks and clubs."
      ]
    },
    { h2: "Example: My school" },
    {
      letter: `MY SCHOOL

Some schools are known for their grand buildings, others for their results. Hillside Comprehensive College, where I am in SS 2, is known for both, and for something more: a spirit of friendliness that makes every visitor feel welcome. Standing on a gentle hill on the outskirts of Akure, it is the place where I have spent the happiest years of my life.

The first thing a visitor notices is the tall blue gate with the school's crest, an open book beneath a rising sun, painted in gold. Beyond the gate, a tarred road lined with whistling pine trees leads to the administrative block, a neat two-storey building with cream walls and green louvres. Here are the offices of the principal, the vice-principals and the bursar, and the staff room, which is always busy with teachers marking scripts and discussing students.

Behind the administrative block lies the heart of the school: four long classroom blocks arranged around a wide assembly ground. Every morning, more than eight hundred students gather on this ground in neat lines of blue and white uniforms. The sound of the school band and the anthem echoes across the hill, and when the principal speaks, even the birds in the mango trees seem to fall silent.

To the left of the classrooms stands the science block, our pride. It holds well-equipped laboratories for Physics, Chemistry and Biology, where the smell of chemicals and preserved specimens greets you at the door. Next to it is the library, a quiet, airy hall with rows of wooden shelves and a reading corner where students sit with novels during free periods. The computer room, with its thirty humming desktops, completes the block.

At the far end of the compound is the sports field, a wide green space with goalposts at each end and a running track marked in white. On Wednesday afternoons, it comes alive with football matches, athletics practice and the cheers of supporters. Beside the field, the school farm grows maize, vegetables and plantain, tended by students of Agricultural Science.

Yet what makes Hillside special is its people. Our teachers are strict but caring, and many of them stay after school to help students who are struggling. Senior students guide the juniors, and the clubs, from the Debating Society to the JETS Club, give everyone a chance to shine.

When I walk out of the blue gate for the last time, I will carry with me more than certificates. I will carry the memory of a school that taught me discipline, friendship and the joy of learning.`,
      caption: "Sample descriptive essay (about 470 words)"
    },
    { h2: "Descriptive essay topics to practise" },
    {
      ul: [
        "Describe your school.",
        "Describe a market in your town on a busy day.",
        "Describe a person you admire.",
        "Describe a festival celebrated in your community.",
        "Describe your favourite place to relax.",
        "Describe the scene of an accident you witnessed."
      ]
    },
    { h2: "Useful words and phrases" },
    {
      ul: [
        "Location: situated, perched on, nestled among, at the far end of, adjacent to.",
        "Appearance: spacious, imposing, well-kept, tiled, painted, shaded by.",
        "Sound: bustling, humming, echoing, deafening, peaceful.",
        "Feeling: welcoming, lively, serene, orderly, inspiring."
      ]
    },
    { h2: "How examiners mark your essay" },
    markingIntro,
    marking
  ],
  faq: [
    { q: "What is a descriptive essay?", a: "An essay that describes a person, place, object or event in vivid detail, so that the reader can picture it. It appeals to the senses and is organised in a clear order, such as from the outside to the inside." },
    { q: "How do I start an essay on my school?", a: "Name your school, say where it is located and give a general impression in two or three sentences. An interesting opening line, such as a comparison with other schools, helps catch the examiner's attention." },
    { q: "What tense should a descriptive essay be written in?", a: "Usually the present tense when describing something that still exists (my school stands on a hill). Use the past tense when describing an event that has already happened, such as a festival you attended." },
    { q: "How long should a descriptive essay be?", a: "For WAEC and NECO, about 450 words, in five to seven paragraphs. For junior secondary exams, 250 to 300 words is common." }
  ],
  related: ["/how-to-write-an-essay", "/narrative-essay", "/expository-essay", "/article-writing"]
};

export const expositoryEssay = {
  slug: "expository",
  path: "/expository-essay",
  group: "Essays and Composition",
  short: "Expository essay",
  title: "Expository Essay: Example Essay on Drug Abuse (Causes & Effects)",
  description: "How to write an expository essay for WAEC and NECO, with a full sample essay on drug abuse among youths covering its causes, effects and solutions.",
  h1: "Expository Essay, With an Example Essay on Drug Abuse",
  intro:
    "An expository essay explains a topic clearly and objectively. Instead of telling a story or arguing for one side, it sets out facts and ideas: what something is, why it happens, what it leads to and what can be done about it. 'Drug abuse among youths: causes, effects and solutions' is one of the most common expository topics in WAEC, NECO and school exams. This guide explains the structure and gives a complete example.",
  blocks: [
    { h2: "Expository vs argumentative essay" },
    { p: "An argumentative essay takes a side (for example, boarding school is better than day school) and tries to persuade the reader. An expository essay does not take sides; it explains. You may end with recommendations, but the body should be balanced and factual, written in a calm, formal tone." },
    { h2: "Structure of an expository essay" },
    {
      ol: [
        "Title.",
        "Introduction: define or introduce the topic and say what the essay will cover.",
        "Body: one main point per paragraph, each with a topic sentence, an explanation and an example. For a causes, effects and solutions question, group the paragraphs in that order.",
        "Conclusion: sum up the main ideas and end with a recommendation or a final thought."
      ]
    },
    { h2: "Common types of expository essay" },
    {
      ul: [
        "Cause and effect: the causes and effects of examination malpractice.",
        "Problem and solution: ways to reduce road accidents in Nigeria.",
        "Process: how to prepare for an examination.",
        "Definition and explanation: what is democracy?",
        "Compare and contrast: life in the city and life in the village."
      ]
    },
    { h2: "Example: Drug abuse among youths" },
    {
      letter: `DRUG ABUSE AMONG YOUTHS: CAUSES, EFFECTS AND SOLUTIONS

Drug abuse is the use of a drug in a way, or in an amount, that is harmful to the user or to others. It includes the use of illegal substances such as cannabis, the misuse of prescription and over-the-counter medicines such as codeine cough syrup and tramadol, and the excessive drinking of alcohol. Across Nigeria, drug abuse has become a serious problem among young people, damaging their health, their education and their future. This essay examines its main causes, its effects and what can be done about it.

The first cause of drug abuse among youths is peer pressure. Many young people try drugs for the first time because their friends do so and they want to be accepted. A student who refuses may be mocked as 'not a man' or 'too local', and some give in to avoid being left out.

Another cause is the easy availability of drugs. Some medicines that should be sold only with a doctor's prescription can be bought from roadside sellers and patent medicine stores without questions. Alcohol and cigarettes are sold near many schools, and illegal drugs are traded in motor parks and hidden corners of many towns.

Frustration and lack of guidance also drive young people to drugs. Unemployment, poverty, broken homes and pressure at school leave some youths anxious and hopeless, and they turn to drugs to escape. Where parents are too busy to notice changes in their children, the habit grows unchecked.

The effects of drug abuse are grave. Drugs damage vital organs such as the brain, liver, lungs and heart, and can cause mental illness and, in some cases, death from overdose. Students who abuse drugs lose concentration, miss classes and often drop out of school. Many become addicted and spend all their money, and sometimes stolen money, on drugs.

Drug abuse also harms society. Users are more likely to be involved in fights, cultism, robbery and road accidents. Families are thrown into shame and debt, and the nation loses the energy and talent of young people who should be building its future.

To solve this problem, parents must pay closer attention to their children, talk with them openly about drugs and set good examples. Schools should include drug education in their programmes, invite counsellors and organisations such as the National Drug Law Enforcement Agency (NDLEA) to speak to students, and support clubs and sports that keep students busy. Government should enforce the laws against the illegal sale of drugs and control the sale of prescription medicines. Finally, those who are already addicted should be treated with compassion and helped through rehabilitation, not simply punished.

In conclusion, drug abuse is a threat to the health of young people and the progress of the nation. It is caused mainly by peer pressure, easy access to drugs and frustration, and its effects reach from the individual to the whole society. If parents, schools, government and young people themselves play their part, the problem can be greatly reduced.`,
      caption: "Sample expository essay (about 520 words)"
    },
    { h2: "Expository essay topics to practise" },
    {
      ul: [
        "The causes and effects of examination malpractice.",
        "Ways of reducing road accidents in Nigeria.",
        "The importance of education to national development.",
        "The causes and prevention of malaria.",
        "The effects of social media on students.",
        "How to prepare for an examination."
      ]
    },
    { h2: "Useful linking words" },
    {
      ul: [
        "Adding a point: firstly, furthermore, in addition, moreover, another cause is.",
        "Showing results: as a result, consequently, therefore, this leads to.",
        "Giving examples: for example, for instance, such as.",
        "Concluding: in conclusion, to sum up, finally."
      ]
    },
    { h2: "How examiners mark your essay" },
    markingIntro,
    marking
  ],
  faq: [
    { q: "What is an expository essay?", a: "An essay that explains a topic clearly and objectively, using facts, reasons and examples. It informs the reader rather than telling a story or trying to persuade." },
    { q: "How do I write an essay on drug abuse?", a: "Define drug abuse in the introduction, then write one paragraph for each main cause (such as peer pressure and easy access to drugs), one or two on its effects on the individual and society, one on solutions, and a short conclusion." },
    { q: "What is the difference between expository and argumentative essays?", a: "An argumentative essay takes a side and tries to persuade the reader. An expository essay explains a topic without taking sides, although it may end with recommendations." },
    { q: "Can I use headings in an expository essay?", a: "Not in a WAEC or NECO essay. Use clear topic sentences and linking words instead, so each paragraph shows what it is about." }
  ],
  related: ["/how-to-write-an-essay", "/argumentative-essay", "/descriptive-essay", "/speech-writing"]
};

export const MORE_ESSAYS = [descriptiveEssay, expositoryEssay];
