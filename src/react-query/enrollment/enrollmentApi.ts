import { ListData } from "../../http-client/api.types";
import apiClient from "../../http-client/apiClient";
import { EnrollmentVm } from "./enrollment.types";

const BASE_URL = "/enrollments";

export const getEnrollmentsSelf = async () => {
  const response = await apiClient.get<ListData<EnrollmentVm>>(`${BASE_URL}/self`);
  return response.data;
};
