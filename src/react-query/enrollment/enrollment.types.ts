export interface EnrollmentVm {
  id: string;
  courseId: string;
  courseTitle: string;
  courseDescription: string;
  courseImageUrl?: string;
  progressPercentage: number;
}

export interface EnrollmentQueryCriteria {}

export interface EnrollFromInventoryCommand {
  inventoryItemId: string;
}
