// Search results cut titles off at about 60 characters. Keep the brand suffix
// only when it fits, so the words people search for are never the part lost.
// Shared by the React pages and the edge fallback (seoFallback.js).
export const seoTitle = (title, max = 65) => {
  const full = `${title} | StudentToolsNG`;
  return full.length <= max ? full : title;
};
