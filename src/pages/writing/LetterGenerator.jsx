import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import EngLayout, { FaqList } from "../engineering/EngLayout";
import { LETTER_TYPES, buildLetter } from "./letterTemplates";
import { WR_SECTION, WR_PATH } from "./writingContent";
import "../engineering/engineering.css";
import "./writing.css";

const STORE = "stng-letter-v1";
const today = () => new Date().toISOString().slice(0, 10);

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(STORE) || "{}");
  } catch {
    return {};
  }
};

const faq = [
  {
    q: "Is the Letter Generator free?",
    a: "Yes. It is free and needs no account. Your details are saved only in your own browser so you can come back and edit them."
  },
  {
    q: "Can I edit the letter after it is generated?",
    a: "Yes. Copy the letter into Word, Google Docs or WhatsApp and change anything you like. Always read it through and make it personal before you send it."
  },
  {
    q: "Should I write 'Yours faithfully' or 'Yours sincerely'?",
    a: "The generator chooses for you: 'Yours faithfully' when the letter starts with 'Dear Sir/Madam', and 'Yours sincerely' when you type the person's name."
  }
];

const LetterGenerator = () => {
  const [params, setParams] = useSearchParams();
  const initialType = LETTER_TYPES[params.get("type")] ? params.get("type") : "application";
  const [type, setType] = useState(initialType);
  const [form, setForm] = useState(() => ({ date: today(), ...load() }));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify(form));
    } catch {
      /* storage unavailable: nothing to save */
    }
  }, [form]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const letter = useMemo(() => buildLetter(type, form), [type, form]);

  const chooseType = (t) => {
    setType(t);
    setParams(t === "application" ? {} : { type: t }, { replace: true });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(letter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  };

  const field = (k, label, placeholder, multiline, inputType) => (
    <label key={k} className="eng-field">
      <span>{label}</span>
      {multiline ? (
        <textarea rows={3} value={form[k] || ""} placeholder={placeholder} onChange={set(k)} />
      ) : (
        <input type={inputType || "text"} value={form[k] || ""} placeholder={placeholder} onChange={set(k)} />
      )}
    </label>
  );

  return (
    <EngLayout
      path="/letter-generator"
      title="Letter Generator: Application, Resignation & Permission Letters"
      description="Free letter generator: fill a short form and get a correctly formatted job application, resignation or permission letter to copy or print."
      faq={faq}
      section={WR_SECTION}
      tools={[
        { path: WR_PATH, name: "Writing Guides", short: "All guides" },
        { path: "/letter-generator", name: "Letter Generator", short: "Letter Generator" },
        { path: "/how-to-write-an-application-letter", name: "How to Write an Application Letter", short: "Application letter" }
      ]}
    >
      <h1>Letter Generator</h1>
      <p className="eng-intro">
        Fill in the form and your letter is written below in the correct Nigerian formal letter format, ready to copy
        or print. Your details stay in your browser.
      </p>

      <div className="eng-panel">
        <h2>1. Choose a letter</h2>
        <div className="eng-segment" role="group" aria-label="Letter type">
          {Object.entries(LETTER_TYPES).map(([k, t]) => (
            <button key={k} type="button" aria-pressed={type === k} onClick={() => chooseType(k)}>
              {t.label}
            </button>
          ))}
        </div>

        <h2 style={{ marginTop: 22 }}>2. Your details</h2>
        <div className="eng-grid">
          {field("name", "Your full name", "Chioma Okafor")}
          {field("phone", "Phone number", "08031234567")}
          {field("email", "Email (optional)", "chioma.okafor@email.com")}
          {field("date", "Date", "", false, "date")}
          {field("address", "Your address (one line per row)", "24, Ezekiel Avenue\nRumuokoro, Port Harcourt\nRivers State", true)}
        </div>

        <h2 style={{ marginTop: 22 }}>3. Who you are writing to</h2>
        <div className="eng-grid">
          {field("recipientTitle", "Their title", "The Human Resources Manager")}
          {field("recipientName", "Their name (optional)", "Mrs Danjuma")}
          {field("organisation", "Organisation", "Brightwave Logistics Limited")}
          {field("recipientAddress", "Organisation address", "15, Trans-Amadi Layout\nPort Harcourt, Rivers State", true)}
        </div>

        <h2 style={{ marginTop: 22 }}>4. About this letter</h2>
        <div className="eng-grid">
          {LETTER_TYPES[type].fields.map(([k, label, placeholder, multiline, inputType]) => field(k, label, placeholder, multiline, inputType))}
        </div>
      </div>

      <div className="wr-output">
        <figure className="wr-letter wr-print">
          <figcaption>Your {LETTER_TYPES[type].label.toLowerCase()}</figcaption>
          <pre>{letter}</pre>
        </figure>
        <div className="wr-actions">
          <button type="button" className="eng-btn" onClick={copy}>
            {copied ? "Copied ✓" : "Copy letter"}
          </button>
          <button type="button" className="eng-btn eng-btn-ghost" onClick={() => window.print()}>
            Print or save as PDF
          </button>
        </div>
      </div>

      <section className="eng-content">
        <h2>How the Letter Generator works</h2>
        <p>
          Choose the kind of letter, fill in your details and the person you are writing to, then add the few facts
          that make the letter yours. The letter is laid out in the standard formal format used in Nigerian offices and
          schools: your address and the date at the top, the receiver's address, the greeting, a heading in capital
          letters, short paragraphs and the correct closing.
        </p>
        <h2>Which letter do I need?</h2>
        <p>
          A job application letter introduces you to an employer and asks to be considered for a specific vacancy. It
          goes with your CV, by hand, by email or through a job portal.
        </p>
        <p>
          A resignation letter tells your employer that you are leaving, names your last working day and thanks them.
          Give the notice period in your contract or staff handbook, which is often one month in Nigerian private
          companies.
        </p>
        <p>
          A permission letter asks your manager, principal or head teacher to excuse you from work or school for a
          short time, such as a family event, a medical appointment or an exam. Write it as early as you can, and say
          who will cover your duties.
        </p>
        <h2>The format the generator follows</h2>
        <ul>
          <li>Your address at the top, followed by your phone number, email and the date written in full.</li>
          <li>The receiver's title, organisation and address on the left.</li>
          <li>Dear Sir/Madam, or the person's name if you know it.</li>
          <li>A heading in capital letters that says what the letter is about.</li>
          <li>Three or four short paragraphs: purpose, details, and a polite close.</li>
          <li>Yours faithfully (or Yours sincerely after a named greeting), a space for your signature, and your full name in capitals.</li>
        </ul>
        <h2>Make the letter your own</h2>
        <ul>
          <li>Replace general statements with real examples: numbers, results and names of projects.</li>
          <li>Read the letter aloud before you send it and fix anything that does not sound like you.</li>
          <li>For job applications, change the 'why this company' part for every employer.</li>
          <li>Print on plain white A4 paper, or save as PDF to attach to an email.</li>
        </ul>
        <h2>Guides for each letter</h2>
        <ul>
          <li>
            <Link to="/how-to-write-an-application-letter">How to write an application letter</Link>, with samples for{" "}
            <Link to="/application-letter-for-teaching-job">teachers</Link>, <Link to="/application-letter-for-nurses">nurses</Link>{" "}
            and <Link to="/application-letter-for-hotel-job">hotel jobs</Link>.
          </li>
          <li>
            <Link to="/cover-letter-for-job-application">Cover letter for a job application</Link>.
          </li>
          <li>
            <Link to={WR_PATH}>All writing guides</Link>.
          </li>
        </ul>
        <h2>Frequently Asked Questions</h2>
        <FaqList faq={faq} />
      </section>
    </EngLayout>
  );
};

export default LetterGenerator;
