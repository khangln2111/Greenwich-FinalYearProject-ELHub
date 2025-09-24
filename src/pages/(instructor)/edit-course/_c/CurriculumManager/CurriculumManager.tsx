import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { Accordion, Button, Text, Title } from "@mantine/core";
import { useDisclosure, useListState } from "@mantine/hooks";
import { ChevronDownIcon, LayoutListIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useReorderLecture } from "../../../../../features/lecture/lecture.hooks";
import { useReorderSection } from "../../../../../features/section/section.hooks";
import { SectionVm } from "../../../../../features/section/section.types";
import { cn } from "../../../../../utils/cn";
import { CreateSectionModal } from "./CreateSectionModal";
import { SectionItem } from "./SectionItem";
import { UpdateSectionModal } from "./UpdateSectionModal";

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

  const [sections, sectionsHandlers] = useListState<SectionVm>(initialSections);

  const [selectedSection, setSelectedSection] = useState<SectionVm | null>(null);

  useEffect(() => {
    sectionsHandlers.setState(initialSections);
  }, [initialSections]);

  const handleUpdateSection = (section: SectionVm) => {
    setSelectedSection(section);
    openUpdateSectionModal();
  };

  const reorderSectionMutation = useReorderSection();
  const reorderLectureMutation = useReorderLecture();

  const handleReorderSections = (sourceIndex: number, destinationIndex: number) => {
    sectionsHandlers.reorder({ from: sourceIndex, to: destinationIndex });

    reorderSectionMutation.mutate({
      id: sections[destinationIndex].id,
      newOrder: destinationIndex,
    });
  };

  const handleReorderLectures = (
    sourceSectionId: string,
    destSectionId: string,
    sourceIndex: number,
    destIndex: number,
  ) => {
    // find lecture being moved
    const movedLecture = sections.find((s) => s.id === sourceSectionId)?.lectures[sourceIndex];
    if (!movedLecture) return;

    // update state
    sectionsHandlers.apply((section) => {
      if (section.id === sourceSectionId) {
        // remove lecture from source section
        return {
          ...section,
          lectures: section.lectures.filter((_, i) => i !== sourceIndex),
        };
      }
      if (section.id === destSectionId) {
        // insert lecture into destination section
        const newLectures = Array.from(section.lectures);
        newLectures.splice(destIndex, 0, movedLecture);
        return { ...section, lectures: newLectures };
      }
      return section;
    });

    // call API
    reorderLectureMutation.mutate({
      id: movedLecture.id,
      newOrder: destIndex,
      newSectionId: destSectionId,
    });
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === "section") {
      if (source.index === destination.index) return;
      handleReorderSections(source.index, destination.index);
      return;
    }

    if (type === "lecture") {
      if (source.droppableId === destination.droppableId && source.index === destination.index)
        return;
      handleReorderLectures(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
      );
    }
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
        <DragDropContext onDragEnd={onDragEnd}>
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
