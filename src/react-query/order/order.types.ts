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
  Refunded = "Refunded",
}

export type OrderVm = {
  id: string;
  status: OrderStatus;
  userId: string;
  totalAmount: number;
  provisionalAmount: number;
  totalDirectDiscount: number;
  itemCount: number;
  firstOrderItem?: OrderItemVm;
  paymentMethodType?: string;
  paymentMethodBrand?: string;
  paymentMethodLast4?: string;
  createdAt: string;
  updatedAt: string;
};

export type OrderDetailVm = {
  id: string;
  status: OrderStatus;
  userId: string;
  totalAmount: number;
  provisionalAmount: number;
  totalDirectDiscount: number;
  itemCount: number;
  orderItems: OrderItemVm[];
  paymentMethodType?: string;
  paymentMethodBrand?: string;
  paymentMethodLast4?: string;
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

export type OrderSortableFields =
  | "createdAt"
  | "totalAmount"
  | "provisionalAmount"
  | "totalDirectDiscount";

export type OrderQueryCriteria = {
  page?: number;
  pageSize?: number;
  status?: OrderStatus;

  orderBy?: {
    field: OrderSortableFields;
    direction: "asc" | "desc";
  };
};
