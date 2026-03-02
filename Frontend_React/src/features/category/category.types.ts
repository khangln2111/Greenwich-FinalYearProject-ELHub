import { BaseQueryCriteria } from "../../api-client/api.types";

export interface CategoryVm {
  id: string;
  name: string;
  courseCount: number;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryCommand {
  name: string;
  image: File;
}

export interface UpdateCategoryCommand {
  id: string;
  name?: string;
  image?: File;
}

export type CategoryOrderableFields = "createdAt" | "updatedAt" | "name" | "courseCount";

export interface CategoryQueryCriteria extends BaseQueryCriteria<CategoryOrderableFields> {
  name?: string | null;
}
