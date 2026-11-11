import { Link, useParams } from "react-router-dom";
import EngLayout, { FaqList } from "../engineering/EngLayout";
import NotFound from "../notFound/NotFound";
import { courseBySlug } from "./courseInfo";
import { courseContent, JS_SECTION, JS_TOOLS, JS_PATH, IBASS_URL } from "./jambContent";
import "../engineering/engineering.css";
import "./jambSubjects.css";

// One page per course, built from courseInfo.js and the JAMB brochure data.
// The crawler copy of this text comes from the same courseContent().
const CourseCombination = () => {
  const { slug } = useParams();
  const course = courseBySlug(slug);
  if (!course) return <NotFound />;
  const c = courseContent(course);
  const tools = [JS_TOOLS[0], ...JS_TOOLS.filter((t) => t.path === c.path), ...c.related.map((r) => JS_TOOLS.find((t) => t.path === r.path))];

  const sectionBlock = (s) => (
    <div key={s.h2}>
      <h2>{s.h2}</h2>
      {s.paras.map((p) => (
        <p key={p}>{p}</p>
      ))}
      {s.items && (
        <ul>
          {s.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <EngLayout
      key={slug}
      path={c.path}
      title={c.title}
      description={c.description}
      keywords={c.keywords}
      faq={c.faq}
      section={JS_SECTION}
      tools={tools}
      schemaType="collection"
    >
      <h1>{c.h1}</h1>
      <p className="eng-intro">{c.intro}</p>

      <div className="js-combo" role="note">
        <span className="js-combo-label">UTME subjects</span>
        <strong>{course.combo}</strong>
      </div>

      <section className="eng-content">
        {c.sections.map(sectionBlock)}

        <h2>{c.schoolsH2}</h2>
        <p>{c.schoolsIntro}</p>
        <div className="js-schools">
          {c.schools.map((s) => (
            <div key={s.school} className="js-school">
              <h3>{s.school}</h3>
              {s.utme && (
                <p>
                  <span className="js-tag">UTME</span> {s.utme}
                </p>
              )}
              {s.olevel && (
                <p>
                  <span className="js-tag">O'level</span> {s.olevel}
                </p>
              )}
            </div>
          ))}
        </div>
        <p className="js-source">
          Source: JAMB's brochure on{" "}
          <a href={IBASS_URL} target="_blank" rel="noopener noreferrer">
            IBASS
          </a>
          . Search your course and school there to confirm before you register.
        </p>

        {c.after.map(sectionBlock)}

        <h2>Frequently Asked Questions</h2>
        <FaqList faq={c.faq} />

        <h2>Related courses</h2>
        <ul>
          {c.related.map((r) => (
            <li key={r.path}>
              <Link to={r.path}>JAMB subject combination for {r.name}</Link>
            </li>
          ))}
        </ul>
        <p>
          Not sure which course fits your subjects? Use the <Link to={JS_PATH}>Course Finder</Link>. Then check your
          chances with the <Link to="/jamb-score-calculator">JAMB Score Calculator</Link> and{" "}
          <Link to="/aggregate-score-calculator">Aggregate Score Calculator</Link>, and practise with{" "}
          <Link to="/jamb-cbt-practice">JAMB CBT Practice</Link>.
        </p>
      </section>
    </EngLayout>
  );
};

export default CourseCombination;
