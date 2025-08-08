import { Stack } from "@mantine/core";
import { ResponsiveDialog } from "mantine-vaul";
import CourseFilter from "./CourseFilter";

type CourseMobileFilterProps = {
  opened: boolean;
  onClose: () => void;
};

const CourseMobileFilter = ({ opened, onClose }: CourseMobileFilterProps) => {
  return (
    <ResponsiveDialog
      opened={opened}
      onClose={() => onClose()}
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
