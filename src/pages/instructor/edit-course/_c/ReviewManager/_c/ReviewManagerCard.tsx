// ReviewCard.tsx
import { Avatar, Rating } from "@mantine/core";
import dayjs from "dayjs";
import avatarPlaceholder from "../../../../../../assets/placeholder/profile-avatar-placeholder.svg";

interface InstructorReviewManagerCardProps {
  avatarUrl?: string;
  fullName: string;
  rating: number;
  updatedAt: string;
  content: string;
}

const InstructorReviewManagerCard = ({
  avatarUrl,
  fullName,
  rating,
  updatedAt,
  content,
}: InstructorReviewManagerCardProps) => {
  return (
    <div className="w-full bg-white dark:bg-dark-6 rounded-xl shadow-sm border border-gray-200 dark:border-dark-4 p-5">
      <div className="flex items-start gap-4">
        <Avatar
          src={avatarUrl || avatarPlaceholder}
          alt="avatar"
          size="lg"
          radius="xl"
          className="shrink-0"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-base">{fullName}</p>
            <Rating value={rating} readOnly size="sm" />
          </div>
          <p className="text-xs text-gray-500 mt-1">{dayjs(updatedAt).fromNow()}</p>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default InstructorReviewManagerCard;
