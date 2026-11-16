import { Link } from "react-router-dom";
import useActiveProgram, { programHeading } from "../../hooks/useActiveProgram";
import "./programBanner.css";

// First thing on the home page while a programme is open, or paused
// between batches. Hidden when the admin closes it.
export default function ProgramBanner() {
  const p = useActiveProgram();
  if (!p) return null;
  const open = p.status === "open";

  return (
    <Link to={`/programs/${p.slug}`} className={`program-banner ${open ? "is-open" : "is-paused"}`}>
      <span className="program-banner-tag">{open ? `Registration open · ${p.batch}` : "Registration paused"}</span>
      <strong>{programHeading(p)}</strong>
      <span className="program-banner-cta">{open ? "Register free →" : "See details →"}</span>
    </Link>
  );
}
