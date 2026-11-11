import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import EngLayout, { FaqList } from "../engineering/EngLayout";
import { WR_SECTION, WR_PATH } from "./writingContent";
import "../engineering/engineering.css";
import "./writing.css";
import "./cvBuilder.css";
import CvPreview from "./CvPreview";

// CV Builder: a form on the left, a live A4-style preview, and "Print / Save
// as PDF" through the browser's print dialog (print CSS shows only the CV).
// Everything is kept in this browser's localStorage, nothing is uploaded.

const STORE = "stng-cv-v1";

const EMPTY = {
  name: "",
  headline: "",
  phone: "",
  email: "",
  location: "",
  link: "",
  summary: "",
  experience: [{ role: "", org: "", place: "", dates: "", points: "" }],
  education: [{ degree: "", school: "", dates: "", grade: "" }],
  skills: "",
  certifications: "",
  extra: "",
  referees: ""
};

const SAMPLE = {
  name: "Adaeze Nwankwo",
  headline: "Accounts Officer",
  phone: "08031112222",
  email: "adaeze.nwankwo@email.com",
  location: "Ikeja, Lagos",
  link: "linkedin.com/in/adaezenwankwo",
  summary:
    "Accounting graduate with three years' experience in audit and financial reporting. Skilled in reconciliations, tax computation, Excel and Sage. ICAN Associate.",
  experience: [
    {
      role: "Audit Associate",
      org: "Clearview Partners",
      place: "Lagos",
      dates: "Jan 2023 – Present",
      points:
        "Audited the financial statements of 14 clients in manufacturing, retail and NGOs\nPrepared monthly reconciliations, reducing unreconciled items by 60%\nBuilt an Excel fieldwork checklist that cut review queries by a third"
    },
    {
      role: "NYSC Accounts Assistant",
      org: "Lagos State Ministry of Finance",
      place: "Lagos",
      dates: "Feb 2022 – Jan 2023",
      points: "Processed payment vouchers and kept the cash book for a department of 45 staff"
    }
  ],
  education: [{ degree: "B.Sc. Accounting", school: "University of Benin", dates: "2016 – 2021", grade: "Second Class Upper" }],
  skills: "Financial reporting, Audit, Tax computation, Excel, Sage 50, Report writing",
  certifications: "Associate, Institute of Chartered Accountants of Nigeria (ICAN), 2025",
  extra: "",
  referees: "Available on request"
};

const load = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE) || "null");
    return saved && typeof saved === "object" ? { ...EMPTY, ...saved } : EMPTY;
  } catch {
    return EMPTY;
  }
};

const faq = [
  { q: "Is the CV Builder free?", a: "Yes. It is free, needs no account, and your CV is saved only in your own browser." },
  { q: "How do I download my CV as a PDF?", a: "Click 'Print / Save as PDF', then choose 'Save as PDF' (or 'Microsoft Print to PDF') as the printer. On Android, choose 'Save as PDF' in the print screen." },
  { q: "Will my information be uploaded?", a: "No. The CV is built in your browser and stored only on your device. Clearing your browser data removes it." }
];

