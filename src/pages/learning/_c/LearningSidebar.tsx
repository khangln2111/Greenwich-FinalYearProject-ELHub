import { Checkbox, Collapse } from "@mantine/core";
import {
  CheckCircle,
  ChevronDown,
  ChevronRight,
  HourglassIcon,
  MonitorPlayIcon,
} from "lucide-react";
import { LectureVm } from "../../../react-query/lecture/lecture.types";
import { LearningSectionVm } from "../../../react-query/section/section.types";
import { cn } from "../../../utils/cn";
import { formatDuration } from "../../../utils/format";

interface CourseSidebarProps {
  sections: LearningSectionVm[];
  currentLectureIndex: number;
  openedSections: Record<string, boolean>;
  allLectures: (LectureVm & { sectionTitle: string })[];
  onLectureClick: (lectureId: number) => void;
  toggleSection: (sectionId: string) => void;
  onLectureComplete?: (lectureId: string) => void;
}

export default function LearningSidebar({
  sections,
  currentLectureIndex,
  openedSections,
  allLectures,
  onLectureClick,
  toggleSection,
  onLectureComplete,
}: CourseSidebarProps) {
  return (
    <div className="h-full w-full flex flex-col border-l text-[#233D63] dark:text-[#EEEEEE]">
      <h2 className="text-lg font-semibold px-4 pl-3 py-2 border-b hidden lg:block">
        Course Content
      </h2>
      <div className="flex-1 overflow-y-auto divide-y">
        {(!sections ||
          sections.length === 0 ||
          sections.every((s) => (s.lectures?.length ?? 0) === 0)) && (
          <div
            className="flex-1 flex items-center justify-center text-center px-4 py-10 text-gray-500 dark:text-gray-400
              text-sm"
          >
            <div className="flex flex-col items-center gap-2">
              <HourglassIcon size={48} className="text-gray-400 mb-2" />
              <p className="font-medium text-base">No course content available</p>
              <p className="text-sm">The instructor hasn't added any sections or lectures yet.</p>
            </div>
          </div>
        )}
        {sections?.map((section) => {
          // default to be open
          const isOpen = openedSections[section.id] ?? true;
          return (
            <div key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-start justify-between text-left px-3 py-4 bg-gray-2 dark:bg-dark-6"
              >
                <div className="flex flex-col items-start gap-3">
                  <span className="font-semibold text-md leading-none">{`Section ${section.order + 1}: ${section.title.trim()}`}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {section.lectures?.length} lectures ·{" "}
                    {formatDuration({ seconds: section.durationInSeconds, formatType: "mm:ss" })}
                  </span>
                </div>
                {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>
              <Collapse in={isOpen} transitionTimingFunction="linear">
                <ul>
                  {section.lectures?.map((lecture) => {
                    const lectureIndex = allLectures.findIndex((l) => l.id === lecture.id);
                    const isActive = lectureIndex === currentLectureIndex;

                    // lecture mapping
                    return (
                      <li
                        key={lecture.id}
                        onClick={() => onLectureClick(lectureIndex)}
                        className={cn(
                          "group flex items-start gap-3 px-4 py-4 cursor-pointer transition-colors",
                          {
                            "bg-primary-light cursor-default": isActive,
                            "hover:bg-gray-100 dark:hover:bg-dark-5": !isActive,
                          },
                        )}
                      >
                        <Checkbox
                          classNames={{ input: "border-2" }}
                          size="xs"
                          radius="sm"
                          checked={lecture.completed}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          onChange={() => onLectureComplete?.(lecture.id)}
                        />
                        <div className="flex-1 flex flex-col gap-3">
                          <div
                            className={cn("text-[15px] leading-none", {
                              "font-semibold": isActive,
                            })}
                          >
                            {lectureIndex + 1}. {lecture.title}
                          </div>
                          <div
                            className={cn(
                              "flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400",
                              {
                                "text-gray-700 dark:text-gray-200": isActive,
                              },
                            )}
                          >
                            {lecture.completed ? (
                              <CheckCircle size={14} className="text-green-500" />
                            ) : (
                              <MonitorPlayIcon size={14} />
                            )}
                            <span className={cn("leading-none", {})}>
                              {formatDuration({
                                seconds: lecture.durationInSeconds,
                                formatType: "mm:ss",
                              })}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </Collapse>
            </div>
          );
        })}
      </div>
    </div>
  );
}
