import { Button, SegmentedControl, Tabs } from "@mantine/core";
import { IconArrowLeft, IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import CurriculumTab from "../../course-detail/_c/CurriculumTab";
import InstructorTab from "../../course-detail/_c/InstructorTab";
import ReviewTab from "../../course-detail/_c/ReviewTab";
import OverviewForm from "./_c/OverviewForm/OverviewForm";

export default function UpdateCoursePage() {
  const [activeTab, setActiveTab] = useState("overview");

  const { courseId } = useParams<{ courseId: string }>();

  if (!courseId) {
    return <Navigate to="/instructor/courses" replace />;
  }

  return (
    <div className="flex-1 p-6 xl:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Button
          component={Link}
          to="/instructor/courses"
          variant="default"
          size="sm"
          leftSection={<IconArrowLeft size={16} />}
          className="w-fit"
        >
          Back to Courses
        </Button>
        <div className="flex items-center gap-2">
          <IconPencil size={22} className="text-blue-600 dark:text-blue-400" />
          <span className="text-xl sm:text-2xl font-semibold italic text-gray-800 dark:text-gray-300">
            React Native Full Course from Beginner to Expert 2024
          </span>
        </div>
      </div>
      <SegmentedControl
        value={activeTab}
        onChange={setActiveTab}
        transitionDuration={200}
        data={[
          { label: "Overview", value: "overview" },
          { label: "Curriculum", value: "curriculum" },
          { label: "Reviews", value: "reviews" },
          { label: "Instructor", value: "instructor" },
        ]}
        size="sm"
        className="w-full mt-5 grid grid-cols-2 gap-2 md:gap-0 md:grid-flow-col md:auto-cols-fr"
        classNames={{
          root: "bg-white dark:bg-dark-6 shadow-sm border p-[10px]",
          indicator: "bg-linear-to-r bg-blue-5",
          control: "before:hidden",
          label: "data-active:text-white hover:data-active:text-white",
        }}
      />
      <div className="h-[3px] w-24 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-full mt-10" />
      {/* Tab Content */}
      <Tabs defaultValue="personal-info" variant="pills" value={activeTab} className="mt-7">
        <div>
          {/* overview about course */}
          <Tabs.Panel value="overview">
            <OverviewForm courseId={courseId} />
          </Tabs.Panel>
          {/* course curriculum */}
          <Tabs.Panel value="curriculum">
            <CurriculumTab />
          </Tabs.Panel>
          <Tabs.Panel value="reviews">
            <ReviewTab
              rating={4.6}
              totalReviews={2533}
              stars={[
                { stars: 5, percentage: 77 },
                { stars: 4, percentage: 54 },
                { stars: 3, percentage: 14 },
                { stars: 2, percentage: 5 },
                { stars: 1, percentage: 2 },
              ]}
            />
          </Tabs.Panel>
          <Tabs.Panel value="instructor">
            <InstructorTab />
          </Tabs.Panel>
        </div>
      </Tabs>
    </div>
  );
}
