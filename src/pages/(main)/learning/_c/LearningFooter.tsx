// components/learning/CourseFooterNavigation.tsx
import { ActionIcon, Button } from "@mantine/core";
import { ChevronLeft, ChevronRight, ArrowRightIcon, MenuIcon } from "lucide-react";

interface LearningFooterProps {
  onPrev: () => void;
  onNext: () => void;
  prevDisabled: boolean;
  nextDisabled: boolean;
  onToggleSidebar: () => void;
  onOpenDrawer: () => void;
  desktopSidebarOpened: boolean;
}

export default function LearningFooter({
  onPrev,
  onNext,
  prevDisabled,
  nextDisabled,
  onToggleSidebar,
  onOpenDrawer,
  desktopSidebarOpened,
}: LearningFooterProps) {
  return (
    <footer
      className="border-t px-4 md:px-6 py-2 flex items-center justify-between text-sm shadow-sm bg-[#f0f0f0]
        dark:bg-[#121212]"
    >
      <div className="hidden lg:block"></div>
      <div className="flex items-center gap-2">
        <Button
          onClick={onPrev}
          disabled={prevDisabled}
          leftSection={<ChevronLeft size={16} />}
          variant="default"
          radius="full"
        >
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={nextDisabled}
          rightSection={<ChevronRight size={16} />}
          radius="full"
        >
          Next
        </Button>
      </div>
      <ActionIcon
        radius="full"
        variant="default"
        size="lg"
        onClick={onToggleSidebar}
        className="visible-from-lg"
      >
        {desktopSidebarOpened ? (
          <ArrowRightIcon className="size-[60%]" />
        ) : (
          <MenuIcon className="size-[60%]" />
        )}
      </ActionIcon>
      <ActionIcon
        radius="full"
        size="lg"
        className="hidden-from-lg"
        variant="default"
        onClick={onOpenDrawer}
      >
        {desktopSidebarOpened ? (
          <ArrowRightIcon className="size-[60%]" />
        ) : (
          <MenuIcon className="size-[60%]" />
        )}
      </ActionIcon>
    </footer>
  );
}
