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

export interface CategoryQueryCriteria {
  page?: number;
  pageSize?: number;
  name?: string;
}
