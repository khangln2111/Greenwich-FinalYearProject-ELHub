import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { ReactNode } from "react";
import CountUp, { CountUpProps } from "react-countup";
import { cn } from "../../utils/cn";

interface DashboardStatCardProps {
  title: string;
  value: string | number;
  growth?: number; // % change vs last week
  icon: ReactNode;
  className?: string; // custom class name
  prefix?: string | React.ReactNode; // example $, đ
  suffix?: string | React.ReactNode; // example %, pax
  decimals?: number; // number of decimal places
  duration?: number; // duration of count up
  classNames?: {
    value?: string;
    icon?: string;
  };
  countUpProps?: Omit<CountUpProps, "end" | "duration" | "suffix" | "prefix" | "duration">;
}

const DashboardStatCard = ({
  title,
  value,
  growth,
  icon,
  className,
  prefix,
  suffix,
  classNames,
  decimals = 0,
  duration = 7,
  countUpProps,
}: DashboardStatCardProps) => {
  const isPositive = growth !== undefined && growth >= 0;

  return (
    <div
      className={cn(
        `flex flex-col justify-between rounded-3xl bg-white dark:bg-gray-900 shadow-lg border border-gray-200
        dark:border-gray-700 p-5 transition hover:shadow-xl`,
        className,
      )}
    >
      {/* Top row with icon */}
      <div className="flex items-center justify-between">
        <p className="text-md font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <div
          className={cn(
            "p-3 rounded-xl flex items-center justify-center shadow-sm",
            classNames?.icon,
          )}
        >
          {icon}
        </div>
      </div>

      {/* Value */}
      <div className="mt-3">
        {typeof value === "number" ? (
          <p
            className={cn("text-2xl font-bold text-gray-900 dark:text-gray-100", classNames?.value)}
          >
            {prefix}
            <CountUp
              end={value}
              duration={duration}
              decimals={decimals}
              separator=","
              {...countUpProps}
            />
            {suffix}
          </p>
        ) : (
          <p
            className={cn(
              "text-2xl font-bold text-gray-900 dark:text-gray-100 ",
              classNames?.value,
            )}
          >
            {prefix}
            {value}
            {suffix}
          </p>
        )}
      </div>

      {/* Growth trend */}
      {growth !== undefined ? (
        <div className="mt-2 flex items-center gap-1 text-sm font-medium">
          {isPositive ? (
            <TrendingUpIcon size={16} className="text-emerald-500" />
          ) : (
            <TrendingDownIcon size={16} className="text-rose-500" />
          )}
          <span className={isPositive ? "text-emerald-600" : "text-rose-600"}>
            <CountUp
              end={growth}
              duration={duration}
              decimals={decimals}
              prefix={isPositive ? "+" : ""}
              suffix="%"
              separator=","
            />
          </span>
          <span className="ml-1 text-gray-500 dark:text-gray-400">vs last week</span>
        </div>
      ) : (
        <span className="text-gray-400 dark:text-gray-600 invisible">-</span>
      )}
    </div>
  );
};

export default DashboardStatCard;
