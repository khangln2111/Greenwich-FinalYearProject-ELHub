import { Avatar, Badge, Button, Group, Rating, Text, Tooltip } from "@mantine/core";
import { Clock, LibraryBig, Layers, Tag, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CourseVm } from "../../../../../features/course/course.types";
import { formatDuration } from "../../../../../utils/format";
import { cn } from "../../../../../utils/cn";

type CourseListItemProps = {
  course: CourseVm;
  className?: string;
};

const CourseListItem = ({ course, className }: CourseListItemProps) => {
  const navigate = useNavigate();

  const stats = [
    {
      label: formatDuration({ seconds: course.durationInSeconds, formatType: "long" }),
      icon: Clock,
    },
    {
      label: `${course.lectureCount} lectures`,
      icon: LibraryBig,
    },
    {
      label: course.level,
      icon: Layers,
    },
    {
      label: `${course.enrollmentCount ?? 0} enrolled`,
      icon: Users,
    },
    {
      label: course.categoryName,
      icon: Tag,
    },
  ];

  return (
    <article
      className={cn(
        `flex flex-col md:flex-row bg-white dark:bg-dark-6 rounded-xl shadow-md hover:shadow-lg
        transition-shadow duration-300 overflow-hidden`,
        className,
      )}
    >
      {/* Left: Image */}
      <div
        className="relative w-full md:w-64 flex-shrink-0 aspect-video md:rounded-l-xl overflow-hidden border
          border-gray-200 dark:border-gray-700"
      >
        <img
          src={course.imageUrl ?? ""}
          alt={course.title}
          className="object-cover w-full h-full"
          loading="lazy"
          decoding="async"
        />
        {course.discountPercentage > 0 && (
          <Badge
            color="red"
            variant="filled"
            className="absolute top-3 right-3 text-xs font-semibold shadow-lg"
            radius="sm"
          >
            -{course.discountPercentage}%
          </Badge>
        )}
      </div>

      {/* Right: Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Title */}
        <Tooltip label={course.title} withArrow position="bottom">
          <h2
            onClick={() => navigate(`/courses/${course.id}`)}
            className="cursor-pointer text-lg md:text-xl font-semibold leading-tight line-clamp-2 hover:text-primary-600
              dark:hover:text-primary-400 transition-colors"
            tabIndex={0}
            role="link"
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
            color="initials"
            radius="xl"
          />
          <Text size="sm" color="dimmed" className="truncate max-w-[140px] md:max-w-xs">
            by <span className="font-medium">{course.instructorName}</span>
          </Text>

          <Group gap={4} className="ml-auto md:ml-0">
            <Rating value={course.averageRating ?? 0} fractions={3} size="sm" readOnly />
            <Text size="sm" fw={600} c="yellow" className="min-w-[30px]">
              {course.averageRating?.toFixed(1) ?? "0.0"}
            </Text>
            <Text size="sm" color="dimmed" className="min-w-[30px]">
              ({course.reviewCount ?? 0})
            </Text>
          </Group>
        </Group>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-400">
          {stats.map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-1">
              <Icon size={16} className="text-primary-5 dark:text-primary-4" strokeWidth={2} />
              <span className="truncate">{label}</span>
            </div>
          ))}
        </div>

        {/* Description (optional) */}
        {course.description && (
          <Text size="sm" color="dimmed" className="line-clamp-3 hidden md:block">
            {course.description}
          </Text>
        )}

        {/* Footer: Price and button */}
        <div
          className="flex flex-wrap md:flex-nowrap items-center justify-between mt-auto gap-3 pt-3 border-t
            border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3 flex-wrap">
            {course.discountedPrice === 0 ? (
              <>
                <Text className="text-green-600 dark:text-green-400 font-bold text-lg">Free</Text>
                <Text className="line-through text-gray-500 text-base">
                  ${course.price.toFixed(2)}
                </Text>
              </>
            ) : (
              <>
                <Text className="font-bold text-lg">${course.discountedPrice.toFixed(2)}</Text>
                {course.discountPercentage > 0 && (
                  <Text className="line-through text-gray-500 text-base">
                    ${course.price.toFixed(2)}
                  </Text>
                )}
              </>
            )}
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate(`/courses/${course.id}`)}
            className="whitespace-nowrap"
          >
            Learn More
          </Button>
        </div>
      </div>
    </article>
  );
};

export default CourseListItem;
