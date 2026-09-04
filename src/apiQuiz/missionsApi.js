import { apiRequest } from "../utils/apiClient";

export const getTodaysMissions = async () => {
  return apiRequest("/missions/today", { auth: true });
};
