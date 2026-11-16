import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  adminGetProgram,
  adminUpdateProgram,
  adminListApplications,
  adminDecideApplications,
  adminResendAccepted
} from "../../apiPrograms/adminProgramApi";
import { adminListCourses } from "../../apiCourses/adminCourseApi";
import { StatusBadge, CopyLink } from "./programAdminUi";
import ProgramView from "../programs/ProgramView";
import { ProgramBody } from "../programs/ProgramPage";
import "../courses/courses.css";
import "../programs/programs.css";
import "./adminPrograms.css";

const errMsg = (e) => e.response?.data?.message || e.message;

const STATUSES = [
  ["draft", "Draft", "Hidden from the public. Use Preview to see it."],
  ["open", "Open", "Form accepts registrations. Shown first on the home page and menu."],
  ["paused", "Paused", "Link and menu stay up, but the form says registration is closed for a short while."],
  ["closed", "Closed", "Removed from the home page and menu. The link says registration has closed."]
];

// ---------------------------------------------------------------- status
function StatusPanel({ program, onChange }) {
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState(null);

  const set = async (status) => {
    if (status === program.status) return;
    if (status === "closed" && !window.confirm("Close registration? It will be removed from the home page and menu.")) return;
    setBusy(status);
    setError(null);
    try {
      onChange(await adminUpdateProgram(program._id, { status }));
    } catch (e) {
      setError(errMsg(e));
    }
    setBusy(null);
  };

  return (
    <div className="adm-card">
      <strong>Registration status</strong>
      <div className="prog-status-grid">
        {STATUSES.map(([k, label, help]) => (
          <button
            key={k}
            type="button"
            className={`prog-status-opt ${program.status === k ? "active" : ""}`}
            onClick={() => set(k)}
            disabled={!!busy}
          >
            <strong>{busy === k ? "Saving…" : label}{program.status === k ? " ✓" : ""}</strong>
            <span>{help}</span>
          </button>
        ))}
      </div>
      {error && <div className="course-notice error" style={{ marginTop: 10 }}>{error}</div>}
    </div>
  );
}

// ---------------------------------------------------------------- registrations
const csvCell = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
const COLUMNS = [
  ["fullName", "Name"], ["email", "Email"], ["phone", "Phone"], ["gender", "Gender"], ["ageRange", "Age"],
  ["location", "Location"], ["educationLevel", "Education"], ["occupation", "Occupation"], ["hasLaptop", "Laptop"],
  ["experience", "Experience"], ["howHeard", "Heard via"], ["motivation", "Why join"], ["batch", "Batch"],
  ["status", "Status"], ["createdAt", "Registered"]
];

const waLink = (phone) => {
  let d = String(phone || "").replace(/\D/g, "");
  if (d.startsWith("0")) d = `234${d.slice(1)}`;
  return d.length >= 10 ? `https://wa.me/${d}` : null;
};

