import { SectionVm } from "../../../react-query/section/section.types";
import LearningSectionItem from "./LearningSectionItem";

interface Props {
  sections: SectionVm[];
  openSections: Record<string, boolean>;
  toggleSection: (sectionId: string) => void;
  currentLectureId: string;
  completed: Set<string>;
  onSelectLecture: (lectureId: string) => void;
  toggleCompleted: (lectureId: string) => void;
  getSectionDuration: (section: SectionVm) => number;
  formatMinutes: (minutes: number) => string;
}

export default function LearningSidebar({
  sections,
  openSections,
  toggleSection,
  currentLectureId,
  completed,
  onSelectLecture,
  toggleCompleted,
  getSectionDuration,
  formatMinutes,
}: Props) {
  return (
    <div className="h-full w-full flex flex-col border-l text-[#233D63] dark:text-[#EEEEEE]">
      <h2 className="text-lg font-semibold px-4 pl-3 py-2 border-b hidden lg:block">
        Course Content
      </h2>
      <div className="flex-1 overflow-y-auto divide-y">
        {sections.map((section) => (
          <LearningSectionItem
            key={section.id}
            section={section}
            isOpen={openSections[section.id] ?? true}
            toggleOpen={() => toggleSection(section.id)}
            currentLectureId={currentLectureId}
            completed={completed}
            onSelectLecture={onSelectLecture}
            toggleCompleted={toggleCompleted}
            getSectionDuration={getSectionDuration}
            formatMinutes={formatMinutes}
          />
        ))}
      </div>
    </div>
  );
}
