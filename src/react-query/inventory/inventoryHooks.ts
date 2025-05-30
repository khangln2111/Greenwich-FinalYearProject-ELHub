import { useQuery } from "@tanstack/react-query";
import { getInventoryItemsSelf } from "./inventoryApi";
import { keyFac } from "../common-service/queryKeyFactory";
import { useAppStore } from "../../zustand/store";

export const useGetInventoryItemsSelf = () => {
  const currentUser = useAppStore.use.currentUser();
  return useQuery({
    queryKey: keyFac.inventories.getInventoryItemsSelf().queryKey,
    queryFn: getInventoryItemsSelf,
    enabled: !!currentUser,
  });
};
