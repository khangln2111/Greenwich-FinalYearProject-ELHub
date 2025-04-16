import { Spoiler, Title } from "@mantine/core";
import { MessageSquare, PlayCircle, Star, Users } from "lucide-react";
import image from "../../../assets/placeholder/avatar-placeholder.jpg";

const InstructorTab = () => {
  return (
    <div>
      <Title order={2}>Meet your instructor</Title>
      <div className="mx-auto p-6 bg-gray-50 dark:bg-zinc-900 shadow-lg rounded-lg mt-5">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column: Avatar */}
          <div className="size-50">
            <img
              src={image}
              alt="Instructor Avatar"
              className="max-w-full aspect-square object-cover rounded-md"
            />
          </div>

          {/* Right column: Instructor Info */}
          <div className="md:flex-6 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tim Buchalka</h3>
            <p className="font-medium text-gray-500 dark:text-zinc-400">
              Java Python Android and C# Expert Developer
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-2 text-sm text-zinc-700 dark:text-zinc-300 mt-5 md:mt-auto">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-500" size={16} fill="currentColor" stroke="none" />
                <span className="text-md font-medium text-zinc-600 dark:text-zinc-400">
                  4.6 Rating
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-orange-500" size={16} />
                <span className="text-md font-medium text-zinc-600 dark:text-zinc-400">
                  45,786 Students
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="text-blue-500" size={16} />
                <span className="text-md font-medium text-zinc-600 dark:text-zinc-400">
                  2,533 Reviews
                </span>
              </div>
              <div className="flex items-center gap-2">
                <PlayCircle className="text-rose-500" size={16} />
                <span className="text-md font-medium text-zinc-600 dark:text-zinc-400">
                  24 Courses
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Description with Spoiler */}
        <Spoiler maxHeight={100} showLabel="Show more" hideLabel="Hide">
          <p className="mt-3 text-gray-800 dark:text-gray-400 leading-loose">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book...
            <br />
            After learning the hard way, Tim was determined to become the best teacher he could, and
            to make his training as painless as possible, so that you, or anyone else with the
            desire to become a software developer, could become one.
            <br />
            If you want to become a financial analyst, a finance manager, an FP&A analyst, an
            investment banker, a business executive, an entrepreneur, a business intelligence
            analyst, a data analyst, or a data scientist, Tim Buchalka's courses are the perfect
            course to start.
          </p>
        </Spoiler>
      </div>
    </div>
  );
};

export default InstructorTab;
