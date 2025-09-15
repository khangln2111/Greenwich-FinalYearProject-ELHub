import { Avatar, Badge, Button, Group, Rating, Text, Tooltip } from "@mantine/core";
import { ClockIcon, LayersIcon, LibraryBigIcon, TagIcon, UsersIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { CourseVm } from "../../features/course/course.types";
import { cn } from "../../utils/cn";
import { formatDuration } from "../../utils/format";

type CourseListItemProps = {
  course: CourseVm;
  className?: string;
};

const CourseListItem = ({ course, className }: CourseListItemProps) => {
  const navigate = useNavigate();

  const stats = [
    {
      label: formatDuration({ seconds: course.durationInSeconds, formatType: "long" }),
      icon: ClockIcon,
    },
    {
      label: `${course.lectureCount} lectures`,
      icon: LibraryBigIcon,
    },
    {
      label: course.level,
      icon: LayersIcon,
    },
    {
      label: `${course.enrollmentCount ?? 0} enrolled`,
      icon: UsersIcon,
    },
    {
      label: course.categoryName,
      icon: TagIcon,
    },
  ];

  return (
    <div
      className={cn(
        `group flex flex-col md:flex-row bg-white dark:bg-dark-6 rounded-xl border shadow-md overflow-hidden
        hover:shadow-xl transition-all duration-400 outline-2 outline-transparent hover:outline-blue-500
        cursor-pointer select-none p-4 md:p-6 gap-4`,
        className,
      )}
      onClick={() => navigate(`/courses/${course.id}`)}
    >
      {/* Left: Image with subtle ring on hover */}
      <div
        className="relative w-full md:size-56 flex-shrink-0 aspect-video md:aspect-square rounded-lg overflow-hidden
          shadow-sm"
      >
        <img src={course.imageUrl ?? ""} alt={course.title} className="object-cover size-full" />
        {course.discountPercentage > 0 && (
          <Badge
            color="red"
            variant="filled"
            className="absolute top-3 right-3 text-xs font-semibold shadow-lg px-2 py-0.5 rounded-xl"
            radius="xl"
          >
            -{course.discountPercentage}%
          </Badge>
        )}
      </div>

      {/* Right: Content */}
      <div className="flex flex-col flex-1 gap-3">
        {/* Title */}
        <Tooltip label={course.title} withArrow position="bottom">
          <h2
            className="text-lg md:text-xl font-semibold leading-tight line-clamp-2 text-gray-900 dark:text-gray-100
              hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {course.title}
          </h2>
        </Tooltip>

        {/* Instructor & Rating */}
        <Group gap="xs" align="center" className="flex-wrap gap-y-1">
          <Avatar
            size="sm"
            src={course.instructorAvatarUrl}
            name={course.instructorName}
            color="cyan"
            radius="xl"
            className="border border-gray-200 dark:border-gray-600"
          />
          <Text size="sm" c="dimmed" className="truncate max-w-[140px] md:max-w-xs">
            by{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {course.instructorName}
            </span>
          </Text>

          <div className="ml-auto md:ml-0 flex gap-2 items-center leading-none">
            <Rating value={course.averageRating ?? 0} fractions={3} size="md" readOnly />
            <Text size="md" fw={600} c="yellow">
              {course.averageRating?.toFixed(1) ?? "0.0"}
            </Text>
            <Text size="md" c="dimmed">
              ({course.reviewCount ?? 0})
            </Text>
          </div>
        </Group>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700 dark:text-gray-400">
          {stats.map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-1.5">
              <Icon size={17} className="text-blue-500 dark:text-blue-400" strokeWidth={2} />
              <span className="truncate font-medium">{label}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        {course.summary && (
          <div>
            <Text size="sm" c="dimmed" className="line-clamp-1 mt-1">
              {course.summary.trim()}
            </Text>
          </div>
        )}

        {/* Footer: Price and button */}
        <div
          className="flex flex-wrap md:flex-nowrap items-center justify-between mt-auto gap-3 pt-3 border-t
            border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3 flex-wrap">
            {course.discountedPrice === 0 ? (
              <>
                <Text className="text-green-600 dark:text-green-400 font-extrabold text-lg tracking-wide">
                  Free
                </Text>
                <Text className="line-through text-gray-400 dark:text-gray-600 font-medium text-base">
                  ${course.price.toFixed(2)}
                </Text>
              </>
            ) : (
              <>
                <Text className="font-extrabold text-lg text-gray-900 dark:text-gray-100 tracking-tight">
                  ${course.discountedPrice.toFixed(2)}
                </Text>
                {course.discountPercentage > 0 && (
                  <Text className="line-through text-gray-400 dark:text-gray-600 font-medium text-base">
                    ${course.price.toFixed(2)}
                  </Text>
                )}
              </>
            )}
          </div>

          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/courses/${course.id}`);
            }}
            className="whitespace-nowrap transition-transform hover:scale-105"
            aria-label={`Learn more about ${course.title}`}
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseListItem;
