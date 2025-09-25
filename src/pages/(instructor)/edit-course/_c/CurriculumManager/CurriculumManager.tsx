import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { Accordion, Button, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChevronDownIcon, LayoutListIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useReorderLecture } from "../../../../../features/lecture/lecture.hooks";
import { SectionVm } from "../../../../../features/section/section.types";
import { useReorderSection } from "../../../../../features/section/section.hooks";
import { CreateSectionModal } from "./CreateSectionModal";
import { SectionItem } from "./SectionItem";
import { UpdateSectionModal } from "./UpdateSectionModal";
import { cn } from "../../../../../utils/cn";
import { produce } from "immer";

type CurriculumManagerProps = {
  courseId: string;
  sections: SectionVm[];
  className?: string;
};

const CurriculumManager = ({
  courseId,
  sections: initialSections,
  className,
}: CurriculumManagerProps) => {
  const [
    createSectionModalOpened,
    { open: openCreateSectionModal, close: closeCreateSectionModal },
  ] = useDisclosure(false);
  const [
    updateSectionModalOpened,
    { open: openUpdateSectionModal, close: closeUpdateSectionModal },
  ] = useDisclosure(false);

  const [sections, setSections] = useState<SectionVm[]>(initialSections);

  const [selectedSection, setSelectedSection] = useState<SectionVm | null>(null);

  const reorderSectionMutation = useReorderSection();
  const reorderLectureMutation = useReorderLecture();

  useEffect(() => {
    if (initialSections) {
      setSections(initialSections);
    }
  }, [initialSections]);

  const handleUpdateSection = (section: SectionVm) => {
    setSelectedSection(section);
    openUpdateSectionModal();
  };

  const handleSectionDrag = (sourceIndex: number, destinationIndex: number) => {
    if (sourceIndex === destinationIndex) return;

    setSections(
      produce((draft) => {
        const [moved] = draft.splice(sourceIndex, 1);
        draft.splice(destinationIndex, 0, moved);
      }),
    );

    reorderSectionMutation.mutate({
      id: sections[sourceIndex].id,
      newOrder: destinationIndex,
    });
  };

  const handleLectureDrag = (
    sourceSectionId: string,
    destinationSectionId: string,
    sourceIndex: number,
    destinationIndex: number,
  ) => {
    setSections(
      produce((draft) => {
        const sourceSection = draft.find((s) => s.id === sourceSectionId);
        const destSection = draft.find((s) => s.id === destinationSectionId);
        if (!sourceSection || !destSection) return;
        // if same section and same index, do nothing
        if (sourceSectionId === destinationSectionId && sourceIndex === destinationIndex) return;
        // source section & dest section can be the same or different
        const [movedLecture] = sourceSection.lectures.splice(sourceIndex, 1);
        destSection.lectures.splice(destinationIndex, 0, movedLecture);

        reorderLectureMutation.mutate({
          id: movedLecture.id,
          newOrder: destinationIndex,
          newSectionId: destinationSectionId,
        });
      }),
    );
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === "section") handleSectionDrag(source.index, destination.index);
    if (type === "lecture")
      handleLectureDrag(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
      );
  };

  return (
    <div className={cn("space-y-5", className)}>
      <CreateSectionModal
        opened={createSectionModalOpened}
        onClose={closeCreateSectionModal}
        courseId={courseId}
      />
      {selectedSection && (
        <UpdateSectionModal
          opened={updateSectionModalOpened}
          onClose={closeUpdateSectionModal}
          section={selectedSection}
          key={selectedSection.id}
        />
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-y-6">
        <Title order={2}>Course Content</Title>
        <div className="flex justify-between items-center gap-4">
          {sections.length > 0 && (
            <Button leftSection={<PlusIcon size={16} />} onClick={openCreateSectionModal}>
              Add Section
            </Button>
          )}
          <Text className="text-gray-500 dark:text-dark-1">
            {sections.reduce((sum, sec) => sum + sec.lectures.length, 0)} lectures
          </Text>
        </div>
      </div>

      {sections.length > 0 ? (
        <DragDropContext
          onDragStart={() => {
            document.documentElement.classList.remove("scroll-smooth");
            document.documentElement.classList.add("scroll-auto");
          }}
          onDragEnd={(result) => {
            onDragEnd(result);
            document.documentElement.classList.remove("scroll-auto");
            document.documentElement.classList.add("scroll-smooth");
          }}
        >
          <Droppable droppableId="sections" type="section">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Accordion
                  multiple
                  chevronPosition="left"
                  transitionDuration={400}
                  chevronSize={26}
                  chevron={<ChevronDownIcon className="md:size-[26px]" />}
                  classNames={{
                    root: "flex flex-col",
                    item: "border-0 mb-7 data-active:shadow-lg rounded-xl bg-white dark:bg-zinc-900",
                    control:
                      "bg-gray-200 dark:bg-dark-5 rounded-xl data-active:rounded-b-none transition",
                    content: "p-0",
                  }}
                >
                  {sections.map((section, index) => (
                    <SectionItem
                      key={section.id}
                      section={section}
                      index={index}
                      onUpdate={handleUpdateSection}
                    />
                  ))}
                </Accordion>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div
          className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300
            dark:border-gray-700 bg-gray-50 dark:bg-dark-5 p-10 text-center shadow-sm"
        >
          <LayoutListIcon className="size-10 text-gray-400 dark:text-gray-600" />
          <Title order={4} className="text-gray-700 dark:text-gray-300">
            Your course doesn't have any sections yet
          </Title>
          <Text c="dimmed" size="sm">
            Start by creating a section to organize your course content. Each section can contain
            multiple lectures.
          </Text>
          <Button leftSection={<PlusIcon size={16} />} onClick={openCreateSectionModal}>
            Create your first section
          </Button>
        </div>
      )}
    </div>
  );
};

export default CurriculumManager;
