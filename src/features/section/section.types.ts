import { EnrollmentLectureVm as EnrollmentLectureVm, LectureVm } from "../lecture/lecture.types";

export type SectionVm = {
  id: string;
  title: string;
  description: string;
  lectureCount: number;
  durationInSeconds: number;
  courseId: string;
  lectures: LectureVm[];
  order: number;
};

export type EnrollmentSectionVm = {
  id: string;
  title: string;
  description: string;
  lectureCount: number;
  durationInSeconds: number;
  courseId: string;
  lectures: EnrollmentLectureVm[] | null;
  order: number;
};

export type ReorderSectionCommand = {
  id: string;
  newOrder: number;
};

export type CreateSectionCommand = {
  title: string;
  description: string;
  courseId: string;
};

export type UpdateSectionCommand = {
  id: string;
  title?: string;
  description?: string;
};
