import { ActionIcon, Select, Text, TextInput, Title, useModalsStack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";
import { ArrowUpAzIcon } from "lucide-react";
import { zodResolver } from "mantine-form-zod-resolver";
import { parseAsInteger, parseAsString, parseAsStringLiteral, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { decodeOrderOption, encodeOrderOption, OrderBy } from "../../../api-client/api.types";
import AppPagination from "../../../components/AppPagination/AppPagination";
import {
  ModerateCourseFormValues,
  moderateCourseSchema,
} from "../../../features/course/course.schema";
import {
  useGetInstructorApplications,
  useModerateInstructorApplication,
} from "../../../features/instructorApplication/instructorApplication.hooks";
import {
  InstructorApplicationOrderableFields,
  InstructorApplicationStatus,
  ModerateInstructorApplicationCommand,
} from "../../../features/instructorApplication/instructorApplication.types";
import { usePageSEO } from "../../../hooks/usePageSEO";
import { cn } from "../../../utils/cn";
import AdminInstructorApplicationsPageEmptyState from "./_c/AdminInstructorApplicationsPageEmptyState";
import InstructorApplicationCard from "./_c/InstructorApplicationCard";
import InstructorApplicationCardSkeleton from "./_c/InstructorApplicationCardSkeleton";
import InstructorApplicationModerationModal from "./_c/InstructorApplicationModerationModal";
import InstructorApplicationViewModal from "./_c/InstructorApplicationViewModal";

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

export default function AdminInstructorApplicationsPage() {
  usePageSEO({ title: "Instructor Applications Moderation" });

  const modalStack = useModalsStack(["view", "moderation"]);

  const [viewAppId, setViewAppId] = useQueryState("viewAppId", parseAsString);
  const [moderationAppId, setModerationAppId] = useQueryState("moderationAppId", parseAsString);
  const [approveMode, setApproveMode] = useState(true);

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(9));
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

  const form = useForm<ModerateCourseFormValues>({
    initialValues: { note: "" },
    validate: zodResolver(moderateCourseSchema),
  });

  const { mutate, isPending: isModerateInstructorApplicationPending } =
    useModerateInstructorApplication();

  const handleSearchSubmit = () => {
    setSearch(searchInput);
  };

  const handleModeration = (id: string, isApprove: boolean) => {
    setModerationAppId(id);
    setApproveMode(isApprove);
    form.reset();
    modalStack.open("moderation");
  };

  const handleSubmitModeration = (payload: ModerateInstructorApplicationCommand) => {
    mutate(payload, {
      onSuccess: () => {
        modalStack.close("moderation");
        modalStack.close("view");
      },
    });
  };

  useEffect(() => {
    if (viewAppId) {
      modalStack.open("view");
    } else {
      modalStack.close("view");
    }
  }, [viewAppId]);

  const {
    data,
    isPending: isGetPending,
    error,
  } = useGetInstructorApplications({
    search,
    status: statusFilter === "All" ? undefined : statusFilter,
    orderBy: decodedOrderBy,
  });

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

      <div
        className="flex flex-wrap-reverse md:flex-wrap gap-4 items-center justify-between mb-8
          w-full"
      >
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

      {isGetPending || data.items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {isGetPending
            ? Array.from({ length: pageSize }).map((_, i) => (
                <InstructorApplicationCardSkeleton key={i} />
              ))
            : data.items.map((app) => (
                <InstructorApplicationCard
                  key={app.id}
                  app={app}
                  onView={() => {
                    setViewAppId(app.id);
                    modalStack.open("view");
                  }}
                />
              ))}
        </div>
      ) : (
        <AdminInstructorApplicationsPageEmptyState />
      )}

      <AppPagination
        page={page}
        pageSize={pageSize}
        itemsCount={data?.count ?? 0}
        onPageChange={setPage}
        withEdges
        className="flex justify-center items-center mt-10"
      />

      {viewAppId && (
        <InstructorApplicationViewModal
          id={viewAppId}
          {...modalStack.register("view")}
          handleModeration={handleModeration}
        />
      )}

      {moderationAppId && (
        <InstructorApplicationModerationModal
          id={moderationAppId}
          {...modalStack.register("moderation")}
          approveMode={approveMode}
          onSubmit={handleSubmitModeration}
          isSubmitting={isModerateInstructorApplicationPending}
        />
      )}
    </div>
  );
}
