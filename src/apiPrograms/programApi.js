// Training programmes (e.g. Youth Tech Hub) — public side. apiRequest sends
// the student's token when they're logged in, so the server can show their
// own registration status and register them with their account's email.
import { apiRequest } from "../utils/apiClient";

const enc = encodeURIComponent;

export const getActiveProgram = () => apiRequest("/programs/active", { auth: false });
export const getProgram = (slug) => apiRequest(`/programs/${enc(slug)}`);
export const applyToProgram = (slug, body) =>
  apiRequest(`/programs/${enc(slug)}/apply`, { method: "POST", body });
// Accepted student on a paid form: start the Paystack checkout.
export const payProgramFee = (slug) =>
  apiRequest(`/programs/${enc(slug)}/pay`, { method: "POST" });
