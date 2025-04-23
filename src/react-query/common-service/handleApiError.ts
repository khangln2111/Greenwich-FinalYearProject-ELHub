import { AxiosError } from "axios";
import { ApiErrorResponse, ErrorCode } from "../../http-client/api.types";
import { showErrorToast } from "../../utils/toastHelper";

type ErrorHandler = (error: AxiosError<ApiErrorResponse>) => void;

// interface ApiErrorMatch {
//   status?: number;
//   errorCode?: ErrorCode;
//   handler: ErrorHandler;
// }

type ApiErrorMatch =
  | { status: number; errorCode?: ErrorCode; handler: ErrorHandler }
  | { errorCode: ErrorCode; status?: number; handler: ErrorHandler };

interface HandleApiErrorOptions {
  matchers: ApiErrorMatch[];
  fallback?: ErrorHandler;
}

export const handleApiError = (
  error: AxiosError<ApiErrorResponse>,
  options: HandleApiErrorOptions,
) => {
  const { matchers, fallback } = options;

  if (!error.response) {
    console.error("Axios Network Error:", error);
    showErrorToast("Network Error", "No response from the server. Please try again later.");
    return;
  }

  const { status, data } = error.response;
  const errorCode = data?.errorCode;

  if (status === 400 && errorCode === ErrorCode.ValidationError && data?.errors) {
    const validationMessages = Object.entries(data.errors)
      .map(([field, messages]) => {
        return `${field}: ${messages.join(", ")}`;
      })
      .join("\n");

    showErrorToast("Validation Error", `The following errors occurred:\n${validationMessages}`);
    return;
  }

  for (const matcher of matchers) {
    // if status or errorcode is undefined, we will ignore it. Otherwise, we will check if it matches the error response.
    const matchHttpStatusCode = matcher.status === undefined || matcher.status === status;
    const matchErrorCode = matcher.errorCode === undefined || matcher.errorCode === errorCode;

    // if both match, we will call the handler function of the matcher
    if (matchHttpStatusCode && matchErrorCode) {
      return matcher.handler(error);
    }
  }

  if (fallback) return fallback(error);
  showErrorToast("Unexpected Error", error.message);
};
