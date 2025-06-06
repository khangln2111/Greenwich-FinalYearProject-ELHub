import { Collapse } from "@mantine/core";
import { ChevronDown, ChevronRight } from "lucide-react";
import LearningLectureItem from "./LearningLectureItem";
import { SectionVm } from "../../../react-query/section/section.types";

interface Props {
  section: SectionVm;
  isOpen: boolean;
  toggleOpen: () => void;
  currentLectureId: string;
  completed: Set<string>;
  onSelectLecture: (lectureId: string) => void;
  toggleCompleted: (lectureId: string) => void;
  getSectionDuration: (section: SectionVm) => number;
  formatMinutes: (minutes: number) => string;
}

export default function LearningSectionItem({
  section,
  isOpen,
  toggleOpen,
  currentLectureId,
  completed,
  onSelectLecture,
  toggleCompleted,
  getSectionDuration,
  formatMinutes,
}: Props) {
  return (
    <div key={section.id}>
      <button
        onClick={toggleOpen}
        className="w-full flex items-start justify-between text-left px-3 py-4 bg-gray-2 dark:bg-dark-6"
      >
        <div className="flex flex-col items-start gap-3">
          <span className="font-semibold text-md leading-none">{section.title}</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {section.lectures?.length ?? 0} lectures · {formatMinutes(getSectionDuration(section))}
          </span>
        </div>
        {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>

      <Collapse in={isOpen}>
        <ul>
          {section.lectures?.map((lecture) => {
            const isActive = lecture.id === currentLectureId;
            const isDone = completed.has(lecture.id);
            return (
              <LearningLectureItem
                key={lecture.id}
                lecture={lecture}
                isActive={isActive}
                isDone={isDone}
                onClick={() => onSelectLecture(lecture.id)}
                toggleComplete={() => toggleCompleted(lecture.id)}
              />
            );
          })}
        </ul>
      </Collapse>
    </div>
  );
}
