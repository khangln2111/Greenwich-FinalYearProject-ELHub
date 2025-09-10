import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ErrorCode } from "../../api-client/api.types";
import { showErrorToast, showSuccessToast } from "../../utils/toastHelper";
import { useAuthStore } from "../../zustand/stores/authStore";
import { handleApiError } from "../common-service/handleApiError";
import { keyFac } from "../common-service/queryKeyFactory";
import { enrollFromInventory, getEnrollmentDetailSelf, getEnrollmentsSelf } from "./enrollment.api";
import { EnrollFromInventoryCommand, EnrollmentQueryCriteria } from "./enrollment.types";

export const useGetEnrollmentsSelf = (query?: EnrollmentQueryCriteria) => {
  const accessToken = useAuthStore((s) => s.accessToken);

  return useQuery({
    enabled: !!accessToken,
    queryKey: keyFac.enrollments.getEnrollmentsSelf(query).queryKey,
    queryFn: () => getEnrollmentsSelf(query),
  });
};

export const useGetEnrollmentDetailSelf = (id: string) => {
  const accessToken = useAuthStore((s) => s.accessToken);

  return useQuery({
    queryKey: keyFac.enrollments.getEnrollmentDetailSelf(id).queryKey,
    queryFn: () => getEnrollmentDetailSelf(id),
    enabled: !!id && !!accessToken,
    retry: (failureCount, error) => {
      // ❌ Do not retry if 404
      if (error && error.response?.status === 404) {
        return false;
      }
      // ✅ Retry maximum 2 times for other errors
      return failureCount < 2;
    },
  });
};

export const useEnrollFromInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (command: EnrollFromInventoryCommand) => enrollFromInventory(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.enrollments.getEnrollmentsSelf._def });
      queryClient.invalidateQueries({ queryKey: keyFac.inventories.getInventoryItemsSelf._def });
      showSuccessToast("Enrolled successfully", "Please check your enrollments list for details");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 400,
            errorCode: ErrorCode.CourseAlreadyEnrolled,
            handler: () => {
              showErrorToast("Already Enrolled", "You are already enrolled in this course.");
            },
          },
          {
            status: 400,
            errorCode: ErrorCode.NoInventoryLeft,
            handler: () => {
              showErrorToast(
                "No Inventory Left",
                "This course inventory item is empty, please try another course.",
              );
            },
          },
          {
            status: 403,
            errorCode: ErrorCode.Forbidden,
            handler: () => {
              showErrorToast("Forbidden", "You do not have permission to enroll in this course.");
            },
          },
        ],
      }),
  });
};
