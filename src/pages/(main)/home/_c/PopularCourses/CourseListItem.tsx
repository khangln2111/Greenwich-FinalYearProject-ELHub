import { Avatar, Badge, Button, Group, Rating, Text, Tooltip, Box } from "@mantine/core";
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
        `flex flex-col md:flex-row bg-white dark:bg-dark-6 rounded-2xl shadow-md hover:shadow-xl
        transition-shadow duration-300 overflow-hidden select-none ring-1 ring-transparent
        hover:ring-blue-400 dark:hover:ring-blue-600 focus-within:ring-blue-400
        dark:focus-within:ring-blue-600 focus:outline-none cursor-pointer p-6`,
        className,
      )}
      tabIndex={0}
      role="link"
      onClick={() => navigate(`/courses/${course.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          navigate(`/courses/${course.id}`);
        }
      }}
    >
      {/* Left: Image with padding */}
      <Box
        component="div"
        className="relative w-full md:w-72 flex-shrink-0 aspect-square md:rounded-l-2xl overflow-hidden"
      >
        <img
          src={course.imageUrl ?? ""}
          alt={course.title}
          className="object-cover w-full h-full rounded-lg shadow-md transition-transform duration-300 ease-in-out
            hover:scale-105"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        {course.discountPercentage > 0 && (
          <Badge
            color="red"
            variant="filled"
            className="absolute top-4 right-4 text-xs font-semibold shadow-lg px-3 py-1 rounded-xl"
            radius="xl"
          >
            -{course.discountPercentage}%
          </Badge>
        )}
      </Box>

      {/* Right: Content */}
      <div className="flex flex-col flex-1 md:pl-10 gap-4">
        {/* Title */}
        <Tooltip label={course.title} withArrow position="bottom">
          <h2
            className="text-base md:text-2xl font-semibold leading-tight line-clamp-2 text-gray-900 dark:text-gray-100
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
          <Text size="sm" c="dimmed" className="truncate max-w-[150px] md:max-w-xs">
            by{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {course.instructorName}
            </span>
          </Text>

          <Group gap={4} className="ml-auto md:ml-0">
            <Rating value={course.averageRating ?? 0} fractions={3} size="sm" readOnly />
            <Text size="sm" fw={600} c="yellow" className="min-w-[30px]">
              {course.averageRating?.toFixed(1) ?? "0.0"}
            </Text>
            <Text size="sm" c="dimmed" className="min-w-[30px]">
              ({course.reviewCount ?? 0})
            </Text>
          </Group>
        </Group>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700 dark:text-gray-400">
          {stats.map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon size={18} className="text-blue-500 dark:text-blue-400" strokeWidth={2} />
              <span className="truncate font-medium">{label}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        {course.description && (
          <Text size="sm" c="dimmed" className="line-clamp-3 hidden md:block mt-2">
            {course.description}
          </Text>
        )}

        {/* Footer: Price and button */}
        <div
          className="flex flex-wrap md:flex-nowrap items-center justify-between mt-auto gap-4 pt-4 border-t
            border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-4 flex-wrap">
            {course.discountedPrice === 0 ? (
              <>
                <Text className="text-green-600 dark:text-green-400 font-extrabold text-xl tracking-wide">
                  Free
                </Text>
                <Text className="line-through text-gray-400 dark:text-gray-600 font-medium text-lg">
                  ${course.price.toFixed(2)}
                </Text>
              </>
            ) : (
              <>
                <Text className="font-extrabold text-xl text-gray-900 dark:text-gray-100 tracking-tight">
                  ${course.discountedPrice.toFixed(2)}
                </Text>
                {course.discountPercentage > 0 && (
                  <Text className="line-through text-gray-400 dark:text-gray-600 font-medium text-lg">
                    ${course.price.toFixed(2)}
                  </Text>
                )}
              </>
            )}
          </div>

          <Button
            size="md"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
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
    </article>
  );
};

export default CourseListItem;
