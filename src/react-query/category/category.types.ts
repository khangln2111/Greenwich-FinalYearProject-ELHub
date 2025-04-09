export interface Category {
  id: string;
  name: string;
  description: string | null;
  courseCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string | null;
}

export interface UpdateCategoryRequest {
  id: string;
  name?: string;
  description?: string | null;
}

export interface CategoryQueryCriteria {
  page?: number;
  pageSize?: number;
  name?: string;
}
