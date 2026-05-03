const BASE = "https://studenttoolsserver.onrender.com/api";

export const startPayment = async (token) => {
  const res = await fetch(`${BASE}/paystack/start`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const subscribe = async (token) => {
  const res = await fetch(`${BASE}/paystack/subscribe`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const cancelSubscription = async (token) => {
  const res = await fetch(`${BASE}/paystack/cancel`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const getBilling = async (token) => {
  const res = await fetch(`${BASE}/billing`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};