import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../utils/toastHelper";
import { useAppStore } from "../../zustand/stores/appStore";
import { handleApiError } from "../common-service/handleApiError";
import { keyFac } from "../common-service/queryKeyFactory";
import { EnrollFromInventoryCommand, EnrollmentQueryCriteria } from "./enrollment.types";
import { enrollFromInventory, getEnrollmentDetailSelf, getEnrollmentsSelf } from "./enrollmentApi";
import { ErrorCode } from "../../api-client/api.types";

export const useGetEnrollmentsSelf = (query?: EnrollmentQueryCriteria) => {
  const currentUser = useAppStore((s) => s.currentUser);

  return useQuery({
    queryKey: keyFac.enrollments.getEnrollmentsSelf(query).queryKey,
    queryFn: () => getEnrollmentsSelf(query),
    enabled: !!currentUser,
  });
};

export const useGetEnrollmentDetailSelf = (id: string) => {
  const currentUser = useAppStore((s) => s.currentUser);
  return useQuery({
    queryKey: keyFac.enrollments.getEnrollmentDetailSelf(id).queryKey,
    queryFn: () => getEnrollmentDetailSelf(id),
    enabled: !!id && !!currentUser,
    retry: (failureCount, error) => {
      // ❌ Không retry nếu là 404
      if (error && error.response?.status === 404) {
        return false;
      }
      // ✅ Retry tối đa 2 lần cho lỗi khác
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
