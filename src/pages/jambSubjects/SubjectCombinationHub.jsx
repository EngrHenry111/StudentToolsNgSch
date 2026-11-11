import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EngLayout, { FaqList } from "../engineering/EngLayout";
import { hubContent, JS_SECTION, JS_TOOLS, JS_PATH } from "./jambContent";
import { COURSES, FACULTIES } from "./courseInfo";
import { UTME_SUBJECTS, satisfies } from "./subjects";
import "../engineering/engineering.css";
import "./jambSubjects.css";

// Hub: the Course Finder plus every course grouped by faculty. The finder is
// interactive only; the course lists and text come from hubContent(), which
// scripts/buildSeoStatic.mjs also uses for the crawler copy.
const SubjectCombinationHub = () => {
  const c = hubContent();
  const [picked, setPicked] = useState(["", "", ""]);

  const ready = picked.every(Boolean) && new Set(picked).size === 3;
  const matches = useMemo(() => (ready ? COURSES.filter((course) => satisfies(course.rule, picked)) : []), [ready, picked]);

  const setSlot = (i, value) => setPicked((p) => p.map((x, j) => (j === i ? value : x)));

  return (
    <EngLayout
      path={c.path}
      title={c.title}
      description={c.description}
      keywords={c.keywords}
      faq={c.faq}
      section={JS_SECTION}
      tools={[JS_TOOLS[0]]}
      schemaType="collection"
    >
      <h1>{c.h1}</h1>
      <p className="eng-intro">{c.intro}</p>

      <div className="eng-panel js-finder">
        <h2>Course Finder</h2>
        <p className="eng-muted">Use of English is compulsory. Choose your other three UTME subjects:</p>
        <div className="eng-grid">
          {picked.map((value, i) => (
            <label key={i} className="eng-field">
              <span>Subject {i + 2}</span>
              <select value={value} onChange={(e) => setSlot(i, e.target.value)}>
                <option value="">Choose a subject</option>
                {UTME_SUBJECTS.map((s) => (
                  <option key={s} value={s} disabled={picked.includes(s) && value !== s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>

        {ready && (
          <div className="js-results" aria-live="polite">
            {matches.length > 0 ? (
              <>
                <p>
                  <strong>
                    English, {picked.join(", ")}: {matches.length} of {COURSES.length} courses
                  </strong>{" "}
                  match the combination most universities use. Open a course to check your chosen school.
                </p>
                {FACULTIES.map((f) => {
                  const inF = matches.filter((m) => m.faculty === f);
                  if (!inF.length) return null;
                  return (
                    <div key={f}>
                      <h3>{f}</h3>
                      <ul className="js-match-list">
                        {inF.map((m) => (
                          <li key={m.slug}>
                            <Link to={`${JS_PATH}/${m.slug}`}>{m.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </>
            ) : (
              <p>
                None of the {COURSES.length} courses here use this exact combination at most universities. Try swapping
                one subject, or browse the list below.
              </p>
            )}
            <p className="eng-muted">
              Results follow the combination most universities use; some schools are stricter or more flexible. You
              still need the right O'level credits.
            </p>
          </div>
        )}
      </div>

      <section className="eng-content">
        {c.faculties.map((f) => (
          <div key={f.name}>
            <h2>{f.name}</h2>
            <ul className="js-course-list">
              {f.courses.map((course) => (
                <li key={course.path}>
                  <Link to={course.path}>{course.name}</Link>: {course.combo}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {c.sections.map((s) => (
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
        ))}

        <h2>Frequently Asked Questions</h2>
        <FaqList faq={c.faq} />

        <p>
          After choosing your course, estimate your score with the{" "}
          <Link to="/jamb-score-calculator">JAMB Score Calculator</Link>, check your chances with the{" "}
          <Link to="/aggregate-score-calculator">Aggregate Score Calculator</Link>, and practise with{" "}
          <Link to="/jamb-cbt-practice">JAMB CBT Practice</Link>.
        </p>
      </section>
    </EngLayout>
  );
};

export default SubjectCombinationHub;
