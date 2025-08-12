import { useQuery } from "@tanstack/react-query";
import { getInventoryItemsSelf } from "./inventoryApi";
import { keyFac } from "../common-service/queryKeyFactory";
import { useAppStore } from "../../zustand/stores/appStore";
import { InventoryItemQueryCriteria } from "./inventory.types";

export const useGetInventoryItemsSelf = (query?: InventoryItemQueryCriteria) => {
  const currentUser = useAppStore((s) => s.currentUser);
  return useQuery({
    queryKey: keyFac.inventories.getInventoryItemsSelf(query).queryKey,
    queryFn: () => getInventoryItemsSelf(query),
    enabled: !!currentUser,
  });
};
