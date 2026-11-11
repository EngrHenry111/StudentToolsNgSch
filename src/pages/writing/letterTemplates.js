// Builds letter text from the Letter Generator form. Pure functions, so they
// can be tested without a browser.

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const ordinal = (n) => {
  const v = n % 100;
  if (v >= 11 && v <= 13) return `${n}th`;
  return `${n}${["th", "st", "nd", "rd"][n % 10] || "th"}`;
};

// "2026-11-12" -> "12th November, 2026"
export function longDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${ordinal(d)} ${MONTHS[m - 1]}, ${y}`;
}

const lines = (s) =>
  String(s || "")
    .split(/\r?\n/)
    .map((x) => x.trim())
    .filter(Boolean);

const withComma = (arr) => arr.map((l, i) => (i < arr.length - 1 ? l.replace(/[,.]?$/, ",") : l.replace(/[,.]?$/, ".")));

const sentence = (s) => {
  const t = String(s || "").trim();
  if (!t) return "";
  return /[.!?]$/.test(t) ? t : `${t}.`;
};

function header(f) {
  const out = [...withComma(lines(f.address))];
  if (f.phone) out.push(f.phone.trim());
  if (f.email) out.push(f.email.trim());
  out.push(`${longDate(f.date)}.`);
  out.push("");
  const to = [f.recipientTitle, f.organisation, ...lines(f.recipientAddress)].filter((x) => String(x || "").trim());
  out.push(...withComma(to.map((x) => x.trim())));
  out.push("");
  const named = String(f.recipientName || "").trim();
  out.push(named ? `Dear ${named},` : "Dear Sir/Madam,");
  out.push("");
  return { out, named: Boolean(named) };
}

function footer(out, named, name) {
  out.push("");
  out.push(named ? "Yours sincerely," : "Yours faithfully,");
  out.push("(Signature)");
  out.push(String(name || "YOUR NAME").trim().toUpperCase());
  return out.join("\n");
}

export const LETTER_TYPES = {
  application: {
    label: "Job application letter",
    fields: [
      ["jobTitle", "Job title", "Customer Service Officer"],
      ["source", "Where you saw the vacancy", "your company's website"],
      ["qualification", "Your qualification", "a B.Sc. in Mass Communication from the University of Port Harcourt"],
      ["experience", "Your experience (one sentence)", "I have eighteen months' experience handling customer enquiries"],
      ["achievements", "Skills and achievements that fit the job", "I respond to about 60 customer messages a day and won my team's customer service award last quarter", true],
      ["whyCompany", "Why this company", "your growth in same-day delivery and your focus on customers", true]
    ]
  },
  resignation: {
    label: "Resignation letter",
    fields: [
      ["position", "Your position", "Accounts Officer"],
      ["lastDay", "Last working day", "", false, "date"],
      ["noticeNote", "Notice period (optional)", "one month's"],
      ["reason", "Reason (optional, one sentence)", "I have accepted a new role that will help me grow in my career", true],
      ["thanks", "What you are grateful for", "the training and support I have received from you and the team", true]
    ]
  },
  permission: {
    label: "Permission letter (absence from work or school)",
    fields: [
      ["position", "Your position or class", "Admin Officer"],
      ["reason", "Reason for absence", "to attend my sister's wedding in Enugu", true],
      ["startDate", "First day of absence", "", false, "date"],
      ["endDate", "Last day of absence", "", false, "date"],
      ["cover", "Who will cover your work (optional)", "Mr. Bayo Ade, my colleague in the Admin unit"]
    ]
  }
};

export function buildLetter(type, f) {
  const { out, named } = header(f);

  if (type === "application") {
    out.push(`APPLICATION FOR THE POSITION OF ${String(f.jobTitle || "[JOB TITLE]").toUpperCase()}`);
    out.push("");
    out.push(
      `I wish to apply for the position of ${f.jobTitle || "[job title]"}${f.source ? ` advertised on ${f.source.trim()}` : ""}. I hold ${f.qualification || "[your qualification]"}${f.experience ? `, and ${f.experience.trim()}` : ""}.`
    );
    out.push("");
    if (f.achievements) {
      out.push(sentence(f.achievements));
      out.push("");
    }
    out.push(
      `I am particularly interested in ${f.organisation || "your organisation"}${f.whyCompany ? ` because of ${f.whyCompany.trim().replace(/[.]$/, "")}` : ""}. I am confident that my skills and commitment would add value to your team.`
    );
    out.push("");
    out.push(`Thank you for considering my application. I am available for an interview at your convenience and can be reached on ${f.phone || "[phone number]"}.`);
    return footer(out, named, f.name);
  }

  if (type === "resignation") {
    out.push("LETTER OF RESIGNATION");
    out.push("");
    const last = f.lastDay ? longDate(f.lastDay) : "[last working day]";
    out.push(
      `Please accept this letter as formal notice of my resignation from my position as ${f.position || "[position]"} at ${f.organisation || "[organisation]"}. ${f.noticeNote ? `In line with my ${f.noticeNote.trim()} notice period, my` : "My"} last working day will be ${last}.`
    );
    out.push("");
    if (f.reason) {
      out.push(sentence(f.reason));
      out.push("");
    }
    out.push(`I am grateful for ${f.thanks ? f.thanks.trim().replace(/[.]$/, "") : "the opportunities I have had here"}. I will do everything I can to complete my current tasks and hand over my duties smoothly before I leave.`);
    out.push("");
    out.push("Thank you once again. I wish you and the organisation continued success.");
    return footer(out, named, f.name);
  }

  if (type === "permission") {
    const start = f.startDate ? longDate(f.startDate) : "[start date]";
    const end = f.endDate ? longDate(f.endDate) : "";
    out.push("REQUEST FOR PERMISSION TO BE ABSENT");
    out.push("");
    out.push(
      `I write to request permission to be absent from ${f.position ? `my duties as ${f.position}` : "work"} ${end && end !== start ? `from ${start} to ${end}` : `on ${start}`} ${f.reason ? f.reason.trim().replace(/[.]$/, "") : "[reason]"}.`
    );
    out.push("");
    out.push(
      f.cover
        ? `I have arranged for ${f.cover.trim().replace(/[.]$/, "")} to handle my urgent tasks while I am away, and I will complete any outstanding work on my return.`
        : "I will make sure my urgent tasks are handled before I leave and complete any outstanding work on my return."
    );
    out.push("");
    out.push("I would be grateful if my request is granted. Thank you for your understanding.");
    return footer(out, named, f.name);
  }

  return "";
}
