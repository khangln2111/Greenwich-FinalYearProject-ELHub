import { Star } from "lucide-react";
import image from "../../../../assets/react-course-image.svg";
const TestCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-80">
      {/* Course Image */}
      <img src={image} alt="haha" className="w-full h-48 object-cover" />

      <div className="p-4">
        {/* Course Name */}
        <h3 className="text-lg font-semibold text-gray-900">
          React 18 Mastery
        </h3>

        {/* Author */}
        <p className="text-sm text-gray-600">By Le Nguyen Khang</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={16}
              className={index < 3 ? "text-yellow-500" : "text-gray-300"}
            />
          ))}
          <span className="text-sm text-gray-600">(5/5)</span>
        </div>

        {/* Short Description */}
        <p className="text-sm text-gray-700 mt-2 line-clamp-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea
          architecto sequi provident, molestiae quae libero! Error mollitia nam
          ipsum cumque?
        </p>

        {/* Additional Info */}
        <div className="flex justify-between items-center mt-3">
          <p className="text-sm text-gray-500">50 students</p>
          <p className="text-lg font-semibold text-indigo-600">$946</p>
        </div>

        {/* Action Button */}
        <button
          className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700
            transition"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default TestCard;
