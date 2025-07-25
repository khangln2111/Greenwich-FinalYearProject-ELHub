import { Rating } from "@mantine/core";
import dayjs from "dayjs";
import avatarPlaceholder from "../../../../../../assets/placeholder/profile-avatar-placeholder.svg";
import { ReviewVm } from "../../../../../../react-query/review/review.types";
import { cn } from "../../../../../../utils/cn";

interface InstructorReviewManagerCardProps {
  review: ReviewVm;
  className?: string;
}

const InstructorReviewManagerCard = ({ review, className }: InstructorReviewManagerCardProps) => {
  return (
    <div
      className={cn(
        "p-4 border rounded-lg shadow-sm bg-body flex flex-col gap-3 w-full ",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <img
          src={review.avatarUrl || avatarPlaceholder}
          alt="User avatar"
          className="size-16 rounded-full object-cover"
        />
        <div className="flex-1 flex flex-col gap-1 md:gap-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-xl font-medium">{review.userFullName}</p>
            <Rating value={review.rating} readOnly size="md" />
          </div>
          <p className="text-sm text-gray-500 dark:text-dark-2">
            {dayjs(review.updatedAt).fromNow()}
          </p>
        </div>
      </div>
      <div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{review.content}</p>
      </div>
    </div>
  );
};

export default InstructorReviewManagerCard;
