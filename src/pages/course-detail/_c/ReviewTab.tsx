import { Progress, Rating } from "@mantine/core";
import { IconStarFilled } from "@tabler/icons-react";

interface FeedbackProps {
  rating: number;
  totalReviews: number;
  stars: { stars: number; percentage: number }[];
}

const ReviewTab = ({ rating, totalReviews, stars }: FeedbackProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 shadow-lg border rounded-lg border-gray-200 py-15 px-4">
      {/* Left section */}
      <div className="flex flex-col items-center md:items-start col-span-1">
        <div className="text-orange-500 text-5xl font-bold">{rating.toFixed(1)}</div>
        <div className="flex flex-col items-center md:items-start">
          <Rating value={rating} readOnly size="lg" />
          <span className="text-gray-500 text-sm">({totalReviews.toLocaleString()})</span>
          <span className="text-gray-500 text-xs">Course Rating</span>
        </div>
      </div>

      {/* Right section */}
      <div className="grid grid-rows-5 gap-y-5 gap-x-3 grid-cols-[auto_1fr_auto] col-span-3">
        {stars.map(({ stars, percentage }) => (
          <div
            key={stars}
            className="grid grid-cols-subgrid col-span-3 items-center justify-center"
          >
            {/* Stars */}
            <div className="flex items-center justify-center text-yellow-500 gap-2">
              <p className="text-gray-600 text-sm font-medium leading-none">{stars}</p>
              <IconStarFilled size={16} />
            </div>

            {/* Progress Bar */}
            <Progress value={percentage} size="lg" color="orange" striped />

            {/* Percentage */}
            <span className="text-gray-500 text-sm text-left leading-none">{percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewTab;
