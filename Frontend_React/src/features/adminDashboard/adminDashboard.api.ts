import apiClient from "../../api-client/apiClient";
import { AdminDashboardVm } from "./adminDashboard.types";

const BASE_URL = "/AdminDashboard";

export const getAdminDashboard = async () => {
  const response = await apiClient.get<AdminDashboardVm>(`${BASE_URL}/overview`);
  return response.data;
};
