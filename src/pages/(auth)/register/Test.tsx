import { Avatar, Badge, Button, Center, Image, Rating, Text, Tooltip } from "@mantine/core";
import { Clock, LibraryBig, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { CourseVm, CourseLevel } from "../../../features/course/course.types";
import { formatDuration } from "../../../utils/format";

type CourseCardProps = {
  course: CourseVm;
};

const levelColorMap: Record<CourseLevel, string> = {
  [CourseLevel.Beginner]: "teal", // Màu dễ chịu, đại diện cho sự khởi đầu, nhẹ nhàng
  [CourseLevel.Intermediate]: "indigo", // Trung gian – mạnh hơn teal, nhưng vẫn không quá nặng
  [CourseLevel.Advanced]: "red", // Màu cảnh báo, thể hiện độ khó cao
  [CourseLevel.All]: "gray", // Trung tính, dùng cho mọi đối tượng
};

const Test = ({ course }: CourseCardProps) => {
  const features = [
    {
      label: formatDuration({ seconds: course.durationInSeconds, formatType: "long" }),
      icon: Clock,
    },
    {
      label: `${course.lectureCount} lectures`,
      icon: LibraryBig,
    },
    {
      label: `${course.enrollmentCount ?? 0} enrolled`,
      icon: Users,
    },
  ];

  return (
    <div
      className="bg-white dark:bg-dark-6 transition-transform hover:scale-103 duration-200 rounded-2xl
        overflow-hidden border shadow-sm grid grid-rows-subgrid row-span-7 gap-y-0 border-gray-200
        dark:border-dark-4"
    >
      {/* Image section */}
      <div className="flex items-center justify-center relative">
        <div className="aspect-video overflow-hidden size-full">
          <Image
            src={course.imageUrl ?? ""}
            alt={course.title}
            className="object-cover size-full"
          />
        </div>
        {course.discountPercentage > 0 && (
          <div className="absolute top-3 right-2">
            <Badge color="red" className="rounded-sm px-2 py-3 text-[12px]">
              -{course.discountPercentage}%
            </Badge>
          </div>
        )}
      </div>

      {/* Level badge */}
      <div className="mt-xs px-md">
        {course.level && (
          <Badge
            size="xl"
            autoContrast
            color={levelColorMap[course.level]}
            variant="light"
            className="rounded-xs capitalize text-md px-2 font-semibold"
          >
            {course.level}
          </Badge>
        )}
      </div>

      {/* Title */}
      <div className="px-md mt-3">
        <Tooltip
          label={course.title}
          withArrow
          position="bottom"
          transitionProps={{ duration: 200 }}
        >
          <Text
            className="font-bold text-xl text-left cursor-pointer md:line-clamp-2 xl:line-clamp-2"
            component={Link}
            to={`/courses/${course.id}`}
          >
            {course.title}
          </Text>
        </Tooltip>
      </div>

      {/* Author */}
      <div className="flex gap-2 items-center text-wrap mt-2 px-md">
        <Avatar
          color="initials"
          size="sm"
          name={course.instructorName}
          src={course.instructorAvatarUrl}
        />
        <Text className="text-gray-500 text-sm block dark:text-gray-5">
          by <span className="font-semibold">{course.instructorName}</span>
        </Text>
      </div>

      {/* Rating */}
      <div className="flex gap-1 mt-3 items-center px-md leading-none">
        <Rating
          value={course.averageRating ?? 0}
          fractions={3}
          readOnly
          className="flex items-center justify-center"
        />
        <p className="text-yellow-6 font-bold">{course.averageRating?.toFixed(1) ?? 0.0}</p>
        <p className="text-dimmed">({course.reviewCount ?? 0})</p>
      </div>

      {/* Icons section */}
      <div className="p-md">
        <div className="gap-y-2 grid grid-cols-3 justify-items-start">
          {features.map((feature) => (
            <Center key={feature.label} className="w-fit">
              <feature.icon size={20} className="mr-[5px] text-primary-3 dark:text-primary-5" />
              <Text className="font-medium text-xs text-gray-500 dark:text-gray-400">
                {feature.label}
              </Text>
            </Center>
          ))}
        </div>
      </div>

      {/* Price & CTA section */}
      <div className="p-md pt-0 border-gray-3 dark:border-dark-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2 items-baseline flex-wrap-reverse">
            {course.discountedPrice === 0 ? (
              <>
                <Text className="font-bold text-xl leading-none text-green-600 dark:text-green-400">
                  Free
                </Text>
                <Text className="text-dimmed line-through text-md">${course.price.toFixed(2)}</Text>
              </>
            ) : (
              <>
                <Text className="font-bold text-xl leading-none">
                  ${course.discountedPrice.toFixed(2)}
                </Text>
                {course.discountPercentage > 0 && (
                  <Text className="text-dimmed line-through text-md">
                    ${course.price.toFixed(2)}
                  </Text>
                )}
              </>
            )}
          </div>
          <Button
            className="w-fit shrink-0 text-sm font-medium"
            size="xs"
            component={Link}
            to={`/courses/${course.id}`}
          >
            View More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Test;
