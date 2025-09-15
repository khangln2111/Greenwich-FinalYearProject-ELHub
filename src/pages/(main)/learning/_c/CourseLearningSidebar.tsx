import { HourglassIcon } from "lucide-react";
import { EnrollmentLectureVm } from "../../../../features/lecture/lecture.types";
import { EnrollmentSectionVm } from "../../../../features/section/section.types";
import CourseLearningSectionItem from "./CourseLearningSectionItem";

interface CourseLearningSidebarProps {
  sections: EnrollmentSectionVm[];
  currentLectureIndex: number;
  openedSections: Record<string, boolean>;
  allLectures: (EnrollmentLectureVm & { sectionTitle: string })[];
  onLectureClick: (lectureIndex: number) => void;
  toggleSection: (sectionId: string) => void;
  onLectureComplete?: (lectureId: string) => void;
}

const CourseLearningSidebar = ({
  sections,
  currentLectureIndex,
  openedSections,
  allLectures,
  onLectureClick,
  toggleSection,
  onLectureComplete,
}: CourseLearningSidebarProps) => {
  const noContent =
    (!sections ||
      sections.length === 0 ||
      sections.every((s) => (s.lectures?.length ?? 0) === 0)) &&
    sections.length === 0;

  return (
    <div className="h-full w-full flex flex-col border-l text-[#233D63] dark:text-[#EEEEEE]">
      <h2 className="text-lg font-semibold px-4 pl-3 py-2 border-b hidden lg:block">
        Course Content
      </h2>
      <div className="flex-1 overflow-y-auto divide-y">
        {noContent && (
          <div
            className="flex-1 flex items-center justify-center text-center px-4 py-10 text-gray-500 dark:text-gray-400
              text-sm"
          >
            <div className="flex flex-col items-center gap-2">
              <HourglassIcon size={48} className="text-gray-400 mb-2" />
              <p className="font-medium text-lg">No course content available</p>
              <p className="text-sm">The instructor hasn't added any sections or lectures yet.</p>
            </div>
          </div>
        )}

        {sections?.map((section) => {
          const opened = openedSections[section.id] ?? true;
          return (
            <CourseLearningSectionItem
              key={section.id}
              section={section}
              opened={opened}
              toggleSection={toggleSection}
              allLectures={allLectures}
              currentLectureIndex={currentLectureIndex}
              onLectureClick={onLectureClick}
              onLectureComplete={onLectureComplete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CourseLearningSidebar;
