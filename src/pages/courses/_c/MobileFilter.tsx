import { Button, Stack, Text } from "@mantine/core";
import { ListFilter } from "lucide-react";
import { Vaul } from "mantine-vaul";
import Filter from "./Filter";
import { Category } from "../../../types/category";

type MobileFilterProps = {
  categories: Category[];
};

export default function MobileFilter({ categories }: MobileFilterProps) {
  return (
    <div className="hidden-from-lg">
      <Vaul
        radius="xl"
        shadow="xl"
        title={<Text className="text-h4 font-h4">Advanced filter</Text>}
        target={
          <Vaul.Target component={Button}>
            <ListFilter />
          </Vaul.Target>
        }
        classNames={{
          footer: "border-t-0",
        }}
      >
        <Stack className="pt-lg px-sm xl:px-lg mx-auto">
          <Filter categories={categories} />
        </Stack>
      </Vaul>
    </div>
  );
}
