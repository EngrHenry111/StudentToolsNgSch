import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../contextQuiz/AuthContext";
import { getProgram, applyToProgram } from "../../apiPrograms/programApi";
import ProgramView from "./ProgramView";
import RegistrationForm from "./RegistrationForm";
import "./programs.css";

const SITE = "https://studenttoolsng.com";
const heading = (p) => [p.sponsorName, p.title].filter(Boolean).join(" ");

// What sits where the form goes, for every state the page can be in.
export function ProgramBody({ program, myApplication, accountEmail, onSubmit, preview = false }) {
  const path = `/programs/${program.slug}`;
  const sameBatch = myApplication && myApplication.batch === program.batch;
  const firstCourse = program.courses?.[0];

  if (myApplication?.status === "accepted") {
    return (
      <div className="prog-card prog-state is-ok">
        <h2>You're in 🎉</h2>
        <p>Your registration for {myApplication.batch} has been accepted. Your class videos are ready.</p>
        {firstCourse
          ? <Link className="prog-submit" to={`/courses/${firstCourse.slug}`}>Start watching</Link>
          : <Link className="prog-submit" to="/courses">Go to courses</Link>}
      </div>
    );
  }

  if (sameBatch && myApplication.status === "pending") {
    return (
      <div className="prog-card prog-state is-ok">
        <h2>Registration received ✅</h2>
        <p>
          Thank you. Your registration for {myApplication.batch} is being reviewed. When you're accepted,
          we'll email you and your class videos will unlock on this same account. Nothing else to do.
        </p>
        <p className="prog-muted">While you wait, explore the free tutorials and tools below.</p>
      </div>
    );
  }

  if (sameBatch && myApplication.status === "rejected") {
    return (
      <div className="prog-card prog-state">
        <h2>Registration not accepted</h2>
        <p>
          Your registration for {myApplication.batch} wasn't accepted this time. You can still learn on your own
          with the free tutorials, or watch the course videos by unlocking them on the course page.
        </p>
      </div>
    );
  }

  if (program.status === "paused") {
    return (
      <div className="prog-card prog-state is-paused">
        <h2>Registration is closed for now</h2>
        <p>
          {program.pausedMessage ||
            "The portal has closed for a short while. It will reopen for the next batch, so please check back soon."}
        </p>
      </div>
    );
  }

  if (program.status === "closed") {
    return (
      <div className="prog-card prog-state">
        <h2>Registration has closed</h2>
        <p>This programme is not taking registrations. Follow StudentToolsNG for the next one.</p>
      </div>
    );
  }

  return (
    <RegistrationForm
      accountEmail={accountEmail}
      onSubmit={onSubmit}
      loginHref={`/login?next=${encodeURIComponent(path)}`}
      disabled={preview}
    />
  );
}

export default function ProgramPage() {
  const { slug } = useParams();
  const auth = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const loggedIn = !!auth?.token;
  const accountEmail = loggedIn ? auth.user?.email : null;

  // Reload when the visitor logs in or out: their own status comes with it.
  useEffect(() => {
    let alive = true;
    getProgram(slug)
      .then((d) => alive && (setData(d), setError(null)))
      .catch((e) => alive && setError(e));
    return () => { alive = false; };
  }, [slug, loggedIn]);

  const submit = async (body) => {
    const res = await applyToProgram(slug, body);
    if (res.accessToken) auth?.login(res.accessToken, res.refreshToken);
    setData((d) => ({ ...d, myApplication: res.application || { status: "pending", batch: d.program.batch } }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) {
    return (
      <div className="prog-page">
        <div className="prog-card prog-state">
          <h2>{error.status === 404 ? "This registration link isn't active" : "Couldn't load this page"}</h2>
          <p>{error.status === 404 ? "Check the link you were sent, or explore the free tools below." : error.message}</p>
          <Link className="prog-submit" to="/">Go to StudentToolsNG</Link>
        </div>
      </div>
    );
  }

  if (!data) return <div className="prog-page"><p className="prog-muted">Loading…</p></div>;

  const { program } = data;
  const title = `${heading(program)}: Registration | StudentToolsNG`;
  const description = (program.tagline || program.description || `Register for ${heading(program)}.`).replace(/\s+/g, " ").slice(0, 160);
  const url = `${SITE}/programs/${program.slug}`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={heading(program)} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={program.sponsorLogoUrl || `${SITE}/og-image.png`} />
      </Helmet>
      <ProgramView program={program}>
        {/* auth.user loads a moment after the token: wait so a logged-in
            student isn't shown the new-account fields first. */}
        {loggedIn && !accountEmail && !data.myApplication
          ? <p className="prog-muted">Loading your account…</p>
          : (
            <ProgramBody
              program={program}
              myApplication={data.myApplication}
              accountEmail={accountEmail}
              onSubmit={submit}
            />
          )}
      </ProgramView>
    </>
  );
}
