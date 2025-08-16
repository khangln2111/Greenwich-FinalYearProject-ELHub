import { Stack } from "@mantine/core";
import { ResponsiveDialog } from "mantine-vaul";
import CourseFilter from "./CourseFilter";
import { useCoursesPageStore } from "../../../../../zustand/stores/coursesPageStore";
import { useMediaQuery } from "@mantine/hooks";

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
      <Stack gap="0.5" className="pt-lg px-sm xl:px-lg mx-auto">
        <CourseFilter />
      </Stack>
    </ResponsiveDialog>
  );
};

export default CourseMobileFilter;
