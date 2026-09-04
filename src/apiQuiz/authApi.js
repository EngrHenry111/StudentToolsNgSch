import { apiRequest } from "../utils/apiClient";

export const registerUser = async (data) => {
  return apiRequest("/auth/register", { method: "POST", body: data, auth: false });
};

export const loginUser = async (data) => {
  return apiRequest("/auth/login", { method: "POST", body: data, auth: false });
};

export const logoutUser = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  return apiRequest("/auth/logout", {
    method: "POST",
    body: { token: refreshToken },
    auth: false
  });
};

export const getReferralLeaderboard = async () => {
  return apiRequest("/auth/referral-leaderboard", { auth: false });
};

export const getMe = async () => {
  return apiRequest("/auth/me", { auth: true });
};

export const updateNotificationPreferences = async (streakReminders) => {
  return apiRequest("/auth/notification-preferences", {
    method: "PUT",
    body: { streakReminders },
    auth: true
  });
};

export const googleAuth = async (credential) => {
  return apiRequest("/auth/google", { method: "POST", body: { credential }, auth: false });
};

export const forgotPassword = async (email) => {
  return apiRequest("/auth/forgot-password", { method: "POST", body: { email }, auth: false });
};

export const resetPassword = async (token, password) => {
  return apiRequest(`/auth/reset-password/${token}`, { method: "POST", body: { password }, auth: false });
};
