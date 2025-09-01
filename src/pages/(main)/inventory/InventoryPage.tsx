import { ActionIcon, TextInput } from "@mantine/core";
import { PackageOpenIcon, SearchIcon } from "lucide-react";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import { Link } from "react-router-dom";
import AppPagination from "../../../components/AppPagination/AppPagination";
import CenterLoader from "../../../components/CenterLoader/CenterLoader";
import GiftingModal from "./_c/GiftingModal";
import InventoryItemCard from "./_c/InventoryItemCard";
import { useGetInventoryItemsSelf } from "../../../features/inventory/inventory.hooks";

export default function InventoryPage() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));
  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(6));
  const [searchInput, setSearchInput] = useState(search);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Gọi API với page + pageSize + search
  const { data, isPending, error } = useGetInventoryItemsSelf({
    page,
    pageSize,
    search: search,
  });

  const handleSearchSubmit = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  if (isPending) return <CenterLoader />;

  if (error) return <div>Error loading inventory items: {error.message}</div>;

  return (
    <div className="mx-auto">
      {/* Header: Title + Search Input */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold whitespace-nowrap text-gray-900 dark:text-white">
          My Inventory
        </h1>

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
        {data.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <PackageOpenIcon className="w-16 h-16 text-blue-500" />

            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Your inventory is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Looks like you haven't purchased any courses yet. Start exploring now and boost your
              learning journey!
            </p>
            <Link
              to="/courses"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium
                transition"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          data.items.map((item) => (
            <InventoryItemCard key={item.id} item={item} onGift={(id) => setSelectedItemId(id)} />
          ))
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
