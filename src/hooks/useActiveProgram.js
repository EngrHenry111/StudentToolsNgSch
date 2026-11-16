import { useEffect, useState } from "react";
import { getActiveProgram } from "../apiPrograms/programApi";

// The programme currently open (or paused between batches), shown first on
// the home page and in the menu. One request per page load, shared by every
// component that asks; null when there is none or the request fails.
let pending = null;

const load = () => {
  if (!pending) {
    pending = getActiveProgram()
      .then((r) => r?.program || null)
      .catch(() => null);
  }
  return pending;
};

export const programHeading = (p) => [p?.sponsorName, p?.title].filter(Boolean).join(" ");

export default function useActiveProgram() {
  const [program, setProgram] = useState(null);
  useEffect(() => {
    let alive = true;
    load().then((p) => alive && setProgram(p));
    return () => { alive = false; };
  }, []);
  return program;
}
