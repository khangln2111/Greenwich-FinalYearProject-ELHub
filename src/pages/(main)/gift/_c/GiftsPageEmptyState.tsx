import { GiftIcon } from "lucide-react";

const GiftsPageEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <GiftIcon className="w-14 h-14 text-green-500" />
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">No gifts received yet</h2>
      <p className="text-gray-600 dark:text-gray-400">
        When someone sends you a gift, it will appear here. Stay tuned!
      </p>
    </div>
  );
};
export default GiftsPageEmptyState;
