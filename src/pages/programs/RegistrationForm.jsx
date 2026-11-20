import { useState } from "react";
import { Link } from "react-router-dom";
import { lgaList, lgaPhrase } from "./lga";
import { lgasOfState, NIGERIA_STATES } from "./nigeriaLgas";
import { naira } from "./money";

const OPTIONS = {
  gender: ["Female", "Male"],
  ageRange: ["Under 18", "18–24", "25–34", "35 and above"],
  educationLevel: ["Still in secondary school", "SSCE / WAEC", "OND / NCE", "HND / Bachelor's degree", "Postgraduate"],
  occupation: ["Student", "Graduate / job seeker", "Employed", "Self-employed / business"],
  hasLaptop: ["Yes", "No"],
  experience: ["None, I'm a complete beginner", "A little (I've tried before)", "Some experience"],
  howHeard: ["WhatsApp", "Facebook", "Instagram", "TikTok", "Friend or family", "Church / mosque / community", "Other"]
};

const EMPTY = {
  fullName: "", email: "", phone: "", gender: "", ageRange: "", location: "",
  educationLevel: "", occupation: "", hasLaptop: "", experience: "", howHeard: "",
  motivation: "", password: "", confirm: "", website: "",
  stateOfOrigin: "", lgaOfOrigin: "", hometown: "", lgaDeclaration: false
};

const OTHER_LGA = "__other";

