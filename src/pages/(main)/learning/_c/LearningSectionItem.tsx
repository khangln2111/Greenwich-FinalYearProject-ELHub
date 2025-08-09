import { Collapse } from "@mantine/core";
import { ChevronDown, ChevronRight } from "lucide-react";
import { LearningSectionVm } from "../../../../features/section/section.types";
import { LearningLectureVm } from "../../../../features/lecture/lecture.types";
import { formatDuration } from "../../../../utils/format";
import LearningLectureItem from "./LearningLectureItem";

interface LearningSectionItemProps {
  section: LearningSectionVm;
  opened: boolean;
  toggleSection: (sectionId: string) => void;
  allLectures: (LearningLectureVm & { sectionTitle: string })[];
  currentLectureIndex: number;
  onLectureClick: (lectureIndex: number) => void;
  onLectureComplete?: (lectureId: string) => void;
}

export default function LearningSectionItem({
  section,
  opened,
  toggleSection,
  allLectures,
  currentLectureIndex,
  onLectureClick,
  onLectureComplete,
}: LearningSectionItemProps) {
  return (
    <div>
      <button
        onClick={() => toggleSection(section.id)}
        className="w-full flex items-start justify-between text-left px-3 py-4 bg-gray-2 dark:bg-dark-6"
      >
        <div className="flex flex-col items-start gap-3">
          <span className="font-semibold text-md leading-none">{`Section ${
            section.order + 1
          }: ${section.title.trim()}`}</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {section.lectures?.length} lectures ·{" "}
            {formatDuration({ seconds: section.durationInSeconds, formatType: "mm:ss" })}
          </span>
        </div>
        {opened ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>

      <Collapse in={opened} transitionTimingFunction="linear">
        <ul>
          {section.lectures?.map((lecture, index) => {
            const lectureIndex = allLectures.findIndex((l) => l.id === lecture.id);
            const isActive = lectureIndex === currentLectureIndex;

            return (
              <LearningLectureItem
                key={lecture.id}
                lecture={lecture}
                index={index}
                lectureIndex={lectureIndex}
                isActive={isActive}
                onLectureClick={onLectureClick}
                onLectureComplete={onLectureComplete}
              />
            );
          })}
        </ul>
      </Collapse>
    </div>
  );
}
