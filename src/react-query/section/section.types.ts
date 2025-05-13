import { LectureVm } from "../lecture/lecture.types";

export type SectionVm = {
  id: string;
  title: string;
  description: string;
  lectureCount: number;
  durationInSeconds: number;
  courseId: string;
  lectures?: LectureVm[];
};

export type ReorderSectionCommand = {
  id: string;
  newCourseId: string;
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
