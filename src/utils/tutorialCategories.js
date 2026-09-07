// Taxonomy for the tutorial/blog section.
//
// CATEGORY is a small closed set — the public site only exposes these five
// (they have clean routes: /physics, /mathematics, …), and the sitemap +
// Tutorials.jsx whitelist read `tutorialCategoryList` from here, so this is
// the single source of truth for "what is a valid tutorial category".
//
// TOPIC is intentionally open-ended (the content library has hundreds of
// distinct, legitimate topics like "cell-theory", "osmosis", "dna-structure").
// It is not whitelisted — it only has to be a clean kebab-case slug. The
// per-category lists below are *suggestions* shown in the editor, not a
// validation gate. They reuse the shared curriculum topicBank where the
// subject exists there.
//
// Keep in sync with StudentToolsServer/services/tutorialCategories.js.

import { topicBank } from "./topicBank";

export const tutorialCategoryLabels = {
  physics: "Physics",
  mathematics: "Mathematics",
  chemistry: "Chemistry",
  biology: "Biology",
  programming: "Programming"
};

export const tutorialCategoryList = Object.keys(tutorialCategoryLabels);

// Editor autocomplete suggestions only (not a validation whitelist).
export const topicSuggestions = {
  physics: [
    "Mechanics", "Motion", "Newton's Laws", "Work and Energy", "Waves",
    "Electricity", "Magnetism", "Heat and Thermodynamics", "Optics",
    "Pressure", "Gravitation"
  ],
  mathematics: [...topicBank.mathematics],
  chemistry: [...topicBank.chemistry],
  biology: [...topicBank.biology],
  programming: [
    "JavaScript", "Python", "React", "Node.js", "HTML and CSS",
    "Databases", "Data Structures", "Algorithms", "Git and GitHub", "APIs"
  ]
};

// Slug used for a topic in URLs and in the DB (matches slugify's "strict"
// output — apostrophes dropped, other non-alphanumeric runs collapsed to a
// single hyphen). e.g. "Newton's Laws" -> "newtons-laws".
export const topicSlug = (value = "") =>
  String(value)
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// { label, slug } pairs for the editor's <datalist>.
export const topicOptions = (category) =>
  (topicSuggestions[category] || []).map((label) => ({
    label,
    slug: topicSlug(label)
  }));

export const isValidTutorialCategory = (category) =>
  tutorialCategoryList.includes(String(category || "").toLowerCase());

// A clean topic is simply a non-empty kebab-case slug.
export const isCleanTopicSlug = (topic) =>
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(topic || ""));
