import { apiRequest } from "../utils/apiClient";

export const saveCareerProfile = async ({ careerGoal, currentSkills, interests }) => {
  return apiRequest("/career/profile", {
    method: "POST",
    body: { careerGoal, currentSkills, interests },
    auth: true
  });
};

export const getCareerProfile = async () => {
  return apiRequest("/career/profile", { auth: true });
};
