import { Badge, Button, Group, Select, TextInput, Title, Skeleton, Avatar } from "@mantine/core";
import { RefreshCcw, Search } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import AdminReviewCourseModal from "./_c/AdminReviewCourseModal";

// Fake Data
const mockCourses = [
  {
    id: "1",
    title: "Next.js Mastery: Build Fullstack App",
    status: "Pending",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStM_1U-oW7qQoJ6sP4BrMIAg4ipMmmnPWwIw&s",
    instructorName: "Jane Doe",
    instructorAvatarUrl: "https://i.pravatar.cc/150?img=47",
    instructorProfessionalTitle: "Senior Frontend Engineer at TechCorp",
  },
  {
    id: "2",
    title: "React for Beginners",
    status: "Pending",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStM_1U-oW7qQoJ6sP4BrMIAg4ipMmmnPWwIw&s",
    instructorName: "John Smith",
    instructorAvatarUrl: "https://i.pravatar.cc/150?img=32",
    instructorProfessionalTitle: "Frontend Dev at Codify",
  },
];

export default function AdminCoursesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>("Pending");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [reviewType, setReviewType] = useState<"approve" | "reject" | null>(null);
  const [opened, { open, close }] = useDisclosure();

  const filteredCourses = mockCourses.filter(
    (c) =>
      (statusFilter ? c.status === statusFilter : true) &&
      c.title.toLowerCase().includes(search.toLowerCase()),
  );

  const selectedCourse = mockCourses.find((c) => c.id === selectedCourseId);

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

  return (
    <div className="flex-1 p-6 xl:p-8">
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
              { value: "", label: "All" },
              { value: "Pending", label: "Pending" },
              { value: "Published", label: "Published" },
              { value: "Rejected", label: "Rejected" },
              { value: "Draft", label: "Draft" },
            ]}
            placeholder="Filter by status"
            value={statusFilter}
            onChange={setStatusFilter}
            clearable
          />
        </Group>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-[180px] object-cover"
              />
              <div className="p-4 space-y-2">
                <Title order={4}>{course.title}</Title>
                <Group gap="xs">
                  <Badge color="gray" variant="light">
                    {course.status}
                  </Badge>
                </Group>
                <Group gap="sm" className="mt-2">
                  <Avatar src={course.instructorAvatarUrl} radius="xl" />
                  <div>
                    <p className="font-medium">{course.instructorName}</p>
                    <p className="text-sm text-gray-500">{course.instructorProfessionalTitle}</p>
                  </div>
                </Group>
                <Group justify="end" className="pt-3">
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
          {filteredCourses.length === 0 && (
            <Skeleton height={180} radius="md" className="col-span-full" />
          )}
        </div>
        <AdminReviewCourseModal
          opened={opened}
          onClose={close}
          onSubmit={handleSubmitNote}
          type={reviewType}
          course={
            selectedCourse
              ? {
                  title: selectedCourse.title,
                  instructorName: selectedCourse.instructorName,
                  instructorAvatarUrl: selectedCourse.instructorAvatarUrl,
                  instructorProfessionalTitle: selectedCourse.instructorProfessionalTitle,
                }
              : undefined
          }
        />
      </div>
    </div>
  );
}
