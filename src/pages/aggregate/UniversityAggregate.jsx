import { Link, useParams } from "react-router-dom";
import EngLayout, { FaqList } from "../engineering/EngLayout";
import AggregateCalculator from "./AggregateCalculator";
import NotFound from "../notFound/NotFound";
import { universityBySlug, UNIVERSITIES } from "../../utils/aggregate";
import { universityContent, AGG_SECTION, AGG_TOOLS, AGG_PATH } from "./aggContent";
import "../engineering/engineering.css";

// One page per university, built from its entry in utils/aggregate.js.
// The crawler copy of this text comes from the same universityContent().
const UniversityAggregate = () => {
  const { slug } = useParams();
  const u = universityBySlug(slug);
  if (!u) return <NotFound />;
  const c = universityContent(u);

  return (
    <EngLayout
      key={slug}
      path={c.path}
      title={c.title}
      description={c.description}
      keywords={c.keywords}
      faq={c.faq}
      section={AGG_SECTION}
      tools={AGG_TOOLS}
    >
      <h1>{c.h1}</h1>
      <p className="eng-intro">{c.intro}</p>

      <AggregateCalculator key={slug} slug={slug} />

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
            {(s.after || []).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        ))}

        <h2>Frequently Asked Questions</h2>
        <FaqList faq={c.faq} />

        <h2>Other universities</h2>
        <p>
          {UNIVERSITIES.filter((x) => x.slug !== u.slug).map((x, i, arr) => (
            <span key={x.slug}>
              <Link to={`${AGG_PATH}/${x.slug}`}>{x.short}</Link>
              {i < arr.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
        <p>
          Still choosing a course? Try the <Link to="/admission-predictor">Admission Predictor</Link>, or
          add up your UTME subjects with the <Link to="/jamb-score-calculator">JAMB Score Calculator</Link>.
        </p>
      </section>
    </EngLayout>
  );
};

export default UniversityAggregate;
