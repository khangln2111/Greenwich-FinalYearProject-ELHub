import { BaseQueryCriteria } from "../../api-client/api.types";

export interface InstructorVm {
  id: string;
  name: string;
  avatarUrl: string | null;
  professionalTitle: string | null;
  favoriteQuote: string | null;
  favoriteQuoteCite: string | null;
  about: string | null;
  averageRating: number;
  reviewCount: number;
  courseCount: number;
  studentCount: number;
  email: string;
}

export type InstructorOrderableFields =
  | "createdAt"
  | "updatedAt"
  | "averageRating"
  | "name"
  | "courseCount"
  | "studentCount";

export interface InstructorQueryCriteria extends BaseQueryCriteria<InstructorOrderableFields> {
  professionalTitle?: string | null;
  reviewCount?: number | null;
  courseCount?: number | null;
  studentCount?: number | null;
  minRating?: number | null;
  maxRating?: number | null;
  search?: string | null;
}
