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
  InvalidOperation = "InvalidOperation",
  EmailAlreadyConfirmed = "EmailAlreadyConfirmed",
  EmailOrPasswordIncorrect = "EmailOrPasswordIncorrect",
  InvalidToken = "InvalidToken",
  InvalidOtp = "InvalidOtp",
  Unauthorized = "Unauthorized",
  Forbidden = "Forbidden",
  NoInventoryLeft = "NoInventoryLeft",
  CourseAlreadyEnrolled = "CourseAlreadyEnrolled",
  GiftUnavailable = "GiftUnavailable",
  CannotAssignRole = "CannotAssignRole",
  RetryLimitExceeded = "RetryLimitExceeded",
  RetryCooldown = "RetryCooldown",
}

export type OrderDirection = "asc" | "desc";

export interface OrderBy<TField extends string> {
  field: TField;
  direction: OrderDirection;
}

export interface BaseQueryCriteria<TField extends string> {
  page?: number;
  pageSize?: number;
  orderBy?: OrderBy<TField>;
}

export type OrderOption<TField extends string> = `${TField}_${OrderDirection}`;

export function encodeOrderByOption<TField extends string>(
  orderBy: OrderBy<TField>,
): OrderOption<TField> {
  return `${orderBy.field}_${orderBy.direction}` as OrderOption<TField>;
}

export function decodeOrderByOption<TField extends string>(
  encoded: string | null | undefined,
  defaultField: TField,
  defaultDirection: OrderDirection = "desc",
): OrderBy<TField> {
  if (encoded) {
    const [field, direction] = encoded.split("_");
    if (
      (direction === "asc" || direction === "desc") &&
      typeof field === "string" &&
      field.trim() !== ""
    ) {
      return {
        field: field as TField,
        direction,
      };
    }
  }

  return {
    field: defaultField,
    direction: defaultDirection,
  };
}
