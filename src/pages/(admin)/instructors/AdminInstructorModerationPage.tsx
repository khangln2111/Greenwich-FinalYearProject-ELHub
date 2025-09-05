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
import { ArrowUpAzIcon } from "lucide-react";
import { zodResolver } from "mantine-form-zod-resolver";
import { parseAsInteger, parseAsString, parseAsStringLiteral, useQueryState } from "nuqs";
import { useState } from "react";
import { decodeOrderOption, encodeOrderOption, OrderBy } from "../../../api-client/api.types";
import AppPagination from "../../../components/AppPagination/AppPagination";
import CenterLoader from "../../../components/CenterLoader/CenterLoader";
import CusModal from "../../../components/CusModal/CusModal";
import { ReviewCourseFormValues, reviewCourseSchema } from "../../../features/course/course.schema";
import {
  InstructorApplicationOrderableFields,
  InstructorApplicationStatus,
  InstructorApplicationVm,
  ModerateInstructorApplicationCommand,
} from "../../../features/instructorApplication/instructorApplication.types";
import {
  useGetInstructorApplications,
  useModerateInstructorApplication,
} from "../../../features/instructorApplication/instructorApplicationHooks";
import { cn } from "../../../utils/cn";
import { formSubmitWithFocus } from "../../../utils/form";
import AdminInstructorModerationPageEmptyState from "./_c/AdminInstructorModerationPageEmptyState";

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
    <div className="flex gap-2 flex-wrap mx-auto md:mx-[initial]">
      {statuses.map((status) => {
        const isActive = value === status;
        return (
          <button
            key={status}
            onClick={() => onChange(status)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150",
              isActive
                ? "bg-primary text-white "
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

export default function AdminInstructorModerationPage() {
  const modalStack = useModalsStack(["view", "review"]);

  const [viewApp, setViewApp] = useState<InstructorApplicationVm | null>(null);
  const [reviewApp, setReviewApp] = useState<InstructorApplicationVm | null>(null);
  const [approveMode, setApproveMode] = useState(true);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(6));
  const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));
  const [searchInput, setSearchInput] = useState(search);

  const [statusFilter, setStatusFilter] = useQueryState(
    "status",
    parseAsStringLiteral(["All", ...Object.values(InstructorApplicationStatus)]).withDefault(
      InstructorApplicationStatus.Pending,
    ),
  );

  const [orderByParam, setOrderByParam] = useQueryState(
    "orderBy",
    parseAsString.withDefault(encodeOrderOption({ field: "createdAt", direction: "desc" })),
  );

  const decodedOrderBy = decodeOrderOption<InstructorApplicationOrderableFields>(
    orderByParam,
    "createdAt",
    "desc",
  );

  const form = useForm<ReviewCourseFormValues>({
    initialValues: { note: "" },
    validate: zodResolver(reviewCourseSchema),
  });

  const { mutate, isPending } = useModerateInstructorApplication();

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
      const payload: ModerateInstructorApplicationCommand = {
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
    orderBy: decodedOrderBy,
  });

  const apps = data?.items ?? [];

  if (error) return <Text c="red">Error loading applications: {error.message}</Text>;

  return (
    <div className="flex-1 p-6 xl:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <Title order={1} className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Instructor Applications Review
        </Title>
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
          className="md:max-w-65 flex-1"
        />
      </div>

      <div className="flex flex-wrap-reverse md:flex-wrap gap-4 items-center justify-between mb-8 w-full">
        <StatusFilterBadges value={statusFilter} onChange={setStatusFilter} />
        <Select
          data={ORDER_BY_OPTIONS.map((opt) => ({
            label: opt.label,
            value: encodeOrderOption(opt.value),
          }))}
          value={orderByParam}
          onChange={(val) => val && setOrderByParam(val)}
          checkIconPosition="right"
          leftSection={<ArrowUpAzIcon size={16} />}
          placeholder="Sort by"
          className="md:max-w-50 flex-1"
        />
      </div>

      {isGetPending ? (
        <CenterLoader />
      ) : apps.length === 0 ? (
        <AdminInstructorModerationPageEmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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

      <AppPagination
        page={page}
        pageSize={pageSize}
        itemsCount={data?.count ?? 0}
        onPageChange={setPage}
        withEdges
        className="flex justify-center items-center mt-10"
      />

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
