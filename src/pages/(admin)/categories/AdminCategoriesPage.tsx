import { ActionIcon, Badge, Button, Image, Text, TextInput, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Pencil, Plus, SearchIcon } from "lucide-react";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import AppPagination from "../../../components/AppPagination/AppPagination";
import CenterLoader from "../../../components/CenterLoader/CenterLoader";
import { CategoryVm } from "../../../features/category/category.types";
import { useGetCategories } from "../../../features/category/category.hooks";
import CreateCategoryModal from "./_c/CreateCategoryModal";
import UpdateCategoryModal from "./_c/UpdateCategoryModal";

export default function AdminCategoriesPage() {
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [createOpened, { open: openCreate, close: closeCreate }] = useDisclosure(false);
  const [editingCategory, setEditingCategory] = useState<CategoryVm | null>(null);

  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(8));

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const { data, isPending, error } = useGetCategories({ name: search, page, pageSize });

  if (error) return <Text>Error loading categories: {error.message}</Text>;

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

      {isPending ? (
        <CenterLoader />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.items.map((cat) => (
            <div
              key={cat.id}
              className="rounded-2xl border border-gray-200 dark:border-dark-4 overflow-hidden bg-white dark:bg-dark-6
                shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="aspect-video overflow-hidden">
                <Image src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover" />
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="text-lg font-semibold mb-2">{cat.name}</h3>
                <div className="flex items-center justify-between mt-auto">
                  <Badge color="gray" variant="light" radius="sm" size="sm">
                    {cat.courseCount} course{cat.courseCount !== 1 && "s"}
                  </Badge>
                  <Button
                    variant="default"
                    size="xs"
                    leftSection={<Pencil size={14} />}
                    onClick={() => handleEdit(cat)}
                    className="rounded-lg dark:bg-dark-4 dark:text-white"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
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
