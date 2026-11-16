import { Link } from "react-router-dom";

// The programme's public look — header with the sponsor's name, what the
// training is, the linked courses and an introduction to StudentToolsNG.
// Shared by the public page and the admin preview; the form (or the
// paused/closed notice) is passed in as `children`.

const lines = (text) => String(text || "").split(/\n+/).map((s) => s.trim()).filter(Boolean);

const STATUS_LABEL = {
  draft: "Draft",
  open: "Registration open",
  paused: "Registration paused",
  closed: "Registration closed"
};

const PLATFORM = [
  ["/courses", "Video courses", "Watch recorded classes any time, at your own pace."],
  ["/tutorials", "Free tutorials", "Physics, maths, chemistry, biology and programming lessons."],
  ["/cgpa-calculator", "CGPA calculator", "Work out your GPA, CGPA and class of degree."],
  ["/jamb-cbt-practice", "JAMB CBT practice", "Timed practice tests for UTME subjects."],
  ["/marketplace", "Research library", "Project materials and research guides."],
  ["/ai-tutor", "AI tutor", "Ask questions and get step-by-step help."]
];

export default function ProgramView({ program, children }) {
  const details = lines(program.details);

  return (
    <div className="prog-page">
      <header className="prog-hero">
        {program.sponsorLogoUrl && (
          <img className="prog-logo" src={program.sponsorLogoUrl} alt={program.sponsorName || "Sponsor"} />
        )}
        <h1>
          {program.sponsorName && <span className="prog-sponsor">{program.sponsorName}</span>}
          <span className="prog-title">{program.title}</span>
        </h1>
        <div className="prog-badges">
          <span className={`prog-badge is-${program.status}`}>{STATUS_LABEL[program.status]}</span>
          {program.batch && <span className="prog-badge">{program.batch}</span>}
        </div>
        {program.tagline && <p className="prog-tagline">{program.tagline}</p>}
      </header>

      <div className="prog-grid">
        <div className="prog-main">{children}</div>

        <aside className="prog-side">
          {(program.description || details.length > 0) && (
            <section className="prog-card">
              <h2>About the training</h2>
              {lines(program.description).map((p, i) => <p key={i}>{p}</p>)}
              {details.length > 0 && (
                <ul className="prog-details">
                  {details.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              )}
            </section>
          )}

          {program.courses?.length > 0 && (
            <section className="prog-card">
              <h2>Your class videos</h2>
              <p className="prog-muted">Accepted students get free, lifetime access to:</p>
              <ul className="prog-courses">
                {program.courses.map((c) => (
                  <li key={c._id || c.slug}>
                    <Link to={`/courses/${c.slug}`}>{c.title}</Link>
                    {c.tagline && <small>{c.tagline}</small>}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>

      <section className="prog-card prog-platform">
        <h2>Meet StudentToolsNG</h2>
        <p>
          This training runs on StudentToolsNG, a free learning platform for Nigerian students. Your account
          also gives you:
        </p>
        <div className="prog-platform-grid">
          {PLATFORM.map(([to, name, text]) => (
            <Link key={to} to={to} className="prog-platform-item">
              <strong>{name}</strong>
              <span>{text}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
