export interface ApiSuccessResponse<T = unknown> {
  message: string;
  data?: T;
}

export interface ListData<T> {
  items: T[]; // Array of items
  count: number;
}

export interface FetchListRequest {
  page?: number; // Current page number
  pageSize?: number; // Number of items per page
  orderBy?: string; // Fields to order by
  filter?: string; // Filter criteria
}

export interface ApiErrorResponse {
  errorCode: ErrorCode; // Error code
  message: string; // Error message
  statusCode: number; // HTTP status code
  errors?: Record<string, string[]>; // Validation errors
}

export enum ErrorCode {
  ValidationError = "ValidationError",
  IdentityError = "IdentityError",
  NotFound = "NotFound",
  EmailNotConfirmed = "EmailNotConfirmed",
  EmailAlreadyTaken = "EmailAlreadyTaken",
  PaymentFailed = "PaymentFailed",
  Unexpected = "Unexpected",
  InvalidBehavior = "InvalidBehavior",
  EmailAlreadyConfirmed = "EmailAlreadyConfirmed",
  EmailOrPasswordIncorrect = "EmailOrPasswordIncorrect",
  InvalidToken = "InvalidToken",
  InvalidOtp = "InvalidOtp",
}
