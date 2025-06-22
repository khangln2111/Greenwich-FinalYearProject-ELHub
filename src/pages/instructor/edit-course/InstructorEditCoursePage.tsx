import { Button, Loader, SegmentedControl, Tabs } from "@mantine/core";
import { IconArrowLeft, IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useGetCourseDetail } from "../../../react-query/course/courseHooks";
import InstructorTab from "../../course-detail/_c/InstructorTab";
import ReviewTab from "../../course-detail/_c/ReviewTab";
import CurriculumManager from "./_c/CurriculumManager/CurriculumManager";
import OverviewForm from "./_c/OverviewForm/OverviewForm";

export default function UpdateCoursePage() {
  const { courseId } = useParams<{ courseId: string }>();

  const { data: courseDetail, isPending, error } = useGetCourseDetail(courseId!);

  const [activeTab, setActiveTab] = useState("Curriculum");

  if ((error && error.response?.status === 404) || !courseId) {
    return <Navigate to="/404" replace />;
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
        data={["Overview", "Curriculum", "Reviews", "Instructor"]}
        size="sm"
        transitionDuration={200}
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
      <Tabs variant="pills" value={activeTab} className="mt-7" keepMounted>
        <div>
          {/* overview about course */}
          <Tabs.Panel value="Overview">
            {isPending ? (
              <Loader />
            ) : courseDetail ? (
              <OverviewForm courseId={courseId} courseDetail={courseDetail} />
            ) : (
              <div>No course data found.</div>
            )}
          </Tabs.Panel>
          {/* course curriculum */}
          <Tabs.Panel value="Curriculum">
            {isPending ? (
              <Loader />
            ) : (
              <CurriculumManager courseId={courseId} sections={courseDetail?.sections ?? []} />
            )}
          </Tabs.Panel>
          <Tabs.Panel value="Reviews">
            <ReviewTab
              courseId={courseId}
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
          <Tabs.Panel value="Instructor">
            {courseDetail ? (
              <InstructorTab courseDetail={courseDetail} />
            ) : (
              <div>No course data found.</div>
            )}
          </Tabs.Panel>
        </div>
      </Tabs>
    </div>
  );
}
