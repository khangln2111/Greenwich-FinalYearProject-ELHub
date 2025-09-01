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

type CurriculumManagerProps = {
  courseId: string;
  sections: SectionVm[];
};

const CurriculumManager = ({ courseId, sections: initialSections }: CurriculumManagerProps) => {
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

  useEffect(() => {
    if (initialSections) {
      setSections(initialSections);
    }
  }, [initialSections]);

  const handleUpdateSection = (section: SectionVm) => {
    setSelectedSection(section);
    openUpdateSectionModal();
  };

  const reorderSectionMutation = useReorderSection();
  const reorderLectureMutation = useReorderLecture();

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;

    if (!destination) return;

    // --- Reorder Sections ---
    if (type === "section") {
      if (source.index === destination.index) return;

      const updatedSections = [...sections];
      const [moved] = updatedSections.splice(source.index, 1);
      updatedSections.splice(destination.index, 0, moved);

      // update local state
      setSections(updatedSections);

      // send mutation
      reorderSectionMutation.mutate({
        id: moved.id,
        newOrder: destination.index,
      });

      return;
    }

    // --- Reorder Lectures ---
    if (type === "lecture") {
      if (source.droppableId === destination.droppableId && source.index === destination.index) {
        return;
      }

      const sourceSection = sections.find((s) => s.id === source.droppableId);
      const destinationSection = sections.find((s) => s.id === destination.droppableId);

      if (!sourceSection || !destinationSection) return;

      const movedLecture = sourceSection.lectures?.[source.index];
      if (!movedLecture) return;

      // --- Update lectures in localState ---
      const updatedSections = [...sections];
      const sourceSectionIndex = updatedSections.findIndex((s) => s.id === sourceSection.id);
      const destinationSectionIndex = updatedSections.findIndex(
        (s) => s.id === destinationSection.id,
      );

      if (sourceSectionIndex !== -1 && destinationSectionIndex !== -1) {
        // Remove lecture from source section
        updatedSections[sourceSectionIndex].lectures?.splice(source.index, 1);
        // Add lecture to destination section
        updatedSections[destinationSectionIndex].lectures?.splice(
          destination.index,
          0,
          movedLecture,
        );

        // Update local state
        setSections(updatedSections);
      }

      // Send mutation to update lectures on server
      reorderLectureMutation.mutate({
        id: movedLecture.id,
        newOrder: destination.index,
        newSectionId: destinationSection.id,
      });
    }
  };

  return (
    <>
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

      <div className="flex items-center justify-between">
        <Title order={2}>Course Content</Title>
        <div className="flex items-center gap-4">
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
                  className="mt-5"
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
          className="mt-10 flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed
            border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-dark-5 p-10 text-center shadow-sm"
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
    </>
  );
};

export default CurriculumManager;
