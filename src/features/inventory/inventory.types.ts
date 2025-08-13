import { BaseQueryCriteria } from "../../api-client/api.types";

export interface InventoryItemVm {
  id: string;
  courseId: string;
  courseTitle: string;
  courseDescription: string;
  courseImageUrl: string;
  enrolled: boolean;
  quantity: number;
}

export type InventoryItemOrderableFields = "createdAt" | "updatedAt" | "courseTitle" | "quantity";

export interface InventoryItemQueryCriteria
  extends BaseQueryCriteria<InventoryItemOrderableFields> {
  search?: string | null;
}
