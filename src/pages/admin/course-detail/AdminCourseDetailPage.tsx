import { Button, Group, Loader, SegmentedControl, Tabs } from "@mantine/core";
import { IconArrowLeft, IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import ReviewTab from "../../course-detail/_c/ReviewTab";
import { useGetCourseDetail } from "../../../react-query/course/courseHooks";
import AdminCourseOverviewTab from "./_c/AdminCourseOverviewTab";
import VideoPlayerWithThumbnail from "../../../components/media/VideoPlayerWithThumbnail";

const AdminCourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { data: courseDetail, isPending, error } = useGetCourseDetail(courseId!);
  const [activeTab, setActiveTab] = useState("Overview");

  if ((error && error.response?.status === 404) || !courseId) {
    return <Navigate to="/404" replace />;
  }
  return (
    <div className="flex-1 p-6 xl:p-8 @container">
      {/* header */}
      <div className="flex items-center justify-between gap-3 mb-4">
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
        <Group justify="end">
          <Button color="green" variant="light" size="xs">
            Approve
          </Button>
          <Button color="red" variant="light" size="xs">
            Reject
          </Button>
        </Group>
      </div>
      <div className="flex items-center gap-2 mb-4 mx-auto justify-center">
        <IconPencil className="text-blue-600 dark:text-blue-400 size-[16px] md:size-[22px]" />
        <span className="text-xl sm:text-2xl font-semibold italic text-gray-800 dark:text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </span>
      </div>
      {/* Preview Media Section */}
      {courseDetail?.promoVideoUrl && (
        <div className="aspect-video rounded-lg overflow-hidden border shadow-sm max-h-[400px] mb-6 mx-auto">
          <VideoPlayerWithThumbnail
            classNames={{
              playIconWrapper: "md:size-16",
              playIcon: "md:size-8",
              previewImage: "size-full",
            }}
            videoUrl={courseDetail.promoVideoUrl}
            previewThumbnailUrl={courseDetail.imageUrl}
          />
        </div>
      )}
      {/* navigation */}
      <SegmentedControl
        value={activeTab}
        onChange={setActiveTab}
        data={["Overview", "Curriculum", "Submissions"]}
        size="sm"
        className="w-full mt-5 grid grid-cols-2 gap-2 md:gap-0 md:grid-flow-col md:auto-cols-fr"
        classNames={{
          root: "bg-white dark:bg-dark-6 shadow-sm border p-[10px]",
          indicator: "bg-linear-to-r bg-blue-5",
          control: "before:hidden",
          label: "data-active:text-white hover:data-active:text-white",
        }}
      />
      {/* decoration */}
      <div className="h-[3px] w-24 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-full mt-10" />
      {/* tab content */}
      <Tabs variant="pills" value={activeTab} className="mt-7" keepMounted>
        <div>
          {/* overview about course */}
          <Tabs.Panel value="Overview">
            {isPending ? (
              <Loader />
            ) : courseDetail ? (
              <AdminCourseOverviewTab course={courseDetail} />
            ) : (
              <div>No course data found.</div>
            )}
          </Tabs.Panel>
          {/* course curriculum */}
          <Tabs.Panel value="Curriculum">haha</Tabs.Panel>
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
        </div>
      </Tabs>
    </div>
  );
};
export default AdminCourseDetailPage;
