import { Link } from "react-router-dom";
import EngLayout, { FaqList } from "../engineering/EngLayout";
import { NounCalculator } from "./NounTools";
import { CGPA_SECTION, CGPA_TOOLS } from "../cgpaConverter/cgpaTools";

const PATH = "/noun-cgpa-calculator";

const title = "NOUN CGPA Calculator: Calculate GPA from TMA & Exam Scores";
const description = "Free NOUN CGPA calculator. Enter your TMA (30) and exam (70) scores or grades for each course to get your GPA, new CGPA and class of degree.";

const faq = [
  {
    q: "How is a NOUN course score calculated?",
    a: "Your course score is your TMA total (out of 30) plus your exam score (out of 70), for a total out of 100. For example, a TMA total of 24 and an exam score of 48 gives 72, which is an A."
  },
  {
    q: "What is the NOUN grading system?",
    a: "NOUN uses the 5-point scale: A (70–100) is 5 points, B (60–69) is 4, C (50–59) is 3, D (45–49) is 2, E (40–44) is 1 and F (0–39) is 0."
  },
  {
    q: "How do I calculate my NOUN CGPA?",
    a: "Multiply each course's grade point by its credit units, add the results for every course you have taken, then divide by the total credit units. To update your CGPA after a new semester, multiply your current CGPA by the units already completed, add the new semester's grade points, and divide by the new total of units."
  },
  {
    q: "What CGPA is First Class in NOUN?",
    a: "A CGPA of 4.50–5.00 is First Class, 3.50–4.49 is Second Class Upper, 2.40–3.49 is Second Class Lower and 1.50–2.39 is Third Class, the same bands used by other Nigerian universities."
  },
  {
    q: "What happens if I don't submit my TMAs?",
    a: "Your TMAs count for 30 marks. Without them the most you can score is 70 from the exam alone, so you would need full marks in the exam just to get an A. Submit every TMA on the portal before the deadline."
  },
  {
    q: "Where do I check my official NOUN CGPA?",
    a: "Log in to the NOUN student portal and open your results page. This calculator is for planning and checking; the portal figure is the official one."
  }
];

const NounCgpa = () => (
  <EngLayout
    path={PATH}
    title={title}
    description={description}
    keywords="NOUN CGPA calculator, NOUN GPA calculator, NOUN CGPA checker, how to calculate NOUN CGPA, NOUN grading system, NOUN TMA and exam score calculator, National Open University CGPA"
    faq={faq}
    section={CGPA_SECTION}
    tools={CGPA_TOOLS}
  >
    <h1>NOUN CGPA Calculator</h1>
    <p className="eng-intro">
      Work out your National Open University of Nigeria (NOUN) GPA and CGPA from your TMA and exam
      scores, see the grade for each course, and find out your class of degree.
    </p>

    <NounCalculator />

    <section className="eng-content">
      <h2>How NOUN scores each course</h2>
      <p>
        Every NOUN course is marked out of 100. Your Tutor-Marked Assignments (TMAs) carry 30 marks and
        the final exam carries 70 marks. Add the two to get your course score, then read the grade from
        the table below.
      </p>

      <h2>NOUN grading system</h2>
      <div className="eng-table-wrap">
        <table className="eng-table">
          <thead>
            <tr><th>Score</th><th>Grade</th><th>Grade point</th></tr>
          </thead>
          <tbody>
            <tr><td>70–100</td><td>A</td><td>5</td></tr>
            <tr><td>60–69</td><td>B</td><td>4</td></tr>
            <tr><td>50–59</td><td>C</td><td>3</td></tr>
            <tr><td>45–49</td><td>D</td><td>2</td></tr>
            <tr><td>40–44</td><td>E</td><td>1</td></tr>
            <tr><td>0–39</td><td>F</td><td>0</td></tr>
          </tbody>
        </table>
      </div>

      <h2>How to calculate your NOUN CGPA, step by step</h2>
      <ol>
        <li>For each course, add your TMA total and exam score to get the score out of 100.</li>
        <li>Turn the score into a grade point using the table: A = 5, B = 4, C = 3, D = 2, E = 1, F = 0.</li>
        <li>Multiply the grade point by the course's credit units. This gives the grade points for that course.</li>
        <li>Add the grade points for all your courses, and add all the credit units.</li>
        <li>Divide total grade points by total credit units. For one semester this is your GPA; across all semesters it is your CGPA.</li>
      </ol>

      <h2>Worked example</h2>
      <ul>
        <li>GST101, 2 units: TMA 24 + exam 48 = 72 → A (5) → 10 grade points</li>
        <li>MTH101, 3 units: TMA 26 + exam 50 = 76 → A (5) → 15 grade points</li>
        <li>CIT101, 2 units: TMA 20 + exam 35 = 55 → C (3) → 6 grade points</li>
        <li>BIO101, 3 units: TMA 18 + exam 30 = 48 → D (2) → 6 grade points</li>
      </ul>
      <p>
        Total grade points = 10 + 15 + 6 + 6 = 37. Total units = 2 + 3 + 2 + 3 = 10. GPA = 37 ÷ 10 ={" "}
        <strong>3.70</strong>, which is in the Second Class Upper range.
      </p>
      <p>
        If you already had a CGPA of 3.20 from 40 units, your new CGPA is (3.20 × 40 + 37) ÷ (40 + 10) =
        165 ÷ 50 = <strong>3.30</strong>. Enter your current CGPA and units in the calculator to do this
        automatically.
      </p>

      <h2>NOUN class of degree</h2>
      <ul>
        <li>First Class: 4.50–5.00</li>
        <li>Second Class Upper (2:1): 3.50–4.49</li>
        <li>Second Class Lower (2:2): 2.40–3.49</li>
        <li>Third Class: 1.50–2.39</li>
        <li>Pass: 1.00–1.49</li>
      </ul>
      <p>
        See exactly where any CGPA falls, and how far you are from the next class, with the{" "}
        <Link to="/gpa-class-calculator">CGPA class checker</Link>.
      </p>
      <p className="eng-note">
        These are the standard NUC grading rules that NOUN follows. If your faculty or the Student
        Handbook gives different rules for your programme, follow those.
      </p>

      <h2>Frequently Asked Questions</h2>
      <FaqList faq={faq} />

      <p>
        Studying at a conventional university? Use the <Link to="/cgpa-calculator">CGPA Calculator</Link>.
        Applying abroad? Convert your result with the <Link to="/cgpa-converter">CGPA Converter</Link>.
      </p>
    </section>
  </EngLayout>
);

export default NounCgpa;
