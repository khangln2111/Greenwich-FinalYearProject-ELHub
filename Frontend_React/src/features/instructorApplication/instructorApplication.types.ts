import { BaseQueryCriteria } from "../../api-client/api.types";

export interface CreateInstructorApplicationCommand {
  firstName: string;
  lastName: string;
  professionalTitle: string;
  about: string;
  avatar: File;
}

export interface ResubmitInstructorApplicationCommand {
  firstName?: string;
  lastName?: string;
  professionalTitle?: string;
  about?: string;
  avatar?: File;
}

export interface InstructorApplicationRetryInfoVm {
  canRetry: boolean;
  retryRemaining: number;
  retryAvailableAt: string | null;
}

export interface ModerateInstructorApplicationCommand {
  id: string;
  isApproved: boolean;
  note: string;
}

export interface InstructorApplicationVm {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  professionalTitle: string;
  about: string;
  retryCount: number;
  avatarUrl?: string;
  status: InstructorApplicationStatus;
  createdAt: string;
  reviewedAt?: string;
  lastRejectedAt?: string;
  note: string;
}

export interface InstructorApplicationDetailVm {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  professionalTitle: string;
  about: string;
  retryCount: number;
  avatarUrl?: string;
  status: InstructorApplicationStatus;
  createdAt: string;
  reviewedAt?: string;
  lastRejectedAt?: string;
  note: string;
}

export type InstructorApplicationOrderableFields =
  | "createdAt"
  | "fullName"
  | "professionalTitle"
  | "status"
  | "reviewedAt";

export interface InstructorApplicationQueryCriteria
  extends BaseQueryCriteria<InstructorApplicationOrderableFields> {
  search?: string | null;
  status?: InstructorApplicationStatus | null;
}

export enum InstructorApplicationStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}
