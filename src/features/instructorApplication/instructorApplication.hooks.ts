import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ErrorCode } from "../../api-client/api.types";
import { showErrorToast, showSuccessToast } from "../../utils/toastHelper";
import { useAuthStore } from "../../zustand/stores/authStore";
import { handleApiError } from "../common-service/handleApiError";
import { keyFac } from "../common-service/queryKeyFactory";
import {
  createInstructorApplication,
  getInstructorApplicationById,
  getInstructorApplications,
  getInstructorApplicationSelf,
  moderateInstructorApplication,
  resubmitInstructorApplication,
} from "./instructorApplication.api";
import {
  CreateInstructorApplicationCommand,
  InstructorApplicationQueryCriteria,
  ModerateInstructorApplicationCommand,
  ResubmitInstructorApplicationCommand,
} from "./instructorApplication.types";

export const useGetInstructorApplications = (query?: InstructorApplicationQueryCriteria) => {
  return useQuery({
    queryKey: keyFac.instructorApplications.getInstructorApplications(query).queryKey,
    queryFn: () => getInstructorApplications(query),
  });
};

export const useGetInstructorApplicationById = (id: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: keyFac.instructorApplications.getInstructorApplicationById(id).queryKey,
    queryFn: () => getInstructorApplicationById(id),
  });
};

export const useGetInstructorApplicationSelf = () => {
  const accessToken = useAuthStore((s) => s.accessToken);

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
    enabled: !!accessToken,
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
