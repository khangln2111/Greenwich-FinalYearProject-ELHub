import apiClient from "../../api-client/apiClient";
import { InstructorDashboardVm } from "./instructorDashboard.types";

const BASE_URL = "/InstructorDashboard";

export const getInstructorDashboardOverview = async () => {
  const response = await apiClient.get<InstructorDashboardVm>(`${BASE_URL}/overview`);
  return response.data;
};
