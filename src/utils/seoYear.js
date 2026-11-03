// Years used in page titles and keywords, worked out from the date so the
// pages stay current without anyone editing them. The crawler copy
// (scripts/buildSeoStatic.mjs) takes the year at build time, so it moves on
// with the first deploy of each new year.

export const currentYear = (d = new Date()) => d.getFullYear();

// The UTME is written around April and May. From June onwards, candidates
// are preparing for the following year's exam.
export const utmeYear = (d = new Date()) => (d.getMonth() >= 5 ? d.getFullYear() + 1 : d.getFullYear());

// University sessions start around September, so from then on students are
// in the session that ends next year, e.g. "2026/2027".
export const sessionYears = (d = new Date()) => {
  const start = d.getMonth() >= 8 ? d.getFullYear() : d.getFullYear() - 1;
  return [start, start + 1];
};
export const academicSession = (d = new Date()) => sessionYears(d).join("/");
