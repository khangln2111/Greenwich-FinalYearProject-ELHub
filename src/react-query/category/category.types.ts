export interface Category {
  id: string;
  name: string;
  description: string | null;
  courseCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryCommand {
  name: string;
  description?: string | null;
}

export interface UpdateCategoryCommand {
  id: string;
  name?: string;
  description?: string | null;
}

export interface CategoryQueryCriteria {
  page?: number;
  pageSize?: number;
  name?: string;
}
