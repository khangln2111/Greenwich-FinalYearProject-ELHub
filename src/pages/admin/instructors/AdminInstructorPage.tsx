import {
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
  useModalsStack,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";
import { z } from "zod";
import CenterLoader from "../../../components/CenterLoader";
import CusModal from "../../../components/CusModal";
import { useSearchParamState } from "../../../hooks/useSearchParamState";
import { decodeOrderOption, encodeOrderOption, OrderBy } from "../../../http-client/api.types";
import {
  InstructorApplicationOrderableFields,
  InstructorApplicationStatus,
  InstructorApplicationVm,
} from "../../../react-query/instructorApplication/instructorApplication.types";
import {
  useGetInstructorApplications,
  useReviewInstructorApplication,
} from "../../../react-query/instructorApplication/instructorApplicationHooks";
import { cn } from "../../../utils/cn";

const getStatusColor = (status: InstructorApplicationStatus) => {
  switch (status) {
    case InstructorApplicationStatus.Pending:
      return "gray";
    case InstructorApplicationStatus.Approved:
      return "green";
    case InstructorApplicationStatus.Rejected:
      return "red";
  }
};

const reviewSchema = z.object({
  note: z.string().min(1, { message: "Note is required" }),
});

const statuses: ("All" | InstructorApplicationStatus)[] = [
  "All",
  ...Object.values(InstructorApplicationStatus),
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
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150",
              isActive
                ? "bg-blue-600 text-white dark:bg-blue-700"
                : "bg-gray-100 text-black hover:bg-gray-200 dark:bg-gray-300 dark:hover:bg-gray-400",
            )}
          >
            {status}
          </button>
        );
      })}
    </div>
  );
}

