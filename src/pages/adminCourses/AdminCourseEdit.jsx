import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as tus from "tus-js-client";
import {
  adminGetCourse,
  adminUpdateCourse,
  adminListLessons,
  adminCreateLesson,
  adminUpdateLesson,
  adminDeleteLesson,
  adminLessonUpload,
  adminPlayLesson,
  adminListApprovals,
  adminAddApprovals,
  adminResendApproval,
  adminRemoveApproval,
  adminListOrders
} from "../../apiCourses/adminCourseApi";
import { formatDuration } from "../courses/courseFormat";
import "../courses/courses.css";

const errMsg = (e) => e.response?.data?.message || e.message;
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : "—");

// Uploads straight from this browser to Bunny over TUS (resumable — a
// dropped connection picks up where it stopped). Our server never sees
// the file, so there's no size limit from Render.
const uploadToBunny = (file, creds, onProgress) =>
  new Promise((resolve, reject) => {
    const upload = new tus.Upload(file, {
      endpoint: creds.endpoint,
      retryDelays: [0, 3000, 5000, 10000, 20000, 60000],
      chunkSize: 50 * 1024 * 1024,
      headers: {
        AuthorizationSignature: creds.signature,
        AuthorizationExpire: String(creds.expire),
        VideoId: creds.videoId,
        LibraryId: String(creds.libraryId)
      },
      metadata: { filetype: file.type, title: file.name },
      onError: reject,
      onProgress: (sent, total) => onProgress(Math.round((sent / total) * 100)),
      onSuccess: resolve
    });
    upload.findPreviousUploads().then((prev) => {
      if (prev.length) upload.resumeFromPreviousUpload(prev[0]);
      upload.start();
    });
  });

// ---------------------------------------------------------------- Details

const DetailsTab = ({ course, onSaved }) => {
  const [form, setForm] = useState(course);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      const saved = await adminUpdateCourse(course._id, {
        title: form.title, slug: form.slug, tagline: form.tagline, description: form.description,
        coverImageUrl: form.coverImageUrl, instructor: form.instructor, price: form.price, isPublished: form.isPublished
      });
      onSaved(saved);
      setMsg({ type: "success", text: "Saved." });
    } catch (e2) {
      setMsg({ type: "error", text: errMsg(e2) });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="adm-card adm-form" onSubmit={save}>
      {msg && <div className={`course-notice ${msg.type}`}>{msg.text}</div>}
      <div className="adm-row">
        <label>Title<input value={form.title} onChange={set("title")} /></label>
        <label>URL (studenttoolsng.com/courses/…)<input value={form.slug} onChange={set("slug")} /></label>
      </div>
      <label>Tagline (one line, shown under the title and in Google)<input value={form.tagline} onChange={set("tagline")} /></label>
      <label>Description<textarea value={form.description} onChange={set("description")} rows={6} /></label>
      <div className="adm-row">
        <label>Instructor<input value={form.instructor} onChange={set("instructor")} /></label>
        <label>Price for tutorial-only learners (₦) — 0 = not for sale
          <input type="number" min="0" value={form.price} onChange={set("price")} />
        </label>
      </div>
      <label>Cover image URL<input value={form.coverImageUrl} onChange={set("coverImageUrl")} placeholder="https://…" /></label>
      <label className="adm-check">
        <input type="checkbox" checked={form.isPublished} onChange={set("isPublished")} />
        Published (visible at /courses/{form.slug})
      </label>
      <div className="adm-inline-actions">
        <button className="course-btn" disabled={saving}>{saving ? "Saving…" : "Save"}</button>
        {course.isPublished && <a className="course-btn secondary" href={`/courses/${course.slug}`} target="_blank" rel="noreferrer">View page ↗</a>}
      </div>
    </form>
  );
};

// ---------------------------------------------------------------- Lessons

const statusBadge = (s) => {
  if (s === "ready") return <span className="adm-badge ok">Ready</span>;
  if (s === "processing") return <span className="adm-badge warn">Processing</span>;
  if (s === "failed") return <span className="adm-badge bad">Failed</span>;
  return <span className="adm-badge">No video</span>;
};

