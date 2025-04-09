import { Paper } from "@mantine/core";
import Filter from "./Filter";
import { Category } from "../../../react-query/category/category.types";

type DesktopFilterProps = {
  categories: Category[];
};

export default function DesktopFilter({ categories }: DesktopFilterProps) {
  return (
    <Paper withBorder className="pt-lg px-sm xl:px-lg">
      <Filter categories={categories} />
    </Paper>
  );
}
