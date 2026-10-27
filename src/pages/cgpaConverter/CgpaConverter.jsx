import { Link } from "react-router-dom";
import EngLayout, { FaqList } from "../engineering/EngLayout";
import { ScaleConverter, CourseConverter } from "./ConverterTools";

const PATH = "/cgpa-converter";
const SECTION = { name: "CGPA Tools", path: "/cgpa-calculator" };
const TOOLS = [
  { path: "/cgpa-calculator", name: "CGPA Calculator", short: "CGPA Calculator" },
  { path: PATH, name: "CGPA Converter", short: "CGPA Converter" },
  { path: "/gpa-class-calculator", name: "Class of Degree", short: "Class of Degree" }
];

const faq = [
  {
    q: "How do I convert a 5.0 CGPA to a 4.0 scale?",
    a: "Divide your CGPA by 5 and multiply by 4. For example 4.50 ÷ 5 × 4 = 3.60. This keeps the same fraction of the maximum, and it is the method most application forms expect unless they ask for a credential evaluation."
  },
  {
    q: "How do I convert my CGPA to a percentage?",
    a: "Divide your CGPA by the maximum of your scale and multiply by 100: 3.80 on a 5-point scale is 3.80 ÷ 5 × 100 = 76%. Nigerian universities don't publish an official CGPA-to-percentage table, so if a form asks for your average mark, your transcript or registry is the authority."
  },
  {
    q: "What is a First Class on the 4.0 scale?",
    a: "On a Nigerian university 4-point scale, First Class is usually 3.50 and above. A 5-point First Class (4.50) converts proportionally to 3.60 on a 4.0 scale."
  },
  {
    q: "What does WES give a Nigerian Second Class Upper?",
    a: "WES evaluates each course separately and does not publish a fixed CGPA table, so results vary. A 2:1 commonly comes out somewhere around 3.0 to 3.6 on the 4.0 scale depending on the individual grades. The course-by-course converter gives an estimate."
  },
  {
    q: "Is a 3.5 CGPA good?",
    a: "On the 5-point scale 3.50 is the start of Second Class Upper, which many employers and postgraduate programmes ask for. On a 4-point scale 3.50 is First Class."
  }
];

const CgpaConverter = () => (
  <EngLayout
    path={PATH}
    title="CGPA Converter: 5.0 to 4.0 Scale, Percentage & Class of Degree | StudentToolsNG"
    description="Free CGPA converter for Nigerian students: convert a 5-point CGPA to the 4.0 scale (or any scale), to a percentage and to a class of degree, with a course-by-course 4.0 estimate for WES and study-abroad applications."
    keywords="CGPA converter, convert 5.0 CGPA to 4.0, CGPA to percentage, CGPA to GPA 4.0 scale Nigeria, 4.0 to 5.0 CGPA, WES GPA calculator Nigeria"
    faq={faq}
    section={SECTION}
    tools={TOOLS}
  >
    <h1>CGPA Converter</h1>
    <p className="eng-intro">
      Convert your CGPA from the Nigerian 5-point scale to the 4.0 scale (or
      back), to a percentage and to a class of degree, for scholarships, jobs
      and study-abroad applications.
    </p>

    <ScaleConverter />
    <CourseConverter />

    <section className="eng-content">
      <h2>How to convert a 5.0 CGPA to the 4.0 scale</h2>
      <p>
        The standard method is proportional: divide your CGPA by the maximum of
        your scale and multiply by the maximum of the new one. On a 5-point
        scale, 4.50 ÷ 5 × 4 = 3.60 on the 4.0 scale, and 3.50 ÷ 5 × 4 = 2.80.
        Going the other way, 3.20 on a 4-point scale is 3.20 ÷ 4 × 5 = 4.00 on
        the 5-point scale.
      </p>

      <h2>CGPA to percentage</h2>
      <p>
        A simple percentage is CGPA ÷ maximum × 100, so 4.00 out of 5 is 80%.
        This is a share of the maximum, not your average mark. A Nigerian A is
        any mark from 70 to 100, so an average mark cannot be recovered from a
        CGPA. If a form asks for your average score, use your transcript.
      </p>

      <h2>Course-by-course conversion (WES style)</h2>
      <p>
        Credential evaluators such as WES change each course grade to a 4.0
        grade first, then average them. With the common table below, A becomes
        4.0, B becomes 3.0, C becomes 2.0, and D and E become 1.0. Because a B
        is 4 of 5 on the Nigerian scale but only 3 of 4 on the US scale, this
        usually gives a lower result than the proportional method for students
        with many B grades.
      </p>
      <ul>
        <li>A (70–100): 5 points on the 5-point scale, 4.0 on the 4.0 scale</li>
        <li>B (60–69): 4 points, 3.0</li>
        <li>C (50–59): 3 points, 2.0</li>
        <li>D (45–49): 2 points, 1.0</li>
        <li>E (40–44): 1 point, 1.0</li>
        <li>F (0–39): 0 points, 0.0</li>
      </ul>

      <h2>Class of degree on each scale</h2>
      <p>
        On the 5-point scale used by most Nigerian universities: First Class
        4.50–5.00, Second Class Upper 3.50–4.49, Second Class Lower 2.40–3.49,
        Third Class 1.50–2.39 and Pass 1.00–1.49.
      </p>
      <p>
        On a university 4-point scale: First Class 3.50–4.00, Second Class
        Upper 3.00–3.49, Second Class Lower 2.00–2.99 and Third Class
        1.00–1.99. Polytechnic ND and HND results on the 4-point scale are
        Distinction 3.50–4.00, Upper Credit 3.00–3.49, Lower Credit 2.50–2.99
        and Pass 2.00–2.49.
      </p>
      <p>
        Each senate sets its own boundaries, so check your institution's
        academic regulations if your CGPA is close to a boundary.
      </p>

      <h2>Frequently Asked Questions</h2>
      <FaqList faq={faq} />

      <p>
        Need to work out your CGPA first? Use the <Link to="/cgpa-calculator">CGPA Calculator</Link>,
        then check your result with the <Link to="/gpa-class-calculator">Class of Degree Calculator</Link>.
        Looking for funding abroad? See <Link to="/scholarships">Scholarships for Nigerian Students</Link>.
      </p>
    </section>
  </EngLayout>
);

export default CgpaConverter;
