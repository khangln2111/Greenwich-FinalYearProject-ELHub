import { useQuery } from "@tanstack/react-query";
import { authStorage } from "../../utils/storageHelper";
import { keyFac } from "../common-service/queryKeyFactory";
import { getInventoryItemsSelf } from "./inventory.api";
import { InventoryItemQueryCriteria } from "./inventory.types";

export const useGetInventoryItemsSelf = (query?: InventoryItemQueryCriteria) => {
  const accessToken = authStorage.getAccessToken();

  return useQuery({
    queryKey: keyFac.inventories.getInventoryItemsSelf(query).queryKey,
    queryFn: () => getInventoryItemsSelf(query),
    enabled: !!accessToken,
  });
};
