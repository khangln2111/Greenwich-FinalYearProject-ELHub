export interface ReviewVm {
  id: string;
  content: string;
  rating: number;
  userFullName: string;
  userAvatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewCommand {
  courseId: string;
  rating: number;
  content: string;
}

export interface UpdateReviewCommand {
  id: string;
  rating?: number;
  content?: string;
}

export interface ReviewQueryCriteria {
  courseId?: string;
  userId?: string;
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}
