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

export const getMe = async () => {
  return apiRequest("/auth/me", { auth: true });
};
