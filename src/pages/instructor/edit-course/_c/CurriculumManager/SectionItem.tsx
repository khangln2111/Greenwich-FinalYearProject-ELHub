import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Accordion, ActionIcon, Button, Menu, Text, ThemeIcon } from "@mantine/core";
import { EllipsisVerticalIcon, Move, PlusIcon } from "lucide-react";
import { SectionVm } from "../../../../../react-query/section/section.types";
import { cn } from "../../../../../utils/cn";
import { LectureItem } from "./LectureItem";
import { IconPencil, IconTrash } from "@tabler/icons-react";

type SectionItemProps = {
  section: SectionVm;
  index: number;
};

export const SectionItem = ({ section, index }: SectionItemProps) => (
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
              <Menu trigger="click-hover">
                <Menu.Target>
                  <ActionIcon variant="light" onClick={(e) => e.stopPropagation()}>
                    <EllipsisVerticalIcon />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown onClick={(e) => e.stopPropagation()}>
                  <Menu.Item color="blue" leftSection={<IconPencil size={16} />}>
                    Edit
                  </Menu.Item>
                  <Menu.Item color="red" leftSection={<IconTrash size={16} />}>
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
                    <LectureItem key={lecture.id} lecture={lecture} index={idx} />
                  ))}
                  {provided.placeholder}
                  <Button variant="subtle" leftSection={<PlusIcon size={16} />}>
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
);
