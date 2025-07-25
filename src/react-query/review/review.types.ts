export interface ReviewVm {
  id: string;
  content: string;
  rating: number;
  userFullName: string;
  avatarUrl: string | null;
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

export interface ReplyToReviewCommand {
  id: string;
  content: string;
}

export interface ReviewQueryCriteria {
  pageIndex?: number;
  pageSize?: number;
  rating?: number;
  content?: string;
}
