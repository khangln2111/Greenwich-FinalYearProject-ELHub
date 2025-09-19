import { Badge, Button, Group, SegmentedControl, Tabs, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconArrowLeft, IconPencil, IconUpload } from "@tabler/icons-react";
import dayjs from "dayjs";
import { parseAsStringEnum, useQueryState } from "nuqs";
import { Link, Navigate, useParams } from "react-router";
import CenterLoader from "../../../components/CenterLoader/CenterLoader";
import { CourseStatus } from "../../../features/course/course.types";
import {
  useGetCourseDetail,
  useResubmitCourse,
  useSubmitCourse,
} from "../../../features/course/course.hooks";
import CurriculumManager from "./_c/CurriculumManager/CurriculumManager";
import OverviewForm from "./_c/OverviewForm/OverviewForm";
import InstructorReviewManager from "./_c/ReviewManager/InstructorReviewManager";
import { usePageSEO } from "../../../hooks/usePageSEO";
import InstructorCourseSubmissionTab from "./_c/InstructorCourseSubmissionTab";

enum CourseDetailTab {
  Overview = "Overview",
  Curriculum = "Curriculum",
  Reviews = "Reviews",
  Submissions = "Submissions",
}

const getStatusBadge = (status: CourseStatus) => {
  switch (status) {
    case CourseStatus.Pending:
      return { color: "yellow", label: "Pending" };
    case CourseStatus.Published:
      return { color: "green", label: "Published" };
    case CourseStatus.Rejected:
      return { color: "red", label: "Rejected" };
    case CourseStatus.Banned:
      return { color: "dark", label: "Banned" };
    case CourseStatus.Draft:
    default:
      return { color: "blue", label: "Draft" };
  }
};

export default function InstructorEditCoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { data: courseDetail, isPending, error } = useGetCourseDetail(courseId!);

  usePageSEO({ title: courseDetail ? `Edit - ${courseDetail.title}` : "Edit Course" });

  const [activeTab, setActiveTab] = useQueryState(
    "activeTab",
    parseAsStringEnum(Object.values(CourseDetailTab)).withDefault(CourseDetailTab.Overview),
  );

  const submitMutation = useSubmitCourse();
  const retrySubmitMutation = useResubmitCourse();

  if (isPending) return <CenterLoader height={600} />;
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

  const { color } = getStatusBadge(courseDetail.status as CourseStatus);

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
        className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between bg-gray-100 dark:bg-dark-6
          p-4 rounded-xl mb-6 gap-4 text-sm"
      >
        <Group gap="xs">
          <Text>Status:</Text>
          <Badge color={color} variant="light" size="lg" radius="sm">
            {courseDetail.status}
          </Badge>
        </Group>

        {courseDetail.retryCount > 0 && canRetry && (
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
        onChange={(val) => setActiveTab(val as CourseDetailTab)}
        data={Object.values(CourseDetailTab)}
        transitionDuration={300}
        size="md"
        radius={"3xl"}
        classNames={{
          root: `w-full p-[10px] mt-7 bg-white dark:bg-dark-6 shadow-lg border grid grid-cols-2 md:grid-flow-col
          md:auto-cols-fr`,
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
            <InstructorReviewManager
              courseId={courseId}
              rating={courseDetail.averageRating}
              totalReviews={courseDetail.reviewCount}
              stars={[
                { stars: 5, percentage: courseDetail.ratingDistribution.star5 },
                { stars: 4, percentage: courseDetail.ratingDistribution.star4 },
                { stars: 3, percentage: courseDetail.ratingDistribution.star3 },
                { stars: 2, percentage: courseDetail.ratingDistribution.star2 },
                { stars: 1, percentage: courseDetail.ratingDistribution.star1 },
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
