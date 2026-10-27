import { Link } from "react-router-dom";
import EngLayout, { FaqList } from "../engineering/EngLayout";
import AggregateCalculator from "./AggregateCalculator";
import { UNIVERSITIES } from "../../utils/aggregate";
import { AGG_SECTION, AGG_TOOLS, AGG_PATH } from "./aggContent";

const faq = [
  {
    q: "How do I calculate my aggregate score?",
    a: "Most universities turn your UTME score into marks out of 50 by dividing it by 8, then add your post-UTME score and, at some schools, points for your O'level grades, so that the total is out of 100. The exact weights differ from school to school."
  },
  {
    q: "Why is my UTME score divided by 8?",
    a: "The UTME is marked out of 400. Dividing by 8 turns it into marks out of 50, which is half of a 100-mark aggregate. A post-UTME test out of 100 is divided by 2 for the same reason."
  },
  {
    q: "Is a 60 aggregate score good?",
    a: "It depends on the course and the school. 60 is above the general cut-off at many universities but below what competitive courses such as Medicine, Law or Nursing need at the big federal universities, where admitted candidates are often in the 70s or 80s."
  },
  {
    q: "What if my school is not listed?",
    a: "Choose \"Other school\" and enter the weights from your school's screening notice, for example UTME 50%, post-UTME 30% and O'level 20%. The calculator works for any formula that adds weighted UTME, post-UTME and O'level parts."
  }
];

const AggregateHub = () => (
  <EngLayout
    path={AGG_PATH}
    title="Post-UTME Aggregate Score Calculator for Nigerian Universities | StudentToolsNG"
    description="Free aggregate score calculator for UNILAG, UI, OAU, UNN, UNIBEN, UNIPORT, UNILORIN, LASU, ABU and UNICAL: combine your UTME, post-UTME and O'level grades, see the working and the score you need."
    keywords="aggregate score calculator, post UTME aggregate calculator, how to calculate aggregate score, JAMB and post UTME aggregate, university aggregate score Nigeria, O'level points calculator"
    faq={faq}
    section={AGG_SECTION}
    tools={AGG_TOOLS}
  >
    <h1>Post-UTME Aggregate Score Calculator</h1>
    <p className="eng-intro">
      Work out your admission aggregate from your UTME, post-UTME and O'level
      grades using your university's formula, and see the score you need for your course.
    </p>

    <AggregateCalculator />

    <div className="eng-cards">
      {UNIVERSITIES.map((u) => (
        <Link key={u.slug} to={`${AGG_PATH}/${u.slug}`} className="eng-card">
          <h2>{u.short} Aggregate Calculator</h2>
          <p>{u.name}</p>
        </Link>
      ))}
    </div>

    <section className="eng-content">
      <h2>What is an aggregate score?</h2>
      <p>
        Your aggregate score is the single number a university uses to rank
        candidates for admission. It combines your UTME (JAMB) score with your
        post-UTME screening result and, at some universities, your O'level
        grades. Each department then admits candidates from the top of the list
        down to its cut-off mark.
      </p>

      <h2>The four common aggregate formulas</h2>
      <ul>
        <li>UTME and post-UTME, 50 : 50. Aggregate = UTME ÷ 8 + post-UTME ÷ 2. Reported for UI, UNIBEN, UNIPORT, ABU and UNICAL.</li>
        <li>UTME, post-UTME and O'level, 50 : 30 : 20. UTME ÷ 8, plus the post-UTME out of 30, plus O'level points out of 20. Reported for UNILAG and UNILORIN.</li>
        <li>UTME, post-UTME and O'level, 50 : 40 : 10. Reported for OAU.</li>
        <li>UTME and O'level only. Schools that screen without a written test, such as LASU (50 : 50) and UNN (60 : 40).</li>
      </ul>

      <h2>How O'level grades become points</h2>
      <p>
        Schools that count O'level grades share out the O'level marks across
        your five best relevant subjects. An A1 earns the full share for a
        subject and each lower grade earns a little less: B2 earns 90%, B3 80%,
        C4 70%, C5 60% and C6 50% of it. When O'level is worth 20 marks, that
        is A1 = 4, B2 = 3.6, B3 = 3.2, C4 = 2.8, C5 = 2.4 and C6 = 2. Grades D7,
        E8 and F9 earn nothing and usually mean you don't meet the requirements.
      </p>

      <h2>Worked example</h2>
      <p>
        A candidate scores 256 in UTME and 67 in a post-UTME test marked out of
        100 at a school using the 50 : 50 formula.
      </p>
      <ul>
        <li>UTME: 256 ÷ 8 = 32</li>
        <li>Post-UTME: 67 ÷ 2 = 33.5</li>
        <li>Aggregate = 32 + 33.5 = 65.5 out of 100</li>
      </ul>

      <h2>Formulas change, so check yours</h2>
      <p>
        Universities can change their screening method from one year to the
        next, and none of them publishes one formula that stays fixed. The
        formulas here are the ones most widely reported for recent screening
        exercises. Always compare them with your school's current post-UTME
        notice, and use "Change the formula" if the weights differ.
      </p>

      <h2>Frequently Asked Questions</h2>
      <FaqList faq={faq} />

      <p>
        Want to know your chances? Use the <Link to="/admission-predictor">Admission Predictor</Link>.
        At university, keep track of your results with the <Link to="/cgpa-calculator">CGPA Calculator</Link>.
      </p>
    </section>
  </EngLayout>
);

export default AggregateHub;
