import { LectureVm } from "../../../react-query/lecture/lecture.types";
import { SectionVm } from "../../../react-query/section/section.types";
import LearningSectionItem from "./LearningSectionItem";

interface CourseSidebarProps {
  sections: SectionVm[];
  currentLectureId: string;
  completed: Set<string>;
  openSections: Record<string, boolean>;
  allLectures: (LectureVm & { sectionTitle: string })[];
  onLectureClick: (lectureId: string) => void;
  toggleSection: (sectionId: string) => void;
  toggleComplete: (lectureId: string) => void;
}

export default function CourseSidebar({
  sections,
  currentLectureId,
  completed,
  openSections,
  allLectures,
  onLectureClick,
  toggleSection,
  toggleComplete,
}: CourseSidebarProps) {
  return (
    <div className="h-full w-full flex flex-col border-l text-[#233D63] dark:text-[#EEEEEE]">
      <h2 className="text-lg font-semibold px-4 pl-3 py-2 border-b hidden lg:block">
        Course Content
      </h2>
      <div className="flex-1 overflow-y-auto divide-y">
        {sections.map((section) => {
          const isOpen = openSections[section.id] ?? true;
          return (
            <LearningSectionItem
              key={section.id}
              section={section}
              isOpen={isOpen}
              toggleSection={() => toggleSection(section.id)}
              currentLectureId={currentLectureId}
              completed={completed}
              allLectures={allLectures}
              onLectureClick={onLectureClick}
              toggleComplete={toggleComplete}
            />
          );
        })}
      </div>
    </div>
  );
}
