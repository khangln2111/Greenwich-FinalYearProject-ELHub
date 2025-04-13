import { Star, Users, MessageSquare, PlayCircle, ChevronDown } from "lucide-react";
import image from "../../../assets/placeholder/avatar-placeholder.jpg";
const InstructorTab = () => {
  return (
    <div className="mx-auto p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        About the instructor
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar + Stats */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <img
            src={image}
            alt="Instructor Avatar"
            className="w-28 h-28 rounded-full object-cover"
          />

          <div className="flex flex-col gap-3 text-sm text-zinc-700 dark:text-zinc-300">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500" size={16} fill="currentColor" stroke="none" />
              <span>4.6 Instructor Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="text-orange-500" size={16} />
              <span>45,786 Students</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="text-blue-500" size={16} />
              <span>2,533 Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <PlayCircle className="text-rose-500" size={16} />
              <span>24 Courses</span>
            </div>
            <button className="text-blue-600 hover:underline dark:text-blue-400">
              View all Courses
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tim Buchalka</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Joined 4 years ago</p>
          <p className="mt-2 font-medium text-gray-800 dark:text-gray-200">
            Java Python Android and C# Expert Developer – 878K+ students
          </p>
          <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book...
          </p>
          <button className="mt-2 flex items-center gap-1 text-blue-600 hover:underline dark:text-blue-400 text-sm font-medium">
            Show more <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default InstructorTab;
