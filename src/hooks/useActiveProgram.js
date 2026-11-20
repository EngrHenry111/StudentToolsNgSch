import { useEffect, useState } from "react";
import { getActiveProgram } from "../apiPrograms/programApi";
import { lgaList, lgaPhrase } from "../pages/programs/lga";
import { naira } from "../pages/programs/money";

// Every programme currently open (then any paused between batches), shown on
// the home page and in the menu. One request per page load, shared by every
// component that asks; [] when there is none or the request fails.
let pending = null;

const load = () => {
  if (!pending) {
    pending = getActiveProgram()
      .then((r) => r?.programs || (r?.program ? [r.program] : []))
      .catch(() => []);
  }
  return pending;
};

export const programHeading = (p) => [p?.sponsorName, p?.title].filter(Boolean).join(" ");

// Who it's for and what it costs: "For indigenes of Uyo or Itu · Free".
export const programAudience = (p) => {
  const who = lgaPhrase(p) ? `For indigenes of ${lgaPhrase(p)}` : "Open to everyone";
  const cost = p?.fee > 0 ? `${naira(p.fee)} after acceptance` : "Free";
  return `${who} · ${cost}`;
};

// Short menu label. When two forms share a title, add what tells them apart.
export const programMenuLabel = (p, all = []) => {
  const same = all.filter((x) => x.title === p.title).length > 1;
  if (!same) return p.title;
  const lgas = lgaList(p.eligibleLgas);
  const extra = p.fee > 0 ? naira(p.fee) : lgas.length ? `${lgas.join(", ")} · Free` : p.sponsorName || "Free";
  return `${p.title} (${extra})`;
};

export default function useActivePrograms() {
  const [programs, setPrograms] = useState([]);
  useEffect(() => {
    let alive = true;
    load().then((list) => alive && setPrograms(list));
    return () => { alive = false; };
  }, []);
  return programs;
}
