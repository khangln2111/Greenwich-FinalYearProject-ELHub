export interface Result<T> {
  success: boolean; // Indicates if the operation was successful
  message?: string; // Optional message providing additional information
  status?: number; // HTTP status code
  data?: T; // Optional data returned from the operation
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

export interface ErrorResponse {
  errorCode: ErrorCode; // Error code
  message: string; // Error message
  statusCode: number; // HTTP status code
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
}
