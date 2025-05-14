import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { Accordion, Button, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChevronDownIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { SectionVm } from "../../../../../react-query/section/section.types";
import { CreateSectionModal } from "./CreateSectionModal";
import { SectionItem } from "./SectionItem";
import { UpdateSectionModal } from "./UpdateSectionModal";
import { useReorderLecture } from "../../../../../react-query/lecture/lectureHooks";
import { useReorderSection } from "../../../../../react-query/section/sectionHooks";
import { useQueryClient } from "@tanstack/react-query";
import { keyFac } from "../../../../../react-query/common-service/queryKeyFactory";
import { CourseDetailVm } from "../../../../../react-query/course/course.types";

type CurriculumManagerProps = {
  courseId: string;
  sections: SectionVm[];
};

const CurriculumManager = ({ courseId, sections }: CurriculumManagerProps) => {
  const [
    createSectionModalOpened,
    { open: openCreateSectionModal, close: closeCreateSectionModal },
  ] = useDisclosure(false);
  const [
    updateSectionModalOpened,
    { open: openUpdateSectionModal, close: closeUpdateSectionModal },
  ] = useDisclosure(false);

  const queryClient = useQueryClient();

  const [selectedSection, setSelectedSection] = useState<SectionVm | null>(null);

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

      const previousData = queryClient.getQueryData<CourseDetailVm>(
        keyFac.courses.detail(courseId).queryKey,
      );

      if (!previousData) return;

      const updatedSections = [...previousData.sections];
      const [moved] = updatedSections.splice(source.index, 1);
      updatedSections.splice(destination.index, 0, moved);

      // 🧠 Update cache ngay lập tức
      queryClient.setQueryData<CourseDetailVm>(keyFac.courses.detail(courseId).queryKey, {
        ...previousData,
        sections: updatedSections,
      });

      // ✅ Gửi mutation
      // reorderSectionMutation.mutate({
      //   id: moved.id,
      //   newOrder: destination.index,
      // });

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
    </>
  );
};

export default CurriculumManager;
