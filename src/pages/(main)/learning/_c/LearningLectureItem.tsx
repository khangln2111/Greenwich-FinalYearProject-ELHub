import { Checkbox } from "@mantine/core";
import { CheckCircle, MonitorPlayIcon } from "lucide-react";
import { EnrollmentLectureVm } from "../../../../features/lecture/lecture.types";
import { cn } from "../../../../utils/cn";
import { formatDuration } from "../../../../utils/format";

interface LearningLectureItemProps {
  lecture: EnrollmentLectureVm;
  index: number;
  lectureIndex: number;
  isActive: boolean;
  onLectureClick: (lectureIndex: number) => void;
  onLectureComplete?: (lectureId: string) => void;
}

const LearningLectureItem = ({
  lecture,
  index,
  lectureIndex,
  isActive,
  onLectureClick,
  onLectureComplete,
}: LearningLectureItemProps) => {
  return (
    <li
      onClick={() => onLectureClick(lectureIndex)}
      className={cn("group flex items-start gap-3 px-4 py-4 cursor-pointer transition-colors", {
        "bg-primary-light cursor-default": isActive,
        "hover:bg-gray-100 dark:hover:bg-dark-5": !isActive,
      })}
    >
      <Checkbox
        classNames={{ input: "border-2" }}
        size="xs"
        radius="sm"
        checked={lecture.completed}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onChange={() => onLectureComplete?.(lecture.id)}
      />
      <div className="flex-1 flex flex-col gap-3">
        <div
          className={cn("text-[15px] leading-none", {
            "font-semibold": isActive,
          })}
        >
          {`${index + 1} - ${lecture.title}`}
        </div>
        <div
          className={cn("flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400", {
            "text-gray-700 dark:text-gray-200": isActive,
          })}
        >
          {lecture.completed ? (
            <CheckCircle size={14} className="text-green-500" />
          ) : (
            <MonitorPlayIcon size={14} />
          )}
          <span className="leading-none">
            {formatDuration({
              seconds: lecture.durationInSeconds,
              formatType: "mm:ss",
            })}
          </span>
        </div>
      </div>
    </li>
  );
};

export default LearningLectureItem;
