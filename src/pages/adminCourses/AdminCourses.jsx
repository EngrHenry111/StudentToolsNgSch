import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminListCourses, adminCreateCourse } from "../../apiCourses/adminCourseApi";
import "../courses/courses.css";

const errMsg = (e) => e.response?.data?.message || e.message;

const AdminCourses = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ title: "", price: "" });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    adminListCourses().then(setData).catch((e) => setError(errMsg(e)));
  }, []);

  const create = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setCreating(true);
    setError(null);
    try {
      const c = await adminCreateCourse({ title: form.title, price: form.price || 0 });
      navigate(`/admin/courses/${c._id}`);
    } catch (e2) {
      setError(errMsg(e2));
      setCreating(false);
    }
  };

  return (
    <div className="adm-course">
      <h1>Video Courses</h1>

      {data && !data.bunnyConfigured && (
        <div className="course-notice error">
          Bunny Stream isn't connected yet — add <code>BUNNY_STREAM_LIBRARY_ID</code>, <code>BUNNY_STREAM_API_KEY</code> and <code>BUNNY_STREAM_TOKEN_KEY</code> in Render before uploading videos.
        </div>
      )}
      {error && <div className="course-notice error">{error}</div>}

      <form className="adm-card adm-form" onSubmit={create}>
        <strong>New course</strong>
        <div className="adm-row">
          <label>Title
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Youth Tech Hub — Fullstack Web Development" />
          </label>
          <label>Price for tutorial-only learners (₦)
            <input type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="e.g. 15000" />
          </label>
        </div>
        <div><button className="course-btn" disabled={creating}>{creating ? "Creating…" : "Create course"}</button></div>
      </form>

      {!data && !error && <p className="course-muted">Loading…</p>}

      {data?.courses?.length > 0 && (
        <div className="adm-card adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr><th>Course</th><th>Status</th><th>Price</th><th>Lessons</th><th>Approved</th><th>Paid</th><th>Revenue</th><th /></tr>
            </thead>
            <tbody>
              {data.courses.map((c) => (
                <tr key={c._id}>
                  <td><strong>{c.title}</strong><div className="course-muted small">/courses/{c.slug}</div></td>
                  <td>{c.isPublished ? <span className="adm-badge ok">Published</span> : <span className="adm-badge">Draft</span>}</td>
                  <td>{c.price > 0 ? `₦${c.price.toLocaleString()}` : "—"}</td>
                  <td>{c.lessonCount}</td>
                  <td>{c.approvedCount}</td>
                  <td>{c.paidCount}</td>
                  <td>₦{c.revenue.toLocaleString()}</td>
                  <td><Link className="course-btn secondary" to={`/admin/courses/${c._id}`}>Manage</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminCourses;
