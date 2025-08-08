// app/courses/components/CourseList.tsx
import { ActionIcon, Button, Group, TextInput, ThemeIcon, Title } from "@mantine/core";
import { LayoutGrid, List, ListFilter, Search } from "lucide-react";
import { useAppStore } from "../../../../zustand/store";
import CourseGrid from "./CourseGrid";

type CourseMainProps = {};

const CourseMain = ({}: CourseMainProps) => {
  const toggleDesktopFilter = useAppStore((s) => s.toggleDesktopFilter);
  const isDesktopFilterOpen = useAppStore((s) => s.isDesktopFilterOpen);
  const isMobileFilterOpen = useAppStore((s) => s.isMobileFilterOpen);
  const openMobileFilter = useAppStore((s) => s.openMobileFilter);

  return (
    <>
      <Group justify="space-between">
        <Title className="text-2xl sm:text-3xl">Courses List</Title>
        {/* Sort Options */}
        <Group align="center">
          {/* Desktop filter toggler */}
          <Button
            variant={isDesktopFilterOpen ? "filled" : "default"}
            visibleFrom="lg"
            leftSection={<ListFilter />}
            onClick={toggleDesktopFilter}
          >
            Filter
          </Button>
          <ThemeIcon
            size={35}
            hiddenFrom="lg"
            variant={isMobileFilterOpen ? "filled" : "default"}
            onClick={openMobileFilter}
          >
            <ListFilter strokeWidth={1.5} />
          </ThemeIcon>
          <ActionIcon size={35}>
            <LayoutGrid strokeWidth={1.5} />
          </ActionIcon>
          <ActionIcon size={35} variant="default">
            <List strokeWidth={1.5} />
          </ActionIcon>
          {/* Mobile filter toggler */}

          <TextInput
            placeholder="Search..."
            classNames={{
              input: `placeholder:font-semibold pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:ring-2
              focus:ring-blue-500`,
            }}
            leftSection={<Search className="text-gray-400" size={18} />}
          />
        </Group>
      </Group>
      <CourseGrid />
    </>
  );
};

export default CourseMain;
