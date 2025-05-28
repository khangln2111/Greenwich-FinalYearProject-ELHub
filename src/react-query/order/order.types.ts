export type CreatePaymentIntentCommand = {
  cartItemIds: string[];
};

export type ConfirmPaymentIntentCommand = {
  paymentIntentId: string;
};

export enum OrderStatus {
  Incomplete = "Incomplete",
  Completed = "Completed",
  Failed = "Failed",
}

export type OrderQueryCriteria = {
  status?: OrderStatus;
  pageNumber?: number;
  pageSize?: number;
};

export type OrderVm = {
  id: string;
  status: OrderStatus;
  applicationUserId: string;
  totalPrice: number;
  orderItems: OrderItemVm[];
  createdAt: string;
  updatedAt: string;
};

export type OrderItemVm = {
  id: string;
  courseId: string;
  quantity: number;
  price: number;
  discountedPrice: number;
  courseTitle: string;
  courseImageUrl: string;
  createdAt: string;
  updatedAt: string;
};
