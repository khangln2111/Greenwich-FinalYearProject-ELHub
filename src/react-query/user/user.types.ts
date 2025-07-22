import { BaseQueryCriteria } from "../../http-client/api.types";

export interface AssignRoleToUserCommand {
  userId: string;
  roles: string[];
}

export interface SetUserActivationCommand {
  userId: string;
  isActive: boolean;
}

export interface UpdateUserCommand {
  id: string;
  firstName?: string;
  lastName?: string;
  avatar?: File;
  dateOfBirth?: string;
  professionalTitle?: string;
}

export interface UserVm {
  professionalTitle: string;
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  avatarUrl?: string;
  roles: string[];
  isActivated: boolean;
  dateOfBirth?: string;
  gender?: string;
}

export type UserOrderableFields = "fullName" | "email" | "dateOfBirth" | "gender| roles";

export interface UserQueryCriteria extends BaseQueryCriteria<UserOrderableFields> {
  search?: string;
  role?: string;
  isActivated?: boolean;
  fullName?: string;
  email?: string;
}
