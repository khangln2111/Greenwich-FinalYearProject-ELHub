import apiClient from "../../api-client/apiClient";
import {
  InstructorDashboardRevenueSalesVm,
  InstructorDashboardTrendsVm,
  InstructorDashboardVm,
} from "./instructorDashboard.types";

const BASE_URL = "/InstructorDashboard";

export const getInstructorDashboardOverview = async () => {
  const response = await apiClient.get<InstructorDashboardVm>(`${BASE_URL}/overview`);
  return response.data;
};

export const getInstructorDashboardTrends = async (startDate: string, endDate: string) => {
  const response = await apiClient.get<InstructorDashboardTrendsVm>(`${BASE_URL}/trends`, {
    params: { startDate, endDate },
  });
  return response.data;
};

export const getInstructorDashboardRevenueSales = async (startDate: string, endDate: string) => {
  const response = await apiClient.get<InstructorDashboardRevenueSalesVm>(
    `${BASE_URL}/RevenueSales`,
    {
      params: { startDate, endDate },
    },
  );
  return response.data;
};
