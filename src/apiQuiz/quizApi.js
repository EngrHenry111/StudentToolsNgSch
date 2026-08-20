import { apiRequest } from "../utils/apiClient";

// ---------- Pro quiz (authenticated) ----------

export const getAIQuiz = async (subject, topic, limit = 5) => {
  const params = new URLSearchParams({ subject, topic, limit });
  return apiRequest(`/quiz/ai-quiz?${params.toString()}`, { auth: true });
};

export const getAdaptiveQuiz = async (limit = 10) => {
  return apiRequest(`/quiz/adaptive?limit=${limit}`, { auth: true });
};

export const getMixedQuiz = async (limit = 10) => {
  return apiRequest(`/quiz/ai-mixed?limit=${limit}`, { auth: true });
};

export const getPastQuestions = async (examBody, subject, topic, limit = 10) => {
  const params = new URLSearchParams({ limit });
  if (examBody) params.set("examBody", examBody);
  if (subject) params.set("subject", subject);
  if (topic) params.set("topic", topic);
  return apiRequest(`/quiz/past-questions?${params.toString()}`, { auth: true });
};

export const submitAIQuiz = async (answers) => {
  return apiRequest("/quiz/ai-quiz/submit", {
    method: "POST",
    body: { answers },
    auth: true
  });
};

export const getAnalytics = async () => {
  return apiRequest("/quiz/analytics", { auth: true });
};

export const getLeaderboardXP = async () => {
  return apiRequest("/quiz/leaderboard-xp", { auth: true });
};

// ---------- Free practice quiz (no login required) ----------

export const getFreeLeaderboard = async () => {
  return apiRequest("/quiz/leaderboard", { auth: false });
};
