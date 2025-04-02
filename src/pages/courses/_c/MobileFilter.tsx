import { Stack, Text } from "@mantine/core";
import { Vaul } from "mantine-vaul";
import Filter from "./Filter";
import { Category } from "../../../types/category";
import { useAppStore } from "../../../zustand/store";

type MobileFilterProps = {
  categories: Category[];
};

export default function MobileFilter({ categories }: MobileFilterProps) {
  const isMobileFilterOpen = useAppStore.use.isMobileFilterOpen();
  const closeMobileFilter = useAppStore.use.closeMobileFilter();

  return (
    <div className="hidden-from-lg">
      <Vaul
        radius="xl"
        shadow="xl"
        title={<Text className="text-h4 font-h4">Advanced filter</Text>}
        opened={isMobileFilterOpen}
        onOpenChange={closeMobileFilter}
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
