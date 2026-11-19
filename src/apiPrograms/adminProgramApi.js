// Training programmes — admin side. Uses the admin axios instance (adminToken).
import API from "../services/api";

const d = (p) => p.then((r) => r.data);

export const adminListPrograms = () => d(API.get("/programs/admin/all"));
export const adminCreateProgram = (body) => d(API.post("/programs/admin", body));
export const adminGetProgram = (id) => d(API.get(`/programs/admin/${id}`));
export const adminUpdateProgram = (id, body) => d(API.put(`/programs/admin/${id}`, body));
export const adminListApplications = (id, { status = "all", batch = "all" } = {}) =>
  d(API.get(`/programs/admin/${id}/applications`, { params: { status, batch } }));
export const adminDecideApplications = (id, ids, action, sendEmail = true) =>
  d(API.post(`/programs/admin/${id}/applications/decide`, { ids, action, sendEmail }));
export const adminTestEmail = (to) => d(API.post("/programs/admin/email-test", { to }));
export const adminResendAccepted = (id, appId) =>
  d(API.post(`/programs/admin/${id}/applications/${appId}/resend`));
// Sponsor logo image → { url } (Cloudinary). Saved with the settings form.
export const adminUploadLogo = (file) => {
  const fd = new FormData();
  fd.append("logo", file);
  return d(API.post("/programs/admin/logo", fd));
};
