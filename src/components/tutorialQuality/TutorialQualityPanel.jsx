/*
Live duplicate / repeated-content / SEO keyword check for the tutorial
create & edit screens. Calls POST /tutorials/check (admin) a moment after
the author stops typing. Saving goes through submitWithDuplicateGate().
*/

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import "./tutorialQuality.css";

const pct = (n) => `${Math.round(n * 100)}%`;

const MatchLink = ({ m }) => (
 m.status === "published"
  ? <Link to={`/tutorial/${m.slug}`} target="_blank" rel="noreferrer">{m.title}</Link>
  : <Link to={`/admin/edit/${m.id}`} target="_blank" rel="noreferrer">{m.title} (draft)</Link>
);

const TutorialQualityPanel = ({ values, id }) => {

 const [report, setReport] = useState(null);
 const [checking, setChecking] = useState(false);
 const [error, setError] = useState("");

 const { title, content, category, topic, excerpt, focusKeyword, keywords } = values;
 const ready = Boolean(title?.trim() || content?.trim());

 useEffect(() => {
  if (!ready) {
   setReport(null);
   return;
  }

  let cancelled = false;
  const timer = setTimeout(async () => {
   try {
    setChecking(true);
    const res = await API.post("/tutorials/check", {
     id, title, content, category, topic, excerpt, focusKeyword, keywords
    });
    if (!cancelled) {
     setReport(res.data);
     setError("");
    }
   } catch (err) {
    if (!cancelled) setError(err?.response?.data?.message || "Check failed");
   } finally {
    if (!cancelled) setChecking(false);
   }
  }, 1200);

  return () => {
   cancelled = true;
   clearTimeout(timer);
  };
 }, [ready, id, title, content, category, topic, excerpt, focusKeyword, keywords]);

 if (!ready) return null;

 return (
  <aside className="tq-panel" aria-live="polite">

   <div className="tq-head">
    <strong>Duplicate & SEO check</strong>
    <span className="tq-status">{checking ? "Checking…" : report ? "Up to date" : ""}</span>
   </div>

   {error && <p className="tq-item tq-error">{error}</p>}

   {report && (
   <>
    {report.blocking.map((m) => (
     <p key={m} className="tq-item tq-error">⛔ {m}</p>
    ))}
    {report.warnings.map((m) => (
     <p key={m} className="tq-item tq-warn">⚠️ {m}</p>
    ))}
    {!report.blocking.length && !report.warnings.length && (
     <p className="tq-item tq-ok">✅ No duplicate topics or repeated content found.</p>
    )}

    {report.titleMatches.length > 0 && (
     <details open>
      <summary>Similar titles ({report.titleMatches.length})</summary>
      <ul>
       {report.titleMatches.map((m) => (
        <li key={m.id}>
         <MatchLink m={m} /> — {pct(m.similarity)} match
         {m.sameTopic && " · same topic"}
        </li>
       ))}
      </ul>
     </details>
    )}

    {report.contentMatches.length > 0 && (
     <details open>
      <summary>Overlapping content ({report.contentMatches.length})</summary>
      <ul>
       {report.contentMatches.map((m) => (
        <li key={m.id}><MatchLink m={m} /> — {pct(m.overlap)} of your text</li>
       ))}
      </ul>
     </details>
    )}

    {report.repeatedBlocks.length > 0 && (
     <details open>
      <summary>Repeated paragraphs in this tutorial</summary>
      <ul>
       {report.repeatedBlocks.map((b) => (
        <li key={b.text}>×{b.count}: “{b.text}…”</li>
       ))}
      </ul>
     </details>
    )}

    <details open>
     <summary>SEO keywords · {report.seo.wordCount} words</summary>
     <ul className="tq-checks">
      {report.seo.checks.map((c) => (
       <li key={c.message} className={`tq-${c.level}`}>
        {c.ok ? "✓" : c.level === "error" ? "✗" : "!"} {c.message}
       </li>
      ))}
     </ul>
    </details>
   </>
   )}

  </aside>
 );
};

export default TutorialQualityPanel;
