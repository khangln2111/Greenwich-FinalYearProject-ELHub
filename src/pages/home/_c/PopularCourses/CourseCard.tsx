import { Avatar, Badge, Button, Center, Image, Rating, Text } from "@mantine/core";
import { Clock, LibraryBig, Users } from "lucide-react";
import CourseImage from "../../../../assets/react-course-image.svg";
const mockdata = [
  { label: "168h 10m", icon: Clock },
  { label: "300 lectures", icon: LibraryBig },
  { label: "300 enrolled", icon: Users },
];

const CourseCard = () => {
  const features = mockdata.map((feature) => (
    <Center key={feature.label} className="w-fit">
      <feature.icon
        size={20}
        className="mr-[5px] text-primary-3 dark:text-primary-5"
        strokeWidth={2.5}
      />
      <Text className="font-semibold text-xs text-gray-500 dark:text-gray-400">
        {feature.label}
      </Text>
    </Center>
  ));

  return (
    <div className="bg-body transition-transform hover:scale-103 duration-200 rounded-2xl overflow-hidden shadow-2xl">
      {/* Image section */}
      <div className="flex items-center justify-center relative">
        <Image src={CourseImage} alt="Tesla Model S" className="size-auto" />
        <div className="absolute top-3 right-2">
          <Badge color="red" className="rounded-sm px-2 py-3 text-[12px]">
            -25%
          </Badge>
        </div>
      </div>

      {/* Title, author, rating section */}
      <div className="mt-xs px-md">
        <Badge
          size="xl"
          autoContrast
          color="green"
          variant="light"
          className="rounded-xs capitalize text-md px-2 font-semibold"
        >
          Beginner
        </Badge>
        <Text className="font-bold text-lg line-clamp-3 mt-3 text-left cursor-pointer">
          Spring Boot: Mastering the Fundamentals Spring Boot
        </Text>
        <div className="flex gap-2 items-center text-wrap mt-2">
          <Avatar color="initials" size="sm" className="border-1" name="Nguyen Khang"></Avatar>
          <Text className="text-gray-500 text-sm block dark:text-gray-5">
            by <span className="font-semibold">Nguyen Khang</span>
          </Text>
        </div>
        <div className="flex gap-1 mt-1 items-center">
          <Rating
            defaultValue={4.7}
            fractions={3}
            readOnly
            className="flex items-center justify-center mt-[1px]"
          />
          <p className="text-yellow-6 font-bold">4.7</p>
          <p className="text-dimmed">(458)</p>
        </div>
      </div>

      {/* Icons section */}
      <div className="p-md border-t border-gray-3 dark:border-dark-4 mt-md">
        {/* <Text
          fz="sm"
          c="dimmed"
          className="mb-md leading-[1] font-bold text-xs tracking-[-0.25px] uppercase"
        >
          Basic information
        </Text> */}

        <div className="gap-y-2 grid grid-cols-3 justify-items-start">{features}</div>
      </div>
      {/* Price & CTA section */}
      <div className="p-md pt-0 border-gray-3 dark:border-dark-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2 items-baseline flex-wrap-reverse">
            <Text className="font-bold text-xl leading-none">$168.00</Text>
            <Text className="text-dimmed line-through text-md">$200.00</Text>
          </div>
          <Button className="w-fit shrink-0">View More</Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
