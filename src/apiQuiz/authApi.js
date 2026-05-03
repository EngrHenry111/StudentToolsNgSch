const BASE = "https://studenttoolsserver.onrender.com/api/auth";

export const registerUser = async (data) => {
  const res = await fetch(`${BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const logoutUser = async () => {
  const res = await fetch(`${BASE}/logout`, {
    method: "POST"
  });
  return res.json();
};