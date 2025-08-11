import { useQuery } from "@tanstack/react-query";
import { getInventoryItemsSelf } from "./inventoryApi";
import { keyFac } from "../common-service/queryKeyFactory";
import { useAppStore } from "../../zustand/stores/appStore";

export const useGetInventoryItemsSelf = () => {
  const currentUser = useAppStore((s) => s.currentUser);
  return useQuery({
    queryKey: keyFac.inventories.getInventoryItemsSelf().queryKey,
    queryFn: getInventoryItemsSelf,
    enabled: !!currentUser,
  });
};
