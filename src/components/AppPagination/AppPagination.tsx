import { Pagination, PaginationProps } from "@mantine/core";

interface AppPaginationProps extends Omit<PaginationProps, "total" | "value" | "onChange"> {
  page: number;
  pageSize: number;
  itemsCount: number;
  onPageChange: (page: number) => void;
}

const AppPagination = ({
  page,
  pageSize,
  itemsCount,
  onPageChange,
  ...rest
}: AppPaginationProps) => {
  const totalPages = Math.ceil(itemsCount / pageSize);

  if (totalPages <= 1) {
    // if there is only one page, do not show pagination
    return null;
  }

  return <Pagination total={totalPages} value={page} onChange={onPageChange} {...rest} />;
};

export default AppPagination;
