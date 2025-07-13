import {
  Badge,
  Button,
  Group,
  SegmentedControl,
  Tabs,
  Text,
  Title,
  Modal,
  Textarea,
  Paper,
  SimpleGrid,
  Tooltip,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CenterLoader from "../../../components/CenterLoader";
import VideoPlayerWithThumbnail from "../../../components/media/VideoPlayerWithThumbnail";
import { useGetCourseDetail } from "../../../react-query/course/courseHooks";
import AdminCourseOverviewTab from "./_c/AdminCourseOverviewTab";
import AdminCourseCurriculumTab from "./_c/AdminCourseCurriculumTab";
import AdminCourseInstructorTab from "./_c/AdminCourseInstructorTab";
import AdminCourseSubmissionTab from "./_c/AdminCourseSubmissionTab";
import { formatDuration } from "../../../utils/format";
import { CourseStatus } from "../../../react-query/course/course.types";

dayjs.extend(relativeTime);

const getStatusBadge = (status: CourseStatus) => {
  switch (status) {
    case CourseStatus.Pending:
      return { color: "yellow", label: "Pending" };
    case CourseStatus.Published:
      return { color: "green", label: "Published" };
    case CourseStatus.Rejected:
      return { color: "red", label: "Rejected" };
    case CourseStatus.Archived:
      return { color: "gray", label: "Archived" };
    case CourseStatus.Draft:
    default:
      return { color: "blue", label: "Draft" };
  }
};

const AdminCourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { data: course, isPending, error } = useGetCourseDetail(courseId!);
  const [activeTab, setActiveTab] = useState("Overview");

  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [note, setNote] = useState("");

  if (isPending) return <CenterLoader />;
  if (error || !courseId || !course) return <Navigate to="/404" replace />;

  const { color, label } = getStatusBadge(course.status as CourseStatus);

  return (
    <div className="flex-1 p-6 xl:p-8 @container">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <Button
          component={Link}
          to="/admin/courses"
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
                size="xs"
                onClick={() => {
                  setNote("");
                  setApproveModalOpen(true);
                }}
              >
                Approve
              </Button>
              <Button
                color="red"
                variant="light"
                size="xs"
                onClick={() => {
                  setNote("");
                  setRejectModalOpen(true);
                }}
              >
                Reject
              </Button>
            </>
          )}
          {course.status === CourseStatus.Published && (
            <Button
              color="orange"
              variant="light"
              size="xs"
              onClick={() => {
                setNote("");
                setArchiveModalOpen(true);
              }}
            >
              Archive
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

        <Tooltip label={`Current course status is "${label}"`} withArrow>
          <Badge
            color={color}
            size="md"
            radius="sm"
            mt="md"
            variant="outline"
            style={{ fontWeight: 500 }}
          >
            Status: {label}
          </Badge>
        </Tooltip>

        {course.rejectionCount > 0 && (
          <Text mt={4} c="red.6" size="sm" fw={500}>
            Rejected <strong>{course.rejectionCount}</strong> time
            {course.rejectionCount > 1 ? "s" : ""}
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
            value={formatDuration({ seconds: course.durationInSeconds, formatType: "long" })}
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
        onChange={setActiveTab}
        data={["Overview", "Curriculum", "Instructor", "Submissions"]}
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

      <div className="h-[3px] w-24 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-full mt-10" />

      <Tabs variant="pills" value={activeTab} className="mt-7" keepMounted>
        <Tabs.Panel value="Overview">
          <AdminCourseOverviewTab course={course} />
        </Tabs.Panel>
        <Tabs.Panel value="Curriculum">
          <AdminCourseCurriculumTab sections={course.sections ?? []} />
        </Tabs.Panel>
        <Tabs.Panel value="Instructor">
          <AdminCourseInstructorTab courseDetail={course} />
        </Tabs.Panel>
        <Tabs.Panel value="Submissions">
          <AdminCourseSubmissionTab />
        </Tabs.Panel>
      </Tabs>

      {/* Approve Modal */}
      <Modal
        opened={approveModalOpen}
        onClose={() => setApproveModalOpen(false)}
        title="Approve Course"
        centered
      >
        <Textarea
          label="Approval Note"
          placeholder="Enter approval note..."
          value={note}
          onChange={(e) => setNote(e.currentTarget.value)}
          autosize
          minRows={3}
        />
        <Group justify="end" mt="md">
          <Button variant="default" onClick={() => setApproveModalOpen(false)}>
            Cancel
          </Button>
          <Button color="green" onClick={() => setApproveModalOpen(false)}>
            Confirm Approval
          </Button>
        </Group>
      </Modal>

      {/* Reject Modal */}
      <Modal
        opened={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        title="Reject Course"
        centered
      >
        <Textarea
          label="Rejection Note"
          placeholder="Please provide a reason for rejection..."
          value={note}
          onChange={(e) => setNote(e.currentTarget.value)}
          autosize
          minRows={3}
        />
        <Group justify="end" mt="md">
          <Button variant="default" onClick={() => setRejectModalOpen(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={() => setRejectModalOpen(false)}>
            Confirm Rejection
          </Button>
        </Group>
      </Modal>

      {/* Archive Modal */}
      <Modal
        opened={archiveModalOpen}
        onClose={() => setArchiveModalOpen(false)}
        title="Archive Course"
        centered
      >
        <Textarea
          label="Archive Note"
          placeholder="Please provide a reason for archiving this course..."
          value={note}
          onChange={(e) => setNote(e.currentTarget.value)}
          autosize
          minRows={3}
        />
        <Group justify="end" mt="md">
          <Button variant="default" onClick={() => setArchiveModalOpen(false)}>
            Cancel
          </Button>
          <Button color="orange" onClick={() => setArchiveModalOpen(false)}>
            Confirm Archive
          </Button>
        </Group>
      </Modal>
    </div>
  );
};

export default AdminCourseDetailPage;

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
