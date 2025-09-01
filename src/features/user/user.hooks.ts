import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../utils/toastHelper";
import { handleApiError } from "../common-service/handleApiError";
import { keyFac } from "../common-service/queryKeyFactory";
import {
  AssignRoleToUserCommand,
  SetUserActivationCommand,
  UpdateUserCommand,
  UserQueryCriteria,
} from "./user.types";
import { assignRolesToUser, getUsers, setUserActivation, updateUser } from "./user.api";

export const useGetUsers = (query?: UserQueryCriteria) => {
  return useQuery({
    queryKey: keyFac.users.getUsers(query).queryKey,
    queryFn: () => getUsers(query),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: UpdateUserCommand) => updateUser(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.users._def });
      showSuccessToast("Success", "User updated successfully.");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () =>
              showErrorToast("Not Found", "The user you are trying to update does not exist."),
          },
        ],
      }),
  });
};

export const useAssignRolesToUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: AssignRoleToUserCommand) => assignRolesToUser(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.users._def });
      showSuccessToast("Success", "User roles updated successfully.");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () =>
              showErrorToast(
                "Not Found",
                "The user you are trying to assign roles does not exist.",
              ),
          },
        ],
      }),
  });
};

export const useSetUserActivation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: SetUserActivationCommand) => setUserActivation(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.users._def });
      showSuccessToast("Success", "User activation status updated successfully.");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () =>
              showErrorToast(
                "Not Found",
                "The user you are trying to set activation status does not exist.",
              ),
          },
        ],
      }),
  });
};
