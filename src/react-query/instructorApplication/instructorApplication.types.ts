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

type InstructorApplicationSortableFields =
  | "createdAt"
  | "displayName"
  | "professionalTitle"
  | "status"
  | "reviewedAt";

export interface InstructorApplicationQueryCriteria {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: InstructorApplicationStatus;
  orderBy?: {
    field: InstructorApplicationSortableFields;
    direction: "asc" | "desc";
  };
}

export enum InstructorApplicationStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}
