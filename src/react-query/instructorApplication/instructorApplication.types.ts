import { BaseQueryCriteria } from "../../http-client/api.types";

export interface CreateInstructorApplicationCommand {
  displayName: string;
  professionalTitle: string;
  about: string;
  workAvatar: File;
}

export interface RetryInstructorApplicationCommand {
  displayName?: string;
  professionalTitle?: string;
  about?: string;
  workAvatar?: File;
}

export interface ReviewInstructorApplicationCommand {
  id: string;
  isApproved: boolean;
  note: string;
}

export interface InstructorApplicationVm {
  id: string;
  email: string;
  displayName: string;
  fullName: string;
  professionalTitle: string;
  about: string;
  retryCount: number;
  workAvatarUrl?: string;
  status: InstructorApplicationStatus;
  createdAt: string;
  reviewedAt?: string;
  lastRejectedAt?: string;
  note: string;
}

export type InstructorApplicationOrderableFields =
  | "createdAt"
  | "displayName"
  | "professionalTitle"
  | "status"
  | "reviewedAt";

export interface InstructorApplicationQueryCriteria
  extends BaseQueryCriteria<InstructorApplicationOrderableFields> {
  search?: string;
  status?: InstructorApplicationStatus;
}

export enum InstructorApplicationStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}
