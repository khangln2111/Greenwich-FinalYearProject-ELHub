import { Draggable } from "@hello-pangea/dnd";
import { ActionIcon, Menu, Text } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { EllipsisVerticalIcon, EyeIcon, Video } from "lucide-react";
import { LectureVm } from "../../../../../react-query/lecture/lecture.types";
import { cn } from "../../../../../utils/cn";
import { formatDurationMmSs } from "../../../../../utils/format";

export type LectureItemProps = {
  lecture: LectureVm;
  index: number;
  onUpdate: (lecture: LectureVm) => void;
};

export const LectureItem = ({ lecture, index, onUpdate }: LectureItemProps) => (
  <Draggable draggableId={lecture.id} index={index}>
    {(provided, snapshot) => (
      <li
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={cn(
          `mb-6 flex items-center justify-between gap-1 md:gap-3 border py-3 px-2 md:px-6 rounded-lg shadow-xs
          bg-white dark:bg-dark-6`,
          {
            "shadow-md border-blue-700 dark:border-blue-600": snapshot.isDragging,
          },
        )}
      >
        <div className="flex items-center gap-3">
          <Video size={20} className="text-blue-500 shrink-0" />
          <span className="leading-tight md:text-lg">{lecture.title}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {lecture.preview && (
            <ActionIcon variant="default" className="text-primary-4 dark:text-primary-8">
              <EyeIcon size={16} />
            </ActionIcon>
          )}
          <Text className="text-dimmed text-nowrap">
            {formatDurationMmSs(lecture.durationInSeconds)}
          </Text>
          <Menu trigger="click">
            <Menu.Target>
              <ActionIcon variant="subtle" onClick={(e) => e.stopPropagation()} component="span">
                <EllipsisVerticalIcon />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown onClick={(e) => e.stopPropagation()}>
              <Menu.Item
                color="blue"
                leftSection={<IconPencil size={16} />}
                onClick={() => onUpdate(lecture)}
              >
                Edit
              </Menu.Item>
              <Menu.Item color="red" leftSection={<IconTrash size={16} />}>
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </li>
    )}
  </Draggable>
);
