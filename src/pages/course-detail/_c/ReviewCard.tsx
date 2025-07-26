import { Rating } from "@mantine/core";
import dayjs from "dayjs";
import { ShieldCheckIcon } from "lucide-react";
import { ReviewVm } from "../../../react-query/review/review.types";
import avatar from "../../../assets/placeholder/profile-avatar-placeholder.svg";

interface ReviewCardProps {
  review: ReviewVm;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div
      key={review.id}
      className="p-6 border rounded-lg shadow-sm bg-body flex flex-col gap-4 mx-auto w-full"
    >
      {/* Review header */}
      <div className="flex items-center gap-4">
        <img
          src={review.userAvatarUrl || avatar}
          alt="User avatar"
          className="size-16 rounded-full object-cover"
        />
        <div className="flex-1 flex flex-col gap-1 md:gap-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-lg font-medium dark:text-white">{review.userFullName}</p>
            <Rating value={review.rating} readOnly size="md" />
          </div>
          <p className="text-sm text-gray-500 dark:text-dark-2">
            {dayjs(review.updatedAt).fromNow()}
          </p>
        </div>
      </div>

      {/* Review content */}
      <div>
        <p className="mt-2 text-gray-800 dark:text-gray-300 leading-relaxed">{review.content}</p>
      </div>

      {/* Reply (if any) */}
      {review.reply && (
        <div className="relative mt-4 ml-6 border-l-4 pl-4 pr-3 py-3 rounded-md bg-gray-50 dark:bg-dark-8">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={review.reply.creatorAvatarUrl || avatar}
              alt="Instructor avatar"
              className="size-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <p className="font-semibold text-primary-700 dark:text-primary-300">
                  {review.reply.creatorFullName}
                </p>
                <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-300">
                  <ShieldCheckIcon size={16} strokeWidth={2.2} />
                  <span>Instructor</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {dayjs(review.reply.updatedAt).fromNow()}
              </p>
            </div>
          </div>

          <p className="text-gray-800 dark:text-gray-300 leading-relaxed">{review.reply.content}</p>
        </div>
      )}
    </div>
  );
};
export default ReviewCard;
