import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  parseDate,
  toInputValue,
  today,
  compareDates,
  exactAge,
  nextBirthday,
  nextDayMilestone,
  daysBetween,
  formatDate,
  plural
} from "../../utils/ageMath";
import "./age.css";

// The list lives only in this browser (localStorage) — nothing is sent to
// the server, so no account is needed and birthdays stay private.
const STORAGE_KEY = "stng-age-tracker-v1";
const MAX_PEOPLE = 300;
const GROUPS = ["Family", "Friend", "Classmate", "Student", "Colleague", "Other"];

const newId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

// Keep only well-formed entries (used for both saved data and imports).
function cleanPeople(list) {
  if (!Array.isArray(list)) return [];
  return list
    .filter((p) => p && typeof p.name === "string" && p.name.trim() && parseDate(p.dob))
    .slice(0, MAX_PEOPLE)
    .map((p) => ({
      id: typeof p.id === "string" ? p.id : newId(),
      name: p.name.trim().slice(0, 60),
      dob: p.dob,
      group: GROUPS.includes(p.group) ? p.group : "Other"
    }));
}

function loadPeople() {
  try {
    return cleanPeople(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
  } catch {
    return [];
  }
}

function download(filename, text, type) {
  const blob = new Blob([text], { type });
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(href);
}

// iCalendar text escaping (RFC 5545 §3.3.11).
const icsText = (s) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

function birthdaysIcs(people) {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z");
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//StudentToolsNG//Age Tracker//EN", "CALSCALE:GREGORIAN"];
  for (const p of people) {
    const b = parseDate(p.dob);
    // 29 February: "last day of February" each year (28th in common years).
    const rule = b.m === 2 && b.d === 29 ? "FREQ=YEARLY;BYMONTH=2;BYMONTHDAY=-1" : "FREQ=YEARLY";
    lines.push(
      "BEGIN:VEVENT",
      `UID:${p.id}@studenttoolsng.com`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${p.dob.replace(/-/g, "")}`,
      `RRULE:${rule}`,
      `SUMMARY:${icsText(`${p.name}'s birthday (born ${b.y})`)}`,
      "TRANSP:TRANSPARENT",
      "END:VEVENT"
    );
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

// Age in years with decimals, ticking live. Counts from local midnight on
// the birth date, since only the date (not the time) of birth is known.
function LiveAge({ dob }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(timer);
  }, []);
  const b = parseDate(dob);
  const born = new Date(b.y, b.m - 1, b.d).getTime();
  const years = (now - born) / (365.2425 * 86400000);
  const seconds = Math.floor((now - born) / 1000);
  return (
    <>
      <div className="age-live">{years.toFixed(9)} years</div>
      <p className="age-muted" style={{ textAlign: "center" }}>
        about {seconds.toLocaleString("en-NG")} seconds old
      </p>
    </>
  );
}

const emptyForm = { name: "", dob: "", group: "Family" };

const AgeTracker = () => {
  const [people, setPeople] = useState(loadPeople);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("birthday");
  const [liveId, setLiveId] = useState(null);
  const [storageOk, setStorageOk] = useState(true);
  const importRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
    } catch {
      // Private mode / blocked storage: the tool still works for this visit.
      Promise.resolve().then(() => setStorageOk(false));
    }
  }, [people]);

  const now = today();
  const todayValue = toInputValue(now);

  const rows = people.map((p) => {
    const birth = parseDate(p.dob);
    return {
      ...p,
      birth,
      age: exactAge(birth, now),
      next: nextBirthday(birth, now),
      milestone: nextDayMilestone(birth, now),
      daysLived: daysBetween(birth, now)
    };
  });

  const query = search.trim().toLowerCase();
  const visible = rows
    .filter((r) => !query || r.name.toLowerCase().includes(query) || r.group.toLowerCase().includes(query))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "oldest") return compareDates(a.birth, b.birth);
      if (sortBy === "youngest") return compareDates(b.birth, a.birth);
      return a.next.daysUntil - b.next.daysUntil || a.name.localeCompare(b.name);
    });

  const upcoming = rows
    .filter((r) => r.next.daysUntil <= 30)
    .sort((a, b) => a.next.daysUntil - b.next.daysUntil);

  const live = rows.find((r) => r.id === liveId);

  const submit = (e) => {
    e.preventDefault();
    setNotice("");
    const name = form.name.trim();
    const birth = parseDate(form.dob);
    if (!name) return setError("Enter a name.");
    if (!birth) return setError("Enter a valid date of birth.");
    if (compareDates(birth, now) > 0) return setError("The date of birth can't be in the future.");
    if (!editingId && people.length >= MAX_PEOPLE) {
      return setError(`The tracker holds up to ${MAX_PEOPLE} people.`);
    }
    const entry = { name: name.slice(0, 60), dob: form.dob, group: form.group };
    setPeople((list) =>
      editingId
        ? list.map((p) => (p.id === editingId ? { ...p, ...entry } : p))
        : [...list, { id: newId(), ...entry }]
    );
    setError("");
    setEditingId(null);
    setForm(emptyForm);
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({ name: p.name, dob: p.dob, group: p.group });
    setError("");
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  };

  const remove = (p) => {
    if (!window.confirm(`Remove ${p.name} from the tracker?`)) return;
    setPeople((list) => list.filter((x) => x.id !== p.id));
    if (editingId === p.id) cancelEdit();
    if (liveId === p.id) setLiveId(null);
  };

  const exportBackup = () => {
    download(
      `age-tracker-backup-${todayValue}.json`,
      JSON.stringify({ app: "StudentToolsNG Age Tracker", version: 1, people }, null, 2),
      "application/json"
    );
  };

  const importBackup = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        const incoming = cleanPeople(Array.isArray(data) ? data : data.people);
        if (!incoming.length) {
          setNotice("");
          return setError("That file has no people in it. Choose a backup made by this tracker.");
        }
        // Merge: skip anyone already listed with the same name and birth date.
        const key = (p) => `${p.name.toLowerCase()}|${p.dob}`;
        const seen = new Set(people.map(key));
        const fresh = incoming
          .filter((p) => !seen.has(key(p)))
          .map((p) => ({ ...p, id: newId() }))
          .slice(0, MAX_PEOPLE - people.length);
        setPeople([...people, ...fresh]);
        setError("");
        const skipped = incoming.length - fresh.length;
        setNotice(
          fresh.length === 0
            ? "Everyone in that backup is already in your list."
            : `Imported ${fresh.length === 1 ? "1 person" : `${fresh.length} people`}` +
                (skipped ? ` (${skipped} already listed or over the limit, skipped).` : ".")
        );
      } catch {
        setNotice("");
        setError("Couldn't read that file. Choose a .json backup made by this tracker.");
      }
    };
    reader.readAsText(file);
  };

  const url = "https://studenttoolsng.com/age-tracker";
  const title = "Age Tracker | Track Birthdays and Ages of Family and Friends";
  const description =
    "Free age and birthday tracker: save family, friends or students, see everyone's exact age, upcoming birthdays and milestones, and export a birthday calendar.";
  const image = "https://studenttoolsng.com/og-image.png";

  return (
    <div className="age-page">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="age tracker, birthday tracker, birthday reminder, track ages, upcoming birthdays, class birthday list"
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
            name: "Age Tracker",
            url,
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "All",
            description,
            offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" }
          })}
        </script>
      </Helmet>

      <h1>Age Tracker</h1>

      <p className="age-intro">
        Save the birthdays of family, friends or students and always see their
        exact age, who has a birthday coming up and the next milestone.
      </p>

      {!storageOk && (
        <div className="age-banner age-verdict-no" style={{ marginBottom: 24 }}>
          Your browser is blocking storage (private mode?), so this list will be
          lost when you close the page. Use Export backup to keep a copy.
        </div>
      )}

      <section className="age-panel" ref={formRef} aria-label="Add a person">
        <h2>{editingId ? "Edit person" : "Add a person"}</h2>
        <form className="age-form" onSubmit={submit}>
          <label className="age-field">
            Name
            <input
              type="text"
              maxLength={60}
              placeholder="e.g. Chiamaka"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label className="age-field">
            Date of birth
            <input
              type="date"
              max={todayValue}
              value={form.dob}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
            />
          </label>
          <label className="age-field">
            Group
            <select value={form.group} onChange={(e) => setForm({ ...form, group: e.target.value })}>
              {GROUPS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </label>
          <div className="age-actions-row">
            <button type="submit" className="age-btn">
              {editingId ? "Save changes" : "Add"}
            </button>
            {editingId && (
              <button type="button" className="age-btn-ghost" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
        {error && <div className="age-error" role="alert">{error}</div>}
        {notice && <div className="age-banner" role="status">{notice}</div>}
      </section>

      {upcoming.length > 0 && (
        <section className="age-panel" aria-label="Upcoming birthdays">
          <h2>Birthdays in the next 30 days</h2>
          <ul className="age-upcoming">
            {upcoming.map((r) => (
              <li key={r.id}>
                <span>
                  <b>{r.name}</b> turns {r.next.turning}
                </span>
                <span className="age-muted">
                  {r.next.daysUntil === 0
                    ? "Today!"
                    : r.next.daysUntil === 1
                    ? "Tomorrow"
                    : `${formatDate(r.next.date)} · in ${plural(r.next.daysUntil, "day")}`}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {live && (
        <section className="age-panel" aria-label="Live age">
          <h2>{live.name}, live</h2>
          <LiveAge dob={live.dob} />
          <div style={{ textAlign: "center" }}>
            <button type="button" className="age-btn-ghost" onClick={() => setLiveId(null)}>
              Close
            </button>
          </div>
        </section>
      )}

      <section className="age-panel" aria-label="Tracked people">
        <h2>Tracked people ({people.length})</h2>

        {people.length > 0 && (
          <div className="age-toolbar">
            <input
              type="search"
              placeholder="Search by name or group"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search people"
            />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort people">
              <option value="birthday">Next birthday first</option>
              <option value="name">Name (A–Z)</option>
              <option value="oldest">Oldest first</option>
              <option value="youngest">Youngest first</option>
            </select>
          </div>
        )}

        {people.length === 0 ? (
          <div className="age-empty">
            No one added yet. Add a name and date of birth above to start tracking.
          </div>
        ) : visible.length === 0 ? (
          <div className="age-empty">No one matches “{search}”.</div>
        ) : (
          <ul className="age-list">
            {visible.map((r) => (
              <li key={r.id} className={`age-person${r.next.daysUntil === 0 ? " is-birthday" : ""}`}>
                <div>
                  <h3>
                    {r.name}
                    <span className="age-tag">{r.group}</span>
                  </h3>
                  <p>
                    <b>{plural(r.age.years, "year")}</b>, {plural(r.age.months, "month")},{" "}
                    {plural(r.age.days, "day")} old
                  </p>
                  <p className="age-muted">
                    Born {formatDate(r.birth)} · {r.daysLived.toLocaleString("en-NG")} days lived
                  </p>
                  <p className="age-muted">
                    Next milestone: {r.milestone.days.toLocaleString("en-NG")} days old on{" "}
                    {formatDate(r.milestone.date)}
                  </p>
                </div>
                <div className="age-person-actions">
                  <div className="age-countdown">
                    {r.next.daysUntil === 0 ? (
                      <>
                        <b>Today 🎉</b>
                        <small>turned {r.next.turning}</small>
                      </>
                    ) : (
                      <>
                        <b>{r.next.daysUntil}</b>
                        <small>
                          {r.next.daysUntil === 1 ? "day" : "days"} to turning {r.next.turning}
                        </small>
                      </>
                    )}
                  </div>
                  <button type="button" className="age-btn-ghost" onClick={() => setLiveId(r.id)}>
                    Live age
                  </button>
                  <button type="button" className="age-btn-ghost" onClick={() => startEdit(r)}>
                    Edit
                  </button>
                  <button type="button" className="age-btn-ghost age-btn-danger" onClick={() => remove(r)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="age-panel" aria-label="Backup and calendar">
        <h2>Backup and calendar</h2>
        <p className="age-muted">
          Your list is saved only in this browser on this device. Export a
          backup to move it to another phone or computer, or add every birthday
          to Google Calendar, Apple Calendar or Outlook as a yearly event.
        </p>
        <div className="age-actions-row">
          <button type="button" className="age-btn-ghost" onClick={exportBackup} disabled={!people.length}>
            Export backup (.json)
          </button>
          <button type="button" className="age-btn-ghost" onClick={() => importRef.current?.click()}>
            Import backup
          </button>
          <button
            type="button"
            className="age-btn-ghost"
            disabled={!people.length}
            onClick={() => download("birthdays.ics", birthdaysIcs(people), "text/calendar")}
          >
            Download birthday calendar (.ics)
          </button>
          <input
            ref={importRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={importBackup}
          />
        </div>
      </section>

      <section className="age-content">
        <h2>What the age tracker does</h2>
        <p>
          The age tracker keeps a list of people and their dates of birth and
          works out everything else for you each time you open it. For every
          person you see their exact age in years, months and days, how many
          days they have lived, how many days remain until their next birthday
          and how old they will turn. The list can be sorted by next birthday,
          name or age, and searched by name or group.
        </p>

        <h2>Your data stays on your device</h2>
        <p>
          There is no sign-up. Names and birthdays are stored only in your own
          browser, using its local storage, and are never sent to our server.
          The flip side is that clearing your browser data removes the list, and
          it does not sync between devices by itself. Use the Export backup
          button to save a copy, then Import backup on another device to bring
          the same list across.
        </p>

        <h2>Who it is useful for</h2>
        <ul>
          <li>Class representatives and course reps keeping track of classmates' birthdays.</li>
          <li>Teachers and school administrators who need pupils' ages for records or class placement.</li>
          <li>Parents tracking the ages of their children for school entry and exams.</li>
          <li>Anyone who wants a private birthday reminder list for family and friends.</li>
        </ul>

        <h2>Milestones and the live age counter</h2>
        <p>
          Besides birthdays, the tracker shows each person's next day-count
          milestone, such as 8,000 or 10,000 days old, which makes a fun reason
          to celebrate. Press Live age on anyone to watch their age tick upward
          in years and seconds. Because only the date of birth is saved, the
          live count starts from midnight on the day they were born.
        </p>

        <h2>Birthday calendar</h2>
        <p>
          The Download birthday calendar button creates a standard calendar file
          with one yearly event per person. Open it with Google Calendar, Apple
          Calendar or Outlook and every birthday repeats automatically each
          year, with reminders handled by your calendar app. People born on 29
          February get their event on the last day of February in common years.
        </p>

        <p>
          Need a single age instead? Use the{" "}
          <Link to="/age-calculator">Age Calculator</Link> to find an exact age on
          any date or check an age limit. You can also plan exams with the{" "}
          <Link to="/study-planner">Study Planner</Link>.
        </p>
      </section>
    </div>
  );
};

export default AgeTracker;
