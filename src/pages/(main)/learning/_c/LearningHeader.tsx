import { Box, ActionIcon, Menu, RingProgress, Text } from "@mantine/core";
import { ChevronLeftIcon, EllipsisVerticalIcon } from "lucide-react";
import { Link } from "react-router";
import BrandLogo from "../../../../components/BrandLogo/BrandLogo";

interface LearningHeaderProps {
  title: string;
  progressPercent: number;
}

export default function LearningHeader({ title, progressPercent }: LearningHeaderProps) {
  return (
    <header className="flex justify-between items-center px-3 md:px-6 py-1 shadow-sm bg-[#29303b]">
      {/* Left: Back + Logo + Title */}
      <div className="flex items-center gap-2 md:gap-4 min-w-0">
        <Box
          component={Link}
          to="/dashboard/my-learning"
          className="text-slate-300 hover:text-white transition-colors"
        >
          <ChevronLeftIcon className="size-6 md:size-7" strokeWidth={2} />
        </Box>

        {/* Logo - hidden on mobile */}
        <BrandLogo iconSize={28} variant="mark" className="hidden md:block shrink-0" />

        <h1 className="text-sm md:text-md font-bold text-white truncate pr-2">{title}</h1>
      </div>

      {/* Right: Progress + Menu */}
      <div className="flex items-center gap-1 md:gap-3">
        <div className="flex items-center gap-1 text-xs md:text-sm text-slate-300 dark:text-slate-400">
          <RingProgress
            size={42}
            thickness={3}
            roundCaps
            transitionDuration={400}
            label={
              <Text className="text-xs text-center font-bold text-blue-300 dark:text-blue-400">
                {Math.round(progressPercent)}%
              </Text>
            }
            sections={[{ value: progressPercent, color: "blue" }]}
          />
          <span className="hidden md:inline">completed</span>
        </div>

        <Menu trigger="click">
          <Menu.Target>
            <ActionIcon
              variant="transparent"
              onClick={(e) => e.stopPropagation()}
              size="lg"
              className="text-slate-300 hover:text-white dark:text-slate-300 dark:hover:text-white"
            >
              <EllipsisVerticalIcon />
            </ActionIcon>
          </Menu.Target>
        </Menu>
      </div>
    </header>
  );
}
