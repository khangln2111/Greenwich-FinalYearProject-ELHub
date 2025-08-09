import { Stack } from "@mantine/core";
import { ResponsiveDialog } from "mantine-vaul";
import CourseFilter from "./CourseFilter";
import { useCourseFilterStore } from "../../../../../zustand/courseFilterStore";

type CourseMobileFilterProps = {};

const CourseMobileFilter = ({}: CourseMobileFilterProps) => {
  const isMobileFilterOpen = useCourseFilterStore((s) => s.isMobileFilterOpen);
  const closeMobileFilter = useCourseFilterStore((s) => s.closeMobileFilter);

  return (
    <ResponsiveDialog
      opened={isMobileFilterOpen}
      onClose={() => closeMobileFilter()}
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
      <Stack className="pt-lg px-sm xl:px-lg mx-auto">
        <CourseFilter />
      </Stack>
    </ResponsiveDialog>
  );
};

export default CourseMobileFilter;
