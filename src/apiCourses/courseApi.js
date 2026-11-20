// Video courses (Youth Tech Hub etc.) — student side.
// Same apiRequest wrapper as the marketplace: auth:true sends the user's
// token when present, which is how the server decides access.
import { apiRequest } from "../utils/apiClient";

export const listCourses = () => apiRequest("/courses", { auth: false });

// Like getListingBySlug: if the session can't be refreshed, fall back to
// the public view instead of erroring.
export const getCourse = async (slug) => {
  try {
    return await apiRequest(`/courses/${slug}`, { auth: true });
  } catch (err) {
    if (err.message === "Session expired. Please log in again.") {
      return apiRequest(`/courses/${slug}`, { auth: false });
    }
    throw err;
  }
};

// A stable random id for this browser, used for "one device at a time".
// Falls back to a per-tab id if storage is blocked (private mode etc.).
let memoryDeviceId = null;
const randomId = () =>
  (crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`).replace(/[^A-Za-z0-9_-]/g, "");

export const getDeviceId = () => {
  try {
    let id = localStorage.getItem("stng-device-id");
    if (!id) {
      id = randomId();
      localStorage.setItem("stng-device-id", id);
    }
    return id;
  } catch {
    memoryDeviceId = memoryDeviceId || randomId();
    return memoryDeviceId;
  }
};

// takeover=true moves playback to this device and stops it on the other one.
export const playLesson = (slug, lessonId, { takeover = false } = {}) => {
  const qs = new URLSearchParams({ device: getDeviceId() });
  if (takeover) qs.set("takeover", "1");
  return apiRequest(`/courses/${slug}/lessons/${lessonId}/play?${qs}`, { auth: true });
};

export const watchHeartbeat = () =>
  apiRequest("/courses/watch/heartbeat", { method: "POST", body: { deviceId: getDeviceId() }, auth: true });

// Fire-and-forget on leaving the page; keepalive lets it finish after unload.
export const releaseWatch = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("https://studenttoolsserver.onrender.com/api/courses/watch/release", {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ deviceId: getDeviceId() })
    }).catch(() => {});
  } catch { /* storage blocked */ }
};

export const claimCourseAccess = (slug, token) =>
  apiRequest(`/courses/${slug}/claim`, { method: "POST", body: { token }, auth: true });

export const purchaseCourse = (slug) =>
  apiRequest(`/courses/${slug}/purchase`, { method: "POST", auth: true });

export const setLessonComplete = (slug, lessonId, completed) =>
  apiRequest(`/courses/${slug}/lessons/${lessonId}/complete`, { method: "POST", body: { completed }, auth: true });

export const getMyCourses = () => apiRequest("/courses/me/enrolled", { auth: true });

// Live class link: only answers for students with access, only while live.
export const getLiveClass = (slug) => apiRequest(`/courses/${slug}/live`, { auth: true });
