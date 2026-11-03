import { Link, useParams } from "react-router-dom";
import EngLayout, { FaqList } from "../engineering/EngLayout";
import NotFound from "../notFound/NotFound";
import { DEPARTMENTS, departmentBySlug } from "./departments";
import { departmentContent, PT_SECTION, PT_TOOLS, PT_PATH } from "./topicsContent";
import "../engineering/engineering.css";

// One page per department, built from its entry in departments.js. The
// crawler copy of this text comes from the same departmentContent().
const DepartmentTopics = () => {
  const { slug } = useParams();
  const d = departmentBySlug(slug);
  if (!d) return <NotFound />;
  const c = departmentContent(d);

  return (
    <EngLayout
      key={slug}
      path={c.path}
      title={c.title}
      description={c.description}
      keywords={c.keywords}
      faq={c.faq}
      section={PT_SECTION}
      tools={PT_TOOLS}
      schemaType="collection"
    >
      <h1>{c.h1}</h1>
      <p className="eng-intro">{c.intro}</p>

      <section className="eng-content">
        {c.groups.map((g) => (
          <div key={g.name}>
            <h2>{g.name}</h2>
            <ol>
              {g.topics.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ol>
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

        {c.guides.length > 0 && (
          <>
            <h2>Project guides for {d.name.toLowerCase()} students</h2>
            <p>
              These guides in the <Link to="/marketplace">Research Library</Link> give you a model Chapter 1, a
              literature review map, the methodology and a questionnaire to adapt:
            </p>
            <ul>
              {c.guides.map((g) => (
                <li key={g.path}>
                  <Link to={g.path}>{g.title}</Link>
                </li>
              ))}
            </ul>
          </>
        )}

        <h2>Frequently Asked Questions</h2>
        <FaqList faq={c.faq} />

        <h2>Project topics for other departments</h2>
        <p>
          {DEPARTMENTS.filter((x) => x.slug !== d.slug).map((x, i, arr) => (
            <span key={x.slug}>
              <Link to={`${PT_PATH}/${x.slug}`}>{x.name}</Link>
              {i < arr.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
        <p>
          Keep track of your results with the <Link to="/cgpa-calculator">CGPA Calculator</Link>, and see what
          degree class you are heading for with the <Link to="/gpa-class-calculator">GPA Class Calculator</Link>.
        </p>
      </section>
    </EngLayout>
  );
};

export default DepartmentTopics;
