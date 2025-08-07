import { ApiSuccessResponse, ListData } from "../../api-client/api.types";
import apiClient from "../../api-client/apiClient";
import { EnrollFromInventoryCommand, EnrollmentVm } from "./enrollment.types";

const BASE_URL = "/enrollments";

export const getEnrollmentsSelf = async () => {
  const response = await apiClient.get<ListData<EnrollmentVm>>(`${BASE_URL}/self`);
  return response.data;
};

export const enrollFromInventory = async (command: EnrollFromInventoryCommand) => {
  const response = await apiClient.post<ApiSuccessResponse>(
    `${BASE_URL}/EnrollFromInventory`,
    command,
  );

  return response.data;
};
