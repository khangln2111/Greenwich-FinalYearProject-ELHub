import {
  ActionIcon,
  Group,
  Progress,
  Rating,
  Select,
  SelectProps,
  TextInput,
  Title,
} from "@mantine/core";
import { IconCheck, IconStarFilled } from "@tabler/icons-react";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

import CenterLoader from "../../../../../components/CenterLoader/CenterLoader";
import { useGetReviewsByCourseId } from "../../../../../features/review/reviewHooks";
import InstructorReviewManagerCard from "./_c/InstructorReviewManagerCard";
import { OrderBy } from "../../../../../api-client/api.types";
import { ReviewOrderableFields } from "../../../../../features/review/review.types";

// ----- TYPESAFE SORT OPTIONS -----
const REVIEW_SORT_OPTIONS: {
  value: string;
  label: string;
  orderBy: OrderBy<ReviewOrderableFields>;
}[] = [
  { value: "newest", label: "Newest", orderBy: { field: "createdAt", direction: "desc" } },
  { value: "oldest", label: "Oldest", orderBy: { field: "createdAt", direction: "asc" } },
  { value: "highest", label: "Highest rating", orderBy: { field: "rating", direction: "desc" } },
  { value: "lowest", label: "Lowest rating", orderBy: { field: "rating", direction: "asc" } },
];

// ----- STAR OPTION RENDER -----
const renderStarOptionIconOnly: SelectProps["renderOption"] = ({ option, checked }) => {
  const stars = Number(option.value);
  return (
    <Group justify="space-between" flex="1" px="xs" py={4}>
      <Group gap={4}>
        {Array.from({ length: stars }).map((_, i) => (
          <IconStarFilled key={i} size={16} className="text-yellow" />
        ))}
      </Group>
      {checked && <IconCheck size={16} className="text-primary-6 opacity-70" />}
    </Group>
  );
};

interface InstructorReviewManagerProps {
  rating: number;
  totalReviews: number;
  stars: { stars: number; percentage: number }[];
  courseId: string;
}

const InstructorReviewManager = ({
  rating,
  totalReviews,
  stars,
  courseId,
}: InstructorReviewManagerProps) => {
  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [selectedReplyStatus, setSelectedReplyStatus] = useState<string | null>("all");
  const [selectedSort, setSelectedSort] = useState("newest");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    setSearchTerm(searchInput.trim());
  };

  const isReplied =
    selectedReplyStatus === "replied"
      ? true
      : selectedReplyStatus === "unreplied"
        ? false
        : undefined;

  const {
    data: reviews,
    isPending,
    error,
  } = useGetReviewsByCourseId(courseId, {
    content: searchTerm,
    rating: selectedRating ? parseInt(selectedRating) : undefined,
    isReplied,
    orderBy: REVIEW_SORT_OPTIONS.find((opt) => opt.value === selectedSort)!.orderBy,
  });

  if (error) {
    return <p className="text-red-500 text-center">Error loading reviews: {error.message}</p>;
  }

  return (
    <div>
      <Title order={2}>What our students are saying</Title>

      {/* review summary */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 rounded-lg mt-10">
        {/* Left section */}
        <div
          className="flex flex-col items-center justify-center md:col-span-4 xl:col-span-3 gap-3 p-sm md:border-r
            md:aspect-square"
        >
          <div className="text-orange-500 text-5xl font-bold">{rating.toFixed(1)}</div>
          <Rating value={rating} readOnly size="lg" />
          <span className="text-gray-500 text-sm dark:text-neutral-300">
            ({totalReviews.toLocaleString("en-US")})
          </span>
          <span className="text-gray-500 text-xs dark:text-neutral-300">Course Rating</span>
        </div>

        {/* Right section */}
        <div className="grid grid-rows-5 gap-y-5 gap-x-3 grid-cols-[auto_1fr_auto] md:col-span-8 xl:col-span-9">
          {stars.map(({ stars, percentage }) => (
            <div
              key={stars}
              className="grid grid-cols-subgrid col-span-3 items-center justify-center"
            >
              <div className="flex items-center justify-center text-yellow-500 gap-2">
                <p className="text-gray-600 dark:text-gray-300 text-sm font-medium leading-none">
                  {stars}
                </p>
                <IconStarFilled size={16} />
              </div>
              <Progress value={percentage} size="lg" color="orange" striped />
              <span className="text-gray-500 dark:text-gray-400 text-sm text-left leading-none">
                {percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* bottom section wrapper */}
      <div className="mt-10 flex flex-col gap-7">
        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-5">
          <TextInput
            className="grow"
            size="md"
            type="search"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearchSubmit(e);
            }}
            rightSection={
              searchTerm ? (
                <ActionIcon
                  variant="subtle"
                  size="lg"
                  onClick={() => {
                    setSearchInput("");
                    setSearchTerm("");
                  }}
                >
                  ✕
                </ActionIcon>
              ) : (
                <ActionIcon type="submit" variant="subtle" size="lg" onClick={handleSearchSubmit}>
                  <SearchIcon className="text-gray-500" size={16} />
                </ActionIcon>
              )
            }
          />

          <Select
            placeholder="Filter by stars"
            size="md"
            checkIconPosition="right"
            leftSection={<IconStarFilled size={22} className="text-yellow" />}
            renderOption={renderStarOptionIconOnly}
            clearable
            value={selectedRating}
            onChange={setSelectedRating}
            data={Array.from({ length: 5 }, (_, i) => ({
              value: (5 - i).toString(),
              label: (5 - i).toString(),
            }))}
          />

          <Select
            placeholder="Reply status"
            size="md"
            value={selectedReplyStatus}
            checkIconPosition="right"
            onChange={(value) => setSelectedReplyStatus(value)}
            data={[
              { value: "all", label: "All" },
              { value: "replied", label: "Replied" },
              { value: "unreplied", label: "Unreplied" },
            ]}
          />

          <Select
            placeholder="Sort by"
            size="md"
            checkIconPosition="right"
            value={selectedSort}
            onChange={(value) => setSelectedSort(value!)}
            data={REVIEW_SORT_OPTIONS.map(({ value, label }) => ({ value, label }))}
          />
        </div>

        {/* Reviews */}
        <div className="flex flex-col justify-center items-center gap-6 min-h-[300px]">
          {isPending ? (
            <CenterLoader />
          ) : reviews.items.length === 0 ? (
            <p className="text-center text-gray-500">No reviews found.</p>
          ) : (
            reviews.items.map((review) => (
              <InstructorReviewManagerCard key={review.id} review={review} className="max-w-3xl" />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorReviewManager;
