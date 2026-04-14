import { useState } from "react";
import { solveMathApi } from "../api/mathApi";

export const useMathSolver = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const solve = async (problem) => {
  try {
    console.log("🚀 Sending:", problem);

    setLoading(true);
    setError(null);

    const data = await solveMathApi(problem);

    console.log("✅ Response:", data);

    setResult(data);

  } catch (err) {
    console.error("❌ Error:", err);
    setError(err.response?.data?.message || "Error solving problem");
  } finally {
    console.log("⏹ Done loading");
    setLoading(false);
  }
};

  return { solve, result, loading, error };
};