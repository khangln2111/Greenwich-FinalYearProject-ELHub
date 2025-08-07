import { Stack, Text, ThemeIcon } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ListFilter } from "lucide-react";
import { Vaul } from "mantine-vaul";
import { useAppStore } from "../../../../../zustand/store";
import CourseFilter from "./CourseFilter";

type CourseMobileFilterProps = {};

export default function CourseMobileFilter({}: CourseMobileFilterProps) {
  const isMobileFilterOpen = useAppStore.use.isMobileFilterOpen();
  const closeMobileFilter = useAppStore.use.closeMobileFilter();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop) {
    return null; // Don't render on larger screens
  }

  return (
    <Vaul
      radius="xl"
      shadow="xl"
      title={<Text className="text-h4 font-h4">Advanced filter</Text>}
      target={
        <Vaul.Target>
          <ThemeIcon size={35} hiddenFrom="lg" variant={isMobileFilterOpen ? "filled" : "default"}>
            <ListFilter strokeWidth={1.5} />
          </ThemeIcon>
        </Vaul.Target>
      }
      onCloseAnimationEnd={closeMobileFilter}
      classNames={{
        footer: "border-t-0",
      }}
    >
      <Stack className="pt-lg px-sm xl:px-lg mx-auto">
        <CourseFilter />
      </Stack>
    </Vaul>
  );
}
