export type CreatePaymentIntentCommand = {
  cartItemIds: string[];
};

export type ConfirmPaymentIntentCommand = {
  paymentIntentId: string;
};
