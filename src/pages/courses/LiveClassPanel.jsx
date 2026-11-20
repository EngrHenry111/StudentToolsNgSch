import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLiveClass } from "../../apiCourses/courseApi";

// "Join live class" box on the course page. Students with access ask the
// server for the link (it only answers while the class is switched on) and
// re-check every 45 s, so the Join button appears without a refresh.
// Everyone else only learns that a live class is running.
const POLL_MS = 45000;

export default function LiveClassPanel({ course, hasAccess, isAuthenticated, here }) {
  const [live, setLive] = useState(null); // { active, url?, note? }

  useEffect(() => {
    if (!hasAccess) return undefined;
    let alive = true;
    const check = () => {
      if (document.visibilityState === "hidden") return;
      getLiveClass(course.slug)
        .then((r) => alive && setLive(r))
        .catch(() => alive && setLive((l) => l || { active: false }));
    };
    check();
    const t = setInterval(check, POLL_MS);
    document.addEventListener("visibilitychange", check);
    return () => {
      alive = false;
      clearInterval(t);
      document.removeEventListener("visibilitychange", check);
    };
  }, [course.slug, hasAccess]);

  if (!hasAccess) {
    if (!course.liveActive) return null;
    return (
      <div className="course-live is-on">
        <span className="course-live-badge"><span className="course-live-dot" aria-hidden="true" />LIVE NOW</span>
        <p>A live class is going on now for registered students of this course.</p>
        {!isAuthenticated && (
          <div className="course-actions">
            <Link className="course-btn" to={`/login?next=${encodeURIComponent(here)}`}>Log in to join</Link>
          </div>
        )}
      </div>
    );
  }

  if (!live) return null;

  if (!live.active) {
    return (
      <div className="course-live">
        <strong>Live class</strong>
        <p className="course-muted">
          No live class right now. When your teacher starts one, a <strong>Join live class</strong> button appears
          here. This page checks by itself, so you can leave it open.
        </p>
      </div>
    );
  }

  return (
    <div className="course-live is-on">
      <span className="course-live-badge"><span className="course-live-dot" aria-hidden="true" />LIVE NOW</span>
      {live.note && <h3>{live.note}</h3>}
      <p>Your live class has started. Tap the button to join.</p>
      <div className="course-actions">
        <a className="course-btn" href={live.url} target="_blank" rel="noopener noreferrer">Join live class</a>
      </div>
      <p className="course-muted small">Please don't share the link: it's only for registered students, and you may be asked to wait until you're admitted.</p>
    </div>
  );
}
