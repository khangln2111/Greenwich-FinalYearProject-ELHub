import { ActionIcon, Button, Text, TextInput, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Plus, SearchIcon } from "lucide-react";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import AppPagination from "../../../components/AppPagination/AppPagination";
import { useGetCategories } from "../../../features/category/category.hooks";
import { CategoryVm } from "../../../features/category/category.types";
import { usePageSEO } from "../../../hooks/usePageSEO";
import AdminCategoriesPageEmptyState from "./_c/AdminCategoriesPageEmptyState";
import AdminCategoryCard from "./_c/AdminCategoryCard";
import AdminCategoryCardSkeleton from "./_c/AdminCategoryCardSkeleton";
import CreateCategoryModal from "./_c/CreateCategoryModal";
import UpdateCategoryModal from "./_c/UpdateCategoryModal";

export default function AdminCategoriesPage() {
  usePageSEO({ title: "Categories management" });

  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [createOpened, { open: openCreate, close: closeCreate }] = useDisclosure(false);
  const [editingCategory, setEditingCategory] = useState<CategoryVm | null>(null);

  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(8));

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const { data, isPending, isError } = useGetCategories({ name: search, page, pageSize });

  if (isError) return <Text>Failed to load categories</Text>;

  const handleSearchSubmit = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    setSearch(searchInput.trim());
  };

  const handleEdit = (category: CategoryVm) => {
    setEditingCategory(category);
    openEdit();
  };

  return (
    <div className="flex-1 p-6 xl:p-8">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <Title order={1} className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Categories
        </Title>
        <div className="flex gap-3 justify-between w-full sm:w-auto">
          <Button onClick={openCreate} leftSection={<Plus size={16} />} className="flex-1 max-w-60">
            Add Category
          </Button>
          <form onSubmit={handleSearchSubmit}>
            <TextInput
              placeholder="Search categories..."
              className="max-w-60 flex-1"
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
                    }}
                  >
                    ✕
                  </ActionIcon>
                ) : (
                  <ActionIcon type="submit" variant="subtle" size="lg" onClick={handleSearchSubmit}>
                    <SearchIcon className="text-gray-500" size={16} />
                  </ActionIcon>
                )
              }
            />
          </form>
        </div>
      </div>

      {isPending || data.items.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isPending
            ? Array.from({ length: pageSize }).map((_, i) => <AdminCategoryCardSkeleton key={i} />)
            : data?.items.map((cat) => (
                <AdminCategoryCard key={cat.id} category={cat} handleEdit={handleEdit} />
              ))}
        </div>
      ) : (
        <AdminCategoriesPageEmptyState />
      )}

      <AppPagination
        page={page}
        pageSize={pageSize}
        itemsCount={data?.count ?? 0}
        onPageChange={(newPage) => setPage(newPage)}
        withEdges
        className="flex justify-center items-center mt-[50px]"
      />

      {/* Modals */}
      <CreateCategoryModal opened={createOpened} onClose={closeCreate} />
      <UpdateCategoryModal
        opened={editOpened}
        onClose={() => {
          closeEdit();
          setEditingCategory(null);
        }}
        key={editingCategory?.id}
        category={editingCategory}
      />
    </div>
  );
}
