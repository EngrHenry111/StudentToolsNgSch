// The CV preview sheet, kept in its own file so the crawler text build
// (which reads CvBuilder.jsx) does not pick up its empty section headings.
const lines = (s) =>
  String(s || "")
    .split(/\r?\n/)
    .map((x) => x.replace(/^[•\-*]\s*/, "").trim())
    .filter(Boolean);

export default function CvPreview({ cv }) {
  const contact = [cv.phone, cv.email, cv.location, cv.link].filter((x) => String(x || "").trim());
  const exp = cv.experience.filter((e) => e.role || e.org);
  const edu = cv.education.filter((e) => e.degree || e.school);
  const skills = String(cv.skills || "")
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="cv-sheet wr-print-cv">
      <header className="cv-head">
        <h2 className="cv-name">{cv.name || "Your Name"}</h2>
        {cv.headline && <p className="cv-headline">{cv.headline}</p>}
        {contact.length > 0 && <p className="cv-contact">{contact.join("  |  ")}</p>}
      </header>

      {cv.summary && (
        <section>
          <h3>Professional Summary</h3>
          <p>{cv.summary}</p>
        </section>
      )}

      {exp.length > 0 && (
        <section>
          <h3>Work Experience</h3>
          {exp.map((e, i) => (
            <div key={i} className="cv-item">
              <div className="cv-item-head">
                <strong>{e.role}</strong>
                {(e.org || e.place) && <span>| {[e.org, e.place].filter(Boolean).join(", ")}</span>}
                {e.dates && <span className="cv-dates">{e.dates}</span>}
              </div>
              {lines(e.points).length > 0 && (
                <ul>
                  {lines(e.points).map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {edu.length > 0 && (
        <section>
          <h3>Education</h3>
          {edu.map((e, i) => (
            <div key={i} className="cv-item">
              <div className="cv-item-head">
                <strong>{e.degree}</strong>
                {e.school && <span>| {e.school}</span>}
                {e.dates && <span className="cv-dates">{e.dates}</span>}
              </div>
              {e.grade && <p>{e.grade}</p>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h3>Skills</h3>
          <p>{skills.join("  •  ")}</p>
        </section>
      )}

      {lines(cv.certifications).length > 0 && (
        <section>
          <h3>Certifications</h3>
          <ul>
            {lines(cv.certifications).map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
      )}

      {lines(cv.extra).length > 0 && (
        <section>
          <h3>Leadership and Volunteering</h3>
          <ul>
            {lines(cv.extra).map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
      )}

      {lines(cv.referees).length > 0 && (
        <section>
          <h3>Referees</h3>
          {lines(cv.referees).map((r) => (
            <p key={r}>{r}</p>
          ))}
        </section>
      )}
    </div>
  );
}
