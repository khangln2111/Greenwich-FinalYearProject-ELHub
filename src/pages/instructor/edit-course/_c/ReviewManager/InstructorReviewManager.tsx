import { Group, Progress, Rating, Select, SelectProps, TextInput, Title } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconCheck, IconStarFilled } from "@tabler/icons-react";
import dayjs from "dayjs";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import avatar from "../../../../../assets/placeholder/profile-avatar-placeholder.svg";
import CenterLoader from "../../../../../components/CenterLoader";
import { useGetReviewsByCourseId } from "../../../../../react-query/review/reviewHooks";

const renderStarOptionIconOnly: SelectProps["renderOption"] = ({ option, checked }) => {
  const stars = parseInt(option.value);
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
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebouncedValue(searchInput, 300);
  const [selectedRating, setSelectedRating] = useState<string | null>(null);

  const {
    data: reviews,
    isPending,
    error,
  } = useGetReviewsByCourseId(courseId, {
    content: debouncedSearch,
    rating: selectedRating ? parseInt(selectedRating) : undefined,
  });

  if (isPending) return <CenterLoader />;

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
          className="flex flex-col items-center justify-center md:col-span-4 xl:col-span-3 gap-3 p-sm border-r
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
        {/* Search + Filter */}
        <div className="flex items-center gap-5">
          <TextInput
            className="grow"
            size="md"
            type="search"
            rightSection={<SearchIcon size={16} />}
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.currentTarget.value)}
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
            data={[
              { value: "5", label: "5" },
              { value: "4", label: "4" },
              { value: "3", label: "3" },
              { value: "2", label: "2" },
              { value: "1", label: "1" },
            ]}
          />
        </div>
        {/* Reviews */}
        <div className="flex flex-col items-center justify-center gap-6">
          {reviews.items.length === 0 && (
            <p className="text-center text-gray-500">No reviews found.</p>
          )}
          {reviews.items.map((review) => (
            <div
              key={review.id}
              className="p-6 border rounded-lg shadow-sm bg-body flex flex-col gap-4 self-start w-full"
            >
              <div className="flex items-center gap-4">
                <img
                  src={review.avatarUrl || avatar}
                  alt="User avatar"
                  className="size-16 rounded-full object-cover"
                />
                <div className="flex-1 flex flex-col gap-1 md:gap-0">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <p className="text-xl font-medium">{review.userFullName}</p>
                    <Rating value={review.rating} readOnly size="md" />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-dark-2">
                    {dayjs(review.updatedAt).fromNow()}
                  </p>
                </div>
              </div>
              <div>
                <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">
                  {review.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorReviewManager;
