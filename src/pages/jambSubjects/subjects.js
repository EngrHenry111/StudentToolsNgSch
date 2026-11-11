// UTME subjects and the groups JAMB's brochure refers to ("any Arts or Social
// Science subject", "one other Science subject"). Used by the Course Finder
// rules in courseInfo.js. Use of English is compulsory for every course, so it
// is never part of a rule.

export const UTME_SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Agricultural Science",
  "Economics",
  "Geography",
  "Government",
  "History",
  "Literature in English",
  "Christian Religious Studies",
  "Islamic Studies",
  "Commerce",
  "Principles of Accounts",
  "French",
  "Arabic",
  "Yoruba",
  "Igbo",
  "Hausa",
  "Fine Arts",
  "Music",
  "Home Economics",
  "Computer Studies",
  "Physical and Health Education"
];

export const ARTS = [
  "Literature in English",
  "Christian Religious Studies",
  "Islamic Studies",
  "History",
  "French",
  "Arabic",
  "Yoruba",
  "Igbo",
  "Hausa",
  "Fine Arts",
  "Music"
];

export const SOCIAL = ["Economics", "Government", "Geography", "Commerce", "Principles of Accounts", "History"];

export const ARTS_SOCIAL = [...new Set([...ARTS, ...SOCIAL])];

export const SCIENCE = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Agricultural Science",
  "Geography",
  "Computer Studies"
];

export const ANY = UTME_SUBJECTS;

// Does a set of three subjects (English excluded) satisfy a rule? A rule is
// three slots, each a list of acceptable subjects; each subject fills at most
// one slot. Tries every assignment (3! = 6), which is plenty for three slots.
export function satisfies(rule, chosen) {
  const picks = [...new Set(chosen)];
  if (picks.length < rule.length) return false;
  const tryFrom = (slot, used) => {
    if (slot === rule.length) return true;
    return picks.some((s, i) => !used.has(i) && rule[slot].includes(s) && tryFrom(slot + 1, new Set([...used, i])));
  };
  return tryFrom(0, new Set());
}
