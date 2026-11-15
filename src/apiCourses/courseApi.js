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

export const playLesson = (slug, lessonId) =>
  apiRequest(`/courses/${slug}/lessons/${lessonId}/play`, { auth: true });

export const claimCourseAccess = (slug, token) =>
  apiRequest(`/courses/${slug}/claim`, { method: "POST", body: { token }, auth: true });

export const purchaseCourse = (slug) =>
  apiRequest(`/courses/${slug}/purchase`, { method: "POST", auth: true });

export const setLessonComplete = (slug, lessonId, completed) =>
  apiRequest(`/courses/${slug}/lessons/${lessonId}/complete`, { method: "POST", body: { completed }, auth: true });

export const getMyCourses = () => apiRequest("/courses/me/enrolled", { auth: true });
