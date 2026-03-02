import { BaseQueryCriteria } from "../../api-client/api.types";

export interface NotificationVm {
  id: string;
  title: string;
  content: string;
  isRead: boolean;
  type: NotificationType;
  url: string | null;
  createdAt: string;
}

export type NotificationOrderableFields = "createdAt" | "title" | "body";

export interface NotificationQueryCriteria extends BaseQueryCriteria<NotificationOrderableFields> {
  types?: NotificationType[] | null;
  isRead?: boolean | null;
}

export enum NotificationType {
  CourseSubmitted = "CourseSubmitted",
  CourseApproved = "CourseApproved",
  CourseRejected = "CourseRejected",
  CourseResubmitted = "CourseResubmitted",
  ReceivedGift = "ReceivedGift",
  GiftRedeemed = "GiftRedeemed",
  ReviewCreated = "ReviewCreated",
  ReviewReplied = "ReviewReplied",
  OrderProcessed = "OrderProcessed",
  CourseUpdated = "CourseUpdated",
  InstructorApplicationSubmitted = "InstructorApplicationSubmitted",
  InstructorApplicationResubmitted = "InstructorApplicationResubmitted",
  InstructorApplicationApproved = "InstructorApplicationApproved",
  InstructorApplicationRejected = "InstructorApplicationRejected",
  CourseBanned = "CourseBanned",
  CourseUnbanned = "CourseUnbanned",
}