function RegistrationsTab({ program }) {
  const [status, setStatus] = useState("pending");
  const [batch, setBatch] = useState(program.batch);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [open, setOpen] = useState(null);
  const [busy, setBusy] = useState(false);
  const [sendEmail, setSendEmail] = useState(true);

  const load = useCallback(() => {
    adminListApplications(program._id, { status, batch })
      .then((d) => { setData(d); setSelected(new Set()); })
      .catch((e) => setError(errMsg(e)));
  }, [program._id, status, batch]);

  useEffect(() => { load(); }, [load]);

  const apps = useMemo(() => data?.applications || [], [data]);

  const decide = async (ids, action) => {
    if (!ids.length) return;
    if (action === "reject" && !window.confirm(`Reject ${ids.length} registration(s)? Anyone already accepted loses access.`)) return;
    setBusy(true);
    setError(null);
    try {
      const r = await adminDecideApplications(program._id, ids, action, sendEmail);
      setNotice(
        action === "accept"
          ? `${r.changed} accepted — they can watch the class videos now.${sendEmail ? ` ${r.emailed} email(s) sent.` : ""}`
          : `${r.changed} updated.`
      );
      load();
    } catch (e) {
      setError(errMsg(e));
    }
    setBusy(false);
  };

  const resend = async (id) => {
    try {
      await adminResendAccepted(program._id, id);
      setNotice("Acceptance email sent.");
    } catch (e) {
      setError(errMsg(e));
    }
  };

  const exportCsv = () => {
    const rows = [COLUMNS.map(([, h]) => h).map(csvCell).join(",")];
    for (const a of apps) rows.push(COLUMNS.map(([k]) => csvCell(k === "createdAt" ? new Date(a[k]).toLocaleString() : a[k])).join(","));
    // Leading BOM so Excel opens the CSV as UTF-8 (names with accents etc.).
    const blob = new Blob(["﻿", rows.join("\n")], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${program.slug}-${batch}-${status}.csv`.replace(/\s+/g, "-");
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const toggle = (id) => setSelected((s) => {
    const n = new Set(s);
    if (n.has(id)) n.delete(id); else n.add(id);
    return n;
  });
  const allSelected = apps.length > 0 && selected.size === apps.length;

  return (
    <>
      {!program.courses?.length && (
        <div className="course-notice error">
          No video course is linked yet, so accepted students won't get any videos. Link one in Settings.
        </div>
      )}
      {notice && <div className="course-notice success">{notice}</div>}
      {error && <div className="course-notice error">{error}</div>}

      <div className="prog-filters">
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="all">All</option>
        </select>
        <select value={batch} onChange={(e) => setBatch(e.target.value)} aria-label="Batch">
          {(data?.batches || [program.batch]).map((b) => <option key={b} value={b}>{b}</option>)}
          <option value="all">All batches</option>
        </select>
        <label className="adm-check" style={{ fontSize: 13 }}>
          <input type="checkbox" checked={sendEmail} onChange={(e) => setSendEmail(e.target.checked)} />
          Email students when accepted
        </label>
        <span style={{ flex: 1 }} />
        <button type="button" className="course-btn secondary" onClick={exportCsv} disabled={!apps.length}>Download CSV</button>
      </div>

      {selected.size > 0 && (
        <div className="adm-inline-actions" style={{ marginBottom: 10 }}>
          <strong style={{ alignSelf: "center" }}>{selected.size} selected:</strong>
          <button className="course-btn" disabled={busy} onClick={() => decide([...selected], "accept")}>Accept</button>
          <button className="course-btn danger" disabled={busy} onClick={() => decide([...selected], "reject")}>Reject</button>
          <button className="course-btn secondary" disabled={busy} onClick={() => decide([...selected], "pending")}>Move to pending</button>
        </div>
      )}

      {!data && !error && <p className="course-muted">Loading…</p>}
      {data && !apps.length && <p className="course-muted">No registrations here yet.</p>}

      {apps.length > 0 && (
        <div className="adm-card adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th><input type="checkbox" aria-label="Select all" checked={allSelected} onChange={() => setSelected(allSelected ? new Set() : new Set(apps.map((a) => a._id)))} /></th>
                <th>Name</th><th>Contact</th><th>Laptop</th><th>Registered</th><th>Status</th><th />
              </tr>
            </thead>
            <tbody>
              {apps.map((a) => (
                <FragmentRow key={a._id} a={a} open={open === a._id} onOpen={() => setOpen(open === a._id ? null : a._id)}
                  checked={selected.has(a._id)} onCheck={() => toggle(a._id)}
                  onDecide={(action) => decide([a._id], action)} onResend={() => resend(a._id)} busy={busy} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

const APP_BADGE = {
  pending: <span className="adm-badge warn">Pending</span>,
  accepted: <span className="adm-badge ok">Accepted</span>,
  rejected: <span className="adm-badge bad">Rejected</span>
};

function FragmentRow({ a, open, onOpen, checked, onCheck, onDecide, onResend, busy }) {
  const wa = waLink(a.phone);
  return (
    <>
      <tr>
        <td><input type="checkbox" aria-label={`Select ${a.fullName}`} checked={checked} onChange={onCheck} /></td>
        <td>
          <button type="button" className="prog-name-btn" onClick={onOpen}>{a.fullName} {open ? "▴" : "▾"}</button>
          <div className="course-muted small">{a.location}</div>
        </td>
        <td>
          <div className="small">{a.email}</div>
          <div className="small">{a.phone}{wa && <> · <a href={wa} target="_blank" rel="noreferrer">WhatsApp</a></>}</div>
        </td>
        <td>{a.hasLaptop || "—"}</td>
        <td className="small">{new Date(a.createdAt).toLocaleDateString()}<div className="course-muted">{a.batch}</div></td>
        <td>{APP_BADGE[a.status]}</td>
        <td>
          <div className="adm-inline-actions">
            {a.status !== "accepted" && <button className="course-btn" disabled={busy} onClick={() => onDecide("accept")}>Accept</button>}
            {a.status === "pending" && <button className="course-btn danger" disabled={busy} onClick={() => onDecide("reject")}>Reject</button>}
            {a.status === "accepted" && <button className="course-btn secondary" onClick={onResend}>Resend email</button>}
          </div>
        </td>
      </tr>
      {open && (
        <tr className="prog-app-detail">
          <td />
          <td colSpan={6}>
            <dl>
              {COLUMNS.filter(([k]) => !["fullName", "email", "phone", "status", "createdAt"].includes(k)).map(([k, h]) => (
                <FragmentDetail key={k} label={h} value={a[k]} />
              ))}
              {a.status === "accepted" && a.decidedAt && <FragmentDetail label="Accepted" value={new Date(a.decidedAt).toLocaleString()} />}
            </dl>
          </td>
        </tr>
      )}
    </>
  );
}

const FragmentDetail = ({ label, value }) => (
  <>
    <dt>{label}</dt>
    <dd>{value || "—"}</dd>
  </>
);

// ---------------------------------------------------------------- settings
const FIELDS = ["sponsorName", "title", "sponsorLogoUrl", "tagline", "description", "details", "batch", "pausedMessage", "slug"];

function SettingsTab({ program, courses, onSaved }) {
  const [f, setF] = useState(() => ({
    ...Object.fromEntries(FIELDS.map((k) => [k, program[k] || ""])),
    courses: program.courses.map(String)
  }));
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const toggleCourse = (id) =>
    setF({ ...f, courses: f.courses.includes(id) ? f.courses.filter((c) => c !== id) : [...f.courses, id] });

  const save = async (e) => {
    e.preventDefault();
    if (f.batch !== program.batch && !window.confirm(
      `Start "${f.batch}"? New registrations will go under "${f.batch}". "${program.batch}" registrations stay as they are, and everyone can register again for the new batch.`
    )) return;
    setBusy(true);
    setMsg(null);
    try {
      onSaved(await adminUpdateProgram(program._id, f));
      setMsg({ ok: true, text: "Saved." });
    } catch (e2) {
      setMsg({ ok: false, text: errMsg(e2) });
    }
    setBusy(false);
  };

  return (
    <form className="adm-card adm-form" onSubmit={save}>
      <div className="adm-row">
        <label>Sponsor name (big text on top of the form)
          <input value={f.sponsorName} onChange={on("sponsorName")} placeholder="e.g. Bar Ime Okon" />
        </label>
        <label>Programme title
          <input value={f.title} onChange={on("title")} required />
        </label>
      </div>
      <label>Sponsor logo URL (optional)
        <input value={f.sponsorLogoUrl} onChange={on("sponsorLogoUrl")} placeholder="https://…/logo.png" />
      </label>
      <label>One-line tagline
        <input value={f.tagline} onChange={on("tagline")} placeholder="Free fullstack web development training for young people" />
      </label>
      <label>About the training
        <textarea value={f.description} onChange={on("description")} placeholder="What students will learn and who it is for." />
      </label>
      <label>Key details (one per line: dates, venue, requirements)
        <textarea value={f.details} onChange={on("details")} placeholder={"Starts: 6 January 2027\nVenue: Uyo, Akwa Ibom (and online)\nBring a laptop"} />
      </label>
      <div className="adm-row">
        <label>Current batch
          <input value={f.batch} onChange={on("batch")} placeholder="Batch 1" />
        </label>
        <label>Link: studenttoolsng.com/programs/…
          <input value={f.slug} onChange={on("slug")} />
        </label>
      </div>
      <label>Message while paused
        <textarea value={f.pausedMessage} onChange={on("pausedMessage")} placeholder="The portal has closed for a short while. Batch 2 registration opens in February — check back soon." />
      </label>

      <div>
        <strong style={{ fontSize: 13 }}>Video courses accepted students get</strong>
        <div className="prog-course-checks" style={{ marginTop: 6 }}>
          {courses.length === 0 && <span className="course-muted small">No courses yet. Create one under <Link to="/admin/courses">Video Courses</Link>.</span>}
          {courses.map((c) => (
            <label key={c._id} className="adm-check">
              <input type="checkbox" checked={f.courses.includes(c._id)} onChange={() => toggleCourse(c._id)} />
              {c.title} {!c.isPublished && <span className="adm-badge">Draft</span>}
            </label>
          ))}
        </div>
      </div>

      {msg && <div className={`course-notice ${msg.ok ? "success" : "error"}`}>{msg.text}</div>}
      <div><button className="course-btn" disabled={busy}>{busy ? "Saving…" : "Save changes"}</button></div>
    </form>
  );
}

// ---------------------------------------------------------------- page
const TABS = [["registrations", "Registrations"], ["settings", "Settings"], ["preview", "Preview"]];

const AdminProgramEdit = () => {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("registrations");

  useEffect(() => {
    adminGetProgram(id).then(setProgram).catch((e) => setError(errMsg(e)));
    adminListCourses().then((d) => setCourses(d.courses || [])).catch(() => {});
  }, [id]);

  const previewProgram = useMemo(() => program && {
    ...program,
    courses: courses.filter((c) => program.courses.map(String).includes(c._id) && c.isPublished)
  }, [program, courses]);

  if (error) return <div className="adm-course prog-admin"><div className="course-notice error">{error}</div></div>;
  if (!program) return <div className="adm-course prog-admin"><p className="course-muted">Loading…</p></div>;

  return (
    <div className="adm-course prog-admin">
      <p className="small"><Link to="/admin/programs">← All registration forms</Link></p>
      <h1>{[program.sponsorName, program.title].filter(Boolean).join(" ")} <StatusBadge status={program.status} /></h1>
      <p className="course-muted" style={{ marginTop: 0 }}>{program.batch}</p>

      <div className="adm-card">
        <strong>Public link</strong> <span className="course-muted small">— share it on WhatsApp, Facebook, flyers…</span>
        <div style={{ marginTop: 8 }}><CopyLink slug={program.slug} /></div>
        {program.status === "draft" && (
          <p className="course-muted small" style={{ marginBottom: 0 }}>The link shows "not active" until you set the status to Open.</p>
        )}
      </div>

      <StatusPanel program={program} onChange={setProgram} />

      <div className="adm-tabs">
        {TABS.map(([k, label]) => (
          <button key={k} className={tab === k ? "active" : ""} onClick={() => setTab(k)}>{label}</button>
        ))}
      </div>

      {tab === "registrations" && <RegistrationsTab key={program.batch} program={program} />}
      {tab === "settings" && <SettingsTab program={program} courses={courses} onSaved={setProgram} />}
      {tab === "preview" && (
        <div className="adm-card" style={{ padding: 0, overflow: "hidden", background: "#0a0a0f" }}>
          <div className="prog-preview-bar">Preview — this is what visitors see ({program.status})</div>
          <ProgramView program={previewProgram}>
            <ProgramBody program={previewProgram} myApplication={null} accountEmail={null} onSubmit={() => {}} preview />
          </ProgramView>
        </div>
      )}
    </div>
  );
};

export default AdminProgramEdit;
