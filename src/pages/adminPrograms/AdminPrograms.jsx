import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminListPrograms, adminCreateProgram, adminTestEmail } from "../../apiPrograms/adminProgramApi";
import { StatusBadge, CopyLink } from "./programAdminUi";
import "../courses/courses.css";
import "./adminPrograms.css";

const errMsg = (e) => e.response?.data?.message || e.message;

// Sends a real email through the server's mail setup and shows exactly what
// happened, so "students didn't get the email" can be fixed, not guessed.
function EmailTest() {
  const [to, setTo] = useState("");
  const [busy, setBusy] = useState(false);
  const [r, setR] = useState(null);

  const send = async (e) => {
    e.preventDefault();
    setBusy(true);
    setR(null);
    try {
      setR(await adminTestEmail(to));
    } catch (e2) {
      setR({ ok: false, error: errMsg(e2) });
    }
    setBusy(false);
  };

  return (
    <form className="adm-card adm-form" onSubmit={send}>
      <strong>Check student emails</strong>
      <span className="course-muted small">
        Students get an email when you accept them. Send yourself a test to make sure it arrives (check Spam too).
      </span>
      <div className="adm-row" style={{ alignItems: "end" }}>
        <label>Send a test email to
          <input type="email" value={to} onChange={(e) => setTo(e.target.value)} placeholder="your email address" required />
        </label>
        <div><button className="course-btn" disabled={busy}>{busy ? "Sending… (up to 25s)" : "Send test email"}</button></div>
      </div>
      {r && (
        <div className={`course-notice ${r.ok ? "success" : "error"}`}>
          {r.ok ? "Sent. If it isn't in your inbox or Spam within a few minutes, see the note below." : <>Failed: {r.error}</>}
          {r.provider && (
            <div className="small" style={{ marginTop: 6 }}>
              Mail service: <strong>{r.provider === "resend" ? "Resend" : "Gmail"}</strong> · from: {r.from}
              {r.provider === "gmail" && !r.configured && " · EMAIL_USER / EMAIL_PASS are not set on the server"}
            </div>
          )}
          {!r.ok && r.provider === "gmail" && (
            <div className="small" style={{ marginTop: 6 }}>
              Render's servers usually can't send through Gmail. Switch to Resend: add RESEND_API_KEY and EMAIL_FROM in Render.
            </div>
          )}
        </div>
      )}
    </form>
  );
}

const AdminPrograms = () => {
  const navigate = useNavigate();
  const [list, setList] = useState(null);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ title: "Youth Tech Hub Training", sponsorName: "" });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    adminListPrograms().then(setList).catch((e) => setError(errMsg(e)));
  }, []);

  const create = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setCreating(true);
    setError(null);
    try {
      const p = await adminCreateProgram(form);
      navigate(`/admin/programs/${p._id}`);
    } catch (e2) {
      setError(errMsg(e2));
      setCreating(false);
    }
  };

  return (
    <div className="adm-course prog-admin">
      <h1>Registration Forms</h1>
      <p className="course-muted">
        A public registration form for a training (e.g. Youth Tech Hub). Put the sponsor's name on it, share the
        link, accept registrations, and accepted students get the class videos automatically.
      </p>

      {error && <div className="course-notice error">{error}</div>}

      <form className="adm-card adm-form" onSubmit={create}>
        <strong>New registration form</strong>
        <div className="adm-row">
          <label>Sponsor name (shown on top)
            <input value={form.sponsorName} onChange={(e) => setForm({ ...form, sponsorName: e.target.value })} placeholder="e.g. Bar Ime Okon" />
          </label>
          <label>Programme title
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Youth Tech Hub Training" />
          </label>
        </div>
        <p className="course-muted small" style={{ margin: 0 }}>
          It starts as a Draft (hidden). You can change everything, including the sponsor, later.
        </p>
        <div><button className="course-btn" disabled={creating}>{creating ? "Creating…" : "Create form"}</button></div>
      </form>

      <EmailTest />

      {!list && !error && <p className="course-muted">Loading…</p>}

      {list?.length > 0 && (
        <div className="adm-card adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr><th>Programme</th><th>Status</th><th>Batch</th><th>Pending</th><th>Accepted</th><th>All time</th><th /></tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr key={p._id}>
                  <td>
                    <strong>{[p.sponsorName, p.title].filter(Boolean).join(" ")}</strong>
                    <div><CopyLink slug={p.slug} compact /></div>
                  </td>
                  <td><StatusBadge status={p.status} /></td>
                  <td>{p.batch}</td>
                  <td>{p.pending}</td>
                  <td>{p.accepted}</td>
                  <td>{p.total}</td>
                  <td><Link className="course-btn secondary" to={`/admin/programs/${p._id}`}>Manage</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPrograms;
