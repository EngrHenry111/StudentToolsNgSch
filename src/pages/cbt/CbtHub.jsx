import { Link } from "react-router-dom";
import EngLayout, { FaqList } from "../engineering/EngLayout";
import CbtExam from "./CbtExam";
import { SUBJECTS } from "../../utils/cbt";
import { CBT_SECTION, CBT_TOOLS, CBT_PATH } from "./cbtContent";
import "../engineering/engineering.css";

const faq = [
  {
    q: "Is this JAMB CBT practice free?",
    a: "Yes. Every subject, both modes and the full answer review are free, with no sign-up. Your best score for each subject is saved in your own browser."
  },
  {
    q: "Are these JAMB past questions?",
    a: "No. They are original questions written by StudentToolsNG to the JAMB UTME syllabus, in the same style and at the same level as the exam. Practising on new questions tests whether you understand a topic, not whether you remember an old answer."
  },
  {
    q: "How many questions are in the JAMB UTME?",
    a: "180 questions in 2 hours: 60 in Use of English and 40 in each of your three other subjects. That works out at about 40 seconds a question, which is the pace the timed test here uses."
  },
  {
    q: "How is the UTME scored?",
    a: "Each of your four subjects is scored out of 100, and the four scores add up to your UTME score out of 400. The percentage you get in a subject here is a rough guide to your mark out of 100 in that subject."
  },
  {
    q: "Can I use this on my phone?",
    a: "Yes. The test works on phones, tablets and computers. On a computer you can also use the keyboard: A to D to answer, N and P to move between questions, and F to flag one."
  }
];

const CbtHub = () => (
  <EngLayout
    path={CBT_PATH}
    title="Free JAMB CBT Practice Test Online (with Answers) | StudentToolsNG"
    description="Free JAMB CBT practice test online for Mathematics, Physics, Chemistry and Biology: timed UTME-style questions with a navigator, instant scoring by topic and an explanation for every answer."
    keywords="JAMB CBT practice, free JAMB CBT practice online, JAMB CBT test, UTME practice test, JAMB practice questions and answers, JAMB mock exam online"
    faq={faq}
    section={CBT_SECTION}
    tools={CBT_TOOLS}
  >
    <h1>Free JAMB CBT Practice Test</h1>
    <p className="eng-intro">
      Practise for the UTME on a computer-based test that works like the real
      one: timed questions, a question navigator, and a full review with an
      explanation for every answer.
    </p>

    <CbtExam />

    <div className="eng-cards">
      {SUBJECTS.map((s) => (
        <Link key={s.slug} to={`${CBT_PATH}/${s.slug}`} className="eng-card">
          <h2>JAMB {s.name} CBT Practice</h2>
          <p>{s.bank.length} questions with answers and explanations</p>
        </Link>
      ))}
    </div>

    <section className="eng-content">
      <h2>How the JAMB UTME CBT works</h2>
      <p>
        The Unified Tertiary Matriculation Examination (UTME) is taken on a
        computer at an accredited CBT centre. You answer 180 multiple-choice
        questions in 2 hours: 60 in Use of English and 40 in each of the three
        other subjects for your course. Each question has four options, and you
        can move freely between questions and subjects until you submit or the
        time runs out.
      </p>
      <p>
        Each subject is scored out of 100, so your UTME score is out of 400.
        There is no negative marking, so an unanswered question scores the same
        as a wrong one: always choose an answer before time runs out.
      </p>

      <h2>How to use this practice test</h2>
      <ul>
        <li>Pick a subject and choose 10, 20 or 40 questions, or practise a single topic you find difficult.</li>
        <li>Choose Timed test to practise at the UTME pace of 40 seconds a question, or Study mode to see each answer and explanation straight away.</li>
        <li>Use the numbered navigator to jump between questions, and flag any you want to come back to.</li>
        <li>After you submit, check your score by topic, read the explanations, and retry only the questions you got wrong.</li>
      </ul>

      <h2>Why practise with original questions?</h2>
      <p>
        Past questions are useful, but many students end up remembering answers
        instead of learning the topic. Every question here is new and written to
        the JAMB syllabus, and the options are shuffled each time, so a good
        score shows you really understand the work. Each explanation shows the
        working or the reason, and points out the mistake behind the most
        tempting wrong option.
      </p>

      <h2>A simple plan for the last weeks before the UTME</h2>
      <ul>
        <li>Take one timed 40-question test in each subject to find your starting point.</li>
        <li>Spend most of your study time on the two or three weakest topics shown in your results.</li>
        <li>Use Study mode on those topics until the explanations make sense, then retake a timed test.</li>
        <li>In the final week, practise at full exam pace and get used to finishing with time to spare.</li>
      </ul>

      <h2>Frequently Asked Questions</h2>
      <FaqList faq={faq} />

      <p>
        Once you have your UTME result, use the <Link to="/jamb-score-calculator">JAMB Score Calculator</Link> and
        the <Link to="/aggregate-score-calculator">Post-UTME Aggregate Calculator</Link> to see where you stand for admission.
      </p>
    </section>
  </EngLayout>
);

export default CbtHub;
