import { Pagination } from "@mantine/core";

type CoursePaginationProps = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
};

const CoursePagination = ({ page, pageSize, total, onPageChange }: CoursePaginationProps) => {
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) {
    // if there is only one page, do not show pagination
    return null;
  }

  return <Pagination total={totalPages} withEdges value={page} onChange={onPageChange} />;
};

export default CoursePagination;
