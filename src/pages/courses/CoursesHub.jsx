import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { listCourses, getMyCourses } from "../../apiCourses/courseApi";
import { AuthContext } from "../../contextQuiz/AuthContext";
import { formatDuration } from "./courseFormat";
import "./courses.css";

// /courses — all published video courses, plus "My courses" when logged in.
const CoursesHub = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [courses, setCourses] = useState(null);
  const [mine, setMine] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    listCourses().then(setCourses).catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    if (isAuthenticated) getMyCourses().then(setMine).catch(() => {});
  }, [isAuthenticated]);

  const mineIds = new Set(mine.map((c) => c._id));

  return (
    <div className="course-page">
      <Helmet>
        <title>Video Courses | StudentToolsNG</title>
        <meta name="description" content="Recorded video classes you can watch any time — learn web development and tech skills at your own pace." />
        <link rel="canonical" href="https://studenttoolsng.com/courses" />
      </Helmet>

      <header className="course-header">
        <h1>Video Courses</h1>
        <p className="course-tagline">Recorded classes you can watch any time, at your own pace.</p>
      </header>

      {mine.length > 0 && (
        <>
          <h2 className="courses-section-title">My courses</h2>
          <div className="courses-grid">
            {mine.map((c) => (
              <Link key={c._id} to={`/courses/${c.slug}`} className="course-card">
                {c.coverImageUrl && <img src={c.coverImageUrl} alt="" />}
                <div className="course-card-body">
                  <h3>{c.title}</h3>
                  {c.access?.needsClaim
                    ? <p className="course-muted small">Open the activation link in your email</p>
                    : <>
                        <div className="course-progress"><span style={{ width: `${c.lessonCount ? (c.completedCount / c.lessonCount) * 100 : 0}%` }} /></div>
                        <p className="course-muted small">{c.completedCount}/{c.lessonCount} lessons completed</p>
                      </>}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {error && <div className="course-notice error">{error}</div>}
      {!courses && !error && <p className="course-muted">Loading…</p>}
      {courses?.length === 0 && <p className="course-muted">No courses yet — check back soon.</p>}

      {courses?.some((c) => !mineIds.has(c._id)) && (
        <>
          {mine.length > 0 && <h2 className="courses-section-title">All courses</h2>}
          <div className="courses-grid">
            {courses.filter((c) => !mineIds.has(c._id)).map((c) => (
              <Link key={c._id} to={`/courses/${c.slug}`} className="course-card">
                {c.coverImageUrl && <img src={c.coverImageUrl} alt="" />}
                <div className="course-card-body">
                  <h3>{c.title}</h3>
                  {c.tagline && <p>{c.tagline}</p>}
                  <p className="course-muted small">
                    {c.lessonCount} lessons{c.totalSeconds > 0 && ` · ${formatDuration(c.totalSeconds, true)}`}
                    {c.price > 0 && <> · <strong>₦{c.price.toLocaleString()}</strong></>}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesHub;
