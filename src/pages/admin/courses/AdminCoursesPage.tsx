import { Avatar, Badge, Button, Group, Select, Skeleton, TextInput, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BookOpenIcon, ClockIcon, FilmIcon, RefreshCcw, Search, TagsIcon } from "lucide-react";
import { useState } from "react";
import { CourseStatus } from "../../../react-query/course/course.types";
import { useGetCourses } from "../../../react-query/course/courseHooks";
import { formatDuration } from "../../../utils/format";
import AdminReviewCourseModal from "./_c/AdminReviewCourseModal";

export default function AdminCoursesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CourseStatus | "All">(CourseStatus.Pending);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [reviewType, setReviewType] = useState<"approve" | "reject" | null>(null);
  const [opened, { open, close }] = useDisclosure();
  const { data, isPending, error } = useGetCourses();

  const handleOpenModal = (id: string, type: "approve" | "reject") => {
    setSelectedCourseId(id);
    setReviewType(type);
    open();
  };

  const handleSubmitNote = (note: string) => {
    console.log({
      courseId: selectedCourseId,
      isApproved: reviewType === "approve",
      note,
    });
    close();
  };

  if (isPending) return <Skeleton height={400} radius="md" className="mt-6" />;

  if (error) return <div>Error loading courses</div>;

  return (
    <div className="flex-1 p-6 xl:p-8 @container">
      <div className="mx-auto">
        <Group justify="space-between" className="mb-4 flex-wrap gap-y-2">
          <Title order={2}>Admin - Course Review</Title>
          <Button leftSection={<RefreshCcw size={16} />} variant="outline">
            Refresh
          </Button>
        </Group>
        <Group className="mb-4 flex-wrap gap-y-2" grow>
          <TextInput
            placeholder="Search course..."
            leftSection={<Search size={16} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
          <Select
            data={[
              { value: "All", label: "All" },
              { value: CourseStatus.Pending, label: "Pending" },
              { value: CourseStatus.Published, label: "Published" },
              { value: CourseStatus.Rejected, label: "Rejected" },
              { value: CourseStatus.Draft, label: "Draft" },
            ]}
            placeholder="Filter by status"
            checkIconPosition="right"
            value={statusFilter}
            onChange={(value) => setStatusFilter((value as CourseStatus) || "All")}
            searchable
          />
        </Group>
        <div className="grid grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3 gap-6">
          {data?.items.map((course) => (
            <div
              key={course.id}
              className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition bg-white dark:bg-zinc-900"
            >
              <img
                src={course.imageUrl ?? undefined}
                alt={course.title}
                className="w-full h-[180px] object-cover"
              />
              <div className="p-5 space-y-3">
                {/* Title */}
                <div className="space-y-1">
                  <Title order={4} className="line-clamp-2">
                    {course.title}
                  </Title>
                  <Badge variant="light" color="yellow" size="sm">
                    {course.status}
                  </Badge>
                </div>

                {/* Category */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <TagsIcon size={16} />
                  <span className="line-clamp-1">{course.categoryName}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 text-sm text-gray-700 dark:text-gray-300 mt-1">
                  <div className="flex items-center gap-1">
                    <BookOpenIcon size={16} /> {course.sectionCount}
                  </div>
                  <div className="flex items-center gap-1">
                    <FilmIcon size={16} /> {course.lectureCount}
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon size={16} />{" "}
                    {formatDuration({
                      seconds: course.durationInSeconds,
                    })}
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-3 mt-2">
                  <Avatar src={course.instructorAvatarUrl} size="md" radius="xl" />
                  <div className="text-sm">
                    <div className="font-medium">{course.instructorName}</div>
                    <div className="text-gray-500">{course.instructorProfessionalTitle}</div>
                  </div>
                </div>

                {/* Actions */}
                <Group justify="end" className="pt-2">
                  <Button
                    color="green"
                    variant="light"
                    size="xs"
                    onClick={() => handleOpenModal(course.id, "approve")}
                  >
                    Approve
                  </Button>
                  <Button
                    color="red"
                    variant="light"
                    size="xs"
                    onClick={() => handleOpenModal(course.id, "reject")}
                  >
                    Reject
                  </Button>
                </Group>
              </div>
            </div>
          ))}
        </div>
        <AdminReviewCourseModal
          opened={opened}
          onClose={close}
          onSubmit={handleSubmitNote}
          type={reviewType}
          course={data?.items.find((c) => c.id === selectedCourseId) || undefined}
        />
      </div>
    </div>
  );
}
