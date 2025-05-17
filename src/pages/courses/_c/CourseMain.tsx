// app/courses/components/CourseList.tsx
import { ActionIcon, Button, Group, TextInput, Title } from "@mantine/core";
import { LayoutGrid, List, ListFilter, Search } from "lucide-react";
import { useAppStore } from "../../../zustand/store";
import CourseMobileFilter from "./course-filter/CourseMobileFilter";
import CourseGrid from "./CourseGrid";

type CourseMainProps = {};

const CourseMain = ({}: CourseMainProps) => {
  const toggleDesktopFilter = useAppStore.use.toggleDesktopFilter();
  const isDesktopFilterOpen = useAppStore.use.isDesktopFilterOpen();

  const isMobileFilterOpen = useAppStore.use.isMobileFilterOpen();
  const closeMobileFilter = useAppStore.use.closeMobileFilter();
  const openMobileFilter = useAppStore.use.openMobileFilter();

  return (
    <>
      <Group justify="space-between">
        <Title order={2}>Courses List</Title>
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
          <ActionIcon size={35}>
            <LayoutGrid strokeWidth={1.5} />
          </ActionIcon>
          <ActionIcon size={35} variant="default">
            <List strokeWidth={1.5} />
          </ActionIcon>
          {/* Mobile filter toggler */}
          <CourseMobileFilter />

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
