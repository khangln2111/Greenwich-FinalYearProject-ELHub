import { Draggable } from "@hello-pangea/dnd";
import { Button, Text } from "@mantine/core";
import { Video } from "lucide-react";
import { cn } from "../../../../../utils/cn";
import { LectureVm } from "../../../../../react-query/lecture/lecture.types";
import { formatDurationHhMm } from "../../../../../utils/format";

export type LectureItemProps = {
  lecture: LectureVm;
  index: number;
};

export const LectureItem = ({ lecture, index }: LectureItemProps) => (
  <Draggable draggableId={lecture.id} index={index}>
    {(provided, snapshot) => (
      <li
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={cn(
          `mb-6 flex items-center justify-between gap-3 border py-4 px-6 rounded-lg shadow-xs bg-white
          dark:bg-dark-6`,
          {
            "shadow-md border-blue-700 dark:border-blue-600": snapshot.isDragging,
          },
        )}
      >
        <div className="flex items-center gap-3">
          <Video size={20} className="text-blue-500 shrink-0" />
          <span className="leading-none md:text-lg">{lecture.title}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {lecture.preview && (
            <Button
              variant="default"
              size="compact-sm"
              className="text-primary-4 dark:text-primary-8"
            >
              Preview
            </Button>
          )}
          <Text className="text-dimmed text-nowrap">
            {formatDurationHhMm(lecture.durationInSeconds)}
          </Text>
        </div>
      </li>
    )}
  </Draggable>
);
