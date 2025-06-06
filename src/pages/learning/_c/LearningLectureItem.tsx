import { Checkbox } from "@mantine/core";
import { CheckCircle, MonitorPlayIcon } from "lucide-react";
import { LectureVm } from "../../../react-query/lecture/lecture.types";
import { cn } from "../../../utils/cn";

interface Props {
  lecture: LectureVm;
  isActive: boolean;
  isDone: boolean;
  onClick: () => void;
  toggleComplete: () => void;
}

export default function LearningLectureItem({
  lecture,
  isActive,
  isDone,
  onClick,
  toggleComplete,
}: Props) {
  return (
    <li
      onClick={onClick}
      className={cn("group flex items-start gap-3 px-4 py-4 cursor-pointer transition-colors", {
        "bg-primary-light cursor-default": isActive,
        "hover:bg-gray-2 dark:hover:bg-dark-5": !isActive,
      })}
    >
      <Checkbox
        classNames={{ input: "border-2" }}
        size="xs"
        checked={isDone}
        radius="sm"
        onClick={(e) => e.stopPropagation()}
        onChange={toggleComplete}
      />
      <div className="flex-1 flex flex-col gap-3">
        <div className={cn("text-[15px] leading-none", { "font-semibold": isActive })}>
          {lecture.title}
        </div>
        <div
          className={cn("flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400", {
            "text-gray-700 dark:text-gray-200": isActive,
          })}
        >
          {isDone ? (
            <CheckCircle size={14} className="text-green-500" />
          ) : (
            <MonitorPlayIcon size={14} />
          )}
          <span>{lecture.durationInSeconds}</span>
        </div>
      </div>
    </li>
  );
}
