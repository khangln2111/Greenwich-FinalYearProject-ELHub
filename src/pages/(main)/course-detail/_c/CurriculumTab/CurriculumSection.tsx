import { Accordion, Text, Center } from "@mantine/core";
import { BookOpen } from "lucide-react";
import { CurriculumLecture } from "./CurriculumLecture";
import { SectionVm } from "../../../../../features/section/section.types";

type CurriculumSectionProps = {
  section: SectionVm;
  secIndex: number;
  onPreview: (videoUrl: string) => void;
};

export const CurriculumSection = ({ section, secIndex, onPreview }: CurriculumSectionProps) => {
  const isEmpty = section.lectures.length === 0;

  return (
    <Accordion.Item value={section.title}>
      {/* Accordion header */}
      <Accordion.Control>
        <div className="grid md:grid-cols-[1fr_auto] items-center">
          <Text className="font-semibold md:text-xl dark:text-gray-200">
            {secIndex + 1}. {section.title.trim()}
          </Text>
          <Text className="text-gray-500 dark:text-dark-1">{section.lectures.length} lectures</Text>
        </div>
      </Accordion.Control>

      {/* Accordion body */}
      <Accordion.Panel>
        {isEmpty ? (
          <Center className="rounded-xl pt-8 pb-4 px-6">
            <div className="flex flex-col items-center text-center gap-3">
              <BookOpen className="h-10 w-10 text-gray-400" />
              <Text className="text-gray-600 dark:text-gray-300 text-sm">
                No lectures have been added to this section yet.
              </Text>
            </div>
          </Center>
        ) : (
          <ul className="grid gap-y-10 capitalize pt-4 md:px-3">
            {section.lectures.map((lecture, index) => (
              <CurriculumLecture key={index} lecture={lecture} onPreview={onPreview} />
            ))}
          </ul>
        )}
      </Accordion.Panel>
    </Accordion.Item>
  );
};
