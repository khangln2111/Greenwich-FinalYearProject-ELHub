import { Box, ActionIcon, RingProgress, Text, Menu } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import { ChevronLeftIcon, EllipsisVerticalIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  progressPercent: number;
}

export default function LearningHeader({ progressPercent }: Props) {
  return (
    <header className="flex justify-between items-center px-3 md:px-6 py-1 shadow-sm bg-[#29303b]">
      <div className="flex items-center gap-2 md:gap-4 min-w-0">
        <Box
          component={Link}
          to="/dashboard/enrolled-courses"
          className="text-slate-300 hover:text-white transition-colors"
        >
          <ChevronLeftIcon className="size-6 md:size-7" strokeWidth={2} />
        </Box>
        <MantineLogo
          color="primary"
          size={28}
          type="mark"
          className="hidden md:block flex-shrink-0"
        />
        <h1 className="text-sm md:text-md font-bold text-white truncate pr-2">
          A Quick and Easy Intro to Python Programming
        </h1>
      </div>

      <div className="flex items-center gap-1 md:gap-3">
        <div className="flex items-center gap-1 text-xs md:text-sm text-slate-300 dark:text-slate-400">
          <RingProgress
            size={42}
            thickness={3}
            roundCaps
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
