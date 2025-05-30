export interface EnrollmentVm {
  id: string;
  courseId: string;
  courseTitle: string;
  courseDescription: string;
  courseImageUrl?: string;
}

export interface EnrollmentQueryCriteria {}

export interface EnrollFromInventoryCommand {
  InventoryItemId: string;
}