const Select = ({ name, label, value, onChange, required }) => (
  <label className="prog-field">
    <span>{label}{required && <em> *</em>}</span>
    <select name={name} value={value} onChange={onChange} required={required}>
      <option value="">Choose…</option>
      {OPTIONS[name].map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  </label>
);

// accountEmail: set when the visitor is logged in — the registration uses
// that account, so no email/password fields. disabled: admin preview.
// program.eligibleLgas: when set, only indigenes of those Local Government
// Areas can register (the server checks too).
export default function RegistrationForm({ program, accountEmail, onSubmit, loginHref, disabled = false }) {
  const [f, setF] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const on = (e) => setF({ ...f, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  const newAccount = !accountEmail;
  // lgas: the ones the admin approved. choices: what the student picks from —
  // every LGA in the state when we have its list, so choosing an unapproved
  // one is refused right here (and again by the server).
  const lgas = lgaList(program?.eligibleLgas);
  const allowed = new Set(lgas.map((l) => l.toLowerCase()));
  const choices = lgasOfState(program?.eligibleState) || lgas;
  const notEligible = lgas.length > 0 &&
    (f.lgaOfOrigin === OTHER_LGA || (f.lgaOfOrigin !== "" && !allowed.has(f.lgaOfOrigin.toLowerCase())));
  // No LGA rule: still ask where they're from, so the admin can decide.
  const originLgas = lgasOfState(f.stateOfOrigin);
  // Changing state clears the LGA picked for the old one.
  const onState = (e) => setF({ ...f, stateOfOrigin: e.target.value, lgaOfOrigin: "" });

  const submit = async (e) => {
    e.preventDefault();
    if (disabled) return;
    setError(null);
    if (notEligible) return;
    if (newAccount && f.password !== f.confirm) {
      setError({ message: "The two passwords don't match." });
      return;
    }
    setBusy(true);
    try {
      const { confirm: _confirm, ...body } = f;
      await onSubmit(newAccount ? body : { ...body, email: accountEmail, password: undefined });
    } catch (err) {
      setError(err);
      setBusy(false);
    }
  };

  return (
    <form className="prog-card prog-form" onSubmit={submit} noValidate={false}>
      <h2>Registration form</h2>
      <p className="prog-muted">Fields marked * are required. It takes about 2 minutes.</p>
      {program?.fee > 0 && (
        <div className="prog-alert" role="note">
          Training fee: <strong>{naira(program.fee)}</strong>. You pay only <strong>after</strong> you're accepted, on this
          page. Registering is free.
        </div>
      )}

      {lgas.length > 0 && (
        <fieldset className="prog-lga">
          <legend>Eligibility</legend>
          <p>This training is only for indigenes (citizens) of <strong>{lgaPhrase(program)}</strong>.</p>
          <div className="prog-fields">
            <label className="prog-field">
              <span>Your Local Government Area of origin<em> *</em></span>
              <select name="lgaOfOrigin" value={f.lgaOfOrigin} onChange={on} required>
                <option value="">Choose…</option>
                {choices.map((l) => <option key={l} value={l}>{l}</option>)}
                <option value={OTHER_LGA}>
                  {lgasOfState(program?.eligibleState) ? `I'm not from ${program.eligibleState} State` : "Another LGA"}
                </option>
              </select>
            </label>
            {!notEligible && (
              <label className="prog-field">
                <span>Ward / village / community<em> *</em></span>
                <input name="hometown" value={f.hometown} onChange={on} required minLength={2} placeholder="e.g. Ikot Abia, Ward 3" />
              </label>
            )}
          </div>
          {notEligible ? (
            <div className="prog-alert error" role="alert">
              Registration denied: this training is only for indigenes of {lgaPhrase(program)}. You can still learn for free
              with the tutorials and tools on StudentToolsNG below.
            </div>
          ) : (
            <label className="prog-declare">
              <input type="checkbox" name="lgaDeclaration" checked={f.lgaDeclaration} onChange={on} required />
              <span>
                I declare that I am an indigene of {f.lgaOfOrigin || "this"} Local Government Area and can show proof
                (e.g. a certificate of origin) if asked.
              </span>
            </label>
          )}
        </fieldset>
      )}

      {lgas.length === 0 && (
        <fieldset className="prog-lga">
          <legend>Where are you from?</legend>
          <div className="prog-fields">
            <label className="prog-field">
              <span>State of origin<em> *</em></span>
              <select name="stateOfOrigin" value={f.stateOfOrigin} onChange={onState} required>
                <option value="">Choose…</option>
                {NIGERIA_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
            <label className="prog-field">
              <span>Local Government Area of origin<em> *</em></span>
              {originLgas ? (
                <select name="lgaOfOrigin" value={f.lgaOfOrigin} onChange={on} required>
                  <option value="">Choose…</option>
                  {originLgas.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              ) : (
                <input name="lgaOfOrigin" value={f.lgaOfOrigin} onChange={on} required minLength={2}
                  disabled={!f.stateOfOrigin} placeholder={f.stateOfOrigin ? "Type your LGA" : "Choose your state first"} />
              )}
            </label>
            <label className="prog-field wide">
              <span>Ward / village / community<em> *</em></span>
              <input name="hometown" value={f.hometown} onChange={on} required minLength={2} placeholder="e.g. Ikot Abia, Ward 3" />
            </label>
          </div>
        </fieldset>
      )}

      <div className="prog-fields">
        <label className="prog-field wide">
          <span>Full name<em> *</em></span>
          <input name="fullName" value={f.fullName} onChange={on} required minLength={3} autoComplete="name" placeholder="e.g. Ada Okon" />
        </label>

        <label className="prog-field">
          <span>Email address<em> *</em></span>
          {newAccount
            ? <input name="email" type="email" value={f.email} onChange={on} required autoComplete="email" placeholder="you@example.com" />
            : <input value={accountEmail} readOnly className="is-locked" />}
        </label>

        <label className="prog-field">
          <span>Phone / WhatsApp number<em> *</em></span>
          <input name="phone" type="tel" value={f.phone} onChange={on} required autoComplete="tel" placeholder="e.g. 0801 234 5678" />
        </label>

        <Select name="gender" label="Gender" value={f.gender} onChange={on} />
        <Select name="ageRange" label="Age" value={f.ageRange} onChange={on} />

        <label className="prog-field">
          <span>Where do you live? (town, state)</span>
          <input name="location" value={f.location} onChange={on} placeholder="e.g. Uyo, Akwa Ibom" />
        </label>

        <Select name="educationLevel" label="Highest education" value={f.educationLevel} onChange={on} />
        <Select name="occupation" label="What do you do now?" value={f.occupation} onChange={on} />
        <Select name="hasLaptop" label="Do you have a laptop?" value={f.hasLaptop} onChange={on} required />
        <Select name="experience" label="Coding experience" value={f.experience} onChange={on} />
        <Select name="howHeard" label="How did you hear about us?" value={f.howHeard} onChange={on} />

        <label className="prog-field wide">
          <span>Why do you want to join?</span>
          <textarea name="motivation" rows={3} maxLength={1000} value={f.motivation} onChange={on} placeholder="A sentence or two is enough." />
        </label>

        {newAccount && (
          <>
            <p className="prog-field wide prog-muted prog-account-note">
              Create a password for your free StudentToolsNG account. You'll use this email and password to
              log in and watch the class videos once you're accepted.
            </p>
            <label className="prog-field">
              <span>Create password<em> *</em></span>
              <input name="password" type="password" value={f.password} onChange={on} required minLength={6} autoComplete="new-password" placeholder="At least 6 characters" />
            </label>
            <label className="prog-field">
              <span>Confirm password<em> *</em></span>
              <input name="confirm" type="password" value={f.confirm} onChange={on} required minLength={6} autoComplete="new-password" />
            </label>
          </>
        )}

        {/* Honeypot: hidden from people, bots fill it in. */}
        <label className="prog-hp" aria-hidden="true">
          Website <input name="website" tabIndex={-1} autoComplete="off" value={f.website} onChange={on} />
        </label>
      </div>

      {error && (
        <div className="prog-alert error" role="alert">
          {error.message}
          {error.code === "ACCOUNT_EXISTS" && loginHref && (
            <> <Link to={loginHref}>Log in here</Link>, and you'll come straight back to this form.</>
          )}
        </div>
      )}

      <button className="prog-submit" disabled={busy || disabled || notEligible}>
        {disabled ? "Preview: form is not live" : busy ? "Submitting…" : "Submit registration"}
      </button>
    </form>
  );
}
