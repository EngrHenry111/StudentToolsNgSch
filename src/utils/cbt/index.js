// JAMB-style CBT practice: subjects, question banks and the exam engine.
// Banks are original questions (see the subject files); nothing here is
// copied from JAMB past papers.
import { MATHEMATICS } from "./mathematics.js";
import { PHYSICS } from "./physics.js";
import { CHEMISTRY } from "./chemistry.js";
import { BIOLOGY } from "./biology.js";

export const SUBJECTS = [
  { slug: "mathematics", name: "Mathematics", bank: MATHEMATICS },
  { slug: "physics", name: "Physics", bank: PHYSICS },
  { slug: "chemistry", name: "Chemistry", bank: CHEMISTRY },
  { slug: "biology", name: "Biology", bank: BIOLOGY }
];

export const subjectBySlug = (slug) => SUBJECTS.find((s) => s.slug === slug) || null;

// The UTME gives 2 hours for 180 questions: 40 seconds a question.
export const SECONDS_PER_QUESTION = 40;
export const LETTERS = ["A", "B", "C", "D"];

// Topics in the order they first appear in the bank, with question counts.
export function topicsOf(bank) {
  const map = new Map();
  for (const q of bank) map.set(q.t, (map.get(q.t) || 0) + 1);
  return [...map].map(([name, count]) => ({ name, count }));
}

function shuffle(list, rand) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Picks `count` questions (optionally from one topic or a list of ids),
// shuffles their order and their options. `answer` is the index of the
// correct option after shuffling.
export function buildExam(bank, { count, topic, ids, rand = Math.random } = {}) {
  let pool = bank;
  if (ids) pool = bank.filter((q) => ids.includes(q.id));
  else if (topic) pool = bank.filter((q) => q.t === topic);
  const picked = shuffle(pool, rand).slice(0, count || pool.length);
  return picked.map((q) => {
    const order = shuffle([0, 1, 2, 3].slice(0, q.o.length), rand);
    return {
      id: q.id,
      topic: q.t,
      question: q.q,
      options: order.map((i) => q.o[i]),
      answer: order.indexOf(q.a),
      explanation: q.x
    };
  });
}

// answers: { [questionIndex]: optionIndex }
export function gradeExam(exam, answers) {
  let correct = 0;
  const byTopic = new Map();
  const wrongIds = [];
  exam.forEach((q, i) => {
    const t = byTopic.get(q.topic) || { topic: q.topic, correct: 0, total: 0 };
    t.total++;
    if (answers[i] === q.answer) {
      correct++;
      t.correct++;
    } else wrongIds.push(q.id);
    byTopic.set(q.topic, t);
  });
  const answered = exam.filter((_, i) => answers[i] !== undefined).length;
  return {
    correct,
    total: exam.length,
    answered,
    percent: exam.length ? Math.round((correct / exam.length) * 100) : 0,
    topics: [...byTopic.values()].sort((a, b) => a.correct / a.total - b.correct / b.total),
    wrongIds
  };
}

export const formatClock = (s) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, "0")}`;
};
