import { Box, Text } from "@mantine/core";
import { FolderXIcon } from "lucide-react";

export default function AdminCategoriesPageEmptyState() {
  return (
    <Box
      className="py-24 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center
        justify-center"
    >
      <FolderXIcon className="size-16 text-gray-400 dark:text-gray-500 mb-4" />
      <Text className="text-lg font-semibold">No categories found</Text>
      <Text className="text-sm mt-1 max-w-[600px] mx-auto">
        Start by creating your first category or adjusting your search criteria.
      </Text>
    </Box>
  );
}
