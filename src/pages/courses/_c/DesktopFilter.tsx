import { Paper } from "@mantine/core";
import Filter from "./Filter";

type DesktopFilterProps = {};

export default function DesktopFilter({}: DesktopFilterProps) {
  return (
    <Paper withBorder className="pt-lg px-sm xl:px-lg">
      <Filter />
    </Paper>
  );
}
