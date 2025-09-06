import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { keyFac } from "../common-service/queryKeyFactory";
import {
  CreateInstructorApplicationCommand,
  InstructorApplicationQueryCriteria,
  ResubmitInstructorApplicationCommand,
  ModerateInstructorApplicationCommand,
} from "./instructorApplication.types";
import {
  createInstructorApplication,
  getInstructorApplications,
  getInstructorApplicationSelf,
  resubmitInstructorApplication,
  moderateInstructorApplication,
  getInstructorApplicationById,
} from "./instructorApplication.api";
import { handleApiError } from "../common-service/handleApiError";
import { showErrorToast, showSuccessToast } from "../../utils/toastHelper";
import { ErrorCode } from "../../api-client/api.types";
import { useAppStore } from "../../zustand/stores/appStore";

export const useGetInstructorApplications = (query?: InstructorApplicationQueryCriteria) => {
  return useQuery({
    queryKey: keyFac.instructorApplications.getInstructorApplications(query).queryKey,
    queryFn: () => getInstructorApplications(query),
  });
};

export const useGetInstructorApplicationById = (id: string) => {
  return useQuery({
    queryKey: keyFac.instructorApplications.getInstructorApplicationById(id).queryKey,
    queryFn: () => getInstructorApplicationById(id),
  });
};

export const useGetInstructorApplicationSelf = () => {
  const currentUser = useAppStore((s) => s.currentUser);

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
        queryKey: keyFac.instructorApplications._def,
      });

      showSuccessToast(
        "Application Submitted",
        "Your application has been submitted successfully!, please wait for the moderation.",
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

export const useModerateInstructorApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: ModerateInstructorApplicationCommand) =>
      moderateInstructorApplication(command),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: keyFac.instructorApplications._def,
      });
      showSuccessToast("Application moderated", "The application has been moderated successfully!");
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

export const useResubmitInstructorApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: ResubmitInstructorApplicationCommand) =>
      resubmitInstructorApplication(command),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: keyFac.instructorApplications._def,
      });

      showSuccessToast(
        "Application resubmitted",
        "Your application has been resubmitted successfully!, please wait for the moderation.",
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
