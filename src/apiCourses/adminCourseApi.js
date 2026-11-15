// Video courses — admin side. Uses the admin axios instance (adminToken).
import API from "../services/api";

const d = (p) => p.then((r) => r.data);

export const adminListCourses = () => d(API.get("/courses/admin/all"));
export const adminGetCourse = (id) => d(API.get(`/courses/admin/${id}`));
export const adminCreateCourse = (body) => d(API.post("/courses/admin", body));
export const adminUpdateCourse = (id, body) => d(API.put(`/courses/admin/${id}`, body));

export const adminListLessons = (id) => d(API.get(`/courses/admin/${id}/lessons`));
export const adminCreateLesson = (id, body) => d(API.post(`/courses/admin/${id}/lessons`, body));
export const adminUpdateLesson = (lessonId, body) => d(API.put(`/courses/admin/lessons/${lessonId}`, body));
export const adminDeleteLesson = (lessonId) => d(API.delete(`/courses/admin/lessons/${lessonId}`));
export const adminLessonUpload = (lessonId, replace = false) =>
  d(API.post(`/courses/admin/lessons/${lessonId}/upload`, { replace }));
export const adminPlayLesson = (lessonId) => d(API.get(`/courses/admin/lessons/${lessonId}/play`));

export const adminListApprovals = (id) => d(API.get(`/courses/admin/${id}/approvals`));
export const adminAddApprovals = (id, body) => d(API.post(`/courses/admin/${id}/approvals`, body));
export const adminResendApproval = (id, approvalId) =>
  d(API.post(`/courses/admin/${id}/approvals/${approvalId}/resend`));
export const adminRemoveApproval = (id, approvalId) =>
  d(API.delete(`/courses/admin/${id}/approvals/${approvalId}`));

export const adminListOrders = (id) => d(API.get(`/courses/admin/${id}/orders`));
