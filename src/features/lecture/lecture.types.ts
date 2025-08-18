export type LectureVm = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  durationInSeconds: number;
  sectionId: string;
  isPreview: boolean;
  order: number;
};

export type EnrollmentLectureVm = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  durationInSeconds: number;
  sectionId: string;
  isPreview: boolean;
  order: number;
  completed: boolean;
};

export interface CreateLectureCommand {
  sectionId: string;
  title: string;
  description: string;
  isPreview: boolean;
  video: File;
}

export interface UpdateLectureCommand {
  id: string;
  title?: string;
  description?: string;
  video?: File;
  isPreview?: boolean;
}

export interface ReorderLectureCommand {
  id: string;
  newOrder: number;
  newSectionId: string;
}
