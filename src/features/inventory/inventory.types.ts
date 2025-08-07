export interface InventoryItemVm {
  id: string;
  courseId: string;
  courseTitle: string;
  courseDescription: string;
  courseImageUrl: string;
  enrolled: boolean;
  quantity: number;
}

export interface InventoryItemQueryCriteria {}
