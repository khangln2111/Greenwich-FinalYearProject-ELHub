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
