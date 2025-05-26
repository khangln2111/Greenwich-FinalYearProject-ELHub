import { AxiosError } from "axios";
import React from "react";
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
    // console.error("Axios Network Error:", error);
    // showErrorToast("Network Error haha", "No response from the server. Please try again later.");
    return;
  }

  const { status, data } = error.response;
  const errorCode = data?.errorCode;

  if (status === 400 && errorCode === ErrorCode.ValidationError && data?.errors) {
    const listItems = Object.entries(data.errors).map(([field, messages]) =>
      React.createElement(
        "li",
        { key: field },
        React.createElement("strong", null, field),
        ": ",
        messages.join(", "),
      ),
    );

    const message = React.createElement(
      "div",
      null,
      React.createElement("div", null, "The following errors occurred:"),
      React.createElement("ul", { className: "list-disc list-inside" }, ...listItems),
    );

    showErrorToast("Validation Error", message);
    return;
  }

  if (status === 401 && (errorCode === undefined || errorCode === ErrorCode.Unauthorized)) {
    showErrorToast("Unauthorized", "You must login to perform this action.");
    return;
  }

  if (status === 403 && (errorCode === undefined || errorCode === ErrorCode.Forbidden)) {
    showErrorToast("Forbidden", "You do not have permission to perform this action.");
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
