import { Collapse } from "@mantine/core";
import { ChevronDown, ChevronRight } from "lucide-react";
import LearningLectureItem from "./LearningLectureItem";
import { LectureVm } from "../../../../features/lecture/lecture.types";
import { SectionVm } from "../../../../features/section/section.types";
import { formatDuration } from "../../../../utils/format";

interface SectionItemProps {
  section: SectionVm;
  isOpen: boolean;
  toggleSection: () => void;
  currentLectureId: string;
  completed: Set<string>;
  allLectures: (LectureVm & { sectionTitle: string })[];
  onLectureClick: (lectureId: string) => void;
  toggleComplete: (lectureId: string) => void;
}

export default function LearningSectionItem({
  section,
  isOpen,
  toggleSection,
  currentLectureId,
  completed,
  allLectures,
  onLectureClick,
  toggleComplete,
}: SectionItemProps) {
  return (
    <div>
      <button
        onClick={toggleSection}
        className="w-full flex items-start justify-between text-left px-3 py-4 bg-gray-2 dark:bg-dark-6"
      >
        <div className="flex flex-col items-start gap-3">
          <span className="font-semibold text-md leading-none">
            Section {section.order + 1}: {section.title.trim()}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {section.lectures?.length ?? 0} lectures ·{" "}
            {formatDuration({
              seconds: section.durationInSeconds,
              formatType: "mm:ss",
            })}
          </span>
        </div>
        {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      <Collapse in={isOpen} transitionTimingFunction="linear">
        <ul>
          {section.lectures?.map((lecture) => {
            const lectureIndex = allLectures.findIndex((l) => l.id === lecture.id);
            return (
              <LearningLectureItem
                key={lecture.id}
                lecture={lecture}
                isActive={lecture.id === currentLectureId}
                isDone={completed.has(lecture.id)}
                onClick={() => onLectureClick(lecture.id)}
                onToggleComplete={() => toggleComplete(lecture.id)}
              />
            );
          })}
        </ul>
      </Collapse>
    </div>
  );
}
