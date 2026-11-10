import { Helmet } from "react-helmet-async";
import "./about.css";

const About = () => {
  const url = "https://studenttoolsng.com/about";
  const title = "About StudentToolsNG | Free Tools for Nigerian Students";
  const description =
    "Who runs StudentToolsNG, what it offers Nigerian students (CGPA, WAEC and JAMB tools, CBT practice, tutorials) and how its content is written and checked.";

  return (
    <div className="about-page">
      <Helmet>
        {/* Primary SEO */}
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Canonical */}
        <link rel="canonical" href={url} />

        {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://studenttoolsng.com/og-image.png" />
        <meta property="og:url" content={url} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://studenttoolsng.com/og-image.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            url,
            name: title,
            description,
            mainEntity: {
              "@type": "Organization",
              name: "StudentToolsNG",
              url: "https://studenttoolsng.com",
              logo: "https://studenttoolsng.com/icon-512.png",
              description:
                "Free academic tools, exam practice and tutorials for Nigerian secondary school and university students.",
              areaServed: "NG",
              sameAs: [
                "https://facebook.com/Engrhenrytech",
                "https://twitter.com/EngrHenryTech",
                "https://instagram.com/engrhenrytech1",
                "https://tiktok.com/@engrhenrytech11",
                "https://linkedin.com/in/engrhenrytech"
              ],
              founder: {
                "@type": "Person",
                name: "Henry Akpan",
                url: "https://studenttoolsng.com/author",
                jobTitle: "Electrical and Electronics Engineer"
              }
            }
          })}
        </script>
      </Helmet>

      <h1>About StudentToolsNG</h1>

      <p>
        StudentToolsNG is a free study website for Nigerian students. It brings together the
        calculators students reach for every semester, practice for JAMB and WAEC, and clear
        written tutorials in the science subjects that most students find hardest. Everything
        is built around the Nigerian system: the WAEC and NECO grading scale, the JAMB UTME,
        Post-UTME aggregate scores, and the 5-point and 4-point grading used by Nigerian
        universities and polytechnics.
      </p>

      <h2>Who Runs StudentToolsNG</h2>

      <p>
        StudentToolsNG was founded by <a href="/author">Engr. Henry Akpan</a>, an electrical and
        electronics engineer, full-stack web developer and mathematics and physics tutor. Henry
        builds the tools himself and is responsible for every page on the site. The project
        started as a CGPA calculator for students who were tired of working out their results by
        hand, and grew as students asked for more: a WAEC grade calculator, a JAMB score
        calculator, then tutorials and exam practice.
      </p>

      <h2>What You Can Do Here</h2>

      <ul>
        <li>
          <strong>Work out your results:</strong> the <a href="/cgpa-calculator">CGPA calculator</a>,{" "}
          <a href="/gpa-class-calculator">degree class calculator</a>,{" "}
          <a href="/cgpa-converter">CGPA converter</a> and{" "}
          <a href="/waec-grade-calculator">WAEC grade calculator</a>.
        </li>
        <li>
          <strong>Plan for admission:</strong> the <a href="/jamb-score-calculator">JAMB score calculator</a>,{" "}
          <a href="/aggregate-score-calculator">aggregate score calculator</a> and{" "}
          <a href="/admission-predictor">admission chance calculator</a>.
        </li>
        <li>
          <strong>Practise for exams:</strong> timed <a href="/jamb-cbt-practice">JAMB CBT practice</a>{" "}
          in the computer-based format, and a <a href="/quiz">mathematics quiz</a>.
        </li>
        <li>
          <strong>Learn a topic properly:</strong> <a href="/tutorials">tutorials</a> in physics,
          mathematics, chemistry, biology and programming, written for WAEC, NECO and JAMB
          candidates and for 100 and 200 level university students.
        </li>
        <li>
          <strong>Start a final-year project:</strong> <a href="/project-topics">project topics by department</a>{" "}
          and detailed project guides in the research library.
        </li>
        <li>
          <strong>Everyday and engineering calculators:</strong> <a href="/calculators">percentage, BMI,
          age and date calculators</a>, plus <a href="/engineering-tools">engineering tools</a> such as
          Ohm's law, resistor colour code and solar system sizing.
        </li>
        <li>
          <strong>Organise your study:</strong> a <a href="/study-planner">study planner</a>, an{" "}
          <a href="/ai-tutor">AI tutor</a> for quick questions, and a list of{" "}
          <a href="/scholarships">scholarships</a> open to Nigerian students.
        </li>
      </ul>

      <section className="us-section">
        <h2>How Our Tutorials Are Written and Checked</h2>

        <p>
          Each tutorial covers one topic in depth, follows the order of the WAEC, NECO and JAMB
          syllabuses, uses Nigerian examples where they help, and ends with worked exam-style
          questions and a summary. We use AI writing tools to help draft some tutorials. No
          draft is published as it comes: every worked example is recalculated, facts and
          definitions are checked against the syllabus and standard textbooks, and each tutorial
          is read through before it goes live.
        </p>

        <p>
          The calculators follow the published grading rules they are named after. Where a rule
          is not officially published, such as some universities' Post-UTME aggregate formulas,
          the page says so and lets you adjust the weights yourself. Always confirm final results
          and admission requirements with your school, WAEC or JAMB.
        </p>

        <h2>Corrections</h2>

        <p>
          If you find a mistake in a tutorial, a wrong answer or a calculator that gives an
          unexpected result, please tell us through the <a href="/contact">contact page</a>. We
          check every report and correct the page when the report is right.
        </p>

        <h2>Free to Use</h2>

        <p>
          The calculators and tutorials are free and need no account. The site is
          paid for by advertising, by an optional Pro plan that adds features such as unlimited
          AI-generated quizzes, and by the sale of project guides in the research library.
          Advertising never decides what we write or how a calculator works. Read our{" "}
          <a href="/privacy-policy">privacy policy</a> and <a href="/terms">terms of use</a> for
          the details.
        </p>

        <h2>Contact Us</h2>

        <p>
          Questions, suggestions and partnership requests are welcome through our{" "}
          <a href="/contact">contact page</a>. You can also follow StudentToolsNG on{" "}
          <a href="https://facebook.com/Engrhenrytech" target="_blank" rel="noopener noreferrer">Facebook</a>,{" "}
          <a href="https://twitter.com/EngrHenryTech" target="_blank" rel="noopener noreferrer">X (Twitter)</a>,{" "}
          <a href="https://instagram.com/engrhenrytech1" target="_blank" rel="noopener noreferrer">Instagram</a> and{" "}
          <a href="https://tiktok.com/@engrhenrytech11" target="_blank" rel="noopener noreferrer">TikTok</a>.
        </p>
      </section>
    </div>
  );
};

export default About;
