import { Avatar, Button, Progress, Rating, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Play, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EnrollmentVm } from "../../../react-query/enrollment/enrollment.types";

interface EnrolledCourseCardProps {
  enrollment: EnrollmentVm;
}

export default function EnrolledCourseCard({ enrollment }: EnrolledCourseCardProps) {
  const navigate = useNavigate();

  const handleOpenRatingModal = () => {
    modals.open({
      title: "Rating the course",
      children: (
        <div className="flex flex-col gap-4">
          <Rating value={5} size="lg" count={5} color="yellow" />
          <Button onClick={() => modals.closeAll()}>Submit</Button>
        </div>
      ),
      centered: true,
    });
  };

  const handleNavigateToLearningPage = () => {
    navigate(`/learning/${enrollment.courseId}`);
  };

  return (
    <div
      className="bg-body rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300
        overflow-hidden flex flex-col group p-4"
    >
      {/* Image Section */}
      <div
        className="relative aspect-video cursor-pointer overflow-hidden rounded-lg"
        onClick={handleNavigateToLearningPage}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleNavigateToLearningPage();
        }}
      >
        <img
          src={enrollment.courseImageUrl}
          alt={enrollment.courseTitle}
          className="w-full h-full object-cover transition-transform duration-300"
          draggable={false}
        />

        {/* Overlay Play Button */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0
            group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        >
          <div className="bg-white dark:bg-dark-4 bg-opacity-90 backdrop-blur-sm rounded-full p-3 shadow-lg">
            <Play size={28} className="text-gray-800 dark:text-white" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-4 flex-1 mt-4">
        <div className="flex-1">
          <h3
            className="text-lg font-semibold line-clamp-2 cursor-pointer"
            onClick={handleNavigateToLearningPage}
          >
            {enrollment.courseTitle}
          </h3>
          <div className="flex gap-2 items-center mt-2">
            <Avatar
              allowedInitialsColors={["red", "blue", "cyan"]}
              color="initials"
              size="sm"
              radius="xl"
              name="Nguyen Khang"
            />
            <Text className="text-gray-500 text-sm dark:text-gray-400">
              by <span className="font-semibold">Nguyen Khang</span>
            </Text>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-md text-gray-500 dark:text-gray-400">
            <span>Complete</span>
            <span>{enrollment.progressPercentage}%</span>
          </div>
          <Progress value={enrollment.progressPercentage} size="md" striped radius="xl" />
        </div>

        <div className="flex items-center justify-between mt-2">
          <Rating value={4} readOnly size="xs" />
          <Button
            variant="outline"
            radius="lg"
            color="gray"
            leftSection={<Star size={14} />}
            onClick={(e) => {
              e.stopPropagation(); // tránh kích hoạt click bên ngoài
              handleOpenRatingModal();
            }}
          >
            Leave a rating
          </Button>
        </div>
      </div>
    </div>
  );
}
