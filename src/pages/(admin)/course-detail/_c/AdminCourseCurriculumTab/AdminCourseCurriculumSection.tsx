import { Accordion, Box, Text } from "@mantine/core";
import { FileQuestion } from "lucide-react";
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
  const hasLectures = section.lectures && section.lectures.length > 0;

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
        {hasLectures ? (
          <ul className="grid gap-y-10 capitalize pt-4 md:px-3">
            {section.lectures.map((lecture, index) => (
              <AdminCourseCurriculumLecture key={index} lecture={lecture} onPreview={onPreview} />
            ))}
          </ul>
        ) : (
          <Box className="flex flex-col items-center justify-center py-8 text-center">
            <FileQuestion className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-3" />
            <Text className="font-medium text-gray-600 dark:text-gray-300">
              No lectures in this section yet
            </Text>
            <Text size="sm" className="text-gray-500 dark:text-gray-400 mt-1">
              Instructor hasn't added any lectures to this section.
            </Text>
          </Box>
        )}
      </Accordion.Panel>
    </Accordion.Item>
  );
};