const CvBuilder = () => {
  const [params] = useSearchParams();
  // ?sample=1 opens the builder filled with the sample CV (linked from the guides).
  const [cv, setCv] = useState(() => (params.get("sample") ? SAMPLE : load()));

  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify(cv));
    } catch {
      /* storage unavailable */
    }
  }, [cv]);

  const set = (k) => (e) => setCv((c) => ({ ...c, [k]: e.target.value }));
  const setItem = (list, i, k) => (e) =>
    setCv((c) => ({ ...c, [list]: c[list].map((x, j) => (j === i ? { ...x, [k]: e.target.value } : x)) }));
  const addItem = (list) => setCv((c) => ({ ...c, [list]: [...c[list], { ...EMPTY[list][0] }] }));
  const removeItem = (list, i) => setCv((c) => ({ ...c, [list]: c[list].filter((_, j) => j !== i) }));

  const input = (label, value, onChange, placeholder, multiline) => (
    <label className="eng-field">
      <span>{label}</span>
      {multiline ? (
        <textarea rows={multiline === true ? 3 : multiline} value={value || ""} placeholder={placeholder} onChange={onChange} />
      ) : (
        <input type="text" value={value || ""} placeholder={placeholder} onChange={onChange} />
      )}
    </label>
  );

  return (
    <EngLayout
      path="/cv-builder"
      title="Free CV Builder: Make a Professional CV and Save as PDF"
      description="Free CV builder for Nigerian job seekers and fresh graduates: fill in your details, see your CV take shape and save it as a PDF. No sign-up needed."
      faq={faq}
      section={WR_SECTION}
      tools={[
        { path: WR_PATH, name: "Writing Guides", short: "All guides" },
        { path: "/cv-builder", name: "CV Builder", short: "CV Builder" },
        { path: "/cv-format-nigeria", name: "CV Format in Nigeria", short: "CV format" },
        { path: "/how-to-write-a-cv-with-no-experience", name: "CV With No Experience", short: "No experience" }
      ]}
    >
      <h1>Free CV Builder</h1>
      <p className="eng-intro">
        Fill in the sections below and your CV is laid out on the right in a clean, recruiter-friendly format. When you
        are happy with it, print it or save it as a PDF. Nothing is uploaded: your CV stays in this browser.
      </p>

      <div className="cv-layout">
        <div className="eng-panel cv-form">
          <div className="wr-actions" style={{ marginTop: 0, marginBottom: 12 }}>
            <button type="button" className="eng-btn eng-btn-ghost" onClick={() => setCv(SAMPLE)}>
              Load a sample
            </button>
            <button
              type="button"
              className="eng-btn eng-btn-ghost"
              onClick={() => {
                if (window.confirm("Clear your CV and start again?")) setCv(EMPTY);
              }}
            >
              Start again
            </button>
          </div>

          <h2>Personal details</h2>
          <div className="eng-grid">
            {input("Full name", cv.name, set("name"), "Adaeze Nwankwo")}
            {input("Job title or headline", cv.headline, set("headline"), "Accounts Officer")}
            {input("Phone", cv.phone, set("phone"), "08031112222")}
            {input("Email", cv.email, set("email"), "adaeze@email.com")}
            {input("City, State", cv.location, set("location"), "Ikeja, Lagos")}
            {input("LinkedIn or portfolio (optional)", cv.link, set("link"), "linkedin.com/in/yourname")}
          </div>

          <h2>Professional summary</h2>
          {input("Three or four lines about you", cv.summary, set("summary"), "Accounting graduate with three years' experience in audit…", 4)}

          <h2>Work experience</h2>
          <p className="eng-muted">Most recent first. Include NYSC, SIWES and internships. One achievement per line.</p>
          {cv.experience.map((e, i) => (
            <div key={i} className="cv-entry">
              <div className="eng-grid">
                {input("Job title", e.role, setItem("experience", i, "role"), "Audit Associate")}
                {input("Employer", e.org, setItem("experience", i, "org"), "Clearview Partners")}
                {input("Location", e.place, setItem("experience", i, "place"), "Lagos")}
                {input("Dates", e.dates, setItem("experience", i, "dates"), "Jan 2023 – Present")}
              </div>
              {input("Achievements (one per line)", e.points, setItem("experience", i, "points"), "Audited 14 clients' financial statements\nReduced unreconciled items by 60%", 4)}
              {cv.experience.length > 1 && (
                <button type="button" className="cv-remove" onClick={() => removeItem("experience", i)}>
                  Remove this job
                </button>
              )}
            </div>
          ))}
          <button type="button" className="eng-btn eng-btn-ghost" onClick={() => addItem("experience")}>
            + Add another job
          </button>

          <h2>Education</h2>
          {cv.education.map((e, i) => (
            <div key={i} className="cv-entry">
              <div className="eng-grid">
                {input("Degree or certificate", e.degree, setItem("education", i, "degree"), "B.Sc. Accounting")}
                {input("Institution", e.school, setItem("education", i, "school"), "University of Benin")}
                {input("Dates", e.dates, setItem("education", i, "dates"), "2016 – 2021")}
                {input("Class or grade (optional)", e.grade, setItem("education", i, "grade"), "Second Class Upper")}
              </div>
              {cv.education.length > 1 && (
                <button type="button" className="cv-remove" onClick={() => removeItem("education", i)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" className="eng-btn eng-btn-ghost" onClick={() => addItem("education")}>
            + Add education
          </button>

          <h2>Skills and more</h2>
          {input("Skills (separate with commas)", cv.skills, set("skills"), "Excel, Customer service, Report writing", 2)}
          {input("Certifications (one per line)", cv.certifications, set("certifications"), "Google Data Analytics Certificate, 2024", 2)}
          {input("Leadership and volunteering (optional, one per line)", cv.extra, set("extra"), "Class Representative, Department of Accounting (2019 – 2020)", 2)}
          {input("Referees (one per line, or 'Available on request')", cv.referees, set("referees"), "Mr. Kunle Ajayi, Partner, Clearview Partners, 0802 000 1111", 3)}
        </div>

        <div className="cv-preview-col">
          <div className="wr-actions" style={{ marginTop: 0, marginBottom: 12 }}>
            <button type="button" className="eng-btn" onClick={() => window.print()}>
              Print / Save as PDF
            </button>
          </div>
          <CvPreview cv={cv} />
        </div>
      </div>

      <section className="eng-content">
        <h2>How to use the CV Builder</h2>
        <ol>
          <li>Fill in your personal details and a short professional summary for the kind of job you want.</li>
          <li>Add your work experience, most recent first, with one achievement per line. Include NYSC, SIWES and internships if you are a fresh graduate.</li>
          <li>Add your education, skills, certifications and referees.</li>
          <li>Check the preview, then click Print / Save as PDF and choose Save as PDF as the printer.</li>
        </ol>
        <h2>Why this CV layout works</h2>
        <p>
          The builder uses a single-column, reverse-chronological layout with plain headings. Recruiters can scan it in
          seconds, and online application systems can read it, because it has no tables, text boxes or images hiding
          important information. Your name is the title, your contact details sit on one line, and each job shows
          results rather than duties.
        </p>
        <h2>Before you send your CV</h2>
        <ul>
          <li>Tailor the summary and skills to each job advert.</li>
          <li>Keep it to one page if you are a fresh graduate and two pages at most otherwise.</li>
          <li>Name the PDF with your name, for example Adaeze-Nwankwo-CV.pdf.</li>
          <li>Send a short application letter or cover letter with it.</li>
        </ul>
        <p>
          Need more help? Read the <Link to="/cv-format-nigeria">CV format guide</Link>, see a{" "}
          <Link to="/how-to-write-a-cv-with-no-experience">fresh graduate CV sample</Link>, or write your covering letter
          with the <Link to="/letter-generator">Letter Generator</Link>.
        </p>
        <h2>Frequently Asked Questions</h2>
        <FaqList faq={faq} />
      </section>
    </EngLayout>
  );
};

export default CvBuilder;
