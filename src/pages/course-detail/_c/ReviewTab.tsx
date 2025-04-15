import { Progress, Rating, Select, TextInput, Title } from "@mantine/core";
import { IconStarFilled } from "@tabler/icons-react";
import { SearchIcon } from "lucide-react";
import avatar from "../../../assets/placeholder/avatar-placeholder.jpg";
interface FeedbackProps {
  rating: number;
  totalReviews: number;
  stars: { stars: number; percentage: number }[];
}

const ReviewTab = ({ rating, totalReviews, stars }: FeedbackProps) => {
  return (
    <div>
      <Title order={2}>What our student are saying</Title>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 rounded-lg mt-10">
        {/* Left section */}
        <div
          className="flex flex-col items-center justify-center md:col-span-3 gap-3 p-sm shadow-lg border border-gray-200
            dark:border-default-border rounded-lg md:aspect-square"
        >
          <div className="text-orange-500 text-5xl font-bold">{rating.toFixed(1)}</div>
          <Rating value={rating} readOnly size="lg" />
          <span className="text-gray-500 text-sm dark:text-neutral-300">
            ({totalReviews.toLocaleString()})
          </span>
          <span className="text-gray-500 text-xs dark:text-neutral-300">Course Rating</span>
        </div>
        {/* Right section */}
        <div className="grid grid-rows-5 gap-y-5 gap-x-3 grid-cols-[auto_1fr_auto] md:col-span-9">
          {stars.map(({ stars, percentage }) => (
            <div
              key={stars}
              className="grid grid-cols-subgrid col-span-3 items-center justify-center"
            >
              {/* Stars */}
              <div className="flex items-center justify-center text-yellow-500 gap-2">
                <p className="text-gray-600 dark:text-gray-300 text-sm font-medium leading-none">
                  {stars}
                </p>
                <IconStarFilled size={16} />
              </div>
              {/* Progress Bar */}
              <Progress value={percentage} size="lg" color="orange" striped />
              {/* Percentage */}
              <span className="text-gray-500 dark:text-gray-400 text-sm text-left leading-none">
                {percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Reviews of customer */}
      <div className="mt-10 flex items-center gap-5">
        <TextInput
          className="grow"
          type="search"
          rightSection={<SearchIcon size={16} />}
          placeholder="Search"
        />
        <Select placeholder="Search" />
      </div>
      <div className="mt-10 flex flex-col items-center justify-center gap-6">
        <div className="p-6 border rounded-lg shadow-sm bg-body flex flex-col gap-4 mx-auto">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <img src={avatar} alt="User avatar" className="w-16 h-16 rounded-full object-cover" />
              <div>
                <p className="text-lg font-medium">Jura Hujaor Jura Hujao</p>
                <p className="text-sm text-gray-500 dark:text-dark-2">2 Days ago</p>
              </div>
            </div>
            <div className="flex items-center text-yellow-400">
              <Rating value={5} readOnly size="md" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">The best LMS Design System</h3>
            <p className="mt-2 text-gray-600 dark:text-slate-400 leading-relaxed">
              Maximus ligula eleifend id nisl quis interdum. Sed malesuada tortor non turpis semper
              bibendum nisi porta, malesuada risus nonerviverra dolor. Vestibulum ante ipsum primis
              in faucibus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewTab;
