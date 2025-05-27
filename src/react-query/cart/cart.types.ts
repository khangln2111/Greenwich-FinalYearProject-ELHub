export type Cart = {
  id: string;
  userId: string;
  cartItems: CartItem[];
  provisional: number;
  totalDirectDiscount: number;
  totalAmount: number;
};

export type CartItem = {
  id: string;
  courseId: string;
  courseTitle: string;
  courseDescription: string;
  courseImageUrl: string;
  quantity: number;
  price: number;
  discountedPrice: number;
  totalPrice: number;
};

export type UpdateCartItemCommand = {
  id: string;
  quantity: number;
};

export type AddCartItemCommand = {
  courseId: string;
  quantity: number;
};

export type DeleteCartItemCommand = {
  id: string;
};
