import { apiRequest } from "../utils/apiClient";

export const askCourseTutor = async ({ conversationId, courseName, topic, question }) => {
  return apiRequest("/course-tutor/ask", {
    method: "POST",
    body: { conversationId, courseName, topic, question },
    auth: true
  });
};

export const listConversations = async () => {
  return apiRequest("/course-tutor/conversations", { auth: true });
};

export const getConversation = async (id) => {
  return apiRequest(`/course-tutor/conversations/${id}`, { auth: true });
};

export const deleteConversation = async (id) => {
  return apiRequest(`/course-tutor/conversations/${id}`, { method: "DELETE", auth: true });
};
