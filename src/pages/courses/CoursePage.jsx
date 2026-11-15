import { useEffect, useMemo, useState, useContext, useCallback } from "react";
import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, Circle, Lock, PlayCircle, Loader2 } from "lucide-react";
import {
  getCourse,
  playLesson,
  claimCourseAccess,
  purchaseCourse,
  setLessonComplete,
  watchHeartbeat,
  releaseWatch
} from "../../apiCourses/courseApi";
import { AuthContext } from "../../contextQuiz/AuthContext";
import NotFound from "../notFound/NotFound";
import { formatDuration } from "./courseFormat";
import { courseDescription, courseJsonLd } from "../../utils/courseSeo";
import "./courses.css";

const SITE = "https://studenttoolsng.com";

const CoursePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user, loading: authLoading } = useContext(AuthContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const claimToken = searchParams.get("claim");
  const [returnedFromPayment] = useState(() => Boolean(searchParams.get("reference")));

  const [data, setData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [activeId, setActiveId] = useState(null);
  const [paying, setPaying] = useState(false);

  // Wait for auth to settle so the first request carries the user's token.
  useEffect(() => {
    if (authLoading) return;
    let cancelled = false;
    getCourse(slug)
      .then((d) => { if (!cancelled) setData(d); })
      .catch((err) => {
        if (cancelled) return;
        if (/not found|404/i.test(err.message || "")) setNotFound(true);
        else setError(err.message || "Could not load this course.");
      });
    return () => { cancelled = true; };
  }, [slug, reloadKey, authLoading, isAuthenticated]);

  // ?claim=TOKEN from the approval email: activate once logged in.
  useEffect(() => {
    if (!claimToken || authLoading || !isAuthenticated) return;
    claimCourseAccess(slug, claimToken)
      .then(() => {
        setNotice({ type: "success", text: "Your access is activated. Welcome to the class! 🎉" });
        setSearchParams({}, { replace: true });
        setReloadKey((k) => k + 1);
      })
      .catch((err) => setNotice({ type: "error", text: err.message }));
  }, [claimToken, slug, authLoading, isAuthenticated, setSearchParams]);

  // Back from Paystack: the server verifies the payment while serving the
  // course; once unlocked, drop ?reference from the URL.
  const paymentConfirmed = returnedFromPayment && Boolean(data?.access?.hasAccess);
  useEffect(() => {
    if (paymentConfirmed && searchParams.get("reference")) setSearchParams({}, { replace: true });
  }, [paymentConfirmed, searchParams, setSearchParams]);

  const lessons = useMemo(() => data?.lessons || [], [data]);
  const hasAccess = Boolean(data?.access?.hasAccess);
  const completed = useMemo(() => new Set(data?.completedLessonIds || []), [data]);
  const canWatch = useCallback((l) => hasAccess || l.isFreePreview, [hasAccess]);

  // Until the student picks one: first unfinished watchable lesson.
  const defaultLesson = useMemo(
    () => lessons.find((l) => canWatch(l) && !completed.has(l._id)) || lessons.find(canWatch) || lessons[0] || null,
    // eslint-disable-next-line react-hooks/exhaustive-deps -- don't jump lessons when one is ticked complete
    [lessons, canWatch]
  );
  const active = lessons.find((l) => l._id === activeId) || defaultLesson;
  const activeWatchable = Boolean(active && canWatch(active) && active.isReady);

  // Fetch a fresh signed player URL whenever the selected lesson changes.
  // Results are keyed by lesson id, so a stale response is simply ignored.
  const [fetched, setFetched] = useState({ lessonId: null, url: null, error: null, otherDevice: false });
  const fetchFailed = (lessonId, err) => ({
    lessonId,
    url: null,
    error: err.message,
    otherDevice: err.code === "OTHER_DEVICE"
  });
  useEffect(() => {
    if (!activeWatchable) return;
    let cancelled = false;
    const lessonId = active._id;
    playLesson(slug, lessonId)
      .then((r) => { if (!cancelled) setFetched({ lessonId, url: r.url, error: null, otherDevice: false }); })
      .catch((err) => { if (!cancelled) setFetched(fetchFailed(lessonId, err)); });
    return () => { cancelled = true; };
  }, [activeWatchable, active?._id, slug]);

  // "Watch here instead": move playback to this device (stops the other one).
  const watchHere = () => {
    const lessonId = active._id;
    setFetched({ lessonId: null, url: null, error: null, otherDevice: false });
    playLesson(slug, lessonId, { takeover: true })
      .then((r) => setFetched({ lessonId, url: r.url, error: null, otherDevice: false }))
      .catch((err) => setFetched(fetchFailed(lessonId, err)));
  };

  // One device at a time: while an enrolled lesson is playing, check in
  // every 30s. If another device has taken over, stop the player here.
  const heldLessonId = fetched.url && active && !active.isFreePreview && fetched.lessonId === active._id
    ? active._id
    : null;
  useEffect(() => {
    if (!heldLessonId) return;
    const beat = () =>
      watchHeartbeat().catch((err) => {
        if (err.code === "OTHER_DEVICE") setFetched(fetchFailed(heldLessonId, err));
      });
    const timer = setInterval(beat, 30000);
    // Coming back to a backgrounded tab: check straight away.
    const onVisible = () => { if (document.visibilityState === "visible") beat(); };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pagehide", releaseWatch);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pagehide", releaseWatch);
      releaseWatch();
    };
  }, [heldLessonId]);

  const player = !active || !canWatch(active)
    ? { url: null, loading: false, error: null }
    : !active.isReady
      ? { url: null, loading: false, error: "This video is still processing. Check back shortly." }
      : fetched.lessonId === active._id
        ? { ...fetched, loading: false }
        : { url: null, loading: true, error: null };

  const modules = useMemo(() => {
    const groups = [];
    for (const l of lessons) {
      const name = l.module || "Lessons";
      const last = groups[groups.length - 1];
      if (last && last.name === name) last.items.push(l);
      else groups.push({ name, items: [l] });
    }
    return groups;
  }, [lessons]);

  const here = `/courses/${slug}${claimToken ? `?claim=${claimToken}` : ""}`;

  const handlePay = async () => {
    if (!isAuthenticated) {
      navigate(`/login?next=${encodeURIComponent(`/courses/${slug}`)}`);
      return;
    }
    setPaying(true);
    setNotice(null);
    try {
      const r = await purchaseCourse(slug);
      window.location.href = r.authorization_url;
    } catch (err) {
      setNotice({ type: "error", text: err.message || "Could not start payment." });
      setPaying(false);
    }
  };

  const toggleComplete = async (lesson) => {
    const isDone = completed.has(lesson._id);
    const next = new Set(completed);
    if (isDone) next.delete(lesson._id); else next.add(lesson._id);
    setData((d) => ({ ...d, completedLessonIds: [...next] }));
    try {
      await setLessonComplete(slug, lesson._id, !isDone);
    } catch {
      setData((d) => ({ ...d, completedLessonIds: [...completed] }));
    }
  };

  const goNext = () => {
    const idx = lessons.findIndex((l) => l._id === active?._id);
    const nextLesson = lessons.slice(idx + 1).find(canWatch);
    if (nextLesson) setActiveId(nextLesson._id);
  };

  if (notFound) return <NotFound />;

  if (error && !data) {
    return (
      <div className="course-page">
        <div className="course-notice error">{error}</div>
        <button className="course-btn" onClick={() => { setError(null); setReloadKey((k) => k + 1); }}>Try again</button>
      </div>
    );
  }

  if (!data) {
    // Crawler snapshot from the edge (see main.jsx / seoFallback.js), only for this URL.
    const snapshot = window.__EDGE_SNAPSHOT__;
    const edge = snapshot && snapshot.path === `/courses/${slug}` ? snapshot : null;
    return (
      <div className="course-page">
        <Helmet>
          <title>{edge ? edge.title : "Loading course… | StudentToolsNG"}</title>
          {edge?.description && <meta name="description" content={edge.description} />}
          <link rel="canonical" href={`${SITE}/courses/${slug}`} />
        </Helmet>
        {edge
          ? <div dangerouslySetInnerHTML={{ __html: edge.html }} />
          : <p className="course-muted"><Loader2 className="spin" size={18} /> Loading course…</p>}
      </div>
    );
  }

  const { course, access } = data;
  const doneCount = lessons.filter((l) => completed.has(l._id)).length;
  const totalSeconds = lessons.reduce((s, l) => s + (l.durationSeconds || 0), 0);
  const canonicalUrl = `${SITE}/courses/${course.slug}`;
  const metaDescription = courseDescription(course, lessons.length);

  return (
    <div className="course-page">
      <Helmet>
        <title>{`${course.title} | StudentToolsNG`}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={course.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={course.coverImageUrl || `${SITE}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(courseJsonLd(course, lessons))}</script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE },
              { "@type": "ListItem", position: 2, name: "Courses", item: `${SITE}/courses` },
              { "@type": "ListItem", position: 3, name: course.title, item: canonicalUrl }
            ]
          })}
        </script>
      </Helmet>

      <div className="course-breadcrumb">
        <Link to="/courses">Courses</Link> / <span>{course.title}</span>
      </div>

      <header className="course-header">
        <h1>{course.title}</h1>
        {course.tagline && <p className="course-tagline">{course.tagline}</p>}
        <p className="course-meta">
          {course.instructor && <>By {course.instructor} · </>}
          {lessons.length} lesson{lessons.length === 1 ? "" : "s"}{totalSeconds > 0 && <> · {formatDuration(totalSeconds, true)}</>}
          {hasAccess && <> · <strong>{doneCount}/{lessons.length} completed</strong></>}
        </p>
        {hasAccess && lessons.length > 0 && (
          <div className="course-progress"><span style={{ width: `${(doneCount / lessons.length) * 100}%` }} /></div>
        )}
      </header>

      {notice && <div className={`course-notice ${notice.type}`}>{notice.text}</div>}
      {paymentConfirmed && (
        <div className="course-notice success">Payment confirmed — you now have lifetime access. Enjoy! 🎉</div>
      )}

      {/* Approval-link visitor who isn't logged in yet */}
      {claimToken && !isAuthenticated && !authLoading && (
        <div className="course-notice info">
          <strong>Activate your class access:</strong> create an account (or log in) using the <strong>same email address</strong> this link was sent to. You'll come straight back here.
          <div className="course-actions">
            <Link className="course-btn" to={`/register?next=${encodeURIComponent(here)}`}>Create account</Link>
            <Link className="course-btn secondary" to={`/login?next=${encodeURIComponent(here)}`}>Log in</Link>
          </div>
        </div>
      )}

      {access?.needsClaim && !claimToken && (
        <div className="course-notice info">
          Your email is approved for this course. Open the <strong>"Activate my access"</strong> link we emailed to {user?.email} to unlock it. Can't find it? Check spam or ask your instructor to resend it.
        </div>
      )}

      {returnedFromPayment && !hasAccess && (
        <div className="course-notice info">
          Confirming your payment with Paystack… <button className="link-btn" onClick={() => setReloadKey((k) => k + 1)}>Refresh</button>
        </div>
      )}

      <div className="course-layout">
        <section className="course-player-col">
          <div className="course-player">
            {active && canWatch(active) && player.url && (
              <>
                <iframe
                  key={player.url}
                  src={player.url}
                  title={active.title}
                  loading="lazy"
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
                {/* Faint viewer watermark — discourages screen-recording leaks. */}
                {user?.email && <div className="course-watermark">{user.email}</div>}
              </>
            )}
            {active && canWatch(active) && player.loading && (
              <div className="course-player-msg"><Loader2 className="spin" size={22} /> Loading video…</div>
            )}
            {active && canWatch(active) && player.error && !player.otherDevice && (
              <div className="course-player-msg">{player.error}</div>
            )}
            {active && canWatch(active) && player.otherDevice && (
              <div className="course-player-msg locked">
                <p><strong>Playing on another device</strong></p>
                <p>Your account can only watch on one device at a time.</p>
                <button className="course-btn" onClick={watchHere}>Watch here instead</button>
                <p className="small">This will stop the video on the other device.</p>
              </div>
            )}
            {active && !canWatch(active) && (
              <div className="course-player-msg locked">
                <Lock size={28} />
                <p>This lesson is for enrolled students.</p>
                {course.price > 0 && (
                  <button className="course-btn" onClick={handlePay} disabled={paying}>
                    {paying ? "Redirecting to Paystack…" : `Unlock all lessons — ₦${course.price.toLocaleString()}`}
                  </button>
                )}
              </div>
            )}
            {!active && <div className="course-player-msg">No lessons published yet — check back soon.</div>}
          </div>

          {active && (
            <div className="course-lesson-info">
              <div className="course-lesson-title-row">
                <h2>{active.title}</h2>
                {hasAccess && (
                  <div className="course-actions">
                    <button className="course-btn secondary" onClick={() => toggleComplete(active)}>
                      {completed.has(active._id) ? "✓ Completed" : "Mark as complete"}
                    </button>
                    <button className="course-btn" onClick={goNext}>Next lesson →</button>
                  </div>
                )}
              </div>
              {active.description && <p className="course-lesson-desc">{active.description}</p>}
            </div>
          )}

          {!hasAccess && !access?.needsClaim && !claimToken && (
            <div className="course-cta">
              <h3>Get lifetime access</h3>
              <p>Watch every recorded class at your own pace, as many times as you like — including new lessons as they're added.</p>
              {course.price > 0 ? (
                <button className="course-btn" onClick={handlePay} disabled={paying}>
                  {paying ? "Redirecting to Paystack…" : `Pay ₦${course.price.toLocaleString()} once`}
                </button>
              ) : (
                <p className="course-muted">Enrollment is currently for registered class students only.</p>
              )}
              <p className="course-muted small">
                Registered class student? Use the access link your instructor emailed you.
              </p>
            </div>
          )}

          {course.description && (
            <div className="course-about">
              <h3>About this course</h3>
              <p>{course.description}</p>
            </div>
          )}
        </section>

        <aside className="course-sidebar">
          <h3>Course content</h3>
          {modules.map((m) => (
            <div key={m.name} className="course-module">
              <div className="course-module-name">{m.name}</div>
              {m.items.map((l) => {
                const watchable = canWatch(l);
                const done = completed.has(l._id);
                return (
                  <button
                    key={l._id}
                    className={`course-lesson-item ${l._id === active?._id ? "active" : ""}`}
                    onClick={() => setActiveId(l._id)}
                  >
                    <span className="icon">
                      {!watchable ? <Lock size={16} /> : done ? <CheckCircle2 size={16} className="done" /> : hasAccess ? <Circle size={16} /> : <PlayCircle size={16} />}
                    </span>
                    <span className="title">{l.title}</span>
                    <span className="right">
                      {l.isFreePreview && !hasAccess && <em className="preview-tag">Free</em>}
                      {l.durationSeconds > 0 && formatDuration(l.durationSeconds)}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
};

export default CoursePage;
