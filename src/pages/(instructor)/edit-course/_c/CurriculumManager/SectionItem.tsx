import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Accordion, ActionIcon, Button, Menu, Text, ThemeIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { EllipsisVerticalIcon, Move, PlusIcon } from "lucide-react";
import { useState } from "react";
import { LectureVm } from "../../../../../react-query/lecture/lecture.types";
import { SectionVm as lectureVm } from "../../../../../react-query/section/section.types";
import { useDeleteSection } from "../../../../../react-query/section/sectionHooks";
import { cn } from "../../../../../utils/cn";
import { CreateLectureModal } from "./CreateLectureModal";
import { LectureItem } from "./LectureItem";
import { UpdateLectureModal } from "./UpdateLectureModal";

type SectionItemProps = {
  section: lectureVm;
  index: number;
  onUpdate: (section: lectureVm) => void;
};

export const SectionItem = ({ section, index, onUpdate }: SectionItemProps) => {
  const [selectedLecture, setSelectedLecture] = useState<LectureVm | null>(null);
  const [
    updateLectureModalOpened,
    { open: openUpdateLectureModal, close: closeUpdateLectureModal },
  ] = useDisclosure(false);

  const [
    createLectureModalOpened,
    { open: openCreateLectureModal, close: closeCreateLectureModal },
  ] = useDisclosure(false);

  const deleteSectionMutation = useDeleteSection();

  const handleUpdateLecture = (lecture: LectureVm) => {
    setSelectedLecture(lecture);
    openUpdateLectureModal();
  };

  const handleDeleteSectionClick = () => {
    modals.openConfirmModal({
      title: "Confirm deletion",
      centered: true,
      children: (
        <p>
          Are you sure you want to <strong>delete</strong> the section{" "}
          <strong>{section.title}</strong>?
        </p>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red", loading: deleteSectionMutation.isPending },
      onConfirm: () => {
        deleteSectionMutation.mutate(section.id, {
          onSettled: () => {
            modals.closeAll();
          },
        });
      },
      closeOnConfirm: false,
    });
  };

  return (
    <>
      <CreateLectureModal
        opened={createLectureModalOpened}
        onClose={closeCreateLectureModal}
        sectionId={section.id}
      />

      {selectedLecture && (
        <UpdateLectureModal
          opened={updateLectureModalOpened}
          onClose={closeUpdateLectureModal}
          lecture={selectedLecture}
          key={selectedLecture.id}
        />
      )}

      <Draggable draggableId={section.id} index={index}>
        {(dragProvided, snapshot) => (
          <Accordion.Item
            value={section.id}
            ref={dragProvided.innerRef}
            {...dragProvided.draggableProps}
          >
            <Accordion.Control>
              <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <Text className="font-semibold text-sm md:text-xl flex-1">{section.title}</Text>
                  <Text className="text-gray-500 dark:text-dark-1">
                    {section.lectures?.length} lectures
                  </Text>
                </div>

                <div className="flex gap-2">
                  <ThemeIcon
                    variant="light"
                    color="gray"
                    size="md"
                    {...dragProvided.dragHandleProps}
                    className={cn(
                      "cursor-grab active:cursor-grabbing hover:bg-gray-100 dark:hover:bg-dark-4",
                      { "bg-gray-100 dark:bg-dark-4": snapshot.isDragging },
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    title="Drag to reorder section"
                  >
                    <Move className="size-5 text-gray-500 dark:text-gray-400" />
                  </ThemeIcon>
                  <Menu trigger="click">
                    <Menu.Target>
                      <ActionIcon
                        variant="subtle"
                        onClick={(e) => e.stopPropagation()}
                        component="span"
                      >
                        <EllipsisVerticalIcon />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown onClick={(e) => e.stopPropagation()}>
                      <Menu.Item
                        color="blue"
                        leftSection={<IconPencil size={16} />}
                        onClick={() => onUpdate(section)}
                      >
                        Edit
                      </Menu.Item>
                      <Menu.Item
                        color="red"
                        leftSection={<IconTrash size={16} />}
                        onClick={handleDeleteSectionClick}
                      >
                        Delete
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </div>
              </div>
            </Accordion.Control>

            <Accordion.Panel>
              <Droppable droppableId={section.id} type="lecture">
                {(provided, snapshot) => (
                  <div>
                    <ul
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={cn("capitalize transition-colors py-8 px-3 md:px-8", {
                        "bg-primary-1/40 dark:bg-primary-9/10": snapshot.isDraggingOver,
                        "bg-gray-100 dark:bg-dark-4": snapshot.draggingFromThisWith,
                      })}
                    >
                      {section.lectures?.map((lecture, idx) => (
                        <LectureItem
                          key={lecture.id}
                          lecture={lecture}
                          index={idx}
                          onUpdate={handleUpdateLecture}
                        />
                      ))}
                      {provided.placeholder}
                      <Button
                        variant="subtle"
                        leftSection={<PlusIcon size={16} />}
                        onClick={openCreateLectureModal}
                      >
                        Add Lecture
                      </Button>
                    </ul>
                  </div>
                )}
              </Droppable>
            </Accordion.Panel>
          </Accordion.Item>
        )}
      </Draggable>
    </>
  );
};