export default function AdminInstructorPage() {
  const modalStack = useModalsStack(["view", "review"]);

  const [viewApp, setViewApp] = useState<InstructorApplicationVm | null>(null);
  const [reviewApp, setReviewApp] = useState<InstructorApplicationVm | null>(null);
  const [approveMode, setApproveMode] = useState(true);

  const [search, setSearch] = useSearchParamState<string>("search", "");
  const [statusFilter, setStatusFilter] = useSearchParamState<"All" | InstructorApplicationStatus>(
    "status",
    InstructorApplicationStatus.Pending,
  );
  const [orderByParam, setOrderByParam] = useSearchParamState<string>(
    "orderBy",
    encodeOrderOption({ field: "createdAt", direction: "desc" }),
  );

  const orderBy = decodeOrderOption<InstructorApplicationOrderableFields>(
    orderByParam,
    "createdAt",
    "desc",
  );

  const ORDER_BY_OPTIONS: {
    label: string;
    value: OrderBy<InstructorApplicationOrderableFields>;
  }[] = [
    { label: "Submitted (Newest)", value: { field: "createdAt", direction: "desc" } },
    { label: "Submitted (Oldest)", value: { field: "createdAt", direction: "asc" } },
    { label: "Reviewed (Newest)", value: { field: "reviewedAt", direction: "desc" } },
    { label: "Reviewed (Oldest)", value: { field: "reviewedAt", direction: "asc" } },
  ];

  const form = useForm({
    initialValues: { note: "" },
    validate: zodResolver(reviewSchema),
  });

  const { mutate: reviewApplication, isPending } = useReviewInstructorApplication();

  const handleReview = (app: InstructorApplicationVm, isApprove: boolean) => {
    setReviewApp(app);
    setApproveMode(isApprove);
    form.reset();
    modalStack.open("review");
  };

  const handleSubmitReview = () => {
    if (!reviewApp) return;
    const result = form.validate();
    if (!result.hasErrors) {
      reviewApplication(
        {
          id: reviewApp.id,
          isApproved: approveMode,
          note: form.values.note.trim(),
        },
        {
          onSuccess: () => {
            modalStack.close("review");
            modalStack.close("view");
          },
        },
      );
    }
  };

  const {
    data,
    isPending: isGetPending,
    error,
  } = useGetInstructorApplications({
    search,
    status: statusFilter === "All" ? undefined : statusFilter,
    orderBy,
  });

  const apps = data?.items ?? [];

  if (error) return <Text c="red">Error loading applications: {error.message}</Text>;

  return (
    <div className="flex-1 p-6 xl:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <Title order={2}>Instructor Applications Review</Title>
        <TextInput
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
          w={260}
        />
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
        <StatusFilterBadges value={statusFilter} onChange={setStatusFilter} />
        <Select
          data={ORDER_BY_OPTIONS.map((opt) => ({
            label: opt.label,
            value: encodeOrderOption(opt.value),
          }))}
          value={orderByParam}
          onChange={(val) => val && setOrderByParam(val)}
          w={200}
          checkIconPosition="right"
          allowDeselect={false}
          placeholder="Sort by"
        />
      </div>

      {isGetPending ? (
        <CenterLoader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <Card
              key={app.id}
              shadow="md"
              padding="lg"
              radius="lg"
              withBorder
              className="transition-all duration-200 hover:shadow-lg flex flex-col justify-between"
            >
              <Stack gap="sm">
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
                      <Badge color={getStatusColor(app.status)} size="sm" variant="light">
                        {app.status}
                      </Badge>
                      {app.retryCount > 0 && (
                        <Badge color="orange" size="sm" variant="light">
                          Retry #{app.retryCount}
                        </Badge>
                      )}
                    </Group>
                  </div>
                </Group>

                <Stack gap={6}>
                  <Text size="sm" lineClamp={2}>
                    <strong>Title:</strong> {app.professionalTitle}
                  </Text>
                  <Text size="sm" lineClamp={3} className="whitespace-pre-line line-clamp-1">
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
                  <Button
                    variant="light"
                    size="xs"
                    onClick={() => {
                      setViewApp(app);
                      modalStack.open("view");
                    }}
                    className="mt-1 self-end"
                  >
                    View full profile
                  </Button>
                </Stack>
              </Stack>
            </Card>
          ))}
        </div>
      )}

      <CusModal
        title="Application Detail"
        {...modalStack.register("view")}
        size="600px"
        footer={
          viewApp?.status === InstructorApplicationStatus.Pending ? (
            <Group justify="flex-end">
              <Button color="red" variant="light" onClick={() => handleReview(viewApp, false)}>
                Reject
              </Button>
              <Button onClick={() => handleReview(viewApp, true)}>Approve</Button>
            </Group>
          ) : undefined
        }
      >
        {viewApp && (
          <Stack align="center" gap="md">
            <Stack align="center" gap={8}>
              <Avatar src={viewApp.workAvatarUrl} size={100} radius="xl" />

              <Group gap="xs">
                <Badge color={getStatusColor(viewApp.status)} size="md">
                  {viewApp.status}
                </Badge>

                {viewApp.retryCount > 0 && (
                  <Badge color="orange" variant="light" size="sm">
                    Retry #{viewApp.retryCount}
                  </Badge>
                )}
              </Group>
            </Stack>

            <Stack w="100%" gap="xs">
              <Group justify="space-between">
                <Text c="dimmed" size="sm">
                  Full Name
                </Text>
                <Text fw={500}>{viewApp.fullName}</Text>
              </Group>

              <Group justify="space-between">
                <Text c="dimmed" size="sm">
                  Display Name
                </Text>
                <Text fw={500}>{viewApp.displayName}</Text>
              </Group>

              <Group justify="space-between">
                <Text c="dimmed" size="sm">
                  Email
                </Text>
                <Text fw={500}>{viewApp.email}</Text>
              </Group>

              <Group justify="space-between">
                <Text c="dimmed" size="sm">
                  Title
                </Text>
                <Text fw={500}>{viewApp.professionalTitle}</Text>
              </Group>

              <Stack gap={4}>
                <Text c="dimmed" size="sm">
                  About
                </Text>
                <Text size="sm" className="whitespace-pre-line">
                  {viewApp.about}
                </Text>
              </Stack>

              <Group justify="space-between">
                <Text c="dimmed" size="sm">
                  Submitted
                </Text>
                <Text size="sm">{dayjs(viewApp.createdAt).format("DD/MM/YYYY HH:mm")}</Text>
              </Group>

              {viewApp.reviewedAt && (
                <Group justify="space-between">
                  <Text c="dimmed" size="sm">
                    Reviewed
                  </Text>
                  <Text size="sm">{dayjs(viewApp.reviewedAt).format("DD/MM/YYYY HH:mm")}</Text>
                </Group>
              )}
            </Stack>
          </Stack>
        )}
      </CusModal>

      <CusModal
        title={approveMode ? "Approve Application" : "Reject Application"}
        {...modalStack.register("review")}
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
              <Button
                variant="subtle"
                onClick={() => modalStack.close("review")}
                disabled={isPending}
              >
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
