import { Avatar, Button, Image, Rating, Text, Tooltip } from "@mantine/core";
import { Clock, LibraryBig, Layers, Tag, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { CourseVm } from "../../../../react-query/course/course.types";
import { formatDuration } from "../../../../utils/format";
import { cn } from "../../../../utils/cn";

type CourseCardProps = {
  course: CourseVm;
  className?: string; // Optional className prop for additional styling
};

const CourseCard = ({ course, className }: CourseCardProps) => {
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
    {
      label: course.categoryName,
      icon: Tag,
    },
  ];

  return (
    <Link
      to={`/courses/${course.id}`}
      className={cn(
        `flex flex-col bg-white dark:bg-dark-6 rounded-xl shadow-md overflow-hidden hover:shadow-xl
        transition-all duration-400 outline-2 outline-transparent hover:outline-blue-500`,
        className,
      )}
    >
      {/* padding wrapper */}
      <div className="p-4 flex flex-col flex-1">
        {/* Image */}
        <div
          className="relative w-full aspect-video mb-3 rounded-md overflow-hidden border border-black/10
            dark:border-white/10"
        >
          <Image
            src={course.imageUrl ?? ""}
            alt={course.title}
            className="object-cover size-full"
          />
          {course.discountPercentage > 0 && (
            <div className="absolute top-2 right-2 px-2 py-1 bg-red text-white text-xs font-semibold rounded-full shadow">
              -{course.discountPercentage}%
            </div>
          )}
        </div>
        {/* Content */}
        <div className="flex flex-col flex-1 gap-y-2">
          {/* Title */}
          <Tooltip label={course.title} withArrow position="bottom">
            <Text
              component={Link}
              to={`/courses/${course.id}`}
              className="text-[21px] font-semibold leading-snug line-clamp-2 hover:text-primary-600
                dark:hover:text-primary-400 transition"
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
            {stats.map(({ label, icon: Icon }, index) => {
              const isLast = index === stats.length - 1;
              const isOdd = stats.length % 2 !== 0;

              return (
                <div
                  key={label}
                  className={cn(
                    "flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400",
                    {
                      "col-span-2": isLast && isOdd,
                    },
                  )}
                >
                  <Icon
                    size={16}
                    className="text-primary-4 dark:text-primary-5"
                    strokeWidth={2.3}
                  />
                  {label}
                </div>
              );
            })}
          </div>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between pt-4 mt-auto">
          {/* Price */}
          <div className="flex items-center gap-2">
            {course.discountedPrice === 0 ? (
              <>
                <Text className="text-green-600 dark:text-green-400 font-bold">Free</Text>
                <Text className="line-through text-lg text-gray-500">
                  ${course.price.toFixed(2)}
                </Text>
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
      </div>
    </Link>
  );
};

export default CourseCard;
