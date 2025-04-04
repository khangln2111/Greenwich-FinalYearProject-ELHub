// app/courses/components/CourseList.tsx
import { ActionIcon, Button, Flex, Group, SimpleGrid, TextInput, Title } from "@mantine/core";
import { LayoutGrid, List, ListFilter, Search } from "lucide-react";
import CourseCard from "../../home/_c/PopularCourses/CourseCard";
import PaginationComponent from "./Pagination";
import { Course } from "../../../types/course.types";
import { useAppStore } from "../../../zustand/store";

type CourseListProps = {
  courses: Course[];
};

const CourseList = ({ courses }: CourseListProps) => {
  const toggleMobileFilter = useAppStore.use.toggleMobileFilter();
  const toggleDesktopFilter = useAppStore.use.toggleDesktopFilter();
  const isDesktopFilterOpen = useAppStore.use.isDesktopFilterOpen();

  return (
    <>
      <Group justify="space-between">
        <Title order={2}>Courses List</Title>
        {/* Sort Options */}
        <Group align="center">
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
          <ActionIcon size={35} onClick={toggleMobileFilter} hiddenFrom="lg">
            <ListFilter strokeWidth={1.5} />
          </ActionIcon>
          {/* Desktop filter toggler */}

          {/* <Select
            data={[
              { value: "newest", label: "Newest" },
              { value: "oldest", label: "Oldest" },
              { value: "popular", label: "Most Popular" },
            ]}
            className="w-[150px]"
            placeholder="Sort by"
          /> */}

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
      <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }} spacing="md" my={25}>
        {courses.map((course) => (
          <CourseCard key={course.id} />
        ))}
      </SimpleGrid>
      {/* <div className="grid grid-cols-fill-[250px] gap-lg mx-auto my-[25px]">
        {courses.map((course) => (
          <CourseCard key={course.id} />
        ))}
      </div> */}
      <Flex justify="center" mt="50">
        <PaginationComponent />
      </Flex>
    </>
  );
};

export default CourseList;
