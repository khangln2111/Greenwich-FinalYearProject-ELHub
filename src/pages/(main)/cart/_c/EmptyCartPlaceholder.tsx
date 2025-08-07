import { Anchor } from "@mantine/core";
import { Link } from "react-router-dom";

const EmptyCartPlaceholder = () => {
  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-[#EDF0F3] dark:bg-dark-5 px-4">
      <div className="text-center">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 bg-blue-100 dark:bg-blue-900/20 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-full text-blue-600 dark:text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 4h14l-1.5 9h-11z" />
            <circle cx="9" cy="20" r="1" />
            <circle cx="17" cy="20" r="1" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Let’s fill your cart with knowledge 📚
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You haven't added any courses yet. Let’s explore and find something you’ll love.
        </p>
        <Anchor
          component={Link}
          to="/courses"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full
            transition"
        >
          Browse Courses
        </Anchor>
      </div>
    </div>
  );
};
export default EmptyCartPlaceholder;
