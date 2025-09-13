import { Button, ActionIcon } from "@mantine/core";
import { ListFilter, LayoutGrid, LayoutList } from "lucide-react";
import { useCoursesPageStore } from "../../../../zustand/stores/coursesPageStore";

type CoursesPageActionsProps = {
  layout: "grid" | "list";
  onSetLayout: (layout: "grid" | "list") => void;
};

const CoursesPageActions = ({ layout, onSetLayout }: CoursesPageActionsProps) => {
  const toggleDesktopFilter = useCoursesPageStore((s) => s.toggleDesktopFilter);
  const isDesktopFilterOpen = useCoursesPageStore((s) => s.isDesktopFilterOpen);
  const isMobileFilterOpen = useCoursesPageStore((s) => s.isMobileFilterOpen);
  const openMobileFilter = useCoursesPageStore((s) => s.openMobileFilter);

  return (
    <div className="flex sm:items-center gap-4">
      {/* Filter buttons */}
      <div className="flex gap-2">
        <Button
          variant={isDesktopFilterOpen ? "filled" : "default"}
          visibleFrom="lg"
          leftSection={<ListFilter size={18} />}
          onClick={toggleDesktopFilter}
        >
          Filter
        </Button>

        <Button
          hiddenFrom="lg"
          variant={isMobileFilterOpen ? "filled" : "default"}
          onClick={openMobileFilter}
          leftSection={<ListFilter size={18} />}
        >
          Filter
        </Button>
      </div>

      {/* Layout switcher */}
      <div className="flex gap-2">
        <ActionIcon
          size="lg"
          variant={layout === "grid" ? "outline" : "default"}
          onClick={() => {
            onSetLayout("grid");
          }}
          radius="lg"
          data-active={layout === "grid"}
          aria-label="Grid view"
          title="Grid view"
          className="bg-body not-data-[active=true]:hover:border-primary-outline
            not-data-[active=true]:hover:text-primary-outline not-data-[active=true]:hover:bg-body"
        >
          <LayoutGrid strokeWidth={1.3} />
        </ActionIcon>

        <ActionIcon
          size="lg"
          variant={layout === "list" ? "outline" : "default"}
          onClick={() => {
            onSetLayout("list");
          }}
          data-active={layout === "list"}
          radius="lg"
          aria-label="List view"
          title="List view"
          className="bg-body not-data-[active=true]:hover:border-primary-outline
            not-data-[active=true]:hover:text-primary-outline not-data-[active=true]:hover:bg-body"
        >
          <LayoutList strokeWidth={1.3} />
        </ActionIcon>
      </div>
    </div>
  );
};
export default CoursesPageActions;
