import { Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Vaul } from "mantine-vaul";
import { useAppStore } from "../../../zustand/store";
import Filter from "./Filter";

type MobileFilterProps = {};

export default function MobileFilter({}: MobileFilterProps) {
  const isMobileFilterOpen = useAppStore.use.isMobileFilterOpen();
  const closeMobileFilter = useAppStore.use.closeMobileFilter();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop) {
    return null; // Don't render on larger screens
  }

  return (
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
        <Filter />
      </Stack>
    </Vaul>
  );
}
