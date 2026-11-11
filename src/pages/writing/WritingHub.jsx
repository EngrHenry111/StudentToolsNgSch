import { Link } from "react-router-dom";
import EngLayout, { FaqList } from "../engineering/EngLayout";
import { hubContent, WR_SECTION, WR_TOOLS_LIST, WR_PATH } from "./writingContent";
import "../engineering/engineering.css";
import "./writing.css";

// Hub for the writing guides. Text comes from hubContent(), which
// scripts/buildSeoStatic.mjs also uses for the crawler copy.
const WritingHub = () => {
  const c = hubContent();

  return (
    <EngLayout
      path={c.path}
      title={c.title}
      description={c.description}
      faq={c.faq}
      section={WR_SECTION}
      tools={[{ path: WR_PATH, name: "Writing Guides", short: "All guides" }, ...WR_TOOLS_LIST.map((t) => ({ ...t, short: t.name }))]}
      schemaType="collection"
    >
      <h1>{c.h1}</h1>
      <p className="eng-intro">{c.intro}</p>

      <div className="eng-cards">
        {WR_TOOLS_LIST.map((t) => (
          <Link key={t.path} to={t.path} className="eng-card">
            <h2>{t.name}</h2>
            <p>{t.blurb}</p>
          </Link>
        ))}
      </div>

      <section className="eng-content">
        {c.groups.map((grp) => (
          <div key={grp.name}>
            <h2>{grp.name}</h2>
            <ul>
              {grp.guides.map((g) => (
                <li key={g.path}>
                  <Link to={g.path}>{g.name}</Link>: {g.blurb}
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
      </section>
    </EngLayout>
  );
};

export default WritingHub;
