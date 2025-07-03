import {
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { z } from "zod";
import CenterLoader from "../../../components/CenterLoader";
import CusModal from "../../../components/CusModal";
import {
  InstructorApplicationStatus,
  InstructorApplicationVm,
} from "../../../react-query/instructorApplication/instructorApplication.types";
import {
  useGetInstructorApplications,
  useReviewInstructorApplication,
} from "../../../react-query/instructorApplication/instructorApplicationHooks";
import { IconSearch } from "@tabler/icons-react";

const getStatusColor = (status: InstructorApplicationStatus) => {
  switch (status) {
    case "Pending":
      return "gray";
    case "Approved":
      return "green";
    case "Rejected":
      return "red";
  }
};

const reviewSchema = z.object({
  note: z.string().min(1, { message: "Note is required" }),
});

const statuses: ("All" | InstructorApplicationStatus)[] = [
  "All",
  InstructorApplicationStatus.Pending,
  InstructorApplicationStatus.Approved,
  InstructorApplicationStatus.Rejected,
];

function StatusFilterBadges({
  value,
  onChange,
}: {
  value: "All" | InstructorApplicationStatus;
  onChange: (status: "All" | InstructorApplicationStatus) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {statuses.map((status) => {
        const isActive = value === status;
        return (
          <button
            key={status}
            onClick={() => onChange(status)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150
            ${isActive ? "bg-blue-600 text-white" : "bg-gray-100 text-black hover:bg-gray-200"} `}
          >
            {status}
          </button>
        );
      })}
    </div>
  );
}

export default function AdminInstructorPage() {
  const {
    data,
    isPending: isGetInstructorApplicationsPending,
    error,
  } = useGetInstructorApplications();

  const [selectedApp, setSelectedApp] = useState<InstructorApplicationVm | null>(null);
  const [approveMode, setApproveMode] = useState(true);
  const [modalOpened, { open, close }] = useDisclosure(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | InstructorApplicationStatus>(
    InstructorApplicationStatus.Pending,
  );
  const [sortOption, setSortOption] = useState("createdAt-desc");

  const form = useForm({
    initialValues: { note: "" },
    validate: zodResolver(reviewSchema),
  });

  const { mutate: reviewApplication, isPending } = useReviewInstructorApplication();

  const handleReview = (app: InstructorApplicationVm, isApprove: boolean) => {
    setSelectedApp(app);
    setApproveMode(isApprove);
    form.reset();
    open();
  };

  const handleSubmitReview = () => {
    if (!selectedApp) return;
    const result = form.validate();
    if (!result.hasErrors) {
      reviewApplication(
        {
          id: selectedApp.id,
          isApproved: approveMode,
          note: form.values.note.trim(),
        },
        {
          onSuccess: close,
        },
      );
    }
  };

  const filteredApps = useMemo(() => {
    if (!data) return [];

    return data.items
      .filter((app) => {
        if (statusFilter !== "All" && app.status !== statusFilter) return false;
        if (
          search &&
          !app.email.toLowerCase().includes(search.toLowerCase()) &&
          !app.displayName.toLowerCase().includes(search.toLowerCase())
        ) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        const [field, dir] = sortOption.split("-");
        const aVal = field === "createdAt" ? a.createdAt : a.reviewedAt || "";
        const bVal = field === "createdAt" ? b.createdAt : b.reviewedAt || "";
        return dir === "asc"
          ? new Date(aVal).getTime() - new Date(bVal).getTime()
          : new Date(bVal).getTime() - new Date(aVal).getTime();
      });
  }, [data, search, statusFilter, sortOption]);

  if (isGetInstructorApplicationsPending) return <CenterLoader />;
  if (error) return <Text c="red">Error loading applications: {error.message}</Text>;

  return (
    <div className="flex-1 p-6 xl:p-8">
      <Title order={2} className="mb-6">
        Instructor Applications Review
      </Title>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <TextInput
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
          w={260}
        />

        <StatusFilterBadges value={statusFilter} onChange={setStatusFilter} />

        <Select
          data={[
            { label: "Newest submitted", value: "createdAt-desc" },
            { label: "Oldest submitted", value: "createdAt-asc" },
            { label: "Newest reviewed", value: "reviewedAt-desc" },
            { label: "Oldest reviewed", value: "reviewedAt-asc" },
          ]}
          value={sortOption}
          onChange={(v) => setSortOption(v || "createdAt-desc")}
          w={200}
          placeholder="Sort by"
        />
      </div>

      {/* APPLICATION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map((app) => (
          <Card
            key={app.id}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className="flex flex-col justify-between"
          >
            <Stack gap="xs">
              <Group align="start">
                <Avatar src={app.workAvatarUrl} size="lg" radius="xl" />
                <div className="flex-1">
                  <Text size="md" fw={600} lineClamp={1}>
                    {app.displayName} ({app.fullName})
                  </Text>
                  <Text size="sm" c="dimmed" lineClamp={1}>
                    {app.email}
                  </Text>
                  <Group gap="xs" mt={4}>
                    <Badge color={getStatusColor(app.status)} size="sm">
                      {app.status}
                    </Badge>
                    {app.retryCount > 0 && (
                      <Badge color="orange" size="sm">
                        Retry #{app.retryCount}
                      </Badge>
                    )}
                  </Group>
                </div>
              </Group>

              <Stack gap={4}>
                <Text size="sm" lineClamp={2}>
                  <strong>Title:</strong> {app.professionalTitle}
                </Text>
                <Text size="sm" lineClamp={3}>
                  <strong>About:</strong> {app.about}
                </Text>
                <Text size="xs" c="dimmed">
                  Submitted: {dayjs(app.createdAt).format("DD/MM/YYYY HH:mm")}
                </Text>
                {app.reviewedAt && (
                  <Text size="xs" c="dimmed">
                    Reviewed: {dayjs(app.reviewedAt).format("DD/MM/YYYY HH:mm")}
                  </Text>
                )}
              </Stack>
            </Stack>

            <Group mt="md" justify="flex-end">
              <Button color="red" variant="light" onClick={() => handleReview(app, false)}>
                Reject
              </Button>
              <Button onClick={() => handleReview(app, true)}>Approve</Button>
            </Group>
          </Card>
        ))}
      </div>

      {/* MODAL */}
      <CusModal
        opened={modalOpened}
        onClose={close}
        title={approveMode ? "Approve Application" : "Reject Application"}
        size="400px"
      >
        <form onSubmit={form.onSubmit(handleSubmitReview)}>
          <Stack>
            <Textarea
              size="md"
              label={approveMode ? "Approval Note" : "Rejection Note"}
              placeholder={
                approveMode ? "Provide reason for approval" : "Provide reason for rejection"
              }
              minRows={3}
              {...form.getInputProps("note")}
              required
            />
            <Group justify="flex-end">
              <Button variant="subtle" onClick={close} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" loading={isPending} color={approveMode ? "green" : "red"}>
                Confirm
              </Button>
            </Group>
          </Stack>
        </form>
      </CusModal>
    </div>
  );
}
