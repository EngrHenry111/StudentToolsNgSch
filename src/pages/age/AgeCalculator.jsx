import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  parseDate,
  toInputValue,
  today,
  compareDates,
  ageReport,
  exactAge,
  birthdayIn,
  formatDate,
  formatAge,
  plural
} from "../../utils/ageMath";
import "./age.css";

const ageFaq = [
  {
    q: "How do I calculate my exact age?",
    a: "Count the whole years from your date of birth to today, then the whole months after your last birthday, then the days left over. This calculator does it for you and also shows your age in total months, weeks, days and hours."
  },
  {
    q: "Can I find my age on a past or future date?",
    a: "Yes. Change the \"Age on this date\" field to any date after your birth date — for example the closing date of a scholarship, the JAMB registration deadline or the day you graduate — and the result shows your exact age on that day."
  },
  {
    q: "How are 29 February birthdays handled?",
    a: "Someone born on 29 February only has a real birthday every four years. In other years this calculator treats 28 February as the birthday, which is the most common convention. Some institutions use 1 March instead, so check if an exact legal date matters."
  },
  {
    q: "Is my date of birth saved or sent anywhere?",
    a: "No. The calculation happens entirely in your browser. Nothing you type on this page is sent to our server. If you want to keep a list of birthdays, use the Age Tracker, which saves only on your own device."
  }
];

