import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { Accordion, Button, Text, Title } from "@mantine/core";
import { ChevronDownIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { SectionItem } from "./SectionItem";
import { randomId, useDisclosure } from "@mantine/hooks";
import { SectionVm } from "../../../../../react-query/section/section.types";
import { CreateSectionModal } from "./CreateSectionModal";
const initialSections: SectionVm[] = [
  {
    id: "sec-1",
    title: "Chapter 1: Building Responsive & Adaptive User Interfaces [EXPENSE TRACKER APP]",
    description: "Learn the basics of UX/UI through hands-on project.",
    courseId: "course-1",
    lectures: [
      {
        id: "lec-1",
        title: "Introduction to UX/UI Design",
        description: "Overview of user experience and interface design.",
        videoUrl: "https://example.com/video1.mp4",
        preview: true,
        durationInSeconds: 315,
        sectionId: "sec-1",
      },
      {
        id: "lec-2",
        title: "UX Writing & Content Strategy",
        description: "Writing content that aligns with user needs.",
        videoUrl: "https://example.com/video2.mp4",
        preview: false,
        durationInSeconds: 630,
        sectionId: "sec-1",
      },
      {
        id: "lec-3",
        title: "Design Thinking & User Research",
        description: "Learn user research and apply design thinking.",
        videoUrl: "https://example.com/video3.mp4",
        preview: true,
        durationInSeconds: 945,
        sectionId: "sec-1",
      },
      {
        id: "lec-4",
        title: "Usability Testing & Iteration",
        description: "Testing with users and improving your design.",
        videoUrl: "https://example.com/video4.mp4",
        preview: true,
        durationInSeconds: 1100,
        sectionId: "sec-1",
      },
      {
        id: "lec-5",
        title: "Submit a pull request once you are done",
        description: "Final steps and submission.",
        videoUrl: "https://example.com/video5.mp4",
        preview: false,
        durationInSeconds: 1500,
        sectionId: "sec-1",
      },
    ],
    lectureCount: 5,
    durationInSeconds: 4390,
  },
  {
    id: "sec-2",
    title: "Chapter 2: Advanced Techniques",
    description: "Enhance your skills with advanced tools.",
    courseId: "course-1",
    lectures: [
      {
        id: "lec-6",
        title: "Photo Editing Basics",
        description: "Introduction to editing tools.",
        videoUrl: "https://example.com/video6.mp4",
        preview: true,
        durationInSeconds: 315,
        sectionId: "sec-2",
      },
      {
        id: "lec-7",
        title: "Advanced Photoshop Techniques",
        description: "Master advanced editing tricks.",
        videoUrl: "https://example.com/video7.mp4",
        preview: false,
        durationInSeconds: 630,
        sectionId: "sec-2",
      },
      {
        id: "lec-8",
        title: "Creating Stunning Visuals",
        description: "Create visuals that captivate users.",
        videoUrl: "https://example.com/video8.mp4",
        preview: false,
        durationInSeconds: 945,
        sectionId: "sec-2",
      },
      {
        id: "lec-9",
        title: "Photo Retouching & Restoration",
        description: "Fix and restore old or flawed photos.",
        videoUrl: "https://example.com/video9.mp4",
        preview: true,
        durationInSeconds: 1200,
        sectionId: "sec-2",
      },
      {
        id: "lec-10",
        title: "Submit a pull request once you are done",
        description: "Wrap up the module.",
        videoUrl: "https://example.com/video10.mp4",
        preview: false,
        durationInSeconds: 1500,
        sectionId: "sec-2",
      },
    ],
    lectureCount: 5,
    durationInSeconds: 4590,
  },
  {
    id: "sec-3",
    title: "Chapter 3: Mockups & Prototypes",
    description: "Bring your ideas to life with prototypes.",
    courseId: "course-1",
    lectures: [
      {
        id: "lec-11",
        title: "Previewing Your Work",
        description: "Learn to preview your work effectively.",
        videoUrl: "https://example.com/video11.mp4",
        preview: true,
        durationInSeconds: 315,
        sectionId: "sec-3",
      },
      {
        id: "lec-12",
        title: "Sharing with Clients",
        description: "Best practices for sharing and presenting.",
        videoUrl: "https://example.com/video12.mp4",
        preview: false,
        durationInSeconds: 630,
        sectionId: "sec-3",
      },
      {
        id: "lec-13",
        title: "Creating Mockups",
        description: "Design static mockups using Figma.",
        videoUrl: "https://example.com/video13.mp4",
        preview: false,
        durationInSeconds: 945,
        sectionId: "sec-3",
      },
      {
        id: "lec-14",
        title: "Feedback & Revisions",
        description: "Iterate your designs with feedback.",
        videoUrl: "https://example.com/video14.mp4",
        preview: true,
        durationInSeconds: 1200,
        sectionId: "sec-3",
      },
      {
        id: "lec-15",
        title: "Submit a pull request once you are done",
        description: "Final submission for review.",
        videoUrl: "https://example.com/video15.mp4",
        preview: false,
        durationInSeconds: 1500,
        sectionId: "sec-3",
      },
    ],
    lectureCount: 5,
    durationInSeconds: 4590,
  },
];

type CurriculumManagerProps = {
  courseId: string;
  sections?: SectionVm[];
};

const CurriculumManager = ({ courseId }: CurriculumManagerProps) => {
  const [sections, setSections] = useState(initialSections);
  const [
    createSectionModalOpened,
    { open: openCreateSectionModal, close: closeCreateSectionModal },
  ] = useDisclosure(false);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;

    const updated = [...sections];

    if (type === "section") {
      const [moved] = updated.splice(source.index, 1);
      updated.splice(destination.index, 0, moved);
    } else {
      const sourceIdx = updated.findIndex((s) => s.id === source.droppableId);
      const destIdx = updated.findIndex((s) => s.id === destination.droppableId);
      if (sourceIdx === -1 || destIdx === -1) return;

      if (updated[sourceIdx]?.lectures && updated[destIdx]?.lectures) {
        const [movedLecture] = updated[sourceIdx].lectures.splice(source.index, 1);
        updated[destIdx].lectures.splice(destination.index, 0, movedLecture);
      }
    }

    setSections(updated);
  };

  return (
    <>
      <CreateSectionModal
        opened={createSectionModalOpened}
        onClose={closeCreateSectionModal}
        courseId={courseId}
      />
      <div className="flex items-center justify-between">
        <Title order={2}>Course Content</Title>
        <div className="flex items-center gap-4">
          <Button leftSection={<PlusIcon size={16} />} onClick={openCreateSectionModal}>
            Add Section
          </Button>
          <Text className="text-gray-500 dark:text-dark-1">
            {sections.reduce((sum, sec) => sum + (sec.lectures?.length ?? 0), 0)} lectures
          </Text>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sections" type="section">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Accordion
                multiple
                className="mt-5"
                chevronPosition="left"
                transitionDuration={400}
                chevronSize={26}
                chevron={<ChevronDownIcon className="md:size-[26px]" />}
                classNames={{
                  root: "flex flex-col",
                  item: "border-0 mb-7",
                  control:
                    "bg-gray-200 dark:bg-dark-5 rounded-xl data-active:rounded-b-none transition",
                  content: "shadow-lg rounded-lg rounded-t-none dark:bg-zinc-900 p-0",
                }}
              >
                {sections.map((section, index) => (
                  <SectionItem key={section.id} section={section} index={index} />
                ))}
              </Accordion>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default CurriculumManager;
