import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { keyFac } from "../common-service/queryKeyFactory";
import {
  CreateInstructorApplicationCommand,
  InstructorApplicationQueryCriteria,
  RetryInstructorApplicationCommand,
  ReviewInstructorApplicationCommand,
} from "./instructorApplication.types";
import {
  createInstructorApplication,
  getInstructorApplications,
  getInstructorApplicationSelf,
  retryInstructorApplication,
  reviewInstructorApplication,
} from "./instructorApplicationApi";
import { handleApiError } from "../common-service/handleApiError";
import { showErrorToast, showSuccessToast } from "../../utils/toastHelper";
import { ErrorCode } from "../../http-client/api.types";
import { useAppStore } from "../../zustand/store";

export const useGetInstructorApplications = (query?: InstructorApplicationQueryCriteria) => {
  return useQuery({
    queryKey: keyFac.instructorApplications.getInstructorApplications(query).queryKey,
    queryFn: () => getInstructorApplications(query),
  });
};

export const useGetInstructorApplicationSelf = () => {
  const currentUser = useAppStore.use.currentUser();

  return useQuery({
    queryKey: keyFac.instructorApplications.getInstructorApplicationSelf.queryKey,
    queryFn: getInstructorApplicationSelf,
    retry: (failureCount, error) => {
      // ❌ Do not retry if 404
      if (error && error.response?.status === 404) {
        return false;
      }
      // ✅ Retry maximum 2 times for other errors
      return failureCount < 2;
    },
    enabled: !!currentUser,
  });
};

export const useCreateInstructorApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: CreateInstructorApplicationCommand) =>
      createInstructorApplication(command),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: keyFac.instructorApplications.getInstructorApplications().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: keyFac.instructorApplications.getInstructorApplicationSelf.queryKey,
      });
      showSuccessToast(
        "Application Submitted",
        "Your application has been submitted successfully!, please wait for the review.",
      );
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 400,
            errorCode: ErrorCode.InvalidOperation,
            handler: () =>
              showErrorToast(
                "Invalid Operation",
                "You already submitted an application that is pending, approved, or rejected. Please check before trying again.",
              ),
          },
        ],
      }),
  });
};

export const useReviewInstructorApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: ReviewInstructorApplicationCommand) =>
      reviewInstructorApplication(command),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: keyFac.instructorApplications.getInstructorApplications._def,
      });
      showSuccessToast("Application Reviewed", "The application has been reviewed successfully!");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () =>
              showErrorToast(
                "Not Found",
                "No rejected instructor application found for your account.",
              ),
          },
          {
            status: 400,
            errorCode: ErrorCode.RetryLimitExceeded,
            handler: () =>
              showErrorToast(
                "Retry Limit Exceeded",
                "You have reached the maximum number of retry attempts.",
              ),
          },
          {
            status: 400,
            errorCode: ErrorCode.RetryCooldown,
            handler: (err) => {
              const msg = err.response?.data?.message ?? "";
              showErrorToast("Retry Too Soon", msg);
            },
          },
        ],
      }),
  });
};

export const useRetryInstructorApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: RetryInstructorApplicationCommand) => retryInstructorApplication(command),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: keyFac.instructorApplications.getInstructorApplications().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: keyFac.instructorApplications.getInstructorApplicationSelf.queryKey,
      });
      showSuccessToast(
        "Application Retried",
        "Your application has been retried successfully!, please wait for the review.",
      );
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 400,
            errorCode: ErrorCode.RetryLimitExceeded,
            handler: () =>
              showErrorToast(
                "Retry Limit Exceeded",
                "You have reached the maximum number of retry attempts.",
              ),
          },
          {
            status: 400,
            errorCode: ErrorCode.RetryCooldown,
            handler: (err) => {
              const msg = err.response?.data?.message ?? "";
              showErrorToast("Retry Too Soon", msg); // e.g. "Please retry after ..."
            },
          },
          {
            status: 404,
            handler: () =>
              showErrorToast(
                "Not Found",
                "No rejected instructor application found for your account.",
              ),
          },
        ],
      }),
  });
};
