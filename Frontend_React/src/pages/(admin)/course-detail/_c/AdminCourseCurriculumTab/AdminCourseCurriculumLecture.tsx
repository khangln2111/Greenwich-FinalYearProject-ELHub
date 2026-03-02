import { Button, Text } from "@mantine/core";
import { Video } from "lucide-react";
import { LectureVm } from "../../../../../features/lecture/lecture.types";
import { formatDuration } from "../../../../../utils/format";

type AdminCourseCurriculumLectureProps = {
  lecture: LectureVm;
  lectureIndex?: number;
  onPreview: (videoUrl: string) => void;
};

export const AdminCourseCurriculumLecture = ({
  lecture,
  onPreview,
}: AdminCourseCurriculumLectureProps) => (
  <li className="flex items-center justify-between gap-3">
    <div className="flex items-center gap-3">
      <Video size={20} className="text-blue-500 shrink-0" />
      <span className="md:text-lg">{`${lecture.title.trim()}`}</span>
    </div>
    <div className="flex items-center gap-2 shrink-0">
      <Button
        variant="default"
        size="compact-sm"
        className="text-primary-4 dark:text-primary-8"
        onClick={() => onPreview(lecture.videoUrl)}
      >
        Preview
      </Button>
      <Text className="text-dimmed text-nowrap">
        {formatDuration({
          seconds: lecture.durationInSeconds,
          formatType: "mm:ss",
        })}
      </Text>
    </div>
  </li>
);
