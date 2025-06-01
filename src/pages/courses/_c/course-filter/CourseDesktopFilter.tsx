import { Paper } from "@mantine/core";
import CourseFilter from "./CourseFilter";

type CourseDesktopFilterProps = {};

export default function CourseDesktopFilter({}: CourseDesktopFilterProps) {
  return (
    <Paper withBorder className="pt-lg px-sm xl:px-lg rounded-2xl">
      <CourseFilter />
    </Paper>
  );
}
