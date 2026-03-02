import apiClient from "../../api-client/apiClient";

const BASE_URL = "/CourseRecommendation";

export const createChatSession = async () => {
  const response = await apiClient.post<{ sessionId: string }>(`${BASE_URL}/chat-session`);
  return response.data.sessionId;
};
