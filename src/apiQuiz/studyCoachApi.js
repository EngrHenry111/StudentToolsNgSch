import { apiRequest } from "../utils/apiClient";

export const getStudyCoachOverview = async () => {
  return apiRequest("/study-coach/overview", { auth: true });
};
