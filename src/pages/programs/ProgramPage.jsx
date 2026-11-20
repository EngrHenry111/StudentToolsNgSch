import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../contextQuiz/AuthContext";
import { getProgram, applyToProgram, payProgramFee } from "../../apiPrograms/programApi";
import { naira } from "./money";
import ProgramView from "./ProgramView";
import RegistrationForm from "./RegistrationForm";
import "./programs.css";

const SITE = "https://studenttoolsng.com";
const heading = (p) => [p.sponsorName, p.title].filter(Boolean).join(" ");

// Accepted on a paid form: pay the fee here, then the videos open.
function PayCard({ program, myApplication }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const returned = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("paid");
  const pay = async () => {
    setBusy(true);
    setError(null);
    try {
      const { authorization_url } = await payProgramFee(program.slug);
      window.location.href = authorization_url;
    } catch (e) {
      setError(e.message || "Couldn't start the payment. Please try again.");
      setBusy(false);
    }
  };
  return (
    <div className="prog-card prog-state is-ok">
      <h2>You've been accepted 🎉</h2>
      <p>
        Your registration for {myApplication.batch} has been accepted. To start, pay the training fee of{" "}
        <strong>{naira(myApplication.fee)}</strong>. Your class videos open automatically as soon as the payment goes through.
      </p>
      {returned && (
        <div className="prog-alert" role="status">
          We haven't received confirmation of your payment yet. If you've paid, wait a minute and{" "}
          <a href={`/programs/${program.slug}`}>refresh this page</a>. If not, tap the button below.
        </div>
      )}
      {error && <div className="prog-alert error" role="alert">{error}</div>}
      <button type="button" className="prog-submit" onClick={pay} disabled={busy}>
        {busy ? "Opening payment…" : `Pay ${naira(myApplication.fee)} now`}
      </button>
      <p className="prog-muted">Secure payment by Paystack: card, bank transfer or USSD.</p>
    </div>
  );
}

// What sits where the form goes, for every state the page can be in.
export function ProgramBody({ program, myApplication, accountEmail, onSubmit, preview = false }) {
  const path = `/programs/${program.slug}`;
  const sameBatch = myApplication && myApplication.batch === program.batch;
  const firstCourse = program.courses?.[0];

  if (myApplication?.status === "accepted" && myApplication.awaitingPayment) {
    return <PayCard program={program} myApplication={myApplication} />;
  }

  if (myApplication?.status === "accepted") {
    return (
      <div className="prog-card prog-state is-ok">
        <h2>You're in 🎉</h2>
        <p>
          Your registration for {myApplication.batch} has been accepted
          {myApplication.paid ? " and your payment is confirmed" : ""}. Your class videos are ready.
        </p>
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
          Thank you. Your registration for {myApplication.batch} is being reviewed.{" "}
          {program.fee > 0
            ? <>When you're accepted, we'll email you and you can pay the training fee of <strong>{naira(program.fee)}</strong> on this page. Your class videos unlock right after.</>
            : <>When you're accepted, we'll email you and your class videos will unlock on this same account. Nothing else to do.</>}
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
      program={program}
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
