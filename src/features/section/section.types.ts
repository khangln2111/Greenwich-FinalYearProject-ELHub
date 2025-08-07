import { LearningLectureVm, LectureVm } from "../lecture/lecture.types";

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

export type LearningSectionVm = {
  id: string;
  title: string;
  description: string;
  lectureCount: number;
  durationInSeconds: number;
  courseId: string;
  lectures: LearningLectureVm[] | null;
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