const AgeCalculator = () => {
  const [dob, setDob] = useState("");
  const [onDate, setOnDate] = useState(() => toInputValue(today()));

  // Age-limit check (scholarships, admission, NYSC, competitions …)
  const [cutoff, setCutoff] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");

  const birth = parseDate(dob);
  const on = parseDate(onDate);
  const todayValue = toInputValue(today());

  let error = "";
  let report = null;
  if (dob && !birth) error = "Enter a valid date of birth.";
  else if (onDate && !on) error = "Enter a valid date to calculate the age on.";
  else if (birth && on && compareDates(on, birth) < 0) {
    error = "The \"age on\" date is before the date of birth.";
  } else if (birth && on) {
    report = ageReport(birth, on);
  }

  // Eligibility uses completed years on the cutoff date (the usual rule:
  // "not older than 25" means you have not yet had your 26th birthday).
  let eligibility = null;
  const cutoffDate = parseDate(cutoff);
  const min = minAge === "" ? null : Number(minAge);
  const max = maxAge === "" ? null : Number(maxAge);
  if (birth && cutoffDate && (min !== null || max !== null)) {
    if (compareDates(cutoffDate, birth) < 0) {
      eligibility = { ok: false, text: "The cutoff date is before the date of birth." };
    } else {
      const age = exactAge(birth, cutoffDate);
      const tooYoung = min !== null && age.years < min;
      const tooOld = max !== null && age.years > max;
      let text = `On ${formatDate(cutoffDate)} you will be ${formatAge(age)} old. `;
      if (tooYoung) {
        const reaches = birthdayIn(birth, birth.y + min);
        text += `That is under the minimum age of ${min}. You turn ${min} on ${formatDate(reaches)}.`;
      } else if (tooOld) {
        const passed = birthdayIn(birth, birth.y + max + 1);
        text += `That is over the maximum age of ${max} — you turn ${max + 1} on ${formatDate(passed)}.`;
      } else {
        text += "That is within the age limit.";
      }
      eligibility = { ok: !tooYoung && !tooOld, text };
    }
  }

  const url = "https://studenttoolsng.com/age-calculator";
  const title = "Age Calculator | Exact Age in Years, Months and Days";
  const description =
    "Free age calculator: find your exact age in years, months and days, your age on any date, days until your next birthday and whether you meet an age limit.";
  const image = "https://studenttoolsng.com/og-image.png";

  return (
    <div className="age-page">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="age calculator, exact age calculator, how old am I, age on a date, birthday countdown, date of birth calculator Nigeria"
        />
        <link rel="canonical" href={url} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Age Calculator",
            url,
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "All",
            description,
            offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" }
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: ageFaq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a }
            }))
          })}
        </script>
      </Helmet>

      <h1>Age Calculator</h1>

      <p className="age-intro">
        Enter a date of birth to get the exact age in years, months and days,
        plus total days lived and a countdown to the next birthday.
      </p>

      <section className="age-panel" aria-label="Calculate age">
        <div className="age-form">
          <label className="age-field">
            Date of birth
            <input
              type="date"
              value={dob}
              max={todayValue}
              onChange={(e) => setDob(e.target.value)}
            />
          </label>

          <label className="age-field">
            Age on this date
            <input
              type="date"
              value={onDate}
              onChange={(e) => setOnDate(e.target.value)}
            />
          </label>

          <button
            type="button"
            className="age-btn-ghost"
            onClick={() => setOnDate(todayValue)}
          >
            Reset to today
          </button>
        </div>

        {error && <div className="age-error" role="alert">{error}</div>}

        {report && (
          <div aria-live="polite">
            <div className="age-headline">
              <strong>{formatAge(report)}</strong>
              <span>
                {onDate === todayValue ? "Age today" : `Age on ${formatDate(on)}`}
              </span>
            </div>

            <div className="age-stats">
              <div className="age-stat">
                <b>{report.totalMonths.toLocaleString("en-NG")}</b>
                <small>total months</small>
              </div>
              <div className="age-stat">
                <b>{report.totalWeeks.toLocaleString("en-NG")}</b>
                <small>
                  weeks{report.weekRemainder ? ` and ${plural(report.weekRemainder, "day")}` : ""}
                </small>
              </div>
              <div className="age-stat">
                <b>{report.totalDays.toLocaleString("en-NG")}</b>
                <small>total days</small>
              </div>
              <div className="age-stat">
                <b>{report.totalHours.toLocaleString("en-NG")}</b>
                <small>hours (approx.)</small>
              </div>
              <div className="age-stat">
                <b>{report.bornOn}</b>
                <small>day of the week born</small>
              </div>
            </div>

            <div className="age-banner">
              {report.next.daysUntil === 0 ? (
                <>Happy birthday! {plural(report.next.turning, "year")} old today.</>
              ) : (
                <>
                  Next birthday: <b>{formatDate(report.next.date)}</b>, turning{" "}
                  {report.next.turning}, in{" "}
                  <b>{plural(report.next.daysUntil, "day")}</b>.
                </>
              )}
            </div>
          </div>
        )}
      </section>

      <section className="age-panel" aria-label="Check an age limit">
        <h2>Check an age limit</h2>
        <p className="age-muted">
          Find out if you meet the minimum or maximum age for a scholarship,
          admission, job or competition on its cutoff date. Fill in at least
          one of the two limits.
        </p>

        <div className="age-form">
          <label className="age-field">
            Cutoff date
            <input type="date" value={cutoff} onChange={(e) => setCutoff(e.target.value)} />
          </label>
          <label className="age-field">
            Minimum age
            <input
              type="number"
              min="0"
              max="120"
              placeholder="e.g. 16"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
            />
          </label>
          <label className="age-field">
            Maximum age
            <input
              type="number"
              min="0"
              max="120"
              placeholder="e.g. 30"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
            />
          </label>
        </div>

        {!birth && (cutoff || minAge || maxAge) && (
          <div className="age-error">Enter your date of birth above first.</div>
        )}

        {eligibility && (
          <div
            className={`age-banner ${eligibility.ok ? "age-verdict-ok" : "age-verdict-no"}`}
            aria-live="polite"
          >
            <b>{eligibility.ok ? "Eligible" : "Not eligible"}</b> — {eligibility.text}
          </div>
        )}
      </section>

      <section className="age-panel">
        <h2>Track many birthdays at once</h2>
        <p className="age-muted">
          Keep a list of family, friends or classmates and see everyone's age
          and upcoming birthdays in one place with the{" "}
          <Link to="/age-tracker">Age Tracker</Link>.
        </p>
      </section>

      <section className="age-content">
        <h2>How this age calculator works</h2>
        <p>
          Your exact age is counted the same way you would do it on paper. First
          the calculator counts the whole years between your date of birth and
          the chosen date. Next it counts the whole months since your last
          birthday. Whatever is left over is the number of days. The totals in
          months, weeks, days and hours are worked out from the same two dates,
          and every leap year in between is included automatically.
        </p>

        <h2>Worked example</h2>
        <p>
          Suppose a student was born on Monday, 15 August 2005, and wants to know
          their age on 26 October 2026.
        </p>
        <ol>
          <li>Whole years: from 15 August 2005 to 15 August 2026 is 21 years.</li>
          <li>Whole months: from 15 August 2026 to 15 October 2026 is 2 months.</li>
          <li>Remaining days: from 15 October 2026 to 26 October 2026 is 11 days.</li>
        </ol>
        <p>
          So the student is 21 years, 2 months and 11 days old. That is 7,742
          days in total, which is exactly 1,106 weeks, and their next birthday
          is 293 days away on 15 August 2027.
        </p>

        <h2>Uses for an exact age</h2>
        <ul>
          <li>Checking the age requirement on a scholarship, fellowship or competition form.</li>
          <li>Confirming the age you will be on an admission or registration cutoff date.</li>
          <li>Filling in forms that ask for age in years and months, such as school records.</li>
          <li>Planning ahead for a milestone birthday or counting down to the next one.</li>
        </ul>

        <h2>Age limits Nigerian students often meet</h2>
        <p>
          Many opportunities set an age limit and measure it on a fixed date, not
          on the day you apply. Scholarships and graduate programmes often have
          a maximum age, while school and university admission have a minimum
          age. For NYSC, graduates who are over 30 years old at graduation are
          exempted from service and receive an exemption certificate instead.
          Age rules change from time to time, so always confirm the current
          figure with the organisation, then use the age limit checker above
          with their exact cutoff date.
        </p>

        <h2>Leap year birthdays</h2>
        <p>
          A person born on 29 February has a real birthday only in leap years,
          such as 2024 and 2028. In the other years this calculator places the
          birthday on 28 February. Day counts are never affected, because every
          real calendar day between the two dates is counted.
        </p>

        <h2>Frequently Asked Questions</h2>
        {ageFaq.map((f) => (
          <p key={f.q}>
            <strong>{f.q}</strong>
            <br />
            {f.a}
          </p>
        ))}

        <p>
          More free tools: the <Link to="/age-tracker">Age Tracker</Link>, the{" "}
          <Link to="/cgpa-calculator">CGPA Calculator</Link> and the{" "}
          <Link to="/jamb-score-calculator">JAMB Score Calculator</Link>.
        </p>
      </section>
    </div>
  );
};

export default AgeCalculator;
