import { Link, useParams } from "react-router-dom";
import EngLayout, { FaqList } from "../engineering/EngLayout";
import CbtExam from "./CbtExam";
import NotFound from "../notFound/NotFound";
import { subjectBySlug, SUBJECTS, LETTERS } from "../../utils/cbt";
import { subjectContent, CBT_SECTION, CBT_TOOLS, CBT_PATH } from "./cbtContent";
import "../engineering/engineering.css";

// One page per subject, built from its question bank. The crawler copy of
// this text comes from the same subjectContent().
const CbtSubject = () => {
  const { subject: slug } = useParams();
  const s = subjectBySlug(slug);
  if (!s) return <NotFound />;
  const c = subjectContent(s);

  return (
    <EngLayout
      key={slug}
      path={c.path}
      title={c.title}
      description={c.description}
      keywords={c.keywords}
      faq={c.faq}
      section={CBT_SECTION}
      tools={CBT_TOOLS}
    >
      <h1>{c.h1}</h1>
      <p className="eng-intro">{c.intro}</p>

      <CbtExam key={slug} slug={slug} />

      <section className="eng-content">
        {c.sections.map((sec) => (
          <div key={sec.h2}>
            <h2>{sec.h2}</h2>
            {sec.paras.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {sec.items && (
              <ul>
                {sec.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <h2>Sample JAMB {s.name} questions with answers</h2>
        <ol className="cbt-samples">
          {c.samples.map((q) => (
            <li key={q.id}>
              <strong>{q.q}</strong>
              <span className="cbt-opts">
                {q.o.map((o, i) => (
                  <span key={i}>
                    {LETTERS[i]}. {o}
                    {i < q.o.length - 1 ? "   " : ""}
                  </span>
                ))}
              </span>
              Answer: {LETTERS[q.a]} ({q.o[q.a]}). {q.x}
            </li>
          ))}
        </ol>

        <h2>Frequently Asked Questions</h2>
        <FaqList faq={c.faq} />

        <h2>Other subjects</h2>
        <p>
          {SUBJECTS.filter((x) => x.slug !== s.slug).map((x, i, arr) => (
            <span key={x.slug}>
              <Link to={`${CBT_PATH}/${x.slug}`}>JAMB {x.name} CBT practice</Link>
              {i < arr.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
        <p>
          Revising a topic? Read the free <Link to={`/${s.slug}`}>{s.name} tutorials</Link>, then
          check your admission chances with the <Link to="/aggregate-score-calculator">Post-UTME Aggregate Calculator</Link>.
        </p>
      </section>
    </EngLayout>
  );
};

export default CbtSubject;
