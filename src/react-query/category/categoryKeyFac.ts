import { createQueryKeys } from "@lukemorales/query-key-factory";
import { CategoryQueryCriteria } from "./category.types";
import { getCategories, getCategoryDetail } from "./categoryApi";

export const categoryKeyFac = createQueryKeys("categories", {
  list: (query?: CategoryQueryCriteria) => ({
    queryKey: [query],
    queryFn: () => getCategories(query),
  }),
  detail: (id: string) => ({
    queryKey: [id],
    queryFn: () => getCategoryDetail(id),
  }),
});
