import { apiRequest, BASE } from "../utils/apiClient";

// File uploads need multipart/form-data, not JSON, so this bypasses the
// shared apiRequest helper (which always JSON-encodes) and does its own
// fetch — the browser sets the correct multipart boundary automatically
// as long as we don't manually set a Content-Type header.
export const uploadMaterial = async ({ file, pastedText, title, subject, courseCode, questionCount }) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();

  if (file) formData.append("file", file);
  if (pastedText) formData.append("pastedText", pastedText);
  if (title) formData.append("title", title);
  if (subject) formData.append("subject", subject);
  if (courseCode) formData.append("courseCode", courseCode);
  formData.append("questionCount", questionCount || 10);

  const res = await fetch(`${BASE}/materials/upload`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error((data && data.message) || "Upload failed");
  }

  return data;
};

export const listMaterials = async () => {
  return apiRequest("/materials", { auth: true });
};

export const getMaterialQuiz = async (materialId) => {
  return apiRequest(`/materials/${materialId}/quiz`, { auth: true });
};

export const deleteMaterial = async (materialId) => {
  return apiRequest(`/materials/${materialId}`, { method: "DELETE", auth: true });
};
