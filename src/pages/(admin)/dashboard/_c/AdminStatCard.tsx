import { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "../../../../utils/cn";
import CountUp from "react-countup";

interface StatCardProps {
  title: string;
  value: string | number;
  growth?: number; // % change vs last week
  icon: ReactNode;
  iconColor?: string; // text color cho icon
  iconBgColor?: string; // background cho icon
  className?: string; // custom class name
  prefix?: string; // example $, đ
  suffix?: string; // example %, người
  decimals?: number; // number of decimal places
  duration?: number; // duration of count up
}

export default function AdminStatCard({
  title,
  value,
  growth,
  icon,
  iconBgColor,
  iconColor,
  className,
  prefix,
  suffix,
  decimals = 0,
  duration = 7,
}: StatCardProps) {
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
            iconBgColor,
            iconColor,
          )}
        >
          {icon}
        </div>
      </div>

      {/* Value */}
      <div className="mt-3">
        {typeof value === "number" ? (
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            <CountUp
              end={value}
              duration={duration}
              decimals={decimals}
              prefix={prefix}
              suffix={suffix}
              separator=","
            />
          </p>
        ) : (
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
        )}
      </div>

      {/* Growth trend */}
      {growth !== undefined ? (
        <div className="mt-2 flex items-center gap-1 text-sm font-medium">
          {isPositive ? (
            <ArrowUpRight size={16} className="text-emerald-500" />
          ) : (
            <ArrowDownRight size={16} className="text-rose-500" />
          )}
          <span className={isPositive ? "text-emerald-600" : "text-rose-600"}>
            <CountUp
              end={growth}
              duration={duration}
              decimals={decimals}
              prefix={isPositive ? "+" : "-"}
              suffix="%"
              separator=","
            />
          </span>
          <span className="ml-1 text-gray-500 dark:text-gray-400">vs last week</span>
        </div>
      ) : (
        <span className="text-gray-400 dark:text-gray-600">—</span>
      )}
    </div>
  );
}
