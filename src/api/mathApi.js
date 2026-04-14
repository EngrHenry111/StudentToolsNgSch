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

// export const solveMathApi = async (problem) => {
//     const res = await axios.post(
//   `${BASE_URL}/api/math/solve`,
//   { problem },
//   { timeout: 10000 } // 🔥 add this
// );
// //   const res = await axios.post(`${BASE_URL}/api/math/solve`, { problem });
//   return res.data;
// };


// export const getMathHistoryApi = async () => {
//   const res = await axios.get(`${BASE_URL}/api/math/history`);
//   return res.data;
// };