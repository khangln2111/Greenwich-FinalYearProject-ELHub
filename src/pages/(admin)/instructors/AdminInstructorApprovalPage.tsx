import {
  ActionIcon,
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
import { useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";
import dayjs from "dayjs";
import { ArrowUpAzIcon, FileQuestion } from "lucide-react";
import { useState } from "react";
import CenterLoader from "../../../components/CenterLoader";
import CusModal from "../../../components/CusModal";
import { useSearchParamState } from "../../../hooks/useSearchParamState";
import { decodeOrderOption, encodeOrderOption, OrderBy } from "../../../http-client/api.types";
import {
  InstructorApplicationOrderableFields,
  InstructorApplicationStatus,
  InstructorApplicationVm,
  ReviewInstructorApplicationCommand,
} from "../../../react-query/instructorApplication/instructorApplication.types";
import {
  useGetInstructorApplications,
  useReviewInstructorApplication,
} from "../../../react-query/instructorApplication/instructorApplicationHooks";
import { cn } from "../../../utils/cn";
import { zodResolver } from "mantine-form-zod-resolver";
import { formSubmitWithFocus } from "../../../utils/form";
import {
  ReviewCourseFormValues,
  reviewCourseSchema,
} from "../../../react-query/course/course.schema";

const getStatusColor = (status: InstructorApplicationStatus) => {
  switch (status) {
    case InstructorApplicationStatus.Pending:
      return "yellow";
    case InstructorApplicationStatus.Approved:
      return "green";
    case InstructorApplicationStatus.Rejected:
      return "red";
  }
};

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
                : "bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-400 dark:hover:bg-gray-500",
            )}
          >
            {status}
          </button>
        );
      })}
    </div>
  );
}

const ORDER_BY_OPTIONS: {
  label: string;
  value: OrderBy<InstructorApplicationOrderableFields>;
}[] = [
  { label: "Submitted (Newest)", value: { field: "createdAt", direction: "desc" } },
  { label: "Submitted (Oldest)", value: { field: "createdAt", direction: "asc" } },
  { label: "Reviewed (Newest)", value: { field: "reviewedAt", direction: "desc" } },
  { label: "Reviewed (Oldest)", value: { field: "reviewedAt", direction: "asc" } },
];

export default function AdminInstructorApprovalPage() {
  const modalStack = useModalsStack(["view", "review"]);

  const [viewApp, setViewApp] = useState<InstructorApplicationVm | null>(null);
  const [reviewApp, setReviewApp] = useState<InstructorApplicationVm | null>(null);
  const [approveMode, setApproveMode] = useState(true);
  const [search, setSearch] = useSearchParamState<string>("search", "");
  const [searchInput, setSearchInput] = useState(search);

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

  const form = useForm<ReviewCourseFormValues>({
    initialValues: { note: "" },
    validate: zodResolver(reviewCourseSchema),
  });

  const { mutate, isPending } = useReviewInstructorApplication();

  const handleSearchSubmit = () => {
    setSearch(searchInput);
  };

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
      const payload: ReviewInstructorApplicationCommand = {
        id: reviewApp.id,
        isApproved: approveMode,
        note: form.values.note.trim(),
      };
      mutate(payload, {
        onSuccess: () => {
          modalStack.close("review");
          modalStack.close("view");
        },
      });
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
          value={searchInput}
          onChange={(e) => setSearchInput(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchSubmit();
            }
          }}
          rightSection={
            search && (
              <ActionIcon
                variant="subtle"
                size="lg"
                onClick={() => {
                  setSearchInput("");
                  setSearch(null);
                }}
              >
                ✕
              </ActionIcon>
            )
          }
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
          leftSection={<ArrowUpAzIcon size={16} />}
          placeholder="Sort by"
        />
      </div>

      {isGetPending ? (
        <CenterLoader />
      ) : apps.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500 dark:text-gray-400">
          <FileQuestion className="w-16 h-16 mb-4" />
          <p className="text-lg font-semibold">No instructor applications found</p>
          <p className="text-sm mt-1 max-w-md">
            We couldn’t find any applications to display. This could be due to filters, search
            terms, or simply because no one has applied yet.
          </p>
        </div>
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
                  <Avatar src={app.avatarUrl} size="lg" radius="xl" />
                  <div className="flex-1">
                    <Text size="md" fw={600} lineClamp={1}>
                      {`${app.firstName} ${app.lastName}`}
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
              <Avatar src={viewApp.avatarUrl} size={100} radius="xl" />

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
                <Text fw={500}>{`${viewApp.firstName} ${viewApp.lastName}`}</Text>
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
        <form onSubmit={formSubmitWithFocus(form, handleSubmitReview)}>
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
