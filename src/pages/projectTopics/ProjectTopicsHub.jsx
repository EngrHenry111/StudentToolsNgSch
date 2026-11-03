import { Link } from "react-router-dom";
import EngLayout, { FaqList } from "../engineering/EngLayout";
import { hubContent, PT_SECTION, PT_TOOLS } from "./topicsContent";
import "../engineering/engineering.css";

// Hub for the department project topic pages. Built from hubContent() so the
// crawler copy (scripts/buildSeoStatic.mjs) matches, year included.
const ProjectTopicsHub = () => {
  const c = hubContent();

  return (
    <EngLayout
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

      <div className="eng-cards">
        {c.departments.map((d) => (
          <Link key={d.path} to={d.path} className="eng-card">
            <h2>{d.name} Project Topics</h2>
            <p>{d.count} topics</p>
          </Link>
        ))}
      </div>

      <section className="eng-content">
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
          Need help with the write-up? Browse project guides in the <Link to="/marketplace">Research Library</Link>,
          or check your standing with the <Link to="/cgpa-calculator">CGPA Calculator</Link>.
        </p>
      </section>
    </EngLayout>
  );
};

export default ProjectTopicsHub;
