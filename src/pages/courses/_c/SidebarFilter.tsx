import { Paper } from "@mantine/core";
import Filter from "./Filter";
import { Category } from "../../../types/category";

type SidebarFiltersProps = {
  categories: Category[];
};

export default function SidebarFilter({ categories }: SidebarFiltersProps) {
  return (
    <Paper withBorder className="pt-lg px-sm xl:px-lg">
      <Filter categories={categories} />
    </Paper>
  );
}
