import { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "../../../../utils/cn";

interface StatCardProps {
  title: string;
  value: string | number;
  growth?: number; // % change vs last week
  icon: ReactNode;
  iconColor?: string; // text color cho icon
  iconBgColor?: string; // background cho icon
}

export default function AdminStatCard({
  title,
  value,
  growth,
  icon,
  iconBgColor,
  iconColor,
}: StatCardProps) {
  const isPositive = growth !== undefined && growth >= 0;

  return (
    <div
      className="flex flex-col justify-between rounded-2xl bg-white dark:bg-gray-900 shadow-sm border border-gray-200
        dark:border-gray-700 p-5 transition hover:shadow-md"
    >
      {/* Top row with icon */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
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
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
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
            {isPositive ? `+${growth}%` : `${growth}%`}
          </span>
          <span className="ml-1 text-gray-500 dark:text-gray-400">vs last week</span>
        </div>
      ) : (
        <span className="text-gray-400 dark:text-gray-600">—</span>
      )}
    </div>
  );
}
