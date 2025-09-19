import {
  Badge,
  Button,
  Paper,
  SegmentedControl,
  SimpleGrid,
  Tabs,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import dayjs from "dayjs";
import { parseAsStringEnum, useQueryState } from "nuqs";
import { useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router";
import CenterLoader from "../../../components/CenterLoader/CenterLoader";
import VideoPlayerWithThumbnail from "../../../components/media/VideoPlayerWithThumbnail";
import {
  useGetCourseDetail,
  useModerateCourse,
  useSetCourseBannedStatus,
} from "../../../features/course/course.hooks";
import { CourseStatus } from "../../../features/course/course.types";
import { usePageSEO } from "../../../hooks/usePageSEO";
import { formatDuration } from "../../../utils/format";
import AdminCourseCurriculumTab from "./_c/AdminCourseCurriculumTab/AdminCourseCurriculumTab";
import AdminCourseInstructorTab from "./_c/AdminCourseInstructorTab";
import AdminCourseOverviewTab from "./_c/AdminCourseOverviewTab";
import AdminCourseSubmissionTab from "./_c/AdminCourseSubmissionTab";
import AdminModerateCourseModal from "./_c/AdminModerateCourseModal";
import AdminSetCourseBannedStatusModal from "./_c/AdminSetCourseBannedStatusModal";

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

enum CourseDetailTab {
  Overview = "Overview",
  Curriculum = "Curriculum",
  Instructor = "Instructor",
  Submissions = "Submissions",
}

export default function AdminCourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { data: course, isPending, error } = useGetCourseDetail(courseId!);

  usePageSEO({ title: course?.title ? `Admin - ${course.title}` : "Admin Course Detail" });

  const [activeTab, setActiveTab] = useQueryState(
    "activeTab",
    parseAsStringEnum(Object.values(CourseDetailTab)).withDefault(CourseDetailTab.Overview),
  );

  const reviewCourseMutation = useModerateCourse();
  const setCourseBannedStatusMutation = useSetCourseBannedStatus();

  const location = useLocation();

  const from = location.state?.from || "/admin/courses";

  const [moderateModal, setModerateModal] = useState<{
    open: boolean;
    mode: "approve" | "reject";
  }>({ open: false, mode: "approve" });

  const [banUnbanModal, setBanUnbanModal] = useState<{
    open: boolean;
    action: "ban" | "unban";
  }>({ open: false, action: "ban" });

  if (isPending) return <CenterLoader />;
  if (error || !courseId || !course) return <Navigate to="/404" replace />;

  const { color, label } = getStatusBadge(course.status as CourseStatus);

  return (
    <div className="flex-1 p-6 xl:p-8 @container">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <Button
          component={Link}
          to={from}
          variant="default"
          size="sm"
          leftSection={<IconArrowLeft size={16} />}
        >
          Back to list
        </Button>

        <div className="flex items-center gap-2">
          {course.status === CourseStatus.Pending && (
            <>
              <Button
                color="green"
                variant="light"
                loading={reviewCourseMutation.isPending}
                onClick={() => setModerateModal({ open: true, mode: "approve" })}
              >
                Approve
              </Button>
              <Button
                color="red"
                variant="light"
                loading={reviewCourseMutation.isPending}
                onClick={() => setModerateModal({ open: true, mode: "reject" })}
              >
                Reject
              </Button>
            </>
          )}
          {course.status === CourseStatus.Published && (
            <Button
              color="red"
              variant="light"
              loading={setCourseBannedStatusMutation.isPending}
              onClick={() => {
                setBanUnbanModal({ open: true, action: "ban" });
              }}
            >
              Ban
            </Button>
          )}
          {course.status === CourseStatus.Banned && (
            <Button
              color="green"
              variant="light"
              loading={setCourseBannedStatusMutation.isPending}
              onClick={() => {
                setBanUnbanModal({ open: true, action: "unban" });
              }}
            >
              Unban
            </Button>
          )}
        </div>
      </div>

      {/* Course Title + Status */}
      <div className="text-center mb-6 max-w-[--container-size-4xl] mx-auto">
        <Title order={2} className="italic text-gray-800 dark:text-gray-300">
          {course.title}
        </Title>
        <Text size="sm" c="dimmed" mt={4}>
          Category: {course.categoryName} • Level: {course.level}
        </Text>
        <Text size="sm" c="dimmed" mt={2}>
          Created on {dayjs(course.createdAt).format("DD MMM YYYY")} • Last updated{" "}
          {dayjs(course.updatedAt).fromNow()}
        </Text>

        <Tooltip label={`Current course status is "${label}"`} withArrow>
          <Badge
            color={color}
            size="lg"
            variant="filled"
            radius="2xl"
            mt="md"
            style={{ fontWeight: 500 }}
          >
            Status: {label}
          </Badge>
        </Tooltip>

        {course.retryCount > 0 && (
          <Text c="red.6" size="sm" className="mt-5" fw={500}>
            Rejected <strong>{course.retryCount}</strong> time
            {course.retryCount > 1 ? "s" : ""}
            {course.lastRejectedAt && (
              <> — last rejection {dayjs(course.lastRejectedAt).fromNow()}</>
            )}
          </Text>
        )}
      </div>

      {/* Promo Video */}
      {course.promoVideoUrl && (
        <div className="aspect-video rounded-lg overflow-hidden border shadow-sm max-h-[400px] mb-6 mx-auto">
          <VideoPlayerWithThumbnail
            classNames={{
              playIconWrapper: "md:size-16",
              playIcon: "md:size-8",
              previewImage: "size-full",
            }}
            videoUrl={course.promoVideoUrl}
            previewThumbnailUrl={course.imageUrl}
          />
        </div>
      )}

      {/* Stats */}
      <Paper withBorder p="md" radius="md" className="mb-6">
        <SimpleGrid cols={{ base: 2, md: 3, lg: 7 }} spacing="xs">
          <Stat label="Lectures" value={course.lectureCount} />
          <Stat
            label="Duration"
            value={formatDuration({
              seconds: course.durationInSeconds,
              formatType: "long",
            })}
          />
          <Stat label="Price" value={`$${course.price}`} />
          <Stat label="Discounted price" value={`$${course.discountedPrice}`} />
          <Stat label="Enrollment count" value={course.enrollmentCount} />
          <Stat label="Average rating" value={course.averageRating.toFixed(1)} />
          <Stat label="Review count" value={course.reviewCount} />
        </SimpleGrid>
      </Paper>

      {/* Tabs */}
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

      <div className="h-[3px] w-24 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-full mt-10" />

      <Tabs variant="pills" value={activeTab} className="mt-7" keepMounted>
        <Tabs.Panel value={CourseDetailTab.Overview}>
          <AdminCourseOverviewTab course={course} />
        </Tabs.Panel>
        <Tabs.Panel value={CourseDetailTab.Curriculum}>
          <AdminCourseCurriculumTab sections={course.sections ?? []} />
        </Tabs.Panel>
        <Tabs.Panel value={CourseDetailTab.Instructor}>
          <AdminCourseInstructorTab courseDetail={course} />
        </Tabs.Panel>
        <Tabs.Panel value={CourseDetailTab.Submissions}>
          <AdminCourseSubmissionTab history={course.approvalHistories} />
        </Tabs.Panel>
      </Tabs>

      <AdminModerateCourseModal
        opened={moderateModal.open}
        onClose={() => setModerateModal({ ...moderateModal, open: false })}
        courseId={course.id}
        mode={moderateModal.mode}
      />

      {/* Ban Modal */}
      <AdminSetCourseBannedStatusModal
        opened={banUnbanModal.open}
        onClose={() => setBanUnbanModal({ ...banUnbanModal, open: false })}
        courseId={course.id}
        action={banUnbanModal.action}
      />
    </div>
  );
}

// Reusable Stat Component
const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="text-center">
    <Text size="xl" fw={600}>
      {value}
    </Text>
    <Text size="xs" c="dimmed">
      {label}
    </Text>
  </div>
);
