import { useMediaQuery } from "@mantine/hooks";
import { ResponsiveDialog } from "mantine-vaul";
import { useCoursesPageStore } from "../../../../../zustand/stores/coursesPageStore";
import CourseFilter from "./CourseFilter";

type CourseMobileFilterProps = {};

const CourseMobileFilter = ({}: CourseMobileFilterProps) => {
  const isMobileFilterOpen = useCoursesPageStore((s) => s.isMobileFilterOpen);
  const closeMobileFilter = useCoursesPageStore((s) => s.closeMobileFilter);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop) return null;

  return (
    <ResponsiveDialog
      opened={isMobileFilterOpen}
      onClose={closeMobileFilter}
      radius="xl"
      shadow="xl"
      title={<p className="text-h4 font-h4">Advanced filter</p>}
      vaulProps={{
        classNames: {
          footer: "border-t-0",
        },
      }}
      drawerProps={{
        className: "lg:hidden",
      }}
      matches={{
        base: "vaul",
        md: "drawer",
      }}
    >
      <div className="mx-auto">
        <CourseFilter />
      </div>
    </ResponsiveDialog>
  );
};

export default CourseMobileFilter;
