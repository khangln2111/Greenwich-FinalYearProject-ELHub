import { GiftIcon } from "lucide-react";
import { Link } from "react-router";

type GiftsPageEmptyStateProps = {
  type: "sent" | "received";
};

const GiftsPageEmptyState = ({ type }: GiftsPageEmptyStateProps) => {
  if (type === "received")
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <GiftIcon className="w-14 h-14 text-green-500" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          No gifts received yet
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          When someone sends you a gift, it will appear here. Stay tuned!
        </p>
      </div>
    );
  if (type === "sent")
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <GiftIcon className="w-14 h-14 text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          You haven’t sent any gifts yet
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Share the joy of learning by gifting a course to someone special.
        </p>
        <Link
          to="/dashboard/inventory"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium
            transition"
        >
          Browse Inventory
        </Link>
      </div>
    );
};
export default GiftsPageEmptyState;
