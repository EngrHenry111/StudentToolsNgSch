import { apiRequest } from "../utils/apiClient";

export const getInstitutions = async () => {
  return apiRequest("/institutions", { auth: false });
};

export const saveCampusProfile = async (profile) => {
  return apiRequest("/institutions/campus-profile", { method: "POST", body: profile, auth: true });
};
