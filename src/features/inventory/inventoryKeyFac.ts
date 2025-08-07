import { createQueryKeys } from "@lukemorales/query-key-factory";
import { InventoryItemQueryCriteria } from "./inventory.types";

export const inventoryKeyFac = createQueryKeys("inventories", {
  getInventoryItemsSelf: (query?: InventoryItemQueryCriteria) => ({
    queryKey: [query],
  }),
});
