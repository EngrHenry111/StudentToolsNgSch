import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminListPrograms, adminCreateProgram } from "../../apiPrograms/adminProgramApi";
import { StatusBadge, CopyLink } from "./programAdminUi";
import "../courses/courses.css";
import "./adminPrograms.css";

const errMsg = (e) => e.response?.data?.message || e.message;

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
