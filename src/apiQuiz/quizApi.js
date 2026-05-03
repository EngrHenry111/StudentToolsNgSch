const BASE = "https://studenttoolsserver.onrender.com/api/quiz";

export const getAdaptiveQuiz = async (token) => {
  const res = await fetch(`${BASE}/adaptive`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const submitAIQuiz = async (payload, token) => {
  const res = await fetch(`${BASE}/submit-ai`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Submission failed");
  }

  return data;
};

export const getAnalytics = async (token) => {
  const res = await fetch(`${BASE}/analytics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};


export const getAIQuiz = async (subject, topic, token) => {
  const res = await fetch(
    `${BASE}/ai-quiz?subject=${subject}&topic=${encodeURIComponent(topic)}&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch quiz");
  }

  return data;
};

// export const getAIQuiz = async (subject, topic, token) => {
//   const res = await fetch(
//     `${BASE}/ai-quiz?subject=${subject}&topic=${topic}&limit=5`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }
//   );

//   return res.json();
// };