import { Link } from "react-router-dom";
import useActivePrograms, { programHeading, programAudience } from "../../hooks/useActiveProgram";
import "./programBanner.css";

// First thing on the home page: one banner per open programme (then any
// paused between batches). Hidden when the admin closes them.
export default function ProgramBanner() {
  const programs = useActivePrograms();
  if (!programs.length) return null;

  return (
    <div className="program-banners">
      {programs.map((p) => {
        const open = p.status === "open";
        return (
          <Link key={p.slug} to={`/programs/${p.slug}`} className={`program-banner ${open ? "is-open" : "is-paused"}`}>
            <span className="program-banner-tag">{open ? `Registration open · ${p.batch}` : "Registration paused"}</span>
            <strong>{programHeading(p)}</strong>
            <span className="program-banner-audience">{programAudience(p)}</span>
            <span className="program-banner-cta">{!open ? "See details →" : p.fee > 0 ? "Register →" : "Register free →"}</span>
          </Link>
        );
      })}
    </div>
  );
}
