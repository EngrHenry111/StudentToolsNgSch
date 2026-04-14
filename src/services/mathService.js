import axios from "axios";

const API = axios.create({
  baseURL: "https://studenttoolsserver.onrender.com/api/math",
});

export const solveMath = async (problem) => {
  const { data } = await API.post("/solve", { problem });
  return data;
};