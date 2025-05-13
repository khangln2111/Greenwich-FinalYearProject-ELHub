import { ApiSuccessResponse } from "../../http-client/api.types";
import apiClient from "../../http-client/axios";
import { CreateLectureCommand, ReorderLectureCommand } from "./lecture.types";

const BASE_URL = "/lectures";

export const reorderLecture = async (command: ReorderLectureCommand) => {
  const response = await apiClient.put<ApiSuccessResponse>(`${BASE_URL}/ReorderLecture`, command);
  return response.data;
};

export const createLecture = async (command: CreateLectureCommand) => {
  const response = await apiClient.post<ApiSuccessResponse>(`${BASE_URL}`, command, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateLecture = async (command: CreateLectureCommand) => {
  const response = await apiClient.put<ApiSuccessResponse>(`${BASE_URL}`, command, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteLecture = async (id: string) => {
  const response = await apiClient.delete<ApiSuccessResponse>(`${BASE_URL}/${id}`);
  return response.data;
};
