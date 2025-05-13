import axios from "axios";
import { CreateSectionCommand, ReorderSectionCommand, UpdateSectionCommand } from "./section.types";

const BASE_URL = "/sections";

export const reorderSection = async (command: ReorderSectionCommand) => {
  const response = await axios.put(`${BASE_URL}/ReorderSection`, command);
  return response.data;
};

export const createSection = async (section: CreateSectionCommand) => {
  const response = await axios.post(`${BASE_URL}`, section);
  return response.data;
};

export const updateSection = async (section: UpdateSectionCommand) => {
  const response = await axios.put(`${BASE_URL}`, section);
  return response.data;
};

export const deleteSection = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
