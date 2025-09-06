import { ActionIcon, Select, Text, TextInput, Title, useModalsStack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";
import { ArrowUpAzIcon } from "lucide-react";
import { zodResolver } from "mantine-form-zod-resolver";
import { parseAsInteger, parseAsString, parseAsStringLiteral, useQueryState } from "nuqs";
import { useState } from "react";
import { decodeOrderOption, encodeOrderOption, OrderBy } from "../../../api-client/api.types";
import AppPagination from "../../../components/AppPagination/AppPagination";
import CenterLoader from "../../../components/CenterLoader/CenterLoader";
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
} from "../../../features/instructorApplication/instructorApplication.hooks";
import { cn } from "../../../utils/cn";
import AdminInstructorApplicationsPageEmptyState from "./_c/AdminInstructorApplicationsPageEmptyState";
import InstructorApplicationCard from "./_c/InstructorApplicationCard";
import InstructorApplicationReviewModal from "./_c/InstructorApplicationReviewModal";
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
        <AdminInstructorApplicationsPageEmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {apps.map((app) => (
            <InstructorApplicationCard
              key={app.id}
              app={app}
              onView={() => {
                setViewApp(app);
                modalStack.open("view");
              }}
            />
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

      <InstructorApplicationViewModal
        app={viewApp}
        {...modalStack.register("view")}
        handleReview={handleReview}
      />

      <InstructorApplicationReviewModal
        {...modalStack.register("review")}
        approveMode={approveMode}
        app={reviewApp}
        onSubmit={handleSubmitReview}
        isSubmitting={isPending}
      />
    </div>
  );
}
