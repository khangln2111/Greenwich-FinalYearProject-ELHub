import { Accordion, Button, Modal, Text, Title } from "@mantine/core";
import { ChevronDownIcon, LayoutListIcon, Video } from "lucide-react";
import { useState } from "react";
import ReactPlayer from "react-player";
import { SectionVm } from "../../../../features/section/section.types";
import { formatDuration } from "../../../../utils/format";

type CurriculumTabProps = {
  sections: SectionVm[];
};

const CurriculumTab = ({ sections }: CurriculumTabProps) => {
  const [openedPreviewModal, setOpenedPreviewModal] = useState(false);
  const [previewVideoUrl, setPreviewVideoUrl] = useState("");

  return (
    <>
      <Modal
        opened={openedPreviewModal}
        onClose={() => setOpenedPreviewModal(false)}
        classNames={{
          body: "p-0 overflow-hidden",
        }}
        centered
        size="xl"
        withCloseButton={false}
      >
        <ReactPlayer url={previewVideoUrl} width="100%" height="100%" controls playing />
      </Modal>
      {/* Curriculum header */}
      <div className="flex items-center justify-between">
        <Title order={2}>Course content</Title>
        <Text className="text-gray-500 dark:text-dark-1">
          {sections.reduce((sum, sec) => sum + sec.lectures.length, 0)} lectures
        </Text>
      </div>

      {/* content */}
      {sections.length > 0 ? (
        <Accordion
          multiple={true}
          className="mt-5"
          chevronPosition="left"
          transitionDuration={400}
          chevronSize={26}
          chevron={<ChevronDownIcon size={26} />}
          classNames={{
            root: "flex flex-col gap-6",
            item: "border-0",
            control: "bg-gray-2 dark:bg-dark-5 rounded-xl",
            content: "shadow-lg rounded-lg dark:bg-zinc-900",
          }}
        >
          {sections.map((section, secIndex) => (
            <Accordion.Item key={secIndex} value={section.title}>
              {/* Accordion header */}
              <Accordion.Control>
                <div className="grid md:grid-cols-[1fr_auto] items-center">
                  <Text className="font-semibold md:text-xl">
                    {secIndex + 1}. {section.title.trim()}
                  </Text>
                  <Text className="text-gray-500 dark:text-dark-1">
                    {section.lectures.length} lectures
                  </Text>
                </div>
              </Accordion.Control>
              {/* Accordion body */}
              <Accordion.Panel>
                <ul className="grid gap-y-10 capitalize pt-4 md:px-3">
                  {section.lectures.map((lecture, index) => (
                    <li key={index} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Video size={20} className="text-blue-500 shrink-0" />
                        <span className="leading-none md:text-lg">{lecture.title}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {lecture.isPreview && (
                          <Button
                            variant="default"
                            size="compact-sm"
                            className="text-primary-4 dark:text-primary-8"
                            onClick={() => {
                              setPreviewVideoUrl(lecture.videoUrl);
                              setOpenedPreviewModal(true);
                            }}
                          >
                            Preview
                          </Button>
                        )}
                        <Text className="text-dimmed text-nowrap">
                          {formatDuration({
                            seconds: lecture.durationInSeconds,
                            formatType: "mm:ss",
                          })}
                        </Text>
                      </div>
                    </li>
                  ))}
                </ul>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        <div
          className="mt-10 flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed
            border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-dark-6 p-10 text-center shadow-sm"
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
    </>
  );
};
export default CurriculumTab;
