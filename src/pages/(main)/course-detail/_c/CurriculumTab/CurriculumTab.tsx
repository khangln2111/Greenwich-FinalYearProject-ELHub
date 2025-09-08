import { Accordion, Text, Title } from "@mantine/core";
import { ChevronDownIcon, LayoutListIcon } from "lucide-react";
import { useState } from "react";

import { SectionVm } from "../../../../../features/section/section.types";
import CurriculumLecturePreviewModal from "./CurriculumLecturePreviewModal";
import { CurriculumSection } from "./CurriculumSection";
import { cn } from "../../../../../utils/cn";

type CurriculumTabProps = {
  sections: SectionVm[];
  className?: string;
};

const CurriculumTab = ({ sections, className }: CurriculumTabProps) => {
  const [openedPreviewModal, setOpenedPreviewModal] = useState(false);
  const [previewVideoUrl, setPreviewVideoUrl] = useState("");

  const handlePreview = (videoUrl: string) => {
    setPreviewVideoUrl(videoUrl);
    setOpenedPreviewModal(true);
  };

  return (
    <div className={cn("space-y-5", className)}>
      <CurriculumLecturePreviewModal
        opened={openedPreviewModal}
        onClose={() => setOpenedPreviewModal(false)}
        videoUrl={previewVideoUrl}
      />

      {/* Curriculum header */}
      <div className="flex items-center justify-between">
        <Title order={2}>Course content</Title>
        <Text className="text-gray-500 dark:text-dark-1">
          {sections.reduce((sum, sec) => sum + sec.lectures.length, 0)} lectures
        </Text>
      </div>

      {/* Curriculum body */}
      {sections.length > 0 ? (
        <Accordion
          multiple
          chevronPosition="left"
          transitionDuration={400}
          chevronSize={26}
          chevron={<ChevronDownIcon size={26} />}
          classNames={{
            root: "flex flex-col gap-6",
            item: "border-0 bg-white dark:bg-zinc-900 rounded-xl data-active:shadow-lg",
            control: "bg-gray-2 dark:bg-dark-5 rounded-xl data-active:rounded-b-none",
            content: "rounded-xl",
          }}
        >
          {sections.map((section, secIndex) => (
            <CurriculumSection
              key={secIndex}
              section={section}
              secIndex={secIndex}
              onPreview={handlePreview}
            />
          ))}
        </Accordion>
      ) : (
        <div
          className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300
            dark:border-gray-700 bg-gray-50 dark:bg-dark-6 p-10 text-center shadow-sm"
        >
          <LayoutListIcon className="size-10 text-gray-400 dark:text-gray-600" />
          <Title order={4} className="text-gray-700 dark:text-gray-300">
            Course content is not available yet
          </Title>
          <Text c="dimmed" size="sm">
            The instructor is currently preparing the learning materials for this course. Please
            check back soon!
          </Text>
        </div>
      )}
    </div>
  );
};

export default CurriculumTab;
