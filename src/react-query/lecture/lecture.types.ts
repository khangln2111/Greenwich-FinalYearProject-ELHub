export type LectureVm = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  durationInSeconds: number;
  sectionId: string;
  preview: boolean;
  order: number;
};

export type LearningLectureVm = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  durationInSeconds: number;
  sectionId: string;
  preview: boolean;
  order: number;
  completed: boolean;
};

export interface CreateLectureCommand {
  sectionId: string;
  title: string;
  description: string;
  preview: boolean;
  video: File;
}

export interface UpdateLectureCommand {
  id: string;
  title?: string;
  description?: string;
  video?: File;
  preview?: boolean;
}

export interface ReorderLectureCommand {
  id: string;
  newOrder: number;
  newSectionId: string;
}
