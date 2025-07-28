import { BaseQueryCriteria } from "../../http-client/api.types";

export interface ReviewVm {
  id: string;
  content: string;
  rating: number;
  userFullName: string;
  userAvatarUrl: string | null;
  createdAt: string;
  reply: ReviewReplyVm | null;
  updatedAt: string;
}

export interface ReviewReplyVm {
  id: string;
  content: string;
  creatorFullName: string;
  creatorAvatarUrl: string | null;
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

export interface UpdateReviewReplyCommand {
  id: string;
  content: string;
}

export type ReviewOrderableFields = keyof ReviewVm;

export interface ReviewQueryCriteria extends BaseQueryCriteria<ReviewOrderableFields> {
  rating?: number | null;
  content?: string | null;
  isReplied?: boolean | null;
}
