import { Button } from "@mantine/core";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router";
import HomePageSectionWrapper from "./HomePageSectionWrapper";
import becomeInstructorImg from "../../../../assets/homePageImages/BecomeInstructor.webp";

const BecomeInstructorSection = () => {
  return (
    <HomePageSectionWrapper
      className="relative overflow-hidden bg-gradient-to-br from-slate-100 to-gray-200 dark:from-slate-900
        dark:to-gray-900"
      classNames={{
        container: "grid md:grid-cols-2 gap-12 items-center",
      }}
    >
      {/* Text content */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <GraduationCap className="w-6 h-6 text-primary-6 dark:text-primary-3" />
          <span className="uppercase tracking-wide text-sm font-semibold text-primary-6 dark:text-primary-2">
            Become an Instructor
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Teach. Inspire. Earn.
        </h2>

        <p className="mt-4 text-base md:text-lg text-gray-700 dark:text-gray-200 max-w-lg">
          Share your expertise with a global audience. Earn income and empower thousands of learners
          worldwide.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <Link to="/become-instructor">
            <Button size="lg" className="px-6 py-3 rounded-full">
              Start Teaching
            </Button>
          </Link>
        </div>
      </div>

      {/* Image */}
      <div className="relative">
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img
            src={becomeInstructorImg}
            alt="Become an Instructor"
            className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
          />
        </div>
        {/* subtle blob */}
        <div
          className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-indigo-300 dark:bg-indigo-700 rounded-full blur-3xl
            opacity-50"
        />
      </div>
    </HomePageSectionWrapper>
  );
};

export default BecomeInstructorSection;
