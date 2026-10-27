import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contextQuiz/AuthContext";
import { Segment, Stat } from "../engineering/EngInputs";
import {
  SUBJECTS,
  subjectBySlug,
  topicsOf,
  buildExam,
  gradeExam,
  formatClock,
  LETTERS,
  SECONDS_PER_QUESTION
} from "../../utils/cbt";
import "./cbt.css";

const STORE = "stng-cbt-v1";
const COUNTS = [10, 20, 40];

function loadStats() {
  try {
    return JSON.parse(localStorage.getItem(STORE)) || {};
  } catch {
    return {};
  }
}

function saveStats(slug, g) {
  try {
    const all = loadStats();
    const prev = all[slug] || { attempts: 0, best: 0 };
    all[slug] = {
      attempts: prev.attempts + 1,
      best: Math.max(prev.best, g.percent),
      last: { correct: g.correct, total: g.total, percent: g.percent, date: new Date().toISOString().slice(0, 10) }
    };
    localStorage.setItem(STORE, JSON.stringify(all));
    return all[slug];
  } catch {
    return null;
  }
}

const isTyping = (el) => el && /^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName);

// JAMB-style CBT. With `slug` it's fixed to one subject; without, the
// student picks a subject first.
export default function CbtExam({ slug }) {
  const [subjectSlug, setSubjectSlug] = useState(slug || SUBJECTS[0].slug);
  const subject = subjectBySlug(slug || subjectSlug);
  const topics = topicsOf(subject.bank);

  const [mode, setMode] = useState("timed");
  const [count, setCount] = useState(20);
  const [topic, setTopic] = useState("");
  const [stats, setStats] = useState(() => loadStats()[subject.slug] || null);

  const [phase, setPhase] = useState("setup");
  const [exam, setExam] = useState([]);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState({});
  const [current, setCurrent] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [confirming, setConfirming] = useState(false);
  const [result, setResult] = useState(null);
  const [onlyWrong, setOnlyWrong] = useState(false);

  const top = useRef(null);
  const run = useRef({});
  run.current = { ...run.current, exam, answers };

  const scrollTop = () => setTimeout(() => top.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);

  const start = (opts) => {
    const e = buildExam(subject.bank, opts);
    if (!e.length) return;
    const timed = mode === "timed";
    run.current.startedAt = Date.now();
    run.current.timed = timed;
    // Only mixed tests count towards "your best"; topic drills and retries of
    // missed questions would skew it.
    run.current.record = !opts.ids && !opts.topic;
    run.current.deadline = Date.now() + e.length * SECONDS_PER_QUESTION * 1000;
    setExam(e);
    setAnswers({});
    setFlags({});
    setCurrent(0);
    setConfirming(false);
    setResult(null);
    setOnlyWrong(false);
    setRemaining(e.length * SECONDS_PER_QUESTION);
    setPhase("exam");
    scrollTop();
  };

  const finish = () => {
    const { exam: e, answers: a, startedAt, timed, record } = run.current;
    const g = gradeExam(e, a);
    g.seconds = Math.min(Math.round((Date.now() - startedAt) / 1000), timed ? e.length * SECONDS_PER_QUESTION : Infinity);
    g.timed = timed;
    setResult(g);
    setPhase("done");
    setConfirming(false);
    const s = record && saveStats(subject.slug, g);
    if (s) setStats(s);
    scrollTop();
  };

  // Countdown, from a fixed deadline so a throttled background tab stays accurate.
  useEffect(() => {
    if (phase !== "exam" || !run.current.timed) return;
    const tick = () => {
      const left = Math.max(0, Math.ceil((run.current.deadline - Date.now()) / 1000));
      setRemaining(left);
      if (left === 0) finish();
    };
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
    // finish reads everything it needs from run.current
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Leaving mid-test loses it, so ask first.
  useEffect(() => {
    if (phase !== "exam") return;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [phase]);

  const q = exam[current];
  const studyLocked = mode === "study" && answers[current] !== undefined;

  const choose = (i) => {
    if (studyLocked) return;
    setAnswers((a) => ({ ...a, [current]: i }));
  };
  const go = (i) => setCurrent(Math.max(0, Math.min(exam.length - 1, i)));

  // Keyboard: A–D choose, N / → next, P / ← previous, F flag.
  useEffect(() => {
    if (phase !== "exam") return;
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey || isTyping(document.activeElement)) return;
      const k = e.key.toLowerCase();
      const idx = LETTERS.map((l) => l.toLowerCase()).indexOf(k);
      if (idx >= 0 && q && idx < q.options.length) choose(idx);
      else if (k === "n" || e.key === "ArrowRight") go(current + 1);
      else if (k === "p" || e.key === "ArrowLeft") go(current - 1);
      else if (k === "f") setFlags((f) => ({ ...f, [current]: !f[current] }));
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const unanswered = exam.length - Object.keys(answers).length;
  const pool = topic ? topics.find((t) => t.name === topic)?.count || 0 : subject.bank.length;
  const lowTime = run.current.timed && remaining <= 60;

  return (
    <section className="eng-panel cbt" aria-label={`${subject.name} CBT practice test`} ref={top}>
      {phase === "setup" && (
        <>
          <h2>{slug ? `Start a ${subject.name} practice test` : "Start a JAMB CBT practice test"}</h2>
          <div className="eng-grid">
            {!slug && (
              <label className="eng-field">
                Subject
                <select
                  value={subjectSlug}
                  onChange={(e) => {
                    setSubjectSlug(e.target.value);
                    setTopic("");
                    setStats(loadStats()[e.target.value] || null);
                  }}
                >
                  {SUBJECTS.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name} ({s.bank.length} questions)
                    </option>
                  ))}
                </select>
              </label>
            )}
            <label className="eng-field">
              Topic
              <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                <option value="">All topics (mixed)</option>
                {topics.map((t) => (
                  <option key={t.name} value={t.name}>
                    {t.name} ({t.count})
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="cbt-setup-row">
            <div>
              <span className="eng-muted">Mode</span>
              <Segment
                label="Mode"
                value={mode}
                onChange={setMode}
                options={[
                  { value: "timed", label: "Timed test" },
                  { value: "study", label: "Study mode" }
                ]}
              />
            </div>
            {!topic && (
              <div>
                <span className="eng-muted">Questions</span>
                <Segment
                  label="Number of questions"
                  value={count}
                  onChange={setCount}
                  options={COUNTS.map((c) => ({ value: c, label: c === 40 ? "40 (full paper)" : String(c) }))}
                />
              </div>
            )}
          </div>

          <p className="eng-note">
            {mode === "timed"
              ? `${Math.min(topic ? pool : count, pool)} questions in ${formatClock(Math.min(topic ? pool : count, pool) * SECONDS_PER_QUESTION)} minutes, the UTME pace of ${SECONDS_PER_QUESTION} seconds a question. Answers and explanations are shown when you submit.`
              : "No timer. The correct answer and an explanation appear as soon as you choose an option."}
          </p>

          <div className="eng-row">
            <button type="button" className="eng-btn" onClick={() => start({ count: topic ? undefined : count, topic: topic || undefined })}>
              Start {mode === "timed" ? "test" : "practising"}
            </button>
            {stats && (
              <span className="eng-muted">
                Your best: {stats.best}% · last: {stats.last.correct}/{stats.last.total} · {stats.attempts} test{stats.attempts > 1 ? "s" : ""} taken
              </span>
            )}
          </div>
          <p className="eng-note">Keyboard: A–D to answer, N or → next, P or ← previous, F to flag a question.</p>
          {stats?.attempts >= 3 && <ProPrompt subject={subject} repeat />}
        </>
      )}

      {phase === "exam" && q && (
        <>
          <div className="cbt-bar">
            <span>
              <b>{subject.name}</b> · Question {current + 1} of {exam.length}
            </span>
            {run.current.timed ? (
              <span className={`cbt-clock ${lowTime ? "low" : ""}`} role="timer" aria-live={lowTime ? "polite" : "off"}>
                {formatClock(remaining)}
              </span>
            ) : (
              <span className="eng-muted">Study mode</span>
            )}
          </div>
          <div className="cbt-progress" aria-hidden="true">
            <span style={{ width: `${((exam.length - unanswered) / exam.length) * 100}%` }} />
          </div>

          <p className="cbt-topic">{q.topic}</p>
          <p className="cbt-question">{q.question}</p>

          <div className="cbt-options" role="group" aria-label="Options">
            {q.options.map((o, i) => {
              const picked = answers[current] === i;
              let state = picked ? "picked" : "";
              if (studyLocked) state = i === q.answer ? "right" : picked ? "wrong" : "";
              return (
                <button key={i} type="button" className={`cbt-option ${state}`} aria-pressed={picked} disabled={studyLocked && !picked && i !== q.answer} onClick={() => choose(i)}>
                  <span className="cbt-letter">{LETTERS[i]}</span>
                  <span>{o}</span>
                </button>
              );
            })}
          </div>

          {studyLocked && (
            <div className={`cbt-explain ${answers[current] === q.answer ? "right" : "wrong"}`} aria-live="polite">
              <b>{answers[current] === q.answer ? "Correct." : `Not quite. The answer is ${LETTERS[q.answer]}.`}</b> {q.explanation}
            </div>
          )}

          <div className="eng-row">
            <button type="button" className="eng-btn-ghost" onClick={() => go(current - 1)} disabled={current === 0}>
              ← Previous
            </button>
            <button type="button" className="eng-btn-ghost" onClick={() => go(current + 1)} disabled={current === exam.length - 1}>
              Next →
            </button>
            <button type="button" className="eng-btn-ghost" aria-pressed={!!flags[current]} onClick={() => setFlags((f) => ({ ...f, [current]: !f[current] }))}>
              {flags[current] ? "⚑ Flagged" : "⚐ Flag for review"}
            </button>
            <button type="button" className="eng-btn cbt-submit" onClick={() => (unanswered > 0 && !confirming ? setConfirming(true) : finish())}>
              Submit
            </button>
          </div>

          {confirming && (
            <div className="eng-warn" role="alert">
              You have {unanswered} unanswered question{unanswered > 1 ? "s" : ""}. Unanswered questions score zero.
              <div className="eng-row" style={{ marginTop: 8 }}>
                <button type="button" className="eng-btn" onClick={finish}>Submit anyway</button>
                <button type="button" className="eng-btn-ghost" onClick={() => setConfirming(false)}>Keep going</button>
              </div>
            </div>
          )}

          <nav className="cbt-nav" aria-label="Question navigator">
            {exam.map((x, i) => {
              const done = answers[i] !== undefined;
              let cls = done ? "answered" : "";
              if (mode === "study" && done) cls = answers[i] === x.answer ? "right" : "wrong";
              return (
                <button
                  key={x.id}
                  type="button"
                  className={`${cls} ${i === current ? "current" : ""} ${flags[i] ? "flagged" : ""}`}
                  aria-label={`Question ${i + 1}${done ? ", answered" : ""}${flags[i] ? ", flagged" : ""}`}
                  aria-current={i === current ? "step" : undefined}
                  onClick={() => go(i)}
                >
                  {i + 1}
                </button>
              );
            })}
          </nav>
          <p className="eng-note">
            {exam.length - unanswered} answered · {unanswered} left
            {Object.values(flags).filter(Boolean).length > 0 && ` · ${Object.values(flags).filter(Boolean).length} flagged`}
          </p>
        </>
      )}

      {phase === "done" && result && (
        <>
          <h2>Your {subject.name} result</h2>
          <div className="eng-stats" style={{ marginTop: 0 }}>
            <Stat value={`${result.correct} / ${result.total}`} label="correct answers" />
            <Stat value={`${result.percent}%`} label={`about ${result.percent} / 100 on the UTME scale`} />
            <Stat value={formatClock(result.seconds)} label={result.timed ? `time used of ${formatClock(result.total * SECONDS_PER_QUESTION)}` : "time taken"} />
            {result.answered < result.total && <Stat value={result.total - result.answered} label="left unanswered" />}
          </div>
          <p className="eng-note">{verdict(result.percent)}</p>

          <h3 className="eng-working-title">Score by topic</h3>
          <div className="cbt-topics">
            {result.topics.map((t) => (
              <div key={t.topic} className="cbt-topic-row">
                <span>{t.topic}</span>
                <span className="cbt-meter" aria-hidden="true">
                  <span style={{ width: `${(t.correct / t.total) * 100}%` }} />
                </span>
                <b>
                  {t.correct}/{t.total}
                </b>
              </div>
            ))}
          </div>

          <div className="eng-row">
            {result.wrongIds.length > 0 && (
              <button type="button" className="eng-btn" onClick={() => start({ ids: result.wrongIds })}>
                Practise the {result.wrongIds.length} I got wrong
              </button>
            )}
            <button type="button" className="eng-btn-ghost" onClick={() => setPhase("setup")}>
              New test
            </button>
          </div>

          <ProPrompt subject={subject} weakest={result.topics[0]?.correct < result.topics[0]?.total ? result.topics[0].topic : null} />

          <div className="cbt-review-head">
            <h3 className="eng-working-title">Review your answers</h3>
            <label className="eng-muted">
              <input type="checkbox" checked={onlyWrong} onChange={(e) => setOnlyWrong(e.target.checked)} /> Show only the ones I missed
            </label>
          </div>
          <ol className="cbt-review">
            {exam.map((x, i) => {
              const mine = answers[i];
              const right = mine === x.answer;
              if (onlyWrong && right) return null;
              return (
                <li key={x.id} value={i + 1} className={right ? "right" : "wrong"}>
                  <p className="cbt-question">{x.question}</p>
                  <p>
                    Your answer: <b>{mine === undefined ? "not answered" : `${LETTERS[mine]}. ${x.options[mine]}`}</b> {right ? "✓" : "✗"}
                  </p>
                  {!right && (
                    <p>
                      Correct answer: <b>{LETTERS[x.answer]}. {x.options[x.answer]}</b>
                    </p>
                  )}
                  <p className="eng-muted">{x.explanation}</p>
                </li>
              );
            })}
          </ol>
        </>
      )}
    </section>
  );
}

// The free bank is small, so point students who want more at the Pro
// past-question bank (free accounts get a few quizzes before the paywall).
function ProPrompt({ subject, weakest, repeat }) {
  const { isAuthenticated, isPremium } = useContext(AuthContext);
  const target = `/pro/quiz/past-questions?exam=JAMB&subject=${subject.slug}`;
  const href = isAuthenticated ? target : `/login?next=${encodeURIComponent(target)}`;

  return (
    <aside className="cbt-pro" aria-label="More practice questions">
      <h3>{repeat ? "Seeing the same questions again?" : `Want more ${subject.name} questions?`}</h3>
      <p>
        {repeat
          ? `This free test draws from ${subject.bank.length} questions, so repeats start after a few tests. `
          : ""}
        {isPremium ? "Your Pro plan includes" : "Student Tools Pro adds"} a bank of curated JAMB and WAEC questions,
        adaptive quizzes that drill your weak topics{weakest ? ` (starting with ${weakest})` : ""}, unlimited AI
        quizzes and full analytics.
      </p>
      <div className="eng-row">
        <Link className="eng-btn" to={href}>
          {isPremium ? `Open ${subject.name} past questions` : "Practise more questions"}
        </Link>
        {!isPremium && (
          <span className="eng-muted">
            {isAuthenticated ? "Free accounts get 5 quizzes." : "Free account, 5 quizzes to try. No card needed."}
          </span>
        )}
      </div>
    </aside>
  );
}

function verdict(p) {
  if (p >= 80) return "Excellent. This is the level that competes for the most demanding courses. Keep practising at exam pace.";
  if (p >= 60) return "Good. A score like this in all four subjects puts you around 240 or more in the UTME. Work on your weakest topics below.";
  if (p >= 45) return "Fair. Focus on the topics at the top of the list below, then take another timed test.";
  return "Keep going. Use Study mode on the topics at the top of the list below until the explanations make sense, then retake a timed test.";
}
