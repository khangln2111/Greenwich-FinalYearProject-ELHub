import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../zustand/stores/authStore";
import { keyFac } from "../common-service/queryKeyFactory";
import { InventoryItemQueryCriteria } from "./inventory.types";

export const useGetInventoryItemsSelf = (query?: InventoryItemQueryCriteria) => {
  const accessToken = useAuthStore((s) => s.accessToken);

  return useQuery({
    queryKey: keyFac.inventories.getInventoryItemsSelf(query).queryKey,
    queryFn: keyFac.inventories.getInventoryItemsSelf(query).queryFn,
    enabled: !!accessToken,
    placeholderData: keepPreviousData,
  });
};
