import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../utils/toastHelper";
import { useAppStore } from "../../zustand/store";
import { handleApiError } from "../common-service/handleApiError";
import { keyFac } from "../common-service/queryKeyFactory";
import { EnrollFromInventoryCommand } from "./enrollment.types";
import { enrollFromInventory, getEnrollmentsSelf } from "./enrollmentApi";

export const useGetEnrollmentsSelf = () => {
  const currentUser = useAppStore.use.currentUser();

  return useQuery({
    queryKey: keyFac.enrollments.getEnrollmentsSelf().queryKey,
    queryFn: getEnrollmentsSelf,
    enabled: !!currentUser,
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
        matchers: [],
      }),
  });
};
