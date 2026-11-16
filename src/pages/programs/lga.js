// "Uyo, Itu" → ["Uyo", "Itu"] (same rule as the server's lgaList).
export const lgaList = (s) => String(s || "").split(/[,;\n]+/).map((x) => x.trim()).filter(Boolean);

// "Ikot Ekpene" / "Uyo or Itu", plus the state when given.
export const lgaPhrase = (program) => {
  const lgas = lgaList(program?.eligibleLgas);
  if (!lgas.length) return "";
  const names = lgas.length > 1 ? `${lgas.slice(0, -1).join(", ")} or ${lgas[lgas.length - 1]}` : lgas[0];
  return `${names} Local Government Area${program.eligibleState ? `, ${program.eligibleState} State` : ""}`;
};
