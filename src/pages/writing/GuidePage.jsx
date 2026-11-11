import { useState } from "react";
import { Link } from "react-router-dom";
import EngLayout, { FaqList } from "../engineering/EngLayout";
import NotFound from "../notFound/NotFound";
import { guideByPath, relatedOf, toolsFor, WR_SECTION, WR_PATH } from "./writingContent";
import "../engineering/engineering.css";
import "./writing.css";

// A sample letter or template, with a copy button.
function LetterCard({ text, caption }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the text is still selectable */
    }
  };
  return (
    <figure className="wr-letter">
      {caption && <figcaption>{caption}</figcaption>}
      <pre>{text}</pre>
      <button type="button" className="wr-copy" onClick={copy}>
        {copied ? "Copied ✓" : "Copy text"}
      </button>
    </figure>
  );
}

function Block({ b }) {
  if (b.h2) return <h2>{b.h2}</h2>;
  if (b.h3) return <h3>{b.h3}</h3>;
  if (b.p) return <p>{b.p}</p>;
  if (b.tip) return <p className="wr-tip">{b.tip}</p>;
  if (b.ul)
    return (
      <ul>
        {b.ul.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    );
  if (b.ol)
    return (
      <ol>
        {b.ol.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ol>
    );
  if (b.letter) return <LetterCard text={b.letter} caption={b.caption} />;
  return null;
}

const TOOL_LINKS = {
  application: { to: "/letter-generator?type=application", label: "Create your application letter with the Letter Generator" },
  resignation: { to: "/letter-generator?type=resignation", label: "Create your resignation letter with the Letter Generator" },
  permission: { to: "/letter-generator?type=permission", label: "Create your permission letter with the Letter Generator" },
  cv: { to: "/cv-builder", label: "Build your CV with the free CV Builder" }
};

const GuidePage = ({ path }) => {
  const g = guideByPath(path);
  if (!g) return <NotFound />;
  const related = relatedOf(g);
  const tool = g.tool && TOOL_LINKS[g.tool];

  return (
    <EngLayout
      key={g.path}
      path={g.path}
      title={g.title}
      description={g.description}
      faq={g.faq}
      section={WR_SECTION}
      tools={toolsFor(g)}
      schemaType="collection"
    >
      <h1>{g.h1}</h1>
      <p className="eng-intro">{g.intro}</p>

      {tool && (
        <p className="wr-cta">
          <Link to={tool.to} className="eng-btn">
            {tool.label}
          </Link>
        </p>
      )}

      <article className="eng-content wr-article">
        {g.blocks.map((b, i) => (
          <Block key={i} b={b} />
        ))}

        <h2>Frequently Asked Questions</h2>
        <FaqList faq={g.faq} />

        {related.length > 0 && (
          <>
            <h2>Related guides</h2>
            <ul>
              {related.map((r) => (
                <li key={r.path}>
                  <Link to={r.path}>{r.name}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
        <p>
          See all <Link to={WR_PATH}>writing guides and samples</Link>.
        </p>
      </article>
    </EngLayout>
  );
};

export default GuidePage;
