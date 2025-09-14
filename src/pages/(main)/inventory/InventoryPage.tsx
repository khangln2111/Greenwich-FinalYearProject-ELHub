import { ActionIcon, TextInput, Title } from "@mantine/core";
import { SearchIcon } from "lucide-react";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import AppPagination from "../../../components/AppPagination/AppPagination";
import { useGetInventoryItemsSelf } from "../../../features/inventory/inventory.hooks";
import { usePageSEO } from "../../../hooks/usePageSEO";
import GiftingModal from "./_c/GiftingModal";
import InventoryItemCard from "./_c/InventoryItemCard";
import InventoryItemCardSkeleton from "./_c/InventoryItemCardSkeleton";
import InventoryPageEmptyState from "./_c/InventoryPageEmptyState";

export default function InventoryPage() {
  usePageSEO({ title: "My Inventory" });

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));
  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(6));
  const [searchInput, setSearchInput] = useState(search);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Call API to fetch inventory items
  const {
    data,
    isPending,
    error: isError,
  } = useGetInventoryItemsSelf({
    page,
    pageSize,
    search: search,
  });

  const handleSearchSubmit = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  if (isError) return <div>Failed to load inventory items</div>;

  return (
    <div className="mx-auto">
      {/* Header: Title + Search Input */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <Title
          order={1}
          className="text-2xl sm:text-3xl font-bold whitespace-nowrap text-gray-900 dark:text-white"
        >
          My Inventory
        </Title>

        <TextInput
          placeholder="Search inventory items..."
          className="max-w-60"
          value={searchInput}
          onChange={(e) => setSearchInput(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchSubmit(e);
            }
          }}
          rightSectionPointerEvents="all"
          rightSection={
            search ? (
              <ActionIcon
                variant="subtle"
                size="lg"
                onClick={() => {
                  setSearchInput("");
                  setSearch("");
                  setPage(1);
                }}
                aria-label="Clear search"
              >
                ✕
              </ActionIcon>
            ) : (
              <ActionIcon
                type="submit"
                variant="subtle"
                size="lg"
                onClick={handleSearchSubmit}
                aria-label="Search"
              >
                <SearchIcon className="text-gray-500" size={16} />
              </ActionIcon>
            )
          }
        />
      </div>

      <div className="space-y-5">
        {isPending ? (
          Array.from({ length: pageSize }).map((_, i) => <InventoryItemCardSkeleton key={i} />)
        ) : data.items.length > 0 ? (
          data.items.map((item) => (
            <InventoryItemCard key={item.id} item={item} onGift={(id) => setSelectedItemId(id)} />
          ))
        ) : (
          <InventoryPageEmptyState />
        )}
      </div>

      {selectedItemId && (
        <GiftingModal
          opened={!!selectedItemId}
          onClose={() => setSelectedItemId(null)}
          inventoryItemId={selectedItemId}
        />
      )}

      <AppPagination
        page={page}
        pageSize={pageSize}
        itemsCount={data?.count ?? 0}
        onPageChange={setPage}
        withEdges
        className="flex items-center justify-center mt-10"
      />
    </div>
  );
}
