import { ListData } from "../../api-client/api.types";
import apiClient from "../../api-client/apiClient";
import { InventoryItemVm } from "./inventory.types";

const BASE_URL = "/inventories";

export const getInventoryItemsSelf = async () => {
  const response = await apiClient.get<ListData<InventoryItemVm>>(
    `${BASE_URL}/InventoryItems/self`,
  );
  return response.data;
};
