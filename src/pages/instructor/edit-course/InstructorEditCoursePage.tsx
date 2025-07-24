import { Badge, Button, Group, SegmentedControl, Tabs, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconArrowLeft, IconPencil, IconUpload } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import CenterLoader from "../../../components/CenterLoader";
import { CourseStatus } from "../../../react-query/course/course.types";
import {
  useGetCourseDetail,
  useRetrySubmitCourse,
  useSubmitCourse,
} from "../../../react-query/course/courseHooks";
import CurriculumManager from "./_c/CurriculumManager/CurriculumManager";
import InstructorCourseSubmissionTab from "./_c/InstructorCourseSubmission";
import OverviewForm from "./_c/OverviewForm/OverviewForm";
import ReviewManager from "./_c/ReviewManager/ReviewManager";

enum CourseDetailTab {
  Overview = "Overview",
  Curriculum = "Curriculum",
  Reviews = "Reviews",
  Submissions = "Submissions",
}

export default function InstructorEditCoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { data: courseDetail, isPending, error } = useGetCourseDetail(courseId!);
  const [activeTab, setActiveTab] = useState<CourseDetailTab>(CourseDetailTab.Overview);

  const submitMutation = useSubmitCourse();
  const retrySubmitMutation = useRetrySubmitCourse();

  if (isPending) return <CenterLoader />;
  if (error || !courseId || !courseDetail) return <Navigate to="/404" replace />;

  const canSubmit = courseDetail.status === CourseStatus.Draft;
  const canRetry = courseDetail.status === CourseStatus.Rejected;

  const handleConfirmSubmit = () => {
    modals.openConfirmModal({
      title: "Submit Course for Review",
      centered: true,
      children: (
        <Text size="sm">
          This action will submit your course to the admin for review. You won’t be able to edit it
          while it's pending approval. Do you want to proceed?
        </Text>
      ),
      labels: { confirm: "Submit", cancel: "Cancel" },
      confirmProps: { color: "blue", leftSection: <IconUpload size={16} /> },
      onConfirm: () => submitMutation.mutate(courseId!),
    });
  };

  const handleConfirmRetry = () => {
    modals.openConfirmModal({
      title: "Retry Course Submission",
      centered: true,
      children: (
        <Text size="sm">
          You are retrying submission of this course after it was rejected. Please make sure all
          issues have been addressed before proceeding.
        </Text>
      ),
      labels: { confirm: "Retry", cancel: "Cancel" },
      confirmProps: { color: "blue", leftSection: <IconUpload size={16} /> },
      onConfirm: () => retrySubmitMutation.mutate(courseId!),
    });
  };

  return (
    <div className="flex-1 p-6 xl:p-8">
      {/* Back button */}
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
      </div>

      {/* Course title */}
      <div className="flex flex-col items-center justify-center text-center mb-6 sm:flex-row sm:gap-2">
        <IconPencil className="text-blue-600 dark:text-blue-400 size-5 sm:size-6 md:size-7" />
        <span className="mt-1 sm:mt-0 text-xl md:text-2xl font-semibold italic text-gray-800 dark:text-gray-300">
          {courseDetail.title}
        </span>
      </div>

      {/* Status bar */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-100 dark:bg-dark-6 p-4
          rounded-xl mb-6 gap-4 text-sm"
      >
        <Group gap="xs">
          <Text>Status:</Text>
          <Badge
            color={
              courseDetail.status === CourseStatus.Draft
                ? "gray"
                : courseDetail.status === CourseStatus.Pending
                  ? "yellow"
                  : courseDetail.status === CourseStatus.Rejected
                    ? "red"
                    : courseDetail.status === CourseStatus.Published
                      ? "green"
                      : "gray"
            }
            variant="light"
            size="lg"
            radius="sm"
          >
            {courseDetail.status}
          </Badge>
        </Group>

        {courseDetail.retryCount > 0 && (
          <Group gap="xs">
            <Text className="text-red-500">Rejected:</Text>
            <Text>
              {courseDetail.retryCount} time
              {courseDetail.retryCount > 1 ? "s" : ""}
            </Text>
            {courseDetail.lastRejectedAt && (
              <Tooltip label={dayjs(courseDetail.lastRejectedAt).format("YYYY-MM-DD HH:mm")}>
                <Text c="dimmed">(Last: {dayjs(courseDetail.lastRejectedAt).fromNow()})</Text>
              </Tooltip>
            )}
          </Group>
        )}

        <Button
          variant="light"
          leftSection={<IconUpload size={16} />}
          onClick={canSubmit ? handleConfirmSubmit : handleConfirmRetry}
          disabled={
            (!canSubmit && !canRetry) || submitMutation.isPending || retrySubmitMutation.isPending
          }
          loading={submitMutation.isPending || retrySubmitMutation.isPending}
        >
          {canRetry ? "Retry Submission" : "Submit for Review"}
        </Button>
      </div>

      {/* Navigation */}
      <SegmentedControl
        value={activeTab}
        data={Object.values(CourseDetailTab)}
        onChange={(val) => setActiveTab(val as CourseDetailTab)}
        size="sm"
        transitionDuration={300}
        className="w-full mt-5 grid grid-cols-2 gap-2 md:gap-0 md:grid-flow-col md:auto-cols-fr"
        classNames={{
          root: "bg-white dark:bg-dark-6 shadow-sm border p-[10px]",
          indicator: "bg-linear-to-r bg-blue-5",
          control: "before:hidden",
          label: "data-active:text-white hover:data-active:text-white",
        }}
      />

      {/* Decoration line */}
      <div className="h-[3px] w-24 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-full mt-10" />

      {/* Tab Content */}
      <Tabs variant="pills" value={activeTab} className="mt-7" keepMounted>
        <div>
          {/* Overview Tab */}
          <Tabs.Panel value={CourseDetailTab.Overview}>
            <OverviewForm courseId={courseId} courseDetail={courseDetail} />
          </Tabs.Panel>

          {/* Curriculum Tab */}
          <Tabs.Panel value={CourseDetailTab.Curriculum}>
            <CurriculumManager courseId={courseId} sections={courseDetail.sections} />
          </Tabs.Panel>

          {/* Reviews Tab */}
          <Tabs.Panel value={CourseDetailTab.Reviews}>
            <ReviewManager
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

          {/* Submissions Tab */}
          <Tabs.Panel value={CourseDetailTab.Submissions}>
            <InstructorCourseSubmissionTab history={courseDetail.approvalHistories} />
          </Tabs.Panel>
        </div>
      </Tabs>
    </div>
  );
}
