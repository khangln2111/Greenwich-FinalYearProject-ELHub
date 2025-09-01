import apiClient from "../../api-client/apiClient";
import { UserDashboardVm } from "./userDashboard.types";

const BASE_URL = "/UserDashboard";

export const getUserDashboard = async () => {
  const response = await apiClient.get<UserDashboardVm>(`${BASE_URL}/overview`);
  return response.data;
};
