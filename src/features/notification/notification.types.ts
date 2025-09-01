import { BaseQueryCriteria } from "../../api-client/api.types";

export interface NotificationVm {
  id: string;
  title: string;
  body: string;
  isRead: boolean;
  type: NotificationType;
  url: string | null;
  createdAt: string;
}

export type NotificationOrderableFields = "createdAt" | "title" | "body";

export interface NotificationQueryCriteria extends BaseQueryCriteria<NotificationOrderableFields> {
  type?: NotificationType[] | null;
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
  OrderConfirmed = "OrderConfirmed",
}
