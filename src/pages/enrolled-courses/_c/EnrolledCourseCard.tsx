import { Button, Progress, Rating, Text, Avatar } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

interface EnrolledCourseCardProps {
  imageUrl: string;
  title: string;
  author: string;
  progressPercent: number;
  rating: number;
  courseId: string;
}

export default function EnrolledCourseCard({
  imageUrl,
  title,
  author,
  progressPercent,
  rating,
  courseId,
}: EnrolledCourseCardProps) {
  const navigate = useNavigate();
  const [userRating, setUserRating] = useState(rating);

  const handleOpenRatingModal = () => {
    modals.open({
      title: "Đánh giá khóa học",
      children: (
        <div className="flex flex-col gap-4">
          <Rating value={userRating} onChange={setUserRating} size="lg" count={5} color="yellow" />
          <Button onClick={() => modals.closeAll()}>Gửi đánh giá</Button>
        </div>
      ),
      centered: true,
    });
  };

  return (
    <div className="bg-body rounded-xl shadow-sm hover:shadow-md transition p-3 flex flex-col">
      <div className="overflow-hidden rounded-lg aspect-video">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover size-full transition duration-300 hover:scale-105"
        />
      </div>

      <div className="mt-3 flex-1 flex flex-col justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text line-clamp-2">{title}</h3>
          <div className="flex gap-2 items-center text-wrap mt-2">
            <Avatar color="initials" size="sm" className="border-1" name="Nguyen Khang" />
            <Text className="text-gray-500 text-sm block dark:text-gray-5">
              by <span className="font-semibold">Nguyen Khang</span>
            </Text>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2 justify-between">
            <p className="text-md text-gray-400">Complete</p>
            <p className="text-md text-gray-400">{progressPercent}%</p>
          </div>
          <Progress
            value={progressPercent}
            size="md"
            striped
            radius="xl"
            classNames={{
              root: "bg-gray-200 dark:bg-dark-4",
            }}
          />
        </div>

        <div className="flex items-center gap-2 mt-2">
          <Button
            size="xs"
            variant="outline"
            radius="xl"
            color="gray"
            leftSection={<Star size={14} />}
            onClick={handleOpenRatingModal}
          >
            Leave a rating
          </Button>
        </div>
      </div>
    </div>
  );
}
