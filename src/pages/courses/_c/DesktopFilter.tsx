import { Paper } from "@mantine/core";
import Filter from "./Filter";
import { Category } from "../../../types/category";

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
