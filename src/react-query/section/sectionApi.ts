import apiClient from "../../http-client/apiClient";
import { CreateSectionCommand, ReorderSectionCommand, UpdateSectionCommand } from "./section.types";

const BASE_URL = "/sections";

export const reorderSection = async (command: ReorderSectionCommand) => {
  const response = await apiClient.put(`${BASE_URL}/ReorderSection`, command);
  return response.data;
};

export const createSection = async (command: CreateSectionCommand) => {
  const response = await apiClient.post(`${BASE_URL}`, command);
  return response.data;
};

export const updateSection = async (command: UpdateSectionCommand) => {
  const response = await apiClient.put(`${BASE_URL}`, command);
  return response.data;
};

export const deleteSection = async (id: string) => {
  const response = await apiClient.delete(`${BASE_URL}/${id}`);
  return response.data;
};
