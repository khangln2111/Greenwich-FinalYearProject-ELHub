export type LectureVm = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  durationInSeconds: number;
  sectionId: string;
  preview: boolean;
};

export type ReorderLecture = {
  id: string;
  newOrder: number;
  newSectionId: string;
};

export interface CreateLectureCommand {
  sectionId: string;
  title: string;
  description: string;
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
