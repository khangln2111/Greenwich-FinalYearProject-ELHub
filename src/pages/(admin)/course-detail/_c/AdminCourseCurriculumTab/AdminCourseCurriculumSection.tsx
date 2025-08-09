import { Accordion, Text } from "@mantine/core";
import { SectionVm } from "../../../../../features/section/section.types";
import { AdminCourseCurriculumLecture } from "./AdminCourseCurriculumLecture";

type AdminCourseCurriculumSectionProps = {
  section: SectionVm;
  secIndex: number;
  onPreview: (videoUrl: string) => void;
};

export const AdminCourseCurriculumSection = ({
  section,
  secIndex,
  onPreview,
}: AdminCourseCurriculumSectionProps) => {
  return (
    <Accordion.Item value={section.title}>
      {/* Accordion header */}
      <Accordion.Control>
        <div className="grid md:grid-cols-[1fr_auto] items-center">
          <Text className="font-semibold md:text-xl">
            {secIndex + 1}. {section.title.trim()}
          </Text>
          <Text className="text-gray-500 dark:text-dark-1">{section.lectures.length} lectures</Text>
        </div>
      </Accordion.Control>

      {/* Accordion body */}
      <Accordion.Panel>
        <ul className="grid gap-y-10 capitalize pt-4 md:px-3">
          {section.lectures.map((lecture, index) => (
            <AdminCourseCurriculumLecture key={index} lecture={lecture} onPreview={onPreview} />
          ))}
        </ul>
      </Accordion.Panel>
    </Accordion.Item>
  );
};
