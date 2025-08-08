import { Pagination } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

export default function CoursePagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page > 1) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }
    setSearchParams(params); // Update URL with new page number
  };

  return <Pagination total={10} withEdges value={currentPage} onChange={handlePageChange} />;
}
