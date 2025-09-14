import { createQueryKeys } from "@lukemorales/query-key-factory";
import { InventoryItemQueryCriteria } from "./inventory.types";
import { getInventoryItemsSelf } from "./inventory.api";

export const inventoryKeyFac = createQueryKeys("inventories", {
  getInventoryItemsSelf: (query?: InventoryItemQueryCriteria) => ({
    queryKey: [query],
    queryFn: () => getInventoryItemsSelf(query),
  }),
});
