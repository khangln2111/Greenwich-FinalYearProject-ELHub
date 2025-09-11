import { IconReceipt } from "@tabler/icons-react";
import { Link } from "react-router";

const OrderHistoryPageEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <IconReceipt className="w-16 h-16 text-primary-5" />

      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">No orders found</h2>
      <p className="text-gray-600 dark:text-gray-400">
        You haven't purchased anything yet. Discover top-rated courses and start learning today!
      </p>
      <Link
        to="/courses"
        className="inline-block bg-primary-6 hover:bg-primary-7 text-white px-5 py-2 rounded-lg text-sm font-medium
          transition"
      >
        Browse Courses
      </Link>
    </div>
  );
};
export default OrderHistoryPageEmptyState;
