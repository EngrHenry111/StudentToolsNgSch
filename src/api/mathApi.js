// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_URL;

import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://studenttoolsserver.onrender.com"; // fallback

export const solveMathApi = async (problem) => {
  const res = await axios.post(`${BASE_URL}/api/math/solve`, { problem });
  return res.data;
};

export const getMathHistoryApi = async () => {
  const res = await axios.get(`${BASE_URL}/api/math/history`);
  return res.data;
};

export const getQuizQuestionApi = async (topic, difficulty) => {
  const res = await axios.get(
    `${BASE_URL}/api/quiz/question?topic=${topic}&difficulty=${difficulty}`
  );
  return res.data;
};

export const submitQuizApi = async (payload) => {
  const res = await axios.post(`${BASE_URL}/api/quiz/submit`, payload);
  return res.data;
};

export const getLeaderboardApi = async () => {
  const res = await axios.get(`${BASE_URL}/api/quiz/leaderboard`);
  return res.data;
};

