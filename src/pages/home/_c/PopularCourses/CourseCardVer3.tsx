import { Avatar, Button, Image, Rating, Text, Tooltip } from "@mantine/core";
import { Clock, Layers, LibraryBig, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { CourseVm } from "../../../../react-query/course/course.types";
import { cn } from "../../../../utils/cn";
import { formatDuration } from "../../../../utils/format";

type CourseCardProps = {
  course: CourseVm;
  className?: string;
};

const CourseCardVer3 = ({ course, className }: CourseCardProps) => {
  const stats = [
    {
      label: formatDuration({
        seconds: course.durationInSeconds,
        formatType: "long",
      }),
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
  ];

  return (
    <Link
      to={`/courses/${course.id}`}
      className={cn(
        `flex flex-col bg-white dark:bg-dark-6 rounded-xl shadow-md overflow-hidden hover:shadow-xl
        transition-all duration-400 outline-2 outline-transparent hover:outline-blue-500 p-4 h-full`,
        className,
      )}
    >
      {/* Image */}
      <div className="relative w-full aspect-video overflow-hidden mb-3">
        <Image
          src={course.imageUrl ?? ""}
          alt={course.title}
          className="object-cover w-full h-full rounded-md"
        />
        {course.discountPercentage > 0 && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-red text-white text-xs font-semibold rounded-full shadow">
            -{course.discountPercentage}%
          </div>
        )}
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit]"
          style={{ boxShadow: "inset 0 2px 4px 0 hsla(0,0%,0%,0.1)" }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 gap-y-2">
        {/* Category */}
        <Text className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide mb-1">
          🏷️ {course.categoryName}
        </Text>

        {/* Title */}
        <Tooltip label={course.title} withArrow position="bottom">
          <Text
            component={Link}
            to={`/courses/${course.id}`}
            className="text-[21px] font-semibold leading-snug line-clamp-2 hover:text-primary-600
              dark:hover:text-primary-400 transition flex-1 min-h-[56px]"
          >
            {course.title}
          </Text>
        </Tooltip>

        {/* Instructor */}
        <div className="flex items-center gap-2 mt-1">
          <Avatar size="sm" src={course.instructorAvatarUrl} />
          <Text className="text-sm text-gray-600 dark:text-gray-400 truncate">
            by <span className="font-medium">{course.instructorName}</span>
          </Text>
        </div>

        {/* Rating */}
        <div className="flex gap-2 mt-2 items-center leading-none">
          <Rating
            value={course.averageRating ?? 0}
            fractions={3}
            size="md"
            readOnly
            className="flex items-center justify-center"
          />
          <p className="text-yellow font-bold">{course.averageRating?.toFixed(1) ?? 0.0}</p>
          <p className="text-gray-500">({course.reviewCount ?? 0})</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-3">
          {stats.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400"
            >
              <Icon size={16} className="text-primary-4 dark:text-primary-5" strokeWidth={2.3} />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 mt-auto">
        {/* Price */}
        <div className="flex items-center gap-2">
          {course.discountedPrice === 0 ? (
            <>
              <Text className="text-green-600 dark:text-green-400 font-bold">Free</Text>
              <Text className="line-through text-lg text-gray-500">${course.price.toFixed(2)}</Text>
            </>
          ) : (
            <>
              <Text className="font-bold text-lg">${course.discountedPrice.toFixed(2)}</Text>
              {course.discountPercentage > 0 && (
                <Text className="line-through text-lg text-gray-500">
                  ${course.price.toFixed(2)}
                </Text>
              )}
            </>
          )}
        </div>
        {/* CTA */}
        <Button component={Link} to={`/courses/${course.id}`} size="sm" variant="outline">
          Learn More
        </Button>
      </div>
    </Link>
  );
};

export default CourseCardVer3;
