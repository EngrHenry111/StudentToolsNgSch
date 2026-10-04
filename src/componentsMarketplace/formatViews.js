// "No views" / "1 view" / "1,234 views" — shared by every listing card
// and the listing page so the wording stays consistent.
export const formatViews = (views) => {
  const n = Number(views) || 0;
  if (n === 0) return "No views";
  return `${n.toLocaleString()} ${n === 1 ? "view" : "views"}`;
};