const emptyLesson = { title: "", module: "", description: "", isFreePreview: false, isPublished: true };

const LessonsTab = ({ course }) => {
  const [lessons, setLessons] = useState(null);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(emptyLesson);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null); // { label, pct }
  const [editing, setEditing] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInput = useRef(null);
  const replaceInput = useRef(null);
  const replaceTarget = useRef(null);

  const load = useCallback(() => {
    adminListLessons(course._id).then(setLessons).catch((e) => setError(errMsg(e)));
  }, [course._id]);

  useEffect(() => { load(); }, [load]);

  // Poll while anything is still encoding on Bunny.
  useEffect(() => {
    if (!lessons?.some((l) => l.videoStatus === "processing")) return;
    const t = setTimeout(load, 15000);
    return () => clearTimeout(t);
  }, [lessons, load]);

  // Warn before closing the tab mid-upload.
  useEffect(() => {
    if (!progress) return;
    const h = (e) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [progress]);

  const lastModule = lessons?.length ? lessons[lessons.length - 1].module : "";

  const create = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !file) {
      setError("Add a title and choose a video file.");
      return;
    }
    setError(null);
    try {
      setProgress({ label: form.title, pct: 0 });
      const { upload } = await adminCreateLesson(course._id, { ...form, module: form.module || lastModule });
      await uploadToBunny(file, upload, (pct) => setProgress({ label: form.title, pct }));
      setForm({ ...emptyLesson, module: form.module || lastModule });
      setFile(null);
      if (fileInput.current) fileInput.current.value = "";
      load();
    } catch (e2) {
      setError(`Upload failed: ${errMsg(e2)}. The lesson was saved — use "Replace video" on it to try again.`);
      load();
    } finally {
      setProgress(null);
    }
  };

  const replaceVideo = async (f) => {
    const lesson = replaceTarget.current;
    if (!f || !lesson) return;
    setError(null);
    try {
      setProgress({ label: lesson.title, pct: 0 });
      const { upload } = await adminLessonUpload(lesson._id, lesson.videoStatus !== "awaiting_upload");
      await uploadToBunny(f, upload, (pct) => setProgress({ label: lesson.title, pct }));
    } catch (e2) {
      setError(`Upload failed: ${errMsg(e2)}`);
    } finally {
      setProgress(null);
      if (replaceInput.current) replaceInput.current.value = "";
      load();
    }
  };

  const patch = async (lesson, body) => {
    try {
      const updated = await adminUpdateLesson(lesson._id, body);
      setLessons((ls) => ls.map((l) => (l._id === updated._id ? updated : l)));
    } catch (e2) {
      setError(errMsg(e2));
    }
  };

  const move = async (idx, dir) => {
    const a = lessons[idx], b = lessons[idx + dir];
    if (!a || !b) return;
    // Swap order values (fall back to index when equal).
    const ao = a.order === b.order ? idx + dir : b.order;
    const bo = a.order === b.order ? idx : a.order;
    await Promise.all([adminUpdateLesson(a._id, { order: ao }), adminUpdateLesson(b._id, { order: bo })]);
    load();
  };

  const remove = async (lesson) => {
    if (!window.confirm(`Delete "${lesson.title}" and its video permanently?`)) return;
    try {
      await adminDeleteLesson(lesson._id);
      load();
    } catch (e2) {
      setError(errMsg(e2));
    }
  };

  const showPreview = async (lesson) => {
    try {
      const r = await adminPlayLesson(lesson._id);
      setPreview({ title: lesson.title, url: r.url });
    } catch (e2) {
      setError(errMsg(e2));
    }
  };

  return (
    <>
      {error && <div className="course-notice error">{error}</div>}

      <form className="adm-card adm-form" onSubmit={create}>
        <strong>Upload a class recording</strong>
        <div className="adm-row">
          <label>Lesson title<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Class 3 — Flexbox & Grid" /></label>
          <label>Module / week<input value={form.module} onChange={(e) => setForm({ ...form, module: e.target.value })} placeholder={lastModule || "Week 1 — HTML & CSS"} /></label>
        </div>
        <label>Notes for students (optional)<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="What we covered, links to slides or code…" /></label>
        <label>Video file<input ref={fileInput} type="file" accept="video/*" onChange={(e) => setFile(e.target.files?.[0] || null)} /></label>
        <div className="adm-row">
          <label className="adm-check"><input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} /> Publish when ready</label>
          <label className="adm-check"><input type="checkbox" checked={form.isFreePreview} onChange={(e) => setForm({ ...form, isFreePreview: e.target.checked })} /> Free preview (anyone can watch)</label>
        </div>
        {progress ? (
          <div>
            <div className="course-muted small">Uploading "{progress.label}" — {progress.pct}%. Keep this tab open.</div>
            <div className="adm-upload-bar"><span style={{ width: `${progress.pct}%` }} /></div>
          </div>
        ) : (
          <div><button className="course-btn" disabled={!course.bunnyConfigured}>Upload lesson</button></div>
        )}
      </form>

      <input ref={replaceInput} type="file" accept="video/*" hidden onChange={(e) => replaceVideo(e.target.files?.[0])} />

      {preview && (
        <div className="adm-card">
          <div className="adm-inline-actions" style={{ justifyContent: "space-between", marginBottom: 8 }}>
            <strong>Preview: {preview.title}</strong>
            <button className="course-btn secondary" onClick={() => setPreview(null)}>Close</button>
          </div>
          <div className="course-player"><iframe src={preview.url} title={preview.title} allowFullScreen /></div>
        </div>
      )}

      <div className="adm-card adm-table-wrap">
        {!lessons && <p className="course-muted">Loading…</p>}
        {lessons?.length === 0 && <p className="course-muted">No lessons yet — upload your first class above.</p>}
        {lessons?.length > 0 && (
          <table className="adm-table">
            <thead><tr><th>#</th><th>Lesson</th><th>Video</th><th>Length</th><th>Visible</th><th>Free</th><th /></tr></thead>
            <tbody>
              {lessons.map((l, i) => (
                <tr key={l._id}>
                  <td>
                    <div className="adm-inline-actions">
                      <button className="link-btn" disabled={i === 0} onClick={() => move(i, -1)} title="Move up">▲</button>
                      <button className="link-btn" disabled={i === lessons.length - 1} onClick={() => move(i, 1)} title="Move down">▼</button>
                    </div>
                  </td>
                  <td>
                    {editing?._id === l._id ? (
                      <div className="adm-form">
                        <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
                        <input value={editing.module} onChange={(e) => setEditing({ ...editing, module: e.target.value })} placeholder="Module" />
                        <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={2} placeholder="Notes" />
                        <div className="adm-inline-actions">
                          <button className="course-btn" onClick={async () => { await patch(l, { title: editing.title, module: editing.module, description: editing.description }); setEditing(null); }}>Save</button>
                          <button className="course-btn secondary" onClick={() => setEditing(null)}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <strong>{l.title}</strong>
                        {l.module && <div className="course-muted small">{l.module}</div>}
                      </>
                    )}
                  </td>
                  <td>{statusBadge(l.videoStatus)}</td>
                  <td>{l.durationSeconds ? formatDuration(l.durationSeconds) : "—"}</td>
                  <td><input type="checkbox" checked={l.isPublished} onChange={(e) => patch(l, { isPublished: e.target.checked })} /></td>
                  <td><input type="checkbox" checked={l.isFreePreview} onChange={(e) => patch(l, { isFreePreview: e.target.checked })} /></td>
                  <td>
                    <div className="adm-inline-actions">
                      {l.videoStatus === "ready" && <button className="course-btn secondary" onClick={() => showPreview(l)}>Watch</button>}
                      <button className="course-btn secondary" onClick={() => setEditing({ _id: l._id, title: l.title, module: l.module, description: l.description })}>Edit</button>
                      <button className="course-btn secondary" disabled={Boolean(progress)} onClick={() => { replaceTarget.current = l; replaceInput.current?.click(); }}>
                        {l.videoStatus === "awaiting_upload" ? "Upload video" : "Replace video"}
                      </button>
                      <button className="course-btn danger" onClick={() => remove(l)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

// ---------------------------------------------------------------- Students (approved emails)

const StudentsTab = ({ course }) => {
  const [approvals, setApprovals] = useState(null);
  const [emails, setEmails] = useState("");
  const [note, setNote] = useState("");
  const [sendEmail, setSendEmail] = useState(true);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const [filter, setFilter] = useState("");

  const load = useCallback(() => {
    adminListApprovals(course._id).then(setApprovals).catch((e) => setMsg({ type: "error", text: errMsg(e) }));
  }, [course._id]);
  useEffect(() => { load(); }, [load]);

  const add = async (e) => {
    e.preventDefault();
    if (!emails.trim()) return;
    setBusy(true);
    setMsg(null);
    try {
      const r = await adminAddApprovals(course._id, { emails, note, sendEmail });
      const parts = [`${r.added.length} added${sendEmail && r.added.length ? " and emailed" : ""}`];
      if (r.alreadyApproved.length) parts.push(`${r.alreadyApproved.length} already approved`);
      if (r.invalid.length) parts.push(`invalid: ${r.invalid.join(", ")}`);
      setMsg({ type: r.invalid.length ? "error" : "success", text: parts.join(" · ") });
      setEmails("");
      load();
    } catch (e2) {
      setMsg({ type: "error", text: errMsg(e2) });
    } finally {
      setBusy(false);
    }
  };

  const resend = async (a) => {
    try {
      await adminResendApproval(course._id, a._id);
      setMsg({ type: "success", text: `Access email re-sent to ${a.email}` });
      load();
    } catch (e2) {
      setMsg({ type: "error", text: errMsg(e2) });
    }
  };

  const remove = async (a) => {
    if (!window.confirm(`Remove access for ${a.email}?`)) return;
    try {
      await adminRemoveApproval(course._id, a._id);
      load();
    } catch (e2) {
      setMsg({ type: "error", text: errMsg(e2) });
    }
  };

  const shown = (approvals || []).filter((a) => !filter || a.email.includes(filter.toLowerCase()) || a.note.toLowerCase().includes(filter.toLowerCase()));
  const activated = (approvals || []).filter((a) => a.claimedBy).length;

  return (
    <>
      {msg && <div className={`course-notice ${msg.type}`}>{msg.text}</div>}
      <form className="adm-card adm-form" onSubmit={add}>
        <strong>Approve registered class students (free, lifetime access)</strong>
        <label>Emails — paste one per line, or separated by commas
          <textarea value={emails} onChange={(e) => setEmails(e.target.value)} rows={5} placeholder={"ada@gmail.com\nchidi@yahoo.com"} />
        </label>
        <div className="adm-row">
          <label>Note (optional)<input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Cohort 1" /></label>
          <label className="adm-check"><input type="checkbox" checked={sendEmail} onChange={(e) => setSendEmail(e.target.checked)} /> Email each student their activation link</label>
        </div>
        <div><button className="course-btn" disabled={busy}>{busy ? "Adding…" : "Approve emails"}</button></div>
      </form>

      <div className="adm-card adm-table-wrap">
        <div className="adm-inline-actions" style={{ justifyContent: "space-between", marginBottom: 10 }}>
          <span className="course-muted small">{approvals?.length || 0} approved · {activated} activated</span>
          <div className="adm-form"><input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search email or note" /></div>
        </div>
        {!approvals && <p className="course-muted">Loading…</p>}
        {approvals?.length === 0 && <p className="course-muted">No approved students yet.</p>}
        {shown.length > 0 && (
          <table className="adm-table">
            <thead><tr><th>Email</th><th>Note</th><th>Status</th><th>Approved</th><th /></tr></thead>
            <tbody>
              {shown.map((a) => (
                <tr key={a._id}>
                  <td>{a.email}</td>
                  <td>{a.note || "—"}</td>
                  <td>
                    {a.claimedBy
                      ? <span className="adm-badge ok">Activated{a.claimedBy.username ? ` · ${a.claimedBy.username}` : ""}</span>
                      : <span className="adm-badge warn">Waiting for student</span>}
                  </td>
                  <td>{fmtDate(a.createdAt)}</td>
                  <td>
                    <div className="adm-inline-actions">
                      {!a.claimedBy && <button className="course-btn secondary" onClick={() => resend(a)}>Resend email</button>}
                      <button className="course-btn danger" onClick={() => remove(a)}>Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

// ---------------------------------------------------------------- Payments

const PaymentsTab = ({ course }) => {
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    adminListOrders(course._id).then(setOrders).catch((e) => setError(errMsg(e)));
  }, [course._id]);

  const paid = (orders || []).filter((o) => o.status === "completed");
  const revenue = paid.reduce((s, o) => s + o.amount, 0);

  return (
    <>
      {error && <div className="course-notice error">{error}</div>}
      <div className="adm-stats">
        <div className="adm-stat"><b>{paid.length}</b><span>Paid learners</span></div>
        <div className="adm-stat"><b>₦{revenue.toLocaleString()}</b><span>Revenue</span></div>
      </div>
      <div className="adm-card adm-table-wrap">
        {!orders && <p className="course-muted">Loading…</p>}
        {orders?.length === 0 && <p className="course-muted">No payments yet.</p>}
        {orders?.length > 0 && (
          <table className="adm-table">
            <thead><tr><th>Learner</th><th>Amount</th><th>Status</th><th>Date</th><th>Reference</th></tr></thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td>{o.user?.username}<div className="course-muted small">{o.user?.email}</div></td>
                  <td>₦{o.amount.toLocaleString()}</td>
                  <td>{o.status === "completed" ? <span className="adm-badge ok">Paid</span> : <span className="adm-badge warn">Pending</span>}</td>
                  <td>{fmtDate(o.paidAt || o.createdAt)}</td>
                  <td className="course-muted small">{o.paystackReference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

// ---------------------------------------------------------------- Page

const TABS = [
  ["lessons", "Lessons"],
  ["students", "Approved students"],
  ["payments", "Payments"],
  ["details", "Course details"]
];

const AdminCourseEdit = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("lessons");

  useEffect(() => {
    adminGetCourse(id).then(setCourse).catch((e) => setError(errMsg(e)));
  }, [id]);

  if (error) return <div className="adm-course"><div className="course-notice error">{error}</div></div>;
  if (!course) return <div className="adm-course"><p className="course-muted">Loading…</p></div>;

  return (
    <div className="adm-course">
      <div className="course-breadcrumb"><Link to="/admin/courses">Video Courses</Link> / <span>{course.title}</span></div>
      <h1>{course.title}</h1>
      <div className="adm-inline-actions">
        {course.isPublished ? <span className="adm-badge ok">Published</span> : <span className="adm-badge">Draft — not visible to students</span>}
        <span className="adm-badge">{course.price > 0 ? `₦${course.price.toLocaleString()}` : "Not for sale"}</span>
      </div>
      {!course.bunnyConfigured && (
        <div className="course-notice error">Bunny Stream isn't connected on the server yet, so uploads are disabled.</div>
      )}

      <div className="adm-tabs">
        {TABS.map(([k, label]) => (
          <button key={k} className={tab === k ? "active" : ""} onClick={() => setTab(k)}>{label}</button>
        ))}
      </div>

      {tab === "details" && <DetailsTab course={course} onSaved={(c) => setCourse({ ...c, bunnyConfigured: course.bunnyConfigured })} />}
      {tab === "lessons" && <LessonsTab course={course} />}
      {tab === "students" && <StudentsTab course={course} />}
      {tab === "payments" && <PaymentsTab course={course} />}
    </div>
  );
};

export default AdminCourseEdit;
