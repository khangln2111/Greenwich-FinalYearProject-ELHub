import { createQueryKeys } from "@lukemorales/query-key-factory";
import { CategoryQueryCriteria } from "./category.types";

export const categoryKeyFac = createQueryKeys("categories", {
  list: (query?: CategoryQueryCriteria) => ({
    queryKey: [query],
  }),
  detail: (id: string) => ({
    queryKey: [id],
  }),
});
