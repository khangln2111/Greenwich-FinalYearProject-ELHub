import { GridifyQueryBuilder, ConditionalOperator as op } from "gridify-client";
import { ListData } from "../../api-client/api.types";
import apiClient from "../../api-client/apiClient";
import { applyConditions } from "../../utils/gridifyHelper";
import { InventoryItemQueryCriteria, InventoryItemVm } from "./inventory.types";

const BASE_URL = "/inventories";

export const buildInventoryItemQuery = (query: InventoryItemQueryCriteria = {}) => {
  const qb = new GridifyQueryBuilder();

  qb.setPage(query.page ?? 1);
  qb.setPageSize(query.pageSize ?? 10);

  const conditions: Array<() => void> = [];

  if (query.search?.trim()) {
    conditions.push(() =>
      qb
        .startGroup()
        .addCondition("courseTitle", op.Contains, query.search!, false)
        .or()
        .addCondition("courseDescription", op.Contains, query.search!, false)
        .or()
        .addCondition("instructorName", op.Contains, query.search!, false)
        .endGroup(),
    );
  }

  applyConditions(qb, conditions);

  if (query.orderBy) {
    qb.addOrderBy(query.orderBy.field, query.orderBy.direction === "desc");
  } else {
    qb.addOrderBy("createdAt", true); // true = desc
  }
  return qb.build();
};

export const getInventoryItemsSelf = async (query?: InventoryItemQueryCriteria) => {
  const response = await apiClient.get<ListData<InventoryItemVm>>(
    `${BASE_URL}/InventoryItems/self`,
    {
      params: buildInventoryItemQuery(query),
    },
  );
  return response.data;
};
